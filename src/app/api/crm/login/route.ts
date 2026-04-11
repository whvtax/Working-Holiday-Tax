// src/app/api/crm/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import {
  hashPassword, verifyPassword,
  recordFailedAttemptRedis, resetFailedAttemptsRedis, isLockedOutRedis,
  generateOtp,
} from '@/lib/crm-store'
import { getRedis, disconnectRedis, RedisClient } from '@/lib/redis'
import crypto from 'crypto'

let _cachedPasswordHash: string | null = null
function getPasswordHash(): string {
  if (_cachedPasswordHash) return _cachedPasswordHash
  const raw = process.env.CRM_PASSWORD
  if (!raw) throw new Error('Missing env var: CRM_PASSWORD')
  _cachedPasswordHash = hashPassword(raw)
  return _cachedPasswordHash
}

export async function POST(req: NextRequest) {
  let redis
  try {
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 })
    }
    const password = (body as Record<string, unknown>)?.password
    if (typeof password !== 'string' || password.length === 0) {
      return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 })
    }

    const ADMIN_EMAIL = process.env.CRM_ADMIN_EMAIL
    const RESEND_KEY  = process.env.RESEND_API_KEY ?? ''
    let PASSWORD_HASH: string
    try {
      PASSWORD_HASH = getPasswordHash()
    } catch {
      return NextResponse.json({ ok: false, message: 'Server misconfiguration.' }, { status: 500 })
    }

    redis = await getRedis()

    if (await isLockedOutRedis(redis as RedisClient)) {
      return NextResponse.json({ ok: false, message: 'Too many attempts. Try again later.' }, { status: 401 })
    }

    if (!verifyPassword(password, PASSWORD_HASH)) {
      const fa = await recordFailedAttemptRedis(redis as RedisClient)
      if (fa.locked && ADMIN_EMAIL) await sendSecurityAlert(ADMIN_EMAIL, RESEND_KEY, fa.count)
      return NextResponse.json({ ok: false, message: 'Incorrect password.' }, { status: 401 })
    }

    await resetFailedAttemptsRedis(redis as RedisClient)

    // Generate OTP and store in Redis (shared across all serverless instances)
    const otp = generateOtp()
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex')
    // Reset attempt counter so a fresh login always gets a clean slate
    await redis.del('crm_otp_attempts')
    await redis.set('crm_otp', otpHash, { EX: 600 }) // expires in 10 minutes

    if (ADMIN_EMAIL) await sendOtpEmail(ADMIN_EMAIL, RESEND_KEY, otp)

    return NextResponse.json({ ok: true, otpSent: true })

  } catch (err) {
    console.error('[CRM login]', err)
    return NextResponse.json({ ok: false, message: 'Server error.' }, { status: 500 })
  } finally {
    await disconnectRedis(redis)
  }
}

async function sendOtpEmail(to: string, apiKey: string, otp: string) {
  if (!apiKey) { return }
  const time = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from:    'Working Holiday Tax <noreply@workingholidaytax.com.au>',
      to:      [to],
      subject: 'Your CRM login code',
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:400px;margin:0 auto;">
          <div style="background:#0E5C42;border-radius:16px 16px 0 0;padding:28px 32px;text-align:center;">
            <h1 style="color:#fff;font-size:18px;margin:0;font-weight:600;">CRM Login Code</h1>
          </div>
          <div style="background:#f9fafb;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 16px 16px;padding:32px;text-align:center;">
            <p style="font-size:14px;color:#555;margin:0 0 20px;">Your one-time login code:</p>
            <div style="background:#fff;border:2px solid #0E5C42;border-radius:12px;padding:20px;letter-spacing:0.3em;font-size:32px;font-weight:700;color:#0E5C42;">${otp}</div>
            <p style="font-size:12px;color:#999;margin:16px 0 0;">Valid for 10 minutes · ${time} (Sydney)</p>
          </div>
        </div>
      `,
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    console.error('[Resend error]', res.status, body)
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
      html: `<p>${attempts} failed login attempts at ${time}</p>`,
    }),
  })
}
