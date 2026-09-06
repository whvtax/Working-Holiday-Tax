/**
 * Audit 3, lane core, finding 45 (5 Sep): pageAll walks a table by keyset,
 * not OFFSET, so a full read (export, monthly insights, nightly scans, /state
 * bootstrap) stays flat in cost as the tables grow instead of timing out.
 *
 * Pinned on the Supabase store with a stubbed client that serves a 2,500 row
 * table in 1,000 row pages:
 *   - no page uses .range(): each page is `order(key).limit(1000)`, and pages
 *     after the first carry `gt(key, lastSeenKey)` forward;
 *   - all rows come back once, in key order, identical to the old offset walk;
 *   - a DB error still throws with a named message and sets lastPersistError.
 */
import type { Store } from '@/lib/will/store';

type Page = { table: string; gt?: [string, unknown]; order?: string; limit?: number; ranged: boolean };
const pages: Page[] = [];
let tableRows: Array<Record<string, unknown>> = [];
let failWith: string | null = null;

function chain(page: Page) {
  const q: Record<string, unknown> = {};
  const run = () => {
    if (failWith) return Promise.resolve({ data: null, error: { message: failWith } });
    let rows = tableRows.slice();
    if (page.gt) { const [k, v] = page.gt; rows = rows.filter((r) => String(r[k]) > String(v)); }
    rows.sort((a, b) => String(a[page.order ?? 'id']).localeCompare(String(b[page.order ?? 'id'])));
    if (page.limit !== undefined) rows = rows.slice(0, page.limit);
    return Promise.resolve({ data: rows, error: null });
  };
  q.select = () => q;
  q.gt = (k: string, v: unknown) => { page.gt = [k, v]; return q; };
  q.order = (col: string) => { page.order = col; return q; };
  q.limit = (n: number) => { page.limit = n; return q; };
  q.range = () => { page.ranged = true; return q; };
  q.then = (res: (v: unknown) => unknown, rej?: (e: unknown) => unknown) => run().then(res, rej);
  return q;
}

jest.mock('@/lib/supabase', () => ({
  getSupabase: () => ({
    from: (table: string) => {
      const page: Page = { table, ranged: false };
      pages.push(page);
      return chain(page);
    },
  }),
}));

async function load() {
  jest.resetModules();
  const mod = await import('@/lib/will/store-supabase');
  return { store: new mod.SupabaseStore() as unknown as Store, mod };
}

const pad = (n: number) => `c${String(n).padStart(6, '0')}`;

beforeEach(() => {
  pages.length = 0;
  failWith = null;
  tableRows = Array.from({ length: 2500 }, (_, i) => ({
    id: pad(i), phone: `+61${i}`, name: `N${i}`, state: 'NEW', created_at: '2026-09-05T00:00:00.000Z',
  }));
});

describe('SupabaseStore.pageAll uses keyset pagination', () => {
  it('reads every row once, in key order, without a single OFFSET range', async () => {
    const { store } = await load();
    const rows = await store.allCustomers();
    expect(rows).toHaveLength(2500);
    expect(rows.map((r) => r.id)).toEqual(tableRows.map((r) => r.id));

    const reads = pages.filter((p) => p.table === 'will_customers');
    expect(reads).toHaveLength(3);
    expect(reads.every((p) => !p.ranged)).toBe(true);
    expect(reads.every((p) => p.limit === 1000 && p.order === 'id')).toBe(true);
    expect(reads[0].gt).toBeUndefined();
    expect(reads[1].gt).toEqual(['id', pad(999)]);
    expect(reads[2].gt).toEqual(['id', pad(1999)]);
  });

  it('stops after one page when the table fits in it', async () => {
    tableRows = tableRows.slice(0, 40);
    const { store } = await load();
    expect(await store.allCustomers()).toHaveLength(40);
    expect(pages.filter((p) => p.table === 'will_customers')).toHaveLength(1);
  });

  it('still fails loud on a DB error', async () => {
    failWith = 'timeout';
    const { store, mod } = await load();
    await expect(store.allCustomers()).rejects.toBeTruthy();
    expect(mod.lastPersistError).toMatch(/pageAll will_customers: timeout/);
  });
});
