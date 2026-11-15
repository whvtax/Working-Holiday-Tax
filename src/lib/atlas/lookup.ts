// Pure lookup helpers for Ask Atlas (decision 016). No store import here, so
// they can be tested alone. Each one returns only what Atlas needs to answer,
// with no phone numbers (waId), no task context and no suggested replies.
import type { CustomerRow, MessageRow, TaskRow } from '@/lib/will/store';

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
