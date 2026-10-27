/** Jo, 27 Oct: "Yes please" to the team's two-year estimate got no reply for a day. */
import fs from 'fs';
import path from 'path';
const src = (f: string) => fs.readFileSync(path.join(process.cwd(), 'src/lib/will', f), 'utf8');
it('Will answers a plain yes to the estimate himself, with no date and no figures', () => {
  const p = src('playbook.ts');
  expect(p).toContain('# "YES" TO THE ESTIMATE');
  expect(p).toContain('Set new_state FINAL_REVIEW only when the current stage is ESTIMATE_READY');
  expect(p).toContain('Never a handover, never silence.');
  expect(p).toContain('never add a date ("soon", "today", "within 24 hours")');
  expect(src('reviewer.ts')).toContain('A plain yes to the team\'s estimate');
});
