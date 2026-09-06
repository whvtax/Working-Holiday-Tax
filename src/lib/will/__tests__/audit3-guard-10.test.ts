/**
 * audit3 guard[10] (5 Sep): "once we receive your payment, we'll get back to
 * you" is NOT a refund promise. REFUND_PROMISE's "payment ... back" alternative
 * was matching the 'back' of "get back to you" and turning the most natural
 * payment-moment reply into an URGENT task with no fallback. Money-back promises
 * in both word orders must still fire.
 */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';

function ctx(over: Partial<GuardContext> = {}): GuardContext {
  return {
    state: 'PRICE_SENT',
    paid: false,
    aiPaused: false,
    killSwitch: false,
    optedOut: false,
    isLegacy: false,
    lastCustomerMsgAt: new Date(),
    isApprovedTemplate: false,
    estimateFromTeam: null,
    ...over,
  };
}

const has = (text: string) =>
  policyGuard(text, ctx()).violations.includes('REFUND_OR_CANCEL_PROMISE');

describe('audit3 guard[10]: "payment ... back to you" is a return of contact, not money', () => {
  it('lets the natural payment-moment replies through', () => {
    for (const t of [
      "Once we receive your payment, we'll get back to you within 24 hours.",
      "Once we see your payment we'll get straight back to you with the form.",
      "We'll confirm the payment and come back to you with the form link.",
      "As soon as your payment lands we'll be back in touch with the next step.",
    ]) {
      expect([t, has(t)]).toEqual([t, false]);
    }
  });

  it('still blocks every real payment-refund promise', () => {
    for (const t of [
      'No worries, we will give your payment back.',
      'No problem, we will refund your payment right away.',
      'No worries, you get your money back.',
      'If you change your mind we will send back your payment.',
      'We can transfer back the payment tomorrow.',
      'We will pay back your payment in full.',
      'We will cancel the order for you.',
    ]) {
      expect([t, has(t)]).toEqual([t, true]);
    }
  });

  it('still allows the approved guarantee wording', () => {
    expect(has('If it is less than the fee, we refund you the difference.')).toBe(false);
  });
});
