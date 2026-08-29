// ============================================================
// The Australian tax year. One definition.
//
// WHY THIS FILE EXISTS. For a tax business the 1 July boundary is the most
// load-bearing date there is, and it had eight independent implementations
// across `db.ts`, both dashboards, the client page and the public form. They
// fell into two groups that disagree with each other for ten hours every 1 July:
//
//   * anchored to Australia/Sydney, which is correct, and
//   * `new Date().getMonth() >= 6`, which is whatever timezone the machine or
//     the visitor's browser happens to be in.
//
// Two of them were worse than duplicated: they were evaluated at module scope,
// once, when the bundle loaded. A CRM tab left open across 1 July kept serving
// last year's tax-year list until somebody hard-reloaded it.
//
// Every one of those failures lands in the first week of July, which is the
// busiest week of the year, and every one of them is silent: a return filed
// against the wrong year, a "Filed" badge resetting a day early, a yearly
// check-in view targeting the wrong cohort. Nothing throws. You hear it from a
// client.
//
// The Sydney-anchored version below is `db.ts`'s, unchanged. This file is where
// it now lives so there is one answer to the question.
// ============================================================

/** The AU financial year that is current RIGHT NOW, e.g. "2025-26".
 *  Always computed in Australia/Sydney, never in the caller's timezone. */
export function currentTaxYear(): string {
  const sydney = new Date(new Date().toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));
  const y = sydney.getFullYear();
  return sydney.getMonth() >= 6
    ? `${y}-${String(y + 1).slice(2)}`
    : `${y - 1}-${String(y).slice(2)}`;
}

/** The calendar year the current AU tax year STARTED in. */
export function currentTaxYearStart(): number {
  return parseInt(currentTaxYear().split('-')[0], 10);
}

/**
 * The dropdown range, newest first.
 *
 * Newest first because that is what someone reaches for: the year they are
 * lodging now, not one five years back. The two CRM screens built this same
 * eleven-year list in opposite orders, so the same control was sorted
 * differently depending on which screen you were on.
 *
 * Call this at RENDER time, never at module scope. A value frozen when the
 * bundle loaded is exactly the bug this file was written to end.
 */
export function taxYearRange(back = 5, forward = 5): string[] {
  const start = currentTaxYearStart();
  const out: string[] = [];
  for (let y = start + forward; y >= start - back; y--) {
    out.push(`${y}-${String(y + 1).slice(2)}`);
  }
  return out;
}

/** The most recently COMPLETED tax year: the one people actually lodge for. */
export function lastCompletedTaxYear(): string {
  const start = currentTaxYearStart() - 1;
  return `${start}-${String(start + 1).slice(2)}`;
}
