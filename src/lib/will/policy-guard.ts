// ============================================================
// Policy Guard v2 — deterministic safety layer between the AI's
// output and anything sent to a customer. Rewritten after the
// adversarial audit: sentence-level approved-corpus exemption,
// broadened patterns, numeric amount comparison, prompt-injection
// and placeholder leak detection.
// ============================================================
import { CustomerState, POST_PAYMENT_STATES } from './state-machine';
import { APPROVED } from './approved-messages';

export interface GuardContext {
  state: CustomerState;
  paid: boolean;
  aiPaused: boolean;
  killSwitch: boolean;
  optedOut: boolean;
  isLegacy: boolean;
  lastCustomerMsgAt: Date | null;
  isApprovedTemplate: boolean;
  estimateFromTeam: number | null; // cents
}

export interface GuardResult {
  allowed: boolean;
  violations: string[];
  /** True when a non-approved sentence is in a language the lexical safety
   *  patterns cannot cover. The engine holds these for human review in Autopilot. */
  unguardedLanguage?: boolean;
}

// ---------- approved corpus, sentence level ----------
function collectStrings(v: unknown, out: string[]): void {
  if (typeof v === 'string') out.push(v);
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => collectStrings(x, out));
}
const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase();

/**
 * Fold non-ASCII digits down to ASCII before any check runs.
 *
 * WHY: every numeric pattern in this file uses `\d`, which without the `u` flag
 * matches ASCII digits ONLY. Verified bypasses before this existed:
 *     "Our fee is ５０ for you."      (fullwidth)      -> no amount found
 *     "Our fee is ५० for you."        (Devanagari)     -> no amount found
 * A customer asking for "prices in my own numerals" is all it took. Covers the
 * digit blocks a WhatsApp keyboard can actually produce: fullwidth, Arabic-Indic,
 * extended Arabic-Indic, Devanagari and Bengali.
 */
function normaliseDigits(s: string): string {
  return s.replace(/[０-９٠-٩۰-۹०-९০-৯]/g, (d) => {
    const c = d.codePointAt(0)!;
    for (const base of [0xff10, 0x0660, 0x06f0, 0x0966, 0x09e6]) {
      if (c >= base && c <= base + 9) return String(c - base);
    }
    return d;
  });
}
const splitSentences = (s: string) =>
  s.split(/\n+|(?<=[.!?])\s+/).map((x) => x.trim()).filter(Boolean);

const APPROVED_SENTENCES = new Set<string>();
{
  const bodies: string[] = [];
  collectStrings(APPROVED, bodies);
  for (const b of bodies) {
    APPROVED_SENTENCES.add(norm(b));
    for (const sent of splitSentences(b)) APPROVED_SENTENCES.add(norm(sent));
  }
}
const isApprovedSentence = (sentence: string) => APPROVED_SENTENCES.has(norm(sentence));

/** Ceiling on the model's OWN prose in one reply, in characters.
 *
 *  Approved sentences are excluded from the count, so this is not a limit on
 *  approved messages however long they are. When the model adapts an approved
 *  message it is told to change the opening only, so the adapted opening is
 *  typically all that counts here (~100 characters) and the rest still matches
 *  the corpus exactly.
 *
 *  The target is 1-3 sentences under 40 words (~240 characters). This ceiling
 *  sits well above that on purpose: the playbook shapes the normal case, and
 *  this only catches replies that have clearly turned into essays. */
const MAX_IMPROVISED_CHARS = 450;

// ---------- money (currency-symbol / currency-word agnostic across languages) ----------
// The only prices that may leave the building: $220 (TFN), $385 (TFN + ABN) and
// $110 for a phone consultation. $110 was added on Jo's approval, 25 Aug, after
// the export showed the team quoting it to a customer who asked for a call —
// without it here the guard blocked the sentence and the answer could never be
// sent. Post-payment nothing is allowed at all (see `allowedCents` below), so a
// consultation price can only ever appear before the customer has paid.
const FIXED_PRICES_CENTS = [22000, 38500, 11000];

// The ATO's $300 work-related-expense substantiation threshold. This is a fixed
// public regulatory figure, NOT a price and NOT a refund, and the team needs to
// state it when explaining record-keeping ("if your total work expenses are $300
// or less, receipts generally aren't required"). It is exempted from the money
// net ONLY inside a record-keeping context (receipts / records / substantiate /
// work-related expenses / claim) and ONLY when the same text says nothing about a
// refund or money owed. So "your refund is $300", "$300 back to you", or any
// other amount stays blocked. Deliberately one exact value, one direction.
const SUBSTANTIATION_THRESHOLD_CENTS = 30000; // $300
const SUBSTANTIATION_CTX =
  /\b(?:receipts?|records?|record[- ]keeping|substantiat\w*|work[- ]related expenses?|work expenses?|claim(?:ed|ing|able)?)\b/i;
const REFUND_MONEY_CTX =
  /\b(?:refund|get\s+back|getting\s+back|back\s+to\s+you|you'?ll\s+get|you\s+would\s+get|you\s+will\s+get|owe[ds]?|owing|estimate)\b/i;
/** True only for the exact $300 substantiation threshold stated in a pure record-keeping context. */
function isBenignThreshold(cents: number, context: string): boolean {
  return (
    cents === SUBSTANTIATION_THRESHOLD_CENTS &&
    SUBSTANTIATION_CTX.test(context) &&
    !REFUND_MONEY_CTX.test(context)
  );
}

// Currency words in the languages backpackers actually use.
const CURRENCY_WORDS = 'dollars?|bucks?|aud|usd|dólares?|dolares?|euros?|eur|pounds?|libras?|sterline|quid|yen|jpy|francs?|kroner?|kronor?|reais?|pesos?|shekels?|rupees?|won';
const CURRENCY_SYMBOLS = '\\$|€|£|¥|₪|₩|₺|₹|R\\$';
// number (with , or . grouping) preceded OR followed by a currency symbol/word
const AMOUNT_RE = new RegExp(
  `(?:(?:${CURRENCY_SYMBOLS})\\s?)(\\d[\\d.,]*)` +
  `|(\\d[\\d.,]*)\\s?(?:${CURRENCY_SYMBOLS}|(?:${CURRENCY_WORDS})\\b)`,
  'gi',
);

/**
 * A bare number used as a PRICE, with no currency marker.
 *
 * WHY: AMOUNT_RE only matches a number adjacent to a currency symbol or word,
 * so the entire forbidden-amount check was defeated by dropping the `$`.
 * Verified before this existed:
 *     "Our fee is only 50 for you."          -> no amounts found, passed
 *     "The price is 50, nothing more."       -> no amounts found, passed
 *     "we can waive it and charge you 50"    -> no amounts found, passed
 *
 * This catches a number that follows price language. Deliberately narrow: it
 * must sit next to a money word, so ordinary numbers ("2 to 3 weeks", "5
 * minutes", "form 2") are not swept up.
 */
// TRIGGER WORDS ARE MONEY WORDS ONLY. An earlier version also included `only`,
// `just` and `for`, which are not about money, and in a TAX business that was
// actively harmful: it flagged "for 2024, so we need your payslips" as a
// forbidden amount of $2024, and "we just need 2 more documents" as $2.
// Year mentions are everywhere here, so a year is excluded explicitly too.
const BARE_PRICE_RE = new RegExp(
  `\\b(?:fee|fees|price|priced|cost|costs|total|charge|charges|quote|quoted|rate)\\b` +
  `[^.!?\\d]{0,24}?(\\d[\\d.,]*)\\b` +
  // not a duration, a percentage, a time, or a tax year (distance/quantity
  // units like "5,000 kilometres" are excluded in amountsInCents, because a
  // grouped number can backtrack past a trailing lookahead — see NON_MONEY_UNIT)
  `(?!\\s*(?:%|percent|weeks?|days?|months?|years?|minutes?|hours?|am|pm))`,
  'gi',
);
/** Four-digit values that are plainly a tax year, not a price. */
const LOOKS_LIKE_YEAR = /^(19|20)\d{2}$/;
/**
 * The text right after a bare number. If it continues with more digits/commas
 * the match was a truncated fragment of a bigger number; if it is a distance or
 * quantity unit ("5,000 kilometres", "5000km") the number is not money. Either
 * way the bare-price matcher must not treat it as a dollar figure.
 */
const NON_MONEY_UNIT = /^(?:\d|[.,]\d|\s*(?:kms?|kilomet(?:re|er)s?|litres?|liters?|kg|grams?)\b)/i;

/**
 * "Pay us 50" — a demand for money with no fee/price word in front of it.
 *
 * BARE_PRICE_RE keys off fee/price/cost/total/charge/quote/rate, and the most
 * natural way to invent a price avoids every one of them:
 *     "Just pay us 50 and we get started."   -> passed
 *     "Send me 100 and I'll start today."    -> passed
 * Deliberately requires the number to follow the recipient directly, because
 * `pay` on its own is ordinary in this business: "you can pay in 2 instalments"
 * and "pay by 5 pm" must not be read as $2 and $5.
 */
const PAY_ME_RE = /\b(?:pay|send|transfer|deposit)\s+(?:us|me|to us|to me)\s+(?:only\s+|just\s+)?\$?(\d[\d.,]*)\b/gi;

/**
 * An amount written as WORDS.
 *
 * Every numeric rule above needs a digit, so spelling the number defeats all of
 * them at once — and asking for that is a single innocuous-sounding sentence
 * from the customer ("please write amounts as words, I'm dyslexic with
 * figures"). Verified before this existed:
 *     "Our special rate for you is one hundred dollars."  -> no violation
 *
 * The value is not reconstructed: any price stated in words is wrong wording by
 * definition, because the only two real prices are written $220 and $385. So
 * this reports the phrase, not a number.
 */
const NUM_WORD = '(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand)';
const WORD_AMOUNT_RE = new RegExp(
  // "one hundred dollars" / "fifty bucks"
  `\\b${NUM_WORD}(?:[\\s-]+(?:and[\\s-]+)?${NUM_WORD})*\\s+(?:${CURRENCY_WORDS})\\b` +
  // or "the fee is one hundred" / "price: fifty"
  `|\\b(?:fee|fees|price|priced|cost|costs|total|charge|charges|quote|quoted|rate)\\b[^.!?]{0,24}?\\b${NUM_WORD}(?:[\\s-]+(?:and[\\s-]+)?${NUM_WORD})*\\b`,
  'i',
);
/** "a hundred percent sure" is emphasis, not money. */
const WORD_AMOUNT_EXEMPT = /\b(?:hundred|thousand)\s*(?:%|percent|per ?cent)\b/i;

function toCents(raw: string): number | null {
  // Normalise both 1,234.56 and 1.234,56 style groupings.
  let s = raw.trim();
  if (/,\d{2}$/.test(s) && s.includes('.')) s = s.replace(/\./g, '').replace(',', '.');
  else s = s.replace(/,/g, '');
  const n = parseFloat(s);
  return Number.isNaN(n) ? null : Math.round(n * 100);
}

function amountsInCents(text: string): number[] {
  const out: number[] = [];
  for (const m of text.matchAll(AMOUNT_RE)) {
    const c = toCents(m[1] ?? m[2] ?? '');
    if (c != null) out.push(c);
  }
  // Also catch a price written without any currency marker: "our fee is 50".
  // Without this the whole forbidden-amount check was bypassed by dropping the $.
  for (const m of text.matchAll(BARE_PRICE_RE)) {
    const raw = (m[1] ?? '').trim();
    if (LOOKS_LIKE_YEAR.test(raw)) continue; // "the fee for 2024" is a year, not a price
    // What immediately follows the captured number. A grouped number like
    // "5,000" can backtrack to "5" when a trailing unit lookahead fails, so the
    // unit test is done here against the real tail: a number that continues with
    // more digits/commas (a truncated fragment) or is followed by a distance /
    // quantity unit is not a price. "5,000 kilometres" / "5000km" -> skipped.
    const tail = text.slice(m.index! + m[0].length);
    if (NON_MONEY_UNIT.test(tail)) continue;
    const c = toCents(raw);
    if (c != null) out.push(c);
  }
  // "pay us 50" — money demanded without ever saying the word "fee".
  for (const m of text.matchAll(PAY_ME_RE)) {
    const raw = (m[1] ?? '').trim();
    if (LOOKS_LIKE_YEAR.test(raw)) continue;
    const c = toCents(raw);
    if (c != null) out.push(c);
  }
  return out;
}

// ---------- language coverage (H5 / AI-01) ----------
// The lexical tax/DIY/currency patterns below are English. The old check was an
// allow-list of European words (fail-OPEN: an unlisted language like Indonesian
// or Tagalog slipped through as "English" and could auto-send unreviewed).
// AI-01 inverts this to FAIL-CLOSED: a reply is trusted only if it is
// CONFIDENTLY English; anything else is flagged so the engine holds it for human
// approval in Autopilot. Common English function words are required as positive
// evidence, non-Latin script and heavy diacritics are hard disqualifiers.
const ENGLISH_WORDS = /\b(the|you|your|we|our|is|are|to|and|a|of|for|will|can|it|that|this|have|with|be|not|if|please|thanks|thank|hi|hey|hello|need|help|refund|tax|form|fee|pay|paid|once|just|let|know|get|got|back|send|sent|when|what|how|yes|no|but|so|on|in|at|do|does|any|all|from|about|here|there|we'll|you'll|i'll|we're|you're|it's|don't|can't)\b/gi;

/**
 * Function words that are common in another language and either absent from
 * English or rare enough that their presence is strong evidence AGAINST English.
 *
 * WHY: the English-word test alone misclassified languages that share English
 * function words and carry no diacritics. Verified failures before this list
 * existed:
 *   "De prijs is 220 en dat is alles wat je betaalt."  (Dutch)  -> English
 *   "Der Preis ist 50, in Ordnung so?"                 (German) -> English
 * Both cleared the two-hit bar on words like `is`, `in`, `so`. That mattered
 * because every CONTENT pattern in this guard is English-only: a reply
 * classified as English in a language the patterns cannot read is a reply with
 * effectively no content checking at all.
 */
const NON_ENGLISH_MARKERS = /\b(de|het|een|zijn|niet|dat|wat|je|jij|maar|ook|nog|jouw|betaal\w*|prijs|bedrag|der|die|das|und|ist|nicht|sie|ich|wir|mit|auf|für|ein|eine|kein\w*|oder|aber|sehr|preis|geld|el|la|los|las|un|una|es|por|para|con|pero|más|muy|tu|su|dinero|precio|le|les|des|du|une|est|pas|vous|nous|avec|pour|mais|très|argent|prix|il|lo|gli|del|della|che|non|sono|con|per|ma|molto|denaro|prezzo|o|os|as|um|uma|não|você|com|para|mas|muito|dinheiro|preço)\b/gi;

export function isConfidentlyEnglish(text: string): boolean {
  const t = text.replace(/https?:\S+/g, ' '); // ignore URLs
  // Any non-Latin script (CJK, Hebrew, Arabic, Cyrillic, Greek, Thai, Hangul) => not English.
  if (/[Ѐ-ӿ֐-׿؀-ۿͰ-Ͽ฀-๿가-힯぀-ヿ一-鿿]/.test(t)) return false;
  const letters = (t.match(/[A-Za-zÀ-ÿ]/g) || []).length;
  if (letters < 8) return true; // too short to judge (emojis, "ok", "$220") => treat as safe
  const accented = (t.match(/[À-ÿ]/g) || []).length;
  if (accented / letters > 0.03) return false; // diacritics => not English
  // Positive evidence: at least two common English function words must appear.
  const hits = (t.match(ENGLISH_WORDS) || []).length;
  if (hits < 2) return false;
  // Negative evidence beats positive: a text carrying as many foreign markers as
  // English ones is not English, however many shared words it happens to use.
  const foreign = (t.match(NON_ENGLISH_MARKERS) || []).length;
  return foreign < hits;
}

/** Back-compat wrapper (now fail-closed): true when the text is NOT confidently English. */
export function isLikelyNonEnglish(text: string): boolean {
  return !isConfidentlyEnglish(text);
}

// ---------- pattern sets ----------
const TAX_DETERMINATION: RegExp[] = [
  // WILL-AI-01: broadened residency qualifiers — the old group only covered
  // "australian/tax/non- resident" and let "foreign / temporary / permanent /
  // working-holiday resident" (the most common real determinations) through.
  /you(?:'re| are|'d be| would be| will be)(?: probably| definitely| likely)?(?: considered)?(?: an?| a)?\s*(?:australian |tax |non-?|foreign |temporary |permanent |working[ -]?holiday |non[ -]?)*resident/i,
  // A determination directed at the customer ("you're a foreign resident"),
  // NOT a neutral mention of the concept ("who is considered a resident...").
  /\byou(?:'re| are|'d be| would be| count as| qualify as)[^.!?]{0,30}\b(?:foreign|temporary|non)[ -]?resident\b/i,
  /you(?:'re| are)? (?:probably |definitely )?(?:do(?:n'?t)? |don'?t )?(?:need to pay|have to pay|qualify|exempt(?:ed)?|eligible)[^.!?]{0,40}medicare/i,
  // "You can claim your boots" is a determination and must never send.
  // "We'll check WHAT you can claim" is a description of the service and must.
  //
  // Found in production, 27 Aug (Jo sent the card). The pattern was a bare
  // /you can (?:claim|deduct|write off)/ and it refused the very first reply to
  // every new lead:
  //     "We'll check your tax residency, what you can claim, Medicare, and make
  //      sure you're not missing anything you're entitled to."
  // That sentence determines nothing about anyone. It says what the service
  // looks at. And the approved corpus itself contains the same words twice —
  // "any deductions you can claim" (o_intro) and "or what you can claim"
  // (o4_mygov) — which only survived because a verbatim approved sentence is
  // exempt. The moment Will adapted the opening, exactly as the playbook tells
  // it to, its own approved wording was refused back at it.
  //
  // The distinction is grammatical, not semantic: in the safe form "you can
  // claim" is a relative clause hanging off a noun or a wh-word (what / any
  // deductions / anything), and the thing claimed is never named. In the unsafe
  // form it is the main clause and the thing IS named. So the lookbehind lists
  // the words that can only introduce the relative-clause reading.
  //
  // Deliberately narrow. Anything not in this list still fires, including the
  // bare sentence-initial "You can claim ...".
  /(?<!\b(?:what|whatever|whichever|which|that|anything|everything|nothing|something|whether|if|deductions?|expenses?|costs?|things?|items?)\s)you can (?:claim|deduct|write off)/i,
  /you (?:can(?:'?t| ?not)?|won'?t|will(?: not)?|don'?t|do not) owe/i,
  // "your refund will ..." is a determination — EXCEPT when what follows is
  // process rather than prediction. "Your refund will be paid into the account
  // you gave us" is the single most ordinary sentence said to a paying
  // customer, and blocking it would turn routine progress updates into manual
  // tasks. "Your refund will be around 1800" is still caught: "around" is not
  // in this list.
  /your (?:estimated |expected )?refund (?:will|would|should|is going to|is likely|is about|is around)(?!\s+(?:be\s+)?(?:paid|deposited|transferred|sent|processed|issued|released|go|land|arrive|show|take|hit|come)\b)/i,
  /you(?:'ll| will) (?:get|receive)[^.!?]{0,25}(?:refund|\$|back)/i,
  // WILL-AI-01: bare-number refund/return estimates (no $ sign, so the currency
  // guard misses them). Excludes the two fixed prices 220/385.
  /\b(?:your |the )?(?:tax )?(?:refund|return)\b[^.!?]{0,25}\b(?!220\b|385\b)\d{3,6}\b/i,
  /\byou(?:'ll| will|'d| would)?\s*(?:get|receive|be getting|be looking at)\b[^.!?]{0,25}\b(?!220\b|385\b)\d{3,6}\b/i,
  // The phrasings a model actually reaches for when it is hedging, all of which
  // walked straight past the list above. Verified passes before these existed:
  //   "Based on your payslips you should get around 3,800 back."
  //   "You are entitled to the Medicare exemption for your whole stay."
  //   "Your visa means you're taxed as a resident from day one."
  /\byou\s+should\s+(?:get|receive|be getting|be entitled|expect)\b/i,
  // "entitled to" only counts when it names an ACTUAL entitlement. A bare
  // "entitled to" is the sales language of the approved corpus — "so nothing
  // you're entitled to is missed", "every dollar you're entitled to" — and
  // flagging that would block four of the curated knowledge answers, i.e. the
  // best replies in the system, for saying nothing about anyone's tax at all.
  /\byou(?:'re| are|'ll be| will be)\s+entitled\s+to\s+(?:the\s+|a\s+|an\s+)?(?:medicare|tax[- ]free|exemption|deduction|rebate|offset|credit|refund of|\$)/i,
  /\byou(?:'re| are)\s+(?:being\s+)?taxed\s+as\b/i,
  /\byour\s+(?:visa|situation|case|circumstances)\s+means\b/i,
  // A hedge is still a determination: "roughly", "around", "ballpark" attached
  // to a refund is the number the customer will hold us to.
  /\b(?:roughly|around|about|approximately|ballpark|in the region of)\b[^.!?]{0,15}\b(?!220\b|385\b)\d{3,6}\b[^.!?]{0,15}\b(?:back|refund|return)\b/i,
];

const PRICE_NEGOTIATION = /(discount|% ?off|make it \d|do it for \d|special (deal|price|offer)|just for you[^.!?]{0,15}\d|one.time (deal|price|offer)|rabatt|nachlass|descuento|oferta especial|r[ée]duction|remise|rabais|sconto|desconto|割引|値引き)/i;
// Blocks Will from unilaterally promising to refund the customer's PAYMENT or to
// cancel. Precise on purpose: it must fire on transitive payment-refund promises
// ("refund your payment", "refund you $220", "money back", "cancel") but NOT on
// the noun ("eligible for a refund", "your tax refund", "super refund") nor on
// the approved guarantee ("refund the difference" / "refund you the difference").
const REFUND_PROMISE = /\b(we|i)\b[^.!?]{0,30}\b(?:cancel(?:led|ling)?|money\s?back|payment[^.!?]{0,20}\bback\b|refund\s+(?:you|your\s+(?:payment|fee|money)|the\s+(?:fee|payment|full|amount|\$?\d)))\b(?!\s+the\s+difference)/i;
// "never out of pocket" / "not out of pocket" — the exact over-promise that
// broke the Indigo conversation (a customer who owes was told they would get
// the fee back). It is now banned from every message, so any improvised reply
// that reaches for it is a refund promise. (Approved templates are exempt at the
// call site, and the phrase was removed from all of them.)
const OUT_OF_POCKET_PROMISE = /\bout of pocket\b|\baus eigener tasche\b|\bde (?:tu|su) bolsillo\b|\bde (?:ta|votre) poche\b|\bdi tasca (?:tua|propria)\b|\bdo (?:teu|seu) bolso\b|自己負担/i;
// A promise to give the customer their money back / a full refund, in every
// language Will speaks. The over-promise that has to be caught even when the
// deterministic English phrases above do not (Jo, 1 Sep: all rules, every
// language). The bare noun ("a refund", "reembolso", "Erstattung") is fine; only
// a FULL / total money-back promise trips it. Approved templates are exempt.
const MONEY_BACK_ML = /\b(?:money\s?back|full\s+refund)\b|\bgeld\s+zur(?:ü|ue)ck\b|\bvolle\s+(?:r[üue]ck)?erstattung\b|\bdinero\s+de\s+vuelta\b|\breembolso\s+(?:completo|total|íntegro|integro)\b|\bremboursement\s+(?:complet|total|int[ée]gral)\b|\brimborso\s+(?:completo|totale|integrale)\b|全額返金|返金します/i;
// A refund FIGURE stated as a bare number (no $ / currency word) next to a
// refund noun IN ANOTHER LANGUAGE. The currency-marked figures and the English
// "refund … <number>" case are already caught above (amountsInCents +
// TAX_DETERMINATION); this closes the one gap the audit found (Jo, 1 Sep):
// "Deine Erstattung beträgt 3800" in a non-English reply that now auto-sends.
// Only foreign refund nouns are listed here, so it adds no English false
// positives. Fixed prices and any year are excluded.
const REFUND_NOUN_ML =
  'erstattung|r[üu]ckerstattung|rueckerstattung|steuerr[üu]ckerstattung|reembolso|devoluci[óo]n|devolu[çc][ãa]o|remboursement|rimborso|restituzione|restitui[çc][ãa]o';
const REFUND_FIGURE_ML = new RegExp(
  '(?:' + REFUND_NOUN_ML + ')\\b[^.!?]{0,25}\\b(?!220\\b|385\\b|110\\b|19\\d\\d\\b|20\\d\\d\\b)\\d{3,6}\\b'
  + '|\\b(?!220\\b|385\\b|110\\b|19\\d\\d\\b|20\\d\\d\\b)\\d{3,6}\\b[^.!?]{0,25}\\b(?:' + REFUND_NOUN_ML + ')',
  'i',
);
// Japanese: 還付 / 返金 next to a (half- or full-width) 3-6 digit number.
const REFUND_FIGURE_JA = /[還付返金][^。！？!?]{0,15}[0-9０-９]{3,6}|[0-9０-９]{3,6}[^。！？!?]{0,15}[還付返金]/;
const POST_PAYMENT_SALES = /(\bfee\b|\bprice\b|\bcost\b|\bdiscount\b|guarantee|out of pocket|cover the (gap|difference)|refund the difference)/i;
const DIY_INSTRUCTIONS = /(do it yourself|lodge (it |your (tax )?return )?(yourself|on your own)|step[- ]by[- ]step|log ?in ?to mygov[^.!?]{0,40}(link|lodge|submit))/i;
// myGov / ATO ACCESS (the team's single biggest problem): Will must never
// troubleshoot or instruct a customer on myGov, the ATO portal, myGovID /
// Digital ID, IHI, the Medicare Entitlement Statement, account linking or
// login. This deterministic layer backs up the playbook rule. It fires only
// when a myGov/ATO-access TERM appears together with a customer-directed STEP
// cue, and NOT when the sentence is the allowed reassurance ("you don't need
// myGov, we handle it"), so the approved deflection still sends freely.
// `my.gov.au` is THE name of the site and `my ?gov` does not match it — the dot
// is not a space. A complete linking walkthrough that used the real domain
// passed every check. The ATO's own name is here for the same reason: the old
// list only matched "ATO" when it was followed by online/portal/account/login.
const MYGOV_TERMS = /\b(my ?gov|my\.gov(?:\.au)?|mygov ?id|ato (?:online|portal|account|login|app|website)|australian taxation office|\bato\b|digital id|myid|centrelink|services australia|ihi|individual healthcare identifier|medicare entitlement statement|\bmes\b)\b/i;
const MYGOV_STEP_CUE = /\b(?:log ?in|logging in|sign ?in|signing in|go to|head to|click|tap|press|select|choose|enter (?:your|the)|type in|open (?:the |your )?(?:app|link|page|site|portal|account)|create (?:an? )?(?:account|id|my ?gov ?id|digital id|profile)|set up (?:an? )?(?:account|id)|reset (?:your )?password|apply for (?:an? )?(?:ihi|mes|medicare entitlement|exemption|digital id)|link(?:ing)? (?:your|the) (?:my ?gov|ato|account)|connect (?:your|the) (?:my ?gov|ato)|verify your|follow (?:these|the|this) (?:steps|guide|link)|you (?:need|have|'ll need|will need) to (?:log|sign|go|click|create|apply|link|enter|select|open|reset|submit|set up|verify|connect)|try (?:logging|signing) in|try (?:again|it again)|submit (?:the )?(?:form|application|statement))\b/i;
const MYGOV_REASSURANCE = /\b(?:do(?:n'?t| not)|does(?:n'?t| not)|no need|never|without|won'?t|will not|you'?ll never|nothing to)\b[^.!?]{0,45}\b(?:need|have to|require|use|access|log ?in|sign ?in|worry|touch|deal with)\b|\b(?:we|our team|i)\b[^.!?]{0,45}\b(?:handle|take care of|takes care of|access|manage|deal with|look after|sort out|do (?:it |everything |all )?for you|on your behalf|through the ato)\b|leave (?:it|that|the my ?gov|everything)[^.!?]{0,25}\b(?:to us|with us|to me)\b/i;
// A benign device hint ("try again on a computer/laptop") is NOT portal
// troubleshooting: it names no site, no login and no step through a service, it
// only suggests a different device. Owner-approved for the Services Australia
// IHI/MES deflection (Jo, 31 Aug). Deliberately narrow: strictly
// "try (again) on/using a computer|laptop|...". Anything carrying a real
// instruction (log in, click, link, "try logging in") never matches this and
// stays caught below, because the clause is re-tested for a step cue AFTER this
// exact phrase is stripped out.
const MYGOV_BENIGN = /\btry\s+(?:again\s+|it\s+again\s+)?(?:on|using|with|from|in)\s+(?:a\s+|an\s+|your\s+|another\s+|a\s+different\s+|the\s+)?(?:computer|laptop|desktop|pc|mac|browser|different\s+device|another\s+device|other\s+device)\b/i;
// Prices are AUD, shown with the $ sign only. Any non-dollar currency next to a
// number is a hard violation, even if the number itself matches an allowed price
// (e.g. "220 euros" is a wrong-currency conversion and must never be sent).
const NON_DOLLAR_CURRENCY = new RegExp(
  `(?:€|£|¥|₪|₩|₺|₹|R\\$)\\s?\\d` +
  `|\\d[\\d.,]*\\s?(?:€|£|¥|₪|₩|₺|₹|R\\$|(?:euros?|eur|pounds?|libras?|sterline|quid|yen|jpy|francs?|kroner?|kronor?|reais?|pesos?|shekels?|rupees?|won)\\b)`,
  'i',
);
/**
 * Will must never answer "are you a bot?" — it hands off to a human instead.
 *
 * That is enforced on the INBOUND message, before the model runs, which is the
 * right place for it. But the inbound detector is prefix-anchored and misses
 * "bot or human?", "u a bot?", "real person?", "do you use AI to answer?" — and
 * when it misses, the question reaches the model and NOTHING here was checking
 * the answer. A reply like "Haha, real person here 😊" was allowed, and landed
 * in the approval queue as a one-click send. This is the backstop for that.
 */
const AI_IDENTITY_CLAIM =
  /\b(?:i(?:'| a)?m|i am|this is|you(?:'re| are) (?:talking|speaking|chatting) (?:to|with))\b[^.!?]{0,25}\b(?:a )?(?:real |actual |live |human )?(?:person|human|bot|robot|ai|machine|assistant|chatbot)\b/i;
const AI_IDENTITY_DENIAL =
  /\b(?:not|no)\b[^.!?]{0,15}\b(?:a )?(?:bot|robot|ai|machine|chatbot|computer|automated)\b|\b(?:real|actual|genuine) (?:person|human)\s+here\b|\b(?:i'?m|i am) (?:definitely |totally |absolutely )?(?:real|human)\b/i;

const PLACEHOLDER_LEFTOVER = /\{\{[A-Z_]+\}\}/;
const PROMPT_ECHO = /(master rule|operating rules|non-negotiable boundar|system prompt|objection library|approved messages|# current customer)/i;
const SENSITIVE_LEAK = /(password|api.?key|access token|secret key|admin (access|panel)|credentials)/i;
// Owner-approved exception (Jo, 31 Aug): the Xero document-signing link is a
// read-only portal for signing the return, not a login to any of our systems or
// to a tax/gov account. Support for it sometimes shares the portal's temporary
// password or names the "Forgot password" reset link. This is the ONLY place a
// password may appear, and only when the message is clearly about that Xero
// signing link. Deliberately narrow: it strips ONLY these exact benign phrases,
// so an API key, "admin access", "credentials", or a raw "your password is ..."
// (even next to the word Xero) is still caught by SENSITIVE_LEAK below.
const XERO_SIGNING = /\bxero\b/i;
const XERO_BENIGN_PWD = /\b(?:if it (?:asks|is asking) for a password|try\s+\d{4,}|forgot password|reset (?:your |the )?password)\b/gi;
const DASHES = /[—–―−]/; // — – ― −

export function policyGuard(rawText: string, ctx: GuardContext): GuardResult {
  const violations: string[] = [];
  // Every numeric check below is ASCII-only. Fold first, once, so a non-ASCII
  // numeral cannot walk past all of them at the same time.
  const text = normaliseDigits(rawText);

  // --- hard gates: is sending allowed at all? ---
  if (ctx.killSwitch) violations.push('KILL_SWITCH_ACTIVE');
  if (ctx.aiPaused) violations.push('AI_PAUSED_FOR_CUSTOMER');
  if (ctx.optedOut) violations.push('CUSTOMER_OPTED_OUT');
  if (ctx.isLegacy) violations.push('LEGACY_CHAT_AI_DISABLED');

  // --- Meta 24h customer-service window ---
  if (!ctx.isApprovedTemplate) {
    const last = ctx.lastCustomerMsgAt?.getTime() ?? 0;
    if (Date.now() - last > 24 * 60 * 60 * 1000) {
      violations.push('OUTSIDE_24H_WINDOW_NEEDS_TEMPLATE');
    }
  }

  // --- whole-message checks (never exempt) ---
  if (PLACEHOLDER_LEFTOVER.test(text)) violations.push('PLACEHOLDER_LEFTOVER');
  if (PROMPT_ECHO.test(text)) violations.push('PROMPT_ECHO');
  // Only in the Xero signing context, strip the approved benign password phrases
  // before the sensitive check, so the portal support message sends while any
  // other credential leak stays blocked.
  const sensText = XERO_SIGNING.test(text) ? text.replace(XERO_BENIGN_PWD, ' ') : text;
  if (SENSITIVE_LEAK.test(sensText)) violations.push('SENSITIVE_CONTENT');
  if (DASHES.test(text)) violations.push('EM_DASH_FORBIDDEN');
  if (NON_DOLLAR_CURRENCY.test(text)) violations.push('NON_DOLLAR_CURRENCY');
  if (AI_IDENTITY_CLAIM.test(text) || AI_IDENTITY_DENIAL.test(text)) {
    violations.push('AI_IDENTITY_ANSWER');
  }

  // myGov / ATO access, checked across the WHOLE message rather than per
  // sentence. Per sentence, splitting the walkthrough in two defeated it:
  //   "No stress about myGov. Open the app, tap Services, then select
  //    Australian Taxation Office and enter your TFN to link it."
  // Sentence one carries the term and no instruction; sentence two carries the
  // instruction and no term; neither is a violation on its own.
  // Verified safe against the approved corpus: no approved message contains a
  // myGov term and a step cue together, so this cannot block approved wording.
  //
  // Checked per CLAUSE, not per sentence and not per message. Per sentence the
  // walkthrough could be split in two. Per message, a single reassurance
  // anywhere excused everything after it ("We take care of it, but go to
  // my.gov.au and click Link a service"). Per clause, the reassurance excuses
  // only the clause it is actually in — which is the truthful reading, because
  // "you never need to log in" and "go to my.gov.au and click" are different
  // statements even when they share a sentence.
  if (MYGOV_TERMS.test(text) && MYGOV_STEP_CUE.test(text)) {
    const clauses = text.split(/[.!?\n]+|,\s+|\s+but\s+/i).map((c) => c.trim()).filter(Boolean);
    const instructing = clauses.some((c) => {
      if (MYGOV_REASSURANCE.test(c)) return false;
      // Strip the one allowed benign device hint, then a clause is instructing
      // only if a REAL portal step still survives. So "try again on a computer"
      // clears, but "log in on a computer" or "try logging in again" do not.
      const stripped = c.replace(MYGOV_BENIGN, ' ');
      return MYGOV_STEP_CUE.test(stripped);
    });
    if (instructing) violations.push('MYGOV_TROUBLESHOOTING');
  }

  // --- length (owner rule: replies must read like a person texting) ---
  // Only IMPROVISED content is measured. The approved messages carry required
  // detail (price, guarantee, bank details) and are legitimately long, so any
  // sentence that comes from the approved corpus is excluded from the count.
  // What is left is the model's own wording, and on WhatsApp that should be a
  // few short sentences. Past this much invented prose the reply has stopped
  // sounding like a team member and started sounding like a chatbot essay.
  // The model's own wording, with newlines flattened to spaces. Two uses:
  //  1. the length ceiling below;
  //  2. the money checks, because splitSentences() breaks on `\n+`, so a price
  //     laid out the way people actually format WhatsApp messages —
  //         "Our fee:\n50"
  //     became two sentences, neither of which could match a pattern that needs
  //     the money word and the number together.
  const improvised = splitSentences(text)
    .filter((s) => !isApprovedSentence(s))
    .join(' ');

  if (!ctx.isApprovedTemplate) {
    if (improvised.length > MAX_IMPROVISED_CHARS) violations.push('REPLY_TOO_LONG');
  }

  // --- sentence-level content checks with approved-corpus exemption ---
  const paid = ctx.paid || POST_PAYMENT_STATES.includes(ctx.state);
  const allowedCents = new Set<number>(paid ? [] : FIXED_PRICES_CENTS);
  if (ctx.estimateFromTeam != null) allowedCents.add(ctx.estimateFromTeam);

  let unguardedLanguage = false;

  // Money, re-checked across the flattened improvised text so a line break
  // cannot hide a price. Same allow-list as the per-sentence pass.
  for (const cents of amountsInCents(improvised)) {
    // The $300 substantiation threshold is a deduction/record-keeping fact, so
    // it is only allowed AFTER payment: before payment we give no personalised
    // tax advice at all, and an answer that reaches for it there must be held.
    if (!allowedCents.has(cents) && !(paid && isBenignThreshold(cents, improvised))) {
      violations.push(`FORBIDDEN_AMOUNT:${(cents / 100).toFixed(2)}`);
    }
  }
  // A price spelled out in words. No value is reported: the only correct way to
  // write a price here is $220 or $385, so words are wrong wording either way.
  if (WORD_AMOUNT_RE.test(improvised) && !WORD_AMOUNT_EXEMPT.test(improvised)) {
    violations.push('FORBIDDEN_AMOUNT:written-in-words');
  }

  for (const sentence of splitSentences(text)) {
    // Approved sentences skip the CONTENT-pattern checks, but the CONTEXTUAL
    // post-payment-sales gate still applies (H2/H4: never re-send sales content
    // to a paid customer, even if the wording is approved).
    if (isApprovedSentence(sentence)) {
      if (paid && POST_PAYMENT_SALES.test(sentence)) violations.push('SALES_CONTENT_AFTER_PAYMENT');
      continue;
    }

    // Amount check is language-agnostic (currency symbols + words in many languages).
    for (const cents of amountsInCents(sentence)) {
      if (!allowedCents.has(cents) && !(paid && isBenignThreshold(cents, sentence))) {
        violations.push(`FORBIDDEN_AMOUNT:${(cents / 100).toFixed(2)}`);
      }
    }
    // A bare-number refund figure in a foreign sentence with NO currency token
    // (e.g. German "Deine Erstattung beträgt 3800", Japanese "還付は3800です").
    // amountsInCents only sees currency-marked figures, so it misses these; this
    // catches a refund noun sitting next to a 3-6 digit number, minus the fixed
    // prices and 19xx/20xx years. Matters now that green foreign replies auto-send.
    if (!ctx.isApprovedTemplate && (REFUND_FIGURE_ML.test(sentence) || REFUND_FIGURE_JA.test(sentence))) {
      violations.push('FORBIDDEN_AMOUNT:foreign-refund-figure');
    }
    if (PRICE_NEGOTIATION.test(sentence)) violations.push('PRICE_NEGOTIATION');

    // Personal tax determinations and do-it-yourself instructions are blocked at
    // EVERY stage. These used to run only `if (!ctx.paid)`, which meant the same
    // sentence behaved differently depending on a flag the customer sets by
    // saying "I paid":
    //   "You are a foreign resident, so no Medicare levy applies to you."
    //      unpaid -> BLOCKED      paid -> ALLOWED
    //   "You can claim your boots, tools and phone bill."
    //      unpaid -> BLOCKED      paid -> ALLOWED
    // The rule is "Will never makes a personal tax determination", not "not
    // before payment" — the determination is the team's to make, and after
    // payment it is worth MORE, not less. Nothing is lost by holding these: a
    // blocked reply becomes a task carrying the text, for a human to send.
    for (const p of TAX_DETERMINATION) {
      if (p.test(sentence)) { violations.push('TAX_DETERMINATION'); break; }
    }
    if (DIY_INSTRUCTIONS.test(sentence)) violations.push('DIY_INSTRUCTIONS');
    if (paid && POST_PAYMENT_SALES.test(sentence)) violations.push('SALES_CONTENT_AFTER_PAYMENT');
    if (!ctx.isApprovedTemplate && (REFUND_PROMISE.test(sentence) || OUT_OF_POCKET_PROMISE.test(sentence) || MONEY_BACK_ML.test(sentence))) violations.push('REFUND_OR_CANCEL_PROMISE');

    // H5: a non-approved sentence in a language the English patterns can't cover.
    if (isLikelyNonEnglish(sentence)) unguardedLanguage = true;
  }

  return { allowed: violations.length === 0, violations: [...new Set(violations)], unguardedLanguage };
}
