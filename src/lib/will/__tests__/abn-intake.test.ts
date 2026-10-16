/** 16 Oct (Jo): Will collects a $385 customer's ABN paperwork himself. */
import { readFileSync } from 'fs';
import { join } from 'path';
import { ABN_INTAKE_DONE_LINE, ABN_INTAKE_DONE_RE, intakeSummary, readIntake } from '@/lib/will/abn-intake';
import { explainHandoffReason } from '@/lib/will/handoff-reasons';

const service = readFileSync(join(__dirname, '..', 'service.ts'), 'utf8');
const playbook = readFileSync(join(__dirname, '..', 'playbook.ts'), 'utf8');

describe('the intake', () => {
  it('starts when the ABN answers arrive, instead of "we\'ve received your questionnaire"', () => {
    const fn = service.slice(service.indexOf('async function sendOwedFormAck'), service.indexOf('/** Customer text quoted into the profile block'));
    expect(fn).toMatch(/setSetting\(abnIntakeKey\(customer\.id\), \{ startedAt/);
    expect(fn).not.toMatch(/deliverOut\(/);
  });
  it('Will is told he is in it, and how to run it', () => {
    expect(service).toMatch(/ABN INTAKE IN PROGRESS/);
    expect(playbook).toContain('# ABN INTAKE (Jo, 16 Oct)');
    expect(playbook).toContain(ABN_INTAKE_DONE_LINE);
    expect(playbook).toMatch(/NEVER say whether something is deductible/);
  });
  it('files during the intake go to Will, not to the generic "got it all" + task', () => {
    expect(service).toMatch(/if \(meta\?\.media && isAfterPayment\(customer\.state\) && !intakeActive\)/);
  });
  it('the closing line ends it and gives the team one summary task', () => {
    expect(ABN_INTAKE_DONE_RE.test(ABN_INTAKE_DONE_LINE)).toBe(true);
    expect(service).toMatch(/reason: `ABN PAPERWORK COLLECTED:/);
    expect(explainHandoffReason('ABN PAPERWORK COLLECTED: Sam has sent ...').kind).not.toBe('other');
  });
  it('the summary lists what they wrote and counts the files', () => {
    const t0 = '2026-10-16T00:00:00Z';
    const s = intakeSummary([
      { direction: 'IN', body: 'Uber driving', createdAt: '2026-10-16T01:00:00Z' },
      { direction: 'IN', body: '📄 [Document: uber-tax-summary.pdf]', createdAt: '2026-10-16T02:00:00Z', meta: { media: {} } },
      { direction: 'OUT', body: 'Got it', createdAt: '2026-10-16T02:01:00Z' },
      { direction: 'IN', body: 'old', createdAt: '2026-10-15T01:00:00Z' },
    ], t0);
    expect(s).toContain('Files received during the intake: 1.');
    expect(s).toContain('• Uber driving');
    expect(s).not.toContain('old');
    expect(readIntake({ startedAt: t0 })).toEqual({ startedAt: t0 });
    expect(readIntake(null)).toBeNull();
  });
});
