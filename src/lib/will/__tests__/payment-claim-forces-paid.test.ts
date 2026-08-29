/**
 * The stage moves to Paid on a text "I paid" in EVERY language.
 *
 * Jo, 29 Aug: whatever language the customer writes in, the moment they report a
 * payment they must move to Paid. This used to depend on the model remembering
 * to set the state on its reply — reliable in English, not in every language.
 * paymentClaimForcesPaid makes it deterministic: given a real payment report in
 * a payable state and a reply going out, the Paid transition is forced onto that
 * reply, exactly as a captioned screenshot already does.
 *
 * This pins the decision itself. The wiring that applies outcome.newState (on
 * auto-send, on approval, and on the delayed autopilot send) is unchanged and
 * covered elsewhere.
 */
import { paymentClaimForcesPaid } from '@/lib/will/service';
import type { CustomerState } from '@/lib/will/state-machine';

const base = {
  paid: false,
  state: 'PRICE_SENT' as CustomerState,
  outcomeKind: 'pending_approval',
  outcomeNewState: undefined as CustomerState | undefined,
  hasReply: true,
};

describe('paymentClaimForcesPaid', () => {
  it.each([
    ['English', 'just paid it!'],
    ['English', "I've paid the fee"],
    ['German', 'ich habe schon bezahlt'],
    ['Japanese', '支払いました'],
    ['Spanish', 'ya pagué'],
    ['Portuguese', 'já paguei'],
    ['French', "j'ai payé"],
    ['Italian', 'ho pagato'],
  ])('forces Paid on a %s payment report', (_lang, text) => {
    expect(paymentClaimForcesPaid({ ...base, text })).toBe(true);
  });

  it('forces Paid whether the reply is sent, queued, or drafted for approval', () => {
    for (const outcomeKind of ['sent', 'queued', 'pending_approval']) {
      expect(paymentClaimForcesPaid({ ...base, outcomeKind, text: 'bezahlt' })).toBe(true);
    }
  });

  it('does NOT move when the payment failed, even though the word "paid" is there', () => {
    expect(paymentClaimForcesPaid({ ...base, text: 'bezahlt, aber die Zahlung wurde abgelehnt' })).toBe(false);
    expect(paymentClaimForcesPaid({ ...base, text: 'I paid but it got declined' })).toBe(false);
  });

  it('does NOT move on a question about paying', () => {
    expect(paymentClaimForcesPaid({ ...base, text: 'how do I pay?' })).toBe(false);
    expect(paymentClaimForcesPaid({ ...base, text: 'when should I pay?' })).toBe(false);
  });

  it('does NOT move a customer who is already paid', () => {
    expect(paymentClaimForcesPaid({ ...base, paid: true, text: 'just paid' })).toBe(false);
  });

  it('does NOT move from a state where no payment is outstanding', () => {
    for (const state of ['NEW_LEAD', 'QUALIFIED', 'PAID', 'FORM_PENDING', 'UNDER_REVIEW'] as CustomerState[]) {
      expect(paymentClaimForcesPaid({ ...base, state, text: 'just paid' })).toBe(false);
    }
  });

  it('does NOT override a model that already set Paid, and never fires without a reply', () => {
    expect(paymentClaimForcesPaid({ ...base, outcomeNewState: 'PAID', text: 'just paid' })).toBe(false);
    expect(paymentClaimForcesPaid({ ...base, hasReply: false, text: 'just paid' })).toBe(false);
    expect(paymentClaimForcesPaid({ ...base, outcomeKind: 'human_task', text: 'just paid' })).toBe(false);
    expect(paymentClaimForcesPaid({ ...base, outcomeKind: 'wait', text: 'just paid' })).toBe(false);
  });
});
