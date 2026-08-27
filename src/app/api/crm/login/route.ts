export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import {
  hashPassword, verifyPassword,
  recordFailedAttemptRedis, resetFailedAttemptsRedis, isLockedOutRedis,
  generateOtp,
} from '@/lib/crm-store'
import { getRedis } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'
import crypto from 'crypto'
type RedisClient = import('redis').RedisClientType

let _cachedPasswordHash: string | null = null
function getPasswordHash(): string {
  if (_cachedPasswordHash) return _cachedPasswordHash
  const raw = process.env.CRM_PASSWORD
  if (!raw) throw new Error('Missing env var: CRM_PASSWORD')
  _cachedPasswordHash = hashPassword(raw)
  return _cachedPasswordHash
}

export async function POST(req: NextRequest) {
  try {
    let body: unknown
    try { body = await req.json() }
    catch { return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 }) }

    const password = (body as Record<string, unknown>)?.password
    // Cap password length: PBKDF2 with 100k iterations on a multi-MB string is a
    // DoS amplification vector. 200 chars is far above any reasonable password.
    if (typeof password !== 'string' || password.length === 0 || password.length > 200) {
      return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 })
    }

    const ADMIN_EMAIL = process.env.CRM_ADMIN_EMAIL
    const RESEND_KEY  = process.env.RESEND_API_KEY ?? ''

    let PASSWORD_HASH: string
    try { PASSWORD_HASH = getPasswordHash() }
    catch { return NextResponse.json({ ok: false, message: 'Server misconfiguration.' }, { status: 500 }) }

    const redis = await getRedis()
    if (!redis) return NextResponse.json({ ok: false, message: 'Server misconfiguration.' }, { status: 500 })

    // AUTHZ-DOS-01: lockout is keyed per client IP, not globally.
    const ip = getClientIp(req)

    if (await isLockedOutRedis(redis as RedisClient, ip)) {
      return NextResponse.json({ ok: false, message: 'Too many attempts. Try again later.' }, { status: 401 })
    }

    if (!verifyPassword(password, PASSWORD_HASH)) {
      const fa = await recordFailedAttemptRedis(redis as RedisClient, ip)
      // Genuinely fire-and-forget now: `await` here made the alert block the
      // login response, so the wrong-password reply waited on Resend. The
      // function catches internally, so nothing can escape as an unhandled
      // rejection; `void` marks the floating promise as intentional.
      if (fa.locked && ADMIN_EMAIL) void sendSecurityAlert(ADMIN_EMAIL, RESEND_KEY, fa.count)
      return NextResponse.json({ ok: false, message: 'Incorrect password.' }, { status: 401 })
    }

    await resetFailedAttemptsRedis(redis as RedisClient, ip)

    // OTP-BIND-05: bind the OTP to the browser that passed the password step.
    // A random pre-auth id is stored in an httpOnly cookie; the OTP hash and its
    // attempt counter are namespaced by that id, so the code is only redeemable
    // by this browser (not guessable against a single global key).
    const preAuthId = crypto.randomBytes(24).toString('hex')
    const otp = generateOtp()
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex')
    await redis.del(`crm_otp_attempts:${preAuthId}`)
    await redis.set(`crm_otp:${preAuthId}`, otpHash, { EX: 600 }) // 10 minutes

    if (ADMIN_EMAIL) {
      const sent = await sendOtpEmail(ADMIN_EMAIL, RESEND_KEY, otp)
      if (!sent) {
        console.error('[CRM login] OTP generated but email delivery failed')
        return NextResponse.json({ ok: false, message: 'Failed to send login code. Please try again.' }, { status: 500 })
      }
    }

    const res = NextResponse.json({ ok: true, otpSent: true })
    res.cookies.set('crm_preauth', preAuthId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 600,
    })
    return res

  } catch (err) {
    console.error('[CRM login]', err)
    return NextResponse.json({ ok: false, message: 'Server error.' }, { status: 500 })
  }
  // No disconnect() - Redis singleton stays alive for warm instance reuse
}

/** Ceiling on a Resend call. Both calls sit on the login path, and neither had
 *  one: a hanging request took the whole login with it. */
const RESEND_TIMEOUT_MS = 8000

async function sendOtpEmail(to: string, apiKey: string, otp: string): Promise<boolean> {
  if (!apiKey) return false
  const time = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from:    'Working Holiday Tax <noreply@workingholidaytax.com.au>',
        to:      [to],
        subject: 'Your CRM login code',
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:400px;margin:0 auto;">
            <div style="background:#0B5240;border-radius:16px 16px 0 0;padding:28px 32px;text-align:center;">
              <h1 style="color:#fff;font-size:18px;margin:0;font-weight:600;">CRM Login Code</h1>
            </div>
            <div style="background:#f9fafb;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 16px 16px;padding:32px;text-align:center;">
              <p style="font-size:14px;color:#555;margin:0 0 20px;">Your one-time login code:</p>
              <div style="background:#fff;border:2px solid #0B5240;border-radius:12px;padding:20px;letter-spacing:0.3em;font-size:32px;font-weight:700;color:#0B5240;">${otp}</div>
              <p style="font-size:12px;color:#999;margin:16px 0 0;">Valid for 10 minutes · ${time} (Sydney)</p>
            </div>
          </div>
        `,
      }),
      // Without this, an unresponsive Resend holds the login request open until
      // the platform kills it: the operator sees a hung login, not an error.
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
    })
    if (!res.ok) { console.error('[Resend error]', res.status, await res.text()); return false }
    return true
  } catch (err) {
    console.error('[sendOtpEmail]', err)
    return false
  }
}

async function sendSecurityAlert(to: string, apiKey: string, attempts: number) {
  if (!apiKey) return
  const time = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from:    'Working Holiday Tax <noreply@workingholidaytax.com.au>',
      to:      [to],
      subject: '⚠️ CRM login blocked',
      html:    `<p>${attempts} failed login attempts at ${time}</p>`,
    }),
    signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
  }).catch(() => {}) // fire and forget - don't block the login response
}
