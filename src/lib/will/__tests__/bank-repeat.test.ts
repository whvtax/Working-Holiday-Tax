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
  // messages that carry the bank block. Two-step model (Jo, 2 Sep): the bank
  // details moved out of the price messages into [payment_details] (the $110
  // assessment) and [lodgement_details] (the lodgement), so those are what must
  // stay strippable.
  describe.each([
    ['payment_details', APPROVED.payment_details],
    ['lodgement_details', APPROVED.lodgement_details],
  ])('the live %s message', (_name, msg) => {
    const out = stripBankBlock(msg);
    test('loses every bank line', () => {
      expect(out).not.toMatch(/062\s?692/);
      expect(out).not.toContain('81049952');
      expect(out).not.toMatch(/account name/i);
      expect(out).not.toMatch(/account number/i);
    });
    test('keeps the non-bank opening line', () => {
      expect(out).toMatch(/Perfect!/);
    });
  });

  // The two-step price messages must NOT carry a bank block at all now.
  test('the price messages no longer contain bank details', () => {
    for (const msg of [APPROVED.price_tfn, APPROVED.price_tfn_abn]) {
      expect(msg).not.toContain('81049952');
      expect(msg).not.toMatch(/account name/i);
    }
  });
});
