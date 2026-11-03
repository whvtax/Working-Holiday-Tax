// ============================================================
// SEND FAILURES: RECORD, RETRY THE RIGHT WAY, ONE TASK PER CUSTOMER (30 Oct).
//
// Meta refuses a send with a code. The ones that bit in the last 30 days:
//   131042  the WhatsApp Business account has unsettled payments (Jo must
//           pay the bill; nothing was sent; the same request works after)
//   130497  business account restricted from messaging this country (nothing
//           we do reaches them; every further send fails the same way)
//   131047  plain text outside the 24 hour window (only a template can reach
//           the customer)
// plus our own refusal to send an English text to a customer who does not
// write English (no_language_variant).
//
// Before this, deliverOut raised one task per FAILED MESSAGE, so a customer
// with four follow-ups queued produced four URGENT cards. Now every failure is
// recorded in the audit log and folded into the ONE open task the customer
// has. Meta credentials are not touched here.
// ============================================================
import type { Store, TaskRow } from './store';

export type SendFailureKind =
  | 'billing'              // 131042
  | 'restricted_country'   // 130497
  | 'outside_window'       // 131047, or free text refused for being outside the window
  | 'no_template'          // the template does not exist in WhatsApp Manager
  | 'no_language_variant'  // we refused to send English to a non English customer
  | 'blocked_by_customer'  // 130403: the customer blocked the business number (3 Nov)
  | 'ecosystem'            // 131049: Meta held a marketing message back for this customer (3 Nov)
  | 'retryable'            // transient: 131000, 131016, 131056, 130429, 5xx, timeouts (3 Nov)
  | 'other';

export interface ClassifiedFailure { code: number | null; kind: SendFailureKind }

const NO_VARIANT_MARK = 'no_language_variant';
export const noLanguageVariantError = (why: string) => `${NO_VARIANT_MARK}: ${why}`;

export function classifySendError(error: string | null | undefined, code?: number | null): ClassifiedFailure {
  const text = error ?? '';
  const fromText = /\b(13\d{4})\b/.exec(text);
  const c = code ?? (fromText ? Number(fromText[1]) : null);
  if (text.startsWith(NO_VARIANT_MARK)) return { code: c, kind: 'no_language_variant' };
  if (c === 131042) return { code: c, kind: 'billing' };
  if (c === 130497) return { code: c, kind: 'restricted_country' };
  if (c === 130403) return { code: c, kind: 'blocked_by_customer' };
  if (c === 131049) return { code: c, kind: 'ecosystem' };
  if (c === 131047 || /outside (?:the )?24 ?h|free text cannot reach/i.test(text)) return { code: c ?? 131047, kind: 'outside_window' };
  if (c === 132001 || /does not exist|not exist/i.test(text)) return { code: c, kind: 'no_template' };
  if ((c !== null && [131000, 131016, 131056, 130429, 133004, 133016, 80007].includes(c))
    || /\bmeta (?:429|500|502|503|504)\b/i.test(text)) return { code: c, kind: 'retryable' };
  return { code: c, kind: 'other' };
}

export type RetryPlan = 'template' | 'text' | 'wait' | 'none';

/**
 * What the retry should be, given why the first send failed.
 *  - outside the 24h window: only a template can arrive. Retry as the template
 *    when one exists for this message; otherwise nothing sends by itself.
 *  - template missing: free text works only INSIDE the window, and only when
 *    the body is in the customer's language (the caller checks that).
 *  - billing: nothing was sent; the same message goes again later.
 *  - restricted country / no language variant: retrying cannot help.
 */
export function retryPlan(kind: SendFailureKind, ctx: { hasTemplate: boolean; inWindow: boolean }): RetryPlan {
  switch (kind) {
    case 'outside_window': return ctx.hasTemplate ? 'template' : 'none';
    case 'no_template': return ctx.inWindow ? 'text' : 'none';
    case 'billing':
    case 'retryable': return 'wait';
    // 3 Nov: the customer blocked us, or Meta withheld a marketing message.
    // Neither is fixed by sending again.
    case 'blocked_by_customer':
    case 'ecosystem':
    case 'restricted_country':
    case 'no_language_variant': return 'none';
    default: return ctx.hasTemplate ? 'template' : 'none';
  }
}

const HEADLINE: Record<SendFailureKind, string> = {
  billing: 'WhatsApp is holding messages (error 131042): the WhatsApp Business account has unsettled payments. Pay the bill in Meta Business Manager; held messages resend by themselves once it clears.',
  restricted_country: 'WhatsApp will not deliver to this number (error 130497: the business account is restricted from messaging this country). Nothing we send reaches them, so their pending follow-ups were cancelled. Contact them another way.',
  outside_window: 'WhatsApp did not deliver a message: outside the 24h window (the customer has not written for over a day), so only an approved template can reach them. Send it as an approved template, or wait for the customer to write.',
  no_template: 'WhatsApp did not deliver a message: the approved template does not exist in WhatsApp Manager for this language.',
  no_language_variant: 'A message was NOT sent because it would have gone out in English to a customer who writes in another language and no template exists in their language. Reply to them yourself in their language.',
  blocked_by_customer: 'The customer has blocked this WhatsApp number (error 130403), so nothing reaches them here. Their pending follow-ups were cancelled. Reach them by email or SMS if you need to.',
  ecosystem: 'WhatsApp held a message back for this customer (error 131049, its own limit on messages to people who have not written lately). Retrying does not help; it goes through once they write to us.',
  retryable: 'WhatsApp had a temporary problem and the message did not go after the automatic retries.',
  other: 'WhatsApp did not deliver a message.',
};

// ------------------------------------------------------------
// 3 Nov: the messages a customer is waiting on. A failed "payment received"
// (with the form link), form link, ABN document request or hand-off
// acknowledgement left customers waiting days with a row marked [send failed]
// that nobody repaired. These get ONE bounded repair and then ONE escalation.
// ------------------------------------------------------------
export type CriticalKind = 'payment_received' | 'form_link' | 'abn_request' | 'handoff_ack';
export const CRITICAL_MARK = 'critical:';
export const CRITICAL_LABEL: Record<CriticalKind, string> = {
  payment_received: 'The payment confirmation with the form link',
  form_link: 'The tax form link',
  abn_request: 'The ABN document request',
  handoff_ack: 'The hand-off acknowledgement',
};
const FORM_URL_RE = /\/tax-form\b|\/form\b/i;

export function criticalSystemKind(body: string | null | undefined, meta?: Record<string, unknown> | null): CriticalKind | null {
  const b = body ?? '';
  const tpl = ((meta?.waTemplate as { name?: string } | undefined)?.name ?? '').toLowerCase();
  if (meta?.paymentConfirmation === true || /^(?:payment received|zahlung erhalten|お支払いを確認)/i.test(b.trim())) return 'payment_received';
  if (/^req_abn|abn income|abn invoices?|abn payments?/i.test(tpl) || /\bABN\b[\s\S]{0,80}\b(?:invoice|statement|document|payment summary|screenshot)/i.test(b)) return 'abn_request';
  if (FORM_URL_RE.test(b) && /https?:\/\//i.test(b)) return 'form_link';
  if (/^handoff_|^form_link|^form_reminder/.test(tpl)) return /^handoff_/.test(tpl) ? 'handoff_ack' : 'form_link';
  return null;
}

export type RepairStep = 'retry_text' | 'retry_template' | 'retry_later' | 'escalate_once' | 'already_escalated' | 'close_quietly' | 'nothing';
export const MAX_REPAIR_ATTEMPTS = 2;

/**
 * What to do with a failed message. Pure.
 *  - blocked by the customer: close quietly (no task, no retry);
 *  - transient / billing: retry later, up to MAX_REPAIR_ATTEMPTS, then escalate;
 *  - template missing: free text inside the 24h window (the body keeps the
 *    link, so nothing is lost), otherwise escalate;
 *  - outside the window: the template when one exists, otherwise escalate;
 *  - ecosystem (131049) and the rest: escalate, never retried.
 * Escalation happens once per message kind (`alreadyEscalated`).
 */
export function planRepair(a: {
  kind: SendFailureKind; critical: CriticalKind | null; hasTemplate: boolean; inWindow: boolean;
  attempts: number; alreadyEscalated: boolean;
}): RepairStep {
  if (a.kind === 'blocked_by_customer') return 'close_quietly';
  const escalate: RepairStep = a.alreadyEscalated ? 'already_escalated' : 'escalate_once';
  if (!a.critical) {
    if (a.kind === 'retryable' && a.attempts < MAX_REPAIR_ATTEMPTS) return 'retry_later';
    return a.kind === 'restricted_country' || a.kind === 'no_language_variant' ? escalate : (a.kind === 'retryable' ? escalate : 'nothing');
  }
  if (a.attempts >= MAX_REPAIR_ATTEMPTS) return escalate;
  switch (a.kind) {
    case 'retryable':
    case 'billing': return 'retry_later';
    case 'no_template': return a.inWindow ? 'retry_text' : escalate;
    case 'outside_window': return a.hasTemplate ? 'retry_template' : escalate;
    default: return escalate;
  }
}

export const SEND_FAILURE_PREFIX = 'SEND FAILED:';
export const MAX_FAILURE_CONTEXT = 2000;

type TaskStore = Pick<Store, 'addTask' | 'updateTask' | 'audit' | 'cancelJobsFor'> & Partial<Pick<Store, 'findOpenTaskForCustomer'>>;

export interface SendFailureInput {
  customerId: string;
  customerName: string | null;
  messageId?: string | null;
  error?: string | null;
  code?: number | null;
  body?: string | null;
  meta?: Record<string, unknown> | null;
  templateName?: string | null;
  /** 'send' = synchronous refusal, 'status' = Meta's later delivery report. */
  via: 'send' | 'status';
}

/**
 * Record one failure and make sure the customer has ONE open urgent task for
 * it. Returns what happened so callers can retry or stop.
 *  - always: an audit row `send_failure_recorded` with code and kind;
 *  - 130497: the customer's pending follow-ups / winbacks are cancelled;
 *  - the task: if the customer already has an open task, the failure is added
 *    to ITS context (and its severity raised to URGENT) instead of opening a
 *    second card; otherwise one URGENT task is created, with the text ready
 *    to send by hand.
 * 131042 only records and returns: it is an account level problem with its own
 * once-per-12-hours alert (webhook route), not a per customer one.
 */
export async function recordSendFailure(store: TaskStore, f: SendFailureInput): Promise<ClassifiedFailure & { taskRaised: boolean; folded: boolean }> {
  const cls = classifySendError(f.error, f.code);
  await store.audit('channel', 'send_failure_recorded', {
    customerId: f.customerId, messageId: f.messageId ?? null, code: cls.code, kind: cls.kind, via: f.via,
    template: f.templateName ?? null, error: (f.error ?? '').slice(0, 300),
  }).catch(() => undefined);

  if (cls.kind === 'billing') return { ...cls, taskRaised: false, folded: false };

  // 3 Nov: the customer blocked the number (130403). No card: there is nothing
  // for anyone to do on WhatsApp. Pending nudges stop and the audit row below
  // is the note that closes the loop.
  if (cls.kind === 'blocked_by_customer') {
    const cancelled = await store.cancelJobsFor(f.customerId, ['FOLLOW_UP', 'AUTO_CLOSE', 'WINBACK', 'REFUND_CHECKIN', 'REVIEW_REMIND']).catch(() => 0);
    await store.audit('channel', 'send_failure_blocked_by_customer_closed', {
      customerId: f.customerId, messageId: f.messageId ?? null, cancelledJobs: cancelled,
      note: 'Customer blocked the business number (130403); follow-ups cancelled, no task raised.',
    }).catch(() => undefined);
    return { ...cls, taskRaised: false, folded: false };
  }

  // 131049 and critical messages: ONE card. A repeat is only an audit row
  // (above); it does not raise or re-urgent the card again. Plain 131047
  // failures already fold into the one open card below (one task per customer).
  const critical = criticalSystemKind(f.body, f.meta);
  if (cls.kind === 'ecosystem' || critical) {
    const open = typeof store.findOpenTaskForCustomer === 'function'
      ? await store.findOpenTaskForCustomer(f.customerId).catch(() => null) : null;
    const mark = critical ? `${CRITICAL_MARK}${critical}` : null;
    const ours = !!open && open.reason.startsWith(SEND_FAILURE_PREFIX);
    const repeat = !!open && (mark ? !!open.context?.includes(mark)
      : ours);
    if (repeat) {
      return { ...cls, taskRaised: false, folded: true };
    }
  }

  if (cls.kind === 'restricted_country') {
    await store.cancelJobsFor(f.customerId, ['FOLLOW_UP', 'AUTO_CLOSE', 'WINBACK', 'REFUND_CHECKIN', 'REVIEW_REMIND']).catch(() => 0);
  }

  const markTag = critical ? ` ${CRITICAL_MARK}${critical}` : '';
  const line = `${new Date().toISOString().slice(0, 16).replace('T', ' ')} ${cls.code ?? cls.kind}${f.templateName ? ` (${f.templateName})` : ''}: ${(f.body ?? '').replace(/\s+/g, ' ').slice(0, 160)}${markTag}`;
  const existing: TaskRow | null = typeof store.findOpenTaskForCustomer === 'function'
    ? await store.findOpenTaskForCustomer(f.customerId).catch(() => null)
    : null;
  if (existing) {
    const merged = existing.context ? `${existing.context}\n---\n${line}` : line;
    // Same failure already listed (a retry loop): do not grow the card.
    const context = existing.context?.includes(line.slice(17)) ? existing.context : merged;
    await store.updateTask(existing.id, {
      severity: 'URGENT',
      context: context.length > MAX_FAILURE_CONTEXT ? context.slice(context.length - MAX_FAILURE_CONTEXT) : context,
      suggestedReply: existing.suggestedReply ?? f.body ?? null,
    });
    return { ...cls, taskRaised: false, folded: true };
  }
  await store.addTask({
    customerId: f.customerId, customerName: f.customerName,
    reason: `${SEND_FAILURE_PREFIX} ${critical ? `${CRITICAL_LABEL[critical]} did NOT reach the customer, even after the automatic retry. Send it by hand now. ` : ''}${HEADLINE[cls.kind]}${f.error && (cls.kind === 'other' || cls.kind === 'no_language_variant') ? ` (${f.error.replace(/^no_language_variant:\s*/, '').slice(0, 200)})` : ''}`,
    severity: 'URGENT', context: line, suggestedReply: f.body ?? null,
  });
  return { ...cls, taskRaised: true, folded: false };
}
