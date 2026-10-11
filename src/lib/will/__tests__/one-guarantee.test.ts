/**
 * Full audit, 11 Oct 2026, decision 5: one guarantee, one wording, the rule.
 * "If your tax refund is less than our fee, we'll refund the difference. If
 * there's no refund, our full fee applies."
 */
import { policyGuard } from '@/lib/will/policy-guard';
import { APPROVED } from '@/lib/will/approved-messages';
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';
import { readFileSync } from 'fs';
import { join } from 'path';

const pre = { state: 'PRICE_SENT' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null };
const post = { ...pre, state: 'FORM_PENDING' as const, paid: true };
const RULE = "If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.";

describe('"non-refundable" before payment', () => {
  it.each([
    'The fee is non-refundable, as the work is the same.',
    'Please note the $220 is not refundable.',
    'Die Gebühr ist nicht erstattbar.',
    '料金は返金不可です。',
    'La tarifa no es reembolsable.',
  ])('is refused: %s', (t) => {
    expect(policyGuard(t, pre).violations).toContain('NON_REFUNDABLE_WORDING');
  });
  it('is allowed after payment, to a direct question', () => {
    expect(policyGuard('As the work is done, the fee is non-refundable at this stage.', post).violations).not.toContain('NON_REFUNDABLE_WORDING');
  });
  it('the rule wording itself is clean', () => {
    expect(policyGuard(RULE, pre).allowed).toBe(true);
  });
});

describe('every approved pre-payment text carries the rule, nothing else', () => {
  it('price messages and objections', () => {
    for (const t of [APPROVED.price_tfn, APPROVED.price_tfn_abn, APPROVED.objections.o1_refund_before_pay, APPROVED.objections.o2_why_pay_first, APPROVED.objections.o5_too_expensive, APPROVED.objections.o6_pay_after_refund]) {
      expect(t).toContain(RULE);
      expect(t).not.toMatch(/non[- ]?refundable|no risk|never out of pocket|full refund/i);
    }
    // The review of an already-lodged return has no guarantee (Jo, 29 Sep).
    expect(APPROVED.price_tfn_review).not.toMatch(/refund the difference/);
    expect(APPROVED.price_tfn_review).not.toMatch(/non[- ]?refundable/i);
  });
  it('the Library answer for "what if I owe" is the rule plus the example', () => {
    const e = KNOWLEDGE_SEED.find((k) => k.intent === 'tax payable instead of a refund')!;
    expect(e.answer).toContain(RULE);
    expect(e.answer).toMatch(/For example/);
    expect(e.answer).not.toMatch(/non[- ]?refundable/i);
    expect(policyGuard(e.answer, pre).allowed).toBe(true);
  });
  it('no seeded answer calls the fee non-refundable', () => {
    for (const k of KNOWLEDGE_SEED) expect(k.answer).not.toMatch(/non[- ]?refundable|not refundable/i);
  });
});

describe('the CRM warns the team before a different wording goes out', () => {
  const src = readFileSync(join(__dirname, '..', '..', '..', 'components', 'will', 'Dashboard.tsx'), 'utf8');
  it('sendManual checks the text against the variants and shows the rule', () => {
    expect(src).toMatch(/GUARANTEE_VARIANT_RE\.test\(text\)/);
    expect(src).toContain(`const GUARANTEE_LINE = "${RULE}"`);
    expect(src).toMatch(/window\.confirm\(/);
  });
  it('the variants cover what the team actually typed', () => {
    const m = src.match(/const GUARANTEE_VARIANT_RE = (\/.*\/i);/);
    expect(m).toBeTruthy();
    const re = eval(m![1]) as RegExp;
    for (const t of ['the full $220 would be refunded to you, so there\'s no risk', 'we will provide a proportional refund', 'We no longer offer this promotion', 'the fee is non-refundable', "we've since changed our pricing model"]) {
      expect(re.test(t)).toBe(true);
    }
    expect(re.test(RULE)).toBe(false);
    expect(re.test('Payment received, here is the form.')).toBe(false);
  });
});
