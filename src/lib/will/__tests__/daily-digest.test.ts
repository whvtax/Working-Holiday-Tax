/**
 * findDailyCandidates decides what the daily Library-suggestions email is
 * built from: every customer question that got a real reply and had
 * nothing relevant in the Library at the time. Untested before this —
 * pinning it here because getting it wrong either buries real gaps (a
 * covered question wrongly treated as new) or spams drafts for things the
 * Library already answers (an uncovered question wrongly skipped).
 */
const listMessagesBetween = jest.fn();
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({ listMessagesBetween: (...a: unknown[]) => listMessagesBetween(...a) }),
}));

const retrieveKnowledge = jest.fn();
jest.mock('@/lib/will/knowledge', () => ({
  retrieveKnowledge: (...a: unknown[]) => retrieveKnowledge(...a),
  extractKeywords: () => [],
}));

import { findDailyCandidates } from '@/lib/will/daily-digest';

function msg(over: Record<string, unknown>) {
  return {
    id: 'm', customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'SENT',
    body: 'hello', createdAt: '2026-08-25T01:00:00.000Z',
    customerName: 'Alex', waId: '61400000001',
    ...over,
  };
}

beforeEach(() => { listMessagesBetween.mockReset(); retrieveKnowledge.mockReset(); });

it('pairs an uncovered question with the reply that followed it', async () => {
  listMessagesBetween.mockResolvedValue([
    msg({ id: '1', direction: 'IN', body: 'do you cover super refunds?', createdAt: '2026-08-25T01:00:00.000Z' }),
    msg({ id: '2', direction: 'OUT', author: 'AI', status: 'SENT', body: 'Yes, we can look into that for you.', createdAt: '2026-08-25T01:01:00.000Z' }),
  ]);
  retrieveKnowledge.mockResolvedValue([]); // nothing in the library covers it

  const out = await findDailyCandidates('2026-08-25T00:00:00.000Z', '2026-08-26T00:00:00.000Z');
  expect(out).toHaveLength(1);
  expect(out[0]).toMatchObject({ question: 'do you cover super refunds?', answer: 'Yes, we can look into that for you.', answeredBy: 'AI' });
});

it('skips a question the Library already covered', async () => {
  listMessagesBetween.mockResolvedValue([
    msg({ id: '1', direction: 'IN', body: 'how long does it take?' }),
    msg({ id: '2', direction: 'OUT', author: 'HUMAN', status: 'SENT', body: 'Usually 2-3 weeks.' }),
  ]);
  retrieveKnowledge.mockResolvedValue([{ intent: 'timing', question: 'how long does it take', answer: 'Usually 2-3 weeks.', score: 1 }]);

  const out = await findDailyCandidates('2026-08-25T00:00:00.000Z', '2026-08-26T00:00:00.000Z');
  expect(out).toHaveLength(0);
});

it('skips a question that never got a reply', async () => {
  listMessagesBetween.mockResolvedValue([
    msg({ id: '1', direction: 'IN', body: 'is there a discount for two people?' }),
  ]);
  retrieveKnowledge.mockResolvedValue([]);

  const out = await findDailyCandidates('2026-08-25T00:00:00.000Z', '2026-08-26T00:00:00.000Z');
  expect(out).toHaveLength(0);
});

it('only pairs a reply with the question from the SAME customer', async () => {
  listMessagesBetween.mockResolvedValue([
    msg({ id: '1', customerId: 'c1', direction: 'IN', body: 'question from customer one' }),
    msg({ id: '2', customerId: 'c2', direction: 'OUT', author: 'AI', status: 'SENT', body: 'reply meant for customer two' }),
  ]);
  retrieveKnowledge.mockResolvedValue([]);

  const out = await findDailyCandidates('2026-08-25T00:00:00.000Z', '2026-08-26T00:00:00.000Z');
  expect(out).toHaveLength(0); // c1's question has no reply within its own thread
});
