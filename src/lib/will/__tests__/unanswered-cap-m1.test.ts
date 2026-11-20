// Rule M1 (Nov 2026): no more than three of our messages in a row without a reply.
import { unansweredRun, followUpBlock, UNANSWERED_CAP } from '../followup-gate-30oct';

const OUT = (body = 'x') => ({ direction: 'OUT' as const, author: 'AI' as const, status: 'SENT' as const, body, createdAt: '2026-11-01T10:00:00Z' });
const IN = (body = 'hi') => ({ direction: 'IN' as const, author: 'CUSTOMER' as const, status: 'SENT' as const, body, createdAt: '2026-11-01T09:00:00Z' });
const cust = { paid: false, outcome: null, estimatedRefundCents: null } as never;

describe('M1: unanswered cap', () => {
  it('cap is three', () => { expect(UNANSWERED_CAP).toBe(3); });
  it('counts our messages since the customer last wrote', () => {
    expect(unansweredRun([IN(), OUT(), OUT()])).toBe(2);
  });
  it('a reply resets the count', () => {
    expect(unansweredRun([OUT(), OUT(), OUT(), IN(), OUT()])).toBe(1);
  });
  it('blocks any follow-up flow after three unanswered messages', () => {
    const msgs = [IN(), OUT(), OUT(), OUT()];
    expect(followUpBlock(cust, 'prePayment', msgs)).not.toBeNull();
    expect(followUpBlock(cust, 'form', msgs)).not.toBeNull();
    expect(followUpBlock(cust, 'signature', msgs)).not.toBeNull();
  });
  it('two unanswered messages still allow a follow-up', () => {
    expect(followUpBlock(cust, 'prePayment', [IN(), OUT(), OUT()])).toBeNull();
  });
  it('a failed send does not count', () => {
    expect(unansweredRun([IN(), { ...OUT(), status: 'FAILED' as const }, OUT()])).toBe(1);
  });
});
