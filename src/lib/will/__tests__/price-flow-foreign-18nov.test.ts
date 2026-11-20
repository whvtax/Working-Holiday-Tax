/** Jo, 18 Nov (template review 19): customers with foreign income get the two-message flow too. */
import fs from 'fs';
import path from 'path';
import { PRICE_FLOW_STEPS_TFN_FOREIGN, PRICE_FLOW_STEPS_TFN_ABN_FOREIGN, priceFlowAmountFrom, priceFlowPaymentDetails, PRICE_FLOW_QUESTION_RE } from '@/lib/will/price-flow-variant';
import { policyGuard } from '@/lib/will/policy-guard';

const ctx = { state: 'QUALIFIED' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null };

it('the two step messages are Jo\'s, carry no guarantee, and end on the question', () => {
  for (const m of [PRICE_FLOW_STEPS_TFN_FOREIGN, PRICE_FLOW_STEPS_TFN_ABN_FOREIGN]) {
    expect(m).toMatch(/with foreign income! Here's how it works:/);
    expect(m).not.toMatch(/refund the difference|less than our fee/i);
    expect(PRICE_FLOW_QUESTION_RE.test(m)).toBe(true);
  }
  expect(PRICE_FLOW_STEPS_TFN_FOREIGN).toContain('1. Pay $330.');
  expect(PRICE_FLOW_STEPS_TFN_ABN_FOREIGN).toContain('1. Pay $495.');
});

it('the "yes" brings the payment details with the right amount', () => {
  expect(priceFlowAmountFrom(PRICE_FLOW_STEPS_TFN_FOREIGN)).toBe(330);
  expect(priceFlowAmountFrom(PRICE_FLOW_STEPS_TFN_ABN_FOREIGN)).toBe(495);
  expect(priceFlowPaymentDetails(495)).toContain('Amount: $495');
});

it('the guard lets both through', () => {
  for (const m of [PRICE_FLOW_STEPS_TFN_FOREIGN, PRICE_FLOW_STEPS_TFN_ABN_FOREIGN, priceFlowPaymentDetails(330), priceFlowPaymentDetails(495)]) {
    expect(policyGuard(m, ctx).violations).toEqual([]);
  }
});

it('the service no longer keeps foreign income out of the new flow', () => {
  const s = fs.readFileSync(path.join(__dirname, '..', 'service.ts'), 'utf8');
  // 18 Nov (decision 018): every language now, not only English.
  expect(s).toMatch(/const newFlow = !checkedReason && priceFlowVariantFor\(customer\.id, flowSetting\) === 'new'/);
  expect(s).toContain('priceFlowSteps(track, foreign, customer.lang)');
  const v = fs.readFileSync(path.join(__dirname, '..', 'price-flow-variant.ts'), 'utf8');
  expect(v).toMatch(/foreign \? \(track === 'TFN_ABN' \? 'TFN_ABN_FOREIGN' : 'TFN_FOREIGN'\) : track/);
});
