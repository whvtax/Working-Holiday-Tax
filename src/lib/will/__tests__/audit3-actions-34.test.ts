/**
 * Approving a queued follow-up while Meta is throttling (audit, 5 Sep).
 *
 * approve_message transmits the draft itself and marked it FAILED on any
 * rejection, ignoring `retryable` (429, 4, 80007, 131056, 130429, 131049).
 * retry_blocked only revives BLOCKED drafts and no task was raised, so a
 * follow-up approved in a busy morning was lost: the scheduler had already
 * advanced the cadence when it queued the draft. Now a retryable rejection
 * puts the draft back to PENDING_APPROVAL with a "try again" answer, and a
 * real rejection raises the same one-per-customer "WhatsApp send failed"
 * task deliverOut raises.
 */
const customer = {
  id: 'c1', waId: '61400000001', name: 'Momo', state: 'QUALIFIED', paid: false,
  optedOut: false, isLegacy: false, aiPaused: false, lang: null,
  lastCustomerMsgAt: new Date(Date.now() - 3 * 86400_000).toISOString(), estimatedRefundCents: null,
};
const draft = {
  id: 'm1', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'PENDING_APPROVAL',
  body: 'Hi Momo, just checking in. Shall we get your tax return started?',
  meta: { waTemplate: { name: 'qualified_followup_1', params: ['Momo'], lang: null } },
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
  audit: jest.fn().mockResolvedValue(undefined),
  markCustomerRead: jest.fn().mockResolvedValue(undefined),
  listTasks: jest.fn().mockResolvedValue([]),
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

import { POST } from '@/app/api/will/actions/route';

const approve = () => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ action: 'approve_message', id: 'm1' }),
}));

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
  store.findOpenTaskForCustomer.mockResolvedValue(null);
  sendWhatsAppTemplate.mockReset();
});

it('a throttled send (429) puts the draft back in the queue and asks for another try, no task', async () => {
  sendWhatsAppTemplate.mockResolvedValue({ ok: false, error: 'meta 429: too many requests', retryable: true });
  const j = await (await approve()).json();
  expect(j.ok).toBe(false);
  expect(j.retryable).toBe(true);
  expect(j.error).toMatch(/still in the queue/);
  expect(j.error).toMatch(/few minutes/);
  expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'PENDING_APPROVAL');
  expect(store.setMessageStatus).not.toHaveBeenCalledWith('m1', 'FAILED');
  expect(store.addTask).not.toHaveBeenCalled();
  expect(store.audit).toHaveBeenCalledWith('channel', 'send_throttled', expect.objectContaining({ id: 'm1' }));
});

it('the per-person marketing limit (131049) says tomorrow evening', async () => {
  sendWhatsAppTemplate.mockResolvedValue({ ok: false, error: 'meta 400: (#131049) limit reached', retryable: true });
  const j = await (await approve()).json();
  expect(j.ok).toBe(false);
  expect(j.error).toMatch(/tomorrow evening/);
  expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'PENDING_APPROVAL');
  expect(store.addTask).not.toHaveBeenCalled();
});

it('a real rejection still fails the draft, and now raises the send-failed task with the text', async () => {
  sendWhatsAppTemplate.mockResolvedValue({ ok: false, error: 'meta 400: (#131026) not a WhatsApp user' });
  const j = await (await approve()).json();
  expect(j.ok).toBe(false);
  expect(j.blocked).toEqual(['SEND_FAILED']);
  expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'FAILED');
  expect(store.addTask).toHaveBeenCalledTimes(1);
  const task = store.addTask.mock.calls[0][0];
  expect(task.customerId).toBe('c1');
  expect(task.reason).toMatch(/^WhatsApp send failed: meta 400/);
  expect(task.suggestedReply).toBe(draft.body);
});

it('a real rejection enriches an already open task instead of adding a second card', async () => {
  store.findOpenTaskForCustomer.mockResolvedValue({ id: 't0', customerId: 'c1', status: 'OPEN' });
  sendWhatsAppTemplate.mockResolvedValue({ ok: false, error: 'meta 400: bad' });
  await approve();
  expect(store.addTask).not.toHaveBeenCalled();
  expect(store.updateTask).toHaveBeenCalledWith('t0', expect.objectContaining({ reason: 'WhatsApp send failed: meta 400: bad', suggestedReply: draft.body }));
});

it('a successful send is unchanged', async () => {
  sendWhatsAppTemplate.mockResolvedValue({ ok: true });
  const j = await (await approve()).json();
  expect(j.ok).toBe(true);
  expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'SENT', expect.anything());
});
