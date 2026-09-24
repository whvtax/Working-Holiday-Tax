/**
 * Jo, 24 Sep: a task must say exactly WHY Will handed over, so a screenshot of
 * it is enough to fix the cause (a Library answer, a rule, or the team's call).
 */
import { buildHandoffDiagnostic, taskContextWithDiagnostic, DIAGNOSTIC_HEADER } from '@/lib/will/handoff-diagnostic';

const base = {
  customerText: 'Can I claim my flights to Australia?', lang: 'en', state: 'QUALIFIED', paid: false, income: 'TFN',
  decision: { action: 'human_task' as const, confidence: 0.5, task_reason: 'Asking about flight deductions', task_detail: 'The customer asks whether flights are deductible. Professional determination: what can be claimed is the team\'s call. FIX: the team\'s call, no Library answer can cover this.' },
  knowledgeUsed: [] as string[], nearest: { intent: 'claim travel to work tolls fuel', score: 0.21 },
};

it('names the customer, the stage, the decision, the Library gap and the fix', () => {
  const d = buildHandoffDiagnostic(base);
  expect(d).toMatch(new RegExp(`^${DIAGNOSTIC_HEADER}:`));
  expect(d).toMatch(/Customer \(en, stage QUALIFIED, not paid, income TFN\) wrote: "Can I claim my flights to Australia\?"/);
  expect(d).toMatch(/Will chose not to answer \(confidence 50%\): Asking about flight deductions/);
  expect(d).toMatch(/Nearest entry "claim travel to work tolls fuel" scored 0\.21 \(needs 0\.35\)/);
  expect(d).toMatch(/FIX: the team's call/);
});

it('a guard refusal names the rule in plain words', () => {
  const d = buildHandoffDiagnostic({ ...base, decision: { action: 'reply', confidence: 0.9 }, guardViolations: ['TAX_DETERMINATION'], nearest: null });
  expect(d).toMatch(/Policy Guard refused it \(confidence 90%\): TAX_DETERMINATION = the text gives a personal tax determination/);
  expect(d).toMatch(/Library: nothing matched at all/);
  expect(d).toMatch(/FIX: the draft is attached/);
});

it('when Library answers were given and Will still handed over, it says the gap is not a missing entry', () => {
  const d = buildHandoffDiagnostic({ ...base, knowledgeUsed: ['claim travel to work tolls fuel'], nearest: null });
  expect(d).toMatch(/Will was given 1 matching answer \(claim travel to work tolls fuel\) and still handed over, so the gap is not a missing entry/);
});

it('the customer message stays first in the task context', () => {
  const ctx = taskContextWithDiagnostic('hello', 'Why Will handed this over:\n• x');
  expect(ctx.startsWith('hello\n\n')).toBe(true);
});
