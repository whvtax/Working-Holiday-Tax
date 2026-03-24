// src/app/api/crm/verify-otp/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '@/lib/crm-store'
import { kv } from '@vercel/kv'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ ok: false, error: 'missing_code' }, { status: 400 })
    }

    // Read OTP hash from KV (shared across all serverless instances)
    const storedHash = await kv.get<string>('crm_otp')
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
      return NextResponse.json(
        { ok: false, error: 'invalid_otp', message: 'Invalid or expired code. Please try again.' },
        { status: 401 }
      )
    }

    // One-time use — delete from KV immediately
    await kv.del('crm_otp')

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
  }
}
