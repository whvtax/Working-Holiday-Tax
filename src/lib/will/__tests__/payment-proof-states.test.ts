/**
 * A payment screenshot is recognised even before the formal price message.
 *
 * WHAT WAS WRONG (Jo, 31 Aug). A customer was quoted $220 in the back-and-forth
 * rather than through the system's price message, so she sat at QUALIFIED when
 * she paid and sent the bank receipt. The payment-proof vision check only ran at
 * PRICE_SENT / PAYMENT_PENDING, so an obvious payment landed as an "attachment I
 * can't read" task. The gate was widened to the earlier pre-payment states; the
 * vision check itself still confirms the image really is a payment before
 * anything moves, so widening cannot confirm a payment that is not one.
 */
import { PAYMENT_PROOF_STATES } from '@/lib/will/service';

describe('PAYMENT_PROOF_STATES', () => {
  it('covers every pre-payment stage a customer could pay from', () => {
    expect(PAYMENT_PROOF_STATES).toEqual(
      expect.arrayContaining(['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING']),
    );
  });

  it('never runs the payment check on an already-paid or closed customer', () => {
    for (const s of ['PAID', 'FORM_PENDING', 'SIGNATURE_PENDING', 'COMPLETED', 'NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT']) {
      expect(PAYMENT_PROOF_STATES).not.toContain(s);
    }
  });
});
