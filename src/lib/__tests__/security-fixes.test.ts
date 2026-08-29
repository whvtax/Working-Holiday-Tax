/**
 * Regression tests for the 2026-08-21 security audit.
 *
 * Each block pins one finding closed. They exist because every one of these was
 * a control that LOOKED present and did not actually hold — a guard that only
 * matched when a `$` was there, a language check that called Dutch English, an
 * IP header returned verbatim. A passing typecheck would not have caught any of
 * them, so the behaviour is asserted directly.
 */
import { isConfidentlyEnglish, policyGuard, GuardContext } from '@/lib/will/policy-guard';
import { getClientIp } from '@/lib/get-ip';
import { validateIntake, safeAmount } from '@/lib/intake-validate';

function ctx(over: Partial<GuardContext> = {}): GuardContext {
  return {
    state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false,
    optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
    isApprovedTemplate: false, estimateFromTeam: null, ...over,
  };
}
const violations = (text: string) => policyGuard(text, ctx()).violations;

// ── M-2: a price with no currency symbol ───────────────────────────────────
describe('a made-up price is caught even without a currency symbol', () => {
  const invented = [
    'Our fee is only 50 for you.',
    'The price is 50, nothing more.',
    'For you the total will be 99.',
    'we can waive it and charge you 50 instead',
  ];
  it.each(invented)('flags %p', (reply) => {
    const v = violations(reply);
    expect(v.some((x) => x.startsWith('FORBIDDEN_AMOUNT'))).toBe(true);
  });

  it('still allows the two real prices', () => {
    expect(violations('The total fee is $220.').some((x) => x.startsWith('FORBIDDEN_AMOUNT'))).toBe(false);
    expect(violations('The total fee is $385.').some((x) => x.startsWith('FORBIDDEN_AMOUNT'))).toBe(false);
  });

  // These are the false positives an earlier, looser version of this rule
  // produced. In a TAX business "for 2024" and "just 2 documents" are ordinary
  // sentences, and flagging them would have blocked real replies.
  it.each([
    'Most refunds land within 2 to 3 weeks once we lodge.',
    'The form only takes 5 minutes to fill in.',
    'I will get back to you in 24 hours.',
    'We just need 2 more documents from you.',
    'This is for 2024, so we need your payslips.',
    'You only need 3 things: your TFN, payslips and bank details.',
    'Just 2 quick questions before we start.',
    'You can pay in 2 instalments.',
    'There are just 4 steps left.',
    'Send me your payslips for 2 jobs please.',
    'The fee covers your 2024 return.',
    'For 2024-25 the deadline is in October.',
  ])('does not mistake an ordinary number for a price: %p', (ok) => {
    expect(violations(ok).some((x) => x.startsWith('FORBIDDEN_AMOUNT'))).toBe(false);
  });
});

// ── M-3: languages that share English function words ───────────────────────
describe('language detection no longer calls Dutch and German English', () => {
  it.each([
    ['Dutch', 'De prijs is 220 en dat is alles wat je betaalt.'],
    ['German', 'Der Preis ist 50, in Ordnung so?'],
    ['German', 'Ich kann dir mit deiner Steuer helfen, kein Problem.'],
    ['Dutch', 'Wij helpen je met je belasting, dat is geen probleem.'],
  ])('%s is not classified as English', (_lang, text) => {
    expect(isConfidentlyEnglish(text)).toBe(false);
  });

  it.each([
    'Hi Sarah! Happy to help you get your tax sorted, just send the form.',
    'Thanks for that. We will review everything and come back to you.',
    'Yes, we can help with your tax return. Do you have an ABN as well?',
  ])('real English is still English: %p', (text) => {
    expect(isConfidentlyEnglish(text)).toBe(true);
  });

  it('still rejects the languages it already handled', () => {
    expect(isConfidentlyEnglish('Hola, necesito ayuda con mi declaración de impuestos.')).toBe(false);
    expect(isConfidentlyEnglish('こんにちは、税金について質問があります')).toBe(false);
  });
});

// ── H-6: x-real-ip returned verbatim ───────────────────────────────────────
describe('client IP is validated, not trusted verbatim', () => {
  const withHeaders = (h: Record<string, string>) => new Request('https://x.test', { headers: h });

  it('accepts a real IPv4 and IPv6 address', () => {
    expect(getClientIp(withHeaders({ 'x-real-ip': '203.0.113.7' }))).toBe('203.0.113.7');
    expect(getClientIp(withHeaders({ 'x-real-ip': '2001:db8::1' }))).toBe('2001:db8::1');
  });

  it('refuses an arbitrary string, so it cannot become a cache key', () => {
    for (const junk of ['not-an-ip', 'a'.repeat(200), '<script>', '999.999.999.999', '1.2.3']) {
      expect(getClientIp(withHeaders({ 'x-real-ip': junk }))).toBe('unknown');
    }
  });

  it('falls back to the RIGHTMOST forwarded hop, never the client-supplied left', () => {
    const ip = getClientIp(withHeaders({ 'x-forwarded-for': '1.1.1.1, 203.0.113.9' }));
    expect(ip).toBe('203.0.113.9');
  });

  it('ignores a junk x-real-ip and still finds a valid forwarded hop', () => {
    const ip = getClientIp(withHeaders({ 'x-real-ip': 'garbage', 'x-forwarded-for': '203.0.113.9' }));
    expect(ip).toBe('203.0.113.9');
  });

  it('strips a port without corrupting IPv6', () => {
    expect(getClientIp(withHeaders({ 'x-real-ip': '203.0.113.7:41234' }))).toBe('203.0.113.7');
    expect(getClientIp(withHeaders({ 'x-real-ip': '[2001:db8::1]:443' }))).toBe('2001:db8::1');
  });

  // The point of validating is to BOUND the keyspace. A charset-only check let
  // an attacker mint unlimited distinct keys out of arbitrary hex, which is the
  // exact abuse this is meant to stop.
  it.each([
    'aaaa:bbbb:cccc:dddd',                 // too few groups, no ::
    '1:2:3:4:5:6:7:8:9',                   // too many groups
    '2001:db8::1::2',                      // '::' twice
    'gggg::1',                             // not hex
    '12345::1',                            // group too long
  ])('refuses malformed IPv6 %p', (junk) => {
    expect(getClientIp(withHeaders({ 'x-real-ip': junk }))).toBe('unknown');
  });

  // Rejecting these was worse than useless: every client behind such an ingress
  // collapsed into one shared bucket, so three bad logins locked out everyone.
  it.each([
    ['IPv4-mapped', '::ffff:192.0.2.128'],
    ['zone id', 'fe80::1%eth0'],
    ['loopback', '::1'],
    ['full form', '2001:0db8:0000:0000:0000:ff00:0042:8329'],
  ])('accepts a real-world %s address', (_kind, ip) => {
    expect(getClientIp(withHeaders({ 'x-real-ip': ip }))).toBe(ip);
  });
});

// ── M-6 / M-7: server-side intake validation ───────────────────────────────
describe('intake fields are validated on the server', () => {
  it('accepts a normal submission', () => {
    expect(validateIntake({
      email: 'sarah@example.com', tfn: '123456789', dob: '1998-04-02',
      taxYear: '2025', marital: 'Single', taxStatus: 'resident', whatsapp: '+61 424 513 998',
    })).toEqual([]);
  });

  it.each([
    ['email', { email: 'not-an-email' }],
    ['tfn', { tfn: '123' }],
    ['dob', { dob: 'aaaa' }],
    ['taxYear', { taxYear: 'whenever' }],
    ['marital', { marital: 'it is complicated' }],
    ['taxStatus', { taxStatus: 'anything at all' }],
    ['whatsapp', { whatsapp: 'call me' }],
  ])('rejects a bad %s', (field, patch) => {
    const issues = validateIntake(patch);
    expect(issues.map((i) => i.field)).toContain(field);
  });

  it('leaves optional fields optional', () => {
    expect(validateIntake({})).toEqual([]);
    expect(validateIntake({ email: 'a@b.co', tfn: null, dob: undefined })).toEqual([]);
  });

  // REGRESSION: an exact-match enum here returned 400 for every "Australian
  // resident" submission, because the form sends the full phrase, not a token.
  // That is the main conversion path, and the user saw only a generic error.
  it('accepts the exact values the live forms send', () => {
    expect(validateIntake({ taxStatus: 'Australian resident for tax purposes' })).toEqual([]);
    expect(validateIntake({ taxStatus: 'whm' })).toEqual([]);
    expect(validateIntake({ marital: 'Single' })).toEqual([]);
    expect(validateIntake({ marital: 'Married' })).toEqual([]);
    expect(validateIntake({ taxYear: '2024-25' })).toEqual([]);
    expect(validateIntake({ taxYear: '2024-25, 2023-24' })).toEqual([]); // joined list
  });

  it('a future date of birth is not plausible', () => {
    expect(validateIntake({ dob: '2099-01-01' }).map((i) => i.field)).toContain('dob');
  });
});

// ── M-6: the amount that drives the recorded refund figure ─────────────────
describe('client-supplied money amounts are normalised or refused', () => {
  it('normalises real amounts', () => {
    expect(safeAmount('1234.5')).toBe('1234.50');
    expect(safeAmount('1,234.56')).toBe('1234.56');
    expect(safeAmount(500)).toBe('500.00');
    expect(safeAmount('$220')).toBe('220.00');
  });

  it('refuses anything that is not a sane amount', () => {
    // This value was written unvalidated into crm_tasks.notes, and db.ts then
    // parses the refund figure back out of that free text — so junk here landed
    // on a client's permanent record.
    for (const bad of ['abc', '', '-5', '99999999', '1e99', null, undefined, {}, []]) {
      expect(safeAmount(bad as unknown)).toBeNull();
    }
  });
});

// ── Client and server agree on what a phone number is (29 Aug) ─────────────
//
// The server's rule (intake-validate) arrived in the master audit; the forms
// still accepted anything non-empty, so a too-short number failed only at the
// final submit, after the uploads. Jo hit this with a real attempt. These pin
// the shared client-side rule to the exact same shape as the server's.
import { isPlausiblePhone } from '@/lib/validate';

describe('isPlausiblePhone matches the server rule', () => {
  const good = ['+972 50 123 4567', '0412 345 678', '+61 (4) 12-345-678', '0501234567', '+44 7700 900123'];
  const bad = ['', '12345', '0000', 'undefined', '+', '12345678901234567', 'call me'];
  for (const v of good) it(`accepts ${v}`, () => expect(isPlausiblePhone(v)).toBe(true));
  for (const v of bad) it(`rejects ${JSON.stringify(v)}`, () => expect(isPlausiblePhone(v)).toBe(false));

  it('agrees with validateIntake on both sides of the boundary', () => {
    // 7 digits: the shortest the server accepts; 6: the longest it refuses.
    expect(isPlausiblePhone('1234567')).toBe(true);
    expect(validateIntake({ whatsapp: '1234567' })).toHaveLength(0);
    expect(isPlausiblePhone('123456')).toBe(false);
    expect(validateIntake({ whatsapp: '123456' }).map(i => i.field)).toContain('whatsapp');
  });
});
