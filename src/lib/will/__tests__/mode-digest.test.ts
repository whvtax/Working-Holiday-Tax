/**
 * Two things the owner relies on and cannot check by looking at the screen:
 *
 *  1. Approval mode. The rule is "nothing reaches a customer without me".
 *     Before this, the engine sent on any value that was not exactly
 *     'SUPERVISED', so one wrong string in a settings row would have quietly
 *     put live replies on autopilot. These tests pin the direction of that
 *     failure: unknown means ask.
 *
 *  2. The monthly customer-words digest. It emails real customer messages to an
 *     inbox, and customers paste TFNs and bank details into WhatsApp constantly.
 *     These tests pin the redaction, because a leak here is permanent.
 */
import { resolveAiMode, requiresApproval } from '@/lib/will/mode';
import { redactSensitive, buildDigest, monthKey } from '@/lib/will/digest';
import type { MessageRow } from '@/lib/will/store';

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

function msg(over: Partial<MessageRow> & { customerName?: string | null; waId?: string }) {
  return {
    id: 'm', customerId: 'c1', direction: 'IN', author: 'CUSTOMER', status: 'SENT',
    body: 'hello', createdAt: '2026-07-01T00:00:00.000Z',
    customerName: 'Sarah Kowalski', waId: '61424513998',
    ...over,
  } as MessageRow & { customerName?: string | null; waId?: string };
}

describe('the digest collects the right things', () => {
  it('includes only the customer side, never the assistant', () => {
    const d = buildDigest({
      periodLabel: 'July 2026',
      messages: [
        msg({ id: '1', body: 'do you do super refunds?' }),
        msg({ id: '2', body: 'Happy to help with that!', direction: 'OUT', author: 'AI' }),
      ],
    });
    expect(d.totalMessages).toBe(1);
    expect(d.text).toContain('do you do super refunds?');
    expect(d.text).not.toContain('Happy to help');
  });

  it('surfaces questions separately, merging duplicates', () => {
    const d = buildDigest({
      periodLabel: 'July 2026',
      messages: [
        msg({ id: '1', body: 'How long does it take?' }),
        msg({ id: '2', body: 'how long does it take?', customerId: 'c2', waId: '61400000002' }),
        msg({ id: '3', body: 'I sent the form' }),
      ],
    });
    expect(d.questions).toHaveLength(1);
    expect(d.questions[0]).toBe('How long does it take?');
  });

  it('identifies people well enough to read, not well enough to be a contact list', () => {
    const d = buildDigest({ periodLabel: 'July 2026', messages: [msg({ id: '1' })] });
    expect(d.byCustomer[0].label).toBe('Sarah (…998)');
    expect(d.text).not.toContain('Kowalski');
    expect(d.text).not.toContain('61424513998');
  });

  it('redacts before the document is built, not after', () => {
    const d = buildDigest({
      periodLabel: 'July 2026',
      messages: [msg({ id: '1', body: 'my tfn is 123456789' })],
    });
    expect(d.text).not.toContain('123456789');
    expect(d.text).toContain('[number removed]');
  });

  it('survives an empty month', () => {
    const d = buildDigest({ periodLabel: 'July 2026', messages: [] });
    expect(d.totalMessages).toBe(0);
    expect(d.uniqueCustomers).toBe(0);
    expect(d.text).toContain('no customer messages');
  });

  it('keys the month in Sydney time, so it cannot send twice around midnight', () => {
    // 1 August 00:30 Sydney is still 31 July in UTC. Keying on UTC would make
    // the same month look like two different months.
    expect(monthKey(new Date('2026-07-31T14:30:00Z'))).toBe('2026-08');
    expect(monthKey(new Date('2026-07-31T13:00:00Z'))).toBe('2026-07');
  });
});
