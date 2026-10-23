/**
 * Jo, 11 Oct: "כן תגיב, תכתוב קצת באנגלית על כל התודות".
 *
 * A message that is only a thank-you gets one fixed English line back, from
 * the code, without the model. A bare "ok" / 👍 still gets nothing. The line
 * alternates so the same bubble never appears twice in a row, and a paused or
 * opted-out chat stays silent.
 */
import { isThanksLine, thanksReply, THANKS_REPLIES, isCourtesyLine, containsThanks } from '@/lib/will/text-normalize';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('what counts as a thank-you', () => {
  it.each(['Thankyou! X', 'Amazing thankyou !', 'thanks', 'Cheers mate', 'Danke dir!', 'Muchas gracias', 'ありがとうございます', 'Thank you so much xx', 'Thank u', 'Perfect thanks', 'ty!', 'thx', 'Perfect thank you guys so much! :)', 'Thanks heaps for all your help', 'Thank you so much for everything, legends 🙏', 'Amazing, thanks team!'])('%s', (t) => {
    expect(isThanksLine(t)).toBe(true);
  });
  it.each(['ok', 'Perfect', '👍', 'yes', 'Got it'])('%s is courtesy but not thanks', (t) => {
    expect(isCourtesyLine(t)).toBe(true);
    expect(isThanksLine(t)).toBe(false);
  });
  it.each(['Thanks! When will the refund land?', 'Thanks, I will pay tomorrow', 'thank you, here is my TFN 123 456 789', 'Thanks but I still have not received my refund', 'Thank you, I will send the form tomorrow'])('%s has substance and goes to the model', (t) => {
    expect(isThanksLine(t)).toBe(false);
  });
});

describe('the line itself', () => {
  it('is short English with at most one emoji and no dash', () => {
    for (const l of THANKS_REPLIES) {
      expect(l.length).toBeLessThan(40);
      expect(l).not.toMatch(/[—–]/);
    }
  });
  it('never repeats the same line twice in a row', () => {
    expect(thanksReply('')).toBe(THANKS_REPLIES[0]);
    expect(thanksReply(THANKS_REPLIES[0])).toBe(THANKS_REPLIES[1]);
    expect(thanksReply(THANKS_REPLIES[1])).toBe(THANKS_REPLIES[0]);
  });
});

describe("engine wiring: a thank-you always gets You're very welcome! 😊 (Jo, 13 Oct)", () => {
  const engine = readFileSync(join(__dirname, '..', 'engine.ts'), 'utf8');
  const service = readFileSync(join(__dirname, '..', 'service.ts'), 'utf8');
  it('answered from the code before the model is asked', () => {
    const fixed = engine.indexOf('isClosingOnly(customerBurst) && containsThanks(customerBurst)');
    expect(fixed).toBeGreaterThan(0);
    expect(fixed).toBeLessThan(engine.indexOf('const decision = await decide(ctx, history'));
    expect(THANKS_REPLIES[0]).toBe("You're very welcome! 😊");
  });
  it('silence on a paid customer becomes a task only when they asked something', () => {
    expect(service).toMatch(/!customerAskedSomething\(a\.text\)\) return false;/);
  });
  it('"100% thank you" is a thank-you', () => {
    expect(containsThanks('100% thank you')).toBe(true);
    expect(containsThanks('Perfect')).toBe(false);
  });
});

import { phoneCandidates } from '@/lib/will/phone-candidates';
describe('a number typed without a country code still finds the chat (12 Oct)', () => {
  it('Canadian "(289) 697-0800" also asks for 12896970800', () => {
    expect(phoneCandidates('(289) 697-0800')).toContain('12896970800');
  });
  it('Australian mobile without the 0', () => {
    expect(phoneCandidates('412 345 678')).toContain('61412345678');
  });
  it('a full international number is unchanged', () => {
    expect(phoneCandidates('+61 412 345 678')[0]).toBe('61412345678');
  });
});
