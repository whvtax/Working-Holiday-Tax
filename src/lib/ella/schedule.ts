// Posting slots in local time (Sydney by default), daylight saving included.
import type { Slot } from './config'

/** Offset in minutes of a time zone at a given instant (e.g. +660 for AEDT). */
export function tzOffsetMinutes(tz: string, at: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(at)
  const get = (t: string) => Number(parts.find(p => p.type === t)?.value)
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'))
  return Math.round((asUtc - at.getTime()) / 60000)
}

/** The instant of local date (y, m, d) at hh:mm in a time zone. */
export function zonedTime(tz: string, y: number, m: number, d: number, hh: number, mm: number): Date {
  const guess = new Date(Date.UTC(y, m - 1, d, hh, mm))
  let t = new Date(guess.getTime() - tzOffsetMinutes(tz, guess) * 60000)
  t = new Date(guess.getTime() - tzOffsetMinutes(tz, t) * 60000)   // second pass settles DST edges
  return t
}

/** Local calendar date parts of an instant. */
export function localDate(tz: string, at: Date) {
  const f = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).formatToParts(at)
  const get = (t: string) => f.find(p => p.type === t)?.value ?? ''
  const dows = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return { y: Number(get('year')), m: Number(get('month')), d: Number(get('day')), dow: dows.indexOf(get('weekday')) }
}

/** Upcoming slot instants after `from`, in order. */
export function upcomingSlots(tz: string, slots: readonly Slot[], from: Date, count: number): Date[] {
  const out: Date[] = []
  for (let day = 0; day < 60 && out.length < count * 4; day++) {
    const at = new Date(from.getTime() + day * 86400000)
    const { y, m, d, dow } = localDate(tz, at)
    for (const s of slots) {
      if (s.dow !== dow) continue
      const [hh, mm] = s.time.split(':').map(Number)
      const t = zonedTime(tz, y, m, d, hh, mm)
      if (t.getTime() > from.getTime()) out.push(t)
    }
  }
  return [...new Set(out.map(t => t.getTime()))].sort((a, b) => a - b).slice(0, count).map(t => new Date(t))
}

/** First slot at least `leadMin` minutes away that no other post already holds. */
export function nextFreeSlot(tz: string, slots: readonly Slot[], now: Date, taken: readonly string[], leadMin = 30): Date {
  const busy = new Set(taken.map(t => new Date(t).getTime()))
  const from = new Date(now.getTime() + leadMin * 60000)
  for (const t of upcomingSlots(tz, slots, from, 40)) if (!busy.has(t.getTime())) return t
  throw new Error('No free posting slot in the next weeks')
}

/** Start of the current calendar month in the zone, as an instant. */
export function monthStart(tz: string, now: Date): Date {
  const { y, m } = localDate(tz, now)
  return zonedTime(tz, y, m, 1, 0, 0)
}
