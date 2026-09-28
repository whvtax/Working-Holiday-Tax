/**
 * Jo, 25 Sep (+81 90): the receipt landed 13:41 and "Payment received" showed
 * 13:41. Now the confirmation waits like every other reply. The scheduler's
 * AUTO_REPLY{messageId} branch sends it, and for THIS row it: never discards
 * it as stale, sends through the payment_received template, and raises the
 * URGENT "paid but not told" task if the send fails.
 */
const store: Record<string, jest.Mock> = {
  dueJobs: jest.fn(), setJobStatus: jest.fn().mockResolvedValue(undefined), audit: jest.fn().mockResolvedValue(undefined),
  getCustomerById: jest.fn(), getMessageById: jest.fn(), setMessageStatus: jest.fn().mockResolvedValue(undefined),
  claimQueuedForSend: jest.fn().mockResolvedValue(true), listTemplates: jest.fn().mockResolvedValue([]),
  listMessages: jest.fn().mockResolvedValue([]), findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
  addTask: jest.fn().mockResolvedValue({ id: 't1' }), updateTask: jest.fn().mockResolvedValue(undefined),
  getSetting: jest.fn().mockResolvedValue(null), setSetting: jest.fn().mockResolvedValue(undefined),
  setState: jest.fn().mockResolvedValue(true), updateCustomer: jest.fn().mockResolvedValue(undefined),
  listJobsForCustomer: jest.fn().mockResolvedValue([]), cancelJobsFor: jest.fn().mockResolvedValue(0),
  reclaimStaleJobs: jest.fn().mockResolvedValue(0), addJob: jest.fn().mockResolvedValue({ id: 'j2' }),
  listCustomers: jest.fn().mockResolvedValue([]), listKnowledge: jest.fn().mockResolvedValue([]),
  history: jest.fn().mockResolvedValue([]),
  claimJob: jest.fn().mockResolvedValue(true), getJob: jest.fn().mockResolvedValue(null),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
const sendWhatsAppText = jest.fn();
const sendWhatsAppTemplate = jest.fn();
jest.mock('@/lib/will/channel', () => ({
  sendWhatsAppText: (...a: unknown[]) => sendWhatsAppText(...a),
  sendWhatsAppTemplate: (...a: unknown[]) => sendWhatsAppTemplate(...a),
  deliverOut: jest.fn().mockResolvedValue({ ok: true }),
  wasAlreadySentVerbatim: jest.fn().mockResolvedValue(false),
}));
jest.mock('@/lib/will/daily-digest', () => ({ runDailyDigest: jest.fn().mockResolvedValue('already_run') }));
jest.mock('@/lib/will/service', () => ({ runDeferredAutoReply: jest.fn() }));
jest.mock('@/lib/will/lost-analysis', () => ({ runLostLeadAnalysis: jest.fn().mockResolvedValue(undefined) }));

import { processDueJobs } from '@/lib/will/scheduler';
import { APPROVED } from '@/lib/will/approved-messages';

const customer = {
  id: 'c1', waId: '61400000001', name: 'Sam', state: 'FORM_PENDING', paid: true, lang: 'en',
  optedOut: false, aiPaused: false, isLegacy: false, estimatedRefundCents: null,
  // the customer wrote AFTER the confirmation was queued ("did you get it?")
  lastCustomerMsgAt: '2026-09-25T03:43:00.000Z',
};
const row = {
  id: 'm1', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'QUEUED', body: APPROVED.payment_received,
  createdAt: '2026-09-25T03:41:00.000Z',
  meta: { system: true, paymentConfirmation: true, trustedBecause: 'a receipt', waTemplate: { name: 'payment_received', params: [], lang: 'en' } },
};

beforeEach(() => {
  jest.clearAllMocks();
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : null));
  store.claimJob.mockResolvedValue(true);
  store.reclaimStaleJobs.mockResolvedValue(0);
  store.setJobStatus.mockResolvedValue(undefined);
  store.audit.mockResolvedValue(undefined);
  store.listTemplates.mockResolvedValue([]);
  store.listMessages.mockResolvedValue([]);
  store.findOpenTaskForCustomer.mockResolvedValue(null);
  store.addTask.mockResolvedValue({ id: 't1' });
  store.setMessageStatus.mockResolvedValue(undefined);
  store.dueJobs.mockResolvedValue([{ id: 'j1', customerId: 'c1', kind: 'AUTO_REPLY', payload: { messageId: 'm1' }, runAt: '2026-09-25T03:44:00.000Z', status: 'SCHEDULED', createdAt: '2026-09-25T03:41:00.000Z' }]);
  store.getCustomerById.mockResolvedValue(customer);
  store.getMessageById.mockResolvedValue({ ...row });
  store.claimQueuedForSend.mockResolvedValue(true);
  sendWhatsAppTemplate.mockResolvedValue({ ok: true });
  sendWhatsAppText.mockResolvedValue({ ok: true });
});

it('is not discarded as stale when the customer wrote in the meantime, and goes out through the template', async () => {
  await processDueJobs();
  expect(store.setMessageStatus).not.toHaveBeenCalledWith('m1', 'DISCARDED');
  expect(sendWhatsAppTemplate).toHaveBeenCalledWith('61400000001', 'payment_received', [], 'en');
  expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'SENT', expect.anything());
});

it('falls back to the text when the template is refused inside the window', async () => {
  sendWhatsAppTemplate.mockResolvedValue({ ok: false, error: 'template missing' });
  await processDueJobs();
  expect(sendWhatsAppText).toHaveBeenCalledWith('61400000001', APPROVED.payment_received);
});

it('raises the URGENT "paid but not told" task when the send fails', async () => {
  sendWhatsAppTemplate.mockResolvedValue({ ok: false, error: '131047 outside the window' });
  sendWhatsAppText.mockResolvedValue({ ok: false, error: '131047 outside the window' });
  await processDueJobs();
  const task = store.addTask.mock.calls[0][0];
  expect(task.reason).toContain('PAID, BUT THEY HAVE NOT BEEN TOLD');
  expect(task.reason).toContain('a receipt');
  expect(task.severity).toBe('URGENT');
  expect(task.suggestedReply).toBe(APPROVED.payment_received);
  expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'FAILED', expect.anything());
});
