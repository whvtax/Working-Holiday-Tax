// ============================================================
// LOST LEADS — the definition, the evidence, and the shape of the verdict.
//
// This file is deliberately pure: no store, no fetch, no clock of its own.
// Everything here is a function of rows that were passed in, so the two
// decisions that actually matter — "is this lead lost?" and "is the model's
// answer usable?" — are testable and cannot drift between the nightly job,
// the API route and the dashboard.
//
// Since 25 Oct (Jo) this feeds the automatic win-back (winback-auto.ts):
// the timing and the "why they are closed" line go into the evidence Will
// reads 30 days after a lead closed. The post-mortem report, its categories
// and its tab were retired.
//
// ────────────────────────────────────────────────────────────────────────────
// 1. WHO COUNTS AS LOST  (the conservative definition)
//
// The cost of the two mistakes is not symmetric. Calling a live lead "lost"
// puts a post-mortem on someone who is still deciding, and teaches Jo that the
// report is wrong. Missing one costs a night: it gets picked up tomorrow.
// So every rule below errs towards "not lost yet".
//
// A customer is LOST when they have NEVER paid and one of these is true:
//
//   declined     state = NOT_INTERESTED. They said no. Definitive, no waiting
//                period needed — the decision has already been made.
//
//   opted_out    optedOut = true. They asked us to stop messaging. Same:
//                definitive, and the most important kind to learn from.
//
//   auto_closed  state = WENT_COLD. The scheduler only sets this after the
//                entire pre-payment cadence (24h / 3d / 7d) plus a further
//                7 days of silence — 14 days of us trying. That IS the
//                system's own considered verdict; this report agrees with it.
//
//   silent       Still sitting in a sales state (NEW_LEAD, QUALIFIED,
//                PRICE_SENT, PAYMENT_PENDING) with no word from the customer
//                for SILENCE_DAYS_UNTIL_LOST days. This exists because the
//                auto-close does NOT fire for everyone: it is skipped for
//                aiPaused, isLegacy and opted-out customers, and it never
//                runs at all while the kill switch is on. Those leads sit in
//                PRICE_SENT forever with nobody counting them.
//
//                21 days is a full week past the point the system would have
//                closed them on its own. It is not "a lead who arrived an hour
//                ago", and it is not even "a lead who went quiet last week".
//
// NOT lost, deliberately:
//
//   paid / ever post-payment   The sales flow is over and it was won. A refund
//                              or a complaint later is a different report.
//
//   NOT_RELEVANT               Wrong number, spam, a supplier, an existing
//                              client of the firm. Nothing was lost because
//                              nothing was ever there — and paying a model to
//                              write "this was a wrong number" 40 times is how
//                              a report earns the right to be ignored.
//
//   isLegacy                   Pre-existing contacts deliberately kept out of
//                              Will. We do not hold their conversation, so any
//                              post-mortem would be written from an empty
//                              transcript, which is worse than none.
//
// ────────────────────────────────────────────────────────────────────────────
// 2. WHAT THE ANALYSIS SEES
//
// The whole conversation, the state history with its timestamps, and the
// timing summary below. The timing is the part that is usually the entire
// story: a lead who read the price and never typed again is a different
// failure from one who argued about it for three days.
// ============================================================
import type { CustomerRow, MessageRow, StateHistoryRow } from './store';
import { CustomerState, POST_PAYMENT_STATES, STATE_LABELS } from './state-machine';

/** Days of customer silence, in a live sales state, before a lead is written
 *  off. One full week beyond the 14 days the auto-close would have taken. */
export const SILENCE_DAYS_UNTIL_LOST = 21;

const SALES_STATES: CustomerState[] = ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING'];
const POST_PAYMENT = new Set<CustomerState>(POST_PAYMENT_STATES);

export type LostTrigger = 'declined' | 'opted_out' | 'auto_closed' | 'silent';

export const TRIGGER_LABELS: Record<LostTrigger, string> = {
  declined: 'Said no',
  opted_out: 'Asked us to stop',
  auto_closed: 'Closed as cold',
  silent: 'Went quiet',
};

export interface LostVerdict {
  lost: boolean;
  trigger: LostTrigger | null;
  /** Whole days since the customer last said anything (0 if they never did). */
  quietDays: number;
  /** Plain-English why, for the report and for anyone reading the code. */
  why: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** The instant we last heard from this customer, falling back through the
 *  progressively weaker signals so a row with missing timestamps is treated as
 *  RECENT (i.e. not lost) rather than as ancient. */
function lastHeardFrom(c: CustomerRow): number | null {
  const candidates = [c.lastCustomerMsgAt, c.lastMessageAt, c.stateChangedAt, c.createdAt];
  for (const iso of candidates) {
    if (!iso) continue;
    const t = new Date(iso).getTime();
    if (Number.isFinite(t)) return t;
  }
  return null;
}

/** THE definition. See the header of this file for why each rule is what it is. */
export function lostVerdict(c: CustomerRow, now: Date = new Date()): LostVerdict {
  const quietFrom = lastHeardFrom(c);
  const quietDays = quietFrom == null ? 0 : Math.max(0, Math.floor((now.getTime() - quietFrom) / DAY_MS));
  const no = (why: string): LostVerdict => ({ lost: false, trigger: null, quietDays, why });

  // Won, or in progress. Never a lost lead.
  if (c.paid || POST_PAYMENT.has(c.state)) return no('paid — this lead converted');
  // Never a lead in the first place.
  if (c.state === 'NOT_RELEVANT') return no('marked not relevant — never a real lead');
  // We do not hold their conversation, so there is nothing to post-mortem.
  if (c.isLegacy) return no('legacy contact — kept out of Will, no conversation on file');

  if (c.optedOut) {
    return { lost: true, trigger: 'opted_out', quietDays, why: 'asked us to stop messaging' };
  }
  if (c.state === 'NOT_INTERESTED') {
    return { lost: true, trigger: 'declined', quietDays, why: 'told us no' };
  }
  if (c.state === 'WENT_COLD') {
    return { lost: true, trigger: 'auto_closed', quietDays, why: 'closed as cold after the full follow-up cadence' };
  }
  if (SALES_STATES.includes(c.state)) {
    if (quietFrom == null) return no('no timestamps on this lead — treated as live, not lost');
    if (quietDays >= SILENCE_DAYS_UNTIL_LOST) {
      return {
        lost: true, trigger: 'silent', quietDays,
        why: `no word for ${quietDays} days while still in ${STATE_LABELS[c.state]}`,
      };
    }
    return no(`quiet for ${quietDays} of the ${SILENCE_DAYS_UNTIL_LOST} days needed — still live`);
  }
  return no(`state ${c.state} is not a sales state and not a loss`);
}

/** Everyone in `customers` who is demonstrably lost, with the reason they are. */
export function selectLostLeads(
  customers: CustomerRow[],
  now: Date = new Date(),
): { customer: CustomerRow; verdict: LostVerdict }[] {
  return customers
    .map((customer) => ({ customer, verdict: lostVerdict(customer, now) }))
    .filter((r) => r.verdict.lost);
}

// ────────────────────────────────────────────────────────────
// Timing — usually the whole story
// ────────────────────────────────────────────────────────────

export interface LeadTiming {
  /** When the price actually reached them, from the state history. */
  priceSentAt: string | null;
  /** The customer's own last message. */
  lastCustomerMsgAt: string | null;
  /** Hours between the price landing and the last word they ever said. 0 when
   *  they never spoke again after seeing it — which is the finding. */
  hoursPriceToSilence: number | null;
  /** How many times the customer replied AFTER the price. Zero plus a
   *  priceSentAt is the "read the number and vanished" signature. */
  repliesAfterPrice: number;
  /** Messages we sent after their last word (how hard we chased). */
  ourMessagesAfterTheirLastWord: number;
  /** Whole days of silence at the moment the report was written. */
  quietDays: number;
}

const asTime = (iso: string | null | undefined): number | null => {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  return Number.isFinite(t) ? t : null;
};

export function leadTiming(
  c: CustomerRow,
  messages: MessageRow[],
  history: StateHistoryRow[],
  now: Date = new Date(),
): LeadTiming {
  // The FIRST time they were quoted; a re-quote later is a different event and
  // the first one is what they reacted to.
  const priceRow = [...history]
    .filter((h) => h.to === 'PRICE_SENT')
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))[0] ?? null;
  const priceSentAt = priceRow?.createdAt ?? null;
  const priceMs = asTime(priceSentAt);

  // Only messages the customer actually received/sent count as conversation:
  // a discarded or blocked draft was never part of their experience.
  const real = messages.filter((m) => m.status === 'SENT');
  const inbound = real.filter((m) => m.direction === 'IN');
  const lastIn = inbound.length ? inbound[inbound.length - 1] : null;
  const lastCustomerMsgAt = lastIn?.createdAt ?? c.lastCustomerMsgAt ?? null;
  const lastInMs = asTime(lastCustomerMsgAt);

  const repliesAfterPrice = priceMs == null
    ? 0
    : inbound.filter((m) => (asTime(m.createdAt) ?? 0) > priceMs).length;

  const ourMessagesAfterTheirLastWord = lastInMs == null
    ? real.filter((m) => m.direction === 'OUT').length
    : real.filter((m) => m.direction === 'OUT' && (asTime(m.createdAt) ?? 0) > lastInMs).length;

  const hoursPriceToSilence = priceMs != null && lastInMs != null
    ? Math.max(0, Math.round(((lastInMs - priceMs) / 3600_000) * 10) / 10)
    : null;

  const quietFrom = lastInMs ?? lastHeardFrom(c);
  const quietDays = quietFrom == null ? 0 : Math.max(0, Math.floor((now.getTime() - quietFrom) / DAY_MS));

  return {
    priceSentAt, lastCustomerMsgAt, hoursPriceToSilence,
    repliesAfterPrice, ourMessagesAfterTheirLastWord, quietDays,
  };
}
