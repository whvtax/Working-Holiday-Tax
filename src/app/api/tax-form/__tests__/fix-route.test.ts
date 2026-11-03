/** Residency correction link: single use, token-bound, status only. Synthetic data. */
process.env.FORM_TOKEN_SECRET = 'synthetic-test-secret-0123456789abcdef-xyz';
const settings = new Map<string, unknown>();
const audit = jest.fn(async () => undefined);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getSetting: async (k: string) => settings.get(k) ?? null,
    setSetting: async (k: string, v: unknown) => { settings.set(k, v); },
    getCustomerById: async (id: string) => (id === 'cust-1' ? { id, waId: '61400000000' } : null),
    audit,
  }),
}));
const setStatus = jest.fn(async () => true);
jest.mock('@/lib/db', () => ({
  findOpenTaxTaskByWhatsapp: async () => ({ id: 'T1' }),
  setTaskTaxStatus: (...a: unknown[]) => setStatus(...(a as [])),
}));
jest.mock('@/lib/rate-limit', () => ({ isRateLimited: async () => false }));
jest.mock('@/lib/public-form-guard', () => ({ crossSiteFormReason: () => null }));
import { NextRequest } from 'next/server';
import { POST } from '../fix/route';
import { signFixToken, signFormToken } from '@/lib/will/form-token';

const call = (body: unknown) => POST(new NextRequest('https://workingholidaytax.com.au/api/tax-form/fix', {
  method: 'POST', headers: { host: 'workingholidaytax.com.au', 'content-type': 'application/json' }, body: JSON.stringify(body),
}));
beforeEach(() => { settings.clear(); setStatus.mockClear(); });

it('changes the status once, then the link is dead', async () => {
  const k = signFixToken('cust-1', 'wht')!;
  expect((await call({ k, status: 'resident' })).status).toBe(200);
  expect(setStatus).toHaveBeenCalledWith('T1', 'resident');
  const again = await call({ k, status: 'whm' });
  expect(again.status).toBe(409);
  expect(setStatus).toHaveBeenCalledTimes(1);
});
it('refuses a normal form token, a missing token and a bad status', async () => {
  const form = signFormToken({ customerId: 'cust-1', brand: 'wht' })!;
  expect((await call({ k: form, status: 'resident' })).status).toBe(403);
  expect((await call({ status: 'resident' })).status).toBe(403);
  expect((await call({ k: signFixToken('cust-1', 'wht')!, status: 'foreign' })).status).toBe(400);
  expect(setStatus).not.toHaveBeenCalled();
});
