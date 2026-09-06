/**
 * audit3 core #41: in Approval mode a later draft must not silently discard the
 * "payment received" draft.
 *
 * The screenshot path in Supervised mode drafts the payment confirmation with
 * proposedState PAID and opens a task saying it is waiting for approval. Every
 * new pending_approval reply then discarded EVERY earlier draft, so a customer
 * who sent the receipt and typed "when will I hear back?" produced a second
 * draft (no proposedState) that threw the payment one away: Jo approved the
 * visible answer, the customer stayed unpaid at PRICE_SENT, the open payment
 * task pointed at a draft that no longer existed.
 *
 * Now the payment draft is folded into the new one: PAID is carried forward
 * and the identical confirmation is appended when the reply lacks the form
 * link (the same helper the typed "I paid" route uses). One draft, one
 * approval, same words to the customer.
 */
import type { Store, CustomerRow, MessageRow } from '@/lib/will/store';
import { isPaymentReceivedDraft, paymentReceivedMessage } from '@/lib/will/i18n';

const runEngine = jest.fn();
jest.mock('@/lib/will/engine', () => ({ runEngine: (...a: unknown[]) => runEngine(...a) }));
jest.mock('@/lib/will/ai-budget', () => ({ aiBudgetExhausted: jest.fn().mockResolvedValue(false) }));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn(), abnAnswersPendingKey: () => 'k' }));
jest.mock('@/lib/will/channel', () => ({ deliverOut: jest.fn(), fetchWaMedia: jest.fn() }));
jest.mock('@/lib/will/claude', () => ({ assessPaymentProofImage: jest.fn(), describeAttachment: jest.fn() }));
jest.mock('@/lib/will/suggest', () => ({ suggestReply: jest.fn().mockResolvedValue('') }));

const getSetting = jest.fn().mockResolvedValue(undefined);
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ getSetting }) }));

import { decideAndAct } from '@/lib/will/service';

const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', paid: false, state: 'PRICE_SENT', lang: 'en',
  optedOut: false, aiPaused: false, isLegacy: false, income: 'TFN', formComplete: false, missingDocs: [],
  estimatedRefundCents: null,
} as unknown as CustomerRow;

const msg = (over: Partial<MessageRow>): MessageRow => ({
  id: 'm', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'SENT',
  body: 'x', createdAt: '2026-09-05T00:00:00.000Z', meta: {}, ...over,
} as unknown as MessageRow);

function fakeStore(messages: MessageRow[]) {
  const added: unknown[] = [];
  const setMessageStatus = jest.fn().mockResolvedValue(true);
  const audit = jest.fn().mockResolvedValue(undefined);
  const store = {
    listMessages: jest.fn().mockResolvedValue(messages),
    listTemplates: jest.fn().mockResolvedValue([]),
    history: jest.fn().mockResolvedValue([]),
    addMessage: jest.fn().mockImplementation(async (m: unknown) => { added.push(m); return { id: 'new', ...(m as object) }; }),
    setMessageStatus, audit,
    updateCustomer: jest.fn().mockResolvedValue(undefined),
  } as unknown as Store;
  return { store, added, setMessageStatus, audit };
}

const receipt = msg({ id: 'in1', direction: 'IN', body: '📷 [Photo]' });
const paymentDraft = msg({ id: 'pay1', status: 'PENDING_APPROVAL', body: paymentReceivedMessage('en'), meta: { proposedState: 'PAID' } });
const question = msg({ id: 'in2', direction: 'IN', body: 'when will I hear back?' });

beforeEach(() => runEngine.mockReset());

it('folds the pending payment received draft into the new draft instead of losing it', async () => {
  runEngine.mockResolvedValue({
    kind: 'pending_approval', replyText: 'We will get back to you within 24 hours.',
    decision: { action: 'reply', confidence: 1 },
  });
  const { store, added, setMessageStatus, audit } = fakeStore([receipt, paymentDraft, question]);

  const res = await decideAndAct(store, customer, 'when will I hear back?', 'SUPERVISED', { killSwitch: false });

  expect(res.pendingMessageId).toBe('new');
  expect(added).toHaveLength(1);
  const draft = added[0] as { status: string; body: string; meta: { proposedState?: string } };
  expect(draft.status).toBe('PENDING_APPROVAL');
  // Approving this one draft moves them to Paid, exactly as approving the old one would have.
  expect(draft.meta.proposedState).toBe('PAID');
  // The customer gets the answer AND the identical confirmation with the form link.
  expect(draft.body.startsWith('We will get back to you within 24 hours.')).toBe(true);
  expect(draft.body).toContain(paymentReceivedMessage('en'));
  // The old draft is still tidied away: one current proposal at the bottom of the thread.
  expect(setMessageStatus).toHaveBeenCalledWith('pay1', 'DISCARDED');
  expect(audit).toHaveBeenCalledWith('system', 'payment_received_carried_forward', expect.objectContaining({ customerId: 'c1', from: 'pay1' }));
});

it('leaves an ordinary stale draft to be discarded with no PAID carried onto the new one', async () => {
  runEngine.mockResolvedValue({
    kind: 'pending_approval', replyText: 'Sure, the fee is $220.',
    decision: { action: 'reply', confidence: 1 },
  });
  const stale = msg({ id: 'old1', status: 'PENDING_APPROVAL', body: 'Hi Alex, the fee is $220.', meta: {} });
  const { store, added, setMessageStatus, audit } = fakeStore([stale, question]);

  await decideAndAct(store, customer, 'how much?', 'SUPERVISED', { killSwitch: false });

  const draft = added[0] as { body: string; meta: { proposedState?: string } };
  expect(draft.meta.proposedState).toBeUndefined();
  expect(draft.body).toBe('Sure, the fee is $220.');
  expect(setMessageStatus).toHaveBeenCalledWith('old1', 'DISCARDED');
  expect(audit).not.toHaveBeenCalledWith('system', 'payment_received_carried_forward', expect.anything());
});

it('does not carry PAID onto a customer who is already paid', async () => {
  runEngine.mockResolvedValue({
    kind: 'pending_approval', replyText: 'The team is on it.',
    decision: { action: 'reply', confidence: 1 },
  });
  const { store, added } = fakeStore([paymentDraft, question]);
  await decideAndAct(store, { ...customer, paid: true, state: 'FORM_PENDING' } as CustomerRow, 'and?', 'SUPERVISED', { killSwitch: false });
  const draft = added[0] as { body: string; meta: { proposedState?: string } };
  expect(draft.meta.proposedState).toBeUndefined();
  expect(draft.body).toBe('The team is on it.');
});

describe('isPaymentReceivedDraft', () => {
  it('recognises the screenshot draft in every language and a Library edited body', () => {
    for (const lang of ['en', 'de', 'ja', 'es', 'fr', 'it', 'pt']) {
      expect(isPaymentReceivedDraft({ body: paymentReceivedMessage(lang), meta: { proposedState: 'PAID' } })).toBe(true);
    }
    const edited = 'Thanks, we have your payment. Form: https://workingholidaytax.com.au/tax-form';
    expect(isPaymentReceivedDraft({ body: edited, meta: { proposedState: 'PAID' } })).toBe(false);
    expect(isPaymentReceivedDraft({ body: edited, meta: { proposedState: 'PAID' } }, [edited])).toBe(true);
  });

  it('is not fooled by a conversational PAID draft or by the system line without PAID', () => {
    expect(isPaymentReceivedDraft({ body: 'Great, thanks for paying!', meta: { proposedState: 'PAID' } })).toBe(false);
    expect(isPaymentReceivedDraft({ body: paymentReceivedMessage('en'), meta: {} })).toBe(false);
    expect(isPaymentReceivedDraft({ body: '', meta: { proposedState: 'PAID' } })).toBe(false);
  });
});
