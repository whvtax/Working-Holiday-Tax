/**
 * The CRM card moves to Clients when the return is LODGED, and only then.
 *
 * Jo, 4 Sep: "the customer moves to the Clients tab not when I send the return
 * for signature, but when the return has been lodged." Both buttons send a
 * message and both move the pipeline, so the difference is easy to lose:
 *   send_signature  -> Signature stage, nothing filed
 *   send_lodged     -> Lodged, and the CRM card is filed under Clients
 * The filing now happens server-side (archiveTaskByPhone) so it also works from
 * Will's chat, where the browser transfer never ran.
 */
const archiveTaskByPhone = jest.fn().mockResolvedValue('task-1');
jest.mock('@/lib/db', () => ({ archiveTaskByPhone: (...a: unknown[]) => archiveTaskByPhone(...a) }));

import { readFileSync } from 'fs';
import { join } from 'path';

const route = readFileSync(join(process.cwd(), 'src/app/api/will/actions/route.ts'), 'utf8');
const section = (name: string) => {
  const start = route.indexOf(`case '${name}': {`);
  expect(start).toBeGreaterThan(-1);
  const end = route.indexOf("case '", start + 10);
  return route.slice(start, end === -1 ? route.length : end);
};

it('send_lodged files the CRM card under Clients', () => {
  expect(section('send_lodged')).toMatch(/archiveTaskByPhone\(customer\.waId\)/);
});

it('send_signature does NOT file the card under Clients', () => {
  expect(section('send_signature')).not.toMatch(/archiveTaskByPhone/);
});

it('send_signature moves the customer to Signature from wherever they are', () => {
  const s = section('send_signature');
  expect(s).toMatch(/setState\(customer\.id, 'SIGNATURE_PENDING', 'HUMAN'\)/);
  expect(s).not.toMatch(/signature can only be sent once/);
  expect(s).toMatch(/restartSignatureCadenceFromNotice/);
});

it('send_lodged moves the customer to Lodged from wherever they are', () => {
  const s = section('send_lodged');
  expect(s).toMatch(/setState\(customer\.id, 'LODGED', 'HUMAN'\)/);
  expect(s).not.toMatch(/this can only be sent once the customer has signed/);
  expect(s).toMatch(/kind: 'REVIEW_REQUEST'/);
});
