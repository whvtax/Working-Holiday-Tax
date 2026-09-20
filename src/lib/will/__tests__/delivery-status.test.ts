/**
 * Meta reports delivery AFTER accepting a send (audit, 3 Sep).
 *
 * A free text to a customer quiet for more than a day gets 200 + a wamid, so
 * the CRM showed ✓✓ and audited *_sent; then Meta posted
 * statuses[{status:'failed', errors:[{code:131047}]}] and the webhook threw
 * it away. Now a failed status flips the message to FAILED with the reason
 * and raises one URGENT task with the text ready to resend; delivered / read
 * receipts are stamped on the message. Statuses that match none of our
 * messages are ignored.
 */
import { createHmac } from 'crypto';

const markDeliveryFailedByProviderId = jest.fn();
const markDeliveryReceiptByProviderId = jest.fn().mockResolvedValue(undefined);
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const addJob = jest.fn().mockResolvedValue({ id: 'j1' });
const cancelJobsFor = jest.fn().mockResolvedValue(0);
const audit = jest.fn().mockResolvedValue(undefined);
const getSetting = jest.fn().mockResolvedValue(undefined);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    markDeliveryFailedByProviderId: (...a: unknown[]) => markDeliveryFailedByProviderId(...a),
    markDeliveryReceiptByProviderId: (...a: unknown[]) => markDeliveryReceiptByProviderId(...a),
    getCustomerById: jest.fn().mockResolvedValue({ id: 'c1', waId: '61400000001', name: 'Alex' }),
    addTask, addJob, cancelJobsFor, audit, getSetting,
    claimInbound: jest.fn().mockResolvedValue(true), releaseInbound: jest.fn(),
    isBlockedContact: jest.fn().mockResolvedValue(false),
  }),
}));
jest.mock('@/lib/will/service', () => ({
  handleIncoming: jest.fn(), handleInboundNote: jest.fn(), handlePaymentProofMedia: jest.fn().mockResolvedValue(null),
}));

import { POST } from '@/app/api/will/webhook/route';

const SECRET = 'test-app-secret';
function post(value: Record<string, unknown>) {
  const raw = JSON.stringify({ entry: [{ changes: [{ value }] }] });
  const sig = 'sha256=' + createHmac('sha256', SECRET).update(raw, 'utf8').digest('hex');
  return POST(new Request('http://x/api/will/webhook', {
    method: 'POST', headers: { 'x-hub-signature-256': sig, 'content-type': 'application/json' }, body: raw,
  }));
}

beforeAll(() => { process.env.META_APP_SECRET = SECRET; });
beforeEach(() => {
  markDeliveryFailedByProviderId.mockReset(); markDeliveryReceiptByProviderId.mockClear();
  addTask.mockClear(); addJob.mockClear(); cancelJobsFor.mockClear(); cancelJobsFor.mockResolvedValue(0); audit.mockClear();});

it('a failed 131047 status flips our message to FAILED and raises one task that names the window', async () => {
  markDeliveryFailedByProviderId.mockResolvedValue({ id: 'm1', customerId: 'c1', body: 'Perfect, we have received your questionnaire!' });
  const res = await post({
    statuses: [{ id: 'wamid.OUT1', status: 'failed', timestamp: '1756900000', recipient_id: '61400000001',
      errors: [{ code: 131047, title: 'Re-engagement message', message: 'Re-engagement message', error_data: { details: 'Message failed to send because more than 24 hours have passed since the customer last replied to this number.' } }] }],
  });
  expect(res.status).toBe(200);
  expect(markDeliveryFailedByProviderId).toHaveBeenCalledWith('wamid.OUT1', expect.stringContaining('131047'));
  expect(addTask).toHaveBeenCalledTimes(1);
  const task = addTask.mock.calls[0][0];
  expect(task.severity).toBe('URGENT');
  expect(task.reason).toMatch(/24h window/);
  expect(task.suggestedReply).toMatch(/questionnaire/);
  expect(audit).toHaveBeenCalledWith('channel', 'delivery_failed', expect.objectContaining({ code: 131047 }));
});

it('a status for a message that is not ours does nothing', async () => {
  markDeliveryFailedByProviderId.mockResolvedValue(null);
  await post({ statuses: [{ id: 'wamid.UNKNOWN', status: 'failed', errors: [{ code: 131026 }] }] });
  expect(addTask).not.toHaveBeenCalled();
});

it('delivered and read receipts are stamped, never a task', async () => {
  await post({ statuses: [
    { id: 'wamid.OUT2', status: 'delivered', timestamp: '1756900000' },
    { id: 'wamid.OUT2', status: 'read', timestamp: '1756900100' },
  ] });
  expect(markDeliveryReceiptByProviderId).toHaveBeenCalledWith('wamid.OUT2', 'delivered', '2025-09-03T11:46:40.000Z');
  expect(markDeliveryReceiptByProviderId).toHaveBeenCalledWith('wamid.OUT2', 'read', '2025-09-03T11:48:20.000Z');
  expect(addTask).not.toHaveBeenCalled();
});

it('a store error on one status is audited and does not break the webhook', async () => {
  markDeliveryFailedByProviderId.mockRejectedValue(new Error('db down'));
  const res = await post({ statuses: [{ id: 'wamid.OUT3', status: 'failed', errors: [{ code: 131026 }] }] });
  expect(res.status).toBe(200);
  expect(audit).toHaveBeenCalledWith('channel', 'delivery_status_error', expect.objectContaining({ providerId: 'wamid.OUT3' }));
});

it('a failed 131049 status (Meta\'s per-person marketing limit) auto-retries instead of an immediate task', async () => {
  markDeliveryFailedByProviderId.mockResolvedValue({ id: 'm2', customerId: 'c1', body: "Hi Patrick, last message from me 😊 If you want your tax looked at later, just text me any time." });
  const res = await post({
    statuses: [{ id: 'wamid.OUT2', status: 'failed', timestamp: '1757500000', recipient_id: '61400000001',
      errors: [{ code: 131049, title: 'Message failed to send', message: 'In order to maintain a healthy ecosystem engagement, the message failed to be delivered.' }] }],
  });
  expect(res.status).toBe(200);
  expect(markDeliveryFailedByProviderId).toHaveBeenCalledWith('wamid.OUT2', expect.stringContaining('131049'));
  // No immediate manual task — it self-heals instead.
  expect(addTask).not.toHaveBeenCalled();
  expect(addJob).toHaveBeenCalledTimes(1);
  const job = addJob.mock.calls[0][0];
  expect(job.customerId).toBe('c1');
  expect(job.kind).toBe('RESEND_MESSAGE');
  expect(job.payload).toEqual({ messageId: 'm2', attempt: 0 });
  // Deferred, not immediate: the whole point is not to hammer the same limit again in the next second.
  expect(new Date(job.runAt).getTime()).toBeGreaterThan(Date.now());
  expect(audit).toHaveBeenCalledWith('channel', 'delivery_failed_131049_requeued', { customerId: 'c1', messageId: 'm2' });
});

it('falls back to the old immediate task if queueing the 131049 retry itself fails', async () => {
  markDeliveryFailedByProviderId.mockResolvedValue({ id: 'm3', customerId: 'c1', body: 'Hi Matthew, just checking in about your tax return.' });
  addJob.mockRejectedValueOnce(new Error('db unavailable'));
  const res = await post({
    statuses: [{ id: 'wamid.OUT3', status: 'failed', errors: [{ code: 131049 }] }],
  });
  expect(res.status).toBe(200);
  expect(addTask).toHaveBeenCalledTimes(1);
  expect(addTask.mock.calls[0][0].severity).toBe('URGENT');
});

/**
 * 131026 (Jo, 17 Sep): the number itself cannot receive WhatsApp at all
 * (blocked the business, or was never on WhatsApp) — permanent, and not a
 * missing template or the 24h window, so no later retry will ever succeed
 * either. David and Kazuki (17 Sept, real Decision Log entries) each failed
 * this way once per scheduled follow-up, with more of the same series still
 * queued behind them. Now this cancels the remaining FOLLOW_UP jobs for that
 * customer and raises one REVIEW (not URGENT) task explaining why, instead of
 * the generic "WhatsApp refused the send, check WhatsApp Manager" URGENT card
 * — there is nothing to create in Meta for a number that cannot receive
 * WhatsApp at all.
 */
it('a failed 131026 status (number cannot receive WhatsApp at all) cancels remaining follow-ups and raises a REVIEW task, not URGENT', async () => {
  markDeliveryFailedByProviderId.mockResolvedValue({ id: 'm4', customerId: 'c1', body: 'Hi David, most people doing it alone miss things they could have claimed.' });
  cancelJobsFor.mockResolvedValue(2);
  const res = await post({
    statuses: [{ id: 'wamid.OUT4', status: 'failed', errors: [{ code: 131026, title: 'Message Undeliverable' }] }],
  });
  expect(res.status).toBe(200);
  expect(cancelJobsFor).toHaveBeenCalledWith('c1', ['FOLLOW_UP']);
  expect(addJob).not.toHaveBeenCalled(); // not retryable like 131049 — there is nowhere for a retry to succeed
  expect(addTask).toHaveBeenCalledTimes(1);
  const task = addTask.mock.calls[0][0];
  expect(task.severity).toBe('REVIEW');
  expect(task.reason).toMatch(/cannot receive messages at all/);
  expect(task.reason).toMatch(/Cancelled 2 pending follow-ups/);
  expect(task.reason).not.toMatch(/create.*template|WhatsApp Manager/i); // nothing to create in Meta for this one
  expect(audit).toHaveBeenCalledWith('channel', 'delivery_failed_131026_unreachable', { customerId: 'c1', messageId: 'm4', cancelledFollowUps: 2 });
});

it('the 131026 task reason is singular when exactly one follow-up was cancelled, and omits the sentence at zero', async () => {
  markDeliveryFailedByProviderId.mockResolvedValue({ id: 'm5', customerId: 'c1', body: 'hi' });
  cancelJobsFor.mockResolvedValueOnce(1);
  await post({ statuses: [{ id: 'wamid.OUT5', status: 'failed', errors: [{ code: 131026 }] }] });
  expect(addTask.mock.calls[0][0].reason).toMatch(/Cancelled 1 pending follow-up to this number so/);

  addTask.mockClear();
  cancelJobsFor.mockResolvedValueOnce(0);
  await post({ statuses: [{ id: 'wamid.OUT5', status: 'failed', errors: [{ code: 131026 }] }] });
  expect(addTask.mock.calls[0][0].reason).not.toMatch(/Cancelled/);
});
