/** 18 Nov security audit: regression tests for the fixes made after the review. */
import { alreadyLodged } from '@/lib/will/already-checked';
import { FORM_LINK_ANY_BRAND } from '@/lib/will/brand-voice';

describe('already lodged detector', () => {
  it.each(["I haven't lodged yet", 'I have not filed my return', 'Not lodged yet, can you help?', 'Ich habe noch nicht eingereicht'])('negated: %s', (t) => {
    expect(alreadyLodged([t])).toBe(false);
  });
  it.each(['I already lodged it', 'I lodged my return last week', 'bereits eingereicht'])('lodged: %s', (t) => {
    expect(alreadyLodged([t])).toBe(true);
  });
});

describe('form link detector', () => {
  it('sees the localized form links', () => {
    expect(FORM_LINK_ANY_BRAND.test('https://workingholidaytax.com.au/de/start')).toBe(true);
    expect(FORM_LINK_ANY_BRAND.test('https://workingholidaytax.com.au/ja/start')).toBe(true);
    expect(FORM_LINK_ANY_BRAND.test('https://workingholidaytax.com.au/start')).toBe(true);
    expect(FORM_LINK_ANY_BRAND.test('https://workingholidaytax.com.au/blog/start-here')).toBe(false);
  });
});

describe('payment details pause (Jo, 18 Nov)', () => {
  it('is always between three and five minutes', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { paymentDetailsDelaySeconds } = require('@/lib/will/config');
    expect(paymentDetailsDelaySeconds(() => 0)).toBe(180);
    expect(paymentDetailsDelaySeconds(() => 1)).toBe(300);
    expect(paymentDetailsDelaySeconds(() => 0.5)).toBe(240);
  });
});

describe('a payment in another currency (Jo, 18 Nov)', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { foreignEstimate, describeForeign, describeProof } = require('@/lib/will/payment-proof');
  it('135 EUR is in the range of the $220 fee', () => {
    expect(foreignEstimate('EUR', 135)).toEqual({ approxAud: 220, fee: 220, verdict: 'matches' });
    expect(describeForeign({ foreignCurrency: 'EUR', foreignAmount: 135 })).toMatch(/135 EUR, about \$220.*range of the \$220 fee/);
  });
  it('20 EUR is not in the range of any fee, and 197 GBP matches $385', () => {
    expect(foreignEstimate('EUR', 20).verdict).toBe('low');
    expect(foreignEstimate('GBP', 197).fee).toBe(385);
  });
  it('an unlisted currency gets no estimate, and nothing is ever confirmed from it', () => {
    expect(foreignEstimate('BRL', 800)).toBeNull();
    expect(describeForeign({ foreignCurrency: 'BRL', foreignAmount: 800 })).toMatch(/no estimate/);
  });
  it('the owner task line carries the estimate', () => {
    expect(describeProof({ amountAud: null, recipient: null, recipientIsUs: 'unknown', status: 'unknown', foreignCurrency: 'EUR', foreignAmount: 135 }))
      .toMatch(/not shown in AUD \(135 EUR, about \$220/);
    expect(describeProof({ amountAud: null, recipient: null, recipientIsUs: 'unknown', status: 'unknown' })).toBe('an amount not shown in AUD');
  });
});
