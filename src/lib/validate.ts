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

/** Plausible date of birth: a valid date, 1940 or later, at least 15 years ago. */
export const isPlausibleDob = (v: string): boolean => {
  const d = new Date(v)
  if (isNaN(d.getTime())) return false
  if (d.getFullYear() < 1940) return false
  const fifteenYearsAgo = new Date()
  fifteenYearsAgo.setFullYear(fifteenYearsAgo.getFullYear() - 15)
  return d <= fifteenYearsAgo
}
