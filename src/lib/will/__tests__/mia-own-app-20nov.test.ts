/**
 * 20 Nov 2026: Mia (SVT) runs on her own Meta app and WhatsApp Business
 * Account, configured by env vars only. Will is never affected.
 */
import fs from 'fs';
import path from 'path';

jest.mock('../store', () => ({ getStore: () => ({ getSetting: async () => null, setSetting: async () => undefined }) }));

import { resolveBrandCreds } from '../channel';

const ENV = { ...process.env };
beforeEach(() => {
  process.env = { ...ENV, WHATSAPP_TOKEN: 'will-token', WHATSAPP_PHONE_NUMBER_ID: '111', WHATSAPP_WABA_ID: '9001', SVT_WHATSAPP_PHONE_NUMBER_ID: '222' };
  delete process.env.SVT_WHATSAPP_TOKEN;
  delete process.env.SVT_WHATSAPP_WABA_ID;
});
afterAll(() => { process.env = ENV; });

describe('Mia credentials', () => {
  it('falls back to the shared token and WABA until her own are set (old behaviour)', async () => {
    expect(await resolveBrandCreds('svt')).toEqual({ token: 'will-token', phoneId: '222', wabaId: '9001' });
  });
  it('uses her own token and WABA once set, Will unchanged', async () => {
    process.env.SVT_WHATSAPP_TOKEN = 'mia-token';
    process.env.SVT_WHATSAPP_WABA_ID = '9002';
    expect(await resolveBrandCreds('svt')).toEqual({ token: 'mia-token', phoneId: '222', wabaId: '9002' });
    expect(await resolveBrandCreds('wht')).toEqual({ token: 'will-token', phoneId: '111', wabaId: '9001' });
  });
  it('never gives Mia the WHT number', async () => {
    delete process.env.SVT_WHATSAPP_PHONE_NUMBER_ID;
    expect((await resolveBrandCreds('svt')).phoneId).toBeUndefined();
  });
});

describe('webhook and site', () => {
  it('accepts either app secret on the webhook signature', () => {
    const src = fs.readFileSync(path.join(process.cwd(), 'src/app/api/will/webhook/route.ts'), 'utf8');
    expect(src).toContain('process.env.SVT_META_APP_SECRET');
    expect(src).toMatch(/for \(const secret of secrets\)/);
  });
  it('the old facebook-domain-verification tag is gone (domain verified by DNS)', () => {
    const src = fs.readFileSync(path.join(process.cwd(), 'src/app/(site)/layout.tsx'), 'utf8');
    expect(src).not.toContain('facebook-domain-verification');
  });
});
