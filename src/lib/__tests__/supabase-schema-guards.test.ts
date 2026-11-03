/**
 * Round 2 (data): static guards over the migrations and the data layer.
 * They read files only; no database is contacted.
 */
import fs from 'fs'
import path from 'path'

const root = path.join(__dirname, '..', '..', '..')
const migDir = path.join(root, 'supabase', 'migrations')
const migrations = fs.readdirSync(migDir).filter(f => f.endsWith('.sql')).sort()
const all = migrations.map(f => fs.readFileSync(path.join(migDir, f), 'utf8')).join('\n')
const strip = (s: string) => s.replace(/--.*$/gm, '')

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.next') continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (/\.(ts|tsx)$/.test(e.name) && !p.includes('__tests__')) out.push(p)
  }
  return out
}
const srcFiles = walk(path.join(root, 'src'))

describe('RLS on every table', () => {
  const code = strip(all)
  const created = [...code.matchAll(/CREATE TABLE IF NOT EXISTS\s+(?:public\.)?([a-z_0-9]+)/gi)].map(m => m[1].toLowerCase())
  it('finds the tables', () => { expect(created.length).toBeGreaterThan(20) })
  it.each([...new Set(created)])('%s has ENABLE ROW LEVEL SECURITY in some migration', (t) => {
    const re = new RegExp(`ALTER TABLE\\s+(?:public\\.)?${t}\\s+ENABLE ROW LEVEL SECURITY`, 'i')
    expect(code).toMatch(re)
  })
  it('migration 049 also sweeps any hand-made table', () => {
    const s = strip(fs.readFileSync(path.join(migDir, '049_rls_and_function_lockdown.sql'), 'utf8'))
    expect(s).toMatch(/NOT c\.relrowsecurity/)
    expect(s).toMatch(/REVOKE ALL ON ALL TABLES\s+IN SCHEMA public FROM anon, authenticated/)
  })
})

describe('no permissive policy, no public storage policy in the repo', () => {
  it('no CREATE POLICY exists (deny-all by RLS with zero policies is the design)', () => {
    expect(strip(all)).not.toMatch(/CREATE POLICY/i)
  })
  it('nothing grants anon or authenticated', () => {
    expect(strip(all)).not.toMatch(/GRANT[^;]*\bTO\b[^;]*\b(anon|authenticated|PUBLIC)\b/i)
  })
})

describe('functions in public are not callable by the browser roles', () => {
  const code = strip(all)
  const fns = [...new Set([...code.matchAll(/CREATE (?:OR REPLACE )?FUNCTION\s+([a-z_0-9]+)\s*\(/gi)].map(m => m[1]))]
  it('lists the functions', () => { expect(fns).toEqual(expect.arrayContaining(['get_dashboard_stats', 'will_bump_counter', 'crm_capture_lead'])) })
  it('049 revokes execute from PUBLIC, anon and authenticated for all of them (schema-wide)', () => {
    const s = strip(fs.readFileSync(path.join(migDir, '049_rls_and_function_lockdown.sql'), 'utf8'))
    expect(s).toMatch(/REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC, anon, authenticated/)
    expect(s).toMatch(/GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role/)
  })
  it('every SECURITY DEFINER function has its search_path pinned (inline or by ALTER FUNCTION in 049)', () => {
    const chunks = code.split(/CREATE (?:OR REPLACE )?FUNCTION\s+/i).slice(1)
    const definers = chunks.filter(c => /SECURITY DEFINER/i.test(c.split(/CREATE (?:TRIGGER|INDEX|TABLE)/i)[0])).map(c => /^([a-z_0-9]+)/i.exec(c)![1])
    expect(definers).toEqual(expect.arrayContaining(['crm_capture_lead', 'will_on_form_received']))
    const s049 = strip(fs.readFileSync(path.join(migDir, '049_rls_and_function_lockdown.sql'), 'utf8'))
    for (const f of new Set(definers)) expect(s049).toMatch(new RegExp(`ALTER FUNCTION ${f}\\(\\)\\s+SET search_path`, 'i'))
  })
})

describe('service role and Supabase client stay server-side', () => {
  const clientFiles = srcFiles.filter(f => /^\s*['"]use client['"]/.test(fs.readFileSync(f, 'utf8').slice(0, 200).trimStart() ? fs.readFileSync(f, 'utf8').trimStart().slice(0, 40) : ''))
  it('finds client components', () => { expect(clientFiles.length).toBeGreaterThan(10) })
  it('no client component imports a data-layer or secret-bearing module', () => {
    const bad = /^import\s+(?!type\b)[^;]*from\s+['"]@\/lib\/(supabase|db|crm-store|will\/store[^'"]*|will\/service|will\/claude|will\/channel)['"]/
    const offenders = clientFiles.filter(f => new RegExp(bad.source, 'm').test(fs.readFileSync(f, 'utf8')))
    expect(offenders.map(f => path.relative(root, f))).toEqual([])
  })
  it('SUPABASE_SERVICE_ROLE_KEY is only read in the three known server modules', () => {
    const users = srcFiles.filter(f => fs.readFileSync(f, 'utf8').includes('SUPABASE_SERVICE_ROLE_KEY')).map(f => path.relative(root, f)).sort()
    expect(users).toEqual(['src/app/api/will/version/route.ts', 'src/lib/supabase.ts', 'src/lib/will/store.ts'])
  })
  it('no NEXT_PUBLIC variable carries a secret-looking name', () => {
    const names = new Set<string>()
    for (const f of srcFiles) for (const m of fs.readFileSync(f, 'utf8').matchAll(/NEXT_PUBLIC_[A-Z0-9_]+/g)) names.add(m[0])
    for (const n of names) expect(n).not.toMatch(/SERVICE|SECRET|KEY|TOKEN|PASSWORD|SALT/)
  })
  it('the anon key is not used anywhere', () => {
    expect(srcFiles.some(f => /SUPABASE_ANON|anon[_ ]?key/i.test(fs.readFileSync(f, 'utf8')))).toBe(false)
  })
})

describe('no string-built SQL and no unsafe PostgREST filter strings', () => {
  it('no raw SQL driver, exec_sql RPC or sql template tag in src', () => {
    const offenders = srcFiles.filter(f => /from\s+['"](pg|postgres|mysql2?|knex|sequelize|@vercel\/postgres)['"]|exec_sql|\bsql`|\.raw\(/.test(fs.readFileSync(f, 'utf8')))
    expect(offenders.map(f => path.relative(root, f))).toEqual([])
  })
  it('.or() / .filter() with an interpolated value is limited to the known server-built cases', () => {
    const hits: string[] = []
    for (const f of srcFiles) {
      const lines = fs.readFileSync(f, 'utf8').split('\n')
      lines.forEach((l) => { if (/\.(or|filter)\(\s*`[^`]*\$\{/.test(l)) hits.push(`${path.relative(root, f)}:${l.trim()}`) })
    }
    // reclaimStaleJobs: cutoff is new Date(...).toISOString(), never user input.
    expect(hits).toEqual([expect.stringContaining('claimed_at.lt.${cutoff}')])
  })
  it('every ilike/like in the data layer escapes % _ and backslash first', () => {
    for (const rel of ['src/lib/db.ts', 'src/lib/will/store-supabase.ts']) {
      const s = fs.readFileSync(path.join(root, rel), 'utf8')
      expect(s).toMatch(/replace\(\/\[\\\\%_\]\/g/)
    }
  })
})
