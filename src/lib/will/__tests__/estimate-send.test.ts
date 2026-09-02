/**
 * The two-step result + lodgement send (Jo, 2 Sep).
 *
 * Sending the assessment result now moves the customer to LODGEMENT_PENDING,
 * where the second (lodgement) payment is awaited before signature. Getting the
 * destination wrong costs money in both directions, so it is pinned; so is the
 * fact that EVERY placeholder in the result message is filled before it leaves.
 */
import {
  canSendEstimate, stateAfterEstimate, formatEstimateAmount, composeEstimate,
  lodgementFeeLabel, ESTIMATE_SENDABLE_STATES, type EstimateFields,
} from '@/lib/will/estimate-send';
import { ALL_STATES } from '@/lib/will/state-machine';
import { APPROVED } from '@/lib/will/approved-messages';

const REFUND: EstimateFields = {
  residency: 'WHM', incomeType: 'TFN', outcome: 'REFUND', medicareExempt: true,
  taxableIncomeCents: 3240000, taxWithheldCents: 618000, taxPayableCents: 364000,
  expensesCents: 125000, medicareCents: 0, outcomeCents: 254000,
};

describe('who may be sent a result', () => {
  it('covers the whole of Review plus the lodgement-payment wait', () => {
    for (const s of ['FORM_COMPLETE', 'DOCUMENTS_COMPLETE', 'UNDER_REVIEW', 'ESTIMATE_READY', 'LODGEMENT_PENDING']) {
      expect(canSendEstimate(s)).toBe(true);
    }
  });

  it('allows a correction resend after the customer has moved on', () => {
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
  it('moves to Lodgement Payment from anywhere in Review', () => {
    for (const s of ['FORM_COMPLETE', 'DOCUMENTS_COMPLETE', 'UNDER_REVIEW', 'ESTIMATE_READY', 'LODGEMENT_PENDING']) {
      expect(stateAfterEstimate(s)).toBe('LODGEMENT_PENDING');
    }
  });

  it('never moves someone who has already paid the lodgement or gone past it', () => {
    for (const s of ['FINAL_REVIEW', 'SIGNATURE_PENDING', 'SIGNED', 'LODGED', 'COMPLETED']) {
      expect(stateAfterEstimate(s)).toBeNull();
    }
  });
});

describe('the amount', () => {
  it('always has two decimals', () => {
    expect(formatEstimateAmount(203600)).toBe('$2,036.00');
    expect(formatEstimateAmount(100000)).toBe('$1,000.00');
  });
  it('handles the small and the odd', () => {
    expect(formatEstimateAmount(0)).toBe('$0.00');
    expect(formatEstimateAmount(5)).toBe('$0.05');
    expect(formatEstimateAmount(123456789)).toBe('$1,234,567.89');
  });
});

describe('the lodgement fee shown', () => {
  it('is $110 for TFN and $275 for TFN + ABN', () => {
    expect(lodgementFeeLabel('TFN')).toBe('$110');
    expect(lodgementFeeLabel('TFN_ABN')).toBe('$275');
  });
});

describe('the result message', () => {
  it('fills every placeholder and leaves none behind', () => {
    const out = composeEstimate(APPROVED.estimate_invoice, REFUND);
    expect(out).toContain('Working Holiday Maker');
    expect(out).toContain('$32,400.00');   // taxable income
    expect(out).toContain('$6,180.00');    // tax withheld
    expect(out).toContain('$0 (exempt)');  // medicare exempt
    expect(out).toContain('Estimated refund: $2,540.00');
    expect(out).toContain('$110');         // lodgement fee (TFN)
    // humanSend refuses a leftover placeholder, so nothing may remain.
    expect(out).not.toMatch(/\{\{[A-Z_]+\}\}/);
  });

  it('flips to tax payable and the resident label', () => {
    const payable: EstimateFields = { ...REFUND, outcome: 'PAYABLE', residency: 'RESIDENT', incomeType: 'TFN_ABN', outcomeCents: 90000 };
    const out = composeEstimate(APPROVED.estimate_invoice, payable);
    expect(out).toContain('Australian resident for tax purposes');
    expect(out).toContain('Estimated tax payable: $900.00');
    expect(out).toContain('$275'); // lodgement fee (TFN + ABN)
    expect(out).toContain('amount payable');
    expect(out).not.toMatch(/\{\{[A-Z_]+\}\}/);
  });

  it('shows the medicare levy when not exempt', () => {
    const out = composeEstimate(APPROVED.estimate_invoice, { ...REFUND, medicareExempt: false, medicareCents: 42000 });
    expect(out).toContain('$420.00');
    expect(out).not.toContain('exempt');
  });

  it('carries no AI dash', () => {
    expect(composeEstimate(APPROVED.estimate_invoice, REFUND)).not.toMatch(/[—–―−]/);
  });

  it("uses the owner's wording, whatever he has changed it to", () => {
    const mine = 'Result: {{OUTCOME_LABEL}} {{OUTCOME_AMOUNT}}, lodge for {{LODGEMENT_FEE}}';
    expect(composeEstimate(mine, REFUND)).toBe('Result: Estimated refund $2,540.00, lodge for $110');
  });
});
