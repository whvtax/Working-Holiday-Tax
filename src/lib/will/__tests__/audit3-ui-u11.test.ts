/**
 * Guard rejections in the CRM say what to change, not just the code
 * (audit, 5 Sep).
 *
 * "Save & Go Live" answered `Blocked: EM_DASH_FORBIDDEN, NON_DOLLAR_CURRENCY`
 * straight from the policy guard's identifiers; the Approve and follow-up
 * toasts fell back to the same join when the server sent no `error`. The
 * owner-facing map in send-errors.ts already existed for the server side;
 * the Dashboard now runs every `blocked` list through it. The guard, its
 * codes and what gets sent are untouched.
 */
import fs from 'fs';
import path from 'path';
import { templateSaveOutcome } from '@/components/will/Dashboard';
import { describeViolations } from '@/lib/will/send-errors';

describe('templateSaveOutcome explains guard codes', () => {
  it('a known code becomes a plain instruction, in the guard order, without duplicates', () => {
    const o = templateSaveOutcome({ ok: false, blocked: ['EM_DASH_FORBIDDEN', 'NON_DOLLAR_CURRENCY', 'EM_DASH_FORBIDDEN'] }, 'update');
    expect(o.saved).toBe(false);
    expect(o.message).toBe('Blocked: ' + describeViolations(['EM_DASH_FORBIDDEN', 'NON_DOLLAR_CURRENCY']));
    expect(o.message).toMatch(/^Blocked: the text contains a dash; replace it with a comma or a full stop\. the text quotes a price in a currency other than Australian dollars$/);
    expect(o.message).not.toMatch(/EM_DASH_FORBIDDEN|NON_DOLLAR_CURRENCY/);
  });

  it('a forbidden amount names the figure', () => {
    expect(templateSaveOutcome({ ok: false, blocked: ['FORBIDDEN_AMOUNT:99.00'] }, 'add').message)
      .toBe('Blocked: the text quotes $99.00, which is not one of the fixed prices');
  });

  it('an unmapped or future code is never hidden', () => {
    expect(templateSaveOutcome({ ok: false, blocked: ['SOME_NEW_CODE'] }, 'add').message).toBe('Blocked: SOME_NEW_CODE');
  });

  it('every code the guard can raise at save time has a plain sentence', () => {
    const guard = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/policy-guard.ts'), 'utf8');
    const codes = Array.from(new Set(Array.from(guard.matchAll(/violations\.push\('([A-Z_]+)'\)/g)).map((m) => m[1])));
    expect(codes.length).toBeGreaterThan(10);
    for (const c of codes) expect(describeViolations([c])).not.toBe(c);
  });
});

describe('Dashboard wiring', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');
  it('no toast joins raw guard codes any more', () => {
    expect(src).toMatch(/import \{ describeViolations \} from '@\/lib\/will\/send-errors'/);
    expect(src.match(/blocked\.join\(/)).toBeNull();
    // the two Approve buttons and the follow-up button all go through the map
    expect(src.match(/describeViolations\(r\.blocked\)/g)?.length).toBe(4);
  });
});
