/**
 * Audit 3, lane core, finding unverified[10] (5 Sep): will_templates.key had
 * no unique index, so two paths (a seed re-run that read an "empty" table
 * because a query error was discarded, and two racing backfill ticks) could
 * each insert a second row for the same key. Once duplicated, the live
 * prompt (ordered updated_at DESC) could use the older, unedited copy even
 * after the operator edited the newer one and saw "Saved".
 *
 * Pinned on the Supabase store with a stubbed client:
 *   - listTemplates() throws (like pageAll) on a query error instead of
 *     quietly returning [] — a transient failure can no longer read as
 *     "the Library is empty" and trigger a re-seed on top of live rows.
 *   - addTemplate() treats a unique-key violation (23505) as "already
 *     present" and hands back the row that won the race, instead of
 *     failing the backfill tick.
 */
import type { Store } from '@/lib/will/store';

type Row = Record<string, unknown>;
let rows: Row[] = [];
let listError: string | null = null;

function uniqueViolation(row: Row) {
  return rows.some((r) => r.key === row.key && row.key !== '');
}

function chain(table: string) {
  const q: Record<string, unknown> = {};
  let filterKey: string | undefined;
  let filterVal: unknown;
  let insertRow: Row | undefined;
  q.select = () => q;
  q.order = () => q;
  q.eq = (k: string, v: unknown) => { filterKey = k; filterVal = v; return q; };
  q.maybeSingle = () => {
    const hit = rows.find((r) => r[filterKey!] === filterVal);
    return Promise.resolve({ data: hit ?? null, error: null });
  };
  q.single = () => {
    if (insertRow && uniqueViolation(insertRow)) {
      return Promise.resolve({ data: null, error: { code: '23505', message: 'duplicate key value violates unique constraint "will_templates_key_uq"' } });
    }
    if (insertRow) { rows.push(insertRow); return Promise.resolve({ data: insertRow, error: null }); }
    return Promise.resolve({ data: null, error: null });
  };
  q.insert = (row: Row) => { insertRow = row; return q; };
  q.then = (res: (v: unknown) => unknown, rej?: (e: unknown) => unknown) => {
    if (table === 'will_templates' && !insertRow) {
      if (listError) return Promise.resolve({ data: null, error: { message: listError } }).then(res, rej);
      return Promise.resolve({ data: rows.slice(), error: null }).then(res, rej);
    }
    return Promise.resolve({ data: [], error: null }).then(res, rej);
  };
  return q;
}

jest.mock('@/lib/supabase', () => ({
  getSupabase: () => ({ from: (table: string) => chain(table) }),
}));

async function load() {
  jest.resetModules();
  const mod = await import('@/lib/will/store-supabase');
  const store = new mod.SupabaseStore() as unknown as Store;
  // Skip the seed-on-empty path so listTemplates hits our stub directly.
  (store as unknown as { ensureSeeded: () => Promise<void> }).ensureSeeded = async () => {};
  return { store, mod };
}

beforeEach(() => {
  rows = [{ id: 'r1', key: 'opening', category: 'Opening', title: 'Opening', body: 'Hi', requires_meta: false, versions: 1, updated_at: '2026-09-01T00:00:00.000Z' }];
  listError = null;
});

describe('SupabaseStore templates: no silent duplicate keys', () => {
  it('listTemplates throws on a query error instead of returning an empty Library', async () => {
    listError = 'timeout';
    const { store, mod } = await load();
    await expect(store.listTemplates()).rejects.toBeTruthy();
    expect(mod.lastPersistError).toMatch(/listTemplates: timeout/);
  });

  it('listTemplates returns the rows on a clean read', async () => {
    const { store } = await load();
    const list = await store.listTemplates();
    expect(list).toHaveLength(1);
    expect(list[0].key).toBe('opening');
  });

  it('addTemplate treats a unique-key violation as "already present" and hands back the winning row', async () => {
    const { store } = await load();
    // Someone else already inserted this key (the racing backfill tick).
    const result = await store.addTemplate({ key: 'opening', category: 'Opening', title: 'Opening', body: 'new copy' });
    expect(result.key).toBe('opening');
    expect(result.body).toBe('Hi'); // the row that won the race, not a second copy
    expect(rows.filter((r) => r.key === 'opening')).toHaveLength(1);
  });

  it('addTemplate still inserts normally when the key is new', async () => {
    const { store } = await load();
    const result = await store.addTemplate({ key: 'brand_new', category: 'Custom', title: 'New', body: 'body' });
    expect(result.key).toBe('brand_new');
    expect(rows.filter((r) => r.key === 'brand_new')).toHaveLength(1);
  });
});
