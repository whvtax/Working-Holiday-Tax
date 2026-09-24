/** Jo, 24 Sep: the Lost Leads work queue is ranked, not listed. */
import { priorityScore, PREVENTION_HINTS, CATEGORY_LABELS } from '@/lib/will/lost-leads';

it('a firm YES who saw the price last week outranks a MAYBE who said hello in June', () => {
  const hot = priorityScore({ state: 'PRICE_SENT', quietDays: 6, recoverable: 'YES', lang: 'en', trigger: 'silent' });
  const cold = priorityScore({ state: 'NEW_LEAD', quietDays: 95, recoverable: 'MAYBE', lang: 'fr', trigger: 'silent' });
  expect(hot).toBeGreaterThan(cold);
});
it('NO, and opted out, score zero', () => {
  expect(priorityScore({ state: 'PRICE_SENT', quietDays: 1, recoverable: 'NO', lang: 'en', trigger: 'silent' })).toBe(0);
  expect(priorityScore({ state: 'PRICE_SENT', quietDays: 1, recoverable: 'YES', lang: 'en', trigger: 'opted_out' })).toBe(0);
});
it('every category has a prevention hint', () => {
  for (const c of Object.keys(CATEGORY_LABELS)) expect(PREVENTION_HINTS[c as keyof typeof PREVENTION_HINTS]).toBeTruthy();
});
