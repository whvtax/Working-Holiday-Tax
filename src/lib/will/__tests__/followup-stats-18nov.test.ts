/** Jo, 18 Nov: how many leads paid after each pre-payment follow-up. */
import { followUpStats } from '@/lib/will/followup-stats';
import type { AuditRow, StateHistoryRow } from '@/lib/will/store';

const sent = (id: string, customerId: string, template: string, at: string): AuditRow => ({ id, actor: 'scheduler', action: 'follow_up_sent', detail: { customerId, template, seq: 0 }, at });
const paid = (customerId: string, at: string): StateHistoryRow => ({ customerId, from: 'PRICE_SENT', to: 'PAID', causedBy: 'SYSTEM', createdAt: at });

it('counts who got each step, who paid after it, and which step was the last nudge', () => {
  const audit = [
    sent('1', 'a', 'fu_pre_24h', '2026-11-01T10:00:00Z'),
    sent('2', 'a', 'fu_pre_3d', '2026-11-03T10:00:00Z'),
    sent('3', 'b', 'fu_price_sent', '2026-11-01T10:00:00Z'),
    sent('4', 'c', 'fu_pre_24h_de', '2026-11-01T10:00:00Z'),
    sent('5', 'd', 'fu_form_6h', '2026-11-01T10:00:00Z'),
    { id: '6', actor: 'scheduler', action: 'other', detail: null, at: '2026-11-01T10:00:00Z' },
  ];
  const history = [
    paid('a', '2026-11-04T10:00:00Z'), // after both, last nudge = 3d
    paid('b', '2026-11-02T10:00:00Z'), // after price_sent
    paid('c', '2026-10-30T10:00:00Z'), // paid BEFORE the nudge: not counted
  ];
  const s = Object.fromEntries(followUpStats(audit, history).map((x) => [x.step, x]));
  expect(s.fu_pre_24h).toEqual({ step: 'fu_pre_24h', got: 2, paidAfter: 1, rate: 50, lastNudge: 0 });
  expect(s.fu_pre_3d).toEqual({ step: 'fu_pre_3d', got: 1, paidAfter: 1, rate: 100, lastNudge: 1 });
  expect(s.fu_price_sent).toEqual({ step: 'fu_price_sent', got: 1, paidAfter: 1, rate: 100, lastNudge: 1 });
});

it('no data yet', () => {
  expect(followUpStats([], []).every((x) => x.got === 0 && x.rate === null)).toBe(true);
});
