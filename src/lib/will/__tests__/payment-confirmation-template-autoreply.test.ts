/**
 * Jo, 17 Sep: "I want the button every time, always" — a payment
 * confirmation queued by the Autopilot delay (AUTO_REPLY job, meta.
 * proposedState 'PAID') now tries the Meta-approved payment_received
 * template first (English/German/Japanese, metaTemplateLang), same as the
 * manual "Mark Paid" button, so the "Start Here" button shows here too.
 * Falls back to the message's own free text (whatever the model actually
 * composed) if the template attempt fails — never a lost message, only a
 * lost button. An ordinary (non-payment) queued reply is completely
 * unaffected: still plain text, never even asks for a template.
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
  sendWhatsAppTemplate.mockReset();
  sendWhatsAppText.mockReset();
});

it('a queued payment confirmation tries the Meta template first, in the customer\'s language', async () => {
  store.getMessageById.mockResolvedValue(paymentMsg());
  sendWhatsAppTemplate.mockResolvedValue({ ok: true });
  await processDueJobs();
  expect(sendWhatsAppTemplate).toHaveBeenCalledWith('61400000001', 'payment_received_de', [], 'de');
  expect(sendWhatsAppText).not.toHaveBeenCalled();
  expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'SENT', { restamp: true });
});

it('falls back to the free text (the model\'s own composed body) if the template attempt fails', async () => {
  store.getMessageById.mockResolvedValue(paymentMsg({ body: 'Zahlung erhalten, und ja, du brauchst kein myGov.' }));
  sendWhatsAppTemplate.mockResolvedValue({ ok: false, error: 'meta 132001: template does not exist' });
  sendWhatsAppText.mockResolvedValue({ ok: true });
  await processDueJobs();
  expect(sendWhatsAppTemplate).toHaveBeenCalledTimes(1);
  expect(sendWhatsAppText).toHaveBeenCalledWith('61400000001', 'Zahlung erhalten, und ja, du brauchst kein myGov.');
  expect(store.setMessageStatus).toHaveBeenCalledWith('m1', 'SENT', { restamp: true });
});

it('an unknown/fallback language falls back to the English template name', async () => {
  store.getCustomerById.mockResolvedValue({ ...CUSTOMER, lang: 'fr' });
  store.getMessageById.mockResolvedValue(paymentMsg());
  sendWhatsAppTemplate.mockResolvedValue({ ok: true });
  await processDueJobs();
  expect(sendWhatsAppTemplate).toHaveBeenCalledWith('61400000001', 'payment_received', [], 'fr');
});

it('an ordinary (non payment) queued reply never asks for a template at all', async () => {
  store.getMessageById.mockResolvedValue(paymentMsg({ body: 'Sure, that makes sense.', meta: { proposedState: undefined } }));
  sendWhatsAppText.mockResolvedValue({ ok: true });
  await processDueJobs();
  expect(sendWhatsAppTemplate).not.toHaveBeenCalled();
  expect(sendWhatsAppText).toHaveBeenCalledWith('61400000001', 'Sure, that makes sense.');
});
