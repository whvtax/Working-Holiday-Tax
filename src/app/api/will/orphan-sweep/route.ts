// Daily sweep of upload files that never reached a task (forms not submitted).
// Cron secret or CRM session only. Counts only in the reply and the log: never file names.
import { NextResponse } from 'next/server'
import { cronAuthorized } from '@/lib/will/auth'
import { runOrphanSweep } from '@/lib/orphan-sweep-run'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET() {
  if (!(await cronAuthorized())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  const r = await runOrphanSweep()
  console.log(`[orphan-sweep] listed=${r.listed} orphans=${r.orphans} deleted=${r.deleted} dryRun=${r.dryRun}${r.error ? ` error=${r.error}` : ''}`)
  return NextResponse.json({ ok: !r.error, ...r }, { status: r.error ? 500 : 200 })
}
