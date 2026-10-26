// ============================================================
// THE MORNING REPORT (Jo, 22 Oct).
//
// One read of how the last 24 hours went, on the Overview where the "Ask
// Will" bot used to be: what Will handled alone, what came to the team and
// why, who is waiting on us right now, and who has been stuck after paying.
// Pure: the API route loads the rows and this turns them into the report.
// ============================================================
import type { CustomerRow, MessageRow, TaskRow, StateHistoryRow, AuditRow } from './store';
import { explainHandoffReason } from './handoff-reasons';

export interface ReportPerson { id: string; name: string; waId: string; hours: number; preview: string | null; stage: string }

export interface MorningReport {
  generatedAt: string;
  windowHours: number;
  newLeads: number;
  paid: number;
  lodged: number;
  /** Customers Will wrote to with no task opened for them in the window. */
  handledByWill: number;
  /** Customers a person on the team wrote to in the window. */
  handledByTeam: number;
  tasksOpened: number;
  openTasks: number;
  topReasons: { label: string; count: number }[];
  blocked: number;
  /** The customer wrote last and nobody has answered for over an hour. */
  waitingOnUs: ReportPerson[];
  /** Paid, nothing has moved and nobody has written for over two days. */
  stuckAfterPayment: ReportPerson[];
  /** CRM logins in the window (Jo, 23 Oct, security watch). */
  security: {
    logins: number;
    failed: number;
    lockouts: number;
    newDevices: { label: string; at: string }[];
    recent: { at: string; where: string; device: string; ip: string }[];
  };
  /** The automatic win-back (Jo, 25 Oct). */
  winback: {
    sent: number;
    replied: number;
    toFinal: number;
    waitingReply: number;
    queued: number;
    wonBackPaid: number;
  };
}

const CLOSED = new Set(['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT', 'FINAL', 'COMPLETED']);
const H = 60 * 60 * 1000;

function person(c: CustomerRow, sinceIso: string | null, now: number): ReportPerson {
  const t = sinceIso ? new Date(sinceIso).getTime() : now;
  return {
    id: c.id, name: c.name ?? c.waId, waId: c.waId,
    hours: Math.max(0, Math.round((now - t) / H)), preview: c.lastMessagePreview ?? null, stage: c.state,
  };
}

export function buildMorningReport(input: {
  customers: CustomerRow[];
  tasks: TaskRow[];
  messages: MessageRow[];
  history: StateHistoryRow[];
  /** will_audit rows with actor 'auth' (CRM logins). */
  auth?: AuditRow[];
  /** The `winbacks` settings row (winbacks.ts). */
  winbacks?: Record<string, { sentAt?: string; decision?: string; decidedAt?: string; finalAt?: string }>;
  now?: number;
  windowHours?: number;
}): MorningReport {
  const now = input.now ?? Date.now();
  const windowHours = input.windowHours ?? 24;
  const since = now - windowHours * H;
  const inWindow = (iso: string | null | undefined) => !!iso && new Date(iso).getTime() >= since && new Date(iso).getTime() <= now;

  const tasksInWindow = input.tasks.filter((t) => inWindow(t.createdAt));
  const withTask = new Set(tasksInWindow.map((t) => t.customerId).filter(Boolean) as string[]);
  const sentOut = input.messages.filter((m) => m.direction === 'OUT' && m.status === 'SENT' && inWindow(m.createdAt));
  const byWill = new Set(sentOut.filter((m) => m.author === 'AI' || m.author === 'SYSTEM').map((m) => m.customerId));
  const byTeam = new Set(sentOut.filter((m) => m.author === 'HUMAN').map((m) => m.customerId));

  const reasons = new Map<string, number>();
  for (const t of tasksInWindow) {
    const label = explainHandoffReason(t.reason).label || 'Other';
    reasons.set(label, (reasons.get(label) ?? 0) + 1);
  }

  const active = input.customers.filter((c) => !CLOSED.has(c.state) && !c.optedOut);
  const waitingOnUs = active
    .filter((c) => c.lastMessageDirection === 'IN' && c.lastMessageAt && now - new Date(c.lastMessageAt).getTime() > H)
    .sort((a, b) => new Date(a.lastMessageAt ?? 0).getTime() - new Date(b.lastMessageAt ?? 0).getTime())
    .slice(0, 15)
    .map((c) => person(c, c.lastMessageAt, now));
  const stuckAfterPayment = active
    .filter((c) => c.paid && c.state !== 'LODGED'
      && now - new Date(c.stateChangedAt).getTime() > 48 * H
      && (!c.lastMessageAt || now - new Date(c.lastMessageAt).getTime() > 48 * H))
    .sort((a, b) => new Date(a.stateChangedAt).getTime() - new Date(b.stateChangedAt).getTime())
    .slice(0, 15)
    .map((c) => person(c, c.stateChangedAt, now));

  const auth = (input.auth ?? []).filter((a) => inWindow(a.at));
  const detail = (a: AuditRow) => (a.detail ?? {}) as { device?: string; city?: string | null; country?: string | null; ip?: string; label?: string };
  const security = {
    logins: auth.filter((a) => a.action === 'crm_otp_ok').length,
    failed: auth.filter((a) => a.action === 'crm_password_failed' || a.action === 'crm_otp_failed' || a.action === 'crm_otp_too_many').length,
    lockouts: auth.filter((a) => a.action === 'crm_locked_out').length,
    newDevices: auth.filter((a) => a.action === 'crm_new_device').map((a) => ({ label: detail(a).label ?? detail(a).device ?? 'unknown device', at: a.at })),
    recent: auth.filter((a) => a.action === 'crm_otp_ok').slice(0, 10).map((a) => ({
      at: a.at, device: detail(a).device ?? 'unknown device', ip: detail(a).ip ?? '',
      where: [detail(a).city, detail(a).country].filter(Boolean).join(', ') || 'unknown place',
    })),
  };

  const wb = input.winbacks ?? {};
  const byId = new Map(input.customers.map((c) => [c.id, c]));
  const DAY = 24 * H;
  const winback = { sent: 0, replied: 0, toFinal: 0, waitingReply: 0, queued: 0, wonBackPaid: 0 };
  for (const [id, r] of Object.entries(wb)) {
    const c = byId.get(id);
    if (r.finalAt && inWindow(r.finalAt)) winback.toFinal++;
    if (r.sentAt) {
      const sent = new Date(r.sentAt).getTime();
      if (inWindow(r.sentAt)) winback.sent++;
      const lastIn = c?.lastCustomerMsgAt ? new Date(c.lastCustomerMsgAt).getTime() : 0;
      if (lastIn > sent && inWindow(c?.lastCustomerMsgAt)) winback.replied++;
      if (c && lastIn <= sent && c.state !== 'FINAL' && now - sent < 7 * DAY) winback.waitingReply++;
      if (c?.paid && lastIn > sent) winback.wonBackPaid++;
    } else if (r.decision === 'send' && c && c.state !== 'FINAL' && !c.paid) {
      winback.queued++;
    }
  }

  return {
    winback,
    security,
    generatedAt: new Date(now).toISOString(),
    windowHours,
    newLeads: input.customers.filter((c) => inWindow(c.createdAt)).length,
    paid: new Set(input.history.filter((h) => h.to === 'PAID' && inWindow(h.createdAt)).map((h) => h.customerId)).size,
    lodged: new Set(input.history.filter((h) => h.to === 'LODGED' && inWindow(h.createdAt)).map((h) => h.customerId)).size,
    handledByWill: [...byWill].filter((id) => !withTask.has(id)).length,
    handledByTeam: byTeam.size,
    tasksOpened: tasksInWindow.length,
    openTasks: input.tasks.filter((t) => t.status === 'OPEN').length,
    topReasons: [...reasons.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([label, count]) => ({ label, count })),
    blocked: input.messages.filter((m) => m.status === 'BLOCKED' && inWindow(m.createdAt)).length,
    waitingOnUs,
    stuckAfterPayment,
  };
}
