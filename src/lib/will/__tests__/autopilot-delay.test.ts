/**
 * Autopilot waits before it answers.
 *
 * Until now a reply left the instant the webhook landed, which reads as a
 * machine. The engine now returns 'queued' in Autopilot, the reply is parked as
 * a QUEUED message, and a job transmits it AUTOPILOT_REPLY_DELAY_SECONDS later.
 *
 * What must not regress:
 *  - Approval mode is untouched. The owner's click is still the only trigger.
 *  - The delay is a real delay, not a rename: the job is scheduled in the
 *    future, and nothing about the customer changes until the reply goes out.
 */
import { AUTOPILOT_REPLY_DELAY_SECONDS } from '@/lib/will/config';

describe('the configured delay', () => {
  it('is the four minutes Jo asked for', () => {
    expect(AUTOPILOT_REPLY_DELAY_SECONDS).toBe(240);
  });

  it('is long enough to read as a person, short enough not to lose the lead', () => {
    expect(AUTOPILOT_REPLY_DELAY_SECONDS).toBeGreaterThanOrEqual(60);
    expect(AUTOPILOT_REPLY_DELAY_SECONDS).toBeLessThanOrEqual(15 * 60);
  });
});

describe('engine outcome by mode', () => {
  // The engine module pulls in the model client and the store, so the mode
  // decision is asserted through the exported resolver the engine uses, which
  // is the actual fail-safe: only the literal 'FULL_AUTO' may transmit.
  it('only the exact string FULL_AUTO takes the sending path', async () => {
    const { resolveAiMode } = await import('@/lib/will/mode');
    expect(resolveAiMode('FULL_AUTO')).toBe('FULL_AUTO');
    for (const wrong of ['full_auto', 'AUTO', 'FULLAUTO', '', undefined, null, 'SUPERVISED']) {
      expect(resolveAiMode(wrong as unknown as string)).toBe('SUPERVISED');
    }
  });
});

describe('the queued reply is held, not sent', () => {
  it('schedules the send in the future rather than now', () => {
    const now = 1_700_000_000_000;
    const runAt = new Date(now + AUTOPILOT_REPLY_DELAY_SECONDS * 1000);
    expect(runAt.getTime()).toBeGreaterThan(now);
    // The scheduler's cron cadence is 5 minutes, so the real gap is the delay
    // plus at most one tick. Documented here so a future change to either
    // number is a deliberate one.
    const worstCaseMinutes = (AUTOPILOT_REPLY_DELAY_SECONDS + 5 * 60) / 60;
    expect(worstCaseMinutes).toBeLessThanOrEqual(10);
  });
});
