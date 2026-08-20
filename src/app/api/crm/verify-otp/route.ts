export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '@/lib/crm-store'
import { getRedis } from '@/lib/rate-limit'
import crypto from 'crypto'

const OTP_MAX_ATTEMPTS = 5
const OTP_ATTEMPT_TTL  = 600 // 10 min - matches OTP TTL

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()
    // OTP is always 8 digits - anything else is invalid. Cap at 32 chars to
    // prevent attackers wasting CPU on huge string hashing.
    if (!code || typeof code !== 'string' || code.length > 32) {
      return NextResponse.json({ ok: false, error: 'missing_code' }, { status: 400 })
    }

    // OTP-BIND-05: the code is only redeemable by the browser that passed the
    // password step, identified by the httpOnly pre-auth cookie set at login.
    const preAuthId = req.cookies.get('crm_preauth')?.value
    if (!preAuthId || !/^[a-f0-9]{48}$/.test(preAuthId)) {
      return NextResponse.json(
        { ok: false, error: 'invalid_otp', message: 'Session expired. Please log in again.' },
        { status: 401 }
      )
    }
    const OTP_KEY = `crm_otp:${preAuthId}`
    const OTP_ATTEMPT_KEY = `crm_otp_attempts:${preAuthId}`

    const redis = await getRedis()
    if (!redis) return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })

    // Brute-force guard: limit OTP guesses per OTP lifecycle
    const attempts = await redis.incr(OTP_ATTEMPT_KEY)
    if (attempts === 1) await redis.expire(OTP_ATTEMPT_KEY, OTP_ATTEMPT_TTL)
    if (attempts > OTP_MAX_ATTEMPTS) {
      await redis.del(OTP_KEY) // invalidate OTP so attacker must restart
      return NextResponse.json(
        { ok: false, error: 'too_many_attempts', message: 'Too many attempts. Please log in again.' },
        { status: 429 }
      )
    }

    const storedHash = await redis.get(OTP_KEY)
    if (!storedHash) {
      return NextResponse.json(
        { ok: false, error: 'invalid_otp', message: 'Code expired or not found. Please login again.' },
        { status: 401 }
      )
    }

    const attemptHash = crypto.createHash('sha256').update(code.trim()).digest('hex')
    const storedBuf   = Buffer.from(storedHash, 'hex')
    const attemptBuf  = Buffer.from(attemptHash, 'hex')
    const valid = storedBuf.length === attemptBuf.length && crypto.timingSafeEqual(storedBuf, attemptBuf)

    if (!valid) {
      return NextResponse.json(
        { ok: false, error: 'invalid_otp', message: 'Invalid or expired code. Please try again.' },
        { status: 401 }
      )
    }

    // One-time use - delete OTP and attempt counter immediately
    await redis.del([OTP_KEY, OTP_ATTEMPT_KEY])

    const token = createSession()
    const res = NextResponse.json({ ok: true })
    res.cookies.set('crm_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 8 * 60 * 60,
    })
    res.cookies.set('crm_preauth', '', { path: '/', maxAge: 0 }) // consume the pre-auth cookie
    return res

  } catch (err) {
    console.error('[CRM verify-otp]', err)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
  // No disconnect() - Redis singleton stays alive for warm instance reuse
}
