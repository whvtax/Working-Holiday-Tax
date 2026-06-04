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
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString())
    const { iat, exp, role } = claims
    if (requiredRole && role !== requiredRole) return false
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

// Admin session (8h)
export function createSession(): string {
  return makeToken({ exp: Date.now() + ADMIN_SESSION_TTL })
}
export function validateSession(token: string | undefined): boolean {
  return checkToken(token, ADMIN_SESSION_TTL)
}
export function destroySession() { /* stateless - cookie cleared client-side */ }

// ── Brute-force protection (Redis) ───────────────────────────────────────

const MAX_ATTEMPTS = 3
const LOCKOUT_MS   = 30 * 60 * 1000
const TTL_SECS     = 35 * 60

// Admin login - keyed PER CLIENT IP so a single attacker cannot lock the
// legitimate admin out of the CRM (a global counter made that trivial DoS).
// A separate global counter is kept for ALERTING only (it never locks anyone).
const FAIL_PREFIX   = 'crm_fail_count:'
const TS_PREFIX     = 'crm_fail_ts:'
const LOCKED_PREFIX = 'crm_locked:'
const KEY_ALERT     = 'crm_fail_alert' // global, notification only

export async function recordFailedAttemptRedis(
  redis: import('redis').RedisClientType,
  ip: string = 'unknown',
): Promise<FailedAttempt> {
  const now = Date.now()
  const kCount = FAIL_PREFIX + ip, kTs = TS_PREFIX + ip, kLocked = LOCKED_PREFIX + ip
  const count = await redis.incr(kCount)
  await redis.set(kTs, String(now), { EX: TTL_SECS })
  await redis.expire(kCount, TTL_SECS)
  const locked = count >= MAX_ATTEMPTS
  if (locked) await redis.set(kLocked, '1', { EX: TTL_SECS })
  // Global alert counter - notifies the admin of a distributed attack without
  // locking any single IP's victim out.
  await redis.incr(KEY_ALERT)
  await redis.expire(KEY_ALERT, TTL_SECS)
  return { count, lastAttempt: now, locked }
}

export async function resetFailedAttemptsRedis(
  redis: import('redis').RedisClientType,
  ip: string = 'unknown',
): Promise<void> {
  await redis.del([FAIL_PREFIX + ip, TS_PREFIX + ip, LOCKED_PREFIX + ip])
}

export async function isLockedOutRedis(
  redis: import('redis').RedisClientType,
  ip: string = 'unknown',
): Promise<boolean> {
  const kCount = FAIL_PREFIX + ip, kTs = TS_PREFIX + ip, kLocked = LOCKED_PREFIX + ip
  const locked = await redis.get(kLocked)
  if (!locked) return false
  const ts = await redis.get(kTs)
  if (ts && Date.now() - Number(ts) > LOCKOUT_MS) {
    await redis.del([kCount, kTs, kLocked])
    return false
  }
  return true
}
