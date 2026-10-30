/**
 * 30 Oct 2026: about 50 follow-ups, confirmations and winbacks went out in
 * English to Japanese, German, French and Italian customers. The language
 * the customer actually writes in wins; where no template exists in that
 * language nothing goes out in English. Invented names and numbers only.
 */
const tasks: Array<{ id: string; customerId: string; reason: string; severity: string; context: string | null; suggestedReply: string | null; status: 'OPEN' | 'RESOLVED' }> = [];
let chat: Array<Record<string, unknown>> = [];
const store = {
  addMessage: jest.fn(async (m: Record<string, unknown>) => ({ id: `m${Math.random()}`, ...m })),
  setMessageStatus: jest.fn().mockResolvedValue(undefined),
  attachProviderId: jest.fn().mockResolvedValue(undefined),
  markCustomerRead: jest.fn().mockResolvedValue(undefined),
  audit: jest.fn().mockResolvedValue(undefined),
  addTask: jest.fn(async (t: Record<string, unknown>) => { const row = { id: `t${tasks.length + 1}`, status: 'OPEN' as const, ...t } as never; tasks.push(row); return row; }),
  updateTask: jest.fn(async (id: string, patch: Record<string, unknown>) => { Object.assign(tasks.find((t) => t.id === id) ?? {}, patch); }),
  findOpenTaskForCustomer: jest.fn(async (id: string) => tasks.find((t) => t.customerId === id && t.status === 'OPEN') ?? null),
  cancelJobsFor: jest.fn().mockResolvedValue(2),
  updateCustomer: jest.fn().mockResolvedValue(undefined),
  getSetting: jest.fn().mockResolvedValue(undefined),
  listMessages: jest.fn(async () => chat),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

import { deliverOut } from '@/lib/will/channel';
import { resolveLanguage, isFormAutoText, refreshCustomerLang, hasTemplateVariant, bodyLooksEnglish, englishToForeignReason } from '@/lib/will/language-30oct';
import { residencyCheckMessage, formReceivedMessage, winbackMessage, RESIDENCY_CHECK_TEMPLATE } from '@/lib/will/i18n';
import type { CustomerRow } from '@/lib/will/store';

const IN = (body: string, n = 0) => ({ direction: 'IN' as const, author: 'CUSTOMER' as const, status: 'SENT' as const, body, createdAt: new Date(Date.UTC(2026, 9, 20, 8, n)).toISOString(), meta: {} });
const FORM = "Hi! I've just sent through my form 😊";

describe('resolveLanguage: the last few customer messages decide', () => {
  it('the form auto text is not a language signal', () => {
    expect(isFormAutoText(FORM)).toBe(true);
    expect(isFormAutoText("Hi! I've just sent through my form")).toBe(true);
    expect(isFormAutoText("I've just sent through my form but one question about my super")).toBe(false);
    expect(resolveLanguage([IN(FORM)] as never, 'de').lang).toBe('de');
    expect(resolveLanguage([IN(FORM)] as never, null).lang).toBeNull();
  });
  it('a German customer stored as English is corrected by what they wrote after the form text', () => {
    const msgs = [IN('Hallo, ich habe eine Frage zur Steuer und zur Rückerstattung', 1), IN(FORM, 2)];
    expect(resolveLanguage(msgs as never, 'en').lang).toBe('de');
  });
  it('Japanese, French, Italian from their own words', () => {
    expect(resolveLanguage([IN('こんにちは、確定申告をお願いしたいです')] as never, 'en').lang).toBe('ja');
    expect(resolveLanguage([IN('Bonjour, je voudrais savoir pour mon remboursement')] as never, 'en').lang).toBe('fr');
    expect(resolveLanguage([IN('Ciao, vorrei sapere dove posso avere il rimborso')] as never, null).lang).toBe('it');
  });
  it('a lone "Danke!" in an English chat does not switch it', () => {
    const msgs = [IN('Hi, how much is it for the tax return and what do you need from me?', 1), IN('Danke!', 2)];
    expect(resolveLanguage(msgs as never, 'en').lang).toBe('en');
  });
  it('Chinese or Vietnamese is reported as unsupported, never stored as a language', () => {
    expect(resolveLanguage([IN('你好，我想问一下退税')] as never, 'en')).toEqual({ lang: 'en', unsupported: 'zh' });
    expect(resolveLanguage([IN('Xin chào, tôi muốn hỏi về thuế')] as never, null).unsupported).toBe('vi');
  });
  it('refreshCustomerLang persists the corrected language once', async () => {
    chat = [IN('Hallo, ich habe eine Frage zur Steuer und zur Rückerstattung', 1), IN(FORM, 2)];
    const r = await refreshCustomerLang(store as never, { id: 'c1', lang: 'en' });
    expect(r).toMatchObject({ lang: 'de', changed: true });
    expect(store.updateCustomer).toHaveBeenCalledWith('c1', { lang: 'de' });
    store.updateCustomer.mockClear();
    expect((await refreshCustomerLang(store as never, { id: 'c1', lang: 'de' })).changed).toBe(false);
    expect(store.updateCustomer).not.toHaveBeenCalled();
  });
  it('variants exist for English, German and Japanese only; English text is recognised', () => {
    expect(['en', 'de', 'ja', null].every((l) => hasTemplateVariant(l))).toBe(true);
    expect(['fr', 'it', 'es', 'pt', 'zh'].some((l) => hasTemplateVariant(l))).toBe(false);
    expect(bodyLooksEnglish(winbackMessage('en', 'Sam', 'Would you like us to take care of your return?'))).toBe(true);
    expect(bodyLooksEnglish(formReceivedMessage('fr'))).toBe(false);
    expect(englishToForeignReason('fr', null, "Hi Sam, just checking in, would you like us to take care of your tax return?")).toMatch(/English/);
    expect(englishToForeignReason('en', null, "Hi Sam, just checking in, would you like us to take care of your tax return?")).toBeNull();
  });
});

// ── the transmission point ───────────────────────────────────────────────────

type Sent = { type: string; template?: { name: string; language: { code: string } }; text?: { body: string } };
const sent: Sent[] = [];
const origFetch = global.fetch;
let metaHas: (name: string, lang: string) => boolean;

beforeEach(() => {
  jest.clearAllMocks();
  sent.length = 0; tasks.length = 0; chat = [];
  process.env.WHATSAPP_TOKEN = 'test-token';
  process.env.WHATSAPP_PHONE_NUMBER_ID = '448522015011534';
  metaHas = (_n, lang) => lang === 'en';
  global.fetch = jest.fn(async (_url: unknown, init?: { body?: string }) => {
    const p = JSON.parse(String(init?.body ?? '{}')) as Sent;
    sent.push(p);
    if (p.type === 'template' && !metaHas(p.template!.name, p.template!.language.code)) {
      return new Response(JSON.stringify({ error: { code: 132001, message: '(#132001) Template name does not exist in the translation' } }), { status: 404 });
    }
    return new Response(JSON.stringify({ messages: [{ id: `wamid.${sent.length}` }] }), { status: 200 });
  }) as unknown as typeof fetch;
});
afterAll(() => { global.fetch = origFetch; delete process.env.WHATSAPP_TOKEN; delete process.env.WHATSAPP_PHONE_NUMBER_ID; });

const cust = (lang: string | null, minutesAgo: number | null) => ({
  id: 'c1', waId: '4915100000001', name: 'Jan', optedOut: false, lang,
  lastCustomerMsgAt: minutesAgo == null ? null : new Date(Date.now() - minutesAgo * 60_000).toISOString(),
} as unknown as CustomerRow);

describe('deliverOut: never English to a customer who does not write English', () => {
  it('a German customer stored as English gets the German template, not the English one', async () => {
    metaHas = (_n, lang) => lang === 'de' || lang === 'en';
    chat = [IN('Hallo, ich habe eine Frage zur Steuer und zur Rückerstattung', 1), IN(FORM, 2)];
    const tpl = { name: 'fu_price_sent', params: ['Jan'], lang: 'en' };
    const res = await deliverOut(cust('en', 3 * 24 * 60), 'Hi Jan, just checking in', 'AI', { waTemplate: tpl }, tpl);
    expect(res.ok).toBe(true);
    expect(sent.map((p) => p.template?.language.code)).toEqual(['de']);
  });
  it('a French customer outside the window with no French template: nothing is sent, ONE urgent task', async () => {
    chat = [IN('Bonjour, je voudrais savoir pour mon remboursement', 1)];
    const tpl = { name: 'fu_form_6h', params: ['Jan'], lang: 'fr' };
    const res = await deliverOut(cust('fr', 3 * 24 * 60), 'Hi Jan, just checking in', 'AI', { waTemplate: tpl }, tpl);
    expect(res.ok).toBe(false);
    expect(sent.some((p) => p.template?.language.code === 'en')).toBe(false);
    expect(sent.some((p) => p.type === 'text')).toBe(false);
    expect(tasks).toHaveLength(1);
    expect(tasks[0].severity).toBe('URGENT');
  });
  it('several refused messages for the same customer fold into that one task', async () => {
    chat = [IN('Bonjour, je voudrais savoir pour mon remboursement', 1)];
    for (const key of ['fu_form_6h', 'fu_form_3d', 'fu_form_7d', 'residency_check']) {
      const tpl = { name: key, params: ['Jan'], lang: 'fr' };
      await deliverOut(cust('fr', 3 * 24 * 60), `Hi Jan, just checking in ${key}`, 'AI', { waTemplate: tpl }, tpl);
    }
    expect(store.addTask).toHaveBeenCalledTimes(1);
    expect(store.updateTask).toHaveBeenCalledTimes(3);
    expect(tasks[0].context).toContain('fu_form_7d');
  });
  it('inside the window a French customer gets the French text, never an English one', async () => {
    chat = [IN('Bonjour, je voudrais savoir pour mon remboursement', 1)];
    const tpl = { name: 'form_received_en', params: [], lang: 'fr', fallbackToText: true };
    const fr = formReceivedMessage('fr');
    expect((await deliverOut(cust('fr', 20), fr, 'AI', { waTemplate: tpl }, tpl)).ok).toBe(true);
    expect(sent.find((p) => p.type === 'text')?.text?.body).toBe(fr);
    sent.length = 0;
    const winback = winbackMessage('en', 'Jan', 'Would you like us to take care of your tax return now?');
    const wtpl = { name: 'winback_en', params: ['Jan', 'x'], lang: 'fr', fallbackToText: true };
    expect((await deliverOut(cust('fr', 20), winback, 'AI', { waTemplate: wtpl }, wtpl)).ok).toBe(false);
    expect(sent.some((p) => p.type === 'text')).toBe(false);
  });
  it('a Japanese customer outside the window with no Japanese template gets nothing in English', async () => {
    chat = [IN('こんにちは、確定申告をお願いしたいです', 1)];
    const body = residencyCheckMessage('ja', 'Jan');
    const tpl = { name: RESIDENCY_CHECK_TEMPLATE, params: ['Jan'], lang: 'ja', fallbackToText: true };
    expect((await deliverOut(cust('ja', 5 * 24 * 60), body, 'AI', { waTemplate: tpl }, tpl)).ok).toBe(false);
    expect(sent.some((p) => p.template?.language.code === 'en')).toBe(false);
  });
  it('a Chinese speaking customer (Mia) is sent no English template and no English text', async () => {
    chat = [IN('你好，我想问一下退税')];
    const tpl = { name: 'form_received_en', params: [], lang: 'en', fallbackToText: true };
    expect((await deliverOut(cust('en', 10), formReceivedMessage('en'), 'AI', { waTemplate: tpl }, tpl)).ok).toBe(false);
    expect(sent).toHaveLength(0);
    expect(tasks[0].reason).toMatch(/Chinese/);
  });
  it('an English customer is untouched', async () => {
    chat = [IN('Hi, how much is it for the tax return and what do you need from me?', 1)];
    const tpl = { name: 'fu_price_sent', params: ['Jan'], lang: 'en' };
    expect((await deliverOut(cust('en', 3 * 24 * 60), 'Hi Jan, just checking in', 'AI', { waTemplate: tpl }, tpl)).ok).toBe(true);
    expect(sent.map((p) => p.template?.language.code)).toEqual(['en']);
    expect(tasks).toHaveLength(0);
  });
});
