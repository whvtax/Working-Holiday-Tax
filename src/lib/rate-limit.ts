/**
 * Redis-backed rate limiter for public form submissions.
 * Allows up to MAX_REQUESTS per IP per WINDOW_SECS.
 *
 * Uses an atomic pipeline (MULTI/EXEC) to ensure INCR and EXPIRE
 * are applied together — prevents a race where EXPIRE never fires
 * after a successful INCR, creating a permanent block.
 */
import { createClient } from 'redis'

const MAX_REQUESTS = 5
const WINDOW_SECS  = 15 * 60 // 15 minutes

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

    const key = `rl:${formName}:${ip}`

    // Atomic pipeline: INCR + conditional EXPIRE in one round-trip
    // If INCR returns 1, this is the first request — set the TTL.
    // Subsequent INCRs leave the existing TTL untouched (KEEPTTL implied).
    const [count] = await redis
      .multi()
      .incr(key)
      .expire(key, WINDOW_SECS, 'NX') // NX = only set if key has no TTL yet
      .exec() as [number, number]

    return count > MAX_REQUESTS
  } catch (err) {
    console.error('[rate-limit]', err)
    return false // fail open — don't block legit users if Redis is down
  } finally {
    if (redis) await (redis as any).disconnect()
  }
}
