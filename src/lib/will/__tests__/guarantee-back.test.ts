/**
 * 27 Sep (Jo): the refund-shortfall guarantee is back, "super important, it
 * gives the customer confidence". Exact wording, in the price messages, quietly
 * carrying the owing rule in its second sentence. The 3 Sep over-promise
 * ("never costs you more than your refund") stays retired.
 */
import { policyGuard } from '@/lib/will/policy-guard';
import { APPROVED } from '@/lib/will/approved-messages';
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';
import { stripBankBlock } from '@/lib/will/engine';

const G = "If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.";
const ctx = (paid: boolean) => ({
  state: paid ? 'FORM_PENDING' as const : 'PRICE_SENT' as const, paid, aiPaused: false, killSwitch: false,
  optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null,
});

it('the review-only price messages carry NO guarantee: the fee is for the review, whatever the result (Jo, 29 Sep, Holly)', () => {
  for (const m of [APPROVED.price_tfn_review, APPROVED.price_tfn_abn_review]) {
    expect(m).not.toMatch(/refund the difference/);
    expect(m).toMatch(/for the review itself and is the same whatever the result/);
    expect(m).toMatch(/Amount: \$(220|385)/);
    expect(policyGuard(m, ctx(false)).allowed).toBe(true);
  }
});

it('the two normal price messages carry the guarantee, the amount, and no account name line', () => {
  for (const m of [APPROVED.price_tfn, APPROVED.price_tfn_abn]) {
    expect(m).toContain(G);
    expect(m).toMatch(/Amount: \$(220|385)/);
    expect(m).not.toMatch(/Account Name/);
    expect(m).not.toMatch(/non-refundable|whatever the result/);
    expect(policyGuard(m, ctx(false)).allowed).toBe(true);
  }
  expect(APPROVED.price_tfn).toContain('$220');
  expect(APPROVED.price_tfn_abn).toContain('$385');
});

it('the opening stays short and does not carry it', () => {
  expect(APPROVED.opening).not.toMatch(/refund the difference/);
});

it('the objections that used to carry the fee line carry the guarantee and pass the guard', () => {
  const o = APPROVED.objections;
  for (const k of ['o1_refund_before_pay', 'o2_why_pay_first', 'o3_thought_free', 'o5_too_expensive', 'o6_pay_after_refund', 'o14_check_eligible_first'] as const) {
    expect(o[k]).toContain(G);
    expect(policyGuard(o[k], ctx(false)).allowed).toBe(true);
  }
  expect(o.o9_no_refund).toMatch(/refund the difference/);
  expect(policyGuard(o.o9_no_refund, ctx(false)).allowed).toBe(true);
});

it('the Library carries the guarantee where it used to carry the fee line', () => {
  const withIt = KNOWLEDGE_SEED.filter((k) => k.answer.includes(G));
  expect(withIt.length).toBeGreaterThanOrEqual(8);
  expect(JSON.stringify(KNOWLEDGE_SEED)).not.toMatch(/stays the same whatever the result/);
});

it('a repeat of the bank block takes the amount and the guarantee with it', () => {
  const out = stripBankBlock(APPROVED.price_tfn_abn);
  expect(out).not.toMatch(/385|BSB|refund the difference/);
});

it('the over-promise is still blocked, in a template too', () => {
  expect(policyGuard("So you're never out of pocket and can't lose.", { ...ctx(false), isApprovedTemplate: true }).allowed).toBe(false);
});
