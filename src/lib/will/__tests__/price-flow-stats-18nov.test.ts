/** Jo, 18 Nov: the price message A/B result counts each customer once, by their first price message. */
import { priceFlowStats, PRICE_FLOW_MIN_PER_SIDE } from '@/lib/will/price-flow-stats';
import type { AuditRow, CustomerRow } from '@/lib/will/store';

const sent = (customerId: string, priceFlow: string, at: string): AuditRow => ({ id: `${customerId}-${at}`, actor: 'assistant', action: 'instant_price_sent', detail: { customerId, priceFlow }, at });
const cust = (id: string, paid: boolean) => ({ id, paid }) as unknown as CustomerRow;

describe('priceFlowStats', () => {
  it('counts sent, paid and the rate per version', () => {
    const s = priceFlowStats(
      [sent('c1', 'old', '2026-11-01'), sent('c2', 'old', '2026-11-01'), sent('c3', 'new', '2026-11-01'), sent('c4', 'new', '2026-11-01')],
      [cust('c1', true), cust('c2', false), cust('c3', true), cust('c4', true)],
    );
    expect(s.a).toEqual({ sent: 2, paid: 1, rate: 50 });
    expect(s.b).toEqual({ sent: 2, paid: 2, rate: 100 });
    expect(s.enough).toBe(false);
    expect(s.minPerSide).toBe(PRICE_FLOW_MIN_PER_SIDE);
  });

  it('a customer who got both counts for the first one only', () => {
    const s = priceFlowStats([sent('c1', 'new', '2026-11-02'), sent('c1', 'old', '2026-11-01')], [cust('c1', true)]);
    expect(s.a.sent).toBe(1);
    expect(s.b.sent).toBe(0);
  });

  it('no data gives no rate, and rows without a version or a known customer are ignored', () => {
    const s = priceFlowStats([sent('gone', 'old', '2026-11-01'), { id: 'x', actor: 'assistant', action: 'instant_price_sent', detail: { customerId: 'c1' }, at: '2026-11-01' }], [cust('c1', true)]);
    expect(s.a).toEqual({ sent: 0, paid: 0, rate: null });
    expect(s.b.rate).toBeNull();
  });
});
