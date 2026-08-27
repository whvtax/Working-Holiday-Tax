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
];

/** The provider's own words, as recorded. Truncated at `max`, and marked so a
 *  truncated string is never mistaken for the whole error. */
function errorTextOf(detail: unknown, max = 240): string | null {
  const d = (detail ?? {}) as Record<string, unknown>;
  const raw = [d.error, d.reason, d.hint, d.detail, d.message].find((v) => typeof v === 'string' && v.trim());
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
