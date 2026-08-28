// ============================================================
// Sending the estimate and the invoice: the parts worth testing.
//
// WHY THIS IS NOT ALL IN THE ROUTE. Next.js validates route files against a
// fixed set of allowed exports and fails the build on anything else, so nothing
// in api/will/actions/route.ts can be imported by a test. The three decisions
// that can actually go wrong live here instead: who may be sent an estimate,
// where they end up afterwards, and how the money is written.
//
// WHAT CHANGED, AND WHY IT MATTERS (Jo, 28 Aug). This used to leave the
// customer at Estimate Ready, in the middle of Review. It is pressed at the END
// of the job now, from the Done button on a CRM task, so the customer moves to
// Signature. Getting this wrong in either direction is expensive: too early and
// the signature reminders chase somebody whose return is not written yet; too
// late and a finished return sits in Review where no follow-up ever reaches it.
// ============================================================
import type { CustomerState } from './state-machine';

/**
 * Who may be sent an estimate.
 *
 * From the questionnaire coming back, through the whole of Review, and on into
 * Signature and Signed. The tail end is there for a correction resend: getting
 * the amount wrong by a digit is a thing that happens, and the fix has to be
 * one more press of the same button, not a stage rolled backwards by hand.
 */
export const ESTIMATE_SENDABLE_STATES: CustomerState[] = [
  'FORM_COMPLETE', 'DOCUMENTS_COMPLETE', 'UNDER_REVIEW', 'ESTIMATE_READY', 'FINAL_REVIEW',
  'SIGNATURE_PENDING', 'SIGNED',
];

/** States where sending again is a correction, so the stage must not move. */
const ALREADY_THERE: CustomerState[] = ['SIGNATURE_PENDING', 'SIGNED', 'LODGED', 'COMPLETED'];

export function canSendEstimate(state: string | null | undefined): boolean {
  return !!state && (ESTIMATE_SENDABLE_STATES as string[]).includes(state);
}

/**
 * Where the customer sits once the estimate has gone.
 *
 * Null means "leave them exactly where they are", which is the answer for
 * anyone already at Signature or past it.
 */
export function stateAfterEstimate(state: string): CustomerState | null {
  return (ALREADY_THERE as string[]).includes(state) ? null : 'SIGNATURE_PENDING';
}

/**
 * The refund, written the way the approved message expects it.
 *
 * Always two decimals. formatAUD drops them on a whole-dollar amount, and
 * "Your estimated tax refund is $3,004" next to an invoice for $3,004.00 reads
 * like two different numbers.
 */
export function formatEstimateAmount(cents: number): string {
  return '$' + (Math.round(cents) / 100).toLocaleString('en-AU', {
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  });
}

/**
 * The message itself.
 *
 * `template` is the owner's CURRENT Library wording, so the layout is his to
 * change without a deploy. Both placeholders are filled here, before the policy
 * guard runs, so a leftover {{...}} is refused like anywhere else.
 */
export function composeEstimate(template: string, cents: number, invoiceUrl: string): string {
  return template
    .replaceAll('{{AMOUNT}}', formatEstimateAmount(cents))
    .replaceAll('{{INVOICE_LINK}}', invoiceUrl);
}
