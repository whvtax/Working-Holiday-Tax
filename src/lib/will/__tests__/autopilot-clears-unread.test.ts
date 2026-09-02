/**
 * When Will answers a chat itself on Autopilot, the unread badge clears (Jo,
 * 2 Sep). The inbox should stay bold only for chats that still need a person — a
 * task, or one Will stayed silent on — not for ones Will already handled. A
 * green Autopilot reply is just as much "handled" as a human reply, which clears
 * the badge via afterHumanReply; this pins the same for the Autopilot send.
 *
 * The badge is the dashboard's OWN read state. Reading a chat on your phone
 * cannot clear it (WhatsApp never tells us the business read a message), so the
 * only things that clear it are opening/replying in the dashboard and, now, Will
 * answering it himself.
 */
const store = {
  reclaimStaleJobs: jest.fn(),
  getSetting: jest.fn(),
  dueJobs: jest.fn(),
  claimJob: jest.fn(),
  getCustomerById: jest.fn(),
  getMessageById: jest.fn(),
  setMessageStatus: jest.fn(),
  claimQueuedForSend: jest.fn(),
  markCustomerRead: jest.fn(),
  setState: jest.fn(),
  updateCustomer: jest.fn(),
  setJobStatus: jest.fn(),
  getJob: jest.fn(),
  addJob: jest.fn(),
  addTask: jest.fn(),
  audit: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

const sendWhatsAppText = jest.fn().mockResolvedValue({ ok: true });
jest.mock('@/lib/will/channel', () => ({
  deliverOut: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppText: (...a: unknown[]) => sendWhatsAppText(...a),
}));

jest.mock('@/lib/will/policy-guard', () => ({
  policyGuard: () => ({ allowed: true, violations: [] }),
}));

import { processDueJobs } from '@/lib/will/scheduler';

const CUSTOMER = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'PRICE_SENT', paid: false,
  aiPaused: false, isLegacy: false, optedOut: false, lang: null,
  lastCustomerMsgAt: null, estimatedRefundCents: null,
};
const AUTO_REPLY_JOB = {
  id: 'ar1', customerId: 'c1', kind: 'AUTO_REPLY' as const,
  payload: { messageId: 'm1' },
  runAt: new Date(Date.now() - 1000).toISOString(), status: 'SCHEDULED' as const,
  createdAt: new Date().toISOString(),
};

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  sendWhatsAppText.mockReset().mockResolvedValue({ ok: true });

  store.reclaimStaleJobs.mockResolvedValue(0);
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : false));
  store.dueJobs.mockResolvedValue([AUTO_REPLY_JOB]);
  store.claimJob.mockResolvedValue(true);
  store.getCustomerById.mockResolvedValue(CUSTOMER);
  store.getMessageById.mockResolvedValue({
    id: 'm1', status: 'QUEUED', body: 'No worries, our team will get back to you within 24 hours.',
    createdAt: new Date(Date.now() - 5000).toISOString(), meta: {},
  });
  store.setMessageStatus.mockResolvedValue(undefined);
  store.claimQueuedForSend.mockResolvedValue(true);
  store.markCustomerRead.mockResolvedValue(undefined);
  store.setJobStatus.mockResolvedValue(undefined);
  store.getJob.mockResolvedValue({ ...AUTO_REPLY_JOB, status: 'DONE' });
  store.audit.mockResolvedValue(undefined);
});

it('clears the unread badge after Will sends the Autopilot reply', async () => {
  await processDueJobs();
  expect(sendWhatsAppText).toHaveBeenCalled();
  expect(store.markCustomerRead).toHaveBeenCalledWith('c1');
});

it('does NOT clear the badge when the send fails (the chat still needs a person)', async () => {
  sendWhatsAppText.mockResolvedValue({ ok: false, error: 'rejected' });
  await processDueJobs();
  expect(store.markCustomerRead).not.toHaveBeenCalled();
  expect(store.addTask).toHaveBeenCalled();
});
