/**
 * Audit 3, lane core, finding 43 (5 Sep): Supabase task writes and the
 * one-task lookup fail loud instead of swallowing the DB error.
 *
 * Before: findOpenTaskForCustomer returned null on a query error (so a blip
 * opened a duplicate card), updateTask and resolveTask ignored `error` (so the
 * customer's newest message was silently dropped from the card, and a failed
 * resolve still showed "Dismissed" before the card came back on the next
 * poll), and none of the three set lastPersistError.
 *
 * Pinned here on the Supabase store with a stubbed client:
 *   - each of the three throws with a named message on a DB error;
 *   - each sets lastPersistError so System & Costs shows the failure;
 *   - the happy path is unchanged (row found, null when none, writes resolve).
 */
import type { Store } from '@/lib/will/store';

type Call = { table: string; op: string; filters: Record<string, unknown>; patch?: unknown };
const calls: Call[] = [];
let failWith: string | null = null;
let openRow: Record<string, unknown> | null = null;

function chain(call: Call) {
  const q: Record<string, unknown> = {};
  const result = () => failWith
    ? Promise.resolve({ data: null, error: { message: failWith } })
    : Promise.resolve({ data: call.op === 'select' ? openRow : null, error: null });
  q.select = () => { call.op = 'select'; return q; };
  q.update = (patch: unknown) => { call.op = 'update'; call.patch = patch; return q; };
  q.eq = (k: string, v: unknown) => { call.filters[`eq:${k}`] = v; return q; };
  q.order = () => q;
  q.limit = () => q;
  q.maybeSingle = () => result();
  // The update chain ends on .eq(); awaiting it resolves the query.
  q.then = (res: (v: unknown) => unknown, rej?: (e: unknown) => unknown) => result().then(res, rej);
  return q;
}

jest.mock('@/lib/supabase', () => ({
  getSupabase: () => ({
    from: (table: string) => {
      const call: Call = { table, op: '', filters: {} };
      calls.push(call);
      return chain(call);
    },
  }),
}));

async function load() {
  jest.resetModules();
  const mod = await import('@/lib/will/store-supabase');
  return { store: new mod.SupabaseStore() as unknown as Store, mod };
}

beforeEach(() => { calls.length = 0; failWith = null; openRow = null; });

describe('SupabaseStore task writes fail loud', () => {
  it('findOpenTaskForCustomer throws on a DB error instead of looking like "no open task"', async () => {
    failWith = 'connection reset';
    const { store, mod } = await load();
    await expect(store.findOpenTaskForCustomer('c1')).rejects.toThrow(/findOpenTaskForCustomer read failed: connection reset/);
    expect(mod.lastPersistError).toMatch(/findOpenTaskForCustomer: connection reset/);
  });

  it('findOpenTaskForCustomer still returns the row, or null when there is none', async () => {
    openRow = {
      id: 't1', customer_id: 'c1', customer_name: 'Ana', reason: 'r', severity: 'REVIEW',
      context: null, suggested_reply: null, status: 'OPEN', created_at: '2026-09-05T00:00:00.000Z',
    };
    const { store } = await load();
    const found = await store.findOpenTaskForCustomer('c1');
    expect(found?.id).toBe('t1');
    expect(calls[0].filters['eq:customer_id']).toBe('c1');
    expect(calls[0].filters['eq:status']).toBe('OPEN');
    openRow = null;
    expect(await store.findOpenTaskForCustomer('c1')).toBeNull();
  });

  it('updateTask throws on a DB error so the folded context is not believed recorded', async () => {
    failWith = 'timeout';
    const { store, mod } = await load();
    await expect(store.updateTask('t1', { context: 'newest message' })).rejects.toThrow(/updateTask write failed: timeout/);
    expect(mod.lastPersistError).toMatch(/updateTask: timeout/);
  });

  it('updateTask resolves and sends the patch when the write succeeds', async () => {
    const { store, mod } = await load();
    await expect(store.updateTask('t1', { context: 'x', severity: 'URGENT' })).resolves.toBeUndefined();
    const w = calls.find((c) => c.table === 'will_tasks' && c.op === 'update');
    expect(w?.patch).toEqual({ context: 'x', severity: 'URGENT' });
    expect(w?.filters['eq:id']).toBe('t1');
    expect(mod.lastPersistError).toBeNull();
  });

  it('resolveTask throws on a DB error instead of a false "Dismissed"', async () => {
    failWith = 'permission denied';
    const { store, mod } = await load();
    await expect(store.resolveTask('t1')).rejects.toThrow(/resolveTask write failed: permission denied/);
    expect(mod.lastPersistError).toMatch(/resolveTask: permission denied/);
  });

  it('resolveTask resolves when the write succeeds', async () => {
    const { store } = await load();
    await expect(store.resolveTask('t1')).resolves.toBeUndefined();
    const w = calls.find((c) => c.table === 'will_tasks' && c.op === 'update');
    expect(w?.patch).toEqual({ status: 'RESOLVED' });
  });
});
