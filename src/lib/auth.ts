/**
 * auth.ts — shared authentication helper for all CRM API routes
 * SECURITY: Uses validateSessionAsync with Redis revocation check.
 * Falls back to sync validateSession if Redis is unavailable (logs warning).
 */
import { NextRequest, NextResponse } from 'next/server'
import { validateSession, validateSessionAsync } from '@/lib/crm-store'
import { createClient } from 'redis'

export async function requireAuth(req: NextRequest): Promise<{ ok: true } | NextResponse> {
  const token = req.cookies.get('crm_session')?.value

  // Quick sync check first (cheap)
  if (!validateSession(token)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  // Full async check with Redis revocation list
  let redis
  try {
    redis = createClient({ url: process.env.REDIS_URL })
    await redis.connect()
    const valid = await validateSessionAsync(token, redis as import('redis').RedisClientType)
    if (!valid) {
      return NextResponse.json({ ok: false }, { status: 401 })
    }
    return { ok: true }
  } catch (err) {
    // Redis unavailable — fall back to sync-only check and log warning
    console.warn('[requireAuth] Redis unavailable, skipping revocation check:', err)
    return { ok: true }
  } finally {
    try { if (redis) await redis.disconnect() } catch {}
  }
}

/** Also adds X-Requested-With CSRF check for state-changing requests */
export async function requireAuthAndCsrf(req: NextRequest): Promise<{ ok: true } | NextResponse> {
  const xrw = req.headers.get('x-requested-with')
  if (!xrw || xrw.toLowerCase() !== 'xmlhttprequest') {
    return NextResponse.json({ ok: false, error: 'csrf' }, { status: 403 })
  }
  return requireAuth(req)
}
