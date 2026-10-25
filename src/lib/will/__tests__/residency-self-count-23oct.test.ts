/**
 * Jo, 23 Oct (+44 7500): after the residency double-check she counted the
 * points herself ("only 1 and 4", then "So that would include numbers 1-4")
 * and was handed to the team, because an older playbook line said "never
 * decide, hand it to the team". Her latest count, 4 of 5, gets Jo's result.
 */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine } from '@/lib/will/engine';
import { RESIDENCY_CHECK_MSG } from '@/lib/will/i18n';
import { quizResult } from '@/lib/will/residency-quiz';
import { buildSystemPrompt } from '@/lib/will/playbook';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const chat = [
  { role: 'assistant' as const, text: RESIDENCY_CHECK_MSG.en.replace('{{1}}', 'Nicole') },
  { role: 'customer' as const, text: 'Nah it’s only number 1 and 4' },
  { role: 'customer' as const, text: 'I dont really understand it though. I’m planning on staying until next March and I’m currently living full time in Australia aswell' },
  { role: 'customer' as const, text: 'So that would include numbers 1-4' },
];
const input = () => ({
  ctx: { name: 'Nicole', state: 'FORM_COMPLETE' as const, income: 'TFN' as const, paid: true, formComplete: true, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [], decisionMode: 'will' as const },
  guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
  history: chat, mode: 'FULL_AUTO' as const, bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will' as const,
});

it('her latest count (4 of 5) gets Jo\'s resident result', async () => {
  decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text: 'x', approved_key: 'residency_resident' } as never);
  const out = await runEngine(input());
  expect(out.kind).toBe('queued');
  expect(out.replyText).toBe(quizResult('en', 4));
  expect(out.replyText).toContain('fill out the questionnaire again');
});

it('fewer than 4 gets the Working Holiday Maker result', async () => {
  decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text: 'x', approved_key: 'residency_whm' } as never);
  const out = await runEngine(input());
  expect(out.replyText).toBe(quizResult('en', 0));
});

it('the playbook no longer says "hand it to the team" for a residency doubt', () => {
  const p = buildSystemPrompt({ name: null, state: 'FORM_COMPLETE', income: 'TFN', paid: true, formComplete: true, missingDocs: [], estimatedRefundCents: null, decisionMode: 'will' });
  const all = p.stable + p.dynamic;
  expect(all).not.toMatch(/whether they count as a resident: never decide it yourself; hand it to the team/);
  expect(all).toMatch(/use their LATEST count and do not ask again/);
  expect(all).toMatch(/residency_resident \/ residency_whm/);
});
