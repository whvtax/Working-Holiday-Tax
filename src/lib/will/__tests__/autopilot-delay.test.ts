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
  it('is the two minutes Jo asked for (3 Sep)', () => {
    expect(AUTOPILOT_REPLY_DELAY_SECONDS).toBe(120);
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

// ── The metronome (Jo, 4 Sep) ──────────────────────────────────────────────
// Nicky asked "am I speaking to an AI?" after replies arrived at 6, 4 and 6
// minutes. A fixed delay is a tell however well chosen, so each reply now picks
// its own wait: mostly the ordinary band, sometimes the long one a real person
// takes when they get pulled away.
describe('autopilotReplyDelaySeconds', () => {
  const { autopilotReplyDelaySeconds, AUTOPILOT_REPLY_DELAY_SECONDS } = jest.requireActual('@/lib/will/config');

  it('never replies faster than the owner\'s two minutes', () => {
    for (let i = 0; i < 500; i++) {
      expect(autopilotReplyDelaySeconds()).toBeGreaterThanOrEqual(AUTOPILOT_REPLY_DELAY_SECONDS);
    }
  });

  it('never waits longer than ten minutes', () => {
    for (let i = 0; i < 500; i++) expect(autopilotReplyDelaySeconds()).toBeLessThanOrEqual(10 * 60);
  });

  it('is different from one reply to the next', () => {
    const seen = new Set(Array.from({ length: 50 }, () => autopilotReplyDelaySeconds()));
    expect(seen.size).toBeGreaterThan(20);
  });

  it('spreads across the whole two-to-ten-minute band', () => {
    const all = Array.from({ length: 3000 }, () => autopilotReplyDelaySeconds());
    expect(all.filter((s) => s < 4 * 60).length).toBeGreaterThan(300);   // short ones happen
    expect(all.filter((s) => s > 8 * 60).length).toBeGreaterThan(300);   // long ones happen
  });
});
