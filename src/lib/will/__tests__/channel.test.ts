/**
 * Outbound channel — the transmission layer to WhatsApp. The critical property
 * to pin is that it is SAFE BY DEFAULT: with no credentials set it must never
 * try to send, it must report "test mode", and it must not throw.
 */
import { sendWhatsAppText, channelConfigured, metaAppSecret, metaVerifyToken, waAccessToken } from '@/lib/will/channel';

describe('channel is safe by default (test mode)', () => {
  const saved = { t: process.env.WHATSAPP_TOKEN, p: process.env.WHATSAPP_PHONE_NUMBER_ID };
  beforeEach(() => { delete process.env.WHATSAPP_TOKEN; delete process.env.WHATSAPP_PHONE_NUMBER_ID; });
  afterAll(() => { if (saved.t) process.env.WHATSAPP_TOKEN = saved.t; if (saved.p) process.env.WHATSAPP_PHONE_NUMBER_ID = saved.p; });

  it('reports not-configured when credentials are absent', () => {
    expect(channelConfigured()).toBe(false);
  });

  it('skips sending (no network call) and returns ok in test mode', async () => {
    const r = await sendWhatsAppText('61400000000', 'hello');
    expect(r.ok).toBe(true);
    expect(r.skipped).toBe(true);
    expect(r.providerId).toBeUndefined();
  });

  it('reports configured once both credentials are present', () => {
    process.env.WHATSAPP_TOKEN = 'test-token';
    process.env.WHATSAPP_PHONE_NUMBER_ID = '123456';
    expect(channelConfigured()).toBe(true);
  });
});

describe('CONFIG-01: env var names accept both canonical and alias sets', () => {
  const keys = ['WHATSAPP_TOKEN', 'WHATSAPP_ACCESS_TOKEN', 'META_APP_SECRET', 'WHATSAPP_APP_SECRET', 'META_VERIFY_TOKEN', 'WHATSAPP_WEBHOOK_VERIFY_TOKEN'];
  const saved: Record<string, string | undefined> = {};
  beforeEach(() => { for (const k of keys) { saved[k] = process.env[k]; delete process.env[k]; } });
  afterAll(() => { for (const k of keys) { if (saved[k] !== undefined) process.env[k] = saved[k]; } });

  it('reads the canonical token name', () => {
    process.env.WHATSAPP_TOKEN = 'canon';
    expect(waAccessToken()).toBe('canon');
  });
  it('falls back to the alias token name', () => {
    process.env.WHATSAPP_ACCESS_TOKEN = 'alias';
    expect(waAccessToken()).toBe('alias');
  });
  it('reads app secret from either META_APP_SECRET or WHATSAPP_APP_SECRET', () => {
    process.env.WHATSAPP_APP_SECRET = 'sekret';
    expect(metaAppSecret()).toBe('sekret');
    process.env.META_APP_SECRET = 'canonsecret';
    expect(metaAppSecret()).toBe('canonsecret'); // canonical wins
  });
  it('reads verify token from either name', () => {
    process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN = 'vtok';
    expect(metaVerifyToken()).toBe('vtok');
  });
});

/**
 * Template language selection.
 *
 * Meta approves a template per language and rejects a send in a language it has
 * never seen. Will replies in the customer's language, so a German customer
 * should get German when that translation exists and English when it does not,
 * never silence.
 */
import { normalizeTemplateLang } from '@/lib/will/channel';

describe('normalizeTemplateLang', () => {
  it('passes through the plain codes Will detects', () => {
    for (const c of ['de', 'es', 'fr', 'it', 'ja']) {
      expect(normalizeTemplateLang(c)).toBe(c);
    }
  });

  it("maps the detector's 'pt' to pt_BR, the only Portuguese Meta knows (audit, 3 Sep)", () => {
    expect(normalizeTemplateLang('pt')).toBe('pt_BR');
    expect(normalizeTemplateLang('pt_PT')).toBe('pt_PT'); // an explicit regional code is kept
  });

  it('normalises regional variants to Meta casing', () => {
    expect(normalizeTemplateLang('pt-br')).toBe('pt_BR');
    expect(normalizeTemplateLang('EN_gb')).toBe('en_GB');
  });

  it('falls back to English for missing or unusable values', () => {
    for (const v of [null, undefined, '', '   ', 'gibberish', '12', 'e']) {
      expect(normalizeTemplateLang(v)).toBe('en');
    }
  });
});
