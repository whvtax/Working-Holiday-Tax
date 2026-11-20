/**
 * lodgedConfirmationMessage / lodgedConfirmationTemplateKey (Jo, 17 Sep):
 * "same principle" as medicare/estimate_invoice/signature — German and
 * Japanese get their own wording and their own Meta template name
 * (lodged_confirmation_de / lodged_confirmation_ja); every other language
 * falls back to English (lodged_confirmation), same as medicareTemplateKey,
 * estimateInvoiceTemplateKey and signatureTemplateKey already do.
 */
import { lodgedConfirmationMessage, lodgedConfirmationTemplateKey } from '@/lib/will/i18n';
import { APPROVED } from '@/lib/will/approved-messages';

describe('lodgedConfirmationTemplateKey', () => {
  it('is the base name for English', () => {
    expect(lodgedConfirmationTemplateKey('en')).toBe('lodged_confirmation');
  });
  it('is language-suffixed for German and Japanese', () => {
    expect(lodgedConfirmationTemplateKey('de')).toBe('lodged_confirmation_de');
    expect(lodgedConfirmationTemplateKey('ja')).toBe('lodged_confirmation_ja');
  });
  it('falls back to English for an unknown language and for null/undefined', () => {
    // 18 Nov (decision 018): only an unknown language falls back; es/fr/it/pt/zh/vi have their own.
    for (const lang of [null, undefined, 'xx']) {
      expect(lodgedConfirmationTemplateKey(lang as string | null | undefined)).toBe('lodged_confirmation');
    }
  });
});

describe('lodgedConfirmationMessage', () => {
  it('the English wording matches the approved lodged_confirmation text verbatim', () => {
    expect(lodgedConfirmationMessage('en')).toBe(APPROVED.lodged_confirmation);
  });

  it('returns distinct wording for en/de/ja', () => {
    const en = lodgedConfirmationMessage('en');
    const de = lodgedConfirmationMessage('de');
    const ja = lodgedConfirmationMessage('ja');
    expect(en).not.toBe(de);
    expect(en).not.toBe(ja);
    expect(de).not.toBe(ja);
  });

  it('falls back to the English wording for an unknown language', () => {
    const en = lodgedConfirmationMessage('en');
    for (const lang of [null, undefined, 'xx']) {
      expect(lodgedConfirmationMessage(lang as string | null | undefined)).toBe(en);
    }
  });
});
