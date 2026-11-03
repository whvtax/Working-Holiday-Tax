/**
 * 3 Nov 2026, 72 hour export: scheduler follow-up logic. Synthetic names and
 * numbers only. Pure helpers first, then the tick with a store double.
 */
import {
  followUpBlock, residencyCheckBlock, systemMessageProvesPastLeadStage, removedFromPortal, saidSigned, refundCheckinBlock,
} from '@/lib/will/followup-gate-30oct';
import { promisedUntil } from '@/lib/will/promised-date';

const at = (n: number) => new Date(Date.UTC(2026, 9, 20, 8, n)).toISOString();
const IN = (body: string, n = 0) => ({ direction: 'IN' as const, author: 'CUSTOMER' as const, status: 'SENT' as const, body, createdAt: at(n), meta: {} });
const OUT = (body: string, n = 0, meta: Record<string, unknown> = {}, author: 'AI' | 'HUMAN' = 'AI') =>
  ({ direction: 'OUT' as const, author, status: 'SENT' as const, body, createdAt: at(n), meta });
const cust = (over: Record<string, unknown> = {}) => ({ paid: false, state: 'PRICE_SENT' as const, outcome: null, estimatedRefundCents: null, ...over });

describe('(b) a promised payment date', () => {
  const tue = new Date('2026-10-20T06:00:00.000Z'); // a Tuesday
  it('"would you mind if I send through the money on Friday" names Friday', () => {
    const until = promisedUntil('Perfect, would you mind if I send through the money on Friday (and we start the process thereafter) as that is when I get paid', tue);
    expect(until).not.toBeNull();
    expect(new Date(until as string).getTime()).toBeGreaterThan(new Date('2026-10-23T23:59:00.000Z').getTime());
  });
  it('"wait for pay day" with no date is a week of quiet', () => {
    const until = promisedUntil('Unfortunately will have to wait for pay day here in Aus as not long been back', tue);
    expect(until).not.toBeNull();
    expect(new Date(until as string).getTime() - tue.getTime()).toBeGreaterThan(6.5 * 86400_000);
  });
  it('a question about getting paid, or a refund, is not a promise', () => {
    expect(promisedUntil('Will I get paid a refund?', tue)).toBeNull();
    expect(promisedUntil('how much will my refund be when I get paid back?', tue)).toBeNull();
  });
  it('past tense is still not a promise', () => {
    expect(promisedUntil('I paid you on Friday', tue)).toBeNull();
  });
});

describe('(c) signature nudges and people who are finished', () => {
  it('"I got someone else to do it" stops the signature nudges even for a paid customer', () => {
    const msgs = [OUT('Your tax return is ready! I have emailed it to you for review and signature.', 1), IN('Dont worry about it', 2), IN('I got someone else to do it for me', 3), IN('No its ok thank you for the help though', 4)];
    expect(followUpBlock(cust({ paid: true, state: 'SIGNATURE_PENDING' }) as never, 'signature', msgs as never)?.block).toMatch(/not going ahead/);
  });
  it('a bare "Done!" after the notice counts as signed; a question does not', () => {
    const notice = OUT('Your tax return is ready! I have emailed it to you for review and signature.', 1);
    expect(saidSigned([notice, IN('Done!', 2)] as never)).toBe(true);
    expect(saidSigned([notice, IN('literally just done it!', 2)] as never)).toBe(true);
    expect(saidSigned([notice, IN('Done, but where do I sign?', 2)] as never)).toBe(false);
  });
  it('once the lodged message is in the chat after the notice, no signature nudge', () => {
    const msgs = [OUT('x', 1, { waTemplate: { name: 'signature', params: [] } }), OUT('Your tax return has been lodged successfully! ✅', 2, {}, 'HUMAN')];
    expect(followUpBlock(cust({ paid: true, state: 'SIGNATURE_PENDING' }) as never, 'signature', msgs as never)?.block).toMatch(/lodged/);
  });
  it('a signature chat with nothing finished is not blocked', () => {
    const msgs = [OUT('Your tax return is ready! I have emailed it to you for review and signature.', 1), IN('I did not get an email', 2), OUT('Let me check', 3)];
    expect(followUpBlock(cust({ paid: true, state: 'SIGNATURE_PENDING' }) as never, 'signature', msgs as never)).toBeNull();
  });
  it('a client the team removed gets nothing, until the client writes again', () => {
    const removed = OUT("Good morning, We've deleted your details and removed you from our client portal. All the best!", 5, {}, 'HUMAN');
    expect(removedFromPortal([IN('how much?', 1), removed] as never)).not.toBeNull();
    expect(followUpBlock(cust() as never, 'prePayment', [IN('how much?', 1), removed] as never)?.block).toMatch(/removed/);
    expect(followUpBlock(cust() as never, 'signature', [removed] as never)?.block).toMatch(/removed/);
    expect(removedFromPortal([removed, IN('Hi, sorry, can we carry on? How do I pay?', 9)] as never)).toBeNull();
  });
});

describe('(d) the refund check-in and people who owe', () => {
  it('the ATO payment-request wording typed by the team counts as owing', () => {
    const msgs = [OUT('Your tax return has been lodged successfully! Within 14 days you will receive an email from the ATO with the payment request and how to pay.', 1, {}, 'HUMAN')];
    expect(refundCheckinBlock(cust({ paid: true, state: 'LODGED' }) as never, msgs as never)).toMatch(/owes/);
    expect(refundCheckinBlock(cust({ paid: true, state: 'LODGED' }) as never, [OUT('Your refund should arrive in 14 business days', 1)] as never)).toBeNull();
  });
});

describe('(a) which system messages prove a lead has paid', () => {
  it('the holding line, the price reply and a document acknowledgement do not', () => {
    expect(systemMessageProvesPastLeadStage(OUT("I've passed this to the team. They'll reply here, usually within one business day.", 1, { system: true, waTemplate: { name: 'handoff_holding', params: [] } }) as never)).toBe(false);
    expect(systemMessageProvesPastLeadStage(OUT("Got it, so that's the TFN option, $220. We review your tax residency, Medicare and deductions, then prepare and lodge your tax return.", 1, { system: true }) as never)).toBe(false);
    expect(systemMessageProvesPastLeadStage(OUT('Thanks, I have added those to your file.', 1, { system: true }) as never)).toBe(false);
  });
  it('payment, form and signature confirmations do', () => {
    expect(systemMessageProvesPastLeadStage(OUT('x', 1, { system: true, paymentConfirmation: true }) as never)).toBe(true);
    expect(systemMessageProvesPastLeadStage(OUT('x', 1, { system: true, waTemplate: { name: 'form_received_de', params: [] } }) as never)).toBe(true);
    expect(systemMessageProvesPastLeadStage(OUT('Payment received! 🎉', 1, { system: true }) as never)).toBe(true);
  });
});

describe('(g) the residency double-check', () => {
  it('not after the customer has talked about their residency or time in Australia', () => {
    expect(residencyCheckBlock([IN('I was in aus for 6 months in feb 2023, does that impact the aus tax residence?', 1)] as never)).toMatch(/already wrote/);
    expect(residencyCheckBlock([IN('Can you tell me if I am a resident or a working holiday maker?', 1)] as never)).toMatch(/already wrote/);
    expect(residencyCheckBlock([IN('Nur 3 von 5 treffen zu', 1)] as never)).toMatch(/already wrote/);
  });
  it('not while the team is on the question', () => {
    expect(residencyCheckBlock([OUT('Did you meet all five criteria in the questionnaire?', 1, {}, 'HUMAN')] as never)).toMatch(/team/);
  });
  it('an ordinary post-form chat is not blocked, and the automatic form text is ignored', () => {
    expect(residencyCheckBlock([IN('Hi! I have just sent through my form', 1), IN('here is my payslip', 2), OUT("Perfect, got it all", 3)] as never)).toBeNull();
  });
});

// ── the scheduler tick ───────────────────────────────────────────────────────

const store = {
  reclaimStaleJobs: jest.fn().mockResolvedValue(0),
  getSetting: jest.fn(async (k: string): Promise<unknown> => (k === 'ai_mode' ? 'FULL_AUTO' : undefined)),
  setSetting: jest.fn().mockResolvedValue(undefined),
  dueJobs: jest.fn(),
  claimJob: jest.fn().mockResolvedValue(true),
  getCustomerById: jest.fn(),
  setJobStatus: jest.fn().mockResolvedValue(undefined),
  addJob: jest.fn().mockResolvedValue({ id: 'new' }),
  addTask: jest.fn(),
  addMessage: jest.fn(),
  audit: jest.fn().mockResolvedValue(undefined),
  listTemplates: jest.fn(),
  setState: jest.fn().mockResolvedValue(true),
  updateCustomer: jest.fn(),
  updateTask: jest.fn(),
  cancelJobsFor: jest.fn().mockResolvedValue(0),
  getMessageById: jest.fn(),
  findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
  listMessages: jest.fn().mockResolvedValue([]),
  listJobsForCustomer: jest.fn().mockResolvedValue([]),
  getJob: jest.fn().mockResolvedValue(null),
  history: jest.fn().mockResolvedValue([]),
  listTasks: jest.fn().mockResolvedValue([]),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
const deliverOut = jest.fn(async (..._a: unknown[]) => ({ ok: true }));
const templateApprovedFor = jest.fn(async (..._a: unknown[]): Promise<boolean | null> => true);
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => (deliverOut as unknown as (...x: unknown[]) => unknown)(...a),
  templateApprovedFor: (...a: unknown[]) => (templateApprovedFor as unknown as (...x: unknown[]) => unknown)(...a),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppTemplate: jest.fn().mockResolvedValue({ ok: true }),
  wasAlreadySentVerbatim: jest.fn().mockResolvedValue(false),
}));
jest.mock('@/lib/will/service', () => ({ runDeferredAutoReply: jest.fn() }));
jest.mock('@/lib/will/config', () => ({ ...jest.requireActual('@/lib/will/config'), withinQuietHours: () => true }));

import { processDueJobs } from '@/lib/will/scheduler';

const NOW = '2026-10-21T08:00:00.000Z';
const row = (over: Record<string, unknown> = {}) => ({
  id: 'c1', waId: '61400000001', name: 'Sam', state: 'PRICE_SENT', paid: false, aiPaused: false, isLegacy: false, optedOut: false,
  lang: 'en', income: 'TFN', lastCustomerMsgAt: '2026-10-19T09:00:00.000Z', estimatedRefundCents: null, outcome: null, ...over,
});
const job = (kind: string, payload: Record<string, unknown> = {}, id = 'f1') => ({ id, customerId: 'c1', kind, payload, runAt: NOW, status: 'SCHEDULED', createdAt: '2026-10-19T08:00:00.000Z' });
const old = (direction: 'IN' | 'OUT', body: string, meta: Record<string, unknown> = {}, author = direction === 'IN' ? 'CUSTOMER' : 'AI') =>
  ({ id: `m${Math.random()}`, customerId: 'c1', direction, author, status: 'SENT', body, createdAt: '2026-10-19T10:00:00.000Z', meta });

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers().setSystemTime(new Date(NOW));
  store.getCustomerById.mockResolvedValue(row());
  store.listMessages.mockResolvedValue([]);
  store.listJobsForCustomer.mockResolvedValue([]);
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : undefined));
  templateApprovedFor.mockResolvedValue(true);
  store.listTemplates.mockResolvedValue(['fu_pre_24h', 'fu_pre_3d', 'fu_pre_7d', 'fu_price_sent']
    .map((key) => ({ key, title: key, body: 'Hi {{1}}, still keen?', active: true })));
});
afterEach(() => jest.useRealTimers());

const FU = (key: string, seq: number) => job('FOLLOW_UP', { flow: 'prePayment', templateKey: key, seq });

it('(a) tick: the holding line and the price reply do not cancel the unpaid lead\'s nudge', async () => {
  store.listMessages.mockResolvedValue([
    old('OUT', "Got it, so that's the TFN option, $220. We review your tax residency, Medicare and deductions, then prepare and lodge your tax return.", { system: true }),
    old('OUT', "I've passed this to the team. They'll reply here, usually within one business day.", { system: true, waTemplate: { name: 'handoff_holding', params: [] } }),
  ]);
  store.dueJobs.mockResolvedValue([FU('fu_pre_24h', 0)]);
  await processDueJobs();
  expect(store.audit).not.toHaveBeenCalledWith('scheduler', 'follow_up_cancelled_stale_paid_flag', expect.anything());
  expect(deliverOut).toHaveBeenCalledTimes(1);
});

it('(a) tick: a payment confirmation (system) still cancels the sales nudge', async () => {
  store.listMessages.mockResolvedValue([old('OUT', 'x', { system: true, paymentConfirmation: true })]);
  store.dueJobs.mockResolvedValue([FU('fu_pre_24h', 0)]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.setJobStatus).toHaveBeenCalledWith('f1', 'CANCELLED');
});

it('(b) tick: a named payment day defers the nudge to that day', async () => {
  const until = '2026-10-24T11:59:59.000Z';
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : k === 'sales_promised_until:c1' ? until : undefined));
  store.dueJobs.mockResolvedValue([FU('fu_pre_24h', 0)]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.addJob).toHaveBeenCalledWith(expect.objectContaining({ kind: 'FOLLOW_UP', runAt: until }));
});

it('(f) tick: the door-closer after a skipped 3 day step comes 4 days later, not 7 (10 days after the price nudge)', async () => {
  store.listMessages.mockResolvedValue([
    old('OUT', 'Hi Sam, did the transfer go through on your end?', { waTemplate: { name: 'fu_price_sent', params: ['Sam'] } }),
  ]);
  store.dueJobs.mockResolvedValue([FU('fu_pre_3d', 1)]);
  await processDueJobs();
  expect(store.audit).toHaveBeenCalledWith('scheduler', 'follow_up_skipped_price_sent_already_nudged', expect.anything());
  const next = store.addJob.mock.calls.map((c) => c[0]).find((j) => j.kind === 'FOLLOW_UP');
  expect(next.payload.templateKey).toBe('fu_pre_7d');
  expect(new Date(next.runAt).getTime() - new Date(NOW).getTime()).toBe(4 * 86400_000);
});

it('(e) tick: a resend of our own free text outside the 24h window is dropped quietly, no task, no send', async () => {
  store.getMessageById.mockResolvedValue({ id: 'mm1', author: 'AI', body: 'Hi Sam, has your refund landed in your account yet?', meta: { system: true } });
  store.dueJobs.mockResolvedValue([job('RESEND_MESSAGE', { messageId: 'mm1', attempt: 0 })]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.audit).toHaveBeenCalledWith('scheduler', 'resend_message_skipped_outside_window', expect.anything());
  expect(store.addTask).not.toHaveBeenCalled();
});

it('(g) tick: the residency double-check is skipped after the customer already wrote about it', async () => {
  store.getCustomerById.mockResolvedValue(row({ state: 'FORM_PENDING', paid: true }));
  store.listMessages.mockResolvedValue([old('IN', 'I lived in Australia for 7 months, does that make me a resident?')]);
  store.dueJobs.mockResolvedValue([job('RESIDENCY_CHECK', {})]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.audit).toHaveBeenCalledWith('system', 'residency_check_skipped', expect.objectContaining({ customerId: 'c1' }));
});
