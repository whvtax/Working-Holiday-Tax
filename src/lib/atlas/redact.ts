// Removes personal and banking identifiers from anything Atlas sends to the model.
// Names, stages, dates, amounts and customer ids are kept, so Atlas can still answer.
// Used on tool results and on the data block of each question. Pure functions, no I/O.

const REMOVED = '[removed]';

// Object keys whose values are never sent, whatever they contain.
const SENSITIVE_KEY = /(tfn|passport|bsb|bank|phone|wa_?id|waid|email|address|dob|birth|medicare|licen[cs]e|card|pin|password|secret|token)/i;

// Text patterns. Each run of digits is checked by digit count first (see below).
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const BSB = /\b\d{3}-\d{3}\b/g;
const PASSPORT_LIKE = /\b[A-Z]{1,2}\d{6,8}\b/g;
const DIGIT_RUN = /\+?\d[\d\s-]{6,}\d/g;
const DATE_LIKE = /^(\d{4}-\d{1,2}-\d{1,2}|\d{1,2}[/-]\d{1,2}[/-]\d{2,4})$/;

function redactDigits(match: string): string {
  if (DATE_LIKE.test(match.trim())) return match;
  const digits = match.replace(/\D/g, '').length;
  return digits >= 8 ? REMOVED : match;
}

/** Remove identifiers from one string. */
export function redactText(text: string): string {
  return text
    .replace(EMAIL, REMOVED)
    .replace(BSB, REMOVED)
    .replace(PASSPORT_LIKE, REMOVED)
    .replace(DIGIT_RUN, redactDigits);
}

/** Remove identifiers from any JSON-like value, recursively. Keys are kept, sensitive values are replaced. */
export function redactForModel(value: unknown): unknown {
  if (typeof value === 'string') return redactText(value);
  if (Array.isArray(value)) return value.map(redactForModel);
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
      out[key] = SENSITIVE_KEY.test(key) && v !== null && v !== undefined ? REMOVED : redactForModel(v);
    }
    return out;
  }
  return value;
}
