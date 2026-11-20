/** Jo, 18 Nov (review): fullwidth letters, curly apostrophes and variation
 *  selectors must not get a forbidden phrase past the guard. */
import { policyGuard } from '@/lib/will/policy-guard';

const g = { state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() } as unknown as Parameters<typeof policyGuard>[1];

describe('unicode tricks do not get past the guard', () => {
  it('fullwidth "We will refund the fee" is blocked like the plain text', () => {
    expect(policyGuard('Ｗｅ ｗｉｌｌ ｒｅｆｕｎｄ ｔｈｅ ｆｅｅ.', g).allowed).toBe(false);
    expect(policyGuard('We will refund the fee.', g).allowed).toBe(false);
  });
  it('a variation selector inside "refund" does not hide it', () => {
    expect(policyGuard('We will re️fund the fee.', g).allowed).toBe(false);
  });
  it('a curly-apostrophe AI claim is blocked', () => {
    expect(policyGuard('I’m a robot, not a person.', g).allowed).toBe(false);
  });
});
