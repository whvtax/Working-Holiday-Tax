// Everything the Ella screen in Atlas shows, gathered on the server in one go.
// The browser never sees a key or a token; only these figures.
import type { EllaConfig } from './config'
import { learn, videoScore, type Learnings } from './learn'
import { adsCommittedThisMonth, loadConfig, tiktokTokens, type EllaServices } from './run'
import { monthStart, upcomingSlots } from './schedule'
import type { Ad, DashboardData, PerformanceRow, Post, ProductionDetail } from './store'

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
    const waiting = dashboard.queue.filter(q => ['needs_jo', 'script_ready', 'video_ready', 'video_needs_jo'].includes(q.status))
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
    }
  } catch (e) {
    const msg = String((e as Error)?.message ?? e)
    const hint = /ella_api_|does not exist|schema cache/.test(msg) ? 'Ella’s tables are not set up yet: run supabase/migrations/051_ella.sql in Supabase.' : msg.slice(0, 300)
    return { ok: false, error: hint, env }
  }
}
