/**
 * Audit 3, lane sched, finding 60 (5 Sep): the nightly consistency check and
 * the unmatched-questionnaire task both opened a fresh customer-less card
 * every time the same condition was still true, instead of updating the one
 * card already open for it. Neither has a customer to attach an Open Chat or
 * Send Reply to, so the owner was left reading names or numbers out of a
 * stacking pile of otherwise-identical cards.
 *
 * Pinned here:
 *  - raiseOrFoldSystemTask (tasks.ts) refreshes the one open card matching
 *    `match` instead of adding a second, and resolveSystemTasks closes every
 *    card matching `match`;
 *  - runNightly (scheduler.ts) uses that fold for "Nightly consistency check
 *    found N issue(s)" and resolves the card once no issue remains;
 *  - notifyFormReceived's unmatched-questionnaire task (form-link.ts) folds
 *    repeated submissions from the same phone number into the one open card
 *    for that number, rather than one per submission.
 * Wording is unchanged in every case; only the stacking is gone.
 */
import { mkdtempSync, promises as fsp, readFileSync } from 'fs';
import os from 'os';
import path from 'path';
import type { Store } from '@/lib/will/store';

const read = (p: string) => readFileSync(path.join(process.cwd(), p), 'utf8');

describe('raiseOrFoldSystemTask / resolveSystemTasks (real store)', () => {
  let store: Store;
  let dir: string;
  let cwdSpy: jest.SpyInstance;

  beforeEach(async () => {
    dir = mkdtempSync(path.join(os.tmpdir(), 'will-foldsystem-'));
    cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(dir);
    jest.resetModules();
    const { FileStore } = await import('@/lib/will/store-file');
    store = new FileStore() as unknown as Store;
  });

  afterEach(async () => {
    cwdSpy.mockRestore();
    await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
  });

  it('refreshes the one open card instead of stacking a second', async () => {
    const { raiseOrFoldSystemTask } = await import('@/lib/will/tasks');
    const match = (t: { reason: string }) => t.reason.startsWith('Nightly consistency check');

    await raiseOrFoldSystemTask(store, {
      match, reason: 'Nightly consistency check found 3 issue(s)', severity: 'REVIEW',
      context: 'Alex: paid but in sales state PRICE_SENT', suggestedReply: null,
    });
    await raiseOrFoldSystemTask(store, {
      match, reason: 'Nightly consistency check found 3 issue(s)', severity: 'REVIEW',
      context: 'Alex: paid but in sales state PRICE_SENT', suggestedReply: null,
    });

    const open = (await store.listTasks()).filter((t) => t.status === 'OPEN' && match(t));
    expect(open).toHaveLength(1);
    expect(open[0].customerId).toBeNull();
  });

  it('closes the folded card once the condition clears', async () => {
    const { raiseOrFoldSystemTask, resolveSystemTasks } = await import('@/lib/will/tasks');
    const match = (t: { reason: string }) => t.reason.startsWith('Nightly consistency check');

    await raiseOrFoldSystemTask(store, {
      match, reason: 'Nightly consistency check found 1 issue(s)', severity: 'REVIEW',
      context: 'Alex: paid but in sales state PRICE_SENT', suggestedReply: null,
    });
    const resolved = await resolveSystemTasks(store, match);
    expect(resolved).toBe(1);
    expect((await store.listTasks()).filter((t) => t.status === 'OPEN' && match(t))).toHaveLength(0);
  });

  it('leaves an unrelated open card alone', async () => {
    const { raiseOrFoldSystemTask } = await import('@/lib/will/tasks');
    await store.addTask({
      customerId: null, customerName: null,
      reason: 'Questionnaire submitted by a number that matches no WhatsApp chat',
      severity: 'REVIEW', context: 'unrelated', suggestedReply: null,
    });
    const match = (t: { reason: string }) => t.reason.startsWith('Nightly consistency check');
    await raiseOrFoldSystemTask(store, {
      match, reason: 'Nightly consistency check found 1 issue(s)', severity: 'REVIEW',
      context: 'Alex: paid but in sales state PRICE_SENT', suggestedReply: null,
    });
    const all = await store.listTasks();
    expect(all.filter((t) => t.status === 'OPEN')).toHaveLength(2);
  });
});

describe('runNightly wiring folds and resolves the consistency-check card', () => {
  const nightly = (() => {
    const s = read('src/lib/will/scheduler.ts');
    const start = s.indexOf('export async function runNightly');
    return s.slice(start);
  })();

  it('folds the issue card through raiseOrFoldSystemTask, matched on the reason prefix', () => {
    expect(nightly).toMatch(/raiseOrFoldSystemTask\(store,\s*\{/);
    expect(nightly).toMatch(/t\.reason\.startsWith\('Nightly consistency check'\)/);
    expect(nightly).toMatch(/`Nightly consistency check found \$\{issues\.length\} issue\(s\)`/);
  });

  it('resolves the card once no issue remains, rather than leaving it stacked and stale', () => {
    expect(nightly).toMatch(/resolveSystemTasks\(store, isNightlyCheckTask\)/);
  });
});

describe('notifyFormReceived wiring folds repeated unmatched submissions by number', () => {
  const src = read('src/lib/will/form-link.ts');

  it('uses raiseOrFoldSystemTask matched on the parsed waNumber, not a plain addTask', () => {
    const start = src.indexOf("if (formKind === 'tax-return') {");
    const body = src.slice(start, start + 800);
    expect(body).toMatch(/raiseOrFoldSystemTask\(store,\s*\{/);
    expect(body).toMatch(/parseUnmatchedFormTask\(t\.context\)\?\.waNumber === waNumber/);
  });
});
