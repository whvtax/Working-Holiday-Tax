/**
 * 30 Oct 2026: a retired payee name still sat in stored winback text and in
 * Library rows and went to about fifteen customers. The only payee is
 * "The Accounting Academy". Also: no dash of any kind in anything a customer
 * receives, in any language.
 */
const store = {
  addMessage: jest.fn(async (m: Record<string, unknown>) => ({ id: 'm1', ...m })),
  setMessageStatus: jest.fn().mockResolvedValue(undefined), attachProviderId: jest.fn().mockResolvedValue(undefined),
  markCustomerRead: jest.fn().mockResolvedValue(undefined), audit: jest.fn().mockResolvedValue(undefined),
  addTask: jest.fn().mockResolvedValue({ id: 't' }), getSetting: jest.fn().mockResolvedValue(undefined),
  listMessages: jest.fn().mockResolvedValue([]),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
import { deliverOut } from '@/lib/will/channel';
import type { CustomerRow } from '@/lib/will/store';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { scrubCustomerText, PAYEE_NAME } from '@/lib/will/brand-voice';
import * as i18n from '@/lib/will/i18n';
import * as reviewAsks from '@/lib/will/review-asks';

const OLD = ['Simple', 'Tax', 'Services'].join(' ');
const SRC = join(__dirname, '..', '..', '..');

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === '__tests__' || name === 'node_modules' || name === '.next') continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|js|jsx|json|md|html|css)$/.test(name)) out.push(p);
  }
  return out;
}

describe('the retired payee name', () => {
  // Only files that READ or CHECK for the old name may contain it: the two that
  // read payment screenshots (to recognise it as "this is us" on a proof) and
  // the account name guard (to refuse a draft that uses it). None is text a
  // customer receives.
  const RECOGNISERS = ['lib/will/claude.ts', 'lib/will/payment-proof.ts', 'lib/will/account-name.ts'];
  it('appears in no customer facing file under src', () => {
    const offenders = walk(SRC)
      .filter((f) => new RegExp(OLD.replace(/ /g, '\\s+'), 'i').test(readFileSync(f, 'utf8')))
      .map((f) => f.slice(SRC.length + 1))
      .filter((f) => !RECOGNISERS.includes(f));
    expect(offenders).toEqual([]);
  });
  it('the recognisers use it only inside prompts, comments or detection patterns, never in a string sent to a customer', () => {
    for (const f of RECOGNISERS) {
      const text = readFileSync(join(SRC, f), 'utf8');
      const hits = text.split('\n').filter((l) => new RegExp(OLD, 'i').test(l));
      expect(hits.length).toBeGreaterThan(0);
      for (const l of hits) expect(l).toMatch(/\/\/|\*|description:|recipient|Recipient|recogni|The Accounting Academy|Wise|Working Holiday Tax|erhielt|\/simple tax services\/i|simple tax services\|working holiday tax/);
    }
  });
  it('scrubCustomerText replaces it whatever surrounds it', () => {
    expect(scrubCustomerText(`Please pay ${OLD}.`)).toBe(`Please pay ${PAYEE_NAME}.`);
    expect(scrubCustomerText(`pay the ${OLD.toLowerCase()} account`)).toBe(`pay ${PAYEE_NAME} account`);
    expect(scrubCustomerText(`Account name: ${OLD}\nBSB: 062692`)).toBe(`Account name: ${PAYEE_NAME}\nBSB: 062692`);
  });
  it('a clean text comes back as the very same string', () => {
    const t = 'Hi Sam, thanks for the payment to The Accounting Academy.';
    expect(scrubCustomerText(t)).toBe(t);
  });
});

describe('no dash of any kind in customer text', () => {
  it('scrubCustomerText removes em dash, en dash, horizontal bar and the Chinese double dash', () => {
    for (const t of ['Hi Sam — your return', 'Hi Sam – your return', 'Hi Sam ― your return', '你好——你的退税', 'Zeit 9–17 Uhr', 'ありがとう——']) {
      expect(scrubCustomerText(t)).not.toMatch(/[‒-―]/);
    }
    expect(scrubCustomerText('Mon 9–17')).toBe('Mon 9-17');
    expect(scrubCustomerText('tax-free and 24-hour')).toBe('tax-free and 24-hour');
  });
  it('every follow-up, winback, lodged, review, residency and Medicare constant is already dash free', () => {
    const texts: string[] = [];
    const collect = (v: unknown) => { if (typeof v === 'string') texts.push(v); else if (v && typeof v === 'object') Object.values(v).forEach(collect); };
    for (const [k, v] of Object.entries({ ...i18n, ...reviewAsks })) if (/MSG|OPENER/.test(k)) collect(v);
    expect(texts.length).toBeGreaterThan(40);
    for (const t of texts) expect(t).not.toMatch(/[‒-―]/);
  });
});

describe('the single send point cleans every text, whoever wrote it', () => {
  const bodies: string[] = [];
  beforeAll(() => {
    process.env.WHATSAPP_TOKEN = 't'; process.env.WHATSAPP_PHONE_NUMBER_ID = '1';
    global.fetch = jest.fn(async (_u: unknown, init?: { body?: string }) => { bodies.push(String(init?.body)); return new Response(JSON.stringify({ messages: [{ id: 'w' }] }), { status: 200 }); }) as unknown as typeof fetch;
  });
  afterAll(() => { delete process.env.WHATSAPP_TOKEN; delete process.env.WHATSAPP_PHONE_NUMBER_ID; });
  it('a free text and a template parameter both lose the retired name and every dash', async () => {
    const c = { id: 'c1', waId: '61400000001', name: 'Sam', optedOut: false, lang: 'en', lastCustomerMsgAt: new Date().toISOString() } as unknown as CustomerRow;
    await deliverOut(c, `Pay ${OLD} \u2014 BSB 062692`, 'AI');
    expect(store.addMessage).toHaveBeenCalledWith(expect.objectContaining({ body: 'Pay The Accounting Academy, BSB 062692' }));
    bodies.length = 0;
    const tpl = { name: 'winback_en', params: ['Sam', `Ask us \u2013 or pay ${OLD}`] };
    await deliverOut(c, 'x', 'AI', undefined, tpl);
    expect(bodies.join('')).toContain('Ask us, or pay The Accounting Academy');
    expect(bodies.join('')).not.toMatch(/\\u2013|\u2013|Simple/);
  });
});
