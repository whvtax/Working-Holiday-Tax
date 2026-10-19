/**
 * 19 Oct: a thank-you that names a topic ("thanks, the refund is lodged") is
 * still a thank-you and gets "You're very welcome! 😊". Only a question, a
 * request, or a problem keeps it out of that path.
 */
import { isClosingOnly, containsThanks } from '@/lib/will/text-normalize';

describe('thank-you after a service update gets the closing line', () => {
  it.each([
    'Thank you, the refund is lodged',
    'Thanks so much for lodging my tax return',
    'Thank you, I got the email with the form',
    'Thanks, the receipt came through, appreciate it',
    'Thank you so much for your help with my tax return, really appreciate it',
  ])('"%s" is a closing with thanks', (msg) => {
    expect(isClosingOnly(msg)).toBe(true);
    expect(containsThanks(msg)).toBe(true);
  });

  it.each([
    'Thanks, when will the refund arrive?',
    'Thank you but I still have a problem with the form',
    'Thanks, can you also check my ABN',
    'Thanks, I sent the money',
    'Thanks, wait I need to change my bank',
  ])('"%s" still needs an answer, not the closing line', (msg) => {
    expect(isClosingOnly(msg)).toBe(false);
  });
});
