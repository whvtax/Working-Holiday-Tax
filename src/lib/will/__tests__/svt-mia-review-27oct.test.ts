/** Final review, 27 Oct: Mia (the student line) must not send backpacker-only
 *  fixed texts, English fixed texts into a Chinese/Vietnamese chat, or WHT
 *  wording through the direct send paths. */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { withBrand } from '@/lib/will/brand-context';
import { unsupportedScript } from '@/lib/will/i18n';
import { policyGuard } from '@/lib/will/policy-guard';
import { readFileSync } from 'fs';
import { join } from 'path';

const input = (text: string, lang: string | null = null): EngineInput => ({
  ctx: { name: 'Lin', state: 'NEW_LEAD' as const, income: null, paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang, knowledge: [], decisionMode: 'will' },
  guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
  history: [{ role: 'customer', text }],
  mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
} as unknown as EngineInput);

beforeEach(() => { process.env.SVT_WHATSAPP_PHONE_NUMBER_ID = 'SVT_ID'; });
afterEach(() => { delete process.env.SVT_WHATSAPP_PHONE_NUMBER_ID; });

it('detects Chinese and Vietnamese, not Japanese', () => {
  expect(unsupportedScript('你好，我想问一下退税')).toBe('zh');
  expect(unsupportedScript('Chào bạn, mình muốn hỏi về thuế')).toBe('vi');
  expect(unsupportedScript('税金について質問があります')).toBeNull();
  expect(unsupportedScript('Hi, how much is it?')).toBeNull();
});

it('a refund figure in Chinese or Vietnamese is caught by the money rule', () => {
  const g = { state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() } as unknown as Parameters<typeof policyGuard>[1];
  expect(policyGuard('你的退税大约是800澳元', g).allowed).toBe(false);
  expect(policyGuard('Hoàn thuế của bạn khoảng 800 đô', g).allowed).toBe(false);
});

it('SVT: a DASP question goes to the team, never "we don\'t offer it"', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'no_dasp', confidence: 0.9, reply_text: 'x' });
  const out = await withBrand('svt', () => runEngine(input('Can you help me claim my super?', 'en')));
  expect(out.kind).toBe('human_task');
});

it('WHT is unchanged: no_dasp still renders the fixed text', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'no_dasp', confidence: 0.9, reply_text: 'x' });
  const out = await withBrand('wht', () => runEngine(input('Can you help me claim my super?', 'en')));
  expect(out.replyText ?? '').toMatch(/superannuation \(DASP\)/);
});

it('SVT: the working holiday residency result is never sent', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'residency_whm', confidence: 0.9, reply_text: 'The team will check your residency with you.' });
  const out = await withBrand('svt', () => runEngine(input('Am I a resident for tax?', 'en')));
  expect(out.replyText ?? '').not.toMatch(/Working Holiday Maker/i);
});

it('SVT: a Chinese chat keeps Mia\'s own words and waits for approval', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'thanks', confidence: 0.9, reply_text: '不客气 😊' });
  const out = await withBrand('svt', () => runEngine({ ...input('谢谢你'), history: [{ role: 'assistant', text: '你好' }, { role: 'customer', text: '谢谢你' }] }));
  expect(out.kind).toBe('pending_approval');
  expect(out.replyText).toContain('不客气');
});

it('direct sends rebrand for SVT; review asks, reminders and known-contacts drop are WHT only', () => {
  const src = (p: string) => readFileSync(join(process.cwd(), p), 'utf8');
  expect(src('src/lib/will/channel.ts')).toMatch(/=== 'svt' \? rebrandText\(body, 'svt'\) : body/);
  const sched = src('src/lib/will/scheduler.ts');
  expect(sched).toMatch(/customer\.brand !== 'svt'\n\s+&& \['SIGNED', 'LODGED', 'COMPLETED'\]/);
  expect(sched).toMatch(/c\.brand !== 'svt' && rec\?\.askedAt/);
  expect(sched).toMatch(/customer\.brand === 'svt' \? svtTemplateName\(template\.key\)/);
  expect(src('src/app/api/will/webhook/route.ts').match(/brand === 'wht' && await store\.isBlockedContact/g)?.length).toBe(2);
});

it('the seed brand tags reach Library rows already in production, once, keeping other tags', async () => {
  const { applyBrandTags } = await import('@/lib/will/seed');
  const settings: Record<string, string> = {};
  const rows = [{ id: 'r1', question: 'Is Working Holiday Tax legit?', tags: ['trust'] }];
  const { KNOWLEDGE_SEED } = await import('@/lib/will/knowledge-seed');
  const legit = KNOWLEDGE_SEED.find((e) => (e.tags ?? []).includes('brand:wht'));
  expect(legit).toBeDefined();
  rows[0].question = legit!.question;
  const updates: { id: string; tags: string[] }[] = [];
  const store = {
    listKnowledge: async () => rows,
    updateKnowledge: async (id: string, p: { tags: string[] }) => { updates.push({ id, tags: p.tags }); },
    getSetting: async (k: string) => settings[k] ?? null,
    setSetting: async (k: string, v: string) => { settings[k] = v; },
  } as unknown as Parameters<typeof applyBrandTags>[0];
  expect(await applyBrandTags(store)).toBe(1);
  expect(updates[0].tags).toEqual(['trust', 'brand:wht']);
  expect(await applyBrandTags(store)).toBe(0);
});
