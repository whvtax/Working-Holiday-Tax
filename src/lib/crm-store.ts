/**
 * CRM In-Memory Store + Security Layer
 * 
 * In production: replace with a real DB (Postgres / Supabase / PlanetScale).
 * All sensitive operations are gated behind session + OTP checks.
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
  handled: boolean          // ✅ = טופלתי
  files: {
    bankStatement: string | null
    selfiePassport: string | null
    invoices: string | null
  }
}

export type OtpEntry = {
  code: string
  expiresAt: number         // epoch ms
  used: boolean
}

export type FailedAttempt = {
  count: number
  lastAttempt: number
  locked: boolean
}

// ── In-Memory Store (replace with DB in production) ───────────────────────

const store: {
  clients: Map<string, ClientRecord>
  session: { token: string; expiresAt: number } | null
  otp: OtpEntry | null
  failedAttempts: FailedAttempt
} = {
  clients: new Map(),
  session: null,
  otp: null,
  failedAttempts: { count: 0, lastAttempt: 0, locked: false },
}

// ── Security helpers ───────────────────────────────────────────────────────

export function generateOtp(): string {
  return crypto.randomInt(10000000, 99999999).toString()
}

export function generateSessionToken(): string {
  return crypto.randomBytes(48).toString('hex')
}

export function hashPassword(password: string): string {
  // In production use bcrypt. Here PBKDF2 for zero-dep safety.
  return crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT ?? 'whvtax-salt-2024', 100_000, 64, 'sha512').toString('hex')
}

export function verifyPassword(password: string, hash: string): boolean {
  const attempt = hashPassword(password)
  return crypto.timingSafeEqual(Buffer.from(attempt, 'hex'), Buffer.from(hash, 'hex'))
}

// ── Session ────────────────────────────────────────────────────────────────

const SESSION_TTL = 8 * 60 * 60 * 1000 // 8 hours

export function createSession(): string {
  const token = generateSessionToken()
  store.session = { token, expiresAt: Date.now() + SESSION_TTL }
  return token
}

export function validateSession(token: string | undefined): boolean {
  if (!token || !store.session) return false
  if (Date.now() > store.session.expiresAt) { store.session = null; return false }
  try {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(store.session.token))
  } catch { return false }
}

export function destroySession() {
  store.session = null
}

// ── OTP ────────────────────────────────────────────────────────────────────

const OTP_TTL = 10 * 60 * 1000 // 10 minutes

export function storeOtp(code: string) {
  store.otp = { code, expiresAt: Date.now() + OTP_TTL, used: false }
}

export function verifyOtp(code: string): boolean {
  if (!store.otp) return false
  if (store.otp.used) return false
  if (Date.now() > store.otp.expiresAt) { store.otp = null; return false }
  const valid = crypto.timingSafeEqual(Buffer.from(code.padEnd(6)), Buffer.from(store.otp.code.padEnd(6)))
  if (valid) { store.otp.used = true }
  return valid
}

// ── Brute-Force Protection ─────────────────────────────────────────────────

const MAX_ATTEMPTS = 3
const LOCKOUT_DURATION = 30 * 60 * 1000 // 30 minutes

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
  // Auto-unlock after lockout duration
  if (Date.now() - fa.lastAttempt > LOCKOUT_DURATION) {
    store.failedAttempts = { count: 0, lastAttempt: 0, locked: false }
    return false
  }
  return true
}

export function getFailedCount(): number {
  return store.failedAttempts.count
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
  const id = data.id ?? `CLT-${Date.now()}`
  const existing = store.clients.get(id)
  const record: ClientRecord = {
    ...data,
    id,
    handled: existing?.handled ?? false,
  }
  store.clients.set(id, record)
  return record
}

export function markHandled(id: string): boolean {
  const c = store.clients.get(id)
  if (!c) return false
  c.handled = true
  return true
}

/** Delete all details but keep the client shell */
export function clearClientDetails(id: string): boolean {
  const c = store.clients.get(id)
  if (!c) return false
  const cleared: ClientRecord = {
    id: c.id,
    fullName: c.fullName,
    dob: c.dob,
    whatsapp: c.whatsapp,
    email: '',
    country: '',
    address: '',
    tfn: '',
    bankDetails: '',
    primaryJob: '',
    marital: '',
    taxStatus: '',
    howHeard: '',
    auPhone: '',
    taxYear: c.taxYear,
    submittedAt: c.submittedAt,
    handled: c.handled,
    files: { bankStatement: null, selfiePassport: null, invoices: null },
  }
  store.clients.set(id, cleared)
  return true
}

// ── Seed demo data ─────────────────────────────────────────────────────────

const DEMO: Omit<ClientRecord, 'id' | 'handled'>[] = [
  {
    fullName: 'Sophie Lambert',
    dob: '1998-04-12',
    whatsapp: '+33612345678',
    email: 'sophie.lambert@email.com',
    country: 'France',
    address: '42 Bondi Rd, Sydney NSW 2026',
    tfn: '123 456 789',
    bankDetails: 'BSB 062-000 | ACC 12345678',
    primaryJob: 'Barista – The Grounds of Alexandria',
    marital: 'Single',
    taxStatus: 'Working Holiday Maker',
    howHeard: 'Instagram',
    auPhone: '+61412345678',
    taxYear: '2023-24',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    files: { bankStatement: null, selfiePassport: null, invoices: null },
  },
  {
    fullName: 'Marco Bianchi',
    dob: '1996-09-22',
    whatsapp: '+39333987654',
    email: 'marco.bianchi@gmail.com',
    country: 'Italy',
    address: '7 Collins St, Melbourne VIC 3000',
    tfn: '987 654 321',
    bankDetails: 'BSB 013-000 | ACC 87654321',
    primaryJob: 'Farm Worker – QLD',
    marital: 'Single',
    taxStatus: 'Working Holiday Maker',
    howHeard: 'Friend',
    auPhone: '+61498765432',
    taxYear: '2022-23',
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    files: { bankStatement: null, selfiePassport: null, invoices: null },
  },
  {
    fullName: 'Lena Müller',
    dob: '2000-01-30',
    whatsapp: '+49160112233',
    email: 'lena.mueller@web.de',
    country: 'Germany',
    address: '15 Queen St, Brisbane QLD 4000',
    tfn: '456 789 012',
    bankDetails: 'BSB 034-000 | ACC 45678901',
    primaryJob: 'Waitress – Noosa',
    marital: 'Single',
    taxStatus: 'Working Holiday Maker',
    howHeard: 'TikTok',
    auPhone: '+61467112233',
    taxYear: '2021-22',
    submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    files: { bankStatement: null, selfiePassport: null, invoices: null },
  },
]

// Seed on first import
if (store.clients.size === 0) {
  DEMO.forEach((d, i) => {
    const id = `CLT-DEMO-${i + 1}`
    store.clients.set(id, { ...d, id, handled: false })
  })
}

export { store }
