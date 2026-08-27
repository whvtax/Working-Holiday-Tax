/**
 * The two pure parts of the nightly Lost Leads job:
 *
 *  1. WHICH LEADS IT PAYS TO ANALYSE. Getting this wrong is expensive in both
 *     directions — re-analysing a lead that is already done spends money for
 *     nothing every night, and never retrying a transient failure leaves a
 *     permanent hole in the report.
 *  2. THE TIMING PARAGRAPH the model reads. The gap between the price and the
 *     silence is usually the entire story, so it has to be stated in words the
 *     model cannot misread.
 */
jest.mock('@/lib/will/store', () => ({ getStore: () => ({}) }));

import { needsAnalysis, timingSummary, MAX_ATTEMPTS } from '@/lib/will/lost-analysis';
import type { CustomerRow, LostAnalysisRow } from '@/lib/will/store';
import type { LeadTiming } from '@/lib/will/lost-leads';

const NOW = new Date('2026-08-26T00:00:00.000Z');
const hoursAgo = (n: number) => new Date(NOW.getTime() - n * 3600_000).toISOString();

const lead = (id: string) => ({ customer: { id } as CustomerRow });

const stored = (over: Partial<LostAnalysisRow> & { customerId: string }): LostAnalysisRow => ({
  state: 'PRICE_SENT', triggerKind: 'silent', quietDays: 30, hoursPriceToSilence: null,
  status: 'OK', error: null, attempts: 1, reason: 'r', category: 'price',
  shouldHaveDone: 's', fault: 'NOT_OURS', recoverable: 'NO', recoveryAction: null,
  evidenceQuote: null, confidence: 0.7, analysedAt: hoursAgo(48),
  ...over,
} as LostAnalysisRow);

describe('which lost leads still need a post-mortem', () => {
  it('picks up a lead that has never been analysed', () => {
    expect(needsAnalysis([lead('a')], [], NOW).map((c) => c.id)).toEqual(['a']);
  });

  it('never re-analyses a lead that already has an answer', () => {
    expect(needsAnalysis([lead('a')], [stored({ customerId: 'a' })], NOW)).toEqual([]);
  });

  it('retries a failure once it has had a night to settle', () => {
    const rows = [stored({ customerId: 'a', status: 'ERROR', attempts: 1, analysedAt: hoursAgo(48) })];
    expect(needsAnalysis([lead('a')], rows, NOW).map((c) => c.id)).toEqual(['a']);
  });

  it('does NOT retry a failure from an hour ago — one bad evening must not burn every attempt', () => {
    const rows = [stored({ customerId: 'a', status: 'ERROR', attempts: 1, analysedAt: hoursAgo(1) })];
    expect(needsAnalysis([lead('a')], rows, NOW)).toEqual([]);
  });

  it('gives up after the attempt cap rather than paying for the same lead forever', () => {
    const rows = [stored({ customerId: 'a', status: 'ERROR', attempts: MAX_ATTEMPTS, analysedAt: hoursAgo(500) })];
    expect(needsAnalysis([lead('a')], rows, NOW)).toEqual([]);
  });

  it('ignores stored analyses for customers that are no longer lost', () => {
    const rows = [stored({ customerId: 'gone' }), stored({ customerId: 'also-gone' })];
    expect(needsAnalysis([lead('a')], rows, NOW).map((c) => c.id)).toEqual(['a']);
  });
});

describe('the timing paragraph', () => {
  const timing = (over: Partial<LeadTiming> = {}): LeadTiming => ({
    priceSentAt: '2026-07-01T00:00:00.000Z',
    lastCustomerMsgAt: '2026-07-01T00:00:00.000Z',
    hoursPriceToSilence: 0,
    repliesAfterPrice: 0,
    ourMessagesAfterTheirLastWord: 3,
    quietDays: 56,
    ...over,
  });

  it('says plainly when they never spoke again after the price', () => {
    expect(timingSummary(timing())).toContain('never sent another message after it');
  });

  it('says plainly when no price was ever sent', () => {
    expect(timingSummary(timing({ priceSentAt: null }))).toContain('No price was ever sent');
  });

  it('expresses a short gap in hours and a long one in days', () => {
    expect(timingSummary(timing({ repliesAfterPrice: 2, hoursPriceToSilence: 5 }))).toContain('about 5 hours');
    expect(timingSummary(timing({ repliesAfterPrice: 2, hoursPriceToSilence: 96 }))).toContain('about 4 days');
    expect(timingSummary(timing({ repliesAfterPrice: 1, hoursPriceToSilence: 0.5 }))).toContain('under an hour');
  });

  it('always reports the silence and how hard we chased', () => {
    const out = timingSummary(timing({ quietDays: 40, ourMessagesAfterTheirLastWord: 4 }));
    expect(out).toContain('40 day(s) of silence');
    expect(out).toContain('We sent 4 message(s)');
  });

  it('handles a lead who never sent a single message', () => {
    expect(timingSummary(timing({ lastCustomerMsgAt: null }))).toContain('never — they never sent one');
  });
});
