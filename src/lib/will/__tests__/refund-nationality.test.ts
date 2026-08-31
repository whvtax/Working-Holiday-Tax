/**
 * The owing caveat is nationality-aware (Jo, 31 Aug).
 *
 * Both price messages end on a sentence that spells out that if the customer
 * OWES tax rather than getting a refund, the fee still isn't refundable. Jo's
 * rule: UK, German and Japanese backpackers (phone +44 / +49 / +81) reliably
 * GET a refund, so that sentence is dropped for them. Every other number keeps
 * it, because owing is a real possibility and they must be told upfront.
 *
 * This never touches the guarantee itself and never states a refund figure: it
 * only removes a protective disclaimer for the numbers that don't need it, and
 * it fails SAFE (keeps the caveat) for any unknown number.
 */
import {
  APPROVED,
  isRefundNationality,
  stripOwingCaveat,
  priceForNumber,
} from '@/lib/will/approved-messages';

const OWING = /if you owe tax/i;

describe('isRefundNationality', () => {
  it.each(['447735654528', '+44 7735 654528', '4915112345678', '+49 151 12345678', '819012345678', '+81 90 1234 5678'])(
    'is true for the refund countries: %s',
    (n) => expect(isRefundNationality(n)).toBe(true),
  );

  it.each(['61472724880', '+61 472 724 880', '353871234567', '12025550123', '', null, undefined])(
    'is false for every other number (and empty/unknown): %s',
    (n) => expect(isRefundNationality(n as string | null | undefined)).toBe(false),
  );

  it('does not match a country code that merely contains 44/49/81 later on', () => {
    // +1 (US) number that happens to have 44 in the middle must not be treated
    // as UK: matching is on the leading digits only.
    expect(isRefundNationality('13445550149')).toBe(false);
  });
});

describe('the price templates still carry the caveat by default', () => {
  it('price_tfn and price_tfn_abn both keep the owing sentence in source', () => {
    expect(APPROVED.price_tfn).toMatch(OWING);
    expect(APPROVED.price_tfn_abn).toMatch(OWING);
  });
});

describe('stripOwingCaveat', () => {
  it('removes the owing sentence from the $220 message and nothing else', () => {
    const out = stripOwingCaveat(APPROVED.price_tfn);
    expect(out).not.toMatch(OWING);
    expect(out).toMatch(/top up the difference/i); // the guarantee is untouched
    expect(out).toMatch(/Account Name: Simple Tax Services/);
    expect(out.trimEnd().endsWith("Once paid, send us a screenshot and we'll get started.")).toBe(true);
  });

  it('removes the owing sentence from the $385 message and nothing else', () => {
    const out = stripOwingCaveat(APPROVED.price_tfn_abn);
    expect(out).not.toMatch(OWING);
    expect(out).toMatch(/top up the difference/i);
  });

  it('leaves a message that has no caveat untouched', () => {
    const clean = 'The total fee is $220.';
    expect(stripOwingCaveat(clean)).toBe(clean);
  });
});

describe('priceForNumber ties it together', () => {
  it('drops the caveat for +44/+49/+81', () => {
    expect(priceForNumber(APPROVED.price_tfn, '447735654528')).not.toMatch(OWING);
    expect(priceForNumber(APPROVED.price_tfn_abn, '+49 151 12345678')).not.toMatch(OWING);
  });

  it('keeps the caveat for an Australian or any other number', () => {
    expect(priceForNumber(APPROVED.price_tfn, '61472724880')).toMatch(OWING);
    expect(priceForNumber(APPROVED.price_tfn_abn, '353871234567')).toMatch(OWING);
  });

  it('never states or invents a refund figure either way', () => {
    for (const n of ['447735654528', '61472724880']) {
      const out = priceForNumber(APPROVED.price_tfn, n);
      // The only dollar figure allowed here is the fixed fee.
      const dollars = out.match(/\$\d+/g) ?? [];
      expect(dollars.every((d) => d === '$220')).toBe(true);
    }
  });
});
