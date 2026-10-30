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
  if (c === 131047 || /outside (?:the )?24 ?h|free text cannot reach/i.test(text)) return { code: c ?? 131047, kind: 'outside_window' };
  if (c === 132001 || /does not exist|not exist/i.test(text)) return { code: c, kind: 'no_template' };
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
    case 'billing': return 'wait';
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
  other: 'WhatsApp did not deliver a message.',
};

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

  if (cls.kind === 'restricted_country') {
    await store.cancelJobsFor(f.customerId, ['FOLLOW_UP', 'AUTO_CLOSE', 'WINBACK', 'REFUND_CHECKIN', 'REVIEW_REMIND']).catch(() => 0);
  }

  const line = `${new Date().toISOString().slice(0, 16).replace('T', ' ')} ${cls.code ?? cls.kind}${f.templateName ? ` (${f.templateName})` : ''}: ${(f.body ?? '').replace(/\s+/g, ' ').slice(0, 160)}`;
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
    reason: `${SEND_FAILURE_PREFIX} ${HEADLINE[cls.kind]}${f.error && (cls.kind === 'other' || cls.kind === 'no_language_variant') ? ` (${f.error.replace(/^no_language_variant:\s*/, '').slice(0, 200)})` : ''}`,
    severity: 'URGENT', context: line, suggestedReply: f.body ?? null,
  });
  return { ...cls, taskRaised: true, folded: false };
}
