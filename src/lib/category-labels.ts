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

export const catLabelDe = (c: string): string => DE[c] ?? c
export const catLabelJa = (c: string): string => JA[c] ?? c
