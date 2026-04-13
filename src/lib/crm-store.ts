import crypto from 'crypto'

export type FailedAttempt = { count: number; lastAttempt: number; locked: boolean }

// ── Password hashing ──────────────────────────────────────────────────────

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

// ── Session tokens ────────────────────────────────────────────────────────

const ADMIN_SESSION_TTL    = 8 * 60 * 60 * 1000  // 8 hours in ms
const REVIEWER_SESSION_TTL = 4 * 60 * 60 * 1000  // 4 hours in ms

function jwtSecret(): Buffer {
  const s = process.env.JWT_SECRET
  if (!s) throw new Error('Missing env var: JWT_SECRET')
  return Buffer.from(s)
}

function makeToken(claims: Record<string, unknown>): string {
  const now = Date.now()
  const payload = Buffer.from(JSON.stringify({ iat: now, ...claims })).toString('base64url')
  const sig = crypto.createHmac('sha256', jwtSecret()).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

function checkToken(token: string | undefined, maxTtl: number, requiredRole?: string): boolean {
  if (!token) return false
  try {
    const dot = token.lastIndexOf('.')
    if (dot < 0) return false
    const payload = token.slice(0, dot)
    const sig     = token.slice(dot + 1)
    const expected = crypto.createHmac('sha256', jwtSecret()).update(payload).digest('base64url')
    const a = Buffer.from(sig)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false
    const { iat, exp, role } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (requiredRole && role !== requiredRole) return false
    const now = Date.now()
    if (now >= exp) return false
    if (iat && now - iat > maxTtl + 60_000) return false // 1-min grace for clock skew
    return true
  } catch { return false }
}

// Admin session (8h)
export function createSession(): string {
  return makeToken({ exp: Date.now() + ADMIN_SESSION_TTL })
}
export function validateSession(token: string | undefined): boolean {
  return checkToken(token, ADMIN_SESSION_TTL)
}
export function destroySession() { /* stateless — cookie cleared client-side */ }

// Reviewer session (4h, role-locked)
export function createReviewerSession(): string {
  return makeToken({ exp: Date.now() + REVIEWER_SESSION_TTL, role: 'reviewer' })
}
export function validateReviewerSession(token: string | undefined): boolean {
  return checkToken(token, REVIEWER_SESSION_TTL, 'reviewer')
}

// ── Reviewer password ─────────────────────────────────────────────────────

export function hashReviewerPassword(password: string): string {
  const salt = process.env.PASSWORD_SALT
  if (!salt) throw new Error('Missing env var: PASSWORD_SALT')
  const reviewerSalt = process.env.REVIEWER_SALT || (salt + '_reviewer')
  return crypto.pbkdf2Sync(password, reviewerSalt, 100_000, 64, 'sha512').toString('hex')
}

export function verifyReviewerPassword(password: string, hash: string): boolean {
  try {
    const attempt = hashReviewerPassword(password)
    return crypto.timingSafeEqual(Buffer.from(attempt, 'hex'), Buffer.from(hash, 'hex'))
  } catch { return false }
}

// ── Brute-force protection (Redis) ───────────────────────────────────────

const MAX_ATTEMPTS = 3
const LOCKOUT_MS   = 30 * 60 * 1000
const TTL_SECS     = 35 * 60

// Admin login
const KEY_COUNT  = 'crm_fail_count'
const KEY_TS     = 'crm_fail_ts'
const KEY_LOCKED = 'crm_locked'

export async function recordFailedAttemptRedis(redis: import('redis').RedisClientType): Promise<FailedAttempt> {
  const now = Date.now()
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
    await redis.del(KEY_COUNT, KEY_TS, KEY_LOCKED)
    return false
  }
  return true
}

// Reviewer login (separate keys)
const RV_KEY_COUNT  = 'rv_fail_count'
const RV_KEY_TS     = 'rv_fail_ts'
const RV_KEY_LOCKED = 'rv_locked'

export async function recordReviewerFailRedis(redis: import('redis').RedisClientType): Promise<FailedAttempt> {
  const now = Date.now()
  const count = await redis.incr(RV_KEY_COUNT)
  await redis.set(RV_KEY_TS, String(now), { EX: TTL_SECS })
  await redis.expire(RV_KEY_COUNT, TTL_SECS)
  const locked = count >= MAX_ATTEMPTS
  if (locked) await redis.set(RV_KEY_LOCKED, '1', { EX: TTL_SECS })
  return { count, lastAttempt: now, locked }
}

export async function resetReviewerFailRedis(redis: import('redis').RedisClientType): Promise<void> {
  await redis.del(RV_KEY_COUNT, RV_KEY_TS, RV_KEY_LOCKED)
}

export async function isReviewerLockedRedis(redis: import('redis').RedisClientType): Promise<boolean> {
  const locked = await redis.get(RV_KEY_LOCKED)
  if (!locked) return false
  const ts = await redis.get(RV_KEY_TS)
  if (ts && Date.now() - Number(ts) > LOCKOUT_MS) {
    await redis.del(RV_KEY_COUNT, RV_KEY_TS, RV_KEY_LOCKED)
    return false
  }
  return true
}
