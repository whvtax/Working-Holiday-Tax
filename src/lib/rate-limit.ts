/**
 * Redis-backed rate limiter for public form submissions.
 * Allows up to MAX_REQUESTS per IP per WINDOW_SECS.
 */
import { createClient } from 'redis'

const MAX_REQUESTS  = 5
const WINDOW_SECS   = 15 * 60 // 15 minutes

async function getRedis() {
  const url = process.env.REDIS_URL
  if (!url) return null // graceful — if no Redis, skip limiting
  const client = createClient({ url })
  await client.connect()
  return client
}

/**
 * Returns true if the request should be blocked (rate limit exceeded).
 * Falls back to false (allow) if Redis is unavailable.
 */
export async function isRateLimited(ip: string, formName: string): Promise<boolean> {
  let redis
  try {
    redis = await getRedis()
    if (!redis) return false

    const key   = `rl:${formName}:${ip}`
    const count = await redis.incr(key)
    if (count === 1) await redis.expire(key, WINDOW_SECS) // set TTL on first hit
    return count > MAX_REQUESTS
  } catch (err) {
    console.error('[rate-limit]', err)
    return false // fail open — don't block legit users if Redis is down
  } finally {
    if (redis) await (redis as any).disconnect()
  }
}
