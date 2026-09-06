/**
 * Tax form rate limiting keyed on the person, not the shared IP.
 *
 * Jo, 5 Sep (audit finding confirmed[70]): the tax-form endpoint used to rate
 * limit on IP alone at 5 submissions per 15 minutes. A hostel or farm
 * bunkhouse behind carrier-grade NAT shares one IP, so a room of customers
 * filling the form one after another tripped the abuser limit on the sixth
 * person - right after their receipts had already uploaded. The fix keys the
 * customer-facing limit on IP+phone/email so different people in the same
 * building don't share a counter, while keeping a separate (higher) per-IP
 * ceiling so a single abuser is still capped.
 */
import fs from 'fs';
import path from 'path';
import { isRateLimited } from '@/lib/rate-limit';
import { normalisePhone } from '@/lib/leads';

describe('tax-form rate limiting is per person, not per shared IP', () => {
  const sharedIp = '203.0.113.9';

  it('does not block a 6th different customer behind the same IP', async () => {
    // Five different guests at the same hostel, each submitting once.
    for (let i = 0; i < 5; i++) {
      const person = normalisePhone(`+61 400 000 ${100 + i}`);
      const key = `${sharedIp}:${person}`;
      const limited = await isRateLimited(key, 'tax-form-per-person-6th');
      expect(limited).toBe(false);
    }
    // A 6th, different guest on the same IP must still go through - keying
    // on IP alone would have rejected this one.
    const sixthPerson = normalisePhone('+61 400 000 999');
    const sixthKey = `${sharedIp}:${sixthPerson}`;
    const limited = await isRateLimited(sixthKey, 'tax-form-per-person-6th');
    expect(limited).toBe(false);
  });

  it('still caps the same person retrying repeatedly', async () => {
    const person = normalisePhone('+61 400 111 222');
    const key = `${sharedIp}:${person}`;
    const formName = 'tax-form-same-person-cap';
    let lastResult = false;
    for (let i = 0; i < 6; i++) {
      lastResult = await isRateLimited(key, formName);
    }
    // The 6th submit from the SAME person on the SAME window is still capped
    // - the abuse guard itself is unchanged, only its key changed.
    expect(lastResult).toBe(true);
  });

  it('still caps a single abuser behind one IP, on a separate higher-ceiling counter', async () => {
    // A small ceiling stands in for the route's real 30, just to keep this
    // fast - the mechanism (a separate per-IP counter with its own cap) is
    // what's under test, not the exact number.
    const formName = 'tax-form-ip-cap-test';
    let lastResult = false;
    for (let i = 0; i < 4; i++) {
      lastResult = await isRateLimited(sharedIp, formName, 3);
    }
    expect(lastResult).toBe(true);
  });

  it('the route wires a per-person key plus a raised, separate per-IP ceiling', () => {
    const src = fs.readFileSync(
      path.join(__dirname, '../../../app/api/tax-form/route.ts'),
      'utf8',
    );
    // Per-person key: IP plus phone (falling back to email), checked before
    // the generic per-IP guard.
    expect(src).toMatch(/normalisePhone\(whatsapp\)\s*\|\|\s*email/);
    expect(src).toMatch(/isRateLimited\(`\$\{ip\}:\$\{person\}`,\s*'tax-form'\)/);
    // Separate, higher per-IP ceiling so a single abuser is still capped.
    expect(src).toMatch(/isRateLimited\(ip,\s*'tax-form-ip',\s*30\)/);
  });
});
