// ============================================================
// Shared redaction utilities for anything that puts real customer
// wording into an email inbox — used by the daily Library-suggestions
// digest (daily-digest.ts). Kept in its own file/tests because a leak
// here is permanent: customers paste TFNs, bank accounts and passport
// numbers into WhatsApp constantly.
// ============================================================

/** A run of 7+ digits, allowing spaces/dashes inside it. Covers TFNs (8-9),
 *  bank accounts, BSB+account pairs, passport numbers and phone numbers, while
 *  leaving ordinary numbers alone — "2024-25" is six digits and survives, as do
 *  "24 hours", "2 jobs", "$220" and "6 months". */
const LONG_DIGITS = /(?:\d[\s-]?){7,}\d?/g
const EMAILISH = /\b[^\s@]+@[^\s@]+\.[a-z]{2,}\b/gi

/** Strip anything that should not be sitting in an inbox six months from now. */
export function redactSensitive(text: string): string {
  return text
    .replace(EMAILISH, '[email removed]')
    .replace(LONG_DIGITS, (m) => {
      const digits = m.replace(/\D/g, '')
      return digits.length >= 7 ? '[number removed]' : m
    })
    .trim()
}

/** "Sarah Kowalski" + "447700900123" -> "Sarah (…123)" */
export function shortLabel(name: string | null | undefined, waId: string): string {
  const first = (name ?? '').trim().split(/\s+/)[0] || 'Unknown'
  const tail = waId.replace(/\D/g, '').slice(-3) || '???'
  return `${first} (…${tail})`
}

