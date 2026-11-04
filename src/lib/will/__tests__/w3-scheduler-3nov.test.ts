/**
 * 3 Nov 2026 (wave 3, scheduler integration). Synthetic data only.
 * Covers: follow-up language plan, repeat holding line, repair sweep (lost
 * critical messages, payment confirmation rescue, stale stage, paperwork),
 * Medicare gate and deferral.
 */
const settings = new Map<string, unknown>();
const store = {
  reclaimStaleJobs: jest.fn().mockResolvedValue(0),
  getSetting: jest.fn(async (k: string) => (settings.has(k) ? settings.get(k) : (k === 'ai_mode' ? 'FULL_AUTO' : undefined))),
  setSetting: jest.fn(async (k: string, v: unknown) => { settings.set(k, v); }),
  dueJobs: jest.fn(),
  claimJob: jest.fn().mockResolvedValue(true),
  getCustomerById: jest.fn(),
  setJobStatus: jest.fn().mockResolvedValue(undefined),
  addJob: jest.fn().mockResolvedValue({ id: 'new' }),
  addTask: jest.fn().mockResolvedValue({ id: 't1' }),
  updateTask: jest.fn().mockResolvedValue(undefined),
  resolveTask: jest.fn().mockResolvedValue(undefined),
  addMessage: jest.fn().mockResolvedValue({ id: 'm-new' }),
  audit: jest.fn().mockResolvedValue(undefined),
  listTemplates: jest.fn().mockResolvedValue([]),
  setState: jest.fn(),
  updateCustomer: jest.fn(),
  cancelJobsFor: jest.fn().mockResolvedValue(0),
  getMessageById: jest.fn(),
  findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
  listMessages: jest.fn().mockResolvedValue([]),
  listCustomers: jest.fn().mockResolvedValue([]),
  listJobsForCustomer: jest.fn().mockResolvedValue([]),
  getJob: jest.fn().mockResolvedValue(null),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
const deliverOut = jest.fn(async (..._a: unknown[]) => ({ ok: true }) as { ok: boolean; error?: string });
const templateApprovedFor = jest.fn(async (_n: string, _l: string | null) => true as boolean | null);
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => (deliverOut as unknown as (...x: unknown[]) => unknown)(...a),
  templateApprovedFor: (n: string, l: string | null) => templateApprovedFor(n, l),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppTemplate: jest.fn().mockResolvedValue({ ok: true }),
  wasAlreadySentVerbatim: jest.fn().mockResolvedValue(false),
}));
jest.mock('@/lib/will/service', () => ({ runDeferredAutoReply: jest.fn() }));
jest.mock('@/lib/will/config', () => ({ ...jest.requireActual('@/lib/will/config'), withinQuietHours: () => true }));
jest.mock('@/lib/will/claude', () => ({
  ...jest.requireActual('@/lib/will/claude'),
  judgeHoldingLine: jest.fn(async () => ({ verdict: 'HOLD', reason: 'ok' })),
}));

import { processDueJobs, runRepairSweep, medicareGateFor } from '@/lib/will/scheduler';
import { APPROVED } from '@/lib/will/approved-messages';
import { fallbackConfirmationText } from '@/lib/will/payment-confirmation';

const NOW = new Date('2026-11-03T01:00:00.000Z'); // Tuesday, Sydney business hours
const ago = (ms: number) => new Date(NOW.getTime() - ms).toISOString();
const MIN = 60_000, HOUR = 3_600_000;

const customer = (over: Record<string, unknown> = {}) => ({
  id: 'c1', waId: '4915100000000', name: 'Jan', state: 'QUALIFIED', paid: false, aiPaused: false, isLegacy: false, optedOut: false,
  lang: 'de', income: 'TFN', formComplete: false, lastCustomerMsgAt: ago(2 * 24 * HOUR), lastMessageAt: ago(2 * HOUR), stateChangedAt: ago(2 * 24 * HOUR),
  estimatedRefundCents: null, ...over,
});
const msg = (o: Record<string, unknown>) => ({ id: `m${Math.random()}`, customerId: 'c1', direction: 'OUT', author: 'AI', status: 'SENT', body: '', meta: {}, createdAt: ago(HOUR), ...o });

beforeEach(() => {
  settings.clear();
  for (const f of [deliverOut, templateApprovedFor, store.audit, store.addJob, store.addTask, store.addMessage, store.setSetting, store.resolveTask, store.setJobStatus]) (f as jest.Mock).mockClear();
  jest.useFakeTimers().setSystemTime(NOW);
  templateApprovedFor.mockResolvedValue(true);
  deliverOut.mockResolvedValue({ ok: true });
  store.getCustomerById.mockResolvedValue(customer());
  store.listMessages.mockResolvedValue([]);
  store.listCustomers.mockResolvedValue([]);
  store.findOpenTaskForCustomer.mockResolvedValue(null);
  store.dueJobs.mockResolvedValue([]);
  store.listTemplates.mockResolvedValue([
    { key: 'fu_pre_24h', title: 'Pre 24h', body: APPROVED.followups_pre_payment.h24, active: true },
    { key: 'fu_form_6h', title: 'Form 6h', body: APPROVED.followups_form.h6, active: true },
  ]);
});
afterEach(() => jest.useRealTimers());

const fuJob = (templateKey: string, flow: string, extra: Record<string, unknown> = {}) => ({
  id: 'f1', customerId: 'c1', kind: 'FOLLOW_UP', payload: { flow, templateKey, seq: 0, ...extra },
  runAt: ago(0), status: 'SCHEDULED', createdAt: ago(HOUR),
});

describe('1. FOLLOW_UP language plan', () => {
  it('German, Meta lookup unknown, window closed: retried in 2 hours, nothing sent', async () => {
    templateApprovedFor.mockResolvedValue(null);
    store.dueJobs.mockResolvedValue([fuJob('fu_pre_24h', 'prePayment')]);
    await processDueJobs();
    expect(deliverOut).not.toHaveBeenCalled();
    expect(store.addJob).toHaveBeenCalledWith(expect.objectContaining({ kind: 'FOLLOW_UP', payload: expect.objectContaining({ lookupDefers: 1 }) }));
    expect(store.audit).toHaveBeenCalledWith('scheduler', 'follow_up_deferred_template_lookup', expect.anything());
  });

  it('German, lookup unknown, window open: German free text, no template', async () => {
    templateApprovedFor.mockResolvedValue(null);
    store.getCustomerById.mockResolvedValue(customer({ lastCustomerMsgAt: ago(2 * HOUR) }));
    store.dueJobs.mockResolvedValue([fuJob('fu_pre_24h', 'prePayment')]);
    await processDueJobs();
    expect(deliverOut).toHaveBeenCalledTimes(1);
    const [, body, , , tpl] = deliverOut.mock.calls[0] as [unknown, string, unknown, unknown, unknown];
    expect(tpl).toBeUndefined();
    expect(body).not.toMatch(/Did you|still in Australia/);
    expect(body).toMatch(/Jan/);
  });

  it('German with the template approved: the template goes, CRM body is German', async () => {
    store.dueJobs.mockResolvedValue([fuJob('fu_pre_24h', 'prePayment')]);
    await processDueJobs();
    const [, body, , , tpl] = deliverOut.mock.calls[0] as [unknown, string, unknown, unknown, { name: string; lang: string }];
    expect(tpl).toEqual(expect.objectContaining({ name: 'fu_pre_24h', lang: 'de' }));
    expect(body).not.toBe(APPROVED.followups_pre_payment.h24.replace(/\{\{1\}\}/g, 'Jan'));
  });

  it('French lead, no approved template: nothing sent, never English, no task for a sales nudge', async () => {
    templateApprovedFor.mockResolvedValue(false);
    store.getCustomerById.mockResolvedValue(customer({ lang: 'fr' }));
    store.dueJobs.mockResolvedValue([fuJob('fu_pre_24h', 'prePayment')]);
    await processDueJobs();
    expect(deliverOut).not.toHaveBeenCalled();
    expect(store.audit).toHaveBeenCalledWith('scheduler', 'follow_up_skipped_no_template_in_language', expect.objectContaining({ reason: expect.any(String) }));
  });

  it('English customers are unchanged', async () => {
    store.getCustomerById.mockResolvedValue(customer({ lang: 'en' }));
    store.dueJobs.mockResolvedValue([fuJob('fu_pre_24h', 'prePayment')]);
    await processDueJobs();
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect((deliverOut.mock.calls[0] as unknown[])[4]).toEqual(expect.objectContaining({ name: 'fu_pre_24h' }));
  });
});

describe('2. repeat holding line', () => {
  const ackJob = { id: 'h1', customerId: 'c1', kind: 'HANDOFF_ACK', payload: {}, runAt: ago(0), status: 'SCHEDULED', createdAt: ago(10 * MIN) };
  const setup = (ackAgo: number, customerAgo: number) => {
    store.getCustomerById.mockResolvedValue(customer({ lang: 'en', state: 'FORM_COMPLETE', paid: true }));
    store.findOpenTaskForCustomer.mockResolvedValue({ id: 't9', reason: 'x', severity: 'REVIEW' });
    store.listMessages.mockResolvedValue([
      msg({ direction: 'OUT', body: 'Hang tight', meta: { waTemplate: { name: 'handoff_holding' } }, createdAt: ago(ackAgo) }),
      msg({ direction: 'IN', author: 'CUSTOMER', body: 'hello? any news about the form', createdAt: ago(customerAgo) }),
    ]);
    store.dueJobs.mockResolvedValue([ackJob]);
  };
  it('a second "hello?" soon after the first holding line gets nothing new', async () => {
    setup(30 * MIN, 5 * MIN);
    await processDueJobs();
    expect(deliverOut).not.toHaveBeenCalled();
    expect(store.audit).toHaveBeenCalledWith('assistant', 'handoff_ack_skipped', expect.objectContaining({ reason: expect.stringMatching(/repeat is not due/) }));
  });
  it('after 4 business hours of silence the same line goes again', async () => {
    setup(3 * 24 * HOUR, 5 * MIN);
    await processDueJobs();
    expect(deliverOut).toHaveBeenCalledTimes(1);
  });
});

describe('3 to 7. repair sweep', () => {
  const runSweep = () => runRepairSweep(store as never, NOW.getTime());

  it('is gated to once per 10 minutes', async () => {
    store.listCustomers.mockResolvedValue([]);
    expect(await runSweep()).not.toBeNull();
    expect(await runSweep()).toBeNull();
  });

  it('payment confirmation that never delivered the link is sent again once, not every tick', async () => {
    store.listCustomers.mockResolvedValue([customer({ lang: 'en', state: 'FORM_PENDING', paid: true })]);
    store.listMessages.mockResolvedValue([msg({ status: 'FAILED', body: 'Payment received, thanks', meta: { paymentConfirmation: true }, createdAt: ago(2 * HOUR) })]);
    await runSweep();
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect((deliverOut.mock.calls[0] as unknown[])[1]).toBe(fallbackConfirmationText('en'));
    settings.delete('repair_sweep_at');
    await runSweep();
    expect(deliverOut).toHaveBeenCalledTimes(1); // 30 minute cooldown
  });

  it('a delivered link ends it and auto-resolves the "not been told" task', async () => {
    store.listCustomers.mockResolvedValue([customer({ lang: 'en', state: 'FORM_PENDING', paid: true })]);
    store.listMessages.mockResolvedValue([
      msg({ status: 'FAILED', body: 'Payment received', meta: { paymentConfirmation: true }, createdAt: ago(3 * HOUR) }),
      msg({ author: 'HUMAN', body: `Here is your form ${fallbackConfirmationText('en').match(/https?:\/\/\S+/)?.[0]}`, createdAt: ago(HOUR) }),
    ]);
    store.findOpenTaskForCustomer.mockResolvedValue({ id: 't5', reason: 'PAID, BUT THEY HAVE NOT BEEN TOLD. x' });
    await runSweep();
    expect(deliverOut).not.toHaveBeenCalled();
    expect(store.resolveTask).toHaveBeenCalledWith('t5');
  });

  it('a failed form link outside the window with no template escalates ONCE, not each sweep', async () => {
    store.listCustomers.mockResolvedValue([customer({ lang: 'en', state: 'FORM_PENDING', paid: true, formComplete: true })]);
    store.listMessages.mockResolvedValue([msg({ status: 'FAILED', body: 'Your form: https://example.com/tax-form', meta: { sendError: 'WhatsApp 131047 outside 24h' }, createdAt: ago(2 * HOUR) })]);
    await runSweep();
    expect(deliverOut).not.toHaveBeenCalled();
    expect(store.addTask).toHaveBeenCalledTimes(1);
    settings.delete('repair_sweep_at');
    await runSweep();
    expect(store.addTask).toHaveBeenCalledTimes(1);
  });

  it('a failed ABN request inside the window is retried as text, at most twice, then escalated once', async () => {
    store.listCustomers.mockResolvedValue([customer({ lang: 'en', state: 'FORM_COMPLETE', paid: true, formComplete: true, lastCustomerMsgAt: ago(HOUR) })]);
    store.listMessages.mockResolvedValue([msg({ status: 'FAILED', body: 'Please send your ABN invoices for the year', meta: { sendError: 'template does not exist' }, createdAt: ago(2 * HOUR) })]);
    for (let i = 0; i < 4; i++) { settings.delete('repair_sweep_at'); settings.delete('repair_try_at:c1:abn_request'); await runSweep(); }
    expect(deliverOut.mock.calls.length).toBe(2);
    expect(store.addTask).toHaveBeenCalledTimes(1);
  });

  it('a customer who blocked the number gets no retry and no task', async () => {
    store.listCustomers.mockResolvedValue([customer({ lang: 'en', state: 'FORM_COMPLETE', paid: true, formComplete: true, lastCustomerMsgAt: ago(HOUR) })]);
    store.listMessages.mockResolvedValue([msg({ status: 'FAILED', body: 'Please send your ABN invoices for the year', meta: { sendError: 'WhatsApp 130403 blocked' }, createdAt: ago(2 * HOUR) })]);
    await runSweep();
    expect(deliverOut).not.toHaveBeenCalled();
    expect(store.addTask).not.toHaveBeenCalled();
  });

  it('a stale sales stage after the team confirmed payment raises no task any more (Jo, 3 Nov)', async () => {
    store.listCustomers.mockResolvedValue([customer({ lang: 'en', state: 'PRICE_SENT', paid: false })]);
    store.listMessages.mockResolvedValue([msg({ author: 'HUMAN', body: 'Payment received, thank you! Here is your form.', createdAt: ago(HOUR) })]);
    await runSweep();
    expect(store.addTask).not.toHaveBeenCalled();
  });

  it('opted out and paused customers are never messaged', async () => {
    store.listCustomers.mockResolvedValue([customer({ lang: 'en', state: 'FORM_PENDING', paid: true, aiPaused: true })]);
    store.listMessages.mockResolvedValue([msg({ status: 'FAILED', body: 'Payment received', meta: { paymentConfirmation: true }, createdAt: ago(2 * HOUR) })]);
    await runSweep();
    expect(deliverOut).not.toHaveBeenCalled();
  });

  describe('paperwork checklist', () => {
    const form = () => customer({ lang: 'en', state: 'FORM_COMPLETE', paid: true, formComplete: true, lastCustomerMsgAt: ago(HOUR), stateChangedAt: ago(2 * HOUR) });
    const quiet = [msg({ direction: 'IN', author: 'CUSTOMER', body: 'form done', createdAt: ago(2 * HOUR) }), msg({ body: 'Thanks', createdAt: ago(100 * MIN) })];
    it('does nothing while the setting is off (default)', async () => {
      store.listCustomers.mockResolvedValue([form()]);
      store.listMessages.mockResolvedValue(quiet);
      await runSweep();
      settings.delete('repair_sweep_at');
      await runSweep();
      expect(deliverOut).not.toHaveBeenCalled();
      expect(settings.has('paperwork_asked:c1')).toBe(false);
    });
    it('on: first sweep notes the customer, a later one (20+ minutes) sends ONE numbered list, free text', async () => {
      settings.set('paperwork_checklist', true);
      store.listCustomers.mockResolvedValue([form()]);
      store.listMessages.mockResolvedValue(quiet);
      await runSweep();
      expect(deliverOut).not.toHaveBeenCalled();
      jest.setSystemTime(new Date(NOW.getTime() + 25 * MIN));
      settings.delete('repair_sweep_at');
      store.listCustomers.mockResolvedValue([{ ...form(), lastCustomerMsgAt: ago(-24 * MIN) }]);
      await runRepairSweep(store as never, NOW.getTime() + 25 * MIN);
      expect(deliverOut).toHaveBeenCalledTimes(1);
      const call = deliverOut.mock.calls[0] as unknown[];
      expect(call[4]).toBeUndefined();
      expect(String(call[1])).toMatch(/1\./);
      expect(String(call[1])).not.toMatch(/[‒-―]/);
      // never a second first-ask
      settings.delete('repair_sweep_at');
      await runRepairSweep(store as never, NOW.getTime() + 40 * MIN);
      expect(deliverOut).toHaveBeenCalledTimes(1);
    });
  });
});

describe('6. Medicare gate and deferral', () => {
  const medJob = (attempt = 0, extra: Record<string, unknown> = {}) => ({ id: 'mj', customerId: 'c1', kind: 'MEDICARE_INFO', payload: { attempt, ...extra }, runAt: ago(0), status: 'SCHEDULED', createdAt: ago(20 * MIN) });
  const base = () => customer({ lang: 'en', state: 'FORM_COMPLETE', paid: true, formComplete: true, lastCustomerMsgAt: ago(3 * HOUR) });

  it('sends once to a customer with nothing against it', async () => {
    store.getCustomerById.mockResolvedValue(base());
    store.dueJobs.mockResolvedValue([medJob()]);
    await processDueJobs();
    expect(deliverOut).toHaveBeenCalledTimes(1);
  });

  it('never to someone who said they are on a working holiday visa (unless the team set it)', async () => {
    store.getCustomerById.mockResolvedValue(base());
    store.listMessages.mockResolvedValue([msg({ direction: 'IN', author: 'CUSTOMER', body: 'I am here on a working holiday visa 417', createdAt: ago(6 * HOUR) }), msg({ body: 'Thanks', createdAt: ago(5 * HOUR) })]);
    store.dueJobs.mockResolvedValue([medJob()]);
    await processDueJobs();
    expect(deliverOut).not.toHaveBeenCalled();
    expect(store.audit).toHaveBeenCalledWith('scheduler', 'medicare_gate_blocked', expect.objectContaining({ reason: 'working_holiday_maker' }));
    store.dueJobs.mockResolvedValue([medJob(0, { teamSetExemption: true })]);
    await processDueJobs();
    expect(deliverOut).toHaveBeenCalledTimes(1);
  });

  it('not again once it was sent, and not after an "In progress" note', async () => {
    store.getCustomerById.mockResolvedValue(base());
    store.listMessages.mockResolvedValue([msg({ body: 'x', meta: { waTemplate: { name: 'medicare' } } })]);
    expect((await medicareGateFor(store as never, base() as never)).reason).toBe('already_sent');
    store.listMessages.mockResolvedValue([msg({ direction: 'IN', author: 'CUSTOMER', body: 'Medicare application: in progress', createdAt: ago(5 * HOUR) })]);
    expect((await medicareGateFor(store as never, base() as never)).reason).toBe('screenshot_received');
  });

  it('a busy chat backs off 30, 90, 240 minutes then stops with one team note, no more jobs', async () => {
    store.getCustomerById.mockResolvedValue(base());
    store.listMessages.mockResolvedValue([msg({ direction: 'IN', author: 'CUSTOMER', body: 'quick question', createdAt: ago(5 * MIN) })]);
    const delays: number[] = [];
    for (const attempt of [0, 1, 2]) {
      store.addJob.mockClear();
      store.dueJobs.mockResolvedValue([medJob(attempt)]);
      await processDueJobs();
      const added = store.addJob.mock.calls[0]?.[0] as { runAt: string; payload: { attempt: number } };
      delays.push(Math.round((new Date(added.runAt).getTime() - NOW.getTime()) / MIN));
      expect(added.payload.attempt).toBe(attempt + 1);
    }
    expect(delays).toEqual([30, 90, 240]);
    store.addJob.mockClear();
    store.dueJobs.mockResolvedValue([medJob(3)]);
    await processDueJobs();
    expect(store.addJob).not.toHaveBeenCalled();
    expect(deliverOut).not.toHaveBeenCalled();
    expect(store.addTask).toHaveBeenCalledTimes(1);
  });
});
