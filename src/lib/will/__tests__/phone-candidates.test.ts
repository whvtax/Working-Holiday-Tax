/**
 * The join between the CRM and Will is a phone number, and it had a hole in it.
 *
 * THE BUG. The CRM stores whatever the customer typed into the form; Will
 * stores what WhatsApp gave us, which always carries a country code. An
 * Australian writes their own number as "0412 345 678". Reduced to digits that
 * is not "61412345678", and nothing converted the leading trunk zero, so the
 * CRM's "open this customer's WhatsApp thread" lookup found nothing for exactly
 * the people most likely to be customers. The store's own doc comment names
 * "0412 345 678" as its first example of an input that should match.
 *
 * WHAT IS PINNED. That both spellings resolve to each other, and, more
 * importantly, that the widening stays narrow: a wrong match here opens one
 * customer's private conversation under another customer's name, so the
 * negative cases matter more than the positive ones.
 */
import { normalisePhone, phoneCandidates } from '@/lib/will/phone-candidates';

const WA = '61412345678';

describe('the number as WhatsApp gives it, and as a person types it', () => {
  it('finds the WhatsApp form from what someone typed', () => {
    for (const typed of ['0412 345 678', '0412345678', '(04) 1234 5678']) {
      expect(phoneCandidates(typed)).toContain(WA);
    }
  });

  it('finds the typed form from what WhatsApp gave us', () => {
    for (const wa of ['61412345678', '+61 412 345 678', '0061412345678']) {
      expect(phoneCandidates(wa)).toContain('0412345678');
    }
  });

  it('always includes the number exactly as normalised, first', () => {
    expect(phoneCandidates('+61 412 345 678')[0]).toBe(WA);
    expect(phoneCandidates('0412 345 678')[0]).toBe('0412345678');
  });

  it('never repeats a candidate', () => {
    const c = phoneCandidates(WA);
    expect(c.length).toBe(new Set(c).size);
  });
});

describe('the widening stays narrow, which matters more', () => {
  it('a non-target-market number never becomes an Australian number', () => {
    // A UK mobile is 11 digits starting 07. The one thing that must never
    // happen is it becoming 617..., a real Australian number belonging to
    // somebody else. It is length 11, so the DE/JP rules do generate 49/81
    // candidates, but WhatsApp stores UK customers under 44, so those can only
    // ever MISS a UK customer, never match one to the wrong person. The 61
    // candidate is the dangerous one, and it is not generated.
    const uk = phoneCandidates('07700 900123');
    expect(uk).toContain('07700900123');
    expect(uk.some(x => x.startsWith('61'))).toBe(false);
    // A German number already in international form resolves to its trunk-zero
    // spelling too.
    expect(phoneCandidates('+49 172 1234567')).toContain('491721234567');
    expect(phoneCandidates('+49 172 1234567')).toContain('01721234567');
  });

  it('only applies the trunk rule at the exact Australian lengths', () => {
    // 9 digits starting 0, and 12 starting 61, are not AU mobiles.
    expect(phoneCandidates('041234567')).toEqual(['041234567']);
    expect(phoneCandidates('614123456789')).toEqual(['614123456789']);
  });

  it('rejects anything too short to be a phone number', () => {
    for (const junk of ['', '   ', '123', '12345', 'abcdef', null, undefined]) {
      expect(phoneCandidates(junk as string)).toEqual([]);
      expect(normalisePhone(junk as string)).toBeNull();
    }
  });
});

describe('normalisePhone must not drift from the SQL function', () => {
  // crm_norm_phone() computes the indexed wa_norm column. If these two ever
  // disagree, the trigger that links a submitted form to a conversation stops
  // matching, silently. Digits only, leading "00" dropped, under 7 rejected.
  it('keeps digits only', () => {
    expect(normalisePhone('+61 (412) 345-678')).toBe('61412345678');
  });
  it('drops a leading international 00', () => {
    expect(normalisePhone('0061412345678')).toBe('61412345678');
  });
  it('does not drop a single leading zero', () => {
    // The trunk zero is meaningful and is handled by phoneCandidates, not here.
    expect(normalisePhone('0412345678')).toBe('0412345678');
  });
});

// ── Germany and Japan resolve as cleanly as Australia (29 Aug) ──────────────
//
// The growth markets type their national numbers with a trunk 0 exactly the way
// Australians do; WhatsApp hands them back with the country code. Before this,
// only the Australian pair resolved, so the CRM-to-Will link and the form match
// silently failed for German and Japanese customers.
describe('German and Japanese trunk-zero, both directions', () => {
  it('German mobile: typed <-> WhatsApp', () => {
    // 0176 1234567 (national 10) <-> 49 176 1234567
    expect(phoneCandidates('0176 1234567')).toContain('491761234567');
    expect(phoneCandidates('+49 176 1234567')).toContain('01761234567');
    // one-digit-longer German block
    expect(phoneCandidates('0176 12345678')).toContain('4917612345678');
  });

  it('Japanese mobile: typed <-> WhatsApp', () => {
    // 090 1234 5678 (national 10) <-> 81 90 1234 5678
    expect(phoneCandidates('090 1234 5678')).toContain('819012345678');
    expect(phoneCandidates('+81 90 1234 5678')).toContain('09012345678');
  });

  it('does not fan an Australian number out into other countries', () => {
    // "0412 345 678" is national length 9, which only the AU rule claims.
    const c = phoneCandidates('0412 345 678');
    expect(c).toContain('61412345678');
    expect(c.some(x => x.startsWith('49') || x.startsWith('81'))).toBe(false);
  });

  it('never repeats a candidate for any market', () => {
    for (const n of ['491761234567', '819012345678', '61412345678']) {
      expect(phoneCandidates(n).length).toBe(new Set(phoneCandidates(n)).size);
    }
  });
});
