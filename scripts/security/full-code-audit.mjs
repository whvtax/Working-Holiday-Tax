#!/usr/bin/env node
// =====================================================================
// Full code security audit for the WHT / SVT codebase, scoped to:
//   ATLAS  (src/lib/atlas, src/app/api/atlas, src/components/atlas, crm/atlas)
//   WILL   (src/lib/will, src/app/api/will, src/components/will, crm/will)
//   MIA    (src/lib/mia, src/app/api/mia, src/components/mia, crm/mia)
//   SHARED (proxy, request guard, CRM auth/store, Supabase helpers, all
//           /api/crm routes, next.config, vercel.json, migrations)
//
// What it does
//   1. Reads every .ts/.tsx/.js/.mjs/.sql/.json/.md config file in scope and
//      checks EVERY LINE against the rule set below (line-by-line pass).
//   2. Checks every API route file for an auth gate (session, cron secret,
//      signed form token, or webhook signature) and lists the ones with none.
//   3. Checks that the cross-site request guard covers every guarded prefix
//      (Mia routes were missing from it in an earlier build).
//   4. Checks every table created in supabase/migrations has RLS enabled.
//   5. Checks for real-looking secrets, and runs `npm audit --omit=dev`.
//
// Safety
//   - Read-only on the project. No network calls except `npm audit`
//     (registry only, skip with --no-audit). No deletes, no edits, no installs.
//   - Writes only to audit-output/security-full/<timestamp>/ inside the project.
//   - Zero dependencies (Node built-ins only).
//   - Secret values are masked in the report (first 4 and last 2 chars).
//
// Usage
//   node scripts/security/full-code-audit.mjs            # full run
//   node scripts/security/full-code-audit.mjs --no-audit # skip npm audit
//   node scripts/security/full-code-audit.mjs --scope=mia
//
// Exit code: 1 if any HIGH finding is open, else 0.
// Findings are leads for review, not verdicts. Each has a rule id so it can be
// marked accepted in ACCEPTED below with a reason.
// =====================================================================

import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = process.cwd();
const args = new Set(process.argv.slice(2));
const SCOPE_ARG = (process.argv.find((a) => a.startsWith('--scope=')) || '').split('=')[1] || 'all';
const SKIP_AUDIT = args.has('--no-audit');

// ---------- Reviewed and accepted findings ----------
// Add an entry only after a human has read the finding and written why it is
// safe. Key = `${ruleId}|${file}|${line}`. Empty on purpose.
const ACCEPTED = {
  'SEC-LOG-PII|src/app/api/crm/login/route.ts|96': 'False positive, 17 Nov: the message says email delivery failed; no address is logged',
  'SEC-FETCH-USER-URL|src/lib/supabase.ts|45': 'False positive, 17 Nov: fetch wrapper for the Supabase client; URL is built by the SDK, not by request data',
  'SEC-FETCH-USER-URL|src/lib/will/channel.ts|1009': 'False positive, 17 Nov: paging URL from Meta is checked by isGraphPagingUrl before use',
};

// ---------- Scope definitions ----------
const SCOPES = {
  ATLAS: (p) => /(^|\/)src\/lib\/atlas\//.test(p) || /(^|\/)src\/app\/api\/atlas\//.test(p) || /(^|\/)src\/components\/atlas\//.test(p) || /crm\/atlas/.test(p),
  WILL: (p) => /(^|\/)src\/lib\/will\//.test(p) || /(^|\/)src\/app\/api\/will\//.test(p) || /(^|\/)src\/components\/will\//.test(p) || /crm\/will/.test(p),
  MIA: (p) => /(^|\/)src\/lib\/mia\//.test(p) || /(^|\/)src\/app\/api\/mia\//.test(p) || /(^|\/)src\/components\/mia\//.test(p) || /crm\/mia/.test(p),
  SHARED: (p) =>
    /(^|\/)src\/proxy\.ts$/.test(p) ||
    /(^|\/)src\/lib\/(request-guard|crm-store|supabase|field-crypto|rate-limit|get-ip)\.ts$/.test(p) ||
    /(^|\/)src\/app\/api\/crm\//.test(p) ||
    /^next\.config\.js$/.test(p) ||
    /^vercel\.json$/.test(p) ||
    /^\.vercelignore$/.test(p) ||
    /^\.env\.example$/.test(p),
};

function inScope(file) {
  if (SCOPE_ARG !== 'all') {
    const key = SCOPE_ARG.toUpperCase();
    return SCOPES[key] ? SCOPES[key](file) : false;
  }
  return Object.values(SCOPES).some((fn) => fn(file));
}

// ---------- File discovery ----------
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'audit-output', 'security-assessment', '.claude', 'coverage']);
const CODE_EXT = /\.(ts|tsx|js|mjs|cjs|sql|json|md)$/;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (CODE_EXT.test(name)) out.push(full);
  }
  return out;
}

const isTest = (file) => /(__tests__|\.test\.|\.spec\.)/.test(file);
const relPath = (abs) => relative(ROOT, abs).split(sep).join('/');

// Root-level files that are in scope but sit outside src/ and migrations.
function rootFiles() {
  return ['next.config.js', 'vercel.json', '.vercelignore', '.env.example', 'src/proxy.ts']
    .map((f) => join(ROOT, f))
    .filter((f) => existsSync(f));
}

const allFiles = [...new Set([...walk(join(ROOT, 'src')), ...walk(join(ROOT, 'supabase')), ...rootFiles()])];
const files = allFiles.map((abs) => ({ abs, rel: relPath(abs) })).filter((f) => inScope(f.rel) || f.rel.startsWith('supabase/'));

// ---------- Line-by-line rules ----------
// Each rule: id, severity (high|medium|low), title, test(line, ctx), hint
// ctx = { file, rel, lines, idx, isClient, isTest }
const RULES = [
  {
    id: 'SEC-SECRET-LITERAL', sev: 'high', title: 'Real-looking secret typed into source',
    re: /(sk_live_[A-Za-z0-9]{10,}|sk-ant-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9]{32,}|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35}|ghp_[A-Za-z0-9]{36}|xox[baprs]-[A-Za-z0-9-]{10,}|eyJ[A-Za-z0-9_-]{30,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}|postgres(ql)?:\/\/[^\s:]+:[^\s@]{4,}@)/,
    skipTests: true,
    hint: 'Move to an env var. If already leaked, rotate the key first.',
  },
  {
    id: 'SEC-SECRET-ASSIGN', sev: 'high', title: 'Secret assigned a literal value',
    re: /\b(JWT_SECRET|FORM_TOKEN_SECRET|CRON_SECRET|WILL_CRON_SECRET|CRM_PASSWORD|PASSWORD_SALT|SUPABASE_SERVICE_ROLE_KEY|WHATSAPP_TOKEN|WHATSAPP_ACCESS_TOKEN|META_APP_SECRET|RESEND_API_KEY|ANTHROPIC_API_KEY|REDIS_URL)\b\s*[:=]\s*["'`][^"'`\s]{8,}["'`]/,
    skipTests: true,
    hint: 'Read it from process.env and fail closed if missing.',
  },
  {
    id: 'SEC-NEXT-PUBLIC-SECRET', sev: 'high', title: 'Secret-like name exposed via NEXT_PUBLIC_',
    re: /NEXT_PUBLIC_[A-Z0-9_]*(SECRET|TOKEN|SERVICE|PASSWORD|PRIVATE|SALT|API_KEY)/,
    hint: 'NEXT_PUBLIC_ values ship to every browser. Remove the prefix.',
  },
  {
    id: 'SEC-SERVICE-ROLE-CLIENT', sev: 'high', title: 'Service-role key referenced in client-side code',
    test: (line, ctx) => ctx.isClient && /service_role|SUPABASE_SERVICE_ROLE|SERVICE_ROLE_KEY/i.test(line),
    hint: 'Service role bypasses RLS. Only server code may use it.',
  },
  {
    id: 'SEC-EVAL', sev: 'high', title: 'eval or dynamic Function constructor',
    re: /(^|[^A-Za-z0-9_.])eval\s*\(|new\s+Function\s*\(/,
    skipTests: true,
    hint: 'Remove. Never build code from request data.',
  },
  {
    id: 'SEC-SQL-INTERPOLATE', sev: 'high', title: 'SQL or RPC built from a template string with interpolation',
    re: /\.(rpc|query|raw|execute|sql)\s*\(\s*`[^`]*\$\{/,
    skipTests: true,
    hint: 'Use parameters. Never interpolate request data into SQL.',
  },
  {
    id: 'SEC-POSTGREST-FILTER', sev: 'medium', title: 'PostgREST filter string built from variables (filter injection)',
    re: /\.(or|filter|not)\s*\(\s*`[^`]*\$\{(?!cutoff|now|iso|since|today)[A-Za-z_]/,
    skipTests: true,
    hint: 'Whitelist values or use .eq / .in with arrays. A comma or dot in input can change the filter.',
  },
  {
    id: 'SEC-FETCH-USER-URL', sev: 'medium', title: 'Outbound fetch to a URL taken from request data (SSRF risk)',
    re: /\bfetch\(\s*(req\.|body\.|params\.|searchParams|url\b|input\b|target\b|link\b)/,
    skipTests: true,
    hint: 'Check against an allowlist of hosts before fetching.',
  },
  {
    id: 'SEC-OPEN-REDIRECT', sev: 'medium', title: 'Redirect target taken from request data',
    re: /\b(redirect|NextResponse\.redirect)\(\s*(req\.|searchParams|body\.|url\b|next\b|returnTo)/,
    skipTests: true,
    hint: 'Allow relative paths only.',
  },
  {
    id: 'SEC-DANGEROUS-HTML', sev: 'medium', title: 'dangerouslySetInnerHTML (check the source is trusted)',
    re: /dangerouslySetInnerHTML/,
    skipTests: true,
    hint: 'Confirm the value is static or sanitised. Customer text must never reach it unescaped.',
  },
  {
    id: 'SEC-CHILD-PROCESS', sev: 'medium', title: 'Shell or child process execution',
    re: /child_process|execSync\(|spawnSync\(|\bexec\(\s*[`"'][^`"']*\$\{/,
    skipTests: true,
    hint: 'Confirm no user input reaches the command.',
  },
  {
    id: 'SEC-LOG-PII', sev: 'medium', title: 'Logging personal data or a secret',
    re: /console\.(log|info|warn|error|debug)\([^)]*\b(phone|wa_?id|waId|email|passport|tfn|password|secret|otp_?value|tokenValue)\b/i,
    skipTests: true,
    hint: 'Log an id or a masked value only.',
  },
  {
    id: 'SEC-WEAK-RANDOM', sev: 'medium', title: 'Math.random used where a token or code is made',
    test: (line) => /Math\.random\(/.test(line) && !/sleep|delay|backoff|jitter|setTimeout/i.test(line) && /(token|secret|otp|nonce|salt|session|referral|code)/i.test(line),
    skipTests: true,
    hint: 'Use crypto.randomBytes or crypto.randomUUID.',
  },
  {
    id: 'SEC-NONCONST-COMPARE', sev: 'medium', title: 'Secret or signature compared with == or ===',
    re: /\b(secret|signature|hmac|digest|otpHash|tokenHash|sessionToken|apiKey)\w*\s*(===|!==|==|!=)\s*(?!['"`])[A-Za-z_]/i,
    skipTests: true,
    hint: 'Use crypto.timingSafeEqual on equal-length buffers.',
  },
  {
    id: 'SEC-ERROR-LEAK', sev: 'medium', title: 'Raw error message returned to the caller',
    re: /(json|send|Response\.json)\(\s*\{[^}]*\b(e|err|error)\.message\b/,
    skipTests: true,
    hint: 'Return a fixed error code. Log the detail server-side.',
  },
  {
    id: 'SEC-AUTH-BYPASS-HINT', sev: 'high', title: 'Auth check commented out or hard-coded true',
    re: /(\/\/\s*(await\s+)?(sessionValid|cronAuthorized|verifyFormToken|validateSession)\(|if\s*\(\s*true\s*\)\s*return\s*NextResponse\.next|=>\s*true\s*\/\/\s*auth)/,
    skipTests: true,
    hint: 'Restore the check, or document why the route is public.',
  },
  {
    id: 'SEC-COOKIE-FLAGS', sev: 'medium', title: 'Session cookie set without explicit security flags',
    test: (line, ctx) => {
      if (!/crm_session|session_token|sessionCookie/i.test(line) || !/\.set\(|cookies\s*:|serialize/i.test(line)) return false;
      const window = ctx.lines.slice(ctx.idx, ctx.idx + 8).join(' ');
      return !(/httpOnly/.test(window) && /sameSite/i.test(window) && /secure/.test(window));
    },
    skipTests: true,
    hint: 'Set httpOnly, secure, sameSite: "lax" or "strict", and a path and maxAge.',
  },
  {
    id: 'SEC-DEBUG-ROUTE', sev: 'high', title: 'Seed or debug route reachable outside development',
    test: (line, ctx) => {
      if (!ctx.rel.includes('/api/') || !/export\s+(async\s+)?function\s+(GET|POST|PUT|DELETE)/.test(line) || !/seed|debug|dump/.test(ctx.rel)) return false;
      const body = ctx.lines.slice(ctx.idx, ctx.idx + 12).join('\n');
      return !(/NODE_ENV|SEED_ENABLED|sessionValid|validateSession/.test(body));
    },
    hint: 'Gate by NODE_ENV and a session, or remove it.',
  },
];

// ---------- Route auth gate check ----------
// A route file passes if it contains one of these markers. Anything else is
// reported for review. PUBLIC_BY_DESIGN lists routes that must be open
// (customer forms, webhook, login, public stats) with the reason.
const AUTH_MARKERS = /(sessionValid|validateSession|cronAuthorized|verifyFormToken|timingSafeEqual|createHmac|signature|x-hub-signature)/;
const PUBLIC_BY_DESIGN = {
  'src/app/api/super-form/': 'Public customer form (token or upload guard inside)',
  'src/app/api/tax-form/': 'Public customer form (signed token enforced in route)',
  'src/app/api/google-reviews/': 'Public read of the static rating',
  'src/app/api/crm/login/': 'Login endpoint',
  'src/app/api/crm/verify-otp/': 'OTP verify endpoint (rate-limited inside)',
  'src/app/api/crm/logout/': 'Logout endpoint',
  'src/app/api/crm/version/': 'Public build version',
  'src/app/api/will/webhook/': 'Meta webhook (HMAC signature checked)',
  'src/app/api/will/health/': 'Health probe (should expose no data)',
  'src/app/api/will/version/': 'Public build version',
  'src/app/api/analytics/funnel/': 'Public analytics beacon (write only)',
};

function routeChecks() {
  const findings = [];
  const routeFiles = files.filter((f) => /src\/app\/api\/.+\/route\.(ts|js)$/.test(f.rel));
  for (const f of routeFiles) {
    const text = readFileSync(f.abs, 'utf8');
    const publicKey = Object.keys(PUBLIC_BY_DESIGN).find((k) => f.rel.startsWith(k));
    if (publicKey) {
      findings.push({ rule: 'ROUTE-PUBLIC-REVIEW', sev: 'low', file: f.rel, line: 1, title: `Public by design: ${PUBLIC_BY_DESIGN[publicKey]}`, excerpt: '', hint: 'Confirm input validation and rate limiting on this route.' });
      continue;
    }
    if (!AUTH_MARKERS.test(text)) {
      const isMut = /export\s+(async\s+)?function\s+(POST|PUT|PATCH|DELETE)/.test(text);
      findings.push({
        rule: 'ROUTE-NO-AUTH', sev: isMut ? 'high' : 'medium', file: f.rel, line: 1,
        title: `Route has no auth gate${isMut ? ' (state-changing)' : ' (read)'}`,
        excerpt: '', hint: 'Add sessionValid() or cronAuthorized(), or add it to PUBLIC_BY_DESIGN with a reason.',
      });
    }
  }
  return findings;
}

// ---------- Cross-site guard coverage ----------
function guardCoverage() {
  const findings = [];
  const guardFile = join(ROOT, 'src/lib/request-guard.ts');
  if (!existsSync(guardFile)) return [{ rule: 'GUARD-MISSING', sev: 'high', file: 'src/lib/request-guard.ts', line: 1, title: 'request-guard.ts not found', excerpt: '', hint: '' }];
  const src = readFileSync(guardFile, 'utf8');
  const m = src.match(/GUARDED_API_PREFIXES\s*=\s*\[([^\]]*)\]/);
  const prefixes = m ? [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]) : [];
  const apiDirs = ['/api/crm/', '/api/will/', '/api/atlas/', '/api/mia/'];
  for (const d of apiDirs) {
    if (!prefixes.includes(d)) {
      findings.push({
        rule: 'GUARD-PREFIX-MISSING', sev: d === '/api/mia/' ? 'high' : 'medium', file: 'src/lib/request-guard.ts', line: 1,
        title: `Cross-site mutation guard does not cover ${d}`,
        excerpt: `GUARDED_API_PREFIXES = [${prefixes.join(', ')}]`,
        hint: `Add '${d}' to GUARDED_API_PREFIXES so state-changing calls from other sites are refused.`,
      });
    }
  }
  return findings;
}

// ---------- Migrations: RLS coverage ----------
function migrationChecks() {
  const findings = [];
  const dir = join(ROOT, 'supabase/migrations');
  if (!existsSync(dir)) return findings;
  const sqlFiles = readdirSync(dir).filter((n) => n.endsWith('.sql')).sort();
  const created = new Map(); // table -> file
  const rls = new Set();
  for (const n of sqlFiles) {
    const sql = readFileSync(join(dir, n), 'utf8');
    for (const m of sql.matchAll(/CREATE\s+TABLE\s+(IF\s+NOT\s+EXISTS\s+)?(public\.)?"?([a-z_][a-z0-9_]*)"?/gi)) {
      if (!created.has(m[3])) created.set(m[3], `supabase/migrations/${n}`);
    }
    for (const m of sql.matchAll(/ALTER\s+TABLE\s+(public\.)?"?([a-z_][a-z0-9_]*)"?\s+ENABLE\s+ROW\s+LEVEL\s+SECURITY/gi)) rls.add(m[2]);
  }
  for (const [table, file] of created) {
    if (!rls.has(table)) {
      findings.push({
        rule: 'RLS-MISSING', sev: /^(will_|crm_|svt_|wht_)/.test(table) ? 'high' : 'medium', file, line: 1,
        title: `Table ${table} is created but no migration enables RLS on it`,
        excerpt: '', hint: 'Add ALTER TABLE ... ENABLE ROW LEVEL SECURITY and a deny-by-default policy. Service role still works.',
      });
    }
  }
  return findings;
}

// ---------- Client component detection ----------
function isClientFile(text) {
  return /^\s*['"]use client['"]/m.test(text.slice(0, 400));
}

// ---------- Line-by-line pass ----------
function lineScan() {
  const findings = [];
  for (const f of files) {
    const text = readFileSync(f.abs, 'utf8');
    const lines = text.split('\n');
    const ctx0 = { file: f.abs, rel: f.rel, isClient: isClientFile(text), isTest: isTest(f.rel) };
    lines.forEach((line, idx) => {
      if (line.length > 2000) return; // minified or generated, skip
      for (const rule of RULES) {
        if (rule.skipTests && ctx0.isTest) continue;
        let hit = false;
        if (rule.re) hit = rule.re.test(line);
        if (!hit && rule.test) hit = rule.test(line, { ...ctx0, lines, idx });
        if (!hit) continue;
        const key = `${rule.id}|${f.rel}|${idx + 1}`;
        if (ACCEPTED[key]) continue;
        findings.push({
          rule: rule.id, sev: rule.sev, file: f.rel, line: idx + 1, title: rule.title,
          excerpt: maskLine(line.trim()).slice(0, 220), hint: rule.hint,
        });
      }
    });
  }
  return findings;
}

// Mask anything that looks like a secret in the excerpt so the report never echoes one.
function maskLine(s) {
  return s
    .replace(/(sk_live_|sk-ant-|sk-|AKIA|AIza|ghp_|xox[baprs]-|eyJ)[A-Za-z0-9_\-.]{4,}/g, (m) => `${m.slice(0, 4)}…${m.slice(-2)}`)
    .replace(/(postgres(ql)?:\/\/[^:\s]+:)[^@\s]+@/g, '$1****@');
}

// ---------- npm audit ----------
function npmAudit() {
  if (SKIP_AUDIT) return { skipped: true };
  try {
    const out = execFileSync('npm', ['audit', '--omit=dev', '--json'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
    return JSON.parse(out).metadata?.vulnerabilities ?? { note: 'no metadata' };
  } catch (e) {
    try { return JSON.parse(e.stdout?.toString() || '{}').metadata?.vulnerabilities ?? { error: 'npm audit failed' }; }
    catch { return { error: 'npm audit failed' }; }
  }
}

// ---------- Run ----------
const started = new Date();
const findings = [
  ...lineScan(),
  ...routeChecks(),
  ...guardCoverage(),
  ...migrationChecks(),
];

const order = { high: 0, medium: 1, low: 2 };
findings.sort((a, b) => order[a.sev] - order[b.sev] || a.file.localeCompare(b.file) || a.line - b.line);

const counts = findings.reduce((acc, f) => { acc[f.sev] = (acc[f.sev] || 0) + 1; return acc; }, {});
const audit = npmAudit();

const stamp = started.toISOString().replace(/[:.]/g, '-');
const outDir = join(ROOT, 'audit-output', 'security-full', stamp);
mkdirSync(outDir, { recursive: true });

const md = [];
md.push(`# Full code security audit`);
md.push('');
md.push(`Run: ${started.toISOString()}  ·  Scope: ${SCOPE_ARG}  ·  Files scanned: ${files.length}`);
md.push('');
md.push(`Findings: high ${counts.high || 0}, medium ${counts.medium || 0}, low ${counts.low || 0}`);
md.push('');
md.push(`npm audit (production deps): ${JSON.stringify(audit)}`);
md.push('');
md.push('Findings are leads for review. Read each one before changing code. Accepted items go in ACCEPTED in the script with a reason.');
md.push('');
for (const sev of ['high', 'medium', 'low']) {
  const group = findings.filter((f) => f.sev === sev);
  if (!group.length) continue;
  md.push(`## ${sev.toUpperCase()} (${group.length})`);
  md.push('');
  md.push('| Rule | File | Line | Finding | Excerpt | Fix hint |');
  md.push('|---|---|---|---|---|---|');
  for (const f of group) {
    const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
    md.push(`| ${f.rule} | ${cell(f.file)} | ${f.line} | ${cell(f.title)} | \`${cell(f.excerpt)}\` | ${cell(f.hint)} |`);
  }
  md.push('');
}

writeFileSync(join(outDir, 'report.md'), md.join('\n'));
writeFileSync(join(outDir, 'findings.json'), JSON.stringify({ started: started.toISOString(), scope: SCOPE_ARG, files: files.length, counts, npmAudit: audit, findings }, null, 2));

console.log(`Full code audit written to ${relPath(outDir)}/`);
console.log(`Scope ${SCOPE_ARG}, ${files.length} files. High ${counts.high || 0}, medium ${counts.medium || 0}, low ${counts.low || 0}.`);
process.exit((counts.high || 0) > 0 ? 1 : 0);
