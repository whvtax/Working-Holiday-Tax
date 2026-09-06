/**
 * audit3 sched-21: the code sends ~20 Meta template names and nothing ever
 * asked Meta whether they exist, are approved, or have the right number of
 * variables. Every gap was discovered on a real customer at 7pm.
 *
 * Pinned here:
 *  1. EXPECTED_META_TEMPLATES covers every `name:` literal the send paths pass
 *     to deliverOut, and every follow-up key, so a renamed key cannot drift.
 *  2. compareTemplates reports missing / not approved / wrong variable count
 *     from Meta's list shape, and only a send-breaking problem is not ok.
 *  3. verifyTemplates asks Meta with the stored WABA id and token, caches the
 *     answer, and is a no-op (ok, not checked) without a WABA id.
 *  4. The health route surfaces it as checks.templates.
 */
import fs from 'fs';
import path from 'path';

const settings: Record<string, unknown> = {};
const store = {
  getSetting: jest.fn(async (k: string) => settings[k]),
  setSetting: jest.fn(async (k: string, v: unknown) => { settings[k] = v; }),
  audit: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

import { EXPECTED_META_TEMPLATES, compareTemplates, verifyTemplates, WA_WABA_KEY } from '@/lib/will/channel';
import { FLOW_TEMPLATES } from '@/lib/will/state-machine';

const root = path.join(__dirname, '..', '..', '..', '..');
const read = (p: string) => fs.readFileSync(path.join(root, p), 'utf8');
const names = new Set(EXPECTED_META_TEMPLATES.map((t) => t.name));

describe('EXPECTED_META_TEMPLATES matches what the send paths use', () => {
  it('has every follow-up key with one variable (the first name)', () => {
    for (const key of Object.values(FLOW_TEMPLATES).flat()) {
      const t = EXPECTED_META_TEMPLATES.find((x) => x.name === key);
      expect(t).toBeDefined();
      expect(t!.params).toBe(1);
      expect(t!.optional).toBe(false);
    }
  });

  it('has every literal template name passed to deliverOut in the send paths', () => {
    const sources = ['src/lib/will/scheduler.ts', 'src/app/api/will/actions/route.ts', 'src/lib/will/service.ts'];
    const literals = new Set<string>();
    for (const f of sources) {
      for (const m of read(f).matchAll(/\{\s*name:\s*'([a-z0-9_]+)'/g)) literals.add(m[1]);
    }
    expect(literals.size).toBeGreaterThan(0);
    for (const l of literals) expect(names.has(l)).toBe(true);
  });

  it('knows estimate_invoice carries two variables (amount and invoice link)', () => {
    const t = EXPECTED_META_TEMPLATES.find((x) => x.name === 'estimate_invoice');
    expect(t).toEqual({ name: 'estimate_invoice', params: 2, optional: false });
  });

  it('lists the per language system keys as optional (text fallback inside 24h)', () => {
    for (const n of ['form_received_en', 'form_received_de', 'review_request_pt', 'req_abn', 'req_abn_ja', 'handoff_holding', 'handoff_holding_fr', 'payment_received', 'medicare']) {
      const t = EXPECTED_META_TEMPLATES.find((x) => x.name === n);
      expect(t?.optional).toBe(true);
    }
    expect(new Set(EXPECTED_META_TEMPLATES.map((t) => t.name)).size).toBe(EXPECTED_META_TEMPLATES.length);
  });
});

const row = (name: string, status = 'APPROVED', language = 'en', text = 'Hi {{1}}, still here?') =>
  ({ name, status, language, components: [{ type: 'BODY', text }] });

describe('compareTemplates', () => {
  it('reports missing, not approved and wrong variable count, and is ok only when nothing will fail a send', () => {
    const expected = [
      { name: 'fu_pre_24h', params: 1, optional: false },
      { name: 'fu_form_3d', params: 1, optional: false },
      { name: 'estimate_invoice', params: 2, optional: false },
      { name: 'signature', params: 0, optional: false },
      { name: 'medicare', params: 0, optional: true },
    ];
    const r = compareTemplates([
      row('fu_pre_24h', 'PAUSED'),
      row('estimate_invoice', 'APPROVED', 'en', 'Your estimate is {{1}}'),
      row('signature', 'APPROVED', 'en', 'Please sign.'),
      row('signature', 'APPROVED', 'de', 'Bitte unterschreiben.'),
    ], expected);
    expect(r.ok).toBe(false);
    expect(r.missing).toEqual(['fu_form_3d']);
    expect(r.missingOptional).toEqual(['medicare']);
    expect(r.notApproved).toEqual(['fu_pre_24h (PAUSED)']);
    expect(r.paramMismatch[0]).toMatch(/^estimate_invoice \(expects 2, has 1/);
    expect(r.approvedLanguages.signature).toEqual(['en', 'de']);
  });

  it('is ok when every required template is approved with the right slots, even if an optional one is missing', () => {
    const expected = [
      { name: 'fu_pre_24h', params: 1, optional: false },
      { name: 'medicare', params: 0, optional: true },
    ];
    const r = compareTemplates([row('fu_pre_24h')], expected);
    expect(r.ok).toBe(true);
    expect(r.missingOptional).toEqual(['medicare']);
  });
});

describe('verifyTemplates', () => {
  const saved = { t: process.env.WHATSAPP_TOKEN, p: process.env.WHATSAPP_PHONE_NUMBER_ID, w: process.env.WHATSAPP_WABA_ID };
  const realFetch = global.fetch;
  beforeEach(() => {
    for (const k of Object.keys(settings)) delete settings[k];
    process.env.WHATSAPP_TOKEN = 'tok-abcdefgh';
    process.env.WHATSAPP_PHONE_NUMBER_ID = '123';
    delete process.env.WHATSAPP_WABA_ID;
  });
  afterAll(() => {
    global.fetch = realFetch;
    if (saved.t !== undefined) process.env.WHATSAPP_TOKEN = saved.t; else delete process.env.WHATSAPP_TOKEN;
    if (saved.p !== undefined) process.env.WHATSAPP_PHONE_NUMBER_ID = saved.p; else delete process.env.WHATSAPP_PHONE_NUMBER_ID;
    if (saved.w !== undefined) process.env.WHATSAPP_WABA_ID = saved.w; else delete process.env.WHATSAPP_WABA_ID;
  });

  it('does not call Meta and stays ok when no WABA id is known', async () => {
    const f = jest.fn();
    global.fetch = f as unknown as typeof fetch;
    const r = await verifyTemplates();
    expect(f).not.toHaveBeenCalled();
    expect(r.checked).toBe(false);
    expect(r.ok).toBe(true);
    expect(r.detail).toMatch(/WHATSAPP_WABA_ID/);
  });

  it('reads the stored WABA id, lists templates from Meta, names the gap, and caches the answer', async () => {
    settings[WA_WABA_KEY] = 'waba-1';
    const rows = EXPECTED_META_TEMPLATES
      .filter((t) => t.name !== 'fu_form_3d' && t.name !== 'medicare')
      .map((t) => row(t.name, 'APPROVED', 'en', Array.from({ length: t.params }, (_, i) => `{{${i + 1}}}`).join(' ') || 'text'));
    const f = jest.fn(async (url: string) => ({
      ok: true, status: 200, json: async () => ({ data: rows, paging: {} }), _url: url,
    }));
    global.fetch = f as unknown as typeof fetch;
    const r = await verifyTemplates();
    expect(f).toHaveBeenCalledTimes(1);
    expect(String(f.mock.calls[0][0])).toContain('/waba-1/message_templates?fields=name,status,language,components');
    expect(r.checked).toBe(true);
    expect(r.ok).toBe(false);
    expect(r.missing).toEqual(['fu_form_3d']);
    expect(r.missingOptional).toEqual(['medicare']);
    expect(r.detail).toContain('1 template missing in WhatsApp Manager: fu_form_3d');
    expect(r.detail).not.toMatch(/[—–]/);
    // Cached: a second call within the TTL does not go back to Meta.
    await verifyTemplates();
    expect(f).toHaveBeenCalledTimes(1);
  });
});

describe('health route surfaces the template check', () => {
  it('adds checks.templates from verifyTemplates only once the channel is live', () => {
    const src = read('src/app/api/will/health/route.ts');
    expect(src).toMatch(/verifyTemplates/);
    expect(src).toMatch(/checks\.templates\s*=\s*\{\s*ok:\s*templates\.ok/);
    expect(src).toMatch(/if \(wa\.configured && wa\.live\)/);
  });
});
