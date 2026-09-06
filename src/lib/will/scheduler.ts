// ============================================================
// Follow-up scheduler, per spec §6.5, §7.2, §7.5:
//   pre-payment 24h/3d/7d · form 6h/3d/7d · signature 24h/3d/7d
// Hardened after audit: single-flight mutex, claim-before-send,
// seq resume (no restart-forever), kill switch, quiet hours.
// ============================================================
import { getStore, CustomerRow, JobRow, Store } from './store';
import { cleanFirstName, firstNameOf } from './text-normalize';
import { schedulerConfig, withinQuietHours, deferToMorning, localTimeUtc, localParts, SIGNATURE_AFTER_NOTICE } from './config';
import { policyGuard, registerLibraryBodies } from './policy-guard';
import { CustomerState, Flow, FLOW_TEMPLATES, FLOW_ELIGIBLE_STATES, flowForState } from './state-machine';
import { suggestReply } from './suggest';
// Re-exported so existing importers of the scheduler keep working.
export { FLOW_TEMPLATES, flowForState };
export type { Flow };
import { formReceivedMessage, formReceivedTemplateKey, reviewRequestMessage, reviewRequestTemplateKey, requestAbnMessage, requestAbnTemplateKey, handoffHoldingMessage, handoffHoldingTemplateKey, medicareMessage, medicareTemplateKey } from './i18n';
import { deliverOut, sendWhatsAppText } from './channel';
import { APPROVED } from './approved-messages';
import { requiresApproval } from './mode';
import { runDailyDigest } from './daily-digest';
import { runLostLeadAnalysis } from './lost-analysis';
import { medicareNoKey, MEDICARE_DELAY_MS } from './form-link';
// One open task per customer (audit, 5 Sep): every task the scheduler raises
// for a customer goes through the shared fold, so a repeat of the same failure
// grows the open card instead of adding one per step. Same reason, severity
// and suggested reply as before; only the stacking is gone.
import { raiseOrUpdateTask, raiseOrFoldSystemTask, resolveSystemTasks } from './tasks';


/**
 * Approval mode means approval for EVERYTHING.
 *
 * The engine already held conversation replies for approval, but the scheduler
 * transmitted follow-ups and the questionnaire confirmation on its own. That
 * made "Approval" a promise the system did not actually keep. Anything the
 * scheduler wants to say now goes to the approval queue too, and only
 * Autopilot sends without a human.
 */
async function inApprovalMode(): Promise<boolean> {
  // Shared with the engine and the webhook so the three can never drift apart
  // again: unknown, unset or misspelled all mean ask first.
  return requiresApproval(await getStore().getSetting('ai_mode'));
}

/** The name used in a template's {{1}}. Meta rejects an empty parameter, so a
 *  customer with no WhatsApp profile name still needs something natural. */
/** The {{1}} parameter of a follow-up template, and the greeting inside it.
 *
 *  It used to be "the first word of whatever WhatsApp gave us", so a profile
 *  name of "🌸 Yuki 🌸" sent "Hi 🌸", a profile name that is a phone number sent
 *  a phone fragment, and a company name sent the company (audit, 4 Sep). Meta
 *  also rejects a parameter with a newline or an empty value outright, which
 *  fails the whole send. cleanFirstName already does this properly for the live
 *  path (it skips leading emoji, refuses non-name words, fixes capitalisation);
 *  this now uses it and falls back to the neutral "there". */
export function greetingName(customer: CustomerRow): string {
  // cleanFirstName on the WHOLE name, not on the first word: "🌸 Yuki 🌸" has an
  // emoji as its first word, and cleanFirstName is the thing that knows to skip
  // past it to the actual name.
  const cleaned = cleanFirstName(customer.name) || cleanFirstName(firstNameOf(customer.name));
  return cleaned.length >= 2 ? cleaned : 'there';
}


/** Set by "Send for Signature" (the ISO time of the notice). While it stands,
 *  the signature nudges are measured from the notice (24h / 3d / 7d), not from
 *  the Done click plus the three-day prep offset. See signatureNoticeStands. */
export const signatureNoticeSentKey = (customerId: string) => `signature_notice_sent:${customerId}`;

/**
 * Does the "ready for signature" notice still govern this customer's cadence?
 * It does when the marker is set AND the customer has not re-entered Signature
 * since it was written: a customer who left the stage and came back through
 * Done is on the prep-offset path again, and the stale marker must not follow
 * them. Judged off the state history rather than cleared on every stage move,
 * so nothing outside this file has to remember to clear it (audit, 5 Sep).
 */
export async function signatureNoticeStands(customerId: string, history?: { to: CustomerState; createdAt: string }[]): Promise<boolean> {
  const store = getStore();
  const raw = await store.getSetting(signatureNoticeSentKey(customerId));
  if (typeof raw !== 'string' || !raw) return false;
  const noticeAt = new Date(raw).getTime();
  if (!Number.isFinite(noticeAt)) return false;
  try {
    const rows = history ?? await store.history(customerId);
    const lastEntry = rows
      .filter((h) => h.to === 'SIGNATURE_PENDING')
      .map((h) => new Date(h.createdAt).getTime())
      .reduce((a, b) => Math.max(a, b), 0);
    // The route moves them to Signature BEFORE the marker is written, so an
    // entry later than the marker can only be a fresh arrival via Done.
    return lastEntry <= noticeAt;
  } catch { return true; /* no history: the marker is the best evidence */ }
}

export async function scheduleFollowUp(customerId: string, flow: Flow, seq: number, opts?: { afterNotice?: boolean }): Promise<void> {
  const store = getStore();
  // "Stop chasing" is honoured HERE, not only in reconcileSchedule (audit,
  // 5 Sep). The tick arms the next step straight through this function after
  // a send, a missing template, a guard block or a crash, so a press of the
  // button while that customer's nudge was mid-send re-armed the cadence Jo had
  // just switched off. One indexed settings read; nothing about the cadence
  // itself changes for a customer whose follow-ups are on.
  if ((await store.getSetting(followupsOffKey(customerId))) === true) return;
  const cfg = schedulerConfig();
  // The signature flow has two clocks. "Send for Signature" armed nudge 1 at
  // 24h from the notice, but the very next reconcileSchedule (any customer
  // reply, a toggle) cancelled that job and re-armed from here with the Done
  // path's prep offset, so "great, thanks" to the notice pushed nudge 1 to four
  // days out (audit, 5 Sep). Every arming of the signature flow now asks which
  // clock applies; the numbers themselves are unchanged.
  const afterNotice = flow === 'signature'
    ? (opts?.afterNotice ?? await signatureNoticeStands(customerId))
    : false;
  const delays = afterNotice ? SIGNATURE_AFTER_NOTICE : cfg[flow];
  if (seq >= delays.length) {
    if (flow === 'prePayment') {
      await store.addJob({
        customerId, kind: 'AUTO_CLOSE', payload: {},
        runAt: new Date(Date.now() + cfg.autoCloseAfterFinal * 1000).toISOString(),
      });
    }
    return;
  }
  await store.addJob({
    customerId, kind: 'FOLLOW_UP',
    payload: { templateKey: FLOW_TEMPLATES[flow][seq], seq, flow },
    runAt: new Date(Date.now() + delays[seq] * 1000).toISOString(),
  });
}

/**
 * The "ready for signature" notice has just gone out, so the three signature
 * nudges are measured from NOW (24h / 3d / 7d), not from the Done click three
 * days earlier. Records the notice, then arms through reconcileSchedule so the
 * cadence resumes at the high-water mark (a second press does not re-send
 * nudge 1 once it has gone) and the notice clock survives every later
 * reconcile (audit, 5 Sep: it used to hard-code seq 0 and lose the clock on
 * the customer's first reply).
 */
export async function restartSignatureCadenceFromNotice(customerId: string): Promise<void> {
  const store = getStore();
  await store.setSetting(signatureNoticeSentKey(customerId), new Date().toISOString());
  const customer = await store.getCustomerById(customerId);
  if (!customer) return;
  await reconcileSchedule(customer);
}

/**
 * Called after every processed incoming message / state change.
 * Cancels stale pending follow-ups but RESUMES the sequence at the
 * high-water mark for the current flow, so a chatty customer is not
 * followed-up #1 forever (audit finding).
 */
/** The three ways a lead ends without paying. */
const CLOSED_STATES: CustomerState[] = ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'];

export async function reconcileSchedule(customer: CustomerRow): Promise<void> {
  const store = getStore();
  await store.cancelJobsFor(customer.id, ['FOLLOW_UP', 'AUTO_CLOSE']);
  // A lead that has just closed is a lead worth understanding, now rather than
  // at 4am tomorrow (Jo, 28 Aug). Queued before the opt-out/paused checks
  // below, because a lead who opted out or was paused and then closed is
  // exactly the kind worth reading back. Best effort: failing to queue a
  // post-mortem must never break the state change that caused it.
  if (CLOSED_STATES.includes(customer.state)) {
    await ensureLostAnalysisSoon().catch(() => { /* the close itself is what matters */ });
  }
  if (customer.optedOut || customer.aiPaused || customer.isLegacy) return;
  // "Stop chasing this one person" has to survive their next message. The
  // button cancelled the queued jobs and nothing else, so the very next inbound
  // message or stage change armed the cadence again and the follow-ups Jo had
  // just switched off came back (audit, 4 Sep). Cleared by switching them back
  // on, which is the only thing that writes false here.
  if ((await store.getSetting(followupsOffKey(customer.id))) === true) return;
  const flow = flowForState(customer.state);
  if (!flow) return;
  // A paid customer is never chased with the sales cadence, whatever stage
  // they were put in. The one way a paid customer lands in a sales stage is
  // the owner's force move from the stage badge (a deliberate hand action,
  // allowed), and the cost of that used to be "still want us to take a look at
  // your tax situation?" going to somebody who paid (audit, 3 Sep). Spec §5:
  // paid never re-enters the sales flow, and that includes its follow-ups.
  if (flow === 'prePayment' && customer.paid) return;

  // How many follow-ups of THIS flow have already been delivered, in THIS
  // cycle? A lead who was chased on day 1/4/11, auto-closed, and came back two
  // weeks later with "still interested, how do I pay?" starts a new cycle: the
  // three nudges from the old one must not count, or the resumed cadence jumps
  // straight to auto-close and the returning lead is never chased at all
  // (audit, 3 Sep). The cycle starts at the last reopen, read off the state
  // history (a transition out of a closed state); with no reopen, it is the
  // whole life of the customer, exactly as before.
  const jobs = await store.listJobsForCustomer(customer.id, ['FOLLOW_UP']);
  let since = 0;
  let history: Awaited<ReturnType<typeof store.history>> | undefined;
  try {
    history = await store.history(customer.id);
    const reopened = history
      .filter((h) => h.from != null && CLOSED_STATES.includes(h.from) && !CLOSED_STATES.includes(h.to))
      .map((h) => new Date(h.createdAt).getTime());
    if (reopened.length) since = Math.max(...reopened);
  } catch { /* no history: count the whole life, the older behaviour */ }
  const doneCount = jobs.filter(
    (j) => j.status === 'DONE' && j.payload.flow === flow && new Date(j.createdAt).getTime() >= since,
  ).length;
  // Signature: the history just read decides which clock applies, so the
  // notice clock is honoured after a reply as well as before (audit, 5 Sep).
  const afterNotice = flow === 'signature' ? await signatureNoticeStands(customer.id, history) : false;
  await scheduleFollowUp(customer.id, flow, doneCount, { afterNotice });
}

/**
 * ONE-TIME RETRO (Jo, 29 Aug): apply the follow-up rules to every chat that
 * already exists, so the leads and customers who were in the system before the
 * rules changed get chased too, not only new ones. It reconciles each customer,
 * which arms the right follow-up sequence for anyone sitting in a followupable
 * state (now including a lead who never got a price) and queues a post-mortem
 * for anyone already closed.
 *
 * Runs itself, once, off the tick, in the same style as the other one-time
 * backfills in the tick route: guarded by a settings flag so it never repeats,
 * batched by a stored cursor so a large base is spread across a few ticks
 * instead of blowing the tick's time budget, and fully wrapped so it can never
 * block the loop that actually sends messages. reconcileSchedule is idempotent,
 * so a repeated customer in a batch is harmless.
 */
const FOLLOWUP_BACKFILL_VERSION = 'v1';
const FOLLOWUP_BACKFILL_BATCH = 300;
export async function backfillFollowupSchedules(): Promise<void> {
  const store = getStore();
  try {
    if ((await store.getSetting('followup_schedule_backfill')) === FOLLOWUP_BACKFILL_VERSION) return;
    const all = await store.allCustomers();
    const offRaw = await store.getSetting('followup_schedule_backfill_offset');
    const off = typeof offRaw === 'number' && offRaw >= 0 ? offRaw : 0;
    // Store the total so the CRM can show "reviewed X of Y chats" while it runs.
    await store.setSetting('followup_schedule_backfill_total', all.length);
    const slice = all.slice(off, off + FOLLOWUP_BACKFILL_BATCH);
    for (const c of slice) {
      try { await reconcileSchedule(c); } catch { /* one customer must not stop the retro */ }
    }
    const next = off + slice.length;
    if (next >= all.length) {
      await store.setSetting('followup_schedule_backfill', FOLLOWUP_BACKFILL_VERSION);
      await store.setSetting('followup_schedule_backfill_offset', all.length);
      await store.setSetting('followup_schedule_backfill_at', new Date().toISOString());
      await store.audit('scheduler', 'followup_backfill_done', { total: all.length }).catch(() => {});
    } else {
      await store.setSetting('followup_schedule_backfill_offset', next);
      await store.audit('scheduler', 'followup_backfill_progress', { done: next, total: all.length }).catch(() => {});
    }
  } catch (e) {
    await store.audit('scheduler', 'followup_backfill_failed', { error: String(e).slice(0, 200) }).catch(() => {});
  }
}

/** The per-customer "do not chase this one" switch, as a setting key so it
 *  needs no column. Read by reconcileSchedule, scheduleFollowUp and the
 *  FOLLOW_UP send path; written by the CRM button. */
export const followupsOffKey = (customerId: string) => `followups_off:${customerId}`;

/** Set while a TFN + ABN customer has been asked the three ABN questions and
 *  has not answered yet. While it is set, the "we've received your
 *  questionnaire" acknowledgement is still owed (Jo, 4 Sep). */
export const abnAnswersPendingKey = (customerId: string) => `abn_answers_pending:${customerId}`;

/** Ensure exactly one nightly maintenance job is queued (idempotent). */
export async function ensureNightly(): Promise<void> {
  const store = getStore();
  if (await store.hasScheduledNightly()) return; // PERF-04: cheap existence check
  const cfg = schedulerConfig();
  let next: Date;
  if (cfg.enforceQuietHours) {
    // 3am MELBOURNE, not 3am server time. On Vercel the server is UTC, so this
    // was running at 1pm or 2pm Melbourne: nightly maintenance, auto-closes and
    // consistency checks in the middle of the working day (audit, 4 Sep).
    const { y, mo, da } = localParts('Australia/Melbourne');
    next = localTimeUtc('Australia/Melbourne', y, mo, da + 1, 3);
  } else {
    next = new Date();
    next.setMinutes(next.getMinutes() + 10);
  }
  await store.addJob({ customerId: null, kind: 'NIGHTLY', payload: {}, runAt: next.toISOString() });
}

/** Ensure exactly one daily-digest job is queued (idempotent), for the next
 *  8:00am in Melbourne — today if that has not passed yet local time, else
 *  tomorrow. Separate from NIGHTLY so a fixed 8am delivery time never drifts
 *  with whatever hour nightly maintenance happens to run at. */
export async function ensureDailyDigest(): Promise<void> {
  const store = getStore();
  // Existence check pushed to the DB, exactly like `ensureNightly` above. The
  // previous `listJobs()` scan pulled every row to look for one, and once
  // `will_jobs` passed PostgREST's 1000-row ceiling the truncated page stopped
  // containing the queued digest — so this returned "not scheduled" and queued
  // another one every tick.
  if (await store.hasScheduledJobOfKind('DAILY_DIGEST')) return;

  const { y, mo, da, hh } = localParts('Australia/Melbourne');
  const pastEightToday = hh >= 8; // at/after 8am local: today's slot has passed (or is passing right now)
  const targetDay = pastEightToday ? da + 1 : da; // Date.UTC normalises any overflow
  // 8am local, computed as a wall-clock time rather than midnight + 8h, so the
  // two DST days do not shift it (audit, 4 Sep).
  const runAt = localTimeUtc('Australia/Melbourne', y, mo, targetDay, 8);
  await store.addJob({ customerId: null, kind: 'DAILY_DIGEST', payload: {}, runAt: runAt.toISOString() });
}

/**
 * Queue a lost-lead post-mortem, soon.
 *
 * WHAT THIS USED TO BE. One job a night, at 4:00am Melbourne, that swept up
 * every lead that had gone quiet since the last sweep. Jo, 28 Aug: assess a
 * lead the moment it closes, not the following morning. Reading why somebody
 * walked away is worth most while it is still the conversation you remember,
 * and a fixed hour meant the answer to "what just happened there" was always
 * "ask me tomorrow".
 *
 * SO IT IS QUEUED BY THE CLOSE ITSELF. reconcileSchedule() calls this whenever
 * a customer lands in Not Interested, Went Cold or Not Relevant.
 *
 * WHY A SHORT DELAY AND NOT IMMEDIATELY. Two minutes, for two reasons. It keeps
 * a model call off the request path that closed the lead, and a batch of closes
 * (the nightly auto-close cadence retires several at once) collapses into one
 * run rather than one run each: the job assesses every lead that is waiting,
 * not only the one that triggered it.
 *
 * IDEMPOTENT. The existence check is pushed to the database rather than done by
 * scanning listJobs(), because once will_jobs passed PostgREST's 1000-row
 * ceiling the truncated page stopped containing the queued job, and this
 * quietly queued another one every time it was called.
 */
export async function ensureLostAnalysisSoon(): Promise<void> {
  const store = getStore();
  if (await store.hasScheduledJobOfKind('LOST_ANALYSIS')) return;
  await store.addJob({
    customerId: null, kind: 'LOST_ANALYSIS', payload: {},
    runAt: new Date(Date.now() + 2 * 60 * 1000).toISOString(),
  });
}

/** The owner's CURRENT wording for the holding line, falling back to the
 *  approved constant. It is in the Library like every other sendable message,
 *  so he can reword it without a deploy. */
/** The holding line in the CUSTOMER'S language: their Library row first
 *  (handoff_holding / handoff_holding_<lang>), then the code copy for that
 *  language, then English. Before 4 Sep this was English for everyone. */
async function ackBody(
  lang?: string | null,
  // Optional so a caller inside a tick can hand in the once-per-tick read
  // instead of paying for another full Library table fetch (audit3 sched 76,
  // 5 Sep: HANDOFF_ACK was one of several kinds still reading the Library on
  // every job even after FOLLOW_UP was fixed to read it once per tick).
  getTemplates: () => Promise<Awaited<ReturnType<Store['listTemplates']>>> = () => getStore().listTemplates(),
): Promise<{ body: string; key: string }> {
  const key = handoffHoldingTemplateKey(lang);
  try {
    const templates = await getTemplates();
    const t = templates.find((x) => x.key === key) ?? (key !== 'handoff_holding' ? templates.find((x) => x.key === 'handoff_holding') : undefined);
    if (t?.body?.trim()) return { body: t.body, key };
  } catch { /* the constant is the honest fallback */ }
  return { body: handoffHoldingMessage(lang), key };
}

export interface TickResult {
  processed: number; sent: string[]; closed: string[]; deferred: number;
  /** Follow-ups WhatsApp refused for good (template missing, bad params, dead
   *  token). Optional so older readers of the tick JSON see no change (audit, 5 Sep). */
  failed?: string[];
}

/** How long one tick will keep claiming jobs before it stops and leaves the rest
 *  for the next run. Deliberately under the route's `maxDuration = 60`, so the
 *  loop ends on its own terms rather than being killed mid-job. */
const TICK_BUDGET_MS = 45_000;

/** The route's `maxDuration = 60`, less a margin for the bookkeeping writes
 *  that end a job. Nothing is STARTED that could not finish before this. */
const TICK_WALL_MS = 58_000;

/**
 * How long a job of this kind may still need once it has been claimed, so the
 * loop does not start what it cannot finish (audit, 5 Sep).
 *
 * The 45s budget above only asked "is there time left", not "is there enough
 * for THIS job". An Autopilot timer claimed at second 44 is one model call of
 * up to 25s plus a WhatsApp send of up to 15s; the invocation was killed at
 * 60s mid-call, the job stayed CLAIMED with its attempt already spent, the
 * two-minute lease released it and the next five-minute tick paid for the
 * model call again. Three of those in a row dead-lettered the job. So a
 * model-calling job is only claimed while a normal slow run of it still fits
 * before the wall; a follow-up or a state change is a single short write and
 * keeps the plain budget. The order of the batch and what is sent are
 * untouched: a timer that does not fit is left SCHEDULED for the next tick
 * exactly as an over-budget one always was.
 */
export function tickReservationMs(kind: JobRow['kind']): number {
  return kind === 'AUTO_REPLY' ? 30_000 : 5_000;
}

/** True while a job of this kind can still be claimed `elapsedMs` into a tick. */
export function tickCanStart(kind: JobRow['kind'], elapsedMs: number): boolean {
  return elapsedMs <= TICK_BUDGET_MS && elapsedMs + tickReservationMs(kind) <= TICK_WALL_MS;
}

/** How many Autopilot two-minute timers a tick answers at the same time. Each
 *  is one model call for one customer; four in flight keeps a busy evening
 *  inside the promised 2 to 10 minutes without piling up model calls. Follow-ups
 *  and every other job stay one after another (audit, 5 Sep). */
const AUTO_REPLY_CONCURRENCY = 4;

/**
 * AUTO_REPLY, current shape (Jo, 3 Sep): the two-minute timer. Nothing was
 * written when the message arrived; now that the customer has been quiet for
 * the delay, Will reads everything they wrote since our last message and
 * answers it once. The service owns the decision (history, guard, state, send);
 * it is imported lazily because service.ts imports this file, and a static
 * import here would close that cycle.
 *
 * The job is already CLAIMED by the caller. Loads the customer when the caller
 * has not, and ends the job exactly as the loop body always did: CANCELLED for
 * a missing or opted-out customer or a superseded timer, DONE when answered,
 * FAILED (with an URGENT task) when the decision itself threw.
 */
async function runAutoReplyTimer(store: Store, job: JobRow, result: TickResult, known?: CustomerRow): Promise<void> {
  if (!job.customerId) { await store.setJobStatus(job.id, 'CANCELLED'); return; }
  const customer = known ?? await store.getCustomerById(job.customerId);
  if (!customer || customer.optedOut) { await store.setJobStatus(job.id, 'CANCELLED'); return; }
  try {
    const { runDeferredAutoReply } = await import('./service');
    const what = await runDeferredAutoReply(customer, job);
    if (what === 'sent') result.sent.push(`${customer.name ?? customer.waId} · autopilot reply`);
    await store.setJobStatus(job.id, what === 'superseded' ? 'CANCELLED' : 'DONE');
  } catch (e) {
    // The customer is waiting on this one, and the model's own failures
    // already end as a task inside the decision (fallbackTask). Anything
    // that still throws here is the store or the network, and it must not
    // vanish into a job status: the chat becomes a task with what they
    // wrote, so a person answers instead of nobody.
    const error = e instanceof Error ? e.message.slice(0, 200) : String(e).slice(0, 200);
    await store.audit('assistant', 'auto_reply_failed', { customerId: customer.id, error })
      .catch(() => { /* the store is a likely thing to have failed */ });
    // (audit3 sched 72, 5 Sep) This used to raise the task with context: null,
    // so the Decision Log had no "what arrived" line at all and the exception
    // text sat where the reason usually explains itself — Jo had to open the
    // chat just to find out what was even asked. burstText gives back what the
    // customer wrote since this timer's anchor, the same text
    // runDeferredAutoReply itself would have answered; the error goes after a
    // "Reviewer:" line, the same shape service.ts already uses for a second
    // pair of eyes, rather than living in the reason.
    let context: string | null = null;
    try {
      const { burstText } = await import('./service');
      const msgs = await store.listMessages(customer.id);
      const text = burstText(msgs);
      context = text ? `${text}\n\nReviewer: ${error}` : null;
    } catch { /* the store just failed once already; a missing burst is not worth a second one */ }
    await raiseOrUpdateTask(store, customer, {
      reason: `Will could not answer this chat automatically (${error}). Please reply by hand.`,
      severity: 'URGENT', newContext: context, suggestedReply: null,
    }).catch(() => { /* same */ });
    await store.setJobStatus(job.id, 'FAILED').catch(() => { /* same */ });
  }
}

// Single-flight lock: overlapping ticks (multiple tabs / external cron)
// must not double-process jobs.
let running: Promise<TickResult> | null = null;

export function processDueJobs(): Promise<TickResult> {
  if (running) return running;
  running = doProcess().finally(() => { running = null; });
  return running;
}

async function doProcess(): Promise<TickResult> {
  const store = getStore();
  // H6: recover any job stuck CLAIMED by a crashed/redeployed run before it
  // leased the job for too long (lease = 2 minutes).
  await store.reclaimStaleJobs(2 * 60 * 1000);
  if ((await store.getSetting('kill_switch')) === true) {
    // (audit, 5 Sep) This early return used to skip the heartbeat write at the
    // bottom of doProcess entirely, so pausing Will made the scheduler health
    // dot go red 15 minutes later — "THE SCHEDULER HAS NOT RUN" — even though
    // the tick is running fine and correctly doing nothing. The tick DID run;
    // record that, the same way a normal tick does, so Pause Will cannot be
    // mistaken for a dead scheduler.
    try { await store.setSetting('last_tick_at', new Date().toISOString()); } catch { /* */ }
    return { processed: 0, sent: [], closed: [], deferred: 0 };
  }
  const batch = await store.dueJobs(new Date());
  const result: TickResult = { processed: 0, sent: [], closed: [], deferred: 0 };
  const startedAt = Date.now();
  // Per kind, not one number: a job is only claimed while its own worst
  // normal run still fits before the route's wall, see tickReservationMs.
  const overBudget = (kind: JobRow['kind']) => !tickCanStart(kind, Date.now() - startedAt);
  // Time budget. The tick runs as one serverless invocation with a hard
  // ceiling (`maxDuration`); a busy morning used to run past it and be killed
  // mid-job, which burned an `attempts` on every reclaim until the job hit a
  // permanent FAILED and the cadence died silently. Stopping deliberately
  // leaves the remainder SCHEDULED for the next tick, and says so out loud.
  const auditBudget = async (remaining: number) => {
    await store.audit('scheduler', 'tick_budget_exhausted', {
      processed: result.processed, remaining,
      note: `Stopped after ${Math.round((Date.now() - startedAt) / 1000)}s with ${remaining} due job(s) not yet processed; they remain SCHEDULED and run on the next tick.`,
    }).catch(() => { /* never let the bookkeeping write end the tick */ });
  };

  // ── A WAITING CUSTOMER GOES BEFORE A NUDGE TO A SILENT ONE (audit, 5 Sep) ──
  //
  // The batch used to run strictly in run_at order. Every follow-up that comes
  // due during the day is re-queued to exactly 19:00, so at 19:00 dozens of
  // FOLLOW_UP rows sort ahead of the two-minute timer of anyone who wrote at
  // 18:58, and the reply promised in 2 to 10 minutes went out after every
  // reminder had. Nothing about what is sent changes here, only the order:
  // the customer-facing jobs (the Autopilot timer, the questionnaire
  // acknowledgement, the holding line) run first, and the rest keep their
  // run_at order behind them. The timers also run a few at a time: each is one
  // independent per-customer model call of 5 to 25 seconds, already claimed
  // atomically and already checked for a newer message inside the service, so
  // waiting for one customer's answer before starting the next only made
  // everybody wait.
  const timers = batch.filter((j) => j.kind === 'AUTO_REPLY' && j.payload.debounce);
  const due = batch.filter((j) => !(j.kind === 'AUTO_REPLY' && j.payload.debounce));
  const replyFirst = (j: JobRow) => (j.kind === 'FORM_RECEIVED' || j.kind === 'HANDOFF_ACK' || j.kind === 'AUTO_REPLY') ? 0 : 1;
  due.sort((a, b) => replyFirst(a) - replyFirst(b) || (a.runAt < b.runAt ? -1 : a.runAt > b.runAt ? 1 : 0));

  let timersNotStarted = 0;
  let nextTimer = 0;
  const timerWorker = async () => {
    while (nextTimer < timers.length) {
      if (overBudget('AUTO_REPLY')) { timersNotStarted += timers.length - nextTimer; nextTimer = timers.length; return; }
      const job = timers[nextTimer++];
      if (!(await store.claimJob(job.id))) continue;
      result.processed++;
      await runAutoReplyTimer(store, job, result);
    }
  };
  await Promise.all(Array.from({ length: Math.min(AUTO_REPLY_CONCURRENCY, timers.length) }, timerWorker));
  // Timers stop earlier than the short jobs now (their reservation is bigger),
  // so the rest of the batch may well run to the end: the ones left behind are
  // still said out loud, once, after the loop (audit, 5 Sep).
  let budgetAudited = false;

  // The Library and the mode are read ONCE per tick for the follow-ups rather
  // than once per job: a hundred follow-ups at 19:00 were a hundred identical
  // reads before the first customer reply got a turn (audit, 5 Sep).
  let templatesOnce: Promise<Awaited<ReturnType<typeof store.listTemplates>>> | null = null;
  const tickTemplates = () => (templatesOnce ??= store.listTemplates());
  let approvalOnce: Promise<boolean> | null = null;
  const tickApprovalMode = () => (approvalOnce ??= inApprovalMode());

  for (let i = 0; i < due.length; i++) {
    const job = due[i];
    if (overBudget(job.kind)) {
      await auditBudget(due.length - i + timersNotStarted);
      budgetAudited = true;
      break;
    }
    // Atomic claim: only one caller wins; a crash mid-job leaves it CLAIMED and
    // it is reclaimed to SCHEDULED next tick (up to 3 attempts), never lost.
    if (!(await store.claimJob(job.id))) continue;
    result.processed++;
    try {
      // ── The holding line for a long message nobody has answered yet ────
      //
      // Jo, 28 Aug. Queued half an hour ago, when a long and complicated
      // message was handed to a person on Autopilot. Everything is re-checked
      // here rather than assumed, because the world has had thirty minutes to
      // change: if he has already replied, or the task is closed, or the
      // customer opted out, or the assistant was paused for this chat, nothing
      // is sent and the job simply ends.
      if (job.kind === 'HANDOFF_ACK') {
        try {
          const c = job.customerId ? await store.getCustomerById(job.customerId) : null;
          if (c && !c.optedOut && !c.aiPaused) {
            // Targeted, indexed lookup for THIS customer's open task, instead of
            // reading the whole tasks table on every HANDOFF_ACK job and scanning
            // it in memory (O(all tasks) per job at 5,000 customers).
            const open = (await store.findOpenTaskForCustomer(c.id)) != null;
            // Anything that actually reached the customer since the handoff
            // means somebody got there first. A draft still sitting in
            // PENDING_APPROVAL does not count: nobody has seen it but us.
            const answered = (await store.listMessages(c.id)).some((m) =>
              m.direction === 'OUT' && m.status === 'SENT'
              && new Date(m.createdAt).getTime() > new Date(job.createdAt ?? job.runAt).getTime());
            if (open && !answered) {
              const { body, key: ackKey } = await ackBody(c.lang, tickTemplates);
              // Inside the window by construction (the long message arrived
              // half an hour ago), but the same template-or-text shape as the
              // other system lines, so a Library {{PLACEHOLDER}} slip is
              // caught before it goes (audit, 3 Sep).
              if (/\{\{[A-Z_]+\}\}/.test(body)) {
                await store.audit('assistant', 'handoff_ack_held', { customerId: c.id, reason: 'placeholder left in the Library text' });
                await store.setJobStatus(job.id, 'DONE');
                continue;
              }
              const ackTemplate = { name: ackKey, params: [], lang: c.lang, fallbackToText: true };
              const out = await deliverOut(c, body, 'AI', { waTemplate: ackTemplate }, ackTemplate);
              await store.audit('assistant', out.ok ? 'handoff_ack_sent' : 'handoff_ack_failed', {
                customerId: c.id, error: out.ok ? undefined : out.error,
              });
            } else {
              await store.audit('assistant', 'handoff_ack_skipped', {
                customerId: c.id, reason: answered ? 'already answered' : 'task closed',
              });
            }
          }
        } catch (e) {
          await store.audit('assistant', 'handoff_ack_crashed', {
            error: (e as Error).message?.slice(0, 200),
          }).catch(() => {});
        }
        await store.setJobStatus(job.id, 'DONE');
        continue;
      }

      if (job.kind === 'NIGHTLY') {
        await runNightly();
        // Catch-up, not a schedule. Most lost leads are assessed the moment
        // they close. A lead that simply went silent in a sales stage never
        // transitions anywhere, so nothing would ever ask about it; nightly
        // maintenance queues one run if any of those are waiting. It is a
        // no-op when there is nothing to assess.
        await ensureLostAnalysisSoon().catch(() => { /* maintenance is best effort */ });
        await store.setJobStatus(job.id, 'DONE');
        await ensureNightly();
        continue;
      }
      if (job.kind === 'DAILY_DIGEST') {
        // Best-effort, like the old monthly digest: a failed send is not
        // recorded as sent, so the job requeues and the next run retries.
        try { await runDailyDigest(Date.now()); }
        catch (e) { await store.audit('nightly', 'daily_digest_crashed', { error: (e as Error).message?.slice(0, 200) }).catch(() => {}); }
        await store.setJobStatus(job.id, 'DONE');
        await ensureDailyDigest();
        continue;
      }
      if (job.kind === 'LOST_ANALYSIS') {
        // Best-effort, exactly like the digest above: the run records its own
        // outcome (including "the AI budget stopped me"), so a crash here must
        // not take the tick down with it. The day key is only written by a run
        // that got that far, so a crashed run is retried on the next tick.
        //
        // It is given whatever is LEFT of this tick's budget, never more: each
        // post-mortem is a model call of up to 45s, and the invocation itself is
        // capped at 60s. The run stops on that deadline with every finished lead
        // already stored, and asks to be resumed rather than being killed
        // mid-call and burning a retry on the job.
        let outcome: Awaited<ReturnType<typeof runLostLeadAnalysis>> | null = null;
        const leftOfTick = Math.max(2_000, TICK_BUDGET_MS - (Date.now() - startedAt) - 5_000);
        try { outcome = await runLostLeadAnalysis(Date.now(), leftOfTick); }
        catch (e) { await store.audit('nightly', 'lost_analysis_crashed', { error: (e as Error).message?.slice(0, 200) }).catch(() => {}); }
        await store.setJobStatus(job.id, 'DONE');
        if (outcome === 'incomplete') {
          // Same night, more leads to get through. Come back in a few minutes
          // rather than waiting for tomorrow's 4am slot.
          await store.addJob({
            customerId: null, kind: 'LOST_ANALYSIS', payload: {},
            runAt: new Date(Date.now() + 3 * 60 * 1000).toISOString(),
          });
        }
        // Every other outcome ends here. This branch used to call
        // ensureLostAnalysisSoon() unconditionally: the job just finished is
        // DONE, so the existence check saw nothing and queued another run two
        // minutes out, which returned 'already_run' and queued the next, about
        // 720 no-op will_jobs rows a day for ever. A close (reconcileSchedule)
        // and the nightly job already queue a run whenever one is needed, so
        // nothing is lost by stopping (audit, 5 Sep).
        continue;
      }
      if (!job.customerId) { await store.setJobStatus(job.id, 'CANCELLED'); continue; }
      const customer = await store.getCustomerById(job.customerId);
      if (!customer) { await store.setJobStatus(job.id, 'CANCELLED'); continue; }

      if (job.kind === 'AUTO_CLOSE') {
        if (FLOW_ELIGIBLE_STATES.prePayment.includes(customer.state)) {
          await store.setState(customer.id, 'WENT_COLD', 'SYSTEM');
          await store.audit('system', 'auto_closed_went_cold', { customerId: customer.id });
          result.closed.push(customer.name ?? customer.waId);
        }
        await store.setJobStatus(job.id, 'DONE');
        continue;
      }

      // FORM_RECEIVED: the customer submitted the questionnaire (matched from
      // crm_tasks by the DB trigger). Mark complete, stop form chasers, and send
      // the confirmation in the customer's language. Idempotent: only acts if the
      // customer is still waiting on the form.
      if (job.kind === 'FORM_RECEIVED') {
        // ── THE TWO SENDS, AND WHAT HAPPENS WHEN META THROTTLES ONE (audit, 5 Sep)
        //
        // deliverOut answers a Meta 429 with {ok:false, retryable:true} and
        // deliberately raises no task for it ("try again later"). The FOLLOW_UP
        // handler honours that by re-queueing the step; here the result was
        // simply dropped, the customer was already FORM_COMPLETE and the job
        // DONE, so a throttled acknowledgement or ABN questions were lost for
        // good with no card on the board. Worse for a TFN + ABN customer: the
        // acknowledgement was recorded as owed for a question they never got,
        // and the Medicare line stood aside for two hours waiting on an answer
        // that could not come. So each send is now a small helper that reports
        // whether it went; a throttled one is replayed as a FORM_RECEIVED job
        // with payload {resend} that skips the state gate and sends just that
        // one message, 30 minutes on (next evening window on Meta's daily
        // marketing limit 131049, as FOLLOW_UP does). Same message, same
        // wording, only later instead of never. A non-retryable failure
        // already raised its task in deliverOut, so nothing changes there.
        const resend = job.payload.resend === 'ack' || job.payload.resend === 'abn' ? job.payload.resend : null;
        const requeueThrottled = async (what: 'ack' | 'abn', error: string | undefined) => {
          const marketingLimit = /131049/.test(error ?? '');
          const retryAt = marketingLimit
            ? deferToMorning(new Date())
            : new Date(Date.now() + 30 * 60 * 1000);
          await store.addJob({
            customerId: customer.id, kind: 'FORM_RECEIVED', payload: { resend: what },
            runAt: retryAt.toISOString(),
          }).catch(() => { /* audited below; nothing else can be done inside the tick */ });
          await store.audit('scheduler', 'form_received_throttled_requeued', {
            customerId: customer.id, resend: what,
            reason: marketingLimit ? 'meta_marketing_limit_131049' : 'rate_limited',
            retryAt: retryAt.toISOString(),
          }).catch(() => {});
          result.deferred++;
        };
        // The confirmation now lives in the Library, one entry per language
        // (seed.ts), so the owner can edit it without a deploy. The i18n
        // constants stay as the fallback for a store that cannot be read.
        const libraryCopy = async (lang: string | null) => {
          try {
            const key = formReceivedTemplateKey(lang);
            // Once per tick, not once per FORM_RECEIVED job (audit3 sched 76, 5 Sep).
            const t = (await tickTemplates()).find((x) => x.key === key);
            return t && t.body.trim() ? t.body : null;
          } catch { return null; }
        };
        /** The "we've received your questionnaire" line. Returns whether the
         *  customer has it (or it is waiting for approval, which counts). */
        const sendAck = async (): Promise<boolean> => {
          let body = (await libraryCopy(customer.lang)) ?? formReceivedMessage(customer.lang);
          const verdict = policyGuard(body, {
            state: 'FORM_COMPLETE', paid: true, aiPaused: false, killSwitch: false,
            optedOut: false, isLegacy: false,
            lastCustomerMsgAt: customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt) : null,
            isApprovedTemplate: true, estimateFromTeam: customer.estimatedRefundCents,
          });
          if (!verdict.allowed) body = (await libraryCopy('en')) ?? formReceivedMessage('en'); // English is guard-safe
          // Template named by the Library key when Jo has created it in
          // Meta (works outside the 24h window), the same text as free text
          // when he has not (works inside it). A web form arrives whenever
          // the customer fills it, often days after their last WhatsApp
          // message, so free text alone failed silently there (audit, 3 Sep).
          const confirmTemplate = { name: formReceivedTemplateKey(customer.lang), params: [], lang: customer.lang, fallbackToText: true };
          if (await inApprovalMode()) {
            await store.addMessage({
              customerId: customer.id, direction: 'OUT', author: 'AI',
              status: 'PENDING_APPROVAL', body, meta: { waTemplate: confirmTemplate },
            });
            return true;
          }
          const out = await deliverOut(customer, body, 'AI', { waTemplate: confirmTemplate }, confirmTemplate);
          if (!out.ok && out.retryable) await requeueThrottled('ack', out.error);
          return out.ok;
        };
        /** The ABN questions, for a TFN + ABN customer. Returns whether they
         *  went (or are waiting for approval). Leaves the "acknowledgement
         *  owed" flag unset while a throttled send is still to be replayed: a
         *  question the customer has not received cannot be owed an answer. */
        const sendAbn = async (): Promise<boolean> => {
          // In the customer's language: Library key req_abn (English) or
          // req_abn_<lang>, code copy as the fallback (audit, 3 Sep: these
          // went out in English to everyone).
          const abnKey = requestAbnTemplateKey(customer.lang);
          let abnBody: string = requestAbnMessage(customer.lang);
          try {
            // Once per tick, not once per FORM_RECEIVED job (audit3 sched 76, 5 Sep).
            const t = (await tickTemplates()).find((x) => x.key === abnKey);
            if (t && t.body.trim()) abnBody = t.body;
          } catch { /* fall back to the code copy */ }
          const abnVerdict = policyGuard(abnBody, {
            state: 'FORM_COMPLETE', paid: true, aiPaused: false, killSwitch: false,
            optedOut: false, isLegacy: false,
            lastCustomerMsgAt: customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt) : null,
            isApprovedTemplate: true, estimateFromTeam: customer.estimatedRefundCents,
          });
          if (!abnVerdict.allowed) return false;
          const abnTemplate = { name: abnKey, params: [], lang: customer.lang, fallbackToText: true };
          if (await inApprovalMode()) {
            await store.addMessage({
              customerId: customer.id, direction: 'OUT', author: 'AI',
              status: 'PENDING_APPROVAL', body: abnBody, meta: { waTemplate: abnTemplate },
            });
          } else {
            const out = await deliverOut(customer, abnBody, 'AI', { waTemplate: abnTemplate }, abnTemplate);
            if (!out.ok && out.retryable) {
              // The replay owns the flag: it is set when the questions
              // actually go. A refusal for good falls through as before:
              // deliverOut raised the task, Jo sends the questions by hand,
              // and the answer still triggers the owed acknowledgement.
              await requeueThrottled('abn', out.error);
              return false;
            }
          }
          await store.audit('system', 'abn_questions_sent', { customerId: customer.id });
          // The acknowledgement is now OWED, and goes the moment they
          // answer (service.ts, sendOwedFormAck). Recorded as a setting
          // so it survives restarts and needs no column.
          await store.setSetting(abnAnswersPendingKey(customer.id), true);
          return true;
        };

        if (resend) {
          // A replay of one throttled message. No state change, no chaser
          // cancelling, no Medicare replay: all of that was done by the job
          // that won the transition. Only while the customer is still where
          // that job left them; a chat a person has since moved on, paused or
          // that opted out gets nothing, exactly as the first attempt would.
          if (customer.state === 'FORM_COMPLETE' && !customer.optedOut && !customer.aiPaused && !customer.isLegacy
              && !(resend === 'abn' && (await store.getSetting(abnAnswersPendingKey(customer.id))) === true)) {
            const went = resend === 'ack' ? await sendAck() : await sendAbn();
            if (went) result.sent.push(`${customer.name ?? customer.waId} · ${resend === 'ack' ? 'questionnaire received' : 'ABN questions'} (resent)`);
          } else {
            await store.audit('scheduler', 'form_received_resend_skipped', { customerId: customer.id, resend, state: customer.state }).catch(() => {});
          }
          await store.setJobStatus(job.id, 'DONE');
          continue;
        }

        // setState reports whether THIS call made the move. Two FORM_RECEIVED
        // jobs can exist (the DB trigger and form-link.ts both enqueue) and be
        // claimed on overlapping ticks; only the one that wins the transition
        // sends the confirmation, the other simply ends (audit, 3 Sep).
        if (['PAID', 'FORM_PENDING'].includes(customer.state)
            && await store.setState(customer.id, 'FORM_COMPLETE', 'SYSTEM')) {
          await store.updateCustomer(customer.id, { formComplete: true });
          await store.cancelJobsFor(customer.id, ['FOLLOW_UP']);
          // A questionnaire that arrived BEFORE payment carried its Medicare
          // "No" here as a setting (form-link.ts), because the replayed
          // FORM_RECEIVED job the Paid cascade queues has no answer on it.
          // Queue the exemption message now, 15 minutes after this
          // acknowledgement, exactly as a post-payment form would have, and
          // clear the setting so it goes once (audit, 5 Sep). Only the job
          // that won the transition gets here, so two replays cannot both
          // queue it.
          try {
            if ((await store.getSetting(medicareNoKey(customer.id))) === true) {
              await store.setSetting(medicareNoKey(customer.id), false);
              await store.addJob({
                customerId: customer.id,
                kind: 'MEDICARE_INFO',
                payload: { attempt: 0 },
                runAt: new Date(Date.now() + MEDICARE_DELAY_MS).toISOString(),
              });
              await store.audit('system', 'medicare_info_queued', { customerId: customer.id, rememberedBeforePayment: true });
            }
          } catch (e) {
            await store.audit('system', 'medicare_no_replay_failed', {
              customerId: customer.id,
              error: e instanceof Error ? e.message.slice(0, 200) : String(e).slice(0, 200),
            }).catch(() => { /* the store is the likely thing that just failed */ });
          }
          if (!customer.optedOut && !customer.aiPaused && !customer.isLegacy) {
            // ── WHICH MESSAGE GOES FIRST (Jo, 4 Sep) ────────────────────
            //
            // For a TFN customer the questionnaire IS everything, so the
            // acknowledgement goes now: "we've received it, we'll go through
            // everything and get back to you."
            //
            // For a TFN + ABN customer it is not. We still need the ABN answers
            // before anyone can start, and telling them "we'll now go through
            // everything and get back to you soon" while we are still waiting
            // on them is simply untrue, and it makes the ABN questions that
            // follow read as an afterthought. So they get the ABN questions
            // FIRST, on their own, and the acknowledgement waits until they
            // have actually sent the answers (service.ts sends it then).
            const abnPending = customer.income === 'TFN_ABN';

            if (!abnPending) {
              await sendAck();
            }

            if (abnPending) {
              await sendAbn();
            }
          }
          await store.audit('system', 'form_received_confirmed', { customerId: customer.id });
          result.sent.push(`${customer.name ?? customer.waId} · questionnaire received`);
        }
        await store.setJobStatus(job.id, 'DONE');
        continue;
      }

      // MEDICARE_INFO: the questionnaire said "No" to "Do you have access to
      // Medicare in Australia?", so this person can apply for the Medicare Levy
      // Exemption. Queued by form-link.ts for 15 minutes after the form arrives
      // (Jo, 4 Sep) so it lands after the questionnaire acknowledgement rather
      // than on top of it, and so nobody has to remember to send it by hand.
      if (job.kind === 'MEDICARE_INFO') {
        // A TFN+ABN customer has been asked the ABN questions and nothing else
        // yet; dropping the Medicare message in while we are waiting on that
        // answer buries it. Stand aside for another 15 minutes, up to 8 times
        // (2 hours), then send regardless — the message must not be lost
        // because a customer never answered.
        const attempt = job.payload.attempt ?? 0;
        const abnPending = (await store.getSetting(abnAnswersPendingKey(customer.id))) === true;
        if (abnPending && attempt < 8) {
          await store.addJob({
            customerId: customer.id,
            kind: 'MEDICARE_INFO',
            payload: { attempt: attempt + 1 },
            runAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
          });
          await store.setJobStatus(job.id, 'DONE');
          continue;
        }

        if (!customer.optedOut && !customer.isLegacy) {
          // The Library entry is the owner's copy and is what he edits; the
          // code constant is the fallback for a store that cannot be read.
          // In the customer's language: Library key `medicare` (English, the
          // key Jo knows) or medicare_<lang>, the same-language code copy as
          // the fallback (audit, 5 Sep: this was the last post-form auto-send
          // that went out in English to everyone, and it is the one asking
          // them to go and DO something). English stays APPROVED verbatim.
          const medicareKey = medicareTemplateKey(customer.lang);
          let body: string | null = null;
          try {
            // Once per tick, not once per MEDICARE_INFO job (audit3 sched 76, 5 Sep).
            const t = (await tickTemplates()).find((x) => x.key === medicareKey);
            body = t && t.body.trim() ? t.body : null;
          } catch { /* the Library is a bonus; the constant is the fallback */ }
          body = body ?? (medicareKey === 'medicare' ? APPROVED.medicare_exemption : medicareMessage(customer.lang));
          const verdict = policyGuard(body, {
            state: customer.state, paid: true, aiPaused: false, killSwitch: false,
            optedOut: false, isLegacy: false,
            lastCustomerMsgAt: customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt) : null,
            isApprovedTemplate: true, estimateFromTeam: customer.estimatedRefundCents,
          });
          if (!verdict.allowed) {
            await raiseOrUpdateTask(store, customer, {
              reason: `Medicare exemption message held by the Policy Guard: ${verdict.violations.join(', ')}. Check the Library entry "${medicareKey}" and send it by hand.`,
              severity: 'REVIEW', newContext: body.slice(0, 300), suggestedReply: body,
            });
            await store.setJobStatus(job.id, 'DONE');
            continue;
          }
          // 15 minutes after a web form is usually well outside the 24h window,
          // so this goes as the approved template named by the Library key
          // (`medicare` or medicare_<lang>) when Jo has it in Meta and as the
          // same text when he does not.
          const medicareTemplate = { name: medicareKey, params: [], lang: customer.lang, fallbackToText: true };
          if (await inApprovalMode()) {
            await store.addMessage({
              customerId: customer.id, direction: 'OUT', author: 'AI',
              status: 'PENDING_APPROVAL', body, meta: { waTemplate: medicareTemplate },
            });
            await store.audit('system', 'medicare_info_sent', { customerId: customer.id, approval: true });
            result.sent.push(`${customer.name ?? customer.waId} · Medicare exemption`);
          } else {
            const out = await deliverOut(customer, body, 'AI', { waTemplate: medicareTemplate }, medicareTemplate);
            if (out.ok) {
              await store.audit('system', 'medicare_info_sent', { customerId: customer.id });
              result.sent.push(`${customer.name ?? customer.waId} · Medicare exemption`);
            } else {
              await raiseOrUpdateTask(store, customer, {
                reason: `The Medicare exemption message was not delivered: ${out.error ?? 'WhatsApp rejected it'}. If it needs the approved template, create "${medicareKey}" in WhatsApp Manager (no variables) and it sends itself next time.`,
                severity: 'REVIEW', newContext: body.slice(0, 300), suggestedReply: body,
              });
              await store.audit('system', 'medicare_info_failed', { customerId: customer.id, error: out.error ?? null });
            }
          }
        }
        await store.setJobStatus(job.id, 'DONE');
        continue;
      }

      // REVIEW_REQUEST: 1 hour after a customer is marked lodged, ask for a
      // Google review as its OWN warmer message (Jo, 31 Aug). The lodgement note
      // no longer carries the ask; this does, once, a little after the good news
      // has landed. Skip anyone who opted out or is a legacy import, and only
      // send to someone still in the done stage (signed/lodged/completed).
      if (job.kind === 'REVIEW_REQUEST') {
        if (!customer.optedOut && !customer.isLegacy
          && ['SIGNED', 'LODGED', 'COMPLETED'].includes(customer.state)) {
          let body: string | null = null;
          try {
            const key = reviewRequestTemplateKey(customer.lang);
            // Once per tick, not once per REVIEW_REQUEST job (audit3 sched 76, 5 Sep).
            const t = (await tickTemplates()).find((x) => x.key === key);
            body = t && t.body.trim() ? t.body : null;
          } catch { /* the Library is a bonus; the constant is the fallback */ }
          body = body ?? reviewRequestMessage(customer.lang);
          // Through the guard like everything else Will says (a Library edit
          // can leave a {{PLACEHOLDER}} behind; audit, 3 Sep), as the system
          // message it is: the window is Meta's call, see fallbackToText.
          const verdict = policyGuard(body, {
            state: customer.state, paid: true, aiPaused: false, killSwitch: false,
            optedOut: false, isLegacy: false,
            lastCustomerMsgAt: customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt) : null,
            isApprovedTemplate: true, estimateFromTeam: customer.estimatedRefundCents,
          });
          if (!verdict.allowed) {
            await raiseOrUpdateTask(store, customer, {
              reason: `Review request held by the Policy Guard: ${verdict.violations.join(', ')}. Check the Library entry and send it by hand.`,
              severity: 'REVIEW', newContext: body.slice(0, 200), suggestedReply: body,
            });
            await store.setJobStatus(job.id, 'DONE');
            continue;
          }
          const reviewTemplate = { name: reviewRequestTemplateKey(customer.lang), params: [], lang: customer.lang, fallbackToText: true };
          if (await inApprovalMode()) {
            await store.addMessage({
              customerId: customer.id, direction: 'OUT', author: 'AI',
              status: 'PENDING_APPROVAL', body, meta: { waTemplate: reviewTemplate },
            });
            await store.audit('system', 'review_request_sent', { customerId: customer.id });
            result.sent.push(`${customer.name ?? customer.waId} · review request`);
          } else {
            const out = await deliverOut(customer, body, 'AI', { waTemplate: reviewTemplate }, reviewTemplate);
            if (out.ok) {
              await store.audit('system', 'review_request_sent', { customerId: customer.id });
              result.sent.push(`${customer.name ?? customer.waId} · review request`);
            } else {
              // THE REVIEW REQUEST IS ALMOST ALWAYS OUTSIDE THE WINDOW.
              //
              // It goes an hour after lodgement, and by then the customer has
              // usually not written for days, so free text is refused by Meta
              // and only an approved template can reach them. Mads, 4 Sep: the
              // ask failed in the chat and the card said "WhatsApp did not
              // deliver this message", which is true and useless — there is
              // nothing to fix in the conversation. What is missing is the
              // template. The task now says exactly that, and names it.
              const missingTemplate = /131047|24|window|template/i.test(out.error ?? '');
              await raiseOrUpdateTask(store, customer, {
                reason: missingTemplate
                  ? `The Google review ask could not be delivered: ${customer.name?.split(/\s+/)[0] ?? 'this customer'} has not written for over a day, so it needs the approved WhatsApp template "${reviewTemplate.name}", which does not exist yet in WhatsApp Manager. Create it there (no variables) and this sends itself next time.`
                  : `The Google review ask was not delivered: ${out.error ?? 'WhatsApp rejected it'}.`,
                severity: 'REVIEW',
                newContext: body.slice(0, 300),
                suggestedReply: body,
              });
              await store.audit('system', 'review_request_failed', { customerId: customer.id, error: out.error ?? null, template: reviewTemplate.name });
            }
          }
        }
        await store.setJobStatus(job.id, 'DONE');
        continue;
      }

      // AUTO_REPLY, current shape (Jo, 3 Sep): the two-minute timer. Timers
      // are pulled out of the batch and run first, a few at a time, see
      // runAutoReplyTimer above the loop. Kept here as a guard so a timer can
      // never fall through to the older messageId branch below.
      if (job.kind === 'AUTO_REPLY' && job.payload.debounce) {
        await runAutoReplyTimer(store, job, result, customer);
        continue;
      }

      // AUTO_REPLY, older shape: an Autopilot answer that was written when the
      // customer's message arrived and deliberately held back for a few
      // minutes. Only jobs armed before the 3 Sep change carry a messageId;
      // kept so a reply already queued at deploy time still goes out.
      if (job.kind === 'AUTO_REPLY') {
        const msg = job.payload.messageId ? await store.getMessageById(job.payload.messageId) : null;
        // Gone, or already dealt with by a human (discarded, sent, blocked).
        if (!msg || msg.status !== 'QUEUED') { await store.setJobStatus(job.id, 'DONE'); continue; }

        // The conversation moved while the reply waited. Anything the customer
        // said after this was drafted produced its own, better-informed reply,
        // so sending this one now would be answering a question that has been
        // overtaken. Drop it rather than talk past them.
        const stale = customer.lastCustomerMsgAt != null
          && new Date(customer.lastCustomerMsgAt).getTime() > new Date(msg.createdAt).getTime();
        // (The kill switch is handled above: it returns before any job runs.)
        if (stale || customer.optedOut || customer.aiPaused) {
          await store.setMessageStatus(msg.id, 'DISCARDED');
          await store.setJobStatus(job.id, 'CANCELLED');
          continue;
        }

        // Re-run the guard against the customer as they are NOW, not as they
        // were when the reply was written. Four minutes is long enough for a
        // payment to land and for a sales line to become the wrong thing to say.
        // Once per tick, not once per legacy AUTO_REPLY job (audit3 sched 76, 5 Sep).
        try { registerLibraryBodies((await tickTemplates()).map((t) => t.body)); } catch { /* best effort */ }
        const verdict = policyGuard(msg.body, {
          state: customer.state, paid: customer.paid, aiPaused: customer.aiPaused, killSwitch: false,
          optedOut: customer.optedOut, isLegacy: customer.isLegacy,
          lastCustomerMsgAt: customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt) : null,
          isApprovedTemplate: false, estimateFromTeam: customer.estimatedRefundCents,
        });
        if (!verdict.allowed) {
          await store.setMessageStatus(msg.id, 'BLOCKED');
          await raiseOrUpdateTask(store, customer, {
            reason: `Autopilot reply blocked before sending: ${verdict.violations.join(', ')}`,
            severity: 'REVIEW', newContext: msg.body.slice(0, 200),
            suggestedReply: await suggestReply('', customer, 'guard_blocked', msg.body),
          });
          await store.setJobStatus(job.id, 'DONE');
          continue;
        }

        // THE POINT OF NO RETURN, CLAIMED ATOMICALLY.
        //
        // Without this, a crash between the send and the status write left the
        // row QUEUED; reclaimStaleJobs put the job back; the "still QUEUED?"
        // guard above passed, because that write is precisely what did not
        // happen; and the customer received the same reply twice. Only the
        // winner of QUEUED -> SENDING may transmit, so a replay stops here.
        if (!(await store.claimQueuedForSend(msg.id))) {
          await store.setJobStatus(job.id, 'DONE');
          continue;
        }
        const res = await sendWhatsAppText(customer.waId, msg.body);
        await store.setMessageStatus(msg.id, res.ok ? 'SENT' : 'FAILED', { restamp: true });
        if (res.ok) {
          // Only now does the world move: the state and income this reply
          // presupposed are applied at the moment it actually reaches them.
          if (msg.meta?.proposedState && msg.meta.proposedState !== customer.state) {
            await store.setState(customer.id, msg.meta.proposedState, 'AI');
            // Same Paid -> Form Pending cascade the auto-send and approval paths
            // do, so a payment confirmed through the delayed-autopilot reply arms
            // the form follow-ups instead of stalling in Paid.
            if (msg.meta.proposedState === 'PAID') await store.setState(customer.id, 'FORM_PENDING', 'SYSTEM');
          }
          if (msg.meta?.income) await store.updateCustomer(customer.id, { income: msg.meta.income });
          // The stage moved at send time, so the cadence for the NEW stage is
          // armed now (audit, 3 Sep: a text "I paid" on Autopilot reached Form
          // Pending with no form reminder ever scheduled).
          if (msg.meta?.proposedState) {
            const fresh = await store.getCustomerById(customer.id);
            if (fresh) { try { await reconcileSchedule(fresh); } catch { /* best effort, the reply is out */ } }
          }
          result.sent.push(`${customer.name ?? customer.waId} · autopilot reply`);
        } else {
          await store.audit('channel', 'send_failed', { customerId: customer.id, error: res.error });
          await raiseOrUpdateTask(store, customer, {
            reason: `WhatsApp send failed: ${res.error ?? 'unknown error'}`,
            severity: 'REVIEW', newContext: msg.body.slice(0, 200), suggestedReply: msg.body,
          });
        }
        await store.setJobStatus(job.id, 'DONE');
        continue;
      }

      // FOLLOW_UP
      const flow = job.payload.flow as Flow;
      const seq = job.payload.seq ?? 0;
      // The per-customer off switch is checked at fire time too (audit, 5 Sep):
      // a job that was already SCHEDULED, deferred to the evening or re-queued
      // after a throttle when Jo pressed "Stop chasing" is cancelled here
      // rather than sent.
      if (!FLOW_ELIGIBLE_STATES[flow]?.includes(customer.state) || customer.optedOut || customer.aiPaused || customer.isLegacy
          || (flow === 'prePayment' && customer.paid)
          || (await store.getSetting(followupsOffKey(customer.id))) === true) {
        await store.setJobStatus(job.id, 'CANCELLED');
        continue;
      }
      if (!withinQuietHours()) {
        await store.setJobStatus(job.id, 'CANCELLED');
        await store.addJob({ customerId: customer.id, kind: 'FOLLOW_UP', payload: job.payload, runAt: deferToMorning().toISOString() });
        result.deferred++;
        continue;
      }
      const template = (await tickTemplates()).find((t) => t.key === job.payload.templateKey);
      // H6: one bad step must not kill the whole cadence. Skip this message but
      // still schedule the next one in the sequence.
      if (!template) {
        // This is the other half of the delete_template fix (route.ts,
        // audit, 5 Sep): a step can also go missing without anyone deleting
        // it here (a bad Sync from file, a renamed key). Write the same
        // `follow_up_template_missing` row system-report.ts already looks
        // for, so the System card catches this case too instead of only the
        // owner-initiated delete (audit, 5 Sep).
        await store.audit('scheduler', 'follow_up_template_missing', {
          customerId: customer.id, templateKey: job.payload.templateKey,
          note: `Follow-up step "${job.payload.templateKey}" is not in the Library. Every customer due that step is skipped until it is restored with Sync library from file.`,
        });
        await store.setJobStatus(job.id, 'FAILED');
        await scheduleFollowUp(customer.id, flow, seq + 1);
        continue;
      }

      const verdict = policyGuard(template.body, {
        state: customer.state, paid: customer.paid, aiPaused: customer.aiPaused, killSwitch: false,
        optedOut: customer.optedOut, isLegacy: customer.isLegacy,
        lastCustomerMsgAt: customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt) : null,
        isApprovedTemplate: true, estimateFromTeam: customer.estimatedRefundCents,
      });
      if (!verdict.allowed) {
        await store.setJobStatus(job.id, 'FAILED');
        // With a bad Library placeholder this fires on every cadence step for
        // every customer in the flow; the fold keeps it to one card each
        // (audit, 5 Sep).
        await raiseOrUpdateTask(store, customer, {
          reason: `Follow-up blocked by Policy Guard: ${verdict.violations.join(', ')}`,
          severity: 'REVIEW', newContext: template.title,
          // Show the follow-up that was refused, so it can be corrected and sent
          // rather than rewritten from scratch.
          suggestedReply: await suggestReply('', customer, 'guard_blocked', template.body),
        });
        await scheduleFollowUp(customer.id, flow, seq + 1);
        continue;
      }

      // A/B testing is off. Every customer gets the message as written in the
      // Library. The variantB column and the sent/conv counters are still in
      // the store so past results are not thrown away, but nothing reads them
      // to decide what to send, and no new counts are recorded.
      let body = template.body;
      // Every follow-up lands OUTSIDE Meta's 24h window by definition: we are
      // messaging someone precisely because they went quiet. Free-form text is
      // rejected there, so it goes as a pre-approved template. `body` is that
      // same text with {{1}} filled in, so what we log and show in the CRM is
      // exactly what the customer receives.
      const firstName = greetingName(customer);
      body = body.replace(/\{\{1\}\}/g, firstName);
      // Their language when that translation is approved in WhatsApp Manager,
      // English when it is not. channel.ts handles the fallback.
      const waTemplate = { name: template.key, params: [firstName], lang: customer.lang };

      // REL-02: mark the job DONE BEFORE sending, so an at-least-once replay
      // (crash between send and status-write) cannot re-deliver the same nudge.
      // A follow-up is a non-critical reminder; a rare missed nudge is far better
      // than spamming the customer with duplicates.
      await store.setJobStatus(job.id, 'DONE');

      const meta = { waTemplate };

      if (await tickApprovalMode()) {
        // Approval mode means approval for EVERYTHING. A scheduled follow-up
        // used to be the one thing that went out on its own, which quietly
        // broke the promise the mode makes.
        await store.addMessage({
          customerId: customer.id, direction: 'OUT', author: 'AI',
          status: 'PENDING_APPROVAL', body, meta,
        });
        await store.audit('scheduler', 'follow_up_awaiting_approval', {
          customerId: customer.id, template: template.key, seq,
        });
        result.sent.push(`${customer.name ?? customer.waId} · ${template.title} (awaiting approval)`);
        await scheduleFollowUp(customer.id, flow, seq + 1);
        continue;
      }

      const sent = await deliverOut(customer, body, 'AI', meta, waTemplate);
      if (!sent.ok && sent.retryable) {
        // Meta throttled us (429). Re-queue THIS same step for later rather than
        // advancing the cadence, so the nudge still goes out and is not silently
        // skipped — and no "send failed" task is raised (deliverOut suppressed it
        // for a retryable send). This job was already marked DONE above, so a
        // fresh job for the same step is added.
        // HOW LONG TO WAIT DEPENDS ON WHICH LIMIT WE HIT.
        //
        // An app or pair rate limit clears in minutes, so 30 minutes is right.
        // Meta's per-person MARKETING limit (131049, Momo 4 Sep) does not: it
        // resets on a daily cycle, so retrying in 30 minutes just fails again
        // and burns the step. That one waits for the next evening window, which
        // is when a follow-up is allowed to go out anyway.
        const marketingLimit = /131049/.test(sent.error ?? '');
        const retryAt = marketingLimit
          ? deferToMorning(new Date())
          : new Date(Date.now() + 30 * 60 * 1000);
        // This job was already flipped to DONE above (REL-02) so a crash
        // between send and status-write cannot double-send. But that also
        // means reconcileSchedule's doneCount (line ~204) now counts THIS step
        // as delivered even though nothing went out. If the requeue below
        // succeeds, flip the original back to CANCELLED so it drops out of
        // that count and the retry is the only record of the step; if the
        // insert itself throws, leave it DONE (so nothing resends) but audit
        // the loss instead of the old silent catch, which claimed a requeue
        // that never happened (audit, 5 Sep).
        try {
          await store.addJob({
            customerId: customer.id, kind: 'FOLLOW_UP', payload: job.payload,
            runAt: retryAt.toISOString(),
          });
          await store.setJobStatus(job.id, 'CANCELLED');
          await store.audit('scheduler', 'follow_up_throttled_requeued', {
            customerId: customer.id, template: template.key, seq,
            reason: marketingLimit ? 'meta_marketing_limit_131049' : 'rate_limited',
            retryAt: retryAt.toISOString(),
          });
        } catch (requeueErr) {
          const requeueMessage = requeueErr instanceof Error ? requeueErr.message : String(requeueErr);
          await store.audit('scheduler', 'follow_up_requeue_failed', {
            customerId: customer.id, template: template.key, seq,
            reason: marketingLimit ? 'meta_marketing_limit_131049' : 'rate_limited',
            error: requeueMessage.slice(0, 300),
          }).catch(() => { /* audit is best effort here */ });
        }
        result.deferred++;
        continue;
      }
      if (sent.ok) {
        await store.audit('scheduler', 'follow_up_sent', { customerId: customer.id, template: template.key, seq });
        result.sent.push(`${customer.name ?? customer.waId} · ${template.title}`);
      } else {
        // A send Meta refused for good (template missing, wrong param count,
        // expired token) used to fall through here and be audited and listed
        // as SENT, while deliverOut had already marked the message FAILED and
        // raised the task. An evening of failed nudges then read as a good
        // evening. Report the truth; the cadence still advances below (H6:
        // one bad step must not kill the sequence) (audit, 5 Sep).
        await store.audit('scheduler', 'follow_up_failed', {
          customerId: customer.id, template: template.key, seq, error: sent.error ?? null,
        });
        result.failed = (result.failed ?? []).concat(`${customer.name ?? customer.waId} · ${template.title}`);
      }
      await scheduleFollowUp(customer.id, flow, seq + 1);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      // A FOLLOW_UP is marked DONE deliberately BEFORE it sends (REL-02 above),
      // so by the time anything here can throw the customer may already have the
      // message. Flipping DONE back to FAILED made the cadence read the step as
      // never delivered and queue the same template again — the customer got the
      // same follow-up twice. Only fail a job that has not already completed.
      const current = await store.getJob(job.id).catch(() => null);
      const alreadyDone = current?.status === 'DONE';
      if (!alreadyDone) {
        await store.setJobStatus(job.id, 'FAILED').catch(() => { /* nothing left to do */ });
      }
      // This catch was entirely silent — no log, no audit — so every scheduler
      // crash was invisible and the cadence just stopped.
      await store.audit('scheduler', 'job_crashed', {
        jobId: job.id, kind: job.kind, customerId: job.customerId,
        alreadyDone, error: message.slice(0, 300),
      }).catch(() => { /* audit is best-effort here */ });
      // One bad step must not end the cadence — the same rule the
      // missing-template and guard-blocked branches above already follow.
      if (job.kind === 'FOLLOW_UP' && job.customerId && job.payload.flow) {
        await scheduleFollowUp(job.customerId, job.payload.flow, (job.payload.seq ?? 0) + 1)
          .catch(() => { /* already audited above */ });
      }
    }
  }
  if (timersNotStarted > 0 && !budgetAudited) await auditBudget(timersNotStarted);
  // A HEARTBEAT, SO A DEAD SCHEDULER IS VISIBLE.
  //
  // The scheduler health dot was hardcoded `ok: true`, so every one of the
  // failures this file guards against presented as a green dashboard. This is
  // the one fact the dot actually needs: when did the loop last finish. Best
  // effort, and deliberately last, so it can never be the thing that fails a
  // tick that otherwise worked.
  // try/catch rather than .catch(): this must survive a store that throws AND a
  // partial store that does not implement it at all, because the heartbeat can
  // never be the reason a tick that otherwise worked is reported as failed.
  try { await store.setSetting('last_tick_at', new Date().toISOString()); } catch { /* */ }
  return result;
}

/**
 * One line per affected customer, `id|name|text`, then a `---` separator and
 * the plain sentence the owner reads today (unchanged). Read by
 * parseNightlyIssueLine below (audit3 sched 62, 5 Sep): the nightly
 * consistency card has customerId: null, so it was printed as if the names in
 * it were something a customer typed, with no way to open the chat it named.
 * Encoding the real customer id per line lets that card's UI resolve each
 * name to a chat without changing the sentence the owner already reads.
 */
export function buildNightlyIssueContext(rows: { id: string; name: string; text: string }[], issues: string[]): string {
  const parseable = rows.map((r) => `${r.id}|${r.name}|${r.text}`).join('\n');
  return `${parseable}\n---\n${issues.join(' | ')}`;
}

/** The inverse of buildNightlyIssueContext, one machine-readable line at a time. */
export function parseNightlyIssueLine(line: string): { id: string; name: string; text: string } | null {
  const [id, name, ...rest] = line.split('|');
  if (!id || rest.length === 0) return null;
  return { id, name: name ?? '', text: rest.join('|') };
}

/** Nightly maintenance: consistency checks + morning summary. */
export async function runNightly(): Promise<void> {
  const store = getStore();
  // allCustomers, NOT listCustomers: this function CANCELS every scheduled job
  // whose customerId is not in the set it reads (orphan cleanup, below). With
  // listCustomers() capped at PostgREST's 1,000 rows, at 5,000 customers the
  // other 4,000 would look like orphans and have their live follow-ups
  // cancelled every single night. The set must be complete, so it is paged.
  const customers = await store.allCustomers();
  const salesStates: CustomerState[] = ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING'];
  const closedStates: CustomerState[] = ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'];
  const issues: string[] = [];

  // ── REPAIR, DON'T REPORT (audit, 5 Sep) ──────────────────────────────────
  //
  // "in SIGNED but not marked paid" listed 38 customers in ONE night, and would
  // have listed the same 38 every night after: it is not something the owner can
  // usefully act on 38 times. The cause is fixed at the source (setState now
  // sets `paid` for ANY post-payment stage), but the rows that already drifted
  // stay wrong until something corrects them, and `paid` is what keeps the SALES
  // follow-ups away from a paying customer.
  //
  // A customer who has reached a post-payment stage HAS paid; the stage is the
  // evidence. So the flag is repaired here and the correction is audited, and
  // only what cannot be repaired is reported as an issue: "paid but in a sales
  // state" is the genuinely ambiguous direction (it can mean a wrong stage OR a
  // wrong flag) and is left for a person, exactly as before.
  let repaired = 0;
  // affectedCustomers pairs each unresolved issue with the actual customer it
  // is about (audit3 sched 62, 5 Sep): the card this task ends up on has no
  // customer of its own (see below), so this is what lets that card's
  // context carry a real id per name instead of only the printed sentence.
  const affectedCustomers: { customer: CustomerRow; text: string }[] = [];
  for (const c of customers) {
    if (c.paid && salesStates.includes(c.state)) {
      const text = `paid but in sales state ${c.state}`;
      issues.push(`${c.name ?? c.waId}: ${text}`);
      affectedCustomers.push({ customer: c, text });
    }
    if (!c.paid && !salesStates.includes(c.state) && !closedStates.includes(c.state)) {
      try {
        await store.updateCustomer(c.id, { paid: true });
        repaired++;
      } catch {
        // Only if the repair itself failed does it become something to look at.
        const text = `in ${c.state} but not marked paid`;
        issues.push(`${c.name ?? c.waId}: ${text}`);
        affectedCustomers.push({ customer: c, text });
      }
    }
  }
  if (repaired) {
    await store.audit('system', 'paid_flag_repaired', { count: repaired }).catch(() => { /* diagnostics */ });
  }
  // Went-cold reactivation now happens the moment a closed customer messages
  // again (service.ts, handleIncoming) — event-triggered, not time-based, per
  // the owner's rule: "whenever, whatever they say, however long it's been."
  // Nothing to do here on a timer.

  // allJobs, paged, for the same reason as allCustomers above: a job read capped
  // at 1,000 rows would leave real orphans uncancelled AND, more importantly,
  // pairs with a complete customer set so the cancellation below only ever fires
  // on a genuinely missing customer, never on one that simply was not read.
  //
  // Only SCHEDULED rows can be orphans, so the sweep reads just those when the
  // store can filter server-side (audit3 sched 54, 5 Sep): will_jobs keeps
  // every finished auto-reply timer and hourly LOST_ANALYSIS row, and paging
  // all of it every night to find a handful of live jobs got slower each week.
  // The complete-set guarantee is unchanged, it is still paged, just filtered.
  const jobs = typeof store.listScheduledJobs === 'function'
    ? await store.listScheduledJobs()
    : await store.allJobs();
  // PERF-01: O(jobs) with a Set instead of O(jobs x customers) via .some().
  const customerIds = new Set(customers.map((c) => c.id));
  const orphans = jobs.filter((j) => j.status === 'SCHEDULED' && j.customerId && !customerIds.has(j.customerId));
  for (const o of orphans) await store.setJobStatus(o.id, 'CANCELLED');

  // STRANDED OUTBOUND SWEEP.
  //
  // deliverOut writes a row QUEUED, sends, then reconciles it to SENT/FAILED. An
  // autopilot reply is claimed QUEUED -> SENDING and then sent. If the invocation
  // dies in the gap — after the send, before the status write, or mid-flight —
  // the row is left QUEUED or SENDING forever: the customer may have heard
  // nothing, and nothing on the board says so. Reclaim only ever touched jobs,
  // never these messages, so there was no path back.
  //
  // Anything still unresolved after 15 minutes is far past any real send and
  // past the autopilot delay, so it is genuinely stranded. Each one becomes a
  // one-click "resend" task for the owner (the body is the suggested reply) and
  // is marked FAILED so it is neither swept twice nor mistaken for a live send.
  // If it HAD in fact been delivered, the task says "may not have reached" so the
  // owner decides rather than a duplicate being sent automatically. One task per
  // customer, so a burst does not flood the queue.
  if (typeof store.staleOutbound === 'function') {
    try {
      const stranded = await store.staleOutbound(15 * 60 * 1000);
      const flagged = new Set<string>();
      for (const m of stranded) {
        await store.setMessageStatus(m.id, 'FAILED').catch(() => {});
        if (m.customerId && !flagged.has(m.customerId)) {
          flagged.add(m.customerId);
          const c = customers.find((x) => x.id === m.customerId);
          await raiseOrUpdateTask(store, { id: m.customerId, name: c?.name ?? null, waId: c?.waId ?? null }, {
            reason: 'A reply may not have reached this customer — it got stuck while sending. Check the chat and resend if needed.',
            severity: 'URGENT', newContext: m.body.slice(0, 200), suggestedReply: m.body,
          }).catch(() => {});
        }
      }
      if (stranded.length) {
        await store.audit('scheduler', 'stranded_outbound_swept', { count: stranded.length, customers: flagged.size }).catch(() => {});
      }
    } catch (e) {
      await store.audit('scheduler', 'stranded_outbound_sweep_failed', { error: (e as Error).message?.slice(0, 200) }).catch(() => {});
    }
  }

  // COST-02: purge inbound-idempotency markers older than 30 days so the table
  // does not grow forever (Meta never retries a message that old).
  const purged = await store.purgeProcessedMessages(30 * 24 * 60 * 60 * 1000).catch(() => 0);

  // The decision log answers "why did it do that?", which is worth days, not
  // years: if something breaks you find out within a week. It also grows faster
  // than the conversations do. 90 days is generous for diagnosis and stops the
  // table from eventually dwarfing the messages.
  // Customer conversations are NEVER touched by this.
  const auditPurged = typeof store.purgeAudit === 'function'
    ? await store.purgeAudit(90 * 24 * 60 * 60 * 1000).catch(() => 0)
    : 0;

  // will_jobs was never purged (audit3 sched 54, 5 Sep): every text on
  // Autopilot leaves about three finished rows, every quiet-hours defer one
  // more, and the LOST_ANALYSIS loop 720 a day, so the table only ever grew.
  // Finished rows older than 30 days go: CANCELLED, FAILED, and DONE of every
  // kind EXCEPT FOLLOW_UP. A DONE FOLLOW_UP is the cadence's memory, it is
  // what reconcileSchedule counts to resume at the right step, so those stay.
  // Nothing SCHEDULED or CLAIMED is ever touched, so nothing due changes.
  const jobsPurged = typeof store.purgeFinishedJobs === 'function'
    ? await store.purgeFinishedJobs(30 * 24 * 60 * 60 * 1000).catch(() => 0)
    : 0;

  // Folded, not stacked (audit3 sched 60, 5 Sep): "paid but in sales state" is
  // the one issue the repair above cannot fix on its own, so it persists until
  // someone moves the stage, and a plain addTask here opened a fresh
  // customer-less card every night for the same names. This refreshes the one
  // open card instead of stacking, and closes it once the condition clears.
  const isNightlyCheckTask = (t: { reason: string }) => t.reason.startsWith('Nightly consistency check');
  if (issues.length) {
    await raiseOrFoldSystemTask(store, {
      match: isNightlyCheckTask,
      reason: `Nightly consistency check found ${issues.length} issue(s)`,
      severity: 'REVIEW',
      context: buildNightlyIssueContext(
        affectedCustomers.map(({ customer, text }) => ({ id: customer.id, name: customer.name ?? customer.waId ?? '', text })),
        issues,
      ),
      suggestedReply: null,
    });
  } else {
    await resolveSystemTasks(store, isNightlyCheckTask);
  }
  // The monthly "what customers wrote" email is gone — replaced by the
  // DAILY_DIGEST job (daily-digest.ts), scheduled separately for 8am
  // Melbourne so its delivery time doesn't depend on when this nightly run
  // happens to fire.

  await store.audit('nightly', 'maintenance_complete', { customers: customers.length, orphanJobsCancelled: orphans.length, issues: issues.length, processedPurged: purged, auditPurged, jobsPurged });
}
