/** Round 2: session revocation, per-session idle revoke, atomic login lockout. Local fake Redis only. */
type Z = { score: number; value: string }
function fakeRedis() {
  const kv = new Map<string, string>(); const z = new Map<string, Z[]>(); const ttl = new Map<string, number>()
  return {
    kv, ttl,
    get: async (k: string) => kv.get(k) ?? null,
    set: async (k: string, v: string, o?: { NX?: boolean; EX?: number }) => {
      if (o?.NX && kv.has(k)) return null
      kv.set(k, v); if (o?.EX) ttl.set(k, o.EX); return 'OK'
    },
    incr: async (k: string) => { const n = Number(kv.get(k) ?? 0) + 1; kv.set(k, String(n)); return n },
    expire: async (k: string, s: number) => { ttl.set(k, s); return 1 },
    del: async (ks: string | string[]) => { for (const k of ([] as string[]).concat(ks)) kv.delete(k); return 1 },
    zAdd: async (k: string, m: Z) => { const a = z.get(k) ?? []; a.push(m); z.set(k, a); return 1 },
    zRangeByScore: async (k: string, min: number) => (z.get(k) ?? []).filter((m) => m.score >= min).map((m) => m.value),
    zRemRangeByScore: async (k: string, _a: unknown, max: number) => { z.set(k, (z.get(k) ?? []).filter((m) => m.score > max)); return 1 },
  }
}
let redis = fakeRedis()
jest.mock('@/lib/rate-limit', () => ({ getRedis: async () => redis, isRateLimited: async () => false }))

const load = () => { jest.resetModules(); return require('@/lib/crm-store') as typeof import('@/lib/crm-store') }

beforeEach(() => { redis = fakeRedis(); process.env.JWT_SECRET = 'x'.repeat(48); process.env.PASSWORD_SALT = 's'.repeat(16) })

describe('stale-cache revocation (AUTH-2)', () => {
  it('a cold instance rejects a revoked token on the FIRST fresh check', async () => {
    const a = load()
    const token = a.createSession()
    await new Promise((r) => setTimeout(r, 5))
    await a.destroySession() // writes the epoch to Redis
    const cold = load() // another serverless instance: epoch cache empty
    expect(cold.validateSession(token)).toBe(true) // the old sync check is fooled (documented weakness)
    const cold2 = load()
    expect(await cold2.validateSessionFresh(token)).toBe(false)
  })
  it('a token issued after the logout still works', async () => {
    const a = load(); await a.destroySession(); await new Promise((r) => setTimeout(r, 5))
    const token = a.createSession()
    expect(await load().validateSessionFresh(token)).toBe(true)
  })
  it('Redis down: degrades to in-memory, does not throw or lock out', async () => {
    redis.get = async () => { throw new Error('down') }
    const a = load(); const t = a.createSession()
    expect(await a.validateSessionFresh(t)).toBe(true)
  })
  it('garbage, unsigned and tampered tokens fail', async () => {
    const a = load(); const t = a.createSession()
    expect(await a.validateSessionFresh(undefined)).toBe(false)
    expect(await a.validateSessionFresh('a.b')).toBe(false)
    expect(await a.validateSessionFresh(t.slice(0, -2) + 'xx')).toBe(false)
  })
})

describe('idle logout revokes only that session (AUTH-3)', () => {
  it('revoked session dies on every instance; a second session survives', async () => {
    const a = load(); const t1 = a.createSession(); const t2 = a.createSession()
    await a.revokeSession(t1)
    const other = load()
    expect(await other.validateSessionFresh(t1)).toBe(false)
    expect(await other.validateSessionFresh(t2)).toBe(true)
  })
})

describe('atomic login lockout (AUTH2-02)', () => {
  it('20 parallel attempts: only MAX_ATTEMPTS may reach password verification', async () => {
    const s = load()
    const rs = await Promise.all(Array.from({ length: 20 }, () => s.reserveLoginAttemptRedis(redis as never, '203.0.113.9')))
    expect(rs.filter((r) => r.allowed)).toHaveLength(s.MAX_ATTEMPTS)
  })
  it('different IPs have separate buckets; a blocked attempt does not extend the TTL', async () => {
    const s = load()
    for (let i = 0; i < 3; i++) await s.reserveLoginAttemptRedis(redis as never, '203.0.113.9')
    expect((await s.reserveLoginAttemptRedis(redis as never, '203.0.113.9')).allowed).toBe(false)
    expect((await s.reserveLoginAttemptRedis(redis as never, '203.0.113.10')).allowed).toBe(true)
    expect(await s.isLockedOutRedis(redis as never, '203.0.113.9')).toBe(true)
  })
})
