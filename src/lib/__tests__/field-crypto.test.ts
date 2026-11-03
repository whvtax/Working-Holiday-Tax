import crypto from 'crypto'
import {
  buildKeyRing, encryptField, decryptField, isEncrypted, rewrapField, needsRewrap, blindIndex, keyRingFromEnv, FieldCryptoError,
} from '@/lib/field-crypto'

const k = () => crypto.randomBytes(32).toString('base64')
const mk = (active = 'k1', extra = '') => {
  const k1 = k(); const k2 = k()
  return { k1, k2, ring: buildKeyRing({ keys: `k1:${k1},k2:${k2}${extra}`, active, indexKey: k() }) }
}
const ctx = { table: 'crm_tasks', column: 'tfn', rowId: 'TASK-1' }
const SYNTHETIC_TFN = '123 456 782'

describe('field-crypto', () => {
  it('round-trips and the envelope contains no plaintext', () => {
    const { ring } = mk()
    const env = encryptField(SYNTHETIC_TFN, ctx, ring)
    expect(isEncrypted(env)).toBe(true)
    expect(env).not.toContain('123')
    expect(decryptField(env, ctx, ring)).toBe(SYNTHETIC_TFN)
  })
  it('handles unicode and long values', () => {
    const { ring } = mk()
    const v = 'Mü 北京 BSB 062-692 Acct 81049952 ' + 'x'.repeat(5000)
    expect(decryptField(encryptField(v, ctx, ring), ctx, ring)).toBe(v)
  })
  it('uses a fresh IV every time (same input, different envelope)', () => {
    const { ring } = mk()
    const a = encryptField('same', ctx, ring); const b = encryptField('same', ctx, ring)
    expect(a).not.toBe(b)
  })
  it('empty stays empty (column defaults) and decrypts to empty', () => {
    const { ring } = mk()
    expect(encryptField('', ctx, ring)).toBe('')
    expect(decryptField('', ctx, ring)).toBe('')
  })
  it('a ciphertext moved to another row or column fails authentication', () => {
    const { ring } = mk()
    const env = encryptField(SYNTHETIC_TFN, ctx, ring)
    expect(() => decryptField(env, { ...ctx, rowId: 'TASK-2' }, ring)).toThrow(FieldCryptoError)
    expect(() => decryptField(env, { ...ctx, column: 'bank_details' }, ring)).toThrow(FieldCryptoError)
    expect(() => decryptField(env, { ...ctx, table: 'crm_clients' }, ring)).toThrow(FieldCryptoError)
  })
  it('AAD fields cannot collide by moving a dot', () => {
    const { ring } = mk()
    const env = encryptField('v', { table: 'a.b', column: 'c', rowId: 'r' }, ring)
    expect(() => decryptField(env, { table: 'a', column: 'b.c', rowId: 'r' }, ring)).toThrow()
  })
  it('any bit flip in iv, body or tag is detected', () => {
    const { ring } = mk()
    const env = encryptField(SYNTHETIC_TFN, ctx, ring)
    const [p, kid, iv, body] = env.split(':')
    const flip = (s: string, at: number) => {
      const b = Buffer.from(s, 'base64url'); b[at] ^= 1; return b.toString('base64url')
    }
    for (const bad of [
      [p, kid, flip(iv, 0), body], [p, kid, iv, flip(body, 0)], [p, kid, iv, flip(body, Buffer.from(body, 'base64url').length - 1)],
    ]) {
      expect(() => decryptField(bad.join(':'), ctx, ring)).toThrow(FieldCryptoError)
    }
  })
  it('wrong key fails; unknown kid fails with no_key', () => {
    const a = mk(); const b = mk()
    const env = encryptField('secret', ctx, a.ring)
    expect(() => decryptField(env, ctx, b.ring)).toThrow(/authentication/)
    const only = buildKeyRing({ keys: `zz:${k()}`, active: 'zz' })
    expect(() => decryptField(env, ctx, only)).toThrow(/no key for id k1/)
  })
  it('error messages never contain the value or key material', () => {
    const { ring, k1 } = mk()
    const env = encryptField('TOPSECRET-VALUE', ctx, ring)
    try { decryptField(env, { ...ctx, rowId: 'X' }, ring); throw new Error('should not get here') } catch (e) {
      const m = String((e as Error).message)
      expect(m).not.toContain('TOPSECRET'); expect(m).not.toContain(k1)
    }
  })
  it('plaintext is refused unless the backfill flag is on', () => {
    const { ring } = mk()
    expect(() => decryptField('123456782', ctx, ring)).toThrow(/not an encrypted envelope/)
    expect(decryptField('123456782', ctx, ring, { allowPlaintext: true })).toBe('123456782')
  })
  it('rotation: old rows stay readable, new writes use the active key, rewrap upgrades', () => {
    const { k1, k2 } = mk()
    const oldRing = buildKeyRing({ keys: `k1:${k1}`, active: 'k1' })
    const newRing = buildKeyRing({ keys: `k1:${k1},k2:${k2}`, active: 'k2' })
    const oldEnv = encryptField('v', ctx, oldRing)
    expect(needsRewrap(oldEnv, newRing)).toBe(true)
    expect(decryptField(oldEnv, ctx, newRing)).toBe('v')
    const fresh = rewrapField(oldEnv, ctx, newRing)
    expect(fresh.split(':')[1]).toBe('k2')
    expect(needsRewrap(fresh, newRing)).toBe(false)
    expect(decryptField(fresh, ctx, newRing)).toBe('v')
    // plaintext row is encrypted by rewrap (backfill path)
    expect(isEncrypted(rewrapField('plain', ctx, newRing))).toBe(true)
  })
  it('key ring validation: size, duplicates, active id, index key reuse, env loading', () => {
    expect(() => buildKeyRing({ keys: `k1:${Buffer.alloc(16).toString('base64')}`, active: 'k1' })).toThrow(/32 bytes/)
    expect(() => buildKeyRing({ keys: `k1:${k()},k1:${k()}`, active: 'k1' })).toThrow(/duplicate/)
    expect(() => buildKeyRing({ keys: `k1:${k()}`, active: 'nope' })).toThrow(/active/)
    expect(() => buildKeyRing({ keys: '', active: 'k1' })).toThrow(FieldCryptoError)
    const shared = k()
    expect(() => buildKeyRing({ keys: `k1:${shared}`, active: 'k1', indexKey: shared })).toThrow(/differ/)
    expect(() => keyRingFromEnv({} as NodeJS.ProcessEnv)).toThrow(/not set/)
    const r = keyRingFromEnv({ FIELD_ENC_KEYS: `k1:${k()}`, FIELD_ENC_ACTIVE: 'k1' } as unknown as NodeJS.ProcessEnv)
    expect(r.active).toBe('k1')
  })
  it('context is mandatory', () => {
    const { ring } = mk()
    expect(() => encryptField('v', { table: '', column: 'c', rowId: 'r' }, ring)).toThrow(/required/)
    expect(() => encryptField('v', { table: 't', column: 'c', rowId: '' }, ring)).toThrow(/required/)
  })
  it('blind index: normalised, deterministic, purpose-scoped, key-dependent, empty for empty', () => {
    const a = mk(); const b = mk()
    expect(blindIndex('123 456 782', 'tfn', a.ring)).toBe(blindIndex('123456782', 'tfn', a.ring))
    expect(blindIndex('123456782', 'tfn', a.ring)).not.toBe(blindIndex('123456782', 'phone', a.ring))
    expect(blindIndex('123456782', 'tfn', a.ring)).not.toBe(blindIndex('123456782', 'tfn', b.ring))
    expect(blindIndex('abc', 'tfn', a.ring)).toBe('')
    expect(blindIndex('123456782', 'tfn', a.ring)).toMatch(/^[0-9a-f]{64}$/)
    const noIdx = buildKeyRing({ keys: `k1:${k()}`, active: 'k1' })
    expect(() => blindIndex('1', 'tfn', noIdx)).toThrow(/index key/)
  })
})
