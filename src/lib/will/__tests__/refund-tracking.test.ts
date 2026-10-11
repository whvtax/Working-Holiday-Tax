/**
 * Full audit, 11 Oct 2026, decision 13: a fee refund the team promises in the
 * chat is tracked, from the team's own words, until they write it was sent.
 */
import { teamPromisesRefund, teamSentRefund, businessDaysFromNow } from '@/lib/will/stage-sync';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('a promise', () => {
  it.each([
    ["We'll refund the $220 to the account you gave us.", 22000],
    ['No problem, the refund of $176 will go out this week.', 17600],
    ["I'll arrange the refund of the difference, $173.75, today.", 17375],
    ['Wir erstatten dir die $220 zurück.', 22000],
    ['返金いたします。', null],
    ['Happy to refund you, just send your bank details.', null],
  ])('%s', (t, cents) => {
    const r = teamPromisesRefund(t);
    expect(r.promised).toBe(true);
    expect(r.amountCents).toBe(cents);
  });
  it.each([
    "If your tax refund is less than our fee, we'll refund the difference.",
    'The fee is non-refundable as the work is the same.',
    'Your refund from the ATO should arrive within 2 weeks.',
    'Payment received, here is the form.',
    'Die Gebühr ist nicht erstattbar.',
  ])('is not: %s', (t) => expect(teamPromisesRefund(t).promised).toBe(false));
});

describe('sent', () => {
  it.each(['Refund sent, you should see it in 2 business days.', 'Transferred the $176 refund today.', 'The refund has been processed.', 'Rückerstattung ist raus.', '返金しました。'])('%s', (t) => expect(teamSentRefund(t)).toBe(true));
  it.each(["We'll send the refund once we have your details.", 'The refund will be processed this week.', 'Your ATO refund has been sent to your account.'])('not yet / not ours: %s', (t) => expect(teamSentRefund(t)).toBe(false));
});

it('three business days skip the weekend', () => {
  // Thursday 8 Oct 2026 -> Tuesday 13 Oct 2026
  expect(businessDaysFromNow(3, new Date('2026-10-08T00:00:00Z')).toISOString().slice(0, 10)).toBe('2026-10-13');
});

describe('wiring', () => {
  const actions = readFileSync(join(__dirname, '..', '..', '..', 'app', 'api', 'will', 'actions', 'route.ts'), 'utf8');
  const scheduler = readFileSync(join(__dirname, '..', 'scheduler.ts'), 'utf8');
  const dashboard = readFileSync(join(__dirname, '..', '..', '..', 'components', 'will', 'Dashboard.tsx'), 'utf8');
  it('every manual send is read for a promise or a "sent"', () => {
    expect(actions).toMatch(/await trackRefundFromTeamWords\(customer, body\)/);
    expect(actions).toMatch(/kind: 'REFUND_CHECK'/);
    expect(actions).toMatch(/cancelJobsFor\(customer\.id, \['FOLLOW_UP', 'REVIEW_REQUEST', 'REFUND_CHECK'\]\)/);
  });
  it('the review ask and the nudges wait while money is owed; the reminder goes URGENT', () => {
    expect(scheduler).toMatch(/review_ask_deferred_refund_owed/);
    expect(scheduler).toMatch(/!!customer\.refundPromisedAt && !customer\.refundSentAt/);
    expect(scheduler).toMatch(/reason: `REFUND OWED: /);
  });
  it('the chat shows the owed refund', () => {
    expect(dashboard).toMatch(/Refund owed/);
  });
});
