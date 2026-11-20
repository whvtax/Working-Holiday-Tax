// Encrypts the TikTok tokens Ella keeps in her settings table (AES-256-GCM).
// The key is ELLA_TOKEN_KEY (32 bytes, base64), set by Jo in Vercel. Tokens are
// never sent to the browser or written to logs.
import { createCipheriv, createDecipheriv, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

function key(): Buffer {
  const raw = process.env.ELLA_TOKEN_KEY
  if (!raw) throw new Error('Missing ELLA_TOKEN_KEY')
  const k = Buffer.from(raw, 'base64')
  if (k.length !== 32) throw new Error('ELLA_TOKEN_KEY must be 32 bytes, base64')
  return k
}

export function seal(value: unknown): string {
  const iv = randomBytes(12)
  const c = createCipheriv('aes-256-gcm', key(), iv)
  const body = Buffer.concat([c.update(JSON.stringify(value), 'utf8'), c.final()])
  return ['v1', iv.toString('base64'), c.getAuthTag().toString('base64'), body.toString('base64')].join('.')
}

export function open<T>(sealed: string): T {
  const [v, iv, tag, body] = sealed.split('.')
  if (v !== 'v1' || !iv || !tag || !body) throw new Error('Bad sealed value')
  const d = createDecipheriv('aes-256-gcm', key(), Buffer.from(iv, 'base64'))
  d.setAuthTag(Buffer.from(tag, 'base64'))
  return JSON.parse(Buffer.concat([d.update(Buffer.from(body, 'base64')), d.final()]).toString('utf8')) as T
}

/** Signed, expiring OAuth state (the callback cannot rely on the CRM cookie). */
export function signState(payload: Record<string, unknown>, ttlSec = 600): string {
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + ttlSec, n: randomBytes(8).toString('hex') })).toString('base64url')
  const mac = createHmac('sha256', key()).update(body).digest('base64url')
  return `${body}.${mac}`
}

export function verifyState<T extends Record<string, unknown>>(state: string): T | null {
  const [body, mac] = state.split('.')
  if (!body || !mac) return null
  const want = createHmac('sha256', key()).update(body).digest()
  const got = Buffer.from(mac, 'base64url')
  if (got.length !== want.length || !timingSafeEqual(got, want)) return null
  const data = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as T & { exp: number }
  return data.exp > Date.now() / 1000 ? data : null
}
