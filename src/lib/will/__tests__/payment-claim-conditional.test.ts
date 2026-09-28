/**
 * Jo, 25 Sep (+61 481 836 719): "Thank you so much for your help! I really
 * appreciate it. I'll be in touch next week once I've made the payment." was
 * read as a payment report: she was moved to Paid and sent "Payment received,
 * fill in the form" with the Start Here button, eight minutes after saying
 * she would pay NEXT WEEK. "made the payment" is in EXPLICIT with no tense.
 */
import { claimsPayment } from '@/lib/will/payment-claim';

describe('a payment in the future is not a payment', () => {
  it('the exact message', () => {
    expect(claimsPayment("Thank you so much for your help! I really appreciate it. I'll be in touch next week once I've made the payment.")).toBe(false);
  });
  it('conditional and future-perfect shapes', () => {
    for (const t of [
      "once I've made the payment I'll send a screenshot",
      'when I have paid I will let you know',
      'as soon as I transfer the money I will message you',
      "I'll send it through after I've paid on Monday",
      'I will make the payment tomorrow',
      'payment sent next week, is that ok',
      'Sobald ich bezahlt habe, melde ich mich',
      'Cuando haya pagado te aviso',
      "Quand j'aurai payé je t'envoie la capture",
      'Quando avrò pagato ti scrivo',
      'Assim que pagar envio o comprovativo',
      '支払ったらスクリーンショットを送ります',
      '来週支払います',
    ]) expect([t, claimsPayment(t)]).toEqual([t, false]);
  });
  it('a real report still counts, including with a future word about something else', () => {
    for (const t of ['Just paid!', "I've made the payment", 'Payment sent, screenshot attached', 'transferred just now', 'bezahlt', 'ho pagato', '支払いました']) {
      expect([t, claimsPayment(t)]).toEqual([t, true]);
    }
    // with a receipt attached the picture decides, a future word does not veto it
    expect(claimsPayment('paid it, will send the rest tomorrow', { hasAttachment: true })).toBe(true);
  });
});
