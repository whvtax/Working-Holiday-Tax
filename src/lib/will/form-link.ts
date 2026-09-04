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

/**
 * Match a website form's phone field to a Will customer.
 *
 * THIS NOW DELEGATES TO THE INDEXED STORE LOOKUP. It used to load the entire
 * `will_customers` table and filter in JavaScript, which (a) grew linearly with
 * every customer, on the request where someone is watching a spinner after
 * uploading their passport, (b) silently truncated at PostgREST's 1,000-row cap
 * so past a thousand customers it stopped finding people, and (c) matched on
 * the last 9 digits, which never resolved German or Japanese domestic
 * spellings. `store.findCustomerByPhone` is a single indexed query on `wa_norm`
 * that handles all three markets' trunk-zero rules (phone-candidates.ts) and
 * carries the same "an ambiguous match is not a match" guard this had.
 *
 * At 5,000 customers a year this is the difference between a constant-time
 * indexed lookup and a full-table scan that would have stopped working at row
 * 1,000. The `phoneKey`/`samePhone` helpers above are retained for the tests
 * that pin the tail-9 semantics; production no longer scans.
 */
export async function findCustomerByPhone(raw: string): Promise<CustomerRow | null> {
  if (!phoneKey(raw)) return null;
  return getStore().findCustomerByPhone(raw);
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
  /** WHICH form was submitted. Only the tax-return questionnaire is "the
   *  questionnaire" (Jo; migration 038 fixed the same thing on the DB trigger
   *  and this is the app-side half, audit 4 Sep). A super / TFN / ABN
   *  application is a different service: it must never mark the questionnaire
   *  complete, never stop the questionnaire reminders and never send "we've
   *  received your questionnaire". It is recorded and nothing else. */
  formKind: 'tax-return' | 'super' | 'tfn' | 'abn' = 'tax-return',
): Promise<{ matched: boolean }> {
  try {
    const customer = await findCustomerByPhone(waNumber);
    if (!customer) {
      // A submission whose phone does not match any WhatsApp customer used to
      // vanish here: nothing recorded, and the questionnaire reminders kept
      // chasing a customer who had already sent it in (typically a number typed
      // in a national format the matcher does not build a candidate for, e.g.
      // a UK 07... number). It is now a task with the number on it, so a person
      // can link the two in one click.
      try {
        const store = getStore();
        await store.audit('system', 'form_received_unmatched', { waNumber, formKind });
        if (formKind === 'tax-return') {
          await store.addTask({
            customerId: null,
            customerName: null,
            reason: 'Questionnaire submitted by a number that matches no WhatsApp chat',
            severity: 'REVIEW',
            context: `The website questionnaire was submitted with the phone number "${waNumber}"${email ? ` and the email ${email}` : ''}, and no WhatsApp customer has that number. Find the customer in the CRM and mark their form complete by hand, otherwise the form reminders keep chasing them.`,
            suggestedReply: null,
          });
        }
      } catch { /* the form must never fail because the CRM link failed */ }
      return { matched: false };
    }
    if (formKind !== 'tax-return') {
      await getStore().audit('system', 'other_form_received', {
        customerId: customer.id, formKind, state: customer.state,
      });
      return { matched: true };
    }

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
      // A lead who fills the questionnaire BEFORE paying (it happens: the site
      // link is public) is remembered, not ignored. Nothing moves and nothing is
      // sent, so the phone-match risk above stays contained to one flag; but
      // when they do pay, autoAdvanceToForm skips straight to Form Complete
      // instead of chasing them for a form they already sent (audit, 3 Sep).
      if (['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING'].includes(customer.state) && !customer.formComplete) {
        await store.updateCustomer(customer.id, { formComplete: true });
        await store.audit('system', 'form_received_before_payment', {
          customerId: customer.id, state: customer.state,
        });
        return { matched: true };
      }
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
