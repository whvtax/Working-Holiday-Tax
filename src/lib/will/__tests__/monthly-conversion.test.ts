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
  it('returns the last 12 months, oldest first, ending with the current one', () => {
    const rows = monthlyConversion([], [], NOW, 12);
    expect(rows).toHaveLength(12);
    expect(rows[0].month).toBe('2025-09');
    expect(rows[11].month).toBe('2026-08');
    expect(rows[11].label).toBe('Aug 2026');
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

  it('reports a month with no leads as 0, not as a failure', () => {
    const rows = monthlyConversion([customer({ id: 'a', createdAt: '2026-08-01T02:00:00Z' })], [], NOW);
    expect(monthOf(rows, '2026-03')).toMatchObject({ leads: 0, paid: 0, rate: 0 });
  });

  it('ignores customers older than the window rather than folding them into the first month', () => {
    const rows = monthlyConversion([
      customer({ id: 'old', createdAt: '2023-01-05T02:00:00Z', paid: true }),
      customer({ id: 'new', createdAt: '2026-08-05T02:00:00Z' }),
    ], [], NOW);
    expect(rows.reduce((s, m) => s + m.leads, 0)).toBe(1);
    expect(monthOf(rows, '2025-09').leads).toBe(0);
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
