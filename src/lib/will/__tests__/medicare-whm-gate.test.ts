/**
 * Full audit, 11 Oct 2026, decision 15 (Jo): a Working Holiday Maker never
 * gets the Medicare exemption script; a resident without Medicare always
 * does, whatever the country. A customer who cannot do it is told we go
 * ahead without it (levy stays); "how much" is a task.
 */
import { medicareAnswerFor, noMedicare } from '@/lib/will/form-link';
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';
import { buildSystemPrompt } from '@/lib/will/playbook';
import { readFileSync } from 'fs';
import { join } from 'path';

it('WHM: the Medicare answer becomes n/a, so nothing is queued', () => {
  expect(noMedicare(medicareAnswerFor('No', 'whm'))).toBe(false);
  expect(noMedicare(medicareAnswerFor('No', 'Working Holiday Maker'))).toBe(false);
  expect(medicareAnswerFor('No', 'whm')).toBe('n/a (Working Holiday Maker)');
});

it('resident without Medicare: the script goes, country or not', () => {
  expect(noMedicare(medicareAnswerFor('No', 'Australian resident for tax purposes'))).toBe(true);
  expect(noMedicare(medicareAnswerFor('Yes', 'Australian resident for tax purposes'))).toBe(false);
  // Older submissions with no tax status keep the old behaviour.
  expect(noMedicare(medicareAnswerFor('No', null))).toBe(true);
});

it('the form route folds the tax status into the Medicare answer', () => {
  const src = readFileSync(join(__dirname, '..', '..', '..', 'app', 'api', 'tax-form', 'route.ts'), 'utf8');
  expect(src).toMatch(/medicareAnswerFor\(sanitiseShort\(formData\.get\('hasMedicare'\)\), sanitiseShort\(formData\.get\('taxStatus'\)\)\)/);
});

it('"I can\'t do it" gets "we go ahead without it, the levy stays, ok?"', () => {
  const e = KNOWLEDGE_SEED.find((k) => /can't do the Medicare exemption/i.test(k.question))!;
  expect(e.answer).toMatch(/go ahead without it/);
  expect(e.answer).toMatch(/Medicare levy stays/);
  expect(e.answer).toMatch(/Is that ok with you\?/);
  const { stable } = buildSystemPrompt({ name: 'X', state: 'FORM_COMPLETE', income: 'TFN', paid: true, formComplete: true, missingDocs: [], estimatedRefundCents: null, lang: 'en' });
  expect(stable).toMatch(/MEDICARE EXEMPTION, AFTER THE FORM/);
  expect(stable).toMatch(/If they ask HOW MUCH the levy is[^.]*"Let me check that for you" and human_task/);
});
