/**
 * The owing caveat is dropped for refund nationalities (Jo, 31 Aug).
 *
 * Both price messages end on a sentence that spells out that if the customer
 * OWES tax rather than getting a refund, the fee still isn't refundable. Jo's
 * rule: UK, German and Japanese backpackers reliably GET a refund, so that
 * sentence is dropped for them. Everyone else keeps it.
 *
 * A phone number alone is not enough (backpackers use a local +61 SIM), so the
 * decision combines THREE signals and drops on ANY of them: conversation
 * language (de/ja), phone country code (+44/+49/+81), or the customer stating
 * where they are from ("from England", "I'm British"...). Plain English with no
 * British tell keeps the caveat. It never touches the guarantee or states a
 * refund figure, and it fails SAFE (keeps the caveat) when nothing matches.
 */
import {
  APPROVED,
  shouldDropOwingCaveat,
  stripOwingCaveat,
  priceForCustomer,
} from '@/lib/will/approved-messages';

const OWING = /if you owe tax/i;

describe('shouldDropOwingCaveat — by language', () => {
  it.each(['de', 'ja', 'DE', 'Ja'])('drops for German/Japanese: %s', (lang) => {
    expect(shouldDropOwingCaveat({ lang })).toBe(true);
  });
  it.each(['en', 'es', 'fr', 'it', 'pt', null, undefined])('keeps for English and others: %s', (lang) => {
    expect(shouldDropOwingCaveat({ lang: lang as string | null | undefined })).toBe(false);
  });
});

describe('shouldDropOwingCaveat — by phone country code', () => {
  it.each(['447735654528', '+44 7735 654528', '4915112345678', '+81 90 1234 5678'])(
    'drops for +44/+49/+81: %s',
    (waId) => expect(shouldDropOwingCaveat({ waId })).toBe(true),
  );
  it.each(['61472724880', '353871234567', '12025550123'])('keeps for AU/other: %s', (waId) => {
    expect(shouldDropOwingCaveat({ waId })).toBe(false);
  });
  it('matches the country code only, not 44 buried later in the number', () => {
    expect(shouldDropOwingCaveat({ waId: '13445550149' })).toBe(false);
  });
});

describe('shouldDropOwingCaveat — by the home-country answer in the chat', () => {
  // Will now asks "Which country are you from" in the opening, so a bare country
  // name is the answer and must count, in any language.
  it.each([
    'Japan',
    'Germany, only TFN',
    'UK',
    'England',
    'from Japan',
    "I'm British",
    'ich komme aus Deutschland',
    'Japon',            // French/Spanish spelling
    'Allemagne',        // French: Germany
    'Reino Unido',      // Spanish/Portuguese: UK
    '日本',              // Japanese: Japan
    'イギリス',          // Japanese: UK
  ])('drops for a refund-country answer: %s', (text) => {
    expect(shouldDropOwingCaveat({ lang: 'en', text })).toBe(true);
  });

  it.each([
    'Australia',
    'Ireland',
    'France, only TFN',
    'Spain',
    'Hi, I would like to ask about my Australian tax return. I worked on a TFN.',
    'only TFN',
  ])('keeps for a non-refund country or no country: %s', (text) => {
    expect(shouldDropOwingCaveat({ lang: 'en', waId: '61472724880', text })).toBe(false);
  });

  it('catches a Brit on an Australian +61 number who says they are from England', () => {
    // The whole reason the number alone is not trusted.
    expect(shouldDropOwingCaveat({
      lang: 'en',
      waId: '61467577453',
      text: "my friend gave me your contact, I'm on my final WHV and from England",
    })).toBe(true);
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
    expect(out).toMatch(/top up the difference/i); // guarantee untouched
    expect(out.trimEnd().endsWith("Once paid, send us a screenshot and we'll get started.")).toBe(true);
  });
  it('removes the owing sentence from the $385 message', () => {
    expect(stripOwingCaveat(APPROVED.price_tfn_abn)).not.toMatch(OWING);
  });
  it('leaves a message with no caveat untouched', () => {
    expect(stripOwingCaveat('The total fee is $220.')).toBe('The total fee is $220.');
  });
});

describe('priceForCustomer ties it together', () => {
  it('drops the caveat for German/Japanese, a +44 number, or a stated UK origin', () => {
    expect(priceForCustomer(APPROVED.price_tfn, { lang: 'de' })).not.toMatch(OWING);
    expect(priceForCustomer(APPROVED.price_tfn_abn, { waId: '447735654528' })).not.toMatch(OWING);
    expect(priceForCustomer(APPROVED.price_tfn, { lang: 'en', waId: '61467577453', text: 'from England' })).not.toMatch(OWING);
  });

  it('keeps the caveat for a plain English / Australian-number customer', () => {
    expect(priceForCustomer(APPROVED.price_tfn, { lang: 'en', waId: '61472724880', text: 'only TFN' })).toMatch(OWING);
  });

  it('never states or invents a refund figure either way', () => {
    for (const who of [{ lang: 'de' }, { lang: 'en', waId: '61472724880', text: 'only TFN' }]) {
      const out = priceForCustomer(APPROVED.price_tfn, who);
      const dollars = out.match(/\$\d+/g) ?? [];
      expect(dollars.every((d) => d === '$220')).toBe(true);
    }
  });
});
