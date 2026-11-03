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

/** "No ABN", "without an ABN", "I don't have an ABN", "TFN only", "never worked
 *  under an ABN", "only an employee". */
export const NO_ABN_RE = /\b(?:no|without|never had|never used|never worked (?:\w+ ){0,2}(?:under|with|on)|don'?t have|do not have|didn'?t have|did not have|haven'?t (?:got|had)|have not (?:got|had)|not (?:on|under|with) an?|kein(?:e|en)? |ohne |sin |sans |senza |sem )\s*(?:an? |my |any )?abn\b|\babn\s*[:\-]?\s*(?:no|none|nope)\b|\btfn only\b|\bonly (?:a |on a |on my |my )?tfn\b|\b(?:just|only) (?:a |on a |on my |my )?tfn\b|\b(?:only|just)\s+(?:worked\s+|been\s+|work\s+)?(?:as\s+)?(?:an?\s+)?employee|\bnur (?:mit )?(?:der )?tfn\b|\bnur angestellt|abn(?:は|が)?(?:ない|なし|持っていない|ありません)/i;

/** "not self-employed", "I'm not a contractor", "never a sole trader". */
export const NOT_SELF_EMPLOYED_RE = /\b(?:not|never|wasn'?t|weren'?t|isn'?t|aren'?t|no)\s+(?:been\s+|working\s+as\s+|worked\s+as\s+)?(?:an?\s+)?(?:self[- ]employed|sole trader|contractor|freelanc\w*)|nicht selbst[äa]ndig|(?:個人事業|フリーランス)(?:では|じゃ)ない/i;

/** Does anything the customer wrote say they have ABN income?
 *  Sentence by sentence (a question is not income), then clause by clause
 *  (Jo, 3 Nov: "only an employee, no ABN" and "I was not self-employed" still
 *  got the $385 option because one trigger word survived the negation). */
export function hasAbnIncome(customerTexts: Array<string | null | undefined>): boolean {
  for (const raw of customerTexts) {
    const text = (raw ?? '').trim();
    if (!text) continue;
    for (const sentence of text.split(/(?<=[.!?。！？\n])\s*/)) {
      const s = sentence.trim();
      if (!s || /[?？]\s*$/.test(s)) continue; // a question about ABN is not ABN income
      for (const clause of s.split(/[,;，、]\s*|\s+(?:but|however|although|aber|mais)\s+/i)) {
        const c = clause.trim();
        if (!c || NO_ABN_RE.test(c) || NOT_SELF_EMPLOYED_RE.test(c)) continue;
        if (ABN_INCOME_RE.test(c)) return true;
      }
    }
  }
  return false;
}

/** Has the customer already ANSWERED the ABN question, either way?
 *  A TFN-only customer must not be asked about ABN work again (Jo, 3 Nov:
 *  asked repeatedly after "yep tfn only"). Statements only, not questions. */
export function abnQuestionAnswered(customerTexts: Array<string | null | undefined>): boolean {
  if (hasAbnIncome(customerTexts)) return true;
  for (const raw of customerTexts) {
    for (const sentence of (raw ?? '').split(/(?<=[.!?。！？\n])\s*/)) {
      const s = sentence.trim();
      if (!s || /[?？]\s*$/.test(s)) continue;
      if (NO_ABN_RE.test(s) || NOT_SELF_EMPLOYED_RE.test(s)) return true;
    }
    // A bare "yes TFN" / "TFN" / "tfn only" / "just tfn" reply.
    if (/^\s*(?:yes?s?,?\s*|yep,?\s*)?(?:tfn|only tfn|tfn only|just tfn)[\s.!😊]*$/i.test(raw ?? '')) return true;
  }
  return false;
}

/** The ABN prices: a draft quoting either of these is an ABN return. */
export const ABN_PRICE_RE = /\$\s?(?:385|495)\b/;
