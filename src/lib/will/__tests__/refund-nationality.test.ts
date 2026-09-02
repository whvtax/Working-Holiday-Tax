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
  priceForCustomer,
} from '@/lib/will/approved-messages';

const OWING = /if you owe tax/i;
const GUARANTEE = /top up the difference|refund the difference|never costs you more|never out of pocket/i;

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

describe('the two-step price messages carry no guarantee or owing caveat (Jo, 2 Sep)', () => {
  it('price_tfn and price_tfn_abn contain neither an owing caveat nor a guarantee', () => {
    for (const msg of [APPROVED.price_tfn, APPROVED.price_tfn_abn]) {
      expect(msg).not.toMatch(OWING);
      expect(msg).not.toMatch(GUARANTEE);
    }
  });
  it('both are the two-step assessment message', () => {
    expect(APPROVED.price_tfn).toMatch(/Tax Assessment \$110/);
    expect(APPROVED.price_tfn).toMatch(/\$220 all up/);
    expect(APPROVED.price_tfn_abn).toMatch(/\$385 all up/);
  });
});

describe('priceForCustomer never reintroduces a guarantee', () => {
  it('returns a message with no guarantee, for a refund-nationality or a plain customer', () => {
    const cases = [
      { lang: 'de' },
      { waId: '447735654528' },
      { lang: 'en', waId: '61472724880', text: 'only TFN' },
    ];
    for (const who of cases) {
      const out = priceForCustomer(APPROVED.price_tfn, who);
      expect(out).not.toMatch(OWING);
      expect(out).not.toMatch(GUARANTEE);
    }
  });
});
