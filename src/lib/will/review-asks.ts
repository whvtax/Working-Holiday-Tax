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
/** Fallback delay after lodgement when the customer never mentions the refund.
 *  11 Oct: 21 days, because the day-10 check-in ("has the refund landed?")
 *  now catches most customers at the right moment first. */
export const REVIEW_ASK_FALLBACK_DAYS = 21;
/** 11 Oct: the refund check-in, days after lodgement; second one 4 days later. */
export const REFUND_CHECKIN_DAYS = 10;
export const REFUND_CHECKIN_RETRY_DAYS = 4;
/** 11 Oct: one reminder this many days after an unanswered ask. */
export const REVIEW_REMIND_DAYS = 3;
/** The referral line is offered only within this many days of the ask. */
export const REFERRAL_WINDOW_DAYS = 10;

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
export const REFUND_CHECKIN_MSG: Record<string, string> = {
  en: 'Hi {{1}} 😊 Quick check: has your refund landed in your account yet?',
  de: 'Hi {{1}} 😊 Kurze Frage: ist deine Rückerstattung schon auf deinem Konto angekommen?',
  ja: 'こんにちは、{{1}}さん 😊 ひとつ確認です。還付金はもう口座に入りましたか？',
  es: 'Hola {{1}} 😊 Una pregunta rápida: ¿ya te llegó el reembolso a tu cuenta?',
  fr: 'Salut {{1}} 😊 Petite question : ton remboursement est-il déjà arrivé sur ton compte ?',
  it: 'Ciao {{1}} 😊 Una domanda veloce: il rimborso è già arrivato sul tuo conto?',
  pt: 'Olá {{1}} 😊 Pergunta rápida: o reembolso já caiu na tua conta?',
};
export function refundCheckinMessage(lang: string | null | undefined, firstName: string): string {
  const key = lang && lang in REFUND_CHECKIN_MSG ? lang : 'en';
  return REFUND_CHECKIN_MSG[key].replace('{{1}}', firstName);
}
export function refundCheckinTemplateKey(lang: string | null | undefined): string {
  const key = lang && lang in REFUND_CHECKIN_MSG ? lang : 'en';
  return key === 'en' ? 'refund_checkin' : `refund_checkin_${key}`;
}

/** The one reminder, 3 days after an ask nobody answered. */
export const REVIEW_REMIND_MSG: Record<string, string> = {
  en: 'Hi {{1}}, no pressure at all, just in case it slipped by: a quick Google review takes 30 seconds and helps us a lot. {{2}}\n\nEither way, thanks again 😊',
  de: 'Hi {{1}}, kein Stress, nur falls es untergegangen ist: eine kurze Google-Bewertung dauert 30 Sekunden und hilft uns sehr. {{2}}\n\nSo oder so, nochmal danke 😊',
  ja: 'こんにちは、{{1}}さん。もし見逃していたらと思いご連絡です。Googleのレビューは30秒ほどで書けて、私たちにとって大きな助けになります。{{2}}\n\nいずれにしても、ありがとうございました 😊',
  es: 'Hola {{1}}, sin presión, por si se te pasó: una reseña rápida en Google tarda 30 segundos y nos ayuda mucho. {{2}}\n\nDe todos modos, gracias otra vez 😊',
  fr: 'Salut {{1}}, aucune pression, juste au cas où ça t\'aurait échappé : un avis Google prend 30 secondes et nous aide beaucoup. {{2}}\n\nDans tous les cas, encore merci 😊',
  it: 'Ciao {{1}}, nessuna pressione, solo nel caso ti fosse sfuggito: una recensione su Google richiede 30 secondi e ci aiuta molto. {{2}}\n\nIn ogni caso, grazie ancora 😊',
  pt: 'Olá {{1}}, sem pressão, só caso tenha passado despercebido: uma avaliação rápida no Google leva 30 segundos e ajuda-nos muito. {{2}}\n\nDe qualquer forma, obrigado mais uma vez 😊',
};
export function reviewRemindMessage(lang: string | null | undefined, firstName: string, link: string): string {
  const key = lang && lang in REVIEW_REMIND_MSG ? lang : 'en';
  return REVIEW_REMIND_MSG[key].replace('{{1}}', firstName).replace('{{2}}', link);
}
export function reviewRemindTemplateKey(lang: string | null | undefined): string {
  const key = lang && lang in REVIEW_REMIND_MSG ? lang : 'en';
  return key === 'en' ? 'review_remind' : `review_remind_${key}`;
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
export const REFUND_NOT_YET_MSG: Record<string, string> = {
  en: "No worries, it usually takes 2 to 4 weeks from lodgement. I'll check in again in a few days 😊",
  de: 'Kein Problem, es dauert normalerweise 2 bis 4 Wochen ab Einreichung. Ich melde mich in ein paar Tagen nochmal 😊',
  ja: '大丈夫です。通常、申告から2〜4週間ほどかかります。数日後にまたご連絡しますね 😊',
  es: 'Tranquilo, normalmente tarda de 2 a 4 semanas desde la presentación. Te vuelvo a preguntar en unos días 😊',
  fr: "Pas de souci, ça prend en général 2 à 4 semaines après le dépôt. Je reviens vers toi dans quelques jours 😊",
  it: 'Nessun problema, di solito ci vogliono 2-4 settimane dalla presentazione. Ti riscrivo tra qualche giorno 😊',
  pt: 'Sem problema, normalmente demora 2 a 4 semanas desde a entrega. Volto a perguntar daqui a uns dias 😊',
};
export function refundNotYetMessage(lang: string | null | undefined): string {
  const key = lang && lang in REFUND_NOT_YET_MSG ? lang : 'en';
  return REFUND_NOT_YET_MSG[key];
}
