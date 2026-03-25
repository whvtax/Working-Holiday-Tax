// src/app/api/crm/verify-otp/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '@/lib/crm-store'
import { createClient } from 'redis'
import crypto from 'crypto'

const MAX_OTP_ATTEMPTS = 5

async function getRedis() {
  const client = createClient({ url: process.env.REDIS_URL })
  await client.connect()
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

    // Check attempt counter before anything else
    const attemptsKey = 'crm_otp_attempts'
    const attemptsRaw = await redis.get(attemptsKey)
    const attempts = attemptsRaw ? parseInt(attemptsRaw, 10) : 0

    if (attempts >= MAX_OTP_ATTEMPTS) {
      return NextResponse.json(
        { ok: false, error: 'too_many_attempts', message: 'Too many incorrect attempts. Please request a new code.' },
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
      // Increment attempt counter, expire alongside the OTP (10 min)
      await redis.set(attemptsKey, attempts + 1, { EX: 600 })
      return NextResponse.json(
        { ok: false, error: 'invalid_otp', message: 'Invalid or expired code. Please try again.' },
        { status: 401 }
      )
    }

    // One-time use — delete OTP and attempt counter from Redis immediately
    await redis.del('crm_otp')
    await redis.del(attemptsKey)

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
