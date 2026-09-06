/**
 * Audit, 5 Sep (sched-13): SALES CRAFT no longer tells the model to "lead with
 * the guarantee before the number". That line predated the menu and contradicted
 * the 3 Sep rule: the [opening] shows both prices and carries no guarantee, and
 * the price message is the ONE place the guarantee is said. The replacement
 * points at the menu / price message instead of inviting an improvised
 * guarantee sentence.
 */
import { buildSystemPrompt } from '@/lib/will/playbook';

const { stable } = buildSystemPrompt({
  name: 'Helena', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false,
  formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en',
});

it('no longer asks for the guarantee before the number', () => {
  expect(stable).not.toMatch(/Lead with value and the guarantee before the number/);
  expect(stable).not.toMatch(/so the fee lands as low-risk/);
});

it('points price questions at the menu and the price message, where the guarantee already lives', () => {
  expect(stable).toMatch(/When price comes up, the answer is the \[opening\] menu or the matching price message/);
  expect(stable).toMatch(/never add a guarantee sentence of your own before the number/);
  // The decided rule it now defers to is still present and unchanged.
  expect(stable).toMatch(/DO NOT REPEAT THE GUARANTEE in ordinary replies/);
  expect(stable).toMatch(/That is the ONE place it is said/);
});
