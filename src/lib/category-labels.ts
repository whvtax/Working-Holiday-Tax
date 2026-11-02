// Localized display labels for blog categories.
// The underlying Category enum stays English (used for schema.org, colour
// lookups and routing); these are for user-visible text ONLY.
// TFN / ABN / Super are kept as loanwords (searched in English).

const DE: Record<string, string> = {
  'TFN': 'TFN',
  'ABN': 'ABN',
  'Tax Return': 'Steuererklärung',
  'Super': 'Super',
  'Work Rights': 'Arbeitsrechte',
  'Medicare & Other': 'Medicare & Sonstiges',
}

const JA: Record<string, string> = {
  'TFN': 'TFN',
  'ABN': 'ABN',
  'Tax Return': 'タックスリターン',
  'Super': 'スーパー',
  'Work Rights': '労働者の権利',
  'Medicare & Other': 'メディケア・その他',
}

// fr / it / es: "Tax return" stays English because that is the phrase the
// readers search for and the ATO shows; Super likewise. Sentence case.
const FR: Record<string, string> = {
  'TFN': 'TFN',
  'ABN': 'ABN',
  'Tax Return': 'Tax return',
  'Super': 'Super',
  'Work Rights': 'Droits au travail',
  'Medicare & Other': 'Medicare et autres',
}

const IT: Record<string, string> = {
  'TFN': 'TFN',
  'ABN': 'ABN',
  'Tax Return': 'Tax return',
  'Super': 'Super',
  'Work Rights': 'Diritti sul lavoro',
  'Medicare & Other': 'Medicare e altro',
}

const ES: Record<string, string> = {
  'TFN': 'TFN',
  'ABN': 'ABN',
  'Tax Return': 'Tax return',
  'Super': 'Super',
  'Work Rights': 'Derechos laborales',
  'Medicare & Other': 'Medicare y otros',
}

export const catLabelDe = (c: string): string => DE[c] ?? c
export const catLabelJa = (c: string): string => JA[c] ?? c
export const catLabelFr = (c: string): string => FR[c] ?? c
export const catLabelIt = (c: string): string => IT[c] ?? c
export const catLabelEs = (c: string): string => ES[c] ?? c

/** Label table for the three new locales, as a plain object (client safe). */
export const NEW_LOCALE_CATEGORY_LABELS: Readonly<Record<'fr' | 'it' | 'es', Readonly<Record<string, string>>>> = {
  fr: FR,
  it: IT,
  es: ES,
}
