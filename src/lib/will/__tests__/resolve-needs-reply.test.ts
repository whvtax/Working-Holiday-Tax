/**
 * Full audit, 11 Oct 2026, decision 1 (item 5): a customer's task cannot be
 * marked resolved while nothing has been sent to them since it opened.
 * Naomi, Megan, Cam, Yui and Momo were "resolved" into silence.
 */
const task = { id: 't1', customerId: 'c1', status: 'OPEN', createdAt: '2026-10-10T10:00:00.000Z', reason: 'x', severity: 'REVIEW' };
const store = {
  getTaskById: jest.fn().mockResolvedValue(task),
  listMessages: jest.fn().mockResolvedValue([]),
  resolveTask: jest.fn().mockResolvedValue(undefined),
  audit: jest.fn().mockResolvedValue(undefined),
  getSetting: jest.fn().mockResolvedValue(undefined),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/auth', () => ({ sessionValid: jest.fn().mockResolvedValue(true) }));
jest.mock('@/lib/will/channel', () => ({ sendWhatsAppText: jest.fn(), sendWhatsAppTemplate: jest.fn(), deliverOut: jest.fn() }));
jest.mock('@/lib/will/scheduler', () => ({ ...jest.requireActual('@/lib/will/scheduler'), reconcileSchedule: jest.fn() }));

import { POST } from '@/app/api/will/actions/route';
const act = async (body: Record<string, unknown>) => {
  const res = await POST(new Request('http://x/api/will/actions', { method: 'POST', body: JSON.stringify(body), headers: { 'content-type': 'application/json' } }));
  return { status: res.status, json: await res.json() };
};

beforeEach(() => { store.resolveTask.mockClear(); store.audit.mockClear(); });

it('refuses when nothing was sent to the customer since the task opened', async () => {
  store.listMessages.mockResolvedValueOnce([
    { id: 'm0', customerId: 'c1', direction: 'OUT', status: 'SENT', createdAt: '2026-10-09T10:00:00.000Z', body: 'old', meta: {} },
    { id: 'm1', customerId: 'c1', direction: 'IN', status: 'SENT', createdAt: '2026-10-10T10:00:00.000Z', body: 'hello?', meta: {} },
  ]);
  const r = await act({ action: 'resolve_task', id: 't1' });
  expect(r.status).toBe(409);
  expect(r.json.error).toBe('no_reply_yet');
  expect(store.resolveTask).not.toHaveBeenCalled();
});

it('the holding line alone does not count as a reply', async () => {
  store.listMessages.mockResolvedValueOnce([
    { id: 'm2', customerId: 'c1', direction: 'OUT', status: 'SENT', createdAt: '2026-10-10T10:03:00.000Z', body: 'passed to the team', meta: { system: true } },
  ]);
  const r = await act({ action: 'resolve_task', id: 't1' });
  expect(r.json.error).toBe('no_reply_yet');
});

it('resolves once a real reply went out after the task opened', async () => {
  store.listMessages.mockResolvedValueOnce([
    { id: 'm3', customerId: 'c1', direction: 'OUT', author: 'HUMAN', status: 'SENT', createdAt: '2026-10-10T11:00:00.000Z', body: 'Here you go', meta: {} },
  ]);
  const r = await act({ action: 'resolve_task', id: 't1' });
  expect(r.json.ok).toBe(true);
  expect(store.resolveTask).toHaveBeenCalledWith('t1');
  expect(store.audit).toHaveBeenCalledWith('owner', 'task_resolved', expect.objectContaining({ id: 't1' }));
});

it('"no reply needed" closes it explicitly and is audited as such', async () => {
  const r = await act({ action: 'resolve_task', id: 't1', noReplyNeeded: true });
  expect(r.json.ok).toBe(true);
  expect(store.audit).toHaveBeenCalledWith('owner', 'task_resolved_no_reply', expect.objectContaining({ id: 't1' }));
});

it('a system task (no customer) resolves as before', async () => {
  store.getTaskById.mockResolvedValueOnce({ ...task, id: 't2', customerId: null });
  const r = await act({ action: 'resolve_task', id: 't2' });
  expect(r.json.ok).toBe(true);
});
