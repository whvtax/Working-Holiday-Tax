/** Jo, 18 Nov: "how many of those we asked left a review", with no extra message. */
import { saysLeftReview, reviewConversion } from '@/lib/will/review-asks';

it('reads "done" replies to the ask, in our languages', () => {
  for (const t of ['Done!', 'done 👍', 'All done', 'Just left one', 'I left you a 5 star review', 'Left it, thanks!', 'Reviewed!', 'Erledigt!', 'Hab euch bewertet', 'Listo!', 'Ya te la dejé', "C'est fait !", 'Fatto!', 'Feito!', 'Deixei sim', '書きました！']) {
    expect(saysLeftReview(t)).toBe(true);
  }
  for (const t of ['Thank you so much!', 'Will do later', 'Where do I leave it?', 'How long does it take', 'ok']) {
    expect(saysLeftReview(t)).toBe(false);
  }
});

it('counts asked vs reviewed, a Google match counted once', () => {
  const r = reviewConversion({
    a: { askedAt: '2026-11-01' }, b: { askedAt: '2026-11-01', reviewedAt: '2026-11-02' },
    c: { askedAt: '2026-11-01', saidReviewedAt: '2026-11-02' }, d: { askedAt: '2026-11-01', saidReviewedAt: 'x', reviewedAt: 'y' },
    e: { skippedAt: '2026-11-01' },
  });
  expect(r).toEqual({ asked: 4, reviewed: 3, onGoogle: 2, saidInChat: 1, rate: 75 });
  expect(reviewConversion({}).rate).toBeNull();
});
