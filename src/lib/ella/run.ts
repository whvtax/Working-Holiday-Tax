// Ella end to end. One scheduler run (tick) every 10 minutes does, in order:
//   1. TikTok token refresh            5. paid promotion: watch and stop, propose
//   2. publish posts that are due      6. finish one video in production
//   3. read numbers for live posts     7. draw a new blog and write its script,
//   4. follower count (daily)             when fewer videos are ready than needed
// Every part is guarded on its own: one failing never blocks the others.
// Nothing reaches the public without Jo approving the video in Atlas, and no
// promotion spends money without Jo approving it.
import { LIMITS } from './script/rules'
import type { ProductionDetail } from './store'
import type { JoEdit } from './video/produce'
import { shotOf } from './script/types'
import type { AccountLive } from './store'
import { finishCaption } from './script/captions'
import { randomUUID } from 'node:crypto'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { DEFAULT_CONFIG, mergeConfig, checkConfig, type EllaConfig } from './config'
import { adStopReason, promotionCandidates } from './learn'
import type { SourceArticle } from './library'
import { InstagramPublisher, MetaAds, publishFacebookVideo, type MetaGraph } from './publish/meta'
import { TikTokClient, tiktokRefresh, type TikTokTokens } from './publish/tiktok'
import { monthStart, nextFreeSlot } from './schedule'
import type { Llm } from './script/llm'
import type { ScriptDraft } from './script/types'
import { open, seal } from './secrets'
import { continueStudio, runStage1, studioKey } from './stage1'
import type { StudioState } from './script/studio'
import type { EllaRepo, Platform, Post, ProductionStatus } from './store'
import type { VideoProvider } from './video/heygen'
import type { Downloader, MediaStore } from './video/media'
import { ellaAssetsDir } from './video/paths'
import { coverPathFor, produceVideo, regenerateScene, type ProduceSettings } from './video/produce'
import type { VisionReviewer } from './video/qa'
import { STOP_AT_KEY, stopped } from './stop'
import { trace } from './trace'

export interface EllaServices {
  repo: EllaRepo
  media: MediaStore
  library: () => readonly SourceArticle[]
  bible: string
  llm: () => Llm
  video: () => VideoProvider
  vision: () => VisionReviewer | undefined
  coverDesigner?: () => import('./video/cover').CoverDesigner | undefined
  meta: () => MetaGraph
  tiktok: (accessToken: string) => TikTokClient
  refreshTikTok?: (refreshToken: string) => Promise<TikTokTokens>
  download?: Downloader
  sleep?: (ms: number) => Promise<void>
  now: () => Date
  workDir: string
  /** Seconds to wait on a video job inside one run before leaving it for the next run. */
  pollSeconds?: number
}

export interface TickReport {
  ran: boolean
  steps: Array<{ step: string; ok: boolean; detail: string }>
  /** True when a script or video is still in progress and another run will carry it on. */
  more?: boolean
}

/** What one run does: everything (the schedule), or one stage that Jo started from the board. */
export interface TickOpts {
  force?: boolean
  only?: 'script' | 'video'
  productionId?: string
  /** With only "script": draw a new blog when no script is in progress. */
  newScript?: boolean
}

const ACTOR = 'ella'
export const STATUSES_IN_PIPELINE: ProductionStatus[] = ['drawn', 'scripting', 'script_ready', 'needs_jo', 'approved', 'producing', 'video_ready', 'video_needs_jo']

export async function loadConfig(repo: EllaRepo): Promise<EllaConfig> {
  const s = await repo.settings(['config'])
  const cfg = mergeConfig(s.config ?? {}, DEFAULT_CONFIG)
  // Account IDs may also come from Vercel (ELLA_IG_USER_ID, ELLA_FB_PAGE_ID, ELLA_AD_ACCOUNT_ID). Values saved in Settings win; env fills only the blanks.
  // Settings that were removed from the screen are decided in code: the code value always wins over an old saved one (budgets excepted, see below).
  // The voice id and account ids stay as saved (voice id is kept in the database; account ids come from Settings or Vercel).
  cfg.slots = DEFAULT_CONFIG.slots
  // Budgets stay as saved (the monthly amount Jo funds); the code default applies only when nothing is saved.
  cfg.allowPrice = DEFAULT_CONFIG.allowPrice
  // Jo (Nov 22): the pipeline is one piece of work. A script that passes goes to the video, and a video that passes
  // every check goes to Ready to post. Nothing waits on a switch, so the code value always wins.
  cfg.autoApproveVideo = true
  cfg.music = DEFAULT_CONFIG.music
  cfg.handles = DEFAULT_CONFIG.handles
  cfg.instagram = { ...cfg.instagram, enabled: DEFAULT_CONFIG.instagram.enabled, mode: DEFAULT_CONFIG.instagram.mode, trialReels: DEFAULT_CONFIG.instagram.trialReels, aiLabel: DEFAULT_CONFIG.instagram.aiLabel }
  cfg.tiktok = { ...cfg.tiktok, enabled: DEFAULT_CONFIG.tiktok.enabled, mode: DEFAULT_CONFIG.tiktok.mode, aiLabel: DEFAULT_CONFIG.tiktok.aiLabel }
  cfg.ids = {
    ...cfg.ids,
    igUserId: cfg.ids.igUserId || process.env.ELLA_IG_USER_ID?.trim() || '',
    fbPageId: cfg.ids.fbPageId || process.env.ELLA_FB_PAGE_ID?.trim() || '',
    adAccountId: cfg.ids.adAccountId || (process.env.ELLA_AD_ACCOUNT_ID?.trim().replace(/^act_/, '') ?? ''),
  }
  return cfg
}

// ── TikTok tokens (sealed in ella_settings) ────────────────────────────────
export async function tiktokTokens(svc: EllaServices): Promise<TikTokTokens | null> {
  const s = await svc.repo.settings(['tiktok_tokens'])
  const sealed = (s.tiktok_tokens as { sealed?: string } | undefined)?.sealed
  return sealed ? open<TikTokTokens>(sealed) : null
}
export async function saveTikTokTokens(svc: EllaServices, t: TikTokTokens) {
  await svc.repo.setSettings({ tiktok_tokens: { sealed: seal(t), savedAt: svc.now().toISOString() } })
}

// ── The scheduler run ─────────────────────────────────────────────────────
/** One run of the scheduler or of a button; written to the Log tab (Jo, Nov 22). */
export async function tick(svc: EllaServices, opts: TickOpts = {}): Promise<TickReport> {
  const t0 = Date.now()
  await trace(svc.repo, 'tick', 'tick:start', { opts: opts as unknown as Record<string, unknown> })
  try {
    const report = await tickRun(svc, opts)
    await trace(svc.repo, 'tick', 'tick:end', { ran: report.ran, more: report.more ?? false, ms: Date.now() - t0, steps: report.steps as unknown as Record<string, unknown>[] })
    return report
  } catch (e) {
    await trace(svc.repo, 'tick', 'tick:error', { error: String((e as Error)?.message ?? e).slice(0, 500), ms: Date.now() - t0 })
    throw e
  }
}

async function tickRun(svc: EllaServices, opts: TickOpts): Promise<TickReport> {
  const owner = randomUUID()
  const report: TickReport = { ran: false, steps: [] }
  // Another run holds the lock: the work is going on, so the browser keeps waiting.
  if (!(await svc.repo.lock('tick', owner, RUN_SECONDS + 60))) return { ran: false, more: true, steps: [{ step: 'lock', ok: true, detail: 'Another run is working' }] }
  try {
    const cfg = await loadConfig(svc.repo)
    report.ran = true
    const t0 = Date.now()
    await resetOnce(svc)
    const part = async (step: string, fn: () => Promise<string>) => {
      try { report.steps.push({ step, ok: true, detail: await fn() }) } catch (e) {
        const detail = String((e as Error)?.message ?? e).slice(0, 500)
        report.steps.push({ step, ok: false, detail })
        await svc.repo.audit(ACTOR, 'tick_error', { step, error: detail }).catch(() => {})
        // Every failure shows on Jo's screen until he clears it, in plain words.
        await svc.repo.raiseAlert('error', `error:${step}:${new Date().toISOString().slice(0, 13)}`, explainError(step, detail)).catch(() => {})
      }
    }
    const more = (detail: string) => { if (/^(Script in progress|Waiting on scenes|Retrying|Video next|Left for|Waiting for)/.test(detail)) report.more = true; return detail }
    // Stopped by Jo: scheduled runs start nothing until Jo presses Start.
    const halted = !opts.force && (await stopped(svc.repo, Date.now()))
    if ((!cfg.enabled || halted) && !opts.force) {
      // Manual: start nothing new, but finish what Jo already started, post what he approved and read the numbers.
      await part('tiktok_token', () => refreshTikTokIfNeeded(svc, cfg))
      await part('publish', () => publishDue(svc, cfg))
      await part('metrics', () => collectMetrics(svc))
      await part('followers', () => recordFollowers(svc, cfg))
      await part('accounts', () => refreshAccounts(svc, cfg))
      await part('draw', async () => more((await continueScripts(svc, cfg, t0 + WORK_MS)) ?? 'Ella is switched off'))
      // Jo, Nov 22: Start is the approval to spend. A script approved by a Start goes on to its video here too, even when
      // the browser loop has ended (the scheduler finished the script). Before, only a video already in production went on,
      // so a finished script waited forever with "Ella is switched off". After a Stop, nothing new starts.
      // A run that already spent its time on the script leaves the video to the next run (the server limit is 800 s).
      await part('produce', async () => more(((await svc.repo.productionsIn(['producing'])).length || (!halted && (await svc.repo.productionsIn(['approved'])).length))
        ? (Date.now() - t0 > 60_000 ? 'Left for the next run (time budget)' : await produceNext(svc, cfg)) : halted ? 'Stopped: press Start to go on' : 'Ella is switched off'))
      await part('cleanup', () => cleanupMedia(svc))
    } else if (opts.only === 'video') {
      await part('produce', async () => more(await produceNext(svc, cfg, opts.productionId)))
    } else if (opts.only === 'script') {
      await part('draw', async () => more(await scriptRun(svc, cfg, t0 + WORK_MS, { productionId: opts.productionId, fresh: !!opts.newScript })))
    } else {
      await part('tiktok_token', () => refreshTikTokIfNeeded(svc, cfg))
      await part('publish', () => publishDue(svc, cfg))
      await part('metrics', () => collectMetrics(svc))
      await part('followers', () => recordFollowers(svc, cfg))
      await part('ads', () => manageAds(svc, cfg))
      await part('accounts', () => refreshAccounts(svc, cfg))
      await part('cleanup', () => cleanupMedia(svc))
      await part('produce', async () => more(await produceNext(svc, cfg)))
      // Vercel stops a run at 300 s. Writing a script takes a few minutes in stages, so it waits for the next run
      // when this one has already spent its time making a video.
      await part('draw', async () => more(Date.now() - t0 > WORK_MS / 2 ? 'Left for the next run (time budget)' : await drawIfNeeded(svc, cfg, t0 + WORK_MS)))
    }
    // Only runs with a problem are logged: a log entry every 5 minutes would push Ella's real work out of view.
    if (report.steps.some(x => !x.ok)) await svc.repo.audit(ACTOR, 'tick', { steps: report.steps.map(s => `${s.step}:${s.ok ? 'ok' : 'error'}`) }).catch(() => {})
    return report
  } finally {
    await svc.repo.unlock('tick', owner).catch(() => {})
  }
}

/** What went wrong and what Jo can do, in plain words (the raw error follows for Claude). */
export function explainError(step: string, detail: string): string {
  const what: Record<string, string> = {
    draw: 'Writing a script failed', produce: 'Making a video failed', publish: 'Posting failed', metrics: 'Reading post numbers failed',
    followers: 'Reading follower numbers failed', ads: 'Managing a promotion failed', tiktok_token: 'The TikTok connection failed',
  }
  const hint = /ANTHROPIC|anthropic|Model call failed: HTTP 401/.test(detail) ? 'Check ANTHROPIC_API_KEY in Vercel.'
    : /HEYGEN|HeyGen.*HTTP 401|Missing ELLA_HEYGEN/.test(detail) ? 'Check ELLA_HEYGEN_API_KEY in Vercel.'
    : /HTTP 402|credit|balance|insufficient/i.test(detail) ? 'The HeyGen wallet may be empty: top it up at platform.heygen.com.'
    : /Spending cap|budget/i.test(detail) ? 'A spending cap stopped it. Check the HeyGen balance before retrying.'
    : /HTTP 429|rate limit|overloaded|HTTP 5\d\d|timeout|ECONN|fetch failed/i.test(detail) ? 'A service was busy. Ella tries again on the next run; nothing to do unless it repeats.'
    : 'Send Claude a screenshot of this message.'
  return `${what[step] ?? `Step "${step}" failed`}. ${hint} Details: ${detail}`
}

async function refreshTikTokIfNeeded(svc: EllaServices, cfg: EllaConfig) {
  if (!cfg.tiktok.enabled) return 'TikTok off'
  const t = await tiktokTokens(svc)
  if (!t) return 'TikTok not connected'
  if (t.expiresAt - svc.now().getTime() > 2 * 3600_000) return 'Token fresh'
  const fresh = await (svc.refreshTikTok ?? tiktokRefresh)(t.refreshToken)
  await saveTikTokTokens(svc, { ...fresh, openId: fresh.openId || t.openId })
  return 'Token refreshed'
}

// ── Publishing ────────────────────────────────────────────────────────────
async function videoPathFor(svc: EllaServices, productionId: string): Promise<string> {
  const p = await svc.repo.production(productionId)
  if (!p?.render) throw new Error(`No video for ${productionId}`)
  return p.render.videoPath
}

async function publishDue(svc: EllaServices, cfg: EllaConfig) {
  const due = await svc.repo.postsDue(svc.now(), 4)
  const done: string[] = []
  for (const post of due) {
    try {
      const r = post.platform === 'instagram' ? await publishInstagram(svc, cfg, post) : await publishTikTok(svc, cfg, post)
      done.push(`${post.platform}:${r}`)
      if (r === 'published') await finishIfDone(svc, post.productionId)
    } catch (e) {
      const msg = String((e as Error)?.message ?? e).slice(0, 500)
      const updated = await svc.repo.updatePost(post.id, { status: post.attempts + 1 >= 5 ? 'failed' : 'scheduled', error: msg, addAttempt: 1,
        scheduledAt: new Date(svc.now().getTime() + 20 * 60000).toISOString() })
      if (updated.status === 'failed') await svc.repo.raiseAlert('publish_failed', `publish_failed:${post.id}`, `${post.platform} post failed 5 times: ${msg}`)
      done.push(`${post.platform}:error`)
    }
  }
  return due.length ? done.join(', ') : 'Nothing due'
}

async function publishInstagram(svc: EllaServices, cfg: EllaConfig, post: Post): Promise<string> {
  if (!cfg.ids.igUserId) throw new Error('Instagram account id is not set (Atlas, Ella, Settings)')
  const ig = new InstagramPublisher(svc.meta(), cfg.ids.igUserId)
  if (!post.containerId) {
    const vp = await videoPathFor(svc, post.productionId)
    const url = await svc.media.signedUrl(vp, 3 * 3600)
    const coverUrl = vp === coverPathFor(vp) ? undefined : await svc.media.signedUrl(coverPathFor(vp), 3 * 3600).catch(() => undefined)
    const containerId = await ig.createReel({ videoUrl: url, caption: post.caption, trial: cfg.instagram.trialReels, aiLabel: cfg.instagram.aiLabel, coverUrl })
    await svc.repo.updatePost(post.id, { containerId, error: null })
    return 'uploading'
  }
  const st = await ig.containerState(post.containerId)
  if (st.state === 'IN_PROGRESS') return 'processing'
  if (st.state === 'ERROR' || st.state === 'EXPIRED') {
    // Start over with a fresh container on the next run.
    await svc.repo.resetContainer(post.id)
    throw new Error(`Instagram could not process the video: ${st.detail || st.state}`)
  }
  if (st.state === 'PUBLISHED') {
    // Already live on Instagram: record it, or the row is picked again every run.
    await svc.repo.updatePost(post.id, { status: 'published', publishedAt: svc.now().toISOString(), error: null })
    await finishIfDone(svc, post.productionId)
    return 'published'
  }
  const { mediaId, permalink } = await ig.publish(post.containerId)
  await svc.repo.updatePost(post.id, { status: 'published', providerPostId: mediaId, permalink, publishedAt: svc.now().toISOString(), error: null })
  await svc.repo.audit(ACTOR, 'published', { platform: 'instagram', postId: post.id, mediaId, permalink })
  // Same video to the Story and the Facebook Page. Best effort: a failure here is logged, the Reel stays published.
  await spreadElsewhere(svc, cfg, post, ig).catch(() => undefined)
  return 'published'
}

async function spreadElsewhere(svc: EllaServices, cfg: EllaConfig, post: Post, ig: InstagramPublisher) {
  const vp = await videoPathFor(svc, post.productionId)
  const url = await svc.media.signedUrl(vp, 3 * 3600)
  try {
    const story = await ig.createStory({ videoUrl: url })
    for (let i = 0; i < 12; i++) {
      const st = await ig.containerState(story)
      if (st.state === 'FINISHED') { await ig.publish(story); await svc.repo.audit(ACTOR, 'published', { platform: 'instagram_story', postId: post.id }); break }
      if (st.state === 'ERROR' || st.state === 'EXPIRED') throw new Error(st.detail || st.state)
      await new Promise(r => setTimeout(r, 5000))
    }
  } catch (e) { await svc.repo.audit(ACTOR, 'story_failed', { postId: post.id, error: String((e as Error).message ?? e).slice(0, 200) }) }
  if (cfg.ids.fbPageId) {
    try {
      const id = await publishFacebookVideo(svc.meta(), cfg.ids.fbPageId, { videoUrl: url, description: post.caption })
      await svc.repo.audit(ACTOR, 'published', { platform: 'facebook', postId: post.id, mediaId: id })
    } catch (e) { await svc.repo.audit(ACTOR, 'facebook_failed', { postId: post.id, error: String((e as Error).message ?? e).slice(0, 200) }) }
  }
}

async function publishTikTok(svc: EllaServices, cfg: EllaConfig, post: Post): Promise<string> {
  const t = await tiktokTokens(svc)
  if (!t) throw new Error('TikTok is not connected (Atlas, Ella, Settings, Connect TikTok)')
  const tk = svc.tiktok(t.accessToken)
  if (!post.containerId) {
    const bytes = await svc.media.get(await videoPathFor(svc, post.productionId))
    const publishId = await tk.postVideo({ bytes, caption: post.caption, publicIfAllowed: cfg.tiktok.audited, aiLabel: cfg.tiktok.aiLabel })
    await svc.repo.updatePost(post.id, { containerId: publishId, error: null })
    return 'uploading'
  }
  const st = await tk.publishStatus(post.containerId)
  if (st.status === 'FAILED') { await svc.repo.resetContainer(post.id); throw new Error(`TikTok: ${st.failReason ?? 'failed'}`) }
  if (st.status !== 'PUBLISH_COMPLETE') return 'processing'
  await svc.repo.updatePost(post.id, { status: 'published', providerPostId: st.postId ?? post.containerId,
    permalink: st.postId ? `https://www.tiktok.com/video/${st.postId}` : null, publishedAt: svc.now().toISOString(), error: null })
  await svc.repo.audit(ACTOR, 'published', { platform: 'tiktok', postId: post.id, tiktokId: st.postId })
  return 'published'
}

async function finishIfDone(svc: EllaServices, productionId: string) {
  const p = await svc.repo.production(productionId)
  if (p && p.posts.length && p.posts.every(x => ['published', 'cancelled'].includes(x.status)) && p.posts.some(x => x.status === 'published'))
    await svc.repo.setStatus(productionId, 'published')
}

// ── Numbers ───────────────────────────────────────────────────────────────
async function collectMetrics(svc: EllaServices) {
  const due = await svc.repo.metricsDue(svc.now())
  if (!due.length) return 'Nothing due'
  const cfg = await loadConfig(svc.repo)
  const tt = due.some(d => d.post.platform === 'tiktok') ? await tiktokTokens(svc).catch(() => null) : null
  let n = 0, skipped = 0
  for (const { post, checkpoint } of due.slice(0, 20)) {
    try {
      if (post.platform === 'instagram' && /^\d+$/.test(post.providerPostId ?? '') && cfg.ids.igUserId) {
        const m = await new InstagramPublisher(svc.meta(), cfg.ids.igUserId).insights(post.providerPostId!)
        await svc.repo.addMetrics({ postId: post.id, checkpoint, views: m.views, reach: m.reach, likes: m.likes, comments: m.comments,
          shares: m.shares, saves: m.saved, avgWatchMs: m.ig_reels_avg_watch_time, raw: m })
        n++
      } else if (post.platform === 'tiktok' && tt && /^\d+$/.test(post.providerPostId ?? '')) {
        const [v] = await svc.tiktok(tt.accessToken).videoStats([post.providerPostId!])
        await svc.repo.addMetrics({ postId: post.id, checkpoint, views: v?.view_count, likes: v?.like_count, comments: v?.comment_count, shares: v?.share_count, raw: v ?? { note: 'not found' } })
        n++
      } else {
        // No way to read this post (posted by hand without an API id, or account not connected): record that once.
        await svc.repo.addMetrics({ postId: post.id, checkpoint, raw: { note: 'not readable by API' } }); skipped++
      }
    } catch (e) {
      // Record the failure for this checkpoint so it is not retried every run; later checkpoints try again.
      await svc.repo.addMetrics({ postId: post.id, checkpoint, raw: { error: String((e as Error)?.message ?? e).slice(0, 300) } }); skipped++
    }
  }
  return `${n} readings saved${skipped ? `, ${skipped} not readable` : ''}`
}

/** The two live phones: each account's profile and latest posts, read every 30 minutes. */
export const ACCOUNTS_KEY = 'accounts_live'
async function refreshAccounts(svc: EllaServices, cfg: EllaConfig) {
  const prev = ((await svc.repo.settings([ACCOUNTS_KEY]))[ACCOUNTS_KEY] ?? {}) as { instagram?: AccountLive; tiktok?: AccountLive; at?: string }
  if (prev.at && svc.now().getTime() - Date.parse(prev.at) < 30 * 60_000) return 'Accounts read less than 30 minutes ago'
  const next: typeof prev = { ...prev, at: svc.now().toISOString() }
  const out: string[] = []
  if (cfg.ids.igUserId && process.env.ELLA_META_ACCESS_TOKEN) {
    try { next.instagram = await new InstagramPublisher(svc.meta(), cfg.ids.igUserId).profile(); out.push('Instagram') } catch (e) { out.push(`Instagram not read: ${String((e as Error).message ?? e).slice(0, 120)}`) }
  }
  const t = await tiktokTokens(svc).catch(() => null)
  if (t) { try { next.tiktok = await svc.tiktok(t.accessToken).profile(); out.push('TikTok') } catch (e) { out.push(`TikTok not read: ${String((e as Error).message ?? e).slice(0, 120)}`) } }
  await svc.repo.setSettings({ [ACCOUNTS_KEY]: next })
  return out.join(', ') || 'No account connected'
}

async function recordFollowers(svc: EllaServices, cfg: EllaConfig) {
  const day = svc.now().toISOString().slice(0, 10)
  const s = await svc.repo.settings(['followers_day'])
  if (s.followers_day === day) return 'Already counted today'
  const out: string[] = []
  if (cfg.instagram.enabled && cfg.ids.igUserId && process.env.ELLA_META_ACCESS_TOKEN) {
    const n = await new InstagramPublisher(svc.meta(), cfg.ids.igUserId).followers()
    await svc.repo.addFollowers('instagram', day, n); out.push(`Instagram ${n}`)
  }
  const t = cfg.tiktok.enabled ? await tiktokTokens(svc) : null
  if (t) { const n = await svc.tiktok(t.accessToken).followers(); await svc.repo.addFollowers('tiktok', day, n); out.push(`TikTok ${n}`) }
  await svc.repo.setSettings({ followers_day: day })
  return out.join(', ') || 'No account connected'
}

// ── Paid promotion ────────────────────────────────────────────────────────
async function manageAds(svc: EllaServices, cfg: EllaConfig) {
  const live = await svc.repo.ads(['active'])
  const out: string[] = []
  if (live.length) {
    const ads = new MetaAds(svc.meta())
    for (const a of live) {
      let r: { spendAud: number; impressions: number; conversations: number }
      try { r = await ads.results(a.adId!) } catch (e) { out.push(`could not read ${a.id.slice(0, 8)}: ${String((e as Error)?.message ?? e).slice(0, 120)}`); continue }
      await svc.repo.updateAd(a.id, { spendAud: r.spendAud, conversations: r.conversations, impressions: r.impressions, lastCheckedAt: svc.now().toISOString() })
      const why = adStopReason({ ...a, ...r }, svc.now())
      if (why) {
        await ads.setStatus({ campaignId: a.campaignId!, adsetId: a.adsetId!, adId: a.adId! }, 'PAUSED')
        await svc.repo.updateAd(a.id, { status: 'stopped', stopReason: why })
        await svc.repo.audit(ACTOR, 'ad_stopped', { adId: a.id, why, spendAud: r.spendAud, conversations: r.conversations })
        out.push(`stopped: ${why}`)
      } else out.push(`running: ${r.spendAud.toFixed(2)} AUD, ${r.conversations} chats`)
    }
  }
  if (cfg.ads.enabled && cfg.ads.autoPropose) {
    const all = await svc.repo.ads()
    const promoted = new Set(all.map(a => a.postId))
    const open = all.filter(a => ['proposed', 'creating', 'ready_paused', 'active', 'paused'].includes(a.status))
    if (!open.some(a => a.status === 'proposed')) {
      const [best] = promotionCandidates(await svc.repo.performance(), promoted, svc.now())
      if (best) {
        await svc.repo.proposeAd({ postId: best.postId, dailyBudgetAud: cfg.ads.dailyBudgetAud, totalCapAud: cfg.ads.totalCapAud,
          maxCostPerConversationAud: cfg.ads.maxCostPerConversationAud, days: cfg.ads.days,
          reason: `One of the best recent videos (${best.reach ?? 0} reached, ${best.shares ?? 0} sends, ${best.saves ?? 0} saves)` })
        out.push('proposed a promotion for Jo')
      }
    }
  }
  return out.join('; ') || 'No promotions'
}

/** Month spend on promotions, counting the full cap of everything that can still spend. */
export async function adsCommittedThisMonth(svc: EllaServices, cfg: EllaConfig): Promise<number> {
  const since = monthStart(cfg.timezone, svc.now())
  const all = await svc.repo.ads()
  return all.filter(a => new Date(a.createdAt) >= since || ['ready_paused', 'active', 'paused'].includes(a.status))
    .reduce((t, a) => t + (['ready_paused', 'active', 'paused', 'creating'].includes(a.status) ? a.totalCapAud : a.spendAud), 0)
}

// ── Video production ──────────────────────────────────────────────────────
async function ensureLook(svc: EllaServices, path: string) {
  try { await svc.media.get(path) } catch {
    await svc.media.put(path, new Uint8Array(await readFile(join(ellaAssetsDir(), 'character', 'ella-master.png'))))
  }
}

export function produceSettings(svc: EllaServices, cfg: EllaConfig, p: { id: string; scriptVersion: number; script: ScriptDraft }): ProduceSettings {
  const look = cfg.ellaLooks.find(l => l.id === p.script.ellaLook) ?? cfg.ellaLooks[0]
  return {
    productionId: p.id, scriptVersion: p.scriptVersion, script: p.script, voiceId: cfg.voiceId, lookImagePath: look.path,
    // Jo: no money limit in code. The HeyGen balance is the only budget; HeyGen itself refuses when it is empty.
    maxUsd: Number.POSITIVE_INFINITY, workDir: join(svc.workDir, p.id), music: cfg.music !== false, minSeconds: cfg.strictScripts ? undefined : 0, pollEveryMs: 5000,
    pollTimeoutMs: (svc.pollSeconds ?? 20) * 1000,
  }
}

function produceDeps(svc: EllaServices) {
  return { store: svc.repo, steps: svc.repo, provider: svc.video(), media: svc.media, vision: svc.vision(), coverDesigner: svc.coverDesigner?.(), download: svc.download, sleep: svc.sleep, stopped: (since: number) => stopped(svc.repo, since) }
}

/** Each run may last this long on Vercel Pro (route maxDuration 800). */
export const RUN_SECONDS = 780
/** Script and video work stop starting new steps after this, leaving time to save. */
const WORK_MS = 720_000

async function produceNext(svc: EllaServices, cfg: EllaConfig, productionId?: string) {
  const inProgress = await svc.repo.productionsIn(['producing'])
  // Money is only spent on a script Jo approved (the old "make it as soon as it passes" switch is retired).
  const ready = await svc.repo.productionsIn(['approved'])
  const next = productionId ? [...inProgress, ...ready].find(p => p.id === productionId) : (inProgress[0] ?? ready[0])
  if (!next) return productionId ? 'This video is not approved for production' : 'Nothing to make'
  // One video at a time (Jo, Nov 22): a second video waits until the one in production is finished.
  const active = inProgress[0]
  if (active && active.id !== next.id) return `Waiting for ${active.slug} to finish (one video at a time)`
  if (!cfg.voiceId) {
    await svc.repo.raiseAlert('setup', 'setup:voice', "Choose Ella's voice (Atlas, Ella, Settings) before videos can be made.")
    return 'No voice chosen'
  }
  if (inProgress.length && svc.now().getTime() - new Date(next.updatedAt).getTime() > 6 * 3600_000)
    await svc.repo.raiseAlert('stuck', `stuck:${next.id}`, `A video has been in production for over 6 hours (${next.slug}). HeyGen may be slow; check the HeyGen dashboard.`)
  const p = await svc.repo.production(next.id)
  if (!p?.script) throw new Error(`No script for ${next.id}`)
  const s = produceSettings(svc, cfg, { id: p.id, scriptVersion: p.script.version, script: p.script.script as ScriptDraft })
  const edit = (await svc.repo.settings([editKey(p.id)]))[editKey(p.id)] as JoEdit | null | undefined
  if (edit) s.edit = edit
  await ensureLook(svc, s.lookImagePath)
  // HeyGen takes minutes per step. Wait for it inside this run (checking every 20 s, up to about 4 minutes),
  // instead of waiting for the next scheduled run; finished steps are saved, so nothing is paid twice.
  const deps = produceDeps(svc)
  const pause = deps.sleep ?? ((ms: number) => new Promise<void>(ok => setTimeout(ok, ms)))
  // One clock for the whole server request (the limit is 800 s): stop waiting in good time and let the next run go on.
  s.startedAt = Date.now()
  let r = await produceVideo(deps, s)
  for (let check = 0; check < 12 && r.status === 'producing' && Date.now() - s.startedAt < 480_000; check++) {
    await pause(10_000)
    r = await produceVideo(deps, s)
  }
  if (r.status === 'stopped') return 'Stopped'
  if (r.status === 'too_short') return lengthenScript(svc, p, r.seconds, r.wpm)
  if (r.status === 'producing') return `Waiting on scenes ${r.waitingOn.join(', ')}`
  if (r.status === 'failed') throw new Error(`Video "${p.title ?? p.slug}" stopped: ${r.error}. Open Stage 2 to try again or cancel.`)
  if (r.status === 'video_ready') {
    // Every check passed: straight to Ready to post, so the pipeline ends there.
    const ok = await act(svc, { kind: 'approve_video', productionId: p.id })
    if (ok.ok) return `Approved automatically (${r.duration}s, ${r.spentUsd} USD)`
  }
  if (r.status === 'video_ready' || r.status === 'video_needs_jo')
    await svc.repo.raiseAlert('review', `review:${p.id}:${r.renderVersion}`, `A new video is ready for your review: ${p.title ?? p.slug}`)
  return `${r.status} (${r.duration}s, ${r.spentUsd} USD)`
}

// ── Drawing new blogs and writing scripts ─────────────────────────────────
function studioDeps(svc: EllaServices) {
  // The time budget is measured on the real clock, like the tick's own deadline.
  return { store: svc.repo, library: svc.library(), llm: svc.llm() }
}

async function stage1Settings(svc: EllaServices, cfg: EllaConfig, deadline?: number) {
  const startedAt = Date.now()
  return {
    bible: svc.bible, ellaLooks: cfg.ellaLooks.map(l => l.id), agentSignoffConfirmed: cfg.agentSignoffConfirmed,
    // Jo: lessons are not applied by themselves; they go into the learning report and Claude changes the code from it.
    allowPrice: cfg.allowPrice, learnings: '', actor: ACTOR, deadline, stopped: () => stopped(svc.repo, startedAt),
    wpm: cfg.strictScripts ? Number((await svc.repo.settings(['voice_wpm'])).voice_wpm) || LIMITS.defaultWpm : undefined,
  }
}

async function scriptDone(svc: EllaServices, out: Awaited<ReturnType<typeof runStage1>>) {
  if (out.status === 'stopped') return 'Stopped'
  if (out.status === 'library_empty') return 'Content library used up'
  if (out.status === 'scripting') return `Script in progress: ${out.slug} (next: ${out.phase})`
  if (out.status === 'gave_up') {
    await svc.repo.raiseAlert('error', `gave_up:${out.productionId}`, `Script writing kept failing the checks for "${out.slug}" (${out.reason}). The blog stays claimed, so it is not drawn again by itself. To draw it again, press Start over or release it, and send Claude a screenshot if it keeps happening.`)
    return `Gave up on ${out.slug}`
  }
  if (out.status === 'needs_jo')
    await svc.repo.raiseAlert('review', `script:${out.productionId}`, `A script did not pass every check and needs your decision: ${out.slug}`)
  // Automatic mode: a script that passed every rule goes straight on to the video. A script that did not pass never does.
  if (out.status === 'script_ready') {
    const ok = await act(svc, { kind: 'approve_script', productionId: out.productionId })
    // The video follows in the same Start: the next pass of the run makes it.
    if (ok.ok) return `Video next: ${out.productionId} (${out.slug})`
  }
  return `${out.status}: ${out.slug}`
}

/** Housekeeping before any script work; then carries on one script in progress, if there is one. */
async function continueScripts(svc: EllaServices, cfg: EllaConfig, deadline?: number, productionId?: string): Promise<string | null> {
  // Once: blogs of videos cancelled before this rule existed go back into the draw.
  const flags = await svc.repo.settings(['released_cancelled_v1'])
  if (!flags.released_cancelled_v1) {
    for (const p of await svc.repo.productionsIn(['cancelled'])) await svc.repo.releaseSlug(p.slug, ACTOR)
    await svc.repo.setSettings({ released_cancelled_v1: true })
  }
  // A script in the studio carries on where it stopped. One without saved work (cut off before the
  // first stage was saved) is cancelled after 6 minutes and its blog goes back into the draw.
  for (const p of await svc.repo.productionsIn(['drawn', 'scripting'])) {
    if (productionId && p.id !== productionId) continue
    const saved = (await svc.repo.settings([studioKey(p.id)]))[studioKey(p.id)] as StudioState | null | undefined
    if (saved && saved.phase !== 'done') return scriptDone(svc, await continueStudio(studioDeps(svc), saved, await stage1Settings(svc, cfg, deadline)))
    if (svc.now().getTime() - new Date(p.updatedAt).getTime() > 6 * 60000) {
      await svc.repo.setStatus(p.id, 'cancelled', { note: 'Script writing stopped part way; blog returned to the draw' })
      await svc.repo.releaseSlug(p.slug, ACTOR)
    }
  }
  return null
}

/** Jo's "Write a new script" and "Continue": carries on a script in progress, or draws a new blog when asked. */
async function scriptRun(svc: EllaServices, cfg: EllaConfig, deadline: number, o: { productionId?: string; fresh: boolean }) {
  // A new script is drawn even while another is still being written, so Jo can prepare several ahead;
  // the cron keeps working on every script in progress.
  // ('-' matches no script: the housekeeping still runs, but no other script is continued first.)
  const carried = await continueScripts(svc, cfg, deadline, o.fresh && !o.productionId ? '-' : o.productionId)
  if (carried) return carried
  if (!o.fresh) return 'No script in progress'
  return scriptDone(svc, await runStage1(studioDeps(svc), await stage1Settings(svc, cfg, deadline)))
}

/**
 * Jo, Nov 21: start again from zero. Once, on the first run after this
 * deploy: every script and video not yet posted is cancelled, its blog goes
 * back into the draw, saved studio work is dropped and open alerts are
 * cleared. Money already spent stays in the spend history.
 */
export const RESET_FLAG = 'reset_nov21_v2' // Jo asked twice to start from zero; v2 runs once on the next deploy
export async function resetOnce(svc: EllaServices) {
  const flags = await svc.repo.settings([RESET_FLAG])
  if (flags[RESET_FLAG]) return false
  const open = await svc.repo.productionsIn(['drawn', 'scripting', 'script_ready', 'needs_jo', 'approved', 'producing', 'video_ready', 'video_needs_jo', 'scheduled'])
  for (const p of open) {
    const d = await svc.repo.production(p.id)
    for (const post of d?.posts ?? []) if (['scheduled', 'manual_ready', 'failed'].includes(post.status)) await svc.repo.updatePost(post.id, { status: 'cancelled' })
    await svc.repo.setStatus(p.id, 'cancelled', { note: 'Fresh start (Jo, Nov 21)' })
    await svc.repo.releaseSlug(p.slug, ACTOR)
    await svc.repo.setSettings({ [studioKey(p.id)]: null })
  }
  for (const a of (await svc.repo.dashboard()).alerts ?? []) await svc.repo.resolveAlert(a.id)
  await svc.repo.setSettings({ [RESET_FLAG]: true, released_cancelled_v1: true })
  await svc.repo.audit(ACTOR, 'fresh_start', { cancelled: open.length })
  return true
}

const editKey = (id: string) => `video_edit:${id}`

/**
 * The real voice came out under 30 seconds: nothing after the voice was paid
 * for. The script goes back into the studio with the real speed and a clear
 * fix ("add about N words"); when it is clean again it returns to Stage 1.
 */
async function lengthenScript(svc: EllaServices, p: ProductionDetail, seconds: number, wpm: number | null) {
  const st = (await svc.repo.settings([studioKey(p.id)]))[studioKey(p.id)] as StudioState | null | undefined
  const rate = wpm ?? LIMITS.defaultWpm
  const add = Math.max(10, Math.ceil(((32 - seconds) * rate) / 60))
  if (!st?.drafts?.length) {
    await svc.repo.setStatus(p.id, 'cancelled', { note: `The voice ran ${seconds} s, under 30 s, and there was no saved script work to lengthen` })
    await svc.repo.releaseSlug(p.slug, ACTOR)
    await svc.repo.raiseAlert('error', `short:${p.id}`, `A video came out ${seconds} s long and could not be lengthened; the blog went back into the draw. Send Claude a screenshot.`)
    return `Too short (${seconds} s); cancelled`
  }
  const message = `The real voice runs ${seconds} s at ${rate} words per minute; it must be at least 30 s. Add about ${add} words of real content to the same one message (never padding, never a second topic), and set the scene times at ${rate} words per minute.`
  st.ctx = { ...st.ctx, wpm: rate, minSeconds: LIMITS.minSeconds, hookQuestion: true }
  st.drafts[0] = { ...st.drafts[0], issues: [{ code: 'time.short', message }, ...st.drafts[0].issues.filter(i => i.code !== 'time.short')] }
  st.phase = 'revise'
  st.rewrites = Math.min(st.rewrites, 2)
  st.directed = false
  st.failures = 0
  st.log.push({ phase: 'revise', at: svc.now().toISOString(), seconds: 0, ok: false, note: `Voice too short (${seconds} s): back to the studio to add about ${add} words` })
  await svc.repo.setSettings({ [studioKey(p.id)]: st })
  await svc.repo.setStatus(p.id, 'scripting', { note: `Lengthening: the voice ran ${seconds} s` })
  return `Too short (${seconds} s): the script is being lengthened`
}

/**
 * Storage housekeeping (Jo, Nov 21). After a video is posted, its raw
 * materials (voice, Ella's take, AI clips, music, earlier versions) are
 * deleted; the posted video and its cover image are kept. A cancelled video
 * is deleted completely. Each production is cleaned once.
 */
export const cleanedKey = (id: string) => `media_cleaned:${id}`
export async function cleanupMedia(svc: EllaServices, max = 10): Promise<string> {
  if (!svc.media.list || !svc.media.remove) return 'Storage cleanup not available'
  const done = await svc.repo.productionsIn(['published', 'cancelled'])
  if (!done.length) return 'Nothing to clean'
  const flags = await svc.repo.settings(done.map(p => cleanedKey(p.id)))
  const todo = done.filter(p => !flags[cleanedKey(p.id)]).slice(0, max)
  let files = 0
  for (const p of todo) {
    const d = await svc.repo.production(p.id)
    if (!d) continue
    // Wait until nothing for it is still to be posted.
    if (d.posts.some(x => ['scheduled', 'publishing', 'manual_ready'].includes(x.status))) continue
    const keep = new Set<string>()
    if (d.status === 'published') {
      const posted = (await svc.repo.posts()).filter(x => x.productionId === p.id && x.status === 'published' && x.videoPath)
      for (const x of posted) { keep.add(x.videoPath!); keep.add(coverPathFor(x.videoPath!)) }
      if (!keep.size && d.render) { keep.add(d.render.videoPath); keep.add(coverPathFor(d.render.videoPath)) }
    }
    const all = await svc.media.list(`productions/${p.id}`)
    const gone = all.filter(f => !keep.has(f))
    if (gone.length) await svc.media.remove(gone)
    files += gone.length
    await svc.repo.setSettings({ [cleanedKey(p.id)]: true })
  }
  return `Cleaned ${todo.length} video${todo.length === 1 ? '' : 's'}, ${files} raw file${files === 1 ? '' : 's'} deleted`
}

/** The schedule: keeps enough scripts and videos in the pipeline. */
async function drawIfNeeded(svc: EllaServices, cfg: EllaConfig, deadline?: number) {
  const carried = await continueScripts(svc, cfg, deadline)
  if (carried) return carried
  const pipeline = await svc.repo.productionsIn([...STATUSES_IN_PIPELINE, 'scheduled'])
  const scheduledPosts = (await svc.repo.posts({ statuses: ['scheduled'] })).length
  const ahead = pipeline.length
  if (ahead >= cfg.bufferAhead + Math.min(scheduledPosts, 1)) return `${ahead} in the pipeline, enough`
  return scriptDone(svc, await runStage1(studioDeps(svc), await stage1Settings(svc, cfg, deadline)))
}

// ── Jo's actions from Atlas ───────────────────────────────────────────────
/** Jo, Nov 22: Stop (or Cancel) halts all running work: no new step, blog or video starts until Jo presses Start again. */
export async function stopAll(svc: EllaServices): Promise<number> {
  await svc.repo.setSettings({ [STOP_AT_KEY]: Date.now() })
  // The whole pipeline before a finished video (Jo, Nov 22): a script waiting for its video is stopped too, so the next Start begins clean.
  const running = await svc.repo.productionsIn(['drawn', 'scripting', 'script_ready', 'needs_jo', 'approved', 'producing'])
  for (const p of running) {
    await svc.repo.setStatus(p.id, 'cancelled', { note: 'Stopped by Jo' })
    await svc.repo.releaseSlug(p.slug, 'jo')
  }
  await svc.repo.audit('jo', 'stop_all', { stopped: running.map(p => p.id) }).catch(() => {})
  return running.length
}

/**
 * Jo, Nov 22: "reset everything, start from zero". Stops all work, cancels everything not yet posted
 * (its scheduled posts too), puts every blog back into the draw and clears the open alerts.
 * Published posts and their numbers are kept.
 */
export async function resetAll(svc: EllaServices): Promise<{ cancelled: number; released: number }> {
  await stopAll(svc)
  const open = await svc.repo.productionsIn(['drawn', 'scripting', 'script_ready', 'needs_jo', 'approved', 'producing', 'video_ready', 'video_needs_jo', 'scheduled'])
  for (const p of open) {
    const full = await svc.repo.production(p.id)
    for (const post of full?.posts ?? []) if (['scheduled', 'manual_ready', 'failed'].includes(post.status)) await svc.repo.updatePost(post.id, { status: 'cancelled' })
    await svc.repo.setStatus(p.id, 'cancelled', { note: 'Reset by Jo: start from zero' })
  }
  const blogs = await svc.repo.startOverBlogs('jo')
  await svc.repo.clearAlerts()
  await svc.repo.audit('jo', 'reset_all', { cancelled: open.length, released: blogs.released })
  return { cancelled: open.length, released: blogs.released }
}

export type EllaAction =
  | { kind: 'stop_all' }
  | { kind: 'reset_all' }
  | { kind: 'approve_script'; productionId: string }
  | { kind: 'cancel'; productionId: string; note?: string }
  | { kind: 'approve_video'; productionId: string; captions?: { instagram?: string; tiktok?: string }; at?: string }
  | { kind: 'redo_scene'; productionId: string; scene: number; note?: string }
  | { kind: 'retry_video'; productionId: string }
  | { kind: 'edit_video'; productionId: string; note?: string; overrides?: Array<{ scene: number; headline?: string; zoom?: number; shot?: 'ella' }> }
  | { kind: 'publish_now'; postId: string }
  | { kind: 'mark_posted'; postId: string; url: string }
  | { kind: 'approve_ad'; adId: string }
  | { kind: 'reject_ad'; adId: string }
  | { kind: 'pause_ad'; adId: string }
  | { kind: 'resume_ad'; adId: string }
  | { kind: 'save_config'; config: unknown }
  | { kind: 'resolve_alert'; alertId: number }
  | { kind: 'release_slug'; slug: string }
  | { kind: 'start_over_blogs' }

export async function act(svc: EllaServices, a: EllaAction): Promise<{ ok: true; detail?: unknown } | { ok: false; error: string }> {
  const fail = (error: string) => ({ ok: false as const, error })
  const cfg = await loadConfig(svc.repo)
  await svc.repo.audit('jo', `action:${a.kind}`, a as unknown as Record<string, unknown>)
  // A decision on a video or script clears its "waiting for you" notice.
  if ('productionId' in a && ['approve_script', 'cancel', 'approve_video', 'redo_scene', 'retry_video'].includes(a.kind)) await svc.repo.resolveReviewAlerts(a.productionId)
  switch (a.kind) {
    case 'approve_script': {
      const p = await svc.repo.production(a.productionId)
      if (!p || !['needs_jo', 'script_ready'].includes(p.status) || !p.script?.script) return fail('This script is not waiting for approval')
      await svc.repo.setStatus(p.id, 'approved', { scriptVersion: p.script.version })
      return { ok: true }
    }
    case 'stop_all': return { ok: true, detail: { stoppedRunning: await stopAll(svc) } }
    case 'reset_all': return { ok: true, detail: await resetAll(svc) }
    case 'cancel': {
      // Jo, Nov 22: Cancel stops everything, not only this video.
      await stopAll(svc)
      const p = await svc.repo.production(a.productionId)
      if (!p) return fail('This video cannot be cancelled now')
      if (p.status === 'cancelled') return { ok: true }
      if (p.status === 'published') return fail('This video cannot be cancelled now')
      for (const post of p.posts) if (['scheduled', 'manual_ready', 'failed'].includes(post.status)) await svc.repo.updatePost(post.id, { status: 'cancelled' })
      await svc.repo.setStatus(p.id, 'cancelled', { note: a.note ?? 'Cancelled by Jo' })
      // Nothing was posted, so the blog goes back into the draw.
      await svc.repo.releaseSlug(p.slug, 'jo')
      return { ok: true }
    }
    case 'approve_video': {
      const p = await svc.repo.production(a.productionId)
      if (!p || !['video_ready', 'video_needs_jo'].includes(p.status) || !p.render || !p.script) return fail('This video is not waiting for approval')
      const draft = p.script.script as ScriptDraft
      const taken = (await svc.repo.posts({ statuses: ['scheduled', 'publishing'] })).map(x => x.scheduledAt)
      const at = a.at ? new Date(a.at) : nextFreeSlot(cfg.timezone, cfg.slots, svc.now(), taken)
      if (Number.isNaN(at.getTime())) return fail('Bad time')
      const made: Platform[] = []
      if (cfg.instagram.enabled) {
        await svc.repo.upsertPost({ productionId: p.id, renderVersion: p.render.version, platform: 'instagram', mode: cfg.instagram.mode,
          status: cfg.instagram.mode === 'auto' ? 'scheduled' : 'manual_ready', scheduledAt: at.toISOString(),
          caption: finishCaption(a.captions?.instagram ?? draft.captions.instagram) })
        made.push('instagram')
      }
      if (cfg.tiktok.enabled) {
        const auto = cfg.tiktok.mode === 'auto' && cfg.tiktok.audited
        await svc.repo.upsertPost({ productionId: p.id, renderVersion: p.render.version, platform: 'tiktok', mode: auto ? 'auto' : 'manual',
          status: auto ? 'scheduled' : 'manual_ready', scheduledAt: at.toISOString(), caption: finishCaption(a.captions?.instagram ?? draft.captions.instagram) }) // Jo: same caption and hashtags everywhere
        made.push('tiktok')
      }
      if (!made.length) return fail('Both platforms are switched off in Settings')
      await svc.repo.setStatus(p.id, 'scheduled', { approvedAt: svc.now().toISOString(), renderVersion: p.render.version })
      return { ok: true, detail: { at: at.toISOString(), platforms: made } }
    }
    case 'redo_scene': {
      const p = await svc.repo.production(a.productionId)
      if (!p?.script || !p.render || !['video_ready', 'video_needs_jo'].includes(p.status)) return fail('Only a video waiting for review can be changed')
      if (!cfg.voiceId) return fail('No voice chosen')
      const s = produceSettings(svc, cfg, { id: p.id, scriptVersion: p.script.version, script: p.script.script as ScriptDraft })
      const sc = (p.script.script as ScriptDraft).scenes.find(x => x.scene === a.scene)
      if (!sc) return fail(`No scene ${a.scene}`)
      // Mark it for redo; the next scheduler run makes the new clip and renders again.
      await regenerateSceneLater(svc, s, a.scene)
      return { ok: true }
    }
    case 'edit_video': {
      const p = await svc.repo.production(a.productionId)
      if (!p?.script || !p.render || !['video_ready', 'video_needs_jo'].includes(p.status)) return fail('Only a video waiting for review can be edited')
      if (!a.note?.trim() && !a.overrides?.length) return fail('Write what to change, or change a scene')
      // Saved with the video, so every later render keeps Jo's edit. Nothing at HeyGen is made again.
      const prev = ((await svc.repo.settings([editKey(p.id)]))[editKey(p.id)] ?? {}) as JoEdit
      const merged: JoEdit = {
        note: a.note?.trim() || prev.note,
        overrides: [...(prev.overrides ?? []).filter(o => !a.overrides?.some(n => n.scene === o.scene)), ...(a.overrides ?? [])],
        at: svc.now().toISOString(),
      }
      await svc.repo.setSettings({ [editKey(p.id)]: merged })
      await svc.repo.setStatus(p.id, 'producing')
      await svc.repo.audit('jo', 'video_edit', { productionId: p.id, note: a.note ?? null, scenes: a.overrides?.map(o => o.scene) ?? [] })
      return { ok: true }
    }
    case 'retry_video': {
      const p = await svc.repo.production(a.productionId)
      if (!p?.script || p.status !== 'video_needs_jo') return fail('Only a video that stopped can be made again')
      // Failed steps are started again on the next run; finished ones are kept, so nothing is paid twice.
      await svc.repo.setStatus(p.id, 'producing')
      return { ok: true }
    }
    case 'publish_now': {
      const post = (await svc.repo.posts()).find(x => x.id === a.postId)
      if (!post || post.status !== 'scheduled') return fail('Only a scheduled post can be moved to now')
      await svc.repo.updatePost(post.id, { scheduledAt: svc.now().toISOString() })
      return { ok: true }
    }
    case 'mark_posted': {
      const post = (await svc.repo.posts()).find(x => x.id === a.postId)
      if (!post || post.status !== 'manual_ready') return fail('This post is not waiting to be posted by hand')
      const url = a.url.trim()
      const ok = post.platform === 'tiktok' ? /^https:\/\/(www\.|vm\.)?tiktok\.com\//.test(url) : /^https:\/\/(www\.)?instagram\.com\//.test(url)
      if (!ok) return fail(`That does not look like a ${post.platform} link`)
      const id = url.match(/\/video\/(\d+)/)?.[1] ?? url.match(/\/(?:reel|p)\/([^/?#]+)/)?.[1] ?? null
      await svc.repo.updatePost(post.id, { status: 'published', permalink: url, providerPostId: id ?? undefined, publishedAt: svc.now().toISOString(), error: null })
      await finishIfDone(svc, post.productionId)
      return { ok: true }
    }
    case 'approve_ad': return approveAd(svc, cfg, a.adId)
    case 'reject_ad': {
      const r = await svc.repo.updateAd(a.adId, { status: 'rejected', expectStatus: 'proposed' })
      return r ? { ok: true } : fail('This promotion is not waiting for approval')
    }
    case 'pause_ad': case 'resume_ad': {
      const ad = (await svc.repo.ads()).find(x => x.id === a.adId)
      const want = a.kind === 'pause_ad' ? 'paused' : 'active'
      if (!ad?.campaignId || !ad.adsetId || !ad.adId) return fail('This promotion is not set up in Meta yet')
      if (a.kind === 'resume_ad' && (ad.status !== 'paused' || adStopReason(ad, svc.now()))) return fail('This promotion cannot be restarted')
      if (a.kind === 'pause_ad' && ad.status !== 'active') return fail('This promotion is not running')
      await new MetaAds(svc.meta()).setStatus({ campaignId: ad.campaignId, adsetId: ad.adsetId, adId: ad.adId }, want === 'active' ? 'ACTIVE' : 'PAUSED')
      await svc.repo.updateAd(ad.id, { status: want })
      return { ok: true }
    }
    case 'save_config': {
      const next = mergeConfig(a.config, cfg)
      const problems = checkConfig(next)
      if (problems.length) return fail(problems.join('. '))
      await svc.repo.setSettings({ config: next })
      return { ok: true, detail: next }
    }
    case 'resolve_alert': await svc.repo.resolveAlert(a.alertId); return { ok: true }
    case 'start_over_blogs': {
      const r = await svc.repo.startOverBlogs('jo')
      return { ok: true, detail: r }
    }
    case 'release_slug': {
      const ok = await svc.repo.releaseSlug(a.slug, 'jo')
      return ok ? { ok: true } : fail('Only a blog whose video was cancelled can go back into the draw')
    }
  }
}

/** Supersedes one scene's clip and sets the production back to producing; the scheduler does the rest. */
async function regenerateSceneLater(svc: EllaServices, s: ProduceSettings, scene: number) {
  const sc = s.script.scenes.find(x => x.scene === scene)!
  const shot = shotOf(sc)
  // Ella's scenes come from one take; a card is drawn again for free on the next render.
  if (shot === 'ella') await svc.repo.supersede(s.productionId, s.scriptVersion, 'ella_scene', 0)
  else if (shot === 'clip') await svc.repo.supersede(s.productionId, s.scriptVersion, 'clip', scene)
  await svc.repo.setStatus(s.productionId, 'producing')
  await svc.repo.audit('jo', 'scene_redo', { productionId: s.productionId, scene })
}

/** Exposed for tests and a manual "redo now". */
export const regenerateNow = (svc: EllaServices, s: ProduceSettings, scene: number) => regenerateScene(produceDeps(svc), s, scene)

async function approveAd(svc: EllaServices, cfg: EllaConfig, adId: string) {
  const fail = (error: string) => ({ ok: false as const, error })
  if (!cfg.ads.enabled) return fail('Paid promotion is switched off in Settings')
  const { igUserId, fbPageId, adAccountId, whatsappNumber } = cfg.ids
  if (!igUserId || !fbPageId || !adAccountId || !whatsappNumber) return fail('Set the Instagram, Facebook Page, ad account and WhatsApp number in Settings first')
  const ad = (await svc.repo.ads(['proposed'])).find(x => x.id === adId)
  if (!ad || !ad.providerPostId) return fail('This promotion is not waiting for approval')
  const committed = await adsCommittedThisMonth(svc, cfg)
  if (committed + ad.totalCapAud > cfg.ads.monthlyCapAud)
    return fail(`This would pass the monthly promotion cap (${committed.toFixed(0)} of ${cfg.ads.monthlyCapAud} AUD already committed)`)
  // Claim it first so a double click cannot create two campaigns.
  const claimed = await svc.repo.updateAd(ad.id, { status: 'creating', approvedAt: svc.now().toISOString(), expectStatus: 'proposed' })
  if (!claimed) return fail('Already being set up')
  const meta = new MetaAds(svc.meta())
  try {
    const ids = await meta.createPausedBoost({
      name: `Ella ${ad.slug ?? ad.postId.slice(0, 8)} ${svc.now().toISOString().slice(0, 10)}`, adAccountId, pageId: fbPageId, igUserId,
      mediaId: ad.providerPostId, whatsappNumber, totalCapAud: ad.totalCapAud, days: ad.days,
      specialAdCategory: cfg.ads.specialAdCategory, ageMin: cfg.ads.ageMin, ageMax: cfg.ads.ageMax, now: svc.now(),
    })
    await svc.repo.updateAd(ad.id, { ...ids, status: 'ready_paused' })
    await meta.setStatus(ids, 'ACTIVE')
    await svc.repo.updateAd(ad.id, { status: 'active', startedAt: svc.now().toISOString() })
    return { ok: true as const, detail: ids }
  } catch (e) {
    const msg = String((e as Error)?.message ?? e).slice(0, 500)
    await svc.repo.updateAd(ad.id, { status: 'failed', error: msg })
    return fail(`Meta refused: ${msg}`)
  }
}
