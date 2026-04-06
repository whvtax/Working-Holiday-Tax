import crypto from 'crypto'

export type FailedAttempt = { count: number; lastAttempt: number; locked: boolean }

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

const SESSION_TTL = 8 * 60 * 60 * 1000 // 8 hours

function jwtSecret(): Buffer {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('Missing env var: JWT_SECRET')
  return Buffer.from(secret)
}

export function createSession(): string {
  const now = Date.now()
  const payload = Buffer.from(JSON.stringify({
    iat: now,
    exp: now + SESSION_TTL,
  })).toString('base64url')
  const sig = crypto.createHmac('sha256', jwtSecret()).update(payload).digest('base64url')
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
    const { iat, exp } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    const now = Date.now()
    // Must not be expired AND must not be older than max session TTL from issuance
    if (now >= exp) return false
    if (iat && now - iat > SESSION_TTL + 60_000) return false // 1-min grace for clock skew
    return true
  } catch { return false }
}

export function destroySession() { /* stateless — cookie cleared client-side */ }

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

