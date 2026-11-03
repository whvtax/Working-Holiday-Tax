import { signFormToken, signFixToken, verifyFormToken, addTokenToFormLinks, FORM_TOKEN_MAX_TTL_SECONDS, formTokenUsedKey } from '../form-token'
import { FORM_LINK_ANY_BRAND } from '../brand-voice'

const SECRET = 'synthetic-test-secret-0123456789abcdef-xyz'
const OTHER = 'a-different-synthetic-secret-0123456789abcd'
const now = 1_800_000_000_000

describe('form completion token', () => {
  it('round trips and binds customer, brand and expiry', () => {
    const t = signFormToken({ customerId: 'cust-1', brand: 'wht', now }, SECRET)!
    const r = verifyFormToken(t, 'wht', { secret: SECRET, now })
    expect(r).toEqual({ ok: true, claims: { customerId: 'cust-1', brand: 'wht', expiresAt: now / 1000 + 21 * 86400, nonce: expect.any(String), purpose: 'form' } })
  })
  it('is unique per issue (random nonce) and carries no phone number', () => {
    const a = signFormToken({ customerId: 'c', brand: 'wht', now }, SECRET)!
    const b = signFormToken({ customerId: 'c', brand: 'wht', now }, SECRET)!
    expect(a).not.toBe(b)
    expect(Object.keys(JSON.parse(Buffer.from(a.split('.')[1], 'base64url').toString())).sort()).toEqual(['b', 'c', 'e', 'n'])
  })
  it('rejects expiry, wrong brand, another key, tampering and junk', () => {
    const t = signFormToken({ customerId: 'cust-1', brand: 'wht', now, ttlSeconds: 60 }, SECRET)!
    expect(verifyFormToken(t, 'wht', { secret: SECRET, now: now + 61_000 })).toMatchObject({ ok: false, reason: 'expired' })
    expect(verifyFormToken(t, 'svt', { secret: SECRET, now })).toMatchObject({ ok: false, reason: 'wrong_brand' })
    expect(verifyFormToken(t, 'wht', { secret: OTHER, now })).toMatchObject({ ok: false, reason: 'bad_signature' })
    const [v, p, m] = t.split('.')
    const forged = Buffer.from(JSON.stringify({ c: 'victim', b: 'wht', e: now / 1000 + 60, n: 'x' })).toString('base64url')
    expect(verifyFormToken(`${v}.${forged}.${m}`, 'wht', { secret: SECRET, now })).toMatchObject({ ok: false, reason: 'bad_signature' })
    for (const junk of ['', 'v1', 'v1..', 'v2.a.b', `${v}.${p}`, `${v}.${p}.${m}.x`, 'v1.a b.c', 42, null, undefined, 'x'.repeat(600)]) {
      expect(verifyFormToken(junk, 'wht', { secret: SECRET, now }).ok).toBe(false)
    }
  })
  it('refuses a validly signed token whose lifetime is absurd', () => {
    const t = signFormToken({ customerId: 'c', brand: 'wht', now, ttlSeconds: FORM_TOKEN_MAX_TTL_SECONDS + 10 }, SECRET)!
    expect(verifyFormToken(t, 'wht', { secret: SECRET, now })).toMatchObject({ ok: false, reason: 'too_long_lived' })
  })
  it('fails closed with no secret or a short one', () => {
    expect(signFormToken({ customerId: 'c', brand: 'wht' }, undefined)).toBeNull()
    expect(signFormToken({ customerId: 'c', brand: 'wht' }, 'short')).toBeNull()
    expect(verifyFormToken('v1.a.b', 'wht', { secret: '' })).toMatchObject({ ok: false, reason: 'disabled' })
  })
  it('a session-style or unsigned alg-none token is not accepted', () => {
    const header = Buffer.from('{"alg":"none"}').toString('base64url')
    expect(verifyFormToken(`${header}.e30.`, 'wht', { secret: SECRET, now }).ok).toBe(false)
  })
  it('adds the token to a bare form link only, in either brand, once', () => {
    const t = 'TOK'
    const text = 'Here is your form: https://workingholidaytax.com.au/tax-form and again workingholidaytax.com.au/tax-form.'
    const out = addTokenToFormLinks(text, t, FORM_LINK_ANY_BRAND)
    expect(out).toContain('workingholidaytax.com.au/tax-form?k=TOK and again')
    expect(out.match(/\?k=TOK/g)).toHaveLength(2)
    expect(addTokenToFormLinks(out, t, FORM_LINK_ANY_BRAND)).toBe(out) // idempotent
    expect(addTokenToFormLinks(text, null, FORM_LINK_ANY_BRAND)).toBe(text)
    expect(addTokenToFormLinks('see workingholidaytax.com.au/tax-return', t, FORM_LINK_ANY_BRAND)).toBe('see workingholidaytax.com.au/tax-return')
  })
})

describe('correction token and single-use key', () => {
  it('a fix token carries purpose fix, lives 7 days, and a form token is purpose form', () => {
    const f = signFixToken('cust-1', 'wht', SECRET)!
    const r = verifyFormToken(f, 'wht', { secret: SECRET })
    expect(r.ok && r.claims.purpose).toBe('fix')
    expect(r.ok && r.claims.expiresAt - Math.floor(Date.now() / 1000)).toBeLessThanOrEqual(7 * 86400)
    const g = signFormToken({ customerId: 'cust-1', brand: 'wht' }, SECRET)!
    const rg = verifyFormToken(g, 'wht', { secret: SECRET })
    expect(rg.ok && rg.claims.purpose).toBe('form')
  })
  it('changing the purpose of a signed token breaks the signature', () => {
    const g = signFormToken({ customerId: 'cust-1', brand: 'wht' }, SECRET)!
    const [v, p, m] = g.split('.')
    const body = JSON.parse(Buffer.from(p, 'base64url').toString())
    const forged = Buffer.from(JSON.stringify({ ...body, p: 'fix' })).toString('base64url')
    expect(verifyFormToken(`${v}.${forged}.${m}`, 'wht', { secret: SECRET })).toMatchObject({ ok: false, reason: 'bad_signature' })
  })
  it('the used-record key is per token nonce', () => {
    expect(formTokenUsedKey('abc')).toBe('form_token_used:abc')
  })
})
