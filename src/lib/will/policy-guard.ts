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
const FIXED_PRICES_CENTS = [22000, 38500];
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
  // not a duration, a percentage, a time, or a tax year
  `(?!\\s*(?:%|percent|weeks?|days?|months?|years?|minutes?|hours?|am|pm))`,
  'gi',
);
/** Four-digit values that are plainly a tax year, not a price. */
const LOOKS_LIKE_YEAR = /^(19|20)\d{2}$/;

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
  /you can (?:claim|deduct|write off)/i,
  /you (?:can(?:'?t| ?not)?|won'?t|will(?: not)?|don'?t|do not) owe/i,
  /your (?:estimated |expected )?refund (?:will|would|should|is going to|is likely|is about|is around)/i,
  /you(?:'ll| will) (?:get|receive)[^.!?]{0,25}(?:refund|\$|back)/i,
  // WILL-AI-01: bare-number refund/return estimates (no $ sign, so the currency
  // guard misses them). Excludes the two fixed prices 220/385.
  /\b(?:your |the )?(?:tax )?(?:refund|return)\b[^.!?]{0,25}\b(?!220\b|385\b)\d{3,6}\b/i,
  /\byou(?:'ll| will|'d| would)?\s*(?:get|receive|be getting|be looking at)\b[^.!?]{0,25}\b(?!220\b|385\b)\d{3,6}\b/i,
];

const PRICE_NEGOTIATION = /(discount|% ?off|make it \d|do it for \d|special (deal|price|offer)|just for you[^.!?]{0,15}\d|one.time (deal|price|offer))/i;
// Blocks Will from unilaterally promising to refund the customer's PAYMENT or to
// cancel. Precise on purpose: it must fire on transitive payment-refund promises
// ("refund your payment", "refund you $220", "money back", "cancel") but NOT on
// the noun ("eligible for a refund", "your tax refund", "super refund") nor on
// the approved guarantee ("refund the difference" / "refund you the difference").
const REFUND_PROMISE = /\b(we|i)\b[^.!?]{0,30}\b(?:cancel(?:led|ling)?|money\s?back|payment[^.!?]{0,20}\bback\b|refund\s+(?:you|your\s+(?:payment|fee|money)|the\s+(?:fee|payment|\$?\d)))\b(?!\s+the\s+difference)/i;
const POST_PAYMENT_SALES = /(\bfee\b|\bprice\b|\bcost\b|\bdiscount\b|guarantee|out of pocket|cover the (gap|difference)|refund the difference)/i;
const DIY_INSTRUCTIONS = /(do it yourself|lodge (it |your (tax )?return )?(yourself|on your own)|step[- ]by[- ]step|log ?in ?to mygov[^.!?]{0,40}(link|lodge|submit))/i;
// myGov / ATO ACCESS (the team's single biggest problem): Will must never
// troubleshoot or instruct a customer on myGov, the ATO portal, myGovID /
// Digital ID, IHI, the Medicare Entitlement Statement, account linking or
// login. This deterministic layer backs up the playbook rule. It fires only
// when a myGov/ATO-access TERM appears together with a customer-directed STEP
// cue, and NOT when the sentence is the allowed reassurance ("you don't need
// myGov, we handle it"), so the approved deflection still sends freely.
const MYGOV_TERMS = /\b(my ?gov|mygov ?id|ato (?:online|portal|account|login|app|website)|digital id|myid|centrelink|services australia|ihi|individual healthcare identifier|medicare entitlement statement|\bmes\b)\b/i;
const MYGOV_STEP_CUE = /\b(?:log ?in|logging in|sign ?in|signing in|go to|head to|click|tap|press|select|choose|enter (?:your|the)|type in|open (?:the |your )?(?:app|link|page|site|portal|account)|create (?:an? )?(?:account|id|my ?gov ?id|digital id|profile)|set up (?:an? )?(?:account|id)|reset (?:your )?password|apply for (?:an? )?(?:ihi|mes|medicare entitlement|exemption|digital id)|link(?:ing)? (?:your|the) (?:my ?gov|ato|account)|connect (?:your|the) (?:my ?gov|ato)|verify your|follow (?:these|the|this) (?:steps|guide|link)|you (?:need|have|'ll need|will need) to (?:log|sign|go|click|create|apply|link|enter|select|open|reset|submit|set up|verify|connect)|try (?:logging|signing) in|try (?:again|it again)|submit (?:the )?(?:form|application|statement))\b/i;
const MYGOV_REASSURANCE = /\b(?:do(?:n'?t| not)|does(?:n'?t| not)|no need|never|without|won'?t|will not|you'?ll never|nothing to)\b[^.!?]{0,45}\b(?:need|have to|require|use|access|log ?in|sign ?in|worry|touch|deal with)\b|\b(?:we|our team|i)\b[^.!?]{0,45}\b(?:handle|take care of|takes care of|access|manage|deal with|look after|sort out|do (?:it |everything |all )?for you|on your behalf|through the ato)\b|leave (?:it|that|the my ?gov|everything)[^.!?]{0,25}\b(?:to us|with us|to me)\b/i;
// Prices are AUD, shown with the $ sign only. Any non-dollar currency next to a
// number is a hard violation, even if the number itself matches an allowed price
// (e.g. "220 euros" is a wrong-currency conversion and must never be sent).
const NON_DOLLAR_CURRENCY = new RegExp(
  `(?:€|£|¥|₪|₩|₺|₹|R\\$)\\s?\\d` +
  `|\\d[\\d.,]*\\s?(?:€|£|¥|₪|₩|₺|₹|R\\$|(?:euros?|eur|pounds?|libras?|sterline|quid|yen|jpy|francs?|kroner?|kronor?|reais?|pesos?|shekels?|rupees?|won)\\b)`,
  'i',
);
const PLACEHOLDER_LEFTOVER = /\{\{[A-Z_]+\}\}/;
const PROMPT_ECHO = /(master rule|operating rules|non-negotiable boundar|system prompt|objection library|approved messages|# current customer)/i;
const SENSITIVE_LEAK = /(password|api.?key|access token|secret key|admin (access|panel)|credentials)/i;
const DASHES = /[—–―−]/; // — – ― −

export function policyGuard(text: string, ctx: GuardContext): GuardResult {
  const violations: string[] = [];

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
  if (SENSITIVE_LEAK.test(text)) violations.push('SENSITIVE_CONTENT');
  if (DASHES.test(text)) violations.push('EM_DASH_FORBIDDEN');
  if (NON_DOLLAR_CURRENCY.test(text)) violations.push('NON_DOLLAR_CURRENCY');

  // --- length (owner rule: replies must read like a person texting) ---
  // Only IMPROVISED content is measured. The approved messages carry required
  // detail (price, guarantee, bank details) and are legitimately long, so any
  // sentence that comes from the approved corpus is excluded from the count.
  // What is left is the model's own wording, and on WhatsApp that should be a
  // few short sentences. Past this much invented prose the reply has stopped
  // sounding like a team member and started sounding like a chatbot essay.
  if (!ctx.isApprovedTemplate) {
    const improvised = splitSentences(text)
      .filter((s) => !isApprovedSentence(s))
      .join(' ');
    if (improvised.length > MAX_IMPROVISED_CHARS) violations.push('REPLY_TOO_LONG');
  }

  // --- sentence-level content checks with approved-corpus exemption ---
  const paid = ctx.paid || POST_PAYMENT_STATES.includes(ctx.state);
  const allowedCents = new Set<number>(paid ? [] : FIXED_PRICES_CENTS);
  if (ctx.estimateFromTeam != null) allowedCents.add(ctx.estimateFromTeam);

  let unguardedLanguage = false;

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
      if (!allowedCents.has(cents)) {
        violations.push(`FORBIDDEN_AMOUNT:${(cents / 100).toFixed(2)}`);
      }
    }
    if (PRICE_NEGOTIATION.test(sentence)) violations.push('PRICE_NEGOTIATION');

    if (!ctx.paid) {
      for (const p of TAX_DETERMINATION) {
        if (p.test(sentence)) { violations.push('TAX_DETERMINATION_BEFORE_PAYMENT'); break; }
      }
      if (DIY_INSTRUCTIONS.test(sentence)) violations.push('DIY_INSTRUCTIONS');
    }
    // myGov / ATO-access troubleshooting is blocked at every stage (before AND
    // after payment): the reassurance is allowed, step-by-step help never is.
    if (MYGOV_TERMS.test(sentence) && MYGOV_STEP_CUE.test(sentence) && !MYGOV_REASSURANCE.test(sentence)) {
      violations.push('MYGOV_TROUBLESHOOTING');
    }
    if (paid && POST_PAYMENT_SALES.test(sentence)) violations.push('SALES_CONTENT_AFTER_PAYMENT');
    if (!ctx.isApprovedTemplate && REFUND_PROMISE.test(sentence)) violations.push('REFUND_OR_CANCEL_PROMISE');

    // H5: a non-approved sentence in a language the English patterns can't cover.
    if (isLikelyNonEnglish(sentence)) unguardedLanguage = true;
  }

  return { allowed: violations.length === 0, violations: [...new Set(violations)], unguardedLanguage };
}
