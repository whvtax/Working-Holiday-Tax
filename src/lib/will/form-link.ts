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
import { raiseOrFoldSystemTask } from './tasks';
export { unmatchedFormTaskContext, parseUnmatchedFormTask } from './form-link-task';
import { unmatchedFormTaskContext, parseUnmatchedFormTask } from './form-link-task';

/** How long after the questionnaire the Medicare exemption message goes out. */
export const MEDICARE_DELAY_MS = 15 * 60 * 1000;

/** Setting key: a "No" to Medicare on a questionnaire that arrived BEFORE
 *  payment, waiting for the Paid cascade to replay FORM_RECEIVED (audit, 5 Sep). */
export const medicareNoKey = (customerId: string) => `medicare_no:${customerId}`;

/**
 * True when the questionnaire says this person was NOT covered by Medicare.
 *
 * Deliberately strict: only an explicit "no" qualifies. The field arrives as
 * "Yes" / "No" from submit-tax-form.ts, but a direct POST can carry anything,
 * and an empty or unrecognised answer must not be read as "not covered" — that
 * would send the exemption message to people who are on Medicare.
 */
export function noMedicare(raw: string | null | undefined): boolean {
  return typeof raw === 'string' && raw.trim().toLowerCase() === 'no';
}

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

/** What became of a questionnaire that reached a matched customer. */
export type FormReceivedOutcome = 'queued' | 'remembered' | 'ignored';

/**
 * Apply "this customer just submitted the questionnaire" to ONE customer.
 *
 * This is the whole matched path of notifyFormReceived, lifted out so the
 * owner's "Link to chat" on an unmatched-questionnaire task runs exactly the
 * same code as an automatic phone match (audit, 5 Sep). Before that the task
 * said "mark their form complete by hand" and no such control existed: the
 * stage badge only moved the badge, form_complete stayed false, the reminders
 * kept going and no confirmation was sent. One path, two callers:
 *
 *  - PAID / FORM_PENDING: queue FORM_RECEIVED (form complete, reminders
 *    cancelled, confirmation or ABN questions in their language) and, for a
 *    "No" to Medicare, the exemption message 15 minutes later.
 *  - before payment: remembered as formComplete only; the Paid cascade
 *    replays FORM_RECEIVED when they pay.
 *  - anything else: recorded and ignored.
 */
export async function applyFormReceived(
  customer: CustomerRow,
  opts: { email?: string | null; hasMedicare?: string | null; matchedOn?: string } = {},
): Promise<FormReceivedOutcome> {
  const store = getStore();
  const { email, hasMedicare } = opts;

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
      // The Medicare "No" used to be dropped here: only the flag survived, so
      // when the replayed FORM_RECEIVED ran after payment nothing knew to
      // queue the exemption message and this group never got it (audit,
      // 5 Sep). Remembered as a setting (no column needed); the scheduler's
      // FORM_RECEIVED handler reads it when the replay wins the transition
      // and queues MEDICARE_INFO with the same 15 minute spacing.
      if (noMedicare(hasMedicare)) {
        await store.setSetting(medicareNoKey(customer.id), true);
        await store.audit('system', 'medicare_no_remembered', { customerId: customer.id });
      }
      await store.audit('system', 'form_received_before_payment', {
        customerId: customer.id, state: customer.state,
      });
      return 'remembered';
    }
    await store.audit('system', 'form_received_ignored', {
      customerId: customer.id, state: customer.state,
    });
    return 'ignored';
  }

  // ── One questionnaire, one set of jobs (audit, 5 Sep) ───────────────────
  // The customer stays in FORM_PENDING until the next tick, so a resubmit
  // inside that window (a retry after a slow response, "forgot a receipt", a
  // double click) used to queue everything twice. A second FORM_RECEIVED was
  // harmless (the setState guard in the scheduler makes the loser a no-op)
  // but a second MEDICARE_INFO was NOT: the handler sent the exemption
  // message twice, 15 minutes later. So: an existing SCHEDULED FORM_RECEIVED
  // means the tick already has it; an existing MEDICARE_INFO in ANY status
  // (scheduled, done, or an earlier cycle) means that message has gone or is
  // going, and is never queued again. Read-only lookup; if it fails we queue
  // exactly as before, because losing the message is worse than repeating it.
  let formReceivedScheduled = false;
  let medicareEverQueued = false;
  try {
    const existing = await store.listJobsForCustomer(customer.id, ['FORM_RECEIVED', 'MEDICARE_INFO']);
    formReceivedScheduled = existing.some((j) => j.kind === 'FORM_RECEIVED' && j.status === 'SCHEDULED');
    medicareEverQueued = existing.some((j) => j.kind === 'MEDICARE_INFO');
  } catch { /* fail open: queue as before */ }

  if (formReceivedScheduled) {
    await store.audit('system', 'form_received_already_queued', { customerId: customer.id });
  } else {
    await store.addJob({
      customerId: customer.id,
      kind: 'FORM_RECEIVED',
      payload: {},
      runAt: new Date().toISOString(), // due immediately; the tick runs every 5 min
    });
  }
  // ── The Medicare exemption message, on its own (Jo, 4 Sep) ──────────────
  // "No" to "Do you have access to Medicare in Australia?" is exactly the
  // group that can apply for the exemption, so nobody should have to be
  // remembered by hand. 15 minutes, not immediately: the questionnaire
  // acknowledgement (or, for a TFN+ABN customer, the ABN questions) goes out
  // on the next tick, and two messages landing together read as a blast.
  if (noMedicare(hasMedicare) && medicareEverQueued) {
    await store.audit('system', 'medicare_info_already_queued', { customerId: customer.id });
  } else if (noMedicare(hasMedicare)) {
    await store.addJob({
      customerId: customer.id,
      kind: 'MEDICARE_INFO',
      payload: { attempt: 0 },
      runAt: new Date(Date.now() + MEDICARE_DELAY_MS).toISOString(),
    });
    await store.audit('system', 'medicare_info_queued', { customerId: customer.id });
  }

  await store.audit('system', 'form_received_queued', {
    customerId: customer.id,
    // Recorded for reconciliation. Masked: the audit log is readable in the
    // CRM and this is a third party's contact detail.
    email: email ? email.replace(/^(.).*(@.*)$/, '$1***$2') : null,
    matchedOn: opts.matchedOn ?? 'phone-tail-9',
  });
  return 'queued';
}

/**
 * The task an unmatched questionnaire raises, and how to read it back.
 *
 * TaskRow has no payload column, so the submitted number, email and Medicare
 * answer travel in the context text in a fixed shape that
 * parseUnmatchedFormTask can read. That is what lets "Link to chat" replay the
 * submission against the chat the owner picks, Medicare message included
 * (audit, 5 Sep). Both live in ./form-link-task and are re-exported above —
 * that file has no store import, so the CRM's client-side "Link to chat"
 * control can read parseUnmatchedFormTask without pulling `fs` into the
 * browser bundle.
 */

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
  /** The questionnaire's "Do you have access to Medicare in Australia?" answer,
   *  exactly as the form posted it ("Yes" / "No" / ""). "No" means the customer
   *  was not covered, which is the whole population that can apply for the
   *  Medicare Levy Exemption — so Will sends them the exemption message on its
   *  own, 15 minutes after the form arrives (Jo, 4 Sep). Anything else, and
   *  nothing is sent. */
  hasMedicare?: string | null,
): Promise<{ matched: boolean }> {
  try {
    const customer = await findCustomerByPhone(waNumber);
    if (!customer) {
      // A submission whose phone does not match any WhatsApp customer used to
      // vanish here: nothing recorded, and the questionnaire reminders kept
      // chasing a customer who had already sent it in (typically a number typed
      // in a national format the matcher does not build a candidate for, e.g.
      // a UK 07... number). It is now a task with the number on it, so a person
      // can link the two in one click: the task card's "Link to chat" calls the
      // mark_form_received action, which runs applyFormReceived above against
      // the chat picked (audit, 5 Sep; before that the task asked for a manual
      // step the CRM had no control for).
      try {
        const store = getStore();
        await store.audit('system', 'form_received_unmatched', { waNumber, formKind });
        if (formKind === 'tax-return') {
          // Folded, not stacked (audit3 sched 60, 5 Sep): the same unmatched
          // number resubmitting the questionnaire used to open a fresh
          // customer-less card every time. This refreshes the one open card
          // for that number instead, so a burst of retries from the same
          // person is still just one thing for the owner to link.
          await raiseOrFoldSystemTask(store, {
            match: (t) => parseUnmatchedFormTask(t.context)?.waNumber === waNumber,
            reason: 'Questionnaire submitted by a number that matches no WhatsApp chat',
            severity: 'REVIEW',
            context: unmatchedFormTaskContext(waNumber, email, hasMedicare),
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

    await applyFormReceived(customer, { email, hasMedicare });
    return { matched: true };
  } catch {
    // A website form must never fail because the CRM link failed.
    return { matched: false };
  }
}
