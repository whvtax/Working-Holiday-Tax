/**
 * Jo, 1 Oct: "a button that downloads everything from the last 72 hours so we
 * can analyse Will in depth". ?hours=72 keeps conversations active in the
 * window (in full), and adds Will's notes, handoffs and the decision log.
 */
const now = Date.now();
const iso = (hoursAgo: number) => new Date(now - hoursAgo * 3600 * 1000).toISOString();
const customers = [
  { id: 'c1', waId: '61400000001', name: 'Recent', state: 'PRICE_SENT', income: 'TFN', paid: false, lang: 'en' },
  { id: 'c2', waId: '61400000002', name: 'Old', state: 'LODGED', income: 'TFN', paid: true, lang: 'en' },
];
const messages = [
  { id: 'm1', customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'SENT', body: 'hi, two weeks ago', createdAt: iso(14 * 24), meta: {} },
  { id: 'm2', customerId: 'c1', direction: 'OUT', author: 'AI', status: 'SENT', body: 'price message', createdAt: iso(10), meta: { proposedState: 'PRICE_SENT', review: 'rewrote it short' } },
  { id: 'm3', customerId: 'c2', direction: 'OUT', author: 'AI', status: 'SENT', body: 'lodged long ago', createdAt: iso(30 * 24), meta: {} },
];
const tasks = [
  { id: 't1', customerId: 'c1', customerName: 'Recent', reason: 'Policy Guard blocked reply: TAX_DETERMINATION', severity: 'URGENT', context: 'Why Will handed this over:\n• Customer wrote: "am I a resident?"', suggestedReply: 'You are a resident.', status: 'OPEN', createdAt: iso(9) },
];
const audit = [
  { id: 'a1', actor: 'assistant', action: 'decision', at: iso(10), detail: { customerId: 'c1', action: 'queued', fromState: 'QUALIFIED', newState: 'PRICE_SENT', guard: { blocked: false }, knowledgeUsed: ['pricing'] } },
  { id: 'a2', actor: 'assistant', action: 'decision', at: iso(9), detail: { customerId: 'c1', action: 'human_task', fromState: 'PRICE_SENT', newState: null, guard: { blocked: true, violations: ['TAX_DETERMINATION'] }, knowledgeUsed: [] } },
];
jest.mock('@/lib/will/auth', () => ({ sessionValid: jest.fn().mockResolvedValue(true) }));
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    allCustomers: jest.fn().mockResolvedValue(customers),
    allMessages: jest.fn().mockResolvedValue(messages),
    listTasks: jest.fn().mockResolvedValue(tasks),
    listAudit: jest.fn().mockResolvedValue(audit),
  }),
}));
import { GET } from '@/app/api/will/export/route';

it('keeps only conversations active in the window, in full, with notes, handoffs and the decision log', async () => {
  const res = await GET(new Request('http://x/api/will/export?hours=72'));
  const text = await res.text();
  expect(res.headers.get('content-disposition')).toMatch(/last-72h/);
  expect(text).toContain('Recent');
  expect(text).not.toContain('Old · 61400000002');
  expect(text).toContain('hi, two weeks ago');            // the whole conversation, not just the window
  expect(text).toContain('{moves to: Price Sent · note: rewrote it short}');
  expect(text).toContain('--- HANDOFFS (tasks) ---');
  expect(text).toContain('Why Will handed this over');
  expect(text).toContain('Draft Will wanted to send:');
  expect(text).toContain('--- DECISION LOG ---');
  expect(text).toContain('GUARD: TAX_DETERMINATION');
  expect(text).toContain('library: pricing');
});

it('without hours it is still the plain full transcript', async () => {
  const res = await GET(new Request('http://x/api/will/export'));
  const text = await res.text();
  expect(text).toContain('Old');
  expect(text).not.toContain('--- DECISION LOG ---');
});
