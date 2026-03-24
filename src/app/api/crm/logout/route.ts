import { NextRequest, NextResponse } from 'next/server'
import { destroySession } from '@/lib/crm-store'

export async function POST(req: NextRequest) {
  destroySession()
  const res = NextResponse.json({ ok: true })
  res.cookies.set('crm_session', '', { maxAge: 0, path: '/crm' })
  return res
}
