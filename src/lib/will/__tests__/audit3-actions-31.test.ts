/**
 * Audit 3, lane actions, finding 31 (5 Sep): "Mark Lodged" from Will's chat
 * files the RIGHT card under Clients, and finds it however old it is.
 *
 * archiveTaskByPhone used to read the newest 500 crm_tasks and take the first
 * phone match, done or not. Two failure modes pinned here:
 *   - a card older than the newest 500 rows was silently not filed;
 *   - a newer PENDING task for the same person (super claim after the tax
 *     return) was the one archived, so a "done" super entry was filed that
 *     never happened and the real card stayed in Done.
 * Now the whole table is walked in pages, done cards first (newest first),
 * and a pending card is only taken when no done card exists for the number.
 */
type Row = { id: string; whatsapp: string; done: boolean; created_at: string };

// `archived` records the task id handed to deleteTaskAndArchive (its first
// step is getTask, which is answered with "no such row" so the transfer itself
// is not exercised here; it has its own tests).
const state: { rows: Row[]; queries: Array<{ done: boolean; from: number; to: number }>; archived: string[] } = {
  rows: [], queries: [], archived: [],
};

jest.mock('@/lib/supabase', () => ({
  getSupabase: () => ({
    from: (table: string) => {
      if (table !== 'crm_tasks') throw new Error(`unexpected table ${table}`);
      let done: boolean | null = null;
      const q = {
        select: () => q,
        eq: (col: string, v: boolean | string) => {
          if (col === 'id') state.archived.push(String(v));
          else done = v as boolean;
          return q;
        },
        maybeSingle: async () => ({ data: null, error: null }),
        order: () => q,
        range: async (from: number, to: number) => {
          state.queries.push({ done: done as boolean, from, to });
          const rows = state.rows
            .filter((r) => r.done === done)
            .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
            .slice(from, to + 1);
          return { data: rows, error: null };
        },
      };
      return q;
    },
  }),
}));
jest.mock('@/lib/upload', () => ({ deleteFiles: async () => ({ ok: true }) }));

import * as db from '@/lib/db';

beforeEach(() => {
  state.rows = []; state.queries = []; state.archived = [];
});

const at = (i: number) => new Date(Date.UTC(2026, 0, 1) + i * 60_000).toISOString();

it('files the DONE card even when 1,200 newer tasks sit above it', async () => {
  state.rows.push({ id: 'old-done', whatsapp: '0412 345 678', done: true, created_at: at(0) });
  for (let i = 1; i <= 1200; i++) {
    state.rows.push({ id: `other-${i}`, whatsapp: `04${String(i).padStart(8, '0')}`, done: i % 2 === 0, created_at: at(i) });
  }
  await expect(db.archiveTaskByPhone('61412345678')).resolves.toBe('old-done');
  expect(state.archived).toEqual(['old-done']);
  // Walked the done rows in pages of 500, never the whole table at once.
  expect(state.queries.every((q) => q.to - q.from + 1 === 500)).toBe(true);
  expect(state.queries.every((q) => q.done === true)).toBe(true);
});

it('prefers the done card over a newer pending task for the same number', async () => {
  state.rows.push({ id: 'tax-done', whatsapp: '0412 345 678', done: true, created_at: at(0) });
  state.rows.push({ id: 'super-pending', whatsapp: '+61 412 345 678', done: false, created_at: at(5) });
  await expect(db.archiveTaskByPhone('61412345678')).resolves.toBe('tax-done');
  expect(state.archived).toEqual(['tax-done']);
});

it('falls back to the pending card only when no done card exists', async () => {
  state.rows.push({ id: 'pending-only', whatsapp: '0412345678', done: false, created_at: at(0) });
  await expect(db.archiveTaskByPhone('61412345678')).resolves.toBe('pending-only');
  expect(state.queries.map((q) => q.done)).toEqual([true, false]);
});

it('returns null, and archives nothing, when no card matches', async () => {
  state.rows.push({ id: 'someone-else', whatsapp: '0499 999 999', done: true, created_at: at(0) });
  await expect(db.archiveTaskByPhone('61412345678')).resolves.toBeNull();
  expect(state.archived).toEqual([]);
});
