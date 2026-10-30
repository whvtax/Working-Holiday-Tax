/** 16 Oct (Jo): "we'll message you again in about two weeks" is kept. */
import { readFileSync } from 'fs';
import { join } from 'path';
import { explainHandoffReason } from '@/lib/will/handoff-reasons';

describe('the two-week promise to a customer who owes tax', () => {
  const route = readFileSync(join(__dirname, '..', '..', '..', 'app', 'api', 'will', 'actions', 'route.ts'), 'utf8');
  const sched = readFileSync(join(__dirname, '..', 'scheduler.ts'), 'utf8');
  it('Mark Lodged on a PAYABLE customer schedules it 14 days out', () => {
    expect(route).toMatch(/if \(payable\) \{[\s\S]{0,200}kind: 'PAYABLE_FOLLOWUP'[\s\S]{0,80}14 \* 24 \* 60 \* 60 \* 1000/);
  });
  it('the job raises an URGENT task with a ready opening, and sends nothing itself', () => {
    const i = sched.indexOf("job.kind === 'PAYABLE_FOLLOWUP'");
    const block = sched.slice(i, i + 1800);
    expect(block).toMatch(/severity: 'URGENT'/);
    expect(block).not.toMatch(/deliverOut\(/);
  });
  it('the task reads as an action, not a fault', () => {
    expect(explainHandoffReason('ATO PAYMENT INSTRUCTIONS DUE: two weeks ago ...').kind).not.toBe('other');
  });
});
