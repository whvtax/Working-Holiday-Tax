/**
 * Manual reply: in-flight guard and network-error feedback (audit, 5 Sep).
 *
 * A Meta send takes a few seconds and the compose box only clears once the
 * server answers, so a second Enter or click in that gap fired the same
 * manual_reply twice and the customer got the message twice. And when the
 * connection dropped, `act` rejected, `.then` never ran and no toast showed.
 * Now `act` always resolves (a rejection becomes `{ok:false, error}` so the
 * existing toast path shows it) and sendManual refuses a second call while
 * one is in flight, greying the send button meanwhile.
 */
import fs from 'fs';
import path from 'path';
import { act } from '@/components/will/Dashboard';

describe('act', () => {
  const realFetch = global.fetch;
  afterEach(() => { global.fetch = realFetch; });

  it('resolves with an error instead of rejecting when the fetch itself fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError('Failed to fetch')) as any;
    const r = await act({ action: 'manual_reply', customerId: 'c1', body: 'hi' });
    expect(r.ok).toBe(false);
    expect(r.error).toBe('Could not reach the server. Nothing was sent.');
  });

  it('still returns the server JSON on a normal answer, and {} when the body is not JSON', async () => {
    global.fetch = jest.fn().mockResolvedValue({ json: async () => ({ ok: true }) }) as any;
    expect(await act({ action: 'x' })).toEqual({ ok: true });
    global.fetch = jest.fn().mockResolvedValue({ json: async () => { throw new Error('bad json'); } }) as any;
    expect(await act({ action: 'x' })).toEqual({});
  });
});

describe('Dashboard wiring', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');
  const fn = src.slice(src.indexOf('const sendManual = async'), src.indexOf('return !!r?.ok;'));

  it('sendManual refuses a second call while one is in flight and releases the guard in finally', () => {
    expect(fn).toContain('if (sendingRef.current) return false;');
    expect(fn).toContain('sendingRef.current = true;');
    expect(fn).toContain('setSending(true);');
    const tail = src.slice(src.indexOf('return !!r?.ok;'), src.indexOf('return !!r?.ok;') + 200);
    expect(tail).toContain('} finally {');
    expect(tail).toContain('sendingRef.current = false;');
    expect(tail).toContain('setSending(false);');
  });

  it('both send buttons are disabled and show … while a reply is in flight', () => {
    const buttons = src.match(/<button className="send" disabled=\{sending\}[^\n]*>\{sending \? '…' : '➤'\}<\/button>/g) ?? [];
    expect(buttons.length).toBe(2);
    expect(src.match(/<button className="send"/g)?.length).toBe(2);
  });
});
