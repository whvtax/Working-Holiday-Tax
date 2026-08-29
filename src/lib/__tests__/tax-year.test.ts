/**
 * The 1 July boundary, which for this business is the most load-bearing date
 * there is.
 *
 * WHAT WAS WRONG. Eight independent implementations across db.ts, both
 * dashboards, the client page and the public form, in two groups that disagree
 * with each other for ten hours every 1 July: some anchored to Australia/Sydney,
 * some using `new Date().getMonth()`, which is whatever timezone the machine or
 * the visitor's browser happens to be in. Two of the eight were evaluated at
 * module scope, so a tab left open across 1 July kept serving last year's list.
 *
 * Every one of those failures lands in the first week of July, the busiest week
 * of the year, and every one is silent: a return filed against the wrong year, a
 * badge resetting a day early, a cohort view targeting the wrong people. Nothing
 * throws, and you hear about it from a client.
 *
 * These tests fix the clock so the boundary itself is asserted, rather than
 * whatever today happens to be.
 */
import { currentTaxYear, currentTaxYearStart, taxYearRange, lastCompletedTaxYear } from '@/lib/tax-year';

/** Freeze the wall clock at a real instant, in UTC. */
function at<T>(iso: string, fn: () => T): T {
  jest.useFakeTimers().setSystemTime(new Date(iso));
  try { return fn(); } finally { jest.useRealTimers(); }
}

describe('the boundary is 1 July in Sydney, not wherever the caller is', () => {
  it('is the new year from the first moment of 1 July Sydney time', () => {
    // 30 June 2026 14:00 UTC is 1 July 2026 00:00 AEST.
    expect(at('2026-06-30T14:00:00Z', currentTaxYear)).toBe('2026-27');
  });

  it('is still the old year an hour earlier', () => {
    // 30 June 2026 13:00 UTC is 23:00 on 30 June in Sydney.
    expect(at('2026-06-30T13:00:00Z', currentTaxYear)).toBe('2025-26');
  });

  it('does not follow the browser into another timezone', () => {
    // THE BUG. A backpacker filling in the form from Manchester at this instant
    // is in June by their clock and in July by Sydney's. The Australian tax year
    // is the one that decides, every time.
    const utcMonthIsJune = new Date('2026-06-30T14:00:00Z').getUTCMonth() === 5;
    expect(utcMonthIsJune).toBe(true);
    expect(at('2026-06-30T14:00:00Z', currentTaxYear)).toBe('2026-27');
  });

  it('holds mid-year in both halves', () => {
    expect(at('2026-08-28T03:00:00Z', currentTaxYear)).toBe('2026-27');
    expect(at('2026-02-14T03:00:00Z', currentTaxYear)).toBe('2025-26');
  });
});

describe('the year people actually lodge for', () => {
  it('is the most recently completed one, not the one in progress', () => {
    // Lodging in August 2026 targets 2025-26. Defaulting the form to the
    // in-progress year would ask for a return that cannot be lodged yet.
    expect(at('2026-08-28T03:00:00Z', lastCompletedTaxYear)).toBe('2025-26');
  });

  it('rolls over with the boundary', () => {
    expect(at('2026-06-30T13:00:00Z', lastCompletedTaxYear)).toBe('2024-25');
    expect(at('2026-06-30T14:00:00Z', lastCompletedTaxYear)).toBe('2025-26');
  });
});

describe('the dropdown', () => {
  it('is newest first, so the year being lodged is at the top', () => {
    const years = at('2026-08-28T03:00:00Z', () => taxYearRange());
    expect(years[0]).toBe('2031-32');
    expect(years[years.length - 1]).toBe('2021-22');
    expect(years).toContain('2026-27');
  });

  it('spans five back and five forward by default', () => {
    expect(at('2026-08-28T03:00:00Z', () => taxYearRange())).toHaveLength(11);
  });

  it('is recomputed on every call, never frozen at import', () => {
    // The module-scope bug: a CRM tab open across 1 July kept the old list.
    const before = at('2026-06-30T13:00:00Z', () => taxYearRange()[0]);
    const after = at('2026-06-30T14:00:00Z', () => taxYearRange()[0]);
    expect(before).toBe('2030-31');
    expect(after).toBe('2031-32');
  });

  it('agrees with currentTaxYearStart', () => {
    expect(at('2026-08-28T03:00:00Z', currentTaxYearStart)).toBe(2026);
  });
});
