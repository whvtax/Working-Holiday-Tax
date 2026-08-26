// Never hand a task over with nothing to send.
//
// Jo's rule, 25 Aug: whatever the customer wrote, and whatever the reason the
// assistant stepped out — the guard blocked the draft, the daily AI budget ran
// out, a photo arrived that cannot be read, a previous customer came back — the
// task must arrive with a proposed reply. Approving or editing one sentence
// takes seconds; staring at an empty box and composing from scratch is what
// leaves a customer waiting.
//
// Deterministic on purpose. This runs on the handoff paths, which are exactly
// the paths where the model is unavailable, too expensive, or not trusted, so
// it never calls Claude. It draws in order from:
//   1. the knowledge library (the answers Jo approved),
//   2. the approved message corpus, keyed to where the customer is,
//   3. a neutral holding line that is always safe to send.
//
// A suggestion is a DRAFT FOR A HUMAN. It is never transmitted by itself: the
// send path runs the policy guard as usual.
import { APPROVED } from './approved-messages';
import { retrieveKnowledge } from './knowledge';
import { CustomerRow } from './store';

/** Why the conversation is being handed to a human. Each reason has its own
 *  sensible opening, because "we cannot read your photo" and "you messaged us
 *  again after a year" call for very different first sentences. */
export type HandoffReason =
  | 'guard_blocked'      // the reply was written but the policy guard refused it
  | 'draft_invalid'      // an approved draft went stale before it was sent
  | 'attachment'         // a photo or document Will cannot read
  | 'unreadable'         // a voice note or a message type with no text
  | 'returning_customer' // a previous / pre-existing chat wrote in
  | 'budget'             // the daily AI limit was reached
  | 'send_failed'        // WhatsApp rejected the send
  | 'many_questions'     // more than 3 messages before payment, needs a person
  | 'generic';

/** The last thing to fall back on: warm, true, commits to nothing, and is safe
 *  to send in any state the conversation could be in. */
const HOLDING = `Thanks for that 😊 Let me look into it properly and come straight back to you.`;

const BY_REASON: Record<HandoffReason, string> = {
  guard_blocked: HOLDING,
  draft_invalid: HOLDING,
  attachment: `Got it, thanks for sending that through 😊 I'll go through it and come back to you shortly.`,
  unreadable: `Thanks for your message 😊 It didn't come through on my end, would you mind sending it again as text?`,
  returning_customer: `Hey, good to hear from you again 😊 What can I help you with?`,
  budget: HOLDING,
  send_failed: HOLDING,
  many_questions: `Thanks for all the questions 😊 Let me jump in personally and go through everything with you properly.`,
  generic: HOLDING,
};

/** Where the customer is in the pipeline decides what they are most likely
 *  waiting to hear. Only messages that are already approved are used. */
function byState(c: Pick<CustomerRow, 'state' | 'income' | 'paid'>): string | null {
  switch (c.state) {
    case 'NEW_LEAD':
      return APPROVED.opening;
    case 'QUALIFIED':
      return c.income === 'TFN_ABN' ? APPROVED.price_tfn_abn : APPROVED.price_tfn;
    case 'PRICE_SENT':
    case 'PAYMENT_PENDING':
      return APPROVED.objections.o11_think_about_it;
    case 'PAID':
    case 'FORM_PENDING':
      return APPROVED.payment_received;
    case 'SIGNATURE_PENDING':
      return APPROVED.signature_ready;
    default:
      return null;
  }
}

/**
 * The reply to put in front of the owner. Always returns something.
 *
 * `preferred` is used when the caller already has the exact text at issue — the
 * reply the guard refused, for instance. That is the most useful thing to show,
 * because the fix is usually one word, and it is shown as-is rather than being
 * quietly replaced by something more generic.
 */
export async function suggestReply(
  customerMessage: string,
  customer: Pick<CustomerRow, 'state' | 'income' | 'paid' | 'lang'> | null,
  reason: HandoffReason = 'generic',
  preferred?: string | null,
): Promise<string> {
  if (preferred && preferred.trim()) return preferred.trim();

  // 1. The library. This is the whole point of having curated it: the answer Jo
  //    approved for this question is better than anything assembled here.
  if (customerMessage && customerMessage.trim()) {
    try {
      const hits = await retrieveKnowledge(customerMessage, { lang: customer?.lang ?? undefined, k: 1 });
      if (hits.length && hits[0].answer.trim()) return hits[0].answer.trim();
    } catch { /* the library is a bonus, never a dependency */ }
  }

  // 2. Where they are in the pipeline — but only for reasons where the pipeline
  //    is what they are waiting on. Someone whose photo could not be read is not
  //    waiting to be quoted a price again.
  if (customer && (reason === 'guard_blocked' || reason === 'draft_invalid' || reason === 'budget' || reason === 'generic')) {
    const s = byState(customer);
    if (s) return s;
  }

  // 3. Always something.
  return BY_REASON[reason] ?? HOLDING;
}
