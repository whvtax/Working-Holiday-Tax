/**
 * CRM Store — stateless session (HMAC JWT cookie) + in-memory clients
 * 
 * Session: signed cookie — works across Vercel serverless instances
 * Clients: in-memory (persists within same instance; upgrade to KV/DB for full persistence)
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

// ── In-memory store (clients + brute force) ───────────────────────────────

const store: {
  clients: Map<string, ClientRecord>
  failedAttempts: FailedAttempt
} = {
  clients: new Map(),
  failedAttempts: { count: 0, lastAttempt: 0, locked: false },
}

// ── Security helpers ───────────────────────────────────────────────────────

export function hashPassword(password: string): string {
  const salt = process.env.PASSWORD_SALT
  if (!salt) throw new Error('PASSWORD_SALT environment variable is not set')
  return crypto.pbkdf2Sync(
    password,
    salt,
    100_000, 64, 'sha512'
  ).toString('hex')
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

// ── OTP store (in-memory, expires in 10 min) ──────────────────────────────
// IMPORTANT: OTP is stored in module memory on the same serverless instance
// that generated it. The login flow immediately calls verify-otp after login,
// which typically hits the same warm instance on Vercel.
// For multi-region deployments, upgrade to Redis (see login route for reference).
let _otpHash    = ''
let _otpExpiry  = 0

export function storeOtp(code: string): void {
  _otpHash   = crypto.createHash('sha256').update(code).digest('hex')
  _otpExpiry = Date.now() + 10 * 60 * 1000 // 10 minutes
}

export function verifyOtp(code: string): boolean {
  if (Date.now() > _otpExpiry) return false
  const hash = crypto.createHash('sha256').update(code.trim()).digest('hex')
  const valid = crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(_otpHash, 'hex'))
  if (valid) { _otpHash = ''; _otpExpiry = 0 } // one-time use
  return valid
}

// ── Session — HMAC signed token (stateless, works on Vercel) ──────────────

const SESSION_TTL = 8 * 60 * 60 * 1000 // 8 hours

function jwtSecret(): Buffer {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET environment variable is not set')
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

/**
 * destroySession — intentional no-op.
 * Session validity is encoded in the HMAC-signed cookie itself (stateless).
 * Logout is achieved by clearing the cookie on the client (see /api/crm/logout/route.ts).
 * No server-side token revocation is needed unless you add a Redis denylist.
 */
export function destroySession() { /* stateless — cookie is cleared via Set-Cookie in logout route */ }

// ── Brute-force protection ─────────────────────────────────────────────────

const MAX_ATTEMPTS    = 3
const LOCKOUT_MS      = 30 * 60 * 1000

export function recordFailedAttempt(): FailedAttempt {
  const fa = store.failedAttempts
  fa.count++
  fa.lastAttempt = Date.now()
  if (fa.count >= MAX_ATTEMPTS) fa.locked = true
  return { ...fa }
}

export function resetFailedAttempts() {
  store.failedAttempts = { count: 0, lastAttempt: 0, locked: false }
}

export function isLockedOut(): boolean {
  const fa = store.failedAttempts
  if (!fa.locked) return false
  if (Date.now() - fa.lastAttempt > LOCKOUT_MS) {
    store.failedAttempts = { count: 0, lastAttempt: 0, locked: false }
    return false
  }
  return true
}

// ── Clients CRUD ───────────────────────────────────────────────────────────

export function getAllClients(): ClientRecord[] {
  return Array.from(store.clients.values()).sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  )
}

export function getClient(id: string): ClientRecord | undefined {
  return store.clients.get(id)
}

export function upsertClient(data: Omit<ClientRecord, 'id' | 'handled'> & { id?: string; waNumber?: string }): ClientRecord {
  const id       = data.id ?? `CLT-${Date.now()}`
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
    // email kept for long-term contact
    address: '', tfn: '', bankDetails: '',
    primaryJob: '', marital: '', taxStatus: '', howHeard: '', auPhone: '',
    files: { bankStatement: null, selfiePassport: null, invoices: null },
  })
  return true
}

// ── Seed demo data (development / staging only) ────────────────────────────
// This data lives only in the in-memory store (used as fallback when DB is unavailable).
// It is intentionally suppressed in production to prevent confusion with real clients.

if (store.clients.size === 0 && process.env.NODE_ENV !== 'production') {
  const demo = [
    { fullName:'Sophie Lambert',  dob:'1998-04-12', whatsapp:'+33612345678', email:'sophie@email.com',  country:'France',  taxYear:'2023-24' as TaxYear, primaryJob:'Barista – The Grounds' },
    { fullName:'Marco Bianchi',   dob:'1996-09-22', whatsapp:'+39333987654', email:'marco@gmail.com',   country:'Italy',   taxYear:'2022-23' as TaxYear, primaryJob:'Farm Worker – QLD' },
    { fullName:'Lena Müller',     dob:'2000-01-30', whatsapp:'+49160112233', email:'lena@web.de',       country:'Germany', taxYear:'2021-22' as TaxYear, primaryJob:'Waitress – Noosa' },
  ]
  demo.forEach((d, i) => {
    const id = `CLT-DEMO-${i + 1}`
    store.clients.set(id, {
      ...d, id, handled: false, notes: '[DEMO DATA]',
      address: 'Sydney NSW', tfn: '123 456 789', bankDetails: 'BSB 062-000',
      marital: 'Single', taxStatus: 'Working Holiday Maker', howHeard: 'Instagram',
      auPhone: '+614' + (10000000 + i),
      submittedAt: new Date(Date.now() - (i + 1) * 3 * 24 * 60 * 60 * 1000).toISOString(),
      files: { bankStatement: null, selfiePassport: null, invoices: null },
    })
  })
}
