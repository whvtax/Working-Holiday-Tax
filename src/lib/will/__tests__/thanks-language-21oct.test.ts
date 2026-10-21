/**
 * Jo, 21 Oct (Eimi, +81): "他ですることにしたので大丈夫ですありがとうございました"
 * ("I decided to do it elsewhere, so it's fine, thank you") got
 * "You're very welcome! 😊" in English. Two faults: the line was English-only,
 * and a goodbye from a lead was treated as a plain thank-you.
 */
jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { thanksReply, isClosingOnly } from '@/lib/will/text-normalize';
const decideMock = decide as jest.MockedFunction<typeof decide>;

function input(customer: string, lang: string | null): EngineInput {
  return {
    ctx: { name: 'Eimi', state: 'PRICE_SENT', income: 'TFN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang, knowledge: [] },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [{ role: 'assistant', text: 'こんにちは、Eimiさん。お振込みは完了しましたか？' }, { role: 'customer', text: customer }],
    mode: 'FULL_AUTO',
    bank: { bsb: '062692', account: '81049952' },
  };
}
beforeEach(() => decideMock.mockReset());

describe('the thank-you line speaks their language', () => {
  it.each([['ja', 'どういたしまして！😊'], ['de', 'Sehr gerne! 😊'], ['fr', 'Avec plaisir ! 😊'], ['en', "You're very welcome! 😊"], [null, "You're very welcome! 😊"]])('%s', (lang, line) => {
    expect(thanksReply('', lang)).toBe(line);
  });
  it('never the same line twice in a row, in any language', () => {
    expect(thanksReply('どういたしまして！😊', 'ja')).toBe('いつでもどうぞ！😊');
  });
  it('a Japanese thank-you in a Japanese chat gets the Japanese line, with no model call', async () => {
    const out = await runEngine(input('ありがとうございました！', 'ja'));
    expect(out.replyText).toBe('どういたしまして！😊');
    expect(decideMock).not.toHaveBeenCalled();
  });
  it('falls back to the language of the message when the chat language is unknown', async () => {
    const out = await runEngine(input('ありがとうございました', null));
    expect(out.replyText).toBe('どういたしまして！😊');
  });
});

describe('a goodbye from a lead is not a plain thank-you', () => {
  it.each([
    '他ですることにしたので大丈夫ですありがとうございました。',
    'Thanks, but I went with someone else',
    'Thank you, I already did it myself',
    'Danke, ich habe es schon woanders gemacht',
    "Merci, je l'ai fait ailleurs",
  ])('"%s" is not closing-only', (t) => expect(isClosingOnly(t)).toBe(false));

  it('Eimi: goes to Will instead of the canned line', async () => {
    decideMock.mockResolvedValue({ action: 'reply', confidence: 1, new_state: 'NOT_INTERESTED', reply_text: '承知しました、ご丁寧にありがとうございます。うまくいきますように😊' });
    const out = await runEngine(input('他ですることにしたので大丈夫ですありがとうございました。', 'ja'));
    expect(decideMock).toHaveBeenCalled();
    expect(out.replyText).not.toMatch(/very welcome/i);
  });

  it('a plain thank-you is still answered without the model', () => {
    expect(isClosingOnly('Thank you so much!')).toBe(true);
    expect(isClosingOnly('ありがとうございました！')).toBe(true);
  });
});
