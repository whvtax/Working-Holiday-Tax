/**
 * Approving the "payment received" draft when Meta rejects the send
 * (audit, 5 Sep).
 *
 * In Approval mode a confirmed payment becomes a PENDING_APPROVAL draft with
 * proposedState PAID plus a REVIEW task saying the reply is "waiting for your
 * approval". When the owner approved it and WhatsApp rejected the send, the
 * draft went FAILED, the generic "WhatsApp send failed" REVIEW card replaced
 * the payment card, and the PAID step was never applied: the customer stayed
 * in Lead, the pre-payment nudges kept going, and the owner's confirmation
 * was lost to a toast. Now the owner's Approve counts as the payment
 * confirmation exactly as the automatic path does on a rejected send: the
 * customer is moved to Paid, and the one open card becomes the URGENT
 * "PAID, BUT THEY HAVE NOT BEEN TOLD" one with the confirmation ready to
 * send. A throttled (retryable) send still puts the draft back in the queue.
 */
const customer = {
  id: 'c1', waId: '61400000001', name: 'Momo', state: 'QUALIFIED', paid: false,
  optedOut: false, isLegacy: false, aiPaused: false, lang: null,
  lastCustomerMsgAt: new Date(Date.now() - 60_000).toISOString(), estimatedRefundCents: null,
};
const draft = {
  id: 'm1', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL',
  body: 'Payment received, thank you. Please fill in the form: https://workingholidaytax.com.au/tax-form',
  meta: { proposedState: 'PAID' },
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
  listTasks: jest.fn().mockResolvedValue([]),
  listMessages: jest.fn().mockResolvedValue([]),
  resolveTask: jest.fn().mockResolvedValue(undefined),
  cancelJobsFor: jest.fn().mockResolvedValue(0),
  listJobsForCustomer: jest.fn().mockResolvedValue([]),
  addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
};
const sendWhatsAppText = jest.fn();
const autoAdvanceToForm = jest.fn().mockResolvedValue(undefined);
const reconcileSchedule = jest.fn().mockResolvedValue(undefined);
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/auth', () => ({ sessionValid: jest.fn().mockResolvedValue(true) }));
jest.mock('@/lib/will/channel', () => ({
  sendWhatsAppText: (...a: unknown[]) => sendWhatsAppText(...a),
  sendWhatsAppTemplate: jest.fn().mockResolvedValue({ ok: true }),
  deliverOut: jest.fn().mockResolvedValue({ ok: true }),
}));
jest.mock('@/lib/will/service', () => ({
  ...jest.requireActual('@/lib/will/service'),
  autoAdvanceToForm: (...a: unknown[]) => autoAdvanceToForm(...a),
  getBank: jest.fn().mockResolvedValue({}),
}));
jest.mock('@/lib/will/scheduler', () => ({
  ...jest.requireActual('@/lib/will/scheduler'),
  reconcileSchedule: (...a: unknown[]) => reconcileSchedule(...a),
}));

import { POST } from '@/app/api/will/actions/route';

const approve = () => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ action: 'approve_message', id: 'm1' }),
}));

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
  store.findOpenTaskForCustomer.mockResolvedValue(null);
  sendWhatsAppText.mockReset();
  autoAdvanceToForm.mockClear();
  reconcileSchedule.mockClear();
});

it('a real rejection moves the customer to Paid and raises the URGENT "not been told" card with the confirmation', async () => {
  sendWhatsAppText.mockResolvedValue({ ok: false, error: 'meta 400: (#131026) not a WhatsApp user' });
  const j = await (await approve()).json();
  expect(j.ok).toBe(false);
  expect(j.blocked).toEqual(['SEND_FAILED']);
  expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'FAILED');
  // The owner's Approve is the payment confirmation, as on the automatic path.
  expect(store.setState).toHaveBeenCalledWith('c1', 'PAID', 'HUMAN');
  expect(autoAdvanceToForm).toHaveBeenCalledWith('c1', expect.anything());
  expect(reconcileSchedule).toHaveBeenCalledTimes(1);
  expect(store.addTask).toHaveBeenCalledTimes(1);
  const task = store.addTask.mock.calls[0][0];
  expect(task.severity).toBe('URGENT');
  expect(task.reason).toMatch(/^PAID, BUT THEY HAVE NOT BEEN TOLD/);
  expect(task.reason).toMatch(/131026/);
  expect(task.suggestedReply).toBe(draft.body);
  expect(store.audit).toHaveBeenCalledWith('channel', 'payment_received_send_failed', expect.objectContaining({ customerId: 'c1', via: 'approve_message' }));
});

it('the open "waiting for your approval" payment task is rewritten in place, not joined by a second card', async () => {
  store.findOpenTaskForCustomer.mockResolvedValue({ id: 't0', customerId: 'c1', status: 'OPEN', severity: 'REVIEW' });
  sendWhatsAppText.mockResolvedValue({ ok: false, error: 'meta 400: bad' });
  await approve();
  expect(store.addTask).not.toHaveBeenCalled();
  expect(store.updateTask).toHaveBeenCalledWith('t0', expect.objectContaining({
    severity: 'URGENT', suggestedReply: draft.body, reason: expect.stringMatching(/^PAID, BUT THEY HAVE NOT BEEN TOLD/),
  }));
});

it('a throttled send keeps the draft in the queue and does not move the stage', async () => {
  sendWhatsAppText.mockResolvedValue({ ok: false, error: 'meta 429: too many requests', retryable: true });
  const j = await (await approve()).json();
  expect(j.retryable).toBe(true);
  expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'PENDING_APPROVAL');
  expect(store.setState).not.toHaveBeenCalled();
  expect(store.addTask).not.toHaveBeenCalled();
});

it('a non-payment draft that is rejected still gets the plain REVIEW send-failed card, unchanged', async () => {
  store.getMessageById.mockResolvedValueOnce({ ...draft, meta: {} });
  sendWhatsAppText.mockResolvedValue({ ok: false, error: 'meta 400: bad' });
  await approve();
  expect(store.setState).not.toHaveBeenCalled();
  const task = store.addTask.mock.calls[0][0];
  expect(task.severity).toBe('REVIEW');
  expect(task.reason).toBe('WhatsApp send failed: meta 400: bad');
});

it('a successful send applies Paid the way it always did', async () => {
  sendWhatsAppText.mockResolvedValue({ ok: true });
  const j = await (await approve()).json();
  expect(j.ok).toBe(true);
  expect(store.setState).toHaveBeenCalledWith('c1', 'PAID', 'HUMAN');
  expect(store.addTask).not.toHaveBeenCalled();
});
