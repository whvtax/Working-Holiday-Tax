import { stripDashes, limitEmojis, normaliseWillText } from '../text-normalize';

const DASH_RE = /[-֊־᠆‐‑‒–—―⁃−⸺⸻﹘﹣－]/;

describe('stripDashes (owner rule: Will never emits a dash)', () => {
  test('em dash used as punctuation becomes a comma', () => {
    const out = stripDashes('We will review your situation — including deductions.');
    expect(out).toBe('We will review your situation, including deductions.');
    expect(DASH_RE.test(out)).toBe(false);
  });

  test('spaced hyphen as punctuation becomes a comma', () => {
    const out = stripDashes('Sure - happy to help.');
    expect(out).toBe('Sure, happy to help.');
    expect(DASH_RE.test(out)).toBe(false);
  });

  test('en dash and intra-word hyphen are removed', () => {
    const out = stripDashes('full-time and self-employed 2023–2024');
    expect(DASH_RE.test(out)).toBe(false);
    expect(out).toContain('full time');
    expect(out).toContain('self employed');
  });

  test('leading bullet dashes are removed', () => {
    const out = stripDashes('- first\n- second');
    expect(DASH_RE.test(out)).toBe(false);
    expect(out).toBe('first\nsecond');
  });

  test('a URL keeps its hyphens', () => {
    const out = stripDashes('Fill it in here: https://working-holiday-tax.com.au/tax-form thanks');
    expect(out).toContain('https://working-holiday-tax.com.au/tax-form');
  });

  test('an email keeps its hyphens', () => {
    const out = stripDashes('Email us at info@working-holiday.com.au please');
    expect(out).toContain('info@working-holiday.com.au');
  });

  test('a plain number is never mistaken for a stash sentinel', () => {
    const out = stripDashes('The fee is 220 and the other is 385, no dashes here');
    expect(out).toContain('220');
    expect(out).toContain('385');
  });

  test('empty / null input is safe', () => {
    expect(stripDashes('')).toBe('');
    expect(stripDashes(null)).toBe('');
    expect(stripDashes(undefined)).toBe('');
  });

  test('minus sign and fullwidth dash are stripped', () => {
    const out = stripDashes('price −220 ／ －385');
    expect(DASH_RE.test(out)).toBe(false);
  });
});

const EMOJI_RE = /\p{Extended_Pictographic}/u;

describe('limitEmojis (owner rule: one emoji, opening message only)', () => {
  test('opening message keeps exactly the first emoji', () => {
    const out = limitEmojis('Hey! 😊 Of course, happy to help 🙌 great 🎉', true);
    expect(out).toContain('😊');
    expect(out).not.toContain('🙌');
    expect(out).not.toContain('🎉');
  });

  test('non-opening message keeps zero emojis', () => {
    const out = limitEmojis('Perfect 😊 the fee is $220 🙌', false);
    expect(EMOJI_RE.test(out)).toBe(false);
    expect(out).toContain('$220');
  });

  test('emoji with skin tone / ZWJ sequence is removed whole', () => {
    const out = limitEmojis('nice 👍🏽 and 👨‍👩‍👧 done', false);
    expect(EMOJI_RE.test(out)).toBe(false);
    expect(out).toContain('nice');
    expect(out).toContain('done');
  });

  test('spacing is tidied after removal', () => {
    const out = limitEmojis('Great 🎉 , thanks', false);
    expect(out).toBe('Great, thanks');
  });

  test('empty / null input is safe', () => {
    expect(limitEmojis('', true)).toBe('');
    expect(limitEmojis(null, false)).toBe('');
  });
});

describe('normaliseWillText (both rules together)', () => {
  test('opening: dashes gone, one emoji kept', () => {
    const out = normaliseWillText('Hi 😊 — we will help 🙌', { firstMessage: true });
    expect(DASH_RE.test(out)).toBe(false);
    expect(out).toContain('😊');
    expect(out).not.toContain('🙌');
  });

  test('later message: no dashes, no emoji', () => {
    const out = normaliseWillText('Sure 😊 - the fee is $220', { firstMessage: false });
    expect(DASH_RE.test(out)).toBe(false);
    expect(EMOJI_RE.test(out)).toBe(false);
    expect(out).toContain('$220');
  });
});
