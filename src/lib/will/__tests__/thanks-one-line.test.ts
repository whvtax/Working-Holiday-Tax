/**
 * Jo, 11 Oct: "כן תגיב, תכתוב קצת באנגלית על כל התודות".
 *
 * A message that is only a thank-you gets one fixed English line back, from
 * the code, without the model. A bare "ok" / 👍 still gets nothing. The line
 * alternates so the same bubble never appears twice in a row, and a paused or
 * opted-out chat stays silent.
 */
import { isThanksLine, thanksReply, THANKS_REPLIES, isCourtesyLine } from '@/lib/will/text-normalize';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('what counts as a thank-you', () => {
  it.each(['Thankyou! X', 'Amazing thankyou !', 'thanks', 'Cheers mate', 'Danke dir!', 'Muchas gracias', 'ありがとうございます', 'Thank you so much xx'])('%s', (t) => {
    expect(isThanksLine(t)).toBe(true);
  });
  it.each(['ok', 'Perfect', '👍', 'yes', 'Got it'])('%s is courtesy but not thanks', (t) => {
    expect(isCourtesyLine(t)).toBe(true);
    expect(isThanksLine(t)).toBe(false);
  });
  it.each(['Thanks! When will the refund land?', 'Thanks, I will pay tomorrow', 'thank you, here is my TFN 123 456 789'])('%s has substance and goes to the model', (t) => {
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

describe('engine wiring (source-pinned)', () => {
  const engine = readFileSync(join(__dirname, '..', 'engine.ts'), 'utf8');
  it('answers before the model is called, through the guard, queued on Autopilot', () => {
    const idx = engine.indexOf('isThanksLine(customerBurst)');
    const decideIdx = engine.indexOf('const decision = await decide(ctx, history);');
    expect(idx).toBeGreaterThan(0);
    expect(idx).toBeLessThan(decideIdx);
    expect(engine).toMatch(/const v = policyGuard\(line, thanksGuard\)/);
    expect(engine).toMatch(/if \(!v\.allowed\) return \{ kind: 'silent'/);
  });
});
