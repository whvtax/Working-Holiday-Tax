/**
 * A paid customer who sends their documents is answered, not just filed
 * (Hannah, +44 7944 741456, 4 Sep).
 *
 * The acknowledgement was already written and attached to the task — and then
 * waited for a click. Overnight that meant somebody who did exactly what we
 * asked sat on read until morning. There is nothing in the line to get wrong:
 * no amount, no tax, no promise. On Autopilot it now goes on its own, once per
 * drop (fifty invoices are one arrival), and the task still opens because the
 * files themselves need collecting.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const service = readFileSync(join(process.cwd(), 'src/lib/will/service.ts'), 'utf8');
const block = (() => {
  const start = service.indexOf("if (meta?.media && isAfterPayment(customer.state)) {");
  expect(start).toBeGreaterThan(-1);
  return service.slice(start, service.indexOf('const paidFresh = await store.getCustomerByWaId(waId);', start));
})();

it('the same text is both the suggested reply and what is sent', () => {
  expect(block).toMatch(/const ack = await suggestReply\('', customer, 'documents_after_payment'\);/);
  expect(block).toMatch(/suggestedReply: ack,/);
  expect(block).toMatch(/await deliverOut\(customer, ack, 'AI', \{ system: true \}\);/);
});

it('the task still opens, with the tally, exactly as before', () => {
  expect(block).toMatch(/raiseOrUpdateTask\(store, customer, \{/);
  expect(block).toMatch(/reasonFor: \(context\) => documentDropReason\(documentDropCount\(context\)\)/);
});

it('only on Autopilot, and never past the kill switch', () => {
  expect(block).toMatch(/const autopilot = !requiresApproval\(await store\.getSetting\('ai_mode'\)\);/);
  expect(block).toMatch(/if \(!killSwitch && autopilot && fresh\)/);
});

it('never to someone who opted out, is paused, or is a legacy import', () => {
  expect(block).toMatch(/!customer\.optedOut && !customer\.aiPaused && !customer\.isLegacy/);
});

it('once per drop: the cooldown is written BEFORE the send', () => {
  const stampAt = block.indexOf('await store.setSetting(key, Date.now());');
  const sendAt = block.indexOf("await deliverOut(customer, ack, 'AI', { system: true });");
  expect(stampAt).toBeGreaterThan(-1);
  expect(sendAt).toBeGreaterThan(stampAt);
  expect(block).toMatch(/Date\.now\(\) - last > 2 \* 60 \* 60 \* 1000/);
});

it('and a failure here never costs the task', () => {
  expect(block).toMatch(/\} catch \{ \/\* the task is already open; the courtesy line is a bonus \*\/ \}/);
});

describe('the two handoffs that should never have been handoffs', () => {
  const playbook = readFileSync(join(process.cwd(), 'src/lib/will/playbook.ts'), 'utf8');

  it('naming a track or a price is a choice, not a question (Cedrik, "Tfn 220$")', () => {
    expect(playbook).toMatch(/THEY NAME A TRACK OR A PRICE/);
    expect(playbook).toMatch(/Tfn 220\$/);
  });

  it('asking for the form before paying is an ordinary answer (Felix)', () => {
    expect(playbook).toMatch(/THEY ASK FOR THE FORM OR THE LINK BEFORE PAYING/);
  });

  it('and "do I even have to lodge?" is the approved tax shape (Nicky)', () => {
    expect(playbook).toMatch(/WHETHER THEY HAVE TO LODGE AT ALL/);
  });
});
