// ============================================================
// Two system messages that must never be said twice, and one that must never
// be said without its cause (30 Oct, from 410 real chats):
//
//   - "Payment received" went out twice, one minute apart (about 15 chats);
//   - "We've received your questionnaire" went out twice, and also went out
//     when the form was NOT in the system (Ronan lost eleven days).
//
// The pure checks live here so every send path can ask the same question and
// the rules are tested once. The single transmission point (channel.deliverOut)
// applies them to every AI-authored message, whatever door it came through.
// ============================================================
import type { MessageRow } from './store';
import { isPaymentConfirmationRow } from './payment-confirmation';
import { criticalSystemKind, type CriticalKind } from './send-failure-30oct';

export type SystemMessageKind = 'payment_received' | 'questionnaire_received';

/** "We've received your questionnaire" in every language Will speaks, whether
 *  it is the fixed line or the model's own words. Conditionals ("once we've
 *  received your form") are not the confirmation. */
export const QUESTIONNAIRE_RECEIVED_RE = new RegExp([
  "(?<!\\b(?:once|when|after|as soon as|until|if|before)\\s)(?:we(?:'ve| have)|i(?:'ve| have)|we|i|got|great,? we(?:'ve| have))\\s+(?:just\\s+|now\\s+)?(?:received|got)\\s+(?:your|the)\\s+(?:questionnaire|form|tax form)",
  'wir haben (?:deinen|den|ihren) fragebogen (?:erhalten|bekommen)', 'fragebogen (?:ist )?(?:erhalten|angekommen)',
  'アンケートを受け取りました', 'アンケート(?:を)?(?:確認|受領)しました',
  'hemos recibido tu cuestionario', 'recibimos tu cuestionario',
  'nous avons bien reçu ton questionnaire', 'nous avons re[çc]u (?:ton|votre) questionnaire',
  'abbiamo ricevuto il tuo questionario', 'recebemos o teu question[áa]rio',
].join('|'), 'i');

/** How long the same kind of message is not repeated to one customer. A payment
 *  confirmation is once per payment (two days covers a late retry, not a second
 *  year's payment weeks later); a questionnaire acknowledgement is once per
 *  submission (a double click or a retry, not a resubmission days later). */
export const KIND_WINDOW_MS: Record<SystemMessageKind, number> = {
  payment_received: 48 * 60 * 60 * 1000,
  questionnaire_received: 2 * 60 * 60 * 1000,
};

type Row = Pick<MessageRow, 'id' | 'direction' | 'status' | 'body' | 'meta' | 'createdAt'>;

/** What kind of system message this is, or null for ordinary conversation. */
export function systemMessageKind(body: string | null | undefined, meta?: Record<string, unknown> | null): SystemMessageKind | null {
  const row = { direction: 'OUT' as const, body: body ?? '', meta: (meta ?? undefined) as MessageRow['meta'] };
  if (isPaymentConfirmationRow(row)) return 'payment_received';
  const tpl = (meta?.waTemplate as { name?: string } | undefined)?.name ?? '';
  if (/^form_received/i.test(tpl) || QUESTIONNAIRE_RECEIVED_RE.test(body ?? '')) return 'questionnaire_received';
  return null;
}

/** Has a message of this kind already gone out (or is going out) to this
 *  customer inside the window? `exceptId` is the row asking. */
export function sameKindAlreadyOut(msgs: Row[], kind: SystemMessageKind, opts: { exceptId?: string; now?: number } = {}): boolean {
  const now = opts.now ?? Date.now();
  return msgs.some((m) => m.id !== opts.exceptId
    && m.direction === 'OUT'
    && (m.status === 'SENT' || m.status === 'SENDING')
    && now - new Date(m.createdAt).getTime() <= KIND_WINDOW_MS[kind]
    && systemMessageKind(m.body, m.meta as Record<string, unknown> | undefined) === kind);
}

// ------------------------------------------------------------
// 3 Nov: messages a customer is waiting on that never arrived. Rows marked
// FAILED, DISCARDED or stuck QUEUED for "Payment received" + form link, the
// form link, the ABN document request and the hand-off acknowledgement sat for
// days. This finds them, so a sweep can repair each ONCE.
// ------------------------------------------------------------

export const REPAIR_LOOKBACK_MS = 7 * 24 * 60 * 60 * 1000;
export const STUCK_QUEUED_MS = 15 * 60 * 1000;

type RepairRow = Row & { author?: string };

/** Unsent critical rows (oldest first, one per kind) with no later delivered
 *  message of the same kind. A payment confirmation also counts as delivered
 *  when ANY payment confirmation was sent after it. */
export function unrepairedCritical(msgs: RepairRow[], opts: { now?: number } = {}): Array<{ row: RepairRow; kind: CriticalKind }> {
  const now = opts.now ?? Date.now();
  const at = (m: Row) => new Date(m.createdAt).getTime();
  const out: Array<{ row: RepairRow; kind: CriticalKind }> = [];
  const seen = new Set<CriticalKind>();
  for (const m of [...msgs].sort((a, b) => at(a) - at(b))) {
    if (m.direction !== 'OUT' || m.author === 'HUMAN') continue;
    const dead = m.status === 'FAILED' || m.status === 'DISCARDED' || (m.status === 'QUEUED' && now - at(m) > STUCK_QUEUED_MS);
    if (!dead || now - at(m) > REPAIR_LOOKBACK_MS) continue;
    const kind = criticalSystemKind(m.body, m.meta as Record<string, unknown> | undefined);
    if (!kind || seen.has(kind)) continue;
    const delivered = msgs.some((o) => o.id !== m.id && o.direction === 'OUT' && o.status === 'SENT' && at(o) >= at(m)
      && (criticalSystemKind(o.body, o.meta as Record<string, unknown> | undefined) === kind
        || (kind === 'payment_received' && systemMessageKind(o.body, o.meta as Record<string, unknown> | undefined) === 'payment_received')));
    if (delivered) continue;
    seen.add(kind);
    out.push({ row: m, kind });
  }
  return out;
}
