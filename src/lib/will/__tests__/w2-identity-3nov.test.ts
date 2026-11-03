/**
 * Wave 2, 3 Nov: identity, phone numbers and the form handoff. Synthetic data only.
 */
import { isIdentityQuestion } from '@/lib/will/identity-question';
import { phoneCandidates } from '@/lib/will/phone-candidates';
import { isLongComplicatedMessage, countAsks } from '@/lib/will/long-message';
import { isFreeAdviceSeeker } from '@/lib/will/free-advice-seeker';

describe('answers to the team "Is that you?" photo are not the bot question', () => {
  it.each(["Yess it's me", 'Yes', 'Yep', "yes that's me", 'Why?', 'Sorry put in the wrong number', "Yes it's me, I put my French number in the form"])(
    '%s',
    (t) => expect(isIdentityQuestion(t)).toBe(false),
  );
});

describe('a form number typed another way still finds the chat', () => {
  it('French national number with the trunk 0', () => {
    expect(phoneCandidates('06 12 34 56 78')).toContain('33612345678');
  });
  it('French number with +33 and the trunk 0', () => {
    expect(phoneCandidates('+33 0612345678')).toContain('33612345678');
  });
  it('French mobile typed bare', () => {
    expect(phoneCandidates('6 12 34 56 78')).toContain('33612345678');
  });
  it('Irish mobile typed bare', () => {
    expect(phoneCandidates('86 123 4567')).toContain('353861234567');
  });
  it('Australian bare mobile still resolves and is not given a French spelling', () => {
    const c = phoneCandidates('412 345 678');
    expect(c).toContain('61412345678');
    expect(c).not.toContain('33412345678');
  });
});

describe('a long pre-sales email written as a list of asks', () => {
  const email = `Dear Tax Team,

I worked in Australia last year and I started my return in a free tool.

Could you please let me know:

Whether you can prepare my return without access to my online account.

Whether you can assist entirely online, including electronic signing.

Your total fee, including any extra charges.

Whether an initial consultation is free of charge.

Thank you.`;
  it('counts asks without question marks', () => {
    expect(countAsks(email)).toBeGreaterThanOrEqual(4);
    expect(isLongComplicatedMessage(email)).toBe(true);
  });
  it('a short multi-ask message without question marks qualifies', () => {
    const t = 'Could you please let me know whether you can lodge online from abroad. Can you also tell me the total fee. Please let me know how long it takes and what I need to send, thanks so much for your help with this, I really appreciate it and I am in no rush at all.';
    expect(isLongComplicatedMessage(t)).toBe(true);
  });
  it('ordinary short messages do not', () => {
    expect(isLongComplicatedMessage('Hi, can you help with my tax?')).toBe(false);
    expect(isLongComplicatedMessage('How much is it?')).toBe(false);
  });
});

describe('free advice seeker unchanged', () => {
  it('does not fire for a customer who has paid', () => {
    expect(isFreeAdviceSeeker({ paid: true, priceSent: true, textsSincePrice: ['I will lodge it myself'] })).toBe(false);
  });
});
