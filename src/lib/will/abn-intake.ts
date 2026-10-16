// ============================================================
// ABN INTAKE (Jo, 16 Oct)
//
// A $385 (TFN + ABN) customer used to answer the three ABN questions and get
// "we've received your questionnaire", and the team then chased the income,
// expenses and receipts by hand. Now Will collects them, one thing at a time:
// the work and platform, the income (a yearly summary from the app, invoices
// or bank statements), the expenses with a receipt for each. He never says
// what is deductible and never calculates. When he has everything he sends the
// closing line below, the intake ends, and the team gets one task with a
// summary of what came in.
// ============================================================

export const abnIntakeKey = (customerId: string) => `abn_intake:${customerId}`;

/** The exact closing line Will sends when the paperwork is complete. */
export const ABN_INTAKE_DONE_LINE = "Got everything, thank you! The team will now put your return together 😊";
export const ABN_INTAKE_DONE_RE = /Got everything,? thank you!? The team will now put your return together/i;

export interface AbnIntakeState { startedAt: string }

export function readIntake(v: unknown): AbnIntakeState | null {
  if (v && typeof v === 'object' && typeof (v as AbnIntakeState).startedAt === 'string') return v as AbnIntakeState;
  return null;
}

/** One block for the team's task: what the customer wrote and sent since the
 *  intake started, oldest first, trimmed. */
export function intakeSummary(messages: { direction: string; body: string | null; createdAt: string; meta?: { media?: unknown } | null }[], since: string): string {
  const t0 = new Date(since).getTime();
  const lines = messages
    .filter((m) => m.direction === 'IN' && new Date(m.createdAt).getTime() >= t0)
    .map((m) => (m.meta?.media ? `📎 ${(m.body ?? '').replace(/\s+/g, ' ').slice(0, 120)}` : `• ${(m.body ?? '').replace(/\s+/g, ' ').slice(0, 300)}`));
  const files = messages.filter((m) => m.direction === 'IN' && m.meta?.media && new Date(m.createdAt).getTime() >= t0).length;
  return [`Files received during the intake: ${files}.`, 'What the customer wrote and sent:', ...lines].join('\n').slice(0, 3500);
}
