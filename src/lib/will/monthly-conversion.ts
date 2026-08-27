// ============================================================
// Month-by-month lead → paid conversion.
//
// THE DEFINITION (Jo, 26 Aug — one definition, used everywhere)
//
//   A customer belongs to the calendar month they FIRST APPEARED in: the
//   Melbourne month of will_customers.created_at. That is the month the lead
//   arrived, and it never moves, so once August ends, August's cohort is fixed
//   and the number printed for August can never change again.
//
//   A customer in that cohort COUNTS AS CONVERTED if they ever reached paid —
//   either they are marked paid now, or will_state_history records a transition
//   into any post-payment state (PAID … COMPLETED). Reaching paid in a LATER
//   month still counts for the month they arrived in: the question this answers
//   is "of the leads that came in during July, how many became customers", not
//   "how much money landed in July". A lead who arrives on the 30th and pays on
//   the 2nd is a July win, and counting them in August would flatter August and
//   punish July for the calendar.
//
//   rate = round(paid / leads * 100), and a month with no leads reports
//   leads: 0, paid: 0, rate: 0 (the UI shows "no leads" rather than "0%").
//
// Nothing is stored: every number is recomputed from the customers and the
// state history each time it is asked for. There is deliberately no running
// counter that "resets on the 1st" — a stored counter drifts, cannot be
// recomputed after a correction, and loses every month before the last reset.
// ============================================================
import { CustomerRow, StateHistoryRow } from './store';
import { POST_PAYMENT_STATES, CustomerState } from './state-machine';

const MELBOURNE = 'Australia/Melbourne';

export interface MonthConversion {
  /** Sortable key, e.g. '2026-08'. */
  month: string;
  /** Human label, e.g. 'Aug 2026'. */
  label: string;
  /** Customers who first appeared in this month. */
  leads: number;
  /** How many of those leads ever reached paid. */
  paid: number;
  /** Whole percent, 0 when there were no leads. */
  rate: number;
}

/** 'YYYY-MM' for an instant, read in the business's own timezone. */
export function melbourneMonthKey(iso: string | Date): string {
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  if (Number.isNaN(d.getTime())) return '';
  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric', month: '2-digit', timeZone: MELBOURNE,
  }).formatToParts(d);
  const y = parts.find((p) => p.type === 'year')?.value ?? '';
  const m = parts.find((p) => p.type === 'month')?.value ?? '';
  return y && m ? `${y}-${m}` : '';
}

/** 'Aug 2026' from a 'YYYY-MM' key. */
function labelFor(key: string): string {
  const [y, m] = key.split('-').map(Number);
  if (!y || !m) return key;
  // Noon UTC on the 15th is safely inside the month in every timezone.
  return new Date(Date.UTC(y, m - 1, 15, 12)).toLocaleDateString('en-AU', {
    month: 'short', year: 'numeric', timeZone: 'UTC',
  });
}

/** The last `count` month keys ending with the month `now` falls in, oldest first. */
export function recentMonthKeys(now: Date, count: number): string[] {
  const current = melbourneMonthKey(now);
  const [y, m] = current.split('-').map(Number);
  const keys: string[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(Date.UTC(y, m - 1 - i, 15, 12));
    keys.push(`${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`);
  }
  return keys;
}

const POST_PAYMENT = new Set<CustomerState>(POST_PAYMENT_STATES);

/**
 * Conversion for the last `months` calendar months, oldest first.
 * See the definition at the top of this file.
 */
export function monthlyConversion(
  customers: CustomerRow[],
  history: StateHistoryRow[],
  now: Date = new Date(),
  months = 12,
): MonthConversion[] {
  // Everyone who ever reached a post-payment state, from the transition log.
  const everPaid = new Set<string>();
  for (const h of history) {
    if (POST_PAYMENT.has(h.to)) everPaid.add(h.customerId);
  }

  const buckets = new Map<string, { leads: number; paid: number }>();
  for (const key of recentMonthKeys(now, months)) buckets.set(key, { leads: 0, paid: 0 });

  for (const c of customers) {
    const key = melbourneMonthKey(c.createdAt ?? '');
    const bucket = buckets.get(key);
    if (!bucket) continue; // outside the window we are reporting on
    bucket.leads++;
    // `paid` on the row is the authority for "they paid"; the history covers a
    // customer who was moved straight to a later stage without a PAID row.
    if (c.paid || everPaid.has(c.id) || POST_PAYMENT.has(c.state)) bucket.paid++;
  }

  return [...buckets.entries()].map(([month, b]) => ({
    month,
    label: labelFor(month),
    leads: b.leads,
    paid: b.paid,
    rate: b.leads ? Math.round((b.paid / b.leads) * 100) : 0,
  }));
}
