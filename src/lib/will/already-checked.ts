// ============================================================
// "THEY ALREADY KNOW THE RESULT" (Jo, 16 Oct)
//
// When the customer, before paying, shows they already checked their result
// (somebody else looked at it, they saw it in myGov, a calculator gave them a
// number), the price message drops the guarantee and says instead, short and
// polite, that because of that the fee is non-refundable and covers our time
// and review. Everything else in the price message stays exactly the same.
//
// Having myGov is NOT enough on its own (people say "I have myGov" to ask if
// they need it); seeing something in it is.
// ============================================================

export type CheckedReason = 'elsewhere' | 'result' | 'general';

export const CHECKED_CLAUSE: Record<CheckedReason, string> = {
  elsewhere: 'Since your return has already been checked elsewhere, our fee is non-refundable and covers our time and review.',
  result: "Since you've already looked at your result, our fee is non-refundable and covers our time and review.",
  general: "As you've already looked into your tax situation, our fee is non-refundable and covers our time and review.",
};

const ELSEWHERE_RE = /\b(?:accountant|tax agent|h\s?&\s?r block|etax|taxback|another (?:company|agent|service)|someone else|a friend|my (?:friend|mum|mom|dad|parents|boss|partner)|other (?:company|agent))\b[^.!?]{0,60}\b(?:check|looked|look at|did|done|calculat|said|told|quoted|estimated|worked out)|\balready (?:had|got) (?:it|my (?:return|tax|taxes)) (?:checked|done|looked at)/i;

const RESULT_RE = new RegExp([
  // myGov + they SAW something in it
  'my\\s?gov[^.!?]{0,60}\\b(?:says|said|shows|showed|saw|see|seeing|estimate|refund|owe|income|amount|\\$\\s?\\d)',
  '\\b(?:saw|see|seen|checked)\\b[^.!?]{0,40}\\bmy\\s?gov',
  // a calculator / estimator gave them a number
  '\\b(?:calculator|estimator|simulator|online tool)\\b[^.!?]{0,60}\\b(?:says|said|shows|gave|get|refund|owe|\\$\\s?\\d)',
  '\\b(?:i|i\'ve|i have)\\s+(?:calculated|worked out|estimated)\\b',
  // they state the result
  '\\b(?:i know|i\'ll get|i will get|i should get|i\'m getting|i am getting|it says i(?:\'ll| will)? get)\\b[^.!?]{0,30}(?:\\$\\s?\\d|refund|back)',
].join('|'), 'i');

const GENERAL_RE = /\balready (?:checked|looked into|looked at|did the math|worked it out|know (?:my|how much))\b/i;

/** What the customer's own messages show they already did, or null. */
export function alreadyCheckedReason(customerTexts: (string | null | undefined)[]): CheckedReason | null {
  const all = customerTexts.filter(Boolean).join('\n');
  if (!all.trim()) return null;
  if (ELSEWHERE_RE.test(all)) return 'elsewhere';
  if (RESULT_RE.test(all)) return 'result';
  if (GENERAL_RE.test(all)) return 'general';
  return null;
}

const GUARANTEE_LINE_RE = /If your tax refund is less than our fee, we'll refund the difference\. If there's no refund, our full fee applies\./;

/** The price message with the guarantee replaced by the clause (or, where
 *  there is no guarantee, the clause added before the screenshot line). */
export function applyCheckedClause(message: string, reason: CheckedReason | null): string {
  if (!reason) return message;
  const clause = CHECKED_CLAUSE[reason];
  if (message.includes(clause)) return message;
  if (GUARANTEE_LINE_RE.test(message)) return message.replace(GUARANTEE_LINE_RE, clause);
  if (/Just send a screenshot once paid/.test(message)) return message.replace(/Just send a screenshot once paid/, `${clause}\n\nJust send a screenshot once paid`);
  return message;
}

/** The three approved sentences, for the guard. */
export function isApprovedCheckedClause(sentence: string): boolean {
  const s = sentence.trim();
  return Object.values(CHECKED_CLAUSE).some((c) => c === s);
}


// ============================================================
// THEY ALREADY LODGED (Jo, 16 Oct, Siti +61 479): "i did my tax return but i
// get the notice of debt, i need help to amend" got the normal TFN price
// with the guarantee. A return already lodged (by them or anyone) is a
// REVIEW: the [price_tfn_review] message, no guarantee. One detector, used by
// the instant price path and by the engine's price-message enforcement.
// ============================================================
export const ALREADY_LODGED_RE = new RegExp([
  'already\\s+(?:lodged|filed|submitted|done)',
  'lodged\\s+it', 'filed\\s+it', 'submitted\\s+it',
  '\\bi\\s+(?:did|have done|\'ve done|lodged|filed|submitted)\\s+(?:my|the)\\s+(?:tax\\s+)?(?:return|tax)',
  '\\b(?:amend|amendment|amending)\\b',
  'notice\\s+of\\s+(?:debt|assessment)',
  '\\b(?:the\\s+)?ato\\s+(?:says|said|sent|charged|wants)\\b',
  '\\b(?:tax\\s+)?(?:bill|debt)\\s+from\\s+the\\s+ato\\b',
  'check\\s+my\\s+(?:lodged\\s+)?return', 'review\\s+my\\s+(?:lodged\\s+)?return',
  'bereits\\s+(?:eingereicht|abgegeben)', 'schon\\s+(?:eingereicht|abgegeben)', 'steuerbescheid',
  '(?:もう|すでに|既に)(?:申告|提出)', '修正申告',
].join('|'), 'i');

export function alreadyLodged(customerTexts: (string | null | undefined)[]): boolean {
  return customerTexts.some((t) => !!t && ALREADY_LODGED_RE.test(t));
}
