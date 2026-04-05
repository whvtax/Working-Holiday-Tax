export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

export async function GET(req: NextRequest) {
  const valid = validateSession(req.cookies.get('crm_session')?.value)
  return NextResponse.json({ ok: valid })
}
