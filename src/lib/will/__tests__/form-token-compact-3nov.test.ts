import { signFormToken, signFixToken, verifyFormToken } from '../form-token'

const SECRET = 'synthetic-test-secret-0123456789abcdef-xyz'
const OTHER = 'a-different-synthetic-secret-0123456789abcd'
const ID = 'e19b7eac-900e-4236-96b7-e1bc42af4337'
const now = 1_800_000_000_000

describe('compact token (Jo, 3 Nov: as short as possible)', () => {
  it('is 44 characters, URL safe, and round trips with the customer, brand and purpose', () => {
    const t = signFormToken({ customerId: ID, brand: 'wht', now }, SECRET)!
    expect(t).toMatch(/^[A-Za-z0-9_-]{44}$/)
    const r = verifyFormToken(t, 'wht', { secret: SECRET, now })
    expect(r).toMatchObject({ ok: true, claims: { customerId: ID, brand: 'wht', purpose: 'form' } })
    const f = signFormToken({ customerId: ID, brand: 'wht', purpose: 'fix', now }, SECRET)!
    expect(verifyFormToken(f, 'wht', { secret: SECRET, now })).toMatchObject({ ok: true, claims: { purpose: 'fix' } })
    const svt = signFormToken({ customerId: ID, brand: 'svt', now }, SECRET)!
    expect(verifyFormToken(svt, 'svt', { secret: SECRET, now })).toMatchObject({ ok: true, claims: { brand: 'svt' } })
    expect(verifyFormToken(svt, 'wht', { secret: SECRET, now })).toMatchObject({ ok: false, reason: 'wrong_brand' })
  })
  it('the correction link is short and unique each time', () => {
    const a = signFixToken(ID, 'wht', SECRET)!
    const b = signFixToken(ID, 'wht', SECRET)!
    expect(a).not.toBe(b)
    expect(a.length).toBe(44)
    const nonces = new Set([verifyFormToken(a, 'wht', { secret: SECRET }), verifyFormToken(b, 'wht', { secret: SECRET })].map((x) => (x.ok ? x.claims.nonce : '')))
    expect(nonces.size).toBe(2)
  })
  it('expires, and rejects another key, a flipped character and junk', () => {
    const t = signFormToken({ customerId: ID, brand: 'wht', now, ttlSeconds: 3600 }, SECRET)!
    expect(verifyFormToken(t, 'wht', { secret: SECRET, now: now + 3 * 86_400_000 })).toMatchObject({ ok: false, reason: 'expired' })
    expect(verifyFormToken(t, 'wht', { secret: OTHER, now })).toMatchObject({ ok: false, reason: 'bad_signature' })
    const i = 10
    const bad = t.slice(0, i) + (t[i] === 'A' ? 'B' : 'A') + t.slice(i + 1)
    expect(verifyFormToken(bad, 'wht', { secret: SECRET, now }).ok).toBe(false)
    expect(verifyFormToken('x'.repeat(44), 'wht', { secret: SECRET, now }).ok).toBe(false)
  })
  it('a customer id that is not a UUID still gets the long form, and old links still verify', () => {
    const t = signFormToken({ customerId: 'cust-1', brand: 'wht', now }, SECRET)!
    expect(t.startsWith('v1.')).toBe(true)
    expect(verifyFormToken(t, 'wht', { secret: SECRET, now })).toMatchObject({ ok: true })
  })
})
