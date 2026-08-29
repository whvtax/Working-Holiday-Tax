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
  it('does not invent a country code for a non-Australian number', () => {
    // A UK mobile is 11 digits starting 07. Turning that into 617... would
    // point at a real Australian number belonging to somebody else.
    expect(phoneCandidates('07700 900123')).toEqual(['07700900123']);
    // A German number, already in international form.
    expect(phoneCandidates('+49 172 1234567')).toEqual(['491721234567']);
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
