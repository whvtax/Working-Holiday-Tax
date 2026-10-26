// ============================================================
// AUTOMATIC WIN-BACK (Jo, 25 Oct)
//
// Replaces the Lost Leads tab. Nothing here waits for a person.
//
//   1. A lead lands in Closed (Not Interested, Went Cold). Nothing happens.
//   2. 30 days after the last message in the chat, Will reads the WHOLE
//      conversation and decides:
//        never  they will not become a paying customer (did it elsewhere,
//               asked us to stop, not a customer at all...): straight to Final.
//        send   there is a chance: ONE personal message, written for this
//               conversation, goes out inside the Meta template winback_<lang>
//               (a month later only an approved template can reach them).
//   3. After the win-back:
//        they reply          the ordinary inbound path reopens them as a Lead
//                            and Will carries on as with any lead;
//        they close again    (they said no after all): Final;
//        7 days, no reply    Final.
//   4. Not Relevant (suppliers, spam, wrong numbers) goes straight to Final,
//      no model call, no message. Someone who asked us to stop: Final.
//   5. Final is the end of the line: nobody reaches out again. If THEY write,
//      Will answers them like any new lead (the inbound reactivation path).
//
// One win-back per person, ever. At most WINBACK_DAILY_CAP go out a day, only
// inside the same evening window as the follow-ups, so a backlog of closed
// leads is worked through gradually instead of in one burst. Paid customers
// and legacy contacts are never touched.
//
// State lives in the existing `winbacks` settings row (winbacks.ts), so the
// manual win-backs sent before this existed count too: anyone who already
// got one is never messaged again.
// ============================================================
import { getStore, type CustomerRow, type Store } from './store';
import { readWinbacks, type Winbacks, type WinbackRecord, WINBACKS_SETTING } from './winbacks';
import { buildEvidence } from './lost-analysis';
import { decideWinback, type WinbackDecision } from './claude';
import { aiBudgetExhausted } from './ai-budget';
import { deliverOut } from './channel';
import { winbackMessage, winbackTemplateKey } from './i18n';
import { withinQuietHours } from './config';
import { greetingName } from './scheduler';

export const WINBACK_AFTER_DAYS = 30;
export const WINBACK_REPLY_DAYS = 7;
export const WINBACK_DAILY_CAP = 10;
/** Never a burst: at most this many per pass, passes 20 minutes apart. */
export const WINBACK_SENDS_PER_PASS = 2;
/** A failed assessment is retried the next day, at most this many times; after
 *  that the lead goes to Final rather than costing a model call every day. */
export const WINBACK_MAX_ATTEMPTS = 3;
const RETRY_AFTER_MS = 20 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const DAY_SETTING = 'winback_auto_day';
export const WINBACK_RUN_SETTING = 'winback_auto_last_run';

/** Closed states a win-back can come from. Not Relevant only ever goes to Final. */
const WINBACKABLE = new Set(['NOT_INTERESTED', 'WENT_COLD']);

export type WinbackPlan =
  | { kind: 'skip'; why: string }
  | { kind: 'final'; why: 'not_relevant' | 'opted_out' | 'never' | 'no_reply' | 'closed_again' | 'not_assessable' }
  | { kind: 'wait'; why: string }
  | { kind: 'decide' }
  | { kind: 'send' };

const t = (iso: string | null | undefined): number | null => {
  if (!iso) return null;
  const v = new Date(iso).getTime();
  return Number.isFinite(v) ? v : null;
};

/** The last thing that happened in the conversation, whoever wrote it. */
export function lastActivity(c: CustomerRow): number | null {
  return t(c.lastMessageAt) ?? t(c.lastCustomerMsgAt) ?? t(c.stateChangedAt) ?? t(c.createdAt);
}

/** Pure: what to do with one customer right now. */
export function winbackPlan(c: CustomerRow, rec: WinbackRecord | undefined, now: Date): WinbackPlan {
  if (c.paid) return { kind: 'skip', why: 'paid' };
  if (c.isLegacy) return { kind: 'skip', why: 'legacy contact' };
  if (c.state === 'NOT_RELEVANT') return { kind: 'final', why: 'not_relevant' };
  if (!WINBACKABLE.has(c.state)) return { kind: 'skip', why: `state ${c.state}` };
  if (c.optedOut) return { kind: 'final', why: 'opted_out' };

  const sent = t(rec?.sentAt);
  if (sent != null) {
    // They replied (the inbound path reopened them as a Lead) and the chat has
    // since closed again: they had their one win-back.
    const changed = t(c.stateChangedAt);
    if (changed != null && changed > sent) return { kind: 'final', why: 'closed_again' };
    if (now.getTime() - sent >= WINBACK_REPLY_DAYS * DAY_MS) return { kind: 'final', why: 'no_reply' };
    return { kind: 'wait', why: 'waiting for a reply to the win-back' };
  }
  const last = lastActivity(c);
  if (last == null) return { kind: 'wait', why: 'no timestamps' };
  // "Never" stands for the conversation it was made about. Someone who came
  // back by themselves after it, and closed again, is judged afresh 30 days on.
  const decidedAtMs = t(rec?.decidedAt);
  if (rec?.decision === 'never' && decidedAtMs != null && decidedAtMs >= last) return { kind: 'final', why: 'never' };
  if (now.getTime() - last < WINBACK_AFTER_DAYS * DAY_MS) return { kind: 'wait', why: 'less than 30 days since the last message' };

  // A decision older than the last activity was made about a different
  // conversation (they wrote again since): decide again.
  const decided = t(rec?.decidedAt);
  if (rec?.decision === 'send' && rec.message && decided != null && decided >= last) return { kind: 'send' };

  if ((rec?.attempts ?? 0) >= WINBACK_MAX_ATTEMPTS && decided != null && decided >= last) return { kind: 'final', why: 'not_assessable' };
  const failedAt = t(rec?.failedAt);
  if (failedAt != null && now.getTime() - failedAt < RETRY_AFTER_MS) return { kind: 'wait', why: 'assessment failed recently' };
  return { kind: 'decide' };
}

export interface WinbackRunSummary {
  ranAt: string;
  finals: number;
  decided: number;
  never: number;
  toSend: number;
  sent: number;
  failed: number;
  remainingDecisions: number;
  remainingSends: number;
  budgetExhausted: boolean;
  incomplete: boolean;
}

function dayKey(d: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Melbourne', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}

async function saveRecord(store: Store, id: string, patch: Partial<WinbackRecord>): Promise<void> {
  const all = await readWinbacks(store);
  all[id] = { ...(all[id] ?? {}), ...patch };
  await store.setSetting(WINBACKS_SETTING, all);
}

async function toFinal(store: Store, c: CustomerRow, why: string): Promise<void> {
  const moved = await store.setState(c.id, 'FINAL', 'SYSTEM');
  if (!moved) return;
  await store.cancelJobsFor(c.id, ['FOLLOW_UP', 'AUTO_CLOSE']).catch(() => 0);
  await saveRecord(store, c.id, { finalAt: new Date().toISOString(), finalWhy: why }).catch(() => undefined);
  await store.audit('system', 'winback_final', { customerId: c.id, from: c.state, why }).catch(() => {});
}

/**
 * One pass. Called from the WINBACK job (scheduler.ts) with whatever is left
 * of the tick's time budget. Order: free moves to Final first, then the
 * model decisions (time- and budget-bound), then the sends (capped per day,
 * evening window only). Everything is written as it happens, so a pass that
 * stops on the clock is simply continued by the next one.
 */
export async function runWinbackPass(nowMs: number, passBudgetMs = 25_000): Promise<WinbackRunSummary> {
  const store = getStore();
  const now = new Date(nowMs);
  const started = Date.now();
  const summary: WinbackRunSummary = {
    ranAt: now.toISOString(), finals: 0, decided: 0, never: 0, toSend: 0, sent: 0, failed: 0,
    remainingDecisions: 0, remainingSends: 0, budgetExhausted: false, incomplete: false,
  };
  const customers = await store.allCustomers().catch(() => [] as CustomerRow[]);
  let records: Winbacks = await readWinbacks(store);

  const plans = customers.map((c) => ({ c, plan: winbackPlan(c, records[c.id], now) }));

  // 1. Final, no model call.
  for (const { c, plan } of plans) {
    if (plan.kind !== 'final') continue;
    await toFinal(store, c, plan.why);
    summary.finals++;
  }

  // 2. Decisions, warmest (most recent) first.
  const toDecide = plans.filter((p) => p.plan.kind === 'decide')
    .sort((a, b) => (lastActivity(b.c) ?? 0) - (lastActivity(a.c) ?? 0));
  for (const { c } of toDecide) {
    if (Date.now() - started > passBudgetMs) { summary.incomplete = true; break; }
    if (await aiBudgetExhausted()) { summary.budgetExhausted = true; break; }
    const rec = records[c.id] ?? {};
    // Attempts count per conversation: a lead who wrote again since the last
    // decision starts from zero.
    const prevAttempts = (t(rec.decidedAt) ?? 0) >= (lastActivity(c) ?? 0) ? rec.attempts ?? 0 : 0;
    let result: WinbackDecision | { error: string };
    try {
      const { evidence } = await buildEvidence(c, now);
      result = await decideWinback(evidence, now);
    } catch (e) {
      result = { error: (e as Error).message?.slice(0, 200) ?? 'unknown error' };
    }
    const decidedAt = new Date().toISOString();
    if (!result) result = { error: 'no decision returned' };
    if ('error' in result) {
      await saveRecord(store, c.id, { attempts: prevAttempts + 1, failedAt: decidedAt, decidedAt, error: result.error, decision: undefined, message: undefined });
      await store.audit('system', 'winback_assess_failed', { customerId: c.id, error: result.error }).catch(() => {});
      summary.failed++;
    } else {
      await saveRecord(store, c.id, {
        attempts: prevAttempts + 1, decidedAt, decision: result.decision,
        reason: result.reason, message: result.message ?? undefined, failedAt: undefined, error: undefined,
      });
      await store.audit('system', 'winback_decided', { customerId: c.id, decision: result.decision, reason: result.reason }).catch(() => {});
      summary.decided++;
      if (result.decision === 'never') { await toFinal(store, c, 'never'); summary.never++; summary.finals++; }
      else summary.toSend++;
    }
  }
  summary.remainingDecisions = Math.max(0, toDecide.length - summary.decided - summary.failed);

  // 3. Sends: evening window, daily cap, oldest decision first.
  records = await readWinbacks(store);
  const fresh = await store.allCustomers().catch(() => customers);
  const ready = fresh
    .map((c) => ({ c, rec: records[c.id], plan: winbackPlan(c, records[c.id], now) }))
    .filter((x) => x.plan.kind === 'send')
    .sort((a, b) => (t(a.rec?.decidedAt) ?? 0) - (t(b.rec?.decidedAt) ?? 0));
  const day = dayKey(now);
  const counter = (await store.getSetting(DAY_SETTING).catch(() => null)) as { day?: string; sent?: number } | null;
  let sentToday = counter?.day === day ? counter.sent ?? 0 : 0;
  if (withinQuietHours(now)) {
    let thisPass = 0;
    for (const { c, rec } of ready) {
      if (sentToday >= WINBACK_DAILY_CAP || thisPass >= WINBACK_SENDS_PER_PASS) break;
      if (Date.now() - started > passBudgetMs + 15_000) { summary.incomplete = true; break; }
      const hook = (rec?.message ?? '').trim();
      if (!hook) continue;
      const name = greetingName(c);
      const body = winbackMessage(c.lang, name, hook);
      const tpl = { name: winbackTemplateKey(c.lang), params: [name, hook], lang: c.lang };
      const out = await deliverOut(c, body, 'AI', { system: true, winback: true, waTemplate: tpl }, tpl, {
        onFailure: {
          reason: (e) => `Win-back did not go out: ${e ?? 'WhatsApp rejected it'}. Check that the template "${tpl.name}" is approved in WhatsApp Manager. Win-backs are paused until tomorrow.`,
          severity: 'REVIEW',
        },
      });
      if (!out.ok) {
        // A template that is not approved fails for everyone: stop for today
        // rather than raise one card per lead.
        await store.audit('system', 'winback_send_failed', { customerId: c.id, error: out.error ?? null }).catch(() => {});
        summary.failed++;
        break;
      }
      const at = new Date().toISOString();
      await saveRecord(store, c.id, { sentAt: at, queuedAt: rec?.queuedAt ?? at, auto: true });
      await store.cancelJobsFor(c.id, ['FOLLOW_UP', 'AUTO_CLOSE']).catch(() => 0);
      await store.audit('system', 'winback_sent', { customerId: c.id, template: tpl.name }).catch(() => {});
      sentToday++;
      thisPass++;
      summary.sent++;
      await store.setSetting(DAY_SETTING, { day, sent: sentToday }).catch(() => {});
    }
  }
  // Sends left for TODAY (the cap reached means nothing more until tomorrow's
  // nightly pass queues the next round).
  summary.remainingSends = sentToday >= WINBACK_DAILY_CAP ? 0 : Math.max(0, ready.length - summary.sent);
  await store.setSetting(WINBACK_RUN_SETTING, summary).catch(() => {});
  await store.audit('system', 'winback_pass', summary).catch(() => {});
  return summary;
}

