/** Jo, 25 Oct (+61 401): "if my refund is $60, what do I pay?" went to the team. */
import fs from 'fs';
import path from 'path';
const src = (f: string) => fs.readFileSync(path.join(process.cwd(), 'src/lib/will', f), 'utf8');
it('Will explains the guarantee in the customer\'s own numbers, and the second check lets it through', () => {
  const p = src('playbook.ts');
  expect(p).toContain('HOW THE GUARANTEE WORKS, WITH THEIR NUMBERS');
  expect(p).toContain('if the ATO refund comes to $60, we refund them the $160 difference');
  expect(p).toContain('Not for ABN or foreign income');
  expect(src('reviewer.ts')).toContain('asking how the guarantee works with an example amount of their own');
});
