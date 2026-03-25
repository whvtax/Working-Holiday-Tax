// SECURITY FIX: requires both NODE_ENV !== 'production' AND explicit ENABLE_SEED=true
// Prevents accidental seeding even if NODE_ENV is misconfigured
import { NextRequest, NextResponse } from 'next/server'
import { seedDemoData } from '@/lib/seed'
import { requireAuthAndCsrf } from '@/lib/auth'

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_SEED !== 'true') {
    return NextResponse.json({ ok: false, error: 'not_available' }, { status: 404 })
  }

  const auth = await requireAuthAndCsrf(req)
  if (auth instanceof NextResponse) return auth

  try {
    const result = await seedDemoData()
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    console.error('[seed]', err)
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 })
  }
}
