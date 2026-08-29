/**
 * "I paid" — the words that move a customer to Paid.
 *
 * Jo's rule, 27 Aug: at the payment step we trust the customer. Two independent
 * routes, either one enough on its own — they say it, or the screenshot shows
 * it. Most people do both at once, and that case used to be decided by the
 * picture ALONE: a real payment with a blurry crop or a bank app in Japanese
 * fell through to a manual task while "just paid it!" sat in the caption.
 *
 * The one thing this must not do is move someone to Paid who is ASKING about
 * paying. "How do I pay?" and "I paid" are three characters apart and mean
 * opposite things — get that wrong and a customer who has not paid gets the
 * form, the thank-you, and a tax return started for them. So the false
 * positives are pinned harder than the true ones.
 */
import { claimsPayment } from '@/lib/will/payment-claim';

describe('a report that payment was made', () => {
  it.each([
    ['bare', 'paid'],
    ['with punctuation', 'Paid!'],
    ['short confirm', 'done'],
    ['sent it', 'sent it'],
    ['past tense', 'I just paid it'],
    ['already', 'already paid, thanks'],
    ['transfer', 'I transferred the money this morning'],
    ['payment done', 'payment done'],
    ['bank transfer', 'bank transfer sent'],
    ['with the amount', 'paid $385 just now'],
    ['casual', "I've paid, here's the screenshot"],
    ['money sent', 'money sent 😊'],
  ])('%s', (_name, text) => {
    expect(claimsPayment(text)).toBe(true);
  });

  it.each([
    ['Spanish', 'ya pagué'],
    ['Spanish, transfer', 'transferencia realizada'],
    ['Portuguese', 'já paguei'],
    ['German', 'schon bezahlt'],
    ['German, transferred', 'Ich habe überwiesen'],
    ['Italian', 'ho pagato'],
    ['French', "j'ai payé"],
    ['Japanese', '支払いました'],
    ['Japanese, transferred', '振り込みました'],
  ])('%s', (_name, text) => {
    // The site is English, German and Japanese, and the customers are
    // backpackers from everywhere. An English-only check meant a Spanish
    // customer's confirmation was invisible.
    expect(claimsPayment(text)).toBe(true);
  });
});

describe('asking about paying is NOT a claim', () => {
  it.each([
    ['how', 'How do I pay?'],
    ['how, no question mark', 'how do i pay'],
    ['when', 'When do I pay the fee'],
    ['where', 'Where can I pay?'],
    ['future', 'I will pay tomorrow'],
    ['about to', "I'm about to pay"],
    ['going to', 'going to pay tonight'],
    ['need to', 'I need to pay first right?'],
    ['have not', "I haven't paid yet"],
    ['not paid', 'not paid yet sorry'],
    ['conditional', 'once I pay, what happens next'],
    ['after', 'after I pay do I get a receipt'],
    ['before', 'before I pay I have a question'],
    ['can I', 'can I pay by card?'],
    ['any question', 'is the payment $220?'],
  ])('%s', (_name, text) => {
    expect(claimsPayment(text)).toBe(false);
  });

  it('does not fire on "paid" used in another sense', () => {
    expect(claimsPayment('I paid attention to your ad')).toBe(false);
    expect(claimsPayment('paid visit')).toBe(false);
  });

  it('does not fire on a confirming word buried in a paragraph', () => {
    // "done" is a confirmation in a four-word message and a word in an essay.
    expect(claimsPayment(
      'Thanks for explaining all of that, it makes much more sense now. I still '
      + 'have a couple of questions before anything is done on my side.',
    )).toBe(false);
  });

  it('handles empty and odd input without throwing', () => {
    for (const odd of ['', '   ', null, undefined, '?', '😊']) {
      expect(() => claimsPayment(odd as string)).not.toThrow();
      expect(claimsPayment(odd as string)).toBe(false);
    }
  });
});

// ── A payment that went wrong is not a payment ─────────────────────────────
//
// Jo, 29 Aug: take the customer at their word, unless the word is that
// something broke. Every string below contains a phrase that would otherwise
// match EXPLICIT outright, which is exactly why it needs pinning: getting this
// wrong sends "payment received" to someone whose money never left.
describe('reports of trouble are never claims', () => {
  const trouble = [
    'I transferred but it was declined',
    'payment sent but it failed',
    'I paid but it did not go through',
    'just paid, got an error',
    'already paid but there is a problem with the account number',
    'I paid it, wrong amount sorry',
    'transferred but the bank cancelled it',
    'ya pagué pero fue rechazado',
    'já paguei mas falhou',
    'bezahlt, aber die Zahlung wurde abgelehnt',
    'ho pagato ma non ha funzionato',
    "j'ai payé mais il y a une erreur",
    '支払いました が エラー',
  ];
  for (const t of trouble) {
    it(`is not a claim: ${t}`, () => expect(claimsPayment(t)).toBe(false));
  }
});

// The other half of the same rule. "went through" reads as failure to a naive
// keyword list and is in fact the plainest success report there is, so it gets
// its own test rather than being trusted to review.
describe('successes that mention the mechanics still count', () => {
  const ok = [
    'just paid, it went through',
    'payment done, went through fine',
    'I transferred it and it went through',
  ];
  for (const t of ok) {
    it(`is a claim: ${t}`, () => expect(claimsPayment(t)).toBe(true));
  }
});
