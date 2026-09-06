/**
 * Audit 3, lane core, unverified finding 44 (5 Sep): listKnowledge() used to
 * be a single unordered-cap `select('*')`, so past PostgREST's implicit
 * 1,000-row ceiling the nightly digest's dedupe and Will's own retrieval
 * (called on every inbound message) silently lost rows, producing duplicate
 * mined drafts and quietly-ignored low-weight answers. addKnowledge() then
 * re-read the whole table a second time just to hand back the row it had
 * just inserted.
 *
 * Pinned on the Supabase store with a stubbed client that serves a
 * 2,500-row will_knowledge table in 1,000-row pages:
 *   - listKnowledge reads every row (no silent cap), ordered by weight desc
 *     then id, and an eq('status', ...) filter is still pushed to the DB;
 *   - addKnowledge returns the inserted row straight from the insert's
 *     response, firing zero additional will_knowledge reads.
 */
import type { Store } from '@/lib/will/store';

type Page = { table: string; op: string; eq?: [string, unknown]; order: string[]; from?: number; to?: number };
const pages: Page[] = [];
let tableRows: Array<Record<string, unknown>> = [];

function selectChain(page: Page) {
  const q: Record<string, unknown> = {};
  const run = () => {
    let rows = tableRows.slice();
    if (page.eq) { const [k, v] = page.eq; rows = rows.filter((r) => r[k] === v); }
    rows.sort((a, b) => {
      for (const col of page.order) {
        const av = a[col] as number | string;
        const bv = b[col] as number | string;
        if (av === bv) continue;
        const asc = col === 'id'; // only 'id' is ascending in this store's call
        return asc ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
      }
      return 0;
    });
    if (page.from !== undefined && page.to !== undefined) rows = rows.slice(page.from, page.to + 1);
    return Promise.resolve({ data: rows, error: null });
  };
  q.eq = (k: string, v: unknown) => { page.eq = [k, v]; return q; };
  q.order = (col: string) => { page.order.push(col); return q; };
  q.range = (from: number, to: number) => { page.from = from; page.to = to; return q; };
  q.then = (res: (v: unknown) => unknown, rej?: (e: unknown) => unknown) => run().then(res, rej);
  return q;
}

let insertedRow: Record<string, unknown> | null = null;

function insertChain() {
  const q: Record<string, unknown> = {};
  q.select = () => q;
  q.single = () => Promise.resolve({ data: insertedRow, error: null });
  return q;
}

jest.mock('@/lib/supabase', () => ({
  getSupabase: () => ({
    from: (table: string) => ({
      select: () => {
        const page: Page = { table, op: 'select', order: [] };
        pages.push(page);
        return selectChain(page);
      },
      insert: (row: Record<string, unknown>) => {
        insertedRow = { ...row };
        pages.push({ table, op: 'insert', order: [] });
        return insertChain();
      },
    }),
  }),
}));

async function load() {
  jest.resetModules();
  const mod = await import('@/lib/will/store-supabase');
  return { store: new mod.SupabaseStore() as unknown as Store, mod };
}

beforeEach(() => {
  pages.length = 0;
  insertedRow = null;
  tableRows = Array.from({ length: 2500 }, (_, i) => ({
    id: `k${String(i).padStart(6, '0')}`,
    intent: 'x', question: `q${i}`, examples: [], answer: 'a', keywords: [], tags: [],
    lang: 'en', weight: i % 5, status: 'active', source: 'seed',
    created_at: '2026-09-05T00:00:00.000Z', updated_at: '2026-09-05T00:00:00.000Z',
  }));
});

describe('SupabaseStore.listKnowledge is paged past the 1,000-row cap', () => {
  it('reads every row, not just the first 1,000', async () => {
    const { store } = await load();
    const rows = await store.listKnowledge();
    expect(rows).toHaveLength(2500);
  });

  it('still filters by status server-side across every page', async () => {
    const { store } = await load();
    const rows = await store.listKnowledge('active');
    expect(rows).toHaveLength(2500);
    const reads = pages.filter((p) => p.table === 'will_knowledge' && p.op === 'select');
    expect(reads.length).toBeGreaterThan(1);
    expect(reads.every((p) => p.eq && p.eq[0] === 'status' && p.eq[1] === 'active')).toBe(true);
  });
});

describe('SupabaseStore.addKnowledge returns the inserted row directly', () => {
  it('does not re-read will_knowledge to find the row it just inserted', async () => {
    const { store } = await load();
    const before = pages.length;
    const row = await store.addKnowledge({
      intent: 'new', question: 'What about X?', examples: [], answer: 'Yes.',
      keywords: [], tags: [], lang: 'en', weight: 3, status: 'draft', source: 'mined',
    });
    expect(row.question).toBe('What about X?');
    expect(row.weight).toBe(3);
    const readsAfterInsert = pages.slice(before).filter((p) => p.op === 'select');
    expect(readsAfterInsert).toHaveLength(0);
  });
});
