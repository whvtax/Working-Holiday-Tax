/** Jo, 26 Oct: three unlodged years, WHV then Student visa, penalties, fees: went to the team. */
import fs from 'fs';
import path from 'path';
const src = (f: string) => fs.readFileSync(path.join(process.cwd(), 'src/lib/will', f), 'utf8');
it('Will answers several unlodged years on any visa himself', () => {
  const p = src('playbook.ts');
  expect(p).toContain('SEVERAL YEARS NOT LODGED, ANY VISA, LATE LODGEMENT');
  expect(p).toContain('Each tax year is its own return and its own fee');
  expect(p).toContain('Never predict an outcome, a penalty or its absence');
  expect(p).toContain('Never a handover for this message.');
  expect(src('reviewer.ts')).toContain('Several unlodged years and any visa');
});
