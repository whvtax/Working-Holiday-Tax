/** Jo, 18 Nov (template review 14): the review ask is two lines and its link rides on a button. */
import fs from 'fs';
import path from 'path';
import { reviewLinkButton, REVIEW_BUTTON_LABEL } from '@/lib/will/channel';
import { reviewAskShortMessage, MAPS_REVIEW_LINK } from '@/lib/will/review-asks';

it('the English wording is exactly Jo\'s', () => {
  expect(reviewAskShortMessage('en', MAPS_REVIEW_LINK)).toBe(`Great to hear! Could you leave us a quick Google review?🙏\n${MAPS_REVIEW_LINK}`);
});

it('the review link becomes a "Leave a review" button and leaves the text clean', () => {
  const b = reviewLinkButton(reviewAskShortMessage('en', MAPS_REVIEW_LINK), 'en');
  expect(b).toEqual({ text: 'Great to hear! Could you leave us a quick Google review?🙏', url: MAPS_REVIEW_LINK, label: 'Leave a review' });
  const p = 'https://search.google.com/local/writereview?placeid=ChIJabcdefghij';
  expect(reviewLinkButton(`Hi\n${p}`, 'de')?.label).toBe('Bewertung abgeben'); // 18 Nov: translates "Leave a review"
});

it('no button for any other link, or for a message with two links', () => {
  expect(reviewLinkButton('See https://example.com/review', 'en')).toBeNull();
  expect(reviewLinkButton(`${MAPS_REVIEW_LINK}\n${MAPS_REVIEW_LINK}`, 'en')).toBeNull();
});

it('every label fits Meta\'s 20 character limit', () => {
  for (const l of Object.values(REVIEW_BUTTON_LABEL)) expect([...l].length).toBeLessThanOrEqual(20);
});

it('plain free text goes through the review button path, with plain text if Meta refuses', () => {
  const ch = fs.readFileSync(path.join(__dirname, '..', 'channel.ts'), 'utf8');
  expect(ch).toMatch(/: await sendTextOrReviewButton\(customer\.waId, body, customer\.lang, brand\)\);/);
  expect(ch).toMatch(/async function sendTextOrReviewButton[\s\S]{0,300}if \(b\.ok\) return b;[\s\S]{0,60}return sendWhatsAppText\(waId, body, brand\);/);
});

describe('each brand gets its own review link (Jo, 18 Nov)', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { reviewLink, SVT_REVIEW_LINK } = require('@/lib/will/review-asks');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { SVT_PUBLIC: SVT_BRAND } = require('@/lib/svt/brand-public');
  const store = { getSetting: async () => null };
  it('Student Visa Tax uses its own Google profile, Working Holiday Tax its own', async () => {
    expect(await reviewLink(store, 'svt')).toBe(SVT_REVIEW_LINK);
    expect(await reviewLink(store, 'wht')).toBe(MAPS_REVIEW_LINK);
    expect(SVT_REVIEW_LINK).not.toBe(MAPS_REVIEW_LINK);
    if (SVT_BRAND?.googleReviewUrl) expect(SVT_REVIEW_LINK).toBe(SVT_BRAND.googleReviewUrl);
    expect(reviewLinkButton(`Great to hear!\n${SVT_REVIEW_LINK}`, 'en')?.url).toBe(SVT_REVIEW_LINK);
  });
  it('both brands go through the review ask (no SVT exclusion left)', () => {
    const svc = fs.readFileSync(path.join(__dirname, '..', 'service.ts'), 'utf8');
    expect(svc).not.toMatch(/brand !== 'svt' && [^\n]*(?:saysRefundLanded|rec\?\.askedAt|isPureThanks\(text\) && refundLandedBefore)/);
    expect(svc).toMatch(/reviewLink\(store, customer\.brand\)/);
  });
});
