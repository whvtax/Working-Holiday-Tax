// Runtime configuration for the local build.

/** The assistant's name, shown in the dashboard instead of "AI" and used
 *  as the team-member persona. Change it here once, applies everywhere. */
export const ASSISTANT_NAME = 'Will';

/**
 * How long after the estimate goes out the finished return actually reaches
 * the customer by email.
 *
 * WHY THIS NUMBER EXISTS (Jo, 28 Aug). Pressing Done in the CRM sends the
 * estimate and moves the customer to Signature, but the return itself is
 * emailed about three days later. The signature follow-ups are written as if
 * the customer already has it in their inbox ("your tax return is ready and
 * just needs your signature"), so without this offset the first one would
 * arrive two days before the thing it is chasing, and read as a mistake.
 *
 * The signature cadence below is therefore 24h / 3d / 7d AFTER the email, not
 * after the stage change. When the turnaround changes, change this one number.
 *
 * 4 Sep: this offset applies to the DONE path only (estimate sent, email still
 * to come). When Jo presses "Send for Signature" he is telling the customer the
 * return is in their inbox right now, so that path re-arms the cadence at a
 * plain 24h / 3d / 7d from the click (see SIGNATURE_AFTER_NOTICE below and
 * actions/route.ts send_signature). Before that the first nudge landed four
 * days after the notice instead of one.
 */
export const SIGNATURE_PREP_DAYS = 3;
/** The signature cadence measured from the moment the customer is TOLD, used
 *  when the "ready for signature" notice has just gone out. */
export const SIGNATURE_AFTER_NOTICE = [24 * 3600, 3 * 86400, 7 * 86400];
const sig = (daysAfterEmail: number) => (SIGNATURE_PREP_DAYS + daysAfterEmail) * 86400;

// Follow-up timing per the spec is 24h/3d/7d (pre-payment & signature)
// and 6h/3d/7d (form). Locally we run a compressed clock so the whole
// cadence can be watched in minutes. Set FOLLOWUP_MODE=real for spec timing.
const REAL = {
  prePayment: [24 * 3600, 3 * 86400, 7 * 86400],
  form: [6 * 3600, 3 * 86400, 7 * 86400],
  signature: [sig(1), sig(3), sig(7)],
  autoCloseAfterFinal: 7 * 86400,
  // THE EVENING WINDOW (Jo, 4 Sep). Follow-ups go out between 7pm and 11pm only.
  // These are backpackers: during the day they are on a farm, in a cafe or on a
  // site, and a nudge that lands at 9am is read at a bad moment and dismissed.
  // In the evening they are on the phone. Anything due before 7pm waits for 7pm;
  // anything due after 11pm waits for 7pm the next day.
  //
  // This gates FOLLOW-UPS ONLY. A reply to somebody who just wrote, a payment
  // confirmation, the questionnaire acknowledgement and the review request are
  // answers to something the customer did, and they go when they go.
  quietHours: { start: 19, end: 23, tz: 'Australia/Sydney' },
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

// The safe default must need NO configuration, and the dangerous one must be
// impossible to reach in production by accident.
//
// WHY THIS WAS INVERTED (Jo, 29 Aug, aiming for 5,000 customers a year). It
// used to default to DEMO unless FOLLOWUP_MODE === 'real'. DEMO fires the whole
// contact cadence in seconds, disables quiet hours (so at 3am), and auto-closes
// a lead 60 seconds after the final message. FOLLOWUP_MODE was an undocumented
// env var set only in Vercel; a new Preview project, a region move, an env
// rotation or a typo silently reverted every real customer to demo timing, with
// the dashboard staying green. One missing string could have burned leads at
// scale at the exact moment of commercial commitment.
//
// Now REAL is the default. DEMO is opt-in via FOLLOWUP_MODE=demo (or the
// explicit FOLLOWUP_STEPS override the tests use), and asking for demo timing
// in production throws rather than shipping it.
export function schedulerConfig() {
  const wantsDemo = process.env.FOLLOWUP_MODE === 'demo' || !!process.env.FOLLOWUP_STEPS;
  if (!wantsDemo) return REAL;

  if (process.env.NODE_ENV === 'production' && !process.env.FOLLOWUP_ALLOW_DEMO_IN_PROD) {
    throw new Error(
      'Refusing to run compressed demo follow-up timing in production. Unset FOLLOWUP_MODE/FOLLOWUP_STEPS, ' +
      'or set FOLLOWUP_ALLOW_DEMO_IN_PROD=true only if a demo in production is genuinely intended.',
    );
  }

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
  // TWO PASSES, because of the two days a year this is wrong with one. The
  // offset is read at UTC midnight, which is 10 or 11 hours BEFORE the local
  // midnight we are aiming at; on the day the clocks change, those two instants
  // sit on opposite sides of the change, so the result lands an hour early and
  // the digest skipped a whole day every October (audit, 4 Sep). Reading the
  // offset again at the computed instant settles it.
  const first = roughUtc - tzOffsetMinutes(tz, roughUtc) * 60 * 1000;
  const refined = roughUtc - tzOffsetMinutes(tz, first) * 60 * 1000;
  return new Date(refined);
}

/** The UTC instant of a given local wall-clock time on a given local date.
 *  Same DST care as localMidnightUtc; `hour` may be any 0..23. */
export function localTimeUtc(tz: string, year: number, month: number, day: number, hour: number): Date {
  const rough = Date.UTC(year, month - 1, day, hour, 0, 0);
  const first = rough - tzOffsetMinutes(tz, rough) * 60 * 1000;
  return new Date(rough - tzOffsetMinutes(tz, first) * 60 * 1000);
}

/** Today's date in a timezone, as {y, mo, da, hh}. */
export function localParts(tz: string, at: Date = new Date()): { y: number; mo: number; da: number; hh: number } {
  const p = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
    hour12: false, timeZone: tz,
  }).formatToParts(at);
  const get = (t: string) => Number(p.find((x) => x.type === t)?.value);
  return { y: get('year'), mo: get('month'), da: get('day'), hh: get('hour') };
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

/** How long Autopilot waits before a reply actually leaves, in seconds.
 *
 *  Set to 2 minutes on Jo's instruction, 3 Sep (was 3, before that 4). Until
 *  Autopilot had a delay it answered the instant the webhook landed, which reads
 *  as a machine: nobody types a considered answer about someone's tax in two
 *  seconds.
 *
 *  The reply is written immediately and parked as QUEUED, so it is visible in
 *  the chat and can still be discarded; the scheduler transmits it once this
 *  delay has passed. The tick runs every 5 minutes (vercel.json), so the real
 *  gap lands between 2 and 7 minutes, still within the human range.
 *
 *  Approval mode is unaffected: there the owner's click is the delay. */
export const AUTOPILOT_REPLY_DELAY_SECONDS = 120;

/**
 * How long THIS particular reply waits: the delay above, with a human amount of
 * scatter on top.
 *
 * WHY (Jo, 4 Sep, Nicky +44 7794). She asked "just checking I'm speaking to
 * someone, not an AI chat bot?" after three exchanges. One of the things that
 * gave it away was the metronome: 6 minutes, then 4 minutes, then 6 minutes,
 * every time, whatever the message. Nobody answers like that. A person replies
 * in one minute, then in forty, then when they get back to their desk.
 *
 * So each reply picks its own wait, anywhere between two and ten minutes (Jo,
 * 4 Sep). The floor stays at two minutes because an instant answer reads as a
 * machine; the ceiling is ten because past that a customer who is sitting there
 * waiting starts to feel ignored.
 *
 * The scatter is per reply, not per customer: the same person waiting twice
 * gets two different gaps, which is the whole idea.
 */
export function autopilotReplyDelaySeconds(rand: () => number = Math.random): number {
  const base = AUTOPILOT_REPLY_DELAY_SECONDS;   // 2 minutes, the floor
  const ceiling = 10 * 60;                      // 10 minutes, Jo's ceiling (4 Sep)
  return Math.round(base + rand() * (ceiling - base));
}

/** Is a FOLLOW-UP allowed to leave right now? (The evening window; see the
 *  quietHours note in REAL above.) Nothing else consults this. */
export function withinQuietHours(now = new Date()): boolean {
  const cfg = schedulerConfig();
  if (!cfg.enforceQuietHours) return true;
  const { hh } = localParts(cfg.quietHours.tz, now);
  return hh >= cfg.quietHours.start && hh < cfg.quietHours.end;
}

/**
 * The next moment a follow-up may go out: the start of the evening window in
 * the business's own timezone.
 *
 * Computed as a WALL-CLOCK time in that timezone (localTimeUtc), not by adding
 * hours to the server clock. The old version did `d.setHours(...)`, which is
 * the SERVER's hours: on Vercel that is UTC, so "defer to 7pm" actually meant
 * 7pm UTC, which is 5am in Melbourne (audit, 4 Sep). Every deferred follow-up
 * would have landed in the middle of the night.
 */
export function deferToMorning(now = new Date()): Date {
  const cfg = schedulerConfig();
  if (!cfg.enforceQuietHours) { const d = new Date(now); d.setMinutes(d.getMinutes() + 1); return d; }
  const tz = cfg.quietHours.tz;
  const { y, mo, da, hh } = localParts(tz, now);
  // Before the window opens today -> today at the opening hour.
  // At or after it (so either inside, which does not call this, or past the
  // end) -> tomorrow at the opening hour.
  const day = hh < cfg.quietHours.start ? da : da + 1;
  return localTimeUtc(tz, y, mo, day, cfg.quietHours.start);
}

