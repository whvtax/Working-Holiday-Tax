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
import { CustomerRow, getStore } from './store';

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
  | 'documents_after_payment' // files from someone who has already paid
  | 'generic';

/** The last thing to fall back on: warm, true, commits to nothing, and is safe
 *  to send in any state the conversation could be in. */
const HOLDING = APPROVED.handoff.holding;

const BY_REASON: Record<HandoffReason, string> = {
  guard_blocked: HOLDING,
  draft_invalid: HOLDING,
  attachment: APPROVED.handoff.attachment,
  unreadable: APPROVED.handoff.unreadable,
  returning_customer: APPROVED.handoff.returning_customer,
  budget: HOLDING,
  send_failed: HOLDING,
  many_questions: APPROVED.handoff.many_questions,
  documents_after_payment: APPROVED.handoff.documents_after_payment,
  generic: HOLDING,
};

/** Where each of the messages above lives in the Message Library. Every one of
 *  them is seeded (seed.ts), so what gets proposed is the owner's CURRENT
 *  wording; the constants above are the fallback when the Library cannot be
 *  read. Jo's rule, 26 Aug: anything a customer can receive is editable there. */
const REASON_TEMPLATE_KEYS: Record<HandoffReason, string> = {
  guard_blocked: 'handoff_holding',
  draft_invalid: 'handoff_holding',
  attachment: 'handoff_attachment',
  unreadable: 'handoff_unreadable',
  returning_customer: 'handoff_returning_customer',
  budget: 'handoff_holding',
  send_failed: 'handoff_holding',
  many_questions: 'handoff_many_questions',
  documents_after_payment: 'handoff_documents_after_payment',
  generic: 'handoff_holding',
};

/** Which Library entry carries the message this pipeline stage calls for. */
const STATE_TEMPLATE_KEYS: Partial<Record<CustomerRow['state'], string>> = {
  NEW_LEAD: 'opening',
  PRICE_SENT: 'obj_11', PAYMENT_PENDING: 'obj_11',
  PAID: 'payment_received', FORM_PENDING: 'payment_received',
  SIGNATURE_PENDING: 'signature',
};

/** Where the customer is in the pipeline decides what they are most likely
 *  waiting to hear. Only messages that are already approved are used. */
function byState(c: Pick<CustomerRow, 'state' | 'income' | 'paid'>): string | null {
  switch (c.state) {
    case 'NEW_LEAD':
      return APPROVED.opening;
    case 'QUALIFIED':
      // The menu model: the customer CHOOSES the track. Until they have, the
      // right thing to put in front of Jo is the menu again, never a price
      // that guesses TFN for them (audit, 3 Sep: an ABN customer whose reply
      // hit a task was one click from being quoted $220 and locked to TFN).
      if (c.income === 'TFN_ABN') return APPROVED.price_tfn_abn;
      if (c.income === 'TFN') return APPROVED.price_tfn;
      return APPROVED.opening;
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

function stateTemplateKey(c: Pick<CustomerRow, 'state' | 'income'>): string | null {
  if (c.state === 'QUALIFIED') {
    if (c.income === 'TFN_ABN') return 'price_tfn_abn';
    if (c.income === 'TFN') return 'price_tfn';
    return 'opening';
  }
  return STATE_TEMPLATE_KEYS[c.state] ?? null;
}

/** The owner's current text for a Library key, or null if it cannot be read.
 *  Never throws: a suggestion is a convenience, not a dependency. */
async function libraryBody(key: string | null): Promise<string | null> {
  if (!key) return null;
  try {
    const t = (await getStore().listTemplates()).find((x) => x.key === key);
    return t && t.body.trim() ? t.body : null;
  } catch {
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
  customer: Pick<CustomerRow, 'state' | 'income' | 'paid' | 'lang' | 'waId'> | null,
  reason: HandoffReason = 'generic',
  preferred?: string | null,
): Promise<string> {
  if (preferred && preferred.trim()) return preferred.trim();

  // 1. The library, but only on a STRONG match. This suggestion is returned
  //    verbatim, unlike the live engine which shows the same hit to the model as
  //    a reference it can ignore. So a weak lexical overlap must NOT be proposed:
  //    that is how "I already lodged it myself" once pulled up an unrelated
  //    answer about a closed bank account (Jo, 30 Aug), because a single shared
  //    word cleared the retrieval floor. Require a clearly relevant hit here;
  //    below that, fall through to the pipeline/reason wording, which is always
  //    safe to put in front of the owner.
  const SUGGEST_MIN_SCORE = 0.6;
  // The Library is written in English. For a customer whose conversation is in
  // another language the answer is still the right ANSWER, but it is not the
  // right MESSAGE: pressing "Send Reply" put an English paragraph into a German
  // or Japanese thread (audit, 4 Sep). It is offered with a line saying so, so
  // the owner sends it knowingly or has Will rewrite it.
  const foreign = !!customer?.lang && customer.lang !== 'en';
  const label = (answer: string) => (foreign
    ? `[Library answer, in English. The customer writes in ${customer?.lang}. Translate before sending, or edit.]\n\n${answer}`
    : answer);
  if (customerMessage && customerMessage.trim()) {
    try {
      const hits = await retrieveKnowledge(customerMessage, { lang: customer?.lang ?? undefined, k: 1 });
      if (hits.length && hits[0].score >= SUGGEST_MIN_SCORE && hits[0].answer.trim()) return label(hits[0].answer.trim());
    } catch { /* the library is a bonus, never a dependency */ }
  }

  // 2. Where they are in the pipeline — but only for reasons where the pipeline
  //    is what they are waiting on. Someone whose photo could not be read is not
  //    waiting to be quoted a price again.
  if (customer && (reason === 'guard_blocked' || reason === 'draft_invalid' || reason === 'budget' || reason === 'generic')) {
    const s = (await libraryBody(stateTemplateKey(customer))) ?? byState(customer);
    if (s) return s;
  }

  // 3. Always something.
  return (await libraryBody(REASON_TEMPLATE_KEYS[reason])) ?? BY_REASON[reason] ?? HOLDING;
}
