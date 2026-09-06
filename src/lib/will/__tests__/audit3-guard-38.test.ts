/**
 * audit3 / guard #38: small counts and the word "one" are not invented prices.
 *
 * Verified against the real guard before the fix: every "still sends" line
 * below came back as FORBIDDEN_AMOUNT (2.00 / 1.00 / 5.00 / written-in-words)
 * in a reply that was asking for documents or restating the fixed fee. Each one
 * became an URGENT task with no fallback.
 */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';

function ctx(over: Partial<GuardContext> = {}): GuardContext {
  return {
    state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false,
    optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
    isApprovedTemplate: false, estimateFromTeam: null, ...over,
  };
}
const amount = (text: string) =>
  policyGuard(text, ctx()).violations.filter((x) => x.startsWith('FORBIDDEN_AMOUNT'));

describe('a count of documents after send/pay/total is not a price', () => {
  it.each([
    'Could you send me 2 things: your last payslip and a photo of your passport?',
    'Just send us 1 screenshot of the transfer.',
    'In total we need 2 more documents.',
    'So a total of 5 payslips, thanks.',
    'Please send me 3 photos of your payment summaries.',
    'Send us 2 copies of the form please.',
  ])('still sends: %p', (t) => {
    expect(amount(t)).toEqual([]);
  });

  it.each([
    'Just pay us 50 and we get started.',
    'Send me 100 and I will start today.',
    'In total that is 50 for you.',
    'Our fee is 50, nothing more.',
  ])('a bare number with no count noun still fires: %p', (t) => {
    expect(amount(t).length).toBeGreaterThan(0);
  });
});

describe('"one" next to fee/price/cost is the article, not a number', () => {
  it.each([
    'The fee is a one-off payment, nothing else after that.',
    'The price covers one full tax return.',
    'The cost is the same for one job or three.',
    'The fee covers two returns if you had two jobs.',
  ])('still sends: %p', (t) => {
    expect(amount(t)).toEqual([]);
  });

  it.each([
    'The fee is fifty for you.',
    'The fee is one hundred for you.',
    'The price is one fifty, all in.',
    'Our special rate for you is one hundred dollars.',
  ])('a real spelled-out price still fires: %p', (t) => {
    expect(amount(t)).toContain('FORBIDDEN_AMOUNT:written-in-words');
  });
});
