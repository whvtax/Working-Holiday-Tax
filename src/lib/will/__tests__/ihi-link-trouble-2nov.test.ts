/**
 * 2 Nov (Jo): a customer who cannot link the Medicare / IHI step in myGov
 * ("Any advice for this? I couldn't link the service as it says this") gets
 * Jo's wording: we can't help with anything that goes through Services
 * Australia, we can continue without the exemption, the levy then stays on the
 * return. Pins that the Library finds that entry first for the real message
 * and that the answer says what Jo wrote.
 */
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';

const rows = KNOWLEDGE_SEED.map((e, i) => ({
  id: `k${i}`, intent: e.intent, question: e.question, examples: e.examples ?? [], answer: e.answer,
  keywords: e.keywords ?? [], tags: e.tags ?? [], lang: e.lang ?? 'en', weight: 1, status: 'active', source: 'mined',
  createdAt: '', updatedAt: '',
}));
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ listKnowledge: jest.fn().mockResolvedValue(rows) }) }));

import { retrieveKnowledge } from '@/lib/will/knowledge';

const INTENT = 'IHI or Medicare Entitlement Statement trouble (do not troubleshoot)';

describe('IHI / Medicare link trouble', () => {
  it.each([
    "Any advice for this? I couldn't link the service as it says this. If you aren't sure then we will just go ahead without it unfortunately",
    'Individual Healthcare Identifiers (IHI) service could not be registered at this time. We are unable to process your request online due to technical difficulties, you will need to complete the MS003 form and submit to Services Australia',
    "I can't get the IHI to work in myGov",
  ])('finds the entry first: %s', async (msg) => {
    const hits = await retrieveKnowledge(msg);
    expect(hits[0]?.intent).toBe(INTENT);
  });

  it("answers in Jo's wording", () => {
    const e = KNOWLEDGE_SEED.find((k) => k.intent === INTENT)!;
    expect(e.answer).toBe(
      "Unfortunately we can't help with anything that goes through Services Australia, so we can't get the Medicare exemption for you. We can still go ahead without it, but the Medicare levy will then be included in your tax return and will reduce the result. Is that OK with you?",
    );
    expect(e.answer).not.toMatch(/[—–―]/);
  });
});
