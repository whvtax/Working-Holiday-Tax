// ============================================================
// Google review asks (Jo, 24 Sep).
//
// WHAT WAS WRONG. One fixed line ("Thank you so much for trusting us…") went
// out an hour after lodgement, to everyone, before the refund had even
// arrived. It read as a system message and it did not work.
//
// WHAT THIS DOES.
//   Timing: the ask waits for the moment worth asking at. When the customer
//   writes that the refund landed, the ask goes out right then (the reply is
//   inside the 24h window, warm and free text). If they never say so, a
//   fallback fires 14 days after lodgement, as the Meta template.
//   Judgement: before anything goes out, Will reads the conversation and
//   decides whether to ask at all (a customer who owed tax, complained, or
//   argued gets no ask) and writes ONE personal opening line for this person.
//   Once: one ask per customer, ever. One referral line after a positive
//   reply to the ask, once.
//   Measured: asked / skipped (with the reason) / referral sent, plus a
//   counter the owner ticks when a review actually appears on Google.
// ============================================================
import type { Store } from './store';

export const REVIEW_ASKS_SETTING = 'review_asks';
export const REVIEWS_RECEIVED_SETTING = 'reviews_received';
/** Fallback delay after lodgement when the customer never mentions the refund. */
export const REVIEW_ASK_FALLBACK_DAYS = 14;
/** The referral line is offered only within this many days of the ask. */
export const REFERRAL_WINDOW_DAYS = 10;

export interface ReviewAskRecord {
  askedAt?: string;
  trigger?: 'refund_received' | 'timer' | 'manual';
  opener?: string;
  skippedAt?: string;
  skipReason?: string;
  referralAt?: string;
}
export type ReviewAsks = Record<string, ReviewAskRecord>;

export async function readReviewAsks(store: Store): Promise<ReviewAsks> {
  const v = await store.getSetting(REVIEW_ASKS_SETTING).catch(() => null);
  return v && typeof v === 'object' ? (v as ReviewAsks) : {};
}
export async function patchReviewAsk(store: Store, customerId: string, patch: ReviewAskRecord): Promise<void> {
  const all = await readReviewAsks(store);
  all[customerId] = { ...(all[customerId] ?? {}), ...patch };
  await store.setSetting(REVIEW_ASKS_SETTING, all);
}

/** "The refund landed": the customer telling us the money arrived, in the
 *  languages Will speaks. Deliberately narrow: "refund" alone is not enough
 *  (they ask about it constantly); it has to be received/arrived/in. */
const REFUND_LANDED = new RegExp([
  // en
  '(?:refund|money|it|payment|tax back|cash)\\b[^.!?\\n]{0,40}\\b(?:arrived|landed|came (?:in|through)|come (?:in|through)|is in|went in|hit my account|received|got it|in my account|deposited)',
  '\\b(?:got|received|have|just got)\\b[^.!?\\n]{0,25}\\b(?:my )?(?:refund|money|tax back)\\b',
  // de
  '(?:r[üu]ckerstattung|geld|erstattung)[^.!?\\n]{0,40}\\b(?:angekommen|eingegangen|da|erhalten|bekommen|auf dem konto|drauf)',
  // es / pt / it / fr
  '(?:reembolso|devoluci[óo]n|dinero|rimborso|soldi|remboursement|argent)[^.!?\\n]{0,40}\\b(?:lleg[óo]|recib[íi]|ya est[áa]|chegou|recebi|arrivato|ricevuto|arriv[ée]|re[çc]u)',
  // ja
  '(?:還付金|お金|入金)[^。\\n]{0,20}(?:届き|入り|振り込まれ|受け取り|着金|来ました|きました)',
].join('|'), 'i');
export function saysRefundLanded(text: string): boolean {
  return REFUND_LANDED.test((text || '').replace(/\s+/g, ' '));
}

/** A short positive reply to the review ask: "done", "left it", "sure", "👍". */
const POSITIVE_ACK = /^(?:(?:ok(?:ay)?|sure|done|will do|of course|no worries|absolutely|yes|yep|yeah|left (?:it|one|a review)|just did|done it|posted|thanks?|thank you|cheers|👍|🙏|❤️|😊|klar|gerne|erledigt|gemacht|danke|hecho|claro|listo|gracias|fait|bien s[ûu]r|merci|fatto|certo|grazie|feito|obrigad[oa]|はい|了解|書きました|投稿しました|ありがとう(?:ございます)?)[\s!.,😊👍🙏❤️]*)+$/iu;
export function isPositiveAck(text: string): boolean {
  const t = (text || '').trim();
  return t.length > 0 && t.length <= 80 && POSITIVE_ACK.test(t);
}
