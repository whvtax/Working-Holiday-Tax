import { stripDashes, limitEmojis, normaliseWillText, firstNameOf, stripNameAddress } from '../text-normalize';

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

  test('keycap emoji is removed whole (no orphan selector)', () => {
    const out = limitEmojis('keycap 1️⃣ two #️⃣ end', false);
    expect(EMOJI_RE.test(out)).toBe(false);
    expect(out).not.toContain('⃣');
    expect(out).not.toContain('️');
    expect(out).toContain('keycap');
    expect(out).toContain('two');
    expect(out).toContain('end');
  });

  test('a plain digit (no keycap combiner) is never touched', () => {
    const out = limitEmojis('the fee is 220 dollars', false);
    expect(out).toBe('the fee is 220 dollars');
  });

  test('multi-skin-tone ZWJ family/couple emoji is removed whole', () => {
    const out = limitEmojis('couple 👩🏽‍🤝‍👨🏽 done', false);
    expect(EMOJI_RE.test(out)).toBe(false);
    expect(out).not.toMatch(/[\u{1F3FB}-\u{1F3FF}]/u); // no orphan skin-tone square
    expect(out).toContain('couple');
    expect(out).toContain('done');
  });

  test('flag (regional indicator pair) is removed', () => {
    const out = limitEmojis('from 🇦🇺 here', false);
    expect(out).toContain('from');
    expect(out).toContain('here');
    expect(out).not.toMatch(/\p{Regional_Indicator}/u);
  });
});

describe('firstNameOf', () => {
  test('takes only the first word', () => {
    expect(firstNameOf('Daniel Haas')).toBe('Daniel');
    expect(firstNameOf('  Sarah  Jane  Smith ')).toBe('Sarah');
    expect(firstNameOf('Madonna')).toBe('Madonna');
  });
  test('empty / null is safe', () => {
    expect(firstNameOf('')).toBe('');
    expect(firstNameOf(null)).toBe('');
    expect(firstNameOf(undefined)).toBe('');
  });
});

describe('stripNameAddress (name only at the start, never after)', () => {
  test('removes name from a leading greeting, keeps the greeting', () => {
    expect(stripNameAddress('Hi Daniel, your refund is ready.', 'Daniel')).toBe('Hi, your refund is ready.');
    expect(stripNameAddress('Hey Daniel! how are you', 'Daniel')).toBe('Hey, how are you');
  });
  test('removes a leading vocative', () => {
    expect(stripNameAddress('Daniel, we got your form.', 'Daniel')).toBe('we got your form.');
  });
  test('removes a trailing vocative', () => {
    expect(stripNameAddress('Thanks for that, Daniel.', 'Daniel')).toBe('Thanks for that.');
  });
  test('does not touch the name mid-sentence', () => {
    const s = 'We will email Daniel Haas the summary';
    expect(stripNameAddress(s, 'Daniel')).toBe(s);
  });
  test('no first name -> unchanged', () => {
    expect(stripNameAddress('Hi there', '')).toBe('Hi there');
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

  test('opening keeps the first-name greeting', () => {
    const out = normaliseWillText('Hi Daniel! happy to help', { firstMessage: true, firstName: 'Daniel' });
    expect(out).toContain('Daniel');
  });

  test('later message drops the name address', () => {
    const out = normaliseWillText('Hi Daniel, the fee is $220', { firstMessage: false, firstName: 'Daniel' });
    expect(out).not.toContain('Daniel');
    expect(out).toContain('$220');
    expect(out.startsWith('Hi,')).toBe(true);
  });
});
