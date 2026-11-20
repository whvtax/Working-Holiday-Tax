/** Jo, 18 Nov: the first pre-payment nudge goes 20 to 23 hours after the
 *  customer's last message (free text inside the 24h window), evening
 *  (5pm to 11pm Sydney) preferred. November in Sydney is UTC+11. */
import fs from 'fs';
import path from 'path';
import { firstNudgeRunAt } from '@/lib/will/config';

const syd = (iso: string) => new Date(`${iso}+11:00`).getTime();
const at = (lastSyd: string) => firstNudgeRunAt(new Date(syd(lastSyd)), syd(lastSyd) + 60_000);

it('wrote at 10pm: next day at 6pm, the start of the band, already evening', () => {
  expect(at('2026-11-18T22:00:00')).toBe(syd('2026-11-19T18:00:00'));
});
it('wrote at 9pm: the band starts at 5pm next day', () => {
  expect(at('2026-11-18T21:00:00')).toBe(syd('2026-11-19T17:00:00'));
});
it('wrote at 7pm: band 3pm to 6pm, the evening part starts at 5pm', () => {
  expect(at('2026-11-18T19:00:00')).toBe(syd('2026-11-19T17:00:00'));
});
it('wrote at 2pm: band 10am to 1pm, no evening, so the latest daytime moment, 1pm', () => {
  expect(at('2026-11-18T14:00:00')).toBe(syd('2026-11-19T13:00:00'));
});
it('wrote at 3am: band 11pm to 2am, 11pm counts as evening', () => {
  expect(at('2026-11-18T03:00:00')).toBe(syd('2026-11-18T23:00:00'));
});
it('wrote at 5am: band entirely at night (1am to 4am), so its end', () => {
  expect(at('2026-11-18T05:00:00')).toBe(syd('2026-11-19T04:00:00'));
});
it('never earlier than 20h or later than 23h after the last message', () => {
  for (let h = 0; h < 24; h++) {
    const last = syd(`2026-11-18T${String(h).padStart(2, '0')}:30:00`);
    const t = firstNudgeRunAt(new Date(last), last)!;
    expect(t - last).toBeGreaterThanOrEqual(20 * 3600 * 1000);
    expect(t - last).toBeLessThanOrEqual(23 * 3600 * 1000);
  }
});
it('null once the band has passed', () => {
  const last = syd('2026-11-18T10:00:00');
  expect(firstNudgeRunAt(new Date(last), last + 23.5 * 3600 * 1000)).toBeNull();
});
it('is wired into the scheduler: armed from the last message, not held for 7pm, sent as free text', () => {
  const s = fs.readFileSync(path.join(__dirname, '..', 'scheduler.ts'), 'utf8');
  expect(s).toMatch(/flow === 'prePayment' && seq === 0 && schedulerConfig\(\)\.enforceQuietHours[\s\S]{0,200}firstNudgeRunAt\(c\?\.lastCustomerMsgAt/);
  expect(s).toMatch(/if \(!withinQuietHours\(\) && !firstNudgeInWindow\)/);
  expect(s).toMatch(/params: \[firstName\], lang: langNow, fallbackToText: true \}/);
});
