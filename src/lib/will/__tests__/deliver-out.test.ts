/**
 * `deliverOut` is the single transmission point to a customer. Two properties
 * pinned here, both of which were real defects:
 *
 *  1. OPT-OUT IS ENFORCED AT THE TRANSMISSION POINT. Every caller is supposed to
 *     check `optedOut` first, and `handlePaymentProofMedia` did not. A guard in
 *     the one place everything funnels through means a future caller cannot
 *     repeat the mistake. It must RETURN (audited), never throw.
 *
 *  2. A BOOKKEEPING FAILURE AFTER A SUCCESSFUL SEND IS NOT A FAILED SEND. Once
 *     WhatsApp has accepted the message the customer HAS it. If the follow-up
 *     writes throw and that surfaces as a failure, the operator sends again and
 *     the customer receives the same message twice.
 */
const store = {
  addMessage: jest.fn(),
  setMessageStatus: jest.fn(),
  attachProviderId: jest.fn(),
  markCustomerRead: jest.fn(),
  audit: jest.fn(),
  addTask: jest.fn(),
  getSetting: jest.fn().mockResolvedValue(undefined),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

import { deliverOut } from '@/lib/will/channel';
import type { CustomerRow } from '@/lib/will/store';

const customer = (over: Partial<CustomerRow> = {}) => ({
  id: 'c1', waId: '61400000001', name: 'Alex', optedOut: false, lang: null, ...over,
} as CustomerRow);

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  store.addMessage.mockResolvedValue({ id: 'm1' });
  store.setMessageStatus.mockResolvedValue(undefined);
  store.attachProviderId.mockResolvedValue(undefined);
  store.markCustomerRead.mockResolvedValue(undefined);
  store.audit.mockResolvedValue(undefined);
  store.addTask.mockResolvedValue({ id: 't1' });
  store.getSetting.mockResolvedValue(undefined);
  // No credentials in the test env, so postMessage returns { ok: true, skipped: true }
  delete process.env.WHATSAPP_TOKEN;
  delete process.env.WHATSAPP_PHONE_NUMBER_ID;
});

describe('opt-out guard', () => {
  it('refuses to transmit to an opted-out customer, and records nothing as sent', async () => {
    const res = await deliverOut(customer({ optedOut: true }), 'hello again', 'AI');
    expect(res.ok).toBe(false);
    // Critically: no message row at all. A blocked send must not appear in the
    // customer's thread as something we tried to say to them.
    expect(store.addMessage).not.toHaveBeenCalled();
  });

  it('audits the block rather than failing silently', async () => {
    await deliverOut(customer({ optedOut: true }), 'hello again', 'AI');
    expect(store.audit).toHaveBeenCalledWith(
      'channel', 'send_blocked_opted_out', expect.objectContaining({ customerId: 'c1' }),
    );
  });

  it('returns instead of throwing, so a caller that forgot to check cannot crash', async () => {
    await expect(deliverOut(customer({ optedOut: true }), 'x', 'HUMAN')).resolves.toBeDefined();
  });

  it('still delivers normally to a customer who has not opted out', async () => {
    const res = await deliverOut(customer(), 'hello', 'AI');
    expect(res.ok).toBe(true);
    expect(store.addMessage).toHaveBeenCalledTimes(1);
  });
});

describe('a write failure after a successful send is not reported as a failed send', () => {
  it('setMessageStatus throwing still returns ok:true', async () => {
    store.setMessageStatus.mockRejectedValue(new Error('db unreachable'));
    const res = await deliverOut(customer(), 'hello', 'AI');
    expect(res.ok).toBe(true);
    expect(res.error).toBeUndefined();
  });

  it('markCustomerRead throwing on a HUMAN send still returns ok:true', async () => {
    store.markCustomerRead.mockRejectedValue(new Error('db unreachable'));
    const res = await deliverOut(customer(), 'hello', 'HUMAN');
    expect(res.ok).toBe(true);
  });

  it('audits the bookkeeping failure, so a delivered-but-unrecorded message is visible', async () => {
    store.setMessageStatus.mockRejectedValue(new Error('db unreachable'));
    await deliverOut(customer(), 'hello', 'AI');
    expect(store.audit).toHaveBeenCalledWith(
      'channel', 'send_bookkeeping_failed', expect.objectContaining({ customerId: 'c1', messageId: 'm1' }),
    );
  });

  it('does NOT raise a "send failed" task for a message the customer actually received', async () => {
    store.setMessageStatus.mockRejectedValue(new Error('db unreachable'));
    await deliverOut(customer(), 'hello', 'AI');
    // A task here is what makes the operator send it a second time.
    expect(store.addTask).not.toHaveBeenCalled();
  });
});
