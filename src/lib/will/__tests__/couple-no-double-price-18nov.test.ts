/** Jo, 18 Nov: the couple answer, and never a price twice in one chat. */
import { coupleMessageFor, COUPLE_MSG } from '@/lib/will/i18n';
import { renderApproved } from '@/lib/will/will-decides';

const base = { state: 'QUALIFIED' as const, lang: 'en', firstName: null, firstContact: false, lastWillText: '', foreign: false };

it('is Jo\'s wording', () => {
  expect(COUPLE_MSG.en).toBe("Of course, happy to help you both!\n\nEach of you just needs to message us from your own WhatsApp, so your details stay private.\n\nThe fee is per person: $220 for a TFN return, or $385 with ABN income.");
});
it('keeps the fee when no price has gone out yet', () => {
  expect(renderApproved('couple', base)).toContain('$220');
});
it('drops the fee paragraph once a price has gone out, in every language', () => {
  for (const lang of ['en', 'de', 'ja']) {
    const t = coupleMessageFor(lang, { priceAlreadySent: true, foreign: false })!;
    expect(t).not.toMatch(/\$\d/);
    expect(t.length).toBeGreaterThan(20);
  }
  expect(renderApproved('couple', { ...base, priceAlreadySent: true })).toBe("Of course, happy to help you both!\n\nEach of you just needs to message us from your own WhatsApp, so your details stay private.");
});
it('uses the foreign prices for a customer with foreign income', () => {
  const t = coupleMessageFor('en', { priceAlreadySent: false, foreign: true })!;
  expect(t).toContain('$330');
  expect(t).toContain('$495');
  expect(t).not.toMatch(/\$220|\$385/);
});
