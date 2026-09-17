/**
 * metaTemplateLang (Jo, 17 Sep): approving a WhatsApp template is manual,
 * per-language, per-name admin work in WhatsApp Manager — real ongoing cost
 * that does not scale the way editing a Library row does. This caps which
 * language a send outside the 24h window asks Meta for, to the three that
 * matter (English, German, Japanese), for the six system lines that name
 * their Meta template per language (form_received_<lang>, review_request_<lang>,
 * req_abn_<lang>, handoff_holding_<lang>, payment_received_<lang>,
 * medicare_<lang>). It does NOT affect which language the Library text (or
 * the live model reply) is shown or sent in — only the Meta template NAME a
 * send outside the window tries.
 */
import { metaTemplateLang, LANGS } from '@/lib/will/i18n';

describe('metaTemplateLang', () => {
  it('passes German and Japanese through unchanged', () => {
    expect(metaTemplateLang('de')).toBe('de');
    expect(metaTemplateLang('ja')).toBe('ja');
  });

  it('maps every other detected language, and null/undefined, to English', () => {
    for (const lang of ['en', 'es', 'fr', 'it', 'pt', null, undefined, 'xx']) {
      expect(metaTemplateLang(lang as string | null | undefined)).toBe('en');
    }
  });

  it('never returns anything outside en/de/ja for any supported Lang', () => {
    for (const lang of LANGS) {
      expect(['en', 'de', 'ja']).toContain(metaTemplateLang(lang));
    }
  });
});
