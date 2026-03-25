// SECURITY FIX: switched from sync validateSession() to validateSessionAsync()
// with Redis revocation check. Previously a logged-out token could still return
// ok:true during the polling interval before the cookie was cleared client-side.
import { NextRequest, NextResponse } from 'next/server'
import { validateSession, validateSessionAsync } from '@/lib/crm-store'
import { createClient } from 'redis'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('crm_session')?.value

  // Quick sync check first (no Redis round-trip for obviously invalid tokens)
  if (!validateSession(token)) {
    return NextResponse.json({ ok: false })
  }

  // Full revocation check via Redis
  let redis
  try {
    redis = createClient({ url: process.env.REDIS_URL })
    await redis.connect()
    const valid = await validateSessionAsync(token, redis as import('redis').RedisClientType)
    return NextResponse.json({ ok: valid })
  } catch (err) {
    // Redis unavailable — fall back to sync-only result and log warning
    console.warn('[session] Redis unavailable, skipping revocation check:', err)
    return NextResponse.json({ ok: true })
  } finally {
    try { if (redis) await redis.disconnect() } catch {}
  }
}
