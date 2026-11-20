// ============================================================
// THE "TEMPLATES" TAB (18 Nov, Jo): every message Will sends as free text
// inside the 24-hour window (an open chat), organised by language.
//
// A row of the Message Library with requiresMeta = false is one of these.
// Its language is the suffix of its key (payment_received_de is German); no
// suffix, or _en, means English. Rows with requiresMeta = true are the WhatsApp Manager
// templates (outside the window) and are not listed here.
// ============================================================
import type { TemplateRow } from './store';

export const FREE_TEXT_LANGS = ['en', 'de', 'ja', 'es', 'fr', 'it', 'pt', 'zh', 'vi'] as const;
export type FreeTextLang = (typeof FREE_TEXT_LANGS)[number];

// 18 Nov (decision 018): "_en" too (form_received_en, review_ask_short_en), so those English rows
// sit in the same family as their eight translations.
const LANG_SUFFIX = /_(en|de|ja|es|fr|it|pt|zh|vi)$/;

export interface FreeTextEntry {
  family: string;      // the English key, e.g. payment_received
  category: string;
  title: string;       // the English title
  key: string;         // the row's own key in this language
  body: string;
  id: string;
}

export interface FreeTextFamily {
  family: string;
  category: string;
  title: string;
  byLang: Partial<Record<FreeTextLang, FreeTextEntry>>;
}

/** Splits the free-text rows into families (one per English message) with one
 *  entry per language. Families keep the order the Library lists them in. */
export function freeTextFamilies(rows: TemplateRow[]): FreeTextFamily[] {
  const families = new Map<string, FreeTextFamily>();
  for (const r of rows) {
    if (r.requiresMeta) continue;
    const m = LANG_SUFFIX.exec(r.key);
    const lang: FreeTextLang = m ? (m[1] as FreeTextLang) : 'en';
    const family = m ? r.key.slice(0, -m[0].length) : r.key;
    let f = families.get(family);
    if (!f) {
      f = { family, category: r.category, title: r.title, byLang: {} };
      families.set(family, f);
    }
    if (lang === 'en') f.title = r.title;
    f.byLang[lang] = { family, category: r.category, title: r.title, key: r.key, body: r.body, id: r.id };
  }
  return [...families.values()];
}

/** How many of the families have wording in each language. */
export function coverage(families: FreeTextFamily[]): Record<FreeTextLang, number> {
  const out = Object.fromEntries(FREE_TEXT_LANGS.map((l) => [l, 0])) as Record<FreeTextLang, number>;
  for (const f of families) for (const l of FREE_TEXT_LANGS) if (f.byLang[l]) out[l]++;
  return out;
}
