/**
 * What a payment screenshot has to show before it is VERIFIED, as opposed to
 * merely "looks like a payment".
 *
 * Jo, 3 Sep: a German customer sent a Wise confirmation (220 AUD to Simple Tax
 * Services, reference, transaction number) and Will read every word of it,
 * moved him to Paid, sent the confirmation, and then opened a task asking Jo
 * to glance at the picture "to confirm it looks right". Jo's point: the model
 * that read the picture can see whether it is right. So the vision check now
 * extracts the amount, the recipient and the status, and this module decides
 * whether those add up to OUR fee reaching OUR account. When they do, the
 * payment is confirmed with no task at all. When something is not visible
 * (a screenshot of the transfer being sent rather than received, a foreign
 * currency amount with no AUD figure, a cropped recipient), the stage still
 * moves (we trust the customer) but the heads-up task says exactly what could
 * not be checked, so the glance is a short one.
 *
 * Pure functions, no I/O, so every branch is unit-tested.
 */

/** Our two fees, in AUD. A phone consultation ($110) is not a fee for the
 *  return and never confirms a payment screenshot. */
export const FEES_AUD = [220, 385] as const;

/** How far the amount that lands may sit from the fee and still count. A
 *  transfer from overseas can lose a few dollars to an intermediary, and a
 *  customer sometimes rounds up. Anything further off is not "the fee". */
export const AMOUNT_TOLERANCE_AUD = 15;

export type RecipientMatch = 'yes' | 'no' | 'unknown';
export type ProofStatus = 'completed' | 'pending' | 'failed' | 'unknown';

/** What the vision check could read off the attachment. Every field may be
 *  unknown: the model is told to say so rather than guess. */
export interface ProofDetails {
  /** AUD reaching the recipient if shown, else the AUD amount sent; null when
   *  no AUD figure is visible (foreign currency only, or cropped). */
  amountAud: number | null;
  /** Recipient exactly as displayed, for the audit trail and the task text. */
  recipient: string | null;
  /** Whether the recipient is us (Simple Tax Services / BSB 062692 / account
   *  81049952). 'no' means a DIFFERENT recipient is clearly shown. */
  recipientIsUs: RecipientMatch;
  status: ProofStatus;
}

export interface ProofVerification {
  /** Our fee, to our account, completed: nothing for a person to check. */
  verified: boolean;
  /** What stopped full verification, in the order a person would check it.
   *  Empty when verified. Written to be dropped straight into a task reason. */
  unverified: string[];
}

export function amountMatchesFee(amount: number | null): boolean {
  if (amount == null || !Number.isFinite(amount)) return false;
  return FEES_AUD.some((fee) => Math.abs(amount - fee) <= AMOUNT_TOLERANCE_AUD);
}

/** The screenshot shows a payment, but demonstrably NOT one to us: a different
 *  recipient, or a transfer that failed. These must never confirm a payment on
 *  the strength of the picture alone. (A customer who also SAYS they paid is
 *  still trusted; the task then carries this verdict so the mismatch is seen.) */
export function isNotOurPayment(d: ProofDetails): boolean {
  return d.recipientIsUs === 'no' || d.status === 'failed';
}

export function verifyProofDetails(d: ProofDetails): ProofVerification {
  const unverified: string[] = [];
  if (d.recipientIsUs === 'no') unverified.push(`the recipient shown is ${d.recipient ?? 'someone else'}, not us`);
  else if (d.recipientIsUs !== 'yes') unverified.push('the recipient is not visible');
  if (d.amountAud == null) unverified.push('no AUD amount is visible');
  else if (!amountMatchesFee(d.amountAud)) unverified.push(`the amount is ${formatAud(d.amountAud)}, not $220 or $385`);
  if (d.status === 'failed') unverified.push('the transfer shows as failed');
  else if (d.status === 'pending') unverified.push('the transfer shows as pending, not completed');
  else if (d.status === 'unknown') unverified.push('no completed status is visible');
  return { verified: unverified.length === 0, unverified };
}

/** One line for the audit trail and the task: what the picture showed. */
export function describeProof(d: ProofDetails): string {
  const parts: string[] = [];
  parts.push(d.amountAud != null ? formatAud(d.amountAud) : 'an amount not shown in AUD');
  if (d.recipientIsUs === 'yes') parts.push('to Simple Tax Services');
  else if (d.recipient) parts.push(`to ${d.recipient}`);
  if (d.status === 'completed') parts.push('completed');
  else if (d.status !== 'unknown') parts.push(d.status);
  return parts.join(', ');
}

function formatAud(n: number): string {
  const whole = Number.isInteger(n) ? String(n) : n.toFixed(2);
  return `$${whole}`;
}

/** Coerce whatever the model returned into ProofDetails, never throwing: a
 *  field the model got wrong reads as unknown, which only ever means "a person
 *  glances", never "confirmed by mistake". */
export function coerceProofDetails(raw: unknown): ProofDetails {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const amount = typeof r.amount_aud === 'number' && Number.isFinite(r.amount_aud) && r.amount_aud >= 0
    ? r.amount_aud
    : typeof r.amount_aud === 'string' && /^\s*\$?\s*\d[\d,]*(\.\d+)?\s*$/.test(r.amount_aud)
      ? Number(r.amount_aud.replace(/[^\d.]/g, ''))
      : null;
  const recipient = typeof r.recipient === 'string' && r.recipient.trim() ? r.recipient.trim().slice(0, 120) : null;
  const recipientIsUs: RecipientMatch = r.recipient_is_us === 'yes' || r.recipient_is_us === 'no' ? r.recipient_is_us : 'unknown';
  const status: ProofStatus = r.status === 'completed' || r.status === 'pending' || r.status === 'failed' ? r.status : 'unknown';
  return { amountAud: amount, recipient, recipientIsUs, status };
}
