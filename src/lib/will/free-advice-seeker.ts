// ============================================================
// THE CUSTOMER WHO ONLY WANTS ANSWERS (Jo, 28 Oct, Anna Whelan +353 86).
//
// After the price went out she asked whether she must declare her Irish job,
// said she knew she owed the ATO and asked about instalments, and her myGov
// was linked: someone who will take the answers and lodge it herself. The team
// spent its time on her. Before payment Will now sends ONE short, friendly
// boundary and closes the chat; if the customer then pays or comes back, the
// normal flow resumes (a closed chat reactivates on the next message).
// English chats only: other languages keep the old behaviour.
// ============================================================

/** The marker inside the boundary message, used to know it has been sent. */
export const BOUNDARY_MARKER = 'we only advise on returns we prepare';

export const FREE_ADVICE_BOUNDARY =
  `Happy to help if you'd like us to prepare and lodge it for you. The price and payment details are above, and once you've paid we start straight away. For general questions about your own situation, the ATO website is the best place, as ${BOUNDARY_MARKER}. 😊`;

const SELF_LODGE = /\b(?:lodge|file|do|submit)\s+(?:it|this|my\s+(?:own\s+)?(?:tax\s+)?return|my\s+taxes)?\s*(?:by\s+myself|myself|on\s+my\s+own|through\s+my\s?gov|via\s+my\s?gov)\b|\bmy\s?gov\b[^.?!\n]{0,30}\b(?:is\s+)?linked\b|\blodged?\s+(?:it\s+)?myself\b/i;
const OWES = /\bi\s+(?:know\s+)?(?:i\s+)?owe\b[^.?!\n]{0,30}\b(?:ato|tax)\b|\b(?:payment\s+plan|instal+ments?|pay(?:ing)?\s+(?:the\s+ato\s+)?in\s+(?:parts|instal+ments?))\b/i;
const ADVICE = /\b(?:am\s+i|should\s+i|do\s+i\s+(?:need|have)\s+to|supposed\s+to|not\s+sure\s+(?:if|whether)|can\s+i)\b[^.?!\n]{0,60}\b(?:include|declare|claim|report|resident|owe|pay\s+tax|deduct)/i;

/**
 * True when, with the price already sent and nothing paid, the customer's
 * latest burst shows they are after free answers: they mean to lodge
 * themselves, or already know they owe tax and ask about paying the ATO, or
 * keep asking tax questions without buying.
 */
export function isFreeAdviceSeeker(opts: {
  paid: boolean
  priceSent: boolean
  lang?: string | null
  /** Customer messages since the price message went out, oldest first. */
  textsSincePrice: string[]
  /** What they wrote since our last message. The signal must be in THIS
   *  burst, so a customer who comes back ready to pay is not held to an old
   *  question. Defaults to the last message. */
  latestBurst?: string[]
}): boolean {
  if (opts.paid || !opts.priceSent) return false;
  if (opts.lang && opts.lang !== 'en') return false;
  const latest = opts.latestBurst ?? opts.textsSincePrice.slice(-1);
  const burst = latest.join('\n');
  if (!burst.trim()) return false;
  if (SELF_LODGE.test(burst) || OWES.test(burst)) return true;
  return latest.some((t) => ADVICE.test(t)) && opts.textsSincePrice.filter((t) => ADVICE.test(t)).length >= 2;
}
