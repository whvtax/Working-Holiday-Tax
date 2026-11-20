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

// 18 Nov (decision 018): every template that can go out after the 24h window has a name per
// language, so the cap to en/de/ja is gone: each of the nine languages is passed through.
describe('metaTemplateLang', () => {
  it('passes every one of the nine languages through unchanged', () => {
    for (const lang of LANGS) expect(metaTemplateLang(lang)).toBe(lang);
  });

  it('maps an unknown language, and null/undefined, to English', () => {
    for (const lang of ['en', null, undefined, 'xx', 'ko']) {
      expect(metaTemplateLang(lang as string | null | undefined)).toBe('en');
    }
  });
});
