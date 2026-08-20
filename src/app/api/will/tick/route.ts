// Scheduler heartbeat. The dashboard calls this every ~15s while open;
// in production any external cron can hit it too. Idempotent.
import { NextResponse } from 'next/server';
import { cronAuthorized } from '@/lib/will/auth';
import { processDueJobs, ensureNightly } from '@/lib/will/scheduler';
import { getStore } from '@/lib/will/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!cronAuthorized()) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  await ensureNightly();
  const result = await processDueJobs();
  const jobs = await getStore().listJobs();
  const upcoming = jobs
    .filter((j) => j.status === 'SCHEDULED' && j.kind !== 'NIGHTLY')
    .sort((a, b) => a.runAt.localeCompare(b.runAt))
    .slice(0, 20);
  return NextResponse.json({ ...result, upcoming });
}
