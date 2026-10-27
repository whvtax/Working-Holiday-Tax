/**
 * Jo, 26 Oct (a customer): "Payment received, thanks Sam!"
 * with the form link went at 17:30, and the queued template "Payment
 * received." with the Start Here button followed at 17:31. The first line
 * had a comma and a name after "Payment received", so it was not recognised
 * as a confirmation and the one-confirmation guard let the template through.
 */
import { confirmationAlreadyOut, looksLikePaymentConfirmation } from '@/lib/will/payment-confirmation';
import { PAYMENT_RECEIVED_MSG } from '@/lib/will/i18n';

const now = Date.now();
const row = (over: Record<string, unknown>) => ({ id: 'x', direction: 'OUT', status: 'SENT', body: '', meta: {}, createdAt: new Date(now - 60_000).toISOString(), ...over }) as never;

const CELVIN = `Payment received, thanks Sam!

Please fill out this quick form so we can start reviewing your 2023-24 return:

https://workingholidaytax.com.au/tax-form

Once you've submitted it, we'll go through everything and get back to you within 24 hours with your tax outcome.`;

describe('a reworded confirmation still counts', () => {
  it('his case: name and comma after "Payment received"', () => {
    expect(looksLikePaymentConfirmation(CELVIN)).toBe(true);
    const msgs = [row({ id: 'a', author: 'AI', body: CELVIN }), row({ id: 'b', status: 'QUEUED', meta: { paymentConfirmation: true }, body: PAYMENT_RECEIVED_MSG.en })];
    expect(confirmationAlreadyOut(msgs, { exceptId: 'b' })).toBe(true);
  });
  it('other wordings of the same first line, in every language', () => {
    for (const t of [
      'Payment received! Thanks so much.', 'Payment received - thank you', 'Thanks Sam, payment received.\n\nhttps://workingholidaytax.com.au/tax-form',
      'Zahlung erhalten, danke Lena!', 'Pago recibido, ¡gracias!', 'お支払いを確認しました！ありがとうございます。',
    ]) expect([t, looksLikePaymentConfirmation(t)]).toEqual([t, true]);
  });
  it('does not fire on look-alikes', () => {
    for (const t of [
      'Has the payment been received?', 'Payment receivedness', 'Once the payment is received we will send the form.',
      'Thanks Sam, payment received.', // no form link: a mid-sentence mention alone is not the confirmation
      'Here is the link to pay: https://workingholidaytax.com.au/pay',
    ]) expect([t, looksLikePaymentConfirmation(t)]).toEqual([t, false]);
  });
});
