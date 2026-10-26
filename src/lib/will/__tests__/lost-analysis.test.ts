/**
 * The timing paragraph Will reads about a closed lead (win-back evidence).
 * The gap between the price and the silence is usually the entire story, so
 * it has to be stated in words the model cannot misread.
 */
jest.mock('@/lib/will/store', () => ({ getStore: () => ({}) }));

import { timingSummary } from '@/lib/will/lost-analysis';
import type { LeadTiming } from '@/lib/will/lost-leads';


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
