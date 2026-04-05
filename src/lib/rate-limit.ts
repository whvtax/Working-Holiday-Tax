/**
 * Redis-backed rate limiter for public form submissions.
 * Allows up to MAX_REQUESTS per IP per WINDOW_SECS.
 *
 * IMPORTANT: All Redis operations are wrapped in a hard 5-second timeout.
 * If Redis is unreachable (bad URL, cold start, network issue) the function
 * fails open (returns false = allow) rather than hanging the request for minutes.
 */
import { createClient } from 'redis'

const MAX_REQUESTS       = 5
const WINDOW_SECS        = 15 * 60  // 15 minutes
const CONNECT_TIMEOUT_MS = 3000     // 3 s connect timeout
const TOTAL_TIMEOUT_MS   = 5000     // 5 s hard ceiling for entire operation

// Module-level singleton — reuse connection across invocations in the same serverless instance
let _redis: ReturnType<typeof createClient> | null = null
let _redisConnecting: Promise<ReturnType<typeof createClient> | null> | null = null

async function getRedis() {
  const url = process.env.REDIS_URL
  if (!url) return null // graceful — if no Redis, skip limiting

  // Return existing connected client if healthy
  if (_redis && _redis.isReady) return _redis

  // Prevent multiple simultaneous connect attempts
  if (_redisConnecting) return _redisConnecting

  _redisConnecting = (async () => {
    try {
      const client = createClient({
        url,
        socket: {
          connectTimeout: CONNECT_TIMEOUT_MS,
          reconnectStrategy: false, // no retries in serverless — fail fast
        },
      })
      await Promise.race([
        client.connect(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Redis connect timeout')), CONNECT_TIMEOUT_MS + 500)
        ),
      ])
      _redis = client
      return client
    } catch {
      _redis = null
      return null
    } finally {
      _redisConnecting = null
    }
  })()

  return _redisConnecting
}

/**
 * Returns true if the request should be blocked (rate limit exceeded).
 * Falls back to false (allow) if Redis is unavailable or times out.
 */
export async function isRateLimited(ip: string, formName: string): Promise<boolean> {
  let redis: ReturnType<typeof createClient> | null = null
  try {
    // Wrap the entire operation in a hard 5 s timeout
    const result = await Promise.race<boolean>([
      (async () => {
        redis = await getRedis()
        if (!redis) return false

        const key = `rl:${formName}:${ip}`

        // Atomic pipeline: INCR + conditional EXPIRE in one round-trip
        const [count] = await redis
          .multi()
          .incr(key)
          .expire(key, WINDOW_SECS, 'NX') // NX = only set TTL if not already set
          .exec() as [number, number]

        return count > MAX_REQUESTS
      })(),
      new Promise<false>((resolve) =>
        setTimeout(() => {
          console.warn('[rate-limit] timed out — failing open')
          resolve(false)
        }, TOTAL_TIMEOUT_MS)
      ),
    ])
    return result
  } catch (err) {
    console.error('[rate-limit]', err)
    return false // fail open — never block legit users due to Redis issues
  } finally {
    // Connection kept alive for reuse — no disconnect in serverless singleton pattern
  }
}
