import { buildAttentionReport, reasonKey } from '../attention-report';

const cust = [
  { id: 'c1', name: 'Zed Person', waId: '61400000001', state: 'PRICE_SENT', paid: false, lang: 'vi', income: 'TFN', missingDocs: ['passport', 'bank statement'] },
  { id: 'c2', name: 'Amy Other', waId: '61400000002', state: 'FORM_PENDING', paid: true, lang: 'en', income: 'TFN_ABN', missingDocs: [] },
];
const m = (o: object) => ({ customerId: 'c1', direction: 'OUT', author: 'AI', status: 'SENT', body: 'x', createdAt: '2026-11-03T01:00:00Z', ...o });

describe('attention report, machine readable', () => {
  const r = buildAttentionReport({
    customers: cust as never,
    messages: [
      m({ direction: 'IN', author: 'CUSTOMER', body: 'how long?', createdAt: '2026-11-03T01:00:00Z' }),
      m({ status: 'BLOCKED', body: 'draft', meta: { review: 'held: deadline wording' }, createdAt: '2026-11-03T01:30:00Z' }),
      m({ customerId: 'c2', direction: 'IN', author: 'CUSTOMER', body: 'sent it', createdAt: '2026-11-03T01:00:00Z' }),
      m({ customerId: 'c2', status: 'DISCARDED', body: 'Payment received', createdAt: '2026-11-03T01:02:00Z' }),
      m({ customerId: 'c2', status: 'PENDING_APPROVAL', body: 'later', createdAt: '2026-11-03T01:05:00Z' }),
    ] as never,
    tasks: [{ customerId: 'c2', createdAt: '2026-11-03T01:06:00Z', severity: 'HIGH', status: 'OPEN', reason: 'PAYMENT LINK: send to "Amy Other" 0400123456' }],
    audit: [
      { at: '2026-11-03T01:30:00Z', action: 'decision', detail: { customerId: 'c1', action: 'blocked', guard: { blocked: true, violations: ['DEADLINE_CLAIM'] }, knowledgeUsed: ['fees'], knowledgeScores: { fees: 0.812 } } },
      { at: '2026-11-03T01:29:30Z', action: 'second_check', detail: { customerId: 'c1', verdict: 'hold', note: 'wording' } },
    ] as never,
    since: Date.parse('2026-11-03T00:00:00Z'), now: Date.parse('2026-11-03T03:00:00Z'),
  });
  const items = r.text.split('\n').filter((l) => l.startsWith('  ITEM ')).map((l) => JSON.parse(l.slice(7)));

  it('tags every item with a category and the why data', () => {
    expect(items.map((i) => i.category).sort()).toEqual(['BLOCKED', 'DISCARDED', 'HANDOFF', 'HELD_FOR_TEAM', 'UNANSWERED', 'UNANSWERED'].sort());
    const b = items.find((i) => i.category === 'BLOCKED');
    expect(b).toMatchObject({ lang: 'vi', guard_codes: ['DEADLINE_CLAIM'], second_check: 'hold', paperwork_complete: false, missing_docs: 2, wait_minutes: 120 });
    expect(b.library_retrieved).toEqual([{ intent: 'fees', score: 0.81 }]);
    expect(items.find((i) => i.category === 'HANDOFF').paperwork_complete).toBe(true);
  });
  it('opens with a numeric summary free of names, phones and dashes', () => {
    const sum = r.text.slice(r.text.indexOf('SUMMARY'), r.text.indexOf('='.repeat(70)));
    expect(sum).toContain('by_category:');
    expect(sum).toContain('DEADLINE_CLAIM=1');
    expect(sum).toContain('HANDOFF: PAYMENT LINK=1');
    expect(sum).not.toMatch(/Zed|Amy|6140|0400/);
    expect(sum).not.toMatch(/[—–―]/);
    expect(r.items).toBe(6);
  });
  it('reasonKey drops names, quotes and numbers', () => {
    expect(reasonKey('PAYMENT LINK: send to "Amy" 0400123456')).toBe('PAYMENT LINK');
    expect(reasonKey(null)).toBe('none');
  });
});
