// Ella's storage. Every call goes to Ella's own ella_api_* functions
// (supabase/migrations/051_ella.sql). Nothing here touches any other table.
import type { EllaDb } from './db'
import type { RegistryEntry } from './registry'
import type { Step, StepKind, StepStatus } from './video/steps'

export interface Claim { productionId: string; slug: string; pillar: string }
export interface RecentProduction { slug: string; pillar: string; keyTerm: string | null; hookType: string | null; ctaType: string | null; createdAt: string }
export type ProductionStatus =
  | 'drawn' | 'scripting' | 'script_ready' | 'needs_jo' | 'approved'
  | 'producing' | 'video_ready' | 'video_needs_jo' | 'scheduled' | 'published' | 'cancelled'

export interface StatusExtra { keyTerm?: string; hookType?: string; ctaType?: string; scriptVersion?: number; renderVersion?: number; approvedAt?: string; note?: string }

/** Stage 1 needs only this much. */
export interface EllaStore {
  syncRegistry(entries: readonly RegistryEntry[]): Promise<number>
  claimBlog(weights: Record<string, number>, skipKeyTerms: readonly string[], actor: string): Promise<Claim | null>
  releaseSlug(slug: string, actor: string): Promise<boolean>
  recentProductions(limit: number): Promise<RecentProduction[]>
  setStatus(productionId: string, status: ProductionStatus, extra?: StatusExtra): Promise<void>
  saveScript(row: { productionId: string; bibleVersion: string; script: unknown; issues: unknown; passed: boolean; attempts: number }): Promise<number>
  logUsage(row: { productionId: string | null; feature: string; model: string; inputTokens: number; outputTokens: number }): Promise<void>
  audit(actor: string, action: string, detail: Record<string, unknown>): Promise<void>
}

/** Stage 2: the paid-step ledger. */
export interface StepStore {
  current(productionId: string, scriptVersion: number, kind: StepKind, scene: number): Promise<Step | null>
  start(row: { productionId: string; scriptVersion: number; kind: StepKind; scene: number; input: Record<string, unknown> }): Promise<Step>
  update(id: string, patch: { status?: StepStatus; providerJobId?: string; output?: Record<string, unknown>; costUsd?: number; error?: string | null }): Promise<void>
  supersede(productionId: string, scriptVersion: number, kind: StepKind, scene: number): Promise<void>
  list(productionId: string, scriptVersion: number): Promise<Step[]>
  saveRender(row: { productionId: string; scriptVersion: number; videoPath: string; editPlan: unknown; captions: unknown; durationSec: number; qa: unknown; qaPassed: boolean }): Promise<number>
}

export type Platform = 'instagram' | 'tiktok'
export interface Post {
  id: string; productionId: string; renderVersion: number; platform: Platform; mode: 'auto' | 'manual'
  status: 'scheduled' | 'publishing' | 'published' | 'manual_ready' | 'failed' | 'cancelled'
  scheduledAt: string; publishedAt: string | null; caption: string; containerId: string | null
  providerPostId: string | null; permalink: string | null; attempts: number; error: string | null
}
export type AdStatus = 'proposed' | 'creating' | 'ready_paused' | 'active' | 'paused' | 'stopped' | 'failed' | 'rejected'
export interface Ad {
  id: string; postId: string; status: AdStatus; dailyBudgetAud: number; totalCapAud: number; maxCostPerConversationAud: number
  days: number; reason: string | null; campaignId: string | null; adsetId: string | null; creativeId: string | null; adId: string | null
  spendAud: number; conversations: number; impressions: number; approvedAt: string | null; startedAt: string | null
  lastCheckedAt: string | null; stopReason: string | null; error: string | null; createdAt: string
  permalink?: string | null; providerPostId?: string | null; slug?: string; title?: string | null
}
export interface ProductionRow { id: string; slug: string; pillar: string; status: ProductionStatus; scriptVersion: number | null; renderVersion: number | null; approvedAt: string | null; createdAt: string; updatedAt: string }
export interface ProductionDetail {
  id: string; slug: string; title: string | null; pillar: string; status: ProductionStatus; keyTerm: string | null
  hookType: string | null; ctaType: string | null; scriptVersion: number | null; renderVersion: number | null
  approvedAt: string | null; note: string | null; createdAt: string
  script: { version: number; script: unknown; issues: unknown[]; passed: boolean } | null
  render: { version: number; scriptVersion: number; videoPath: string; durationSec: number; qa: unknown[]; qaPassed: boolean; captions: unknown; createdAt: string } | null
  posts: Array<{ id: string; platform: Platform; mode: string; status: string; scheduledAt: string; publishedAt: string | null; permalink: string | null; error: string | null }>
  spentUsd: number
}
export interface MetricsRow { postId: string; checkpoint: string; views?: number | null; reach?: number | null; likes?: number | null; comments?: number | null; shares?: number | null; saves?: number | null; avgWatchMs?: number | null; follows?: number | null; raw?: unknown }
export interface PerformanceRow {
  postId: string; platform: Platform; publishedAt: string; permalink: string | null; slug: string; pillar: string
  hookType: string | null; ctaType: string | null; keyTerm: string | null; title: string | null; hook: string | null
  checkpoint: string | null; views: number | null; reach: number | null; likes: number | null; comments: number | null
  shares: number | null; saves: number | null; avgWatchMs: number | null; follows: number | null; durationSec: number | null
}

const num = (x: unknown) => (x == null ? null : Number(x))

export class EllaRepo implements EllaStore, StepStore {
  constructor(private db: EllaDb) {}

  // ── Stage 1 ──
  async syncRegistry(entries: readonly RegistryEntry[]) { return Number(await this.db.call('sync_registry', { entries })) }
  async claimBlog(weights: Record<string, number>, skip: readonly string[], actor: string) {
    return (await this.db.call<Claim | null>('claim_blog', { weights, skip: [...skip], actor })) ?? null
  }
  async releaseSlug(slug: string, actor: string) { return (await this.db.call<boolean>('release_slug', { slug, actor })) === true }
  async recentProductions(limit: number) { return this.db.call<RecentProduction[]>('recent_productions', { limit }) }
  async setStatus(id: string, status: ProductionStatus, extra: StatusExtra = {}) { await this.db.call('set_status', { id, status, ...extra }) }
  async saveScript(row: { productionId: string; bibleVersion: string; script: unknown; issues: unknown; passed: boolean; attempts: number }) {
    return Number(await this.db.call('save_script', row))
  }
  async logUsage(row: { productionId: string | null; feature: string; model: string; inputTokens: number; outputTokens: number }) { await this.db.call('log_usage', row) }
  async audit(actor: string, action: string, detail: Record<string, unknown>) { await this.db.call('audit', { actor, action, detail }) }
  async raiseAlert(kind: string, dedupeKey: string, message: string) { return (await this.db.call<boolean>('raise_alert', { kind, dedupeKey, message })) === true }
  async resolveAlert(id: number) { await this.db.call('resolve_alert', { id }) }
  async resolveReviewAlerts(productionId: string) { await this.db.call('resolve_alert', { productionId }) }

  // ── Stage 2 ──
  private step(s: Step | null): Step | null { return s ? { ...s, costUsd: num(s.costUsd) } : null }
  async current(productionId: string, scriptVersion: number, kind: StepKind, scene: number) {
    return this.step(await this.db.call<Step | null>('step_current', { productionId, scriptVersion, kind, scene }))
  }
  async start(row: { productionId: string; scriptVersion: number; kind: StepKind; scene: number; input: Record<string, unknown> }) {
    return this.step(await this.db.call<Step>('step_start', row))!
  }
  async update(id: string, patch: { status?: StepStatus; providerJobId?: string; output?: Record<string, unknown>; costUsd?: number; error?: string | null }) {
    await this.db.call('step_update', { id, ...patch, error: patch.error ?? null })
  }
  async supersede(productionId: string, scriptVersion: number, kind: StepKind, scene: number) {
    await this.db.call('step_supersede', { productionId, scriptVersion, kind, scene })
  }
  async list(productionId: string, scriptVersion: number) {
    return (await this.db.call<Step[]>('steps_list', { productionId, scriptVersion })).map(s => this.step(s)!)
  }
  async saveRender(row: { productionId: string; scriptVersion: number; videoPath: string; editPlan: unknown; captions: unknown; durationSec: number; qa: unknown; qaPassed: boolean }) {
    return Number(await this.db.call('save_render', row))
  }

  // ── Stage 3 ──
  async settings(keys?: string[]) { return this.db.call<Record<string, unknown>>('settings_get', keys ? { keys } : {}) }
  async setSettings(values: Record<string, unknown>) { await this.db.call('settings_set', { values }) }
  async productionsIn(statuses: ProductionStatus[]) { return this.db.call<ProductionRow[]>('productions_in', { statuses }) }
  async production(id: string) { return this.db.call<ProductionDetail | null>('production', { id }) }
  async upsertPost(row: { productionId: string; renderVersion: number; platform: Platform; mode: 'auto' | 'manual'; status?: Post['status']; scheduledAt: string; caption: string }) {
    return this.db.call<Post>('post_upsert', row)
  }
  async updatePost(id: string, patch: Partial<Pick<Post, 'status' | 'containerId' | 'providerPostId' | 'permalink' | 'publishedAt' | 'scheduledAt' | 'error'>> & { addAttempt?: number }) {
    return this.db.call<Post>('post_update', { id, ...patch })
  }
  async resetContainer(id: string) { await this.db.call('post_update', { id, clearContainer: true }) }
  async postsDue(now: Date, limit = 3) { return this.db.call<Post[]>('posts_due', { now: now.toISOString(), limit }) }
  async posts(filter: { statuses?: Post['status'][]; platform?: Platform } = {}) { return this.db.call<Array<Post & { slug: string; title: string | null; hookType: string | null; ctaType: string | null; pillar: string; videoPath: string | null }>>('posts_list', filter) }
  async metricsDue(now: Date) { return this.db.call<Array<{ post: Post; checkpoint: string }>>('metrics_due', { now: now.toISOString() }) }
  async addMetrics(row: MetricsRow) { await this.db.call('metrics_add', row as unknown as Record<string, unknown>) }
  async performance(limit = 60) {
    return (await this.db.call<PerformanceRow[]>('performance', { limit })).map(r => ({ ...r, durationSec: num(r.durationSec) }))
  }
  async addFollowers(platform: Platform, day: string, followers: number) { await this.db.call('followers_add', { platform, day, followers }) }
  private ad(a: Ad | null): Ad | null {
    return a ? { ...a, dailyBudgetAud: Number(a.dailyBudgetAud), totalCapAud: Number(a.totalCapAud), maxCostPerConversationAud: Number(a.maxCostPerConversationAud), spendAud: Number(a.spendAud) } : null
  }
  async proposeAd(row: { postId: string; dailyBudgetAud: number; totalCapAud: number; maxCostPerConversationAud: number; days: number; reason: string }) {
    return this.ad(await this.db.call<Ad | null>('ad_propose', row))
  }
  async updateAd(id: string, patch: Partial<Omit<Ad, 'id' | 'postId'>> & { expectStatus?: AdStatus }) {
    return this.ad(await this.db.call<Ad | null>('ad_update', { id, ...patch }))
  }
  async ads(statuses?: AdStatus[]) { return (await this.db.call<Ad[]>('ads_list', statuses ? { statuses } : {})).map(a => this.ad(a)!) }
  async spend(since: Date) {
    const r = await this.db.call<Record<string, unknown>>('spend', { since: since.toISOString() })
    return { videoUsdSince: Number(r.videoUsdSince), videoUsdTotal: Number(r.videoUsdTotal), adsAudSince: Number(r.adsAudSince), adsAudTotal: Number(r.adsAudTotal), aiCalls: Number(r.aiCalls) }
  }
  async dashboard() { return this.db.call<DashboardData>('dashboard', {}) }
  async lock(name: string, owner: string, staleSec = 900) { return (await this.db.call<boolean>('lock', { name, owner, staleSec })) === true }
  async unlock(name: string, owner: string) { await this.db.call('lock', { name, owner, release: true }) }
}

export interface DashboardData {
  counts: Record<string, number>
  library: { total: number; used: number }
  queue: Array<{ id: string; slug: string; title: string | null; pillar: string; status: ProductionStatus; hookType: string | null; ctaType: string | null; updatedAt: string }>
  alerts: Array<{ id: number; kind: string; message: string; createdAt: string }>
  followers: Array<{ platform: Platform; day: string; followers: number }>
  recentAudit: Array<{ at: string; actor: string; action: string; detail: Record<string, unknown> }>
}
