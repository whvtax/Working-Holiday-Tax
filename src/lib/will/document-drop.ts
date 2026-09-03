// ============================================================
// Documents arriving AFTER the customer has paid.
//
// WHAT WAS HAPPENING
//   Every attachment with no readable text goes to handleInboundNote, which
//   folds the burst into one task and appends the stand-in for each file into
//   that task's context. Before payment that is right: a photo sent while a
//   price is outstanding might be the payment proof, and the owner has to look.
//
//   After payment it is wrong. A paid customer sending their payslips is not
//   raising a question, they are doing the thing we asked them to do. Gerard
//   sent 12 Optus invoices, Sam ~12 photos, Conor ~50, Jp 12 documents, and
//   each one produced a task whose context was fifty lines of
//   "📄 [Document: OptusInvoice.pdf]" and a reason that read like a problem.
//   Six of the sixteen cards on the Decision Log on 28 Aug were this.
//
// WHAT HAPPENS NOW (Jo, 28 Aug)
//   One small task. The context is a tally, not a list: "12 files received
//   after payment." The customer's own words are kept, because a caption is
//   theirs and might be the one line that matters ("this is last year's, not
//   this year's"). The proposed reply is the short acknowledgement Jo asked
//   for, so nobody is left on read while the owner works through the pile.
//
// WHY A TALLY IN THE TEXT RATHER THAN A COUNTER
//   TaskRow has no metadata column and adding one would be a migration for a
//   number. The tally line is written in one fixed shape and read back with
//   the same expression, so incrementing it is exact; anything that is not
//   that shape is left alone as prose.
// ============================================================
import type { CustomerState } from './state-machine';
import { captionAfterPlaceholder, describeSystemPlaceholder } from './handoff-reasons';

/**
 * Everything from the money landing onwards.
 *
 * Deliberately keyed on the state and not on the `paid` flag: the nightly
 * consistency check keeps finding rows where the two disagree, and being wrong
 * in this direction would silence a genuine payment-proof photo.
 */
export const AFTER_PAYMENT_STATES: CustomerState[] = [
  'PAID', 'FORM_PENDING', 'FORM_COMPLETE', 'DOCUMENTS_COMPLETE',
  'UNDER_REVIEW', 'ESTIMATE_READY', 'FINAL_REVIEW',
  'SIGNATURE_PENDING', 'SIGNED', 'LODGED', 'COMPLETED',
];

export function isAfterPayment(state: string | null | undefined): boolean {
  return !!state && (AFTER_PAYMENT_STATES as string[]).includes(state);
}

/** The one shape the tally is ever written in, and the only one read back. */
const TALLY = /^(\d+) files? received after payment\.$/;
const tallyLine = (n: number) => `${n} file${n === 1 ? '' : 's'} received after payment.`;

/** How much of what the customer actually typed is worth carrying forward.
 *  Their words are kept; the point of the tally is that OUR stand-ins are not. */
const MAX_KEPT_LINES = 4;

/**
 * The context for the one small task, given whatever the open task already had.
 *
 * `arriving` is the text of the message that just came in, exactly as it was
 * stored, so a caption travels with its file.
 */
export function foldDocumentDrop(existing: string | null | undefined, arriving: string): string {
  let count = 0;
  const kept: string[] = [];

  for (const raw of (existing ?? '').split('\n')) {
    const line = raw.trim();
    if (!line || line === '---') continue;
    const m = TALLY.exec(line);
    if (m) count += Number(m[1]);
    else kept.push(line);
  }

  const text = (arriving ?? '').trim();
  if (describeSystemPlaceholder(text)) {
    // A file. It is counted, never listed.
    count += 1;
    const caption = captionAfterPlaceholder(text);
    if (caption) kept.push(`They wrote: "${caption}"`);
  } else if (text) {
    // Not one of our stand-ins, so it is the customer's own words.
    kept.push(`They wrote: "${text}"`);
  }

  const words = kept.slice(-MAX_KEPT_LINES);
  return count > 0 ? [...words, tallyLine(count)].join('\n') : words.join('\n');
}

/** How many files the tally in a context is currently standing for. */
export function documentDropCount(context: string | null | undefined): number {
  for (const raw of (context ?? '').split('\n')) {
    const m = TALLY.exec(raw.trim());
    if (m) return Number(m[1]);
  }
  return 0;
}

/**
 * The task's one line of reason.
 *
 * Written to read as housekeeping rather than as a fault, because that is what
 * it is: the customer did what we asked. The Decision Log renders this verbatim.
 */
export function documentDropReason(count: number): string {
  return count > 1
    ? `Paid customer sent ${count} files. Nothing to answer, just collect them.`
    : 'Paid customer sent a file. Nothing to answer, just collect it.';
}
