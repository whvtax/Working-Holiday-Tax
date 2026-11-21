// Everything the Ella screen in Atlas shows, gathered on the server in one go.
// The browser never sees a key or a token; only these figures.
import type { AccountLive } from './store'
import type { EllaConfig } from './config'
import { learn, videoScore, type Learnings } from './learn'
import { adsCommittedThisMonth, loadConfig, tiktokTokens, type EllaServices } from './run'
import { monthStart, upcomingSlots } from './schedule'
import type { Ad, DashboardData, PerformanceRow, Post, ProductionDetail } from './store'
import { studioKey } from './stage1'
import { STUDIO_STAGES_LABEL, type StudioLogEntry, type StudioState } from './script/studio'
import { shotOf, type ScriptDraft } from './script/types'

export interface EllaPageData {
  ok: true
  now: string
  config: EllaConfig
  env: Record<string, boolean>
  tiktokConnected: boolean
  dashboard: DashboardData
  reviews: ProductionDetail[]
  producing: ProductionDetail[]
  posts: Array<Post & { slug: string; title: string | null; videoPath: string | null }>
  ads: Ad[]
  performance: Array<PerformanceRow & { score: number }>
  learnings: Learnings
  money: { videoUsdMonth: number; videoUsdTotal: number; adsAudMonthCommitted: number; adsAudTotal: number }
  nextSlots: string[]
  followers: { instagram: number | null; tiktok: number | null; goal: number }
  /** The two live phones (read every 30 minutes); empty until an account is connected. */
  accounts: { instagram?: AccountLive; tiktok?: AccountLive; at?: string }
  board: Board
}

/** The production board: real progress of every script and video in the works. */
export interface Board {
  scripts: Array<{ id: string; title: string; phase: string; label: string; pct: number; stagesDone: number; stagesPlanned: number; log: StudioLogEntry[]; startedAt: string; updatedAt: string; runningSince?: string }>
  videos: Array<{ id: string; title: string; pct: number; spentUsd: number; done: number; total: number; steps: Array<{ label: string; status: 'waiting' | 'working' | 'done' | 'failed' }>; updatedAt: string }>
}

const STEP_STATUS = { pending: 'working', submitted: 'working', completed: 'done', failed: 'failed', superseded: 'waiting' } as const

export async function loadBoard(svc: EllaServices, queue: DashboardData['queue']): Promise<Board> {
  const scripts: Board['scripts'] = []
  for (const q of queue.filter(x => x.status === 'drawn' || x.status === 'scripting')) {
    const st = (await svc.repo.settings([studioKey(q.id)]))[studioKey(q.id)] as StudioState | null | undefined
    const title = q.title ?? q.slug
    if (!st) { scripts.push({ id: q.id, title, phase: 'research', label: STUDIO_STAGES_LABEL.research, pct: 2, stagesDone: 0, stagesPlanned: 7, log: [], startedAt: q.updatedAt, updatedAt: q.updatedAt }); continue }
    const stagesDone = st.log.filter(l => l.ok).length
    // research, draft A, draft B, judge, plus one fix when it is due.
    const stagesPlanned = 7 + st.rewrites + (st.phase === 'revise' ? 1 : 0)
    scripts.push({
      id: q.id, title, phase: st.phase, label: STUDIO_STAGES_LABEL[st.phase], stagesDone, stagesPlanned,
      pct: Math.min(95, Math.round((stagesDone / stagesPlanned) * 100)), log: st.log, startedAt: st.startedAt, updatedAt: st.updatedAt, runningSince: st.current?.at,
    })
  }

  const videos: Board['videos'] = []
  for (const q of queue.filter(x => x.status === 'producing' || x.status === 'approved')) {
    const p = await svc.repo.production(q.id)
    if (!p?.script) continue
    const draft = p.script.script as ScriptDraft
    const steps = q.status === 'producing' ? await svc.repo.list(p.id, p.script.version) : []
    const latest = (kind: string, scene: number) => [...steps].reverse().find(x => x.kind === kind && x.scene === scene && x.status !== 'superseded')
    // One point per stage, two words each (Jo). All AI clips are one stage.
    type St = Board['videos'][number]['steps'][number]['status']
    const one = (kind: string, scene: number): St => (latest(kind, scene) ? STEP_STATUS[latest(kind, scene)!.status] as St : 'waiting')
    const many = (xs: St[]): St => xs.some(x => x === 'failed') ? 'failed' : xs.every(x => x === 'done') ? 'done' : xs.some(x => x !== 'waiting') ? 'working' : 'waiting'
    const clipScenes = draft.scenes.filter(sc => shotOf(sc) === 'clip').map(sc => sc.scene)
    const rows: Array<{ label: string; status: St }> = [
      { label: "Ella's voice", status: one('voice', 0) },
      { label: 'Ella talking', status: one('ella_scene', 0) },
      ...(clipScenes.length ? [{ label: 'AI clips', status: many(clipScenes.map(n => one('clip', n))) }] : []),
      { label: 'Claude edit', status: one('render', 0) },
      { label: 'Quality check', status: one('qa', 0) },
    ]
    // Once every HeyGen part is in, the edit is what runs now.
    const firstOpen = rows.findIndex(r => r.status !== 'done')
    if (firstOpen >= 0 && rows[firstOpen].label === 'Claude edit' && rows[firstOpen].status === 'waiting') rows[firstOpen].status = 'working'
    const done = rows.filter(r => r.status === 'done').length
    // A step being worked on counts as half done, so the bar moves while HeyGen works.
    const pct = Math.min(99, Math.round(((done + rows.filter(r => r.status === 'working').length * 0.5) / rows.length) * 100))
    videos.push({ id: p.id, title: p.title ?? p.slug, pct, spentUsd: p.spentUsd, done, total: rows.length, steps: rows, updatedAt: q.updatedAt })
  }
  return { scripts, videos }
}
export type EllaPageResult = EllaPageData | { ok: false; error: string; env: Record<string, boolean> }

export async function loadEllaPage(svc: EllaServices, env: Record<string, boolean>): Promise<EllaPageResult> {
  try {
    const now = svc.now()
    const config = await loadConfig(svc.repo)
    const [dashboard, posts, ads, perf, spend, tt] = await Promise.all([
      svc.repo.dashboard(), svc.repo.posts(), svc.repo.ads(), svc.repo.performance(80),
      svc.repo.spend(monthStart(config.timezone, now)), tiktokTokens(svc).catch(() => null),
    ])
    // Approved scripts are loaded too, so the script library can show their hook and length.
    const waiting = dashboard.queue.filter(q => ['needs_jo', 'script_ready', 'approved', 'video_ready', 'video_needs_jo'].includes(q.status))
    const reviews = (await Promise.all(waiting.map(q => svc.repo.production(q.id)))).filter((x): x is ProductionDetail => !!x)
    const producingRows = dashboard.queue.filter(q => q.status === 'producing')
    const producing = (await Promise.all(producingRows.map(q => svc.repo.production(q.id)))).filter((x): x is ProductionDetail => !!x)
    const latest = (p: 'instagram' | 'tiktok') => [...dashboard.followers].reverse().find(f => f.platform === p)?.followers ?? null
    return {
      ok: true, now: now.toISOString(), config, env, tiktokConnected: !!tt, dashboard, reviews, producing,
      posts, ads, performance: perf.map(r => ({ ...r, score: videoScore(r) })), learnings: learn(perf),
      money: { videoUsdMonth: spend.videoUsdSince, videoUsdTotal: spend.videoUsdTotal,
        adsAudMonthCommitted: await adsCommittedThisMonth(svc, config), adsAudTotal: spend.adsAudTotal },
      nextSlots: upcomingSlots(config.timezone, config.slots, now, 6).map(d => d.toISOString()),
      followers: { instagram: latest('instagram'), tiktok: latest('tiktok'), goal: 10000 },
      accounts: ((await svc.repo.settings(['accounts_live'])).accounts_live ?? {}) as EllaPageData['accounts'],
      board: await loadBoard(svc, dashboard.queue),
    }
  } catch (e) {
    const msg = String((e as Error)?.message ?? e)
    const hint = /ella_api_|does not exist|schema cache/.test(msg) ? 'Ella’s tables are not set up yet: run supabase/migrations/051_ella.sql in Supabase.' : msg.slice(0, 300)
    return { ok: false, error: hint, env }
  }
}
