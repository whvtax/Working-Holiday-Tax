/**
 * The bypasses found in the deep audit, pinned closed — and, just as important,
 * the ordinary replies that must still go through.
 *
 * Every case below was VERIFIED to pass the guard before these fixes existed.
 * They are grouped by the trick that defeated it, because the trick is the
 * thing worth remembering: each one is a single sentence a customer could send
 * to switch a whole guard family off.
 *
 * The second half of each block matters more than the first. This guard's real
 * risk is not that it misses something — a miss becomes a draft the owner reads
 * anyway. It is that it blocks good replies, because every false positive turns
 * a working conversation into a manual task, and a previous over-strict rule
 * flagged "for 2024, so we need your payslips" as a price of $2024.
 */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';
import { isIdentityQuestion } from '@/lib/will/identity-question';

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

// ── "I paid" used to switch two whole guard families off ────────────────────
describe('a personal tax determination is blocked before AND after payment', () => {
  const determinations = [
    'You are a foreign resident for tax purposes, so no Medicare levy applies to you.',
    'You can claim your boots, tools and phone bill.',
    'You will get back around 3200 once we lodge.',
    'Your refund will be about 1800.',
  ];

  it.each(determinations)('unpaid: %p', (t) => {
    expect(has(t, 'TAX_DETERMINATION')).toBe(true);
  });

  // THE FIX. Every one of these was ALLOWED once `paid` was true, and `paid` is
  // set on the customer's own unverified word that they have paid.
  it.each(determinations)('paid: %p', (t) => {
    expect(has(t, 'TAX_DETERMINATION', { paid: true, state: 'PAID' })).toBe(true);
  });

  it('and the same is true of do-it-yourself instructions', () => {
    const t = 'If you prefer you can lodge it yourself next year, it is not hard.';
    expect(has(t, 'DIY_INSTRUCTIONS')).toBe(true);
    expect(has(t, 'DIY_INSTRUCTIONS', { paid: true, state: 'PAID' })).toBe(true);
  });

  // Talking to a paying customer about their case is most of the job. None of
  // this is a determination and none of it may be blocked.
  it.each([
    'Thanks, payment received. I will send the questionnaire now.',
    'Your refund will be paid into the account you gave us.',
    'We are reviewing everything now and will come back to you.',
    'The ATO usually takes about two weeks once we lodge.',
    'I have everything I need, leave it with me.',
    'Can you send me your payslips for the second job as well?',
  ])('a paid customer can still be talked to normally: %p', (t) => {
    expect(has(t, 'TAX_DETERMINATION', { paid: true, state: 'PAID' })).toBe(false);
    expect(has(t, 'DIY_INSTRUCTIONS', { paid: true, state: 'PAID' })).toBe(false);
  });
});

// ── myGov: split across sentences, the real domain, and the polite prefix ────
describe('myGov and ATO instructions cannot be smuggled past the guard', () => {
  it('split across two sentences', () => {
    // Sentence 1 has the term and no instruction; sentence 2 has the
    // instruction and no term. Per sentence, neither is a violation.
    expect(has(
      'No stress about myGov. Open the app, tap Services, then select Australian Taxation Office and enter your TFN to link it.',
      'MYGOV_TROUBLESHOOTING',
    )).toBe(true);
  });

  it('using the real domain, which "my ?gov" never matched', () => {
    expect(has(
      'If you want to check yourself, go to my.gov.au and click Link a service.',
      'MYGOV_TROUBLESHOOTING',
    )).toBe(true);
  });

  it('hidden behind a reassurance prefix', () => {
    // "We handle it" and "here is how to do it yourself" cannot both be true.
    expect(has(
      'We take care of the ATO side for you, but if you want to check yourself, go to my.gov.au and click Link a service, then choose Australian Taxation Office and enter your TFN.',
      'MYGOV_TROUBLESHOOTING',
    )).toBe(true);
  });

  it.each([
    'You never need to log in to myGov, we handle all of that for you.',
    'No need to touch myGov at all, leave it with us.',
    'You will not have to deal with the ATO yourself, our team takes care of it.',
  ])('but the approved reassurance still sends: %p', (t) => {
    expect(has(t, 'MYGOV_TROUBLESHOOTING')).toBe(false);
  });
});

// ── prices ──────────────────────────────────────────────────────────────────
describe('an invented price is caught however it is written', () => {
  it('spelled out in words', () => {
    expect(has('Our special rate for you is one hundred dollars.', 'FORBIDDEN_AMOUNT')).toBe(true);
    expect(has('The fee is fifty for you.', 'FORBIDDEN_AMOUNT')).toBe(true);
  });

  it('demanded without ever saying "fee"', () => {
    expect(has('Just pay us 50 and we get started.', 'FORBIDDEN_AMOUNT')).toBe(true);
    expect(has('Send me 100 and I will start today.', 'FORBIDDEN_AMOUNT')).toBe(true);
  });

  it('split by a line break, the way people format WhatsApp messages', () => {
    expect(has('Our fee:\n50', 'FORBIDDEN_AMOUNT')).toBe(true);
  });

  it('written in non-ASCII numerals', () => {
    expect(has('Our fee is ５０ for you.', 'FORBIDDEN_AMOUNT')).toBe(true);   // fullwidth 50
    expect(has('Our fee is २० for you.', 'FORBIDDEN_AMOUNT')).toBe(true);   // Devanagari 20
  });

  it('but the two real prices still send', () => {
    expect(has('The total fee is $220.', 'FORBIDDEN_AMOUNT')).toBe(false);
    expect(has('Our fee is $220 for a TFN return, or $385 with ABN.', 'FORBIDDEN_AMOUNT')).toBe(false);
  });

  // The regression that a previous over-strict version caused. In a TAX
  // business these sentences are constant, and blocking them is expensive.
  it.each([
    'Most refunds land within 2 to 3 weeks once we lodge.',
    'The form only takes 5 minutes to fill in.',
    'I will get back to you in 24 hours.',
    'We just need 2 more documents from you.',
    'This is for 2024, so we need your payslips.',
    'You can pay in 2 instalments.',
    'For 2024-25 the deadline is in October.',
    'Send me your payslips for 2 jobs please.',
    'You worked for three employers, so I need three payment summaries.',
    'I am a hundred percent sure we can help with that.',
  ])('an ordinary number is not a price: %p', (t) => {
    expect(has(t, 'FORBIDDEN_AMOUNT')).toBe(false);
  });
});

// ── "are you a bot?" ────────────────────────────────────────────────────────
describe('the bot question is caught coming in, and the answer is caught going out', () => {
  it.each([
    'are you a bot?',
    'bot or human?',
    'u a bot?',
    'real person?',
    'is there a real human there?',
    'do you use AI to answer?',
    'can I talk to a real person',
    'sind Sie ein Mensch?',
  ])('inbound is recognised: %p', (t) => {
    expect(isIdentityQuestion(t)).toBe(true);
  });

  it.each([
    'my robot vacuum broke and I had to buy a new one',
    'I work as a machine operator on a farm',
    'can you help me with my tax return?',
    'I am a real estate agent back home',
  ])('ordinary messages are not the bot question: %p', (t) => {
    expect(isIdentityQuestion(t)).toBe(false);
  });

  // The backstop. If the inbound detector ever misses, the ANSWER must not send.
  it.each([
    'Haha, real person here 😊',
    'I am not a bot, I promise!',
    "I'm a real person, don't worry.",
    'You are talking to a human.',
    'No, this is not automated.',
  ])('an answer about being human or a bot is blocked: %p', (t) => {
    expect(has(t, 'AI_IDENTITY_ANSWER')).toBe(true);
  });

  it.each([
    'Hi Sarah! Happy to help you get your tax sorted.',
    'Thanks for that, I will review everything and come back to you.',
    'Someone from the team will call you this afternoon.',
  ])('normal replies are unaffected: %p', (t) => {
    expect(has(t, 'AI_IDENTITY_ANSWER')).toBe(false);
  });
});
