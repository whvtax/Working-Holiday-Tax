/**
 * CRM Store — stateless session (HMAC JWT cookie)
 *
 * Session: signed cookie — works across Vercel serverless instances
 * Brute-force: tracked in Redis so it survives across instances
 */

import crypto from 'crypto'

// ── Types ──────────────────────────────────────────────────────────────────

export type TaxYear = '2019-20' | '2020-21' | '2021-22' | '2022-23' | '2023-24' | '2024-25'

export type ClientRecord = {
  id: string
  fullName: string
  dob: string
  whatsapp: string
  email: string
  country: string
  address: string
  tfn: string
  bankDetails: string
  primaryJob: string
  marital: string
  taxStatus: string
  howHeard: string
  auPhone: string
  taxYear: TaxYear
  submittedAt: string
  handled: boolean
  notes: string
  files: { bankStatement: string | null; selfiePassport: string | null; invoices: string | null }
}

export type FailedAttempt = { count: number; lastAttempt: number; locked: boolean }

// ── Security helpers ───────────────────────────────────────────────────────

export function hashPassword(password: string): string {
  const salt = process.env.PASSWORD_SALT
  if (!salt) throw new Error('Missing env var: PASSWORD_SALT')
  return crypto.pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex')
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

// ── Session — HMAC signed token (stateless, works on Vercel) ──────────────

const SESSION_TTL = 8 * 60 * 60 * 1000 // 8 hours

function jwtSecret(): Buffer {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('Missing env var: JWT_SECRET')
  return Buffer.from(secret)
}

export function createSession(): string {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_TTL })).toString('base64url')
  const sig     = crypto.createHmac('sha256', jwtSecret()).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export function validateSession(token: string | undefined): boolean {
  if (!token) return false
  try {
    const dot = token.lastIndexOf('.')
    if (dot < 0) return false
    const payload = token.slice(0, dot)
    const sig     = token.slice(dot + 1)
    const expected = crypto.createHmac('sha256', jwtSecret()).update(payload).digest('base64url')
    const sigBuf = Buffer.from(sig)
    const expBuf = Buffer.from(expected)
    if (sigBuf.length !== expBuf.length) return false
    if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return Date.now() < exp
  } catch { return false }
}

export function destroySession() { /* stateless — cookie cleared client-side */ }

// ── Brute-force protection (Redis-backed) ──────────────────────────────────
// Keys:  crm_fail_count  (integer, string)
//        crm_fail_ts     (last attempt unix ms, string)
//        crm_locked      ('1' | absent)
// All keys get a 35-minute TTL so they self-clean after lockout expires.

const MAX_ATTEMPTS = 3
const LOCKOUT_MS   = 30 * 60 * 1000
const KEY_COUNT    = 'crm_fail_count'
const KEY_TS       = 'crm_fail_ts'
const KEY_LOCKED   = 'crm_locked'
const TTL_SECS     = 35 * 60 // slightly longer than lockout

export async function recordFailedAttemptRedis(redis: import('redis').RedisClientType): Promise<FailedAttempt> {
  const now   = Date.now()
  const count = await redis.incr(KEY_COUNT)
  await redis.set(KEY_TS, String(now), { EX: TTL_SECS })
  await redis.expire(KEY_COUNT, TTL_SECS)
  const locked = count >= MAX_ATTEMPTS
  if (locked) await redis.set(KEY_LOCKED, '1', { EX: TTL_SECS })
  return { count, lastAttempt: now, locked }
}

export async function resetFailedAttemptsRedis(redis: import('redis').RedisClientType): Promise<void> {
  await redis.del(KEY_COUNT, KEY_TS, KEY_LOCKED)
}

export async function isLockedOutRedis(redis: import('redis').RedisClientType): Promise<boolean> {
  const locked = await redis.get(KEY_LOCKED)
  if (!locked) return false
  const ts = await redis.get(KEY_TS)
  if (ts && Date.now() - Number(ts) > LOCKOUT_MS) {
    // Lockout expired — clear manually (TTL will also clean it, this is just faster)
    await redis.del(KEY_COUNT, KEY_TS, KEY_LOCKED)
    return false
  }
  return true
}

// ── Clients CRUD (kept for legacy/demo compatibility) ─────────────────────

const _store: { clients: Map<string, ClientRecord> } = { clients: new Map() }

export function getAllClients(): ClientRecord[] {
  return Array.from(_store.clients.values()).sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  )
}

export function getClient(id: string): ClientRecord | undefined {
  return _store.clients.get(id)
}

export function upsertClient(data: Omit<ClientRecord, 'id' | 'handled'> & { id?: string; waNumber?: string }): ClientRecord {
  const id       = data.id ?? `CLT-${Date.now()}`
  const existing = _store.clients.get(id)
  const record: ClientRecord = { ...data, id, handled: existing?.handled ?? false, notes: data.notes ?? existing?.notes ?? '' }
  _store.clients.set(id, record)
  return record
}

export function markHandled(id: string): boolean {
  const c = _store.clients.get(id)
  if (!c) return false
  c.handled = true
  return true
}

export function clearClientDetails(id: string): boolean {
  const c = _store.clients.get(id)
  if (!c) return false
  _store.clients.set(id, {
    ...c,
    address: '', tfn: '', bankDetails: '',
    primaryJob: '', marital: '', taxStatus: '', howHeard: '', auPhone: '',
    files: { bankStatement: null, selfiePassport: null, invoices: null },
  })
  return true
}
