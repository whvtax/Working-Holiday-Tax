/**
 * 1 Oct, Federica (+61 481): paid for one return, asked to lodge 2024-25 as
 * well, and "$220 for the 2024-25 year" plus the bank details was refused as
 * FORBIDDEN_AMOUNT because no price is allowed after payment. Another year is
 * a new sale: in that context the fixed prices and the price message are
 * allowed again.
 */
import { policyGuard } from '@/lib/will/policy-guard';
import { APPROVED } from '@/lib/will/approved-messages';
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';
import { buildSystemPrompt } from '@/lib/will/playbook';

const paid = { state: 'FORM_PENDING' as const, paid: true, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null };

it('the second-year price message passes after payment', () => {
  const t = 'Yes, exactly! $220 for the 2024-25 year.\n\n' + APPROVED.price_tfn;
  const v = policyGuard(t, paid);
  expect(v.violations.filter((x) => x.startsWith('FORBIDDEN_AMOUNT'))).toEqual([]);
  expect(v.violations).not.toContain('SALES_CONTENT_AFTER_PAYMENT');
  expect(v.allowed).toBe(true);
});

it('a bare price after payment with no other-year context is still refused', () => {
  expect(policyGuard('Our fee is $220.', paid).allowed).toBe(false);
});

it('the Library answers from the 1 Oct handoffs pass after payment', () => {
  for (const intent of ['can a Wise, Revolut or other digital bank account receive the refund', 'cannot or does not want to apply for the Medicare exemption', 'where to find the Medicare exemption form']) {
    const k = KNOWLEDGE_SEED.find((x) => x.intent === intent)!;
    expect(k).toBeDefined();
    expect(policyGuard(k.answer, paid).allowed).toBe(true);
  }
});

it('the playbook says another year is a new sale', () => {
  const { stable } = buildSystemPrompt({ name: 'F', state: 'FORM_PENDING', income: 'TFN', paid: true, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en' });
  expect(stable).toMatch(/A PAID CUSTOMER WHO WANTS ANOTHER YEAR IS A NEW SALE/);
});
