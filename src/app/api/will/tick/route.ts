// Scheduler heartbeat. The dashboard calls this every ~15s while open;
// in production any external cron can hit it too. Idempotent.
import { NextResponse } from 'next/server';
import { cronAuthorized } from '@/lib/will/auth';
import { processDueJobs, ensureNightly, ensureDailyDigest } from '@/lib/will/scheduler';
import { backfillMissingTemplates, backfillKnowledgePack } from '@/lib/will/seed';
import { getStore } from '@/lib/will/store';

export const dynamic = 'force-dynamic';
// A busy morning's backlog takes longer than the platform default, and being
// killed mid-tick burned an `attempts` on every job it was holding until the
// cadence failed permanently. Paired with the scheduler's 45s time budget, which
// ends the loop cleanly before this ceiling is reached.
export const maxDuration = 60;

export async function GET() {
  if (!(await cronAuthorized())) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  // The Library is only seeded when it is completely empty, so a message added
  // to the seed after the first deploy would never reach a live install. This
  // adds the missing entries exactly once (recorded in settings) so every
  // sendable message really is visible and editable in the Library.
  await backfillMissingTemplates(getStore());
  // Same idea for the question-and-answer pack: it is part of the Library, so
  // it arrives on its own rather than behind a button nobody knew to press.
  await backfillKnowledgePack(getStore());
  // ARMING MUST NEVER BLOCK DOING.
  //
  // These two only QUEUE future work. They both end in store.addJob(), which
  // throws on any Supabase error, and they sat above processDueJobs() with no
  // catch. So one bad insert (a CHECK constraint predating a job kind, an RLS
  // change, a migration not run) stopped the loop that actually sends messages
  // from ever being reached: every Autopilot reply frozen QUEUED, every
  // follow-up unsent, silently and indefinitely. Largest blast radius in the
  // system, and a two-line fix.
  await ensureNightly().catch((e) => getStore()
    .audit('scheduler', 'ensure_nightly_failed', { error: String(e).slice(0, 200) })
    .catch(() => {}));
  await ensureDailyDigest().catch((e) => getStore()
    .audit('scheduler', 'ensure_digest_failed', { error: String(e).slice(0, 200) })
    .catch(() => {}));
  // dueJobs now throws on a DB error instead of returning an empty list. Catch
  // it here so the failure is LOUD: audited and returned as a 500, rather than a
  // 200 with an empty result that looks like a quiet, healthy "nothing to do".
  // The external cron retries on the next tick, and the health endpoint's
  // lastPersistError shows it too.
  let result;
  try {
    result = await processDueJobs();
  } catch (e) {
    await getStore().audit('scheduler', 'tick_read_failed', { error: String(e).slice(0, 300) }).catch(() => {});
    return NextResponse.json({ ok: false, error: 'tick read failed', detail: String(e).slice(0, 300) }, { status: 500 });
  }
  // PERF-04: fetch only the 20 soonest jobs from the DB, not the whole table.
  const upcoming = await getStore().listUpcomingJobs(20);
  return NextResponse.json({ ...result, upcoming });
}
