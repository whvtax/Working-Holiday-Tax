/** Jo, 18 Nov: Mia answers in all nine languages, whatever the question.
 *  Decision 018 (later the same day): every fixed text exists in all nine
 *  languages for both brands, so a German SVT customer gets Jo's fixed German
 *  wording, exactly as a German WHT customer does; never the English text. */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { withBrand } from '@/lib/will/brand-context';

const input = (text: string, lang: string | null): EngineInput => ({
  ctx: { name: 'Lena', state: 'NEW_LEAD' as const, income: null, paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang, knowledge: [], decisionMode: 'will' },
  guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
  history: [{ role: 'customer', text }],
  mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
} as unknown as EngineInput);

beforeEach(() => {
  process.env.SVT_WHATSAPP_PHONE_NUMBER_ID = 'SVT_ID';
  (decide as jest.Mock).mockReset();
});
afterEach(() => { delete process.env.SVT_WHATSAPP_PHONE_NUMBER_ID; });

describe('Mia in languages other than English', () => {
  it('a German SVT customer gets the fixed German text, not the English one (18 Nov, decision 018)', async () => {
    const german = 'Das ist im Moment leider noch nicht verfügbar. Ich helfe dir gern weiter.';
    (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'no_dasp', confidence: 0.9, reply_text: german });
    const out = await withBrand('svt', () => runEngine(input('Kann ich meine Super beanspruchen?', 'de')));
    expect(out.replyText ?? '').toBe('Unser Superannuation-Service (DASP) ist im Moment leider nicht verfügbar, aber um deine Steuererklärung kümmern wir uns gerne.');
    expect(out.replyText ?? '').not.toMatch(/(?:isn't|not) available at the moment/);
  });

  it('an English SVT customer still gets the English approved wording', async () => {
    (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'no_dasp', confidence: 0.9, reply_text: 'x' });
    const out = await withBrand('svt', () => runEngine(input('Can you help me claim my super?', 'en')));
    expect(out.replyText ?? '').toMatch(/(?:isn't|not) available at the moment/);
  });
});
