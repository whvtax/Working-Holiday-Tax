/**
 * Two form-level defects that were only visible by comparing two files:
 *
 *  1. The date-of-birth picker had no `min`/`max`, so it opened on today — the
 *     one date a birth date can never be — and let a customer pick a date the
 *     form then rejected. The bounds must be the SAME rule `isPlausibleDob`
 *     enforces, or the picker and the validator disagree.
 *
 *  2. `fileErrorGeneric` told customers the upload limit was 10MB while
 *     `fileTooLarge` said 4 MB and the real client-side ceiling
 *     (`MAX_UPLOAD_BYTES`) is 4MB. Two error messages, two different numbers,
 *     one of them a promise the code could not keep.
 */
import { isPlausibleDob, dobInputRange } from '@/lib/validate';
import { MAX_UPLOAD_BYTES } from '@/lib/compress-image';
import { formStrings } from '@/lib/formStrings';

describe('dobInputRange agrees with isPlausibleDob', () => {
  const { min, max } = dobInputRange();

  it('is a pair of ISO yyyy-mm-dd dates', () => {
    expect(min).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(max).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('does not let the picker open on today', () => {
    const today = new Date().toISOString().slice(0, 10);
    expect(max < today).toBe(true);
  });

  it('both bounds are dates the validator accepts', () => {
    expect(isPlausibleDob(min)).toBe(true);
    expect(isPlausibleDob(max)).toBe(true);
  });

  it('the day outside each bound is rejected by the validator', () => {
    const dayBefore = new Date(min); dayBefore.setDate(dayBefore.getDate() - 1);
    const dayAfter = new Date(max); dayAfter.setDate(dayAfter.getDate() + 1);
    expect(isPlausibleDob(dayBefore.toISOString().slice(0, 10))).toBe(false);
    expect(isPlausibleDob(dayAfter.toISOString().slice(0, 10))).toBe(false);
  });

  it('a plausible working-holiday date of birth sits inside the range', () => {
    const dob = `${new Date().getFullYear() - 26}-06-15`;
    expect(dob >= min && dob <= max).toBe(true);
    expect(isPlausibleDob(dob)).toBe(true);
  });
});

describe('upload-limit copy matches the real limit', () => {
  const limitMb = MAX_UPLOAD_BYTES / 1024 / 1024;

  it('the real client-side ceiling is 4MB', () => {
    expect(limitMb).toBe(4);
  });

  it.each(['en', 'de', 'ja'] as const)(
    'fileErrorGeneric names the real limit in %s and never the old 10MB',
    (lang) => {
      const s = formStrings.fileErrorGeneric[lang];
      expect(s).toMatch(new RegExp(`${limitMb}\\s?MB`));
      expect(s).not.toMatch(/10\s?MB/);
    },
  );

  it.each(['en', 'de', 'ja'] as const)(
    'fileErrorGeneric and fileTooLarge agree on the number in %s',
    (lang) => {
      const nums = (s: string) => (s.match(/(\d+)\s?MB/g) ?? []).map(m => parseInt(m, 10));
      const generic = nums(formStrings.fileErrorGeneric[lang]);
      const tooLarge = nums(formStrings.fileTooLarge[lang]);
      expect(generic.length).toBeGreaterThan(0);
      expect(tooLarge.length).toBeGreaterThan(0);
      // Every size a customer can be shown is the one the code enforces.
      for (const n of [...generic, ...tooLarge]) expect(n).toBe(limitMb);
    },
  );
});
