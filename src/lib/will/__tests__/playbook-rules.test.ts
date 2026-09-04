/**
 * The rules Jo set from the Decision Log are in the live prompt.
 * 3 Sep: the registered agent / TPB question is answered from [legitimacy].
 * 4 Sep: a detailed tax story before payment gets the short three-line shape and
 * is never a task; the customer chooses TFN even with ABN income; a myGov
 * login problem gets the reassurance, not a task.
 */
import { buildSystemPrompt } from '@/lib/will/playbook';

const { stable } = buildSystemPrompt({
  name: 'Helena', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false,
  formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en',
});

it('answers the registered agent question from the Library, never a task', () => {
  expect(stable).toMatch(/THE REGISTERED AGENT QUESTION/);
  expect(stable).toMatch(/answer with \[legitimacy\]/);
});

it('gives every detailed tax story the same short shape and never hands it over', () => {
  expect(stable).toMatch(/THE DETAILED TAX STORY/);
  expect(stable).toMatch(/Three or four short lines in total, under 60 words/);
  expect(stable).toMatch(/Addy case/);
  expect(stable).toMatch(/never a human_task/);
});

it('lets the customer choose TFN only even with ABN income', () => {
  expect(stable).toMatch(/THE CUSTOMER CHOOSES THE TRACK, EVEN WITH ABN INCOME/);
  expect(stable).toMatch(/do NOT raise a human_task/);
});

it('a myGov login problem gets the reassurance, not a task', () => {
  expect(stable).toMatch(/is NOT a human_task \(Jo, 4 Sep, Nick\)/);
});

it('the prompt forbids the retired guarantee paraphrase and no approved message carries it', () => {
  expect(stable).toMatch(/Never write "our fee never costs you more than the refund you get back"/);
  const { APPROVED } = jest.requireActual('@/lib/will/approved-messages');
  expect(JSON.stringify(APPROVED)).not.toMatch(/never costs you more than the refund/i);
});
