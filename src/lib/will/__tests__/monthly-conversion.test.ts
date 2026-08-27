/**
 * Month-by-month lead → paid conversion.
 *
 * The definition being pinned here (see monthly-conversion.ts):
 *   - a customer belongs to the Melbourne calendar month of created_at,
 *   - they count as converted if they EVER reached paid,
 *   - reaching paid in a later month still counts for the month they arrived,
 *   - nothing is stored, so a past month can never drift or be reset away.
 */
import { monthlyConversion, melbourneMonthKey, recentMonthKeys } from '@/lib/will/monthly-conversion';
import type { CustomerRow, StateHistoryRow } from '@/lib/will/store';

const customer = (over: Partial<CustomerRow> & { id: string; createdAt: string }): CustomerRow => ({
  waId: '+61400000000', name: null, flag: '💬', state: 'NEW_LEAD', income: 'UNKNOWN',
  paid: false, formComplete: false, missingDocs: [], aiPaused: false, isLegacy: false,
  botOwned: true, optedOut: false, estimatedRefundCents: null, lastCustomerMsgAt: null,
  previousState: null, stateChangedAt: over.createdAt, lastMessagePreview: null,
  lastMessageDirection: null, unread: false, unreadCount: 0, lastMessageAt: null, lang: null,
  ...over,
} as CustomerRow);

const NOW = new Date('2026-08-26T12:00:00Z');
const monthOf = (rows: ReturnType<typeof monthlyConversion>, key: string) => rows.find((m) => m.month === key)!;

describe('monthlyConversion', () => {
  // ── Order and length (Jo, 27 Aug) ────────────────────────────────────────
  // "August is the first month and it should be the first row. Every month a
  // new one opens — the current month at the top, last month drops down."

  it('with no data at all, shows only the current month', () => {
    const rows = monthlyConversion([], [], NOW, 12);
    expect(rows).toHaveLength(1);
    expect(rows[0].month).toBe('2026-08');
    expect(rows[0].label).toBe('Aug 2026');
  });

  it('puts the current month first and older months below it', () => {
    const rows = monthlyConversion([
      customer({ id: 'a', createdAt: '2026-06-03T02:00:00Z' }),
      customer({ id: 'b', createdAt: '2026-08-02T02:00:00Z' }),
    ], [], NOW, 12);
    expect(rows.map((m) => m.month)).toEqual(['2026-08', '2026-07', '2026-06']);
  });

  it('starts at the first month that ever had a lead, not 12 months ago', () => {
    // The eleven months before the first lead are not bad months — the system
    // did not exist yet, and printing "no leads" against them says something
    // untrue about the business.
    const rows = monthlyConversion([customer({ id: 'a', createdAt: '2026-08-01T02:00:00Z' })], [], NOW, 12);
    expect(rows).toHaveLength(1);
    expect(rows[0].month).toBe('2026-08');
  });

  it('keeps a quiet month that falls AFTER the first lead', () => {
    // "Nothing happened in July" is real information; "we weren't here in
    // March" is not. Only the second kind is trimmed.
    const rows = monthlyConversion([
      customer({ id: 'a', createdAt: '2026-06-03T02:00:00Z' }),
      customer({ id: 'b', createdAt: '2026-08-02T02:00:00Z' }),
    ], [], NOW, 12);
    expect(monthOf(rows, '2026-07')).toMatchObject({ leads: 0, paid: 0, rate: 0 });
  });

  it('adds a row when the month rolls over, without touching the month below', () => {
    // The same data, read one month later: September opens on top and August
    // keeps the number it had. This is the "grows by one row a month, forever"
    // property, and it holds because nothing is stored.
    const customers = [customer({ id: 'a', createdAt: '2026-08-02T02:00:00Z', paid: true })];
    const inAugust = monthlyConversion(customers, [], NOW, 12);
    const inSeptember = monthlyConversion(customers, [], new Date('2026-09-14T12:00:00Z'), 12);
    expect(inAugust.map((m) => m.month)).toEqual(['2026-08']);
    expect(inSeptember.map((m) => m.month)).toEqual(['2026-09', '2026-08']);
    expect(monthOf(inSeptember, '2026-08')).toEqual(monthOf(inAugust, '2026-08'));
  });

  it('splits leads by the month they first appeared', () => {
    const rows = monthlyConversion([
      customer({ id: 'a', createdAt: '2026-07-03T02:00:00Z' }),
      customer({ id: 'b', createdAt: '2026-07-29T02:00:00Z' }),
      customer({ id: 'c', createdAt: '2026-08-02T02:00:00Z' }),
    ], [], NOW);
    expect(monthOf(rows, '2026-07').leads).toBe(2);
    expect(monthOf(rows, '2026-08').leads).toBe(1);
  });

  it('counts a customer who paid in a LATER month for the month they arrived in', () => {
    // Arrived 30 July, paid 2 August. That is a July win: the question is how
    // many of July's leads became customers, not how much landed in August.
    const rows = monthlyConversion(
      [customer({ id: 'a', createdAt: '2026-07-30T02:00:00Z', state: 'PAID', paid: true })],
      [{ customerId: 'a', from: 'PRICE_SENT', to: 'PAID', causedBy: 'AI', createdAt: '2026-08-02T02:00:00Z' } as StateHistoryRow],
      NOW,
    );
    expect(monthOf(rows, '2026-07')).toMatchObject({ leads: 1, paid: 1, rate: 100 });
    expect(monthOf(rows, '2026-08')).toMatchObject({ leads: 0, paid: 0, rate: 0 });
  });

  it('counts someone who reached paid and later closed', () => {
    // The paid flag can be cleared by nothing today, but a customer moved on to
    // a post-payment stage and then somewhere else must still count: the
    // history is the record of what happened, not just the current row.
    const rows = monthlyConversion(
      [customer({ id: 'a', createdAt: '2026-08-01T02:00:00Z', state: 'NOT_RELEVANT', paid: false })],
      [{ customerId: 'a', from: 'PRICE_SENT', to: 'PAID', causedBy: 'AI', createdAt: '2026-08-05T02:00:00Z' } as StateHistoryRow],
      NOW,
    );
    expect(monthOf(rows, '2026-08')).toMatchObject({ leads: 1, paid: 1 });
  });

  it('does not count a lead who never paid', () => {
    const rows = monthlyConversion(
      [
        customer({ id: 'a', createdAt: '2026-08-01T02:00:00Z', state: 'WENT_COLD' }),
        customer({ id: 'b', createdAt: '2026-08-02T02:00:00Z', state: 'PAID', paid: true }),
      ],
      [{ customerId: 'a', from: 'PRICE_SENT', to: 'WENT_COLD', causedBy: 'SYSTEM', createdAt: '2026-08-09T02:00:00Z' } as StateHistoryRow],
      NOW,
    );
    expect(monthOf(rows, '2026-08')).toMatchObject({ leads: 2, paid: 1, rate: 50 });
  });

  it('ignores customers older than the window rather than folding them into the first month', () => {
    const rows = monthlyConversion([
      customer({ id: 'old', createdAt: '2023-01-05T02:00:00Z', paid: true }),
      customer({ id: 'new', createdAt: '2026-08-05T02:00:00Z' }),
    ], [], NOW);
    expect(rows.reduce((s, m) => s + m.leads, 0)).toBe(1);
    // The 2023 lead is outside the window, so it neither appears as its own row
    // nor drags the list back to 2023 — the list still begins at August.
    expect(rows.map((m) => m.month)).toEqual(['2026-08']);
  });

  it('is stable: recomputing gives the same answer for a past month', () => {
    const customers = [
      customer({ id: 'a', createdAt: '2026-07-03T02:00:00Z', paid: true, state: 'COMPLETED' }),
      customer({ id: 'b', createdAt: '2026-07-04T02:00:00Z' }),
    ];
    const july = (now: Date) => monthOf(monthlyConversion(customers, [], now), '2026-07');
    expect(july(new Date('2026-07-31T12:00:00Z'))).toEqual(july(NOW));
  });

  it('reads month boundaries in Melbourne, not UTC', () => {
    // 31 July 2026, 15:00 UTC is already 1 August in Melbourne (UTC+10).
    expect(melbourneMonthKey('2026-07-31T15:00:00Z')).toBe('2026-08');
    expect(melbourneMonthKey('2026-07-31T13:00:00Z')).toBe('2026-07');
  });

  it('walks back across a year boundary', () => {
    expect(recentMonthKeys(new Date('2026-02-10T00:00:00Z'), 4)).toEqual(['2025-11', '2025-12', '2026-01', '2026-02']);
  });
});
