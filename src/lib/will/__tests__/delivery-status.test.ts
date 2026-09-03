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
const audit = jest.fn().mockResolvedValue(undefined);
const getSetting = jest.fn().mockResolvedValue(undefined);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    markDeliveryFailedByProviderId: (...a: unknown[]) => markDeliveryFailedByProviderId(...a),
    markDeliveryReceiptByProviderId: (...a: unknown[]) => markDeliveryReceiptByProviderId(...a),
    getCustomerById: jest.fn().mockResolvedValue({ id: 'c1', waId: '61400000001', name: 'Alex' }),
    addTask, audit, getSetting,
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
  addTask.mockClear(); audit.mockClear();
});

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
