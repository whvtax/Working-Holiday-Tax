export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { verifyReviewerPassword, createReviewerSession, recordReviewerFailRedis, resetReviewerFailRedis, isReviewerLockedRedis } from '@/lib/crm-store'
import { getRedis } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    const hash = process.env.REVIEWER_PASSWORD_HASH
    if (!hash) return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })

    let redis: any = null
    try { redis = await getRedis() } catch (redisErr) { console.error('[reviewer-login] Redis unavailable — brute-force protection skipped:', redisErr) }

    if (redis) {
      const locked = await isReviewerLockedRedis(redis)
      if (locked) return NextResponse.json({ ok: false, locked: true }, { status: 429 })
    }

    const valid = verifyReviewerPassword(password, hash)

    if (!valid) {
      if (redis) await recordReviewerFailRedis(redis)
      return NextResponse.json({ ok: false }, { status: 401 })
    }

    if (redis) await resetReviewerFailRedis(redis)

    // Send login notification email to admin
    const adminEmail = process.env.CRM_ADMIN_EMAIL
    const resendKey  = process.env.RESEND_API_KEY
    if (adminEmail && resendKey) {
      const now = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney', dateStyle: 'full', timeStyle: 'short' })
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Working Holiday Tax <noreply@workingholidaytax.com.au>',
          to: adminEmail,
          subject: '🔔 Reviewer signed in — Working Holiday Tax',
          html: `<div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px">
            <h2 style="color:#0B5240;margin-bottom:8px">Reviewer Portal — Login Notification</h2>
            <p style="color:#587066;font-size:14px;line-height:1.6">Your reviewer has just signed in to the Review Portal.</p>
            <div style="background:#F5F9F7;border:1px solid #D4EAE2;border-radius:10px;padding:16px;margin:16px 0">
              <p style="margin:0;font-size:13px;color:#1A2822"><strong>Time:</strong> ${now} (Sydney)</p>
              <p style="margin:6px 0 0;font-size:13px;color:#1A2822"><strong>Portal:</strong> /crm/reviewer</p>
            </div>
            <p style="color:#8DA89A;font-size:12px">This is an automated security notification from Working Holiday Tax.</p>
          </div>`
        })
      }).catch(() => {}) // fire and forget
    }

    const token = createReviewerSession()
    const res = NextResponse.json({ ok: true })
    res.cookies.set('crm_reviewer_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 4 * 60 * 60,
    })
    return res
  } catch (err) {
    console.error('[reviewer-login]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
