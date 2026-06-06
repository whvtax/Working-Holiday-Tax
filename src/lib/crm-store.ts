import crypto from 'crypto'
import { getRedis } from '@/lib/rate-limit'

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

function checkToken(token: string | undefined, maxTtl: number): boolean {
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
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString())
    const { iat, exp } = claims
    // Defence-in-depth: refuse anything non-numeric so a malformed token can't slip
    // through (e.g. exp=NaN would otherwise fail `now >= exp` and grant access).
    if (typeof exp !== 'number' || !Number.isFinite(exp)) return false
    if (iat !== undefined && (typeof iat !== 'number' || !Number.isFinite(iat))) return false
    const now = Date.now()
    if (now >= exp) return false
    if (iat && now - iat > maxTtl + 60_000) return false // 1-min grace for clock skew
    return true
  } catch { return false }
}

// ── Session revocation (server-side) ──────────────────────────────────────
// Stateless tokens can't be individually revoked, so we keep a "revoked-before"
// epoch: any token issued before it is rejected. Logout bumps it. The epoch is
// held in memory (instant on the active instance) and persisted to Redis so it
// survives restarts and propagates to other warm instances within REFRESH_MS.
// FAIL-SAFE: this check can only ADD a rejection; if Redis is unavailable it
// silently degrades to in-memory only and never causes a bypass or lockout.
const REVOKE_KEY = 'crm_revoked_before'
const REFRESH_MS = 60_000
let _revokedBefore = 0
let _lastRefresh = 0

async function refreshRevocation(): Promise<void> {
  try {
    const redis = await getRedis()
    if (!redis) return
    const v = await redis.get(REVOKE_KEY)
    if (v) { const n = Number(v); if (Number.isFinite(n)) _revokedBefore = Math.max(_revokedBefore, n) }
  } catch { /* best effort */ }
}

// Admin session (8h)
export function createSession(): string {
  return makeToken({ exp: Date.now() + ADMIN_SESSION_TTL })
}

export function validateSession(token: string | undefined): boolean {
  if (!checkToken(token, ADMIN_SESSION_TTL)) return false
  // Non-blocking periodic refresh of the revocation epoch from Redis.
  const now = Date.now()
  if (now - _lastRefresh > REFRESH_MS) { _lastRefresh = now; void refreshRevocation() }
  // Reject tokens issued before the last global logout.
  if (_revokedBefore > 0) {
    try {
      const dot = (token as string).lastIndexOf('.')
      const claims = JSON.parse(Buffer.from((token as string).slice(0, dot), 'base64url').toString())
      if (typeof claims.iat === 'number' && claims.iat < _revokedBefore) return false
    } catch { /* if decode fails, signature already passed — allow */ }
  }
  return true
}

// Invalidate ALL existing sessions (used on logout). Best-effort Redis persist.
export async function destroySession(): Promise<void> {
  _revokedBefore = Date.now()
  try {
    const redis = await getRedis()
    if (redis) await redis.set(REVOKE_KEY, String(_revokedBefore))
  } catch { /* best effort */ }
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
  await redis.del([KEY_COUNT, KEY_TS, KEY_LOCKED])
}

export async function isLockedOutRedis(redis: import('redis').RedisClientType): Promise<boolean> {
  const locked = await redis.get(KEY_LOCKED)
  if (!locked) return false
  const ts = await redis.get(KEY_TS)
  if (ts && Date.now() - Number(ts) > LOCKOUT_MS) {
    await redis.del([KEY_COUNT, KEY_TS, KEY_LOCKED])
    return false
  }
  return true
}
