/** Jo, 10 Nov: three tasks that should not have existed. */
import fs from 'fs';
import path from 'path';
import { paymentClaimForcesPaid } from '@/lib/will/service';

const src = (f: string) => fs.readFileSync(path.join(process.cwd(), f), 'utf8');
const base = { paid: false, state: 'PRICE_SENT' as const, outcomeKind: 'sent', hasReply: true };

describe('a pasted bank receipt moves the customer to Paid (trust the customer)', () => {
  it('receipt text with $220 and a reference', () => {
    expect(paymentClaimForcesPaid({ ...base, text: 'Transfer to Working Holiday Tax $220.00 Reference: 8842 BSB 062692' })).toBe(true);
  });
  it('a question about paying is not a payment', () => {
    expect(paymentClaimForcesPaid({ ...base, text: 'Is it $220 to BSB 062692?' })).toBe(false);
  });
  it('the daily stage check no longer raises "check the bank"', () => {
    expect(src('src/lib/will/scheduler.ts')).toMatch(/'paid_in_sales_stage', 'payment_pasted_unconfirmed'\]\.includes\(stale\.code\)/);
  });
});

it('no task when there is no win-back template in their language; the lead just ends', () => {
  const w = src('src/lib/will/winback-auto.ts');
  expect(w).not.toContain('Win-back ready but there is no win-back template');
  expect(w).toContain("'winback_skipped_no_language_variant'");
});

it('a customer who comes back always gets an answer from Will', () => {
  const d = src('src/lib/will/will-decides.ts');
  expect(d).toContain('A CUSTOMER WHO COMES BACK (Jo, 10 Nov');
  const i = d.indexOf('A CUSTOMER WHO COMES BACK');
  expect(d.slice(i, i + 600)).not.toMatch(/[–—―]/);
});
