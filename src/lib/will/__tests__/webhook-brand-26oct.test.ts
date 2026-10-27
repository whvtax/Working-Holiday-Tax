/**
 * Decision 004: the number a message arrives on decides its brand.
 *  - WHT number: handled as WHT, exactly as before.
 *  - SVT number while SVT_WHATSAPP_PHONE_NUMBER_ID is NOT set: dropped (the
 *    old rule: not our number).
 *  - SVT number once set: handled in the SVT context.
 *  - Any other number: dropped.
 */
import { createHmac } from 'crypto';
import { brandForPhoneNumberId, currentBrand } from '@/lib/will/brand-context';

const seen: Array<{ from: string; brand: string }> = [];
jest.mock('@/lib/will/service', () => ({
  handleIncoming: jest.fn(async (from: string) => { seen.push({ from, brand: currentBrand() }); }),
  handleInboundNote: jest.fn().mockResolvedValue(undefined),
  handlePaymentProofMedia: jest.fn().mockResolvedValue(null),
  applyMessageEdit: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    audit: jest.fn().mockResolvedValue(undefined),
    getSetting: jest.fn(async (k: string) => (k === 'wa_phone_number_id' ? 'WHT_ID' : k === 'wa_access_token' ? 'tok' : undefined)),
    claimInbound: jest.fn().mockResolvedValue(true),
    isBlockedContact: jest.fn().mockResolvedValue(false),
    getCustomerByWaId: jest.fn().mockResolvedValue(null),
    markDeliveryFailedByProviderId: jest.fn(),
    addTask: jest.fn(),
  }),
}));
jest.mock('@/lib/rate-limit', () => ({ isRateLimited: jest.fn().mockResolvedValue(false), getRedis: jest.fn().mockResolvedValue(null) }));

import { POST } from '@/app/api/will/webhook/route';

const SECRET = 'test-secret';
function signed(payload: unknown): Request {
  const raw = JSON.stringify(payload);
  const sig = 'sha256=' + createHmac('sha256', SECRET).update(raw, 'utf8').digest('hex');
  return new Request('http://x/api/will/webhook', { method: 'POST', headers: { 'x-hub-signature-256': sig, 'content-type': 'application/json' }, body: raw });
}
const message = (phoneId: string, from: string) => ({ object: 'whatsapp_business_account', entry: [{ changes: [{ field: 'messages', value: {
  messaging_product: 'whatsapp', metadata: { phone_number_id: phoneId },
  messages: [{ from, id: `wamid.${from}`, timestamp: String(Math.floor(Date.now() / 1000)), type: 'text', text: { body: 'Hi, can you do my tax return?' } }],
} }] }] });

const env = process.env;
beforeEach(() => { seen.length = 0; process.env = { ...env, META_APP_SECRET: SECRET }; delete process.env.SVT_WHATSAPP_PHONE_NUMBER_ID; });
afterAll(() => { process.env = env; });

it('WHT number: handled as WHT', async () => {
  await POST(signed(message('WHT_ID', '61400000001')));
  expect(seen).toEqual([{ from: '61400000001', brand: 'wht' }]);
});

it('SVT number before the SVT line is configured: dropped', async () => {
  await POST(signed(message('SVT_ID', '61400000002')));
  expect(seen).toEqual([]);
});

it('SVT number once configured: handled in the SVT context', async () => {
  process.env.SVT_WHATSAPP_PHONE_NUMBER_ID = 'SVT_ID';
  await POST(signed(message('SVT_ID', '61400000003')));
  expect(seen).toEqual([{ from: '61400000003', brand: 'svt' }]);
});

it('an unknown number: dropped', async () => {
  process.env.SVT_WHATSAPP_PHONE_NUMBER_ID = 'SVT_ID';
  await POST(signed(message('OTHER_ID', '61400000004')));
  expect(seen).toEqual([]);
});

describe('brandForPhoneNumberId', () => {
  it('matches the old filter exactly when no SVT id is set', () => {
    expect(brandForPhoneNumberId('WHT', 'WHT', undefined)).toBe('wht');
    expect(brandForPhoneNumberId('X', 'WHT', undefined)).toBeNull();
    expect(brandForPhoneNumberId(undefined, 'WHT', undefined)).toBe('wht');
    expect(brandForPhoneNumberId('X', undefined, undefined)).toBe('wht'); // test mode: no id configured
  });
  it('the SVT id maps to svt, before anything else', () => {
    expect(brandForPhoneNumberId('SVT', 'WHT', 'SVT')).toBe('svt');
    expect(brandForPhoneNumberId('SVT', undefined, 'SVT')).toBe('svt');
  });
});
