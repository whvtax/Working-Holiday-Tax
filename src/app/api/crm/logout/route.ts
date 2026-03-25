// src/app/api/crm/logout/route.ts
// SECURITY FIX: destroySession() now adds the token jti to Redis revocation set
// so stolen cookies cannot be reused after logout.
import { NextRequest, NextResponse } from 'next/server'
import { destroySession, parseSession } from '@/lib/crm-store'
import { auditLog } from '@/lib/audit'
import { createClient } from 'redis'

async function getRedis() {
  const client = createClient({ url: process.env.REDIS_URL })
  await client.connect()
  return client as import('redis').RedisClientType
}

export async function POST(req: NextRequest) {
  let redis
  try {
    redis = await getRedis()
    const token = req.cookies.get('crm_session')?.value
    const session = parseSession(token)
    await destroySession(token, redis)
    await auditLog('logout', session?.jti ?? 'unknown')
  } catch (err) {
    console.error('[CRM logout] Redis error — cookie cleared anyway', err)
  } finally {
    if (redis) await redis.disconnect()
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set('crm_session', '', {
    maxAge: 0, path: '/', httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
  return res
}
