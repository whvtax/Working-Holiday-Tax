/**
 * 19 Oct fixes from the live-chat review (Jo: "fix what you can").
 *
 *  - Lisa Elliott: "1. $220" was read as $1.00 and refused.
 *  - Takumi Harada: four numbered questions got REPLY_TOO_LONG.
 *  - Takumi Harada: "there's no lodgment deadline" was sent as a promise.
 *  - Paige: a held draft for an unpaid lead said "Since you've paid" + form link.
 */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';
import { scrubUnpaidDraft } from '@/lib/will/engine';

function ctx(over: Partial<GuardContext> = {}): GuardContext {
  return {
    state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false,
    optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
    isApprovedTemplate: false, estimateFromTeam: null, ...over,
  };
}
const v = (text: string, over: Partial<GuardContext> = {}) => policyGuard(text, ctx(over)).violations;
const has = (text: string, code: string, over: Partial<GuardContext> = {}) =>
  v(text, over).some((x) => x === code || x.startsWith(code));

describe('list numbers are not amounts', () => {
  it('"1. $220" is not a $1.00 price', () => {
    const reply = '1. $220 is per tax return, so $220 for 2024-25 and $220 for 2025-26.';
    expect(has(reply, 'FORBIDDEN_AMOUNT:1.00')).toBe(false);
  });
  it('a real $1 amount is still caught', () => {
    expect(has('The fee is $1.', 'FORBIDDEN_AMOUNT')).toBe(true);
  });
});

describe('numbered questions earn a longer answer', () => {
  const questions = [
    '1. Can you assist with both the MES application and the return lodgment?',
    '2. What is the total cost for both services, including any additional fees?',
    '3. If my MES is not issued before the deadline, how would you handle it?',
    '4. If I engage your services now, what would my lodgment deadline be?',
  ].join('\n');
  const answer = [
    'Hi Takumi! Happy to help.',
    '',
    'Your IHI and Medicare Entitlement Statement are handled directly by Services Australia, so we cannot help with that part. The good news is that we can still go ahead with your tax return without it. It just means the Medicare levy stays on your return.',
    '',
    'Our service covers your full tax return: we review your tax residency, Medicare and deductions, then prepare and lodge your return, making sure you do not miss anything you are entitled to. The cost is $220 for TFN income only, or $385 if you also earned on an ABN.',
    '',
    'Quick one so I can point you to the right option: did you work for employers on a TFN only, or also on an ABN?',
  ].join('\n');

  it('four numbered questions allow the answer that was refused', () => {
    expect(has(answer, 'REPLY_TOO_LONG', { customerText: questions, customerTextChars: questions.length })).toBe(false);
  });
});

describe('no promise of "no deadline" or "lodge anytime"', () => {
  it('"there is no lodgment deadline" is refused', () => {
    expect(has("There's no lodgment deadline you need to worry about.", 'DEADLINE_CLAIM')).toBe(true);
  });
  it('"you can lodge your return anytime" is refused', () => {
    expect(has('You can lodge your 2025-26 return anytime.', 'DEADLINE_CLAIM')).toBe(true);
  });
  it('the Library answer about 15 May is fine', () => {
    expect(has('If you lodge through us, your deadline may be extended until 15 May.', 'DEADLINE_CLAIM')).toBe(false);
  });
});

describe('held drafts do not confirm a payment to an unpaid customer', () => {
  const paige = [
    'No problem at all, we can do everything from here, wherever you are.',
    '',
    "Since you've paid, please fill out this quick form so we can start reviewing your situation:",
    '',
    'https://workingholidaytax.com.au/tax-form',
    '',
    "Once you've submitted it, we'll go through everything and get back to you within 24 hours.",
  ].join('\n');

  it('the form link and paid wording are removed for an unpaid lead', () => {
    const out = scrubUnpaidDraft(paige, false);
    expect(out).toContain('wherever you are');
    expect(out).not.toMatch(/tax-form/);
    expect(out).not.toMatch(/since you've paid/i);
    expect(out).not.toMatch(/once you've submitted/i);
  });

  it('a paid customer keeps the draft exactly as written', () => {
    expect(scrubUnpaidDraft(paige, true)).toBe(paige);
  });
});
