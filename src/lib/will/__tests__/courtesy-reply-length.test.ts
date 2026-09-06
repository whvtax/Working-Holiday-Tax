/**
 * "okay thank you" gets ONE line back (Jo, 4 Sep).
 *
 * Millie (+61 424 909 473) closed a long ATO-review explanation with "okay
 * thank you". Will answered with three warm sentences; Jo deleted it from the
 * phone and sent "No worries at all!" instead. Three sentences of unasked-for
 * reassurance at the end of a conversation is padding, and padding is one of
 * the clearest tells that nobody is typing.
 *
 * The trim is deliberately narrow. "Yes" is also a courtesy line, and "yes" to
 * "shall we get started?" must still get the whole payment message.
 */
import { readFileSync } from 'fs';
import { join } from 'path';
import { firstSentenceOnly, isCourtesyLine } from '@/lib/will/text-normalize';

const MILLIE = "No worries at all, Millie! I know the wait can be frustrating, but you're in good hands. Just sit tight and we'll keep an eye on it for you.";

describe('firstSentenceOnly', () => {
  it('cuts Millie\'s reply down to what Jo actually sent', () => {
    expect(firstSentenceOnly(MILLIE)).toBe('No worries at all, Millie!');
  });

  it('leaves a reply that is already one sentence alone', () => {
    expect(firstSentenceOnly('No worries at all!')).toBe('No worries at all!');
    expect(firstSentenceOnly('Happy to help')).toBe('Happy to help');
  });

  it('keeps the terminator, and handles the full-width ones', () => {
    expect(firstSentenceOnly('了解しました。あとはこちらで進めます。')).toBe('了解しました。');
    expect(firstSentenceOnly('Kein Problem! Melde dich jederzeit.')).toBe('Kein Problem!');
  });

  it('never returns nothing', () => {
    expect(firstSentenceOnly('👍')).toBe('👍');
  });

  it('is not fooled by a decimal or an abbreviation mid-sentence', () => {
    // No space after the dot, so it is not a sentence end.
    expect(firstSentenceOnly('It is $220.50 all up. Nothing else to pay.')).toBe('It is $220.50 all up.');
  });
});

describe('the engine only trims a genuine courtesy close', () => {
  const engine = readFileSync(join(process.cwd(), 'src/lib/will/engine.ts'), 'utf8');
  const block = (() => {
    const start = engine.indexOf('const courtesyClose = isCourtesyLine(customerBurst)');
    expect(start).toBeGreaterThan(-1);
    return engine.slice(start, engine.indexOf('let verdict = policyGuard(text, guardCtx);', start));
  })();

  it('is judged on everything they wrote since our last message, not just the last line', () => {
    expect(block).toMatch(/isCourtesyLine\(customerBurst\)/);
  });

  it('never touches a reply carrying a number, a link or a question', () => {
    expect(block).toMatch(/!\/\\d\/\.test\(text\)/);
    expect(block).toMatch(/!\/https\?:\\\/\\\/\/i\.test\(text\)/);
    expect(block).toMatch(/!text\.includes\('\?'\)/);
  });

  it('only fires on a long reply', () => {
    expect(block).toMatch(/text\.length > 120/);
  });

  it('and only ever shortens, never replaces', () => {
    expect(block).toMatch(/if \(oneLine && oneLine\.length < text\.length\) text = oneLine;/);
  });
});

describe('what still gets the full answer', () => {
  it('"yes" is a courtesy line, so the guards above are what protect it', () => {
    // Pinned deliberately: this is WHY the no-digits / no-link / no-question
    // conditions exist. A price message has all three.
    expect(isCourtesyLine('yes')).toBe(true);
    const price = 'Perfect! TFN: $220, and TFN + ABN: $385. Which option suits you?';
    expect(/\d/.test(price) || price.includes('?')).toBe(true);
  });

  it('a real question is never a courtesy line', () => {
    expect(isCourtesyLine('okay thank you, how long does it take?')).toBe(false);
  });

  it('but a plain thank-you is', () => {
    expect(isCourtesyLine('okay thank you')).toBe(true);
    expect(isCourtesyLine('perfect, thanks!')).toBe(true);
    expect(isCourtesyLine('👍')).toBe(true);
  });
});

it('the playbook tells Will to write it short in the first place', () => {
  const playbook = readFileSync(join(process.cwd(), 'src/lib/will/playbook.ts'), 'utf8');
  expect(playbook).toMatch(/"THANKS" GETS ONE LINE BACK/);
  expect(playbook).toMatch(/is not courtesy: that one gets the real next step/);
});
