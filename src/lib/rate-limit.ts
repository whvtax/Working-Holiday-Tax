// Redis rate limiter — fails open if Redis unreachable
import { createClient } from 'redis'

const MAX_REQUESTS       = 5
const WINDOW_SECS        = 15 * 60  // 15 minutes
const CONNECT_TIMEOUT_MS = 3000     // 3 s connect timeout
const TOTAL_TIMEOUT_MS   = 5000     // 5 s hard ceiling for entire operation

async function getRedis() {
  const url = process.env.REDIS_URL
  if (!url) return null // graceful — if no Redis, skip limiting
  const client = createClient({
    url,
    socket: {
      connectTimeout: CONNECT_TIMEOUT_MS,
      reconnectStrategy: false, // no retries in serverless — fail fast
    },
  })
  // Race connect against hard timeout so unreachable Redis never blocks the request
  await Promise.race([
    client.connect(),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Redis connect timeout')), CONNECT_TIMEOUT_MS + 500)
    ),
  ])
  return client
}

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
    if (redis) {
      try { await (redis as any).disconnect() } catch { /* ignore disconnect errors */ }
    }
  }
}
