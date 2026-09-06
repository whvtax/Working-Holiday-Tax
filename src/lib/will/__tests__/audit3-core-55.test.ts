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

describe('a throttled payment confirmation', () => {
  it('raises no task at all (deliverOut already refuses one for a retryable send)', async () => {
    deliverOut.mockResolvedValue({ ok: false, error: '429 too many requests', retryable: true, messageId: 'm1' });
    await handlePaymentProofMedia('61400000001', 'paid!', photo('a'));
    expect(addTask).not.toHaveBeenCalled();
  });

  it('is parked back as QUEUED instead of left FAILED with nothing to retry it', async () => {
    deliverOut.mockResolvedValue({ ok: false, error: '429 too many requests', retryable: true, messageId: 'm1' });
    await handlePaymentProofMedia('61400000001', 'paid!', photo('a'));
    expect(setMessageStatus).toHaveBeenCalledWith('m1', 'QUEUED', { restamp: true });
  });

  it('arms an AUTO_REPLY job on that message so the scheduler resends it', async () => {
    deliverOut.mockResolvedValue({ ok: false, error: '429 too many requests', retryable: true, messageId: 'm1' });
    await handlePaymentProofMedia('61400000001', 'paid!', photo('a'));
    const job = addJob.mock.calls.find((c) => c[0].kind === 'AUTO_REPLY');
    expect(job).toBeDefined();
    expect(job![0].payload).toEqual({ messageId: 'm1' });
    expect(job![0].customerId).toBe('c1');
  });

  it('still moves them to Paid, because they did pay', async () => {
    deliverOut.mockResolvedValue({ ok: false, error: '429 too many requests', retryable: true, messageId: 'm1' });
    await handlePaymentProofMedia('61400000001', 'paid!', photo('a'));
    expect(customer.paid).toBe(true);
  });

  it('a non-retryable rejection still gets its one URGENT task, unchanged', async () => {
    deliverOut.mockResolvedValue({ ok: false, error: 'rejected', messageId: 'm1' });
    await handlePaymentProofMedia('61400000001', 'paid!', photo('a'));
    expect(addTask).toHaveBeenCalledTimes(1);
    expect(addTask.mock.calls[0][0].severity).toBe('URGENT');
    expect(addJob.mock.calls.some((c) => c[0].kind === 'AUTO_REPLY')).toBe(false);
  });
});
