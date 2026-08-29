// ============================================================
// LOST LEADS — the definition, the evidence, and the shape of the verdict.
//
// This file is deliberately pure: no store, no fetch, no clock of its own.
// Everything here is a function of rows that were passed in, so the two
// decisions that actually matter — "is this lead lost?" and "is the model's
// answer usable?" — are testable and cannot drift between the nightly job,
// the API route and the dashboard.
//
// FOR JO'S EYES ONLY. Nothing produced from this file is ever sent to a
// customer. There is no outbound path out of here by design: no draft, no
// template, no message row. It is a report.
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
import { stripDashes } from './text';

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

// ────────────────────────────────────────────────────────────
// 3. WHAT THE ANALYSIS RETURNS
//
// Structured, not prose soup. The categories are a CLOSED list on purpose: an
// aggregate is only worth reading if eleven leads land in the same bucket, and
// free-text reasons never do. `unclear` exists so the model has somewhere
// honest to put a conversation that genuinely does not say why.
// ────────────────────────────────────────────────────────────

export const LOST_CATEGORIES = [
  'price',
  'silence_after_price',
  'wanted_estimate_first',
  'trust',
  'diy',
  'competitor',
  'not_eligible',
  'we_were_slow',
  'confusing',
  'timing',
  'never_engaged',
  'unclear',
] as const;
export type LostCategory = (typeof LOST_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<LostCategory, string> = {
  price: 'The fee was the blocker',
  silence_after_price: 'Went quiet the moment they saw the price',
  wanted_estimate_first: 'Wanted the refund figure before paying',
  trust: 'Not convinced we are legitimate',
  diy: 'Decided to do it themselves',
  competitor: 'Went to someone else',
  not_eligible: 'Nothing for us to lodge',
  we_were_slow: 'We were too slow, or never answered',
  confusing: 'The process was unclear to them',
  timing: 'Right service, wrong moment',
  never_engaged: 'Never really started a conversation',
  unclear: 'The conversation does not say',
};

/** Whether anything could realistically have been done, and whether anything
 *  still can be. `NOT_OURS` is a first-class answer, not a failure to find
 *  fault — see the prompt in claude.ts. */
export type LostFault = 'OURS' | 'PARTLY_OURS' | 'NOT_OURS';
export type Recoverable = 'YES' | 'MAYBE' | 'NO';


export interface LostAnalysis {
  /** One or two sentences: why this specific lead did not convert. */
  reason: string;
  category: LostCategory;
  /** The detailed walk-through: what should have been done differently, moment
   *  by moment, or plainly that nothing should have been. This is the field Jo
   *  reads, so it keeps its paragraph breaks and is allowed real length. */
  shouldHaveDone: string;
  fault: LostFault;
  recoverable: Recoverable;
  /** The reasoning: the move that would recover them. Null when recoverable is NO. */
  recoveryAction: string | null;
  /**
   * The message to actually send them, word for word, ready for a person to
   * read, edit and send. Null when recoverable is NO.
   *
   * This is the one thing in a post-mortem that can end up in front of a
   * customer, and it never does so on its own: the button on the card raises an
   * ordinary task in Will with this as the suggested reply, and it goes out
   * only when a human presses send, through the same policy guard as anything
   * else.
   */
  recoveryMessage: string | null;
  /** The single most telling line from the conversation, quoted. Optional. */
  evidenceQuote: string | null;
  confidence: number;
}

const isNonEmptyString = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;
const clip = (v: unknown, max: number): string => String(v ?? '').trim().replace(/\s+/g, ' ').slice(0, max);

/** Like clip, but a paragraph break survives. The detailed assessment and the
 *  draft message are both written to be READ, and flattening them into one
 *  wall of text is what made the old one-line version skimmable and useless. */
const clipKeepBreaks = (v: unknown, max: number): string => String(v ?? '')
  .replace(/\r\n/g, '\n')
  .replace(/[ \t]+/g, ' ')
  .replace(/\n{3,}/g, '\n\n')
  .trim()
  .slice(0, max);

/**
 * Validate the model's JSON the way claude.ts validates its own: the shape is
 * never trusted, an unusable answer is REJECTED rather than repaired into
 * something plausible-looking, and the caller degrades instead of throwing.
 *
 * Returns null when the answer cannot be used. Null is the honest outcome —
 * an invented category would pollute the aggregate, which is the one number
 * in this report Jo is meant to act on.
 */
export function validateLostAnalysis(raw: unknown): LostAnalysis | null {
  if (!raw || typeof raw !== 'object') return null;
  const d = raw as Record<string, unknown>;

  if (!isNonEmptyString(d.reason)) return null;
  if (!isNonEmptyString(d.should_have_done)) return null;

  const category = LOST_CATEGORIES.includes(d.category as LostCategory)
    ? (d.category as LostCategory)
    : null;
  if (!category) return null; // an unknown bucket is worse than no row at all

  const fault = d.fault === 'OURS' || d.fault === 'PARTLY_OURS' || d.fault === 'NOT_OURS'
    ? (d.fault as LostFault)
    : null;
  if (!fault) return null;

  const recoverable = d.recoverable === 'YES' || d.recoverable === 'MAYBE' || d.recoverable === 'NO'
    ? (d.recoverable as Recoverable)
    : null;
  if (!recoverable) return null;

  // "Recoverable, and here is nothing you could do" is not an answer. If the
  // model claims a lead is winnable it has to say with what.
  const action = isNonEmptyString(d.recovery_action) ? stripDashes(clip(d.recovery_action, 400)) : null;
  if (recoverable !== 'NO' && !action) return null;

  // Same rule, one step further: "winnable" now has to come with the message.
  // A card that says yes and hands the owner a blank box is the card he
  // scrolls past, and the whole point of the button is that there is nothing
  // left to write.
  // The customer-facing copy-paste message: no em dash ever, Jo's standing rule.
  const message = isNonEmptyString(d.recovery_message) ? stripDashes(clipKeepBreaks(d.recovery_message, 700)) : null;
  if (recoverable !== 'NO' && !message) return null;
  // A draft that still has a placeholder in it would be refused at send time
  // anyway; rejecting it here means the card never offers it.
  if (message && /\{\{[A-Z_]+\}\}/.test(message)) return null;

  const confidence = typeof d.confidence === 'number' && d.confidence >= 0 && d.confidence <= 1
    ? d.confidence
    : null;
  if (confidence == null) return null;

  return {
    reason: stripDashes(clip(d.reason, 400)),
    category,
    shouldHaveDone: stripDashes(clipKeepBreaks(d.should_have_done, 2000)),
    fault,
    recoverable,
    // A NO answer must not carry a recovery action; dropping it here means the
    // UI never has to decide which of two contradictory fields to believe.
    recoveryAction: recoverable === 'NO' ? null : action,
    recoveryMessage: recoverable === 'NO' ? null : message,
    evidenceQuote: isNonEmptyString(d.evidence_quote) ? clip(d.evidence_quote, 240) : null,
    confidence,
  };
}

// ────────────────────────────────────────────────────────────
// 6. AGGREGATE — individually anecdotes, together a pattern
// ────────────────────────────────────────────────────────────

export interface CategoryTally {
  category: LostCategory;
  label: string;
  n: number;
  /** Whole percent of all analysed lost leads. */
  share: number;
  /** How many in this bucket the model thinks are still winnable (YES or MAYBE). */
  recoverable: number;
  /** How many in this bucket it says we actually got wrong (OURS/PARTLY_OURS). */
  ourFault: number;
}

/** Categories ranked by frequency, most common first. Ties break alphabetically
 *  so the order is stable between renders rather than depending on input order. */
export function aggregateCategories(analyses: Pick<LostAnalysis, 'category' | 'recoverable' | 'fault'>[]): CategoryTally[] {
  const total = analyses.length;
  const buckets = new Map<LostCategory, { n: number; recoverable: number; ourFault: number }>();
  for (const a of analyses) {
    if (!LOST_CATEGORIES.includes(a.category)) continue;
    const b = buckets.get(a.category) ?? { n: 0, recoverable: 0, ourFault: 0 };
    b.n++;
    if (a.recoverable === 'YES' || a.recoverable === 'MAYBE') b.recoverable++;
    if (a.fault === 'OURS' || a.fault === 'PARTLY_OURS') b.ourFault++;
    buckets.set(a.category, b);
  }
  return [...buckets.entries()]
    .map(([category, b]) => ({
      category,
      label: CATEGORY_LABELS[category],
      n: b.n,
      share: total ? Math.round((b.n / total) * 100) : 0,
      recoverable: b.recoverable,
      ourFault: b.ourFault,
    }))
    .sort((a, b) => b.n - a.n || a.category.localeCompare(b.category));
}
