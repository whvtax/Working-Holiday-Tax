/**
 * Audit 3, lane sched, finding 42 (5 Sep): a throttled questionnaire
 * acknowledgement or ABN questions are sent later, not never.
 *
 * deliverOut answers a Meta 429 with {ok:false, retryable:true} and raises no
 * task for it. The FORM_RECEIVED handler used to drop that result: the
 * customer was already FORM_COMPLETE, the job DONE, and nothing replayed. For
 * a TFN + ABN customer the "acknowledgement owed" flag was also set for a
 * question they never received, so the Medicare line stood aside for two
 * hours waiting on an answer that could not come. Pinned here:
 *   - a throttled send queues a FORM_RECEIVED {resend} job 30 minutes out
 *     (next evening window on Meta's daily marketing limit 131049);
 *   - the ABN "owed" flag is set only once the questions actually went;
 *   - the replay sends just that one message, same text and template, with
 *     no state change and no second Medicare replay, and is skipped once the
 *     customer has moved on;
 *   - a successful first send, and a refusal for good, behave exactly as before.
 */
const store = {
  reclaimStaleJobs: jest.fn(),
  getSetting: jest.fn(),
  setSetting: jest.fn(),
  dueJobs: jest.fn(),
  claimJob: jest.fn(),
  getCustomerById: jest.fn(),
  setJobStatus: jest.fn(),
  getJob: jest.fn(),
  addJob: jest.fn(),
  addTask: jest.fn(),
  addMessage: jest.fn(),
  audit: jest.fn(),
  listTemplates: jest.fn(),
  setState: jest.fn(),
  updateCustomer: jest.fn(),
  cancelJobsFor: jest.fn(),
  getMessageById: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

const deliverOut = jest.fn();
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => (deliverOut as unknown as (...x: unknown[]) => unknown)(...a),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
}));
jest.mock('@/lib/will/service', () => ({ runDeferredAutoReply: jest.fn() }));

import { processDueJobs, abnAnswersPendingKey } from '@/lib/will/scheduler';
import { formReceivedTemplateKey, requestAbnTemplateKey } from '@/lib/will/i18n';

const customer = (over: Record<string, unknown> = {}) => ({
  id: 'c1', waId: '61400000001', name: 'Ana', state: 'FORM_PENDING', paid: true,
  aiPaused: false, isLegacy: false, optedOut: false, lang: null, income: 'TFN',
  lastCustomerMsgAt: '2026-09-05T08:55:00.000Z', estimatedRefundCents: null,
  ...over,
});
const formJob = (payload: Record<string, unknown> = {}) => ({
  id: 'j1', customerId: 'c1', kind: 'FORM_RECEIVED' as const, payload,
  runAt: '2026-09-05T09:00:00.000Z', status: 'SCHEDULED' as const, createdAt: '2026-09-05T09:00:00.000Z',
});
const requeued = () => store.addJob.mock.calls.map(([j]) => j).filter((j) => j.kind === 'FORM_RECEIVED');

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  deliverOut.mockReset();
  jest.useFakeTimers().setSystemTime(new Date('2026-09-05T09:00:00.000Z'));
  store.reclaimStaleJobs.mockResolvedValue(0);
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : false));
  store.claimJob.mockResolvedValue(true);
  store.setJobStatus.mockResolvedValue(undefined);
  store.addJob.mockResolvedValue({ id: 'new' });
  store.audit.mockResolvedValue(undefined);
  store.setState.mockResolvedValue(true);
  store.listTemplates.mockResolvedValue([]);
  store.getCustomerById.mockResolvedValue(customer());
});
afterEach(() => jest.useRealTimers());

describe('the first attempt', () => {
  it('sends the acknowledgement as before when Meta accepts it, and queues nothing', async () => {
    deliverOut.mockResolvedValue({ ok: true });
    store.dueJobs.mockResolvedValue([formJob()]);
    const r = await processDueJobs();
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect(deliverOut.mock.calls[0][4]).toEqual({ name: formReceivedTemplateKey(null), params: [], lang: null, fallbackToText: true });
    expect(requeued()).toHaveLength(0);
    expect(r.deferred).toBe(0);
    expect(r.sent).toEqual(['Ana · questionnaire received']);
  });

  it('a throttled acknowledgement is replayed 30 minutes on, with no task', async () => {
    deliverOut.mockResolvedValue({ ok: false, error: 'meta 429: too many requests', retryable: true });
    store.dueJobs.mockResolvedValue([formJob()]);
    const r = await processDueJobs();
    expect(requeued()).toEqual([expect.objectContaining({
      customerId: 'c1', kind: 'FORM_RECEIVED', payload: { resend: 'ack' },
      runAt: '2026-09-05T09:30:00.000Z',
    })]);
    expect(store.addTask).not.toHaveBeenCalled();
    expect(store.audit).toHaveBeenCalledWith('scheduler', 'form_received_throttled_requeued',
      expect.objectContaining({ customerId: 'c1', resend: 'ack', reason: 'rate_limited' }));
    expect(r.deferred).toBe(1);
    // The transition itself is unchanged: state moved, chasers cancelled, job done.
    expect(store.setState).toHaveBeenCalledWith('c1', 'FORM_COMPLETE', 'SYSTEM');
    expect(store.cancelJobsFor).toHaveBeenCalledWith('c1', ['FOLLOW_UP']);
    expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'DONE');
  });

  it("Meta's daily marketing limit (131049) waits for the next window instead of 30 minutes", async () => {
    deliverOut.mockResolvedValue({ ok: false, error: 'meta 400: (#131049) marketing limit', retryable: true });
    store.dueJobs.mockResolvedValue([formJob()]);
    await processDueJobs();
    const [job] = requeued();
    expect(job.payload).toEqual({ resend: 'ack' });
    expect(new Date(job.runAt).getTime()).toBeGreaterThan(Date.now() + 60 * 60 * 1000);
    expect(store.audit).toHaveBeenCalledWith('scheduler', 'form_received_throttled_requeued',
      expect.objectContaining({ reason: 'meta_marketing_limit_131049' }));
  });

  it('throttled ABN questions are replayed too, and the acknowledgement is NOT yet owed', async () => {
    store.getCustomerById.mockResolvedValue(customer({ income: 'TFN_ABN' }));
    deliverOut.mockResolvedValue({ ok: false, error: 'meta 429', retryable: true });
    store.dueJobs.mockResolvedValue([formJob()]);
    await processDueJobs();
    expect(requeued()).toEqual([expect.objectContaining({ payload: { resend: 'abn' }, runAt: '2026-09-05T09:30:00.000Z' })]);
    expect(store.setSetting).not.toHaveBeenCalledWith(abnAnswersPendingKey('c1'), true);
    expect(store.audit).not.toHaveBeenCalledWith('system', 'abn_questions_sent', expect.anything());
  });

  it('ABN questions that went mark the acknowledgement owed, exactly as before', async () => {
    store.getCustomerById.mockResolvedValue(customer({ income: 'TFN_ABN' }));
    deliverOut.mockResolvedValue({ ok: true });
    store.dueJobs.mockResolvedValue([formJob()]);
    await processDueJobs();
    expect(deliverOut.mock.calls[0][4]).toEqual({ name: requestAbnTemplateKey(null), params: [], lang: null, fallbackToText: true });
    expect(store.setSetting).toHaveBeenCalledWith(abnAnswersPendingKey('c1'), true);
    expect(requeued()).toHaveLength(0);
  });

  it('a refusal for good is not replayed: deliverOut already raised the task', async () => {
    store.getCustomerById.mockResolvedValue(customer({ income: 'TFN_ABN' }));
    deliverOut.mockResolvedValue({ ok: false, error: 'meta 400: template does not exist' });
    store.dueJobs.mockResolvedValue([formJob()]);
    await processDueJobs();
    expect(requeued()).toHaveLength(0);
    // Jo sends the questions by hand; the answer still triggers the owed line.
    expect(store.setSetting).toHaveBeenCalledWith(abnAnswersPendingKey('c1'), true);
  });
});

describe('the replay', () => {
  it('sends only the acknowledgement: same text and template, no state change, no chaser cancelling', async () => {
    store.getCustomerById.mockResolvedValue(customer({ state: 'FORM_COMPLETE' }));
    store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : k.startsWith('medicare_no') ? true : false));
    deliverOut.mockResolvedValue({ ok: true });
    store.dueJobs.mockResolvedValue([formJob({ resend: 'ack' })]);
    const r = await processDueJobs();
    expect(deliverOut).toHaveBeenCalledTimes(1);
    const [c, body, author, meta, waTemplate] = deliverOut.mock.calls[0];
    expect(c.id).toBe('c1');
    expect(author).toBe('AI');
    expect(typeof body).toBe('string');
    expect(waTemplate).toEqual({ name: formReceivedTemplateKey(null), params: [], lang: null, fallbackToText: true });
    expect(meta).toEqual({ waTemplate });
    expect(store.setState).not.toHaveBeenCalled();
    expect(store.cancelJobsFor).not.toHaveBeenCalled();
    expect(store.updateCustomer).not.toHaveBeenCalled();
    // The remembered Medicare "No" belongs to the job that won the transition.
    expect(store.addJob).not.toHaveBeenCalledWith(expect.objectContaining({ kind: 'MEDICARE_INFO' }));
    expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'DONE');
    expect(r.sent).toEqual(['Ana · questionnaire received (resent)']);
  });

  it('replays the ABN questions and only then marks the acknowledgement owed', async () => {
    store.getCustomerById.mockResolvedValue(customer({ state: 'FORM_COMPLETE', income: 'TFN_ABN' }));
    deliverOut.mockResolvedValue({ ok: true });
    store.dueJobs.mockResolvedValue([formJob({ resend: 'abn' })]);
    await processDueJobs();
    expect(deliverOut.mock.calls[0][4]).toEqual({ name: requestAbnTemplateKey(null), params: [], lang: null, fallbackToText: true });
    expect(store.setSetting).toHaveBeenCalledWith(abnAnswersPendingKey('c1'), true);
    expect(store.audit).toHaveBeenCalledWith('system', 'abn_questions_sent', { customerId: 'c1' });
  });

  it('throttled again: queues another replay rather than giving up', async () => {
    store.getCustomerById.mockResolvedValue(customer({ state: 'FORM_COMPLETE' }));
    deliverOut.mockResolvedValue({ ok: false, error: 'meta 429', retryable: true });
    store.dueJobs.mockResolvedValue([formJob({ resend: 'ack' })]);
    await processDueJobs();
    expect(requeued()).toEqual([expect.objectContaining({ payload: { resend: 'ack' }, runAt: '2026-09-05T09:30:00.000Z' })]);
    expect(store.addTask).not.toHaveBeenCalled();
  });

  it('is skipped once the customer has moved on, been paused, or opted out', async () => {
    for (const over of [{ state: 'IN_REVIEW' }, { state: 'FORM_COMPLETE', aiPaused: true }, { state: 'FORM_COMPLETE', optedOut: true }]) {
      deliverOut.mockClear(); store.audit.mockClear(); store.setJobStatus.mockClear();
      store.getCustomerById.mockResolvedValue(customer(over));
      store.dueJobs.mockResolvedValue([formJob({ resend: 'ack' })]);
      await processDueJobs();
      expect(deliverOut).not.toHaveBeenCalled();
      expect(store.audit).toHaveBeenCalledWith('scheduler', 'form_received_resend_skipped', expect.objectContaining({ customerId: 'c1', resend: 'ack' }));
      expect(store.setJobStatus).toHaveBeenCalledWith('j1', 'DONE');
    }
  });

  it('does not send the ABN questions twice when the flag says they already went', async () => {
    store.getCustomerById.mockResolvedValue(customer({ state: 'FORM_COMPLETE', income: 'TFN_ABN' }));
    store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : k === abnAnswersPendingKey('c1')));
    store.dueJobs.mockResolvedValue([formJob({ resend: 'abn' })]);
    await processDueJobs();
    expect(deliverOut).not.toHaveBeenCalled();
  });

  it('in approval mode the replay lands as a draft, like the first attempt would', async () => {
    store.getCustomerById.mockResolvedValue(customer({ state: 'FORM_COMPLETE' }));
    store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'APPROVAL' : false));
    store.dueJobs.mockResolvedValue([formJob({ resend: 'ack' })]);
    await processDueJobs();
    expect(deliverOut).not.toHaveBeenCalled();
    expect(store.addMessage).toHaveBeenCalledWith(expect.objectContaining({ customerId: 'c1', status: 'PENDING_APPROVAL' }));
    expect(requeued()).toHaveLength(0);
  });
});
