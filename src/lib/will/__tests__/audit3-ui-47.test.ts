/**
 * Cancelling a confirm() inside once() no longer greys the button out
 * (audit, 5 Sep) — originally written against the follow-up nudge chip
 * (24h/3d/7d), which Jo removed entirely on 6 Sep (the scheduler's automatic
 * cadence already covers it). The runOnce semantics below are general and
 * still apply to every other once()-wrapped button, so they stay; only the
 * chip-specific "Dashboard wiring" assertions, which no longer have anything
 * to match against, were removed.
 *
 * `once(key, async () => { if (!confirm(...)) return; ... })` used to add the
 * key before running the action and only release it on a false/throw result,
 * so a bare `return` on Cancel counted as "done" and the button stayed
 * disabled for the rest of the session with nothing sent. Returning false on
 * Cancel releases the key so the button is clickable again; a confirmed and
 * successful send still locks it as before.
 */
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
