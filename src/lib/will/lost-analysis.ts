// ============================================================
// The nightly Lost Leads job — a sibling of daily-digest.ts.
//
// WHAT IT IS FOR
//   Every night, find the leads that are demonstrably not converting (the
//   definition lives in lost-leads.ts and nowhere else), read each one's whole
//   conversation, and write an expert post-mortem: why this one did not
//   convert, what should have been done differently, and whether it can still
//   be recovered. The result is STORED (migration 031). The dashboard and
//   /api/will/lost only ever read what this job wrote.
//
// WHY IT IS BATCHED AND NOT ON DEMAND
//   Analysing eighty-nine customers when the owner opens a tab is a minute of
//   spinner and a fresh bill every time — and a different answer on every load,
//   so a finding he read yesterday could not be found again today. Analysed
//   once, stored, and read instantly: the report is a document, not a query.
//
// HOW IT PROTECTS THE MONEY
//   Every single model call claims a slot from the SAME atomic daily counter
//   the live reply path spends against (ai-budget.ts, migration 029). If the
//   budget is exhausted the job STOPS and records that it stopped — it never
//   quietly keeps spending, and it never pretends it finished. Whatever it did
//   not reach is simply picked up the next night.
//
//   There is also a hard per-night ceiling (MAX_PER_NIGHT) so that the first
//   run against a long-standing backlog cannot spend the entire daily budget in
//   one go and leave real customers talking to a fallback.
//
// WHAT IT WILL NEVER DO
//   Write a message, draft a reply, create a template, or touch a customer's
//   state. It writes exactly one kind of row (will_lost_analysis) plus audit
//   entries. This is a report for Jo and there is no path out of it to a
//   customer, by construction.
// ============================================================
import { getStore, CustomerRow, LostAnalysisRow } from './store';
import { STATE_LABELS } from './state-machine';
import { analyseLostLead, LostLeadEvidence } from './claude';
import { selectLostLeads, leadTiming, lostVerdict, TRIGGER_LABELS, LeadTiming } from './lost-leads';
import { redactSensitive, shortLabel } from './digest';
import { aiBudgetExhausted } from './ai-budget';

const MELBOURNE = 'Australia/Melbourne';

/** Most leads analysed in a single night. The first run against a backlog of
 *  eighty-nine would otherwise be eighty-nine paid calls in one burst. At this
 *  rate a backlog clears inside a week and the steady state (a handful of newly
 *  lost leads a night) is reached on the first run anyway. */
export const MAX_PER_NIGHT = 25;

/** How long one pass will keep making calls before it stops and asks to be
 *  resumed. The tick that runs this is ONE serverless invocation with a hard
 *  60s ceiling (`maxDuration` on /api/will/tick) and a 45s self-imposed budget;
 *  a model call here can take up to 45s on its own. So this pass must end well
 *  inside that and let the next tick continue — which it can do safely, because
 *  each lead's row is written as soon as it is analysed and `needsAnalysis`
 *  skips whatever is already done. Overridable by the caller, which passes
 *  whatever is left of the tick's own budget. */
export const DEFAULT_PASS_BUDGET_MS = 25_000;

/** How many times a failed analysis is retried before it is left alone and
 *  simply shown to the owner as "could not be analysed". Same reasoning as the
 *  job retry cap in the scheduler: a permanently unanalysable conversation must
 *  not be paid for every night forever. */
export const MAX_ATTEMPTS = 3;

/** A failed row is not retried until it has had a night to settle, so one bad
 *  evening does not burn all three attempts in the same run. */
const RETRY_AFTER_MS = 20 * 60 * 60 * 1000;

/** Messages of the conversation handed to the model. Enough for the whole of a
 *  normal lead conversation; a pathological thread is trimmed from the start,
 *  keeping the end, because the end is where they left. */
const MAX_TRANSCRIPT_MESSAGES = 60;

const AUTHOR_LABEL: Record<string, string> = {
  CUSTOMER: 'Customer', AI: 'Will', HUMAN: 'Team', SYSTEM: 'System',
};

/** Which leads still need a post-mortem: never analysed, or analysed and
 *  failed with attempts left and a night's cooling-off. */
export function needsAnalysis(
  lost: { customer: CustomerRow }[],
  existing: LostAnalysisRow[],
  now: Date,
): CustomerRow[] {
  const byId = new Map(existing.map((r) => [r.customerId, r]));
  return lost
    .map((l) => l.customer)
    .filter((c) => {
      const row = byId.get(c.id);
      if (!row) return true;                 // never analysed
      if (row.status === 'OK') return false;  // done, and answers do not expire
      if (row.attempts >= MAX_ATTEMPTS) return false;
      const age = now.getTime() - new Date(row.analysedAt).getTime();
      return !Number.isFinite(age) || age >= RETRY_AFTER_MS;
    });
}

/** The timing paragraph the model reads. Written out in words because the
 *  gap between the price and the silence is usually the entire story, and a
 *  raw number in a JSON blob does not read as one. */
export function timingSummary(t: LeadTiming): string {
  const lines: string[] = [];
  if (!t.priceSentAt) {
    lines.push('No price was ever sent to this lead.');
  } else if (t.repliesAfterPrice === 0) {
    lines.push(`The price was sent on ${t.priceSentAt}. The customer never sent another message after it.`);
  } else {
    const hrs = t.hoursPriceToSilence;
    const gap = hrs == null ? 'an unknown time'
      : hrs < 1 ? 'under an hour'
      : hrs < 48 ? `about ${Math.round(hrs)} hours`
      : `about ${Math.round(hrs / 24)} days`;
    lines.push(`The price was sent on ${t.priceSentAt}. The customer replied ${t.repliesAfterPrice} time(s) after it, and their last message came ${gap} after the price.`);
  }
  lines.push(`Their last message was ${t.lastCustomerMsgAt ?? 'never — they never sent one'}, which is ${t.quietDays} day(s) of silence.`);
  lines.push(`We sent ${t.ourMessagesAfterTheirLastWord} message(s) after their last word.`);
  return lines.join('\n');
}

/** Everything the model is allowed to see about one lost lead. The conversation
 *  is redacted first: this text is stored in the report for months, and there
 *  is no reason a post-mortem needs a TFN or a bank account in it. */
export async function buildEvidence(c: CustomerRow, now: Date): Promise<{ evidence: LostLeadEvidence; timing: LeadTiming }> {
  const store = getStore();
  const [messages, history] = await Promise.all([
    store.listMessages(c.id).catch(() => []),
    store.history(c.id).catch(() => []),
  ]);

  const timing = leadTiming(c, messages, history, now);

  // Only what the customer actually experienced. A discarded draft, a
  // guard-blocked reply or a failed send was never part of the conversation
  // and would make the post-mortem describe messages nobody received.
  const real = messages
    .filter((m) => m.status === 'SENT')
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
    .slice(-MAX_TRANSCRIPT_MESSAGES);

  const transcript = real.map((m) => {
    const who = AUTHOR_LABEL[m.author] ?? (m.direction === 'IN' ? 'Customer' : 'Us');
    const media = m.meta?.media ? ` [sent a ${m.meta.media.kind}]` : '';
    return `[${m.createdAt}] ${who}: ${redactSensitive(m.body ?? '')}${media}`;
  }).join('\n');

  const stateHistory = [...history]
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
    .map((h) => `[${h.createdAt}] ${h.from ?? 'start'} -> ${h.to} (by ${h.causedBy})`)
    .join('\n');

  const verdict = lostVerdict(c, now);

  return {
    timing,
    evidence: {
      label: shortLabel(c.name, c.waId),
      stateLabel: STATE_LABELS[c.state] ?? c.state,
      lostBecause: `${verdict.trigger ? TRIGGER_LABELS[verdict.trigger] : 'unknown'} — ${verdict.why}`,
      income: c.income,
      lang: c.lang,
      timingSummary: timingSummary(timing),
      transcript,
      stateHistory,
    },
  };
}

export interface LostRunSummary {
  /** 'YYYY-MM-DD' in Melbourne — the night this run belongs to. */
  day: string;
  ranAt: string;
  /** Lost leads found in total (analysed or not). */
  lostTotal: number;
  /** Post-mortems written successfully in this run. */
  analysed: number;
  /** Attempts that failed and were recorded as ERROR rows. */
  failed: number;
  /** Still waiting for a post-mortem when this run stopped. */
  remaining: number;
  /** True when the run stopped because the daily AI budget was spent. The UI
   *  says so out loud rather than showing a quietly incomplete report. */
  budgetExhausted: boolean;
  /** True when the pass ran out of wall-clock time inside the tick and asked to
   *  be resumed. Not a failure — the next tick picks up exactly where it left
   *  off, because every finished lead is already stored. */
  incomplete: boolean;
}

function melbourneDayKey(d: Date): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric', month: '2-digit', day: '2-digit', timeZone: MELBOURNE,
  }).formatToParts(d);
  const y = parts.find((p) => p.type === 'year')?.value ?? '2000';
  const m = parts.find((p) => p.type === 'month')?.value ?? '01';
  const da = parts.find((p) => p.type === 'day')?.value ?? '01';
  return `${y}-${m}-${da}`;
}

/** The setting the dashboard reads to say when this last ran and whether the
 *  budget cut it short. */
export const LOST_RUN_SETTING = 'lost_analysis_last_run';
const LOST_DAY_SETTING = 'lost_analysis_last_day';

export type LostRunOutcome = 'done' | 'already_run' | 'nothing_to_do' | 'budget_exhausted' | 'incomplete';

/**
 * Runs from the LOST_ANALYSIS job (scheduler.ts), first scheduled for 4:00am
 * Melbourne. Idempotent per Melbourne day via a stored key, the same pattern
 * the daily digest uses.
 *
 * One call is one PASS, not necessarily one night: a pass stops on
 * `passBudgetMs` and returns 'incomplete', and the scheduler re-queues it a few
 * minutes later. Every lead it did finish is already stored, so the next pass
 * simply continues. The day is only marked done when a pass reaches a real end
 * — the queue is empty, the per-night cap is hit, or the AI budget is spent.
 */
export async function runLostLeadAnalysis(
  nowMs: number,
  passBudgetMs: number = DEFAULT_PASS_BUDGET_MS,
): Promise<LostRunOutcome> {
  const store = getStore();
  const now = new Date(nowMs);
  const day = melbourneDayKey(now);
  const startedAt = Date.now();

  const last = await store.getSetting(LOST_DAY_SETTING).catch(() => null);
  if (last === day) return 'already_run';

  const [customers, existing] = await Promise.all([
    store.listCustomers().catch(() => [] as CustomerRow[]),
    store.listLostAnalyses().catch(() => [] as LostAnalysisRow[]),
  ]);

  const lost = selectLostLeads(customers, now);
  const queue = needsAnalysis(lost, existing, now);
  const attemptsById = new Map(existing.map((r) => [r.customerId, r.attempts]));

  const summary: LostRunSummary = {
    day, ranAt: now.toISOString(), lostTotal: lost.length,
    analysed: 0, failed: 0, remaining: queue.length,
    budgetExhausted: false, incomplete: false,
  };

  if (queue.length === 0) {
    await store.setSetting(LOST_DAY_SETTING, day);
    await store.setSetting(LOST_RUN_SETTING, summary).catch(() => {});
    await store.audit('nightly', 'lost_analysis_nothing_to_do', { day, lostTotal: lost.length }).catch(() => {});
    return 'nothing_to_do';
  }

  const batch = queue.slice(0, MAX_PER_NIGHT);
  for (const customer of batch) {
    // Wall-clock guard. Stopping deliberately, with every finished lead already
    // stored, is the difference between "resume on the next tick" and "be killed
    // mid-call and burn a retry".
    if (Date.now() - startedAt > passBudgetMs) {
      summary.incomplete = true;
      break;
    }
    // The budget is claimed BEFORE the call, atomically, against the same
    // counter the live reply path uses. Exhausted means stop — not "try one
    // more", not "spend quietly and hope nobody looks at the invoice".
    if (await aiBudgetExhausted()) {
      summary.budgetExhausted = true;
      break;
    }

    let row: LostAnalysisRow;
    try {
      const { evidence, timing } = await buildEvidence(customer, now);
      const verdict = lostVerdict(customer, now);
      const result = await analyseLostLead(evidence);
      const base = {
        customerId: customer.id,
        state: customer.state,
        triggerKind: verdict.trigger ?? '',
        quietDays: timing.quietDays,
        hoursPriceToSilence: timing.hoursPriceToSilence,
        attempts: (attemptsById.get(customer.id) ?? 0) + 1,
        analysedAt: new Date().toISOString(),
      };
      if ('error' in result) {
        row = {
          ...base, status: 'ERROR', error: result.error,
          reason: '', category: 'unclear', shouldHaveDone: '',
          fault: 'NOT_OURS', recoverable: 'NO', recoveryAction: null, recoveryMessage: null,
          evidenceQuote: null, confidence: 0,
        };
        summary.failed++;
      } else {
        row = {
          ...base, status: 'OK', error: null,
          reason: result.reason,
          category: result.category,
          shouldHaveDone: result.shouldHaveDone,
          fault: result.fault,
          recoverable: result.recoverable,
          recoveryAction: result.recoveryAction,
          recoveryMessage: result.recoveryMessage,
          evidenceQuote: result.evidenceQuote,
          confidence: result.confidence,
        };
        summary.analysed++;
      }
    } catch (e) {
      // A store read that threw, a malformed row — record it and carry on. One
      // bad lead must never take down the rest of the batch.
      row = {
        customerId: customer.id, state: customer.state, triggerKind: '',
        quietDays: 0, hoursPriceToSilence: null,
        attempts: (attemptsById.get(customer.id) ?? 0) + 1,
        analysedAt: new Date().toISOString(),
        status: 'ERROR', error: (e as Error).message?.slice(0, 200) ?? 'unknown error',
        reason: '', category: 'unclear', shouldHaveDone: '',
        fault: 'NOT_OURS', recoverable: 'NO', recoveryAction: null, recoveryMessage: null,
        evidenceQuote: null, confidence: 0,
      };
      summary.failed++;
    }
    await store.upsertLostAnalysis(row).catch(async (e) => {
      await store.audit('nightly', 'lost_analysis_store_failed', {
        customerId: customer.id, error: (e as Error).message?.slice(0, 200),
      }).catch(() => {});
    });
  }

  summary.remaining = Math.max(0, queue.length - summary.analysed - summary.failed);

  // The day key is what stops this running again today. It is written when the
  // pass reached a real end — everything analysable was analysed, the per-night
  // cap was hit, or the AI budget stopped us (in which case nothing more CAN be
  // spent today anyway). It is deliberately NOT written when the pass merely
  // ran out of tick time, so the next tick continues the same night's work.
  if (!summary.incomplete) await store.setSetting(LOST_DAY_SETTING, day);
  await store.setSetting(LOST_RUN_SETTING, summary).catch(() => {});
  await store.audit(
    'nightly',
    summary.budgetExhausted ? 'lost_analysis_budget_exhausted'
      : summary.incomplete ? 'lost_analysis_paused'
      : 'lost_analysis_complete',
    summary,
  ).catch(() => {});

  if (summary.budgetExhausted) return 'budget_exhausted';
  return summary.incomplete ? 'incomplete' : 'done';
}
