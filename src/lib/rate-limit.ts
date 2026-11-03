// Redis rate limiter. When Redis is unreachable it DEGRADES to a bounded
// per-instance in-memory counter (it does not fail open to "no limit", and it
// does not fail closed, because a real customer must still be able to submit).
// Security round 2 (sec2-cron-abuse) hardening: bounded memory, no PII in keys,
// non-numeric Redis replies treated as an error, and a byte budget with the same
// degrade-to-memory behaviour (consumeByteBudget).
// Module-level singleton: warm serverless instances reuse the connection (saves 20-80ms per request)
import { createClient } from 'redis'
import { createHash } from 'crypto'

const MAX_REQUESTS       = 5
const WINDOW_SECS        = 15 * 60   // 15 minutes
const CONNECT_TIMEOUT_MS = 3000
const TOTAL_TIMEOUT_MS   = 1500

let _client: ReturnType<typeof createClient> | null = null
let _connecting: Promise<ReturnType<typeof createClient> | null> | null = null

export async function getRedis(): Promise<ReturnType<typeof createClient> | null> {
  // Support both REDIS_URL and KV_URL (Vercel Upstash integration uses KV_URL)
  const url = process.env.REDIS_URL || process.env.KV_URL
  if (!url) return null

  // Reuse healthy connection
  if (_client?.isReady) return _client

  // Wait for in-flight connect instead of opening a second one
  if (_connecting) return _connecting

  _connecting = (async () => {
    try {
      const client = createClient({
        url,
        socket: {
          connectTimeout: CONNECT_TIMEOUT_MS,
          reconnectStrategy: (retries) => (retries >= 1 ? false : 500),
        },
      })

      client.on('error', (err) => {
        console.error('[redis] connection error:', err.message)
        _client = null
        // _connecting is deliberately NOT cleared here. The promise it holds may
        // still be pending, and nulling it let every concurrent caller during a
        // blip open its own connection. The `finally` below owns its lifetime.
      })

      await Promise.race([
        client.connect(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Redis connect timeout')), CONNECT_TIMEOUT_MS + 500)
        ),
      ])

      _client = client
      return client
    } catch (err) {
      console.error('[redis] failed to connect:', err)
      _client = null
      return null
    } finally {
      _connecting = null
    }
  })()

  return _connecting
}

const MEM_MAX_KEYS = 5000
const _memHits = new Map<string, { count: number; resetAt: number }>()

/** Hard-bounded: the old purge only removed EXPIRED entries, so a burst of
 *  distinct keys inside one window grew the map without limit and made every
 *  later call an O(n) scan (a memory and CPU lever while Redis is down). Now
 *  expired entries go first, then the oldest, so size never exceeds the cap. */
function memEvict(map: Map<string, { resetAt: number }>, now: number, max: number) {
  if (map.size <= max) return
  for (const [k, v] of map) { if (v.resetAt <= now) map.delete(k) }
  for (const k of map.keys()) { if (map.size <= max) break; map.delete(k) }
}

function memRateLimited(key: string, maxRequests: number): boolean {
  const now = Date.now()
  const entry = _memHits.get(key)
  if (!entry || entry.resetAt <= now) {
    _memHits.set(key, { count: 1, resetAt: now + WINDOW_SECS * 1000 })
    memEvict(_memHits, now, MEM_MAX_KEYS)
    return false
  }
  entry.count++
  return entry.count > maxRequests
}

/** Rate-limit keys are stored in Redis, a third party. A WhatsApp number or an
 *  email must never be part of one (round 1 did this for the tax form; the
 *  WhatsApp webhook still keyed on the raw number). Phone-shaped and email-
 *  shaped identifiers are replaced by a short hash (same person, same key, so
 *  the per-person semantics are unchanged); anything very long is hashed too,
 *  which bounds key size. IPs, 'all' and `<ip>:<hash>` pass through untouched. */
export function rateLimitIdentity(id: string): string {
  const v = String(id ?? '')
  if (/^\+?\d{7,15}$/.test(v) || v.includes('@') || v.length > 128) {
    return 'h' + createHash('sha256').update(v).digest('hex').slice(0, 24)
  }
  return v
}

export async function isRateLimited(ip: string, formName: string, maxRequests: number = MAX_REQUESTS): Promise<boolean> {
  const key = `rl:${formName}:${rateLimitIdentity(ip)}`
  try {
    const result = await Promise.race<boolean>([
      (async () => {
        const redis = await getRedis()
        if (!redis) return memRateLimited(key, maxRequests)
        const [count] = await redis
          .multi()
          .incr(key)
          .expire(key, WINDOW_SECS, 'NX')
          .exec() as [number, number]
        // A non-numeric reply (an error object from EXEC, null) used to compare
        // as `NaN > max` === false, i.e. silently "not limited" with Redis up
        // but unhealthy. Treat it as a limiter failure and use the fallback.
        if (typeof count !== 'number') return memRateLimited(key, maxRequests)
        return count > maxRequests
      })(),
      new Promise<boolean>((resolve) =>
        setTimeout(() => { console.warn('[rate-limit] timed out - using in-memory fallback'); resolve(memRateLimited(key, maxRequests)) }, TOTAL_TIMEOUT_MS)
      ),
    ])
    return result
  } catch (err) {
    console.error('[rate-limit]', err)
    return memRateLimited(key, maxRequests)
  }
  // No disconnect() - singleton stays alive across requests on the same warm instance
}

// ── Byte budget ────────────────────────────────────────────────────────────
// Used by the public upload endpoint: 100 requests x 10 MB is 1 GB per IP per
// window into the private bucket that holds identity documents. Round 1 (F-5)
// found the Redis-only budget failed OPEN when Redis was down. Now it degrades
// to a per-instance counter (under-counts across instances, so it never blocks
// a real customer more than the Redis budget would).
const _memBytes = new Map<string, { used: number; resetAt: number }>()
const MEM_BYTES_MAX_KEYS = 5000

/** Adds `bytes` to the budget for `key` and returns TRUE if the budget for the
 *  window is now exceeded. Never throws. */
export async function consumeByteBudget(key: string, bytes: number, maxBytes: number, windowSecs: number): Promise<boolean> {
  const k = `rlb:${key}`
  const mem = (): boolean => {
    const now = Date.now()
    const e = _memBytes.get(k)
    if (!e || e.resetAt <= now) {
      _memBytes.set(k, { used: bytes, resetAt: now + windowSecs * 1000 })
      memEvict(_memBytes, now, MEM_BYTES_MAX_KEYS)
      return bytes > maxBytes
    }
    e.used += bytes
    return e.used > maxBytes
  }
  try {
    return await Promise.race<boolean>([
      (async () => {
        const redis = await getRedis()
        if (!redis) return mem()
        // INCRBY and EXPIRE NX in one transaction. The old two-step form
        // (`if (used === bytes) expire`) left a key with NO ttl if the process
        // died between the two calls, which blocks that IP for ever.
        const [used] = await redis.multi().incrBy(k, bytes).expire(k, windowSecs, 'NX').exec() as [number, number]
        if (typeof used !== 'number') return mem()
        return used > maxBytes
      })(),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(mem()), TOTAL_TIMEOUT_MS)),
    ])
  } catch {
    return mem()
  }
}

/** Test hook: clear the in-memory fallbacks. */
export function _resetRateLimitMemoryForTests(): void { _memHits.clear(); _memBytes.clear() }
export function _memSizesForTests(): { hits: number; bytes: number } { return { hits: _memHits.size, bytes: _memBytes.size } }
