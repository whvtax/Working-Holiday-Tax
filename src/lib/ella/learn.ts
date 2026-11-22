// Learning from the account's own numbers.
// One score per video, weighted towards what grows a small account (sends and
// saves, then follows and comments), per person reached. Then: which hook
// types, CTAs, pillars and lengths do best. The summary goes into the next
// script prompt; the best recent Instagram videos become paid promotion
// proposals for Jo (never switched on without him).
import type { PerformanceRow } from './store'

export function videoScore(r: Pick<PerformanceRow, 'reach' | 'views' | 'shares' | 'saves' | 'comments' | 'likes' | 'follows'>): number {
  const reach = Math.max(r.reach ?? r.views ?? 0, 1)
  const points = 4 * (r.shares ?? 0) + 3 * (r.saves ?? 0) + 3 * (r.follows ?? 0) + 2 * (r.comments ?? 0) + (r.likes ?? 0)
  return Math.round((points / reach) * 1000 * 10) / 10      // points per 1,000 people reached
}

export interface GroupStat { key: string; n: number; avgScore: number; avgReach: number }

function groupBy(rows: readonly PerformanceRow[], pick: (r: PerformanceRow) => string | null): GroupStat[] {
  const m = new Map<string, { n: number; s: number; reach: number }>()
  for (const r of rows) {
    const k = pick(r)
    if (!k) continue
    const g = m.get(k) ?? { n: 0, s: 0, reach: 0 }
    g.n++; g.s += videoScore(r); g.reach += r.reach ?? r.views ?? 0
    m.set(k, g)
  }
  return [...m.entries()].map(([key, g]) => ({ key, n: g.n, avgScore: Math.round((g.s / g.n) * 10) / 10, avgReach: Math.round(g.reach / g.n) }))
    .sort((a, b) => b.avgScore - a.avgScore)
}

const lengthBand = (sec: number | null) => (sec == null ? null : sec < 25 ? 'under 25s' : sec <= 35 ? '25 to 35s' : 'over 35s')

export interface Learnings {
  videos: number
  byHook: GroupStat[]
  byCta: GroupStat[]
  byPillar: GroupStat[]
  byLength: GroupStat[]
  summary: string
}

/** Uses each video's latest numbers; needs at least 2 videos in a group to say anything about it. */
export function learn(rows: readonly PerformanceRow[], minPerGroup = 2): Learnings {
  const done = rows.filter(r => r.checkpoint && ['72h', '7d', '28d'].includes(r.checkpoint))
  const byHook = groupBy(done, r => r.hookType), byCta = groupBy(done, r => r.ctaType)
  const byPillar = groupBy(done, r => r.pillar), byLength = groupBy(done, r => lengthBand(r.durationSec))
  const lines: string[] = []
  const say = (label: string, g: GroupStat[]) => {
    const ok = g.filter(x => x.n >= minPerGroup)
    if (ok.length >= 2) lines.push(`${label}: best "${ok[0].key}" (${ok[0].avgScore} per 1k reached, ${ok[0].n} videos), weakest "${ok.at(-1)!.key}" (${ok.at(-1)!.avgScore})`)
  }
  say('Hook type', byHook); say('CTA', byCta); say('Pillar', byPillar); say('Length', byLength)
  return {
    videos: done.length, byHook, byCta, byPillar, byLength,
    summary: done.length < 6 || !lines.length ? '' : `${lines.join('. ')}. Based on ${done.length} videos; keep testing, this is directional.`,
  }
}

/** Instagram videos worth promoting: top quarter by score, real reach, 3 to 14 days old, not promoted before. */
export function promotionCandidates(rows: readonly PerformanceRow[], alreadyPromoted: ReadonlySet<string>, now: Date, minReach = 300): PerformanceRow[] {
  const ig = rows.filter(r => r.platform === 'instagram' && r.checkpoint && ['72h', '7d'].includes(r.checkpoint))
  if (ig.length < 4) return []
  const scores = ig.map(videoScore).sort((a, b) => b - a)
  const cut = scores[Math.max(0, Math.ceil(scores.length / 4) - 1)]
  return ig.filter(r => {
    const age = (now.getTime() - new Date(r.publishedAt).getTime()) / 86400000
    return videoScore(r) >= cut && (r.reach ?? 0) >= minReach && age >= 3 && age <= 14 && !alreadyPromoted.has(r.postId)
  }).sort((a, b) => videoScore(b) - videoScore(a))
}

/** Ella's own stop rules for a running promotion (Meta's lifetime budget is the hard cap behind them). */
export function adStopReason(a: { spendAud: number; conversations: number; totalCapAud: number; maxCostPerConversationAud: number; startedAt: string | null; days: number }, now: Date): string | null {
  if (a.spendAud >= a.totalCapAud) return `Reached the cap of ${a.totalCapAud} AUD`
  if (a.startedAt && now.getTime() - new Date(a.startedAt).getTime() >= a.days * 86400000) return `Ran the planned ${a.days} days`
  if (a.conversations === 0 && a.spendAud >= 2 * a.maxCostPerConversationAud)
    return `Spent ${a.spendAud.toFixed(2)} AUD with no WhatsApp chats`
  if (a.conversations > 0 && a.spendAud >= 2 * a.maxCostPerConversationAud && a.spendAud / a.conversations > a.maxCostPerConversationAud)
    return `Cost per WhatsApp chat ${(a.spendAud / a.conversations).toFixed(2)} AUD, over the ${a.maxCostPerConversationAud} AUD limit`
  return null
}

/** Posting times from the account's own numbers (Jo: code decides, reviewed each week before it goes in). */
export interface SlotProposal { ready: boolean; videos: number; proposed: Array<{ dow: number; time: string }>; lines: string[] }

const SYDNEY = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Sydney', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
const DOW: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

/** Best posting slots by average score, with at least 3 videos per slot and 12 videos overall. Otherwise the current slots stay. */
export function proposeSlots(rows: readonly PerformanceRow[], current: Array<{ dow: number; time: string }>, minVideos = 12, minPerSlot = 3): SlotProposal {
  const done = rows.filter(r => r.checkpoint && ['72h', '7d', '28d'].includes(r.checkpoint) && r.publishedAt)
  if (done.length < minVideos) return { ready: false, videos: done.length, proposed: current, lines: [`Not enough videos yet (${done.length} of ${minVideos}). The slots stay as they are.`] }
  const groups = new Map<string, { dow: number; time: string; scores: number[] }>()
  for (const r of done) {
    const parts = SYDNEY.formatToParts(new Date(r.publishedAt as string))
    const wd = parts.find(p => p.type === 'weekday')?.value ?? ''
    const hh = parts.find(p => p.type === 'hour')?.value ?? '00'
    const mm = parts.find(p => p.type === 'minute')?.value ?? '00'
    const dow = DOW[wd]
    if (dow === undefined) continue
    const time = `${hh}:${mm}`
    const key = `${dow}-${time}`
    const g = groups.get(key) ?? { dow, time, scores: [] }
    g.scores.push(videoScore(r))
    groups.set(key, g)
  }
  const ranked = [...groups.values()]
    .filter(g => g.scores.length >= minPerSlot)
    .map(g => ({ dow: g.dow, time: g.time, n: g.scores.length, avg: g.scores.reduce((a, b) => a + b, 0) / g.scores.length }))
    .sort((a, b) => b.avg - a.avg)
  const want = current.length
  const picked = ranked.slice(0, want).map(x => ({ dow: x.dow, time: x.time }))
  // Keep the current slots to fill any gap, so the plan never drops below the current weekly count.
  for (const c of current) if (picked.length < want && !picked.some(p => p.dow === c.dow && p.time === c.time)) picked.push(c)
  picked.sort((a, b) => a.dow - b.dow || a.time.localeCompare(b.time))
  const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const lines = ranked.slice(0, want).map(x => `${DAY[x.dow]} ${x.time}: ${x.avg.toFixed(1)} per 1k reached, ${x.n} videos`)
  return { ready: ranked.length > 0, videos: done.length, proposed: picked, lines: lines.length ? lines : ['No slot has enough videos yet.'] }
}
