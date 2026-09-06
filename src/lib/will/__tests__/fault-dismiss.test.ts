/**
 * (Jo, 6 Sep) The X on a System Faults card: "I've dealt with this, clear
 * it." There is no row to delete — a fault is a live grouping of recent
 * audit rows, not a stored record — so dismissing it records WHEN, and a
 * fresh occurrence after that time (a newer lastAt) must reappear on its
 * own. Nothing dismissed can ever hide a genuinely new failure.
 */
import { applyFaultDismissals } from '@/lib/will/system-report';
import type { SystemFault } from '@/lib/will/system-report';

function fault(over: Partial<SystemFault> = {}): SystemFault {
  return {
    key: 'send_failed', component: 'WhatsApp send', error: 'x', lastAt: '2026-09-06T10:00:00.000Z',
    count: 3, meaning: 'm', action: 'a', severity: 'critical',
    ...over,
  };
}

describe('applyFaultDismissals', () => {
  it('keeps a fault that was never dismissed', () => {
    const out = applyFaultDismissals([fault()], {});
    expect(out).toHaveLength(1);
  });

  it('hides a fault dismissed after its last occurrence', () => {
    const out = applyFaultDismissals([fault()], { send_failed: '2026-09-06T11:00:00.000Z' });
    expect(out).toHaveLength(0);
  });

  it('a fresh occurrence after the dismissal reappears on its own', () => {
    const out = applyFaultDismissals(
      [fault({ lastAt: '2026-09-06T12:00:00.000Z' })],
      { send_failed: '2026-09-06T11:00:00.000Z' },
    );
    expect(out).toHaveLength(1);
  });

  it('a dismissal exactly at lastAt still hides it (not strictly newer)', () => {
    const out = applyFaultDismissals([fault()], { send_failed: '2026-09-06T10:00:00.000Z' });
    expect(out).toHaveLength(0);
  });

  it('null/undefined dismissal is treated as never dismissed', () => {
    expect(applyFaultDismissals([fault()], { send_failed: null })).toHaveLength(1);
    expect(applyFaultDismissals([fault()], { send_failed: undefined })).toHaveLength(1);
  });

  it('only filters the fault whose key was actually dismissed', () => {
    const out = applyFaultDismissals(
      [fault({ key: 'a' }), fault({ key: 'b' })],
      { a: '2026-09-06T11:00:00.000Z' },
    );
    expect(out.map((f) => f.key)).toEqual(['b']);
  });
});
