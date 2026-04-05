// src/app/api/crm/verify-otp/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '@/lib/crm-store'
import { createClient } from 'redis'
import crypto from 'crypto'

const OTP_MAX_ATTEMPTS = 5
const OTP_ATTEMPT_KEY  = 'crm_otp_attempts'
const OTP_ATTEMPT_TTL  = 600 // 10 min — matches OTP TTL

async function getRedis() {
  const client = createClient({
    url: process.env.REDIS_URL,
    socket: { connectTimeout: 3000, reconnectStrategy: false },
  })
  await Promise.race([
    client.connect(),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Redis connect timeout')), 3500)
    ),
  ])
  return client
}

export async function POST(req: NextRequest) {
  let redis
  try {
    const { code } = await req.json()
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ ok: false, error: 'missing_code' }, { status: 400 })
    }

    redis = await getRedis()

    // Brute-force guard: limit OTP guesses per OTP lifecycle
    const attempts = await redis.incr(OTP_ATTEMPT_KEY)
    if (attempts === 1) await redis.expire(OTP_ATTEMPT_KEY, OTP_ATTEMPT_TTL)
    if (attempts > OTP_MAX_ATTEMPTS) {
      // Invalidate the OTP so the attacker can't keep trying after a new login
      await redis.del('crm_otp')
      return NextResponse.json(
        { ok: false, error: 'too_many_attempts', message: 'Too many attempts. Please log in again.' },
        { status: 429 }
      )
    }

    const storedHash = await redis.get('crm_otp')

    if (!storedHash) {
      return NextResponse.json(
        { ok: false, error: 'invalid_otp', message: 'Code expired or not found. Please login again.' },
        { status: 401 }
      )
    }

    const attemptHash = crypto.createHash('sha256').update(code.trim()).digest('hex')
    const storedBuf   = Buffer.from(storedHash, 'hex')
    const attemptBuf  = Buffer.from(attemptHash, 'hex')

    let valid = false
    if (storedBuf.length === attemptBuf.length) {
      valid = crypto.timingSafeEqual(storedBuf, attemptBuf)
    }

    if (!valid) {
      return NextResponse.json(
        { ok: false, error: 'invalid_otp', message: 'Invalid or expired code. Please try again.' },
        { status: 401 }
      )
    }

    // One-time use — delete OTP and attempt counter from Redis immediately
    await redis.del('crm_otp', OTP_ATTEMPT_KEY)

    const token = createSession()
    const res = NextResponse.json({ ok: true })
    res.cookies.set('crm_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 8 * 60 * 60,
    })
    return res

  } catch (err) {
    console.error('[CRM /api/crm/verify-otp]', err)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  } finally {
    if (redis) await redis.disconnect()
  }
}
