/** Jo, 27 Oct: the decision log showed five kinds of message handed to the team that Will should answer. */
import fs from 'fs';
import path from 'path';
const src = (f: string) => fs.readFileSync(path.join(process.cwd(), 'src/lib/will', f), 'utf8');
it('Will answers status, keep-my-file-open, "I thought it was free", treaty and MES-pending messages himself', () => {
  const p = src('playbook.ts');
  for (const s of ['"HOW IS MY RETURN GOING?"', 'KEEP MY FILE OPEN', '"I THOUGHT IT WAS FREE"', 'A TAX TREATY OR A CASE THEY READ ABOUT', 'WAITING FOR A MEDICARE ENTITLEMENT STATEMENT']) expect(p).toContain(s);
  expect(p).toContain('never promise to check back on a date');
  expect(src('will-decides.ts')).toContain('never comment on their numbers');
  expect(src('will-decides.ts')).toContain('a working from home diary');
  expect(src('reviewer.ts')).toContain('is not tax advice');
});
