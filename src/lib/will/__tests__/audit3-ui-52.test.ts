/**
 * System faults panel: the "cadence" health check has a CHECK_INFO entry, and
 * any future check with none no longer disappears from the live-fault list
 * (audit, 5 Sep).
 *
 * health/route.ts reports checks.store, schema, guard, engine, scheduler,
 * cron, whatsapp AND cadence, but CHECK_INFO only listed the first seven.
 * The live-fault filter dropped any check with no CHECK_INFO entry, so a red
 * Cadence dot in the header (demo timing on, or schedulerConfig throwing in
 * production) rendered no fault card at all, and the System panel's
 * "Nothing is failing" line showed regardless.
 */
import fs from 'fs';
import path from 'path';

const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');

function section(startMarker: string, endMarker: string): string {
  const a = src.indexOf(startMarker);
  expect(a).toBeGreaterThan(-1);
  const b = src.indexOf(endMarker, a);
  expect(b).toBeGreaterThan(a);
  return src.slice(a, b);
}

describe('System faults panel: cadence check is never invisible', () => {
  const checkInfo = section('const CHECK_INFO: Record<string,', 'const entries = Object.entries');

  it('CHECK_INFO has a cadence entry naming the real cause and the real fix', () => {
    expect(checkInfo).toContain('cadence: {');
    const cadence = section('cadence: {', "action: 'Remove FOLLOWUP_MODE and FOLLOWUP_STEPS from the Vercel environment and redeploy.',");
    expect(cadence).toContain("name: 'Follow-up timing'");
    expect(cadence).toContain('Demo timing is switched on');
    expect(cadence).toContain('follow-ups fire in seconds');
    expect(cadence).toContain('auto-close a minute after the last message');
  });

  it('the live-fault list falls back to a generic card instead of dropping an unlisted check', () => {
    const live = section('const live = entries', '.filter(([, v]) => !v.ok)');
    // ensure the map step, not just the filter, is captured
    const mapStep = src.slice(src.indexOf('.filter(([, v]) => !v.ok)'), src.indexOf('.filter(([, v]) => !v.ok)') + 700);
    expect(mapStep).toContain('CHECK_INFO[k] ?? { name: k, meaning: v.detail, action:');
    expect(mapStep).not.toContain('.filter((x) => !!x.info)');
    void live;
  });
});
