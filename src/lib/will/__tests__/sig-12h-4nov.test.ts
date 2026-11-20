import { SIGNATURE_AFTER_NOTICE } from '@/lib/will/config';
import { isClosingOnly, isThanksLine } from '@/lib/will/text-normalize';

describe('signature reminder, 4 Nov (Jo)', () => {
  it('one reminder only, 18 hours after the notice (Jo, 18 Nov)', () => {
    expect(SIGNATURE_AFTER_NOTICE).toEqual([18 * 3600]);
  });
  it('a bare thank-you to the notice does not count as an unanswered question', () => {
    expect(isClosingOnly('Ok, thank you!!!') || isThanksLine('Ok, thank you!!!')).toBe(true);
    expect(isClosingOnly('Where do I sign?') || isThanksLine('Where do I sign?')).toBe(false);
  });
});
