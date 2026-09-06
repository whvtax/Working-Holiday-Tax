/**
 * CRM Done: a failed "mark done" after a successful estimate send must not
 * lead to re-sending the estimate (audit, 5 Sep).
 *
 * sendEstimateThenDone sends first, then PATCHes the task done. If the PATCH
 * fails the old alert said "try again", and pressing Done again reopened the
 * send form with empty fields: send_estimate has no idempotency, so the
 * customer got the estimate and invoice twice. Now the send is remembered per
 * task before the PATCH; on failure the alert says the message already went
 * out, and the next Done on that task skips the lookup and the send form and
 * finishes with the remembered amount, so the client card keeps the refund.
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

describe('Done flow after a successful estimate send', () => {
  it('remembers the send per task before trying to mark done', () => {
    expect(src).toContain("useState<Record<string,{amount:number}>>({})");
    const fn = between('async function sendEstimateThenDone', 'async function finishTask');
    const remember = fn.indexOf('setEstimateSent(prev => ({ ...prev, [id]: { amount } }))');
    const finish = fn.indexOf('await finishTask(id, amount, { estimateSent: true })');
    expect(remember).toBeGreaterThan(-1);
    expect(finish).toBeGreaterThan(remember);
    // still sends first: the remember/finish lines come after the send_estimate POST
    expect(fn.indexOf("action:'send_estimate'")).toBeLessThan(remember);
  });

  it('finishTask tells the operator the estimate already went out and clears the memory on success', () => {
    const fn = between('async function finishTask', 'async function transferToClients');
    expect(fn).toContain('opts?: { estimateSent?: boolean }');
    expect(fn).toContain('The estimate was sent to the customer, but marking the task done failed.');
    expect(fn).toContain("'Failed to mark as done. Please try again.'");
    // memory cleared only after the PATCH succeeded (before the catch)
    const clear = fn.indexOf('setEstimateSent(prev => { if (!(id in prev)) return prev;');
    expect(clear).toBeGreaterThan(fn.indexOf("if (!res.ok) throw new Error('server_error')"));
    expect(clear).toBeLessThan(fn.indexOf('} catch (err) {'));
  });

  it('startDone skips the WhatsApp lookup for a task whose estimate already went out', () => {
    const fn = between('async function startDone', 'function closeDone');
    const skip = fn.indexOf('if (estimateSent[task.id]) { setDoneLooking(false); return }');
    expect(skip).toBeGreaterThan(-1);
    expect(skip).toBeLessThan(fn.indexOf('/api/will/link?phone='));
  });

  it('the modal hides the send form and finishes with the remembered amount', () => {
    const modal = between('{doneFor && (()=>{', '✓ Mark as done');
    expect(modal).toContain('const alreadySent = estimateSent[doneFor.id]');
    expect(modal).toContain('finishTask(id, amt, { estimateSent: true })');
    expect(modal).toContain('Estimate already sent ✓ $');
    expect(modal).toContain('{!alreadySent && !doneLooking && doneLink && (<>');
    expect(modal).toContain('{alreadySent ? (');
    // the ordinary paths are untouched
    expect(src).toContain('Done without sending');
    expect(src).toContain("{doneBusy ? 'Sending...' : 'Send and finish'}");
  });
});
