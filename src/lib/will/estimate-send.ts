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
  'FORM_COMPLETE', 'DOCUMENTS_COMPLETE', 'UNDER_REVIEW', 'ESTIMATE_READY', 'LODGEMENT_PENDING',
  'FINAL_REVIEW', 'SIGNATURE_PENDING', 'SIGNED',
];

/** States where sending again is a correction, so the stage must not move
 *  backwards (they have already paid the lodgement fee or moved past it). */
const ALREADY_THERE: CustomerState[] = ['FINAL_REVIEW', 'SIGNATURE_PENDING', 'SIGNED', 'LODGED', 'COMPLETED'];

export function canSendEstimate(state: string | null | undefined): boolean {
  return !!state && (ESTIMATE_SENDABLE_STATES as string[]).includes(state);
}

/**
 * Where the customer sits once the result + lodgement invoice has gone (Jo,
 * 2 Sep, two-step model). They now owe the second (lodgement) payment before
 * the return goes out for signature, so they move to LODGEMENT_PENDING. Null
 * means "leave them where they are", the answer for a correction resend to
 * someone who has already paid the lodgement fee.
 */
export function stateAfterEstimate(state: string): CustomerState | null {
  return (ALREADY_THERE as string[]).includes(state) ? null : 'LODGEMENT_PENDING';
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
 * The fields the team fills in the CRM estimate composer (Jo, 2 Sep). Two
 * toggles (residency, and refund vs payable) plus the money lines and the
 * Medicare exemption. `incomeType` decides the lodgement fee shown ($110 for
 * TFN, $275 for TFN + ABN). All money values are in cents.
 */
export interface EstimateFields {
  residency: 'WHM' | 'RESIDENT';
  taxableIncomeCents: number;
  taxWithheldCents: number;
  taxPayableCents: number;
  expensesCents: number;
  medicareExempt: boolean;
  medicareCents: number;
  outcome: 'REFUND' | 'PAYABLE';
  outcomeCents: number;
  incomeType: 'TFN' | 'TFN_ABN';
}

/** The lodgement top-up fee shown in the result message, by income type. */
export function lodgementFeeLabel(incomeType: 'TFN' | 'TFN_ABN'): string {
  return incomeType === 'TFN_ABN' ? '$275' : '$110';
}

/**
 * The result message itself (the two-step model's value message).
 *
 * `template` is the owner's CURRENT Library wording, so the layout is his to
 * change without a deploy. EVERY placeholder is filled here, before the policy
 * guard runs, so a leftover {{...}} is refused like anywhere else.
 */
export function composeEstimate(template: string, f: EstimateFields): string {
  const money = (c: number) => formatEstimateAmount(c);
  const residency = f.residency === 'RESIDENT'
    ? 'Australian resident for tax purposes'
    : 'Working Holiday Maker';
  const medicare = f.medicareExempt ? '$0 (exempt)' : money(f.medicareCents);
  const outcomeLabel = f.outcome === 'REFUND' ? 'Estimated refund' : 'Estimated tax payable';
  const explanation = f.outcome === 'REFUND'
    ? "You paid more tax than you needed to during the year, which is why you're due a refund."
    : "You paid less than required during the year, which is why there's an amount payable.";
  return template
    .replaceAll('{{RESIDENCY}}', residency)
    .replaceAll('{{TAXABLE_INCOME}}', money(f.taxableIncomeCents))
    .replaceAll('{{EXPENSES}}', money(f.expensesCents))
    .replaceAll('{{MEDICARE}}', medicare)
    .replaceAll('{{TAX_WITHHELD}}', money(f.taxWithheldCents))
    .replaceAll('{{TAX_PAYABLE}}', money(f.taxPayableCents))
    .replaceAll('{{OUTCOME_LABEL}}', outcomeLabel)
    .replaceAll('{{OUTCOME_AMOUNT}}', money(f.outcomeCents))
    .replaceAll('{{EXPLANATION}}', explanation)
    .replaceAll('{{LODGEMENT_FEE}}', lodgementFeeLabel(f.incomeType));
}
