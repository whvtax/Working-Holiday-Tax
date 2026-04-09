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
    try { redis = await getRedis() } catch {}

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
