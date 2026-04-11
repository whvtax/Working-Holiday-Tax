// AES-256-GCM encryption for sensitive PII fields (TFN, bank details)
// Requires env var: FIELD_ENCRYPTION_KEY (64 hex chars = 32 bytes)
import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH  = 12 // 96-bit IV recommended for GCM
const TAG_LENGTH = 16

let _cachedKey: Buffer | null = null

function getKey(): Buffer {
  if (_cachedKey) return _cachedKey
  const hex = process.env.FIELD_ENCRYPTION_KEY
  if (!hex) throw new Error('Missing env var: FIELD_ENCRYPTION_KEY')
  if (hex.length !== 64) throw new Error('FIELD_ENCRYPTION_KEY must be 64 hex chars (32 bytes)')
  _cachedKey = Buffer.from(hex, 'hex')
  return _cachedKey
}

/**
 * Encrypt a string. Returns base64-encoded "iv:ciphertext:tag".
 * Returns empty string for empty input (no encryption needed).
 */
export function encryptField(plaintext: string): string {
  if (!plaintext) return ''
  const key = getKey()
  const iv  = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, { authTagLength: TAG_LENGTH })
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return [iv, encrypted, tag].map(b => b.toString('base64')).join(':')
}

/**
 * Decrypt a value produced by encryptField.
 * Returns the original string, or '' if input is empty/invalid.
 */
export function decryptField(ciphertext: string): string {
  if (!ciphertext) return ''
  // If value doesn't look encrypted (legacy plaintext), return as-is
  if (!ciphertext.includes(':')) return ciphertext
  try {
    const key = getKey()
    const parts = ciphertext.split(':')
    if (parts.length !== 3) return ciphertext
    const [ivB64, dataB64, tagB64] = parts
    const iv   = Buffer.from(ivB64,  'base64')
    const data = Buffer.from(dataB64, 'base64')
    const tag  = Buffer.from(tagB64,  'base64')
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, { authTagLength: TAG_LENGTH })
    decipher.setAuthTag(tag)
    return decipher.update(data) + decipher.final('utf8')
  } catch {
    // Corrupted or legacy value — return empty string for safety
    return ''
  }
}
