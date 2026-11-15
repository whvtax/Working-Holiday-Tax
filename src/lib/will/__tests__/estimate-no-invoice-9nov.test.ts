/** Jo, 9 Nov (temporary fault): the estimate goes out without the invoice
 *  lines until Jo says to put them back (HIDE_INVOICE_IN_ESTIMATE = false).
 *  The original wording stays in the code. */
import fs from 'fs';
import path from 'path';
import { composeEstimate, withoutInvoiceLines, HIDE_INVOICE_IN_ESTIMATE } from '@/lib/will/estimate-send';
import { ESTIMATE_INVOICE_MSG, ESTIMATE_PAYABLE_MSG } from '@/lib/will/i18n';
import { APPROVED } from '@/lib/will/approved-messages';

const URL_ = 'https://in.xero.com/abc';

it('the switch is on', () => expect(HIDE_INVOICE_IN_ESTIMATE).toBe(true));

it('refund: exactly Jo\'s text', () => {
  expect(composeEstimate(APPROVED.estimate_invoice, 0, URL_)).toBe("Your estimated tax refund is $0.00.\n\nI'll send it for final review and then for your signature.");
  expect(composeEstimate(ESTIMATE_INVOICE_MSG.en, 123456, URL_)).toBe("Your estimated tax refund is $1,234.56.\n\nI'll send it for final review and then for your signature.");
});

it('payable: exactly Jo\'s text', () => {
  expect(composeEstimate(ESTIMATE_PAYABLE_MSG.en, 0, URL_)).toBe("Your return is ready. The estimated amount payable to the ATO is $0.00.\n\nI'll send it for final review and then for your signature. The team will walk you through the ATO payment once it's lodged.");
});

it('German and Japanese lose the same two parts and keep the rest', () => {
  for (const m of [ESTIMATE_INVOICE_MSG.de, ESTIMATE_INVOICE_MSG.ja, ESTIMATE_PAYABLE_MSG.de, ESTIMATE_PAYABLE_MSG.ja]) {
    const out = composeEstimate(m, 5000, URL_);
    expect(out).not.toContain(URL_);
    expect(out).not.toMatch(/Rechnung|請求書|\{\{/);
    expect(out).toContain('$50.00');
    expect(out).toMatch(/Unterschrift|署名/);
  }
});

it('the originals are untouched in the code (to put them back)', () => {
  expect(APPROVED.estimate_invoice).toContain("Here is your invoice:\n{{INVOICE_LINK}}");
  expect(ESTIMATE_PAYABLE_MSG.en).toContain("Please don't pay the invoice, as you've already paid by bank transfer");
});

it('a Library text that already has no invoice is left as it is', () => {
  const t = "Your estimated tax refund is {{AMOUNT}}.\n\nI'll send it for final review and then for your signature.";
  expect(withoutInvoiceLines(t)).toBe(t);
});

it('the CRM preview uses the same text', () => {
  const r = fs.readFileSync(path.join(process.cwd(), 'src/app/api/will/link/route.ts'), 'utf8');
  expect(r).toContain('if (HIDE_INVOICE_IN_ESTIMATE) { template = withoutInvoiceLines(template)');
});
