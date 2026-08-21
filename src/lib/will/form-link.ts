// ============================================================
// Website form  ->  Will
//
// The confirmation message ("we've received your questionnaire, we'll get back
// to you within 24 hours") existed in seven languages, and the scheduler knew
// how to handle a FORM_RECEIVED job. Nothing ever created one. The website
// forms saved the submission and Will was never told, so it kept chasing
// people who had already filled the form in.
//
// This is the missing link. It is deliberately best-effort: a form submission
// must NEVER fail because Will could not be updated.
// ============================================================
import { getStore, CustomerRow } from './store';

/** Digits only, no country code assumptions. */
function digits(v: string | null | undefined): string {
  return (v || '').replace(/\D/g, '');
}

/**
 * Match a website form's phone field to a Will customer.
 *
 * Numbers arrive in every shape a person can type: `0424 513 998`,
 * `+61 424 513 998`, `61424513998`. Will stores the WhatsApp id, which is
 * digits with a country code. Comparing the last 9 digits matches all of those
 * without guessing at country codes, and is specific enough that a collision
 * would need two customers sharing a subscriber number.
 */
export function phoneKey(raw: string): string | null {
  const d = digits(raw);
  return d.length >= 8 ? d.slice(-9) : null;
}

/** True when a stored WhatsApp id and a typed phone number are the same person. */
export function samePhone(waId: string, raw: string): boolean {
  const key = phoneKey(raw);
  return !!key && digits(waId).endsWith(key);
}

export async function findCustomerByPhone(raw: string): Promise<CustomerRow | null> {
  if (!phoneKey(raw)) return null;

  const store = getStore();
  const customers = await store.listCustomers();
  const hits = customers.filter((c) => samePhone(c.waId, raw));
  // An ambiguous match is not a match: acting on the wrong customer would mark
  // someone else's form complete and stop their reminders.
  return hits.length === 1 ? hits[0] : null;
}

/**
 * Tell Will that this person just submitted the questionnaire.
 *
 * Queues a FORM_RECEIVED job, which the scheduler picks up within 5 minutes:
 * it marks the form complete, moves the customer to FORM_COMPLETE, CANCELS the
 * outstanding form reminders and sends the confirmation in their language.
 *
 * Returns whether a customer was matched, for logging. Never throws.
 */
export async function notifyFormReceived(
  waNumber: string,
  /** Email from the same submission. Not proof of identity, but recorded so a
   *  mismatch can be reconciled by a human afterwards. */
  email?: string | null,
): Promise<{ matched: boolean }> {
  try {
    const customer = await findCustomerByPhone(waNumber);
    if (!customer) return { matched: false };

    const store = getStore();

    // ── What this check can and cannot do ───────────────────────────────────
    // The public forms are UNAUTHENTICATED and this acts on whatever phone
    // number the submission carried. Someone could submit a form containing
    // ANOTHER person's number and thereby mark that person's questionnaire
    // complete and stop the reminders chasing them for it.
    //
    // A phone number is a public identifier, so a bare match cannot prove the
    // submission belongs to this customer. Nothing here fully closes that: the
    // customer has no shared secret with the website form. What the state gate
    // does is shrink the window to customers who are actually mid-flow, and the
    // audit line records the email and number so a wrong match is reconcilable.
    //
    // The real fix is to carry the completion token from the WhatsApp thread
    // into the form; that is a product change, not a code change, and is noted
    // in the audit report.
    if (!['PAID', 'FORM_PENDING'].includes(customer.state)) {
      await store.audit('system', 'form_received_ignored', {
        customerId: customer.id, state: customer.state,
      });
      return { matched: true };
    }

    await store.addJob({
      customerId: customer.id,
      kind: 'FORM_RECEIVED',
      payload: {},
      runAt: new Date().toISOString(), // due immediately; the tick runs every 5 min
    });
    await store.audit('system', 'form_received_queued', {
      customerId: customer.id,
      // Recorded for reconciliation. Masked: the audit log is readable in the
      // CRM and this is a third party's contact detail.
      email: email ? email.replace(/^(.).*(@.*)$/, '$1***$2') : null,
      matchedOn: 'phone-tail-9',
    });
    return { matched: true };
  } catch {
    // A website form must never fail because the CRM link failed.
    return { matched: false };
  }
}
