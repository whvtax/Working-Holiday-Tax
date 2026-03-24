import { NextRequest, NextResponse } from 'next/server'
import { seedDemoData } from '@/lib/seed'
import { validateSession } from '@/lib/crm-store'

export async function POST(req: NextRequest) {
  const token = req.cookies.get('crm_session')?.value
  if (!validateSession(token)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }
  try {
    const result = await seedDemoData()
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    console.error('[seed]', err)
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 })
  }
}
