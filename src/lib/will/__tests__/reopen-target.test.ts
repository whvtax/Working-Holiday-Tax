/**
 * Where a closed customer comes back to (audit, 3 Sep).
 *
 * A lead who never paid restarts from the top (NEW_LEAD, Jo 28 Aug). A paid
 * customer never re-enters the sales flow (spec §5): they go back to the stage
 * they were closed from, or to Form Pending when that is unknown, so the form
 * they finally send is picked up by FORM_RECEIVED instead of ignored.
 */
import { reopenTarget } from '@/lib/will/state-machine';

it('an unpaid lead restarts from the top', () => {
  expect(reopenTarget({ paid: false, previousState: 'PRICE_SENT' })).toBe('NEW_LEAD');
  expect(reopenTarget({ paid: false, previousState: null })).toBe('NEW_LEAD');
});

it('a paid customer returns to the stage they were closed from', () => {
  expect(reopenTarget({ paid: true, previousState: 'FORM_PENDING' })).toBe('FORM_PENDING');
  expect(reopenTarget({ paid: true, previousState: 'SIGNATURE_PENDING' })).toBe('SIGNATURE_PENDING');
});

it('a paid customer with no usable previous stage lands in Form Pending, never Lead', () => {
  expect(reopenTarget({ paid: true, previousState: null })).toBe('FORM_PENDING');
  expect(reopenTarget({ paid: true, previousState: 'QUALIFIED' })).toBe('FORM_PENDING');
});

it('a post-payment previous stage wins even if the paid flag was lost', () => {
  expect(reopenTarget({ paid: false, previousState: 'UNDER_REVIEW' })).toBe('UNDER_REVIEW');
});
