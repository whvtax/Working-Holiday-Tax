/**
 * Audit 3, lane core, finding 17 (5 Sep): the lost-lead post-mortems are read
 * in full, never capped at PostgREST's 1,000 rows.
 *
 * listLostAnalyses() was a single ordered select, so once more than 1,000
 * leads had been analysed the oldest silently fell off the list. The nightly
 * job treats that list as "already analysed", so those leads were re-analysed
 * (and paid for) every night, and each fresh analysed_at pushed a different
 * lead off the cap; the lost report showed them as pending; Win-back said
 * "not assessed" for a lead that was.
 *
 * Pinned here:
 *   - the Supabase store pages will_lost_analysis by customer_id in 1,000-row
 *     ranges until a short page, and returns every row newest first;
 *   - getLostAnalysis() reads one row by key (for Win-back) and returns null
 *     when the lead has no post-mortem;
 *   - the file store has the same single-row lookup.
 */
import { mkdtempSync, promises as fsp } from 'fs';
import os from 'os';
import path from 'path';
import type { LostAnalysisRow, Store } from '@/lib/will/store';

const dbRow = (i: number, analysedAt: string) => ({
  customer_id: `c${String(i).padStart(5, '0')}`, state: 'PRICE_SENT', trigger_kind: 'quiet',
  quiet_days: 3, hours_price_to_silence: null, status: 'OK', error: null, attempts: 1,
  reason: `r${i}`, category: 'price', should_have_done: 'x', fault: 'NOT_OURS',
  recoverable: 'NO', recovery_action: null, recovery_message: null, evidence_quote: null,
  confidence: 0.8, analysed_at: analysedAt,
});

describe('SupabaseStore lost analyses', () => {
  // Mirrors the real pageAll shape (keyset: gt(key, lastSeenKey).order(key).limit(1000)),
  // not an OFFSET range (audit, 5 Sep) -- see audit3-core-45.test.ts for the pageAll pin itself.
  type Call = { table: string; filters: Record<string, unknown>; gt?: [string, unknown]; limit?: number; single?: boolean };
  const calls: Call[] = [];
  let rows: Record<string, unknown>[] = [];

  function chain(call: Call) {
    const q: Record<string, unknown> = {};
    q.select = () => q;
    q.order = () => q;
    q.gt = (k: string, v: unknown) => { call.gt = [k, v]; return q; };
    q.limit = (n: number) => { call.limit = n; return q; };
    q.eq = (k: string, v: unknown) => { call.filters[`eq:${k}`] = v; return q; };
    q.maybeSingle = () => {
      call.single = true;
      const hit = rows.find((r) => r.customer_id === call.filters['eq:customer_id']) ?? null;
      return Promise.resolve({ data: hit, error: null });
    };
    q.then = (res: (v: unknown) => unknown, rej?: (e: unknown) => unknown) => {
      let out = rows.slice();
      if (call.gt) { const [k, v] = call.gt; out = out.filter((r) => String(r[k]) > String(v)); }
      out.sort((a, b) => String(a.customer_id).localeCompare(String(b.customer_id)));
      if (call.limit !== undefined) out = out.slice(0, call.limit);
      return Promise.resolve({ data: out, error: null }).then(res, rej);
    };
    return q;
  }

  jest.mock('@/lib/supabase', () => ({
    getSupabase: () => ({
      from: (table: string) => {
        const call: Call = { table, filters: {} };
        calls.push(call);
        return chain(call);
      },
    }),
  }));

  beforeEach(() => { calls.length = 0; rows = []; });

  it('pages past 1,000 rows and returns every post-mortem newest first', async () => {
    // 2,350 analysed leads, analysed_at deliberately NOT in customer_id order.
    rows = Array.from({ length: 2350 }, (_, i) =>
      dbRow(i, new Date(Date.UTC(2026, 0, 1) + ((i * 7919) % 2350) * 60_000).toISOString()));
    const { SupabaseStore } = await import('@/lib/will/store-supabase');
    const store = new SupabaseStore() as unknown as Store;
    const out = await store.listLostAnalyses();

    expect(out.length).toBe(2350);
    expect(new Set(out.map((r) => r.customerId)).size).toBe(2350);
    for (let i = 1; i < out.length; i++) {
      expect(out[i - 1].analysedAt >= out[i].analysedAt).toBe(true);
    }
    const reads = calls.filter((c) => c.table === 'will_lost_analysis' && !c.single);
    expect(reads).toHaveLength(3);
    expect(reads.every((c) => c.limit === 1000)).toBe(true);
    expect(reads[0].gt).toBeUndefined();
    expect(reads[1].gt).toEqual(['customer_id', 'c00999']);
    expect(reads[2].gt).toEqual(['customer_id', 'c01999']);
  });

  it('getLostAnalysis reads one row by key and returns null for an unassessed lead', async () => {
    rows = [dbRow(7, '2026-09-01T00:00:00.000Z')];
    const { SupabaseStore } = await import('@/lib/will/store-supabase');
    const store = new SupabaseStore() as unknown as Store;

    const hit = await store.getLostAnalysis('c00007');
    expect(hit?.customerId).toBe('c00007');
    expect(hit?.reason).toBe('r7');
    expect(await store.getLostAnalysis('c99999')).toBeNull();

    const reads = calls.filter((c) => c.table === 'will_lost_analysis');
    expect(reads.every((c) => c.single)).toBe(true);
    expect(reads[0].filters['eq:customer_id']).toBe('c00007');
  });
});

describe('FileStore.getLostAnalysis', () => {
  let store: Store;
  let dir: string;
  let cwdSpy: jest.SpyInstance;

  beforeEach(async () => {
    dir = mkdtempSync(path.join(os.tmpdir(), 'will-lost-'));
    cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(dir);
    jest.resetModules();
    const { FileStore } = await import('@/lib/will/store-file');
    store = new FileStore() as unknown as Store;
  });

  afterEach(async () => {
    cwdSpy.mockRestore();
    await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
  });

  it('finds the stored row by customer and returns null otherwise', async () => {
    const row = {
      customerId: 'lead1', state: 'PRICE_SENT', triggerKind: 'quiet', quietDays: 3, hoursPriceToSilence: null,
      status: 'OK', error: null, attempts: 1, reason: 'went quiet after price', category: 'price',
      shouldHaveDone: 'x', fault: 'NOT_OURS', recoverable: 'NO', recoveryAction: null, recoveryMessage: null,
      evidenceQuote: null, confidence: 0.7, analysedAt: '2026-09-01T00:00:00.000Z',
    } as LostAnalysisRow;
    await store.upsertLostAnalysis(row);
    expect((await store.getLostAnalysis('lead1'))?.reason).toBe('went quiet after price');
    expect(await store.getLostAnalysis('nobody')).toBeNull();
  });
});
