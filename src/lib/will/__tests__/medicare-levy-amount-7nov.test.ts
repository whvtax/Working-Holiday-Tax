/**
 * Jo, 7 Nov: a paid customer sent an error page from the Medicare exemption application and
 * asked how much the exemption would save. Will's draft was right ("depends on your income,
 * no figure before the review, you'll see it in your estimate, ok to continue without it?"),
 * but the second check held it twice and it became a task.
 */
import fs from 'fs';
import path from 'path';
import { buildSystemPrompt } from '../playbook';
import { KNOWLEDGE_SEED } from '../knowledge-seed';

const src = (f: string) => fs.readFileSync(path.join(process.cwd(), 'src/lib/will', f), 'utf8');

const DRAFT_LINE = "The levy amount depends on your income, so I can't give you a figure before the review is done. Once the team has been through your situation, you'll see it in your estimate.";

it('the playbook tells Will to answer "how much is the levy" himself, with no figure and no task', () => {
  const { stable } = buildSystemPrompt({ name: 'X', state: 'FORM_COMPLETE', income: 'TFN', paid: true, formComplete: true, missingDocs: [], estimatedRefundCents: null, lang: 'en' });
  expect(stable).toContain(DRAFT_LINE);
  expect(stable).toMatch(/No figure, no percentage, no task\./);
});

it('the second check passes this reply instead of holding it', () => {
  const r = src('reviewer.ts');
  expect(r).toContain('MEDICARE EXEMPTION NOT POSSIBLE, AFTER THE FORM (Jo, 7 Nov');
  expect(r).toMatch(/"You'll see it in your estimate" describes the normal process, it is not a promise/);
  // The new rule sits in the pass list, above the "Still a hold" line.
  expect(r.indexOf('MEDICARE EXEMPTION NOT POSSIBLE')).toBeLessThan(r.indexOf('Still a hold:'));
  expect(r.indexOf('MEDICARE EXEMPTION NOT POSSIBLE')).toBeGreaterThan(r.indexOf('THESE ARE A PASS, NEVER A HOLD'));
});

it('the Library answer for "how much is the Medicare levy" gives no figure for this customer', () => {
  const e = KNOWLEDGE_SEED.find((k) => k.intent === 'how much is the Medicare levy')!;
  expect(e.answer).toMatch(/cannot give you a figure before that/);
  expect(e.answer).toMatch(/estimate/);
});

it('no dash characters in the new wording', () => {
  for (const f of ['playbook.ts', 'reviewer.ts']) {
    const s = src(f);
    const i = s.indexOf('Jo, 7 Nov');
    expect(i).toBeGreaterThan(-1);
    expect(s.slice(i, i + 1200)).not.toMatch(/[–—―]/);
  }
});
