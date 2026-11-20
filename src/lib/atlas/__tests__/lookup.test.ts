import { findCustomers, customerMessages, taskList, customerProfile, listCustomersLite, customerHistory } from '../lookup';
import { askAtlas } from '../ask';
import type { CustomerRow, MessageRow, TaskRow } from '@/lib/will/store';
import type { MorningReport } from '@/lib/will/morning-report';

const customers = [
  { id: 'c1', waId: '61400000001', name: 'Ana Silva', state: 'FORM', paid: true, outcome: 'REFUND', lastMessageAt: '2026-10-01T00:00:00Z', lastMessagePreview: 'hello' },
  { id: 'c2', waId: '61400000002', name: 'Ben Ana', state: 'NEW', paid: false, outcome: null, lastMessageAt: '2026-11-01T00:00:00Z', lastMessagePreview: null },
] as unknown as CustomerRow[];

const messages = [
  { id: 'm1', customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'first', createdAt: '2026-10-01T00:00:00Z' },
  { id: 'm2', customerId: 'c1', direction: 'OUT', author: 'HUMAN', status: 'SENT', body: 'second', createdAt: '2026-10-02T00:00:00Z' },
  { id: 'm3', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'DISCARDED', body: 'hidden', createdAt: '2026-10-03T00:00:00Z' },
] as unknown as MessageRow[];

const tasks = [
  { id: 't1', customerId: 'c1', customerName: 'Ana Silva', reason: 'Asks for refund date', severity: 'HIGH', context: 'secret context', suggestedReply: 'draft', status: 'OPEN', createdAt: '2026-10-05T00:00:00Z' },
  { id: 't2', customerId: 'c2', customerName: 'Ben Ana', reason: 'Old', severity: 'LOW', context: null, suggestedReply: null, status: 'RESOLVED', createdAt: '2026-09-01T00:00:00Z' },
] as unknown as TaskRow[];

describe('Ask Atlas lookups', () => {
  it('finds customers across all time by name, without phone numbers', () => {
    const found = findCustomers(customers, 'ana');
    expect(found.map((c) => c.customerId)).toEqual(['c2', 'c1']);
    expect(JSON.stringify(found)).not.toContain('6140000000');
    expect(findCustomers(customers, '   ')).toEqual([]);
  });

  it('returns messages oldest first, hides discarded ones and labels the sender', () => {
    const out = customerMessages(messages, 10);
    expect(out.map((m) => m.body)).toEqual(['first', 'second']);
    expect(out.map((m) => m.from)).toEqual(['customer', 'team']);
  });

  it('lists tasks without context or suggested replies', () => {
    const json = JSON.stringify(taskList(tasks, 'ALL', 10));
    expect(json).toContain('Asks for refund date');
    expect(json).not.toContain('secret context');
    expect(json).not.toContain('draft');
    expect(taskList(tasks, 'OPEN').map((t) => t.taskId)).toEqual(['t1']);
  });
});

const report = {
  generatedAt: '2026-11-15T00:00:00.000Z', windowHours: 24, newLeads: 0, paid: 0, lodged: 0,
  handledByWill: 0, handledByTeam: 0, tasksOpened: 0, openTasks: 0, topReasons: [], blocked: 0,
  waitingOnUs: [], stuckAfterPayment: [],
  security: { logins: 0, failed: 0, lockouts: 0, newDevices: [], recent: [] },
} as unknown as MorningReport;

describe('Ask Atlas profiles', () => {
  it('profile has no phone number (waId)', () => {
    const json = JSON.stringify(customerProfile(customers[0]));
    expect(json).toContain('Ana Silva');
    expect(json).not.toContain('61400000001');
    expect(json).not.toContain('waId');
  });

  it('filters customers by paid status', () => {
    expect(listCustomersLite(customers, { paid: true }).map((c) => c.customerId)).toEqual(['c1']);
    expect(listCustomersLite(customers, { paid: false }).map((c) => c.customerId)).toEqual(['c2']);
  });

  it('returns stage history oldest first', () => {
    const out = customerHistory([
      { customerId: 'c1', from: 'NEW', to: 'FORM', causedBy: 'a', createdAt: '2026-10-02T00:00:00Z' },
      { customerId: 'c1', from: null, to: 'NEW', causedBy: 'b', createdAt: '2026-10-01T00:00:00Z' },
    ] as never);
    expect(out.map((h) => h.to)).toEqual(['NEW', 'FORM']);
  });
});

describe('askAtlas tool loop', () => {
  const realKey = process.env.ANTHROPIC_API_KEY;
  beforeAll(() => { process.env.ANTHROPIC_API_KEY = 'test'; });
  afterAll(() => { if (realKey === undefined) delete process.env.ANTHROPIC_API_KEY; else process.env.ANTHROPIC_API_KEY = realKey; });

  it('runs a lookup the model asks for, then answers with the result', async () => {
    const replies = [
      { stop_reason: 'tool_use', content: [{ type: 'tool_use', id: 'tu1', name: 'find_customers', input: { query: 'Ana' } }] },
      { stop_reason: 'end_turn', content: [{ type: 'text', text: 'Ana Silva is on the form stage.' }] },
    ];
    const bodies: string[] = [];
    const call = async (body: string) => {
      bodies.push(body);
      return new Response(JSON.stringify(replies[bodies.length - 1]), { status: 200 });
    };
    const runTool = jest.fn(async () => [{ customerId: 'c1', name: 'Ana Silva' }]);
    const r = await askAtlas('Where is Ana?', report, [], { call, runTool });
    expect(r).toEqual({ ok: true, answer: 'Ana Silva is on the form stage.', proposals: [] });
    expect(runTool).toHaveBeenCalledWith('find_customers', { query: 'Ana' });
    expect(bodies[1]).toContain('tool_result');
    expect(bodies[0]).toContain('find_customers');
  });

  it('stops after a bounded number of lookups', async () => {
    const call = async () => new Response(JSON.stringify({ stop_reason: 'tool_use', content: [{ type: 'tool_use', id: 'x', name: 'list_tasks', input: {} }] }), { status: 200 });
    const r = await askAtlas('loop', report, [], { call, runTool: async () => [] });
    expect(r.ok).toBe(false);
  });
});
