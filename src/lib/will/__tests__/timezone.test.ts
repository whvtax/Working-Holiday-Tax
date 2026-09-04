/**
 * localMidnightUtc (config.ts) is what the daily-digest job scheduling and
 * the digest's own day-window calculation both depend on to land at 8am
 * Melbourne and to know which calendar day just ended. It was never
 * exercised by a test before — this pins it against known AEST/AEDT dates,
 * including a DST transition, so a regression here (which would silently
 * shift when the digest fires, or which day it reports on) is caught.
 */
import { localMidnightUtc } from '@/lib/will/config';

describe('localMidnightUtc: Australia/Melbourne', () => {
  it('AEST (winter, UTC+10): local midnight is 14:00 UTC the previous day', () => {
    // 26 August 2026 00:00 Melbourne == 25 August 2026 14:00 UTC.
    const d = localMidnightUtc('Australia/Melbourne', 2026, 8, 26);
    expect(d.toISOString()).toBe('2026-08-25T14:00:00.000Z');
  });

  it('AEDT (summer, UTC+11): local midnight is 13:00 UTC the previous day', () => {
    // 26 January 2026 00:00 Melbourne == 25 January 2026 13:00 UTC.
    const d = localMidnightUtc('Australia/Melbourne', 2026, 1, 26);
    expect(d.toISOString()).toBe('2026-01-25T13:00:00.000Z');
  });

  it('a day-of-month overflow rolls into the next month, same as the Date constructor', () => {
    // "day 32" of August is 1 September.
    const overflow = localMidnightUtc('Australia/Melbourne', 2026, 8, 32);
    const direct = localMidnightUtc('Australia/Melbourne', 2026, 9, 1);
    expect(overflow.toISOString()).toBe(direct.toISOString());
  });

  it('24 hours apart, one calendar day to the next, even across the AEDT->AEST transition (5 Apr 2026)', () => {
    const before = localMidnightUtc('Australia/Melbourne', 2026, 4, 4); // still AEDT
    const after = localMidnightUtc('Australia/Melbourne', 2026, 4, 6); // now AEST
    // Exactly 2 calendar days apart in Melbourne, but the clocks-back hour
    // means it is 49 real hours, not 48 — this is what proves the function
    // reads the actual offset for each date rather than reusing one guess.
    expect((after.getTime() - before.getTime()) / 3600000).toBe(49);
  });
});

// ── 4 Sep audit: the two days a year the one-pass offset read was wrong ─────
import { localTimeUtc, localParts } from '@/lib/will/config';
import { aiCallsKeyFor } from '@/lib/will/ai-budget';

describe('DST days', () => {
  const melbHour = (d: Date) => Number(new Intl.DateTimeFormat('en-CA', {
    hour: '2-digit', hour12: false, timeZone: 'Australia/Melbourne',
  }).format(d));

  it('local midnight is midnight on the day the clocks go forward (October)', () => {
    // AEST -> AEDT, first Sunday in October 2026 = 4 Oct.
    expect(melbHour(localMidnightUtc('Australia/Melbourne', 2026, 10, 4))).toBe(0);
    expect(melbHour(localMidnightUtc('Australia/Melbourne', 2026, 10, 5))).toBe(0);
  });

  it('local midnight is midnight on the day the clocks go back (April)', () => {
    expect(melbHour(localMidnightUtc('Australia/Melbourne', 2026, 4, 5))).toBe(0);
  });

  it('8am is 8am on both transition days, so the digest never skips one', () => {
    for (const [mo, da] of [[10, 4], [10, 5], [4, 5], [4, 6], [6, 15]] as [number, number][]) {
      expect(melbHour(localTimeUtc('Australia/Melbourne', 2026, mo, da, 8))).toBe(8);
    }
  });

  it('3am nightly maintenance is 3am in Melbourne, not on the server', () => {
    const { y, mo, da } = localParts('Australia/Melbourne');
    expect(melbHour(localTimeUtc('Australia/Melbourne', y, mo, da + 1, 3))).toBe(3);
  });

  it('the AI budget day is the Melbourne day', () => {
    // 23:30 UTC on 3 Sep is already 4 Sep in Melbourne (UTC+10).
    expect(aiCallsKeyFor(new Date('2026-09-03T23:30:00Z'))).toBe('ai_calls:2026-09-04');
  });
});
