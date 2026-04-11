import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

export async function POST(req: NextRequest) {
  // Seed endpoint must never run in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ ok: false, error: 'Not available in production.' }, { status: 403 })
  }
  // Still require admin auth in dev
  const auth = validateSession(req.cookies.get('crm_session')?.value)
  if (!auth) return NextResponse.json({ ok: false }, { status: 401 })

  try {
    const { seedDb } = await import('@/lib/seed')
    await seedDb()
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[seed]', err)
    return NextResponse.json({ ok: false, error: 'Seed failed.' }, { status: 500 })
  }
}
