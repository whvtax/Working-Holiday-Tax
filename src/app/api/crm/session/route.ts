// SECURITY FIX: switched from sync validateSession() to validateSessionAsync()
// with Redis revocation check. Previously a logged-out token could still return
// ok:true during the polling interval before the cookie was cleared client-side.
// SECURITY FIX 2: Redis unavailability now returns ok:false (was ok:true).
//   Returning ok:true as a fallback let a revoked token appear valid whenever Redis
//   was temporarily unreachable — the safer posture is to deny and re-authenticate.
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
    // SECURITY FIX 2: Redis unavailable — deny the session check.
    // Fail-closed is safer than fail-open: a brief Redis outage forces re-auth
    // rather than silently accepting potentially revoked tokens.
    console.warn('[session] Redis unavailable, denying session check:', err)
    return NextResponse.json({ ok: false })
  } finally {
    try { if (redis) await redis.disconnect() } catch {}
  }
}
