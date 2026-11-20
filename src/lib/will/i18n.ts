// ============================================================
// Lightweight language handling for the few messages Will sends
// WITHOUT the model (scheduler events like "questionnaire received").
// The live conversational path already replies natively via the model;
// this covers the deterministic auto-messages for the main markets.
// English is always a safe fallback for a language we do not know.
//
// 18 Nov (decision 018): every fixed text exists in all nine languages, for
// both brands. The non-English wording comes from the translators' files
// (docs/engineering/templates-i18n/<lang>.json), copied verbatim into
// template-translations.generated.ts; English stays here, locked by Jo.
// ============================================================
import { TEMPLATE_TRANSLATIONS, type TemplateTranslationKey } from './template-translations.generated';
import { fillNameSlot } from './text-normalize';

export type Lang = 'en' | 'de' | 'ja' | 'es' | 'fr' | 'it' | 'pt' | 'zh' | 'vi';
/** The nine supported codes as a runtime list. Same set as `Lang`. */
export const LANGS: readonly Lang[] = ['en', 'de', 'ja', 'es', 'fr', 'it', 'pt', 'zh', 'vi'];

export function isLang(v: unknown): v is Lang {
  return typeof v === 'string' && (LANGS as readonly string[]).includes(v);
}

/** The supported language for a stored code ('pt_BR' is 'pt'), or null when it is not one of the nine. */
export function supportedLang(lang?: string | null): Lang | null {
  const k = (lang ?? '').trim().toLowerCase().slice(0, 2);
  return isLang(k) ? k : null;
}

/** The table key for this customer: their language, English only for an unknown one. */
export function langOf(lang?: string | null): Lang {
  return supportedLang(lang) ?? 'en';
}

/** A fixed text in all nine languages: English from the code, the rest from the translators. */
export function nineLanguages(key: TemplateTranslationKey, en: string): Record<Lang, string> {
  return { en, ...TEMPLATE_TRANSLATIONS[key] };
}

/** For the functions that answer null rather than English for a language outside the nine
 *  (Korean, Thai...): the text, English for no language at all, null otherwise. */
function ownOrNull(table: Record<Lang, string>, lang?: string | null): string | null {
  if (!lang) return table.en;
  const l = supportedLang(lang);
  return l ? table[l] : null;
}

/** Jo, 18 Nov (decision 018): a link to one of our pages points at the customer's own language
 *  where that page exists. The WHT form (/start) and its residency step (/y8vwp4bf7) exist under
 *  every locale prefix (config/form-paths.js, decision 017); rebrandText maps them to the
 *  student brand's localized form for Mia. English keeps the English link. */
export function localizeOwnLinks(text: string, lang?: string | null): string {
  const l = supportedLang(lang);
  if (!l || l === 'en') return text;
  return text.replace(/https:\/\/workingholidaytax\.com\.au\/(start|y8vwp4bf7)(?![\w/-])/g, `https://workingholidaytax.com.au/${l}/$1`);
}
/** A message that is no longer sent or was removed by Jo (18 Nov): kept in its old languages for
 *  history and old queued jobs, never extended to new ones (decision 018). */
export type LegacyTable = { en: string } & Partial<Record<Lang, string>>;
function legacyPick(table: LegacyTable, lang?: string | null): string {
  return table[langOf(lang)] ?? table.en;
}

/** A nine-language table with each language's own links (localizeOwnLinks). */
function withOwnLinks(table: Record<Lang, string>): Record<Lang, string> {
  return Object.fromEntries(LANGS.map((l) => [l, localizeOwnLinks(table[l], l)])) as Record<Lang, string>;
}

// Distinctive keyword lists per language, English included. English used to be
// undetectable (no list), which is why a chat that had drifted to the wrong
// language could never be pulled back: an English message returned "unknown" and
// left the stale wrong language in place. Now English is a first-class signal so
// a real English message can reclaim the conversation.
// The lists were thin for the Latin languages, so a normal Spanish, Portuguese
// or Italian opening message scored 0 or 1 and the customer stayed lang=null:
// every deterministic message they later received (questionnaire confirmation,
// ABN questions, review request, the "we check that in the review" answer) went
// out in English (audit, 4 Sep). These add the words those messages are
// actually made of. Accented forms are matched with lookarounds, not \b, which
// is ASCII-only in JavaScript and never fires next to á, ç, ê or ñ.
const W = (words: string) => new RegExp(`(?<![A-Za-zÀ-ÿ])(?:${words})(?![A-Za-zÀ-ÿ])`, 'gi');
const KEYWORDS: Record<Exclude<Lang, 'ja' | 'zh' | 'vi'>, RegExp> = {
  en: /\b(the|and|you|your|you're|youre|i'?m|i'?ve|don'?t|doesn'?t|can'?t|won'?t|isn'?t|please|thanks|thank|hello|hey|yeah|will|would|should|what|when|where|why|how|have|has|had|my|ask|friend|need|help|about|okay)\b/gi,
  de: W("und|nicht|ich|mich|mir|dein\\w*|mein\\w*|danke|guten|hallo|servus|kein\\w*|bitte|sehr|gerne|für|ist|sind|habe|hab|haben|kann|können|möchte|würde|wie|was|wann|wo|warum|über|während|steuer\\w*|rückerstattung|frage"),
  es: W("hola|buenas|gracias|por favor|usted|ustedes|para|pero|como|cómo|muy|reembolso|impuesto\\w*|donde|dónde|cuando|cuándo|que|qué|quiero|necesito|tengo|puedo|hacer|mi|una|los|las|del|declaración|devolución|pregunta"),
  fr: W("bonjour|salut|merci|vous|tu|avec|pour|oui|non|remboursement|impôt\\w*|bonsoir|s'il vous plaît|je|j'ai|est|sont|comment|quand|où|pourquoi|mon|ma|une|des|déclaration|question|voudrais|besoin"),
  it: W("ciao|buongiorno|grazie|prego|sono|molto|rimborso|imposta|tasse|dove|perche|perché|come|quando|vorrei|ho|posso|mio|mia|una|dei|dichiarazione|domanda|bisogno"),
  pt: W("ola|olá|bom dia|obrigad\\w*|voce|você|nao|não|imposto\\w*|reembolso|por favor|onde|porque|porquê|como|quando|quero|preciso|tenho|posso|meu|minha|uma|dos|declaração|pergunta|gostaria"),
};

function countMatches(re: RegExp, t: string): number {
  const m = t.match(re);
  return m ? m.length : 0;
}

/**
 * Best-effort language detection from a customer message.
 *
 * Returns the most likely language AND whether the read is CONFIDENT. Confidence
 * is the whole point: a single stray foreign word ("dove", "para", "sono") must
 * never be enough to claim, or switch, the conversation language. Only a clear
 * signal (Japanese script, or at least two distinctive keyword hits with a lead
 * over every other language) is confident. The caller only ever acts on a
 * confident read, so an ambiguous message leaves the established language alone.
 */
/** Chinese (Han with no kana) or Vietnamese: languages Mia speaks on the
 *  student line but that have no fixed wording and no phrase rules in the
 *  guard yet. Used to keep English fixed texts out of those chats and to hold
 *  the reply for approval (final review, 27 Oct). */
export function unsupportedScript(text: string): 'zh' | 'vi' | null {
  const t = text || '';
  if (/[\u3040-\u30ff]/.test(t)) return null;
  if (/[\u3400-\u9fff]/.test(t)) return 'zh';
  if (/[ăâđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹĂÂĐƠƯ]/.test(t)) return 'vi';
  // Vietnamese without the marks above, and words that only Vietnamese uses
  // (audit F-05). The lookarounds use letters of any script, so a word inside
  // a longer word does not count.
  if (/(?<!\p{L})(?:không|tôi|bạn|muốn|cảm ơn|thuế|hỏi|và|khong|thue|muon|cam on)(?!\p{L})/iu.test(t)) return 'vi';
  return null;
}

export function detectLanguage(text: string): { lang: Lang | null; confident: boolean; enoughToSet?: boolean } {
  const t = (text || '').trim();
  if (!t) return { lang: null, confident: false };
  if (/[぀-ゟ゠-ヿ]/.test(t)) return { lang: 'ja', confident: true, enoughToSet: true }; // hiragana/katakana
  // 18 Nov (decision 018): Chinese and Vietnamese are full languages now, with every fixed text.
  // Kanji alone may still be Japanese: resolveLanguage and the live path keep a Japanese chat
  // Japanese when a message has no kana.
  const script = unsupportedScript(t);
  if (script) return { lang: script, confident: true, enoughToSet: true };

  const scores = (Object.keys(KEYWORDS) as Exclude<Lang, 'ja' | 'zh' | 'vi'>[])
    .map((lang) => [lang, countMatches(KEYWORDS[lang], t)] as [Lang, number])
    .sort((a, b) => b[1] - a[1]);

  const [topLang, topScore] = scores[0];
  const runnerUp = scores[1]?.[1] ?? 0;
  if (topScore === 0) return { lang: null, confident: false };

  // A CLEAR non-English signal counts on its own. The English list is far
  // longer than every other (it has to be, to reclaim a chat), so a message
  // like "Ola, quero saber o preco" scored 1 for Portuguese and 0 for English
  // and stayed unconfident: the customer was never given a language, and every
  // deterministic message they later received went out in English (audit,
  // 4 Sep). One distinctive foreign hit with nothing competing is a real
  // signal; English still needs two, so a stray "ok" or "thanks" inside a
  // German conversation cannot flip it.
  //
  // It is deliberately only enough to SET a language that is not set yet
  // (`enoughToSet`), never to SWITCH one that is: switching still needs two
  // hits, so a "Danke!" or a "grazie" dropped into an English conversation
  // cannot move it. See handleIncomingInner, which is what reads these two.
  const clearForeign = topLang !== 'en' && topScore >= 1 && topScore > runnerUp;
  const confident = topScore >= 2 && topScore > runnerUp;
  return { lang: topLang, confident, enoughToSet: confident || clearForeign };
}

/** Which language a WhatsApp template is CREATED for in Meta. 18 Nov (decision 018):
 *  every template that can go out after the 24h window has a name per language
 *  (base name for English, <base>_<lang> for the other eight), so this is the
 *  customer's own language, and English only for a language outside the nine.
 *  (17 Sep to 18 Nov it was capped to en/de/ja.) */
export function metaTemplateLang(lang?: string | null): Lang {
  return langOf(lang);
}

/** The Meta template name for a base name in this language: `base` for English, `base_<lang>` otherwise. */
export function metaTemplateName(base: string, lang?: string | null): string {
  const l = langOf(lang);
  return l === 'en' ? base : `${base}_${l}`;
}

/** "We've received your questionnaire" confirmation, per language (Jo's
 *  wording, 3 Sep: two lines, one emoji, "soon" rather than a 24-hour promise).
 *  No prices, no currency, no dashes: passes the policy guard unchanged. */
export const FORM_RECEIVED_MSG: Record<Lang, string> = nineLanguages('FORM_RECEIVED_MSG',
  // Jo, 18 Nov (template review, FINAL): "form" like every other message, no time promise, no emoji.
  'Got your form, thank you!\n\nOur team will review everything and get back to you.',
);

export function formReceivedMessage(lang?: string | null): string {
  return FORM_RECEIVED_MSG[langOf(lang)];
}

/** The Library key holding this language's copy of the confirmation above.
 *  Every one of them is seeded (seed.ts), so the scheduler sends the OWNER'S
 *  current wording and the constants here are only a fallback for a store that
 *  cannot be read. Unknown languages fall back to English, same as the message. */
export function formReceivedTemplateKey(lang?: string | null): string {
  return `form_received_${langOf(lang)}`;
}

/** The Google review request, per language. Sent ONCE, 1 hour after a customer
 *  is marked lodged (scheduler REVIEW_REQUEST job), as FREE TEXT on purpose:
 *  it follows the lodged confirmation by an hour, so Jo keeps it out of Meta's
 *  template library (Jo, 3 Sep). Three lines, no blank line between them, "we"
 *  not "I", and the review link on the line straight after the 🙏, exactly as
 *  Jo laid it out (evening version, shorter).
 *  No prices, no currency, no dashes: passes the policy guard unchanged. */
const REVIEW_LINK = 'https://g.page/r/CaWt4kV0UmY-EBM/review';
export const REVIEW_REQUEST_MSG: LegacyTable = {
  // Jo, 4 Sep: "If you have a minute," is filler, and the playbook bans filler.
  // Two lines, then the link on its own. The first two lines are word for word
  // the body of the Meta template `review_request`; the link is here because
  // INSIDE the 24h window this goes as free text and the customer needs
  // something to tap, while outside it the template carries it as a button.
  en: `Thank you so much for trusting us with your tax return!\n\nWe'd really appreciate a quick Google review 🙏\n\n${REVIEW_LINK}`,
  de: `Vielen Dank, dass du uns deine Steuererklärung anvertraut hast!\n\nWir würden uns sehr über eine kurze Google-Bewertung freuen 🙏\n\n${REVIEW_LINK}`,
  ja: `確定申告をお任せいただき、本当にありがとうございました！\n\nGoogleに簡単なレビューをいただけると嬉しいです 🙏\n\n${REVIEW_LINK}`,
  es: `¡Muchas gracias por confiarnos tu declaración de impuestos!\n\nNos encantaría recibir una breve reseña en Google 🙏\n\n${REVIEW_LINK}`,
  fr: `Merci beaucoup de nous avoir confié ta déclaration d'impôts !\n\nUn petit avis Google nous ferait très plaisir 🙏\n\n${REVIEW_LINK}`,
  it: `Grazie mille per averci affidato la tua dichiarazione dei redditi!\n\nCi farebbe molto piacere ricevere una breve recensione su Google 🙏\n\n${REVIEW_LINK}`,
  pt: `Muito obrigado por confiar em nós com a sua declaração de imposto!\n\nAgradeceríamos muito uma breve avaliação no Google 🙏\n\n${REVIEW_LINK}`,
};

export function reviewRequestMessage(lang?: string | null): string {
  return legacyPick(REVIEW_REQUEST_MSG, lang);
}

/** The Library key holding this language's copy of the review request. Seeded
 *  per language (seed.ts); the constant above is the fallback. */
export function reviewRequestTemplateKey(lang?: string | null): string {
  const l = langOf(lang);
  return `review_request_${REVIEW_REQUEST_MSG[l] ? l : 'en'}`;
}

/** THE ONE LINE THAT ANSWERS ALMOST EVERYTHING BEFORE PAYMENT (Jo, 25 Sep,
 *  Rose: "am I taxed as a resident or a working holiday maker?" got three
 *  paragraphs and "Great question!"). Before payment we do not want to give
 *  information that lets someone lodge alone. So any "am I / can I / will I /
 *  how much" question before payment gets this line, warm and short, then
 *  the next step for their stage. It is also the SAFE ANSWER the engine sends
 *  when the model's own draft slips into advice and the guard stops it.
 *  English is Jo's wording verbatim; the others are faithful renderings, no
 *  prices, no figures, no dashes, guard-clean. */
export const PRE_PAYMENT_CHECK_MSG: Record<Lang, string> = nineLanguages('PRE_PAYMENT_CHECK_MSG',
  "Yes, that's definitely one of the many things we check before we lodge your tax return, so leave that with us. 😊",
);
/** [o15_when_no_refund] (Jo, 22 Oct), in all nine languages (decision 018). */
export const NO_REFUND_CASES_MSG: Record<Lang, string> = nineLanguages('NO_REFUND_CASES_MSG',
  "Usually when the tax taken from your pay during the year already matches what you owe, or when too little was taken (for example from a second job), so there's tax to pay instead. Whether that's the case for you is one of the things we check in the review 😊",
);
/** "In what cases would there be no refund?" and its siblings, in en/de/ja. */
export const NO_REFUND_CASES_Q = /\b(?:in )?(?:what|which) (?:cases?|situations?|circumstances?)\b[^?？]{0,40}\bno refund|\bwhen (?:would|will|is|could|does) (?:there )?(?:be )?no refund|\bwhy would there (?:be )?no refund|\bwhat (?:do you mean by|does) ["“']?no refund|\bhow (?:could|would|can) there (?:be )?no refund|\bwhen (?:would|does|will) (?:the|your) full fee apply|in welchen f[äa]llen\b[^?]{0,40}keine r[üu]ckerstattung|wann gibt es keine r[üu]ckerstattung|wann (?:fällt|gilt) die volle geb[üu]hr|どんな(?:場合|時|とき)[^？?]{0,20}還付(?:が|は)?(?:ない|され(?:ない|ません)|ありません)|還付(?:が|は)?(?:ない|されない)(?:のは|場合)(?:どんな|どういう)/i;
export function noRefundCasesMessage(lang?: string | null): string | null {
  return ownOrNull(NO_REFUND_CASES_MSG, lang);
}

/** [o16_couple] (Jo, 23 Oct), in all nine languages (decision 018). */
export const COUPLE_MSG: Record<Lang, string> = nineLanguages('COUPLE_MSG',
  // Jo, 18 Nov (template review 24): locked. The fee paragraph is dropped when a price
  // has already gone out in the chat (never a price twice): see coupleMessageFor.
  `Of course, happy to help you both!

Each of you just needs to message us from your own WhatsApp, so your details stay private.

The fee is per person: $220 for a TFN return, or $385 with ABN income.`,
);
/** Jo, 18 Nov: a price is never sent twice. Once any price has gone out in the
 *  chat, the couple answer leaves out its fee paragraph (the last one); with
 *  foreign income the fee line uses the foreign prices. */
export function coupleMessageFor(lang: string | null | undefined, opts: { priceAlreadySent: boolean; foreign: boolean }): string | null {
  const base = coupleMessage(lang);
  if (!base) return null;
  const paras = base.split(/\n\n/);
  if (opts.priceAlreadySent) return paras.slice(0, -1).join('\n\n');
  if (opts.foreign) return base.replace(/\$220/g, '$330').replace(/\$385/g, '$495');
  return base;
}
export function coupleMessage(lang?: string | null): string | null {
  return ownOrNull(COUPLE_MSG, lang);
}

/**
 * THE BANK DOCUMENT IS REQUIRED (Jo, 25 Oct, +49 160: "I can't get into my
 * online banking, is the bank statement really needed?" got "No, you don't
 * need a bank statement". Wrong: an official document from an Australian bank
 * showing the customer's full name, BSB and account number is required, an
 * ATO requirement so the refund goes into an account in their name.
 */
export const BANK_DOCUMENT_MSG: Record<Lang, string> = nineLanguages('BANK_DOCUMENT_MSG',
  `Sorry, but we do need an official bank document showing your full name, BSB and account number.

It's an ATO requirement to make sure any refund goes into an account in your name.

Your bank can usually email this through online chat or its overseas support line, which is normally the quickest option.`,
);
/** Jo, 27 Oct (his own words, German customer): the refund cannot go to a
 *  friend's account; it must be in the customer's name. */
export const OWN_ACCOUNT_MSG: Record<Lang, string> = nineLanguages('OWN_ACCOUNT_MSG',
  "Unfortunately that's not possible. The bank account has to be in your own name and show your personal details.",
);
export function ownAccountMessage(lang?: string | null): string | null {
  return ownOrNull(OWN_ACCOUNT_MSG, lang);
}
export function bankDocumentMessage(lang?: string | null): string | null {
  return ownOrNull(BANK_DOCUMENT_MSG, lang);
}
/**
 * "HOW LIKELY IS IT THAT I GET SOMETHING BACK?" (Jo, 25 Oct, +49 1516: went to
 * the team). Jo: it depends on so many factors; we can only give an estimate
 * after a thorough review of their specific case, which starts after payment.
 */
export const REFUND_CHANCE_MSG: Record<Lang, string> = nineLanguages('REFUND_CHANCE_MSG',
  `It really depends on a lot of factors, like your residency, your income, the tax already taken from your pay and your deductions.

We can only give you an estimate after a thorough review of your specific case, and that review starts once payment is made.`,
);
export function refundChanceMessage(lang?: string | null): string | null {
  return ownOrNull(REFUND_CHANCE_MSG, lang);
}
export const REFUND_CHANCE_RE = /how (?:likely|probable|sure)\b[^?]{0,50}\b(?:get|receive|getting)\b[^?]{0,25}(?:back|refund)|\b(?:will|would|do|can|could) i (?:actually |even |definitely )?(?:get|receive) (?:anything|something|any money|money|a refund|any refund)(?: back)?\b|\bchances?\b[^?]{0,30}(?:refund|money back|get (?:anything|something) back)|how much (?:refund|money )?(?:will|would|could|can) i (?:get|receive)(?: back)?|how much (?:will|would) (?:i|my refund) be|\b(?:estimate|idea) (?:of |for )?(?:my |the )?refund|bekomme ich (?:etwas|geld|was) zurück|wie (?:viel|wahrscheinlich)[^?]{0,40}(?:zurück|erstattung)|還付[^？?。]{0,12}(?:もらえ|ありますか|いくら|され|戻)|いくら(?:戻|返|還付)|お金(?:は)?(?:戻|返)/i;

/**
 * PAYING FROM OVERSEAS (Jo, 25 Oct): "IBAN?", "how many euros?", "can I pay
 * from my English account?". Will offers a card payment link; if they want it,
 * he asks their full name and the team sends the link by hand (a task).
 */
export const PAYMENT_LINK_MSG: Record<'offer' | 'name' | 'ready', Record<Lang, string>> = {
  offer: nineLanguages('PAYMENT_LINK_OFFER', `No problem! Would you prefer to pay by card through a payment link? It works from any country.`),
  name: nineLanguages('PAYMENT_LINK_NAME', `Great! What's your full name for the payment link?`),
  ready: nineLanguages('PAYMENT_LINK_READY', `Thanks! We'll send you the payment link shortly.`),
};
export function paymentLinkMessage(step: 'offer' | 'name' | 'ready', lang?: string | null): string | null {
  return ownOrNull(PAYMENT_LINK_MSG[step], lang);
}

/**
 * THE MEDICARE EXEMPTION DID NOT WORK (Jo, 11 Nov): an error screenshot, no
 * IHI, "the application is not working", anything that went wrong with it.
 * Not ours and not the ATO's to fix: Services Australia. We go on without it.
 */
export const MEDICARE_CANT_HELP_MSG: Record<Lang, string> = nineLanguages('MEDICARE_CANT_HELP_MSG',
  `Sorry to hear that. The exemption is handled by Services Australia, so we can't help with it directly.

We can go ahead without it, and the Medicare levy will just stay on your return. Is that ok with you?`,
);
export function medicareCantHelpMessage(lang?: string | null): string | null {
  return ownOrNull(MEDICARE_CANT_HELP_MSG, lang);
}

/**
 * NO SUPER (DASP) SERVICE FOR NOW (Jo, 25 Oct).
 */
export const NO_DASP_MSG: Record<Lang, string> = nineLanguages('NO_DASP_MSG',
  `Sorry, our superannuation (DASP) service isn't available at the moment, but we're happy to take care of your tax return.`,
);
export function noDaspMessage(lang?: string | null): string | null {
  return ownOrNull(NO_DASP_MSG, lang);
}

/**
 * "I WAS TOLD IT COSTS $100" (Jo, 25 Oct, Katie +353 85; Matilde +61 455 saw
 * "$130"). Not our price; our fee is fixed. Never a handover.
 */
export const NOT_OUR_PRICE_MSG: Record<Lang, string> = nineLanguages('NOT_OUR_PRICE_MSG',
  `That isn't one of our prices, so it may have been another provider. Our fee is fixed: $220 for a TFN return, or $385 with ABN income.

That covers a full review of your tax residency, Medicare and deductions, and preparing and lodging your return, so you don't miss anything you're entitled to.`,
);
export function notOurPriceMessage(lang?: string | null): string | null {
  return ownOrNull(NOT_OUR_PRICE_MSG, lang);
}
/** A price the customer quotes back that is not one of ours ($100, $130, $250...). */
export function quotesOtherPrice(text: string): boolean {
  const t = text ?? '';
  if (!/\b(?:told|said|saw|seen|heard|read|quoted|advertis\w*|start(?:s|ing)? (?:from|at)|cost|costs|price|prices|charge|only|cheaper|gesagt|gesehen|kostet|preis|ab|言われ|見た|料金)\b|言われ|見まし|料金/i.test(t)) return false;
  const amounts = [...t.matchAll(/(?:\$|A\$|AUD\s?|€)\s?(\d{2,4})\b|\b(\d{2,4})\s?(?:dollars?|aud|euros?|ドル)\b/gi)].map((m) => Number(m[1] ?? m[2]));
  return amounts.length > 0 && amounts.some((a) => ![220, 385, 330, 440, 495, 110].includes(a));
}

/** A reply that tells the customer the bank document is not needed. */
export const BANK_DOC_DENIED_RE = /(?:don'?t|do not|won'?t|will not|doesn'?t|does not)\s+(?:really\s+)?need\s+(?:a|your|the|any)?\s*bank\s*statement|no\s+bank\s*statement\s+(?:is\s+)?(?:needed|required|necessary)|bank\s*statement\s+(?:is\s+)?not\s+(?:needed|required|necessary)|(?:brauchst|benötigst|musst)\s+(?:du\s+)?kein(?:en|e)?\s+(?:bank\s*statement|kontoauszug|bankauszug|bankdokument)|kein(?:en|e)?\s+(?:bank\s*statement|kontoauszug)\s+(?:nötig|notwendig|erforderlich)|(?:銀行明細|バンクステートメント|口座明細)[^。]{0,10}(?:不要|必要ありません|いりません|必要ない)/i;

/** Kept under its old name for the engine and the corpus: the stand-in for a
 *  blocked pre-payment determination IS the line above. */
export const PROFESSIONAL_QUESTION_MSG: Record<Lang, string> = PRE_PAYMENT_CHECK_MSG;

/** "Payment received" + the questionnaire link, per language (Jo's English
 *  wording, no emoji). The automatic confirmation used to go out in English to
 *  everyone, in the middle of a German or Japanese conversation, at the single
 *  moment the customer is most invested (audit, 4 Sep). English lives under the
 *  Library key `payment_received`, the others under payment_received_<lang>.
 *
 *  Jo, 17 Sep: reworded to three short paragraphs, no exclamation mark and no
 *  dash (matches the Meta-approved `payment_received` template word for word
 *  for en/de/ja, so the customer gets the identical wording inside and outside
 *  the 24h window). The link is kept on its own line here so a customer who
 *  gets this as free text (always the case inside the window, and outside it
 *  for anyone whose language falls back to English) still has something to
 *  tap: the approved Meta template carries the SAME link as a "Start Here"
 *  URL button instead, since a plain WhatsApp text message can never include
 *  an interactive button. Same destination either way, just two different
 *  ways WhatsApp lets a link be tapped. */
export const PAYMENT_RECEIVED_MSG: Record<Lang, string> = withOwnLinks(nineLanguages('PAYMENT_RECEIVED_MSG',
  `Payment received, thank you!\n\nPlease fill out this short form so we can start your tax return:\nhttps://workingholidaytax.com.au/start\n\nOnce submitted our team will review everything and update you here.`,
));

export function paymentReceivedMessage(lang?: string | null): string {
  return PAYMENT_RECEIVED_MSG[langOf(lang)];
}

/** Is this OUT message the "payment received" confirmation drafted for
 *  approval by the screenshot path (proposedState PAID + the deterministic
 *  system line)? It answers its own trigger, the receipt, not whatever the
 *  customer typed afterwards, so a later draft written against the full
 *  conversation does not make it stale: it used to be discarded with the
 *  rest, the customer stayed unpaid and the open payment task pointed at a
 *  draft that no longer existed (audit, 5 Sep). `libraryBodies` are Jo's
 *  live payment_received Library texts, which may differ from the constants. */
export function isPaymentReceivedDraft(
  m: { body?: string | null; meta?: { proposedState?: string } | null },
  libraryBodies: readonly string[] = [],
): boolean {
  if (m.meta?.proposedState !== 'PAID') return false;
  const body = (m.body ?? '').trim();
  if (!body) return false;
  const head = body.slice(0, 40).toLowerCase();
  if (Object.values(PAYMENT_RECEIVED_MSG).some((t) => t.slice(0, 40).toLowerCase() === head)) return true;
  return libraryBodies.some((t) => t.trim() === body);
}

/** The Library key for this customer's language. */
export function paymentReceivedTemplateKey(lang?: string | null): string {
  return metaTemplateName('payment_received', lang);
}

/** The holding line sent half an hour after a handoff, when the customer is
 *  still waiting and nobody has answered yet. Was English only, so a German or
 *  Japanese customer waiting on a person got an English line in the middle of a
 *  German conversation (audit, 4 Sep). English lives under the Library key
 *  `handoff_holding`, the others under handoff_holding_<lang>. */
export const HANDOFF_HOLDING_MSG: Record<Lang, string> = nineLanguages('HANDOFF_HOLDING_MSG',
  "I've passed this to the team, and they'll usually reply here within one business day.",
);

/** The two escalation lines Will sends on his own when a handoff is still
 *  open and unanswered (full audit, 11 Oct, decision 1): after 24 hours the
 *  bump, after 48 hours the apology. Both are fixed text, never the model.
 *  Library keys `handoff_bump` / `handoff_apology` (+ `_<lang>`). */
export const HANDOFF_BUMP_MSG: Record<Lang, string> = nineLanguages('HANDOFF_BUMP_MSG',
  // Jo, 18 Nov: locked; Will only, 23h after the customer's last message.
  "Sorry for the wait. I've followed up with the team for you.",
);

/** Jo, 18 Nov: the 48h apology is REMOVED (never sent; an old stage 2 job closes without sending). */
export const HANDOFF_APOLOGY_MSG: LegacyTable = {
  en: "Sorry for the wait. You're flagged as a priority and the team will reply here as soon as they can.",
  de: 'Entschuldige die Wartezeit. Du bist als Priorität markiert und das Team antwortet dir hier so bald wie möglich.',
  ja: 'お待たせして申し訳ありません。優先案件として登録しましたので、できるだけ早くこちらでご連絡します。',
  es: 'Perdona la espera. Estás marcado como prioridad y el equipo te responderá aquí lo antes posible.',
  fr: "Désolé pour l'attente. Tu es signalé comme prioritaire et l'équipe te répond ici dès que possible.",
  it: "Scusa l'attesa. Sei segnato come priorità e il team ti risponderà qui il prima possibile.",
  pt: 'Desculpe a espera. Sua mensagem está marcada como prioridade e a equipe responde aqui assim que possível.',
};

export function handoffBumpMessage(stage: 1 | 2, lang?: string | null): string {
  return stage === 1 ? HANDOFF_BUMP_MSG[langOf(lang)] : legacyPick(HANDOFF_APOLOGY_MSG, lang);
}

/** Library key only: the bump is Will-only free text (no Meta template), the apology is removed. */
export function handoffBumpTemplateKey(stage: 1 | 2, lang?: string | null): string {
  if (stage === 2) {
    const l = langOf(lang);
    return HANDOFF_APOLOGY_MSG[l] && l !== 'en' ? `handoff_apology_${l}` : 'handoff_apology';
  }
  return metaTemplateName('handoff_bump', lang);
}

export function handoffHoldingMessage(lang?: string | null): string {
  return HANDOFF_HOLDING_MSG[langOf(lang)];
}

/** The Library key for this customer's language: `handoff_holding` for English,
 *  `handoff_holding_<lang>` otherwise. Same names for the Meta templates. */
export function handoffHoldingTemplateKey(lang?: string | null): string {
  return metaTemplateName('handoff_holding', lang);
}

/** The acknowledgement a PAID customer gets when their documents arrive
 *  (Jo's English wording, 28 Aug; the others are faithful renderings). This is
 *  the one post-payment auto-send that never got its language variants on
 *  3 and 4 Sep, so a customer just thanked in German for their questionnaire
 *  sent payslips and got "Perfect, got it all" back in English (audit, 5 Sep).
 *  English lives under the Library key `handoff_documents_after_payment`, the
 *  others under handoff_documents_after_payment_<lang>.
 *  Jo, 18 Sep: cut to the acknowledgement alone. The second sentence ("Let me
 *  work through everything and I'll come back to you soon") was too long for
 *  what is, in the chat, a one-line receipt; it also went out even when Jo
 *  had just asked for the file himself and was about to reply in person. */
export const DOCUMENTS_RECEIVED_MSG: Record<Lang, string> = nineLanguages('DOCUMENTS_RECEIVED_MSG',
  `Perfect, got it all, thank you!`,
);

export function documentsReceivedMessage(lang?: string | null): string {
  return DOCUMENTS_RECEIVED_MSG[langOf(lang)];
}

/** The Library key for this customer's language: `handoff_documents_after_payment`
 *  for English (the key Jo already knows), `handoff_documents_after_payment_<lang>`
 *  otherwise. */
export function documentsReceivedTemplateKey(lang?: string | null): string {
  return metaTemplateName('handoff_documents_after_payment', lang);
}

export function professionalQuestionMessage(lang?: string | null): string {
  return PROFESSIONAL_QUESTION_MSG[langOf(lang)];
}

/** The three ABN questions sent right after the questionnaire confirmation to
 *  a TFN + ABN customer, per language (Jo's English wording, 3 Sep; the others
 *  are faithful renderings). English lives under the Library key `req_abn`
 *  (the key Jo already knows), the others under req_abn_<lang>. Same Meta
 *  template names when he creates them. No prices, no dashes, one bullet style. */
export const REQUEST_ABN_MSG: Record<Lang, string> = nineLanguages('REQUEST_ABN_MSG',
  'A few quick questions about your ABN income:\n\n1. What work did you do?\n2. Do you have invoices or records of what you earned?\n3. Any work expenses you can show proof of payment for?',
);

export function requestAbnMessage(lang?: string | null): string {
  return REQUEST_ABN_MSG[langOf(lang)];
}

/** Library key (and Meta template name) for this language's ABN questions:
 *  `req_abn` for English, `req_abn_<lang>` for the rest. */
export function requestAbnTemplateKey(lang?: string | null): string {
  return metaTemplateName('req_abn', lang);
}

/** The automatic Medicare Levy Exemption message (MEDICARE_INFO job, 15 minutes
 *  after a questionnaire that said "No" to Medicare), per language. English is
 *  Jo's 4 Sep wording verbatim (APPROVED.medicare_exemption); the others are
 *  faithful renderings. It was the last post-form auto-send without a language
 *  variant, so a German or Japanese customer thanked in their own language got
 *  three English paragraphs asking them to go and apply (audit, 5 Sep).
 *  English lives under the Library key `medicare` (the key Jo already knows),
 *  the others under medicare_<lang>. Same Meta template names. No dashes,
 *  no prices, guard-clean. */
export const MEDICARE_MSG: Record<Lang, string> = nineLanguages('MEDICARE_MSG',
  `You weren't covered by Medicare, so you may be able to get a Medicare Levy Exemption.\n\nOnce you've applied send me a screenshot and we'll include it in your tax return.\n\nIf it isn't approved, the levy still applies.`,
);

export function medicareMessage(lang?: string | null): string {
  return MEDICARE_MSG[langOf(lang)];
}

/** Library key (and Meta template name) for this language's Medicare message:
 *  `medicare` for English, `medicare_<lang>` for the rest. */
export function medicareTemplateKey(lang?: string | null): string {
  return metaTemplateName('medicare', lang);
}

/** The "Send Estimate + Invoice" message (Review stage), per language. Only
 *  en/de/ja are translated (Jo, 17 Sep: "German and Japanese, everyone else
 *  gets English" - same principle as MEDICARE_MSG above, deliberately not
 *  extended to es/fr/it/pt this time). {{AMOUNT}} and {{INVOICE_LINK}} are
 *  filled by composeEstimate at send time, same placeholders in every
 *  language. English lives under the Library key `estimate_invoice` (the key
 *  Jo already knows), the others under estimate_invoice_<lang>. */
export const ESTIMATE_INVOICE_MSG: Record<Lang, string> = nineLanguages('ESTIMATE_INVOICE_MSG',
  // Jo, 18 Nov: locked English, no invoice for now.
  `Your estimated tax refund is {{AMOUNT}}.\n\nI'll send your tax return for final review and then for your signature.`,
);

/** Jo, 1 Oct: the estimate when the customer OWES the ATO. Same shape, the
 *  amount is "payable", and no refund is ever mentioned. Library key
 *  estimate_payable / estimate_payable_<lang>, same Meta template names. */
export const ESTIMATE_PAYABLE_MSG: Record<Lang, string> = nineLanguages('ESTIMATE_PAYABLE_MSG',
  // Jo, 18 Nov: locked English, no invoice for now.
  `The estimated amount payable to the ATO is {{AMOUNT}}.\n\nI'll send your tax return for final review and then for your signature.\n\nOnce it's lodged, our team will walk you through the ATO payment.`,
);
export function estimatePayableMessage(lang?: string | null): string {
  return ESTIMATE_PAYABLE_MSG[langOf(lang)];
}
export function estimatePayableTemplateKey(lang?: string | null): string {
  return metaTemplateName('estimate_payable', lang);
}

export function estimateInvoiceMessage(lang?: string | null): string {
  return ESTIMATE_INVOICE_MSG[langOf(lang)];
}

/** Library key (and Meta template name) for this language's estimate message:
 *  `estimate_invoice` for English, `estimate_invoice_<lang>` for German and
 *  Japanese. Anything else falls back to English, same as medicareTemplateKey. */
export function estimateInvoiceTemplateKey(lang?: string | null): string {
  return metaTemplateName('estimate_invoice', lang);
}

/** The "Ready for signature" message (return emailed for review/signature),
 *  per language. Only en/de/ja are translated (Jo, 17 Sep: same "German and
 *  Japanese, everyone else gets English" principle as MEDICARE_MSG and
 *  ESTIMATE_INVOICE_MSG above). English lives under the Library key
 *  `signature` (the key Jo already knows), the others under
 *  signature_<lang>. Same Meta template names. */
export const SIGNATURE_MSG: Record<Lang, string> = nineLanguages('SIGNATURE_MSG',
  `Your tax return is ready! 🎉\nI've emailed it to you to review and sign so we can lodge it.`,
);

export function signatureMessage(lang?: string | null): string {
  return SIGNATURE_MSG[langOf(lang)];
}

/** Library key (and Meta template name) for this language's signature-ready
 *  message: `signature` for English, `signature_<lang>` for German and
 *  Japanese. Anything else falls back to English, same as
 *  medicareTemplateKey / estimateInvoiceTemplateKey. */
export function signatureTemplateKey(lang?: string | null): string {
  return metaTemplateName('signature', lang);
}

/** The "Mark Lodged" confirmation (return lodged with the ATO), per language.
 *  Only en/de/ja are translated (Jo, 17 Sep: same "German and Japanese,
 *  everyone else gets English" principle as MEDICARE_MSG, ESTIMATE_INVOICE_MSG
 *  and SIGNATURE_MSG above). English lives under the Library key
 *  `lodged_confirmation` (the key Jo already knows), the others under
 *  lodged_confirmation_<lang>. Same Meta template names. */
export const LODGED_CONFIRMATION_MSG: Record<Lang, string> = nineLanguages('LODGED_CONFIRMATION_MSG',
  // Jo, 18 Nov (template review 12): locked.
  `Your tax return has been lodged! ✅\nYour refund should arrive in your bank account within 14 business days.`,
);

/** Jo, 1 Oct: the lodged confirmation when the customer OWES the ATO (72-hour
 *  audit: "your refund should arrive within 14 business days" went to two
 *  customers with a tax bill). Library key lodged_payable / lodged_payable_<lang>. */
export const LODGED_PAYABLE_MSG: Record<Lang, string> = nineLanguages('LODGED_PAYABLE_MSG',
  // Jo, 18 Nov (template review 12): locked.
  `Your tax return has been lodged! ✅\nWithin 14 days the ATO will email you a payment request.\nIf it doesn't arrive, message us here and we'll send it to you.`,
);
/** 4 Nov (audit, Jo): the lodged note when nobody knows yet whether the customer gets money back
 *  (no outcome set, no estimate or a nil one). No refund promise, no amount, no date.
 *  Library key lodged_neutral / lodged_neutral_<lang>; needs its own Meta template per language. */
export const LODGED_NEUTRAL_MSG: LegacyTable = {
  en: `Your tax return has been lodged successfully! ✅\nThe ATO will now assess it, and we will message you here as soon as the result is in 😊`,
  de: 'Deine Steuererklärung wurde erfolgreich eingereicht! ✅\nJetzt prüft das ATO sie. Sobald das Ergebnis vorliegt, melden wir uns hier bei dir 😊',
  ja: 'あなたの確定申告書の提出が完了しました！✅\n今後ATOによる審査が行われます。結果が分かり次第、こちらからご連絡します😊',
};
/** Jo, 18 Nov: REMOVED (no third lodged version). Kept for history only, never sent. */
export function lodgedNeutralMessage(lang?: string | null): string {
  return legacyPick(LODGED_NEUTRAL_MSG, lang);
}

export function lodgedPayableMessage(lang?: string | null): string {
  return LODGED_PAYABLE_MSG[langOf(lang)];
}
export function lodgedPayableTemplateKey(lang?: string | null): string {
  return metaTemplateName('lodged_payable', lang);
}

export function lodgedConfirmationMessage(lang?: string | null): string {
  return LODGED_CONFIRMATION_MSG[langOf(lang)];
}

/** Library key (and Meta template name) for this language's lodged
 *  confirmation: `lodged_confirmation` for English, `lodged_confirmation_<lang>`
 *  for German and Japanese. Anything else falls back to English, same as
 *  medicareTemplateKey / estimateInvoiceTemplateKey / signatureTemplateKey. */
export function lodgedConfirmationTemplateKey(lang?: string | null): string {
  return metaTemplateName('lodged_confirmation', lang);
}

// ── Win-back (Jo, 24 Sep) ────────────────────────────────────────────────
// A lost lead has been silent for days, so the win-back can only reach them
// as an approved Meta template. The frame is the minimum Meta needs ({{1}}
// first name and a fixed opener); {{2}} is the WHOLE message the post-mortem
// wrote for this person, picking up where their conversation stopped, in
// their language (or the campaign line). Jo, 24 Sep: personal, not a shell.
// The fixed closing line exists because Meta refuses a variable at the end.

// Jo, 9 Nov: the Google review ask template (review_ask*) is gone. The only
// ask is the short free text in review-asks.ts (REVIEW_ASK_SHORT_MSG).


// ============================================================
// SCHEDULED FOLLOW-UP NUDGES IN THE CUSTOMER'S LANGUAGE (3 Nov)
//
// The English follow-ups (fu_pre_24h ... fu_sig_7d) reached German, Japanese,
// French and Korean customers. The Library holds them in English only (plus the
// price-sent nudge in German and Japanese), so a scheduler that could not find
// a translation fell back to the English template. These are the German and
// Japanese wordings, same meaning as the English (APPROVED.followups_*), no
// dashes, no promise, never the word refund in the signature flow. They are the
// body of a free text inside the 24h window and the CRM copy of a send; outside
// the window the Meta template of the same name must exist in that language
// (templateApprovedFor), see planFollowUp in language-30oct.ts.
// ============================================================
export type ActiveFollowUpKey = 'fu_pre_24h' | 'fu_pre_3d' | 'fu_price_sent' | 'fu_form_6h' | 'fu_sig_24h';
export type RemovedFollowUpKey = 'fu_form_3d' | 'fu_form_7d' | 'fu_sig_3d' | 'fu_sig_7d';
export type FollowUpKey = ActiveFollowUpKey | RemovedFollowUpKey;
export const FOLLOWUP_MSG: Record<ActiveFollowUpKey, Record<Lang, string>> & Record<RemovedFollowUpKey, LegacyTable> = {
  // 18 Nov (decision 018): the five follow-ups Jo kept, in all nine languages.
  fu_pre_24h: nineLanguages('FOLLOWUP_MSG.fu_pre_24h', 'Hey {{1}}😊\n\nJust checking in on your tax return. Anything I can explain before you get started?'),
  fu_pre_3d: nineLanguages('FOLLOWUP_MSG.fu_pre_3d', 'Hi {{1}}😊\nIf you need help with your tax return later on, just message me here.'),
  fu_price_sent: nineLanguages('FOLLOWUP_MSG.fu_price_sent', 'Hi {{1}}😊\nDid the transfer go through on your end?'),
  fu_form_6h: nineLanguages('FOLLOWUP_MSG.fu_form_6h', 'Hi {{1}}😊\nDid you get a chance to fill out the form yet?'),
  fu_sig_24h: nineLanguages('FOLLOWUP_MSG.fu_sig_24h', 'Hi {{1}}😊\nDid you get a chance to review and sign your tax return?'),
  // Jo, 18 Nov: REMOVED from the cadence (form reminders after 3 and 7 days, signature reminders
  // after 3 and 7 days). Kept in their old languages for history only; never extended.
  fu_form_3d: {
    en: 'Hi {{1}},\n\nis anything in the form holding you up?',
    de: 'Hi {{1}}, hält dich etwas im Formular auf?',
    ja: 'こんにちは、{{1}}さん。フォームで止まっているところはありますか？',
    es: "Hola {{1}},\n\n¿hay algo del formulario que te esté frenando?",
    fr: "Bonjour {{1}},\n\nQuelque chose dans le formulaire te bloque-t-il ?",
    it: "Ciao {{1}},\n\nc'è qualcosa nel modulo che ti sta bloccando?",
    pt: "Oi {{1}},\n\nalgo no formulário está te travando?",
  },
  fu_form_7d: {
    en: "Hi {{1}},\n\nwhen do you think you'll have a moment to finish the form? 😊",
    de: 'Hi {{1}}, wann hast du voraussichtlich einen Moment für das Formular? Ich melde mich dann noch einmal bei dir 😊',
    ja: 'こんにちは、{{1}}さん。フォームに取り組めそうなのはいつ頃になりそうですか？その頃にまたご連絡します😊',
    es: "Hola {{1}},\n\n¿cuándo crees que tendrás un momento para terminar el formulario? 😊",
    fr: "Bonjour {{1}},\n\nQuand penses-tu avoir un moment pour finir le formulaire ? 😊",
    it: "Ciao {{1}},\n\nquando pensi di avere un momento per completare il modulo? 😊",
    pt: "Oi {{1}},\n\nquando você acha que terá um momento para terminar o formulário? 😊",
  },
  fu_sig_3d: {
    en: "Hi {{1}},\n\nis there anything in your return you'd like me to explain before you sign?",
    de: 'Hi {{1}}, gibt es in deiner Steuererklärung etwas, das ich dir vor der Unterschrift erklären soll?',
    ja: 'こんにちは、{{1}}さん。ご署名の前に、申告書の内容で説明してほしい点はありますか？',
    es: "Hola {{1}},\n\n¿hay algo de tu declaración que quieras que te explique antes de firmar?",
    fr: "Bonjour {{1}},\n\ny a-t-il quelque chose dans ta déclaration que tu voudrais que je t'explique avant de signer ?",
    it: "Ciao {{1}},\n\nc'è qualcosa nella tua dichiarazione che vorresti che ti spiegassi prima di firmare?",
    pt: "Oi {{1}},\n\ntem algo na sua declaração que você gostaria que eu explicasse antes de assinar?",
  },
  fu_sig_7d: {
    en: "Hi {{1}},\n\nyour return is ready and waiting.\n\nWhen do you think you'll have a moment to sign it? 😊",
    de: 'Hi {{1}}, deine Steuererklärung ist fertig und wartet auf dich. Wann hast du voraussichtlich einen Moment zum Unterschreiben? Ich melde mich dann noch einmal bei dir 😊',
    ja: 'こんにちは、{{1}}さん。申告書の準備ができており、ご署名をお待ちしています。いつ頃ご署名いただけそうですか？その頃にまたご連絡します😊',
    es: "Hola {{1}},\n\ntu declaración está lista y esperando.\n\n¿Cuándo crees que tendrás un momento para firmarla? 😊",
    fr: "Bonjour {{1}},\n\nta déclaration est prête et t'attend.\n\nQuand penses-tu avoir un moment pour la signer ? 😊",
    it: "Ciao {{1}},\n\nla tua dichiarazione è pronta e ti aspetta.\n\nQuando pensi di avere un momento per firmarla? 😊",
    pt: "Oi {{1}},\n\nsua declaração está pronta e esperando por você.\n\nQuando você acha que terá um momento para assiná-la? 😊",
  },
};

/** The follow-up wording in this customer's language, or null when none is
 *  held (anything but English, German, Japanese, and a key that is not a
 *  follow-up). A missing language is NEVER answered with the English text:
 *  the caller decides what to do instead (planFollowUp). No language means
 *  English, as everywhere else. */
export function followUpMessage(key: string, lang?: string | null): string | null {
  const row = (FOLLOWUP_MSG as Record<string, LegacyTable | undefined>)[key];
  if (!row) return null;
  if (!lang) return row.en;
  const l = supportedLang(lang);
  return l ? row[l] ?? null : null;
}

/** The Meta template name of a follow-up in this language (decision 018): the Library key for
 *  English, `<key>_<lang>` for the other eight. */
export function followUpTemplateName(key: string, lang?: string | null): string {
  return metaTemplateName(key, lang);
}

/** Every translated system line, for the policy guard's approved corpus. */
export const SYSTEM_MESSAGE_FAMILIES = {
  NO_REFUND_CASES_MSG, COUPLE_MSG, BANK_DOCUMENT_MSG, OWN_ACCOUNT_MSG, REFUND_CHANCE_MSG, MEDICARE_CANT_HELP_MSG, NO_DASP_MSG, NOT_OUR_PRICE_MSG,
  PAYMENT_LINK_OFFER: PAYMENT_LINK_MSG.offer, PAYMENT_LINK_NAME: PAYMENT_LINK_MSG.name, PAYMENT_LINK_READY: PAYMENT_LINK_MSG.ready,
  FORM_RECEIVED_MSG, REVIEW_REQUEST_MSG, PRE_PAYMENT_CHECK_MSG, PAYMENT_RECEIVED_MSG, HANDOFF_HOLDING_MSG, HANDOFF_BUMP_MSG, HANDOFF_APOLOGY_MSG,
  DOCUMENTS_RECEIVED_MSG, REQUEST_ABN_MSG, MEDICARE_MSG, ESTIMATE_INVOICE_MSG, ESTIMATE_PAYABLE_MSG, SIGNATURE_MSG, LODGED_CONFIRMATION_MSG, LODGED_PAYABLE_MSG,
};



// ============================================================
// RESIDENCY DOUBLE-CHECK (Jo, 16 Oct)
//
// A customer from the UK, Germany or Japan who ticked "Working Holiday Maker"
// for tax may in fact qualify as an Australian tax resident (the first
// $18,200 tax-free), which can change the refund a lot. After the form, Will
// asks them once to re-read the residency page and confirm. Meta template
// `residency_check` (Utility), per language since 18 Nov (residency_check_<lang>).
// ============================================================
export const RESIDENCY_CHECK_MSG: Record<Lang, string> = withOwnLinks(nineLanguages('RESIDENCY_CHECK_MSG',
  // Jo, 25 Oct: "for tax purposes", short paragraphs, no line about the refund.
  // Jo, 18 Nov (template review, FINAL): no name, the reason in one sentence, the link next to the ask.
  `One quick check before we start your tax return.\n\nYou marked yourself as a Working Holiday Maker for tax purposes. Some people on this visa count as Australian tax residents instead, and it changes how the return is done.\n\nPlease read this short page:\nhttps://workingholidaytax.com.au/y8vwp4bf7\n\nIs your answer still correct?`,
));
export const RESIDENCY_CHECK_TEMPLATE = 'residency_check';
/** The Meta template name of the residency check in this language (decision 018). */
export function residencyCheckTemplateKey(lang?: string | null): string {
  return metaTemplateName(RESIDENCY_CHECK_TEMPLATE, lang);
}
/** The customer's own one-time link to the residency question (Jo, 3 Nov), on the page in
 *  their language (every locale has it, decision 017/018). The public page is the fallback
 *  when no link secret is configured. */
export function residencyPersonalLink(lang: string | null | undefined, token: string | null): string {
  const l = langOf(lang);
  const prefix = l === 'en' ? '' : `/${l}`;
  return `https://workingholidaytax.com.au${prefix}/y8vwp4bf7${token ? `?k=${token}` : ''}`;
}
export function residencyCheckMessage(lang: string | null | undefined, firstName: string, link?: string): string {
  const text = fillNameSlot(RESIDENCY_CHECK_MSG[langOf(lang)], firstName); // Jo, 18 Nov: never "there"
  return link ? text.replace(/https:\/\/workingholidaytax\.com\.au\/(?:[a-z]{2}\/)?y8vwp4bf7/, link) : text;
}
