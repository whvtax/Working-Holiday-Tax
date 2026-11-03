import { validateWinbackDecision, winbackHookProblem, WINBACK_SYSTEM } from '../winback-decision';
import { winbackReplyKind, winbackIsOpen } from '../winbacks';
import { detectObjection } from '../lost-leads';
import { reviewAskGate, cleanReviewOpener } from '../review-asks';
import { AGENT_PHRASES } from '../approved-messages';

const ok = (message: string) => validateWinbackDecision({ decision: 'send', reason: 'x', message, confidence: 0.8 });

describe('winback message wording', () => {
  it('rejects the registered tax agent wording in Japanese, German and English', () => {
    expect(ok('前回は料金についてご質問でしたね。登録税理士がすべてレビューします。ご希望でしょうか？')).toBeNull();
    expect(ok('Ein Steuerberater prüft alles. Möchten Sie weitermachen?')).toBeNull();
    expect(ok('A registered tax agent reviews every return. Would you still like us to take care of it?')).toBeNull();
    expect(ok('We are a registered tax agent so you can relax. Did you get it sorted?')).toBeNull();
  });
  it('accepts the approved phrases and a plain line', () => {
    expect(ok(`Last time you asked about ABN income. ${AGENT_PHRASES.signedOff.en}. Did you get it sorted?`)).not.toBeNull();
    expect(ok(`前回はABN収入についてでした。${AGENT_PHRASES.signedOff.ja}。ご希望でしょうか？`)).not.toBeNull();
    expect(ok('Last time you were checking whether you had ABN income. Did you manage to get it sorted?')).not.toBeNull();
  });
  it('rejects residency, intent claims, refund promises and pushy wording', () => {
    expect(ok('居住者としての申請サポートもできます。続きをご希望ですか？')).toBeNull();
    expect(ok('We can check the tax-free threshold for you. Would you like that?')).toBeNull();
    expect(ok('You were ready to go ahead after the ABN price. Still keen to do it?')).toBeNull();
    expect(ok('Have you given up on your tax return this year? Happy to help.')).toBeNull();
    expect(ok('We make sure you get every dollar back. Would you like to continue?')).toBeNull();
  });
  it('the stored-message check agrees and the prompt names only approved phrases', () => {
    expect(winbackHookProblem('Did you manage to get your return sorted in the end?')).toBeNull();
    expect(winbackHookProblem('登録税理士が確認します。続けますか？')).not.toBeNull();
    expect(WINBACK_SYSTEM).toContain(AGENT_PHRASES.supervision.ja);
    expect(WINBACK_SYSTEM).not.toMatch(/a registered tax agent signs off every return/);
  });
});

describe('answers to a win-back', () => {
  it('reads "No I didn\'t" as still needing it', () => {
    for (const t of ["No I didn't", 'Not yet', 'nope', "haven't", 'Nein', 'まだです']) expect(winbackReplyKind(t)).toBe('still_needs');
  });
  it('reads done and unclear answers', () => {
    expect(winbackReplyKind('Yes, got it sorted elsewhere')).toBe('done');
    expect(winbackReplyKind('No thanks, not interested')).not.toBe('still_needs');
    expect(winbackReplyKind('How much was it again?')).toBe('unclear');
  });
  it('a win-back is open for 14 days', () => {
    const now = new Date('2026-11-03T00:00:00Z');
    expect(winbackIsOpen({ sentAt: '2026-11-01T00:00:00Z' }, now)).toBe(true);
    expect(winbackIsOpen({ sentAt: '2026-10-01T00:00:00Z' }, now)).toBe(false);
    expect(winbackIsOpen(undefined, now)).toBe(false);
  });
});

describe('objections', () => {
  it('detects trust and pay-first', () => {
    expect(detectObjection('this feels like a scam')).toBe('trust');
    expect(detectObjection('I do not want to pay first, I had bad experiences')).toBe('trust');
    expect(detectObjection('Can I pay upfront? not comfortable paying first')).toBe('pay_first');
    expect(detectObjection('I will pay on payday')).toBe('timing');
    expect(detectObjection('ok thanks')).toBeNull();
  });
});

describe('review ask gate', () => {
  const base = { trigger: 'timer' as const, owesTax: false, refundLanded: false };
  it('never asks someone who owes tax', () => {
    expect(reviewAskGate({ ...base, owesTax: true, refundLanded: true }).action).toBe('skip');
    expect(reviewAskGate({ ...base, trigger: 'refund_received', outcome: 'PAYABLE' }).action).toBe('skip');
  });
  it('defers the timer ask until the ATO outcome is known', () => {
    expect(reviewAskGate(base).action).toBe('defer');
    expect(reviewAskGate({ ...base, refundSentAt: '2026-10-20T00:00:00Z' }).action).toBe('ask');
    expect(reviewAskGate({ ...base, trigger: 'refund_received', refundLanded: true }).action).toBe('ask');
  });
  it('drops openers that mention past trouble or outcomes', () => {
    expect(cleanReviewOpener('Great to hear the refund landed')).not.toBeNull();
    expect(cleanReviewOpener('Glad we sorted out those issues, properly corrected now')).toBeNull();
    expect(cleanReviewOpener('After all that confusion with the bank details')).toBeNull();
    expect(cleanReviewOpener('Your refund of 1200 is in')).toBeNull();
  });
});
