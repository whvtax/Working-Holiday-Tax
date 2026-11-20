/** Jo, 18 Nov (review): an SVT customer's form link points at the student form, not WHT's /start. */
import { rebrandText } from '@/lib/will/brand-voice';

describe('the form link in the student brand', () => {
  it('rewrites the WHT /start link to the student form', () => {
    const out = rebrandText('Payment received.\n\nhttps://workingholidaytax.com.au/start', 'svt');
    expect(out).toContain('https://studentvisatax.com.au/jhd7hp9xd');
    expect(out).not.toContain('/start');
    expect(out).not.toMatch(/workingholidaytax/i);
  });
  it('leaves the WHT link alone for WHT', () => {
    expect(rebrandText('https://workingholidaytax.com.au/start', 'wht')).toBe('https://workingholidaytax.com.au/start');
  });
});
