/** Jo, 24 Sep: a lost lead remembers its win-back. */
import { winbackStatus, WINBACK_GIVE_UP_DAYS } from '@/lib/will/winbacks';

const now = new Date('2026-09-24T00:00:00Z');
it('no record, no status', () => { expect(winbackStatus(undefined, null, now)).toEqual({ kind: 'none' }); });
it('queued but not sent is a draft', () => {
  expect(winbackStatus({ queuedAt: '2026-09-23T00:00:00Z' }, null, now).kind).toBe('draft');
});
it('sent and silent is waiting, with the day count', () => {
  const s = winbackStatus({ queuedAt: '2026-09-20T00:00:00Z', sentAt: '2026-09-21T00:00:00Z' }, '2026-09-10T00:00:00Z', now);
  expect(s).toEqual({ kind: 'waiting', sentAt: '2026-09-21T00:00:00Z', days: 3 });
});
it('a customer message after the win-back is a win', () => {
  const s = winbackStatus({ queuedAt: '2026-09-20T00:00:00Z', sentAt: '2026-09-21T00:00:00Z' }, '2026-09-22T10:00:00Z', now);
  expect(s.kind).toBe('won_back');
});
it(`silence for ${WINBACK_GIVE_UP_DAYS} days is giving up`, () => {
  const s = winbackStatus({ queuedAt: '2026-09-01T00:00:00Z', sentAt: '2026-09-01T00:00:00Z' }, null, now);
  expect(s.kind).toBe('gave_up');
});
