import { NextRequest, NextResponse } from 'next/server'
import {
  hashPassword, verifyPassword,
  recordFailedAttempt, resetFailedAttempts, isLockedOut,
  createSession,
} from '@/lib/crm-store'

const ADMIN_EMAIL   = process.env.CRM_ADMIN_EMAIL   ?? 'admin@workingholidaytax.com.au'
const PASSWORD_HASH = process.env.CRM_PASSWORD_HASH ?? hashPassword('12345')

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()

    // Locked out: silent block
    if (isLockedOut()) {
      return NextResponse.json(
        { ok: false, message: 'Incorrect password.' },
        { status: 401 }
      )
    }

    // Wrong password
    if (!verifyPassword(password, PASSWORD_HASH)) {
      const fa = recordFailedAttempt()
      if (fa.locked) await sendSecurityAlert(ADMIN_EMAIL, fa.count)
      return NextResponse.json(
        { ok: false, message: 'Incorrect password.' },
        { status: 401 }
      )
    }

    // Correct → create session immediately, no OTP
    resetFailedAttempts()
    const token = createSession()
    const res = NextResponse.json({ ok: true })
    res.cookies.set('crm_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 8 * 60 * 60,
    })
    return res

  } catch (err) {
    console.error('[CRM login]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

async function sendSecurityAlert(to: string, attempts: number) {
  const key = process.env.RESEND_API_KEY
  if (!key) { console.warn('[CRM] Security alert — attempts:', attempts); return }
  const time = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney', dateStyle: 'medium', timeStyle: 'short' })
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'WHV Tax CRM <security@workingholidaytax.com.au>',
      to,
      subject: 'Security alert — failed login attempts on your CRM',
      html: `<div style="font-family:system-ui,sans-serif;max-width:460px;margin:0 auto;"><div style="background:#b91c1c;border-radius:16px 16px 0 0;padding:28px 32px;text-align:center;"><h1 style="color:#fff;font-size:20px;margin:0;font-weight:600;">Login attempt blocked</h1></div><div style="background:#f9fafb;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 16px 16px;padding:32px;"><p style="font-size:14px;color:#333;margin:0 0 16px;"><strong>${attempts} failed login attempts</strong> on your CRM.</p><p style="font-size:13px;color:#888;">Time: ${time} (Sydney)</p><div style="background:#fff5f5;border-left:3px solid #b91c1c;padding:12px 16px;margin-top:16px;font-size:13px;color:#555;">Change your CRM password if you didn't do this.</div></div></div>`,
    }),
  })
}
