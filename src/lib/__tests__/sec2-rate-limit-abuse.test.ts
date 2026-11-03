/**
 * Security round 2 (sec2-cron-abuse): rate limiting under abuse and outage.
 * Synthetic data only. No network: `redis` is replaced by a fake client.
 */
const impl: { multi: () => unknown } = { multi: () => { throw new Error('unset') } }
const fakeClient = {
  isReady: true,
  on: jest.fn(),
  connect: jest.fn().mockResolvedValue(undefined),
  multi: () => impl.multi(),
}
jest.mock('redis', () => ({ createClient: () => fakeClient }))

import {
  isRateLimited, consumeByteBudget, rateLimitIdentity,
  _resetRateLimitMemoryForTests, _memSizesForTests,
} from '@/lib/rate-limit'
import { ipRateLimitScope, getRateLimitIp } from '@/lib/get-ip'

const savedUrl = process.env.REDIS_URL
const savedKv = process.env.KV_URL
beforeEach(() => {
  _resetRateLimitMemoryForTests()
  jest.spyOn(console, 'error').mockImplementation(() => {})
  jest.spyOn(console, 'warn').mockImplementation(() => {})
})
afterEach(() => {
  jest.restoreAllMocks()
  if (savedUrl === undefined) delete process.env.REDIS_URL; else process.env.REDIS_URL = savedUrl
  if (savedKv === undefined) delete process.env.KV_URL; else process.env.KV_URL = savedKv
})

describe('R2-3: an IPv6 client cannot mint a fresh bucket per request', () => {
  it('collapses every address inside one /64 to the same key', () => {
    const a = ipRateLimitScope('2001:db8:abcd:12::1')
    const b = ipRateLimitScope('2001:db8:abcd:12:ffff:ffff:ffff:ffff')
    const c = ipRateLimitScope('2001:0db8:ABCD:0012:0:0:0:7')
    expect(a).toBe(b)
    expect(a).toBe(c)
    expect(a).toBe('2001:db8:abcd:12::/64')
  })
  it('keeps two different /64 prefixes apart', () => {
    expect(ipRateLimitScope('2001:db8:abcd:12::1')).not.toBe(ipRateLimitScope('2001:db8:abcd:13::1'))
  })
  it('leaves IPv4 and unknown byte-identical (existing keys and tests unchanged)', () => {
    expect(ipRateLimitScope('203.0.113.9')).toBe('203.0.113.9')
    expect(ipRateLimitScope('unknown')).toBe('unknown')
  })
  it('maps an IPv4-mapped IPv6 address onto the plain IPv4 bucket', () => {
    expect(ipRateLimitScope('::ffff:203.0.113.9')).toBe('203.0.113.9')
  })
  it('end to end: rotating the low 64 bits does not escape a limit of 3', async () => {
    delete process.env.REDIS_URL; delete process.env.KV_URL
    let limited = 0
    for (let i = 0; i < 10; i++) {
      const req = new Request('https://x.test', { headers: { 'x-real-ip': `2001:db8:1:2:${i.toString(16)}:${i.toString(16)}::${i.toString(16)}` } })
      if (await isRateLimited(getRateLimitIp(req), 'sec2-v6', 3)) limited++
    }
    expect(limited).toBe(7)
  })
})

describe('R2-4: no phone number or email inside a Redis key', () => {
  it('hashes phone-shaped and email-shaped identities, keeps IP-shaped ones', () => {
    expect(rateLimitIdentity('61400000111')).toMatch(/^h[0-9a-f]{24}$/)
    expect(rateLimitIdentity('+61400000111')).toMatch(/^h[0-9a-f]{24}$/)
    expect(rateLimitIdentity('a.b@example.invalid')).toMatch(/^h[0-9a-f]{24}$/)
    expect(rateLimitIdentity('203.0.113.9')).toBe('203.0.113.9')
    expect(rateLimitIdentity('2001:db8:abcd:12::/64')).toBe('2001:db8:abcd:12::/64')
    expect(rateLimitIdentity('203.0.113.9:0123456789abcdef01234567')).toBe('203.0.113.9:0123456789abcdef01234567')
    expect(rateLimitIdentity('all')).toBe('all')
    expect(rateLimitIdentity('x'.repeat(500))).toMatch(/^h[0-9a-f]{24}$/)
  })
  it('same person, same key (per-sender limit still works)', () => {
    expect(rateLimitIdentity('61400000111')).toBe(rateLimitIdentity('61400000111'))
    expect(rateLimitIdentity('61400000111')).not.toBe(rateLimitIdentity('61400000222'))
  })
  it('the key that reaches Redis does not contain the number', async () => {
    process.env.REDIS_URL = 'redis://synthetic.invalid:6379'
    const seen: string[] = []
    impl.multi = () => {
      const chain = { incr: (k: string) => { seen.push(k); return chain }, expire: () => chain, exec: async () => [1, 1] }
      return chain
    }
    expect(await isRateLimited('61400000111', 'will_inbound', 40)).toBe(false)
    expect(seen).toHaveLength(1)
    expect(seen[0]).not.toContain('61400000111')
    expect(seen[0].startsWith('rl:will_inbound:h')).toBe(true)
  })
})

describe('R2-1: limiter behaviour when Redis misbehaves', () => {
  it('a non-numeric EXEC reply is treated as a failure and the in-memory limit still applies', async () => {
    process.env.REDIS_URL = 'redis://synthetic.invalid:6379'
    impl.multi = () => {
      const chain = { incr: () => chain, expire: () => chain, exec: async () => [new Error('ERR synthetic'), 0] }
      return chain
    }
    const results: boolean[] = []
    for (let i = 0; i < 5; i++) results.push(await isRateLimited('203.0.113.50', 'sec2-nan', 2))
    expect(results).toEqual([false, false, true, true, true])
  })
  it('Redis throwing falls back to memory (degrades, does not fail open)', async () => {
    process.env.REDIS_URL = 'redis://synthetic.invalid:6379'
    impl.multi = () => { throw new Error('connection lost') }
    const results: boolean[] = []
    for (let i = 0; i < 4; i++) results.push(await isRateLimited('203.0.113.51', 'sec2-throw', 2))
    expect(results).toEqual([false, false, true, true])
  })
  it('the in-memory fallback is hard-bounded under a key-flood', async () => {
    delete process.env.REDIS_URL; delete process.env.KV_URL
    for (let i = 0; i < 6500; i++) await isRateLimited(`198.51.100.${i % 250}:${i}`, 'sec2-flood', 5)
    expect(_memSizesForTests().hits).toBeLessThanOrEqual(5000)
  })
  it('an attacker flooding other keys does not erase an active, limited key before the cap is reached', async () => {
    delete process.env.REDIS_URL; delete process.env.KV_URL
    for (let i = 0; i < 4; i++) await isRateLimited('203.0.113.60', 'sec2-keep', 2)
    for (let i = 0; i < 1000; i++) await isRateLimited(`other-${i}`, 'sec2-keep', 2)
    expect(await isRateLimited('203.0.113.60', 'sec2-keep', 2)).toBe(true)
  })
})

describe('R2-2: upload byte budget no longer fails open (round 1 F-5)', () => {
  const MB = 1024 * 1024
  it('with no Redis at all, 12 x 10 MB passes and the 13th is refused', async () => {
    delete process.env.REDIS_URL; delete process.env.KV_URL
    const out: boolean[] = []
    for (let i = 0; i < 13; i++) out.push(await consumeByteBudget('sec2-up:203.0.113.70', 10 * MB, 120 * MB, 900))
    expect(out.slice(0, 12).every((x) => x === false)).toBe(true)
    expect(out[12]).toBe(true)
  })
  it('with Redis throwing, the budget still applies (this was the fail-open path)', async () => {
    process.env.REDIS_URL = 'redis://synthetic.invalid:6379'
    impl.multi = () => { throw new Error('redis down') }
    const out: boolean[] = []
    for (let i = 0; i < 13; i++) out.push(await consumeByteBudget('sec2-up:203.0.113.71', 10 * MB, 120 * MB, 900))
    expect(out[11]).toBe(false)
    expect(out[12]).toBe(true)
  })
  it('with Redis healthy, INCRBY and EXPIRE NX are sent in one transaction', async () => {
    process.env.REDIS_URL = 'redis://synthetic.invalid:6379'
    const calls: string[] = []
    let total = 0
    impl.multi = () => {
      const chain = {
        incrBy: (k: string, n: number) => { calls.push(`incrBy ${k}`); total += n; return chain },
        expire: (_k: string, _s: number, mode: string) => { calls.push(`expire ${mode}`); return chain },
        exec: async () => [total, 1],
      }
      return chain
    }
    expect(await consumeByteBudget('sec2-up:203.0.113.72', 100 * MB, 120 * MB, 900)).toBe(false)
    expect(await consumeByteBudget('sec2-up:203.0.113.72', 30 * MB, 120 * MB, 900)).toBe(true)
    expect(calls).toEqual(['incrBy rlb:sec2-up:203.0.113.72', 'expire NX', 'incrBy rlb:sec2-up:203.0.113.72', 'expire NX'])
  })
  it('a hostel: ten backpackers on one IP uploading 10 MB each (100 MB) is not blocked', async () => {
    delete process.env.REDIS_URL; delete process.env.KV_URL
    let blocked = false
    for (let i = 0; i < 10; i++) blocked = blocked || await consumeByteBudget('sec2-up:203.0.113.73', 10 * MB, 120 * MB, 900)
    expect(blocked).toBe(false)
  })
  it('is keyed per IP bucket, so one abuser does not consume another client\'s budget', async () => {
    delete process.env.REDIS_URL; delete process.env.KV_URL
    for (let i = 0; i < 13; i++) await consumeByteBudget('sec2-up:203.0.113.74', 10 * MB, 120 * MB, 900)
    expect(await consumeByteBudget('sec2-up:203.0.113.75', 10 * MB, 120 * MB, 900)).toBe(false)
  })
})
