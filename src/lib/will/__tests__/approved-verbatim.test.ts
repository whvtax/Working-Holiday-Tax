/**
 * Full audit, 11 Oct 2026, decision 16: in Approval mode a draft that is
 * word for word one of Jo's fixed messages goes out on the timer, not into
 * the approval queue (15 openings waited there in August, two for nine days).
 */
import { runEngine, EngineInput, isApprovedVerbatim } from '@/lib/will/engine';
import { APPROVED } from '@/lib/will/approved-messages';

jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
const decideMock = decide as jest.MockedFunction<typeof decide>;
beforeEach(() => decideMock.mockReset());

it('recognises the fixed messages, with or without the name', () => {
  expect(isApprovedVerbatim(APPROVED.opening, null)).toBe(true);
  expect(isApprovedVerbatim(APPROVED.opening.replace(/^Hey!/, 'Hey Lou!'), 'Lou')).toBe(true);
  expect(isApprovedVerbatim(APPROVED.price_tfn, 'Lou')).toBe(true);
  expect(isApprovedVerbatim(APPROVED.prices, null)).toBe(true);
  expect(isApprovedVerbatim(APPROVED.price_tfn + ' Also, your residency looks fine.', 'Lou')).toBe(false);
  expect(isApprovedVerbatim('Hey Lou! Sure, what would you like to know?', 'Lou')).toBe(false);
});

it('Approval mode: the verbatim opening is queued, a free-form reply still waits for approval', async () => {
  const base = (text: string): EngineInput => ({
    ctx: { name: 'Lou', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [] },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [{ role: 'customer', text }],
    mode: 'SUPERVISED', bank: { bsb: '062692', account: '81049952' },
  });
  decideMock.mockResolvedValueOnce({ action: 'reply', reply_text: APPROVED.opening.replace(/^Hey!/, 'Hey Lou!'), new_state: 'QUALIFIED', confidence: 0.9 });
  const a = await runEngine(base('Hi, I would like to ask about my tax return'));
  expect(a.kind).toBe('queued');

  decideMock.mockResolvedValueOnce({ action: 'reply', reply_text: 'Hey Lou! Sure, what would you like to know?', confidence: 0.9 });
  const b = await runEngine(base('Hi, I have a question'));
  expect(b.kind).toBe('pending_approval');
});
