/**
 * NDA (Non-Discrimination Agreement) country detection.
 *
 * Used to catch working-holiday visa holders from treaty countries who may
 * actually qualify for Australian *resident* tax rates (often a much bigger
 * refund) before they submit as "Working Holiday Maker" out of habit. The tax
 * form treats this combination as a hard stop so these cases get assessed
 * properly instead of being lodged on the wrong basis. It is NOT a legal
 * determination of residency status: that depends on the person's own
 * circumstances and is assessed separately, through the residency step of
 * the tax form. This file deliberately does not restate the criteria.
 *
 * The "Home Country" field in the tax form is free text, not a dropdown, so
 * this matches common real-world spellings/aliases people actually type -
 * including German and Japanese country names, since the form UI is offered
 * in those languages.
 *
 * This is the ONLY implementation. A second, weaker copy used to live inline
 * in ResidencyStep.tsx (the one that actually ran); it has been deleted and
 * that component now imports this. The merge added only *spellings* the inline
 * copy knew and this one did not - gb, Suomi, Norge, Nippon. The list of
 * countries below is unchanged: both copies covered exactly these eight, so
 * nothing was added to or removed from it. The country list is a tax fact;
 * change it only on a deliberate decision, not as a side effect of a refactor.
 */
export const NDA_COUNTRIES = [
  'United Kingdom', 'Germany', 'Japan', 'Chile', 'Finland', 'Israel', 'Norway', 'Turkey',
] as const

/**
 * One or more patterns per country. Latin aliases are matched case-insensitively
 * on whole words, so short codes (uk, gb) can never fire inside a longer name
 * ("Ukraine", "GBP"). Japanese and Hebrew names are matched as-is.
 *
 * Deliberately no Unicode NFD "strip the accents" pass over the input: NFD
 * decomposes katakana dakuten too (ド -> ト + U+3099), which would break the
 * Japanese names. Accented spellings are handled by the patterns themselves
 * (t[üu]rkei, k[öo]nigreich, gro(ß|ss)britannien).
 */
const NDA_COUNTRY_PATTERNS: RegExp[] = [
  /\bchile\b/i,
  /チリ/,
  /\bfinland\b|\bfinnland\b|\bsuomi\b/i,
  /フィンランド/,
  /\bgermany\b|\bdeutschland\b|\bgerman\b/i,
  /ドイツ/,
  /\bisrael\b/i,
  /イスラエル/,
  /ישראל/,
  /\bjapan\b|\bnippon\b/i,
  /日本/,
  /\bnorway\b|\bnorwegen\b|\bnorge\b/i,
  /ノルウェー/,
  /\bturkey\b|\bturkiye\b|\bt[üu]rkiye\b|\bt[üu]rkei\b/i,
  /トルコ/,
  /\b(united kingdom|u\.?k\.?|g\.?b\.?|england|scotland|wales|northern ireland|britain|great britain|gro(ß|ss)britannien|vereinigtes k[öo]nigreich)\b/i,
  /イギリス|英国/,
]

export function isNdaCountry(raw: string | null | undefined): boolean {
  // Collapse runs of whitespace (including the ideographic space people get
  // from a Japanese IME) so "United  Kingdom" is not a miss on a stray space.
  const v = (raw ?? '').replace(/\s+/g, ' ').trim()
  if (!v) return false
  return NDA_COUNTRY_PATTERNS.some(re => re.test(v))
}

/**
 * Which of our three supported languages best matches a customer's HOME COUNTRY,
 * independent of the language they filled the form in (Jo, 3 Sep). We want the
 * WHM warning to reach a German in German and a Japanese person in Japanese even
 * when they completed the English form. Anything outside German/Japanese falls
 * back to English. Matches the same real-world spellings people type into the
 * free-text country field (English, native, and Japanese katakana names).
 */
export function languageForCountry(raw: string | null | undefined): 'en' | 'de' | 'ja' | 'es' {
  const v = (raw ?? '').replace(/\s+/g, ' ').trim()
  if (!v) return 'en'
  if (/日本|\bjapan\b|\bnippon\b|\bnihon\b/i.test(v)) return 'ja'
  if (/ドイツ|\bgermany\b|\bdeutschland\b|\bgerman\b|\ballemagne\b|\balemania\b/i.test(v)) return 'de'
  if (/チリ|\bchile\b/i.test(v)) return 'es'
  return 'en'
}
