/**
 * Pause Will (kill_switch=true) made doProcess return before it ever reached
 * the heartbeat write (`last_tick_at`) at the bottom of the tick. The health
 * check reads that setting to decide the Scheduler dot, so 15 minutes after
 * pressing Pause Will the dot went red — "THE SCHEDULER HAS NOT RUN" — telling
 * the operator to go fix the database when the scheduler was simply paused.
 *
 * This pins that a paused tick still records the heartbeat, exactly like an
 * unpaused one, so the health dot cannot mistake "paused" for "dead".
 */
const store = {
  reclaimStaleJobs: jest.fn(),
  getSetting: jest.fn(),
  setSetting: jest.fn(),
  dueJobs: jest.fn(),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

import { processDueJobs } from '@/lib/will/scheduler';

beforeEach(() => {
  for (const fn of Object.values(store)) (fn as jest.Mock).mockReset();
  store.reclaimStaleJobs.mockResolvedValue(0);
  store.setSetting.mockResolvedValue(undefined);
});

test('a paused tick (kill_switch on) still writes the last_tick_at heartbeat', async () => {
  store.getSetting.mockImplementation(async (k: string) => k === 'kill_switch');

  const result = await processDueJobs();

  expect(result).toEqual({ processed: 0, sent: [], closed: [], deferred: 0 });
  // The batch must never even be read while paused ...
  expect(store.dueJobs).not.toHaveBeenCalled();
  // ... but the heartbeat must still be written, so the health check sees a
  // recent last_tick_at instead of reporting a dead scheduler.
  expect(store.setSetting).toHaveBeenCalledWith('last_tick_at', expect.any(String));
});

test('an unpaused tick with nothing due still writes the heartbeat as before', async () => {
  store.getSetting.mockResolvedValue(false);
  store.dueJobs.mockResolvedValue([]);

  await processDueJobs();

  expect(store.setSetting).toHaveBeenCalledWith('last_tick_at', expect.any(String));
});
