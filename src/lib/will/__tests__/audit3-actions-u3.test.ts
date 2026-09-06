/**
 * audit3 / actions / unverified[3]: the Tasks tab's send, resolve and link
 * actions read ONE task by id instead of scanning listTasks() (every open
 * task plus the recent resolved ones, contexts included) for it.
 *
 * Two store methods carry the fix: getTaskById(id) and
 * listOpenTasksForCustomer(customerId). They must return exactly the rows
 * the old `listTasks().find / .filter` produced, so nothing the owner sees
 * changes; only the whole-table read behind the greyed button goes away.
 */
import { mkdtempSync, promises as fsp } from 'fs';
import os from 'os';
import path from 'path';
import type { Store } from '@/lib/will/store';

let store: Store;
let dir: string;
const task = (customerId: string, reason: string, severity: 'REVIEW' | 'URGENT' = 'REVIEW') =>
  store.addTask({ customerId, customerName: null, reason, severity, context: null, suggestedReply: null });
let cwdSpy: jest.SpyInstance;

beforeEach(async () => {
  dir = mkdtempSync(path.join(os.tmpdir(), 'will-tasks-'));
  cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(dir);
  jest.resetModules();
  const { FileStore } = await import('@/lib/will/store-file');
  store = new FileStore() as unknown as Store;
});

afterEach(async () => {
  cwdSpy.mockRestore();
  await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
});

describe('single-row task reads (file store)', () => {
  it('getTaskById returns the same row listTasks().find would, any status, and null for a stranger', async () => {
    const c = await store.createCustomer({ waId: '61400000001', name: 'Alex' });
    const open = await task(c.id, 'needs a human');
    const done = await task(c.id, 'old one');
    await store.resolveTask(done.id);

    const all = await store.listTasks();
    expect(await store.getTaskById(open.id)).toEqual(all.find((t) => t.id === open.id));
    const resolved = await store.getTaskById(done.id);
    expect(resolved?.status).toBe('RESOLVED');
    expect(await store.getTaskById('nope')).toBeNull();
  });

  it('listOpenTasksForCustomer returns exactly the OPEN tasks of that customer', async () => {
    const a = await store.createCustomer({ waId: '61400000001', name: 'Alex' });
    const b = await store.createCustomer({ waId: '61400000002', name: 'Bea' });
    const a1 = await task(a.id, 'one');
    const a2 = await task(a.id, 'two', 'URGENT');
    const aDone = await task(a.id, 'gone');
    await store.resolveTask(aDone.id);
    await task(b.id, 'other person');

    const expected = (await store.listTasks()).filter((t) => t.customerId === a.id && t.status === 'OPEN');
    const got = await store.listOpenTasksForCustomer(a.id);
    expect(got.map((t) => t.id).sort()).toEqual(expected.map((t) => t.id).sort());
    expect(got.map((t) => t.id).sort()).toEqual([a1.id, a2.id].sort());
    expect(await store.listOpenTasksForCustomer('nobody')).toEqual([]);
  });
});

describe('actions route no longer scans the task table for one task', () => {
  it('send_task_reply, mark_form_received and resolve_task look the task up by id', async () => {
    const src = await fsp.readFile(path.join(__dirname, '..', '..', '..', 'app', 'api', 'will', 'actions', 'route.ts'), 'utf8');
    expect(src).not.toMatch(/store\.listTasks\(\)/);
    const sendTaskReply = src.slice(src.indexOf("case 'send_task_reply'"));
    expect(sendTaskReply).toMatch(/store\.getTaskById\(b\.id\)/);
    const resolveTask = src.slice(src.indexOf("case 'resolve_task'"));
    expect(resolveTask).toMatch(/store\.getTaskById\(b\.id\)/);
    const link = src.slice(src.indexOf("case 'mark_form_received'"));
    expect(link).toMatch(/store\.getTaskById\(b\.taskId\)/);
    // The gate is unchanged: only an OPEN task with a customer can be answered.
    // (audit, 5 Sep) the refusal now says why the task is not open; the gate
    // and the 404 are the same.
    expect(sendTaskReply).toMatch(/task\.status !== 'OPEN' \|\| !task\.customerId\) \{[\s\S]{0,600}?'task not open: this task is already closed[^']*'[\s\S]{0,200}?, 404\);/);
  });
});

describe('both stores implement the new reads', () => {
  it('SupabaseStore has getTaskById and listOpenTasksForCustomer as indexed single-customer queries', async () => {
    const src = await fsp.readFile(path.join(__dirname, '..', 'store-supabase.ts'), 'utf8');
    expect(src).toMatch(/async getTaskById\(id: string\)[\s\S]{0,200}\.eq\('id', id\)\.maybeSingle\(\)/);
    expect(src).toMatch(/async listOpenTasksForCustomer\(customerId: string\)[\s\S]{0,300}\.eq\('customer_id', customerId\)\.eq\('status', 'OPEN'\)/);
  });
});

// The other half of this finding: afterHumanReply (called by every send path
// in the actions route, not just send_task_reply) still resolved a
// customer's open tasks via listTasks().filter(...) — the whole open-plus-
// recent-resolved table, contexts included — even though listOpenTasksForCustomer
// exists precisely for this call. Nothing was ever switched over. Fixed by
// adding afterHumanReplyIndexed (same contract, indexed read) and pointing the
// actions route's import at it, so every send path gets the fix without
// duplicating afterHumanReply's own tests (audit3, 5 Sep).
describe('afterHumanReplyIndexed: the actions route\'s half of the same finding', () => {
  it('resolves a customer\'s open tasks via listOpenTasksForCustomer, never listTasks()', async () => {
    const { afterHumanReplyIndexed } = await import('@/lib/will/after-reply');
    const resolveTask = jest.fn().mockResolvedValue(undefined);
    const listOpenTasksForCustomer = jest.fn().mockResolvedValue([
      { id: 'a', customerId: 'c1', status: 'OPEN' },
      { id: 'b', customerId: 'c1', status: 'OPEN' },
    ]);
    // listTasks is deliberately absent: a store call here would throw
    // "not a function", proving the indexed path never falls back to it.
    const fakeStore = {
      markCustomerRead: jest.fn().mockResolvedValue(undefined),
      listMessages: jest.fn().mockResolvedValue([]),
      setMessageStatus: jest.fn().mockResolvedValue(undefined),
      listOpenTasksForCustomer,
      resolveTask,
    } as unknown as Store;

    const r = await afterHumanReplyIndexed(fakeStore, 'c1');

    expect(listOpenTasksForCustomer).toHaveBeenCalledWith('c1');
    expect(resolveTask.mock.calls.map((c) => c[0]).sort()).toEqual(['a', 'b']);
    expect(r.tasksResolved).toBe(2);
  });

  it('never throws when the indexed read fails (best effort, same as afterHumanReply)', async () => {
    const { afterHumanReplyIndexed } = await import('@/lib/will/after-reply');
    const fakeStore = {
      markCustomerRead: jest.fn().mockResolvedValue(undefined),
      listMessages: jest.fn().mockResolvedValue([]),
      setMessageStatus: jest.fn().mockResolvedValue(undefined),
      listOpenTasksForCustomer: jest.fn().mockRejectedValue(new Error('db down')),
      resolveTask: jest.fn(),
    } as unknown as Store;
    await expect(afterHumanReplyIndexed(fakeStore, 'c1')).resolves.toEqual({ tasksResolved: 0 });
  });

  it('the actions route imports afterHumanReplyIndexed, not the whole-table afterHumanReply', async () => {
    const src = await fsp.readFile(path.join(__dirname, '..', '..', '..', 'app', 'api', 'will', 'actions', 'route.ts'), 'utf8');
    expect(src).toMatch(/afterHumanReplyIndexed as afterHumanReply/);
  });
});
