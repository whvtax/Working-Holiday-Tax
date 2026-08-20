// ============================================================
// Follow-up scheduler, per spec §6.5, §7.2, §7.5:
//   pre-payment 24h/3d/7d · form 6h/3d/7d · signature 24h/3d/7d
// Hardened after audit: single-flight mutex, claim-before-send,
// seq resume (no restart-forever), kill switch, quiet hours.
// ============================================================
import { getStore, CustomerRow } from './store';
import { schedulerConfig, withinQuietHours, deferToMorning } from './config';
import { policyGuard } from './policy-guard';
import { CustomerState } from './state-machine';
import { formReceivedMessage } from './i18n';

type Flow = 'prePayment' | 'form' | 'signature';

const FLOW_TEMPLATES: Record<Flow, string[]> = {
  prePayment: ['fu_pre_24h', 'fu_pre_3d', 'fu_pre_7d'],
  form: ['fu_form_6h', 'fu_form_3d', 'fu_form_7d'],
  signature: ['fu_sig_24h', 'fu_sig_3d', 'fu_sig_7d'],
};

const FLOW_ELIGIBLE_STATES: Record<Flow, CustomerState[]> = {
  prePayment: ['PRICE_SENT', 'PAYMENT_PENDING'],
  form: ['FORM_PENDING'],
  signature: ['SIGNATURE_PENDING'],
};

export function flowForState(state: CustomerState): Flow | null {
  if (FLOW_ELIGIBLE_STATES.prePayment.includes(state)) return 'prePayment';
  if (FLOW_ELIGIBLE_STATES.form.includes(state)) return 'form';
  if (FLOW_ELIGIBLE_STATES.signature.includes(state)) return 'signature';
  return null;
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
export async function reconcileSchedule(customer: CustomerRow): Promise<void> {
  const store = getStore();
  await store.cancelJobsFor(customer.id, ['FOLLOW_UP', 'AUTO_CLOSE']);
  if (customer.optedOut || customer.aiPaused || customer.isLegacy) return;
  const flow = flowForState(customer.state);
  if (!flow) return;

  // How many follow-ups of THIS flow have already been delivered?
  const jobs = await store.listJobs();
  const doneCount = jobs.filter(
    (j) => j.customerId === customer.id && j.kind === 'FOLLOW_UP' && j.status === 'DONE' && j.payload.flow === flow,
  ).length;
  await scheduleFollowUp(customer.id, flow, doneCount);
}

/** Ensure exactly one nightly maintenance job is queued (idempotent). */
export async function ensureNightly(): Promise<void> {
  const store = getStore();
  const jobs = await store.listJobs();
  if (jobs.some((j) => j.kind === 'NIGHTLY' && j.status === 'SCHEDULED')) return;
  const cfg = schedulerConfig();
  const next = new Date();
  if (cfg.enforceQuietHours) { next.setDate(next.getDate() + 1); next.setHours(3, 0, 0, 0); }
  else { next.setMinutes(next.getMinutes() + 10); }
  await store.addJob({ customerId: null, kind: 'NIGHTLY', payload: {}, runAt: next.toISOString() });
}

export interface TickResult { processed: number; sent: string[]; closed: string[]; deferred: number }

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

  for (const job of due) {
    // Atomic claim: only one caller wins; a crash mid-job leaves it CLAIMED and
    // it is reclaimed to SCHEDULED next tick (up to 3 attempts), never lost.
    if (!(await store.claimJob(job.id))) continue;
    result.processed++;
    try {
      if (job.kind === 'NIGHTLY') {
        await runNightly();
        await store.setJobStatus(job.id, 'DONE');
        await ensureNightly();
        continue;
      }
      if (!job.customerId) { await store.setJobStatus(job.id, 'CANCELLED'); continue; }
      const customer = (await store.listCustomers()).find((c) => c.id === job.customerId);
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
            let body = formReceivedMessage(customer.lang);
            const verdict = policyGuard(body, {
              state: 'FORM_COMPLETE', paid: true, aiPaused: false, killSwitch: false,
              optedOut: false, isLegacy: false,
              lastCustomerMsgAt: customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt) : null,
              isApprovedTemplate: true, estimateFromTeam: customer.estimatedRefundCents,
            });
            if (!verdict.allowed) body = formReceivedMessage('en'); // English is guard-safe
            await store.addMessage({ customerId: customer.id, direction: 'OUT', author: 'AI', status: 'SENT', body });
          }
          await store.audit('system', 'form_received_confirmed', { customerId: customer.id });
          result.sent.push(`${customer.name ?? customer.waId} · questionnaire received`);
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
          severity: 'REVIEW', context: template.title, suggestedReply: null,
        });
        await scheduleFollowUp(customer.id, flow, seq + 1);
        continue;
      }

      // A/B: pick variant, record which was sent (conversion tracked when they advance).
      let body = template.body, variant: 'A' | 'B' = 'A';
      if (template.variantB && template.variantB.trim()) {
        variant = (customer.id.charCodeAt(0) + seq) % 2 === 0 ? 'A' : 'B';
        if (variant === 'B') body = template.variantB;
      }
      await store.addMessage({ customerId: customer.id, direction: 'OUT', author: 'AI', status: 'SENT', body, meta: template.variantB ? { templateId: template.id, variant } : undefined });
      if (template.variantB) await store.bumpVariant(template.id, variant, 'sent');
      await store.audit('scheduler', 'follow_up_sent', { customerId: customer.id, template: template.key, seq, variant });
      await store.setJobStatus(job.id, 'DONE');
      result.sent.push(`${customer.name ?? customer.waId} · ${template.title}`);
      await scheduleFollowUp(customer.id, flow, seq + 1);
    } catch {
      await store.setJobStatus(job.id, 'FAILED');
    }
  }
  return result;
}

/** Nightly maintenance: consistency checks + morning summary. */
export async function runNightly(): Promise<void> {
  const store = getStore();
  const customers = await store.listCustomers();
  const salesStates: CustomerState[] = ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING'];
  const closedStates: CustomerState[] = ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'];
  const issues: string[] = [];

  for (const c of customers) {
    if (c.paid && salesStates.includes(c.state)) issues.push(`${c.name ?? c.waId}: paid but in sales state ${c.state}`);
    if (!c.paid && !salesStates.includes(c.state) && !closedStates.includes(c.state)) {
      issues.push(`${c.name ?? c.waId}: in ${c.state} but not marked paid`);
    }
  }
  const jobs = await store.listJobs();
  const orphans = jobs.filter((j) => j.status === 'SCHEDULED' && j.customerId && !customers.some((c) => c.id === j.customerId));
  for (const o of orphans) await store.setJobStatus(o.id, 'CANCELLED');

  if (issues.length) {
    await store.addTask({
      customerId: null, customerName: null,
      reason: `Nightly consistency check found ${issues.length} issue(s)`,
      severity: 'REVIEW', context: issues.join(' | '), suggestedReply: null,
    });
  }
  await store.audit('nightly', 'maintenance_complete', { customers: customers.length, orphanJobsCancelled: orphans.length, issues: issues.length });
}
