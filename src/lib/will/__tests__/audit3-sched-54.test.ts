/**
 * Audit 3, lane sched, finding 54 (5 Sep): will_jobs was never purged, and the
 * nightly orphan sweep paged the whole table to find a few SCHEDULED rows.
 *
 * Pinned here:
 *   - purgeFinishedJobs removes CANCELLED/FAILED of any kind and DONE of every
 *     kind except FOLLOW_UP, only past the cutoff, and never anything
 *     SCHEDULED or CLAIMED; DONE FOLLOW_UP rows stay whatever their age,
 *     because reconcileSchedule counts them to resume a cadence;
 *   - listScheduledJobs returns exactly the SCHEDULED rows, soonest first;
 *   - runNightly reads the sweep through listScheduledJobs when the store has
 *     it, still falls back to allJobs, and calls the purge at 30 days;
 *   - the Supabase purge is written as a counted delete with the same rule.
 */
import { mkdtempSync, promises as fsp, readFileSync } from 'fs';
import os from 'os';
import path from 'path';
import type { Store } from '@/lib/will/store';

const read = (p: string) => readFileSync(path.join(process.cwd(), p), 'utf8');
const DAY = 24 * 60 * 60 * 1000;

describe('FileStore.purgeFinishedJobs / listScheduledJobs', () => {
  let store: Store;
  let dir: string;
  let cwdSpy: jest.SpyInstance;

  beforeEach(async () => {
    dir = mkdtempSync(path.join(os.tmpdir(), 'will-purgejobs-'));
    cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(dir);
    jest.resetModules();
    const { FileStore } = await import('@/lib/will/store-file');
    store = new FileStore() as unknown as Store;
  });

  afterEach(async () => {
    jest.useRealTimers();
    cwdSpy.mockRestore();
    await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
  });

  it('drops old finished rows but keeps DONE follow-ups, live rows and recent rows', async () => {
    jest.useFakeTimers({ doNotFake: ['nextTick', 'setImmediate'] });
    // Forty days ago: everything created here is past a 30-day cutoff.
    jest.setSystemTime(new Date('2026-07-27T00:00:00.000Z'));
    const oldDoneFollowUp = await store.addJob({ customerId: 'c1', kind: 'FOLLOW_UP', payload: { flow: 'prePayment', seq: 0 }, runAt: '2026-07-27T09:00:00.000Z' });
    await store.setJobStatus(oldDoneFollowUp.id, 'DONE');
    const oldCancelledFollowUp = await store.addJob({ customerId: 'c1', kind: 'FOLLOW_UP', payload: { flow: 'prePayment', seq: 1 }, runAt: '2026-07-27T09:00:00.000Z' });
    await store.setJobStatus(oldCancelledFollowUp.id, 'CANCELLED');
    const oldDoneTimer = await store.addJob({ customerId: 'c1', kind: 'AUTO_REPLY', payload: { debounce: true }, runAt: '2026-07-27T09:02:00.000Z' });
    await store.setJobStatus(oldDoneTimer.id, 'DONE');
    const oldFailedLost = await store.addJob({ customerId: null, kind: 'LOST_ANALYSIS', payload: {}, runAt: '2026-07-27T09:00:00.000Z' });
    await store.setJobStatus(oldFailedLost.id, 'FAILED');
    const oldScheduled = await store.addJob({ customerId: 'c2', kind: 'FOLLOW_UP', payload: { flow: 'form', seq: 0 }, runAt: '2026-09-10T09:00:00.000Z' });
    const oldClaimed = await store.addJob({ customerId: 'c3', kind: 'AUTO_REPLY', payload: { debounce: true }, runAt: '2026-07-27T09:02:00.000Z' });
    await store.claimJob(oldClaimed.id);

    // Today: a recent finished row is not old enough to go.
    jest.setSystemTime(new Date('2026-09-05T00:00:00.000Z'));
    const recentDoneTimer = await store.addJob({ customerId: 'c1', kind: 'AUTO_REPLY', payload: { debounce: true }, runAt: '2026-09-05T09:02:00.000Z' });
    await store.setJobStatus(recentDoneTimer.id, 'DONE');

    const removed = await store.purgeFinishedJobs!(30 * DAY);
    expect(removed).toBe(3);

    const left = new Set((await store.listJobs()).map((j) => j.id));
    expect(left.has(oldDoneFollowUp.id)).toBe(true);     // the cadence's memory
    expect(left.has(oldScheduled.id)).toBe(true);        // live
    expect(left.has(oldClaimed.id)).toBe(true);          // live
    expect(left.has(recentDoneTimer.id)).toBe(true);     // too recent
    expect(left.has(oldCancelledFollowUp.id)).toBe(false);
    expect(left.has(oldDoneTimer.id)).toBe(false);
    expect(left.has(oldFailedLost.id)).toBe(false);

    // A second pass finds nothing more: the purge is idempotent.
    expect(await store.purgeFinishedJobs!(30 * DAY)).toBe(0);
  });

  it('listScheduledJobs is exactly the SCHEDULED rows, soonest first', async () => {
    const later = await store.addJob({ customerId: 'b', kind: 'FOLLOW_UP', payload: {}, runAt: '2026-09-06T09:00:00.000Z' });
    const sooner = await store.addJob({ customerId: 'a', kind: 'AUTO_REPLY', payload: { debounce: true }, runAt: '2026-09-05T09:00:00.000Z' });
    const done = await store.addJob({ customerId: 'c', kind: 'FOLLOW_UP', payload: {}, runAt: '2026-09-05T08:00:00.000Z' });
    await store.setJobStatus(done.id, 'DONE');
    const claimed = await store.addJob({ customerId: 'd', kind: 'FOLLOW_UP', payload: {}, runAt: '2026-09-05T07:00:00.000Z' });
    await store.claimJob(claimed.id);

    expect((await store.listScheduledJobs!()).map((j) => j.id)).toEqual([sooner.id, later.id]);
  });
});

describe('runNightly wiring', () => {
  const nightly = (() => {
    const s = read('src/lib/will/scheduler.ts');
    const start = s.indexOf('export async function runNightly');
    return s.slice(start);
  })();

  it('sweeps orphans from SCHEDULED rows only, with allJobs kept as the fallback', () => {
    expect(nightly).toMatch(/typeof store\.listScheduledJobs === 'function'\s*\?\s*await store\.listScheduledJobs\(\)\s*:\s*await store\.allJobs\(\)/);
    expect(nightly).toMatch(/j\.status === 'SCHEDULED' && j\.customerId && !customerIds\.has\(j\.customerId\)/);
  });

  it('purges finished jobs at 30 days, best effort, and logs the count', () => {
    expect(nightly).toMatch(/store\.purgeFinishedJobs\(30 \* 24 \* 60 \* 60 \* 1000\)\.catch\(\(\) => 0\)/);
    expect(nightly).toMatch(/maintenance_complete.*jobsPurged/);
  });
});

describe('SupabaseStore.purgeFinishedJobs shape', () => {
  const src = read('src/lib/will/store-supabase.ts');

  it('is a counted delete on will_jobs older than the cutoff with the FOLLOW_UP exception', () => {
    const start = src.indexOf('async purgeFinishedJobs(');
    expect(start).toBeGreaterThan(0);
    const body = src.slice(start, src.indexOf('\n  }\n', start));
    expect(body).toMatch(/from\('will_jobs'\)/);
    expect(body).toMatch(/\.delete\(\{ count: 'exact' \}\)/);
    expect(body).toMatch(/\.lt\('created_at', cutoff\)/);
    expect(body).toMatch(/\.or\('status\.in\.\(CANCELLED,FAILED\),and\(status\.eq\.DONE,kind\.neq\.FOLLOW_UP\)'\)/);
  });

  it('listScheduledJobs filters on status in the database and pages', () => {
    const start = src.indexOf('async listScheduledJobs(');
    expect(start).toBeGreaterThan(0);
    const body = src.slice(start, src.indexOf('\n  }\n', start));
    expect(body).toMatch(/\.eq\('status', 'SCHEDULED'\)/);
    expect(body).toMatch(/\.range\(from, from \+ PAGE - 1\)/);
  });
});
