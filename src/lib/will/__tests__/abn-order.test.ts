/**
 * A TFN + ABN customer gets the ABN questions FIRST, and the "we've received
 * your questionnaire" line only once they have answered (Jo, 4 Sep).
 *
 * WHY THE ORDER MATTERS. The acknowledgement says we are going through
 * everything now and will come back to them. For a TFN customer that is true
 * the moment the form lands. For a TFN + ABN customer it is not: we still need
 * the ABN answers before anyone can start. Sending it first made the ABN
 * questions read as an afterthought, and told the customer we were working on
 * something we were actually still waiting on them for.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const scheduler = readFileSync(join(process.cwd(), 'src/lib/will/scheduler.ts'), 'utf8');
const service = readFileSync(join(process.cwd(), 'src/lib/will/service.ts'), 'utf8');

// The FORM_RECEIVED handler, from its `if` to the end of the job.
const formReceived = (() => {
  const start = scheduler.indexOf("if (job.kind === 'FORM_RECEIVED')");
  const end = scheduler.indexOf("if (job.kind === 'REVIEW_REQUEST')", start);
  return scheduler.slice(start, end);
})();

it('the acknowledgement is skipped while the ABN answers are outstanding', () => {
  expect(formReceived).toMatch(/const abnPending = customer\.income === 'TFN_ABN'/);
  expect(formReceived).toMatch(/if \(!abnPending\) \{/);
});

it('the ABN questions are the message that actually goes', () => {
  expect(formReceived).toMatch(/if \(abnPending\) \{/);
  expect(formReceived).toMatch(/abn_questions_sent/);
});

it('and the acknowledgement is recorded as owed', () => {
  expect(formReceived).toMatch(/setSetting\(abnAnswersPendingKey\(customer\.id\), true\)/);
});

it('a TFN-only customer still gets it straight away', () => {
  // The confirmation send sits inside `if (!abnPending)`, so TFN reaches it
  // (audit3-sched-42 moved the send itself into a sendAck helper so a
  // throttled one can be replayed; the guard and the order are unchanged).
  const guardAt = formReceived.indexOf('if (!abnPending)');
  const confirmAt = formReceived.indexOf('await sendAck();', guardAt);
  expect(guardAt).toBeGreaterThan(-1);
  expect(confirmAt).toBeGreaterThan(guardAt);
  expect(formReceived.slice(guardAt, confirmAt)).not.toMatch(/if \(abnPending\)/);
});

describe('when they answer', () => {
  it('the owed acknowledgement is sent, once, and the flag cleared first', () => {
    expect(service).toMatch(/async function sendOwedFormAck/);
    expect(service).toMatch(/if \(\(await store\.getSetting\(key\)\) !== true\) return;/);
    // Cleared BEFORE sending, so two instances cannot both send it.
    const clearAt = service.indexOf('await store.setSetting(key, false);');
    const sendAt = service.indexOf("const out = await deliverOut(customer, body, 'AI', { waTemplate: template }, template);");
    expect(clearAt).toBeGreaterThan(-1);
    expect(sendAt).toBeGreaterThan(clearAt);
  });

  it('a courtesy line is not an answer', () => {
    expect(service).toMatch(/if \(!opts\?\.alreadyStored && !isCourtesyLine\(text\)\) \{\n\s*await sendOwedFormAck/);
  });

  it('a paused, legacy or opted-out chat is never sent it', () => {
    expect(service).toMatch(/if \(customer\.optedOut \|\| customer\.aiPaused \|\| customer\.isLegacy\) return;/);
  });
});
