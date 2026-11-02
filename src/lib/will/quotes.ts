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
