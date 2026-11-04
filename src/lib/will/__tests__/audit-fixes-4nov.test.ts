import { teamSaysLodged } from '@/lib/will/stage-sync';
import { ruleCheckExpenses } from '@/lib/will/expense-rules';

describe('audit fixes, 4 Nov', () => {
  it('a question about lodging is not the announcement', () => {
    expect(teamSaysLodged('Have you lodged your return already?')).toBe(false);
    expect(teamSaysLodged('Did you submit it yourself?')).toBe(false);
  });
  it('real announcements still count', () => {
    expect(teamSaysLodged('Good news, we have lodged your return today.')).toBe(true);
    expect(teamSaysLodged('All done, lodged it this morning!')).toBe(true);
  });
  it('sunscreen is a needs-detail item, not a flat no', () => {
    const r = JSON.stringify(ruleCheckExpenses('sunscreen $30'));
    expect(r).toMatch(/outdoors/);
    expect(r).not.toMatch(/cannot be claimed/);
  });
});

import { lodgedVariant } from '@/lib/will/followup-gate-30oct';
import { lodgedNeutralMessage } from '@/lib/will/i18n';
describe('lodged note variants', () => {
  it('no outcome and no estimate: neutral, no refund promise', () => {
    expect(lodgedVariant({ outcome: null, estimatedRefundCents: null } as never, [])).toBe('neutral');
    expect(lodgedVariant({ outcome: null, estimatedRefundCents: 0 } as never, [])).toBe('neutral');
    expect(lodgedNeutralMessage('en')).not.toMatch(/refund/i);
  });
  it('known refund and known payable keep their wording', () => {
    expect(lodgedVariant({ outcome: null, estimatedRefundCents: 50000 } as never, [])).toBe('refund');
    expect(lodgedVariant({ outcome: 'REFUND', estimatedRefundCents: null } as never, [])).toBe('refund');
    expect(lodgedVariant({ outcome: 'PAYABLE', estimatedRefundCents: null } as never, [])).toBe('payable');
  });
});

import { reviewAskMessage, REVIEW_ASK_REFUND_LANDED_OPENER_EN } from '@/lib/will/i18n';
it('the English review ask is short: opener, one question, link', () => {
  const m = reviewAskMessage('en', 'Shannon', REVIEW_ASK_REFUND_LANDED_OPENER_EN, 'https://g.page/r/X/review');
  expect(m).toBe('So glad the refund came through and we could sort it out for you 😊\n\nCan I ask you to leave us a Google review?\nhttps://g.page/r/X/review');
});

import * as i18n from '@/lib/will/i18n';
it('the referral line is gone in every language (Jo, 4 Nov)', () => {
  expect((i18n as Record<string, unknown>).REFERRAL_MSG).toBeUndefined();
  expect((i18n as Record<string, unknown>).referralMessage).toBeUndefined();
});
