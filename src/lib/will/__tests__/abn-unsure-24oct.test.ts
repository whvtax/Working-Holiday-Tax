/** Jo, 24 Oct (+353 85): "not sure if that's an ABN?" got $385, and her
 *  correction "I never worked under an ABN. Just TFN" got nothing. */
import fs from 'fs';
import path from 'path';
import { abnStance } from '@/lib/will/instant-choice';
import { explainHandoffReason } from '@/lib/will/handoff-reasons';

const first = "TFN only I think.. I worked an agency job this time last year so I'm not sure if that's an ABN?";

it('a question about an ABN is not an ABN', () => {
  expect(abnStance([first])).toBe('unsure');
  expect(abnStance(['Is Uber an ABN?'])).toBe('unsure');
});

it('the newest message wins: a correction rules the ABN out', () => {
  expect(abnStance([first, 'I just looked into it and I never worked under an ABN', 'Just TFN'])).toBe('no_abn');
  expect(abnStance([first, 'I just looked into it and I never worked under an ABN'])).toBe('no_abn');
  expect(abnStance(["I didn't have an ABN"])).toBe('no_abn');
  expect(abnStance(['no ABN, only employers'])).toBe('no_abn');
  expect(abnStance(['ABNはないです'])).toBe('no_abn');
});

it('a clear ABN still counts, also after an earlier doubt', () => {
  expect(abnStance(['I had an ABN for cleaning'])).toBe('abn');
  expect(abnStance(['I did Uber Eats'])).toBe('abn');
  expect(abnStance([first, 'Actually yes, I invoiced them with my ABN'])).toBe('abn');
  expect(abnStance(["I'm not sure but I had an ABN too"])).not.toBe('no_abn');
  expect(abnStance(['Hi, how much is it?'])).toBeNull();
});

it('the engine reads the stance, not the bare word, and can step down to the TFN price', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/engine.ts'), 'utf8');
  expect(src).toContain('const stance = abnStance(rawTexts);');
  expect(src).toContain("decision.approved_key === 'price_tfn_abn' && (stance === 'no_abn' || stance === 'unsure') && !abnSignal");
});

it('a reply that repeats a sent message word for word goes to the team, never into silence', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/service.ts'), 'utf8');
  expect(src).toContain("if (await wasAlreadySentVerbatim(store, customer.id, outcome.replyText)) {");
  expect(explainHandoffReason('Will was about to repeat a message he already sent, word for word').label).toBe('Will would have repeated himself');
  const pb = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/playbook.ts'), 'utf8');
  expect(pb).toContain('NOT SURE IF IT WAS AN ABN, AND CORRECTIONS');
});
