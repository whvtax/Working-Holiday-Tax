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
import { APPROVED_ES } from './approved-es';
import { APPROVED_FR } from './approved-fr';
import { APPROVED_IT } from './approved-it';
import { APPROVED_PT } from './approved-pt';
import { OPENING_MSG, withGreetingName } from './approved-messages';
import { ALREADY_LODGED_RE as LODGED_RE_SHARED } from './already-checked';
import { NO_ABN_RE as SHARED_NO_ABN_RE, NOT_SELF_EMPLOYED_RE } from './abn-income';

export type Track = 'TFN' | 'TFN_ABN';

// ============================================================
// myGov trouble next to a price answer (Jo, 29 Oct, "Tfn only, I'm doing this
// so late because I didn't know how to conect it to myGov app" got the bare
// price message and never the reassurance that myGov is not needed). When the
// customer mentions myGov / ATO access / logging in in the same breath as
// their track, the approved reassurance goes in front of the price message.
// Only the reassurance, never a myGov how-to (playbook, MYGOV / ATO ACCESS).
// ============================================================
export const MYGOV_TROUBLE_RE = /my\s?gov|\bato\s+(?:account|portal|login|online|app)|digital\s?id|(?:link|connect)\w*\s+(?:it\s+|my\s+|the\s+|your\s+)?(?:to\s+|with\s+)?(?:my\s+|the\s+|your\s+)?(?:ato|account|my\s?gov)|\blog\s?in\b|\blogin\b|\bsign\s?in\b|locked\s+out|マイガブ|ログイン|anmeld|verkn[üu]pf/i;

const MYGOV_REASSURANCE: Record<string, string> = {
  en: "No need to worry about myGov: you don't have to link anything or log in yourself. We handle everything directly with the ATO, and any refund goes straight into your Australian bank account.",
  de: 'Um myGov musst du dir keine Sorgen machen: Du musst nichts verknüpfen und dich nirgends selbst anmelden. Wir regeln alles direkt mit dem ATO, und eine mögliche Rückerstattung geht direkt auf dein australisches Bankkonto.',
  ja: 'myGovについてはご心配いりません。連携やログインはご自身で行う必要はなく、ATOとのやり取りはすべて私たちが直接行います。還付金がある場合は、オーストラリアの銀行口座に直接入金されます。',
  // 18 Nov (language review): the same line in every language, same meaning as the English.
  es: 'No te preocupes por myGov: no tienes que vincular nada ni iniciar sesión tú. Nosotros nos encargamos de todo directamente con la ATO, y cualquier devolución va directamente a tu cuenta bancaria australiana.',
  fr: "Pas d'inquiétude pour myGov : tu n'as rien à associer et tu n'as pas besoin de te connecter toi-même. Nous nous occupons de tout directement avec l'ATO, et un éventuel remboursement arrive directement sur ton compte bancaire australien.",
  it: "Non preoccuparti per myGov: non devi collegare nulla né accedere tu. Gestiamo tutto direttamente con l'ATO, e un eventuale rimborso arriva direttamente sul tuo conto bancario australiano.",
  pt: 'Não se preocupe com o myGov: você não precisa vincular nada nem entrar na sua conta. Nós tratamos de tudo diretamente com a ATO, e qualquer restituição vai direto para a sua conta bancária australiana.',
  zh: '不用担心 myGov：你不需要关联任何东西，也不需要自己登录。我们会直接和 ATO 处理所有事情，如果有退税，会直接打进你的澳洲银行账户。',
  vi: 'Bạn không cần lo về myGov: bạn không phải liên kết gì hay tự đăng nhập. Bên mình làm việc trực tiếp với ATO, và tiền hoàn thuế (nếu có) sẽ được chuyển thẳng vào tài khoản ngân hàng Úc của bạn.',
};

/** The price message with the myGov reassurance in front when the customer's
 *  latest messages mention a myGov / ATO access problem. Unchanged otherwise. */
export function withMygovReassurance(msg: string, customerTexts: string[], lang: string | null | undefined): string {
  if (!customerTexts.some((t) => MYGOV_TROUBLE_RE.test(t ?? ''))) return msg;
  const line = MYGOV_REASSURANCE[(lang ?? 'en').toLowerCase().slice(0, 2)];
  if (!line || msg.includes(line)) return msg;
  return `${line}\n\n${msg}`;
}

const ABN_RE = /\babn\b|\buber\b|deliver(?:y|oo)|door\s?dash|menulog|contract(?:or|ing)?\b|sole\s?trader|self[- ]?employed|freelanc|invoic|\bboth\b|option\s?2\b|\b2nd\b|second/i;
// 16 Oct (Jo, Minami +61 478): German and Japanese say it their own way.
const NO_ABN_ML_RE = /no\s+tengo\s+abn|sin\s+abn|solo\s+tfn|n'ai\s+pas\s+d'abn|sans\s+abn|seulement\s+tfn|non\s+ho\s+(?:un\s+)?abn|senza\s+abn|n[ãa]o\s+tenho\s+abn|sem\s+abn|s[óo]\s+tfn|kein(?:e|en)?\s+abn|ohne\s+abn|nur\s+(?:mit\s+)?(?:der\s+)?tfn|nur\s+angestellt|abn\s*(?:は|が)?\s*(?:ありません|ない|なし|持っていません)|tfn\s*(?:のみ|だけ)/i;
// 18 Nov (fr review): French says it its own way too (auto-entrepreneur, indépendant, micro-entreprise).
const ABN_ML_RE = /abn\s*(?:も|あり|を持って)|ウーバー|デリバリー|配達|個人事業|selbstst[äa]ndig|lieferdienst|freiberuf|auto[- ]?entrepreneu[rs]e?|micro[- ]?entrepr(?:ise|eneur)|ind[ée]pendante?s?\b/i;
const TFN_ML_RE = /雇用|従業員|給与明細|angestellt|arbeitgeber|lohnabrechnung/i;
const NO_ABN_LOCAL_RE = /\b(?:no|not|don'?t have|without|never had|didn'?t have)\s+(?:an?\s+)?abn\b|only\s+(?:worked\s+)?(?:on\s+)?(?:a\s+)?tfn|just\s+(?:a\s+)?tfn|tfn\s+only|option\s?1\b|\b1st\b|\bfirst\b|employers?\s+only|only\s+employers?/i;
// 3 Nov: the shared negation handling ("only an employee", "not self-employed", "no ABN")
// so such a customer is never quoted the ABN price.
const NO_ABN_RE = new RegExp(`${NO_ABN_LOCAL_RE.source}|${SHARED_NO_ABN_RE.source}|${NOT_SELF_EMPLOYED_RE.source}`, 'i');
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
/** "don't think I have an ABN", "not registered for an ABN": a ruling-out. */
const NEGATED_ABN_SRC = /\b(?:don'?t|do not|didn'?t|did not|not|never|without|isn'?t|wasn'?t|am not|i'?m not)\b[^.!?]{0,40}\babn\b/.source;
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
    // The review of a lodged return quotes $330 / $440 (Jo, 30 Oct): a yes to that is not a choice of track.
    if (/for the review itself|確認作業に対して|für die Prüfung selbst|por la revisión en sí|pour l'examen lui-même|per la revisione in sé|pela revisão em si|审核费用|phí cho việc xem lại|xem lại hồ sơ thuế bạn đã nộp/i.test(w)) return null;
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
  const withoutNegations = t.replace(new RegExp(NO_ABN_RE.source, 'gi'), ' ').replace(new RegExp(NO_ABN_ML_RE.source, 'gi'), ' ').replace(new RegExp(NEGATED_ABN_SRC, 'gi'), ' ');
  const other = OTHER_INCOME_RE.test(withoutNegations) || ABN_ML_RE.test(withoutNegations);
  // 18 Nov (review): "never had an ABN", "I don't think I have an ABN" are a ruling-out too.
  // 18 Nov (review): "not sure if it was an ABN", "maybe ABN" are not a choice: ask.
  // This runs before the negations, so "I'm not sure I had an ABN" is not read as a no.
  if (/\babn\b/i.test(t) && UNSURE_ABN_RE.test(t)) return null;
  const negatedAbn = new RegExp(NEGATED_ABN_SRC, 'i').test(t);
  const noAbn = NO_ABN_RE.test(t) || NO_ABN_ML_RE.test(t) || NEVER_ABN_RE.test(t) || negatedAbn;
  if (other && noAbn) return null;                          // "only TFN, but some freelance work": ask
  if (noAbn) return 'TFN';
  if (CLEAR_ABN_RE.test(t) || ABN_ML_RE.test(t)) return 'TFN_ABN'; // an ABN, Uber, delivery: clear
  if (other) return null;                                   // freelance / UGC / side work: ask how they were paid
  // 18 Nov (review): "second job", "both employers", "contract at a cafe" next to
  // employer words are employee work, not an ABN: ask rather than guess the $385 track.
  if (ABN_RE.test(t) && (TFN_RE.test(t) || TFN_ML_RE.test(t))) return null;
  if (ABN_RE.test(t)) return 'TFN_ABN';
  if (TFN_RE.test(t) || TFN_ML_RE.test(t)) return 'TFN';
  return null;
}

/** A direct question about the price: the two prices are the right answer. */
export const PRICE_ASK_RE = /how much|what(?:'s| is| does it) (?:the )?(?:cost|price|fee)|\bcost\b|\bprice\b|\bfees?\b|\bcharge\b|how (?:do|can) i pay|payment details|bank details|wie viel|was kostet|kosten|preis|cu[áa]nto|precio|combien|prix|quanto|prezzo|いくら|料金|費用|多少钱|价格|价钱|收费|费用|bao nhi[eê]u ti[eề]n|gi[aá] bao nhi[eê]u|ph[ií] (?:là )?bao nhi[eê]u|chi ph[ií] (?:là )?bao nhi[eê]u/i;
// 18 Nov (vi review): "chi phí" alone means any cost or expense ("chi phí đi lại"), not our price.

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
/** The greeting line of the approved opening in this language, with the name when there is one. */
function openingGreeting(lang: PriceLang, name: string): string {
  const first = OPENING_MSG[lang].split('\n')[0];
  return withGreetingName(first, name);
}
const BANK = 'BSB: 062692\nAccount: 81049952';
const PRICE_ML: Record<PriceLang, { tfn: string; abn: string; guarantee: string; screenshot: string; gotIt: (label: string, amount: number) => string; fit: (label: string, amount: number) => string; hello: (name: string) => string; tfnBody: string; abnBody: string }> = {
  de: {
    tfn: 'TFN', abn: 'TFN + ABN',
    tfnBody: 'Wir prüfen deine steuerliche Ansässigkeit, Medicare und deine Abzüge und erstellen dann deine Steuererklärung und reichen sie ein, damit du nichts verpasst, was dir zusteht.',
    abnBody: 'Wir prüfen deine steuerliche Ansässigkeit, Medicare und deine Abzüge, erstellen eine Aufstellung für deine ABN-Einnahmen und -Ausgaben, dann erstellen wir deine Steuererklärung und reichen sie ein, damit du nichts verpasst, was dir zusteht.',
    guarantee: 'Wenn deine Steuerrückerstattung niedriger ist als unsere Gebühr, erstatten wir dir die Differenz. Gibt es keine Rückerstattung, fällt unsere volle Gebühr an.',
    screenshot: 'Schick uns einfach einen Screenshot, sobald du bezahlt hast, und wir legen los!',
    gotIt: (label, amount) => `Alles klar, also die ${label}-Option, $${amount}.`,
    fit: (label, amount) => `Die ${label}-Option passt wohl am besten zu dir: $${amount}.`,
    // 18 Nov (review): the greeting line of the approved opening, so the customer sees one greeting.
    hello: (name) => openingGreeting('de', name),
  },
  ja: {
    tfn: 'TFNのみ', abn: 'TFN + ABN',
    tfnBody: '税務上の居住区分、Medicare、控除を確認したうえで、タックスリターンを作成・提出します。受け取れるものを見逃さないようにしっかり確認します。',
    abnBody: '税務上の居住区分、Medicare、控除を確認し、ABNの収入と経費の明細を作成したうえで、タックスリターンを作成・提出します。受け取れるものを見逃さないようにしっかり確認します。',
    guarantee: '還付金が当社の料金より少ない場合は、その差額を返金いたします。還付がない場合は、料金の全額をご負担いただきます。',
    screenshot: 'お支払い後、スクリーンショットを送っていただければ作業を始めます！',
    gotIt: (label, amount) => `承知しました。${label}のプランで、$${amount}です。`,
    fit: (label, amount) => `${label}のプランが合いそうです。料金は$${amount}です。`,
    hello: (name) => openingGreeting('ja', name),
  },
};

/** The review of a return they already lodged (an amendment), in German or
 *  Japanese (Jo, 24 Oct, Chinami +81 90: "we'd be happy to help, but as it is
 *  a correction the fee is $220 for the review, no guarantee, whatever the
 *  result"). Same meaning as APPROVED.price_tfn_review. */
// 18 Nov (language review, Jo: every language says what the English says): the opening line,
// "(GST included)" on $440 and "also covers lodging the amended return, if one is needed" on $330.
const REVIEW_ML: Record<PriceLang, (amount: number) => string> = {
  de: (amount) => `Kein Problem, wir können auch eine bereits eingereichte Steuererklärung prüfen.\n\nDa deine Steuererklärung schon eingereicht wurde, ist das eine Prüfung der bestehenden Erklärung und keine neue. Die Gebühr beträgt $${amount} für die Prüfung selbst${amount === 440 ? ' (inkl. GST)' : ''} und ist unabhängig vom Ergebnis gleich.${amount === 330 ? ' Sie deckt auch die Einreichung der korrigierten Steuererklärung ab, falls eine nötig ist.' : ''}`,
  ja: (amount) => `すでに提出済みのタックスリターンの確認も承ります。\n\nすでに提出済みのため、今回は新しいタックスリターンではなく、既存のタックスリターンの確認となります。料金は確認作業に対して$${amount}${amount === 440 ? '（GST込み）' : ''}で、結果にかかわらず同じです。${amount === 330 ? '必要な場合は、修正したタックスリターンの提出も含まれます。' : ''}`,
};
export function reviewMessageIn(lang: PriceLang, firstName?: string | null, track: Track = 'TFN'): string {
  const L = PRICE_ML[lang];
  return `${L.hello((firstName ?? '').trim())}\n\n${REVIEW_ML[lang](track === 'TFN_ABN' ? 440 : 330)}\n\n${BANK}\n\n${L.screenshot}`;
}

// 18 Nov (Jo): Spanish, French, Italian and Portuguese use the approved
// wording in approved-es/fr/it/pt.ts (price and guarantee in one message, bank
// details and screenshot line included). Only the reply to a track choice is
// covered here: a first contact needs a greeting, so it goes to the model.
const APPROVED_PRICE_BY_LANG: Record<'es' | 'fr' | 'it' | 'pt', { price_tfn: string; price_tfn_abn: string }> = {
  es: APPROVED_ES, fr: APPROVED_FR, it: APPROVED_IT, pt: APPROVED_PT,
};

/** The approved price message for a track in es, fr, it or pt; null for any
 *  other language, for a first contact, or when the customer is not at a clear
 *  choice (callers handle foreign income and "already checked" first). */
export function approvedPriceIn(lang: string | null | undefined, track: Track, firstContact: boolean): string | null {
  if (firstContact) return null;
  const l = (lang ?? '').toLowerCase().slice(0, 2);
  if (!(l in APPROVED_PRICE_BY_LANG)) return null;
  const set = APPROVED_PRICE_BY_LANG[l as 'es' | 'fr' | 'it' | 'pt'];
  return track === 'TFN_ABN' ? set.price_tfn_abn : set.price_tfn;
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
