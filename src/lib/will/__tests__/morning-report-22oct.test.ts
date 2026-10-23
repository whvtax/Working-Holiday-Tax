/** Jo, 22 Oct: the morning report on the Overview. */
import { buildMorningReport } from '@/lib/will/morning-report';
import type { CustomerRow, MessageRow, TaskRow } from '@/lib/will/store';

const now = Date.parse('2026-10-23T08:00:00+11:00');
const h = (n: number) => new Date(now - n * 3600_000).toISOString();
const c = (over: Partial<CustomerRow>): CustomerRow => ({
  id: 'c', waId: '6140', name: 'X', state: 'PRICE_SENT', paid: false, optedOut: false, lastMessageAt: h(30), lastMessageDirection: 'OUT',
  stateChangedAt: h(30), createdAt: h(100), lastMessagePreview: null, ...over,
} as CustomerRow);
const m = (over: Partial<MessageRow>): MessageRow => ({ id: 'm', customerId: 'c', direction: 'OUT', author: 'AI', status: 'SENT', body: 'x', createdAt: h(2), ...over } as MessageRow);
const t = (over: Partial<TaskRow>): TaskRow => ({ id: 't', customerId: 'c', customerName: 'X', reason: 'Paid customer sent a file. Nothing to answer, just collect it.', severity: 'REVIEW', context: null, suggestedReply: null, status: 'OPEN', createdAt: h(3), ...over } as TaskRow);

it('counts what Will handled alone, what came to the team and why', () => {
  const r = buildMorningReport({
    now,
    customers: [c({ id: 'a', createdAt: h(5) }), c({ id: 'b' }), c({ id: 'd' })],
    messages: [m({ customerId: 'a' }), m({ customerId: 'b' }), m({ customerId: 'd', author: 'HUMAN' }), m({ customerId: 'b', status: 'BLOCKED' })],
    tasks: [t({ customerId: 'b' }), t({ customerId: 'x', createdAt: h(50), status: 'OPEN' })],
    history: [{ customerId: 'a', from: 'PRICE_SENT', to: 'PAID', causedBy: 'SYSTEM', createdAt: h(4) }],
  });
  expect(r.handledByWill).toBe(1); // a (b had a task)
  expect(r.handledByTeam).toBe(1);
  expect(r.tasksOpened).toBe(1);
  expect(r.openTasks).toBe(2);
  expect(r.topReasons[0]).toEqual({ label: 'Documents from a paid customer', count: 1 });
  expect(r.newLeads).toBe(1);
  expect(r.paid).toBe(1);
  expect(r.blocked).toBe(1);
});

it('lists who is waiting on us and who is stuck after paying', () => {
  const r = buildMorningReport({
    now, messages: [], tasks: [], history: [],
    customers: [
      c({ id: 'w', name: 'Danielle', lastMessageDirection: 'IN', lastMessageAt: h(3) }),
      c({ id: 'fresh', lastMessageDirection: 'IN', lastMessageAt: h(0.2) }),
      c({ id: 's', name: 'Paid Pat', paid: true, state: 'FORM_PENDING', stateChangedAt: h(80), lastMessageAt: h(60) }),
      c({ id: 'closed', state: 'NOT_INTERESTED', lastMessageDirection: 'IN', lastMessageAt: h(10) }),
    ],
  });
  expect(r.waitingOnUs.map((p) => p.name)).toEqual(['Danielle']);
  expect(r.waitingOnUs[0].hours).toBe(3);
  expect(r.stuckAfterPayment.map((p) => p.name)).toEqual(['Paid Pat']);
});
