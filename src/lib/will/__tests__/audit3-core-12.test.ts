/**
 * Audit 3, lane core, finding 12 (5 Sep): a waiting customer is never left
 * OUT of the due batch by the 19:00 follow-up pile.
 *
 * Every follow-up that comes due during the day is re-queued to exactly 19:00,
 * so the 19:00 batch used to be a wall of FOLLOW_UP rows. dueJobs returned the
 * 50 oldest by run_at only, so once the pile passed 50 rows the two-minute
 * Autopilot timer of someone who wrote at 18:58 was not fetched at all, tick
 * after tick, until the pile had drained. The scheduler's in-batch reordering
 * (lane sched, finding 6) cannot help with a row it never received.
 *
 * Pinned here, on both stores:
 *   - the customer-facing kinds (AUTO_REPLY, FORM_RECEIVED, HANDOFF_ACK) come
 *     first in the batch, whatever their run_at, then everything else oldest
 *     first;
 *   - the batch stays capped at DUE_JOBS_BATCH;
 *   - a job that is not due yet, or not SCHEDULED, is still never returned;
 *   - the Supabase store fetches the customer-facing kinds in their own read,
 *     so the pile cannot crowd them out, and fills only the remaining room.
 */
import { mkdtempSync, promises as fsp } from 'fs';
import os from 'os';
import path from 'path';
import type { JobRow, Store } from '@/lib/will/store';
import { CUSTOMER_FACING_JOB_KINDS, DUE_JOBS_BATCH } from '@/lib/will/store';

describe('FileStore.dueJobs', () => {
  let store: Store;
  let dir: string;
  let cwdSpy: jest.SpyInstance;

  beforeEach(async () => {
    dir = mkdtempSync(path.join(os.tmpdir(), 'will-duejobs-'));
    cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(dir);
    jest.resetModules();
    const { FileStore } = await import('@/lib/will/store-file');
    store = new FileStore() as unknown as Store;
  });

  afterEach(async () => {
    cwdSpy.mockRestore();
    await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
  });

  const NOW = new Date('2026-09-05T09:05:00.000Z'); // 19:05 Sydney

  it('puts the Autopilot timer in the batch even when 80 follow-ups are older than it', async () => {
    // The 19:00 pile: 80 follow-ups all due at 19:00 sharp.
    for (let i = 0; i < 80; i++) {
      await store.addJob({ customerId: `lead${i}`, kind: 'FOLLOW_UP', payload: { seq: 1 }, runAt: '2026-09-05T09:00:00.000Z' });
    }
    // Three customers who wrote at 19:01-19:02; timers due at 19:03-19:04.
    const timer = await store.addJob({ customerId: 'writer', kind: 'AUTO_REPLY', payload: { debounce: true, messageId: 'm1' }, runAt: '2026-09-05T09:03:00.000Z' });
    const form = await store.addJob({ customerId: 'filer', kind: 'FORM_RECEIVED', payload: {}, runAt: '2026-09-05T09:04:00.000Z' });
    const ack = await store.addJob({ customerId: 'handed', kind: 'HANDOFF_ACK', payload: {}, runAt: '2026-09-05T09:02:00.000Z' });
    // Not due yet, and one already done: never in the batch.
    await store.addJob({ customerId: 'later', kind: 'AUTO_REPLY', payload: { debounce: true }, runAt: '2026-09-05T09:07:00.000Z' });
    const done = await store.addJob({ customerId: 'done', kind: 'AUTO_REPLY', payload: { debounce: true }, runAt: '2026-09-05T09:00:00.000Z' });
    await store.setJobStatus(done.id, 'DONE');

    const batch = await store.dueJobs(NOW);
    expect(batch.length).toBe(DUE_JOBS_BATCH);
    // The three waiting customers lead the batch, oldest first among themselves.
    expect(batch.slice(0, 3).map((j) => j.id)).toEqual([ack.id, timer.id, form.id]);
    // The rest is the pile, oldest first, filling the remaining room.
    expect(batch.slice(3).every((j) => j.kind === 'FOLLOW_UP')).toBe(true);
    expect(batch.slice(3).length).toBe(DUE_JOBS_BATCH - 3);
    expect(batch.find((j) => j.customerId === 'later')).toBeUndefined();
    expect(batch.find((j) => j.id === done.id)).toBeUndefined();
  });

  it('keeps plain run_at order when nothing customer-facing is due', async () => {
    const b = await store.addJob({ customerId: 'b', kind: 'FOLLOW_UP', payload: {}, runAt: '2026-09-05T09:01:00.000Z' });
    const a = await store.addJob({ customerId: 'a', kind: 'FOLLOW_UP', payload: {}, runAt: '2026-09-05T09:00:00.000Z' });
    const n = await store.addJob({ customerId: null, kind: 'NIGHTLY', payload: {}, runAt: '2026-09-05T08:00:00.000Z' });
    expect((await store.dueJobs(NOW)).map((j) => j.id)).toEqual([n.id, a.id, b.id]);
  });
});

describe('SupabaseStore.dueJobs', () => {
  type Call = { filters: Record<string, unknown>; limit?: number };
  const calls: Call[] = [];
  let facingRows: Record<string, unknown>[] = [];
  let restRows: Record<string, unknown>[] = [];
  let failFirst: string | null = null;

  const row = (id: string, kind: JobRow['kind'], runAt: string) => ({
    id, customer_id: id, kind, payload: {}, run_at: runAt, status: 'SCHEDULED', attempts: 0, created_at: runAt,
  });

  function chain(call: Call) {
    const q: Record<string, unknown> = {};
    const self = (k: string, v: unknown) => { call.filters[k] = v; return q; };
    q.select = () => q;
    q.eq = (k: string, v: unknown) => self(`eq:${k}`, v);
    q.lte = (k: string, v: unknown) => self(`lte:${k}`, v);
    q.in = (k: string, v: unknown) => self(`in:${k}`, v);
    q.not = (k: string, op: string, v: unknown) => self(`not:${k}:${op}`, v);
    q.order = () => q;
    q.limit = (n: number) => {
      call.limit = n;
      const isFacing = 'in:kind' in call.filters;
      if (failFirst && isFacing) return Promise.resolve({ data: null, error: { message: failFirst } });
      return Promise.resolve({ data: isFacing ? facingRows : restRows.slice(0, n), error: null });
    };
    return q;
  }

  jest.mock('@/lib/supabase', () => ({
    getSupabase: () => ({
      from: (table: string) => {
        const call: Call = { filters: { table } };
        calls.push(call);
        return chain(call);
      },
    }),
  }));

  beforeEach(() => { calls.length = 0; facingRows = []; restRows = []; failFirst = null; });

  it('reads the customer-facing kinds first and fills only the remaining room with the rest', async () => {
    facingRows = [row('timer', 'AUTO_REPLY', '2026-09-05T09:03:00.000Z')];
    restRows = Array.from({ length: 80 }, (_, i) => row(`fu${i}`, 'FOLLOW_UP', '2026-09-05T09:00:00.000Z'));
    const { SupabaseStore } = await import('@/lib/will/store-supabase');
    const store = new SupabaseStore() as unknown as Store;
    const batch = await store.dueJobs(new Date('2026-09-05T09:05:00.000Z'));

    expect(batch.length).toBe(DUE_JOBS_BATCH);
    expect(batch[0].id).toBe('timer');
    expect(batch.slice(1).every((j) => j.kind === 'FOLLOW_UP')).toBe(true);

    const jobCalls = calls.filter((c) => c.filters.table === 'will_jobs');
    expect(jobCalls.length).toBe(2);
    expect(jobCalls[0].filters['in:kind']).toEqual([...CUSTOMER_FACING_JOB_KINDS]);
    expect(jobCalls[0].filters['eq:status']).toBe('SCHEDULED');
    expect(jobCalls[0].filters['lte:run_at']).toBe('2026-09-05T09:05:00.000Z');
    expect(jobCalls[0].limit).toBe(DUE_JOBS_BATCH);
    expect(jobCalls[1].filters['not:kind:in']).toBe(`(${CUSTOMER_FACING_JOB_KINDS.join(',')})`);
    expect(jobCalls[1].filters['eq:status']).toBe('SCHEDULED');
    expect(jobCalls[1].limit).toBe(DUE_JOBS_BATCH - 1);
  });

  it('skips the second read when the customer-facing jobs alone fill the batch', async () => {
    facingRows = Array.from({ length: DUE_JOBS_BATCH }, (_, i) => row(`t${i}`, 'AUTO_REPLY', '2026-09-05T09:00:00.000Z'));
    const { SupabaseStore } = await import('@/lib/will/store-supabase');
    const store = new SupabaseStore() as unknown as Store;
    const batch = await store.dueJobs(new Date('2026-09-05T09:05:00.000Z'));
    expect(batch.length).toBe(DUE_JOBS_BATCH);
    expect(calls.filter((c) => c.filters.table === 'will_jobs').length).toBe(1);
  });

  it('still fails loud on a DB error instead of looking like nothing is due', async () => {
    failFirst = 'connection reset';
    const { SupabaseStore } = await import('@/lib/will/store-supabase');
    const store = new SupabaseStore() as unknown as Store;
    await expect(store.dueJobs(new Date())).rejects.toThrow(/dueJobs read failed: connection reset/);
  });
});
