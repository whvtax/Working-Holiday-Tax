// ============================================================
// Customer state machine — the single source of truth for
// what stage a customer is in and what may happen next.
// Spec: Master Build Spec §5
// ============================================================

export type CustomerState =
  | 'NEW_LEAD' | 'QUALIFIED' | 'PRICE_SENT' | 'PAYMENT_PENDING'
  | 'PAID' | 'FORM_PENDING' | 'FORM_COMPLETE' | 'DOCUMENTS_COMPLETE'
  | 'UNDER_REVIEW' | 'ESTIMATE_READY' | 'FINAL_REVIEW'
  | 'SIGNATURE_PENDING' | 'SIGNED' | 'LODGED' | 'COMPLETED'
  | 'NOT_INTERESTED' | 'WENT_COLD' | 'NOT_RELEVANT';

/** Runtime allow-list of every valid state (used to validate untrusted input). */
export const ALL_STATES: CustomerState[] = [
  'NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING',
  'PAID', 'FORM_PENDING', 'FORM_COMPLETE', 'DOCUMENTS_COMPLETE',
  'UNDER_REVIEW', 'ESTIMATE_READY', 'FINAL_REVIEW',
  'SIGNATURE_PENDING', 'SIGNED', 'LODGED', 'COMPLETED',
  'NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT',
];

export const STAGE_GROUPS = [
  { id: 'sales',     label: 'Lead',       color: '#c69337', states: ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING'] },
  { id: 'onb',       label: 'Paid', color: '#5a92d8', states: ['PAID', 'FORM_PENDING'] },
  // "Ready" and "Estimate" used to be their own pipeline stops (Docs
  // Complete/Under Review, then Estimate Ready/Final Review). The owner
  // found them redundant as separate stages, so their states now live inside
  // Review — everything from the form coming back to the moment the return
  // actually goes out for signature is just "Review". The granular
  // CustomerState values themselves are unchanged (the state machine and the
  // Send Estimate / Send for Signature buttons still key off them); only the
  // pipeline grouping and display collapsed.
  { id: 'rev',       label: 'Review',     color: '#8a7cd0', states: ['FORM_COMPLETE', 'DOCUMENTS_COMPLETE', 'UNDER_REVIEW', 'ESTIMATE_READY', 'FINAL_REVIEW'] },
  { id: 'sig',       label: 'Signature',  color: '#c2568f', states: ['SIGNATURE_PENDING'] },
  { id: 'done',      label: 'Completed',  color: '#4aa872', states: ['SIGNED', 'LODGED', 'COMPLETED'] },
  { id: 'closed',    label: 'Closed',     color: '#7a8494', states: ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'] },
] as const;

export const STATE_LABELS: Record<CustomerState, string> = {
  NEW_LEAD: 'New Lead', QUALIFIED: 'Qualified', PRICE_SENT: 'Price Sent',
  PAYMENT_PENDING: 'Payment Pending', PAID: 'Paid', FORM_PENDING: 'Form Pending',
  FORM_COMPLETE: 'Form Complete', DOCUMENTS_COMPLETE: 'Docs Complete',
  UNDER_REVIEW: 'Under Review', ESTIMATE_READY: 'Estimate Ready',
  FINAL_REVIEW: 'Final Review', SIGNATURE_PENDING: 'Signature Pending',
  SIGNED: 'Signed', LODGED: 'Lodged', COMPLETED: 'Completed',
  NOT_INTERESTED: 'Not Interested', WENT_COLD: 'Went Cold', NOT_RELEVANT: 'Not Relevant',
};

/** States in which a customer counts as having paid — sales flow is forever closed. */
export const POST_PAYMENT_STATES: CustomerState[] = [
  'PAID', 'FORM_PENDING', 'FORM_COMPLETE', 'DOCUMENTS_COMPLETE', 'UNDER_REVIEW',
  'ESTIMATE_READY', 'FINAL_REVIEW', 'SIGNATURE_PENDING', 'SIGNED', 'LODGED', 'COMPLETED',
];

export const CLOSED_STATES: CustomerState[] = ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'];

/** Allowed forward transitions. Reactivation from closed states returns to the stored previous state. */
export const TRANSITIONS: Partial<Record<CustomerState, CustomerState[]>> = {
  // PRICE_SENT is allowed straight from NEW_LEAD because a customer often
  // answers the TFN/ABN question in their very first message ("only TFN"),
  // and Will then quotes the price immediately. Without this the model's
  // proposal was rejected as an "invalid transition" and pushed into Tasks as a
  // CONFLICT instead of appearing as a normal draft in the chat.
  NEW_LEAD:            ['QUALIFIED', 'PRICE_SENT', 'NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'],
  QUALIFIED:           ['PRICE_SENT', 'NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'],
  // NOT_RELEVANT after the price too: a wrong number or spam sometimes only
  // shows itself once the price is out, and without this exit the contact was
  // chased with the whole pre-payment cadence, auto-closed as Went Cold and
  // counted as a lost sale (audit, 3 Sep).
  PRICE_SENT:          ['PAYMENT_PENDING', 'PAID', 'NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'],
  PAYMENT_PENDING:     ['PAID', 'NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'],
  PAID:                ['FORM_PENDING'],
  FORM_PENDING:        ['FORM_COMPLETE'],
  FORM_COMPLETE:       ['DOCUMENTS_COMPLETE'],
  DOCUMENTS_COMPLETE:  ['UNDER_REVIEW'],
  UNDER_REVIEW:        ['ESTIMATE_READY'],
  ESTIMATE_READY:      ['FINAL_REVIEW'],
  FINAL_REVIEW:        ['SIGNATURE_PENDING'],
  SIGNATURE_PENDING:   ['SIGNED'],
  SIGNED:              ['LODGED'],
  LODGED:              ['COMPLETED'],
};

/** The three follow-up flows and the nudges each one sends, in order.
 *  These live here rather than in the scheduler because the dashboard needs
 *  them too, and the scheduler pulls in the store (and `fs`), which cannot be
 *  bundled for the browser. */
export type Flow = 'prePayment' | 'form' | 'signature';

export const FLOW_TEMPLATES: Record<Flow, string[]> = {
  prePayment: ['fu_pre_24h', 'fu_pre_3d', 'fu_pre_7d'],
  form: ['fu_form_6h', 'fu_form_3d', 'fu_form_7d'],
  signature: ['fu_sig_24h', 'fu_sig_3d', 'fu_sig_7d'],
};

export const FLOW_ELIGIBLE_STATES: Record<Flow, CustomerState[]> = {
  // Jo, 29 Aug: chase a lead from the moment they land in WhatsApp, not only
  // once a price has been sent. NEW_LEAD and QUALIFIED are included so a lead
  // who starts a chat and then goes quiet before any price still gets the
  // pre-payment nudge sequence. A lead who is actively chatting never gets one:
  // every inbound reschedules the timer, so the nudge only fires after the
  // silence gap (24h for the first), and it is cancelled the moment they move
  // forward (a price, a payment) or close.
  prePayment: ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING'],
  form: ['FORM_PENDING'],
  signature: ['SIGNATURE_PENDING'],
};

/**
 * Where a closed customer goes when the conversation comes back to life.
 *
 * A lead who never paid starts again from the top: NEW_LEAD, the whole
 * pipeline from the beginning (Jo, 28 Aug). A customer who HAD paid does not:
 * they go back to the stage they were closed from, because Lead is a sales
 * stage and spec §5 says paid never re-enters sales. Audit, 3 Sep: a paid
 * customer closed after ignoring the form reminders wrote back two weeks
 * later with "sorry, I'll do the form now", was reopened as Lead with
 * paid=true, and the questionnaire that followed was ignored (FORM_RECEIVED
 * only acts on a customer in Form Pending). When the stage they were closed
 * from is unknown, Form Pending is the safe post-payment step: it is where a
 * paid customer who has not finished the form belongs, and it is one step
 * from every later stage the team can move them to by hand.
 */
export function reopenTarget(c: { paid: boolean; previousState: CustomerState | null }): CustomerState {
  if (c.previousState && POST_PAYMENT_STATES.includes(c.previousState)) return c.previousState;
  if (c.paid) return 'FORM_PENDING';
  return 'NEW_LEAD';
}

export function flowForState(state: CustomerState): Flow | null {
  if (FLOW_ELIGIBLE_STATES.prePayment.includes(state)) return 'prePayment';
  if (FLOW_ELIGIBLE_STATES.form.includes(state)) return 'form';
  if (FLOW_ELIGIBLE_STATES.signature.includes(state)) return 'signature';
  return null;
}

export function canTransition(from: CustomerState, to: CustomerState): boolean {
  return (TRANSITIONS[from] ?? []).includes(to);
}

/** A paid customer must NEVER re-enter the sales flow, under any circumstance. Spec §5. */
export function isSalesState(state: CustomerState): boolean {
  return ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING'].includes(state);
}
