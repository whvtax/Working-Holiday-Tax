/**
 * audit3 guard[37]: the negated "lodge it yourself" is a reassurance, and an
 * approved objection with an adapted opening is still the approved objection.
 *
 * DIY_INSTRUCTIONS had no negation guard, so "You don't have to lodge it
 * yourself, we do all of that for you" was refused as a do-it-yourself
 * instruction. And the playbook tells the model to adapt the OPENING of the
 * chosen objection, which on objection #4 is the sentence carrying the trigger
 * ("Yes, absolutely, you can lodge your tax return yourself through myGov"),
 * so following the playbook produced an URGENT task with no fallback. Both
 * directions are pinned: the reassurance and the adapted opening go through,
 * the real instruction and anything smuggled into the opening still do not.
 */
import { policyGuard, GuardContext, registerLibraryBodies } from '@/lib/will/policy-guard';
import { APPROVED } from '@/lib/will/approved-messages';

const ctx = (over: Partial<GuardContext> = {}): GuardContext => ({
  state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false,
  optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
  isApprovedTemplate: false, estimateFromTeam: null, ...over,
});
const v = (text: string, over: Partial<GuardContext> = {}) => policyGuard(text, ctx(over)).violations;
const has = (text: string, code: string, over: Partial<GuardContext> = {}) =>
  v(text, over).some((x) => x === code || x.startsWith(code));

describe('negated do-it-yourself is a reassurance, not an instruction', () => {
  it.each([
    "You don't have to lodge it yourself, we do all of that for you.",
    "You don't need to do it yourself, that's what we're here for.",
    'You do not have to lodge your tax return yourself, the team lodges it.',
    'No need to do it yourself, we take care of it.',
    "You won't have to lodge it on your own, we handle the lodgement.",
    'We lodge it for you rather than you doing it yourself.',
    'We lodge it for you instead of you lodging it yourself.',
    'You never have to lodge it yourself with us.',
  ])('%p', (t) => {
    expect(has(t, 'DIY_INSTRUCTIONS')).toBe(false);
    expect(has(t, 'DIY_INSTRUCTIONS', { paid: true, state: 'PAID' })).toBe(false);
  });

  it.each([
    'If you prefer you can lodge it yourself next year, it is not hard.',
    'You can do it yourself on myGov if you like.',
    'Just lodge your tax return yourself through myGov.',
    'Here is a step by step guide to lodging it.',
  ])('the positive still fires: %p', (t) => {
    expect(has(t, 'DIY_INSTRUCTIONS')).toBe(true);
  });
});

describe('an approved objection with an adapted opening is still approved', () => {
  const o4 = APPROVED.objections.o4_mygov;
  const o4Rest = o4.replace(/^Yes, absolutely, /, '');
  const o9Rest = APPROVED.objections.o9_no_refund.replace(/^No problem\. /, '');

  it('verbatim o4 passes (control)', () => {
    expect(v(o4)).toEqual([]);
  });

  it.each([
    ['name after yes', `Yes Sarah, ${o4Rest}`],
    ['name and exclamation', `Yes Marco! ${o4Rest}`],
    ['of course', `Of course, ${o4Rest}`],
    ['no acknowledgement at all', o4Rest.charAt(0).toUpperCase() + o4Rest.slice(1)],
    ['sure with name', `Sure Anna, ${o4Rest}`],
  ])('o4, %s', (_label, t) => {
    expect(has(t, 'DIY_INSTRUCTIONS')).toBe(false);
    expect(has(t, 'REPLY_TOO_LONG')).toBe(false);
  });

  it('o9 worked example with a name in front keeps its figures', () => {
    const t = `No worries Sarah, ${o9Rest}`;
    expect(has(t, 'FORBIDDEN_AMOUNT')).toBe(false);
    expect(has(t, 'REFUND_OR_CANCEL_PROMISE')).toBe(false);
  });

  it('o1/o2 "we refund you the difference" with a name in front', () => {
    const o2 = APPROVED.objections.o2_why_pay_first;
    const t = o2.replace(/^I completely understand\./, 'Yes Lucas, I completely understand.');
    expect(has(t, 'REFUND_OR_CANCEL_PROMISE')).toBe(false);
  });

  it('the opening itself is still checked: a determination in front is refused', () => {
    expect(has(`Yes you are a resident, ${o4Rest}`, 'TAX_DETERMINATION')).toBe(true);
    expect(has(`Yes $150 refund, ${o4Rest}`, 'FORBIDDEN_AMOUNT')).toBe(true);
  });

  it('a rewritten body is not exempt, only the opening may change', () => {
    expect(has('Yes Sarah, you can lodge it yourself through myGov if you want.', 'DIY_INSTRUCTIONS')).toBe(true);
  });

  it('the post-payment sales gate still applies to an adapted approved sentence', () => {
    const t = `Yes Lucas, ${o9Rest}`;
    expect(has(t, 'SALES_CONTENT_AFTER_PAYMENT', { paid: true, state: 'PAID' })).toBe(true);
  });

  it('works for the live Library wording too', () => {
    registerLibraryBodies(['If you prefer you can lodge it yourself next year, it is not hard.']);
    try {
      expect(has('Yes Sarah, if you prefer you can lodge it yourself next year, it is not hard.', 'DIY_INSTRUCTIONS')).toBe(false);
    } finally {
      registerLibraryBodies([]);
    }
  });
});
