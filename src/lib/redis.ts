// Shared Redis factory — single source of truth for all route handlers
import { createClient } from 'redis'

const CONNECT_TIMEOUT_MS = 3000

export type RedisClient = ReturnType<typeof createClient>

/**
 * Creates and connects a Redis client.
 * Returns null if REDIS_URL is not configured (graceful degradation).
 * Throws if connection times out.
 */
export async function getRedis(): Promise<RedisClient | null> {
  const url = process.env.REDIS_URL
  if (!url) return null

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

  return client
}

export async function disconnectRedis(redis: RedisClient | null): Promise<void> {
  if (!redis) return
  try { await redis.disconnect() } catch { /* ignore disconnect errors */ }
}
