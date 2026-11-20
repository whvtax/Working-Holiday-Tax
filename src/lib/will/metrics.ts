// Four health numbers for Will (Jo, 15 Nov 2026). Pure functions over rows the store
// already holds, so they can be tested without a database.
//  1. Reply rate after a follow-up: did the customer write back within 72 hours?
//  2. Team messages per paying customer: how much hand-writing Will still needs.
//  3. Failed sends, by kind (uses the same classifier as the send-repair path).
//  4. Failed model decisions, by audit action.
import type { AuditRow, MessageRow, CustomerRow } from './store';
import { classifySendError, type SendFailureKind } from './send-failure-30oct';

export const REPLY_WINDOW_MS = 72 * 60 * 60 * 1000;

export function followUpReplyRate(audit: AuditRow[], messages: MessageRow[], windowMs = REPLY_WINDOW_MS) {
  const followUps = audit.filter((a) => a.action === 'follow_up_sent');
  let replied = 0;
  for (const f of followUps) {
    const detail = (f.detail ?? {}) as { customerId?: string };
    if (!detail.customerId) continue;
    const start = Date.parse(f.at);
    if (Number.isNaN(start)) continue;
    const hit = messages.some((m) =>
      m.customerId === detail.customerId && m.direction === 'IN' &&
      Date.parse(m.createdAt) > start && Date.parse(m.createdAt) <= start + windowMs);
    if (hit) replied++;
  }
  const sent = followUps.length;
  return { sent, replied, rate: sent === 0 ? null : replied / sent };
}

export function teamMessagesPerPaidCustomer(humanOut: MessageRow[], customers: CustomerRow[]) {
  const paid = new Set(customers.filter((c) => c.paid).map((c) => c.id));
  const teamToPaid = humanOut.filter((m) => paid.has(m.customerId) && m.status === 'SENT').length;
  return { paidCustomers: paid.size, teamMessages: teamToPaid, perPaid: paid.size === 0 ? null : teamToPaid / paid.size };
}

export function failedSendsByKind(messages: MessageRow[]): Record<SendFailureKind, number> & { total: number } {
  const out: Record<string, number> = {};
  let total = 0;
  for (const m of messages) {
    const err = m.meta?.sendError;
    if (!err || m.status === 'SENT') continue;
    const kind = classifySendError(err).kind;
    out[kind] = (out[kind] ?? 0) + 1;
    total++;
  }
  return { ...(out as Record<SendFailureKind, number>), total };
}

export function failedModelDecisions(audit: AuditRow[]) {
  const byAction: Record<string, number> = {};
  let total = 0;
  for (const a of audit) {
    const text = JSON.stringify(a.detail ?? '') + ' ' + a.action;
    const failed = /unusable decision|Model returned|decision_failed|_failed\b/i.test(text);
    if (!failed) continue;
    byAction[a.action] = (byAction[a.action] ?? 0) + 1;
    total++;
  }
  return { total, byAction };
}

export function willHealth(input: { audit: AuditRow[]; messages: MessageRow[]; humanOut: MessageRow[]; customers: CustomerRow[] }) {
  return {
    followUpReply: followUpReplyRate(input.audit, input.messages),
    teamLoad: teamMessagesPerPaidCustomer(input.humanOut, input.customers),
    failedSends: failedSendsByKind(input.messages),
    failedDecisions: failedModelDecisions(input.audit),
  };
}
