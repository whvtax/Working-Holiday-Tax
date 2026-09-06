/**
 * Plain English for the machine text the CRM buttons used to hand the owner
 * verbatim (audit, 5 Sep).
 *
 * Two families of refusal reached the toast, the Done modal and the task
 * cards as-is:
 *   - Meta's own error strings ("meta 404: (#132001) Template name does not
 *     exist in the translation") from the seven manual send buttons;
 *   - the Policy Guard's codes ("SALES_CONTENT_AFTER_PAYMENT, EM_DASH_FORBIDDEN")
 *     from Approve, the follow-up button and the Library editor.
 * Neither says what to DO. The scheduler already had the right sentence for
 * the missing-template case (scheduler.ts, the review ask); the manual
 * buttons now say the same thing, so a rejection reads the same whichever
 * path met it.
 *
 * Owner-facing only: nothing in this file reaches a customer, and nothing in
 * it changes what is sent or when. The raw text and the raw codes are kept
 * next to the explanation, because the System card, the hand-off reasons and
 * the tests key off them.
 */

/** Meta rejection -> what to do. Checked in order; first match wins. */
const SEND_ERROR_HINT: Array<[RegExp, (templateName?: string) => string]> = [
  [/131047/, () => 'outside the 24h window: the customer has not written for over a day, so only an approved template can reach them. Send it as an approved template, or wait for the customer to write'],
  [/131026/, () => 'the number cannot receive WhatsApp messages (blocked, or not on WhatsApp)'],
  [/132001|does not exist|not exist/i, (templateName) => templateName
    ? `the customer has not written for over a day, so this needs the approved WhatsApp template "${templateName}", which does not exist yet in WhatsApp Manager. Create it there and this button works next time`
    : 'the customer has not written for over a day, so this needs an approved WhatsApp template, which does not exist yet in WhatsApp Manager. Create it there and this button works next time'],
  [/131049/, () => 'WhatsApp has hit this customer’s daily marketing limit; try again tomorrow evening'],
  [/\b429\b|\(#4\)|80007|131056|130429/, () => 'WhatsApp is throttling right now; nothing was sent, try again in a few minutes'],
  [/130472/, () => 'the customer is in a Meta experiment group that does not receive marketing templates'],
  [/131037/, () => 'the phone number is not registered or the display name was not approved'],
];

/** `raw (what to do)`: the raw Meta text stays in front so the System card
 *  and the audit rows still show the code; the hint says what to do about it.
 *  `templateName` is the approved template the send went out as, when it
 *  did, so the missing-template case can name the one to create. */
export function explainSendError(error: string | undefined, templateName?: string): string {
  const raw = error ?? 'unknown error';
  const hint = SEND_ERROR_HINT.find(([re]) => re.test(raw))?.[1](templateName);
  return hint ? `${raw} (${hint})` : raw;
}

/** Policy Guard code -> one short sentence the owner can act on. Codes that
 *  are not listed (or a future one) fall back to the code itself, so nothing
 *  is ever hidden. */
const VIOLATION_TEXT: Record<string, string> = {
  OUTSIDE_24H_WINDOW_NEEDS_TEMPLATE: 'the customer has not written for over a day, so only an approved WhatsApp template can reach them; free text is refused until they write again',
  KILL_SWITCH_ACTIVE: 'the kill switch is on, so nothing goes out until it is switched off',
  AI_PAUSED_FOR_CUSTOMER: 'Will is paused on this chat',
  CUSTOMER_OPTED_OUT: 'this customer has opted out of messages',
  LEGACY_CHAT_AI_DISABLED: 'this is a legacy chat, Will does not write here',
  EM_DASH_FORBIDDEN: 'the text contains a dash; replace it with a comma or a full stop',
  SALES_CONTENT_AFTER_PAYMENT: 'the text sells the service to someone who has already paid; remove the price or sign-up lines',
  PLACEHOLDER_LEFTOVER: 'the text still has an unfilled placeholder such as {{1}} or {{AMOUNT}}',
  REPLY_TOO_LONG: 'the text is longer than Will is allowed to send; shorten it',
  PROMPT_ECHO: 'the text repeats internal instructions that must not reach a customer',
  SENSITIVE_CONTENT: 'the text looks like it contains a password or another secret',
  RETIRED_GUARANTEE_LINE: 'the text uses the retired guarantee line; that wording is no longer sent',
  NON_DOLLAR_CURRENCY: 'the text quotes a price in a currency other than Australian dollars',
  AI_IDENTITY_ANSWER: 'the text answers whether Will is a human or an AI; that is for you to answer',
  MYGOV_TROUBLESHOOTING: 'the text walks the customer through myGov steps; that is done by hand, not by message',
  PRICE_NEGOTIATION: 'the text negotiates the price; the price is fixed',
  TAX_DETERMINATION: 'the text gives a personal tax determination (residency, refund amount, what is deductible); only the fixed estimate message may do that',
  DIY_INSTRUCTIONS: 'the text tells the customer how to lodge on their own',
  REFUND_OR_CANCEL_PROMISE: 'the text promises a refund or a cancellation; only the approved wording may do that',
  STALE_DRAFT: 'the draft assumed a stage the customer is no longer at',
  SEND_FAILED: 'WhatsApp did not accept the message',
};

export function describeViolation(code: string): string {
  if (code.startsWith('FORBIDDEN_AMOUNT:')) {
    return `the text quotes $${code.slice('FORBIDDEN_AMOUNT:'.length)}, which is not one of the fixed prices`;
  }
  return VIOLATION_TEXT[code] ?? code;
}

/** All of a verdict's codes as one owner-readable sentence, in the order the
 *  guard raised them. */
export function describeViolations(codes: string[]): string {
  const seen = new Set<string>();
  const parts = codes.filter((c) => (seen.has(c) ? false : (seen.add(c), true))).map(describeViolation);
  return parts.length ? parts.join('. ') : '';
}
