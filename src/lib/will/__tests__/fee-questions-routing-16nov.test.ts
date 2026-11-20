/**
 * Fee questions must find the pricing entry in the Library, not a generic
 * template. Audit (15 Nov): about 130 fee questions in the export got an
 * indirect answer. This pins the retrieval side with the real seed entries.
 */
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';

const rows = KNOWLEDGE_SEED.map((e, i) => ({
  id: `k${i}`, status: 'active', weight: 1, brand: 'wht', ...e,
}));

jest.mock('@/lib/will/store', () => ({
  getStore: () => ({ listKnowledge: async () => rows }),
}));

import { retrieveKnowledge } from '@/lib/will/knowledge';

const FEE = /price|fee|cost|how much|charge/i;

describe('fee questions find the pricing entry', () => {
  // Multi-word fee questions reach the pricing entry. A bare "how much is it?" or
  // "what's your fee" does not: one or two common words are deliberately not enough
  // evidence (knowledge.ts MIN_EVIDENCE_SHORT, so "Which transfer?" cannot match a
  // random entry). Those go to Will's playbook, which answers the price itself.
  const asks = [
    'what does it cost',
    'how much do you charge for a TFN return',
    'is there a price for ABN income',
  ];
  it.each(asks)('"%s" retrieves a fee entry as the top hit', async (q) => {
    const hits = await retrieveKnowledge(q, { lang: 'en', k: 3 });
    expect(hits.length).toBeGreaterThan(0);
    expect(`${hits[0].intent} ${hits[0].question}`).toMatch(FEE);
  });
});
