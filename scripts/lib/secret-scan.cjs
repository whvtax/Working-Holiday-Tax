'use strict'
/**
 * Shared secret / personal-data scanner for the release script and the jest guardrails.
 *
 * Rules of the road:
 *  - Pure functions, no network, no git.
 *  - Findings carry file, line and TYPE only. The matched text is never returned,
 *    logged or put in an error message, so a failing run cannot leak what it found.
 *  - TFN detection is checksum based (ATO weights) and needs a TFN-ish word near the number,
 *    otherwise one in eleven random 9 digit numbers would be a false alarm. The synthetic TFNs
 *    used by tests and docs are allowlisted below.
 */

// Same credential shapes as __tests__/security/supply-chain-secrets.test.js, plus the extra
// shapes added in security round 2 (Supabase new-format keys, access tokens, named assignments).
const CREDENTIAL_RULES = [
  ['stripe-secret-key', /\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{10,}/],
  ['stripe-webhook-secret', /\bwhsec_[A-Za-z0-9]{10,}/],
  ['aws-access-key', /\bAKIA[0-9A-Z]{16}\b/],
  ['google-api-key', /\bAIza[0-9A-Za-z_-]{30,}/],
  ['github-token', /\b(?:ghp|gho|ghs|ghu)_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}/],
  ['slack-token', /\bxox[baprs]-[A-Za-z0-9-]{10,}/],
  ['resend-api-key', /\bre_(?!x+\b)[A-Za-z0-9]{20,}/],
  ['anthropic-api-key', /\bsk-ant-[A-Za-z0-9_-]{20,}/],
  ['openai-style-key', /\bsk-[A-Za-z0-9]{32,}/],
  ['meta-whatsapp-token', /\bEAA[A-Za-z0-9]{30,}/],
  ['private-key-block', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['jwt', /\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{5,}/],
  ['credentialed-url', /\b(?:rediss?|postgres(?:ql)?|mongodb(?:\+srv)?|mysql):\/\/[^\s'"@/:]+:[^\s'"@/]+@/],
  ['supabase-secret-key', /\bsb_secret_[A-Za-z0-9_-]{16,}/],
  ['supabase-access-token', /\bsbp_[a-f0-9]{30,}/],
  ['vercel-token', /\bvercel_[A-Za-z0-9_]{20,}/],
  // NAME=value or "NAME": "value" where NAME is one of this project's secrets and value is long and
  // random looking. Placeholders (empty, xxx, your-..., <...>, test/dummy/example words) are ignored.
  ['named-secret-assignment', /\b(?:JWT_SECRET|PASSWORD_SALT|CRM_PASSWORD|SUPABASE_SERVICE_ROLE_KEY|WHATSAPP_TOKEN|WHATSAPP_ACCESS_TOKEN|META_APP_SECRET|WHATSAPP_APP_SECRET|CRON_SECRET|WILL_CRON_SECRET|META_VERIFY_TOKEN|RESEND_API_KEY|ANTHROPIC_API_KEY|REDIS_URL|KV_URL)\b["']?\s*[:=]\s*["']?([A-Za-z0-9+/_=.-]{20,})/],
]

const PLACEHOLDER_VALUE = /^(?:x+|\.{3,}|your[-_a-z0-9]*|change[-_a-z0-9]*|placeholder[-_a-z0-9]*|example[-_a-z0-9]*|dummy[-_a-z0-9]*|test[-_a-z0-9]*|synthetic[-_a-z0-9]*|sample[-_a-z0-9]*|mock[-_a-z0-9]*|fake[-_a-z0-9]*|redacted[-_a-z0-9]*|re_x+|process\.env.*|env\..*)$/i

// Test fixtures that are public examples, never real people. 123456782 is the checksum-valid TFN
// used in the e2e tests and in the ATO's own examples.
const SYNTHETIC_TFNS = new Set(['123456782', '000000000', '111111111', '999999999', '876543210'])

const TFN_WORDS = /\b(?:tfn|tax\s*file(?:\s*number)?|t\.f\.n)\b/i

/** ATO TFN checksum: weights 1,4,3,7,5,8,6,9,10, sum divisible by 11 (9 digit form). */
function tfnChecksumOk(digits) {
  if (!/^\d{9}$/.test(digits)) return false
  const w = [1, 4, 3, 7, 5, 8, 6, 9, 10]
  let sum = 0
  for (let i = 0; i < 9; i++) sum += Number(digits[i]) * w[i]
  return sum % 11 === 0
}

/** Candidates: 9 digits, optionally grouped 3-3-3 with a single space or hyphen. */
const TFN_CANDIDATE = /(?<![\d.])(\d{3})[ -]?(\d{3})[ -]?(\d{3})(?![\d])/g

function scanLineForTfn(line) {
  if (!TFN_WORDS.test(line)) return false
  TFN_CANDIDATE.lastIndex = 0
  let m
  while ((m = TFN_CANDIDATE.exec(line))) {
    const d = m[1] + m[2] + m[3]
    if (SYNTHETIC_TFNS.has(d)) continue
    // all one digit (222222222 etc.) is an obvious placeholder
    if (/^(\d)\1{8}$/.test(d)) continue
    if (tfnChecksumOk(d)) return true
  }
  return false
}

/**
 * Scan text. Returns [{ line, type }]. `opts.tfn` (default true) turns TFN detection on.
 */
function scanText(text, opts = {}) {
  const tfn = opts.tfn !== false
  const out = []
  const lines = String(text).split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.length > 20000) continue // minified blobs: the credential shapes are anchored, skip the cost
    for (const [type, re] of CREDENTIAL_RULES) {
      const m = re.exec(line)
      if (!m) continue
      if (type === 'named-secret-assignment') {
        const v = m[1] || ''
        if (PLACEHOLDER_VALUE.test(v)) continue
        // needs some entropy: at least 3 character classes or 24+ chars of mixed case/digits
        const classes = [/[a-z]/, /[A-Z]/, /\d/, /[+/_=.-]/].filter((r) => r.test(v)).length
        if (classes < 3) continue
      }
      out.push({ line: i + 1, type })
    }
    if (tfn && scanLineForTfn(line)) out.push({ line: i + 1, type: 'real-looking-tfn' })
  }
  return out
}

/** Names that must never be inside a release, wherever they sit in the tree. */
const FORBIDDEN_NAME_RULES = [
  ['env-file', (b) => /^\.env(\..*)?$/i.test(b) && b.toLowerCase() !== '.env.example'],
  ['node_modules', (b) => b === 'node_modules'],
  ['next-build-output', (b) => b === '.next'],
  ['git-metadata', (b) => b === '.git' || b === '.gitmodules'],
  ['local-data-store', (b) => b === '.data' || b === 'store.json'],
  ['vercel-link', (b) => b === '.vercel'],
  ['private-key-file', (b) => /\.(pem|key|p12|pfx|jks|keystore|ppk|asc|gpg)$/i.test(b) || /^id_(rsa|dsa|ecdsa|ed25519)(\.pub)?$/i.test(b)],
  ['credentials-file', (b) => /^(\.npmrc|\.netrc|\.pgpass|credentials(\..*)?|service[-_]account.*\.json|secrets?(\..*)?)$/i.test(b)],
  ['database-or-capture', (b) => /\.(sqlite3?|db|har|pcap|dump|bak)$/i.test(b)],
  ['agent-tooling-state', (b) => b === '.claude' || b === '.audit-state' || b === '.mcp.json'],
]

/** Harmless junk that is silently left out rather than failing the release. */
const JUNK = (b) => b === '.DS_Store' || b === 'Thumbs.db' || /\.tsbuildinfo$/i.test(b)

function forbiddenReason(basename) {
  for (const [type, test] of FORBIDDEN_NAME_RULES) if (test(basename)) return type
  return null
}

/** Binary-safe check for a PEM header or credential shape inside a non-text file. */
function scanBinaryForPem(buf) {
  return buf.includes('-----BEGIN') && /-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(buf.toString('latin1'))
}

module.exports = {
  CREDENTIAL_RULES, SYNTHETIC_TFNS, tfnChecksumOk, scanText, scanLineForTfn,
  forbiddenReason, JUNK, scanBinaryForPem,
}
