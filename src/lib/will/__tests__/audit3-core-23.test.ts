/**
 * audit3 core #23: a forced Paid on a text claim must never leave the customer
 * in Form Pending without the form link.
 *
 * paymentClaimForcesPaid bolts PAID onto whatever the model wrote when it did
 * not set the state itself (a German or Japanese "bezahlt" answered
 * conversationally). Paid cascades to Form Pending and arms the form
 * reminders, so a reply like "Danke! Ich sage dem Team Bescheid" with no link
 * had the customer chased for a form they were never given. The screenshot
 * route always sends the approved payment received body; the text route now
 * appends that same body when the model's reply lacks the link, and leaves a
 * reply that already carries it untouched.
 */
import { readFileSync } from 'fs';
import { join } from 'path';
import { withPaymentReceivedIfNoForm } from '@/lib/will/service';
import { paymentReceivedMessage } from '@/lib/will/i18n';

const FORM = 'https://workingholidaytax.com.au/tax-form';

describe('withPaymentReceivedIfNoForm', () => {
  it('appends the approved payment received body when the reply has no form link', () => {
    const confirmation = paymentReceivedMessage('de');
    const out = withPaymentReceivedIfNoForm('Danke! Ich sage dem Team Bescheid.', confirmation);
    expect(out.startsWith('Danke! Ich sage dem Team Bescheid.')).toBe(true);
    expect(out).toContain(confirmation);
    expect(out).toContain(FORM);
  });

  it('leaves a reply that already carries the form link exactly as it is', () => {
    const reply = `Payment received! Please fill in ${FORM} and we will get back to you.`;
    expect(withPaymentReceivedIfNoForm(reply, paymentReceivedMessage('en'))).toBe(reply);
  });

  it('uses the confirmation alone when there is no reply text', () => {
    const confirmation = paymentReceivedMessage('ja');
    expect(withPaymentReceivedIfNoForm(undefined, confirmation)).toBe(confirmation);
    expect(withPaymentReceivedIfNoForm('   ', confirmation)).toBe(confirmation);
  });

  it.each(['en', 'de', 'ja', 'es', 'fr', 'it', 'pt'])('every %s payment received body carries the form link', (lang) => {
    expect(paymentReceivedMessage(lang)).toContain(FORM);
  });
});

describe('the forced Paid block in decideAndAct uses it', () => {
  const src = readFileSync(join(process.cwd(), 'src/lib/will/service.ts'), 'utf8');

  it('appends the Library first payment received body and audits it', () => {
    const start = src.indexOf('if (paymentClaimForcesPaid({');
    expect(start).toBeGreaterThan(0);
    const block = src.slice(start, start + 2000);
    expect(block).toContain("outcome.newState = 'PAID'");
    expect(block).toContain('withPaymentReceivedIfNoForm(outcome.replyText, await paymentReceivedBody(store, customer.lang))');
    expect(block).toContain("'payment_received_appended'");
  });
});
