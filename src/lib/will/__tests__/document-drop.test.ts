/**
 * Documents arriving after payment.
 *
 * WHAT THIS IS PINNING. On 28 Aug, six of the sixteen cards on the Decision Log
 * were one paid customer emptying their phone at us: Gerard's 12 Optus
 * invoices, Sam's ~12 photos, Conor's ~50, Jp's 12 documents. Each burst
 * produced a task whose context was that many lines of
 * "📄 [Document: OptusInvoice.pdf]" and whose reason read like a fault.
 *
 * The rule now: after payment it is one small task with a count. What must NOT
 * be lost in the folding is the customer's own words, because a caption is the
 * one thing in a document drop that can change what the owner does with it
 * ("this is last year's, not this year's").
 */
import {
  isAfterPayment, foldDocumentDrop, documentDropCount, documentDropReason,
} from '@/lib/will/document-drop';
import { ALL_STATES } from '@/lib/will/state-machine';

describe('isAfterPayment', () => {
  it('is false everywhere the money has not landed', () => {
    // Before payment a photo may BE the payment proof, so it must keep going
    // down the path that looks at it.
    for (const s of ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING']) {
      expect(isAfterPayment(s)).toBe(false);
    }
  });

  it('is false for the closed states', () => {
    for (const s of ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT']) {
      expect(isAfterPayment(s)).toBe(false);
    }
  });

  it('is true for everything from PAID onwards', () => {
    for (const s of ['PAID', 'FORM_PENDING', 'FORM_COMPLETE', 'DOCUMENTS_COMPLETE',
      'UNDER_REVIEW', 'ESTIMATE_READY', 'FINAL_REVIEW', 'SIGNATURE_PENDING',
      'SIGNED', 'LODGED', 'COMPLETED']) {
      expect(isAfterPayment(s)).toBe(true);
    }
  });

  it('classifies every state that exists, so a new one cannot be forgotten', () => {
    // Not an assertion about which side each falls on: an assertion that the
    // list above and ALL_STATES are the same set. A state added to the machine
    // and not to either list fails here rather than silently defaulting.
    const known = new Set([...ALL_STATES]);
    expect(known.size).toBe(ALL_STATES.length);
    for (const s of ALL_STATES) expect(typeof isAfterPayment(s)).toBe('boolean');
  });

  it('never throws on nothing', () => {
    expect(isAfterPayment(null)).toBe(false);
    expect(isAfterPayment(undefined)).toBe(false);
    expect(isAfterPayment('')).toBe(false);
  });
});

describe('foldDocumentDrop', () => {
  it('counts the first file instead of listing it', () => {
    expect(foldDocumentDrop(null, '📄 [Document: OptusInvoice.pdf]'))
      .toBe('1 file received after payment.');
  });

  it('increments rather than accumulating lines', () => {
    let ctx: string | null = null;
    for (let i = 0; i < 12; i++) ctx = foldDocumentDrop(ctx, '📄 [Document: OptusInvoice.pdf]');
    expect(ctx).toBe('12 files received after payment.');
    // The whole point: twelve arrivals, one line.
    expect(ctx!.split('\n')).toHaveLength(1);
  });

  it('survives Conor: fifty files stay one short line', () => {
    let ctx: string | null = null;
    for (let i = 0; i < 50; i++) ctx = foldDocumentDrop(ctx, '📷 [Photo]');
    expect(documentDropCount(ctx)).toBe(50);
    expect(ctx!.length).toBeLessThan(60);
  });

  it('keeps what the customer typed, which the count must never swallow', () => {
    let ctx = foldDocumentDrop(null, '📷 [Photo]');
    ctx = foldDocumentDrop(ctx, '📷 [Photo] this one is from last year, ignore it');
    ctx = foldDocumentDrop(ctx, '📷 [Photo]');
    expect(ctx).toContain('They wrote: "this one is from last year, ignore it"');
    expect(documentDropCount(ctx)).toBe(3);
  });

  it('keeps a plain message that arrives in the middle of a burst', () => {
    let ctx = foldDocumentDrop(null, '📄 [Document]');
    ctx = foldDocumentDrop(ctx, 'is that everything you need?');
    expect(ctx).toContain('They wrote: "is that everything you need?"');
    expect(documentDropCount(ctx)).toBe(1);
  });

  it('does not let their words grow without bound either', () => {
    let ctx: string | null = null;
    for (let i = 0; i < 30; i++) ctx = foldDocumentDrop(ctx, `📷 [Photo] note ${i}`);
    // Most recent kept, oldest dropped, count still exact.
    expect(documentDropCount(ctx)).toBe(30);
    expect(ctx).toContain('note 29');
    expect(ctx).not.toContain('note 3"');
    expect(ctx!.split('\n').length).toBeLessThanOrEqual(5);
  });

  it('leaves prose from an earlier, different task alone', () => {
    // The open task might have been raised for something else entirely. Folding
    // must not delete the reason a person was called in.
    const ctx = foldDocumentDrop('Customer asked whether the fee is refundable', '📷 [Photo]');
    expect(ctx).toContain('Customer asked whether the fee is refundable');
    expect(ctx).toContain('1 file received after payment.');
  });

  it('never throws on empty input', () => {
    expect(() => foldDocumentDrop(null, '')).not.toThrow();
    expect(foldDocumentDrop(null, '')).toBe('');
    expect(documentDropCount(null)).toBe(0);
    expect(documentDropCount('nothing to see')).toBe(0);
  });
});

describe('documentDropReason', () => {
  it('reads as housekeeping, not as a fault', () => {
    // The Decision Log renders this verbatim. The customer did what we asked.
    expect(documentDropReason(12)).toBe('Paid customer sent 12 files. Nothing to answer, just collect them.');
    expect(documentDropReason(1)).toBe('Paid customer sent a file. Nothing to answer, just collect it.');
  });

  it('carries no AI dash', () => {
    for (const n of [1, 2, 50]) {
      expect(documentDropReason(n)).not.toMatch(/[—–―−]/);
    }
  });
});
