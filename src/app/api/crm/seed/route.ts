export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { seedDemoData } from '@/lib/seed'
import { validateSession } from '@/lib/crm-store'

export async function POST(req: NextRequest) {
  // Double-guard: block in production AND require explicit opt-in env var
  // Set SEED_ENABLED=true only in dev/staging — never in production
  if (process.env.NODE_ENV === 'production' || process.env.SEED_ENABLED !== 'true') {
    return NextResponse.json({ ok: false, error: 'not_available' }, { status: 404 })
  }

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
