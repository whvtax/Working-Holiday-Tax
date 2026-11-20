/**
 * estimateInvoiceMessage / estimateInvoiceTemplateKey (Jo, 17 Sep): "same
 * principle" as medicare — German and Japanese get their own wording and
 * their own Meta template name (estimate_invoice_de / estimate_invoice_ja);
 * every other language falls back to English (estimate_invoice), same as
 * medicareTemplateKey and paymentReceivedTemplateKey already do.
 */
import { estimateInvoiceMessage, estimateInvoiceTemplateKey } from '@/lib/will/i18n';
import { composeEstimate, HIDE_INVOICE_IN_ESTIMATE } from '@/lib/will/estimate-send';

describe('estimateInvoiceTemplateKey', () => {
  it('is the base name for English', () => {
    expect(estimateInvoiceTemplateKey('en')).toBe('estimate_invoice');
  });
  it('is language-suffixed for German and Japanese', () => {
    expect(estimateInvoiceTemplateKey('de')).toBe('estimate_invoice_de');
    expect(estimateInvoiceTemplateKey('ja')).toBe('estimate_invoice_ja');
  });
  it('is language-suffixed for every other supported language (18 Nov, decision 018)', () => {
    for (const lang of ['es', 'fr', 'it', 'pt', 'zh', 'vi']) expect(estimateInvoiceTemplateKey(lang)).toBe(`estimate_invoice_${lang}`);
  });
  it('falls back to English for an unknown language and for null/undefined', () => {
    for (const lang of [null, undefined, 'xx']) {
      expect(estimateInvoiceTemplateKey(lang as string | null | undefined)).toBe('estimate_invoice');
    }
  });
});

describe('estimateInvoiceMessage', () => {
  it('returns distinct wording for en/de/ja', () => {
    const en = estimateInvoiceMessage('en');
    const de = estimateInvoiceMessage('de');
    const ja = estimateInvoiceMessage('ja');
    expect(en).not.toBe(de);
    expect(en).not.toBe(ja);
    expect(de).not.toBe(ja);
  });

  it('falls back to the English wording only for an unknown language (18 Nov, decision 018)', () => {
    const en = estimateInvoiceMessage('en');
    for (const lang of [null, undefined, 'xx']) {
      expect(estimateInvoiceMessage(lang as string | null | undefined)).toBe(en);
    }
    for (const lang of ['es', 'fr', 'it', 'pt', 'zh', 'vi']) expect(estimateInvoiceMessage(lang)).not.toBe(en);
  });

  it('every language keeps both placeholders intact, for composeEstimate to fill', () => {
    for (const lang of ['en', 'de', 'ja']) {
      const body = estimateInvoiceMessage(lang);
      expect(body).toContain('{{AMOUNT}}');
      // Jo, 18 Nov: no invoice in the estimate any more, in any language.
      expect(body).not.toContain('{{INVOICE_LINK}}');
    }
  });

  it('composeEstimate fills both placeholders correctly in every language', () => {
    for (const lang of ['en', 'de', 'ja']) {
      const filled = composeEstimate(estimateInvoiceMessage(lang), 385000, 'https://example.com/invoice/123');
      expect(filled).not.toContain('{{AMOUNT}}');
      expect(filled).not.toContain('{{INVOICE_LINK}}');
      // 18 Nov: no {{INVOICE_LINK}} slot in any language, so the invoice link never shows.
      void HIDE_INVOICE_IN_ESTIMATE;
      expect(filled.includes('https://example.com/invoice/123')).toBe(false);
    }
  });
});
