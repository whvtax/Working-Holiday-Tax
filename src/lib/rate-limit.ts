// Redis rate limiter — fails open if Redis unreachable
// Module-level singleton: warm serverless instances reuse the connection (saves 20-80ms per request)
import { createClient } from 'redis'

const MAX_REQUESTS       = 5
const WINDOW_SECS        = 15 * 60   // 15 minutes
const CONNECT_TIMEOUT_MS = 3000
const TOTAL_TIMEOUT_MS   = 5000

let _client: ReturnType<typeof createClient> | null = null
let _connecting: Promise<ReturnType<typeof createClient> | null> | null = null

export async function getRedis(): Promise<ReturnType<typeof createClient> | null> {
  const url = process.env.REDIS_URL
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
        _connecting = null
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

export async function isRateLimited(ip: string, formName: string): Promise<boolean> {
  try {
    const result = await Promise.race<boolean>([
      (async () => {
        const redis = await getRedis()
        if (!redis) return false
        const key = `rl:${formName}:${ip}`
        const [count] = await redis
          .multi()
          .incr(key)
          .expire(key, WINDOW_SECS, 'NX')
          .exec() as [number, number]
        return count > MAX_REQUESTS
      })(),
      new Promise<false>((resolve) =>
        setTimeout(() => { console.warn('[rate-limit] timed out — failing open'); resolve(false) }, TOTAL_TIMEOUT_MS)
      ),
    ])
    return result
  } catch (err) {
    console.error('[rate-limit]', err)
    return false
  }
  // No disconnect() — singleton stays alive across requests on the same warm instance
}
