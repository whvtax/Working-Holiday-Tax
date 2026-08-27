/**
 * Light client-side format checks shared by the four intake forms.
 * Presence ("required") stays in each form; these only judge format once a
 * value exists. Deliberately permissive - the goal is catching obvious typos
 * (missing @, a 3-digit TFN, a future birth date), not strict RFC rules.
 */

export const isValidEmail = (v: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

/** A TFN is 8 or 9 digits (spaces/dashes in the input are tolerated). */
export const isValidTfn = (v: string): boolean =>
  /^\d{8,9}$/.test(v.replace(/[\s-]/g, ''))

/** Earliest year `isPlausibleDob` will accept. */
const DOB_MIN_YEAR = 1940
/** A date of birth must be at least this many years ago. */
const DOB_MIN_AGE_YEARS = 15

/** Plausible date of birth: a valid date, 1940 or later, at least 15 years ago. */
export const isPlausibleDob = (v: string): boolean => {
  const d = new Date(v)
  if (isNaN(d.getTime())) return false
  if (d.getFullYear() < DOB_MIN_YEAR) return false
  const cutoff = new Date()
  cutoff.setFullYear(cutoff.getFullYear() - DOB_MIN_AGE_YEARS)
  return d <= cutoff
}

/**
 * `min` / `max` for a `<input type="date">` date-of-birth field, as the exact
 * same range `isPlausibleDob` accepts.
 *
 * Without these the native picker opens on today — the one date a birth date can
 * never be — so on mobile every customer starts by scrolling back decades. With
 * `max` set, the picker opens at the newest allowed date instead, and a date the
 * form would reject anyway can no longer be picked in the first place.
 */
export const dobInputRange = (): { min: string; max: string } => {
  const cutoff = new Date()
  cutoff.setFullYear(cutoff.getFullYear() - DOB_MIN_AGE_YEARS)
  return { min: `${DOB_MIN_YEAR}-01-01`, max: cutoff.toISOString().slice(0, 10) }
}
