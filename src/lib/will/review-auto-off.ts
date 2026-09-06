// ============================================================
// Auto-pause Will once a customer has reached Review with everything
// actually sent (Jo, 6 Sep).
//
// "Everything" means, in Jo's own words: paid, filled the questionnaire,
// AND — only where it applies to them — the Medicare exemption message
// really went out, and the ABN questions really got answered. Once all of
// that is true AND they have reached Review (UNDER_REVIEW or later in the
// Review group), Will goes silent on that chat for good: Jo is taking it
// from here by hand.
//
// Three things Jo was explicit about when this was designed:
//  1. This must be a genuine CODE check that the Medicare/ABN messages were
//     actually SENT — never an inference from the pipeline stage alone.
//  2. Once Will is off this way, an inbound message from the customer is
//     still stored normally in the chat, and a task still opens for Jo —
//     Will simply never drafts or auto-sends anything.
//  3. This applies to EVERY customer who reaches the condition, TFN and
//     TFN + ABN alike, with no exceptions.
//
// This does NOT touch the manual "Take Over" / "Resume Will" toggle in the
// CRM (toggle_ai): that flips the exact same aiPaused flag by hand, in
// either direction, and keeps working exactly as before — including turning
// Will back ON for one specific customer even after this fired. Nothing
// here re-pauses a customer Jo has deliberately turned back on; this check
// only ever runs once, at the moment the condition first becomes true.
// ============================================================
import type { CustomerRow, Store } from './store';
import { abnAnswersPendingKey } from './scheduler';
import { medicareAppliesKey, medicareInfoSentKey } from './form-link';

/** States that count as "reached Review" for this rule: UNDER_REVIEW itself
 *  and anything later in the same Review pipeline group. Reaching any of
 *  these means the earlier ones (paid, form complete) are already true by
 *  the state machine's own forward-only transitions. */
const REVIEW_OR_LATER: CustomerRow['state'][] = ['UNDER_REVIEW', 'ESTIMATE_READY', 'FINAL_REVIEW'];

/**
 * True once every condition Jo asked for is genuinely satisfied for this
 * customer. Safe to call as often as needed — it only reads settings, it
 * never writes anything.
 */
export async function reviewAutoOffReady(store: Store, customer: CustomerRow): Promise<boolean> {
  if (!customer.paid || !customer.formComplete) return false;
  if (!REVIEW_OR_LATER.includes(customer.state)) return false;

  // ABN: only a TFN_ABN customer owes these answers at all. abnAnswersPendingKey
  // is true only while genuinely still waiting (service.ts sendOwedFormAck
  // clears it to false the moment the real answers actually trigger the send —
  // never merely on reaching a stage).
  if (customer.income === 'TFN_ABN') {
    const pending = await store.getSetting(abnAnswersPendingKey(customer.id));
    if (pending === true) return false;
  }

  // Medicare: only someone who told us "No" has an exemption message due at
  // all. medicareAppliesKey stays true forever once that "No" is recorded;
  // medicareInfoSentKey is set true only on a confirmed successful send
  // (deliverOut reporting ok), never on the job merely being queued or
  // sitting in Approval.
  const applies = await store.getSetting(medicareAppliesKey(customer.id));
  if (applies === true) {
    const sent = await store.getSetting(medicareInfoSentKey(customer.id));
    if (sent !== true) return false;
  }

  return true;
}

/**
 * Check the condition and, if it is met and Will is not already paused,
 * switch Will off for this customer (aiPaused = true) and record why. Call
 * this anywhere a piece of the condition can newly become true: the
 * transition into UNDER_REVIEW, the ABN answers finally arriving, or the
 * Medicare message finally sending — the order they happen in is not fixed,
 * so every one of those spots re-checks the whole condition.
 *
 * Returns true when this call is the one that switched Will off.
 */
export async function maybeAutoOffWill(store: Store, customer: CustomerRow): Promise<boolean> {
  if (customer.aiPaused) return false;
  if (!(await reviewAutoOffReady(store, customer))) return false;
  await store.updateCustomer(customer.id, { aiPaused: true });
  await store.audit('system', 'will_auto_paused_at_review', {
    customerId: customer.id, state: customer.state, income: customer.income,
  });
  return true;
}
