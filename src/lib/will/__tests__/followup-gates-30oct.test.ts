/**
 * 30 Oct 2026, findings from 410 real chats: a template written for one
 * situation reached someone in another. Pure gates first, then the scheduler
 * tick with a store double (no production data, invented names and numbers).
 */
import {
  followUpBlock, refundCheckinBlock, lodgedVariant, customerOwesTax, saidSigned, formSubmittedInChat,
  paymentConfirmedInChat, reviewAskAlreadySent,
} from '@/lib/will/followup-gate-30oct';
import { PAYMENT_RECEIVED_MSG, LODGED_CONFIRMATION_MSG, LODGED_PAYABLE_MSG } from '@/lib/will/i18n';

const at = (n: number) => new Date(Date.UTC(2026, 9, 20, 8, n)).toISOString();
const IN = (body: string, n = 0) => ({ direction: 'IN' as const, author: 'CUSTOMER' as const, status: 'SENT' as const, body, createdAt: at(n), meta: {} });
const OUT = (body: string, n = 0, meta: Record<string, unknown> = {}) => ({ direction: 'OUT' as const, author: 'AI' as const, status: 'SENT' as const, body, createdAt: at(n), meta });
const cust = (over: Record<string, unknown> = {}) => ({ paid: false, state: 'PRICE_SENT' as const, outcome: null, estimatedRefundCents: null, ...over });

describe('pre sale nudges never reach a paid customer', () => {
  it('paid flag', () => {
    expect(followUpBlock(cust({ paid: true }) as never, 'prePayment', [])?.block).toMatch(/paid/);
  });
  it('payment confirmation in the chat proves it even when the flag is stale', () => {
    const msgs = [OUT(PAYMENT_RECEIVED_MSG.en, 1), OUT(PAYMENT_RECEIVED_MSG.de, 2)];
    expect(paymentConfirmedInChat(msgs as never)).toBe(true);
    expect(followUpBlock(cust() as never, 'prePayment', msgs as never)?.block).toMatch(/paid/);
    expect(paymentConfirmedInChat([OUT('x', 1, { waTemplate: { name: 'payment_received_ja', params: [] } })] as never)).toBe(true);
  });
  it('an unpaid lead with an ordinary chat is not blocked', () => {
    expect(followUpBlock(cust() as never, 'prePayment', [IN('how much?', 1), OUT('It is $220', 2)] as never)).toBeNull();
  });
});

describe('lodged confirmation and refund check-in for a customer who owes', () => {
  it('the outcome flag, a negative estimate, or payable text in the chat each mean owes', () => {
    expect(customerOwesTax({ outcome: 'PAYABLE', estimatedRefundCents: null }, [])).toBe(true);
    expect(customerOwesTax({ outcome: null, estimatedRefundCents: -45000 }, [])).toBe(true);
    expect(customerOwesTax({ outcome: null, estimatedRefundCents: null }, [OUT('Your return is ready. The estimated amount payable to the ATO is $450.', 1)] as never)).toBe(true);
    expect(customerOwesTax({ outcome: null, estimatedRefundCents: null }, [OUT(LODGED_PAYABLE_MSG.ja, 1)] as never)).toBe(true);
    expect(customerOwesTax({ outcome: 'REFUND', estimatedRefundCents: null }, [OUT('amount payable', 1)] as never)).toBe(false);
    expect(customerOwesTax({ outcome: null, estimatedRefundCents: 120000 }, [])).toBe(false);
  });
  it('Mark Lodged picks the payable variant for someone who owes, and never the refund wording', () => {
    expect(lodgedVariant(cust({ outcome: 'PAYABLE' }) as never, [])).toBe('payable');
    expect(lodgedVariant(cust() as never, [OUT('The estimated amount payable to the ATO is $450', 1)] as never)).toBe('payable');
    expect(lodgedVariant(cust() as never, [])).toBe('refund');
    expect(LODGED_PAYABLE_MSG.en).not.toMatch(/refund should arrive|14 business days/);
    expect(LODGED_CONFIRMATION_MSG.en).toMatch(/refund should arrive in your bank account within 14 business days/);
  });
  it('no refund check-in to someone who owes or who said the refund arrived', () => {
    expect(refundCheckinBlock(cust({ outcome: 'PAYABLE' }) as never, [])).toMatch(/owes/);
    expect(refundCheckinBlock(cust() as never, [IN('My refund arrived today, thanks!', 3)] as never)).toMatch(/arrived/);
    expect(refundCheckinBlock(cust() as never, [IN('When will my refund arrive?', 3)] as never)).toBeNull();
  });
});

describe('signature and form reminders', () => {
  it('no fu_sig after the customer said they signed (after the notice)', () => {
    const msgs = [OUT('Your tax return is ready! I have emailed it to you for review and signature.', 1), IN('Just signed it, thanks', 2)];
    expect(saidSigned(msgs as never)).toBe(true);
    expect(followUpBlock(cust({ state: 'SIGNATURE_PENDING' }) as never, 'signature', msgs as never)?.block).toMatch(/signed/);
  });
  it('"how do I sign", "not signed yet" and a signing from before the notice do not count', () => {
    expect(saidSigned([OUT('please sign', 1), IN('How do I sign this?', 2)] as never)).toBe(false);
    expect(saidSigned([OUT('please sign', 1), IN("I haven't signed yet", 2)] as never)).toBe(false);
    expect(saidSigned([IN('I signed the agreement', 1), OUT('Your return is ready for signature', 2)] as never)).toBe(false);
    expect(saidSigned([OUT('ready for signature', 1), IN('unterschrieben!', 2)] as never)).toBe(true);
    expect(saidSigned([OUT('ready for signature', 1), IN('署名しました', 2)] as never)).toBe(true);
  });
  it('no fu_form after the form was submitted (confirmation sent, or the form text came in)', () => {
    const sent = [OUT("Great, we've received your questionnaire! ✅\nWe'll now go through everything and get back to you soon.", 1)];
    expect(formSubmittedInChat(sent as never)).toBe(true);
    expect(followUpBlock(cust({ state: 'FORM_PENDING', paid: true }) as never, 'form', sent as never)?.block).toMatch(/already submitted/);
    expect(formSubmittedInChat([IN("Hi! I've just sent through my form 😊", 1)] as never)).toBe(true);
    expect(formSubmittedInChat([OUT('Here is your form link', 1), IN('ok will do tonight', 2)] as never)).toBe(false);
  });
});

describe('the review ask goes once', () => {
  it('any earlier review link or ask template in the chat means it was asked', () => {
    expect(reviewAskAlreadySent([OUT('Hi Sam 😊 ...', 1, { waTemplate: { name: 'review_ask_de', params: [] } })] as never)).toBe(true);
    expect(reviewAskAlreadySent([OUT('Leave us a review: https://g.page/r/CaWt4kV0UmY-EBM/review', 1)] as never)).toBe(true);
    expect(reviewAskAlreadySent([OUT('Your return was lodged', 1)] as never)).toBe(false);
  });
});

// ── the scheduler tick ───────────────────────────────────────────────────────

const store = {
  reclaimStaleJobs: jest.fn().mockResolvedValue(0),
  getSetting: jest.fn(async (k: string): Promise<unknown> => (k === 'ai_mode' ? 'FULL_AUTO' : k === 'scheduler_quiet_hours' ? false : undefined)),
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
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
const deliverOut = jest.fn(async (..._a: unknown[]) => ({ ok: true }));
jest.mock('@/lib/will/channel', () => ({
  deliverOut: (...a: unknown[]) => (deliverOut as unknown as (...x: unknown[]) => unknown)(...a),
  templateApprovedFor: jest.fn(async () => true),
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppTemplate: jest.fn().mockResolvedValue({ ok: true }),
  wasAlreadySentVerbatim: jest.fn().mockResolvedValue(false),
}));
jest.mock('@/lib/will/service', () => ({ runDeferredAutoReply: jest.fn() }));
jest.mock('@/lib/will/config', () => ({ ...jest.requireActual('@/lib/will/config'), withinQuietHours: () => true }));

import { processDueJobs } from '@/lib/will/scheduler';
import { APPROVED } from '@/lib/will/approved-messages';

const row = (over: Record<string, unknown> = {}) => ({
  id: 'c1', waId: '61400000001', name: 'Sam', state: 'PRICE_SENT', paid: false, aiPaused: false, isLegacy: false, optedOut: false,
  lang: 'en', income: 'TFN', lastCustomerMsgAt: '2026-10-09T09:00:00.000Z', estimatedRefundCents: null, outcome: null, ...over,
});
const job = (flow: string, templateKey: string, seq = 0) => ({ id: 'f1', customerId: 'c1', kind: 'FOLLOW_UP', payload: { flow, templateKey, seq }, runAt: '2026-10-11T08:00:00.000Z', status: 'SCHEDULED', createdAt: '2026-10-10T08:00:00.000Z' });
const old = (direction: 'IN' | 'OUT', body: string, meta: Record<string, unknown> = {}, author = direction === 'IN' ? 'CUSTOMER' : 'AI') =>
  ({ id: `m${Math.random()}`, customerId: 'c1', direction, author, status: 'SENT', body, createdAt: '2026-10-09T10:00:00.000Z', meta });

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers().setSystemTime(new Date('2026-10-11T08:00:00.000Z'));
  store.getCustomerById.mockResolvedValue(row());
  store.listMessages.mockResolvedValue([]);
  store.listTemplates.mockResolvedValue(['fu_pre_24h', 'fu_pre_3d', 'fu_pre_7d', 'fu_form_6h', 'fu_form_3d', 'fu_form_7d', 'fu_sig_24h', 'fu_sig_3d', 'fu_sig_7d', 'fu_price_sent']
    .map((key) => ({ key, title: key, body: APPROVED.followups_pre_payment.h24, active: true })));
});
afterEach(() => jest.useRealTimers());

it('tick: a stale unpaid flag with "Payment received" in the chat gets no pre sale nudge', async () => {
  store.listMessages.mockResolvedValue([old('OUT', PAYMENT_RECEIVED_MSG.en, { system: true })]);
  store.dueJobs.mockResolvedValue([job('prePayment', 'fu_pre_24h')]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.setJobStatus).toHaveBeenCalledWith('f1', 'CANCELLED');
  expect(store.addJob).not.toHaveBeenCalled();
});

it('tick: fu_form after the form went in is cancelled, fu_sig after "signed" is cancelled', async () => {
  store.getCustomerById.mockResolvedValue(row({ state: 'FORM_PENDING', paid: true }));
  store.listMessages.mockResolvedValue([old('OUT', "Great, we've received your questionnaire! ✅\nWe'll now go through everything and get back to you soon.")]);
  store.dueJobs.mockResolvedValue([job('form', 'fu_form_6h')]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.audit).toHaveBeenCalledWith('scheduler', 'follow_up_blocked_by_gate', expect.objectContaining({ templateKey: 'fu_form_6h' }));

  deliverOut.mockClear();
  store.getCustomerById.mockResolvedValue(row({ state: 'SIGNATURE_PENDING', paid: true }));
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : k.startsWith('signature_notice_sent:') ? '2026-10-09T09:00:00.000Z' : undefined));
  store.listMessages.mockResolvedValue([old('OUT', 'Your tax return is ready! I have emailed it to you for review and signature.'), old('IN', 'Done, I signed it')]);
  store.dueJobs.mockResolvedValue([job('signature', 'fu_sig_24h')]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.audit).toHaveBeenCalledWith('scheduler', 'follow_up_blocked_by_gate', expect.objectContaining({ templateKey: 'fu_sig_24h' }));
});

it('tick: a lead who said "not interested" gets no nudge, the lead is closed and its jobs cancelled, nothing re-armed', async () => {
  store.listMessages.mockResolvedValue([old('OUT', 'The fee is $220'), old('IN', "Thanks but I'll do it myself")]);
  store.dueJobs.mockResolvedValue([job('prePayment', 'fu_pre_24h')]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.setState).toHaveBeenCalledWith('c1', 'NOT_INTERESTED', 'SYSTEM');
  expect(store.cancelJobsFor).toHaveBeenCalledWith('c1', expect.arrayContaining(['FOLLOW_UP', 'AUTO_CLOSE', 'WINBACK']));
  expect(store.addJob).not.toHaveBeenCalled();
  expect(store.audit).toHaveBeenCalledWith('system', 'lead_closed_after_no', expect.objectContaining({ customerId: 'c1' }));
});

it('tick: a lead who said no and then came back with a real question is NOT blocked by the old no', async () => {
  store.listMessages.mockResolvedValue([old('IN', 'not interested sorry'), old('OUT', 'No worries'), old('IN', 'Actually, how do I pay?'), old('OUT', 'Here are the details')]);
  store.dueJobs.mockResolvedValue([job('prePayment', 'fu_pre_24h')]);
  await processDueJobs();
  expect(store.setState).not.toHaveBeenCalled();
  expect(deliverOut).toHaveBeenCalledTimes(1);
});

it('tick: the refund check-in is not sent to someone who owes (flag or chat) and not after "my refund arrived"', async () => {
  const checkin = (n: string) => ({ id: n, customerId: 'c1', kind: 'REFUND_CHECKIN', payload: { attempt: 0 }, runAt: '2026-10-11T08:00:00.000Z', status: 'SCHEDULED', createdAt: '2026-10-10T08:00:00.000Z' });
  store.getSetting.mockImplementation(async (k: string) => (k === 'ai_mode' ? 'FULL_AUTO' : undefined));
  store.getCustomerById.mockResolvedValue(row({ state: 'LODGED', paid: true, estimatedRefundCents: -30000 }));
  store.dueJobs.mockResolvedValue([checkin('r1')]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.audit).toHaveBeenCalledWith('system', 'refund_checkin_blocked', expect.objectContaining({ reason: expect.stringMatching(/owes/) }));

  store.getCustomerById.mockResolvedValue(row({ state: 'LODGED', paid: true }));
  store.listMessages.mockResolvedValue([old('IN', 'My refund arrived, thank you')]);
  store.dueJobs.mockResolvedValue([checkin('r2')]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();

  store.listMessages.mockResolvedValue([old('OUT', 'Your tax return has been lodged successfully!')]);
  store.dueJobs.mockResolvedValue([checkin('r3')]);
  await processDueJobs();
  expect(deliverOut).toHaveBeenCalledTimes(1);
});

it('tick: the review ask is not sent twice (a review link is already in the chat)', async () => {
  const ask = { id: 'q1', customerId: 'c1', kind: 'REVIEW_REQUEST', payload: { trigger: 'timer' }, runAt: '2026-10-11T08:00:00.000Z', status: 'SCHEDULED', createdAt: '2026-10-10T08:00:00.000Z' };
  store.getCustomerById.mockResolvedValue(row({ state: 'LODGED', paid: true }));
  store.listMessages.mockResolvedValue([old('OUT', 'Would you leave us a review? https://g.page/r/CaWt4kV0UmY-EBM/review')]);
  store.dueJobs.mockResolvedValue([ask]);
  await processDueJobs();
  expect(deliverOut).not.toHaveBeenCalled();
  expect(store.audit).toHaveBeenCalledWith('system', 'review_ask_skipped_already_in_chat', expect.anything());
});
