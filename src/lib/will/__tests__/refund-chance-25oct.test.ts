/** Jo, 25 Oct (+49 1516): "How likely is it that I will get something back?"
 *  went to the team. Will answers: depends on many factors, estimate only
 *  after a thorough review of their case, which starts after payment. */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { REFUND_CHANCE_RE, refundChanceMessage } from '@/lib/will/i18n';
import { APPROVED_KEYS, renderApproved } from '@/lib/will/will-decides';

it.each([
  'How likely is it that I will get something back ?',
  'Will I get anything back?',
  'How much will I get back?',
  'What are my chances of a refund?',
  'Bekomme ich etwas zurück?',
  '還付金はもらえますか？',
  'いくら戻ってきますか',
])('%s', (q) => expect(REFUND_CHANCE_RE.test(q)).toBe(true));

it('not other questions', () => {
  for (const q of ['When will I get my refund?', 'How do I pay?', 'Is the account name Working Holiday Tax?']) expect(REFUND_CHANCE_RE.test(q)).toBe(false);
});

it('the wording promises nothing and says the estimate comes after the review, after payment', () => {
  expect(APPROVED_KEYS).toContain('refund_chance');
  const en = refundChanceMessage('en') ?? '';
  expect(en).toContain('depends on a lot of factors');
  expect(en).toContain('once payment is made');
  expect(en).not.toMatch(/\$\d/);
  const base = { state: 'PRICE_SENT' as const, firstName: null, firstContact: false, lastWillText: '', foreign: false };
  expect(renderApproved('refund_chance', { ...base, lang: 'de' })).toContain('Zahlung');
});

it('when Will would hand it over, the engine answers', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'human_task', confidence: 0.4, reply_text: '', task_reason: 'Asks about refund chances' });
  const out = await runEngine({
    ctx: { name: 'Max', state: 'PRICE_SENT', income: 'TFN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [], decisionMode: 'will' },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [{ role: 'assistant', text: "Just send a screenshot once paid and we'll get started!" }, { role: 'customer', text: 'How likely is it that I will get something back ?' }],
    mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
  } as EngineInput);
  expect(out.kind).not.toBe('human_task');
  expect(out.replyText).toContain('thorough review of your specific case');
});
