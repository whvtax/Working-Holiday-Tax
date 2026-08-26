// Scheduler heartbeat. The dashboard calls this every ~15s while open;
// in production any external cron can hit it too. Idempotent.
import { NextResponse } from 'next/server';
import { cronAuthorized } from '@/lib/will/auth';
import { processDueJobs, ensureNightly, ensureDailyDigest } from '@/lib/will/scheduler';
import { getStore } from '@/lib/will/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!cronAuthorized()) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  await ensureNightly();
  await ensureDailyDigest();
  const result = await processDueJobs();
  // PERF-04: fetch only the 20 soonest jobs from the DB, not the whole table.
  const upcoming = await getStore().listUpcomingJobs(20);
  return NextResponse.json({ ...result, upcoming });
}
