// Pins the fix for audit3 unverified[45]: the Scheduler health dot only proved
// that SOME authorised call to /api/will/tick happened recently, and the tick
// route accepts either a real Vercel cron secret or the dashboard's own open
// session — so the dot stayed green all day from an operator's browser tab
// alone, even with the real Vercel cron dead.
//
// Fix: cronAuthMethod() (auth.ts) says which of the three checks matched;
// the tick route writes a separate `last_cron_tick_at` heartbeat only when a
// real cron secret (not a session) authorised the call; the health route
// reports checks.cronTick from that heartbeat, independent of the existing
// checks.scheduler dot.

jest.mock('next/headers', () => ({
  headers: jest.fn(),
  cookies: jest.fn(),
}));
jest.mock('@/lib/crm-store', () => ({
  validateSession: jest.fn(),
}));

import { headers, cookies } from 'next/headers';
import { validateSession } from '@/lib/crm-store';
import { cronAuthMethod, cronAuthorized } from '@/lib/will/auth';

const mockHeaders = headers as unknown as jest.Mock;
const mockCookies = cookies as unknown as jest.Mock;
const mockValidateSession = validateSession as unknown as jest.Mock;

function withHeaders(map: Record<string, string>) {
  mockHeaders.mockResolvedValue({ get: (k: string) => map[k.toLowerCase()] ?? null });
}
function withSession(valid: boolean) {
  mockCookies.mockResolvedValue({ get: () => ({ value: 'tok' }) });
  mockValidateSession.mockReturnValue(valid);
}

describe('cronAuthMethod (audit3 unverified[45])', () => {
  const saved = { c: process.env.CRON_SECRET, w: process.env.WILL_CRON_SECRET };
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.CRON_SECRET = 'sekret';
    process.env.WILL_CRON_SECRET = 'will-sekret';
  });
  afterAll(() => {
    if (saved.c !== undefined) process.env.CRON_SECRET = saved.c; else delete process.env.CRON_SECRET;
    if (saved.w !== undefined) process.env.WILL_CRON_SECRET = saved.w; else delete process.env.WILL_CRON_SECRET;
  });

  it('reports cron_secret for a real Vercel cron Authorization header', async () => {
    withHeaders({ authorization: 'Bearer sekret' });
    withSession(false);
    expect(await cronAuthMethod()).toBe('cron_secret');
    expect(await cronAuthorized()).toBe(true);
  });

  it('reports will_cron_secret for the x-cron-secret header', async () => {
    withHeaders({ 'x-cron-secret': 'will-sekret' });
    withSession(false);
    expect(await cronAuthMethod()).toBe('will_cron_secret');
    expect(await cronAuthorized()).toBe(true);
  });

  it('reports session — not a cron secret — for the dashboard tab keepalive call', async () => {
    withHeaders({});
    withSession(true);
    expect(await cronAuthMethod()).toBe('session');
    expect(await cronAuthorized()).toBe(true);
  });

  it('reports null when nothing authorises the call', async () => {
    withHeaders({});
    withSession(false);
    expect(await cronAuthMethod()).toBeNull();
    expect(await cronAuthorized()).toBe(false);
  });
});

import fs from 'fs';
import path from 'path';
const root = path.join(__dirname, '..', '..', '..', '..');
const read = (p: string) => fs.readFileSync(path.join(root, p), 'utf8');

describe('tick route and health route wiring (source shape)', () => {
  it('the tick route only stamps last_cron_tick_at for a real cron secret, never a bare session', () => {
    const src = read('src/app/api/will/tick/route.ts');
    expect(src).toMatch(/cronAuthMethod/);
    expect(src).toMatch(/authMethod === 'cron_secret' \|\| authMethod === 'will_cron_secret'/);
    expect(src).toMatch(/setSetting\('last_cron_tick_at'/);
  });

  it('the health route surfaces a checks.cronTick independent of checks.scheduler', () => {
    const src = read('src/app/api/will/health/route.ts');
    expect(src).toMatch(/last_cron_tick_at/);
    expect(src).toMatch(/checks\.cronTick\s*=/);
  });
});
