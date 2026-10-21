/**
 * Jo, 21 Oct: "the Japanese and German versions ARE in Meta". Most templates
 * are one-per-language (payment_received_ja), residency_check was asked for as
 * one name + a ja translation. Both shapes must reach the customer in Japanese.
 */
import { sendWhatsAppTemplate } from '@/lib/will/channel';

jest.mock('@/lib/will/store', () => ({ getStore: () => ({ getSetting: jest.fn().mockResolvedValue(undefined), audit: jest.fn() }) }));

type Tpl = { name: string; language: { code: string } };
const calls: Tpl[] = [];
function metaHas(existing: Array<[string, string]>) {
  global.fetch = jest.fn(async (_u: unknown, init?: { body?: string }) => {
    const t = (JSON.parse(String(init?.body)) as { template: Tpl }).template;
    calls.push(t);
    const ok = existing.some(([n, c]) => n === t.name && c === t.language.code);
    return ok
      ? new Response(JSON.stringify({ messages: [{ id: 'wamid.1' }] }), { status: 200 })
      : new Response(JSON.stringify({ error: { code: 132001, message: '(#132001) Template name does not exist in the translation' } }), { status: 404 });
  }) as unknown as typeof fetch;
}

beforeEach(() => {
  calls.length = 0;
  process.env.WHATSAPP_TOKEN = 't'; process.env.WHATSAPP_PHONE_NUMBER_ID = '448522015011534';
});

it('uses residency_check_ja when that is how the Japanese template is named', async () => {
  metaHas([['residency_check', 'en'], ['residency_check_ja', 'ja']]);
  const res = await sendWhatsAppTemplate('817054982881', 'residency_check', ['Ruito'], 'ja');
  expect(res.ok).toBe(true);
  expect(calls.map((c) => `${c.name}/${c.language.code}`)).toEqual(['residency_check/ja', 'residency_check_ja/ja']);
});

it('uses residency_check + ja when it is a translation of one template', async () => {
  metaHas([['residency_check', 'en'], ['residency_check', 'ja']]);
  await sendWhatsAppTemplate('817054982881', 'residency_check', ['Ruito'], 'ja');
  expect(calls.map((c) => `${c.name}/${c.language.code}`)).toEqual(['residency_check/ja']);
});

it('works for German the same way', async () => {
  metaHas([['residency_check', 'en'], ['residency_check_de', 'de']]);
  await sendWhatsAppTemplate('4917600000000', 'residency_check', ['Hannah'], 'de');
  expect(calls[calls.length - 1]).toMatchObject({ name: 'residency_check_de', language: { code: 'de' } });
});

it('never doubles a suffix that is already there', async () => {
  metaHas([['payment_received', 'en']]);
  await sendWhatsAppTemplate('817054982881', 'payment_received_ja', [], 'ja');
  expect(calls.some((c) => c.name === 'payment_received_ja_ja')).toBe(false);
});

it('only when neither exists does it fall to English (outside the window case)', async () => {
  metaHas([['residency_check', 'en']]);
  await sendWhatsAppTemplate('817054982881', 'residency_check', ['Ruito'], 'ja');
  expect(calls[calls.length - 1]).toMatchObject({ name: 'residency_check', language: { code: 'en' } });
});
