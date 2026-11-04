import { readFileSync } from 'fs';
import path from 'path';

// Jo, 4 Nov: a stuck "Payment received" raised "may not have reached" although the
// dashboard's payment template had gone out and the customer had filled the form.
describe('stranded outbound sweep', () => {
  const src = readFileSync(path.join(process.cwd(), 'src/lib/will/scheduler.ts'), 'utf8');
  it('raises no task when a later outbound to the same customer was sent', () => {
    const start = src.indexOf('const stranded = await store.staleOutbound');
    const body = src.slice(start, start + 2200);
    expect(body).toMatch(/laterSent/);
    expect(body).toMatch(/\['SENT', 'DELIVERED', 'READ'\]/);
    expect(body.indexOf('laterSent')).toBeLessThan(body.indexOf('raiseOrUpdateTask'));
  });
});
