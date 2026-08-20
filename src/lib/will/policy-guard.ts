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
  return out;
}

// ---------- language coverage (H5) ----------
// The lexical tax/DIY patterns below are English. Detect when a free-form reply
// is in a language they cannot cover, so the engine can route it to a human in
// Autopilot instead of sending an unreviewed off-policy message.
export function isLikelyNonEnglish(text: string): boolean {
  const t = text.replace(/https?:\S+/g, ' '); // ignore URLs
  // Any non-Latin script (CJK, Hebrew, Arabic, Cyrillic, Greek, Thai, Hangul) => non-English.
  if (/[Ѐ-ӿ֐-׿؀-ۿͰ-Ͽ฀-๿가-힯぀-ヿ一-鿿]/.test(t)) return true;
  const letters = (t.match(/[A-Za-zÀ-ÿ]/g) || []).length;
  if (letters < 8) return false; // too short to judge; treat as English (emojis, "ok")
  const accented = (t.match(/[À-ÿ]/g) || []).length;
  if (accented / letters > 0.08) return true; // heavy diacritics => romance/other language
  // Distinctive non-English words (greetings / thanks / common function words).
  if (/\b(el|la|los|las|und|der|die|das|ich|nicht|je|le|les|une|vous|ist|para|com|n[aã]o|voc[eê]|wir|por|con|pero|como|muy|tu|usted|gracias|hola|bonjour|merci|bitte|danke|ciao|grazie|prego|obrigad\w*|ol[aá]|guten|hallo|sehr|gerne|kein)\b/i.test(t)) return true;
  return false;
}

// ---------- pattern sets ----------
const TAX_DETERMINATION: RegExp[] = [
  /you(?:'re| are|'d be| would be| will be)(?: probably| definitely| likely)?(?: considered)?(?: an?| a)?\s*(?:australian |tax |non-?)*resident/i,
  /you(?:'re| are)? (?:probably |definitely )?(?:do(?:n'?t)? |don'?t )?(?:need to pay|have to pay|qualify|exempt(?:ed)?|eligible)[^.!?]{0,40}medicare/i,
  /you can (?:claim|deduct|write off)/i,
  /you (?:can(?:'?t| ?not)?|won'?t|will(?: not)?|don'?t|do not) owe/i,
  /your (?:estimated |expected )?refund (?:will|would|should|is going to|is likely|is about|is around)/i,
  /you(?:'ll| will) (?:get|receive)[^.!?]{0,25}(?:refund|\$|back)/i,
];

const PRICE_NEGOTIATION = /(discount|% ?off|make it \d|do it for \d|special (deal|price|offer)|just for you[^.!?]{0,15}\d|one.time (deal|price|offer))/i;
const REFUND_PROMISE = /\b(we|i)\b[^.!?]{0,50}\b(?:refund(?!\s+the\s+difference)(?:ed|ing)?|cancel(?:led|ling)?|money\s?back|payment[^.!?]{0,25}\bback)\b/i;
const POST_PAYMENT_SALES = /(\bfee\b|\bprice\b|\bcost\b|\bdiscount\b|guarantee|out of pocket|cover the (gap|difference)|refund the difference)/i;
const DIY_INSTRUCTIONS = /(do it yourself|lodge (it |your (tax )?return )?(yourself|on your own)|step[- ]by[- ]step|log ?in ?to mygov[^.!?]{0,40}(link|lodge|submit))/i;
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
    if (paid && POST_PAYMENT_SALES.test(sentence)) violations.push('SALES_CONTENT_AFTER_PAYMENT');
    if (!ctx.isApprovedTemplate && REFUND_PROMISE.test(sentence)) violations.push('REFUND_OR_CANCEL_PROMISE');

    // H5: a non-approved sentence in a language the English patterns can't cover.
    if (isLikelyNonEnglish(sentence)) unguardedLanguage = true;
  }

  return { allowed: violations.length === 0, violations: [...new Set(violations)], unguardedLanguage };
}
