/**
 * Full audit, 11 Oct 2026, decision 14: payment and bank logistics are Will's
 * to answer. Jo: the refund goes only to an active Australian bank account in
 * the customer's own name, never a family member's.
 */
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';
import { buildSystemPrompt } from '@/lib/will/playbook';
import { policyGuard } from '@/lib/will/policy-guard';

const ctx = { state: 'FORM_PENDING' as const, paid: true, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null };

it('the Library says no to a family account and yes to Wise in their own name', () => {
  const fam = KNOWLEDGE_SEED.find((k) => k.intent === "refund to a family member or friend's bank account")!;
  expect(fam.answer).toMatch(/own name/);
  expect(fam.answer).toMatch(/can't be paid to someone else's account/);
  expect(fam.answer).toMatch(/Wise Australian account in your name/);
  expect(policyGuard(fam.answer, ctx).allowed).toBe(true);
  const closed = KNOWLEDGE_SEED.find((k) => k.intent === 'Australian bank account is required')!;
  expect(closed.answer).not.toMatch(/can.t assist/i);
  expect(closed.answer).toMatch(/Wise Australian account/);
});

it('the playbook tells Will these are his to answer', () => {
  const { stable } = buildSystemPrompt({ name: 'X', state: 'PRICE_SENT', income: 'TFN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en' });
  expect(stable).toMatch(/PAYMENT AND BANK LOGISTICS ARE YOURS TO ANSWER/);
  expect(stable).toMatch(/never to a family member or friend/);
});
