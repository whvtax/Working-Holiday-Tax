/**
 * 25 Sep, +49 1520 4261221: a deductions question and a choice arrived in one
 * message, and Will glued a whole Library answer on top of the whole price
 * message. Jo: "super long and unnecessary, must be shorter". When the bank
 * details go out, the only thing allowed around them is ONE short reassuring
 * line; anything more is REPLY_TOO_LONG, which triggers the price-aware
 * rewrite (approved price message + at most one line).
 */
import { policyGuard } from '@/lib/will/policy-guard';
import { APPROVED } from '@/lib/will/approved-messages';

const ctx = (paid: boolean) => ({
  state: paid ? 'FORM_PENDING' as const : 'PRICE_SENT' as const, paid, aiPaused: false, killSwitch: false,
  optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null,
});

const GLUED = "That's definitely something we can check for you.\n\nIt is one of the things we look at, so we'll need to review your full details before confirming what you're entitled to. Receipts can help, but there are other deductions and factors the team will review as part of the service, and we go through each one with you.\n\n" + APPROVED.price_tfn_abn;
const ONE_LINE = "Yes, that's definitely one of the many things we check before we lodge your tax return, so leave that with us. 😊\n\n" + APPROVED.price_tfn_abn;

it('the price message on its own is fine', () => {
  expect(policyGuard(APPROVED.price_tfn_abn, ctx(false)).allowed).toBe(true);
});

it('the price message with one reassuring line is fine', () => {
  expect(policyGuard(ONE_LINE, ctx(false)).allowed).toBe(true);
});

it('a Library answer glued on top of the price message is too long', () => {
  const v = policyGuard(GLUED, ctx(false));
  expect(v.violations).toContain('REPLY_TOO_LONG');
});

it('the same prose without the bank details is under the normal ceiling (the tighter one is only around the price)', () => {
  const proseOnly = GLUED.replace(APPROVED.price_tfn_abn, '').trim();
  expect(policyGuard(proseOnly, ctx(false)).violations).not.toContain('REPLY_TOO_LONG');
});
