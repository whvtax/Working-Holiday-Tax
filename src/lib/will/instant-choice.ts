// ============================================================
// THE CHOICE IS THE "YES": the price message goes out at once (11 Oct).
//
// Full audit, decision 3: Rochi wrote "TFN" and waited 2.5 hours; Jack wrote
// "Sounds great" and waited two hours. Both were lost in the gap. When the
// customer's message is a clear, short answer to the opening question (or a
// plain yes to the price), nothing needs the model: the approved price
// message for that track is the reply, sent from the code without the
// Autopilot pause. Anything with a question in it, anything long, anything
// about a return already lodged, goes through Will as before.
// ============================================================
import { APPROVED } from './approved-messages';
import { ALREADY_LODGED_RE as LODGED_RE_SHARED } from './already-checked';

export type Track = 'TFN' | 'TFN_ABN';

const ABN_RE = /\babn\b|\buber\b|deliver(?:y|oo)|door\s?dash|menulog|contract(?:or|ing)?\b|sole\s?trader|self[- ]?employed|freelanc|invoic|\bboth\b|option\s?2\b|\b2nd\b|second/i;
// 16 Oct (Jo, Minami +61 478): German and Japanese say it their own way.
const NO_ABN_ML_RE = /kein(?:e|en)?\s+abn|ohne\s+abn|nur\s+(?:mit\s+)?(?:der\s+)?tfn|nur\s+angestellt|abn\s*(?:は|が)?\s*(?:ありません|ない|なし|持っていません)|tfn\s*(?:のみ|だけ)/i;
const ABN_ML_RE = /abn\s*(?:も|あり|を持って)|ウーバー|デリバリー|配達|個人事業|selbstst[äa]ndig|lieferdienst|freiberuf/i;
const TFN_ML_RE = /雇用|従業員|給与明細|angestellt|arbeitgeber|lohnabrechnung/i;
const NO_ABN_RE = /\b(?:no|not|don'?t have|without|never had|didn'?t have)\s+(?:an?\s+)?abn\b|only\s+(?:worked\s+)?(?:on\s+)?(?:a\s+)?tfn|just\s+(?:a\s+)?tfn|tfn\s+only|option\s?1\b|\b1st\b|\bfirst\b|employers?\s+only|only\s+employers?/i;
/** Income that is not wages from an employer. Next to a TFN answer it means
 *  the customer has more than one kind of income and the track is not clear. */
/** Unmistakably ABN work: no need to ask how it was paid. */
/**
 * Where the customer stands on an ABN, read from their messages NEWEST FIRST
 * (Jo, 24 Oct, +353 85: "TFN only I think.. I worked an agency job ... not
 * sure if that's an ABN?" got the $385 TFN + ABN price because the word
 * "ABN" was in it, and her "I never worked under an ABN. Just TFN" two
 * minutes later got nothing, because the code still saw the old "ABN?" and
 * produced the same $385 message again, which the duplicate guard dropped).
 *  - 'no_abn': they ruled it out ("never worked under an ABN", "just TFN").
 *  - 'unsure': they ask or are not sure whether it was an ABN.
 *  - 'abn':    they clearly had ABN income.
 *  - null:     nothing said about it.
 * The latest message that says anything decides: a correction wins.
 */
export type AbnStance = 'abn' | 'no_abn' | 'unsure';
const NEVER_ABN_RE = /\b(?:never|didn'?t|did not|haven'?t|have not|wasn'?t|was not|weren'?t)\s+(?:\w+\s+){0,3}(?:under|on|with|through|via|using|an?|had|have|got|get|registered)\s+(?:an?\s+)?abn\b|\babn\s*[:\-]?\s*(?:no|none|nope)\b/i;
const UNSURE_ABN_RE = /\b(?:not sure|unsure|no idea|don'?t know|do not know|i think|maybe|perhaps|wondering|whether|if (?:that'?s|it'?s|it was|that was|this is))\b/i;
export function abnStance(texts: string[]): AbnStance | null {
  for (let i = texts.length - 1; i >= 0; i--) {
    const t = texts[i] ?? '';
    if (NEVER_ABN_RE.test(t) || NO_ABN_ML_RE.test(t)) return 'no_abn';
    // Only the sentence that names the ABN counts: "I had ABN income (A$4,500).
    // How do I log in to myGov?" is a clear ABN with an unrelated question.
    const abnSentences = (t.match(/[^.!?。！？\n]*(?:[.!?。！？]+|$)/g) ?? [])
      .filter((x) => /\babn\b/i.test(x) || ABN_ML_RE.test(x));
    if (abnSentences.some((x) => /[?？]/.test(x) || UNSURE_ABN_RE.test(x))) return 'unsure';
    if (NO_ABN_RE.test(t) && !/\b(?:option\s?1|1st|first)\b/i.test(t)) return 'no_abn';
    if (CLEAR_ABN_RE.test(t) || ABN_ML_RE.test(t)) return 'abn';
  }
  return null;
}

export const CLEAR_ABN_RE = /\babn\b|\buber\b|deliver(?:y|oo)|door\s?dash|menulog|sole\s?trader|self[- ]?employed/i;
export const OTHER_INCOME_RE = /\babn\b|\buber\b|deliver(?:y|oo)|door\s?dash|menulog|contract(?:or|ing)\b|sole\s?trader|self[- ]?employed|freelanc|\bugc\b|content (?:creat|work)|influencer|brand (?:deal|work|collab)|sponsor|on the side|side (?:job|gig|hustle|income|work)|cash (?:job|work|in hand)|online (?:work|job|income)|invoic|selbstst[äa]ndig|freiberuf|nebenjob|副業|フリーランス/i;
const TFN_RE = /\btfn\b|employers?\b|employee|payslips?|cafe|hospitality|farm|casual/i;
const ALREADY_LODGED_RE = /already\s+(?:lodged|filed|submitted|done)|lodged\s+it|filed\s+it|review\b|check\s+my\s+return/i;
const YES_RE = /^(?:(?:yes|yep|yeah|yup|sure|ok(?:ay)?|perfect|great|deal)(?:,?\s*(?:please|thanks|thank you|sure|let'?s do it|go ahead))?|sounds? (?:good|great)|let'?s (?:do it|go)|go ahead|please|i'?m in|i'?d like to (?:go ahead|proceed)|ja|ja gerne|sí|si|oui|sì|sim|はい|お願いします|よろしくお願いします)[\s!.😊👍]*$/i;
/** A TFN number, an ABN number or a phone number in the message: they are
 *  giving us data, not choosing a track (Elsa posted her TFN and got an
 *  invoice sixty seconds later). */
const CARRIES_A_NUMBER_RE = /\b(?:tfn|abn)\s*(?:number|no\.?|#|is|:)|\d{3}\s?\d{3}\s?\d{3}/i;

/** The track this short message picks, or null when it is not a clear
 *  choice. `lastWillLine` is what Will said last, so a bare "yes" counts only
 *  when he just quoted a single price (then it means that one). */
export function detectChoice(text: string, lastWillLine: string | null | undefined): Track | null {
  const t = (text ?? '').trim();
  if (!t || t.length > 90) return null;
  if (/[?？]/.test(t)) return null;
  if (ALREADY_LODGED_RE.test(t) || LODGED_RE_SHARED.test(t)) return null;
  if (CARRIES_A_NUMBER_RE.test(t)) return null;
  if (YES_RE.test(t)) {
    const w = lastWillLine ?? '';
    const abn = /\$\s?(?:385|495)\b/.test(w), tfn = /\$\s?(?:220|330)\b/.test(w);
    if (abn && !tfn) return 'TFN_ABN';
    if (tfn && !abn) return 'TFN';
    return null;
  }
  // Jo, 22 Oct (Sydney, +1 608): "Only on TFN however I did do some
  // freelance UGC work on the side as well" got the TFN price message from
  // the code: "only on TFN" matched first and the freelance work was never
  // read. Any other income in the same message (freelance, UGC, side work,
  // an ABN, cash, online work) makes it NOT a clear choice: Will asks how
  // that money was paid before any price goes out (playbook, OTHER INCOME).
  // "no ABN" / "kein ABN" / "ABNはない" names the ABN only to rule it out.
  const withoutNegations = t.replace(new RegExp(NO_ABN_RE.source, 'gi'), ' ').replace(new RegExp(NO_ABN_ML_RE.source, 'gi'), ' ');
  const other = OTHER_INCOME_RE.test(withoutNegations) || ABN_ML_RE.test(withoutNegations);
  const noAbn = NO_ABN_RE.test(t) || NO_ABN_ML_RE.test(t);
  if (other && noAbn) return null;                          // "only TFN, but some freelance work": ask
  if (noAbn) return 'TFN';
  if (CLEAR_ABN_RE.test(t) || ABN_ML_RE.test(t)) return 'TFN_ABN'; // an ABN, Uber, delivery: clear
  if (other) return null;                                   // freelance / UGC / side work: ask how they were paid
  if (ABN_RE.test(t)) return 'TFN_ABN';
  if (TFN_RE.test(t) || TFN_ML_RE.test(t)) return 'TFN';
  return null;
}

/** A direct question about the price: the two prices are the right answer. */
export const PRICE_ASK_RE = /how much|what(?:'s| is| does it) (?:the )?(?:cost|price|fee)|\bcost\b|\bprice\b|\bfees?\b|\bcharge\b|how (?:do|can) i pay|payment details|bank details|wie viel|was kostet|kosten|preis|cu[áa]nto|precio|combien|prix|quanto|prezzo|いくら|料金|費用|多少钱|价格|价钱|收费|费用|bao nhi[eê]u ti[eề]n|gi[aá] bao nhi[eê]u|ph[ií] (?:là )?bao nhi[eê]u|chi ph[ií]/i;

/** The end of the price message (bank details, the guarantee where it
 *  applies, the screenshot line) in the customer's language, for a reply that
 *  quoted the fee but left the payment details out (Jo, 23 Oct, Taiki: "the
 *  total cost?" got a price and "any questions?", nothing to pay with).
 *  null for a language with no approved wording. */
export function priceTail(lang: string | null | undefined, track: Track, foreign = false): string | null {
  const l = (lang ?? 'en').toLowerCase().slice(0, 2);
  if (l === 'de' || l === 'ja') {
    const L = PRICE_ML[l];
    return track === 'TFN' && !foreign ? `${BANK}\n\n${L.guarantee}\n\n${L.screenshot}` : `${BANK}\n\n${L.screenshot}`;
  }
  if (l !== 'en') return null;
  const msg = priceMessageFor(track, foreign);
  const at = msg.indexOf('BSB:');
  return at >= 0 ? msg.slice(at) : null;
}

export function priceMessageFor(track: Track, foreign = false): string {
  if (foreign) return track === 'TFN_ABN' ? APPROVED.price_tfn_abn_foreign : APPROVED.price_tfn_foreign;
  return track === 'TFN_ABN' ? APPROVED.price_tfn_abn : APPROVED.price_tfn;
}

/** Jo, 11 Oct: when the very FIRST message already says the track ("I worked
 *  for employers on a TFN"), Will still opens like a person: the greeting,
 *  then "looks like the TFN option is the right fit for you", then the rest
 *  of the price message. "Got it, so that's..." is for a reply to the
 *  opening question, not for a first contact. */
export function firstContactPriceMessage(track: Track, firstName: string | null | undefined, foreign = false): string {
  const name = (firstName ?? '').trim();
  const greeting = name ? `Hey ${name}! 😊 Happy to help.` : 'Hey! 😊 Happy to help.';
  const base = priceMessageFor(track, foreign);
  const label = track === 'TFN_ABN' ? 'TFN + ABN' : 'TFN';
  const amount = foreign ? (track === 'TFN_ABN' ? 495 : 330) : (track === 'TFN_ABN' ? 385 : 220);
  const fit = `Looks like the ${label} option${foreign ? ' with foreign income' : ''} is the right fit for you: $${amount}.`;
  const rest = base.replace(/^Got it, so that's the TFN(?: \+ ABN)? option(?: with foreign income)?, \$(?:220|385|330|495)\./, fit);
  return `${greeting}\n\n${rest}`;
}


// ============================================================
// THE PRICE MESSAGE IN GERMAN AND JAPANESE (Jo, 16 Oct)
//
// Minami wrote in Japanese "I worked employed on TFN" and got "I've passed
// this to the team", because the instant price message existed only in
// English. These are the same two messages, same order, same guarantee in
// its exact meaning, same bank details. Foreign income and the "already
// checked" clause stay English-only for now: those go through Will.
// ============================================================
type PriceLang = 'de' | 'ja';
const BANK = 'BSB: 062692\nAccount: 81049952';
const PRICE_ML: Record<PriceLang, { tfn: string; abn: string; guarantee: string; screenshot: string; gotIt: (label: string, amount: number) => string; fit: (label: string, amount: number) => string; hello: (name: string) => string; tfnBody: string; abnBody: string }> = {
  de: {
    tfn: 'TFN', abn: 'TFN + ABN',
    tfnBody: 'Wir prüfen deine steuerliche Ansässigkeit, Medicare und deine Abzüge und erstellen dann deine Steuererklärung und reichen sie ein, damit du nichts verpasst, was dir zusteht.',
    abnBody: 'Wir prüfen deine steuerliche Ansässigkeit, Medicare und deine Abzüge, erstellen eine Aufstellung für deine ABN-Einnahmen und -Ausgaben und reichen dann deine Steuererklärung ein, damit du nichts verpasst, was dir zusteht.',
    guarantee: 'Wenn deine Steuerrückerstattung niedriger ist als unsere Gebühr, erstatten wir dir die Differenz. Gibt es keine Rückerstattung, fällt die volle Gebühr an.',
    screenshot: 'Schick mir einfach einen Screenshot, sobald du bezahlt hast, und wir legen los!',
    gotIt: (label, amount) => `Alles klar, also die ${label}-Option, $${amount}.`,
    fit: (label, amount) => `Die ${label}-Option passt wohl am besten zu dir: $${amount}.`,
    hello: (name) => (name ? `Hey ${name}! 😊 Gerne helfe ich dir.` : 'Hey! 😊 Gerne helfe ich dir.'),
  },
  ja: {
    tfn: 'TFNのみ', abn: 'TFN + ABN',
    tfnBody: '税務上の居住区分、メディケア、控除を確認したうえで、タックスリターンを作成・提出します。受け取れるものを見逃さないようにしっかり確認します。',
    abnBody: '税務上の居住区分、メディケア、控除を確認し、ABNの収入と経費の明細を作成したうえで、タックスリターンを作成・提出します。受け取れるものを見逃さないようにしっかり確認します。',
    guarantee: '還付金が当社の料金より少ない場合は、その差額を返金いたします。還付がない場合は、料金全額をいただきます。',
    screenshot: 'お支払い後、スクリーンショットを送っていただければすぐに始めます！',
    gotIt: (label, amount) => `承知しました。${label}のプランで、$${amount}です。`,
    fit: (label, amount) => `${label}のプランが合いそうです：$${amount}。`,
    hello: (name) => (name ? `こんにちは、${name}さん😊 ご連絡ありがとうございます。` : 'こんにちは😊 ご連絡ありがとうございます。'),
  },
};

/** The review of a return they already lodged (an amendment), in German or
 *  Japanese (Jo, 24 Oct, Chinami +81 90: "we'd be happy to help, but as it is
 *  a correction the fee is $220 for the review, no guarantee, whatever the
 *  result"). Same meaning as APPROVED.price_tfn_review. */
const REVIEW_ML: Record<PriceLang, (amount: number) => string> = {
  de: (amount) => `Da deine Steuererklärung schon eingereicht wurde, ist das eine Prüfung der bestehenden Erklärung und keine neue. Die Gebühr beträgt $${amount} für die Prüfung selbst und ist unabhängig vom Ergebnis gleich.`,
  ja: (amount) => `喜んでお手伝いいたします。すでに申告済みのため、今回は新規の申告ではなく、提出済みの申告内容の確認・修正となります。料金は確認作業に対して$${amount}で、結果にかかわらず同じです。`,
};
export function reviewMessageIn(lang: PriceLang, track: Track, firstName?: string | null): string {
  const L = PRICE_ML[lang];
  return `${L.hello((firstName ?? '').trim())}\n\n${REVIEW_ML[lang](track === 'TFN_ABN' ? 385 : 220)}\n\n${BANK}\n\n${L.screenshot}`;
}

export function hasPriceIn(lang: string | null | undefined): lang is PriceLang {
  return lang === 'de' || lang === 'ja';
}

/** The price message in German or Japanese; firstName set = first contact. */
export function priceMessageIn(lang: PriceLang, track: Track, firstContact: boolean, firstName?: string | null): string {
  const L = PRICE_ML[lang];
  const label = track === 'TFN_ABN' ? L.abn : L.tfn;
  const amount = track === 'TFN_ABN' ? 385 : 220;
  const body = track === 'TFN_ABN' ? L.abnBody : L.tfnBody;
  const lead = firstContact ? `${L.hello((firstName ?? '').trim())}\n\n${L.fit(label, amount)}` : L.gotIt(label, amount);
  // Jo, 21 Oct: no guarantee for a TFN + ABN return (abn-income.ts).
  return track === 'TFN_ABN'
    ? `${lead} ${body}\n\n${BANK}\n\n${L.screenshot}`
    : `${lead} ${body}\n\n${BANK}\n\n${L.guarantee}\n\n${L.screenshot}`;
}
