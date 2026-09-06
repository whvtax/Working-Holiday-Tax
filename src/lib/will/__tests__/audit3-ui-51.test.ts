/**
 * The operator can see and correct the language a chat is locked to
 * (audit, 5 Sep).
 *
 * `customer.lang` drives every deterministic message and the model's
 * conversation-language line, and one clear foreign hit sets it when none is
 * stored ("Perfecto, gracias" locks an English customer to Spanish). It was
 * only visible as a two-letter suffix on handoff cards and there was no
 * action to change it. Now: a `set_lang` action that accepts one of the seven
 * i18n codes or null and audits `language_set` like the automatic path, and
 * a small picker in the chat header next to the stage badge. Detection and
 * the prompt are untouched.
 */
import fs from 'fs';
import path from 'path';

const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex Smith', state: 'QUALIFIED', paid: false,
  optedOut: false, isLegacy: false, aiPaused: false, lang: 'es' as string | null,
};
const store = {
  getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
  updateCustomer: jest.fn().mockResolvedValue(undefined),
  getSetting: jest.fn().mockResolvedValue(undefined),
  listTemplates: jest.fn().mockResolvedValue([]),
  audit: jest.fn().mockResolvedValue(undefined),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/auth', () => ({ sessionValid: jest.fn().mockResolvedValue(true) }));
jest.mock('@/lib/will/channel', () => ({
  sendWhatsAppText: jest.fn(), sendWhatsAppTemplate: jest.fn(), deliverOut: jest.fn(),
}));

import { POST } from '@/app/api/will/actions/route';
import { LANGS } from '@/lib/will/i18n';

const setLang = (lang: unknown, customerId = 'c1') => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ action: 'set_lang', customerId, lang }),
})).then((r) => r.json());

beforeEach(() => {
  customer.lang = 'es';
  for (const fn of Object.values(store)) (fn as jest.Mock).mockClear();
});

it('exposes exactly the seven codes', () => {
  expect([...LANGS]).toEqual(['en', 'de', 'ja', 'es', 'fr', 'it', 'pt']);
});

it('set_lang stores the code and audits language_set by the owner', async () => {
  const j = await setLang('en');
  expect(j).toEqual({ ok: true, lang: 'en' });
  expect(store.updateCustomer).toHaveBeenCalledWith('c1', { lang: 'en' });
  expect(store.audit).toHaveBeenCalledWith('owner', 'language_set', { customerId: 'c1', from: 'es', to: 'en', by: 'owner' });
});

it('set_lang null clears the language so detection starts again', async () => {
  const j = await setLang(null);
  expect(j).toEqual({ ok: true, lang: null });
  expect(store.updateCustomer).toHaveBeenCalledWith('c1', { lang: null });
  expect(store.audit).toHaveBeenCalledWith('owner', 'language_set', expect.objectContaining({ from: 'es', to: null, by: 'owner' }));
});

it('refuses a code that is not one of the seven', async () => {
  const j = await setLang('xx');
  expect(j.error).toMatch(/unknown language/);
  expect(store.updateCustomer).not.toHaveBeenCalled();
});

it('is a no-op when the language is already what was asked', async () => {
  const j = await setLang('es');
  expect(j).toEqual({ ok: true, lang: 'es' });
  expect(store.updateCustomer).not.toHaveBeenCalled();
  expect(store.audit).not.toHaveBeenCalled();
});

it('needs a customer', async () => {
  expect((await setLang('en', '')).error).toMatch(/customerId/);
  store.getCustomerById.mockResolvedValueOnce(null);
  expect((await setLang('en', 'nope')).error).toMatch(/not found/);
});

it('the chat header shows the stored language next to the stage and lets the owner change it', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');
  const head = src.slice(src.indexOf('className="chathead"'), src.indexOf('className={`aitoggle'));
  expect(head).toContain('className="langpick"');
  expect(head).toContain("value={chatSel.lang ?? ''}");
  expect(head).toContain("action: 'set_lang', customerId: chatSel.id, lang: v");
  expect(head).toContain('Language: not set');
  expect(head).toContain('LANGS.map(');
});
