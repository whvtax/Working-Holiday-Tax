/**
 * audit3 core 55, 5 Sep: a THROTTLED payment-confirmation send is not "sitting
 * in silence" for a person to fix by hand.
 *
 * deliverOut already does the right thing for a retryable (429/5xx) rejection:
 * it raises no task, on the documented assumption that "the caller
 * reschedules" (channel.ts). handlePaymentProofMediaInner never did — the
 * confirmation was recorded FAILED and nothing ever resent it or told anyone.
 * The fix parks it back as QUEUED and arms the existing AUTO_REPLY{messageId}
 * job the scheduler already runs for a delayed send, exactly like the
 * text-autopilot path re-arms on the same kind of failure.
 */
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const addMessage = jest.fn().mockResolvedValue({ id: 'm1' });
const addJob = jest.fn().mockResolvedValue({ id: 'j1' });
const setMessageStatus = jest.fn().mockResolvedValue(undefined);
const audit = jest.fn().mockResolvedValue(undefined);
const deliverOut = jest.fn().mockResolvedValue({ ok: true, messageId: 'm1' });

const customer: Record<string, unknown> = {
  id: 'c1', waId: '61400000001', name: 'Sam', state: 'PRICE_SENT',
  paid: false, optedOut: false, estimatedRefundCents: null, lang: null,
};

jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(() => Promise.resolve(customer)),
    getCustomerById: jest.fn().mockImplementation(() => Promise.resolve(customer)),
    setState: jest.fn().mockImplementation((_id: string, to: string) => {
      const changed = customer.state !== to;
      customer.state = to;
      if (to === 'PAID') customer.paid = true;
      return Promise.resolve(changed);
    }),
    addTask, addMessage, addJob, setMessageStatus, audit,
    getSetting: jest.fn().mockResolvedValue('FULL_AUTO'),
    setSetting: jest.fn().mockResolvedValue(undefined),
    updateCustomer: jest.fn().mockResolvedValue(undefined),
    listTemplates: jest.fn().mockResolvedValue([]),
    findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
    cancelJobsFor: jest.fn().mockResolvedValue(undefined),
    listJobsForCustomer: jest.fn().mockResolvedValue([]),
  }),
}));
jest.mock('@/lib/will/channel', () => ({
  // Mirrors the real deliverOut contract: a non-retryable rejection is
  // deliverOut's ONE task; a retryable one raises none at all and hands back
  // messageId so the caller can reschedule it.
  deliverOut: async (...a: unknown[]) => {
    const res = await deliverOut(...a) as { ok: boolean; error?: string; retryable?: boolean; messageId?: string };
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

const photo = (id: string) => ({
  media: { id, kind: 'image', mime: 'image/jpeg', caption: 'just paid it!' },
});

beforeEach(() => {
  addTask.mockClear(); addMessage.mockClear(); addJob.mockClear();
  setMessageStatus.mockClear(); audit.mockClear();
  deliverOut.mockClear().mockResolvedValue({ ok: true, messageId: 'm1' });
  customer.state = 'PRICE_SENT'; customer.paid = false; customer.optedOut = false;
});

// Jo, 25 Sep: the confirmation is no longer sent from this handler at all. It
// is parked QUEUED with an AUTO_REPLY{messageId} job from the start (the same
// mechanism this audit added for the throttled case), so the throttle path
// and the happy path are now the same path. What this file still pins: the
// row is QUEUED, a job exists for it, the stage moved, and nothing here
// raises a task for the send.
describe('the payment confirmation is queued, not sent on the spot', () => {
  it('parks the confirmation QUEUED and arms an AUTO_REPLY job on it', async () => {
    await handlePaymentProofMedia('61400000001', 'paid!', photo('a'));
    const queued = addMessage.mock.calls.find((c) => c[0].status === 'QUEUED' && c[0].meta?.paymentConfirmation === true);
    expect(queued).toBeTruthy();
    const job = addJob.mock.calls.find((c) => c[0].kind === 'AUTO_REPLY')?.[0];
    expect(job.payload.messageId).toBe('m1');
    expect(new Date(job.runAt).getTime() - Date.now()).toBeGreaterThanOrEqual(55_000);
    expect(deliverOut).not.toHaveBeenCalled();
  });

  it('raises no send task of its own (the scheduler does, if the send fails)', async () => {
    await handlePaymentProofMedia('61400000001', 'paid!', photo('a'));
    expect(addTask.mock.calls.some((c) => /NOT BEEN TOLD|send failed/i.test(c[0].reason))).toBe(false);
  });

  it('still moves them to Paid, because they did pay', async () => {
    await handlePaymentProofMedia('61400000001', 'paid!', photo('a'));
    expect(customer.paid).toBe(true);
    expect(customer.state).toBe('FORM_PENDING');
  });
});
