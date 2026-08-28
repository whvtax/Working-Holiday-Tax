// Scheduler heartbeat. The dashboard calls this every ~15s while open;
// in production any external cron can hit it too. Idempotent.
import { NextResponse } from 'next/server';
import { cronAuthorized } from '@/lib/will/auth';
import { processDueJobs, ensureNightly, ensureDailyDigest } from '@/lib/will/scheduler';
import { backfillMissingTemplates } from '@/lib/will/seed';
import { getStore } from '@/lib/will/store';

export const dynamic = 'force-dynamic';
// A busy morning's backlog takes longer than the platform default, and being
// killed mid-tick burned an `attempts` on every job it was holding until the
// cadence failed permanently. Paired with the scheduler's 45s time budget, which
// ends the loop cleanly before this ceiling is reached.
export const maxDuration = 60;

export async function GET() {
  if (!cronAuthorized()) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  // The Library is only seeded when it is completely empty, so a message added
  // to the seed after the first deploy would never reach a live install. This
  // adds the missing entries exactly once (recorded in settings) so every
  // sendable message really is visible and editable in the Library.
  await backfillMissingTemplates(getStore());
  await ensureNightly();
  await ensureDailyDigest();
  const result = await processDueJobs();
  // PERF-04: fetch only the 20 soonest jobs from the DB, not the whole table.
  const upcoming = await getStore().listUpcomingJobs(20);
  return NextResponse.json({ ...result, upcoming });
}
