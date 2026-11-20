// ============================================================
// Will's judgement guards (rulebook v1, from the 3-month review).
//
// Deterministic checks that sit after the model has written a reply and
// before it is sent. They never invent wording about tax, prices or refunds;
// they only stop a reply that contradicts what the customer just said.
//
// Rule L1 (leaving): a lead who has said they are going elsewhere, doing it
//   themselves or not interested gets ONE short goodbye. No price, no fee, no
//   refund talk, no question, no "just reply here". The export had a lead say
//   "thanks, found someone else" and get a sales pitch back.
// Rule R1 (review asks): a thank-you on its own is not a moment to ask for a
//   Google review. The ask waits for the refund to land (review-asks.ts).
// ============================================================
import { containsThanks, hasQuestionOrRequest, LEAVING_RE, thanksReply } from './text-normalize';
import { saysLeaving } from './followup-gate-30oct';
import { saysRefundLanded } from './review-asks';

/** Jo, 15 Nov: never a second review request. True when the ask was already
 *  sent, or the customer was skipped (owes tax), or it was already answered. */
export function reviewAskAlreadyMade(rec: { askedAt?: string; skippedAt?: string } | null | undefined): boolean {
  return !!(rec?.askedAt || rec?.skippedAt);
}

/** Jo, 15 Nov: did the customer ever say the refund landed, earlier in the chat? */
export function refundLandedBefore(msgs: { direction: string; body?: string | null }[]): boolean {
  return msgs.some((m) => m.direction === 'IN' && saysRefundLanded(m.body ?? ''));
}

/** Words that make a reply a sales or money message. A goodbye may contain none. */
const SALES_IN_REPLY = new RegExp([
  String.raw`\$\s?\d`, String.raw`\b(?:220|385)\b`, String.raw`\bprice\b`, String.raw`\bfee\b`,
  String.raw`\brefund\b`, String.raw`\bguarantee\b`, String.raw`\bdeadline\b`, String.raw`\b31 ?oct`,
  String.raw`\bbank\b`, String.raw`\bpay(?:ment)?\b`, String.raw`\bjust reply\b`, String.raw`\bdon'?t miss\b`,
  String.raw`\bwe can (?:still )?(?:help|do)\b`, String.raw`\bhappy to (?:help|start)\b`,
  String.raw`[?？]`,
].join('|'), 'i');

/** The one goodbye a leaving lead gets. English uses the approved line from the
 *  playbook; other languages use the neutral thanks reply Will already has. */
export function leavingCloseLine(lang?: string | null, lastWillText?: string | null): string {
  if (!lang || lang === 'en') return 'No worries at all, all the best with it 😊';
  return thanksReply(lastWillText ?? '', lang);
}

/** Pure thanks: the customer thanks us and asks nothing, and is not leaving. */
export function isPureThanks(customerText: string | null | undefined): boolean {
  const t = (customerText ?? '').trim();
  if (!t) return false;
  if (!containsThanks(t)) return false;
  if (hasQuestionOrRequest(t)) return false;
  if (saysLeaving(t)) return false;
  return true;
}

/** Rule L1. Returns the replacement goodbye when a leaving lead got a reply
 *  that sells, asks or talks money; null when the reply can go out as written. */
export function leavingReplyFix(
  customerText: string | null | undefined,
  replyText: string | null | undefined,
  lang?: string | null,
  lastWillText?: string | null,
): string | null {
  const leaving = saysLeaving(customerText) || LEAVING_RE.test(customerText ?? '');
  if (!leaving) return null;
  const reply = (replyText ?? '').trim();
  if (!reply) return leavingCloseLine(lang, lastWillText);
  if (SALES_IN_REPLY.test(reply)) return leavingCloseLine(lang, lastWillText);
  return null;
}

/** Rule R1. Why a review ask must not go out right now, or null when it may.
 *  `refundLanded` is true only when the customer has said the refund arrived. */
export function reviewAskBlockedBy(
  lastCustomerText: string | null | undefined,
  refundLanded: boolean,
): 'leaving' | 'thanks_without_refund' | null {
  if (saysLeaving(lastCustomerText)) return 'leaving';
  // Any thank-you without a landed refund blocks the ask, even when it also says
  // "not yet" (which isPureThanks treats as a status answer, not a thank-you).
  if (!refundLanded && containsThanks(lastCustomerText)) return 'thanks_without_refund';
  return null;
}

/** Rule D1. Normalised word overlap (0 to 1) between two messages. Emoji,
 *  punctuation and case are ignored, so "Thanks!!" and "thanks" match. */
export function similarity(a: string, b: string): number {
  const words = (s: string) => new Set((s || '').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean));
  const A = words(a); const B = words(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  return inter / (A.size + B.size - inter);
}

/** Rule D1. True when a reply is a near-copy of one already sent to the same
 *  customer (threshold 0.9). Not wired into the send path yet: a silent drop
 *  would leave the customer unanswered, so wiring needs a human-task fallback. */
export function isNearDuplicate(reply: string, sentBefore: string[], threshold = 0.9): boolean {
  return sentBefore.some((s) => similarity(reply, s) >= threshold);
}

/** Rule S2 (Nov 2026). A reply that says the return is lodged, or being lodged,
 *  before the customer signed is replaced by this fixed wording, the same
 *  wording the Library gives (knowledge-seed, "nothing from you right now").
 *  Only for en, de and ja; other languages keep the team handoff. */
const SIGNATURE_FIRST: Record<string, string> = {
  en: "Your return isn't lodged yet. Once you've signed the document we emailed you, we'll lodge it with the ATO and let you know here.",
  de: 'Deine Steuererklärung ist noch nicht eingereicht. Sobald du das Dokument unterschrieben hast, das wir dir per E-Mail geschickt haben, reichen wir sie beim ATO ein und melden uns hier.',
  ja: 'タックスリターンはまだ提出されていません。メールでお送りした書類にご署名いただいたら、ATOに提出し、こちらでお知らせします。',
};

export function signatureFirstFix(violations: string[], lang?: string | null): string | null {
  if (!violations.length || !violations.every((v) => v === 'LODGEMENT_BEFORE_SIGNATURE')) return null;
  const key = lang && lang in SIGNATURE_FIRST ? lang : (!lang ? 'en' : null);
  return key ? SIGNATURE_FIRST[key] : null;
}
