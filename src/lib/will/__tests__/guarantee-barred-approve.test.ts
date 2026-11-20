/**
 * 18 Nov 2026, audit 3 (F2): the guarantee is barred for ABN, foreign income
 * and lodged returns on every send path, not only in the engine.
 */
import { guaranteeBarredFor } from '@/lib/will/guarantee-barred';
import { policyGuard } from '@/lib/will/policy-guard';

const GUARANTEE = "If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.";
const ctx = { state: 'PRICE_SENT' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null };

describe('guaranteeBarredFor', () => {
  it('is false for a plain TFN customer', () => {
    expect(guaranteeBarredFor(['TFN please'])).toBe(false);
  });
  it('is true once an ABN is mentioned', () => {
    expect(guaranteeBarredFor(['TFN please', 'I also have an ABN and do some Uber Eats work'])).toBe(true);
  });
});

describe('the guard uses the barred flag from the conversation', () => {
  it('blocks the guarantee when the customer is barred', () => {
    expect(policyGuard(GUARANTEE, { ...ctx, guaranteeBarred: true }).violations).toContain('GUARANTEE_NOT_ALLOWED');
  });
  it('allows the same sentence for a TFN-only customer', () => {
    expect(policyGuard(GUARANTEE, { ...ctx, guaranteeBarred: false }).violations).not.toContain('GUARANTEE_NOT_ALLOWED');
  });
});
