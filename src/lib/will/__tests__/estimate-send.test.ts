/**
 * The estimate + invoice send.
 *
 * WHAT CHANGED AND WHY IT IS PINNED. Jo, 28 Aug: this is pressed from the Done
 * button at the END of the job, not in the middle of Review, so the customer
 * moves to Signature. Both directions of getting that wrong cost real money:
 * moving too early sets the signature reminders chasing a return that has not
 * been written, and not moving at all leaves a finished return parked in Review
 * where no follow-up flow ever reaches it again.
 *
 * The formatting is pinned too. "$3,004" beside an invoice for "$3,004.00"
 * reads to a customer like two different numbers.
 */
import {
  canSendEstimate, stateAfterEstimate, formatEstimateAmount, composeEstimate,
  ESTIMATE_SENDABLE_STATES,
} from '@/lib/will/estimate-send';
import { ALL_STATES } from '@/lib/will/state-machine';
import { APPROVED } from '@/lib/will/approved-messages';

describe('who may be sent an estimate', () => {
  it('covers the whole of Review, not just the moment the form lands', () => {
    // The button used to be shown for FORM_COMPLETE alone, so a customer in
    // Under Review had a working action and nothing to press.
    for (const s of ['FORM_COMPLETE', 'DOCUMENTS_COMPLETE', 'UNDER_REVIEW', 'ESTIMATE_READY', 'FINAL_REVIEW']) {
      expect(canSendEstimate(s)).toBe(true);
    }
  });

  it('allows a correction resend after the customer has moved on', () => {
    // Typing an amount one digit wrong happens. The fix has to be pressing the
    // same button again, not dragging a stage backwards by hand.
    expect(canSendEstimate('SIGNATURE_PENDING')).toBe(true);
    expect(canSendEstimate('SIGNED')).toBe(true);
  });

  it('refuses anyone whose questionnaire is not back', () => {
    for (const s of ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING', 'PAID', 'FORM_PENDING']) {
      expect(canSendEstimate(s)).toBe(false);
    }
  });

  it('refuses the closed states and rubbish input', () => {
    for (const s of ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT', '', null, undefined, 'PAID; DROP TABLE']) {
      expect(canSendEstimate(s as string)).toBe(false);
    }
  });

  it('names only states that exist', () => {
    for (const s of ESTIMATE_SENDABLE_STATES) expect(ALL_STATES).toContain(s);
  });
});

describe('where they end up afterwards', () => {
  it('moves to Signature from anywhere in Review', () => {
    for (const s of ['FORM_COMPLETE', 'DOCUMENTS_COMPLETE', 'UNDER_REVIEW', 'ESTIMATE_READY', 'FINAL_REVIEW']) {
      expect(stateAfterEstimate(s)).toBe('SIGNATURE_PENDING');
    }
  });

  it('never moves someone who is already there or past it', () => {
    // A resend must not drag a signed or lodged return backwards.
    for (const s of ['SIGNATURE_PENDING', 'SIGNED', 'LODGED', 'COMPLETED']) {
      expect(stateAfterEstimate(s)).toBeNull();
    }
  });
});

describe('the amount', () => {
  it('always has two decimals', () => {
    expect(formatEstimateAmount(203600)).toBe('$2,036.00');
    expect(formatEstimateAmount(300400)).toBe('$3,004.00');
    // The case that used to render as "$3,004" next to a "$3,004.00" invoice.
    expect(formatEstimateAmount(100000)).toBe('$1,000.00');
  });

  it('handles the small and the odd', () => {
    expect(formatEstimateAmount(0)).toBe('$0.00');
    expect(formatEstimateAmount(5)).toBe('$0.05');
    expect(formatEstimateAmount(99)).toBe('$0.99');
    expect(formatEstimateAmount(123456789)).toBe('$1,234,567.89');
  });
});

describe('the message', () => {
  const url = 'https://in.xero.com/mrZvBPMBIv3uIq2uucXb67IWI6ZpQ8SvRckLm3jX';

  it('fills both placeholders and leaves none behind', () => {
    const out = composeEstimate(APPROVED.estimate_invoice, 203600, url);
    expect(out).toContain('$2,036.00');
    expect(out).toContain(url);
    // humanSend refuses a leftover placeholder, so this is what stops the send
    // failing at the last step for a reason nobody can see.
    expect(out).not.toMatch(/\{\{[A-Z_]+\}\}/);
  });

  it('is laid out the way Jo asked for it', () => {
    // Reworded by Jo, 31 Aug: the amount and the next-steps sit on one line, and
    // the link goes on its own line after a blank one, so WhatsApp renders it as
    // a link instead of running it into the sentence before.
    const out = composeEstimate(APPROVED.estimate_invoice, 203600, url);
    const lines = out.split('\n');
    expect(lines[0]).toBe("Your estimated tax refund is $2,036.00 I'll send it for final review and then for your signature.");
    expect(lines[1]).toBe('');
    expect(lines[2]).toBe('Here is your invoice:');
    expect(lines[3]).toBe('');
    expect(lines[4].trim()).toBe(url);
  });

  it('carries no AI dash', () => {
    expect(composeEstimate(APPROVED.estimate_invoice, 203600, url)).not.toMatch(/[—–―−]/);
  });

  it("uses the owner's wording, whatever he has changed it to", () => {
    // The send path reads the Library copy, so an edit there must survive.
    const mine = 'Refund: {{AMOUNT}}\nInvoice: {{INVOICE_LINK}}';
    expect(composeEstimate(mine, 50000, url)).toBe(`Refund: $500.00\nInvoice: ${url}`);
  });
});
