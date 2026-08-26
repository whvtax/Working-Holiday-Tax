// Runtime configuration for the local build.

/** The assistant's name, shown in the dashboard instead of "AI" and used
 *  as the team-member persona. Change it here once, applies everywhere. */
export const ASSISTANT_NAME = 'Will';

// Follow-up timing per the spec is 24h/3d/7d (pre-payment & signature)
// and 6h/3d/7d (form). Locally we run a compressed clock so the whole
// cadence can be watched in minutes. Set FOLLOWUP_MODE=real for spec timing.
const REAL = {
  prePayment: [24 * 3600, 3 * 86400, 7 * 86400],
  form: [6 * 3600, 3 * 86400, 7 * 86400],
  signature: [24 * 3600, 3 * 86400, 7 * 86400],
  autoCloseAfterFinal: 7 * 86400,
  quietHours: { start: 6, end: 24, tz: 'Australia/Sydney' },
  enforceQuietHours: true,
};

const DEMO = {
  prePayment: [40, 90, 150],
  form: [40, 90, 150],
  signature: [40, 90, 150],
  autoCloseAfterFinal: 60,
  quietHours: { start: 0, end: 24, tz: 'Australia/Sydney' },
  enforceQuietHours: false,
};

export function schedulerConfig() {
  if (process.env.FOLLOWUP_MODE === 'real') return REAL;
  const override = process.env.FOLLOWUP_STEPS;
  if (override) {
    const steps = override.split(',').map((n) => parseInt(n, 10));
    return { ...DEMO, prePayment: steps, form: steps, signature: steps, autoCloseAfterFinal: steps[steps.length - 1] };
  }
  return DEMO;
}

/** UTC-offset minutes for a timezone at a given instant (handles DST). Used
 *  to convert a Melbourne calendar date/time into the UTC instant it
 *  actually is, without pulling in a date library for one calculation. */
function tzOffsetMinutes(tz: string, atUtcMs: number): number {
  const part = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'shortOffset' })
    .formatToParts(new Date(atUtcMs)).find((p) => p.type === 'timeZoneName')?.value ?? 'GMT+10';
  const m = /GMT([+-])(\d+)(?::(\d+))?/.exec(part);
  if (!m) return 600; // AEST fallback
  const sign = m[1] === '-' ? -1 : 1;
  return sign * (Number(m[2]) * 60 + Number(m[3] ?? 0));
}

/** The UTC instant of local midnight for the given calendar date in `tz`
 *  (year/month are 1-based, day may overflow — e.g. day 32 rolls into next
 *  month — same as the Date constructor). */
export function localMidnightUtc(tz: string, year: number, month: number, day: number): Date {
  const roughUtc = Date.UTC(year, month - 1, day, 0, 0, 0);
  const offsetMin = tzOffsetMinutes(tz, roughUtc);
  return new Date(roughUtc - offsetMin * 60 * 1000);
}

/** One canonical money formatter shared by playbook and guard so the
 *  team-approved estimate is always expressed identically. */
export function formatAUD(cents: number): string {
  const n = cents / 100;
  return '$' + n.toLocaleString('en-AU', {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

/** Human-feel reply delay (seconds) per spec §8.1: varies, never uniform. */
export function humanDelaySeconds(text: string): number {
  const base = text.length > 300 ? 45 : text.length > 120 ? 25 : 12;
  return Math.round(base + Math.random() * base * 0.8);
}

/** How long Autopilot waits before a reply actually leaves, in seconds.
 *
 *  Set to 4 minutes on Jo's instruction, 25 Aug. Until now Autopilot answered
 *  the instant the webhook landed, which reads as a machine: nobody types a
 *  considered answer about someone's tax in two seconds.
 *
 *  The reply is written immediately and parked as QUEUED, so it is visible in
 *  the chat and can still be discarded; the scheduler transmits it once this
 *  delay has passed. The tick runs every 5 minutes (vercel.json), so the real
 *  gap lands between 4 and 9 minutes — which is the human range anyway.
 *
 *  Approval mode is unaffected: there the owner's click is the delay. */
export const AUTOPILOT_REPLY_DELAY_SECONDS = 240;

export function withinQuietHours(now = new Date()): boolean {
  const cfg = schedulerConfig();
  if (!cfg.enforceQuietHours) return true;
  const hour = parseInt(
    new Intl.DateTimeFormat('en-AU', { hour: 'numeric', hour12: false, timeZone: cfg.quietHours.tz }).format(now),
    10,
  );
  return hour >= cfg.quietHours.start && hour < cfg.quietHours.end;
}

/** Next opening of the send window (e.g. 06:00) in the configured timezone. */
export function deferToMorning(now = new Date()): Date {
  const cfg = schedulerConfig();
  if (!cfg.enforceQuietHours) { const d = new Date(now); d.setMinutes(d.getMinutes() + 1); return d; }
  const startHour = cfg.quietHours.start;
  // Current hour in the target tz.
  const hourNow = parseInt(new Intl.DateTimeFormat('en-AU', { hour: 'numeric', hour12: false, timeZone: cfg.quietHours.tz }).format(now), 10);
  const d = new Date(now);
  // Advance to the next start hour. If we're already at/after it but out of window
  // (i.e. after end), roll to tomorrow's start.
  let hoursToAdd = (startHour - hourNow + 24) % 24;
  if (hoursToAdd === 0) hoursToAdd = 24;
  d.setHours(d.getHours() + hoursToAdd, 0, 0, 0);
  return d;
}

