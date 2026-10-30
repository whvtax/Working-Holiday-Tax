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
