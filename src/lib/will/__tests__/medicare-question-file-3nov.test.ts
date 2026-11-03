/**
 * 3 Nov (Jo): a paid customer was asked whether to carry on without the
 * Medicare exemption, answered with a screen recording of the IHI error, and
 * got "Perfect, got it all, thank you". A file sent right after that question is
 * the reply to it, not paperwork.
 */
import { isAnswerToMedicareQuestion } from '@/lib/will/document-drop';

const out = (body: string) => ({ direction: 'OUT' as const, body });
const inn = (body: string) => ({ direction: 'IN' as const, body });

describe('isAnswerToMedicareQuestion', () => {
  it('true when the last thing we sent is the continue-without question', () => {
    expect(isAnswerToMedicareQuestion([
      out('Hi'), inn('I cannot do the IHI'),
      out('Would you like us to continue without the Medicare exemption? The Medicare levy will then be included in your tax return and you will need to pay it.'),
    ])).toBe(true);
  });
  it('true for the Library wording about the levy staying on the return', () => {
    expect(isAnswerToMedicareQuestion([
      out('We can still go ahead without it, but the Medicare levy will then be included in your tax return and will reduce the result. Is that OK with you?'),
    ])).toBe(true);
  });
  it('false when a later message of ours moved on', () => {
    expect(isAnswerToMedicareQuestion([
      out('Would you like us to continue without the Medicare exemption?'),
      inn('yes'),
      out('Great, we will carry on. Please send your payslips.'),
    ])).toBe(false);
  });
  it('false for ordinary paperwork requests and empty history', () => {
    expect(isAnswerToMedicareQuestion([out('Please send your payslips.')])).toBe(false);
    expect(isAnswerToMedicareQuestion([])).toBe(false);
    expect(isAnswerToMedicareQuestion(null)).toBe(false);
  });
});
