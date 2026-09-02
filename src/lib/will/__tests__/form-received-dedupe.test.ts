/**
 * The form-received confirmation must not double up with Will's conversational
 * reply (Jo, 2 Sep). A customer wrote "Hi! I've just sent through my form!" and
 * got TWO near-identical messages seconds apart: Will's "Perfect, got it! Our
 * team will review..." (a queued autopilot reply) and the deterministic
 * "Perfect, we've received your questionnaire!" that fires when the form lands.
 *
 * THE RULE NOW. The form landing is the authoritative event, so its confirmation
 * is the one that goes out, and two guards stop the duplicate:
 *   1. Any of Will's PARKED drafts (QUEUED / PENDING_APPROVAL) are discarded, so
 *      a "got it" still in its send delay never fires on top of the confirmation.
 *   2. If Will or the team ALREADY sent a reply since the customer's last
 *      message, the confirmation text is skipped (the state change still stands).
 */
const store = {
  reclaimStaleJobs: jest.fn(),
  getSetting: jest.fn(),
  dueJobs: jest.fn(),
  claimJob: jest.fn(),
  getCustomerById: jest.fn(),
  updateCustomer: jest.fn(),
  setState: jest.fn(),
  cancelJobsFor: jest.fn(),
  listMessages: jest.fn(),
  setMessageStatus: jest.fn(),
  listTemplates: jest.fn(),
  addMessage: jest.fn(),
  setJobStatus: jest.fn(),
  getJob: jest.fn(),
  audit: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

const deliverOut = jest.fn().mockResolvedValue({ ok: true });
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => deliverOut(...a),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
}));
jest.mock('@/lib/will/policy-guard', () => ({ policyGuard: () => ({ allowed: true, violations: [] }) }));

import { processDueJobs } from '@/lib/will/scheduler';

const CUSTOMER = {
  id: 'c1', waId: '61493717615', name: 'Alex', state: 'FORM_PENDING', paid: true,
  aiPaused: false, isLegacy: false, optedOut: false, lang: 'en',
  lastCustomerMsgAt: '2026-09-02T05:13:00.000Z', estimatedRefundCents: null,
};
const JOB = {
  id: 'fr1', customerId: 'c1', kind: 'FORM_RECEIVED' as const, payload: {},
  runAt: new Date().toISOString(), status: 'SCHEDULED' as const, createdAt: new Date().toISOString(),
};

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  deliverOut.mockReset().mockResolvedValue({ ok: true });
  store.reclaimStaleJobs.mockResolvedValue(0);
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : false));
  store.dueJobs.mockResolvedValue([JOB]);
  store.claimJob.mockResolvedValue(true);
  store.getCustomerById.mockResolvedValue(CUSTOMER);
  store.updateCustomer.mockResolvedValue(undefined);
  store.setState.mockResolvedValue(undefined);
  store.cancelJobsFor.mockResolvedValue(undefined);
  store.setMessageStatus.mockResolvedValue(undefined);
  store.listTemplates.mockResolvedValue([
    { id: 't', key: 'form_received_en', category: 'Automatic confirmations', title: 'x',
      body: "Perfect, we've received your questionnaire! We'll now go through everything.", versions: 1, updatedAt: '' },
  ]);
  store.setJobStatus.mockResolvedValue(undefined);
  store.getJob.mockResolvedValue({ ...JOB, status: 'DONE' });
  store.audit.mockResolvedValue(undefined);
});

it('sends the confirmation and discards a parked "got it" draft (form-received wins)', async () => {
  // Will's autopilot reply is still QUEUED (in its send delay) when the form lands.
  store.listMessages.mockResolvedValue([
    { id: 'm-in', direction: 'IN', status: 'SENT', body: 'I have just sent through my form!', createdAt: '2026-09-02T05:13:00.000Z' },
    { id: 'm-got', direction: 'OUT', status: 'QUEUED', body: 'Perfect, got it! Our team will review everything.', createdAt: '2026-09-02T05:13:05.000Z' },
  ]);
  await processDueJobs();

  // The parked draft is discarded so it cannot fire as a second message.
  expect(store.setMessageStatus).toHaveBeenCalledWith('m-got', 'DISCARDED');
  // The single confirmation goes out.
  expect(deliverOut).toHaveBeenCalledTimes(1);
  expect(deliverOut.mock.calls[0][1]).toMatch(/received your questionnaire/i);
  // The stage still advanced.
  expect(store.setState).toHaveBeenCalledWith('c1', 'FORM_COMPLETE', 'SYSTEM');
});

it('skips the confirmation when Will already answered the form message (autopilot won)', async () => {
  // The "got it" already SENT after the customer's last inbound.
  store.listMessages.mockResolvedValue([
    { id: 'm-in', direction: 'IN', status: 'SENT', body: 'I have just sent through my form!', createdAt: '2026-09-02T05:13:00.000Z' },
    { id: 'm-got', direction: 'OUT', status: 'SENT', body: 'Perfect, got it! Our team will review everything.', createdAt: '2026-09-02T05:13:30.000Z' },
  ]);
  await processDueJobs();

  // No second confirmation is sent...
  expect(deliverOut).not.toHaveBeenCalled();
  // ...but the stage still advances and the form chasers are cancelled.
  expect(store.setState).toHaveBeenCalledWith('c1', 'FORM_COMPLETE', 'SYSTEM');
  expect(store.cancelJobsFor).toHaveBeenCalledWith('c1', ['FOLLOW_UP']);
  expect(store.audit).toHaveBeenCalledWith('system', 'form_received_confirmed',
    expect.objectContaining({ skippedConfirmation: true }));
});

it('sends the confirmation normally when there was no chat about the form', async () => {
  // Customer filled the form without messaging; the confirmation is the only notice.
  store.getCustomerById.mockResolvedValue({ ...CUSTOMER, lastCustomerMsgAt: null });
  store.listMessages.mockResolvedValue([]);
  await processDueJobs();
  expect(deliverOut).toHaveBeenCalledTimes(1);
  expect(deliverOut.mock.calls[0][1]).toMatch(/received your questionnaire/i);
});
