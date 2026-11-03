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
  if (s.length < 32 && !_warnedWeakSecret) {
    // Warn only: rejecting here could lock everyone out if production holds a
    // shorter value. See round 2 report AUTH2-09.
    _warnedWeakSecret = true
    console.error('[crm-store] JWT_SECRET is shorter than 32 characters; rotate it to a random 48+ byte value')
  }
  return Buffer.from(s)
}
let _warnedWeakSecret = false

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
const REVOKED_SIDS_KEY = 'crm_revoked_sids' // sorted set: member = sid, score = expiry ms
const REFRESH_MS = 60_000
const REFRESH_TIMEOUT_MS = 1_500
let _revokedBefore = 0
let _lastRefresh = 0
let _inflight: Promise<void> | null = null
const _revokedSids = new Map<string, number>() // sid -> expiry ms

function pruneSids(now: number) { for (const [k, exp] of _revokedSids) if (exp <= now) _revokedSids.delete(k) }

async function refreshRevocation(): Promise<void> {
  try {
    const redis = await getRedis()
    if (!redis) return
    const v = await redis.get(REVOKE_KEY)
    if (v) { const n = Number(v); if (Number.isFinite(n)) _revokedBefore = Math.max(_revokedBefore, n) }
    const now = Date.now()
    const sids = await redis.zRangeByScore(REVOKED_SIDS_KEY, now, '+inf')
    for (const sid of sids ?? []) if (typeof sid === 'string') _revokedSids.set(sid, now + ADMIN_SESSION_TTL)
  } catch { /* best effort */ }
}

/**
 * Wait for a fresh revoked-before epoch and revoked-session list when the
 * cached copy is older than REFRESH_MS (or this instance has never loaded it).
 * Bounded by REFRESH_TIMEOUT_MS. If Redis is down this degrades to the
 * in-memory state, exactly like before: it can only ADD a rejection. That is a
 * deliberate fail-open: new logins need Redis anyway, so an outage cannot mint
 * sessions, and failing closed would lock the owner out of the live system.
 */
export async function ensureRevocationFresh(): Promise<void> {
  const now = Date.now()
  if (_lastRefresh !== 0 && now - _lastRefresh <= REFRESH_MS) return
  if (!_inflight) {
    _lastRefresh = now
    let timer: ReturnType<typeof setTimeout> | undefined
    _inflight = Promise.race([
      refreshRevocation(),
      new Promise<void>((resolve) => { timer = setTimeout(resolve, REFRESH_TIMEOUT_MS) }),
    ]).finally(() => { clearTimeout(timer); _inflight = null })
  }
  await _inflight
}

/** validateSession, but never answers from a stale revocation cache. */
export async function validateSessionFresh(token: string | undefined): Promise<boolean> {
  if (!checkToken(token, ADMIN_SESSION_TTL)) return false
  await ensureRevocationFresh()
  return validateSession(token)
}

function readClaims(token: string): { iat?: number; exp?: number; sid?: string } | null {
  try {
    const dot = token.lastIndexOf('.')
    return JSON.parse(Buffer.from(token.slice(0, dot), 'base64url').toString())
  } catch { return null }
}

// Admin session (8h). `sid` lets a single session be revoked (idle logout)
// without bumping the global epoch that signs out every device.
export function createSession(): string {
  return makeToken({ exp: Date.now() + ADMIN_SESSION_TTL, sid: crypto.randomBytes(16).toString('hex') })
}

export function validateSession(token: string | undefined): boolean {
  if (!checkToken(token, ADMIN_SESSION_TTL)) return false
  // Non-blocking periodic refresh; callers that must not use a stale cache
  // use validateSessionFresh.
  const now = Date.now()
  if (now - _lastRefresh > REFRESH_MS) { _lastRefresh = now; void refreshRevocation() }
  const claims = readClaims(token as string)
  if (!claims) return true // signature already passed
  // Reject tokens issued before the last global logout.
  if (_revokedBefore > 0 && typeof claims.iat === 'number' && claims.iat < _revokedBefore) return false
  if (typeof claims.sid === 'string' && _revokedSids.size > 0) {
    pruneSids(now)
    if (_revokedSids.has(claims.sid)) return false
  }
  return true
}

// Invalidate ALL existing sessions (used on logout). Best-effort Redis persist.
export async function destroySession(): Promise<void> {
  _revokedBefore = Math.max(_revokedBefore, Date.now())
  try {
    const redis = await getRedis()
    if (redis) {
      const cur = Number(await redis.get(REVOKE_KEY))
      await redis.set(REVOKE_KEY, String(Math.max(_revokedBefore, Number.isFinite(cur) ? cur : 0)))
    }
  } catch { /* best effort */ }
}

/** Invalidate ONE session (idle logout): a copied cookie stops working too. */
export async function revokeSession(token: string | undefined): Promise<void> {
  if (!token || !checkToken(token, ADMIN_SESSION_TTL)) return
  const sid = readClaims(token)?.sid
  if (typeof sid !== 'string') return // pre-sid token: only the global epoch can revoke it
  const expiry = Date.now() + ADMIN_SESSION_TTL
  _revokedSids.set(sid, expiry)
  try {
    const redis = await getRedis()
    if (redis) {
      await redis.zAdd(REVOKED_SIDS_KEY, { score: expiry, value: sid })
      await redis.zRemRangeByScore(REVOKED_SIDS_KEY, '-inf', Date.now())
    }
  } catch { /* best effort */ }
}

// ── Brute-force protection (Redis) ───────────────────────────────────────

export const MAX_ATTEMPTS = 3
const LOCKOUT_MS   = 30 * 60 * 1000
const TTL_SECS     = 35 * 60

// Admin login. AUTHZ-DOS-01: keys are namespaced per client IP so one attacker
// cannot lock out the real owner from every location by tripping a single global
// counter. `scope` is the client IP (getClientIp); it falls back to 'global'
// only when the IP is unknown.
/**
 * Lockout bucket for a client IP. An IPv6 client normally controls a whole /64,
 * so keying on the full address lets one attacker rotate through 2^64 buckets
 * and never reach the 3-failure lockout. IPv6 addresses are collapsed to their
 * /64 prefix; IPv4 and anything unparseable are returned unchanged.
 */
export function lockoutScope(scope?: string): string {
  const raw = (scope || '').split('%')[0]
  if (!raw.includes(':') || raw.includes('.')) return scope || ''
  const [head, tail = ''] = raw.split('::')
  const h = head ? head.split(':') : []
  const t = raw.includes('::') && tail ? tail.split(':') : []
  if (!raw.includes('::') && h.length !== 8) return scope || ''
  const fill = raw.includes('::') ? Array(Math.max(0, 8 - h.length - t.length)).fill('0') : []
  const groups = [...h, ...fill, ...t]
  if (groups.length !== 8 || !groups.every((g) => /^[0-9a-fA-F]{1,4}$/.test(g))) return scope || ''
  return groups.slice(0, 4).map((g) => g.toLowerCase().replace(/^0+(?=.)/, '')).join(':') + '::/64'
}
const sanitizeScope = (scope?: string) => (lockoutScope(scope) || 'global').replace(/[^a-zA-Z0-9:._/-]/g, '_').slice(0, 64)
const failKeys = (scope?: string) => {
  const s = sanitizeScope(scope)
  return { count: `crm_fail_count:${s}`, ts: `crm_fail_ts:${s}`, locked: `crm_locked:${s}` }
}

export async function recordFailedAttemptRedis(redis: import('redis').RedisClientType, scope?: string): Promise<FailedAttempt> {
  const now = Date.now()
  const k = failKeys(scope)
  const count = await redis.incr(k.count)
  await redis.set(k.ts, String(now), { EX: TTL_SECS })
  await redis.expire(k.count, TTL_SECS)
  const locked = count >= MAX_ATTEMPTS
  if (locked) await redis.set(k.locked, '1', { EX: TTL_SECS })
  return { count, lastAttempt: now, locked }
}

/**
 * Reserve a password attempt BEFORE the password is checked. The old flow was
 * check-lockout, verify, then record: N parallel requests all passed the
 * lockout check before the first failure was recorded, so a burst got N guesses.
 * INCR is atomic, so only the first MAX_ATTEMPTS requests in any burst are
 * allowed to reach verifyPassword. A blocked attempt does not extend the window.
 */
export async function reserveLoginAttemptRedis(redis: import('redis').RedisClientType, scope?: string): Promise<{ allowed: boolean; count: number }> {
  const k = failKeys(scope)
  const count = await redis.incr(k.count)
  if (count === 1) await redis.expire(k.count, TTL_SECS)
  if (count > MAX_ATTEMPTS) return { allowed: false, count }
  await redis.set(k.ts, String(Date.now()), { EX: TTL_SECS })
  if (count >= MAX_ATTEMPTS) await redis.set(k.locked, '1', { EX: TTL_SECS })
  return { allowed: true, count }
}

export async function resetFailedAttemptsRedis(redis: import('redis').RedisClientType, scope?: string): Promise<void> {
  const k = failKeys(scope)
  await redis.del([k.count, k.ts, k.locked])
}

export async function isLockedOutRedis(redis: import('redis').RedisClientType, scope?: string): Promise<boolean> {
  const k = failKeys(scope)
  const locked = await redis.get(k.locked)
  if (!locked) return false
  const ts = await redis.get(k.ts)
  if (ts && Date.now() - Number(ts) > LOCKOUT_MS) {
    await redis.del([k.count, k.ts, k.locked])
    return false
  }
  return true
}
