/** Jo, 27 Oct (a customer): "It has, thank you so much!" to "has your refund landed?" got the referral line, not the review ask. */
import { saysYesToRefundCheckin, saysRefundLanded } from '@/lib/will/review-asks';
it('a short yes to the refund check-in counts as the refund landing', () => {
  expect(saysRefundLanded('It has, thank you so much!')).toBe(false);
  for (const t of ['It has, thank you so much!', 'Yes!', 'yep thanks', 'Yes it has 😊', 'はい、届きました']) expect(saysYesToRefundCheckin(t)).toBe(true);
});
it('a not yet, a question, or a long message is not a yes', () => {
  for (const t of ['Not yet', 'No, not yet unfortunately', 'Yes? when will it come?', 'nope']) expect(saysYesToRefundCheckin(t)).toBe(false);
});
