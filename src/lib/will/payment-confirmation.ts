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
import { PAYMENT_RECEIVED_MSG, paymentReceivedMessage } from './i18n';
import formPaths from '../../../config/form-paths';
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


// ── THE FORM LINK MUST ARRIVE (3 Nov) ────────────────────────────────────────
//
// Three failures in the 72h export: a "payment received" that was [send failed]
// and never retried (the customer waited days), one that was [discarded] as a
// duplicate while the copy that did go carried a RETIRED form slug, and
// fallback text that confirmed the payment without the link at all. The
// confirmation exists to deliver the form link; a confirmation without a
// working link is not a confirmation. Everything below is pure so the
// scheduler and the send paths can ask it.

const HOSTS = '(?:workingholidaytax\\.com(?:\\.au)?|studentvisatax\\.com\\.au)';
const CURRENT_SLUGS = [formPaths.WHT['tax-form'], formPaths.SVT.form].join('|');
/** A form link that opens today: the CURRENT slug (optionally under /de /ja /zh /vi). */
export const CURRENT_FORM_LINK = new RegExp(`${HOSTS}\\/(?:(?:de|ja|zh|vi)\\/)?(?:${CURRENT_SLUGS})(?![\\w-])`, 'i');
const ANY_URL_FOR_FORM = new RegExp(`https?:\\/\\/(?:www\\.)?${HOSTS}\\/(?:(?:de|ja|zh|vi)\\/)?[\\w-]+[^\\s]*`, 'gi');

export function hasWorkingFormLink(body: string | null | undefined): boolean {
  return CURRENT_FORM_LINK.test(body ?? '');
}

/** The default form link for a language, read from the canonical confirmation. */
export function defaultFormLink(lang?: string | null): string {
  const m = /https?:\/\/\S+/.exec(paymentReceivedMessage(lang));
  return m ? m[0] : '';
}

/** Make sure `body` carries a working form link: swap a retired-slug link for
 *  the current one, or append the link on its own line when there is none. */
export function ensureFormLink(body: string, link: string): string {
  if (!link) return body;
  if (hasWorkingFormLink(body)) return body;
  if (FORM_LINK_ANY_BRAND.test(body)) {
    let replaced = false;
    const out = body.replace(ANY_URL_FOR_FORM, (u) => {
      if (!replaced && FORM_LINK_ANY_BRAND.test(u)) { replaced = true; return link; }
      return u;
    });
    if (replaced && hasWorkingFormLink(out)) return out;
  }
  return `${body.replace(/\s+$/, '')}\n\n${link}`;
}

/** The text sent when a template or a model-written confirmation could not go:
 *  always the canonical confirmation, which always has the link. */
export function fallbackConfirmationText(lang?: string | null): string {
  return ensureFormLink(paymentReceivedMessage(lang), defaultFormLink(lang));
}

type ConfRow = Pick<MessageRow, 'id' | 'direction' | 'status' | 'body' | 'meta' | 'createdAt'>;

/** A SENT outbound message that carries a working form link, or a SENT payment
 *  confirmation template (its Start Here button carries the link). */
function deliversFormLink(m: ConfRow): boolean {
  if (m.direction !== 'OUT' || !['SENT', 'SENDING'].includes(m.status)) return false;
  if (hasWorkingFormLink(m.body)) return true;
  return isPaymentConfirmationRow(m) && !!m.meta?.waTemplate;
}

/** Like confirmationAlreadyOut, but a copy only counts when it actually put the
 *  form link in front of the customer. The duplicate guard uses this, so a
 *  linkless or retired-slug copy never causes the good one to be discarded. */
export function confirmationWithLinkAlreadyOut(
  msgs: ConfRow[], opts: { exceptId?: string; now?: number } = {},
): boolean {
  const now = opts.now ?? Date.now();
  return msgs.some((m) => m.id !== opts.exceptId && now - new Date(m.createdAt).getTime() <= 48 * 60 * 60 * 1000
    && deliversFormLink(m) && isPaymentConfirmationRow(m));
}

export type ConfirmationRescue =
  | { action: 'none'; why: string }
  | { action: 'resend'; why: string; row: ConfRow; attempt: number }
  | { action: 'send_link'; why: string; row: ConfRow; attempt: number }
  | { action: 'escalate'; why: string; row: ConfRow };

export const MAX_CONFIRMATION_ATTEMPTS = 4;
/** A QUEUED / SENDING confirmation older than this is stuck, not on its way. */
export const STUCK_CONFIRMATION_MS = 15 * 60 * 1000;

/** The sweep: has this PAID customer been given the form link? Looks at the
 *  most recent confirmation in the last 7 days. Returns what to do:
 *   - none      a SENT message carries the link, or the row is waiting on a
 *               person (PENDING_APPROVAL), or nothing was ever drafted
 *   - resend    the confirmation FAILED / was DISCARDED / BLOCKED / is stuck
 *               and no other message delivered the link: send the canonical
 *               text again (fallbackConfirmationText)
 *   - send_link a confirmation went out WITHOUT a working link: send it alone
 *   - escalate  too many attempts: an URGENT task, a person sends it
 *  The customer may have been silenced on purpose (kill switch, AI paused,
 *  opted out): the caller checks that before acting. */
export function confirmationRescue(
  msgs: ConfRow[], opts: { now?: number; maxAgeMs?: number } = {},
): ConfirmationRescue {
  const now = opts.now ?? Date.now();
  const maxAge = opts.maxAgeMs ?? 7 * 24 * 60 * 60 * 1000;
  const rows = msgs.filter((m) => m.direction === 'OUT' && isPaymentConfirmationRow(m)
    && now - new Date(m.createdAt).getTime() <= maxAge)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  if (rows.length === 0) return { action: 'none', why: 'no payment confirmation was ever drafted' };
  const first = new Date(rows[0].createdAt).getTime();
  // Anything outbound since the first confirmation that delivered the link.
  const delivered = msgs.some((m) => new Date(m.createdAt).getTime() >= first - 60_000 && deliversFormLink(m));
  if (delivered) return { action: 'none', why: 'a sent message carries the form link' };
  const last = rows[rows.length - 1];
  if (rows.some((r) => r.status === 'PENDING_APPROVAL')) return { action: 'none', why: 'waiting for approval' };
  const attempts = rows.filter((r) => ['FAILED', 'DISCARDED', 'BLOCKED'].includes(r.status)).length;
  if (attempts >= MAX_CONFIRMATION_ATTEMPTS) return { action: 'escalate', why: `${attempts} attempts, none delivered the form link`, row: last };
  const stuck = ['QUEUED', 'SENDING'].includes(last.status) && now - new Date(last.createdAt).getTime() > STUCK_CONFIRMATION_MS;
  if (['FAILED', 'DISCARDED', 'BLOCKED'].includes(last.status) || stuck) {
    return { action: 'resend', why: `last confirmation is ${last.status}${stuck ? ' and stuck' : ''}, no link delivered`, row: last, attempt: attempts + 1 };
  }
  if (last.status === 'SENT') {
    return { action: 'send_link', why: 'the confirmation went out without a working form link', row: last, attempt: attempts + 1 };
  }
  return { action: 'none', why: 'confirmation is on its way' };
}
