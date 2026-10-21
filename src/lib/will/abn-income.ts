// ============================================================
// ABN INCOME MEANS NO GUARANTEE (Jo, 21 Oct, Norina +33 7 62).
//
// "Not automatically in every message, but when the customer says from the
// start that they have an ABN, i.e. ABN income, drop the commitment sentence."
// She wrote "self-employed Uber Eats delivery driver (with an ABN)", got the
// TFN + ABN price message, and it carried "If your tax refund is less than our
// fee, we'll refund the difference. If there's no refund, our full fee
// applies." Same rule as foreign income (12 Oct) and as Jo's original 29 Aug
// rule ("יש ABN, אין התחייבות להחזר כספי, היא יורדת"), which the 27 Sep
// "everyone" wording had overwritten.
//
// A TFN-only customer keeps the guarantee exactly as before.
// ============================================================

/** Customer words that mean they HAVE ABN income (not a question about it). */
const ABN_INCOME_RE = new RegExp([
  '\\babn\\b',
  'self[- ]employed', 'sole trader', 'contractor', 'freelanc', 'auto-?entrepreneur', 'selbstst[äa]ndig', 'aut[óo]nom[oa]',
  'uber ?eats', 'doordash', 'menulog', 'deliveroo', '\\bdidi\\b', 'hungry ?panda', 'airtasker',
  '個人事業', 'フリーランス', 'ウーバー',
].join('|'), 'i');

/** "No ABN", "without an ABN", "I don't have an ABN", "TFN only". */
const NO_ABN_RE = /\b(?:no|without|never had|don'?t have|do not have|didn'?t have|not on an?|kein(?:e)? |sin |sans |senza |sem )\s*(?:an? )?abn\b|\btfn only\b|\bonly (?:a |on a |on my )?tfn\b|abn(?:は|が)?(?:ない|なし|持っていない)/i;

/** Does anything the customer wrote say they have ABN income?
 *  Sentence by sentence, so "Do I need an ABN?" is a question, not income. */
export function hasAbnIncome(customerTexts: Array<string | null | undefined>): boolean {
  for (const raw of customerTexts) {
    const text = (raw ?? '').trim();
    if (!text) continue;
    for (const sentence of text.split(/(?<=[.!?。！？\n])\s*/)) {
      const s = sentence.trim();
      if (!s || /[?？]\s*$/.test(s)) continue; // a question about ABN is not ABN income
      if (NO_ABN_RE.test(s)) continue;
      if (ABN_INCOME_RE.test(s)) return true;
    }
  }
  return false;
}

/** The ABN prices: a draft quoting either of these is an ABN return. */
export const ABN_PRICE_RE = /\$\s?(?:385|495)\b/;
