/** Jo, 18 Nov: approved price wording for es, fr, it, pt is wired into the instant
 *  price path. A reply to a track choice gets the approved text; a first contact
 *  (which needs a greeting) and any other language do not. */
import { approvedPriceIn, detectChoice } from '@/lib/will/instant-choice';
import { APPROVED_ES } from '@/lib/will/approved-es';
import { APPROVED_FR } from '@/lib/will/approved-fr';
import { APPROVED_IT } from '@/lib/will/approved-it';
import { APPROVED_PT } from '@/lib/will/approved-pt';

describe('approved price wording in es, fr, it, pt', () => {
  it.each([
    ['es', APPROVED_ES], ['fr', APPROVED_FR], ['it', APPROVED_IT], ['pt', APPROVED_PT],
  ])('%s: a reply to a choice gets the approved TFN and TFN + ABN text', (lang, set) => {
    expect(approvedPriceIn(lang, 'TFN', false)).toBe(set.price_tfn);
    expect(approvedPriceIn(lang, 'TFN_ABN', false)).toBe(set.price_tfn_abn);
  });

  it('a first contact gets no approved text (it needs a greeting, the model writes it)', () => {
    expect(approvedPriceIn('es', 'TFN', true)).toBeNull();
  });

  it('other languages and English get nothing here', () => {
    expect(approvedPriceIn('vi', 'TFN', false)).toBeNull();
    expect(approvedPriceIn('zh', 'TFN', false)).toBeNull();
    expect(approvedPriceIn('en', 'TFN', false)).toBeNull();
    expect(approvedPriceIn(null, 'TFN', false)).toBeNull();
  });

  it('a TFN-only Spanish price carries the guarantee; the ABN one does not', () => {
    expect(APPROVED_ES.price_tfn).toContain(APPROVED_ES.guarantee);
    expect(APPROVED_ES.price_tfn_abn).not.toMatch(/diferencia|tarifa completa/);
  });

  it('a short "TFN" from a Spanish customer is a clear choice', () => {
    expect(detectChoice('TFN', null)).toBe('TFN');
  });
});
