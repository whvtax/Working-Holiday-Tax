/** Jo, 25 Sep (+44 7592): the Medicare exemption script went out glued to the
 *  price message, before payment, to a UK lead. Before payment it is advice. */
import { policyGuard } from '@/lib/will/policy-guard';
import { APPROVED } from '@/lib/will/approved-messages';

const ctx = (paid: boolean) => ({
  state: paid ? 'FORM_PENDING' as const : 'PRICE_SENT' as const, paid, aiPaused: false, killSwitch: false,
  optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null,
});

it('the exemption script before payment is a determination', () => {
  const text = `${APPROVED.price_tfn}\n\n${APPROVED.medicare_exemption}`;
  expect(policyGuard(text, ctx(false)).violations).toContain('PRE_PAYMENT_MEDICARE_SCRIPT');
  expect(policyGuard("You may be eligible to apply for a Medicare Levy Exemption through Services Australia.", ctx(false)).violations).toContain('PRE_PAYMENT_MEDICARE_SCRIPT');
});
it('the reassuring line before payment is fine', () => {
  const v = policyGuard(`${APPROVED.price_tfn}\n\nMedicare is one of the things our team checks and handles as part of the review, so leave that with us.`, ctx(false));
  expect(v.violations).not.toContain('PRE_PAYMENT_MEDICARE_SCRIPT');
});
it('after payment the script is allowed (the MEDICARE_INFO job sends it as a template)', () => {
  expect(policyGuard(APPROVED.medicare_exemption, { ...ctx(true), isApprovedTemplate: true }).violations).not.toContain('PRE_PAYMENT_MEDICARE_SCRIPT');
});
