/**
 * Exact Claude cost (Jo, 24 Sep). Prices per million tokens from the published
 * list; the ledger prices each call from the token counts Anthropic returned.
 */
import { costUsd, priceFor, usageFromResponse, summariseUsage } from '@/lib/will/ai-usage';
import { sumBuckets } from '@/lib/will/cost-report';

it('prices a Sonnet 4.5 call exactly', () => {
  // 2,000 in @ $3, 200 out @ $15, 1,000 cache read @ $0.30
  expect(costUsd('claude-sonnet-4-5', { input: 2000, output: 200, cacheWrite: 0, cacheRead: 1000 })).toBeCloseTo(0.006 + 0.003 + 0.0003, 6);
});
it('a dated model id prices like its family, an unknown model is null', () => {
  expect(priceFor('claude-sonnet-4-5-20250929')).toEqual(priceFor('claude-sonnet-4-5'));
  expect(priceFor('claude-haiku-4-5-20251001')?.in).toBe(1);
  expect(costUsd('claude-nothing-9', { input: 1, output: 1, cacheWrite: 0, cacheRead: 0 })).toBeNull();
});
it('reads the four counters off a response and treats missing ones as 0', () => {
  expect(usageFromResponse({ usage: { input_tokens: 10, output_tokens: 5 } })).toEqual({ input: 10, output: 5, cacheWrite: 0, cacheRead: 0 });
  expect(usageFromResponse({ usage: { input_tokens: 10, cache_read_input_tokens: 90 } }).cacheRead).toBe(90);
  expect(usageFromResponse(null).input).toBe(0);
});
it('sums by feature, day and month, and reports the cache hit rate', () => {
  const rows = [
    { at: '2026-09-01T02:00:00Z', feature: 'decide', model: 'claude-sonnet-4-5', inputTokens: 1000, outputTokens: 100, cacheWriteTokens: 0, cacheReadTokens: 3000, costUsd: 0.0054 },
    { at: '2026-09-02T02:00:00Z', feature: 'mining', model: 'claude-sonnet-4-5', inputTokens: 1000, outputTokens: 100, cacheWriteTokens: 0, cacheReadTokens: 0, costUsd: 0.0045 },
    { at: '2026-08-30T02:00:00Z', feature: 'decide', model: 'claude-x', inputTokens: 1, outputTokens: 1, cacheWriteTokens: 0, cacheReadTokens: 0, costUsd: null },
  ];
  const s = summariseUsage(rows);
  expect(s.calls).toBe(3);
  expect(s.unpricedCalls).toBe(1);
  expect(s.totalUsd).toBeCloseTo(0.01, 2);
  expect(s.byMonth.map((m) => m.month)).toEqual(['2026-08', '2026-09']);
  expect(s.byFeature[0].feature).toBe('decide');
  expect(s.cacheHitRate).toBe(60); // 3000 cached of 5001 input
  expect(s.cacheSavedUsd).toBeCloseTo(0.01, 2); // 3000 × ($3 − $0.30)/1M = $0.0081, shown to the cent
});
it('the cost report amounts are USD strings, summed per day', () => {
  const days = sumBuckets([
    { starting_at: '2026-09-01T00:00:00Z', ending_at: '2026-09-02T00:00:00Z', results: [{ amount: '1.25', currency: 'USD' }, { amount: '0.75', currency: 'USD' }] },
  ]);
  expect(days).toEqual([{ day: '2026-09-01', usd: 2 }]);
});
