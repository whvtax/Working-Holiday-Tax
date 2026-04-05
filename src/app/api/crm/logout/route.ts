export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { destroySession } from '@/lib/crm-store'

export async function POST(req: NextRequest) {
  destroySession()
  const res = NextResponse.json({ ok: true })
  // Clear with identical flags to the set — browsers require flag parity to
  // remove a cookie. Missing httpOnly/secure/sameSite means the clear may
  // not remove the cookie in strict environments.
  res.cookies.set('crm_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })
  return res
}
