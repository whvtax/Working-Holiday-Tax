// Ella end to end. One scheduler run (tick) every 10 minutes does, in order:
//   1. TikTok token refresh            5. paid promotion: watch and stop, propose
//   2. publish posts that are due      6. finish one video in production
//   3. read numbers for live posts     7. draw a new blog and write its script,
//   4. follower count (daily)             when fewer videos are ready than needed
// Every part is guarded on its own: one failing never blocks the others.
// Nothing reaches the public without Jo approving the video in Atlas, and no
// promotion spends money without Jo approving it.
import { randomUUID } from 'node:crypto'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { DEFAULT_CONFIG, mergeConfig, checkConfig, type EllaConfig } from './config'
import { adStopReason, learn, promotionCandidates } from './learn'
import type { SourceArticle } from './library'
import { InstagramPublisher, MetaAds, type MetaGraph } from './publish/meta'
import { TikTokClient, tiktokRefresh, type TikTokTokens } from './publish/tiktok'
import { monthStart, nextFreeSlot } from './schedule'
import type { Llm } from './script/llm'
import type { ScriptDraft } from './script/types'
import { open, seal } from './secrets'
import { runStage1 } from './stage1'
import type { EllaRepo, Platform, Post, ProductionStatus } from './store'
import type { VideoProvider } from './video/heygen'
import type { Downloader, MediaStore } from './video/media'
import { ellaAssetsDir } from './video/paths'
import { produceVideo, regenerateScene, type ProduceSettings } from './video/produce'
import type { VisionReviewer } from './video/qa'

export interface EllaServices {
  repo: EllaRepo
  media: MediaStore
  library: () => readonly SourceArticle[]
  bible: string
  llm: () => Llm
  video: () => VideoProvider
  vision: () => VisionReviewer | undefined
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

export interface TickReport { ran: boolean; steps: Array<{ step: string; ok: boolean; detail: string }> }

const ACTOR = 'ella'
export const STATUSES_IN_PIPELINE: ProductionStatus[] = ['drawn', 'scripting', 'script_ready', 'needs_jo', 'approved', 'producing', 'video_ready', 'video_needs_jo']

export async function loadConfig(repo: EllaRepo): Promise<EllaConfig> {
  const s = await repo.settings(['config'])
  return mergeConfig(s.config ?? {}, DEFAULT_CONFIG)
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
export async function tick(svc: EllaServices, opts: { force?: boolean } = {}): Promise<TickReport> {
  const owner = randomUUID()
  const report: TickReport = { ran: false, steps: [] }
  if (!(await svc.repo.lock('tick', owner, 320))) return { ran: false, steps: [{ step: 'lock', ok: true, detail: 'Another run is working' }] }
  try {
    const cfg = await loadConfig(svc.repo)
    if (!cfg.enabled && !opts.force) return { ran: false, steps: [{ step: 'config', ok: true, detail: 'Ella is switched off' }] }
    report.ran = true
    const t0 = Date.now()
    const part = async (step: string, fn: () => Promise<string>) => {
      try { report.steps.push({ step, ok: true, detail: await fn() }) } catch (e) {
        const detail = String((e as Error)?.message ?? e).slice(0, 500)
        report.steps.push({ step, ok: false, detail })
        await svc.repo.audit(ACTOR, 'tick_error', { step, error: detail }).catch(() => {})
      }
    }
    await part('tiktok_token', () => refreshTikTokIfNeeded(svc, cfg))
    await part('publish', () => publishDue(svc, cfg))
    await part('metrics', () => collectMetrics(svc))
    await part('followers', () => recordFollowers(svc, cfg))
    await part('ads', () => manageAds(svc, cfg))
    await part('produce', () => produceNext(svc, cfg))
    // Vercel stops a run at 300 s. Writing a script can take a minute or two, so it waits for the next run
    // when this one has already spent its time making a video.
    await part('draw', async () => (Date.now() - t0 > 150_000 ? 'Left for the next run (time budget)' : drawIfNeeded(svc, cfg, t0 + 280_000)))
    await svc.repo.audit(ACTOR, 'tick', { steps: report.steps.map(s => `${s.step}:${s.ok ? 'ok' : 'error'}`) }).catch(() => {})
    return report
  } finally {
    await svc.repo.unlock('tick', owner).catch(() => {})
  }
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
    const url = await svc.media.signedUrl(await videoPathFor(svc, post.productionId), 3 * 3600)
    const containerId = await ig.createReel({ videoUrl: url, caption: post.caption, trial: cfg.instagram.trialReels, aiLabel: cfg.instagram.aiLabel })
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
  if (st.state === 'PUBLISHED') return 'published'
  const { mediaId, permalink } = await ig.publish(post.containerId)
  await svc.repo.updatePost(post.id, { status: 'published', providerPostId: mediaId, permalink, publishedAt: svc.now().toISOString(), error: null })
  await svc.repo.audit(ACTOR, 'published', { platform: 'instagram', postId: post.id, mediaId, permalink })
  return 'published'
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
          shares: m.shares, saves: m.saved, avgWatchMs: m.ig_reels_avg_watch_time, follows: m.follows, raw: m })
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
    maxUsd: cfg.budgets.maxUsdPerVideo, workDir: join(svc.workDir, p.id), pollEveryMs: 5000,
    pollTimeoutMs: (svc.pollSeconds ?? 20) * 1000,
  }
}

function produceDeps(svc: EllaServices) {
  return { store: svc.repo, steps: svc.repo, provider: svc.video(), media: svc.media, vision: svc.vision(), download: svc.download, sleep: svc.sleep }
}

async function monthBudgetLeft(svc: EllaServices, cfg: EllaConfig) {
  const spent = (await svc.repo.spend(monthStart(cfg.timezone, svc.now()))).videoUsdSince
  return cfg.budgets.videoUsdPerMonth - spent
}

async function produceNext(svc: EllaServices, cfg: EllaConfig) {
  const inProgress = await svc.repo.productionsIn(['producing'])
  const ready = cfg.autoProduce ? await svc.repo.productionsIn(['script_ready', 'approved']) : await svc.repo.productionsIn(['approved'])
  const next = inProgress[0] ?? ready[0]
  if (!next) return 'Nothing to make'
  if (!inProgress.length) {
    const left = await monthBudgetLeft(svc, cfg)
    if (left < cfg.budgets.maxUsdPerVideo) {
      await svc.repo.raiseAlert('budget', `budget_month:${monthStart(cfg.timezone, svc.now()).toISOString().slice(0, 7)}`,
        `Monthly video budget nearly used (${left.toFixed(2)} USD left). New videos wait until next month or a higher budget.`)
      return 'Monthly video budget reached'
    }
  }
  if (!cfg.voiceId) {
    await svc.repo.raiseAlert('setup', 'setup:voice', "Choose Ella's voice (Atlas, Ella, Settings) before videos can be made.")
    return 'No voice chosen'
  }
  if (inProgress.length && svc.now().getTime() - new Date(next.updatedAt).getTime() > 6 * 3600_000)
    await svc.repo.raiseAlert('stuck', `stuck:${next.id}`, `A video has been in production for over 6 hours (${next.slug}). HeyGen may be slow; check the HeyGen dashboard.`)
  const p = await svc.repo.production(next.id)
  if (!p?.script) throw new Error(`No script for ${next.id}`)
  const s = produceSettings(svc, cfg, { id: p.id, scriptVersion: p.script.version, script: p.script.script as ScriptDraft })
  await ensureLook(svc, s.lookImagePath)
  const r = await produceVideo(produceDeps(svc), s)
  if (r.status === 'producing') return `Waiting on scenes ${r.waitingOn.join(', ')}`
  if (r.status === 'failed') return `Failed: ${r.error}`
  if (r.status === 'video_ready' || r.status === 'video_needs_jo')
    await svc.repo.raiseAlert('review', `review:${p.id}:${r.renderVersion}`, `A new video is ready for your review: ${p.title ?? p.slug}`)
  return `${r.status} (${r.duration}s, ${r.spentUsd} USD)`
}

// ── Drawing new blogs and writing scripts ─────────────────────────────────
async function drawIfNeeded(svc: EllaServices, cfg: EllaConfig, deadline?: number) {
  // A run cut off while writing a script leaves it "drawn" or "scripting". After 6 minutes (the server stops any run at 5) it is
  // cancelled and its blog goes back into the draw, so the pipeline never stalls.
  for (const p of await svc.repo.productionsIn(['drawn', 'scripting'])) {
    if (svc.now().getTime() - new Date(p.updatedAt).getTime() > 6 * 60000) {
      await svc.repo.setStatus(p.id, 'cancelled', { note: 'Script writing stopped part way; blog returned to the draw' })
      await svc.repo.releaseSlug(p.slug, ACTOR)
    }
  }
  const pipeline = await svc.repo.productionsIn([...STATUSES_IN_PIPELINE, 'scheduled'])
  const scheduledPosts = (await svc.repo.posts({ statuses: ['scheduled'] })).length
  const ahead = pipeline.length
  if (ahead >= cfg.bufferAhead + Math.min(scheduledPosts, 1)) return `${ahead} in the pipeline, enough`
  if (pipeline.some(p => ['drawn', 'scripting'].includes(p.status))) return 'A script is being written'
  if (await monthBudgetLeft(svc, cfg) < cfg.budgets.maxUsdPerVideo) return 'Monthly video budget reached'
  const out = await runStage1({ store: svc.repo, library: svc.library(), llm: svc.llm() }, {
    bible: svc.bible, ellaLooks: cfg.ellaLooks.map(l => l.id), agentSignoffConfirmed: cfg.agentSignoffConfirmed,
    allowPrice: cfg.allowPrice, learnings: learn(await svc.repo.performance()).summary, actor: ACTOR, deadline,
  })
  if (out.status === 'library_empty') return 'Content library used up'
  if (out.status === 'needs_jo')
    await svc.repo.raiseAlert('review', `script:${out.productionId}`, `A script did not pass every check and needs your decision: ${out.slug}`)
  return `${out.status}: ${out.slug}`
}

// ── Jo's actions from Atlas ───────────────────────────────────────────────
export type EllaAction =
  | { kind: 'approve_script'; productionId: string }
  | { kind: 'cancel'; productionId: string; note?: string }
  | { kind: 'approve_video'; productionId: string; captions?: { instagram?: string; tiktok?: string }; at?: string }
  | { kind: 'redo_scene'; productionId: string; scene: number; note?: string }
  | { kind: 'retry_video'; productionId: string }
  | { kind: 'publish_now'; postId: string }
  | { kind: 'mark_posted'; postId: string; url: string }
  | { kind: 'approve_ad'; adId: string }
  | { kind: 'reject_ad'; adId: string }
  | { kind: 'pause_ad'; adId: string }
  | { kind: 'resume_ad'; adId: string }
  | { kind: 'save_config'; config: unknown }
  | { kind: 'resolve_alert'; alertId: number }
  | { kind: 'release_slug'; slug: string }

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
    case 'cancel': {
      const p = await svc.repo.production(a.productionId)
      if (!p || ['published', 'cancelled'].includes(p.status)) return fail('This video cannot be cancelled now')
      for (const post of p.posts) if (['scheduled', 'manual_ready', 'failed'].includes(post.status)) await svc.repo.updatePost(post.id, { status: 'cancelled' })
      await svc.repo.setStatus(p.id, 'cancelled', { note: a.note ?? 'Cancelled by Jo' })
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
          caption: (a.captions?.instagram ?? draft.captions.instagram).trim() })
        made.push('instagram')
      }
      if (cfg.tiktok.enabled) {
        const auto = cfg.tiktok.mode === 'auto' && cfg.tiktok.audited
        await svc.repo.upsertPost({ productionId: p.id, renderVersion: p.render.version, platform: 'tiktok', mode: auto ? 'auto' : 'manual',
          status: auto ? 'scheduled' : 'manual_ready', scheduledAt: at.toISOString(), caption: (a.captions?.tiktok ?? draft.captions.tiktok).trim() })
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
    case 'release_slug': {
      const ok = await svc.repo.releaseSlug(a.slug, 'jo')
      return ok ? { ok: true } : fail('Only a blog whose video was cancelled can go back into the draw')
    }
  }
}

/** Supersedes one scene's clip and sets the production back to producing; the scheduler does the rest. */
async function regenerateSceneLater(svc: EllaServices, s: ProduceSettings, scene: number) {
  const sc = s.script.scenes.find(x => x.scene === scene)!
  await svc.repo.supersede(s.productionId, s.scriptVersion, sc.ellaInFrame ? 'ella_scene' : 'clip', scene)
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
