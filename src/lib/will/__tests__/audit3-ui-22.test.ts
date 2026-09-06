/**
 * Audit 3, lane ui, finding 22 (5 Sep): a background tab's 30-minute idle
 * timer used to log out every CRM tab/device at once, because logout always
 * bumped the global revoked-before epoch. Now:
 *  - any tab's activity resets every open tab's idle timer (source-shape
 *    check: this lives in a React effect, not something a unit test can
 *    drive without a real browser/DOM), and
 *  - an idle-timeout logout tells the route `{ reason: 'idle' }`, which
 *    clears only that browser's cookie instead of revoking every session;
 *    the explicit Lock & Exit button still sends no body and revokes
 *    everyone, unchanged.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

describe('IdleLogout cross-tab sync (source shape)', () => {
  const src = readFileSync(
    join(process.cwd(), 'src/app/(site)/crm/layout.tsx'),
    'utf8'
  );

  it('shares activity across tabs via a storage event, not just this tab\'s own events', () => {
    expect(src).toMatch(/localStorage\.setItem\(ACTIVITY_KEY/);
    expect(src).toMatch(/addEventListener\('storage', onStorage\)/);
    expect(src).toMatch(/e\.key === ACTIVITY_KEY/);
  });

  it('tells the logout route this was an idle timeout, not an explicit exit', () => {
    expect(src).toMatch(/reason:\s*'idle'/);
  });
});

describe('/api/crm/logout idle reason', () => {
  const validateSession = jest.fn().mockReturnValue(true);
  const destroySession = jest.fn().mockResolvedValue(undefined);
  jest.mock('@/lib/crm-store', () => ({
    validateSession: (...a: unknown[]) => validateSession(...a),
    destroySession: (...a: unknown[]) => destroySession(...a),
  }));

  const { NextRequest } = require('next/server');
  const { POST } = require('@/app/api/crm/logout/route');

  const makeReq = (body?: unknown) =>
    new NextRequest('http://localhost/api/crm/logout', {
      method: 'POST',
      headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

  beforeEach(() => {
    validateSession.mockClear();
    destroySession.mockClear();
  });

  it('an explicit logout (no body) still revokes every session, unchanged', async () => {
    const res = await POST(makeReq());
    expect(res.status).toBe(200);
    expect(destroySession).toHaveBeenCalledTimes(1);
  });

  it('an idle-timeout logout clears only this browser, not every device', async () => {
    const res = await POST(makeReq({ reason: 'idle' }));
    expect(res.status).toBe(200);
    expect(destroySession).not.toHaveBeenCalled();
    // The cookie is still cleared for the idle tab either way.
    expect(res.headers.get('set-cookie')).toMatch(/crm_session=;/);
  });

  it('an unauthenticated idle call still does not revoke anyone', async () => {
    validateSession.mockReturnValue(false);
    const res = await POST(makeReq({ reason: 'idle' }));
    expect(res.status).toBe(200);
    expect(destroySession).not.toHaveBeenCalled();
  });
});
