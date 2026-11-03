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

// ------------------------------------------------------------------
// WHAT THE INTAKE STILL NEEDS TO ASK (Jo, 3 Nov). Customers were never asked
// for the ABN number or GST status, USD invoices were only noticed by the team
// 36 hours later, and ABN work in an earlier year was found late. These are
// facts, not tax advice: Will asks, the team decides.
// ------------------------------------------------------------------
export const ABN_NUMBER_AND_GST_QUESTION = "Could you send me your ABN number, and tell me if your ABN is registered for GST? 😊";
export const ABN_CURRENCY_QUESTION = "Quick check: I can see some amounts in a foreign currency. Are your invoices in Australian dollars (AUD) or another currency?";
export const ABN_YEAR_QUESTION = "Which financial year was this ABN work in? We prepare each year as its own return (1 July to 30 June).";

const ABN_NUMBER_RE = /\b\d{2}\s?\d{3}\s?\d{3}\s?\d{3}\b/;
/** USD, US$, EUR, GBP... next to an amount or the word invoice, with no AUD in the same text. */
const FOREIGN_CCY_RE = /\b(?:usd|eur|gbp|nzd|cad|jpy|cny|sgd)\b|\bUS\$|€|£|\bus dollars?\b/i;
const AUD_RE = /\baud\b|\bA\$|australian dollars?/i;

export interface IntakeMessage { direction: string; body: string | null; createdAt: string; meta?: { media?: unknown } | null }

/** Does anything the customer sent mention a non-AUD currency without saying AUD? */
export function mentionsForeignCurrency(texts: Array<string | null | undefined>): boolean {
  const t = texts.filter(Boolean).join('\n');
  return FOREIGN_CCY_RE.test(t) && !AUD_RE.test(t);
}

/** The questions still open, in the order Will asks them (one per message). */
export function missingIntakeFacts(messages: IntakeMessage[], since: string): Array<'abn_number_gst' | 'currency'> {
  const t0 = new Date(since).getTime();
  const texts = messages.filter((m) => m.direction === 'IN' && new Date(m.createdAt).getTime() >= t0).map((m) => m.body);
  const all = texts.filter(Boolean).join('\n');
  const out: Array<'abn_number_gst' | 'currency'> = [];
  if (!(ABN_NUMBER_RE.test(all) && /\bgst\b/i.test(all))) out.push('abn_number_gst');
  if (mentionsForeignCurrency(texts)) out.push('currency');
  return out;
}

/** Was the ABN request actually delivered? A failed send must not count
 *  (Jo, 3 Nov: the request failed, nobody noticed, the team chased 10 days). */
export function abnRequestDelivered(messages: Array<{ direction: string; body: string | null; status?: string | null }>, requestText: string): boolean {
  const key = requestText.slice(0, 40).toLowerCase();
  return messages.some((m) => m.direction === 'OUT' && m.status !== 'FAILED' && (m.body ?? '').toLowerCase().includes(key));
}
