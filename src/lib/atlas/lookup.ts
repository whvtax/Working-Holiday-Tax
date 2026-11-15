// Pure lookup helpers for Ask Atlas (decision 016). No store import here, so
// they can be tested alone. Each one returns only what Atlas needs to answer,
// with no phone numbers (waId), no task context and no suggested replies.
import type { CustomerRow, MessageRow, StateHistoryRow, TaskRow } from '@/lib/will/store';

const MAX_BODY = 500;
const MAX_PREVIEW = 200;
const MAX_MESSAGES = 50;
const MAX_TASKS = 50;
const MAX_MATCHES = 10;

const clamp = (n: unknown, max: number, fallback: number) => {
  const v = typeof n === 'number' && Number.isFinite(n) ? Math.floor(n) : fallback;
  return Math.min(max, Math.max(1, v));
};
const cut = (s: string, max: number) => (s.length > max ? `${s.slice(0, max)}...` : s);

export function findCustomers(customers: CustomerRow[], query: string, limit?: unknown) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return customers
    .filter((c) => (c.name ?? '').toLowerCase().includes(q))
    .sort((a, b) => (b.lastMessageAt ?? '').localeCompare(a.lastMessageAt ?? ''))
    .slice(0, clamp(limit, MAX_MATCHES, MAX_MATCHES))
    .map((c) => ({
      customerId: c.id,
      name: c.name,
      state: c.state,
      paid: c.paid,
      outcome: c.outcome,
      lastMessageAt: c.lastMessageAt,
      lastMessagePreview: c.lastMessagePreview ? cut(c.lastMessagePreview, MAX_PREVIEW) : null,
    }));
}

export function customerMessages(messages: MessageRow[], limit?: unknown) {
  return messages
    .filter((m) => m.status !== 'DISCARDED')
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .slice(-clamp(limit, MAX_MESSAGES, 30))
    .map((m) => ({
      at: m.createdAt,
      from: m.direction === 'IN' ? 'customer' : m.author === 'HUMAN' ? 'team' : m.author === 'AI' ? 'Will' : 'system',
      body: cut(m.body ?? '', MAX_BODY),
    }));
}

export function taskList(tasks: TaskRow[], status: unknown, limit?: unknown) {
  const want = status === 'OPEN' || status === 'RESOLVED' ? status : 'ALL';
  return tasks
    .filter((t) => want === 'ALL' || t.status === want)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, clamp(limit, MAX_TASKS, 20))
    .map((t) => ({
      taskId: t.id,
      customerId: t.customerId,
      customerName: t.customerName,
      reason: t.reason,
      severity: t.severity,
      status: t.status,
      createdAt: t.createdAt,
    }));
}

/** Everything Atlas may know about one customer. No waId (the phone number),
 *  no message bodies beyond the preview. */
export function customerProfile(c: CustomerRow) {
  return {
    customerId: c.id,
    name: c.name,
    brand: c.brand ?? 'wht',
    state: c.state,
    previousState: c.previousState,
    stateChangedAt: c.stateChangedAt,
    income: c.income,
    paid: c.paid,
    outcome: c.outcome,
    formComplete: c.formComplete,
    missingDocs: c.missingDocs,
    estimatedRefundCents: c.estimatedRefundCents,
    refundPromisedAt: c.refundPromisedAt ?? null,
    refundSentAt: c.refundSentAt ?? null,
    refundAmountCents: c.refundAmountCents ?? null,
    flag: c.flag,
    aiPaused: c.aiPaused,
    optedOut: c.optedOut,
    botOwned: c.botOwned,
    isLegacy: c.isLegacy,
    lang: c.lang,
    unreadCount: c.unreadCount,
    lastCustomerMsgAt: c.lastCustomerMsgAt,
    lastMessageAt: c.lastMessageAt,
    lastMessageDirection: c.lastMessageDirection,
    lastMessagePreview: c.lastMessagePreview ? cut(c.lastMessagePreview, MAX_PREVIEW) : null,
    createdAt: c.createdAt,
  };
}

/** Customers filtered by stage and paid status, newest activity first. */
export function listCustomersLite(
  customers: CustomerRow[],
  opts: { state?: unknown; paid?: unknown; limit?: unknown } = {},
) {
  const state = typeof opts.state === 'string' ? opts.state : null;
  const paid = typeof opts.paid === 'boolean' ? opts.paid : null;
  return customers
    .filter((c) => (state ? c.state === state : true))
    .filter((c) => (paid === null ? true : c.paid === paid))
    .sort((a, b) => (b.lastMessageAt ?? '').localeCompare(a.lastMessageAt ?? ''))
    .slice(0, clamp(opts.limit, MAX_MATCHES, 20))
    .map((c) => ({ customerId: c.id, name: c.name, state: c.state, paid: c.paid, lastMessageAt: c.lastMessageAt }));
}

/** Stage changes for one customer, oldest first. */
export function customerHistory(rows: StateHistoryRow[], limit?: unknown) {
  return rows
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .slice(-clamp(limit, 50, 20))
    .map((r) => ({ from: r.from, to: r.to, causedBy: r.causedBy, at: r.createdAt }));
}
