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

it('SVT: a DASP question gets the same "unfortunately not available at the moment" as WHT (Jo, 30 Oct), no handover, no price', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'no_dasp', confidence: 0.9, reply_text: 'x' });
  const out = await withBrand('svt', () => runEngine(input('Can you help me claim my super?', 'en')));
  expect(out.kind).not.toBe('human_task');
  expect(out.replyText ?? '').toMatch(/not available at the moment/);
  expect(out.replyText ?? '').not.toMatch(/\$\d/);
});

it('WHT is unchanged: no_dasp still renders the fixed text', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'no_dasp', confidence: 0.9, reply_text: 'x' });
  const out = await withBrand('wht', () => runEngine(input('Can you help me claim my super?', 'en')));
  expect(out.replyText ?? '').toMatch(/superannuation \(DASP\)[^.]*not available at the moment/);
});

it('SVT: the working holiday residency result is never sent', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'residency_whm', confidence: 0.9, reply_text: 'The team will check your residency with you.' });
  const out = await withBrand('svt', () => runEngine(input('Am I a resident for tax?', 'en')));
  expect(out.replyText ?? '').not.toMatch(/Working Holiday Maker/i);
});

it('SVT: a Chinese chat gets the same fixed message in Chinese, sent like the English one', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'price_tfn', confidence: 0.9, reply_text: 'x' });
  const out = await withBrand('svt', () => runEngine({ ...input('只有TFN的工作'), history: [{ role: 'assistant', text: '你好' }, { role: 'customer', text: '只有TFN的工作' }] }));
  expect(out.replyText ?? '').toMatch(/\$220/);
  expect(out.replyText ?? '').toMatch(/062692/);
  expect(out.replyText ?? '').toMatch(/[\u4e00-\u9fff]/);
  expect(out.kind).not.toBe('pending_approval');
});

it('SVT: Chinese price with foreign income goes to the team, never the $220 text with the guarantee', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'price_tfn', confidence: 0.9, reply_text: 'x' });
  const out = await withBrand('svt', () => runEngine({ ...input('只有TFN的工作'), history: [{ role: 'assistant', text: '你好' }, { role: 'customer', text: '我在国内还有收入' }, { role: 'customer', text: '只有TFN的工作' }] }));
  expect(out.kind).toBe('human_task');
  expect(out.replyText ?? '').not.toMatch(/\$220/);
});

it('SVT: "later" in Vietnamese after payment sends the Vietnamese form link on the student site', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'later_plan', confidence: 0.9, reply_text: 'x' });
  const base = input('Tối nay mình điền nhé');
  const out = await withBrand('svt', () => runEngine({ ...base, ctx: { ...base.ctx, state: 'PAID', paid: true }, history: [{ role: 'assistant', text: 'Chào bạn' }, { role: 'customer', text: 'Tối nay mình điền nhé' }] } as EngineInput));
  expect(out.replyText ?? '').toContain('https://studentvisatax.com.au/vi/jhd7hp9xd');
  expect(out.replyText ?? '').not.toMatch(/workingholidaytax/);
});

it('SVT: a Chinese price question as the first message gets the Chinese price, with no stray space when there is no name', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'price_tfn', confidence: 0.9, reply_text: 'x' });
  const base = input('报税多少钱');
  const out = await withBrand('svt', () => runEngine({ ...base, ctx: { ...base.ctx, name: null } } as EngineInput));
  expect(out.replyText ?? '').toMatch(/^嗨！/);
  expect(out.replyText ?? '').toMatch(/\$220/);
});

it('SVT: a Vietnamese first message that picks no track gets the opening question in Vietnamese, not English', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'price_tfn', confidence: 0.9, reply_text: 'x' });
  const out = await withBrand('svt', () => runEngine(input('Chào bạn, mình muốn khai thuế')));
  expect(out.replyText ?? '').toMatch(/^Chào Lin! 😊/);
  expect(out.replyText ?? '').toMatch(/TFN/);
  expect(out.replyText ?? '').not.toMatch(/Happy to help|062692/);
  expect(out.kind).not.toBe('pending_approval');
});

it('SVT: free text in Chinese (no fixed message) still waits for approval', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'reply', confidence: 0.9, reply_text: '好的，我们看一下你的情况。' });
  const out = await withBrand('svt', () => runEngine({ ...input('我想问一个问题'), history: [{ role: 'assistant', text: '你好' }, { role: 'customer', text: '我想问一个问题' }] }));
  expect(out.kind).toBe('pending_approval');
});

it('direct sends rebrand for SVT; review asks run on both brands; known-contacts drop is WHT only', () => {
  const src = (p: string) => readFileSync(join(process.cwd(), p), 'utf8');
  expect(src('src/lib/will/channel.ts')).toMatch(/=== 'svt' \? rebrandText\(body, 'svt'\) : body/);
  const sched = src('src/lib/will/scheduler.ts');
  expect(sched).not.toMatch(/brand !== 'svt'/);
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

it('SVT: every Google review link a student receives is the student profile, never WHT\'s', async () => {
  const { rebrandText } = await import('@/lib/will/brand-voice');
  const { REVIEW_REQUEST_MSG } = await import('@/lib/will/i18n');
  const out = rebrandText(REVIEW_REQUEST_MSG.en, 'svt');
  expect(out).toContain('https://g.page/r/CW65-TcfMaArECE/review');
  expect(out).not.toContain('CaWt4kV0UmY-EBM');
  expect(rebrandText('https://search.google.com/local/writereview?placeid=ChIJabc123XYZ', 'svt')).toBe('https://g.page/r/CW65-TcfMaArECE/review');
  expect(rebrandText(REVIEW_REQUEST_MSG.en, 'wht')).toContain('CaWt4kV0UmY-EBM');
});
