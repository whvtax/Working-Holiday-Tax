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
import { CustomerRow, StateHistoryRow, MessageRow } from './store';
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
  /** Of the `paid`, how many paid AND completed the questionnaire with Will
   *  alone: not one message written by a person in the chat up to the moment
   *  the questionnaire was in (Jo, 4 Sep). */
  willOnly: number;
  /** Whole percent of `paid`, 0 when nobody paid. */
  willOnlyRate: number;
}

const FORM_DONE = new Set<CustomerState>([
  'FORM_COMPLETE', 'DOCUMENTS_COMPLETE', 'UNDER_REVIEW', 'ESTIMATE_READY',
  'FINAL_REVIEW', 'SIGNATURE_PENDING', 'SIGNED', 'LODGED', 'COMPLETED',
]);

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
 * Conversion by month, NEWEST FIRST, beginning at the first month that ever
 * had a lead. See the definition of a month's number at the top of this file —
 * that part is unchanged; this is only about which rows come back and in what
 * order.
 *
 * Both are Jo's call, 27 Aug: "August is the first month and it should be the
 * first row. Every month a new one opens, forever — the current month at the
 * top, last month drops down a row, and so on."
 *
 *   NEWEST FIRST. The month he is living in is the one he checks, and it was
 *   sitting at the bottom of a twelve-row list under eleven rows of nothing.
 *   It is now the first row under the heading and it stays there — same
 *   position every day, so the number is where his eye already is.
 *
 *   NOTHING BEFORE THE FIRST LEAD. The eleven months above August were not bad
 *   months; the system did not exist yet. "No leads" against them states a fact
 *   about our own history as if it were a fact about the business. The list now
 *   starts where the data starts and grows by one row a month from there. A
 *   quiet month AFTER that point is kept, because that one is real — it is the
 *   difference between "nothing happened" and "we weren't here yet".
 *
 * The current month is always present, even before its first lead, so the
 * panel is never empty on the 1st.
 *
 * `months` is still the far edge of the window rather than a row count: it caps
 * how far back this looks, so the list cannot grow without bound in year ten.
 */
export function monthlyConversion(
  customers: CustomerRow[],
  history: StateHistoryRow[],
  now: Date = new Date(),
  months = 12,
  /** Every message in the system (only HUMAN-authored ones are looked at).
   *  Optional: without it willOnly is 0 for every month. */
  messages: MessageRow[] = [],
): MonthConversion[] {
  // Everyone who ever reached a post-payment state, from the transition log,
  // and the moment each customer's questionnaire first counted as in.
  const everPaid = new Set<string>();
  const formDoneAt = new Map<string, number>();
  for (const h of history) {
    if (POST_PAYMENT.has(h.to)) everPaid.add(h.customerId);
    if (FORM_DONE.has(h.to)) {
      const t = new Date(h.createdAt).getTime();
      const prev = formDoneAt.get(h.customerId);
      if (!Number.isNaN(t) && (prev === undefined || t < prev)) formDoneAt.set(h.customerId, t);
    }
  }
  // The first time a person (not Will) wrote in each chat.
  const firstHumanAt = new Map<string, number>();
  for (const m of messages) {
    if (m.author !== 'HUMAN' || m.direction !== 'OUT') continue;
    if (m.status === 'DISCARDED' || m.status === 'BLOCKED') continue;
    const t = new Date(m.createdAt).getTime();
    if (Number.isNaN(t)) continue;
    const prev = firstHumanAt.get(m.customerId);
    if (prev === undefined || t < prev) firstHumanAt.set(m.customerId, t);
  }
  // "Will did it all": paid, questionnaire in, and nobody from the team had
  // written in the chat by the time the questionnaire arrived. Where the
  // questionnaire's moment is unknown (an older customer with no transition
  // row), any human message at all disqualifies, which is the strict reading.
  const willOnly = (c: CustomerRow): boolean => {
    const formIn = c.formComplete || FORM_DONE.has(c.state) || formDoneAt.has(c.id);
    if (!formIn) return false;
    const human = firstHumanAt.get(c.id);
    if (human === undefined) return true;
    const done = formDoneAt.get(c.id);
    return done !== undefined && human > done;
  };

  const buckets = new Map<string, { leads: number; paid: number; willOnly: number }>();
  for (const key of recentMonthKeys(now, months)) buckets.set(key, { leads: 0, paid: 0, willOnly: 0 });

  for (const c of customers) {
    const key = melbourneMonthKey(c.createdAt ?? '');
    const bucket = buckets.get(key);
    if (!bucket) continue; // outside the window we are reporting on
    bucket.leads++;
    // `paid` on the row is the authority for "they paid"; the history covers a
    // customer who was moved straight to a later stage without a PAID row.
    if (c.paid || everPaid.has(c.id) || POST_PAYMENT.has(c.state)) {
      bucket.paid++;
      if (willOnly(c)) bucket.willOnly++;
    }
  }

  const oldestFirst = [...buckets.entries()].map(([month, b]) => ({
    month,
    label: labelFor(month),
    leads: b.leads,
    paid: b.paid,
    rate: b.leads ? Math.round((b.paid / b.leads) * 100) : 0,
    willOnly: b.willOnly,
    willOnlyRate: b.paid ? Math.round((b.willOnly / b.paid) * 100) : 0,
  }));

  // Cut everything before the first month that had a lead. `findIndex` returns
  // -1 when no month in the window had one at all (a brand-new system, or a
  // genuinely empty year) — in that case the list is just the current month,
  // which is the last entry of the oldest-first window.
  const first = oldestFirst.findIndex((m) => m.leads > 0);
  const fromFirstLead = first === -1 ? oldestFirst.slice(-1) : oldestFirst.slice(first);
  return fromFirstLead.reverse();
}
