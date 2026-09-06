/**
 * Follow-ups go out between 7pm and 11pm, Melbourne time, and nothing else does.
 *
 * Jo, 4 Sep: these are backpackers. During the day they are on a farm, in a
 * cafe or on a site, and a nudge at 9am is read at a bad moment and dismissed.
 * In the evening they are on their phone. Anything due before 7pm waits for
 * 7pm; anything due after 11pm waits for 7pm tomorrow.
 *
 * The window gates FOLLOW-UPS ONLY. A reply to somebody who just wrote, the
 * payment confirmation, the questionnaire acknowledgement and the review
 * request all answer something the customer did, and they go when they go.
 */
import { withinQuietHours, deferToMorning, schedulerConfig } from '@/lib/will/config';

const MEL = 'Australia/Sydney';
// A given hour of 4 Sep 2026, Melbourne time (AEST, +10).
const at = (hour: number, minute = 0) =>
  new Date(new Date('2026-09-04T00:00:00+10:00').getTime() + hour * 3600e3 + minute * 60e3);
const melHour = (d: Date) =>
  Number(new Intl.DateTimeFormat('en-AU', { hour: 'numeric', hour12: false, timeZone: MEL }).format(d));
const melDay = (d: Date) =>
  Number(new Intl.DateTimeFormat('en-AU', { day: 'numeric', timeZone: MEL }).format(d));

it('the window is 19:00 to 23:00', () => {
  expect(schedulerConfig().quietHours).toMatchObject({ start: 19, end: 23 });
});

describe('inside the window', () => {
  it.each([[19, 0], [20, 30], [22, 0], [22, 59]])('%i:%i sends', (h, m) => {
    expect(withinQuietHours(at(h, m))).toBe(true);
  });
});

describe('outside the window', () => {
  it.each([[0, 0], [6, 0], [9, 0], [12, 0], [17, 0], [18, 59]])('%i:%i waits for 7pm TODAY', (h, m) => {
    const t = at(h, m);
    expect(withinQuietHours(t)).toBe(false);
    const next = deferToMorning(t);
    expect(melHour(next)).toBe(19);
    expect(melDay(next)).toBe(melDay(t));
  });

  it.each([[23, 0], [23, 30]])('%i:%i waits for 7pm TOMORROW', (h, m) => {
    const t = at(h, m);
    expect(withinQuietHours(t)).toBe(false);
    const next = deferToMorning(t);
    expect(melHour(next)).toBe(19);
    expect(melDay(next)).toBe(melDay(t) + 1);
  });
});

it('the deferred time is 7pm in MELBOURNE, not on the server', () => {
  // The old implementation added hours to the server clock, which on Vercel is
  // UTC: "7pm" would have been 5am in Melbourne, every time.
  for (let h = 0; h < 24; h++) {
    const next = deferToMorning(at(h));
    if (withinQuietHours(at(h))) continue;
    expect(melHour(next)).toBe(19);
  }
});

it('a follow-up is never deferred to more than a day away', () => {
  for (let h = 0; h < 24; h++) {
    const t = at(h);
    if (withinQuietHours(t)) continue;
    expect(deferToMorning(t).getTime() - t.getTime()).toBeLessThanOrEqual(25 * 3600e3);
  }
});
