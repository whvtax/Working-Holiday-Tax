/** Jo, 25 Oct (Katie +353 85): "I was told your service cost $100" went to the team. */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { quotesOtherPrice, notOurPriceMessage } from '@/lib/will/i18n';
import { APPROVED_KEYS } from '@/lib/will/will-decides';

it.each([
  "No, I was told your service cost $100 so I'm not sure if I'm going to go ahead now",
  'I saw that your prices start from $130. Could you explain why my quote is $220?',
  'Mir wurde gesagt, es kostet 150 Euro',
])('%s quotes a price that is not ours', (t) => expect(quotesOtherPrice(t)).toBe(true));

it('our own prices and unrelated amounts are not', () => {
  expect(quotesOtherPrice('Is it $220 per person?')).toBe(false);
  expect(quotesOtherPrice('My refund last year was $1,200')).toBe(false);
  expect(quotesOtherPrice('I earned $45000')).toBe(false);
});

it('Will answers it himself, with no discount', async () => {
  expect(APPROVED_KEYS).toContain('not_our_price');
  (decide as jest.Mock).mockResolvedValue({ action: 'human_task', confidence: 0.6, reply_text: '', task_reason: 'Says told $100' });
  const out = await runEngine({
    ctx: { name: 'Katie', state: 'PRICE_SENT', income: 'TFN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [], decisionMode: 'will' },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [{ role: 'assistant', text: 'Hi Katie, did the transfer go through on your end?' }, { role: 'customer', text: "No, I was told your service cost $100 so I'm not sure if I'm going to go ahead now" }],
    mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
  } as EngineInput);
  expect(out.kind).not.toBe('human_task');
  expect(out.replyText).toBe(notOurPriceMessage('en'));
  expect(out.replyText).not.toMatch(/\$100|discount/);
});
