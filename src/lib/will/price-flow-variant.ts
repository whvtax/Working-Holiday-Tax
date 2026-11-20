/**
 * Two-message price flow, A/B tested against the current one-message price.
 *
 *   old   the current single price message (APPROVED.price_tfn / price_tfn_abn)
 *   new   message 1 (the steps and the "Want me to send the payment details?"
 *         question), then message 2 (bank details) only after the customer says yes.
 *
 * The setting `price_flow_variant` takes one of: 'old', 'new', 'split'.
 *   split  a fixed 50/50 by customer id, so the same customer always gets the
 *          same version. Every conversation is tagged with its version.
 * Jo, 18 Nov (decision): the two-message flow is the standard. Unset or unknown values
 * behave as 'new'. 'old' and 'split' stay available from the System & Costs card.
 */

import { langOf, nineLanguages, type Lang } from './i18n';

export type PriceFlowSetting = 'old' | 'new' | 'split';
export type PriceFlowVariant = 'old' | 'new';

export const PRICE_FLOW_SETTING_KEY = 'price_flow_variant';

/** Stable 32-bit hash of a string (FNV-1a). */
function hash32(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

export function normalisePriceFlowSetting(raw: unknown): PriceFlowSetting {
  return raw === 'old' || raw === 'split' ? raw : 'new';
}

/** Which version this customer gets. Deterministic for a given customer id. */
export function priceFlowVariantFor(customerId: string, setting: unknown): PriceFlowVariant {
  const s = normalisePriceFlowSetting(setting);
  if (s === 'old') return 'old';
  if (s === 'new') return 'new';
  return hash32(customerId) % 2 === 0 ? 'old' : 'new';
}

/** The closing question of message 1, in English. The 16 Nov wording ("Want me to send...") is
 *  still recognised for chats already in progress. Every language: priceFlowAsksForDetails. */
export const PRICE_FLOW_QUESTION_RE = /(?:Shall I|Want me to) send the payment details\?\s*$/;

/** Message 1 of the new flow (TFN). Jo, 18 Nov (template review, FINAL). */
export const PRICE_FLOW_STEPS_TFN = `Got it, TFN option! Here's how it works:

1. Pay $220.
2. Fill out a short form (details, expenses, Medicare & tax residency test).
3. We prepare your tax return and send it for review and signature.

If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.

Shall I send the payment details?`;

/** Message 1 of the new flow (TFN + ABN). Jo, 18 Nov (template review, FINAL). No guarantee: TFN only. */
export const PRICE_FLOW_STEPS_TFN_ABN = `Got it, TFN + ABN option! Here's how it works:

1. Pay $385.
2. Fill out a short form (details, expenses, Medicare & tax residency test).
3. We prepare your tax return, including your ABN income and expenses, and send it for review and signature.

Shall I send the payment details?`;

/** Message 1 with foreign income (TFN). Jo, 18 Nov (template review 19). No guarantee: domestic TFN only. */
export const PRICE_FLOW_STEPS_TFN_FOREIGN = `Got it, TFN option with foreign income! Here's how it works:

1. Pay $330.
2. Fill out a short form (details, expenses, Medicare & tax residency test).
3. We prepare your tax return, including your foreign income, and send it for review and signature.

Shall I send the payment details?`;

/** Message 1 with foreign income (TFN + ABN). Jo, 18 Nov (template review 19). No guarantee. */
export const PRICE_FLOW_STEPS_TFN_ABN_FOREIGN = `Got it, TFN + ABN option with foreign income! Here's how it works:

1. Pay $495.
2. Fill out a short form (details, expenses, Medicare & tax residency test).
3. We prepare your tax return, including your foreign income and your ABN income and expenses, and send it for review and signature.

Shall I send the payment details?`;

/** Jo, 18 Nov (decision): the two-message flow is the standard for EVERY language. Message 1 per
 *  track, in all nine languages (the translators' wording, verbatim; decision 018). */
export type PriceFlowTrack = 'TFN' | 'TFN_ABN' | 'TFN_FOREIGN' | 'TFN_ABN_FOREIGN';
export const PRICE_FLOW_STEPS: Record<PriceFlowTrack, Record<Lang, string>> = {
  TFN: nineLanguages('PRICE_FLOW_STEPS_TFN', PRICE_FLOW_STEPS_TFN),
  TFN_ABN: nineLanguages('PRICE_FLOW_STEPS_TFN_ABN', PRICE_FLOW_STEPS_TFN_ABN),
  TFN_FOREIGN: nineLanguages('PRICE_FLOW_STEPS_TFN_FOREIGN', PRICE_FLOW_STEPS_TFN_FOREIGN),
  TFN_ABN_FOREIGN: nineLanguages('PRICE_FLOW_STEPS_TFN_ABN_FOREIGN', PRICE_FLOW_STEPS_TFN_ABN_FOREIGN),
};

/** Message 1 for a track, in the customer's language (English for a language outside the nine). */
export function priceFlowSteps(track: 'TFN' | 'TFN_ABN', foreign: boolean, lang?: string | null): string {
  const key: PriceFlowTrack = foreign ? (track === 'TFN_ABN' ? 'TFN_ABN_FOREIGN' : 'TFN_FOREIGN') : track;
  return PRICE_FLOW_STEPS[key][langOf(lang)];
}

/** Message 2's wording per language, with ${AMOUNT} where the amount goes. */
export const PRICE_FLOW_PAYMENT_DETAILS_TEXT: Record<Lang, string> = nineLanguages('PRICE_FLOW_PAYMENT_DETAILS',
  'Perfect, here are the payment details:\n\nBSB: 062692\nAccount: 81049952\nAmount: ${AMOUNT}\n\nSend a screenshot once paid and we\'ll get started!',
);

/** Message 2, sent only after the customer says yes, three to five minutes later.
 *  Jo, 18 Nov (template review, FINAL): a linking word for the "yes", and the amount next to
 *  the bank details, because the price was said in the message before. In the customer's language. */
export function priceFlowPaymentDetails(amount: 220 | 385 | 330 | 495, lang?: string | null): string {
  // "${AMOUNT}" is the dollar sign followed by the {AMOUNT} slot: the "$" stays, the slot gets the number.
  return PRICE_FLOW_PAYMENT_DETAILS_TEXT[langOf(lang)].replace('${AMOUNT}', () => `$${amount}`);
}

/** The amount message 1 quoted: $385 / $330 / $495 when it says so, otherwise $220. Works on
 *  every language's steps message (the amounts are always written $220 ... $495) and on full-width
 *  digits or a full-width dollar sign. */
export function priceFlowAmountFrom(stepsMessage: string | null | undefined): 220 | 385 | 330 | 495 {
  const t = (stepsMessage ?? '').replace(/[０-９]/g, (d) => String(d.charCodeAt(0) - 0xff10)).replace(/＄/g, '$');
  const m = /\$\s?(385|330|495)(?!\d)/.exec(t);
  return m ? (Number(m[1]) as 385 | 330 | 495) : 220;
}

const lastLine = (t: string) => {
  const lines = t.trim().split('\n').map((l) => l.trim()).filter(Boolean);
  return lines[lines.length - 1] ?? '';
};
const normQ = (t: string) => t.replace(/[\s\u00a0]+/g, ' ').trim().toLowerCase();
/** The closing question of message 1 in each language: the last line of each translation. */
const CLOSING_QUESTIONS: ReadonlySet<string> = new Set(
  Object.values(PRICE_FLOW_STEPS).flatMap((byLang) => Object.values(byLang).map((t) => normQ(lastLine(t)))),
);

/** Did our message end with "Shall I send the payment details?" in any of the nine languages? */
export function priceFlowAsksForDetails(ourMessage: string | null | undefined): boolean {
  const t = (ourMessage ?? '').trim();
  if (!t) return false;
  return PRICE_FLOW_QUESTION_RE.test(t) || CLOSING_QUESTIONS.has(normQ(lastLine(t)));
}

/** A "yes" to that question, in the nine languages. Short replies only: anything with a question
 *  in it, or a long message, goes to Will as before. */
const YES_TO_DETAILS = new RegExp([
  // en (the list before 18 Nov)
  '(?:yes|yeah|yep|yup|yes please|sure|ok|okay|please)(?![\\p{L}])',
  // de
  '(?:ja|jawohl|gerne|gern|klar|ja bitte)(?![\\p{L}])',
  // ja
  'はい', 'お願いします', 'おねがいします', 'ええ', 'うん', '大丈夫です',
  // es / it / pt / fr
  // A bare "si" is also Spanish and Italian for "if", so it counts only on its own.
  '(?:sí|claro|vale|por favor|dale)(?![\\p{L}])', 'si[\\s!.,😊👍]*$', '(?:sì|certo|va bene|perfetto)(?![\\p{L}])',
  '(?:sim|claro|pode sim|pode mandar|por favor)(?![\\p{L}])', '(?:oui|ouais|d\'accord|volontiers|stp|s\'il te plaît)(?![\\p{L}])',
  // zh
  '是', '好', '要', '可以', '行', '嗯', '对',
  // vi
  '(?:có|vâng|dạ có|dạ được|dạ vâng|ừ|được|gửi đi|gửi giúp)(?![\\p{L}])',
].map((x) => `^\\s*${x}`).join('|'), 'iu');
export function saysYesToPaymentDetails(text: string | null | undefined): boolean {
  const t = (text ?? '').trim();
  if (!t || t.length > 60 || /[?？]/.test(t)) return false;
  return YES_TO_DETAILS.test(t);
}

/** The TFN version, kept under its old name for callers that only need its shape. */
export const PRICE_FLOW_PAYMENT_DETAILS = priceFlowPaymentDetails(220);
