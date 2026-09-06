/**
 * Audit rows and the approve-path send failure carry the customer (audit, 5 Sep).
 *
 * When Meta rejected an approved draft, channel/send_failed was audited with
 * { id, error } only, so the System card's "WhatsApp send" row could not say
 * whom it concerned, and the toast quoted Meta's raw "(#131047) Message
 * failed to send because more than 24 hours..." with no hint of what to do.
 * Now the row carries customerId, messageId and the template name, the toast
 * and the task carry the same plain English hint the webhook already uses
 * for delivery receipts, and draft_approved / draft_discarded / task_resolved
 * carry customerId too. Nothing customer-facing changes.
 */
const customer = {
  id: 'c1', waId: '61400000001', name: 'Momo', state: 'PRICE_SENT', paid: false,
  optedOut: false, isLegacy: false, aiPaused: false, lang: null,
  lastCustomerMsgAt: new Date(Date.now() - 60_000).toISOString(), estimatedRefundCents: null,
};
const draft = {
  id: 'm1', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL',
  body: 'Hi Momo, just checking in.',
  meta: { waTemplate: { name: 'followup_1', params: ['Momo'], lang: null } },
  createdAt: new Date().toISOString(),
};
const store = {
  getMessageById: jest.fn().mockResolvedValue(draft),
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  getSetting: jest.fn().mockResolvedValue(undefined),
  listTemplates: jest.fn().mockResolvedValue([]),
  setMessageStatus: jest.fn().mockResolvedValue(undefined),
  claimMessageForSend: jest.fn().mockResolvedValue(true),
  findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
  updateTask: jest.fn().mockResolvedValue(undefined),
  addTask: jest.fn().mockResolvedValue({ id: 't1' }),
  setState: jest.fn().mockResolvedValue(true),
  updateCustomer: jest.fn().mockResolvedValue(undefined),
  audit: jest.fn().mockResolvedValue(undefined),
  markCustomerRead: jest.fn().mockResolvedValue(undefined),
  listTasks: jest.fn().mockResolvedValue([{ id: 't9', customerId: 'c1', status: 'RESOLVED' }]),
  // resolve_task reads the one task by id (audit, 5 Sep).
  getTaskById: jest.fn().mockResolvedValue({ id: 't9', customerId: 'c1', status: 'RESOLVED' }),
  listMessages: jest.fn().mockResolvedValue([]),
  resolveTask: jest.fn().mockResolvedValue(undefined),
  cancelJobsFor: jest.fn().mockResolvedValue(0),
  listJobsForCustomer: jest.fn().mockResolvedValue([]),
  addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
};
const sendWhatsAppTemplate = jest.fn();
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/auth', () => ({ sessionValid: jest.fn().mockResolvedValue(true) }));
jest.mock('@/lib/will/channel', () => ({
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppTemplate: (...a: unknown[]) => sendWhatsAppTemplate(...a),
  deliverOut: jest.fn().mockResolvedValue({ ok: true }),
}));
jest.mock('@/lib/will/scheduler', () => ({
  ...jest.requireActual('@/lib/will/scheduler'),
  reconcileSchedule: jest.fn().mockResolvedValue(undefined),
}));

import { POST } from '@/app/api/will/actions/route';

const act = (body: Record<string, unknown>) => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
})).then((r) => r.json());

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
  store.getMessageById.mockResolvedValue(draft);
  sendWhatsAppTemplate.mockReset();
});

const WINDOW_ERROR = 'meta 400: (#131047) Message failed to send because more than 24 hours have passed since the customer last replied to this number.';

it('a rejected approve audits send_failed with the customer, the message and the template', async () => {
  sendWhatsAppTemplate.mockResolvedValue({ ok: false, error: WINDOW_ERROR });
  const j = await act({ action: 'approve_message', id: 'm1' });
  expect(j.ok).toBe(false);
  expect(store.audit).toHaveBeenCalledWith('channel', 'send_failed', expect.objectContaining({
    customerId: 'c1', messageId: 'm1', template: 'followup_1', error: WINDOW_ERROR,
  }));
});

it('the toast and the task explain the 24h window rejection in plain English', async () => {
  sendWhatsAppTemplate.mockResolvedValue({ ok: false, error: WINDOW_ERROR });
  const j = await act({ action: 'approve_message', id: 'm1' });
  expect(j.blocked).toEqual(['SEND_FAILED']);
  expect(j.error).toContain('131047');
  expect(j.error).toMatch(/outside the 24h window/);
  expect(j.error).toMatch(/Send it as an approved template, or wait for the customer to write/);
  expect(j.error).not.toMatch(/ - | – | — /);
  // The one-click recovery card, same shape as deliverOut's.
  expect(store.addTask).toHaveBeenCalledTimes(1);
  const task = store.addTask.mock.calls[0][0];
  expect(task.customerId).toBe('c1');
  expect(task.reason).toMatch(/^WhatsApp send failed: meta 400: \(#131047\)/);
  expect(task.reason).toMatch(/outside the 24h window/);
  expect(task.suggestedReply).toBe(draft.body);
});

it('an unknown rejection is passed through unchanged', async () => {
  sendWhatsAppTemplate.mockResolvedValue({ ok: false, error: 'meta 400: bad' });
  const j = await act({ action: 'approve_message', id: 'm1' });
  expect(j.error).toBe('meta 400: bad');
  expect(store.addTask.mock.calls[0][0].reason).toBe('WhatsApp send failed: meta 400: bad');
});

it('draft_approved, draft_discarded and task_resolved carry customerId', async () => {
  sendWhatsAppTemplate.mockResolvedValue({ ok: true });
  await act({ action: 'approve_message', id: 'm1' });
  expect(store.audit).toHaveBeenCalledWith('owner', 'draft_approved', expect.objectContaining({ id: 'm1', customerId: 'c1', template: 'followup_1' }));

  await act({ action: 'discard_message', id: 'm1' });
  expect(store.audit).toHaveBeenCalledWith('owner', 'draft_discarded', expect.objectContaining({ id: 'm1', customerId: 'c1' }));

  await act({ action: 'resolve_task', id: 't9' });
  expect(store.resolveTask).toHaveBeenCalledWith('t9');
  expect(store.audit).toHaveBeenCalledWith('owner', 'task_resolved', expect.objectContaining({ id: 't9', customerId: 'c1' }));
});

it('resolve_task still resolves when the task cannot be looked up', async () => {
  store.getTaskById.mockRejectedValueOnce(new Error('down'));
  const j = await act({ action: 'resolve_task', id: 't9' });
  expect(j.ok).toBe(true);
  expect(store.audit).toHaveBeenCalledWith('owner', 'task_resolved', expect.objectContaining({ id: 't9', customerId: null }));
});

it('task_reply_sent (send_task_reply) also carries the customerId, not only the taskId', async () => {
  // A Human Task answered from the Tasks tab, without opening the chat: the
  // one audit row this action writes had only taskId, so the same trail-by-
  // person gap this file already closed for send_failed / draft_approved /
  // draft_discarded / task_resolved was still open here (audit3, 5 Sep).
  store.getTaskById.mockResolvedValueOnce({ id: 't1', customerId: 'c1', status: 'OPEN' });
  const j = await act({ action: 'send_task_reply', id: 't1', body: 'All good, thanks for checking.' });
  expect(j.ok).toBe(true);
  expect(store.audit).toHaveBeenCalledWith('owner', 'task_reply_sent', { taskId: 't1', customerId: 'c1' });
});
