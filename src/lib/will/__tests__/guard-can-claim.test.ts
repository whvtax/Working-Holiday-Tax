/**
 * "you can claim" — the determination, and the description of the service.
 *
 * FOUND IN PRODUCTION, 27 Aug. The TAX_DETERMINATION rule was a bare
 * /you can (?:claim|deduct|write off)/ and it refused the first reply to every
 * new lead:
 *
 *     "We'll check your tax residency, what you can claim, Medicare, and make
 *      sure you're not missing anything you're entitled to."
 *
 * Nothing there determines anything about anyone — it says what the service
 * looks at. Worse, the approved corpus contains the same words twice, and they
 * only survived because a VERBATIM approved sentence is exempt from the content
 * patterns. The moment Will adapted the opening — which the playbook explicitly
 * tells it to do — the guard refused Will's own approved wording back at it,
 * and a human had to answer every new lead by hand.
 *
 * The rule itself is not in question and is not being weakened: Will must never
 * tell a customer what they personally can claim. What changed is the
 * grammatical distinction between the two readings, and BOTH directions are
 * pinned here — the false positive that was fixed, and every true positive that
 * must keep firing.
 */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';

const ctx = (over: Partial<GuardContext> = {}): GuardContext => ({
  state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false,
  optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
  isApprovedTemplate: false, estimateFromTeam: null, ...over,
});

const fires = (text: string) => policyGuard(text, ctx()).violations.includes('TAX_DETERMINATION');

// ── Must STILL be refused. A determination names the thing claimed. ─────────
describe('a determination is still blocked', () => {
  it.each([
    ['sentence-initial, the original case', 'You can claim your boots, tools and phone bill.'],
    ['after a comma', 'Yes, you can claim that.'],
    ['hedged', 'I think you can claim your travel costs.'],
    ['deduct', 'You can deduct your work boots.'],
    ['write off', 'You can write off your phone bill.'],
    ['mid-sentence, no relative marker', 'Based on your payslips you can claim the tool allowance.'],
    ['capitalised differently', 'YOU CAN CLAIM your uniform.'],
    ['inside a longer reply', 'Thanks for sending those. You can claim the laundry costs too.'],
  ])('%s', (_name, text) => {
    expect(fires(text)).toBe(true);
  });
});

// ── Must be ALLOWED. The service describes what it will look at. ───────────
describe('describing the service is allowed', () => {
  it('the exact production message that was wrongly refused', () => {
    const text = `Hey Quer! 😊

We help hundreds of backpackers every year get their Australian tax sorted properly.

We'll check your tax residency, what you can claim, Medicare, and make sure you're not missing anything you're entitled to.

Quick question first: did you only work on a TFN, or did you also earn income through an ABN?`;
    const v = policyGuard(text, ctx());
    expect(v.violations).toEqual([]);
    expect(v.allowed).toBe(true);
  });

  it.each([
    ['what', 'We will check what you can claim.'],
    ['any deductions', 'We will review any deductions you can claim.'],
    ['anything', 'We make sure you are not missing anything you can claim.'],
    ['everything', 'We look at everything you can claim.'],
    ['whether', 'We will check whether you can claim that.'],
    ['expenses', 'We go through the expenses you can claim.'],
    ['costs', 'We look at the costs you can claim.'],
    ['which', 'We work out which you can claim.'],
  ])('relative clause after %s', (_name, text) => {
    expect(fires(text)).toBe(false);
  });

  it('the approved corpus wording survives even when adapted', () => {
    // Both of these are in approved-messages.ts. Verbatim they were exempt
    // anyway; the point is that they no longer depend on being verbatim.
    expect(fires("We'll review your tax residency, Medicare situation and any deductions you can claim.")).toBe(false);
    expect(fires("It won't guide you on your tax residency, Medicare, or what you can claim.")).toBe(false);
  });
});

// ── The narrowing must not have opened anything else. ──────────────────────
describe('the rest of the tax-determination rule is untouched', () => {
  it.each([
    ["you're a foreign resident", 'You are a foreign resident, so no Medicare levy applies to you.'],
    ['refund prediction', 'Based on your payslips you should get around 3,800 back.'],
    ['medicare entitlement', 'You are entitled to the Medicare exemption for your whole stay.'],
    ['taxed as', "Your visa means you're taxed as a resident from day one."],
    ['your visa means', 'Your situation means you do not owe anything.'],
  ])('%s still blocked', (_name, text) => {
    expect(fires(text)).toBe(true);
  });
});
