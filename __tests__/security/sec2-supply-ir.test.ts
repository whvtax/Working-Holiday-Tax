/**
 * Security round 2, sec2-supply-ir.
 *
 *  A. secret / TFN scanner (shared by the release script)
 *  B. scripts/package-release.cjs: allowlist zip that refuses env files, node_modules, .next, keys,
 *     symlinks, credential strings and real-looking TFNs. Planted values are SYNTHETIC and are
 *     asserted NOT to appear in anything the script prints.
 *  C. .vercelignore, Dependabot and CI workflow files
 *  D. bulk-read audit logging (export, media, search, chats), no PII in rows
 *  E. retention as config, and the actor stamp on owner actions
 *  F. alert hooks: off by default, on only with the flag, throttled
 *
 * Local only. No network, no real data. File-store tests run in a temp directory.
 */
import fs from 'fs'
import os from 'os'
import path from 'path'
import { spawnSync } from 'child_process'

const ROOT = path.resolve(__dirname, '..', '..')
const SCRIPT = path.join(ROOT, 'scripts', 'package-release.cjs')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const scan = require(path.join(ROOT, 'scripts', 'lib', 'secret-scan.cjs'))

// ---- synthetic values (built at run time so this file itself never contains a key-shaped string) ----
const FAKE_AWS = 'AK' + 'IA' + 'ABCDEFGHIJKLMNOP'
const FAKE_SB = 'sb_' + 'secret_' + 'a1b2c3d4e5f6a7b8c9d0e1f2'
const FAKE_SECRET_VALUE = 'Zk3' + 'Qw9Xr7' + 'Lp2Tn8Vb5Cm1Hd4Gs6'
// A checksum-valid 9 digit number that is NOT one of the allowlisted public test TFNs.
function makeTfn(): string {
  for (let n = 345678120; n < 345679999; n++) {
    const d = String(n)
    if (scan.tfnChecksumOk(d) && !scan.SYNTHETIC_TFNS.has(d)) return d
  }
  throw new Error('no tfn found')
}
const FAKE_TFN = makeTfn()

// ===================== A. scanner =====================
describe('A. secret scanner', () => {
  test('TFN checksum matches the ATO algorithm', () => {
    expect(scan.tfnChecksumOk('123456782')).toBe(true)
    expect(scan.tfnChecksumOk('123456789')).toBe(false)
    expect(scan.tfnChecksumOk(FAKE_TFN)).toBe(true)
  })

  test('a checksum-valid TFN next to a TFN word is flagged, grouped or not', () => {
    const g = `${FAKE_TFN.slice(0, 3)} ${FAKE_TFN.slice(3, 6)} ${FAKE_TFN.slice(6)}`
    expect(scan.scanText(`customer tfn: ${FAKE_TFN}`).map((h: any) => h.type)).toContain('real-looking-tfn')
    expect(scan.scanText(`Tax file number ${g}`).map((h: any) => h.type)).toContain('real-looking-tfn')
  })

  test('public test TFNs, placeholders and TFN-less digits are not flagged', () => {
    expect(scan.scanText('tfn 123456782')).toEqual([])
    expect(scan.scanText('TFN: 222222222')).toEqual([])
    expect(scan.scanText(`order ${FAKE_TFN} shipped`)).toEqual([]) // no TFN word on the line
    expect(scan.scanText(`tfn ${FAKE_TFN}1`)).toEqual([]) // ten digits is not a TFN
  })

  test('credential shapes and named assignments are flagged, placeholders are not', () => {
    const t = (s: string) => scan.scanText(s).map((h: any) => h.type)
    expect(t(`k=${FAKE_AWS}`)).toContain('aws-access-key')
    expect(t(`k=${FAKE_SB}`)).toContain('supabase-secret-key')
    expect(t(`JWT_SECRET=${FAKE_SECRET_VALUE}`)).toContain('named-secret-assignment')
    expect(t(`"SUPABASE_SERVICE_ROLE_KEY": "${FAKE_SECRET_VALUE}"`)).toContain('named-secret-assignment')
    expect(t('JWT_SECRET=')).toEqual([])
    expect(t('JWT_SECRET=your-secret-goes-here-please')).toEqual([])
    expect(t('process.env.JWT_SECRET = process.env.OTHER_THING_HERE')).toEqual([])
    expect(t('CRM_PASSWORD=test-password-for-jest-only')).toEqual([])
  })

  test('findings never carry the matched value', () => {
    const hits = scan.scanText(`tfn ${FAKE_TFN}\nk=${FAKE_AWS}\nJWT_SECRET=${FAKE_SECRET_VALUE}`)
    const json = JSON.stringify(hits)
    for (const v of [FAKE_TFN, FAKE_AWS, FAKE_SECRET_VALUE]) expect(json).not.toContain(v)
    expect(hits.every((h: any) => Object.keys(h).sort().join() === 'line,type')).toBe(true)
  })

  test('forbidden names', () => {
    const f = scan.forbiddenReason
    for (const n of ['.env', '.env.local', '.env.production', '.ENV', 'node_modules', '.next', '.git', '.data', 'store.json', 'a.pem', 'a.key', 'id_rsa', 'id_ed25519', '.npmrc', 'x.sqlite', 'x.har', '.claude', '.audit-state', '.mcp.json'])
      expect(f(n)).not.toBeNull()
    for (const n of ['.env.example', 'package.json', 'index.ts', '.gitignore', '.vercelignore', 'key.ts', 'monkey.tsx']) expect(f(n)).toBeNull()
  })
})

// ===================== B. release script =====================
function run(args: string[]) {
  const r = spawnSync(process.execPath, [SCRIPT, ...args], { encoding: 'utf8' })
  return { code: r.status, out: r.stdout || '', err: r.stderr || '' }
}

function fixture(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rel-fixture-'))
  const w = (rel: string, body = 'ok\n') => {
    fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true })
    fs.writeFileSync(path.join(root, rel), body)
  }
  w('package.json', '{"name":"x"}\n')
  w('package-lock.json', '{}\n')
  w('src/app/page.tsx', 'export default function P(){return null}\n')
  w('public/robots.txt', 'User-agent: *\n')
  w('.env.example', 'JWT_SECRET=\nRESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx\n')
  w('.gitignore', '.env\n')
  w('docs/notes.md', 'hello\n')
  // things that exist in the working folder but are not on the allowlist
  w('.env.local', 'JWT_SECRET=' + FAKE_SECRET_VALUE + '\n')
  w('.data/store.json', '{"customers":[]}\n')
  w('.audit-state/ledger.json', '{}\n')
  w('.claude/x.md', 'x\n')
  w('.mcp.json', '{}\n')
  fs.mkdirSync(path.join(root, 'node_modules'))
  fs.mkdirSync(path.join(root, '.next'))
  w('.next/cache.txt', 'x\n')
  return root
}
const tmpZip = () => path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'rel-out-')), 'release.zip')
const listZip = (z: string) => spawnSync('unzip', ['-Z1', z], { encoding: 'utf8' }).stdout.split('\n').filter(Boolean)

describe('B. package-release.cjs', () => {
  test('builds the zip from the allowlist only, even though dangerous files sit in the folder', () => {
    const root = fixture()
    const out = tmpZip()
    const r = run(['--root', root, '--out', out])
    expect(r.code).toBe(0)
    const names = listZip(out)
    expect(names).toEqual(expect.arrayContaining(['package.json', 'src/app/page.tsx', 'public/robots.txt', '.env.example', '.gitignore']))
    expect(names.some((n) => /^\.env(\.local)?$/.test(n))).toBe(false)
    for (const bad of ['.data', '.audit-state', '.claude', '.mcp.json', 'node_modules', '.next']) expect(names.some((n) => n === bad || n.startsWith(bad + '/'))).toBe(false)
    expect(names).not.toContain('docs/notes.md') // deploy profile: docs are not shipped
    expect(run(['--root', root, '--out', tmpZip(), '--profile', 'source']).code).toBe(0)
  })

  test('source profile adds docs', () => {
    const root = fixture()
    const out = tmpZip()
    expect(run(['--root', root, '--out', out, '--profile', 'source']).code).toBe(0)
    expect(listZip(out)).toContain('docs/notes.md')
  })

  const plants: Array<[string, string, (root: string) => void, string, string?]> = [
    ['env file inside src', 'forbidden-env-file', (r) => fs.writeFileSync(path.join(r, 'src/.env.production'), 'A=1\n'), 'src/.env.production'],
    ['node_modules inside src', 'forbidden-node_modules', (r) => fs.mkdirSync(path.join(r, 'src/node_modules')), 'src/node_modules'],
    ['.next inside public', 'forbidden-next-build-output', (r) => fs.mkdirSync(path.join(r, 'public/.next')), 'public/.next'],
    ['.data inside src', 'forbidden-local-data-store', (r) => { fs.mkdirSync(path.join(r, 'src/.data')); }, 'src/.data'],
    ['pem key file', 'forbidden-private-key-file', (r) => fs.writeFileSync(path.join(r, 'src/server.pem'), 'x\n'), 'src/server.pem'],
    ['ssh key file', 'forbidden-private-key-file', (r) => fs.writeFileSync(path.join(r, 'public/id_rsa'), 'x\n'), 'public/id_rsa'],
    ['npmrc', 'forbidden-credentials-file', (r) => fs.writeFileSync(path.join(r, 'src/.npmrc'), 'x\n'), 'src/.npmrc'],
    ['database dump', 'forbidden-database-or-capture', (r) => fs.writeFileSync(path.join(r, 'public/backup.sqlite'), 'x\n'), 'public/backup.sqlite'],
    ['symlink to a secret outside the tree', 'symlink', (r) => fs.symlinkSync(path.join(r, '.env.local'), path.join(r, 'src/link.txt')), 'src/link.txt'],
    ['aws-shaped key in source', 'aws-access-key', (r) => fs.writeFileSync(path.join(r, 'src/a.ts'), `const k = '${FAKE_AWS}'\n`), 'src/a.ts:1'],
    ['named secret in source', 'named-secret-assignment', (r) => fs.writeFileSync(path.join(r, 'src/b.ts'), `// JWT_SECRET=${FAKE_SECRET_VALUE}\n`), 'src/b.ts:1', FAKE_SECRET_VALUE],
    ['real-looking TFN in a public file', 'real-looking-tfn', (r) => fs.writeFileSync(path.join(r, 'public/sample.txt'), `Client TFN ${FAKE_TFN}\n`), 'public/sample.txt:1', FAKE_TFN],
    ['PEM header inside a binary-ish file', 'private-key-block', (r) => fs.writeFileSync(path.join(r, 'public/blob.bin'), Buffer.from('\u0000\u0001-----BEGIN ' + 'PRIVATE KEY-----\n')), 'public/blob.bin'],
  ]
  test.each(plants.map((p) => [p[0], p[1], p[2], p[3], p[4] ?? ''] as [string, string, (root: string) => void, string, string]))('refuses: %s', (_label, type, plant, where, secret) => {
    const root = fixture()
    plant(root)
    const out = tmpZip()
    const r = run(['--root', root, '--out', out])
    expect(r.code).toBe(1)
    expect(r.err).toContain(type)
    expect(r.err).toContain(where)
    expect(fs.existsSync(out)).toBe(false)
    expect(fs.existsSync(out + '.partial')).toBe(false)
    // the planted values must never be echoed
    for (const v of [FAKE_AWS, FAKE_SECRET_VALUE, FAKE_TFN, secret].filter(Boolean) as string[]) {
      expect(r.err).not.toContain(v)
      expect(r.out).not.toContain(v)
    }
  })

  test('the TFN rule also guards the source profile (docs, tests)', () => {
    const root = fixture()
    fs.writeFileSync(path.join(root, 'docs/notes.md'), `tax file number ${FAKE_TFN}\n`)
    expect(run(['--root', root, '--check-only']).code).toBe(0) // docs are not in the deploy profile
    expect(run(['--root', root, '--check-only', '--profile', 'source']).code).toBe(1)
  })

  test('usage errors are exit 2 and write nothing; existing output needs --force', () => {
    const root = fixture()
    expect(run(['--root', root]).code).toBe(2)
    expect(run(['--root', root, '--profile', 'nope', '--check-only']).code).toBe(2)
    const out = tmpZip()
    expect(run(['--root', root, '--out', out]).code).toBe(0)
    expect(run(['--root', root, '--out', out]).code).toBe(2)
    expect(run(['--root', root, '--out', out, '--force']).code).toBe(0)
  })

  test('the REAL project tree passes the check, both profiles (nothing dangerous is on the allowlist)', () => {
    expect(run(['--check-only']).code).toBe(0)
    expect(run(['--check-only', '--profile', 'source']).code).toBe(0)
  })
})

// ===================== C. repo guard files =====================
describe('C. .vercelignore, Dependabot, CI', () => {
  const read = (p: string) => fs.readFileSync(path.join(ROOT, p), 'utf8')
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const yaml = require('js-yaml')

  test('.vercelignore keeps local data, tooling and env files out and does not exclude anything the build reads', () => {
    const lines = read('.vercelignore').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
    for (const must of ['.data', '.audit-state', '.claude', '.mcp.json', '.env', '.env.*', '!.env.example', '.git'])
      expect(lines).toContain(must)
    for (const buildNeeds of ['src', 'public', 'config', 'package.json', 'package-lock.json', 'next.config.js', 'tailwind.config.js', 'postcss.config.js', 'tsconfig.json', 'vercel.json', 'supabase'])
      expect(lines).not.toContain(buildNeeds)
  })

  test('Dependabot config parses and covers npm and github-actions, holding majors of the framework', () => {
    const d = yaml.load(read('.github/dependabot.yml'))
    expect(d.version).toBe(2)
    expect(d.updates.map((u: any) => u['package-ecosystem']).sort()).toEqual(['github-actions', 'npm'])
    const npm = d.updates.find((u: any) => u['package-ecosystem'] === 'npm')
    expect(npm.ignore.map((i: any) => i['dependency-name'])).toEqual(expect.arrayContaining(['next', 'react', 'react-dom']))
  })

  test('CI workflow is read-only, uses no secrets and no privileged triggers, and runs the gates', () => {
    const raw = read('.github/workflows/ci.yml').split('\n').filter((l) => !l.trim().startsWith('#')).join('\n')
    const w = yaml.load(raw)
    expect(w.permissions).toEqual({ contents: 'read' })
    expect(raw).not.toMatch(/\bsecrets\./)
    expect(raw).not.toMatch(/pull_request_target|workflow_run|self-hosted/)
    const steps = JSON.stringify(w.jobs.verify.steps)
    for (const gate of ['npm ci', 'tsc --noEmit', 'npm run lint', 'jest', 'npm audit --omit=dev', 'package-release.cjs --check-only']) expect(steps).toContain(gate)
    // checkout must not leave the token in the git config
    expect(JSON.stringify(w.jobs.verify.steps[0])).toContain('persist-credentials')
  })

  test('.env.example documents the new switches only as comments (no live values)', () => {
    const ex = read('.env.example')
    for (const k of ['AUDIT_RETENTION_DAYS', 'AUDIT_SECURITY_RETENTION_DAYS', 'SECURITY_ALERT_BULK_EXPORT', 'SECURITY_ALERT_KILL_SWITCH', 'SECURITY_ALERT_SIGNATURE_BURST', 'SECURITY_ALERT_CRON_STALE'])
      expect(ex).toMatch(new RegExp(`^# ${k}=`, 'm'))
  })
})

// ===================== shared mocks for D, E, F =====================
const audits: Array<{ actor: string; action: string; detail: any }> = []
const FAKE_NAME = 'Zelda Testperson'
const FAKE_PHONE = '+61 400 555 019'
const sessionOk = jest.fn(() => true)
jest.mock('@/lib/will/auth', () => ({ sessionValid: async () => sessionOk() }))
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    audit: async (actor: string, action: string, detail: unknown) => { audits.push({ actor, action, detail: JSON.parse(JSON.stringify(detail ?? null)) }) },
    allCustomers: async () => [{ id: 'c1', name: FAKE_NAME, waId: FAKE_PHONE.replace(/\D/g, ''), state: 'NEW', income: 'low', paid: false, lang: 'en' }],
    allMessages: async () => [{ id: 'm1', customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: `hello it is ${FAKE_NAME}`, createdAt: '2026-10-30T01:00:00Z' }],
    listTasks: async () => [],
    listAudit: async () => [],
    searchCustomers: async () => [],
    listChatPage: async () => [],
  }),
}))
jest.mock('@/lib/will/channel', () => ({
  fetchWaMedia: async () => ({ ok: true, body: new ArrayBuffer(4), mime: 'image/png' }),
}))

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createSession } = require('@/lib/crm-store')

function req(url: string, extraHeaders: Record<string, string> = {}) {
  const token = createSession()
  return new Request(url, {
    headers: {
      cookie: `crm_session=${token}`,
      'x-real-ip': '203.0.113.77',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0 Safari/537.36',
      'x-vercel-ip-country': 'AU',
      ...extraHeaders,
    },
  })
}
const TOKEN_RAW_SID = (r: Request) => {
  const c = (r.headers.get('cookie') || '').split('=')[1]
  return JSON.parse(Buffer.from(c.slice(0, c.lastIndexOf('.')), 'base64url').toString()).sid as string
}

beforeEach(() => {
  audits.length = 0
  sessionOk.mockReturnValue(true)
  jest.resetModules
})

// ===================== D. read audit =====================
describe('D. bulk-read audit rows', () => {
  test('export writes one data_read row with counts, masked IP and a session tag, and no customer data', async () => {
    const { GET } = require('@/app/api/will/export/route')
    const { __resetAccessLogState } = require('@/lib/will/access-log')
    __resetAccessLogState()
    const r = req('http://localhost/api/will/export?all=1&format=json')
    const res = await GET(r)
    expect(res.status).toBe(200)
    const body = await res.text()
    expect(body).toContain(FAKE_NAME) // the export itself still works and carries the data
    const rows = audits.filter((a) => a.action === 'data_read')
    expect(rows).toHaveLength(1)
    expect(rows[0].actor).toBe('access')
    expect(rows[0].detail).toMatchObject({ route: 'export', format: 'json', all: true, conversations: 1, messages: 1 })
    expect(rows[0].detail.by.ip).toBe('203.0.113.x')
    expect(rows[0].detail.by.device).toBe('Chrome on macOS')
    expect(rows[0].detail.by.sid).toMatch(/^[a-f0-9]{12}$/)
    const flat = JSON.stringify(rows[0])
    for (const v of [FAKE_NAME, FAKE_PHONE, FAKE_PHONE.replace(/\D/g, ''), '203.0.113.77']) expect(flat).not.toContain(v)
    // the raw sid claim (a revocation handle) is never written
    expect(flat).not.toContain(TOKEN_RAW_SID(r))
  })

  test('an unauthenticated export call writes nothing and returns 401', async () => {
    sessionOk.mockReturnValue(false)
    const { GET } = require('@/app/api/will/export/route')
    const res = await GET(req('http://localhost/api/will/export?all=1'))
    expect(res.status).toBe(401)
    expect(audits).toEqual([])
  })

  test('media view logs a hash of the id, never the id', async () => {
    const { GET } = require('@/app/api/will/media/[id]/route')
    const id = 'wamid_1234567890abcdef'
    const res = await GET(req('http://localhost/api/will/media/' + id), { params: Promise.resolve({ id }) })
    expect(res.status).toBe(200)
    const row = audits.find((a) => a.action === 'data_read')!
    expect(row.detail.route).toBe('media')
    expect(row.detail.idHash).toMatch(/^[a-f0-9]{10}$/)
    expect(JSON.stringify(row)).not.toContain(id)
  })

  test('search logs length and kind only, never the text (a phone number or a name)', async () => {
    const { GET } = require('@/app/api/will/search/route')
    const { __resetAccessLogState } = require('@/lib/will/access-log')
    __resetAccessLogState()
    await GET(req('http://localhost/api/will/search?q=' + encodeURIComponent(FAKE_PHONE)))
    const row = audits.find((a) => a.action === 'data_read')!
    expect(row.detail).toMatchObject({ route: 'search', qKind: 'digits' })
    expect(row.detail.qLen).toBe(FAKE_PHONE.length)
    expect(JSON.stringify(row)).not.toContain('555')
    expect(JSON.stringify(row)).not.toContain('400')
    __resetAccessLogState()
    audits.length = 0
    await GET(req('http://localhost/api/will/search?q=' + encodeURIComponent(FAKE_NAME)))
    expect(JSON.stringify(audits)).not.toContain('Zelda')
    expect(JSON.stringify(audits)).not.toContain('Testperson')
  })

  test('the whitelist drops free text a future caller might pass', async () => {
    const { recordDataRead, __resetAccessLogState } = require('@/lib/will/access-log')
    __resetAccessLogState()
    await recordDataRead(req('http://localhost/x'), 'export', { format: 'txt', customerName: FAKE_NAME, qText: FAKE_PHONE, hours: 72, all: false, note: 'has spaces and PII' })
    const d = audits[0].detail
    expect(Object.keys(d).sort()).toEqual(['all', 'by', 'format', 'hours', 'route'])
    // string values must be short slugs, so a name or number cannot ride in a whitelisted key either
    audits.length = 0
    await recordDataRead(req('http://localhost/x'), 'export', { format: FAKE_NAME })
    expect(JSON.stringify(audits)).not.toContain('Zelda')
  })

  test('chats and search are throttled per session, the next row says how many calls it covers', async () => {
    const { recordDataRead, __resetAccessLogState } = require('@/lib/will/access-log')
    __resetAccessLogState()
    const r = req('http://localhost/x') // one session
    let now = 1_000_000
    const spy = jest.spyOn(Date, 'now').mockImplementation(() => now)
    try {
      expect(await recordDataRead(r, 'chats', { offset: 0 })).toBe(true)
      now += 1000
      expect(await recordDataRead(r, 'chats', { offset: 100 })).toBe(false)
      expect(await recordDataRead(r, 'chats', { offset: 200 })).toBe(false)
      now += 61_000
      expect(await recordDataRead(r, 'chats', { offset: 300 })).toBe(true)
      expect(audits[audits.length - 1].detail.calls).toBe(3)
      // a different session is not throttled by this one
      expect(await recordDataRead(req('http://localhost/x'), 'chats', { offset: 0 })).toBe(true)
      // export and documents are never throttled
      now += 1
      expect(await recordDataRead(r, 'export', {})).toBe(true)
      expect(await recordDataRead(r, 'export', {})).toBe(true)
    } finally { spy.mockRestore() }
  })

  test('a failing audit write never blocks the read', async () => {
    jest.resetModules()
    jest.doMock('@/lib/will/store', () => ({ getStore: () => ({ audit: async () => { throw new Error('db down') } }) }))
    const { recordDataRead } = require('@/lib/will/access-log')
    await expect(recordDataRead(req('http://localhost/x'), 'export', {})).resolves.toBe(false)
    jest.dontMock('@/lib/will/store')
  })

  test('searchKind and shortHash', () => {
    const { searchKind, shortHash } = require('@/lib/will/access-log')
    expect(searchKind('+61 400 555 019')).toBe('digits')
    expect(searchKind('Zelda')).toBe('text')
    expect(searchKind('Zelda 2')).toBe('mixed')
    expect(shortHash('abc')).toMatch(/^[a-f0-9]{10}$/)
    expect(shortHash('abc')).toBe(shortHash('abc'))
  })

  test('the routes that read customer data all call recordDataRead (guards against a route being added without it)', () => {
    const files: Record<string, string> = {
      'src/app/api/will/export/route.ts': "recordDataRead(req, 'export'",
      'src/app/api/will/media/[id]/route.ts': "recordDataRead(req, 'media'",
      'src/app/api/will/search/route.ts': "recordDataRead(req, 'search'",
      'src/app/api/will/chats/route.ts': "recordDataRead(req, 'chats'",
      'src/app/api/crm/file/route.ts': "recordDataRead(req, 'crm_file'",
      'src/app/api/crm/leads/route.ts': "recordDataRead(req, 'leads_csv'",
      'src/app/api/crm/clients/route.ts': "recordDataRead(req, 'clients'",
    }
    for (const [f, needle] of Object.entries(files)) expect(fs.readFileSync(path.join(ROOT, f), 'utf8')).toContain(needle)
  })
})

// ===================== E. retention config and actor stamp =====================
describe('E. retention as config and actor identity', () => {
  const cfg = require('@/lib/will/audit-config')

  test('defaults keep today\'s behaviour: 90 days for everything', () => {
    expect(cfg.auditRetention({})).toEqual({ ordinaryDays: 90, securityDays: 90 })
  })
  test('settings apply, are clamped, and garbage falls back', () => {
    expect(cfg.auditRetention({ AUDIT_RETENTION_DAYS: '60', AUDIT_SECURITY_RETENTION_DAYS: '365' })).toEqual({ ordinaryDays: 60, securityDays: 365 })
    expect(cfg.auditRetention({ AUDIT_RETENTION_DAYS: '1' }).ordinaryDays).toBe(30)
    expect(cfg.auditRetention({ AUDIT_RETENTION_DAYS: '999999' }).ordinaryDays).toBe(3650)
    expect(cfg.auditRetention({ AUDIT_RETENTION_DAYS: 'abc', AUDIT_SECURITY_RETENTION_DAYS: '1.5' })).toEqual({ ordinaryDays: 90, securityDays: 90 })
    // security evidence can never be kept for LESS time than the noise
    expect(cfg.auditRetention({ AUDIT_RETENTION_DAYS: '200', AUDIT_SECURITY_RETENTION_DAYS: '40' })).toEqual({ ordinaryDays: 200, securityDays: 200 })
  })

  test('runAuditRetention on the file store: security rows outlive ordinary rows, recent rows stay', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fs-store-'))
    const prev = process.cwd()
    process.chdir(dir)
    try {
      await jest.isolateModulesAsync(async () => {
        jest.unmock('@/lib/will/store')
        const { FileStore } = require('@/lib/will/store-file')
        const s = new FileStore()
        const old = (days: number) => new Date(Date.now() - days * 86400_000).toISOString()
        const dbFile = path.join(dir, '.data', 'store.json')
        await s.audit('scheduler', 'seed_row', {}) // creates the file
        const db = JSON.parse(fs.readFileSync(dbFile, 'utf8'))
        const mk = (actor: string, action: string, days: number) => ({ id: `${actor}-${action}-${days}`, actor, action, detail: null, at: old(days) })
        db.audit = [mk('assistant', 'decision', 120), mk('auth', 'crm_password_failed', 120), mk('owner', 'kill_switch_on', 120), mk('access', 'data_read', 120), mk('channel', 'inbound_signature_rejected', 120), mk('auth', 'crm_otp_ok', 400), mk('assistant', 'decision', 10), mk('auth', 'crm_otp_ok', 10)]
        fs.writeFileSync(dbFile, JSON.stringify(db))
        const s2 = new FileStore() // fresh cache from disk
        void s2
      })
      // second pass: a clean module graph that loads the prepared file
      await jest.isolateModulesAsync(async () => {
        const { FileStore } = require('@/lib/will/store-file')
        const { runAuditRetention } = require('@/lib/will/audit-config')
        const s = new FileStore()
        const removed = await runAuditRetention(s, { AUDIT_SECURITY_RETENTION_DAYS: '365' })
        const left = (await s.allAudit()).map((r: any) => `${r.actor}:${r.action}`).sort()
        // the 120 day ordinary row is gone, the 400 day security row is gone, the 120 day security rows stay
        expect(removed).toBe(2)
        expect(left).toEqual(expect.arrayContaining(['auth:crm_password_failed', 'owner:kill_switch_on', 'access:data_read', 'channel:inbound_signature_rejected', 'assistant:decision', 'auth:crm_otp_ok']))
        expect(left.filter((x: string) => x === 'assistant:decision')).toHaveLength(1)
        expect(left.filter((x: string) => x === 'auth:crm_otp_ok')).toHaveLength(1)
        // defaults: 90 days for everything, including security rows
        const removed2 = await runAuditRetention(s, {})
        expect(removed2).toBe(4)
      })
    } finally { process.chdir(prev) }
  })

  test('actor stamp: owner and access rows carry who, system rows and existing detail are untouched', async () => {
    const { runWithAuditWho, stampAuditDetail } = require('@/lib/will/audit-context')
    const who = { sid: 'abcdef012345', ip: '203.0.113.x', device: 'Chrome on macOS', country: 'AU' }
    expect(stampAuditDetail('owner', { a: 1 })).toEqual({ a: 1 }) // no context: unchanged
    await runWithAuditWho(who, async () => {
      expect(stampAuditDetail('owner', { a: 1 })).toEqual({ a: 1, by: who })
      expect(stampAuditDetail('owner', undefined)).toEqual({ by: who })
      expect(stampAuditDetail('owner', null)).toEqual({ by: who })
      expect(stampAuditDetail('scheduler', { a: 1 })).toEqual({ a: 1 })
      expect(stampAuditDetail('assistant', { a: 1 })).toEqual({ a: 1 })
      expect(stampAuditDetail('owner', { by: 'x' })).toEqual({ by: 'x' }) // never overwritten
      expect(stampAuditDetail('owner', [1, 2])).toEqual([1, 2])
      expect(stampAuditDetail('owner', 'text')).toBe('text')
      await Promise.resolve() // survives an await
      expect(stampAuditDetail('owner', {})).toEqual({ by: who })
    })
    expect(stampAuditDetail('owner', {})).toEqual({})
  })

  test('both stores stamp inside audit(), and the actions route wraps every request', () => {
    const f = (p: string) => fs.readFileSync(path.join(ROOT, p), 'utf8')
    expect(f('src/lib/will/store-supabase.ts')).toContain('stampAuditDetail(actor, detail)')
    expect(f('src/lib/will/store-file.ts')).toContain('stampAuditDetail(actor, detail)')
    expect(f('src/app/api/will/actions/route.ts')).toMatch(/runWithAuditWho\(auditWhoFromRequest\(req\), \(\) => handlePost\(req\)\)/)
  })

  test('sessionTag never exposes the raw sid and ties to the login row', () => {
    const { sessionTag } = require('@/lib/will/audit-context')
    const tok = createSession()
    const tag = sessionTag(tok)
    expect(tag).toMatch(/^[a-f0-9]{12}$/)
    expect(tok).not.toContain(tag as string)
    expect(sessionTag(createSession())).not.toBe(tag) // sessions differ
    expect(sessionTag(undefined)).toBeUndefined()
    expect(sessionTag('garbage')).toBeUndefined()
    expect(fs.readFileSync(path.join(ROOT, 'src/app/api/crm/verify-otp/route.ts'), 'utf8')).toContain("'crm_session_started'")
  })

  test('delete_customer no longer writes the full WhatsApp number to the audit log (F-08)', () => {
    const src = fs.readFileSync(path.join(ROOT, 'src/app/api/will/actions/route.ts'), 'utf8')
    const line = src.split('\n').find((l) => l.includes("'customer_deleted'")) as string
    expect(line).toContain('slice(-4)')
    expect(line).not.toMatch(/waId: customer\.waId/)
  })

  test('the scheduler purge is wired to the config, not a constant', () => {
    const s = fs.readFileSync(path.join(ROOT, 'src/lib/will/scheduler.ts'), 'utf8')
    expect(s).toContain('runAuditRetention(store)')
    expect(s).not.toContain('purgeAudit(90 * 24')
  })
})

// ===================== F. alert hooks =====================
describe('F. alerts are off by default', () => {
  const a = require('@/lib/will/security-alerts')
  const cfg = require('@/lib/will/audit-config')
  beforeEach(() => a.__resetAlertState())

  test('flags: only "1" or "true" enable', () => {
    for (const k of ['bulk_export', 'kill_switch', 'signature_burst', 'cron_stale']) {
      expect(cfg.alertEnabled(k, {})).toBe(false)
    }
    const name = 'SECURITY_ALERT_BULK_EXPORT'
    for (const v of ['', '0', 'false', 'yes', 'on', ' ']) expect(cfg.alertEnabled('bulk_export', { [name]: v })).toBe(false)
    for (const v of ['1', 'true', 'TRUE', ' 1 ']) expect(cfg.alertEnabled('bulk_export', { [name]: v })).toBe(true)
  })

  test('nothing is sent with default env; one email with the flag; throttled after that', async () => {
    const send = jest.fn(async () => {})
    expect(await a.raiseAlert('kill_switch', 's', '<p>b</p>', { env: {}, send })).toBe(false)
    expect(send).not.toHaveBeenCalled()
    const env = { SECURITY_ALERT_KILL_SWITCH: '1' }
    expect(await a.raiseAlert('kill_switch', 's', '<p>b</p>', { env, send, now: 1_000_000, who: { sid: 'abc', ip: '1.2.3.x', device: 'd' } })).toBe(true)
    expect(await a.raiseAlert('kill_switch', 's', '<p>b</p>', { env, send, now: 1_000_000 + 60_000 })).toBe(false)
    expect(await a.raiseAlert('kill_switch', 's', '<p>b</p>', { env, send, now: 1_000_000 + 16 * 60_000 })).toBe(true)
    expect(send).toHaveBeenCalledTimes(2)
  })

  test('a sender that throws does not throw out of the alert', async () => {
    const send = jest.fn(async () => { throw new Error('resend down') })
    await expect(a.raiseAlert('kill_switch', 's', 'b', { env: { SECURITY_ALERT_KILL_SWITCH: '1' }, send })).resolves.toBe(false)
  })

  test('alert body carries no markup injection from the who fields', async () => {
    const send = jest.fn(async (_s: string, _h: string) => {})
    await a.raiseAlert('kill_switch', 's', '<p>b</p>', { env: { SECURITY_ALERT_KILL_SWITCH: '1' }, send, who: { sid: '<script>x</script>', ip: '"><img>', device: "a'b" } })
    const html = send.mock.calls[0][1]
    expect(html).not.toMatch(/<script|<img/)
  })

  test('signature failures: counted always, alert at the threshold only when enabled', async () => {
    const send = jest.fn(async () => {})
    for (let i = 0; i < 10; i++) await a.noteSignatureFailure({ env: {}, send, now: 5_000_000 + i })
    expect(send).not.toHaveBeenCalled() // disabled
    a.__resetAlertState()
    const env = { SECURITY_ALERT_SIGNATURE_BURST: '1', SECURITY_ALERT_SIGNATURE_THRESHOLD: '5' }
    for (let i = 0; i < 4; i++) await a.noteSignatureFailure({ env, send, now: 6_000_000 + i })
    expect(send).not.toHaveBeenCalled()
    await a.noteSignatureFailure({ env, send, now: 6_000_010 })
    expect(send).toHaveBeenCalledTimes(1)
    await a.noteSignatureFailure({ env, send, now: 6_000_020 })
    expect(send).toHaveBeenCalledTimes(1) // throttled
    // the window rolls: failures older than an hour do not count
    a.__resetAlertState()
    for (let i = 0; i < 4; i++) await a.noteSignatureFailure({ env, send, now: 1000 + i })
    expect(await a.noteSignatureFailure({ env, send, now: 1000 + 2 * 3600_000 })).toBe(1)
  })

  test('cron staleness: pure check and gated hook', async () => {
    const now = Date.parse('2026-11-02T10:00:00Z')
    expect(a.cronIsStale('2026-11-02T09:50:00Z', now, 20)).toBe(false)
    expect(a.cronIsStale('2026-11-02T09:30:00Z', now, 20)).toBe(true)
    expect(a.cronIsStale(undefined, now, 20)).toBe(true)
    expect(a.cronIsStale('not a date', now, 20)).toBe(true)
    const send = jest.fn(async () => {})
    expect(await a.checkCronStale('2026-11-02T08:00:00Z', { env: {}, send, now })).toBe(false) // disabled
    expect(await a.checkCronStale('2026-11-02T09:55:00Z', { env: { SECURITY_ALERT_CRON_STALE: '1' }, send, now })).toBe(false) // fresh
    expect(await a.checkCronStale('2026-11-02T08:00:00Z', { env: { SECURITY_ALERT_CRON_STALE: '1' }, send, now })).toBe(true)
    expect(send).toHaveBeenCalledTimes(1)
  })

  test('export triggers the bulk_export alert only when the flag is set', async () => {
    jest.resetModules()
    const sent: string[] = []
    jest.doMock('@/lib/security-watch', () => ({
      maskIp: (ip: string) => ip.split('.').slice(0, 3).join('.') + '.x',
      describeDevice: () => 'Chrome on macOS',
      sendSecurityEmail: async (s: string) => { sent.push(s) },
    }))
    const { recordDataRead, __resetAccessLogState } = require('@/lib/will/access-log')
    const al = require('@/lib/will/security-alerts')
    __resetAccessLogState(); al.__resetAlertState()
    delete process.env.SECURITY_ALERT_BULK_EXPORT
    await recordDataRead(req('http://localhost/x'), 'export', {})
    expect(sent).toEqual([])
    process.env.SECURITY_ALERT_BULK_EXPORT = '1'
    try {
      await recordDataRead(req('http://localhost/x'), 'export', {})
      expect(sent).toHaveLength(1)
      expect(sent[0]).toMatch(/export/i)
    } finally { delete process.env.SECURITY_ALERT_BULK_EXPORT }
    jest.dontMock('@/lib/security-watch')
  })
})
