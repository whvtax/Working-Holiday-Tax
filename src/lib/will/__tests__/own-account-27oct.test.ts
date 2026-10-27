/** Jo, 27 Oct (German customer): "Ein Freund von mir ist gerade in Australien.
 *  Könnte man das sonst über sein Konto machen? Oder muss da mein Name stehen?"
 *  went to the team. Will answers it himself, in Jo's words. */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { WILL_DECIDES_PROMPT, isApprovedKey } from '@/lib/will/will-decides';

it('is an approved key the prompt describes', () => {
  expect(isApprovedKey('own_account')).toBe(true);
  expect(WILL_DECIDES_PROMPT).toContain('- own_account:');
});

it('renders Jo\'s German answer, not a handover', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'own_account', confidence: 0.9, reply_text: 'x' });
  const input = {
    ctx: { name: 'Lukas', state: 'FORM_PENDING', income: 'TFN', paid: true, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'de', knowledge: [], decisionMode: 'will' },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [
      { role: 'assistant', text: 'Sobald du es abgeschickt hast, gehen wir alles durch und melden uns innerhalb von 24 Stunden bei dir.' },
      { role: 'customer', text: 'Ich komme nicht mehr auf mein australisches Konto und meine australische Nummer kann ich auch nicht mehr verwenden' },
      { role: 'customer', text: 'Ein Freund von mir ist gerade in Australien' },
      { role: 'customer', text: 'Könnte man das sonst über sein Konto machen ? Oder muss da mein Name stehen ?' },
    ],
    mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
  } as unknown as EngineInput;
  const out = await runEngine(input);
  expect(out.kind).not.toBe('human_task');
  expect(out.replyText).toContain('Das Bankkonto muss auf deinen Namen laufen');
});
