// ============================================================
// What the "System & Costs" card is actually able to say — and, just as
// importantly, what it is NOT allowed to claim.
//
// Two questions, both answered from data that already exists:
//
//  1. What has Claude cost so far?
//     There is no billing feed here. The only record of paid model usage is the
//     atomic daily counter migration 029 introduced ('ai_calls:YYYY-MM-DD',
//     bumped once per decision in service.ts's aiBudgetExhausted). That is a
//     COUNT OF CALLS, not money. So this file reports the count as fact and a
//     dollar figure only as a clearly-labelled estimate at a stated rate —
//     never a number dressed up as real spend.
//
//  2. What is broken, in enough detail to act on?
//     Failures are already written to will_audit at the moment they happen,
//     with the provider's own error text attached. Grouping those rows gives
//     the component, the real error, when it last happened and how often.
//     (`lastPersistError` is deliberately NOT used: it is a module-level
//     variable in one serverless instance, so it reports whatever that one
//     instance happened to see and nothing about the others.)
// ============================================================
import type { AuditRow } from './store';

// ────────────────────────────────────────────────────────────
// Claude usage
// ────────────────────────────────────────────────────────────

/** ASSUMED price of one Will decision, in US dollars. NOT measured — read this
 *  before quoting the number to anyone.
 *
 *  Where it comes from: `decide()` in claude.ts calls claude-sonnet-4-5 with
 *  max_tokens 1024. Sonnet is priced at US$3 per million input tokens and
 *  US$15 per million output tokens. A decision carries the system prompt, the
 *  playbook, the retrieved knowledge and the conversation so far — on the order
 *  of 2,000 input tokens — and returns a short JSON decision, on the order of
 *  200 output tokens:
 *
 *      2,000 x $3/1M  = $0.0060
 *        200 x $15/1M = $0.0030
 *                       ------- ≈ $0.009, rounded to $0.01 per decision.
 *
 *  Two reasons the real invoice will differ, and the card says both out loud:
 *   - a long conversation costs more than a short one, and this is a flat rate;
 *   - only `decide()` is counted. The payment-photo vision check
 *     (assessPaymentProofImage) and the nightly knowledge mining (mineKnowledge)
 *     are real paid calls that never touch this counter.
 *
 *  If Anthropic's billing is ever wired in, delete the estimate rather than
 *  tuning this constant. */
export const ASSUMED_USD_PER_DECISION = 0.01;

export interface AiUsage {
  /** Decisions counted today (the number the daily budget is spent against). */
  callsToday: number;
  /** Every decision ever counted, across all recorded days. */
  callsTotal: number;
  /** How many days have a counter at all. */
  daysRecorded: number;
  /** Oldest / newest day with a counter, 'YYYY-MM-DD', null when there are none. */
  firstDay: string | null;
  lastDay: string | null;
  /** Today's configured cap. */
  budgetToday: number;
  /** The rate the estimate below was computed at. */
  assumedUsdPerCall: number;
  /** callsTotal x assumedUsdPerCall. An ESTIMATE. Never present it otherwise. */
  estimatedUsd: number;
  /** Always false today: no billing source is connected. Kept explicit so the
   *  UI has something to branch on if one ever is. */
  measured: false;
  /** True when the counters exist but nothing has been counted, which reads
   *  differently from "we have no idea". */
  usingMock: boolean;
}

/** Build the usage summary from the raw 'ai_calls:*' counters. Pure; no I/O. */
export function summariseAiUsage(
  counters: { key: string; value: number }[],
  opts: { todayKey: string; budgetToday: number; usingMock: boolean },
): AiUsage {
  const days = counters
    .map((c) => ({ day: c.key.slice(c.key.indexOf(':') + 1), n: Math.max(0, Math.round(c.value)) }))
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d.day))
    .sort((a, b) => a.day.localeCompare(b.day));

  const callsTotal = days.reduce((s, d) => s + d.n, 0);
  return {
    callsToday: days.find((d) => d.day === opts.todayKey)?.n ?? 0,
    callsTotal,
    daysRecorded: days.length,
    firstDay: days[0]?.day ?? null,
    lastDay: days[days.length - 1]?.day ?? null,
    budgetToday: opts.budgetToday,
    assumedUsdPerCall: ASSUMED_USD_PER_DECISION,
    estimatedUsd: Math.round(callsTotal * ASSUMED_USD_PER_DECISION * 100) / 100,
    measured: false,
    usingMock: opts.usingMock,
  };
}

// ────────────────────────────────────────────────────────────
// System faults
// ────────────────────────────────────────────────────────────

export interface SystemFault {
  /** Stable id for the fault type, so the UI can key on it. */
  key: string;
  /** The component that failed, named the way it is named everywhere else. */
  component: string;
  /** The real error text as recorded, truncated but never swallowed. */
  error: string;
  /** ISO time this last happened. */
  lastAt: string;
  /** How many times, within the audit window that was read. */
  count: number;
  /** What it means, in words that do not assume you wrote this system. */
  meaning: string;
  /** The next thing to actually do about it. */
  action: string;
  severity: 'critical' | 'warning';
}

interface FaultRule {
  key: string;
  /** Matches an audit row: `actor/action`. */
  match: (actor: string, action: string) => boolean;
  component: string;
  severity: SystemFault['severity'];
  meaning: string;
  action: string;
}

const is = (actor: string, action: string) => (a: string, b: string) => a === actor && b === action;

const FAULT_RULES: FaultRule[] = [
  {
    key: 'send_failed',
    match: is('channel', 'send_failed'),
    component: 'WhatsApp send (Meta Cloud API)',
    severity: 'critical',
    meaning: 'A reply was written and Meta refused to deliver it. The customer received nothing at all.',
    action: 'Check the WhatsApp pill in the header. The usual causes are an expired access token, a customer who has been quiet more than 24 hours (only an approved template may be sent then), or a template not approved in WhatsApp Manager. Each failure also raised a task with the message text on it, so nobody is left unanswered.',
  },
  {
    key: 'inbound_dead_letter',
    match: is('channel', 'inbound_dead_letter'),
    component: 'Inbound webhook (messages from customers)',
    severity: 'critical',
    meaning: 'A message a customer sent could not be processed after every retry. It was NOT auto-answered; it was turned into an urgent task instead.',
    action: 'Read the error below. It is the exception the webhook threw. A schema error here means a migration is missing (see the Database check in the header). Answer the task by hand in the meantime.',
  },
  {
    key: 'inbound_signature_rejected',
    match: is('channel', 'inbound_signature_rejected'),
    component: 'Webhook signature (META_APP_SECRET)',
    severity: 'critical',
    meaning: 'Meta sent a webhook and its signature did not verify, so the message was rejected at the door and never reached Will. If this is climbing, inbound messages are being lost.',
    action: 'META_APP_SECRET must be the App Secret of the exact Meta app that owns the webhook subscription. Re-copy it in Meta > App settings > Basic and redeploy.',
  },
  {
    key: 'inbound_error',
    match: is('channel', 'inbound_error'),
    component: 'Inbound webhook (retried)',
    severity: 'warning',
    meaning: 'A message from a customer failed to process and was left for Meta to redeliver. It usually succeeds on the retry; it only becomes a lost message if it ends up in the dead-letter row above.',
    action: 'A handful is normal (a transient database blip). A steady stream is the same underlying error as the dead letters and wants the same fix.',
  },
  {
    key: 'inbound_rate_limited',
    match: is('policy_guard', 'inbound_rate_limited'),
    component: 'Inbound rate limit',
    severity: 'warning',
    meaning: 'Inbound messages were dropped because one sender, or the number as a whole, exceeded the rate limit. This is the abuse guard doing its job. But a real customer caught by it gets no reply.',
    action: 'If the same masked number keeps appearing it is a loop or a spammer. If several different numbers appear, the limit is too tight for real traffic and belongs in a code change.',
  },
  {
    key: 'ai_budget_exhausted',
    match: is('policy_guard', 'ai_budget_exhausted'),
    component: 'Daily AI budget',
    severity: 'warning',
    meaning: 'The daily cap on paid Claude decisions was spent, so Will stopped deciding and handed the rest of the day to a person.',
    action: 'Raise the ai_daily_budget setting if this is real traffic. Hit on a quiet day, it means something is calling the model far more often than the conversations justify.',
  },
  {
    // (audit, 5 Sep) Added alongside ai_budget_exhausted, not replacing it:
    // bumpCounter fails closed on ANY error, and the two used to be reported
    // identically ("raise the budget") even when the RPC itself was the
    // problem (migration 029 missing, a transient Supabase error). This rule
    // only fires when the code has told the two apart.
    key: 'ai_budget_unavailable',
    match: is('policy_guard', 'ai_budget_unavailable'),
    component: 'Daily AI budget',
    severity: 'critical',
    meaning: 'The database function that guards the daily AI spend (migration 029) could not be reached, so Will failed closed and handed the rest of the day to a person — this is not a real budget cap being hit.',
    action: 'Check that migration 029 has been run and that Supabase is reachable. Read the error below for the real cause.',
  },
  {
    key: 'daily_digest_failed',
    match: (a, b) => a === 'nightly' && (b === 'daily_digest_failed' || b === 'daily_digest_crashed' || b === 'daily_digest_mine_failed'),
    component: 'Daily digest email (8am)',
    severity: 'warning',
    meaning: 'The overnight job that mines yesterday’s conversations for new Library answers, and emails them, did not complete. No customer is affected. The drafts simply were not produced.',
    action: 'Check RESEND_API_KEY and CRM_ADMIN_EMAIL are set, then read the error below. The Knowledge Base panel still works without the email.',
  },
  {
    key: 'payment_proof_check_skipped',
    match: is('system', 'payment_proof_check_skipped'),
    component: 'Payment-photo check (Claude vision)',
    severity: 'warning',
    meaning: 'A customer sent a photo while a payment was outstanding and the file could not be fetched from Meta, so it was never checked for proof of payment. It fell through to an ordinary "open this and look" task.',
    action: 'Meta deletes attachments after 30 days and the download needs a live access token. The same token as the send path. If sends are healthy and this still happens, open the chat and read the photo yourself.',
  },
  // The rules below were missing until the 5 Sep audit: every failure they
  // cover was already written to will_audit (with the error text) but the card
  // never looked for it, so a scheduler crashing on every tick, or a week of
  // out-of-window delivery failures from Meta's status callbacks, showed a
  // clean card. Grouped by component so the card stays short. Read-side only;
  // nothing about how or when the failures are raised changes (audit, 5 Sep).
  {
    key: 'delivery_failed',
    match: is('channel', 'delivery_failed'),
    component: 'WhatsApp delivery (Meta status callbacks)',
    severity: 'critical',
    meaning: 'Meta accepted a message and then reported afterwards that it could not be delivered. This is the commonest way a message fails: it never shows as a send error, only as this callback. The message shows as failed in the chat and the customer received nothing.',
    action: 'Read the error below. Code 131047 means the customer has been quiet more than 24 hours, so only an approved template may be sent (the estimate, signature and lodged buttons do that by themselves). Code 131026 means the number is not on WhatsApp. Each failure also raised an urgent task with the message text on it.',
  },
  {
    key: 'will_reply_failed',
    match: (a, b) =>
      (a === 'channel' && (b === 'auto_reply_send_failed' || b === 'payment_received_send_failed'))
      || (a === 'assistant' && b === 'auto_reply_failed'),
    component: "Will's reply",
    severity: 'critical',
    meaning: 'Will decided what to say (or a payment confirmation was due) and the reply could not be produced or sent. The customer is waiting on a message that never went.',
    action: 'Read the error below. A Meta error is the same fix as the WhatsApp rows above. Anything else is Will itself failing and wants a look at the code. A task was raised so the customer can be answered by hand.',
  },
  {
    key: 'scheduled_message_failed',
    match: (a, b) =>
      (a === 'scheduler' && (b === 'job_crashed' || b === 'job_dead_lettered' || b === 'stranded_outbound_swept'))
      || (a === 'system' && (b === 'medicare_info_failed' || b === 'review_request_failed'))
      || (a === 'assistant' && (b === 'handoff_ack_failed' || b === 'handoff_ack_crashed')),
    component: 'Scheduled messages (follow-ups, Medicare info, review requests, handoff acknowledgements)',
    severity: 'warning',
    meaning: 'A scheduled step crashed, gave up after every retry, or was found stuck part way through sending. The customer simply did not get that message; nothing wrong was sent.',
    action: 'Read the error below. One crash on its own is usually a transient database blip and the cadence carries on. A job that was dead lettered raised a task naming the customer. The same error repeating on every tick is a code fault.',
  },
  {
    key: 'scheduler_tick_failed',
    match: (a, b) => a === 'scheduler' && (b === 'tick_budget_exhausted' || b === 'tick_read_failed' || b === 'ensure_nightly_failed' || b === 'ensure_digest_failed'),
    component: 'Scheduler tick',
    severity: 'warning',
    meaning: 'The minute by minute tick that runs every scheduled message either could not read its queue, could not make sure the nightly jobs exist, or ran out of time with due jobs still waiting. Messages go out late while this continues.',
    action: 'Out of time on a busy day is fine: the rest runs on the next tick. A read failure means the database was unreachable (see the Database check in the header). Steady repeats mean the tick is taking too long and wants a look.',
  },
  {
    key: 'bookkeeping_failed',
    match: (a, b) =>
      (a === 'channel' && b === 'send_bookkeeping_failed')
      || (a === 'scheduler' && b === 'reconcile_failed_after_send')
      || (a === 'system' && b === 'message_customer_update_failed'),
    component: 'Bookkeeping after a send',
    severity: 'warning',
    meaning: 'A message did reach the customer, but the record of it (the chat log, the customer stage, or the follow-up reschedule) could not be written. The chat may look behind, or a follow-up may fire that should not.',
    action: 'Read the error below. A schema error means a migration is missing (see the Database check in the header). Open the customer named in the entry and check their stage and last message match what was actually sent.',
  },
  {
    key: 'web_form_failed',
    match: (a, b) => a === 'system' && (b === 'form_notify_failed' || b === 'public_form_failed'),
    component: 'Website tax form',
    severity: 'warning',
    meaning: 'A customer submitted the tax form on the website and either it could not be saved at all (they saw an error with a short reference code) or it was saved but Will was not told, so the form reminders may keep chasing someone who has already sent it.',
    action: 'Read the error below. If the form was saved and only the notification failed, open the customer and mark the form as received. If the save itself failed, the customer will need to send it again; the reference code in the entry matches the one on their screen.',
  },
  // A follow-up step deleted from the Library is skipped for every customer
  // (H6) and, until now, nothing said so outside the Follow-ups tab. The
  // delete action writes the owner row; the scheduler row is matched too so a
  // missing step found at send time lands on the same card (audit, 5 Sep).
  {
    key: 'follow_up_template_missing',
    match: (a, b) =>
      (a === 'owner' && b === 'follow_up_template_deleted')
      || (a === 'scheduler' && b === 'follow_up_template_missing'),
    component: 'Follow-up messages (Library)',
    severity: 'warning',
    meaning: 'One of the scheduled follow-up messages is no longer in the Library. That step is skipped for every customer who reaches it; the rest of the cadence carries on. Nothing wrong was sent.',
    action: 'Restore it with Sync library from file on the Learning tab. The entry below names the step.',
  },
];

/** The provider's own words, as recorded. Truncated at `max`, and marked so a
 *  truncated string is never mistaken for the whole error. */
function errorTextOf(detail: unknown, max = 240): string | null {
  const d = (detail ?? {}) as Record<string, unknown>;
  // `note` is what tick_budget_exhausted writes instead of an error (audit, 5 Sep).
  const raw = [d.error, d.reason, d.hint, d.detail, d.message, d.note].find((v) => typeof v === 'string' && v.trim());
  if (typeof raw !== 'string') return null;
  const clean = raw.trim().replace(/\s+/g, ' ');
  return clean.length > max ? `${clean.slice(0, max)}… (truncated)` : clean;
}

/**
 * Group the recent audit rows into the faults worth putting on a card someone
 * is going to screenshot: component, real error text, when, how often, and what
 * it means. Newest-first within severity; criticals first.
 *
 * `rows` is whatever window the caller read — the counts are "in the last N
 * audit entries", which the card says, rather than pretending to be all-time.
 */
export function faultsFromAudit(rows: AuditRow[]): SystemFault[] {
  const byKey = new Map<string, { rule: FaultRule; count: number; lastAt: string; error: string | null }>();

  for (const r of rows) {
    const rule = FAULT_RULES.find((x) => x.match(r.actor, r.action));
    if (!rule) continue;
    const existing = byKey.get(rule.key);
    const err = errorTextOf(r.detail);
    if (!existing) {
      byKey.set(rule.key, { rule, count: 1, lastAt: r.at, error: err });
      continue;
    }
    existing.count += 1;
    // Keep the newest row's timestamp and its error text: the most recent
    // failure is the one worth chasing, and an older row must not overwrite it.
    if (r.at > existing.lastAt) { existing.lastAt = r.at; existing.error = err ?? existing.error; }
    else if (!existing.error) existing.error = err;
  }

  const SEV_RANK = { critical: 0, warning: 1 };
  return [...byKey.values()]
    .map(({ rule, count, lastAt, error }) => ({
      key: rule.key,
      component: rule.component,
      // Some failures genuinely carry no text (a rate limit is not an error
      // string). Say so rather than rendering an empty line.
      error: error ?? 'No error text was recorded for this one. The entry itself is the signal.',
      lastAt,
      count,
      meaning: rule.meaning,
      action: rule.action,
      severity: rule.severity,
    }))
    .sort((a, b) => SEV_RANK[a.severity] - SEV_RANK[b.severity] || b.lastAt.localeCompare(a.lastAt));
}

// ────────────────────────────────────────────────────────────
// Dismissing a fault card (Jo, 6 Sep): "I've dealt with this, let me clear it"
// ────────────────────────────────────────────────────────────

/** Setting key: when this fault key was last dismissed by the owner. A fault
 *  is a live grouping of recent audit rows, not a row of its own, so there is
 *  nothing to delete — dismissing it means "hide this UNTIL IT HAPPENS AGAIN",
 *  recorded as a timestamp and compared against the fault's own `lastAt` on
 *  every read. A fresh occurrence after the dismissal has a newer `lastAt`
 *  than the dismissal time, so it reappears on its own; nothing dismissed
 *  can ever hide a genuinely new failure. */
export const faultDismissedKey = (key: string) => `fault_dismissed:${key}`;

/**
 * Drop any fault whose most recent occurrence is at or before when the owner
 * last dismissed it. `dismissedAt` is keyed by fault `key`, ISO strings or
 * null/undefined for "never dismissed".
 */
export function applyFaultDismissals(
  faults: SystemFault[],
  dismissedAt: Record<string, string | null | undefined>,
): SystemFault[] {
  return faults.filter((f) => {
    const at = dismissedAt[f.key];
    if (!at) return true;
    return new Date(f.lastAt).getTime() > new Date(at).getTime();
  });
}
