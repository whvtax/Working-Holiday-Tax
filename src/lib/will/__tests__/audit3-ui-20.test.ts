/**
 * A failed Send Reply / Approve no longer locks the card (audit, 5 Sep).
 *
 * `once()` added the task/draft id to `acted` before running the action and
 * never removed it, so when the server refused the send (outside the 24h
 * window, unfilled placeholder, kill switch, WhatsApp 502) the toast said
 * "Not sent" but Approve, Discard and Send Reply stayed disabled until a full
 * page reload. `runOnce` now releases the key when the action returns false or
 * throws; a successful action still keeps the key so nothing can double-send.
 */
import fs from 'fs';
import path from 'path';
import { runOnce } from '@/components/will/Dashboard';

function harness() {
  let acted = new Set<string>();
  const setActed = (upd: (s: Set<string>) => Set<string>) => { acted = upd(acted); };
  return { get: () => acted, setActed, run: (key: string, fn: () => Promise<boolean | void>) => runOnce(acted, setActed, key, fn) };
}

describe('runOnce', () => {
  it('keeps the key after a successful action (no double send)', async () => {
    const h = harness();
    await h.run('t1', async () => true);
    expect(h.get().has('t1')).toBe(true);
    // A second click is a no-op.
    const fn = jest.fn(async () => true);
    await runOnce(h.get(), h.setActed, 't1', fn);
    expect(fn).not.toHaveBeenCalled();
  });

  it('keeps the key when the action returns nothing (legacy callers)', async () => {
    const h = harness();
    await h.run('t1', async () => {});
    expect(h.get().has('t1')).toBe(true);
  });

  it('releases the key when the server refused the action', async () => {
    const h = harness();
    await h.run('t1', async () => false);
    expect(h.get().has('t1')).toBe(false);
    // ...so the operator can fix the text and try again.
    const fn = jest.fn(async () => true);
    await runOnce(h.get(), h.setActed, 't1', fn);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(h.get().has('t1')).toBe(true);
  });

  it('releases the key when the action throws', async () => {
    const h = harness();
    await expect(h.run('t1', async () => { throw new Error('network'); })).rejects.toThrow('network');
    expect(h.get().has('t1')).toBe(false);
  });

  it('blocks a second click while the first is still in flight', async () => {
    const h = harness();
    let resolve!: (v: boolean) => void;
    const first = h.run('t1', () => new Promise<boolean>((r) => { resolve = r; }));
    expect(h.get().has('t1')).toBe(true);
    const fn = jest.fn(async () => true);
    await runOnce(h.get(), h.setActed, 't1', fn);
    expect(fn).not.toHaveBeenCalled();
    resolve(true);
    await first;
    expect(h.get().has('t1')).toBe(true);
  });
});

describe('Dashboard wiring', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');
  it('once() delegates to runOnce and the old keep-forever finally is gone', () => {
    expect(src).toContain('runOnce(acted, setActed, key, fn)');
    expect(src).not.toContain('/* keep acted to prevent double fire */');
  });
  it('every send-type button reports the server result back to once()', () => {
    // Approve (chat + Tasks), Discard (chat + Tasks), Send Reply, recover.
    // (Jo, 6 Sep: the manual 24h/3d/7d follow-up nudge chip — send_followup
    // from the UI — was removed entirely; the scheduler's own automatic
    // cadence covers it, so there is no longer a matching assertion here.)
    expect(src.match(/return !!r\?\.ok; \}\)\}>✓ Approve/g)?.length).toBe(2);
    expect(src.match(/return !!r\?\.ok; \}\)\}>✕ Discard/g)?.length).toBe(2);
    expect(src).toContain("return !!r?.ok; })}>➤ Send Reply</button>");
    expect(src).toContain('return !!res?.ok;');
  });
});
