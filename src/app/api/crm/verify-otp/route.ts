import { NextRequest, NextResponse } from 'next/server'
import { verifyOtp, createSession } from '@/lib/crm-store'

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ ok: false, error: 'missing_code' }, { status: 400 })
    }
    if (!verifyOtp(code.trim())) {
      return NextResponse.json(
        { ok: false, error: 'invalid_otp', message: 'Invalid or expired code. Please try again.' },
        { status: 401 }
      )
    }
    const token = createSession()
    const res = NextResponse.json({ ok: true })
    res.cookies.set('crm_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/crm',
      maxAge: 8 * 60 * 60,
    })
    return res
  } catch (err) {
    console.error('[CRM /api/crm/verify-otp]', err)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
