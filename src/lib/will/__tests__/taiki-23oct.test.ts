/**
 * Jo, 23 Oct (Taiki, Japanese): TFN + ABN income, back in Japan, asked the
 * total cost before 31 October. Will quoted $495 (the foreign-income price)
 * and ended with "any questions?", no bank details.
 */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput, fixForeignPrice } from '@/lib/will/engine';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const TAIKI = `こんにちは。

現在日本に帰国しており、2025–26年度のオーストラリアの確定申告をお願いしたいです。

ワーキングホリデーで滞在し、TFNでの給与収入とABNでの収入（約A$4,500）があります。

TFNは取得済みですが、myGovとATOの連携ができません。

10月31日までに税理士登録を行い、申告期限の延長を受けたいと考えています。

フォーム入力が難しいため、メールまたはLINEで必要書類を提出して、申告をすべて代行していただくことは可能でしょうか？

対応可否、登録期限、総費用を教えていただけますと幸いです。

よろしくお願いいたします。`;

const WILL = `Taikiさん、こんにちは! 😊

2025-26年度の申告、お任せください。TFN+ABNの収入があるとのことですので、$495のプランになります。

myGovへのアクセスは不要です。当社は登録税理士を通じてATOと直接やり取りしますので、ご自身でログインしていただく必要は一切ありません。

書類の提出はお支払い後に送られるセキュアフォームから行っていただきます。フォームは簡単な質問形式で、書類はそこからアップロードできます。

ご質問はありますか?`;

function input(mode: 'will' | 'legacy'): EngineInput {
  return {
    ctx: { name: 'Taiki', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'ja', knowledge: [], decisionMode: mode },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [{ role: 'customer', text: TAIKI }],
    mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: mode,
  };
}

it('fixForeignPrice, in the ways an amount is written', () => {
  expect(fixForeignPrice('$495のプランになります')).toBe('$385のプランになります');
  expect(fixForeignPrice('A$330 total')).toBe('A$220 total');
  expect(fixForeignPrice('495ドルです')).toBe('385ドルです');
  expect(fixForeignPrice('the $220 option')).toBe('the $220 option');
});

it.each(['will', 'legacy'] as const)('%s mode: $385, the bank details, the screenshot line, no "any questions?"', async (mode) => {
  decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text: WILL, new_state: 'PRICE_SENT' } as never);
  const out = await runEngine(input(mode));
  const t = out.replyText ?? '';
  expect(t).toContain('$385');
  expect(t).not.toContain('$495');
  expect(t).toContain('BSB: 062692');
  expect(t).toContain('81049952');
  expect(t).not.toContain('ご質問はありますか');
  expect(t).not.toContain('差額'); // ABN: no guarantee
  expect(t).toContain('myGov'); // his questions are still answered
});

it('a customer who did report foreign income keeps $495', async () => {
  decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text: 'TFN+ABNで海外収入もあるとのことですので、$495のプランになります。' } as never);
  const i = input('will');
  i.history = [{ role: 'customer', text: 'TFNとABNの収入があり、日本の収入も申告が必要です。費用はいくらですか' }];
  const out = await runEngine(i);
  expect(out.replyText).toContain('$495');
});
