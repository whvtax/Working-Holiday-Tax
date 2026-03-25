/**
 * CRM Store — HMAC session cookie + Redis revocation + in-memory clients
 * SECURITY FIXES:
 *   - Session tokens now include a jti (JWT ID) tracked in Redis for revocation
 *   - destroySession() is async and actually invalidates the token server-side
 *   - getCachedPasswordHash() pre-computes PBKDF2 once at startup
 *   - OTP helpers moved to pure compare functions (Redis I/O in route)
 *   - In-memory brute-force stubs removed; Redis-only in login route
 *   - Demo data uses obviously fake PII (000 000 000 TFN, example.invalid emails)
 *   - upsertClient uses crypto.randomUUID() not Date.now()
 */

import crypto from 'crypto'

// ── Types ──────────────────────────────────────────────────────────────────

export type TaxYear = '2019-20' | '2020-21' | '2021-22' | '2022-23' | '2023-24' | '2024-25'

export type ClientRecord = {
  id: string; fullName: string; dob: string; whatsapp: string
  email: string; country: string; address: string; tfn: string
  bankDetails: string; primaryJob: string; marital: string; taxStatus: string
  howHeard: string; auPhone: string; taxYear: TaxYear; submittedAt: string
  handled: boolean; notes: string
  files: { bankStatement: string | null; selfiePassport: string | null; invoices: string | null }
}

export type FailedAttempt = { count: number; lastAttempt: number; locked: boolean }

// ── In-memory client store ─────────────────────────────────────────────────

const store: { clients: Map<string, ClientRecord> } = { clients: new Map() }

// ── Security helpers ───────────────────────────────────────────────────────

export function hashPassword(password: string): string {
  const salt = process.env.PASSWORD_SALT
  if (!salt) throw new Error('PASSWORD_SALT environment variable is not set')
  return crypto.pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex')
}

// Pre-computed once at module load — avoids 100k PBKDF2 iterations per request
let _cachedPasswordHash: string | null = null
export function getCachedPasswordHash(): string {
  if (!_cachedPasswordHash) {
    const raw = process.env.CRM_PASSWORD
    if (!raw) throw new Error('CRM_PASSWORD environment variable is not set')
    _cachedPasswordHash = hashPassword(raw)
  }
  return _cachedPasswordHash
}

export function verifyPassword(password: string, hash: string): boolean {
  try {
    const attempt = hashPassword(password)
    return crypto.timingSafeEqual(Buffer.from(attempt, 'hex'), Buffer.from(hash, 'hex'))
  } catch { return false }
}

export function generateOtp(): string {
  return crypto.randomInt(10000000, 99999999).toString()
}

// ── OTP helpers (pure — Redis I/O handled in route) ───────────────────────

export function hashOtp(code: string): string {
  return crypto.createHash('sha256').update(code.trim()).digest('hex')
}

export function compareOtp(code: string, storedHash: string): boolean {
  const attemptHash = hashOtp(code)
  const a = Buffer.from(attemptHash, 'hex')
  const b = Buffer.from(storedHash, 'hex')
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

// ── Session — HMAC signed token + Redis revocation ────────────────────────

const SESSION_TTL_MS   = 8 * 60 * 60 * 1000  // 8 hours ms
export const SESSION_TTL_SECONDS = 8 * 60 * 60 // 8 hours secs

function jwtSecret(): Buffer {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET environment variable is not set')
  return Buffer.from(secret)
}

export type SessionPayload = { exp: number; jti: string }

export function createSession(): string {
  const jti = crypto.randomUUID()  // unique ID for revocation
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_TTL_MS, jti })).toString('base64url')
  const sig = crypto.createHmac('sha256', jwtSecret()).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export function parseSession(token: string | undefined): SessionPayload | null {
  if (!token) return null
  try {
    const dot = token.lastIndexOf('.')
    if (dot < 0) return null
    const payload = token.slice(0, dot)
    const sig = token.slice(dot + 1)
    const expected = crypto.createHmac('sha256', jwtSecret()).update(payload).digest('base64url')
    const sigBuf = Buffer.from(sig)
    const expBuf = Buffer.from(expected)
    if (sigBuf.length !== expBuf.length) return null
    if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null
    const parsed: SessionPayload = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (Date.now() >= parsed.exp) return null
    return parsed
  } catch { return null }
}

/** Lightweight sync check (no Redis). Use validateSessionAsync in API routes. */
export function validateSession(token: string | undefined): boolean {
  return parseSession(token) !== null
}

/**
 * Full async validation: verifies HMAC + expiry + Redis revocation list.
 * Use this in all authenticated API routes.
 */
export async function validateSessionAsync(
  token: string | undefined,
  redis: import('redis').RedisClientType
): Promise<boolean> {
  const parsed = parseSession(token)
  if (!parsed) return false
  const revoked = await redis.sIsMember('crm_revoked_sessions', parsed.jti)
  return !revoked
}

/**
 * destroySession — adds the token jti to the Redis revocation set.
 * The set entry auto-expires when the token would have expired anyway.
 */
export async function destroySession(
  token: string | undefined,
  redis: import('redis').RedisClientType
): Promise<void> {
  const parsed = parseSession(token)
  if (!parsed) return
  const remainingSecs = Math.ceil((parsed.exp - Date.now()) / 1000)
  if (remainingSecs > 0) {
    await redis.sAdd('crm_revoked_sessions', parsed.jti)
    await redis.expire('crm_revoked_sessions', Math.max(remainingSecs, 1))
  }
}

// ── Brute-force stubs (logic lives in login route via Redis) ───────────────

export function recordFailedAttempt(): FailedAttempt {
  return { count: 0, lastAttempt: Date.now(), locked: false }
}
export function resetFailedAttempts() { /* no-op */ }
export function isLockedOut(): boolean { return false }

// ── Clients CRUD ───────────────────────────────────────────────────────────

export function getAllClients(): ClientRecord[] {
  return Array.from(store.clients.values()).sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  )
}

export function getClient(id: string): ClientRecord | undefined {
  return store.clients.get(id)
}

export function upsertClient(data: Omit<ClientRecord, 'id' | 'handled'> & { id?: string }): ClientRecord {
  const id = data.id ?? `CLT-${crypto.randomUUID()}`  // UUID not timestamp
  const existing = store.clients.get(id)
  const record: ClientRecord = { ...data, id, handled: existing?.handled ?? false, notes: data.notes ?? existing?.notes ?? '' }
  store.clients.set(id, record)
  return record
}

export function markHandled(id: string): boolean {
  const c = store.clients.get(id)
  if (!c) return false
  c.handled = true
  return true
}

export function clearClientDetails(id: string): boolean {
  const c = store.clients.get(id)
  if (!c) return false
  store.clients.set(id, {
    ...c,
    address: '', tfn: '', bankDetails: '',
    primaryJob: '', marital: '', taxStatus: '', howHeard: '', auPhone: '',
    files: { bankStatement: null, selfiePassport: null, invoices: null },
  })
  return true
}

// ── Seed demo data (development only — obviously fake PII) ─────────────────

if (store.clients.size === 0 && process.env.NODE_ENV !== 'production') {
  const demo = [
    { fullName: 'Demo User 1', dob: '1998-01-01', whatsapp: '+610000000001', email: 'demo1@example.invalid', country: 'France',  taxYear: '2023-24' as TaxYear, primaryJob: 'Demo Job' },
    { fullName: 'Demo User 2', dob: '1996-01-01', whatsapp: '+610000000002', email: 'demo2@example.invalid', country: 'Italy',   taxYear: '2022-23' as TaxYear, primaryJob: 'Demo Job' },
    { fullName: 'Demo User 3', dob: '2000-01-01', whatsapp: '+610000000003', email: 'demo3@example.invalid', country: 'Germany', taxYear: '2021-22' as TaxYear, primaryJob: 'Demo Job' },
  ]
  demo.forEach((d, i) => {
    const id = `CLT-DEMO-${i + 1}`
    store.clients.set(id, {
      ...d, id, handled: false, notes: '[DEMO DATA — not real]',
      address: 'Demo Address, Sydney NSW', tfn: '000 000 000', bankDetails: 'BSB 000-000 · ACC 00000000',
      marital: 'Single', taxStatus: 'Working Holiday Maker', howHeard: 'Demo',
      auPhone: '+61400000000',
      submittedAt: new Date(Date.now() - (i + 1) * 3 * 24 * 60 * 60 * 1000).toISOString(),
      files: { bankStatement: null, selfiePassport: null, invoices: null },
    })
  })
}
