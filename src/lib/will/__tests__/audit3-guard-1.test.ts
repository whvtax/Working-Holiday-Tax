/**
 * Audit 3 (5 Sep), guard finding 1: ordinary refund-process lines were read as
 * tax determinations.
 *
 * "Your refund will be paid into the account" had a carve-out, but "you'll get
 * your refund straight into your bank account" (the playbook's mandated myGov
 * reassurance), "Your refund will usually land within 14 business days" and
 * "You should receive the email from Xero" did not. Before payment the engine
 * swapped those for objection #7; after payment every one became an URGENT
 * task. None of them names a figure, a hedge or a promise.
 *
 * The second block matters as much as the first: every predictive sentence the
 * older tests pin must still fire.
 */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';

function ctx(over: Partial<GuardContext> = {}): GuardContext {
  return {
    state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false,
    optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
    isApprovedTemplate: false, estimateFromTeam: null, ...over,
  };
}
const has = (text: string, code: string, over: Partial<GuardContext> = {}) =>
  policyGuard(text, ctx(over)).violations.some((x) => x === code || x.startsWith(code));

describe('refund process wording is not a determination', () => {
  const process = [
    "Once you're our client we deal with the ATO directly and you'll get your refund straight into your bank account.",
    "You'll get your refund within 14 business days once it's lodged.",
    'Your refund will be in your account within about two weeks.',
    'Your refund will usually land within 14 business days.',
    'Your refund should be with you in about two weeks.',
    'Your refund will be paid into the account you gave us.',
    'You should receive the email from Xero in the next few minutes.',
    'You should get the return to sign by email today.',
    'You will receive your refund directly from the ATO once it is processed.',
  ];

  it.each(process)('unpaid: %p', (t) => {
    expect(has(t, 'TAX_DETERMINATION')).toBe(false);
  });

  it.each(process)('paid: %p', (t) => {
    expect(has(t, 'TAX_DETERMINATION', { paid: true, state: 'PAID' })).toBe(false);
  });
});

describe('a prediction, a hedge or a promise still fires', () => {
  it.each([
    'Based on your payslips you should get around 3,800 back.',
    'You will definitely get a refund.',
    'You will definitely get your refund within two weeks.',
    "You'll get a refund, no question.",
    'You should get a refund this year.',
    'You should expect a refund.',
    'You should receive about 1450 back.',
    'Your refund will be around 1800.',
    'Your refund will be about 1800.',
    'Your refund will be around a thousand dollars.',
    'Your refund should come to about 1450 give or take.',
    "You'll get back roughly 2300 this year.",
    'You will get back around 3200 once we lodge.',
    "Whether you'll get a refund depends on your situation.",
  ])('%p', (t) => {
    expect(has(t, 'TAX_DETERMINATION')).toBe(true);
    expect(has(t, 'TAX_DETERMINATION', { paid: true, state: 'PAID' })).toBe(true);
  });
});
