/**
 * Scheduled follow-ups must remain approvable.
 *
 * The scheduler queues the 24h / 3d / 7d nudges as approved WhatsApp templates,
 * because it is deliberately messaging someone who has gone quiet and free-form
 * text is rejected outside Meta's customer-service window. The approval step in
 * /api/will/actions re-runs the Policy Guard before transmitting, and it used to
 * pass `isApprovedTemplate: false` regardless of what the draft actually was.
 *
 * That made every scheduled follow-up impossible to approve: the guard raised
 * OUTSIDE_24H_WINDOW_NEEDS_TEMPLATE (a follow-up is by definition outside the
 * window), marked the draft BLOCKED and opened a task.
 *
 * These tests pin both halves: the guard must still refuse this text as
 * free-form, and must still allow it as the template it really is.
 */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';
import { APPROVED } from '@/lib/will/approved-messages';

const THREE_DAYS_AGO = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

function ctx(over: Partial<GuardContext> = {}): GuardContext {
  return {
    state: 'PRICE_SENT',
    paid: false,
    aiPaused: false,
    killSwitch: false,
    optedOut: false,
    isLegacy: false,
    // Gone quiet: this is why a follow-up is being sent at all.
    lastCustomerMsgAt: THREE_DAYS_AGO,
    isApprovedTemplate: false,
    estimateFromTeam: null,
    ...over,
  };
}

// Every follow-up the scheduler can queue, with {{1}} already filled in the way
// the scheduler fills it before the guard ever sees the text.
const FOLLOW_UPS: [string, string][] = [
  ...Object.entries(APPROVED.followups_pre_payment),
  ...Object.entries(APPROVED.followups_form),
  ...Object.entries(APPROVED.followups_signature),
].map(([k, v]) => [k, v.replace(/\{\{1\}\}/g, 'Marco')] as [string, string]);

describe.each(FOLLOW_UPS)('follow-up %s', (_key, body) => {
  test('is refused as free-form text outside the 24h window', () => {
    const v = policyGuard(body, ctx({ isApprovedTemplate: false }));
    expect(v.allowed).toBe(false);
    expect(v.violations).toContain('OUTSIDE_24H_WINDOW_NEEDS_TEMPLATE');
  });

  test('is allowed when judged as the approved template it is sent as', () => {
    const v = policyGuard(body, ctx({ isApprovedTemplate: true }));
    expect(v.violations).toEqual([]);
    expect(v.allowed).toBe(true);
  });
});

describe('the day-3 pre-payment nudge specifically', () => {
  const body = APPROVED.followups_pre_payment.d3.replace(/\{\{1\}\}/g, 'Marco');

  // 4 Sep: the nudge no longer carries "we top up the difference". That was half
  // the guarantee (the refund half, without the owing half) in a message that is
  // not the price message, and Jo's rule is that the guarantee is stated once, in
  // full, where the customer is about to pay.
  test('does NOT paraphrase the guarantee, and is still clean as a template', () => {
    expect(body).not.toMatch(/top up the difference|refund the difference|less than the fee/i);
    // It does not trip REFUND_OR_CANCEL_PROMISE even as free-form, because the
    // sentence is in the approved corpus and is exempt at sentence level. The
    // window rule is the only thing standing between this draft and the
    // customer, which is exactly why the approval step has to know it is a
    // template.
    expect(policyGuard(body, ctx({ isApprovedTemplate: false })).violations)
      .toEqual(['OUTSIDE_24H_WINDOW_NEEDS_TEMPLATE']);
    expect(policyGuard(body, ctx({ isApprovedTemplate: true })).violations).toEqual([]);
  });
});
