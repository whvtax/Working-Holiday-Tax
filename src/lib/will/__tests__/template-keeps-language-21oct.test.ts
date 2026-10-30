/**
 * Jo, 21 Oct (+81 70 5498, Ruito): the residency check reached a Japanese
 * customer in ENGLISH. The `residency_check` template only had an English
 * translation in WhatsApp Manager, sendWhatsAppTemplate quietly swapped ja for
 * en, and the English template went out, although he had written to us 45
 * minutes earlier and the Japanese text could simply have been sent.
 */
const store = {
  addMessage: jest.fn().mockResolvedValue({ id: 'm1' }),
  setMessageStatus: jest.fn().mockResolvedValue(undefined),
  attachProviderId: jest.fn().mockResolvedValue(undefined),
  markCustomerRead: jest.fn().mockResolvedValue(undefined),
  audit: jest.fn().mockResolvedValue(undefined),
  addTask: jest.fn().mockResolvedValue({ id: 't1' }),
  getSetting: jest.fn().mockResolvedValue(undefined),
  listMessages: jest.fn().mockResolvedValue([]),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

import { deliverOut } from '@/lib/will/channel';
import { residencyCheckMessage, RESIDENCY_CHECK_TEMPLATE } from '@/lib/will/i18n';
import type { CustomerRow } from '@/lib/will/store';

type Sent = { type: string; template?: { name: string; language: { code: string } }; text?: { body: string } };
const sent: Sent[] = [];

beforeEach(() => {
  sent.length = 0;
  process.env.WHATSAPP_TOKEN = 'test-token';
  process.env.WHATSAPP_PHONE_NUMBER_ID = '448522015011534';
  // Meta has residency_check in English only.
  global.fetch = jest.fn(async (_url: unknown, init?: { body?: string }) => {
    const payload = JSON.parse(String(init?.body ?? '{}')) as Sent;
    sent.push(payload);
    if (payload.type === 'template' && payload.template?.language.code !== 'en') {
      return new Response(JSON.stringify({ error: { code: 132001, message: '(#132001) Template name does not exist in the translation' } }), { status: 404 });
    }
    return new Response(JSON.stringify({ messages: [{ id: `wamid.${sent.length}` }] }), { status: 200 });
  }) as unknown as typeof fetch;
});
afterAll(() => { delete process.env.WHATSAPP_TOKEN; delete process.env.WHATSAPP_PHONE_NUMBER_ID; });

const ruito = (lastCustomerMsgAt: string | null) => ({
  id: 'c1', waId: '817054982881', name: 'Ruito', optedOut: false, lang: 'ja', lastCustomerMsgAt,
} as unknown as CustomerRow);

it('inside the 24h window: the Japanese text goes out, never the English template', async () => {
  const body = residencyCheckMessage('ja', 'Ruito');
  const tpl = { name: RESIDENCY_CHECK_TEMPLATE, params: ['Ruito'], lang: 'ja', fallbackToText: true };
  const res = await deliverOut(ruito(new Date(Date.now() - 45 * 60_000).toISOString()), body, 'AI', { waTemplate: tpl }, tpl);
  expect(res.ok).toBe(true);
  expect(sent.some((p) => p.type === 'template' && p.template?.language.code === 'en')).toBe(false);
  const text = sent.find((p) => p.type === 'text');
  expect(text?.text?.body).toBe(body);
  expect(text?.text?.body).toContain('税務居住者');
});

it('outside the window with no Japanese template: nothing is sent in English (30 Oct)', async () => {
  const body = residencyCheckMessage('ja', 'Ruito');
  const tpl = { name: RESIDENCY_CHECK_TEMPLATE, params: ['Ruito'], lang: 'ja', fallbackToText: true };
  const res = await deliverOut(ruito(new Date(Date.now() - 3 * 86_400_000).toISOString()), body, 'AI', { waTemplate: tpl }, tpl);
  expect(res.ok).toBe(false);
  expect(sent.some((p) => p.type === 'template' && p.template?.language.code === 'en')).toBe(false);
  expect(sent.some((p) => p.type === 'text')).toBe(false);
});
