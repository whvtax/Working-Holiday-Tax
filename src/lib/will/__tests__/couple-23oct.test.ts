/**
 * Jo, 23 Oct (Laura & Felix, +49 176): "My partner and I ... how much would it
 * cost?" went to a person. Each partner writes separately (security and
 * confidentiality); the fee is per person; never a couple discount.
 */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine } from '@/lib/will/engine';
import { COUPLE_MSG } from '@/lib/will/i18n';
import { APPROVED } from '@/lib/will/approved-messages';
import { seedTemplates } from '@/lib/will/seed';
import { policyGuard } from '@/lib/will/policy-guard';
import { buildSystemPrompt } from '@/lib/will/playbook';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const LAURA = "Hi,\n\nMy partner and I are considering getting help from a tax agent with our tax returns. We're both from Germany and are currently in Australia on Working Holiday Visas.\n\nWe believe we've been paying the 15% of tax throughout the year, so we're a bit worried that we might not get a refund and could end up paying for the tax agent on top of that.\n\nAnd how much would it cost to get your help with our tax returns?\n\nKind regards,\nLaura & Felix";

it('the message says: separately, security and confidentiality, per person, no discount', () => {
  expect(APPROVED.objections.o16_couple).toBe(COUPLE_MSG.en);
  expect(COUPLE_MSG.en).toMatch(/separately from your own WhatsApp/);
  expect(COUPLE_MSG.en).toMatch(/security and confidentiality/);
  expect(COUPLE_MSG.en).toMatch(/per person/);
  for (const m of Object.values(COUPLE_MSG)) expect(m).not.toMatch(/discount|rabatt|割引|\$440|\$770/i);
});

it('passes the policy guard before payment in all three languages', () => {
  for (const [lang, m] of Object.entries(COUPLE_MSG)) {
    const v = policyGuard(m, { state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: true, estimateFromTeam: null });
    expect({ lang, v: v.violations }).toEqual({ lang, v: [] });
  }
});

it('is in the Library seed, so the backfill adds it to the live Library', () => {
  expect(seedTemplates().some((t) => t.key === 'obj_16' && t.body === APPROVED.objections.o16_couple)).toBe(true);
  expect(seedTemplates().some((t) => t.key === 'obj_15')).toBe(true);
});

it('Laura & Felix: Will picks it and it goes out in Jo\'s wording', async () => {
  decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text: 'x', approved_key: 'couple' } as never);
  const out = await runEngine({
    ctx: { name: 'Laura', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [], decisionMode: 'will' },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [{ role: 'customer', text: LAURA }], mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
  });
  expect(out.kind).toBe('queued');
  expect(out.replyText).toBe(COUPLE_MSG.en);
});

it('the playbook tells Will: never a combined price or a discount for two', () => {
  const p = buildSystemPrompt({ name: null, state: 'QUALIFIED', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, decisionMode: 'will' });
  const all = p.stable + p.dynamic;
  expect(all).toContain('# COUPLES AND PEOPLE ASKING TOGETHER');
  expect(all).toMatch(/NEVER a combined price, a couple price, or any discount for two/);
  expect(all).toMatch(/- couple: two people/);
});
