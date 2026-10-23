/** Jo, 23 Oct: Will answers what follows from the rules, approved messages and Library. */
import { buildSystemPrompt } from '@/lib/will/playbook';

it('the playbook tells Will to answer from what he has, and when to hand over', () => {
  const p = buildSystemPrompt({ name: null, state: 'QUALIFIED', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null });
  const all = p.stable + p.dynamic;
  expect(all).toContain('# ANSWER FROM WHAT YOU HAVE (Jo, 23 Oct)');
  expect(all).toMatch(/is not guessing; do it/);
  expect(all).toMatch(/Never invent one/);
  // It sits right after the master rule it clarifies.
  expect(all.indexOf('# ANSWER FROM WHAT YOU HAVE')).toBeGreaterThan(all.indexOf('# MASTER RULE'));
  expect(all.indexOf('# ANSWER FROM WHAT YOU HAVE')).toBeLessThan(all.indexOf('# CONTEXT FIRST'));
});
