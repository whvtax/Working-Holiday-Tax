/**
 * Full audit, 11 Oct 2026, decision 12: team tone. An upset or refund-asking
 * customer always gets a warm draft on the task, and the CRM warns before the
 * sentences that lost customers go out by hand.
 */
import { runEngine, EngineInput, UPSET_OR_REFUND } from '@/lib/will/engine';
import { APPROVED } from '@/lib/will/approved-messages';
import { readFileSync } from 'fs';
import { join } from 'path';

jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
const decideMock = decide as jest.MockedFunction<typeof decide>;
beforeEach(() => decideMock.mockReset());

describe('what reads as upset or a refund', () => {
  it.each(['I want a refund', 'This is highly unprofessional', 'Hello??? anyone there', 'Ich möchte mein Geld zurück', '返金してください', 'esto es una estafa'])('%s', (t) => expect(UPSET_OR_REFUND.test(t)).toBe(true));
  it.each(['TFN please', 'What name do I put?', 'Thanks!'])('not: %s', (t) => expect(UPSET_OR_REFUND.test(t)).toBe(false));
});

describe('a handoff on an upset customer always carries a draft', () => {
  const input = (text: string): EngineInput => ({
    ctx: { name: 'Naatt', state: 'FORM_COMPLETE', income: 'TFN', paid: true, formComplete: true, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [] },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [{ role: 'assistant', text: APPROVED.payment_received }, { role: 'customer', text }],
    mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' },
  });
  it('asks the model once for the warm draft when it handed off without one', async () => {
    decideMock
      .mockResolvedValueOnce({ action: 'human_task', task_reason: 'Refund dispute', task_severity: 'URGENT', confidence: 0.9 })
      .mockResolvedValueOnce({ action: 'human_task', task_reason: 'Refund dispute', suggested_reply: "I understand, and I'm sorry for the wait. A person on the team is looking at your figures now and will reply here today.", confidence: 0.9 });
    const out = await runEngine(input("I trusted you and now I owe $993?? I want a refund. Hello???"));
    expect(out.kind).toBe('human_task');
    expect(out.task?.suggestedReply).toMatch(/sorry for the wait/);
    expect(decideMock).toHaveBeenCalledTimes(2);
    expect(String(decideMock.mock.calls[1][2]?.rewriteHint)).toMatch(/never defensive or accusatory/);
  });
  it('a calm handoff that already has a draft is untouched', async () => {
    decideMock.mockResolvedValueOnce({ action: 'human_task', task_reason: 'Needs the team', suggested_reply: 'The team will check that and reply here.', confidence: 0.9 });
    const out = await runEngine(input('Can you also lodge for my partner?'));
    expect(out.kind).toBe('human_task');
    expect(decideMock).toHaveBeenCalledTimes(1);
  });
});

describe('the CRM warns before the sentences that lost customers', () => {
  const src = readFileSync(join(__dirname, '..', '..', '..', 'components', 'will', 'Dashboard.tsx'), 'utf8');
  it('sendManual checks TONE_WARNINGS with a confirm, not a block', () => {
    expect(src).toMatch(/const tone = TONE_WARNINGS\.find\(\(w\) => w\.re\.test\(text\.trim\(\)\)\)/);
    expect(src).toMatch(/Send it as written anyway\?/);
  });
  it('the patterns match what the team actually typed, and not ordinary replies', () => {
    const block = src.slice(src.indexOf('const TONE_WARNINGS'), src.indexOf('/** Decision 5'));
    const res = [...block.matchAll(/re: (\/.*?\/i),/g)].map((m) => eval(m[1]) as RegExp);
    const hit = (t: string) => res.some((r) => r.test(t.trim()));
    for (const t of ['No!', '.', "I'm afraid we're not the right fit for your situation.", 'do you think requesting a refund at this stage is fair to us?', 'my time is, of course, chargeable', "You know what, you don't need to pay anything. I'll remove you from our tax agent portal.", 'You keep asking me exactly the same question']) {
      expect(hit(t)).toBe(true);
    }
    for (const t of ['Payment received, here is the form.', 'Yes, that is the right account, go ahead.', 'Your return has been lodged, the NOA comes in about two weeks.']) {
      expect(hit(t)).toBe(false);
    }
  });
});
