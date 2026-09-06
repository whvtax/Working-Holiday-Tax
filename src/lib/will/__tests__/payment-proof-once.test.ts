/**
 * A confirmed payment is confirmed ONCE, and the customer is always told.
 *
 * TWO BUGS, BOTH IN handlePaymentProofMedia, both fixed on Jo's say-so 29 Aug.
 *
 * 1. IT SAT OUTSIDE THE PER-CUSTOMER QUEUE. WhatsApp delivers messages in a
 *    batch, so somebody who sends the transfer screenshot and then the PDF
 *    receipt has both arrive together. Both read `customer.paid` as false
 *    before either wrote PAID, both passed the gate, and the customer was told
 *    "payment received" twice with the form link twice behind it. Every other
 *    inbound path has been serialised per customer since H7; this was the one
 *    that was not.
 *
 * 2. THE SEND RESULT WAS DISCARDED. deliverOut returns { ok:false } on a
 *    rejected send rather than throwing, and nothing read it. So a customer
 *    could be moved to Paid, then to Form Pending, be told nothing at all, and
 *    get a task saying the opposite: "Moved to Paid automatically, worth a
 *    glance." Meta does not redeliver. The form reminders then chase a form
 *    they were never asked for, while from their side they paid and we went
 *    silent.
 */
const setState = jest.fn().mockResolvedValue(undefined);
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const addMessage = jest.fn().mockResolvedValue({ id: 'm1' });
const audit = jest.fn().mockResolvedValue(undefined);
const deliverOut = jest.fn().mockResolvedValue({ ok: true });

/** Mutated by setState, so the "already paid" gate behaves like the real store. */
const customer: Record<string, unknown> = {
  id: 'c1', waId: '61400000001', name: 'Sam', state: 'PRICE_SENT',
  paid: false, optedOut: false, estimatedRefundCents: null, lang: null,
};

jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(() => Promise.resolve(customer)),
    getCustomerById: jest.fn().mockImplementation(() => Promise.resolve(customer)),
    setState: jest.fn().mockImplementation((_id: string, to: string) => {
      setState(_id, to);
      // Mirror the real store's lost-race semantics: a transition to a state we
      // are already in returns false (no-op); a real transition returns true.
      const changed = customer.state !== to;
      customer.state = to;
      if (to === 'PAID') customer.paid = true;   // the real store flips this too
      return Promise.resolve(changed);
    }),
    addTask, addMessage, audit,
    getSetting: jest.fn().mockResolvedValue('FULL_AUTO'),
    setSetting: jest.fn().mockResolvedValue(undefined),
    updateCustomer: jest.fn().mockResolvedValue(undefined),
    listTemplates: jest.fn().mockResolvedValue([]),
    findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
    cancelJobsFor: jest.fn().mockResolvedValue(undefined),
    listJobsForCustomer: jest.fn().mockResolvedValue([]),
    addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
  }),
}));
jest.mock('@/lib/will/channel', () => ({
  // Mirrors the real deliverOut's contract (audit, 5 Sep): a non-retryable
  // rejection is deliverOut's ONE task, written with the caller's onFailure
  // wording. The caller raises nothing of its own any more.
  deliverOut: async (...a: unknown[]) => {
    const res = await deliverOut(...a) as { ok: boolean; error?: string; retryable?: boolean };
    const [c, body, , , , opts] = a as [
      { id: string; name?: string; waId: string }, string, unknown, unknown, unknown,
      { onFailure?: { reason: string | ((e: string | undefined) => string); severity?: string; context?: string } } | undefined,
    ];
    if (!res.ok && !res.retryable) {
      const r = opts?.onFailure?.reason;
      await addTask({
        customerId: c.id, customerName: c.name ?? c.waId,
        reason: typeof r === 'function' ? r(res.error) : r ?? `WhatsApp send failed: ${res.error ?? 'unknown error'}`,
        severity: opts?.onFailure?.severity ?? 'REVIEW',
        context: opts?.onFailure?.context ?? body.slice(0, 200), suggestedReply: body,
      });
    }
    return res;
  },
  fetchWaMedia: jest.fn().mockResolvedValue({ ok: false, error: 'not needed' }),
}));

import { handlePaymentProofMedia } from '@/lib/will/service';
import { APPROVED } from '@/lib/will/approved-messages';

const photo = (id: string) => ({
  media: { id, kind: 'image', mime: 'image/jpeg', caption: 'just paid it!' },
});

beforeEach(() => {
  setState.mockClear(); addTask.mockClear(); addMessage.mockClear(); audit.mockClear();
  deliverOut.mockClear().mockResolvedValue({ ok: true });
  customer.state = 'PRICE_SENT'; customer.paid = false; customer.optedOut = false;
});

describe('two attachments in one delivery', () => {
  it('confirms the payment once, not twice', async () => {
    // THE BUG. Fired together, exactly as WhatsApp delivers them.
    await Promise.all([
      handlePaymentProofMedia('61400000001', 'paid!', photo('a')),
      handlePaymentProofMedia('61400000001', 'receipt', photo('b')),
    ]);
    const confirmations = deliverOut.mock.calls.filter(
      (c) => c[1] === APPROVED.payment_received,
    );
    expect(confirmations).toHaveLength(1);
    expect(setState.mock.calls.filter((c) => c[1] === 'PAID')).toHaveLength(1);
  });

  it('the second one returns without doing anything', async () => {
    await handlePaymentProofMedia('61400000001', 'paid!', photo('a'));
    deliverOut.mockClear(); addTask.mockClear();
    const second = await handlePaymentProofMedia('61400000001', 'receipt', photo('b'));
    expect(second).toBeNull();
    expect(deliverOut).not.toHaveBeenCalled();
    expect(addTask).not.toHaveBeenCalled();
  });

  it('still confirms a single payment normally', async () => {
    await handlePaymentProofMedia('61400000001', 'paid!', photo('a'));
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect(customer.paid).toBe(true);
  });
});

describe('when WhatsApp rejects the confirmation', () => {
  it('says so on the task instead of claiming it went', async () => {
    deliverOut.mockResolvedValue({ ok: false, error: 'outside the 24h window' });
    await handlePaymentProofMedia('61400000001', 'paid!', photo('a'));
    const task = addTask.mock.calls[0][0];
    expect(task.reason).toContain('PAID, BUT THEY HAVE NOT BEEN TOLD');
    expect(task.reason).toContain('outside the 24h window');
    expect(task.reason).not.toContain('worth a glance');
  });

  it('marks it urgent and attaches the message to send', async () => {
    // Somebody who paid and heard nothing is the most urgent thing on the
    // board, and the reply should be one click, not retyped.
    deliverOut.mockResolvedValue({ ok: false, error: 'rejected' });
    await handlePaymentProofMedia('61400000001', 'paid!', photo('a'));
    const task = addTask.mock.calls[0][0];
    expect(task.severity).toBe('URGENT');
    expect(task.suggestedReply).toBe(APPROVED.payment_received);
  });

  it('records the failure where it can be found', async () => {
    deliverOut.mockResolvedValue({ ok: false, error: 'rejected' });
    await handlePaymentProofMedia('61400000001', 'paid!', photo('a'));
    expect(audit.mock.calls.some((c) => c[1] === 'payment_received_send_failed')).toBe(true);
  });

  it('still moves them to Paid, because they did pay', async () => {
    // The money is real whether or not our message got through. Rolling the
    // state back would be the wrong correction.
    deliverOut.mockResolvedValue({ ok: false, error: 'rejected' });
    await handlePaymentProofMedia('61400000001', 'paid!', photo('a'));
    expect(setState.mock.calls.some((c) => c[1] === 'PAID')).toBe(true);
  });

  it('keeps the ordinary wording when the send succeeded', async () => {
    await handlePaymentProofMedia('61400000001', 'paid!', photo('a'));
    const task = addTask.mock.calls[0][0];
    expect(task.reason).toContain('Worth a glance');
    expect(task.severity).toBe('REVIEW');
    expect(task.suggestedReply).toBeNull();
  });
});
