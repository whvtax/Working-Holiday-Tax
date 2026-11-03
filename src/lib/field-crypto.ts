// src/lib/field-crypto.ts
// ──────────────────────────────────────────────────────────────────────────
// Field-level encryption envelope (AES-256-GCM) for TFN, bank details,
// passport number and date of birth.
//
// STATUS: PROPOSAL CODE. Nothing in the application imports this module yet
// and no live column is encrypted. The migration and rollout plan is in
// security-assessment/proposals/field-encryption/. Server-only: never import
// from a client component (it needs Node crypto and secret keys).
//
// Envelope (a single TEXT value, so the existing TEXT columns can hold it):
//
//     enc1:<kid>:<iv>:<ciphertext||tag>
//
//   kid  key id, [A-Za-z0-9_-]{1,16}. Lets old rows stay readable after rotation.
//   iv   12 random bytes (base64url). A fresh IV per encryption, never derived.
//   body ciphertext followed by the 16-byte GCM tag (base64url).
//
// Additional authenticated data (AAD) = "<table>.<column>.<rowId>". A
// ciphertext copied to another row or column fails authentication, so a
// database-write attacker cannot swap one customer's TFN into another's row.
//
// Keys live in Vercel env vars, NOT in the database:
//   FIELD_ENC_KEYS      "k1:<base64 32 bytes>,k2:<base64 32 bytes>"
//   FIELD_ENC_ACTIVE    "k2"   (kid used for new writes)
//   FIELD_INDEX_KEY     "<base64 32 bytes>"  (separate key, blind index only)
//
// Threat model, honestly: this defends against a database dump, a backup, a
// dashboard viewer or a leaked anon/SQL credential. It does NOT defend against
// an attacker who holds BOTH the service-role key and the Vercel env (they can
// ask the app to decrypt). Do not describe it as more than that.
// ──────────────────────────────────────────────────────────────────────────

import crypto from 'crypto'

const PREFIX = 'enc1'
const KID_RE = /^[A-Za-z0-9_-]{1,16}$/
const ENVELOPE_RE = /^enc1:([A-Za-z0-9_-]{1,16}):([A-Za-z0-9_-]{16}):([A-Za-z0-9_-]{22,})$/

export interface KeyRing {
  /** kid -> 32-byte key */
  keys: Map<string, Buffer>
  /** kid used for new encryptions */
  active: string
  /** 32-byte HMAC key for blind indexes (kept separate from the data keys) */
  indexKey?: Buffer
}

/** Where a value lives. Bound into the AAD. */
export interface FieldContext {
  table: string
  column: string
  rowId: string
}

export class FieldCryptoError extends Error {
  constructor(public readonly reason: 'no_key' | 'bad_key' | 'bad_envelope' | 'auth_failed' | 'plaintext_refused' | 'bad_context', message: string) {
    super(message) // never includes the value or the key
    this.name = 'FieldCryptoError'
  }
}

function decodeKey(b64: string, label: string): Buffer {
  const buf = Buffer.from(b64, 'base64')
  if (buf.length !== 32) throw new FieldCryptoError('bad_key', `${label} must decode to exactly 32 bytes`)
  return buf
}

/** Build a ring from explicit values (tests) or from process.env. */
export function buildKeyRing(spec: { keys: string; active: string; indexKey?: string }): KeyRing {
  const keys = new Map<string, Buffer>()
  for (const part of spec.keys.split(',').map(s => s.trim()).filter(Boolean)) {
    const i = part.indexOf(':')
    const kid = i < 0 ? '' : part.slice(0, i)
    if (!KID_RE.test(kid)) throw new FieldCryptoError('bad_key', 'key id is malformed')
    if (keys.has(kid)) throw new FieldCryptoError('bad_key', 'duplicate key id')
    keys.set(kid, decodeKey(part.slice(i + 1), `key ${kid}`))
  }
  if (!keys.size) throw new FieldCryptoError('no_key', 'no encryption keys configured')
  if (!keys.has(spec.active)) throw new FieldCryptoError('bad_key', 'active key id is not in the key list')
  const indexKey = spec.indexKey ? decodeKey(spec.indexKey, 'index key') : undefined
  if (indexKey && [...keys.values()].some(k => k.equals(indexKey))) {
    throw new FieldCryptoError('bad_key', 'index key must differ from every data key')
  }
  return { keys, active: spec.active, indexKey }
}

export function keyRingFromEnv(env: NodeJS.ProcessEnv = process.env): KeyRing {
  const keys = env.FIELD_ENC_KEYS
  const active = env.FIELD_ENC_ACTIVE
  if (!keys || !active) throw new FieldCryptoError('no_key', 'FIELD_ENC_KEYS / FIELD_ENC_ACTIVE are not set')
  return buildKeyRing({ keys, active, indexKey: env.FIELD_INDEX_KEY })
}

function aad(ctx: FieldContext): Buffer {
  for (const v of [ctx?.table, ctx?.column, ctx?.rowId]) {
    if (typeof v !== 'string' || !v) {
      throw new FieldCryptoError('bad_context', 'table, column and rowId are required')
    }
  }
  // JSON, not a dotted join: "a.b"+"c" and "a"+"b.c" must not collide.
  return Buffer.from(JSON.stringify([ctx.table, ctx.column, ctx.rowId]), 'utf8')
}

export function isEncrypted(value: unknown): boolean {
  return typeof value === 'string' && ENVELOPE_RE.test(value)
}

/** Empty strings stay empty: the columns default to '' and "no value" is not secret. */
export function encryptField(plain: string, ctx: FieldContext, ring: KeyRing): string {
  if (typeof plain !== 'string') throw new FieldCryptoError('bad_envelope', 'value must be a string')
  if (plain === '') return ''
  const key = ring.keys.get(ring.active)
  if (!key) throw new FieldCryptoError('no_key', 'active key missing')
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  cipher.setAAD(aad(ctx))
  const ct = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final(), cipher.getAuthTag()])
  return `${PREFIX}:${ring.active}:${iv.toString('base64url')}:${ct.toString('base64url')}`
}

export interface DecryptOptions {
  /**
   * During the backfill window some rows are still plaintext. With this on, a
   * non-envelope value is returned as is. Turn it OFF once the backfill is
   * verified, so a plaintext write by a forgotten code path fails loudly.
   */
  allowPlaintext?: boolean
}

export function decryptField(value: string, ctx: FieldContext, ring: KeyRing, opts: DecryptOptions = {}): string {
  if (value === '' || value === null || value === undefined) return ''
  if (typeof value !== 'string') throw new FieldCryptoError('bad_envelope', 'value must be a string')
  const m = ENVELOPE_RE.exec(value)
  if (!m) {
    if (opts.allowPlaintext) return value
    throw new FieldCryptoError('plaintext_refused', 'value is not an encrypted envelope')
  }
  const [, kid, ivB64, bodyB64] = m
  const key = ring.keys.get(kid)
  if (!key) throw new FieldCryptoError('no_key', `no key for id ${kid}`)
  const iv = Buffer.from(ivB64, 'base64url')
  const body = Buffer.from(bodyB64, 'base64url')
  if (iv.length !== 12 || body.length < 17) throw new FieldCryptoError('bad_envelope', 'envelope is truncated')
  const tag = body.subarray(body.length - 16)
  const ct = body.subarray(0, body.length - 16)
  try {
    const d = crypto.createDecipheriv('aes-256-gcm', key, iv)
    d.setAAD(aad(ctx))
    d.setAuthTag(tag)
    return Buffer.concat([d.update(ct), d.final()]).toString('utf8')
  } catch {
    // Wrong key, wrong row/column, or tampering: indistinguishable on purpose.
    throw new FieldCryptoError('auth_failed', 'decryption failed authentication')
  }
}

/** Re-encrypt under the active key (rotation). Plaintext is encrypted as well. */
export function rewrapField(value: string, ctx: FieldContext, ring: KeyRing): string {
  return encryptField(decryptField(value, ctx, ring, { allowPlaintext: true }), ctx, ring)
}

/** True when the value is not yet encrypted under the active key. */
export function needsRewrap(value: string, ring: KeyRing): boolean {
  if (!value) return false
  const m = ENVELOPE_RE.exec(value)
  return !m || m[1] !== ring.active
}

/**
 * Deterministic lookup token for exact-match search (duplicate TFN detection).
 * HMAC-SHA256 with a key that is NOT a data key. Normalise first (digits only
 * for a TFN) so "123 456 782" and "123456782" give one token. The token is
 * scoped by purpose so a TFN token can never equal a phone token.
 * A TFN has only about 10^8 values: without the secret key a token could be
 * brute-forced, so the index key must be protected like a data key.
 */
export function blindIndex(value: string, purpose: string, ring: KeyRing, normalise: (v: string) => string = v => v.replace(/\D/g, '')): string {
  if (!ring.indexKey) throw new FieldCryptoError('no_key', 'no index key configured')
  const n = normalise(String(value ?? ''))
  if (!n) return ''
  return crypto.createHmac('sha256', ring.indexKey).update(`${purpose}\u0000${n}`).digest('hex')
}
