/**
 * The one-click actions (Dismiss, Mark Resolved, Resolved, Discard, Take
 * Over, Delete message, kill switch) and the Learning tab's knowledge base
 * modal (Save & Go Live, Approve & Go Live, Delete) now actually use their
 * server response instead of ignoring it (audit, 5 Sep).
 *
 * `actionToast` already existed for exactly this purpose, but no call site
 * used it: every one of those buttons still said its success line and closed
 * whatever came back, so an expired session, a 500, a dropped connection, or
 * (for the knowledge base, which called fetch() directly and never parsed the
 * response) a guard-rule 422 all read as done. This pins that every call site
 * now routes its result through actionToast (or, for knowledge, parses the
 * JSON and checks `ok` the same way) before saying success or closing.
 */
import fs from 'fs';
import path from 'path';
import { actionToast } from '@/components/will/Dashboard';

describe('actionToast', () => {
  it('a success reads exactly as the caller\'s success line', () => {
    expect(actionToast({ ok: true }, 'Dismissed')).toEqual({ ok: true, message: 'Dismissed' });
  });
  it('a server refusal shows its error, not the success line', () => {
    expect(actionToast({ ok: false, error: 'unauthorized' }, 'Dismissed'))
      .toEqual({ ok: false, message: '❌ unauthorized' });
  });
  it('a dropped connection or missing ok is a failure', () => {
    expect(actionToast(null, 'Draft discarded')).toEqual({ ok: false, message: '❌ connection problem, try again' });
    expect(actionToast({}, 'Draft discarded')).toEqual({ ok: false, message: '❌ connection problem, try again' });
  });
});

describe('Dashboard wiring', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');

  it('the fire-and-forget one-click actions all route through actionToast', () => {
    // set_kill_switch, discard_message (x2), resolve_task (x3: Dismiss,
    // Mark Resolved, Resolved), toggle_ai (Take Over), delete_template
    const calls = src.match(/actionToast\(/g)?.length ?? 0;
    expect(calls).toBeGreaterThanOrEqual(8);
    expect(src).toMatch(/action: 'set_kill_switch'[\s\S]{0,200}actionToast\(/);
    expect(src).toMatch(/action: 'discard_message'[\s\S]{0,120}actionToast\(r, 'Draft discarded'\)/);
    expect(src).toMatch(/action: 'resolve_task', id: t\.id \}\); say\(actionToast\(r, 'Dismissed'\)/);
    expect(src).toMatch(/action: 'resolve_task', id: t\.id \}\); say\(actionToast\(r, 'Marked resolved ✓'\)/);
    expect(src).toMatch(/action: 'resolve_task', id: t\.id \}\); say\(actionToast\(r, 'Resolved'\)/);
    expect(src).toMatch(/action: 'toggle_ai', id: drawer\.id[\s\S]{0,120}actionToast\(r, drawer\.aiPaused/);
    expect(src).toMatch(/action: 'delete_template'[\s\S]{0,150}actionToast\(r, 'Message deleted'\)/);
  });

  it('no fire-and-forget action call is left un-awaited-for-result', () => {
    // The old bug shape: fire the action, then unconditionally say success.
    expect(src.match(/await act\(\{ action: 'discard_message'[\s\S]{0,10}\}\); say\('Draft discarded'\)/)).toBeNull();
    expect(src.match(/await act\(\{ action: 'resolve_task'[\s\S]{0,10}\}\); say\('Dismissed'\)/)).toBeNull();
    expect(src.match(/await act\(\{ action: 'resolve_task'[\s\S]{0,10}\}\); say\('Resolved'\)/)).toBeNull();
    expect(src.match(/await act\(\{ action: 'set_kill_switch'[\s\S]{0,10}\}\);\s*say\(killSwitch/)).toBeNull();
  });

  it('the knowledge base modal parses the response and only closes on ok', () => {
    expect(src).toMatch(/action: 'delete', id: know\.id[\s\S]{0,200}res\.json\(\)[\s\S]{0,120}actionToast\(r, 'Learned answer deleted'\)[\s\S]{0,60}if \(!t\.ok\) return;/);
    expect(src).toMatch(/action: 'approve', id: know\.id[\s\S]{0,200}actionToast\(r2, 'Learned ✓'\)[\s\S]{0,60}if \(!t2\.ok\) return;/);
    expect(src).toMatch(/action: 'edit', id: know\.id, answer: knowText \}\)[\s\S]{0,200}actionToast\(r, 'Saved, live for all new conversations ✓'\)[\s\S]{0,60}if \(!t\.ok\) return;/);
  });
});
