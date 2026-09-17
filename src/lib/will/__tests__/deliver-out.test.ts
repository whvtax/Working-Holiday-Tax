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
  listMessages: jest.fn().mockResolvedValue([]),
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
  store.listMessages.mockResolvedValue([]);
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
});

// Jo, 3 Sep: a chat Will has answered himself in Autopilot is dealt with, so
// it must not sit in bold on the list waiting for a look nobody needs to take.
// Only a chat Will could NOT answer (a task, nothing sent) stays unread.
describe('a successful send clears the unread marker, whoever wrote it', () => {
  it('an AI send marks the chat read', async () => {
    await deliverOut(customer(), 'hello', 'AI');
    expect(store.markCustomerRead).toHaveBeenCalledWith('c1');
  });

  it('a HUMAN send marks the chat read', async () => {
    await deliverOut(customer(), 'hello', 'HUMAN');
    expect(store.markCustomerRead).toHaveBeenCalledWith('c1');
  });

  it('a rejected send leaves the marker alone: the customer was not answered', async () => {
    // Real credentials from the settings row, and Meta answering with the
    // 24h-window rejection: the message is FAILED, the chat stays bold.
    store.getSetting.mockImplementation(async (key: string) =>
      key === 'wa_access_token' ? 'tok' : key === 'wa_phone_number_id' ? '123' : undefined);
    const realFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      ok: false, status: 400,
      json: async () => ({ error: { code: 131047, message: 'Re-engagement message' } }),
    }) as unknown as typeof fetch;
    try {
      const res = await deliverOut(customer(), 'hello', 'AI');
      expect(res.ok).toBe(false);
      expect(store.markCustomerRead).not.toHaveBeenCalled();
    } finally {
      global.fetch = realFetch;
    }
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

// (Jo, 17 Sep) The master duplicate guard: every AI-authored send passes
// through deliverOut, so checking here catches every way the same automatic
// message could go out twice — not just the individual retry paths that
// already check this before calling deliverOut. Real case: a customer's
// payment was detected twice, independently and both for the first time
// (once from her wording, once from her screenshot), each its own fresh call
// to deliverOut with no retry involved, so a retry-only guard would have
// missed it entirely.
describe('the master duplicate guard (deliverOut itself)', () => {
  it('skips a second identical AI send, reports ok:true, and never re-records it', async () => {
    store.listMessages.mockResolvedValue([
      { id: 'm0', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'SENT', body: 'Payment received! 🎉', createdAt: new Date().toISOString() },
    ]);
    const res = await deliverOut(customer(), 'Payment received! 🎉', 'AI');
    expect(res.ok).toBe(true);
    expect(store.addMessage).not.toHaveBeenCalled();
    expect(store.audit).toHaveBeenCalledWith(
      'channel', 'send_blocked_already_sent_verbatim', expect.objectContaining({ customerId: 'c1' }),
    );
  });

  it('does NOT skip a second identical HUMAN send — a person may want to repeat it on purpose', async () => {
    store.listMessages.mockResolvedValue([
      { id: 'm0', customerId: 'c1', direction: 'OUT', author: 'HUMAN', status: 'SENT', body: 'Same text', createdAt: new Date().toISOString() },
    ]);
    const res = await deliverOut(customer(), 'Same text', 'HUMAN');
    expect(res.ok).toBe(true);
    expect(store.addMessage).toHaveBeenCalled();
  });

  it('does not skip a genuinely different message', async () => {
    store.listMessages.mockResolvedValue([
      { id: 'm0', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'SENT', body: 'Payment received! 🎉', createdAt: new Date().toISOString() },
    ]);
    const res = await deliverOut(customer(), "Great, we've received your questionnaire! ✅", 'AI');
    expect(res.ok).toBe(true);
    expect(store.addMessage).toHaveBeenCalled();
  });
});
