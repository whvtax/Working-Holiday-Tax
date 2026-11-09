/** Jo, 9 Nov (Katie): we asked her full name for the card payment link, she
 *  wrote only "Katie Lauren western", and Will handed it to the team, so she
 *  got no reply for 11 hours. A name after that question is payment_link_ready:
 *  the reply goes out and the service opens the task for the link. */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import fs from 'fs';
import path from 'path';
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput, askedNameForPaymentLink, looksLikeOnlyAName } from '@/lib/will/engine';
import { PAYMENT_LINK_MSG } from '@/lib/will/i18n';

const run = (lastOurs: string, customer: string, lang = 'en') => runEngine({
  ctx: { name: 'Katie', state: 'PRICE_SENT', income: 'TFN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang, knowledge: [], decisionMode: 'will' },
  guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
  history: [{ role: 'customer', text: 'Can I pay by card instead?' }, { role: 'assistant', text: lastOurs }, { role: 'customer', text: customer }],
  mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
} as EngineInput);

beforeEach(() => (decide as jest.Mock).mockResolvedValue({
  action: 'human_task', confidence: 1, reply_text: '',
  suggested_reply: "Perfect! The team is sending you a secure payment link now, it'll arrive here in the chat shortly",
  task_reason: 'Card payment link for Katie Lauren Western',
}));

it('Katie: the name after our question gets the reply, not a handover', async () => {
  const out = await run(PAYMENT_LINK_MSG.name.en, 'Katie Lauren western');
  expect(out.kind).not.toBe('human_task');
  expect(out.decision?.action).toBe('reply');
  expect(out.decision?.approved_key).toBe('payment_link_ready');
  expect(out.replyText).toContain('payment link here shortly');
});

it('German and Japanese wording of the same question', async () => {
  expect((await run(PAYMENT_LINK_MSG.name.de, 'Jakob Müller', 'de')).decision?.approved_key).toBe('payment_link_ready');
  expect((await run(PAYMENT_LINK_MSG.name.ja, '星野 花子', 'ja')).decision?.approved_key).toBe('payment_link_ready');
});

it('Will\'s own words for the question count too', () => {
  expect(askedNameForPaymentLink('Sure! Could you send me your full name for the card payment link?')).toBe(true);
  expect(askedNameForPaymentLink('What is your full name as on your passport?')).toBe(false);
});

it('only a name counts; a question or anything else stays with Will', async () => {
  for (const n of ['Katie Lauren western', 'my name is Anna Weber', 'Siiri Mäkelä-Koski', "Ines O'Brien."]) expect(looksLikeOnlyAName(n)).toBe(true);
  for (const n of ['Can I pay with Apple Pay instead?', 'Katie, my card number is 4111', 'I changed my mind about the card and will pay by bank transfer tomorrow', 'katie@mail.com']) expect(looksLikeOnlyAName(n)).toBe(false);
  const out = await run(PAYMENT_LINK_MSG.name.en, 'Can I pay with Apple Pay instead?');
  expect(out.decision?.approved_key).not.toBe('payment_link_ready');
});

it('a name with no payment link question before it is not touched', async () => {
  const out = await run('What name should be on your return?', 'Katie Lauren western');
  expect(out.decision?.approved_key).not.toBe('payment_link_ready');
});

it('the playbook no longer calls a card payment link a human_task', () => {
  const pb = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/playbook.ts'), 'utf8');
  expect(pb).not.toContain('or a card payment link, is still the team\'s (human_task');
  expect(pb).toContain('A card payment link is NEVER a human_task (Jo, 9 Nov');
  const wd = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/will-decides.ts'), 'utf8');
  expect(wd).toContain('Action reply with this key, never human_task');
  for (const s of [pb, wd]) { const i = s.indexOf('Jo, 9 Nov'); expect(s.slice(i, i + 600)).not.toMatch(/[–—―]/); }
});
