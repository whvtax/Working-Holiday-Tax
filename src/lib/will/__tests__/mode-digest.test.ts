/**
 * Two things the owner relies on and cannot check by looking at the screen:
 *
 *  1. Approval mode. The rule is "nothing reaches a customer without me".
 *     Before this, the engine sent on any value that was not exactly
 *     'SUPERVISED', so one wrong string in a settings row would have quietly
 *     put live replies on autopilot. These tests pin the direction of that
 *     failure: unknown means ask.
 *
 *  2. The redaction used by the daily Library-suggestions digest. It emails
 *     real customer wording to an inbox, and customers paste TFNs and bank
 *     details into WhatsApp constantly. These tests pin the redaction,
 *     because a leak here is permanent.
 */
import { resolveAiMode, requiresApproval } from '@/lib/will/mode';
import { redactSensitive } from '@/lib/will/digest';

describe('approval mode fails safe on every unexpected value', () => {
  it('recognises the two real modes', () => {
    expect(resolveAiMode('FULL_AUTO')).toBe('FULL_AUTO');
    expect(resolveAiMode('SUPERVISED')).toBe('SUPERVISED');
    expect(requiresApproval('FULL_AUTO')).toBe(false);
    expect(requiresApproval('SUPERVISED')).toBe(true);
  });

  // Every one of these is a value someone could plausibly type into a SQL
  // console while trying to turn autopilot on. None of them may send.
  it.each([
    'AUTOPILOT', 'Autopilot', 'autopilot', 'full_auto', 'Full_Auto', 'FULL AUTO',
    'FULL_AUTO ', ' FULL_AUTO', 'AUTO', 'ON', 'true', '', 'SUPERVISED_OFF',
  ])('treats the string %p as approval mode', (v) => {
    expect(resolveAiMode(v)).toBe('SUPERVISED');
    expect(requiresApproval(v)).toBe(true);
  });

  it.each([true, false, 1, 0, null, undefined, {}, [], ['FULL_AUTO']])(
    'treats the non-string %p as approval mode', (v) => {
      expect(resolveAiMode(v)).toBe('SUPERVISED');
      expect(requiresApproval(v)).toBe(true);
    });
});

describe('the digest never puts identifying numbers in an inbox', () => {
  it.each([
    ['a TFN',                 'my tfn is 123456789 thanks',            '123456789'],
    ['a spaced TFN',          'TFN: 123 456 789',                      '456'],
    ['a bank account',        'account 12345678 bsb 062-000',          '12345678'],
    ['a passport number',     'passport PA1234567 ok',                 '1234567'],
    ['a phone number',        'call me on 0424 513 998',               '513'],
    ['an international one',  'whatsapp +61 424 513 998',              '424'],
  ])('removes %s', (_what, input, leaked) => {
    const out = redactSensitive(input);
    expect(out).toContain('[number removed]');
    expect(out.replace(/\[number removed\]/g, '')).not.toContain(leaked);
  });

  it('removes email addresses', () => {
    expect(redactSensitive('write to sarah@example.com please')).toBe('write to [email removed] please');
  });

  // Over-redacting would destroy the point of the document: these are the words
  // that make a customer question useful, and they must survive intact.
  it.each([
    'This is for 2024-25, so which payslips do you need?',
    'I worked 6 months on a farm in QLD',
    'Is it $220 for everything?',
    'I have 2 jobs and 3 payslips',
    'How long does it take, 24 hours?',
    'I earned about 18000 last year',
  ])('leaves an ordinary sentence alone: %p', (s) => {
    expect(redactSensitive(s)).toBe(s);
  });
});
