// src/app/api/crm/login/route.ts
// SECURITY FIXES:
//   - Rate-limit check moved BEFORE any crypto work (prevents CPU amplification)
//   - Uses getCachedPasswordHash() — PBKDF2 runs once at startup, not per request
//   - Brute-force counter is per-IP scoped (crm_pw_attempts:{ip})
//   - Global lockout key also set to prevent DoS via IP cycling
import { NextRequest, NextResponse } from 'next/server'
import { getCachedPasswordHash, verifyPassword, generateOtp, hashOtp } from '@/lib/crm-store'
import { auditLog } from '@/lib/audit'
import { createClient } from 'redis'
import crypto from 'crypto'

const MAX_PW_ATTEMPTS  = 5
const LOCKOUT_SECS     = 30 * 60  // 30 minutes

async function getRedis() {
  const client = createClient({ url: process.env.REDIS_URL })
  await client.connect()
  return client as import('redis').RedisClientType
}

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? 'unknown'
}

export async function POST(req: NextRequest) {
  let redis
  try {
    const body = await req.json()
    if (!body || typeof body.password !== 'string') {
      return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 })
    }
    const { password } = body
    const ip = getClientIp(req)

    redis = await getRedis()

    // ── Rate-limit check FIRST — before any crypto work ───────────────────
    const pwLockKey     = `crm_pw_locked:${ip}`
    const pwAttemptsKey = `crm_pw_attempts:${ip}`
    const globalLockKey = 'crm_pw_locked:global'

    const [ipLocked, globalLocked] = await Promise.all([
      redis.get(pwLockKey),
      redis.get(globalLockKey),
    ])

    if (ipLocked || globalLocked) {
      const ttl = await redis.ttl(ipLocked ? pwLockKey : globalLockKey)
      return NextResponse.json(
        { ok: false, message: `Too many attempts. Try again in ${Math.ceil(ttl / 60)} minutes.` },
        { status: 429 }
      )
    }

    // ── Password verification (uses cached hash — no PBKDF2 per request) ──
    const ADMIN_EMAIL = process.env.CRM_ADMIN_EMAIL ?? 'info@workingholidaytax.com.au'
    const RESEND_KEY  = process.env.RESEND_API_KEY ?? ''

    const PASSWORD_HASH = getCachedPasswordHash()

    if (!verifyPassword(password, PASSWORD_HASH)) {
      const attemptsRaw = await redis.get(pwAttemptsKey)
      const attempts    = attemptsRaw ? parseInt(attemptsRaw, 10) : 0
      const newCount    = attempts + 1

      if (newCount >= MAX_PW_ATTEMPTS) {
        await redis.set(pwLockKey,     '1', { EX: LOCKOUT_SECS })
        await redis.set(globalLockKey, '1', { EX: LOCKOUT_SECS })
        await redis.del(pwAttemptsKey)
        await auditLog('login.locked', ip, `${newCount} failed attempts`)
        await sendSecurityAlert(ADMIN_EMAIL, RESEND_KEY, newCount, ip)
        return NextResponse.json(
          { ok: false, message: 'Too many attempts. Account locked for 30 minutes.' },
          { status: 429 }
        )
      }

      await redis.set(pwAttemptsKey, newCount, { EX: LOCKOUT_SECS })
      await auditLog('login.failed', ip, `attempt ${newCount}/${MAX_PW_ATTEMPTS}`)
      return NextResponse.json({ ok: false, message: 'Incorrect password.' }, { status: 401 })
    }

    // Password correct — clear per-IP attempt counter
    await redis.del(pwAttemptsKey)

    // Generate a random pending-login token that scopes the OTP to this login attempt.
    // The token is set as an httpOnly cookie; the OTP is stored in Redis under this token.
    // This prevents an attacker on a different IP from consuming the OTP.
    const pendingToken = crypto.randomBytes(32).toString('base64url')
    const otp     = generateOtp()
    const otpHash = hashOtp(otp)
    await redis.set(`crm_otp:${pendingToken}`, otpHash, { EX: 600 })

    await sendOtpEmail(ADMIN_EMAIL, RESEND_KEY, otp)
    await auditLog('login.success', ip, 'password verified — OTP sent')

    const res = NextResponse.json({ ok: true, otpSent: true })
    res.cookies.set('crm_pending_login', pendingToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 600,  // 10 minutes — matches OTP TTL
    })
    return res

  } catch (err) {
    console.error('[CRM login]', err)
    return NextResponse.json({ ok: false, message: 'Server error.' }, { status: 500 })
  } finally {
    if (redis) await redis.disconnect()
  }
}

async function sendOtpEmail(to: string, apiKey: string, otp: string) {
  if (!apiKey) return
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
  if (!res.ok) console.error('[Resend error]', res.status, await res.text())
}

async function sendSecurityAlert(to: string, apiKey: string, attempts: number, ip: string) {
  if (!apiKey) return
  const time = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from:    'Working Holiday Tax <noreply@workingholidaytax.com.au>',
      to:      [to],
      subject: '⚠️ CRM login blocked',
      html:    `<p>${attempts} failed login attempts from IP ${ip} at ${time}. Account locked for 30 minutes.</p>`,
    }),
  })
}
