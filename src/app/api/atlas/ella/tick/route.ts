// GET /api/atlas/ella/tick: Ella's scheduler run (Vercel cron every 10 minutes).
// Accepts the cron secret or a logged-in CRM session (the "Run now" button).
import { NextResponse } from 'next/server'
import { cronAuthorized } from '@/lib/will/auth'
import { tick } from '@/lib/ella/run'
import { ellaServices } from '@/lib/ella/services'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 300

export async function GET() {
  if (!(await cronAuthorized())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  try {
    const report = await tick(ellaServices())
    return NextResponse.json({ ok: true, report })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String((e as Error)?.message ?? e).slice(0, 300) }, { status: 500 })
  }
}
