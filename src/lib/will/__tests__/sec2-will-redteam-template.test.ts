/**
 * Round 2 red team (sec2-will-redteam): template message abuse. A hostile
 * customer name, a stored model paragraph or a crafted recipient must not break
 * out of the template parameter, change the recipient or smuggle dashes.
 * fetch is mocked; nothing leaves the machine.
 */
const getSetting = jest.fn().mockImplementation(async (k: string) => (/token/i.test(k) ? 'TEST_TOKEN_NOT_REAL' : /phone/i.test(k) ? '111222333' : undefined));
jest.mock('@/lib/will/store', () => ({ getStore: () => ({ getSetting, audit: jest.fn().mockResolvedValue(undefined) }) }));

import { sendWhatsAppTemplate } from '@/lib/will/channel';
import { scrubCustomerText } from '@/lib/will/brand-voice';

let bodies: Array<Record<string, unknown>>;
beforeEach(() => {
  bodies = [];
  process.env.WHATSAPP_ACCESS_TOKEN = 'TEST_TOKEN_NOT_REAL';
  process.env.WHATSAPP_PHONE_NUMBER_ID = '111222333';
  global.fetch = jest.fn(async (_u: unknown, init?: { body?: string }) => {
    if (init?.body) bodies.push(JSON.parse(init.body));
    return new Response(JSON.stringify({ messages: [{ id: 'wamid.T' }] }), { status: 200 });
  }) as unknown as typeof fetch;
});

describe('template recipient and parameters', () => {
  it('the recipient is digits only, whatever string is stored', async () => {
    await sendWhatsAppTemplate('+61 400-000 001; 61499999999', 'handoff_holding', []);
    const to = String(bodies[0]?.to ?? '');
    expect(to).toMatch(/^\d+$/);
  });
  it('an empty or non-numeric recipient sends nothing', async () => {
    for (const bad of ['', 'abc', '   ', '+-()']) {
      const r = await sendWhatsAppTemplate(bad, 'handoff_holding', []);
      expect(r.ok).toBe(false);
    }
    expect(bodies).toHaveLength(0);
  });
  it('a missing template name sends nothing', async () => {
    expect((await sendWhatsAppTemplate('61400000001', '', [])).ok).toBe(false);
    expect(bodies).toHaveLength(0);
  });
  it('newlines, tabs and runs of spaces in a parameter are flattened (no layout injection)', async () => {
    await sendWhatsAppTemplate('61400000001', 'winback_en', ['Hi\n\n*bold* \t\t   x       y', 'ok']);
    const params = (((bodies[0]?.template as { components?: Array<{ parameters: Array<{ text: string }> }> })?.components ?? [])[0]?.parameters ?? []).map((p) => p.text);
    expect(params.length).toBeGreaterThan(0);
    for (const p of params) { expect(p).not.toMatch(/[\r\n\t]/); expect(p).not.toMatch(/ {4,}/); }
  });
  it('a 50 000-character parameter is truncated', async () => {
    await sendWhatsAppTemplate('61400000001', 'winback_en', ['A'.repeat(50000), 'b']);
    const params = (((bodies[0]?.template as { components?: Array<{ parameters: Array<{ text: string }> }> })?.components ?? [])[0]?.parameters ?? []).map((p) => p.text);
    expect(params[0].length).toBeLessThanOrEqual(1100);
  });
  it('the parameter type is always text (no media or currency object can be injected)', async () => {
    await sendWhatsAppTemplate('61400000001', 'winback_en', ['{"type":"image","image":{"link":"https://evil.example/x.png"}}', 'b']);
    const comps = (bodies[0]?.template as { components?: Array<{ parameters: Array<{ type: string }> }> })?.components ?? [];
    for (const c of comps) for (const p of c.parameters) expect(p.type).toBe('text');
  });
});

describe('scrubCustomerText is the last line of defence for dashes', () => {
  it('removes every dash form from template parameters and free text', () => {
    const out = scrubCustomerText('a—b – c ― d − e ‒ f ⸺ g ⸻ h ﹘ i');
    expect(out).not.toMatch(/[‒-―−⸺⸻﹘]/);
  });
  it('leaves the ordinary hyphen alone', () => {
    expect(scrubCustomerText('tax-return 2024-25')).toBe('tax-return 2024-25');
  });
});
