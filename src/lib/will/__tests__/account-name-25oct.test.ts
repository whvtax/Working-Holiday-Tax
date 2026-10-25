/** Jo, 25 Oct (Sawada, +61 468): "is the account name Working Holiday Tax?"
 *  went to the team. Will answers it himself: The Accounting Academy. */
import { isAccountNameQuestion, accountNameMessage } from '@/lib/will/account-name';
import { WILL_DECIDES_PROMPT, isFastLane } from '@/lib/will/will-decides';

it.each([
  'アカウントネームはWorking Holiday Taxでよろしかったですか？？',
  'アカウント名は何ですか？',
  '口座名は何を入れればいいですか',
  'Is the account name Working Holiday Tax?',
  'Should I put Working Holiday Tax as the name?',
  'Ist der Kontoname Working Holiday Tax?',
])('%s is an account-name question', (q) => {
  expect(isAccountNameQuestion(q)).toBe(true);
});

it('ordinary messages are not', () => {
  expect(isAccountNameQuestion('Is Working Holiday Tax legit?')).toBe(false);
  expect(isAccountNameQuestion('明日振り込みます')).toBe(false);
});

it('the answer is The Accounting Academy, in Japanese, and it is never a handover', () => {
  expect(accountNameMessage('ja')).toContain('The Accounting Academy');
  expect(WILL_DECIDES_PROMPT).toContain('"is the account name Working Holiday Tax?"');
  expect(isFastLane).toBeDefined();
});

jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';

it('even when Will wants to hand it over, the engine answers with the account name', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'human_task', confidence: 0.5, reply_text: '', task_reason: 'Asks about account name' });
  const input: EngineInput = {
    ctx: { name: 'Sawada', state: 'PRICE_SENT', income: 'TFN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'ja', knowledge: [], decisionMode: 'will' },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [
      { role: 'assistant', text: '問題ありません。お支払いが完了しましたら、スクリーンショットを送ってくださいね。' },
      { role: 'customer', text: 'アカウントネームはWorking Holiday Taxでよろしかったですか？？' },
    ],
    mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
  };
  const out = await runEngine(input);
  expect(out.kind).not.toBe('human_task');
  expect(out.replyText).toContain('The Accounting Academy');
  expect(out.replyText).toContain('81049952');
});
