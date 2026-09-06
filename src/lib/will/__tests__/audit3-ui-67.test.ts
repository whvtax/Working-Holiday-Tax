/**
 * CRM Done after a page reload: when Will already shows the estimate as sent
 * (state at Signature or later, or an estimate figure on file), the Done
 * modal must not lead with "Send and finish" (audit, 5 Sep).
 *
 * audit3-ui-66 pinned the in-memory "estimate already sent" note, but that
 * note dies with a reload. /api/will/link returns the customer's state and
 * estimatedRefundCents, which survive it. On that evidence the modal says the
 * estimate was already sent, makes finishing the task the primary button
 * (with the recorded amount, so the client card keeps the refund) and keeps
 * the send form as a secondary "Send again" for genuine corrections.
 *
 * DashboardClient is a large client component, so this pins the wiring by
 * source shape.
 */
import fs from 'fs';
import path from 'path';

const src = fs.readFileSync(
  path.join(process.cwd(), 'src/app/(site)/crm/dashboard/DashboardClient.tsx'),
  'utf8',
);

function between(start: string, end: string): string {
  const a = src.indexOf(start);
  expect(a).toBeGreaterThan(-1);
  const b = src.indexOf(end, a);
  expect(b).toBeGreaterThan(a);
  return src.slice(a, b);
}

describe('Done modal when Will already records the estimate as sent', () => {
  it('reads the estimate figure the link lookup returns', () => {
    expect(src).toContain('stage:string|null;estimatedRefundCents?:number|null}|null>(null)');
    // the link route actually sends that field
    const route = fs.readFileSync(path.join(process.cwd(), 'src/app/api/will/link/route.ts'), 'utf8');
    expect(route).toContain('estimatedRefundCents: c.estimatedRefundCents ?? null');
  });

  it('treats Signature or later, or a recorded estimate, as already sent', () => {
    const modal = between('{doneFor && (()=>{', '{captureRefund && (');
    expect(modal).toContain('doneLink.estimatedRefundCents != null ||');
    expect(modal).toContain("['SIGNATURE_PENDING','SIGNED','LODGED','COMPLETED'].includes(doneLink.state)");
    // the in-memory note from a failed PATCH still wins
    expect(modal).toContain('const sentPerWill = !alreadySent && !!doneLink && (');
  });

  it('finishing is primary and passes the recorded amount; sending is a secondary "Send again"', () => {
    const modal = between('{doneFor && (()=>{', '{captureRefund && (');
    expect(modal).toContain('finishTask(id, sentPerWillAmt, { estimateSent: true })');
    const branch = between(') : doneLink && sentPerWill ? (<>', ') : doneLink ? (<>');
    const again = branch.indexOf("'Send again'");
    const done = branch.indexOf('✓ Mark as done');
    expect(again).toBeGreaterThan(-1);
    expect(done).toBeGreaterThan(again);
    // secondary send button is the quiet one, finish is the primary one
    expect(branch.indexOf('className="btn quiet lg"')).toBeLessThan(again);
    expect(branch.indexOf('className="btn take lg"')).toBeLessThan(done);
    expect(branch.indexOf('className="btn take lg"')).toBeGreaterThan(again);
    expect(branch).toContain('onClick={sendEstimateThenDone}');
  });

  it('says so in the modal and keeps the ordinary wording for a first send', () => {
    const modal = between('{doneFor && (()=>{', '{captureRefund && (');
    expect(modal).toContain('was already sent to this customer.');
    expect(modal).toContain('Mark as done only finishes the task. Send again is for a correction.');
    expect(modal).toContain("'Sends the estimate and the invoice on WhatsApp, then moves them to Signature.'");
    // ordinary first-send path untouched
    expect(src).toContain('Done without sending');
    expect(src).toContain("{doneBusy ? 'Sending...' : 'Send and finish'}");
  });
});
