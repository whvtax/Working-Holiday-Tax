/**
 * Jo, 1 Nov: after payment Will answers expense questions from the ATO rules.
 * Only the two English "claim" patterns relax, and only for a paid customer.
 * Everything else stays blocked at every stage.
 */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';

const ctx = (over: Partial<GuardContext> = {}): GuardContext => ({
  state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false,
  optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
  isApprovedTemplate: false, estimateFromTeam: null, ...over,
});
const det = (text: string, over: Partial<GuardContext> = {}) =>
  policyGuard(text, ctx(over)).violations.includes('TAX_DETERMINATION');
const PAID = { paid: true, state: 'FORM_SUBMITTED' as GuardContext['state'] };

describe('paid customer: ATO-rule answers about claims', () => {
  it.each([
    'Yes, you can claim the fee for preparing your return, in the year you paid it.',
    'Your tax agent fee is deductible in the income year you pay it.',
  ])('is allowed after payment: %s', (t) => { expect(det(t, PAID)).toBe(false) })

  it.each([
    'Yes, you can claim the fee for preparing your return, in the year you paid it.',
    'Your tax agent fee is deductible in the income year you pay it.',
    'You can claim your boots, tools and phone bill.',
  ])('is still blocked before payment: %s', (t) => { expect(det(t)).toBe(true) })
})

describe('paid customer: everything else is still a determination', () => {
  it.each([
    'You are a foreign resident, so no Medicare levy applies to you.',
    'You do not need to pay the Medicare levy.',
    'You will definitely get a refund of about the same.',
  ])('still blocked after payment: %s', (t) => { expect(det(t, PAID)).toBe(true) })
})
