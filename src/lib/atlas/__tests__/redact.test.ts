import { redactForModel, redactText } from '../redact';

describe('Atlas redaction before the model (17 Nov)', () => {
  it('removes phone numbers and TFN-length numbers in text', () => {
    expect(redactText('call 0412 345 678 please')).toBe('call [removed] please');
    expect(redactText('my tfn is 123 456 782')).toBe('my tfn is [removed]');
    expect(redactText('+61 412 345 678')).toBe('[removed]');
  });

  it('keeps dates and short amounts', () => {
    expect(redactText('lodged on 2026-11-17')).toBe('lodged on 2026-11-17');
    expect(redactText('paid 220 dollars')).toBe('paid 220 dollars');
    expect(redactText('due 17/11/2026')).toBe('due 17/11/2026');
  });

  it('removes email addresses, BSB and passport-style numbers', () => {
    expect(redactText('mail a.b@example.com')).toBe('mail [removed]');
    expect(redactText('BSB 033-123 acct')).toBe('BSB [removed] acct');
    expect(redactText('passport N1234567')).toBe('passport [removed]');
  });

  it('removes values under sensitive keys and keeps ids and names', () => {
    const out = redactForModel({
      customerId: 'c-1', name: 'Ivy', phone: '0412345678', waId: '61412345678', email: 'x@y.com', tfn: '123456782', state: 'AWAITING_PAYMENT',
    }) as Record<string, unknown>;
    expect(out.customerId).toBe('c-1');
    expect(out.name).toBe('Ivy');
    expect(out.state).toBe('AWAITING_PAYMENT');
    expect(out.phone).toBe('[removed]');
    expect(out.waId).toBe('[removed]');
    expect(out.email).toBe('[removed]');
    expect(out.tfn).toBe('[removed]');
  });

  it('walks nested arrays and objects', () => {
    const out = redactForModel({ messages: [{ body: 'ring 0412 345 678' }] }) as { messages: Array<{ body: string }> };
    expect(out.messages[0].body).toBe('ring [removed]');
  });
});
