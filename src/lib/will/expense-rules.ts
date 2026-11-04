// ============================================================
// ATO EXPENSE RULES, AS CODE (Jo, 3 Nov: "yes, the ATO rules, automatic").
//
// A paid customer lists or asks about expenses ("Ubers and trains to work",
// "lunch", "jeans and sneakers", "tools"). The ATO rules already live in the
// playbook as prose; this module applies the same rules deterministically, so
// the verdict for the obvious items does not depend on what the model felt
// that day. It never decides a return: it returns, per item, one of
//   not_claimable  - the ATO rule says no (private or everyday cost)
//   needs_detail   - it depends, and the one question that decides it
//   claimable      - claimable when the three rules are met (work use, own
//                    money, a record)
// and Will receives it as a verified hint, then writes the reply in the
// customer's language. The team still confirms everything in the review.
//
// Source: ato.gov.au, Work-related expenses (three golden rules, clothing,
// travel, phone, working from home, tools, self-education).
// Never a dollar figure and never "will be accepted".
// ============================================================

export type ExpenseVerdict = 'not_claimable' | 'needs_detail' | 'claimable';

export interface ExpenseItemResult {
  item: string;
  verdict: ExpenseVerdict;
  /** The ATO rule in one plain sentence (English, for Will to put in the customer's words). */
  rule: string;
  /** The one question that decides it, for needs_detail. */
  ask?: string;
}

interface RuleDef {
  item: string;
  re: RegExp;
  verdict: ExpenseVerdict;
  rule: string;
  ask?: string;
}

const RULES: RuleDef[] = [
  {
    item: 'travel between home and work',
    re: /\b(?:ubers?|taxis?|cabs?|trains?|buses|bus|trams?|metro|opal|myki|commute|commuting|travel(?:l?ed|ing)? (?:to|from) work|home to work|to and from work|petrol to work|fuel to work|parking at work|work parking)\b/i,
    verdict: 'not_claimable',
    rule: 'Travel between home and your regular workplace is private travel and generally cannot be claimed, including Ubers, trains and buses. Travel between two work sites, or to a temporary work location, can be different.',
  },
  {
    item: 'meals and lunch',
    re: /\b(?:lunch|dinner|breakfast|coffee|meals?|food|snacks?|groceries|takeaway|take away)\b/i,
    verdict: 'not_claimable',
    rule: 'Everyday meals and lunch are private expenses and cannot be claimed, even when you eat them at work.',
  },
  {
    item: 'everyday clothing',
    re: /\b(?:jeans|sneakers|trainers|shoes|t-?shirts?|shirts?|trousers|pants|dress|jacket|hoodie|socks|black clothes|normal clothes|everyday clothes|plain clothes)\b/i,
    verdict: 'needs_detail',
    rule: 'Ordinary or everyday clothing (jeans, sneakers, plain shirts) is private and cannot be claimed, even if your employer asks you to wear a colour. Only protective clothing, a uniform with a logo, or compulsory occupation-specific clothing can be claimed.',
    ask: 'Was it protective clothing (high-vis, safety boots), a uniform with the company logo, or everyday clothing?',
  },
  {
    item: 'protective clothing and uniform',
    re: /\b(?:high[- ]?vis|hi[- ]?vis|safety boots|steel[- ]cap|hard hat|safety glasses|ppe|uniform|logo|work boots|apron|scrubs|chef whites)\b/i,
    verdict: 'claimable',
    rule: 'Protective clothing and a uniform with the employer logo can be claimed when you paid for it yourself, it is used for work, and you have a record. Laundry of these items can be claimed too.',
  },
  {
    item: 'tools and equipment',
    re: /\b(?:tools?|equipment|knife|knives|drill|laptop|computer|headphones|tablet|work phone|ladder|calculator|stationery)\b/i,
    verdict: 'needs_detail',
    rule: 'Tools and equipment can be claimed for the work-related part of the use. Items over $300 are depreciated over several years rather than claimed at once.',
    ask: 'What exactly did you buy, what did you use it for at work, and roughly how much was the work use?',
  },
  {
    item: 'phone and internet',
    re: /\b(?:phone bill|mobile bill|mobile plan|phone plan|internet|wifi|wi-fi|data plan|sim)\b/i,
    verdict: 'needs_detail',
    rule: 'Phone and internet costs can be claimed for the work-related part only, based on a record of work use over a representative period.',
    ask: 'Do you have the bill, and roughly what share of the use was for work?',
  },
  {
    item: 'working from home',
    re: /\b(?:work(?:ed|ing)? from home|wfh|home office|remote work|home internet)\b/i,
    verdict: 'needs_detail',
    rule: 'Working from home costs can be claimed with a record of the hours actually worked from home (a diary or timesheet).',
    ask: 'Do you have a record of the hours you worked from home?',
  },
  {
    item: 'car and kilometres',
    re: /\b(?:own car|my car|kilomet(?:re|er)s?|\bkms?\b|logbook|log book|car expenses|work trips? (?:in|with) my car)\b/i,
    verdict: 'needs_detail',
    rule: 'Car costs can be claimed for work-related trips (not home to work), based on kilometres with a record of the trips.',
    ask: 'Which trips were they, and do you have a record of the kilometres?',
  },
  {
    item: 'courses and study',
    re: /\b(?:course|courses|training|certificate|licen[cs]e|rsa|white card|first aid|tafe|uni(?:versity)?|self[- ]education|study)\b/i,
    verdict: 'needs_detail',
    rule: 'A course can be claimed when it is directly related to your current job, not when it is to get a new job or for general interest.',
    ask: 'Was it needed for the job you were doing in Australia?',
  },
  {
    item: 'personal grooming and fitness',
    re: /\b(?:haircut|hair cut|makeup|make-up|cosmetics|gym|fitness|toiletries|contact lenses)\b|\b(?:prescription|reading|normal|regular) glasses\b/i,
    verdict: 'not_claimable',
    rule: 'Haircuts, make-up, gym memberships and personal care are private costs and cannot be claimed.',
  },
  {
    // ATO: sunscreen is claimable for long outdoor work, with private use apportioned (audit, 4 Nov).
    item: 'sunscreen and sun protection',
    re: /\b(?:sunscreen|sun ?block|sun protection|sunglasses)\b/i,
    verdict: 'needs_detail',
    rule: 'Sunscreen and sun protection can be claimed when the work keeps you outdoors for long periods; any private use is split out.',
    ask: 'Did your work keep you outdoors for long periods?',
  },
  {
    item: 'fines and penalties',
    re: /\b(?:fine|fines|parking fine|speeding|penalty|penalties)\b/i,
    verdict: 'not_claimable',
    rule: 'Fines and penalties cannot be claimed.',
  },
];

/** Verified verdicts for the items a customer mentioned. Deterministic, no model. */
export function ruleCheckExpenses(text: string | null | undefined): ExpenseItemResult[] {
  const t = (text ?? '').trim();
  if (!t) return [];
  const out: ExpenseItemResult[] = [];
  for (const r of RULES) {
    if (!r.re.test(t)) continue;
    // Protective clothing named explicitly beats the generic "everyday clothing" rule.
    if (r.item === 'everyday clothing' && RULES.find((x) => x.item === 'protective clothing and uniform')!.re.test(t)) continue;
    out.push({ item: r.item, verdict: r.verdict, rule: r.rule, ...(r.ask ? { ask: r.ask } : {}) });
  }
  return out;
}

/** The record rule: under $300 in total a list is enough, over $300 the bank statement shows the purchases. */
export const RECORD_RULE = 'If total work expenses are $300 or less, a list of the items is enough without receipts; over $300 a bank statement showing the purchases (highlighted) is needed.';

/** One block for Will's profile, or '' when the message names no expense item. */
export function expenseRuleHint(text: string | null | undefined): string {
  const items = ruleCheckExpenses(text);
  if (!items.length) return '';
  const lines = items.map((i) => `- ${i.item} [${i.verdict}]: ${i.rule}${i.ask ? ` Ask: ${i.ask}` : ''}`);
  return `ATO RULE CHECK ON THEIR LATEST MESSAGE (verified, use exactly these rules, no figures, never "will be accepted", the team confirms in the review):\n${lines.join('\n')}\n- ${RECORD_RULE}`;
}
