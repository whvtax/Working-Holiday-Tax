/** Jo, 27 Oct: a Japanese lead asked "is my tax return still in time?" and was handed to the team. */
import fs from 'fs';
import path from 'path';
const src = (f: string) => fs.readFileSync(path.join(process.cwd(), 'src/lib/will', f), 'utf8');
it('Will answers "is it still in time?" himself, without promising a date or no penalty', () => {
  const p = src('playbook.ts');
  expect(p).toContain('IS IT STILL IN TIME? / WHEN IS THE DEADLINE?');
  expect(p).toContain('every time they ask about the deadline, answer yes');
  expect(p).toContain('the due date is usually 15 May 2027');
  expect(p).toContain('Never "no deadline", never "anytime"');
  expect(p).toContain('Never a handover for this message.');
  expect(src('reviewer.ts')).toContain('Jo, 27 Oct: always yes');
});
