/**
 * Cancelling the follow-up confirm no longer greys the chip out (audit, 5 Sep).
 *
 * The follow-up chips run `once(key, async () => { if (!confirm(...)) return; ... })`.
 * Because `once` added the key before running the action and only released it on
 * a false/throw result, a bare `return` on Cancel counted as "done" and the chip
 * stayed disabled for the rest of the session with nothing sent. The chip now
 * returns false on Cancel, so the key is released and the chip is clickable again.
 * A confirmed and successful send still locks the chip as before.
 */
import fs from 'fs';
import path from 'path';
import { runOnce } from '@/components/will/Dashboard';

function harness() {
  let acted = new Set<string>();
  const setActed = (upd: (s: Set<string>) => Set<string>) => { acted = upd(acted); };
  return { get: () => acted, setActed };
}

// Mirrors the chip's action body: confirm first, then send, report ok.
function chipAction(confirmResult: boolean, send: jest.Mock) {
  return async () => {
    if (!confirmResult) return false;
    const r = await send();
    return !!r?.ok;
  };
}

describe('follow-up chip: Cancel in confirm', () => {
  it('releases the chip so it can be pressed again, and nothing was sent', async () => {
    const h = harness();
    const send = jest.fn(async () => ({ ok: true }));
    await runOnce(h.get(), h.setActed, 'fu1-cust', chipAction(false, send));
    expect(send).not.toHaveBeenCalled();
    expect(h.get().has('fu1-cust')).toBe(false);

    // Second press, this time confirmed: sends once and then stays locked.
    await runOnce(h.get(), h.setActed, 'fu1-cust', chipAction(true, send));
    expect(send).toHaveBeenCalledTimes(1);
    expect(h.get().has('fu1-cust')).toBe(true);
  });

  it('a failed send releases the chip too', async () => {
    const h = harness();
    const send = jest.fn(async () => ({ ok: false, error: 'outside the 24h window' }));
    await runOnce(h.get(), h.setActed, 'fu1-cust', chipAction(true, send));
    expect(h.get().has('fu1-cust')).toBe(false);
  });
});

describe('Dashboard wiring', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');
  it('the follow-up chip returns false when the confirm is cancelled', () => {
    expect(src).toMatch(/if \(!confirm\(`Send this to \$\{chatSel\.name[^\n]*\)\) return false;/);
    // No once() callback still uses the old bare `return` that counted Cancel as
    // done (plain onClick handlers outside once() may keep a bare return).
    const onceBodies = src.match(/once\([^\n]*async \(\) => \{[\s\S]*?\n\s*\}\)\}/g) ?? [];
    expect(onceBodies.length).toBeGreaterThan(0);
    for (const body of onceBodies) expect(body).not.toMatch(/if \(!confirm\([^\n]*\)\) return;/);
  });
});
