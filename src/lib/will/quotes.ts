/**
 * Curly quotes to straight ones. An iPhone types "didn’t" with U+2019; most
 * of Will's rules (NO_ABN_RE, "don'?t have", ...) are written with a straight
 * apostrophe, so "I didn’t have an ABN" was not read as "no ABN" and a TFN
 * only customer was quoted the $385 option (Jo, 1 Nov, +33 6 76).
 * Applied once, where the customer's message enters Will.
 */
export function normaliseQuotes(s: string): string {
  return s.replace(/[‘’‛′ʼ]/g, "'")
}

// ------------------------------------------------------------------
// ALL YEARS QUOTED UP FRONT (Jo, 3 Nov). A customer with a second tax year
// was quoted one year and only later heard the second year costs the same
// again. Each year is its own return and fee, never a bundle.
// ------------------------------------------------------------------
const FEES = { TFN: 220, TFN_ABN: 385 } as const;
const FOREIGN_FEES = { TFN: 330, TFN_ABN: 495 } as const;

const WORD_COUNT: Record<string, number> = { two: 2, three: 3, four: 4, both: 2, '2': 2, '3': 3, '4': 4 };

/** How many tax years the customer's words ask for (1 when nothing says more).
 *  Counts distinct financial years ("2024-25", "2023/24", "FY25") and
 *  phrases like "two years", "both years", "last 2 years". */
export function countTaxYears(customerTexts: Array<string | null | undefined>): number {
  const years = new Set<number>();
  let words = 1;
  for (const raw of customerTexts) {
    const t = normaliseQuotes(raw ?? '');
    for (const m of t.matchAll(/\b(20\d{2})\s?[-/]\s?(?:20)?(\d{2})\b/g)) {
      if (Number(m[2]) === (Number(m[1]) + 1) % 100) years.add(Number(m[1]));
    }
    for (const m of t.matchAll(/\bfy\s?'?(\d{2})\b/gi)) years.add(2000 + Number(m[1]) - 1);
    const w = t.match(/\b(two|three|four|both|2|3|4)\s+(?:(?:tax|financial)\s+)?years?\b/i);
    if (w) words = Math.max(words, WORD_COUNT[w[1].toLowerCase()] ?? 1);
  }
  return Math.max(years.size, words, 1);
}

/** Fee for one return. */
export function feeFor(track: 'TFN' | 'TFN_ABN', foreign = false): number {
  return (foreign ? FOREIGN_FEES : FEES)[track];
}

/** One line that quotes every year at once, or null for a single year. */
export function multiYearLine(years: number, track: 'TFN' | 'TFN_ABN', foreign = false): string | null {
  if (years < 2) return null;
  const one = feeFor(track, foreign);
  return `Each tax year is its own return and fee: $${one} per year, so $${one * years} for ${years} years.`;
}
