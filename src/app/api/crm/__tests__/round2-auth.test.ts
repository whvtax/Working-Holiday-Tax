/** Round 2 CRM auth tests: login burst, error-text leaks, referral validation, leads export audit. Synthetic data only. */
import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

const verifyCalls = jest.fn()
const kv = new Map<string, string>()
const redis = {
  get: async (k: string) => kv.get(k) ?? null,
  set: async (k: string, v: string, o?: { NX?: boolean }) => { if (o?.NX && kv.has(k)) return null; kv.set(k, v); return 'OK' },
  incr: async (k: string) => { const n = Number(kv.get(k) ?? 0) + 1; kv.set(k, String(n)); return n },
  expire: async () => 1,
  del: async (ks: string | string[]) => { for (const k of ([] as string[]).concat(ks)) kv.delete(k); return 1 },
}
jest.mock('@/lib/rate-limit', () => ({ getRedis: async () => redis }))
jest.mock('@/lib/security-watch', () => ({ recordLoginEvent: jest.fn(), requestInfo: () => ({}), checkNewDevice: jest.fn(), sendSecurityEmail: jest.fn() }))
jest.mock('@/lib/crm-store', () => {
  const actual = jest.requireActual('@/lib/crm-store')
  return { ...actual, verifyPassword: (...a: unknown[]) => { verifyCalls(...a); return false }, hashPassword: () => 'h', validateSessionFresh: async (t?: string) => t === 'good' }
})
const audit = jest.fn()
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ audit }) }))
jest.mock('@/lib/leads', () => ({ getLeads: async () => [{ fullName: '=1+1', email: 'a@b.test', whatsapp: '+61000', lang: 'en', source: 'x', createdAt: '2026-01-01', unsubscribed: false }], setLeadUnsubscribed: jest.fn() }))
const sbResult = { data: null as unknown, error: { message: 'relation "secret_table" violates SERVICE_ROLE detail' } }
const chain: Record<string, unknown> = {}
for (const m of ['select', 'update', 'eq', 'order', 'insert']) chain[m] = () => chain
chain.maybeSingle = async () => sbResult
chain.single = async () => sbResult
;(chain as { then: unknown }).then = (res: (v: unknown) => void) => res(sbResult)
jest.mock('@/lib/supabase', () => ({ getSupabase: () => ({ from: () => chain }) }))

const jsonReq = (url: string, method: string, body: unknown, cookie = 'good') =>
  new NextRequest(`http://localhost${url}`, { method, body: JSON.stringify(body), headers: { 'content-type': 'application/json', cookie: `crm_session=${cookie}` } })

beforeEach(() => { kv.clear(); verifyCalls.mockClear(); audit.mockClear(); process.env.CRM_PASSWORD = 'pw'; process.env.PASSWORD_SALT = 'salt' })

describe('login burst', () => {
  it('30 parallel wrong passwords from one IP verify at most 3 times', async () => {
    const { POST } = require('@/app/api/crm/login/route')
    const mk = () => new NextRequest('http://localhost/api/crm/login', { method: 'POST', body: JSON.stringify({ password: 'guess' }), headers: { 'x-real-ip': '198.51.100.7', 'content-type': 'application/json' } })
    const rs = await Promise.all(Array.from({ length: 30 }, () => POST(mk())))
    expect(verifyCalls.mock.calls.length).toBeLessThanOrEqual(3)
    expect(rs.every((r: Response) => r.status === 401)).toBe(true)
  })
})

describe('database error text is not returned', () => {
  it.each([
    ['partners GET', () => require('@/app/api/crm/partners/route').GET(jsonReq('/api/crm/partners', 'GET', undefined))],
    ['partners POST', () => require('@/app/api/crm/partners/route').POST(jsonReq('/api/crm/partners', 'POST', { name: 'Acme' }))],
    ['referral-payment', () => require('@/app/api/crm/clients/[id]/referral-payment/route').PATCH(jsonReq('/x', 'PATCH', { paid: true }), { params: Promise.resolve({ id: 'c1' }) })],
  ])('%s', async (_n, run) => {
    const res = await run()
    const text = await res.text()
    expect(res.status).toBe(500)
    expect(text).not.toMatch(/secret_table|SERVICE_ROLE/)
  })
})

describe('referral partnerId validation', () => {
  const patch = (body: unknown) => require('@/app/api/crm/clients/[id]/referral/route').PATCH(jsonReq('/x', 'PATCH', body), { params: Promise.resolve({ id: 'c1' }) })
  it.each([[{ partnerId: { $ne: null } }], [{ partnerId: 'a'.repeat(200) }], [{ partnerId: 'x" or 1=1' }], [{ partnerId: 5 }]])('rejects %j', async (b) => {
    expect((await patch(b)).status).toBe(400)
  })
})

describe('leads export', () => {
  it('neutralises the formula cell and writes an audit entry', async () => {
    const res = await require('@/app/api/crm/leads/route').GET(jsonReq('/api/crm/leads?csv=1', 'GET', undefined))
    expect(await res.text()).toContain(`"'=1+1"`)
    expect(audit).toHaveBeenCalledWith('owner', 'bulk_export_downloaded', expect.objectContaining({ kind: 'crm_leads_csv', rows: 1 }))
  })
  it('refuses without a session', async () => {
    expect((await require('@/app/api/crm/leads/route').GET(jsonReq('/api/crm/leads?csv=1', 'GET', undefined, 'bad'))).status).toBe(401)
  })
})

// Every exported handler must reach an auth check before it touches data or the body.
describe('per-method auth inventory', () => {
  const ROOT = path.join(process.cwd(), 'src/app/api')
  const PUBLIC = new Set(['abn-form', 'super-form', 'tfn-form', 'tax-form', 'tax-form/fix', 'tax-form/link', 'tax-form/upload', 'analytics/funnel', 'google-reviews', 'crm/login', 'crm/verify-otp', 'crm/logout', 'will/webhook'])
  const walk = (d: string, out: string[] = []): string[] => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p, out) : e.name === 'route.ts' && out.push(p) } return out }
  const AUTH = /(validateSession(Fresh)?|sessionValid|cronAuthorized|\bauth)\(/
  const cases: [string, string, string][] = []
  for (const f of walk(ROOT)) {
    const id = path.relative(ROOT, path.dirname(f)).split(path.sep).join('/')
    if (PUBLIC.has(id)) continue
    const src = fs.readFileSync(f, 'utf8')
    const re = /export async function (GET|POST|PUT|PATCH|DELETE)\b[^{]*\{/g
    let m: RegExpExecArray | null
    while ((m = re.exec(src))) {
      const body = src.slice(m.index + m[0].length)
      const next = body.search(/\nexport /)
      const fn = next === -1 ? body : body.slice(0, next)
      // will/actions: POST is a try/catch wrapper around handlePost, whose first statement is the session check.
      cases.push([id, m[1], fn.includes('handlePost(req)') ? src.slice(src.indexOf('async function handlePost')) : fn])
    }
  }
  it('finds handlers', () => expect(cases.length).toBeGreaterThan(40))
  it.each(cases)('%s %s authenticates before reading input or data', (_id, _m, body) => {
    const a = body.search(AUTH)
    expect(a).toBeGreaterThanOrEqual(0)
    const firstUse = body.search(/req\.json\(|req\.text\(|getStore\(|getSupabase\(|await import\(|\bdb\./)
    if (firstUse !== -1) expect(a).toBeLessThan(firstUse)
  })
})
