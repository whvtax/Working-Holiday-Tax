/**
 * /api/will/state no longer ships the whole customer table on every change
 * tick (audit3, core 5).
 *
 * What this pins:
 *  - the bootstrap route reads ONE bounded page of the newest conversations
 *    (listChatPage) and never listCustomers(), which pages the whole table;
 *  - a task or pending draft whose customer is OUTSIDE that window still gets
 *    its WhatsApp number attached, and that customer row is added to
 *    `customers`, so the Tasks screen, the drawer and the chat header resolve
 *    it exactly as before;
 *  - the by-id lookup only asks for ids the window did not already carry;
 *  - the response shape (customers, tasks, templates, pending, followupIds,
 *    autoReplyIds, total, stageCounts) is unchanged;
 *  - FileStore.listCustomersByIds returns exactly the asked-for rows.
 */
const sessionValid = jest.fn().mockReturnValue(true);
jest.mock('@/lib/will/auth', () => ({ sessionValid: async () => sessionValid() }));

const listCustomers = jest.fn(async () => { throw new Error('listCustomers must not be called by the state route'); });
const listChatPage = jest.fn(async (_offset: number, _limit: number) => window);
const listCustomersByIds = jest.fn(async (ids: string[]) => allRows.filter((c) => ids.includes(c.id as string)));

let window: Record<string, unknown>[] = [];
let allRows: Record<string, unknown>[] = [];
let tasks: Record<string, unknown>[] = [];
let pending: Record<string, unknown>[] = [];

jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    listCustomers,
    listChatPage,
    listCustomersByIds,
    listTasks: async () => tasks,
    listTemplates: async () => [],
    pendingApprovals: async () => pending,
    customerIdsWithScheduledFollowup: async () => ['c1'],
    customerIdsWithPendingAutoReply: async () => [],
    countCustomers: async () => 5000,
    countInStates: async () => 7,
  }),
}));

import { GET } from '@/app/api/will/state/route';

beforeEach(() => {
  sessionValid.mockReturnValue(true);
  listChatPage.mockClear();
  listCustomersByIds.mockClear();
  listCustomers.mockClear();
  allRows = [
    { id: 'c1', waId: '61400000001', name: 'Recent', state: 'PRICE_SENT' },
    { id: 'c2', waId: '61400000002', name: 'Also recent', state: 'PAID' },
    { id: 'old', waId: '61400000099', name: 'Old handoff', state: 'FORM_PENDING' },
    { id: 'olddraft', waId: '61400000098', name: 'Old draft', state: 'NEW_LEAD' },
  ];
  window = allRows.slice(0, 2);
  tasks = [
    { id: 't1', customerId: 'c1', customerName: 'Recent', reason: 'x', severity: 'REVIEW', status: 'OPEN', createdAt: 'a' },
    { id: 't2', customerId: 'old', customerName: 'Old handoff', reason: 'y', severity: 'URGENT', status: 'OPEN', createdAt: 'b' },
    { id: 't3', customerId: null, customerName: null, reason: 'system', severity: 'REVIEW', status: 'OPEN', createdAt: 'c' },
  ];
  pending = [
    { id: 'm1', customerId: 'olddraft', customerName: 'Old draft', direction: 'OUT', status: 'PENDING_APPROVAL', body: 'hi' },
  ];
});

async function body() {
  const res = await GET();
  return res.json();
}

it('reads one bounded page of newest conversations, never the whole table', async () => {
  await body();
  expect(listCustomers).not.toHaveBeenCalled();
  expect(listChatPage).toHaveBeenCalledTimes(1);
  const [offset, limit] = listChatPage.mock.calls[0];
  expect(offset).toBe(0);
  expect(limit).toBeGreaterThan(0);
  expect(limit).toBeLessThanOrEqual(1000);
});

it('attaches the number to every task and draft, including customers outside the window', async () => {
  const d = await body();
  const byId = Object.fromEntries(d.tasks.map((t: { id: string; waId: string | null }) => [t.id, t.waId]));
  expect(byId.t1).toBe('61400000001');
  expect(byId.t2).toBe('61400000099');
  expect(byId.t3).toBeNull();
  expect(d.pending[0].waId).toBe('61400000098');
});

it('adds the referenced out-of-window customers to `customers` and asks only for those ids', async () => {
  const d = await body();
  const ids = d.customers.map((c: { id: string }) => c.id);
  expect(ids).toEqual(expect.arrayContaining(['c1', 'c2', 'old', 'olddraft']));
  expect(ids).toHaveLength(4);
  expect(listCustomersByIds).toHaveBeenCalledTimes(1);
  expect([...listCustomersByIds.mock.calls[0][0]].sort()).toEqual(['old', 'olddraft']);
});

it('skips the by-id lookup entirely when every task and draft is already in the window', async () => {
  tasks = [tasks[0], tasks[2]];
  pending = [];
  const d = await body();
  expect(listCustomersByIds).not.toHaveBeenCalled();
  expect(d.customers.map((c: { id: string }) => c.id)).toEqual(['c1', 'c2']);
});

it('keeps the response shape, with the true totals from COUNT(*)', async () => {
  const d = await body();
  expect(Object.keys(d).sort()).toEqual(
    ['autoReplyIds', 'customers', 'followupIds', 'pending', 'stageCounts', 'tasks', 'templates', 'total'],
  );
  expect(d.total).toBe(5000);
  expect(d.followupIds).toEqual(['c1']);
  expect(Object.values(d.stageCounts).every((n) => n === 7)).toBe(true);
});

it('refuses a caller with no CRM session', async () => {
  sessionValid.mockReturnValue(false);
  const res = await GET();
  expect(res.status).toBe(401);
});

describe('FileStore.listCustomersByIds', () => {
  it('returns exactly the asked-for rows and nothing for unknown ids', async () => {
    const { mkdtempSync, promises: fsp } = await import('fs');
    const os = await import('os');
    const path = await import('path');
    const dir = mkdtempSync(path.join(os.tmpdir(), 'will-byids-'));
    const cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(dir);
    try {
      jest.resetModules();
      const { FileStore } = await import('@/lib/will/store-file');
      const store = new FileStore();
      const a = await store.createCustomer({ waId: '61411111111' });
      const b = await store.createCustomer({ waId: '61422222222' });
      await store.createCustomer({ waId: '61433333333' });
      const rows = await store.listCustomersByIds([a.id, b.id, 'no-such-id']);
      expect(rows.map((c) => c.id).sort()).toEqual([a.id, b.id].sort());
      expect(await store.listCustomersByIds([])).toEqual([]);
    } finally {
      cwdSpy.mockRestore();
      await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
    }
  });
});
