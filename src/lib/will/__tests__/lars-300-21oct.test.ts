/**
 * 21 Oct: Lars (paid, TFN + ABN). The reply asked about work spending under $300
 * and bank statements. The guard refused it as FORBIDDEN_AMOUNT:300.00 because
 * "bank statements" was not one of the record-keeping words that exempt the
 * $300 substantiation threshold. A paid customer asking for statements must pass.
 */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';

function ctx(over: Partial<GuardContext> = {}): GuardContext {
  return {
    state: 'FORM_COMPLETE', paid: true, aiPaused: false, killSwitch: false,
    optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
    isApprovedTemplate: false, estimateFromTeam: null, ...over,
  };
}
const violations = (text: string, over: Partial<GuardContext> = {}) =>
  policyGuard(text, ctx(over)).violations;

describe('the $300 threshold in a bank-statement question (paid customer)', () => {
  it('Lars\' question passes', () => {
    const reply = 'Thanks! Now for the ABN work: what did you spend on the under $300 (tools and clothes), and do you have the bank statements showing those payments?';
    expect(violations(reply).some((v) => v.startsWith('FORBIDDEN_AMOUNT'))).toBe(false);
  });

  it('a refund of $300 is still blocked, even next to statements', () => {
    const reply = 'Your refund is $300, and you can check the bank statements to confirm it.';
    expect(violations(reply).some((v) => v.startsWith('FORBIDDEN_AMOUNT'))).toBe(true);
  });
});
