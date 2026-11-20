// Rulebook v1 (Nov 2026) judgement guards. Examples are anonymised,
// paraphrased patterns from the 3-month review. No customer data is stored here.
import { leavingReplyFix, leavingCloseLine, isPureThanks, reviewAskBlockedBy, refundLandedBefore, reviewAskAlreadyMade } from '../judgement';

describe('L1: a leaving lead gets one goodbye, not a pitch', () => {
  const pitch = 'With our service you only pay for the lodgement, and the fee is $220. Want to start today?';

  it('replaces a sales reply when the customer says they found someone else', () => {
    const fixed = leavingReplyFix('hey thanks, found someone else', pitch, 'en');
    expect(fixed).toBe(leavingCloseLine('en'));
  });

  it('replaces a sales reply for "I decided to do it myself" in Japanese', () => {
    const fixed = leavingReplyFix('自分ですることにしました ありがとうございました', pitch, 'ja');
    expect(fixed).not.toBeNull();
    expect(fixed).not.toMatch(/\$|\?/);
  });

  it('replaces a reply that asks a question for a leaving customer', () => {
    expect(leavingReplyFix('not interested, thanks', 'Are you sure you want to pass?', 'en')).toBe(leavingCloseLine('en'));
  });

  it('leaves a short goodbye alone', () => {
    const goodbye = 'No worries at all, all the best with it 😊';
    expect(leavingReplyFix('found someone else', goodbye, 'en')).toBeNull();
  });

  it('does nothing when the customer is not leaving', () => {
    expect(leavingReplyFix('how much is it for a TFN only return?', pitch, 'en')).toBeNull();
  });

  it('a goodbye with an empty reply still yields a close line', () => {
    expect(leavingReplyFix('going with another company', '', 'en')).toBe(leavingCloseLine('en'));
  });
});

describe('R1: a thank-you alone is not a review moment', () => {
  it('pure thanks is recognised', () => {
    expect(isPureThanks('thank you so much!')).toBe(true);
    expect(isPureThanks('thanks a lot 🙏')).toBe(true);
  });

  it('thanks with a question is not pure thanks', () => {
    expect(isPureThanks('thanks, when will I get my refund?')).toBe(false);
  });

  it('thanks while leaving is not pure thanks', () => {
    expect(isPureThanks('thanks, found someone else')).toBe(false);
  });

  it('blocks a review ask after a thank-you when no refund has landed', () => {
    expect(reviewAskBlockedBy('thank you so much!', false)).toBe('thanks_without_refund');
  });

  it('allows the ask after a thank-you once the refund has landed', () => {
    expect(reviewAskBlockedBy('thank you, the refund just came in', true)).toBeNull();
  });

  it('blocks a review ask for a leaving customer', () => {
    expect(reviewAskBlockedBy('thanks, I did it myself', true)).toBe('leaving');
  });
});

import { isNearDuplicate, similarity } from '../judgement';

describe('D1: near-duplicate detection (not yet wired)', () => {
  it('treats a case and punctuation change as the same message', () => {
    expect(similarity('Thanks!!', 'thanks')).toBe(1);
  });
  it('flags a near-copy of a message already sent', () => {
    expect(isNearDuplicate('Please send your TFN form so we can start on your return.', ['Please send your TFN form so we can start on your return'])).toBe(true);
  });
  it('does not flag a different reply', () => {
    expect(isNearDuplicate('Got it, thanks for the payslips. We will check them.', ['Please send your TFN form.'])).toBe(false);
  });
});

describe('Jo 15 Nov: refund then thanks', () => {
  it('detects an earlier refund-landed message', () => {
    expect(refundLandedBefore([{ direction: 'OUT', body: 'Did the refund arrive?' }, { direction: 'IN', body: 'yes the refund came in today' }])).toBe(true);
  });
  it('no refund mentioned earlier', () => {
    expect(refundLandedBefore([{ direction: 'IN', body: 'thanks for your help' }])).toBe(false);
  });
});

describe('Jo 15 Nov: never a second review request', () => {
  it('blocks when the ask already went out', () => {
    expect(reviewAskAlreadyMade({ askedAt: '2026-11-01T10:00:00Z' })).toBe(true);
  });
  it('blocks when the customer was skipped (owes tax)', () => {
    expect(reviewAskAlreadyMade({ skippedAt: '2026-11-01T10:00:00Z' })).toBe(true);
  });
  it('allows a first ask', () => {
    expect(reviewAskAlreadyMade(undefined)).toBe(false);
    expect(reviewAskAlreadyMade({})).toBe(false);
  });
});

import { signatureFirstFix } from '../judgement';
describe('S2: lodged-before-signing gets the fixed Library wording', () => {
  it('replaces the reply when the only violation is lodgement before signing (en)', () => {
    expect(signatureFirstFix(['LODGEMENT_BEFORE_SIGNATURE'], 'en')).toMatch(/Once you've signed/);
  });
  it('German and Japanese get their fixed wording', () => {
    expect(signatureFirstFix(['LODGEMENT_BEFORE_SIGNATURE'], 'de')).toMatch(/unterschrieben/);
    expect(signatureFirstFix(['LODGEMENT_BEFORE_SIGNATURE'], 'ja')).toMatch(/ご署名/);
  });
  it('other languages keep the team handoff', () => {
    expect(signatureFirstFix(['LODGEMENT_BEFORE_SIGNATURE'], 'fr')).toBeNull();
  });
  it('a different violation is not touched', () => {
    expect(signatureFirstFix(['FORBIDDEN_AMOUNT:300.00'], 'en')).toBeNull();
    expect(signatureFirstFix(['LODGEMENT_BEFORE_SIGNATURE', 'PRICE_NEGOTIATION'], 'en')).toBeNull();
  });
});
