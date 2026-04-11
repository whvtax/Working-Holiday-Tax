// Redis rate limiter — fails open if Redis unreachable
import { getRedis, disconnectRedis } from '@/lib/redis'

const MAX_REQUESTS     = 5
const WINDOW_SECS      = 15 * 60  // 15 minutes
const TOTAL_TIMEOUT_MS = 5000     // 5 s hard ceiling for entire operation

export async function isRateLimited(ip: string, formName: string): Promise<boolean> {
  let redis = null
  try {
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
    await disconnectRedis(redis)
  }
}
