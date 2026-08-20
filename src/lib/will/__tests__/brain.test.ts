/**
 * Brain internals: the state machine that guards the customer journey, and the
 * lexical RAG retrieval that feeds Will the right learned answer for a message.
 * Retrieval is tested against the real shipped knowledge pack, with the store
 * mocked so no database is needed.
 */
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';
import type { KnowledgeRow } from '@/lib/will/store';

// Serve the curated pack as "active" knowledge rows, no DB involved.
const ACTIVE_ROWS: KnowledgeRow[] = KNOWLEDGE_SEED.map((e, i) => ({
  id: `seed-${i}`,
  intent: e.intent,
  question: e.question,
  examples: e.examples,
  answer: e.answer,
  keywords: e.keywords,
  tags: e.tags,
  lang: e.lang,
  weight: 1,
  status: 'active',
  source: 'mined',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
}));

jest.mock('@/lib/will/store', () => ({
  getStore: () => ({ listKnowledge: async () => ACTIVE_ROWS }),
}));

// Imported after the mock is registered.
import { retrieveKnowledge, tokenize, extractKeywords } from '@/lib/will/knowledge';
import { canTransition } from '@/lib/will/state-machine';

describe('state machine keeps the journey legal', () => {
  it('allows the normal forward path New Lead -> Qualified -> Price Sent', () => {
    expect(canTransition('NEW_LEAD', 'QUALIFIED')).toBe(true);
    expect(canTransition('QUALIFIED', 'PRICE_SENT')).toBe(true);
  });

  it('rejects skipping straight from a new lead to lodged', () => {
    expect(canTransition('NEW_LEAD', 'LODGED')).toBe(false);
  });

  it('rejects going backwards from paid to a sales state', () => {
    expect(canTransition('PAID', 'PRICE_SENT')).toBe(false);
  });
});

describe('tokenize / extractKeywords', () => {
  it('drops stopwords, punctuation and short tokens', () => {
    const t = tokenize('How much do you charge for the tax return?');
    expect(t).toContain('charge');
    expect(t).toContain('tax');
    expect(t).not.toContain('do');
    expect(t).not.toContain('the');
  });
  it('extracts meaningful keywords from a question', () => {
    const k = extractKeywords('Can I claim my superannuation while still in Australia?');
    expect(k).toEqual(expect.arrayContaining(['claim', 'superannuation', 'australia']));
  });
});

describe('RAG retrieval surfaces the right learned answer', () => {
  const topIntent = async (msg: string) => (await retrieveKnowledge(msg, { lang: 'en', k: 3 }))[0]?.intent;

  it('matches a pricing question', async () => {
    expect(await topIntent('how much do you charge, is it a flat fee?')).toBe('pricing');
  });

  it('matches a discount request', async () => {
    expect(await topIntent('any chance of a discount on the fee?')).toBe('request for a discount');
  });

  it('matches a myGov access worry to the reassurance entry, not troubleshooting', async () => {
    const intent = await topIntent("I can't access my myGov or link the ATO, can you still help?");
    expect(intent).toBe('cannot access myGov or ATO');
  });

  it('matches a super-while-here question', async () => {
    expect(await topIntent('can I claim my super back while I am still in Australia?')).toBe('superannuation while still in Australia');
  });

  it('returns nothing for an off-topic message', async () => {
    const hits = await retrieveKnowledge('the weather in Sydney is lovely today', { lang: 'en' });
    expect(hits.length).toBe(0);
  });

  it('never returns more than k results', async () => {
    const hits = await retrieveKnowledge('tax refund fee price form medicare super abn', { lang: 'en', k: 3 });
    expect(hits.length).toBeLessThanOrEqual(3);
  });
});
