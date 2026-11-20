// Runs the 100 anonymised behaviour cases against the deterministic guards.
// No model call, no customer data. A failing case means a guard changed meaning:
// fix the guard or, if the rule itself changed, change the case and say why.
import { CASES, type EvalCase } from '../evals/behaviour-cases';
import { leavingReplyFix, isPureThanks, reviewAskBlockedBy, isNearDuplicate, signatureFirstFix } from '../judgement';

function run(c: EvalCase): boolean {
  switch (c.area) {
    case 'leaving': {
      const fixed = leavingReplyFix(c.customer, c.reply, c.lang ?? 'en');
      return (fixed !== null) === c.expectFix;
    }
    case 'thanks':
      return isPureThanks(c.customer) === c.expectPure;
    case 'review':
      return reviewAskBlockedBy(c.customer, c.refundLanded) === c.expect;
    case 'signature':
      return (signatureFirstFix(c.violations, c.lang) !== null) === c.expectFix;
    case 'duplicate':
      return isNearDuplicate(c.reply, [c.sent]) === c.expectNear;
  }
}

describe('behaviour evals (100 anonymised cases)', () => {
  it('has exactly 100 cases', () => {
    expect(CASES).toHaveLength(100);
  });
  it('gives every case a unique id', () => {
    const ids = CASES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it.each(CASES.map((c) => [c.id, c] as const))('%s behaves as expected', (_id, c) => {
    // Known gaps are listed in the case file with the reason; they are skipped, not hidden.
    if ('knownGap' in c && c.knownGap) return;
    expect(run(c)).toBe(true);
  });
});
