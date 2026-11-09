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
/** 11 Oct: the refund check-in, days after lodgement; second one 4 days later. */
export const REFUND_CHECKIN_DAYS = 10;
export const REFUND_CHECKIN_RETRY_DAYS = 4;

export interface ReviewAskRecord {
  askedAt?: string;
  trigger?: 'refund_received' | 'timer' | 'manual' | 'checkin';
  opener?: string;
  skippedAt?: string;
  skipReason?: string;
  referralAt?: string;
  /** 11 Oct (review system): the day-10 "has the refund landed?" check-in. */
  checkinAt?: string;
  checkins?: number;
  /** The one reminder, 3 days after an unanswered ask. */
  remindedAt?: string;
  /** A review on Google matched to this customer (first name + date). */
  reviewedAt?: string;
  reviewer?: string;
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
  // Jo, 25 Oct (Lauren, +44 7472): "My tax return has come through" counts too.
  '(?:refund|money|it|payment|tax back|cash|tax return|return)\\b[^.!?\\n]{0,40}\\b(?:arrived|landed|came (?:in|through)|come (?:in|through)|is in|went in|hit my account|received|got it|in my account|deposited)',
  '\\b(?:got|received|have|just got)\\b[^.!?\\n]{0,25}\\b(?:my )?(?:refund|money|tax back)\\b',
  // de
  '(?:r[üu]ckerstattung|geld|erstattung)[^.!?\\n]{0,40}\\b(?:angekommen|eingegangen|da|erhalten|bekommen|auf dem konto|drauf)',
  // es / pt / it / fr
  '(?:reembolso|devoluci[óo]n|dinero|rimborso|soldi|remboursement|argent)[^.!?\\n]{0,40}\\b(?:lleg[óo]|recib[íi]|ya est[áa]|chegou|recebi|arrivato|ricevuto|arriv[ée]|re[çc]u)',
  // ja
  '(?:還付金|お金|入金)[^。\\n]{0,20}(?:届き|入り|振り込まれ|受け取り|着金|来ました|きました)',
].join('|'), 'i');
/** Our Google review link, in any of the shapes it is pasted in. */
export const REVIEW_LINK_RE = /g\.page\/|maps\.app\.goo\.gl\/|google\.[a-z.]+\/maps|search\.google\.com\/local\/writereview|writereview\?placeid/i;
/** The customer asking where to leave a review. */
export const ASKS_REVIEW_LINK_RE = /\b(?:link|where)\b[^.?!]{0,40}\breview|\breview\b[^.?!]{0,40}\blink\b|bewertung[^.?!]{0,30}link|レビュー[^。]{0,15}(?:リンク|どこ)/i;

/**
 * Before the scheduled "has your refund landed yet?" goes out, read the chat
 * since lodgement (Jo, 25 Oct, Lauren: she wrote "My tax return has come
 * through, is there a link for a review?", the team sent the link, and two
 * days later the check-in still asked whether the refund had landed). Returns
 * why it is no longer needed, or null when it still is.
 */
export function checkinAlreadyAnswered(
  messages: { direction: string; status?: string; body: string | null; createdAt: string }[],
  sinceIso: string | null | undefined,
): { why: 'refund_landed' | 'review_link_sent' | 'asked_for_review'; at: string } | null {
  const since = sinceIso ? new Date(sinceIso).getTime() : 0;
  for (const m of messages) {
    if (new Date(m.createdAt).getTime() < since) continue;
    const body = m.body ?? '';
    if (m.direction === 'OUT' && (m.status ?? 'SENT') === 'SENT' && REVIEW_LINK_RE.test(body)) return { why: 'review_link_sent', at: m.createdAt };
    if (m.direction === 'IN' && saysRefundLanded(body)) return { why: 'refund_landed', at: m.createdAt };
    if (m.direction === 'IN' && ASKS_REVIEW_LINK_RE.test(body)) return { why: 'asked_for_review', at: m.createdAt };
  }
  return null;
}

export function saysRefundLanded(text: string): boolean {
  // Sentence by sentence, and never a question: "When will my tax return
  // come through?" is the opposite of it having landed.
  const sentences = (text || '').replace(/\s+/g, ' ').match(/[^.!?。！？]+[.!?。！？]*/g) ?? [];
  return sentences.some((x) => !/[?？]\s*$/.test(x)
    && !/^\s*(?:when|has|have|did|will|is|was|how long|wann|ist|hat|cu[aá]ndo|quand|quando|いつ)\b/i.test(x)
    && REFUND_LANDED.test(x));
}

/** Jo, 27 Oct (a customer): our check-in asked "has your refund landed
 *  in your account yet?" and she answered "It has, thank you so much!". That
 *  is the refund landing, but it names no refund, so saysRefundLanded missed
 *  it and she got the referral line instead of the review ask. A short yes is
 *  read as "it landed" only when the last thing we asked was that check-in. */
const YES_TO_CHECKIN = /^\s*(?:(?:yes|yep|yeah|yup|it has|it did|yes it has|yes it did|yes,? (?:it )?(?:has|did|arrived|landed)|got it|all good|ja|jawohl|ist da|s[ií]|oui)\b|はい|届きました|入りました)/iu;
export function saysYesToRefundCheckin(text: string): boolean {
  const t = (text || '').trim();
  return t.length > 0 && t.length <= 120 && !/[?？]/.test(t) && YES_TO_CHECKIN.test(t) && !saysRefundNotYet(t);
}

// ── 11 Oct: the review system ────────────────────────────────────────────────

/** The link that opens Google's review box directly (stars + text). Jo's
 *  "Ask for reviews" link from Google Business Profile is the default (11
 *  Oct); the System tab setting (google_place_id) can override it. */
export const GOOGLE_PLACE_ID_SETTING = 'google_place_id';
export const MAPS_REVIEW_LINK = 'https://g.page/r/CaWt4kV0UmY-EBM/review';
export function reviewLinkFor(placeIdOrLink: string | null | undefined): string {
  const v = (placeIdOrLink ?? '').trim();
  // A Place ID, or the "Get more reviews" link from Google Business Profile
  // (https://g.page/r/XXXX/review), or a writereview link pasted whole.
  if (/^https:\/\/(?:g\.page\/r\/[A-Za-z0-9_-]+\/review|search\.google\.com\/local\/writereview\?placeid=[A-Za-z0-9_-]+)$/.test(v)) return v;
  return /^[A-Za-z0-9_-]{10,}$/.test(v) ? `https://search.google.com/local/writereview?placeid=${v}` : MAPS_REVIEW_LINK;
}
export async function reviewLink(store: Store): Promise<string> {
  const v = await store.getSetting(GOOGLE_PLACE_ID_SETTING).catch(() => null);
  return reviewLinkFor(typeof v === 'string' && v ? v : process.env.GOOGLE_PLACE_ID);
}

/** "Has the refund landed yet?" (day 10), per language. A service question,
 *  not a sales one; a "yes" is the moment the ask goes out. */
// Jo, 9 Nov: exactly this, nothing else around it.
export const REFUND_CHECKIN_MSG: Record<string, string> = {
  en: 'Hi {{1}} 😊\nHas your refund landed in your account yet?',
  de: 'Hi {{1}} 😊\nIst deine Rückerstattung schon auf deinem Konto angekommen?',
  ja: 'こんにちは、{{1}}さん 😊\n還付金はもう口座に入りましたか？',
  es: 'Hola {{1}} 😊\n¿Ya te llegó el reembolso a tu cuenta?',
  fr: 'Salut {{1}} 😊\nTon remboursement est déjà arrivé sur ton compte ?',
  it: 'Ciao {{1}} 😊\nIl rimborso ti è già arrivato sul conto?',
  pt: 'Olá {{1}} 😊\nO reembolso já te caiu na conta?',
};

/** Jo, 9 Nov: THE review ask, the only one. Sent once, right after the
 *  customer says the refund landed (always inside the 24h window, so free
 *  text, never a Meta template). Short, with the link. */
export const REVIEW_ASK_SHORT_MSG: Record<string, string> = {
  en: 'Great to hear! Could you please leave us a short Google review? It would really help us!\n{{1}}',
  de: 'Das freut mich! Würdest du uns eine kurze Google-Bewertung dalassen? Das würde uns echt helfen!\n{{1}}',
  ja: 'よかったです！Googleに短いレビューを書いていただけませんか？とても助かります！\n{{1}}',
  es: '¡Qué bien! ¿Nos dejarías una reseña cortita en Google? ¡Nos ayudaría muchísimo!\n{{1}}',
  fr: 'Super ! Tu pourrais nous laisser un petit avis Google ? Ça nous aiderait vraiment !\n{{1}}',
  it: 'Che bello! Ci lasceresti una breve recensione su Google? Ci aiuteresti tantissimo!\n{{1}}',
  pt: 'Que bom! Podes deixar-nos uma avaliação curtinha no Google? Ajudava-nos imenso!\n{{1}}',
};
export function reviewAskShortMessage(lang: string | null | undefined, link: string): string {
  const key = lang && lang in REVIEW_ASK_SHORT_MSG ? lang : 'en';
  return REVIEW_ASK_SHORT_MSG[key].replace('{{1}}', link);
}
export function refundCheckinMessage(lang: string | null | undefined, firstName: string): string {
  const key = lang && lang in REFUND_CHECKIN_MSG ? lang : 'en';
  return REFUND_CHECKIN_MSG[key].replace('{{1}}', firstName);
}
export function refundCheckinTemplateKey(lang: string | null | undefined): string {
  const key = lang && lang in REFUND_CHECKIN_MSG ? lang : 'en';
  return key === 'en' ? 'refund_checkin' : `refund_checkin_${key}`;
}

/** "Thank you for the review", once a review is matched on Google. */
export const REVIEW_THANKS_MSG: Record<string, string> = {
  en: 'Just saw your Google review, {{1}}, thank you so much, that made our day 🙏 If you know anyone else on a working holiday who needs their tax done, feel free to send them our number 😊',
  de: 'Habe gerade deine Google-Bewertung gesehen, {{1}}, vielen Dank, das hat uns den Tag versüßt 🙏 Falls du jemanden auf Working Holiday kennst, der seine Steuererklärung machen muss, gib gerne unsere Nummer weiter 😊',
  ja: 'こんにちは、{{1}}さん。Googleのレビューを拝見しました。本当にありがとうございます 🙏 もし他にワーホリで確定申告が必要な方がいれば、ぜひこの番号を教えてあげてください 😊',
  es: 'Acabo de ver tu reseña en Google, {{1}}, muchísimas gracias 🙏 Si conoces a alguien de working holiday que necesite hacer su declaración, pásale nuestro número 😊',
  fr: 'Je viens de voir ton avis Google, {{1}}, merci infiniment 🙏 Si tu connais quelqu\'un en working holiday qui doit faire ses impôts, n\'hésite pas à lui donner notre numéro 😊',
  it: 'Ho appena visto la tua recensione su Google, {{1}}, grazie mille 🙏 Se conosci qualcuno in working holiday che deve fare la dichiarazione, passagli pure il nostro numero 😊',
  pt: 'Acabei de ver a tua avaliação no Google, {{1}}, muito obrigado 🙏 Se conheceres alguém em working holiday que precise de tratar dos impostos, passa-lhe o nosso número 😊',
};
export function reviewThanksMessage(lang: string | null | undefined, firstName: string): string {
  const key = lang && lang in REVIEW_THANKS_MSG ? lang : 'en';
  return REVIEW_THANKS_MSG[key].replace('{{1}}', firstName);
}

/** "Not yet" / "still waiting" to the refund check-in, in the languages Will
 *  speaks. Narrow: the positive case is handled by saysRefundLanded. */
const NOT_YET = /\b(?:not yet|no(?:pe|t)?(?: not)?(?: yet)?|still (?:waiting|nothing)|nothing yet|haven'?t|hasn'?t|didn'?t|no sign|waiting)\b|noch nicht|nein|noch nichts|まだ|いいえ|まだです|todav[íi]a no|a[úu]n no|pas encore|non|non ancora|ainda n[ãa]o/i;
export function saysRefundNotYet(text: string): boolean {
  const t = (text || '').trim();
  return t.length > 0 && t.length <= 120 && NOT_YET.test(t);
}

/** A review on Google matched to a customer we asked: same first name
 *  (case-insensitive, first token), dated on or after the ask. */
export function matchReviewToAsk(
  reviews: { reviewer: string; createTime?: string | null }[],
  candidates: { customerId: string; firstName: string; askedAt: string }[],
): { customerId: string; reviewer: string }[] {
  const norm = (n: string) => n.trim().toLowerCase().split(/\s+/)[0] ?? '';
  const out: { customerId: string; reviewer: string }[] = [];
  const used = new Set<string>();
  for (const r of reviews) {
    const first = norm(r.reviewer);
    if (!first || first.length < 2) continue;
    const when = r.createTime ? new Date(r.createTime).getTime() : NaN;
    const match = candidates.find((c) => !used.has(c.customerId) && norm(c.firstName) === first
      && (Number.isNaN(when) || when >= new Date(c.askedAt).getTime() - 24 * 3600 * 1000));
    if (match) { used.add(match.customerId); out.push({ customerId: match.customerId, reviewer: r.reviewer }); }
  }
  return out;
}


/** Will's reply to "not yet" on the check-in: one line, then the second
 *  check-in four days later. */
// Jo, 9 Nov: no promise to check in again (the second check-in is the only
// one, and after it nothing more goes out), so it is never a broken promise.
export const REFUND_NOT_YET_MSG: Record<string, string> = {
  en: 'No worries, it usually takes 2 to 4 weeks from lodgement 😊',
  de: 'Kein Problem, das dauert meistens 2 bis 4 Wochen ab der Einreichung 😊',
  ja: '大丈夫です。通常、申告から2〜4週間ほどかかります 😊',
  es: 'Tranquilo, suele tardar de 2 a 4 semanas desde la presentación 😊',
  fr: "Pas de souci, ça prend en général 2 à 4 semaines après le dépôt 😊",
  it: 'Nessun problema, di solito ci vogliono dalle 2 alle 4 settimane dalla presentazione 😊',
  pt: 'Sem problema, costuma demorar 2 a 4 semanas desde a entrega 😊',
};
export function refundNotYetMessage(lang: string | null | undefined): string {
  const key = lang && lang in REFUND_NOT_YET_MSG ? lang : 'en';
  return REFUND_NOT_YET_MSG[key];
}


// ── 3 Nov: when NOT to ask for a review ──────────────────────────────────────
// Export: an ask went out while a return was still open at the ATO and the
// customer owed tax on one year; another opener mentioned the customer's own
// earlier trouble ("after all that confusion with the bank details") and
// another claimed an outcome ("properly corrected"). The scheduler calls these
// before and after the model: a pure gate, and a clean-up of the opener.

export interface ReviewAskFacts {
  trigger: 'refund_received' | 'timer' | 'checkin' | 'manual';
  /** customerOwesTax(...) from followup-gate-30oct.ts (passed in: that module imports this one). */
  owesTax: boolean;
  /** The customer said the refund arrived (saysRefundLanded / saysYesToRefundCheckin). */
  refundLanded: boolean;
  refundSentAt?: string | null;
  outcome?: 'REFUND' | 'PAYABLE' | null;
}
export type ReviewAskGate = { action: 'ask' } | { action: 'skip' | 'defer'; reason: string };

export function reviewAskGate(f: ReviewAskFacts): ReviewAskGate {
  // Someone who owes the ATO is not in a thank-you mood, whatever else is true.
  if (f.owesTax || f.outcome === 'PAYABLE') return { action: 'skip', reason: 'the customer has tax payable: no review ask' };
  // The customer telling us the money arrived is the moment worth asking at.
  if (f.refundLanded || f.trigger === 'refund_received') return { action: 'ask' };
  // The timer fallback asks only when the outcome is known to be good: the
  // ATO has paid (refund sent), or the customer confirmed it. Otherwise the
  // return may still be open or amended, and an ask is premature.
  if (f.trigger === 'timer' || f.trigger === 'checkin') {
    if (f.refundSentAt) return { action: 'ask' };
    return { action: 'defer', reason: 'no ATO outcome yet: the refund has not been confirmed as received' };
  }
  return { action: 'ask' };
}

/** The model's one personal opening line, or null when it must be replaced by
 *  the default: it names the outcome, the customer's past problems or errors,
 *  a figure, a promise, or carries banned wording. */
const OPENER_BAD = /\b(?:issues?|problems?|confusion|confused|mistake|error|mix-?up|corrected|fixed|amend(?:ed|ment)?|sorted out|bank details|night\s*shift|complain|apolog|delay|wait(?:ed|ing)|outcome|result|owe[sd]?|payable|maximi[sz]|every dollar|guarantee)\b|\$|\d|[—–―]|tax agent|税理士|ATO/i;
export function cleanReviewOpener(opener: string | null | undefined): string | null {
  const o = (opener ?? '').replace(/\s+/g, ' ').trim();
  if (!o || o.length > 140) return null;
  if (OPENER_BAD.test(o)) return null;
  if ((o.match(/[!?]/g) ?? []).length > 1) return null;
  return o;
}
