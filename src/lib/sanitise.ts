/**
 * Sanitise a user-supplied string field:
 *  - Coerce null/undefined to empty string
 *  - Trim whitespace
 *  - Cap length to prevent DB bloat / payload attacks
 */
export function sanitiseField(value: unknown, maxLength = 500): string {
  if (value == null) return ''
  return String(value).trim().slice(0, maxLength)
}

/** Shorthand for fields that should be shorter (names, codes, years) */
export function sanitiseShort(value: unknown): string {
  return sanitiseField(value, 100)
}
