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

/** "Payment received." / "Zahlung erhalten." / "お支払いを確認しました。" ... */
const FIRST_LINES = Object.values(PAYMENT_RECEIVED_MSG).map((t) => t.split('\n')[0].trim().toLowerCase());

export function looksLikePaymentConfirmation(body: string | null | undefined): boolean {
  const lines = (body ?? '').toLowerCase().split('\n').map((l) => l.trim()).filter(Boolean);
  return lines.some((l) => FIRST_LINES.some((f) => l === f || l.startsWith(f)));
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
