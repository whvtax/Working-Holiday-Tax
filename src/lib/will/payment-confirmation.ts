// ============================================================
// ONE PAYMENT, ONE CONFIRMATION (Jo, 23 Oct, +49 160 8730398).
//
// The receipt arrived at 04:17. At 04:20 the customer got "Zahlung erhalten"
// as free text with the form link; at 04:25 the same confirmation again as
// the Meta template with the "Hier starten" button. Two doors confirm a
// payment (the screenshot, and the customer's own words) and each sent its
// own. The duplicate guard compares exact text, and the two versions are
// worded differently, so it let both through.
//
// This recognises a payment confirmation by what it IS (the flags the code
// sets on it, or its first line in any of Will's languages), not by its exact
// wording, and every send path asks it before confirming again.
// ============================================================
import type { MessageRow } from './store';
import { PAYMENT_RECEIVED_MSG } from './i18n';
import { FORM_LINK_ANY_BRAND } from './brand-voice';

/** "Payment received." / "Zahlung erhalten." / "お支払いを確認しました。" ... */
const FIRST_LINES = Object.values(PAYMENT_RECEIVED_MSG).map((t) => t.split('\n')[0].trim().toLowerCase());

/** The phrase itself, without its closing punctuation: "payment received". */
const CORES = FIRST_LINES.map((f) => f.replace(/[.!。！]+$/u, '').trim()).filter(Boolean);

/** `phrase` at `at` in `l`, not glued to a longer word ("receivedness"). */
const phraseAt = (l: string, phrase: string, at: number) =>
  at >= 0 && !/[\p{L}\p{N}]/u.test(l.charAt(at + phrase.length)) && (at === 0 || !/[\p{L}\p{N}]/u.test(l.charAt(at - 1)));

export function looksLikePaymentConfirmation(body: string | null | undefined): boolean {
  const lines = (body ?? '').toLowerCase().split('\n').map((l) => l.trim()).filter(Boolean);
  // A line that opens with the phrase, whatever follows it (Jo, 26 Oct,
  // Sam: "Payment received, thanks Sam!" was missed because of the
  // comma and the name, and the template went out a minute later).
  // Only the phrase closing itself (end, . ! , 。 ！ or " -"): "Payment received
  // isn't showing yet" or "Payment received?" is not a confirmation (review 27 Oct).
  if (lines.some((l) => CORES.some((c) => l.startsWith(c) && phraseAt(l, c, 0) && /^(?:$|[.!,。！]| -)/u.test(l.slice(c.length))))) return true;
  // The phrase anywhere ("Thanks Sam, payment received.") counts when the
  // message also carries the form link: that is the confirmation, reworded.
  if (!FORM_LINK_ANY_BRAND.test(body ?? '')) return false;
  return lines.some((l) => CORES.some((c) => phraseAt(l, c, l.indexOf(c))));
}

export function isPaymentConfirmationRow(m: Pick<MessageRow, 'direction' | 'body' | 'meta'>): boolean {
  if (m.direction !== 'OUT') return false;
  return m.meta?.paymentConfirmation === true || m.meta?.proposedState === 'PAID' || looksLikePaymentConfirmation(m.body);
}

/** Was a confirmation already sent (or is one already on its way) to this
 *  customer in the last two days? `exceptId` is the row asking. */
export function confirmationAlreadyOut(
  msgs: Array<Pick<MessageRow, 'id' | 'direction' | 'status' | 'body' | 'meta' | 'createdAt'>>,
  opts: { exceptId?: string; includePending?: boolean; now?: number } = {},
): boolean {
  const now = opts.now ?? Date.now();
  const live = opts.includePending ? ['SENT', 'QUEUED', 'SENDING', 'PENDING_APPROVAL'] : ['SENT', 'SENDING'];
  return msgs.some((m) => m.id !== opts.exceptId && live.includes(m.status)
    && now - new Date(m.createdAt).getTime() <= 48 * 60 * 60 * 1000
    && isPaymentConfirmationRow(m));
}

const NEGATED = /\b(?:not|yet|haven'?t|hasn'?t|didn'?t|can'?t|cannot|unable|unless|until|once|when|if|nicht|noch nicht|todavía|aún|pas encore|non ancora|ainda)\b|n't|ません|まだ/i;
const ENGLISH_VARIANTS = /\b(?:payment\s+(?:has\s+been\s+|was\s+|is\s+)?(?:received|confirmed|come through|came through)|(?:we(?:'ve| have)|i(?:'ve| have)|we|i)\s+(?:just\s+)?(?:received|got)\s+your\s+(?:payment|transfer|receipt)|your\s+payment\s+(?:has\s+)?(?:arrived|come through|came through|is in)|thanks? for (?:your|the) payment)\b/i;

/** 30 Oct: does ANY line of this draft tell the customer their payment arrived,
 *  in any wording? "Payment received!", "Payment received, thank you",
 *  "We've received your payment", "Zahlung erhalten". The strict first-line
 *  test above recognises the fixed confirmation; this one recognises the model
 *  saying the same thing in its own words, so an unpaid customer ("I'll pay
 *  next week") can be kept from hearing it. A line that denies it ("we haven't
 *  received your payment") does not count. */
export function mentionsPaymentReceived(body: string | null | undefined): boolean {
  const lines = (body ?? '').split(/\n|(?<=[.!?。！])\s+/).map((l) => l.trim()).filter(Boolean);
  return lines.some((raw) => {
    const l = raw.toLowerCase();
    if (NEGATED.test(l) && !/^payment received/.test(l)) return false;
    return ENGLISH_VARIANTS.test(l) || CORES.some((c) => phraseAt(l, c, l.indexOf(c)));
  });
}
