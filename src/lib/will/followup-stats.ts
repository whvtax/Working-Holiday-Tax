// ============================================================
// Follow-up results (Jo, 18 Nov): of the leads who got each pre-payment
// follow-up, how many paid afterwards. In a few months this says whether a
// follow-up should stay, change or go.
//
//   Got it        distinct customers the step went out to (audit `follow_up_sent`).
//   Paid after    of those, how many reached PAID after the step was sent
//                 (the first PAID in the state history).
//   Last nudge    of those who paid, how many paid with THIS step as the most
//                 recent follow-up they had received: the step that was "on
//                 the table" when they paid.
// ============================================================
import type { AuditRow, StateHistoryRow } from './store';

export const PRE_PAYMENT_STEPS = ['fu_pre_24h', 'fu_price_sent', 'fu_pre_3d'] as const;
export type PrePaymentStep = typeof PRE_PAYMENT_STEPS[number];
export const FOLLOWUP_STATS_DAYS = 365;

export interface FollowUpStepStats { step: PrePaymentStep; got: number; paidAfter: number; rate: number | null; lastNudge: number }

const baseKey = (k: string) => k.replace(/_(?:de|ja|es|fr|it|pt|zh|vi)$/, '');

export function followUpStats(audit: AuditRow[], history: StateHistoryRow[]): FollowUpStepStats[] {
  const paidAt = new Map<string, number>();
  for (const h of history) {
    if (h.to !== 'PAID') continue;
    const t = new Date(h.createdAt).getTime();
    const cur = paidAt.get(h.customerId);
    if (cur == null || t < cur) paidAt.set(h.customerId, t);
  }
  // Every pre-payment follow-up each customer received, oldest first.
  const sends = new Map<string, { step: PrePaymentStep; at: number }[]>();
  for (const row of audit) {
    if (row.action !== 'follow_up_sent') continue;
    const d = row.detail as { customerId?: unknown; template?: unknown } | null;
    if (!d || typeof d.customerId !== 'string' || typeof d.template !== 'string') continue;
    const step = baseKey(d.template) as PrePaymentStep;
    if (!(PRE_PAYMENT_STEPS as readonly string[]).includes(step)) continue;
    const list = sends.get(d.customerId) ?? [];
    list.push({ step, at: new Date(row.at).getTime() });
    sends.set(d.customerId, list);
  }
  return PRE_PAYMENT_STEPS.map((step) => {
    let got = 0, paidAfter = 0, lastNudge = 0;
    for (const [id, list] of sends) {
      const mine = list.filter((s) => s.step === step).sort((a, b) => a.at - b.at)[0];
      if (!mine) continue;
      got++;
      const paid = paidAt.get(id);
      if (paid == null || paid < mine.at) continue;
      paidAfter++;
      const before = list.filter((s) => s.at <= paid).sort((a, b) => b.at - a.at)[0];
      if (before?.step === step) lastNudge++;
    }
    return { step, got, paidAfter, rate: got ? Math.round((paidAfter / got) * 1000) / 10 : null, lastNudge };
  });
}
