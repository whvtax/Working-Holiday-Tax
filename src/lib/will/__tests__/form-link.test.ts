/**
 * Matching a website form's phone field to a Will customer.
 *
 * A wrong match is worse than no match: it marks someone ELSE's form complete,
 * cancels their reminders and sends them a confirmation for a form they never
 * filled in. So the false-positive cases below matter more than the happy path.
 */
import { samePhone, phoneKey } from '@/lib/will/form-link';

const WA_ID = '61424513998'; // how WhatsApp gives it to us: digits, country code

describe('the same number typed in different ways still matches', () => {
  const forms = [
    '+61 424 513 998',   // international, spaced
    '+61424513998',      // international, tight
    '61424513998',       // no plus
    '0424 513 998',      // how an Australian actually writes it
    '0424513998',        // local, tight
    '(0424) 513-998',    // brackets and dashes
    ' 0424 513 998 ',    // stray whitespace
  ];
  it.each(forms)('matches %p', (typed) => {
    expect(samePhone(WA_ID, typed)).toBe(true);
  });
});

describe('different people never match', () => {
  const others = [
    '+61 424 513 999',   // one digit out
    '0424 513 997',
    '+61 466 535 816',   // a different customer entirely
    '+44 7510 056836',   // different country
  ];
  it.each(others)('rejects %p', (typed) => {
    expect(samePhone(WA_ID, typed)).toBe(false);
  });
});

describe('unusable input is refused rather than guessed at', () => {
  it.each(['', '   ', 'not a phone', '12345', '+61'])('refuses %p', (v) => {
    expect(phoneKey(v)).toBeNull();
    expect(samePhone(WA_ID, v)).toBe(false);
  });

  it('does not match on a short tail that happens to line up', () => {
    // 7 digits is not enough to identify a person; it must be refused, not
    // treated as a match just because the ending coincides.
    expect(samePhone(WA_ID, '4513998')).toBe(false);
  });
});
