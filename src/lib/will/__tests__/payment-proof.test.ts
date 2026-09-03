/**
 * What a payment screenshot must show to be VERIFIED (Jo, 3 Sep).
 *
 * Verified = our fee, to our account, completed, read off the picture by the
 * vision check. That is the case that raises no task. Everything short of it
 * still moves the customer to Paid on trust, but names what the picture could
 * not show, so the glance is a short one. Pure functions, so every branch is
 * pinned here without a store or a model.
 */
import {
  amountMatchesFee, verifyProofDetails, isNotOurPayment, describeProof, coerceProofDetails,
  FEES_AUD, AMOUNT_TOLERANCE_AUD, ProofDetails,
} from '@/lib/will/payment-proof';

const ours = (over: Partial<ProofDetails> = {}): ProofDetails => ({
  amountAud: 220, recipient: 'Simple Tax Services', recipientIsUs: 'yes', status: 'completed', ...over,
});

describe('the amount', () => {
  it('is one of the two fees', () => {
    expect(FEES_AUD).toEqual([220, 385]);
    expect(amountMatchesFee(220)).toBe(true);
    expect(amountMatchesFee(385)).toBe(true);
  });

  it('tolerates a few dollars lost in transfer, and no more', () => {
    expect(amountMatchesFee(220 - AMOUNT_TOLERANCE_AUD)).toBe(true);
    expect(amountMatchesFee(385 + AMOUNT_TOLERANCE_AUD)).toBe(true);
    expect(amountMatchesFee(220 - AMOUNT_TOLERANCE_AUD - 1)).toBe(false);
    expect(amountMatchesFee(150)).toBe(false);
    expect(amountMatchesFee(110)).toBe(false); // the phone consult is not the fee
  });

  it('refuses nothing, NaN and negatives', () => {
    expect(amountMatchesFee(null)).toBe(false);
    expect(amountMatchesFee(NaN)).toBe(false);
    expect(amountMatchesFee(-220)).toBe(false);
  });
});

describe('verification', () => {
  it('passes the Wise case Jo sent: 220 AUD to Simple Tax Services, completed', () => {
    expect(verifyProofDetails(ours())).toEqual({ verified: true, unverified: [] });
  });

  it('names every gap, in the order a person would check', () => {
    const v = verifyProofDetails({ amountAud: null, recipient: null, recipientIsUs: 'unknown', status: 'unknown' });
    expect(v.verified).toBe(false);
    expect(v.unverified).toEqual([
      'the recipient is not visible',
      'no AUD amount is visible',
      'no completed status is visible',
    ]);
  });

  it('a wrong amount is named with the figure', () => {
    expect(verifyProofDetails(ours({ amountAud: 150 })).unverified).toEqual(['the amount is $150, not $220 or $385']);
  });

  it('a pending transfer is not verified', () => {
    expect(verifyProofDetails(ours({ status: 'pending' })).unverified).toEqual(['the transfer shows as pending, not completed']);
  });

  it('another recipient is named', () => {
    const v = verifyProofDetails(ours({ recipient: 'Jane Citizen', recipientIsUs: 'no' }));
    expect(v.unverified).toEqual(['the recipient shown is Jane Citizen, not us']);
  });
});

describe('not ours', () => {
  it('is a different recipient or a failed transfer', () => {
    expect(isNotOurPayment(ours())).toBe(false);
    expect(isNotOurPayment(ours({ recipientIsUs: 'unknown' }))).toBe(false); // unknown is a glance, not a rejection
    expect(isNotOurPayment(ours({ recipientIsUs: 'no' }))).toBe(true);
    expect(isNotOurPayment(ours({ status: 'failed' }))).toBe(true);
  });
});

describe('the one-line description', () => {
  it('reads like the receipt', () => {
    expect(describeProof(ours())).toBe('$220, to Simple Tax Services, completed');
    expect(describeProof(ours({ amountAud: 227.16, recipientIsUs: 'unknown', recipient: 'S T SERVICES', status: 'unknown' })))
      .toBe('$227.16, to S T SERVICES');
    expect(describeProof(ours({ amountAud: null, recipient: null, recipientIsUs: 'unknown', status: 'pending' })))
      .toBe('an amount not shown in AUD, pending');
  });
});

describe('coercing what the model returned', () => {
  it('takes clean values as they are', () => {
    expect(coerceProofDetails({ amount_aud: 220, recipient: 'Simple Tax Services', recipient_is_us: 'yes', status: 'completed' }))
      .toEqual(ours());
  });

  it('reads an amount given as text, with a symbol or a thousands comma', () => {
    expect(coerceProofDetails({ amount_aud: '$1,220.50' }).amountAud).toBe(1220.5);
    expect(coerceProofDetails({ amount_aud: ' 220 ' }).amountAud).toBe(220);
  });

  it('turns anything it does not understand into unknown, never into a verified field', () => {
    const d = coerceProofDetails({ amount_aud: 'two hundred', recipient: 42, recipient_is_us: 'maybe', status: 'done' });
    expect(d).toEqual({ amountAud: null, recipient: null, recipientIsUs: 'unknown', status: 'unknown' });
    expect(verifyProofDetails(d).verified).toBe(false);
  });

  it('survives garbage input', () => {
    expect(coerceProofDetails(null).recipientIsUs).toBe('unknown');
    expect(coerceProofDetails('x').amountAud).toBeNull();
    expect(coerceProofDetails({ amount_aud: -5 }).amountAud).toBeNull();
  });

  it('caps a runaway recipient string', () => {
    expect(coerceProofDetails({ recipient: 'x'.repeat(500) }).recipient?.length).toBe(120);
  });
});
