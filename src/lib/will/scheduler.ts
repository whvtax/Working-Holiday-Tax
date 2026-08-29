// ============================================================
// Follow-up scheduler, per spec §6.5, §7.2, §7.5:
//   pre-payment 24h/3d/7d · form 6h/3d/7d · signature 24h/3d/7d
// Hardened after audit: single-flight mutex, claim-before-send,
// seq resume (no restart-forever), kill switch, quiet hours.
// ============================================================
import { getStore, CustomerRow } from './store';
import { schedulerConfig, withinQuietHours, deferToMorning, localMidnightUtc } from './config';
import { policyGuard } from './policy-guard';
import { CustomerState, Flow, FLOW_TEMPLATES, FLOW_ELIGIBLE_STATES, flowForState } from './state-machine';
import { suggestReply } from './suggest';
import { APPROVED } from './approved-messages';
// Re-exported so existing importers of the scheduler keep working.
export { FLOW_TEMPLATES, flowForState };
export type { Flow };
import { formReceivedMessage, formReceivedTemplateKey } from './i18n';
import { deliverOut, sendWhatsAppText } from './channel';
import { requiresApproval } from './mode';
import { runDailyDigest } from './daily-digest';
import { runLostLeadAnalysis } from './lost-analysis';


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
export function greetingName(customer: CustomerRow): string {
  const first = (customer.name ?? '').trim().split(/\s+/)[0] ?? '';
  return first.length >= 2 ? first : 'there';
}


export async function scheduleFollowUp(customerId: string, flow: Flow, seq: number): Promise<void> {
  const store = getStore();
  const cfg = schedulerConfig();
  const delays = cfg[flow];
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
  const flow = flowForState(customer.state);
  if (!flow) return;

  // How many follow-ups of THIS flow have already been delivered?
  const jobs = await store.listJobsForCustomer(customer.id, ['FOLLOW_UP']);
  const doneCount = jobs.filter(
    (j) => j.status === 'DONE' && j.payload.flow === flow,
  ).length;
  await scheduleFollowUp(customer.id, flow, doneCount);
}

/** Ensure exactly one nightly maintenance job is queued (idempotent). */
export async function ensureNightly(): Promise<void> {
  const store = getStore();
  if (await store.hasScheduledNightly()) return; // PERF-04: cheap existence check
  const cfg = schedulerConfig();
  const next = new Date();
  if (cfg.enforceQuietHours) { next.setDate(next.getDate() + 1); next.setHours(3, 0, 0, 0); }
  else { next.setMinutes(next.getMinutes() + 10); }
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

  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
    hour12: false, timeZone: 'Australia/Melbourne',
  }).formatToParts(now);
  const y = Number(parts.find((p) => p.type === 'year')?.value);
  const mo = Number(parts.find((p) => p.type === 'month')?.value);
  const da = Number(parts.find((p) => p.type === 'day')?.value);
  const hh = Number(parts.find((p) => p.type === 'hour')?.value);
  const pastEightToday = hh >= 8; // at/after 8am local: today's slot has passed (or is passing right now)
  const targetDay = pastEightToday ? da + 1 : da; // Date.UTC below normalises any overflow

  const runAt = new Date(localMidnightUtc('Australia/Melbourne', y, mo, targetDay).getTime() + 8 * 60 * 60 * 1000);
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
async function ackBody(): Promise<string> {
  try {
    const t = (await getStore().listTemplates()).find((x) => x.key === 'handoff_holding');
    if (t?.body?.trim()) return t.body;
  } catch { /* the constant is the honest fallback */ }
  return APPROVED.handoff.holding;
}

export interface TickResult { processed: number; sent: string[]; closed: string[]; deferred: number }

/** How long one tick will keep claiming jobs before it stops and leaves the rest
 *  for the next run. Deliberately under the route's `maxDuration = 60`, so the
 *  loop ends on its own terms rather than being killed mid-job. */
const TICK_BUDGET_MS = 45_000;

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
    return { processed: 0, sent: [], closed: [], deferred: 0 };
  }
  const due = await store.dueJobs(new Date());
  const result: TickResult = { processed: 0, sent: [], closed: [], deferred: 0 };
  const startedAt = Date.now();

  for (let i = 0; i < due.length; i++) {
    const job = due[i];
    // Time budget. The tick runs as one serverless invocation with a hard
    // ceiling (`maxDuration`); a busy morning used to run past it and be killed
    // mid-job, which burned an `attempts` on every reclaim until the job hit a
    // permanent FAILED and the cadence died silently. Stopping deliberately
    // leaves the remainder SCHEDULED for the next tick, and says so out loud.
    if (Date.now() - startedAt > TICK_BUDGET_MS) {
      const remaining = due.length - i;
      await store.audit('scheduler', 'tick_budget_exhausted', {
        processed: result.processed, remaining,
        note: `Stopped after ${Math.round((Date.now() - startedAt) / 1000)}s with ${remaining} due job(s) not yet processed; they remain SCHEDULED and run on the next tick.`,
      }).catch(() => { /* never let the bookkeeping write end the tick */ });
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
              const body = await ackBody();
              const out = await deliverOut(c, body, 'AI');
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
        } else {
          await ensureLostAnalysisSoon();
        }
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
        if (['PAID', 'FORM_PENDING'].includes(customer.state)) {
          await store.updateCustomer(customer.id, { formComplete: true });
          await store.setState(customer.id, 'FORM_COMPLETE', 'SYSTEM');
          await store.cancelJobsFor(customer.id, ['FOLLOW_UP']);
          if (!customer.optedOut && !customer.aiPaused && !customer.isLegacy) {
            // The confirmation now lives in the Library, one entry per language
            // (seed.ts), so the owner can edit it without a deploy. The i18n
            // constants stay as the fallback for a store that cannot be read.
            const libraryCopy = async (lang: string | null) => {
              try {
                const key = formReceivedTemplateKey(lang);
                const t = (await store.listTemplates()).find((x) => x.key === key);
                return t && t.body.trim() ? t.body : null;
              } catch { return null; }
            };
            let body = (await libraryCopy(customer.lang)) ?? formReceivedMessage(customer.lang);
            const verdict = policyGuard(body, {
              state: 'FORM_COMPLETE', paid: true, aiPaused: false, killSwitch: false,
              optedOut: false, isLegacy: false,
              lastCustomerMsgAt: customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt) : null,
              isApprovedTemplate: true, estimateFromTeam: customer.estimatedRefundCents,
            });
            if (!verdict.allowed) body = (await libraryCopy('en')) ?? formReceivedMessage('en'); // English is guard-safe
            if (await inApprovalMode()) {
              await store.addMessage({
                customerId: customer.id, direction: 'OUT', author: 'AI',
                status: 'PENDING_APPROVAL', body, meta: {},
              });
            } else {
              await deliverOut(customer, body, 'AI');
            }
          }
          await store.audit('system', 'form_received_confirmed', { customerId: customer.id });
          result.sent.push(`${customer.name ?? customer.waId} · questionnaire received`);
        }
        await store.setJobStatus(job.id, 'DONE');
        continue;
      }

      // AUTO_REPLY: an Autopilot answer that was written when the customer's
      // message arrived and deliberately held back for a few minutes, so the
      // reply does not land the same second the question did.
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
        const verdict = policyGuard(msg.body, {
          state: customer.state, paid: customer.paid, aiPaused: customer.aiPaused, killSwitch: false,
          optedOut: customer.optedOut, isLegacy: customer.isLegacy,
          lastCustomerMsgAt: customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt) : null,
          isApprovedTemplate: false, estimateFromTeam: customer.estimatedRefundCents,
        });
        if (!verdict.allowed) {
          await store.setMessageStatus(msg.id, 'BLOCKED');
          await store.addTask({
            customerId: customer.id, customerName: customer.name ?? customer.waId,
            reason: `Autopilot reply blocked before sending: ${verdict.violations.join(', ')}`,
            severity: 'REVIEW', context: msg.body.slice(0, 200),
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
          result.sent.push(`${customer.name ?? customer.waId} · autopilot reply`);
        } else {
          await store.audit('channel', 'send_failed', { customerId: customer.id, error: res.error });
          await store.addTask({
            customerId: customer.id, customerName: customer.name ?? customer.waId,
            reason: `WhatsApp send failed: ${res.error ?? 'unknown error'}`,
            severity: 'REVIEW', context: msg.body.slice(0, 200), suggestedReply: msg.body,
          });
        }
        await store.setJobStatus(job.id, 'DONE');
        continue;
      }

      // FOLLOW_UP
      const flow = job.payload.flow as Flow;
      const seq = job.payload.seq ?? 0;
      if (!FLOW_ELIGIBLE_STATES[flow]?.includes(customer.state) || customer.optedOut || customer.aiPaused || customer.isLegacy) {
        await store.setJobStatus(job.id, 'CANCELLED');
        continue;
      }
      if (!withinQuietHours()) {
        await store.setJobStatus(job.id, 'CANCELLED');
        await store.addJob({ customerId: customer.id, kind: 'FOLLOW_UP', payload: job.payload, runAt: deferToMorning().toISOString() });
        result.deferred++;
        continue;
      }
      const template = (await store.listTemplates()).find((t) => t.key === job.payload.templateKey);
      // H6: one bad step must not kill the whole cadence. Skip this message but
      // still schedule the next one in the sequence.
      if (!template) {
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
        await store.addTask({
          customerId: customer.id, customerName: customer.name ?? customer.waId,
          reason: `Follow-up blocked by Policy Guard: ${verdict.violations.join(', ')}`,
          severity: 'REVIEW', context: template.title,
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

      if (await inApprovalMode()) {
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

      await deliverOut(customer, body, 'AI', meta, waTemplate);
      await store.audit('scheduler', 'follow_up_sent', { customerId: customer.id, template: template.key, seq });
      result.sent.push(`${customer.name ?? customer.waId} · ${template.title}`);
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

  for (const c of customers) {
    if (c.paid && salesStates.includes(c.state)) issues.push(`${c.name ?? c.waId}: paid but in sales state ${c.state}`);
    if (!c.paid && !salesStates.includes(c.state) && !closedStates.includes(c.state)) {
      issues.push(`${c.name ?? c.waId}: in ${c.state} but not marked paid`);
    }
  }
  // Went-cold reactivation now happens the moment a closed customer messages
  // again (service.ts, handleIncoming) — event-triggered, not time-based, per
  // the owner's rule: "whenever, whatever they say, however long it's been."
  // Nothing to do here on a timer.

  // allJobs, paged, for the same reason as allCustomers above: a job read capped
  // at 1,000 rows would leave real orphans uncancelled AND, more importantly,
  // pairs with a complete customer set so the cancellation below only ever fires
  // on a genuinely missing customer, never on one that simply was not read.
  const jobs = await store.allJobs();
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
          await store.addTask({
            customerId: m.customerId, customerName: c?.name ?? c?.waId ?? null,
            reason: 'A reply may not have reached this customer — it got stuck while sending. Check the chat and resend if needed.',
            severity: 'URGENT', context: m.body.slice(0, 200), suggestedReply: m.body,
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

  if (issues.length) {
    await store.addTask({
      customerId: null, customerName: null,
      reason: `Nightly consistency check found ${issues.length} issue(s)`,
      severity: 'REVIEW', context: issues.join(' | '), suggestedReply: null,
    });
  }
  // The monthly "what customers wrote" email is gone — replaced by the
  // DAILY_DIGEST job (daily-digest.ts), scheduled separately for 8am
  // Melbourne so its delivery time doesn't depend on when this nightly run
  // happens to fire.

  await store.audit('nightly', 'maintenance_complete', { customers: customers.length, orphanJobsCancelled: orphans.length, issues: issues.length, processedPurged: purged, auditPurged });
}
