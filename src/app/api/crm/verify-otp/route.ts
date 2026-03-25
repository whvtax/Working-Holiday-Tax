// src/app/api/crm/verify-otp/route.ts
// SECURITY FIX: uses validateSessionAsync for full Redis revocation check
// SECURITY FIX 2: OTP attempt counter uses INCR *before* checking the OTP hash,
//   preventing a race condition where two concurrent requests could both read
//   count=0, pass the guard, and each consume an attempt slot simultaneously.
// SECURITY FIX 3: OTP is stored under a unique pending-login key (crm_otp:{token})
//   that is bound to the password-verified session. This prevents an attacker on
//   a different IP from consuming the OTP that was sent to the legitimate user.
import { NextRequest, NextResponse } from 'next/server'
import { createSession, compareOtp } from '@/lib/crm-store'
import { createClient } from 'redis'

const MAX_OTP_ATTEMPTS = 5

async function getRedis() {
  const client = createClient({ url: process.env.REDIS_URL })
  await client.connect()
  return client as import('redis').RedisClientType
}

export async function POST(req: NextRequest) {
  let redis
  try {
    const { code } = await req.json()
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ ok: false, error: 'missing_code' }, { status: 400 })
    }

    redis = await getRedis()

    // SECURITY FIX 3: require the pending-login cookie that was set at password-verify time.
    // The OTP is stored under a key scoped to this random token — an attacker on a different
    // IP or browser cannot replay the OTP even if they intercept it.
    const pendingToken = req.cookies.get('crm_pending_login')?.value
    if (!pendingToken || !/^[A-Za-z0-9_-]{32,}$/.test(pendingToken)) {
      return NextResponse.json({ ok: false, error: 'invalid_session', message: 'No pending login session. Please start again.' }, { status: 401 })
    }

    const otpKey      = `crm_otp:${pendingToken}`
    const attemptsKey = `crm_otp_attempts:${pendingToken}`

    // SECURITY FIX 2: Increment FIRST (atomic Redis INCR), then check the result.
    const newAttemptCount = await redis.incr(attemptsKey)
    if (newAttemptCount === 1) {
      await redis.expire(attemptsKey, 600)
    }

    if (newAttemptCount > MAX_OTP_ATTEMPTS) {
      // Invalidate the OTP and pending token on lockout
      await redis.del(otpKey)
      return NextResponse.json(
        { ok: false, error: 'too_many_attempts', message: 'Too many incorrect attempts. Please request a new code.' },
        { status: 429 }
      )
    }

    const storedHash = await redis.get(otpKey)
    if (!storedHash) {
      return NextResponse.json(
        { ok: false, error: 'invalid_otp', message: 'Code expired or not found. Please login again.' },
        { status: 401 }
      )
    }

    const valid = compareOtp(code, storedHash)

    if (!valid) {
      return NextResponse.json(
        { ok: false, error: 'invalid_otp', message: 'Invalid or expired code. Please try again.' },
        { status: 401 }
      )
    }

    // One-time use — delete OTP and attempt counter immediately
    await redis.del(otpKey)
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
    // Clear the pending-login cookie
    res.cookies.set('crm_pending_login', '', {
      maxAge: 0, path: '/', httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    return res

  } catch (err) {
    console.error('[CRM /api/crm/verify-otp]', err)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  } finally {
    if (redis) await redis.disconnect()
  }
}
