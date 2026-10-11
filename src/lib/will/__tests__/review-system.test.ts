/**
 * 11 Oct 2026: the Google review system. 25 reviews from 300 customers; the
 * old flow sent one ask, 14 days after lodgement, with a Maps link, no
 * reminder and no idea who had already written. Now: the day-10 refund
 * check-in, the ask at the "it landed" moment, a direct review link, one
 * reminder, and reviews matched
 * back from the Google feed.
 */
import { reviewLinkFor, refundCheckinMessage, reviewRemindMessage, reviewThanksMessage, saysRefundNotYet, matchReviewToAsk, REFUND_CHECKIN_DAYS, REVIEW_ASK_FALLBACK_DAYS, REVIEW_REMIND_DAYS } from '@/lib/will/review-asks';
import { reviewAskMessage, REVIEW_ASK_MSG } from '@/lib/will/i18n';
import { policyGuard } from '@/lib/will/policy-guard';
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';
import { readFileSync } from 'fs';
import { join } from 'path';

const ctx = { state: 'LODGED' as const, paid: true, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: true, estimateFromTeam: null };

describe('the link', () => {
  it('opens the review box directly when the Place ID is set, Maps otherwise', () => {
    expect(reviewLinkFor('ChIJN1t_tDeuEmsRUsoyG83frY4')).toBe('https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4');
    expect(reviewLinkFor('')).toBe('https://g.page/r/CaWt4kV0UmY-EBM/review');
    expect(reviewLinkFor('not a place id!')).toBe('https://g.page/r/CaWt4kV0UmY-EBM/review');
    expect(reviewLinkFor('https://g.page/r/CaBcDeFg123/review')).toBe('https://g.page/r/CaBcDeFg123/review');
  });
  it('the ask carries the link and "even one line is perfect"', () => {
    const m = reviewAskMessage('en', 'Lou', 'Great to hear the refund landed.', 'https://search.google.com/local/writereview?placeid=X');
    expect(m).toContain('writereview?placeid=X');
    expect(m).toMatch(/Even one line about how it went is perfect/);
    expect(m).not.toContain('{{');
    for (const v of Object.values(REVIEW_ASK_MSG)) expect(v).toContain('{{3}}');
  });
});

describe('the moment', () => {
  it('check-in on day 10, fallback ask on day 21, reminder 3 days after an ask', () => {
    expect(REFUND_CHECKIN_DAYS).toBe(10);
    expect(REVIEW_ASK_FALLBACK_DAYS).toBe(21);
    expect(REVIEW_REMIND_DAYS).toBe(3);
  });
  it('the check-in, the reminder and the thanks are clean in every language', () => {
    for (const lang of ['en', 'de', 'ja', 'es', 'fr', 'it', 'pt']) {
      for (const t of [refundCheckinMessage(lang, 'Lou'), reviewRemindMessage(lang, 'Lou', 'https://search.google.com/local/writereview?placeid=X'), reviewThanksMessage(lang, 'Lou')]) {
        expect(t).toContain('Lou');
        expect(t).not.toMatch(/[—–]|\{\{/);
        expect(policyGuard(t, ctx).allowed).toBe(true);
      }
    }
  });
  it('"not yet" is recognised, "it landed" is not', () => {
    expect(saysRefundNotYet('Not yet!')).toBe(true);
    expect(saysRefundNotYet('still waiting')).toBe(true);
    expect(saysRefundNotYet('Noch nicht')).toBe(true);
    expect(saysRefundNotYet('まだです')).toBe(true);
    expect(saysRefundNotYet('Yes it came in yesterday, thanks!')).toBe(false);
  });
});

describe('matching reviews back', () => {
  it('first name, dated on or after the ask, each review used once', () => {
    const matches = matchReviewToAsk(
      [{ reviewer: 'Lou Martin', createTime: '2026-10-12T00:00:00Z' }, { reviewer: 'Kana', createTime: '2026-09-01T00:00:00Z' }, { reviewer: 'Anonymous', createTime: null }],
      [{ customerId: 'c1', firstName: 'Lou', askedAt: '2026-10-10T00:00:00Z' }, { customerId: 'c2', firstName: 'Kana', askedAt: '2026-10-05T00:00:00Z' }],
    );
    expect(matches).toEqual([{ customerId: 'c1', reviewer: 'Lou Martin' }]);
  });
});

describe('wiring', () => {
  const scheduler = readFileSync(join(__dirname, '..', 'scheduler.ts'), 'utf8');
  const actions = readFileSync(join(__dirname, '..', '..', '..', 'app', 'api', 'will', 'actions', 'route.ts'), 'utf8');
  const service = readFileSync(join(__dirname, '..', 'service.ts'), 'utf8');
  it('lodged schedules the check-in; the scheduler runs check-in, reminder and the nightly sync', () => {
    expect(actions).toMatch(/kind: 'REFUND_CHECKIN', payload: \{ attempt: 0 \}/);
    expect(scheduler).toMatch(/job\.kind === 'REFUND_CHECKIN'/);
    expect(scheduler).toMatch(/job\.kind === 'REVIEW_REMIND'/);
    expect(scheduler).toMatch(/await syncGoogleReviews\(\)\.catch/);
    expect(scheduler).toMatch(/kind: 'REVIEW_REMIND'/);
  });
  it('"not yet" gets one line and a second check-in four days later', () => {
    expect(service).toMatch(/saysRefundNotYet\(text\)/);
    expect(service).toMatch(/kind: 'REFUND_CHECKIN', payload: \{ attempt: rec\.checkins \?\? 1 \}/);
  });
});

describe('the 13 Library entries from the audit', () => {
  it('exist, are guard-clean and carry no dashes', () => {
    const intents = ['what is an ABN, is it my super', 'my payslip shows an ABN', 'transfer shows pending', 'paid more than the fee by mistake', 'friend or partner got an estimate before paying, why did it change', 'the website calculator says I owe tax', 'is the estimate the final number', 'do you have someone who speaks my language', 'just arrived or about to start work, no return yet', 'employer owes back-pay, wait or lodge', 'UK or Irish citizen, Medicare exemption', 'paid customer asks what to do now', 'customer changed phone number'];
    for (const intent of intents) {
      const e = KNOWLEDGE_SEED.find((k) => k.intent === intent);
      expect(e).toBeTruthy();
      expect(e!.answer).not.toMatch(/[—–]/);
      const post = /post-payment|medicare/.test(e!.tags.join(' '));
      expect(policyGuard(e!.answer, { ...ctx, isApprovedTemplate: false, paid: post, state: post ? 'LODGED' : 'PRICE_SENT' }).allowed).toBe(true);
    }
  });
});
