// ============================================================
// WHO MAY RECEIVE WHICH AUTOMATIC MESSAGE (Jo, 30 Oct).
//
// Findings from 410 real chats, all the same shape: a template written for one
// situation reached someone in another.
//   - pre sale nudges ("have you given up on your refund?") to PAID customers
//   - "your refund should arrive within 14 business days" to customers who OWE
//   - the refund check-in to someone who owes, or who said the refund arrived
//   - "we just need your signature" after they signed
//   - the form reminder after the form was submitted
//   - the review ask twice
//   - sales messages and winbacks AFTER the customer said no
//
// Everything here is pure: it reads the customer row and the chat, and says
// why a message must NOT go. The scheduler, the winback pass and the Mark
// Lodged button call it; nothing in this file sends or writes.
// ============================================================
import { FORM_RECEIVED_MSG, PAYMENT_RECEIVED_MSG, REVIEW_REQUEST_MSG } from './i18n';
import { LEAVING_RE, isCourtesyLine, isClosingOnly } from './text-normalize';
import { REVIEW_LINK_RE, saysRefundLanded } from './review-asks';
import { isFormAutoText } from './language-30oct';
import type { CustomerRow, MessageRow } from './store';

type Msg = Pick<MessageRow, 'direction' | 'author' | 'status' | 'body' | 'createdAt'> & { meta?: MessageRow['meta'] };
type Cust = Pick<CustomerRow, 'paid' | 'state' | 'outcome' | 'estimatedRefundCents'>;

const norm = (s: string | null | undefined) => (s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
const sentOut = (m: Msg) => m.direction === 'OUT' && (m.status ?? 'SENT') === 'SENT';
const customerIn = (m: Msg) => m.direction === 'IN' && (m.author === 'CUSTOMER' || m.author == null) && !m.meta?.media;

// ── NOTHING AFTER A NO ───────────────────────────────────────────────────────

/** Words that mean the opposite of leaving: a buying signal that happens to
 *  contain a LEAVING_RE fragment ("I decided to go with the TFN option"). */
const BUYING_SIGNAL = /\b(?:tfn|abn|option|yes please|how (?:do|can) i pay|pay now|ready to pay|go(?:ing)? with (?:you|your|the|it|that)|with you(?:rs)?|bei euch|zu euch)\b|お願い(?:します|いたします)/i;

/** The customer telling us they are leaving: not interested, going elsewhere,
 *  "I'll pass", doing it themselves, not this time (LEAVING_RE, text-normalize).
 *  A question is never a goodbye, and a buying signal in the same message wins. */
export function saysLeaving(text: string | null | undefined): boolean {
  const t = (text ?? '').replace(/\s+/g, ' ').trim();
  if (!t || t.length > 300) return false;
  if (isFormAutoText(t)) return false;
  if (/[?？]/.test(t)) return false;
  if (BUYING_SIGNAL.test(t)) return false;
  return LEAVING_RE.test(t);
}

/** The customer's latest word on the matter is no. A "no" followed by a real
 *  message from them (a question, "actually, how do I pay?") means they came
 *  back and the lead is open again; a thank-you or goodbye after it does not.
 *  Returns the evidence, or null. */
export function declinedInChat(messages: readonly Msg[]): { at: string; text: string } | null {
  let found: { at: string; text: string } | null = null;
  for (const m of messages) {
    if (!customerIn(m)) continue;
    if (saysLeaving(m.body)) { found = { at: m.createdAt, text: (m.body ?? '').slice(0, 120) }; continue; }
    if (found && (m.body ?? '').trim() && !isFormAutoText(m.body) && !isCourtesyLine(m.body ?? '') && !isClosingOnly(m.body)) found = null;
  }
  return found;
}

// ── FACTS ABOUT THE CUSTOMER'S STAGE ─────────────────────────────────────────

const PAID_PREFIXES = new Set(Object.values(PAYMENT_RECEIVED_MSG).map((x) => norm(x).slice(0, 40)));
/** The chat proves payment was confirmed to the customer. */
export function paymentConfirmedInChat(messages: readonly Msg[]): boolean {
  return messages.some((m) => sentOut(m)
    && (m.meta?.paymentConfirmation === true
      || (m.meta?.waTemplate?.name ?? '').startsWith('payment_received')
      || PAID_PREFIXES.has(norm(m.body).slice(0, 40))));
}

/** The chat proves the questionnaire has been submitted. */
const FORM_RECEIVED_PREFIXES = new Set(Object.values(FORM_RECEIVED_MSG).map((x) => norm(x).slice(0, 35)));
export function formSubmittedInChat(messages: readonly Msg[]): boolean {
  return messages.some((m) =>
    (sentOut(m) && ((m.meta?.waTemplate?.name ?? '').startsWith('form_received') || FORM_RECEIVED_PREFIXES.has(norm(m.body).slice(0, 35))))
    || (customerIn(m) && isFormAutoText(m.body)));
}

/** "I signed", "habe unterschrieben", "署名しました", not "how do I sign" and
 *  not "I haven't signed yet". Customer messages only. */
const SIGNED = /\b(?:i(?:'ve| have)?|just|have|already|all)\s+(?:just\s+|now\s+|already\s+)?signed\b|\bsigned (?:it|and|now|just)\b|\bdone(?:,)? (?:signed|signing)\b|\bit(?:'s| is) signed\b|unterschrieben|unterzeichnet|signiert|署名(?:しました|済み|完了)|サイン(?:しました|済み|完了)|firmado|signé|firmato|assinei|assinado/i;
const NOT_SIGNED = /\b(?:not|n't|never|haven'?t|didn'?t|cannot|can'?t|how (?:do|can|to)|where (?:do|can)|noch nicht|nicht unterschrieben|まだ)\b[^.!?\n]{0,25}\b(?:sign\w*|unterschreib\w*|署名|サイン)/i;
const SIGNATURE_NOTICE = /signature|sign (?:it|the return)|Unterschrift|unterschreib|署名|サイン/i;
export function saidSigned(messages: readonly Msg[]): boolean {
  // Only what they said after the signature notice counts ("I signed the
  // client agreement" last week is not the return).
  let from = 0;
  messages.forEach((m, i) => {
    if (sentOut(m) && ((m.meta?.waTemplate?.name ?? '').startsWith('signature') || SIGNATURE_NOTICE.test(m.body ?? ''))) from = i + 1;
  });
  return messages.slice(from).some((m) => customerIn(m) && SIGNED.test(m.body ?? '') && !NOT_SIGNED.test(m.body ?? '') && !/[?？]\s*$/.test((m.body ?? '').trim()));
}

/** The customer owes the ATO, from any of the four places that can say so:
 *  the outcome flag, a negative estimate, the payable estimate or payable
 *  lodged text that went out, or the team telling them the amount is payable. */
const PAYABLE_TEXT = /amount payable|payable to the ATO|owe (?:the )?(?:ATO|tax)|tax (?:bill|debt)|walk you through how to pay|payment request and how to pay|Zahlungsaufforderung|お支払いの請求|how to pay the ATO|zu zahlende|Nachzahlung|ATOへの(?:推定)?納付|納付額|お支払い方法をご案内/i;
export function customerOwesTax(c: Pick<Cust, 'outcome' | 'estimatedRefundCents'>, messages: readonly Msg[]): boolean {
  if (c.outcome === 'PAYABLE') return true;
  if (c.outcome === 'REFUND') return false;
  if (c.estimatedRefundCents != null && c.estimatedRefundCents < 0) return true;
  return messages.some((m) => sentOut(m)
    && ((m.meta?.waTemplate?.name ?? '').startsWith('estimate_payable') || (m.meta?.waTemplate?.name ?? '').startsWith('lodged_payable') || PAYABLE_TEXT.test(m.body ?? '')));
}

/** The review ask (or its Meta template) has already gone to this customer,
 *  by any path, including a human pasting the link. */
const REVIEW_ASK_PREFIXES = new Set(Object.values(REVIEW_REQUEST_MSG).map((x) => norm(x).slice(0, 30)));
export function reviewAskAlreadySent(messages: readonly Msg[]): boolean {
  return messages.some((m) => sentOut(m)
    && ((m.meta?.waTemplate?.name ?? '').startsWith('review_ask') || (m.meta?.waTemplate?.name ?? '').startsWith('review_request')
      || REVIEW_LINK_RE.test(m.body ?? '') || REVIEW_ASK_PREFIXES.has(norm(m.body).slice(0, 30))));
}

// ── THE GATES ────────────────────────────────────────────────────────────────

export type FollowUpFlow = 'prePayment' | 'form' | 'signature';

export interface GateResult { block: string; closeLead?: boolean }

/**
 * May this scheduled follow-up go? Returns null when it may, or why not.
 * `closeLead` means the customer said no: the caller closes the lead and
 * cancels everything else queued for them.
 */
export function followUpBlock(c: Cust, flow: FollowUpFlow, messages: readonly Msg[]): GateResult | null {
  if (flow === 'prePayment') {
    if (c.paid || paymentConfirmedInChat(messages)) return { block: 'paid customer: pre sale nudges never go to someone who has paid' };
    const no = declinedInChat(messages);
    if (no) return { block: `the customer said no (${no.text})`, closeLead: true };
  }
  if (flow === 'form' && formSubmittedInChat(messages)) return { block: 'the questionnaire was already submitted' };
  if (flow === 'signature' && saidSigned(messages)) return { block: 'the customer said they signed' };
  return null;
}

/** May the "has your refund landed?" check-in go? null = yes. */
export function refundCheckinBlock(c: Cust, messages: readonly Msg[]): string | null {
  if (customerOwesTax(c, messages)) return 'the customer owes tax: there is no refund to ask about';
  const arrived = messages.some((m) => customerIn(m) && saysRefundLanded(m.body ?? ''));
  if (arrived) return 'the customer already said the refund arrived';
  return null;
}

/** Which lodged confirmation: the refund wording must never reach someone who
 *  owes. Used by the Mark Lodged button. */
export function lodgedVariant(c: Cust, messages: readonly Msg[]): 'refund' | 'payable' {
  return customerOwesTax(c, messages) ? 'payable' : 'refund';
}

/** The chat, or an empty list when it cannot be read (a gate must never be
 *  the reason a send crashes; unreadable means "no evidence"). */
export async function messagesOf(store: { listMessages: (id: string) => Promise<MessageRow[]> }, customerId: string): Promise<MessageRow[]> {
  try { return (await store.listMessages(customerId)) ?? []; } catch { return []; }
}
