/**
 * 2 Nov (Jo): Rebecca wrote that she had started her return in myGov and asked
 * for advice on residency, Addy, Medicare and health insurance, plus the fee.
 * Will's draft was refused by Policy Guard (DIY_INSTRUCTIONS) and a task was
 * raised. The Library now holds an answer that explains nothing about
 * lodging. Pins that it is found first and passes the guard's DIY rule.
 */
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';

const rows = KNOWLEDGE_SEED.map((e, i) => ({
  id: `k${i}`, intent: e.intent, question: e.question, examples: e.examples ?? [], answer: e.answer,
  keywords: e.keywords ?? [], tags: e.tags ?? [], lang: e.lang ?? 'en', weight: 1, status: 'active', source: 'mined',
  createdAt: '', updatedAt: '',
}));
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ listKnowledge: jest.fn().mockResolvedValue(rows) }) }));

import { retrieveKnowledge } from '@/lib/will/knowledge';
import { policyGuard } from '@/lib/will/policy-guard';

const REBECCA = "Hi, this is Rebecca. I would like to ask about my Australian tax return.\n\nI'm a German citizen who worked in Australia on a Working Holiday Visa (subclass 417) during the 2025-26 financial year. I need professional assistance with my tax return, particularly regarding:\n- Determining my Australian tax residency status.\n- The German-Australian Double Tax Agreement and the Addy decision.\n- Correcting incomplete employer income statements.\n- Medicare levy exemption eligibility.\n- Private health insurance error.\n\nI have already started my tax return through myGov but can't lodge it today (Due date) because of above reasons.\nDo you have experience with these specific issues, and could you advise me on the correct tax treatment before lodging?\n\nCould you also please provide an estimate of your fees?";
const ctx = { state: 'NEW_LEAD' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null, customerTextChars: 900, customerText: REBECCA };

const INTENT = 'started the return in myGov and wants advice on the correct tax treatment before lodging';

describe('started the return in myGov, wants advice', () => {
  it("finds Rebecca's message", async () => {
    const hits = await retrieveKnowledge(
      "I have already started my tax return through myGov but can't lodge it today because of residency, the Addy decision, Medicare levy exemption and a private health insurance error. Do you have experience with these specific issues, and could you advise me on the correct tax treatment before lodging? Could you also please provide an estimate of your fees?",
    );
    expect(hits[0]?.intent).toBe(INTENT);
  });

  it('answer has the price and guarantee, no DIY, no dashes', () => {
    const e = KNOWLEDGE_SEED.find((k) => k.intent === INTENT)!;
    expect(e.answer).toMatch(/\$220/);
    expect(e.answer).toMatch(/\$385/);
    expect(e.answer).toMatch(/refund the difference/);
    expect(e.answer).not.toMatch(/yourself|step[- ]by[- ]step|log ?in/i);
    expect(e.answer).not.toMatch(/[—–―]/);
  });

  it('passes Policy Guard with no DIY_INSTRUCTIONS violation', () => {
    const e = KNOWLEDGE_SEED.find((k) => k.intent === INTENT)!;
    const r = policyGuard(e.answer, ctx);
    expect(r.violations).not.toContain('DIY_INSTRUCTIONS');
    expect(r.violations).toEqual([]);
  });
});
