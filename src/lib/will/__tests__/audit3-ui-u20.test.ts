/**
 * act() already turned a dropped connection into {ok:false,error:...} instead
 * of rejecting (audit, 5 Sep, see audit3-ui-28). But an expired 8h CRM session
 * makes /api/will/actions answer {ok:false,error:'unauthorized'} with a plain
 * 200-shaped body read straight through act(), so every button's toast read
 * that literally as "Not sent: unauthorized" instead of sending the operator
 * back to /crm to log in again, the way refresh() and loadChat() already do
 * for their own routes (audit, 5 Sep).
 * @jest-environment jsdom
 */
import fs from 'fs';
import path from 'path';
import { act } from '@/components/will/Dashboard';

describe('act on an expired session', () => {
  const realFetch = global.fetch;
  // jsdom's window.location is a non-configurable accessor (real browsers are
  // the same, for security), so it cannot be swapped for a stub. Instead
  // confirm the redirect was actually attempted: jsdom logs
  // "Not implemented: navigation" to console.error whenever code sets
  // window.location.href, which only the 401 branch does.
  let errSpy: jest.SpyInstance;
  beforeEach(() => { errSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); });
  afterEach(() => { global.fetch = realFetch; errSpy.mockRestore(); });

  it('redirects to /crm instead of surfacing the raw unauthorized error', async () => {
    global.fetch = jest.fn().mockResolvedValue({ status: 401, json: async () => ({ ok: false, error: 'unauthorized' }) }) as any;
    const r = await act({ action: 'manual_reply', customerId: 'c1', body: 'hi' });
    expect(r.ok).toBe(false);
    const navigated = errSpy.mock.calls.some((c) => String(c[0]).includes('navigation'));
    expect(navigated).toBe(true);
  });

  it('a normal ok/refused answer is untouched and no redirect is attempted', async () => {
    global.fetch = jest.fn().mockResolvedValue({ status: 200, json: async () => ({ ok: false, error: 'outside the 24h messaging window; use an approved template' }) }) as any;
    const r = await act({ action: 'manual_reply', customerId: 'c1', body: 'hi' });
    expect(r).toEqual({ ok: false, error: 'outside the 24h messaging window; use an approved template' });
    expect(errSpy).not.toHaveBeenCalled();
  });
});

describe('Dashboard wiring', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');
  it('act() checks for a 401 before trusting the JSON body, same as refresh() and loadChat()', () => {
    const fn = src.slice(src.indexOf('export async function act('), src.indexOf('export async function act(') + 700);
    expect(fn).toMatch(/if \(res\.status === 401\) \{ window\.location\.href = '\/crm'; return/);
  });
});
