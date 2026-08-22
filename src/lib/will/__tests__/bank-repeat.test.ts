import { stripBankBlock } from '../engine';

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
});
