/**
 * Server-side format validation for the public intake routes.
 *
 * WHY THIS EXISTS
 *   src/lib/validate.ts was imported by five CLIENT components and by no API
 *   route. Server-side, fields passed through sanitiseField/sanitiseShort only
 *   (trim, strip tag-like sequences, truncate) — there was a presence check and
 *   nothing else. No type, format, enum or range enforcement anywhere.
 *
 *   Anyone posting directly could fill the staff queue with records whose dob is
 *   "aaaa", whose taxYear is arbitrary text and whose marital status is any
 *   string at all; and tfn_norm duplicate detection was defeated by junk.
 *
 * DESIGN
 *   Deliberately forgiving, and it REJECTS rather than silently rewrites.
 *   These forms are filled in by backpackers on phones, so a real submission
 *   must never be lost to an over-strict rule: only clearly-wrong values are
 *   refused, and every optional field stays optional. Anything that fails is
 *   reported as a field name so the client can point at it.
 */
import { isValidEmail, isValidTfn, isPlausibleDob } from '@/lib/validate'

// ── Vocabulary checks, deliberately NOT exact-match enumerations ────────────
//
// An exact-match enum was tried first and it broke the main conversion path:
// the tax form sends taxStatus as the phrase "Australian resident for tax
// purposes" (src/lib/submit-tax-form.ts:153), which matched nothing in a list
// of short tokens, so every resident submission got a 400 and the user saw only
// a generic "something went wrong".
//
// The lesson is that these fields carry human-readable PHRASES chosen by the UI,
// and the UI can reword them at any time without touching this file. So the
// check is: does the value contain any recognised keyword, and is it a sane
// length. That still refuses junk ("it is complicated", a 500-char paste) while
// surviving rewording. Being wrong here costs a real customer; being loose here
// costs a slightly untidy field.
const MARITAL_WORDS = /\b(single|married|de\s?facto|partner\w*|separated|divorced|widow\w*)\b/i
const TAX_STATUS_WORDS = /\b(resident|non[-\s]?resident|foreign\w*|whm|working\s+holiday|backpacker|unsure|not\s+sure)\b/i

const MAX_ENUM_LEN = 80

export interface FieldIssue { field: string; reason: string }

/**
 * Validate the shared intake fields. Only checks values that are PRESENT:
 * required-ness is enforced by each route, which knows its own contract.
 */
export function validateIntake(f: {
  email?: string | null
  tfn?: string | null
  dob?: string | null
  taxYear?: string | null
  marital?: string | null
  taxStatus?: string | null
  whatsapp?: string | null
}): FieldIssue[] {
  const issues: FieldIssue[] = []

  if (f.email && !isValidEmail(f.email)) {
    issues.push({ field: 'email', reason: 'not a valid email address' })
  }
  if (f.tfn && !isValidTfn(f.tfn)) {
    issues.push({ field: 'tfn', reason: 'a TFN is 8 or 9 digits' })
  }
  if (f.dob && !isPlausibleDob(f.dob)) {
    issues.push({ field: 'dob', reason: 'not a plausible date of birth' })
  }
  // One year, or a range, or a comma-separated list of either: the payload type
  // for taxYears is string[] and is join(', ')-ed before it is sent, so a list
  // must be accepted even though the UI currently only ever sends one.
  if (f.taxYear) {
    const YEAR = /^(19|20)\d{2}(\s*[-/]\s*(19|20)?\d{2})?$/
    const parts = f.taxYear.split(',').map((s) => s.trim()).filter(Boolean)
    if (!parts.length || !parts.every((p) => YEAR.test(p))) {
      issues.push({ field: 'taxYear', reason: 'expected a year such as 2025 or 2024-25' })
    }
  }
  if (f.marital && (f.marital.length > MAX_ENUM_LEN || !MARITAL_WORDS.test(f.marital))) {
    issues.push({ field: 'marital', reason: 'unrecognised marital status' })
  }
  if (f.taxStatus && (f.taxStatus.length > MAX_ENUM_LEN || !TAX_STATUS_WORDS.test(f.taxStatus))) {
    issues.push({ field: 'taxStatus', reason: 'unrecognised tax status' })
  }
  // Phone: digits only after stripping the usual punctuation. Deliberately not
  // country-aware — these customers are from everywhere.
  if (f.whatsapp) {
    const digits = f.whatsapp.replace(/[\s()+.-]/g, '')
    if (!/^\d{7,15}$/.test(digits)) {
      issues.push({ field: 'whatsapp', reason: 'not a valid phone number' })
    }
  }

  return issues
}

/**
 * Money amounts arriving from a client, e.g. invoiceDetails[].amount.
 *
 * This one matters more than it looks: the value was written unvalidated into
 * crm_tasks.notes, and db.ts then extracts the refund figure from that same
 * free-text field by regex. An unauthenticated caller could therefore pin an
 * arbitrary refund amount onto a client's permanent record.
 *
 * Returns a normalised "1234.56" string, or null if it is not a sane amount.
 */
export function safeAmount(v: unknown): string | null {
  if (typeof v !== 'string' && typeof v !== 'number') return null
  const cleaned = String(v).replace(/[,\s$]/g, '')
  // Must actually look like a number. Number('') is 0 and Number([]) is 0, so a
  // bare Number() check would silently turn an empty field into a real amount.
  if (!/^\d+(\.\d+)?$/.test(cleaned)) return null
  const n = Number(cleaned)
  if (!Number.isFinite(n) || n < 0 || n > 1_000_000) return null
  return n.toFixed(2)
}
