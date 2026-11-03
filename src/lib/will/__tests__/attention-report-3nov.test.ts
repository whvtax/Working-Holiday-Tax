import { buildAttentionReport } from '../attention-report';

const c = [{ id: 'c1', name: 'A', waId: '1', state: 'PRICE_SENT', paid: false }, { id: 'c2', name: 'B', waId: '2', state: 'LODGED', paid: true }];
const base = (o: object) => ({ customerId: 'c1', direction: 'OUT', author: 'WILL', status: 'SENT', body: 'x', createdAt: '2026-11-03T01:00:00Z', ...o });

describe('attention report', () => {
  it('lists unanswered, blocked drafts with the customer message, and handoffs; skips handled customers', () => {
    const r = buildAttentionReport({
      customers: c as never,
      messages: [
        base({ direction: 'IN', body: 'is it lodged?', createdAt: '2026-11-03T01:00:00Z' }),
        base({ status: 'BLOCKED', body: 'Draft reply', meta: { review: 'held: deadline wording' }, createdAt: '2026-11-03T01:05:00Z' }),
        base({ customerId: 'c2', direction: 'IN', body: 'hi', createdAt: '2026-11-03T01:00:00Z' }),
        base({ customerId: 'c2', body: 'hello', createdAt: '2026-11-03T01:01:00Z' }),
      ] as never,
      tasks: [{ customerId: 'c1', createdAt: '2026-11-03T01:06:00Z', severity: 'HIGH', status: 'OPEN', reason: 'Question for team', suggestedReply: 'Suggested' }],
      audit: [], since: Date.parse('2026-11-03T00:00:00Z'), now: Date.parse('2026-11-03T02:00:00Z'),
    });
    expect(r.customers).toBe(1);
    expect(r.text).toContain('UNANSWERED');
    expect(r.text).toContain('is it lodged?');
    expect(r.text).toContain('BLOCKED BY THE SAFETY CHECK');
    expect(r.text).toContain('held: deadline wording');
    expect(r.text).toContain('HANDED TO TEAM');
    expect(r.text).toContain('Suggested');
  });
  it('ignores items older than the marker', () => {
    const r = buildAttentionReport({
      customers: c as never,
      messages: [base({ direction: 'IN', body: 'old', createdAt: '2026-10-01T01:00:00Z' })] as never,
      tasks: [], audit: [], since: Date.parse('2026-11-03T00:00:00Z'),
    });
    expect(r.items).toBe(0);
  });
});
