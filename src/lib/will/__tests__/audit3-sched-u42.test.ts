/**
 * Audit 3, lane sched, unverified finding 42 (5 Sep): the "Database" health
 * dot went red on any single error, showed only the words "write error", and
 * stayed red on that instance until an unrelated createCustomer happened to
 * clear it.
 *
 * lastPersistError is set by dozens of read AND write paths (pageAll,
 * countInStates, listTasks' secondary query...) but was cleared in exactly
 * one place. Reloading the dashboard could not fix a stale flag because the
 * health route never asked the store to forget it.
 *
 * Pinned here:
 *  - store-supabase.ts and store-file.ts each export an additive
 *    clearLastPersistError() that resets their own module-level flag;
 *  - store.ts's clearLastPersistError() clears whichever store recorded the
 *    error, visible via getLastPersistError();
 *  - the health route now puts the real error text in checks.store.detail
 *    (not the bare words "write error"), and clears the flag right after
 *    reporting it, so a one-off past error self-heals on the next poll
 *    instead of reading as a live outage forever.
 */
import * as sb from '@/lib/will/store-supabase';
import * as file from '@/lib/will/store-file';
import { getLastPersistError, clearLastPersistError } from '@/lib/will/store';

type Mutable = { lastPersistError: string | null };

describe('clearLastPersistError (sched-u42)', () => {
  afterEach(() => {
    (sb as unknown as Mutable).lastPersistError = null;
    (file as unknown as Mutable).lastPersistError = null;
  });

  it('store-supabase exports a setter that resets its own lastPersistError', () => {
    (sb as unknown as Mutable).lastPersistError = 'pageAll will_customers: timeout';
    expect(sb.lastPersistError).toBe('pageAll will_customers: timeout');
    sb.clearLastPersistError();
    expect(sb.lastPersistError).toBeNull();
  });

  it('store-file exports a setter that resets its own lastPersistError', () => {
    (file as unknown as Mutable).lastPersistError = 'ENOSPC: disk full';
    expect(file.lastPersistError).toBe('ENOSPC: disk full');
    file.clearLastPersistError();
    expect(file.lastPersistError).toBeNull();
  });

  it('store.clearLastPersistError() clears whichever store recorded the error', () => {
    (sb as unknown as Mutable).lastPersistError = 'countInStates: connection reset';
    expect(getLastPersistError()).toBe('countInStates: connection reset');
    clearLastPersistError();
    expect(getLastPersistError()).toBeNull();
  });
});

describe('health route /api/will/health (sched-u42)', () => {
  const fs = require('fs');
  const path = require('path');
  const src = fs.readFileSync(
    path.join(__dirname, '..', '..', '..', 'app', 'api', 'will', 'health', 'route.ts'),
    'utf8',
  );

  it('reports the real recorded error text instead of the bare words "write error"', () => {
    expect(src).not.toMatch(/detail:\s*persistErr\s*\?\s*'write error'/);
    expect(src).toMatch(/\$\{persistErr\}/);
  });

  it('clears the flag once it has been reported, so a stale error does not stay red forever', () => {
    expect(src).toMatch(/clearLastPersistError/);
    expect(src).toMatch(/if \(persistErr\) clearLastPersistError\(\)/);
  });
});
