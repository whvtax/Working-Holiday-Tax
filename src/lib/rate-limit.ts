// Redis rate limiter - fails open if Redis unreachable
// Module-level singleton: warm serverless instances reuse the connection (saves 20-80ms per request)
import { createClient } from 'redis'

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

const _memHits = new Map<string, { count: number; resetAt: number }>()
function memRateLimited(key: string, maxRequests: number): boolean {
  const now = Date.now()
  const entry = _memHits.get(key)
  if (!entry || entry.resetAt <= now) {
    _memHits.set(key, { count: 1, resetAt: now + WINDOW_SECS * 1000 })
    if (_memHits.size > 5000) { for (const [k, v] of _memHits) if (v.resetAt <= now) _memHits.delete(k) }
    return false
  }
  entry.count++
  return entry.count > maxRequests
}

export async function isRateLimited(ip: string, formName: string, maxRequests: number = MAX_REQUESTS): Promise<boolean> {
  const key = `rl:${formName}:${ip}`
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
