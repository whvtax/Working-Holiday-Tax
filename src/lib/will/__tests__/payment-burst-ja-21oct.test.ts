/**
 * Jo, 21 Oct (+81 70 5498): two screenshots of one $220 payment and "送りました".
 * The first screenshot confirmed the payment and parked the "payment received"
 * reply for its usual few minutes; the second was then treated as paperwork and
 * got "完璧です、すべて受け取りました" straight away, ahead of the confirmation.
 */
import { claimsPayment } from '../payment-claim';
import { isPaymentBurst, PAYMENT_BURST_MS } from '../document-drop';

describe('Japanese short payment reports', () => {
  it.each(['送りました', '送りました。', '完了', '完了しました', '払いました', '支払い済みです'])('"%s" is a payment report', (t) => {
    expect(claimsPayment(t)).toBe(true);
    expect(claimsPayment(t, { hasAttachment: true })).toBe(true);
  });
  it.each(['送りましたか', 'まだ完了していません', '送りました？', 'まだ払っていません', '完了したら連絡します'])('"%s" is not', (t) => {
    expect(claimsPayment(t)).toBe(false);
  });
  it('a long Japanese message still needs an explicit phrase', () => {
    expect(claimsPayment('書類はすべて送りましたので、確認をお願いしたいと思っています')).toBe(false);
  });
});

describe('isPaymentBurst', () => {
  const now = Date.parse('2026-10-21T05:41:30Z');
  it('true while the payment confirmation is still queued', () => {
    expect(isPaymentBurst({ pendingOutbound: [{ meta: { paymentConfirmation: true } }], history: [], now })).toBe(true);
  });
  it('true while an approval draft that moves to Paid is waiting', () => {
    expect(isPaymentBurst({ pendingOutbound: [{ meta: { proposedState: 'PAID' } }], now })).toBe(true);
  });
  it('true within the window after the move to Paid', () => {
    expect(isPaymentBurst({ history: [{ to: 'PAID', createdAt: new Date(now - 60_000).toISOString() }], now })).toBe(true);
  });
  it('false once the window has passed', () => {
    expect(isPaymentBurst({ history: [{ to: 'PAID', createdAt: new Date(now - PAYMENT_BURST_MS - 1000).toISOString() }], now })).toBe(false);
  });
  it('false with no payment activity, or with an ordinary queued reply', () => {
    expect(isPaymentBurst({ pendingOutbound: [{ meta: {} }], history: [{ to: 'FORM_PENDING', createdAt: new Date(now).toISOString() }], now })).toBe(false);
    expect(isPaymentBurst({ now })).toBe(false);
  });
});
