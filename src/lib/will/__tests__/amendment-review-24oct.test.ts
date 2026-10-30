/**
 * Jo, 24 Oct (Chinami, +81 90): already lodged, got less than she should,
 * wants it lodged again (and asks about super). Will handed it to the team.
 * Jo: "happy to help, but as it is a correction the fee is $385 for the
 * review, no guarantee, whatever the result. Will already knows this."
 */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { renderApproved, APPROVED_KEYS, WILL_DECIDES_PROMPT } from '@/lib/will/will-decides';
import { APPROVED } from '@/lib/will/approved-messages';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const base = { state: 'NEW_LEAD' as const, firstName: 'Chinami', firstContact: true, lastWillText: '', foreign: false };

it('Will can choose the review of a lodged return himself', () => {
  expect(APPROVED_KEYS).toEqual(expect.arrayContaining(['price_tfn_review', 'price_tfn_abn_review']));
  expect(WILL_DECIDES_PROMPT).toContain('never a reason to hand over');
  expect(WILL_DECIDES_PROMPT).toContain('October 31 is the deadline for lodging a NEW return');
});

it('the review wording: $330 TFN / $440 ABN, no guarantee, in Japanese, German and English', () => {
  const ja = renderApproved('price_tfn_review', { ...base, lang: 'ja' }) ?? '';
  expect(ja).toContain('Chinamiさん');
  expect(ja).toContain('$330');
  expect(ja).not.toContain('$360');
  expect(ja).toContain('結果にかかわらず');
  expect(ja).toContain('BSB: 062692');
  expect(ja).not.toContain('差額を返金いたします');
  const de = renderApproved('price_tfn_abn_review', { ...base, lang: 'de' }) ?? '';
  expect(de).toContain('$440');
  expect(de).not.toContain('$360');
  expect(de).toContain('unabhängig vom Ergebnis');
  expect(renderApproved('price_tfn_review', { ...base, lang: 'en' })).toBe(APPROVED.price_tfn_review);
  expect(renderApproved('price_tfn_review', { ...base, lang: 'fr' })).toBeNull();
});

it('the engine sends the review wording, and the ABN version only with ABN income', async () => {
  const input = (text: string): EngineInput => ({
    ctx: { name: 'Chinami', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'ja', knowledge: [], decisionMode: 'will' },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [{ role: 'customer', text }],
    mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
  });
  decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text: 'x', approved_key: 'price_tfn_abn_review', new_state: 'PRICE_SENT' } as never);
  const out = await runEngine(input('tax returnは既に申請、金額受領しておりますが誤った申請のため全額返ってきておりません。再申請は可能でしょうか？'));
  expect(out.replyText).toContain('$330');
  decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text: 'x', approved_key: 'price_tfn_review', new_state: 'PRICE_SENT' } as never);
  const abn = await runEngine(input('既に申告しましたが、ABNの収入を入れ忘れました。修正できますか？'));
  expect(abn.replyText).toContain('$440');
  expect(abn.replyText).not.toMatch(/\$(?:220|360)/);
});
