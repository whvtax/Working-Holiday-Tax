/** Jo, 23 Oct: the layout rule on the real path, in every mode. */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { buildSystemPrompt } from '@/lib/will/playbook';
const decideMock = decide as jest.MockedFunction<typeof decide>;

function input(mode: 'will' | 'legacy', lang = 'de'): EngineInput {
  return {
    ctx: { name: 'Lena', state: 'FORM_PENDING', income: 'TFN', paid: true, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang, knowledge: [], decisionMode: mode },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [{ role: 'assistant', text: 'x' }, { role: 'customer', text: 'Wie geht es jetzt weiter, und brauche ich myGov?' }],
    mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: mode,
  };
}
const BLOCK = 'Du brauchst kein myGov, wir arbeiten direkt mit dem ATO über unser Portal. Als Nächstes füllst du das kurze Formular aus, das ich dir geschickt habe. Danach prüft das Team deine Ansässigkeit, Medicare und deine Abzüge, bevor etwas eingereicht wird. Sobald alles fertig ist, melden wir uns hier bei dir mit dem nächsten Schritt.';

it.each(['will', 'legacy'] as const)('%s mode: a long block goes out in short paragraphs', async (mode) => {
  decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text: BLOCK } as never);
  const out = await runEngine(input(mode));
  expect(out.replyText).toContain('\n\n');
  expect((out.replyText ?? '').replace(/\s+/g, ' ')).toBe(BLOCK);
});

it('Jo\'s exact wording is sent as he laid it out', async () => {
  decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text: 'x', approved_key: 'later_plan' } as never);
  const out = await runEngine(input('will', 'en'));
  expect(out.replyText).toBe("No worries 😊 Here's the link whenever you're ready: https://workingholidaytax.com.au/tax-form");
});

it('the playbook asks for short paragraphs', () => {
  const p = buildSystemPrompt({ name: null, state: 'QUALIFIED', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null });
  expect(p.stable + p.dynamic).toContain('# SHORT PARAGRAPHS (Jo, 23 Oct');
});
