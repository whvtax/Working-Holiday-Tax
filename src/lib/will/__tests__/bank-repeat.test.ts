import { stripBankBlock } from '../engine';
import { APPROVED } from '../approved-messages';

describe('stripBankBlock (never repeat the bank details)', () => {
  const bankMessage = [
    'Perfect, thanks for confirming.',
    'The total fee is $220.',
    'Payment details:',
    'Account Name: Simple Tax Services',
    'BSB: 062692',
    'Account: 81049952',
    'Once paid, just send us a quick screenshot and we will get started.',
  ].join('\n');

  test('removes the bank block, keeps the surrounding message', () => {
    const out = stripBankBlock(bankMessage);
    expect(out).not.toMatch(/062\s?692/);
    expect(out).not.toContain('81049952');
    expect(out).not.toMatch(/payment details/i);
    expect(out).not.toMatch(/account name/i);
    expect(out).not.toMatch(/screenshot/i);
    // Non-bank content survives.
    expect(out).toContain('Perfect, thanks for confirming.');
  });

  test('a message with only the bank block collapses to empty', () => {
    const only = [
      'Payment details:',
      'Account Name: Simple Tax Services',
      'BSB: 062692',
      'Account: 81049952',
    ].join('\n');
    expect(stripBankBlock(only).trim()).toBe('');
  });

  test('a message with no bank details is unchanged in substance', () => {
    const plain = 'Great, let me know if you have any questions about the process.';
    expect(stripBankBlock(plain)).toBe(plain);
  });

  // The cases above are hand-built. These run against the real approved
  // messages, so a reformat of them cannot quietly stop the stripper working.
  // This caught nothing when the messages were reworded on 24 Aug, but only
  // because "Once paid" and the account number happened to still match; the
  // "Account:" and "quick screenshot" patterns no longer do.
  describe.each([
    ['price_tfn', APPROVED.price_tfn],
    ['price_tfn_abn', APPROVED.price_tfn_abn],
  ])('the live %s message', (_name, msg) => {
    const out = stripBankBlock(msg);
    test('loses every bank line', () => {
      expect(out).not.toMatch(/062\s?692/);
      expect(out).not.toContain('81049952');
      expect(out).not.toMatch(/account name/i);
      expect(out).not.toMatch(/account number/i);
      expect(out).not.toMatch(/screenshot/i);
    });
    test('keeps the guarantee and the owing line, which are not bank details', () => {
      // Jo, 3 Sep (evening): the guarantee moved from the opening to the price
      // message, beside the bank details. A repeat strips the details, not the
      // wording around them.
      expect(out).toContain("we'll refund the difference");
      expect(out).toContain('non-refundable');
    });
  });

  test('the guarantee and the owing line live in the price messages; the opening is short', () => {
    for (const msg of [APPROVED.price_tfn, APPROVED.price_tfn_abn]) {
      expect(msg).toContain("If your refund is less than our fee, we'll refund the difference.");
      expect(msg).toContain('the fee covers the work completed and is non-refundable');
    }
    expect(APPROVED.opening).not.toContain('refund the difference');
    expect(APPROVED.opening).toContain('$220');
    expect(APPROVED.opening).toContain('$385');
    expect(APPROVED.opening).toMatch(/Which option suits you\?$/);
    // The amount is stated in the price message, next to the details the
    // customer copies into their bank app, and it is what the system reads
    // the chosen track from.
    expect(APPROVED.price_tfn).toContain('for the $220:');
    expect(APPROVED.price_tfn_abn).toContain('for the $385:');
  });
});
