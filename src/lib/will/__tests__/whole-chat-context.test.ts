/**
 * Every message takes the same path, and the reply is written from the WHOLE
 * chat (Jo, 4 Sep).
 *
 * "Whatever arrives and from whoever — a new lead, someone who went cold and
 * came back, a closed customer — Will waits the two minutes, reads the whole
 * chat again, and only then writes. That way it knows who it is talking to and
 * does not answer 'hi, how can I help' to someone who already has a history."
 *
 * So: a returning customer no longer stops at a task, and the profile handed to
 * the model carries the return, the payment history and their first message.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const service = readFileSync(join(process.cwd(), 'src/lib/will/service.ts'), 'utf8');
const playbook = readFileSync(join(process.cwd(), 'src/lib/will/playbook.ts'), 'utf8');
const claude = readFileSync(join(process.cwd(), 'src/lib/will/claude.ts'), 'utf8');

it('a returning customer is not turned into a task before Will has read anything', () => {
  expect(service).not.toMatch(/reason: 'A previous customer messaged again, needs a human'/);
  expect(service).toMatch(/returning_customer_handled_by_will/);
});

it('the profile carries the backstory, built from the whole message list', () => {
  expect(service).toMatch(/async function buildBackstory/);
  expect(service).toMatch(/RETURNING CUSTOMER/);
  expect(service).toMatch(/backstory: await buildBackstory/);
});

it('the prompt tells the model to read the chat from the first message', () => {
  expect(playbook).toMatch(/READ THE WHOLE CHAT BEFORE EVERY REPLY/);
  expect(playbook).toMatch(/NEVER greeted as new/);
  expect(playbook).toMatch(/History with us/);
});

it('the transcript window is 60 turns, not 40', () => {
  expect(claude).toMatch(/slice\(-60\)/);
});
