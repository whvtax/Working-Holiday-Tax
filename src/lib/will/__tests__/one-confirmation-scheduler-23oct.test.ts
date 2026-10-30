/**
 * Jo, 23 Oct (+49 160 8730398): "Zahlung erhalten" went at 04:20 as text with
 * the link, and the queued template confirmation went again at 04:25. The
 * queued one now checks, by meaning, whether a confirmation already went.
 */
const store = {
  reclaimStaleJobs: jest.fn().mockResolvedValue(0),
  getSetting: jest.fn(),
  setSetting: jest.fn().mockResolvedValue(undefined),
  dueJobs: jest.fn(),
  claimJob: jest.fn().mockResolvedValue(true),
  getCustomerById: jest.fn(),
  setJobStatus: jest.fn().mockResolvedValue(undefined),
  getJob: jest.fn().mockResolvedValue(null),
  addTask: jest.fn().mockResolvedValue({ id: 't1' }),
  audit: jest.fn().mockResolvedValue(undefined),
  getMessageById: jest.fn(),
  setMessageStatus: jest.fn().mockResolvedValue(undefined),
  claimQueuedForSend: jest.fn().mockResolvedValue(true),
  listTemplates: jest.fn().mockResolvedValue([]),
  setState: jest.fn().mockResolvedValue(undefined),
  updateCustomer: jest.fn().mockResolvedValue(undefined),
  listMessages: jest.fn().mockResolvedValue([]),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

const sendWhatsAppTemplate = jest.fn();
const sendWhatsAppText = jest.fn();
const wasAlreadySentVerbatim = jest.fn().mockResolvedValue(false);
jest.mock('@/lib/will/channel', () => ({
  deliverOut: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppText: (...a: unknown[]) => sendWhatsAppText(...a),
  sendWhatsAppTemplate: (...a: unknown[]) => sendWhatsAppTemplate(...a),
  wasAlreadySentVerbatim: (...a: unknown[]) => wasAlreadySentVerbatim(...a),
}));
jest.mock('@/lib/will/config', () => ({
  ...jest.requireActual('@/lib/will/config'),
  withinQuietHours: () => true,
}));
jest.mock('@/lib/will/policy-guard', () => ({
  policyGuard: () => ({ allowed: true, violations: [] }),
  registerLibraryBodies: () => {},
}));

import { processDueJobs } from '@/lib/will/scheduler';

const CUSTOMER = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'FORM_PENDING', paid: true,
  aiPaused: false, isLegacy: false, optedOut: false, lang: 'de',
  lastCustomerMsgAt: '2026-09-17T09:00:00.000Z', estimatedRefundCents: null,
};

const JOB = {
  id: 'j1', customerId: 'c1', kind: 'AUTO_REPLY' as const,
  payload: { messageId: 'm1' },
  runAt: new Date(Date.now() - 1000).toISOString(), status: 'SCHEDULED' as const,
  createdAt: '2026-09-17T09:00:10.000Z',
};

const paymentMsg = (over: Record<string, unknown> = {}) => ({
  id: 'm1', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'QUEUED',
  body: 'Zahlung erhalten. Bitte füll das Formular aus.',
  createdAt: '2026-09-17T09:00:10.000Z',
  meta: { proposedState: 'PAID' },
  ...over,
});

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  store.reclaimStaleJobs.mockResolvedValue(0);
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : false));
  store.setSetting.mockResolvedValue(undefined);
  store.dueJobs.mockResolvedValue([JOB]);
  store.claimJob.mockResolvedValue(true);
  store.getCustomerById.mockResolvedValue(CUSTOMER);
  store.setJobStatus.mockResolvedValue(undefined);
  store.audit.mockResolvedValue(undefined);
  store.getJob.mockResolvedValue(null);
  store.setMessageStatus.mockResolvedValue(undefined);
  store.claimQueuedForSend.mockResolvedValue(true);
  store.listTemplates.mockResolvedValue([]);
  store.setState.mockResolvedValue(undefined);
  wasAlreadySentVerbatim.mockResolvedValue(false);
  store.listMessages.mockResolvedValue([]);
  sendWhatsAppTemplate.mockReset();
  sendWhatsAppText.mockReset();
});

it('his case: a confirmation already went as text, so the queued template one stays unsent', async () => {
  store.getMessageById.mockResolvedValue(paymentMsg({ meta: { paymentConfirmation: true } }));
  store.listMessages.mockResolvedValue([
    { id: 'earlier', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'SENT', createdAt: new Date(Date.now() - 5 * 60_000).toISOString(),
      body: 'Zahlung erhalten.\n\nBitte füll dieses kurze Formular aus, damit wir mit der Prüfung deiner Situation beginnen können.\n\nhttps://workingholidaytax.com.au/start', meta: {} },
    paymentMsg({ meta: { paymentConfirmation: true } }),
  ]);
  await processDueJobs();
  expect(sendWhatsAppTemplate).not.toHaveBeenCalled();
  expect(sendWhatsAppText).not.toHaveBeenCalled();
  expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'DISCARDED');
  expect(store.audit).toHaveBeenCalledWith('scheduler', 'payment_confirmation_duplicate_skipped', expect.anything());
});

it('the first confirmation still goes', async () => {
  store.getMessageById.mockResolvedValue(paymentMsg({ meta: { paymentConfirmation: true } }));
  store.listMessages.mockResolvedValue([paymentMsg({ meta: { paymentConfirmation: true } })]);
  sendWhatsAppTemplate.mockResolvedValue({ ok: true });
  await processDueJobs();
  expect(sendWhatsAppTemplate).toHaveBeenCalled();
});
