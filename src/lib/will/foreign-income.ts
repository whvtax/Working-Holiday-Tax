// ============================================================
// FOREIGN INCOME COSTS $110 MORE (Jo, 12 Oct).
//
// Alice: "I worked in Australia on a Working Holiday visa until February
// 2026, and I also need to report foreign income." A return that has to
// report income earned outside Australia is more work, so the fee is the
// usual one plus $110: TFN $330, TFN + ABN $495.
// ============================================================

export const FOREIGN_SURCHARGE_AUD = 110;
export const FOREIGN_PRICES = { TFN: 330, TFN_ABN: 495 } as const;

/** Customer words that mean they have income from outside Australia to
 *  report. Never "I'm overseas now" alone: living abroad is not foreign
 *  income. */
export const FOREIGN_INCOME_RE = new RegExp([
  'foreign income', 'overseas income', 'income (?:from )?(?:overseas|abroad|outside (?:of )?australia)',
  'income (?:from|in) my (?:home )?country', 'foreign (?:salary|wages?|employment|pension|dividends?|rental|interest)',
  '(?:worked|working|job|employ(?:ed|ment)) (?:overseas|abroad|outside (?:of )?australia) (?:during|in|for) (?:the|this|that) (?:tax |financial |income )?year',
  'report (?:my |the |some )?(?:foreign|overseas) income', 'income from (?:germany|japan|the uk|uk|france|italy|spain|korea|taiwan|ireland|canada|the us|usa|new zealand|nz|abroad)',
  'ausl[äa]ndische(?:s|n)? einkommen', 'einkommen aus (?:dem ausland|deutschland)', 'einkünfte aus dem ausland', 'auslandseinkünfte',
  '海外(?:の)?(?:収入|所得)', '日本(?:で|の)(?:収入|所得)', '国外(?:の)?(?:収入|所得)',
  'ingresos (?:del extranjero|extranjeros|de otro pa[íi]s)', 'revenus (?:de l\'[ée]tranger|[ée]trangers)', 'reddito (?:estero|dall\'estero)', 'rendimentos? (?:do exterior|estrangeiros?)',
].join('|'), 'i');

/** Negations: "no foreign income", "I don't have any overseas income". */
const NO_FOREIGN_RE = /\b(?:no|not any|don'?t have(?: any)?|didn'?t have(?: any)?|without(?: any)?|never had(?: any)?)\s+(?:foreign|overseas)\s+income/i;

export function mentionsForeignIncome(text: string | null | undefined): boolean {
  const t = (text ?? '').trim();
  if (!t || NO_FOREIGN_RE.test(t)) return false;
  return FOREIGN_INCOME_RE.test(t);
}

/** Anything the customer has written in this conversation. */
export function hasForeignIncome(customerTexts: (string | null | undefined)[]): boolean {
  return customerTexts.some((t) => mentionsForeignIncome(t));
}
