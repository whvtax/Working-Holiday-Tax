/**
 * Audit 3, lane actions, finding 31 (5 Sep), part 2: Will's chat must not
 * claim a lodged send filed the CRM card under Clients when the server
 * reported it did not find one (archiveTaskByPhone returned null, so
 * filedUnderClients is false). Before this, runStageAction's success toast
 * was a fixed string and ignored the server's filedUnderClients flag, so a
 * miss left the Done card with no signal (source-shape check: this logic
 * lives in a React event handler, not something a unit test can call
 * directly).
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const src = readFileSync(join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');

const runStageAction = () => {
  const start = src.indexOf('const runStageAction =');
  expect(start).toBeGreaterThan(-1);
  const end = src.indexOf('const [, setClock]', start);
  return src.slice(start, end === -1 ? start + 1500 : end);
};

it('checks filedUnderClients before claiming the card was filed', () => {
  const body = runStageAction();
  expect(body).toMatch(/filedUnderClients/);
  expect(body).toMatch(/action === 'send_lodged'/);
});

it('does not add a dash to the new customer facing toast text', () => {
  const body = runStageAction();
  const m = body.match(/No CRM card found to file[^'"`]*/);
  expect(m).toBeTruthy();
  expect(m![0]).not.toMatch(/[-–—]/);
});
