import { followUpReplyRate, teamMessagesPerPaidCustomer, failedSendsByKind, failedModelDecisions, REPLY_WINDOW_MS } from '../metrics';
import type { AuditRow, MessageRow, CustomerRow } from '../store';

const msg = (over: Partial<MessageRow>): MessageRow => ({
  id: 'm', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'SENT', body: '', createdAt: '2026-11-10T00:00:00Z', ...over,
} as MessageRow);
const cust = (id: string, paid: boolean) => ({ id, paid } as unknown as CustomerRow);
const audit = (action: string, at: string, detail: unknown = {}): AuditRow => ({ id: action + at, actor: 'system', action, detail, at });

describe('followUpReplyRate', () => {
  it('counts a follow-up as replied only when the customer writes within 72 hours', () => {
    const a = [
      audit('follow_up_sent', '2026-11-10T10:00:00Z', { customerId: 'c1' }),
      audit('follow_up_sent', '2026-11-10T10:00:00Z', { customerId: 'c2' }),
    ];
    const m = [
      msg({ customerId: 'c1', direction: 'IN', createdAt: '2026-11-11T09:00:00Z' }),
      msg({ customerId: 'c2', direction: 'IN', createdAt: '2026-11-20T09:00:00Z' }),
    ];
    expect(followUpReplyRate(a, m)).toEqual({ sent: 2, replied: 1, rate: 0.5 });
  });
  it('ignores a reply that came before the follow-up', () => {
    const a = [audit('follow_up_sent', '2026-11-10T10:00:00Z', { customerId: 'c1' })];
    const m = [msg({ customerId: 'c1', direction: 'IN', createdAt: '2026-11-10T09:00:00Z' })];
    expect(followUpReplyRate(a, m).replied).toBe(0);
  });
  it('gives null rate when there are no follow-ups', () => {
    expect(followUpReplyRate([], []).rate).toBeNull();
    expect(REPLY_WINDOW_MS).toBe(72 * 3600 * 1000);
  });
});

describe('teamMessagesPerPaidCustomer', () => {
  it('counts only sent team messages to paying customers', () => {
    const humanOut = [
      msg({ customerId: 'p1', author: 'HUMAN' }),
      msg({ customerId: 'p1', author: 'HUMAN' }),
      msg({ customerId: 'p2', author: 'HUMAN', status: 'FAILED' }),
      msg({ customerId: 'u1', author: 'HUMAN' }),
    ];
    const r = teamMessagesPerPaidCustomer(humanOut, [cust('p1', true), cust('p2', true), cust('u1', false)]);
    expect(r).toEqual({ paidCustomers: 2, teamMessages: 2, perPaid: 1 });
  });
  it('returns null per paid customer when nobody has paid', () => {
    expect(teamMessagesPerPaidCustomer([], [cust('u1', false)]).perPaid).toBeNull();
  });
});

describe('failedSendsByKind', () => {
  it('groups failed sends by the classifier kind and skips sent rows', () => {
    const m = [
      msg({ status: 'FAILED', meta: { sendError: 'meta 131042: billing problem' } }),
      msg({ status: 'FAILED', meta: { sendError: 'meta 131049: healthy ecosystem' } }),
      msg({ status: 'SENT', meta: { sendError: 'ignored' } }),
    ];
    const r = failedSendsByKind(m);
    expect(r.total).toBe(2);
    expect(r.billing).toBe(1);
    expect(r.ecosystem).toBe(1);
  });
});

describe('failedModelDecisions', () => {
  it('counts audit rows that record a failed model decision', () => {
    const a = [
      audit('decision', '2026-11-10T10:00:00Z', { reason: 'Model returned an unusable decision' }),
      audit('decision', '2026-11-10T10:01:00Z', { reason: 'ok' }),
      audit('winback_assess_failed', '2026-11-10T10:02:00Z', {}),
    ];
    const r = failedModelDecisions(a);
    expect(r.total).toBe(2);
    expect(r.byAction.decision).toBe(1);
    expect(r.byAction.winback_assess_failed).toBe(1);
  });
});
