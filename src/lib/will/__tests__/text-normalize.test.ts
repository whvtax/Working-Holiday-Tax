import { stripDashes } from '../text-normalize';

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
