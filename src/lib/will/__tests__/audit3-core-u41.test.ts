/**
 * A tax-return task created by hand in the CRM only reached Will through the
 * DB trigger's exact-digit phone match (migration 038): an operator typing
 * "0412 345 678" (the normal way an Australian number is written) produces
 * "0412345678", which never equals the stored "61412345678", so nothing was
 * queued and the customer kept getting questionnaire reminders for a form
 * already entered by hand. POST /api/crm/tasks now calls notifyFormReceived
 * after createTask, the same best-effort call the public form routes make,
 * so a hand-entered task gets the same candidate matching, the same
 * FORM_RECEIVED job and the same "no chat matches this number" task
 * (audit, 5 Sep). This is a source-shape check: the route imports Next and
 * CRM/db modules in a way that is not safely importable/mockable here.
 */
import fs from 'fs';
import path from 'path';

describe('POST /api/crm/tasks notifies Will after a hand-entered task', () => {
  const src = fs.readFileSync(
    path.join(process.cwd(), 'src/app/api/crm/tasks/route.ts'),
    'utf8'
  );
  const postFn = src.slice(src.indexOf('export async function POST('));

  it('calls notifyFormReceived with the saved task\'s own fields, after createTask', () => {
    const createIdx = postFn.indexOf('await createTask(');
    const notifyIdx = postFn.indexOf('notifyFormReceived(');
    expect(createIdx).toBeGreaterThan(-1);
    expect(notifyIdx).toBeGreaterThan(createIdx);
    expect(postFn).toMatch(
      /notifyFormReceived\(task\.whatsapp,\s*task\.email,\s*task\.taskType\b/
    );
  });

  it('is best effort: a notifyFormReceived failure must not turn a saved task into an error response', () => {
    const tryIdx = postFn.lastIndexOf('try {', postFn.indexOf('notifyFormReceived'));
    const returnIdx = postFn.indexOf("NextResponse.json({ ok:true, task })");
    const notifyBlock = postFn.slice(tryIdx, returnIdx);
    expect(notifyBlock).toMatch(/catch \(err\) \{/);
    expect(notifyBlock).not.toMatch(/status:\s*5\d\d/);
  });
});
