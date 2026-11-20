import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomBytes } from 'node:crypto'
import { DEFAULT_CONFIG, checkConfig, mergeConfig, type EllaConfig } from '../config'
import { adStopReason, learn, promotionCandidates, videoScore } from '../learn'
import { loadSvtLibrary } from '../library-svt'
import { MetaGraph } from '../publish/meta'
import type { TikTokClient } from '../publish/tiktok'
import { act, loadConfig, tick, type EllaServices } from '../run'
import { nextFreeSlot, upcomingSlots } from '../schedule'
import { BIBLE_V1 } from '../script/bible'
import type { Llm } from '../script/llm'
import { open, seal, signState, verifyState } from '../secrets'
import type { PerformanceRow } from '../store'
import { LocalMediaStore } from '../video/media'
import { loadEllaPage } from '../view'
import { FakeHeyGen } from './fakes'
import { workedExample } from './fixtures/worked-example'
import { freshDb, repoOf } from './helpers'

process.env.ELLA_TOKEN_KEY = randomBytes(32).toString('base64')
process.env.ELLA_META_ACCESS_TOKEN = 'test-token'

// ── Small pure parts ───────────────────────────────────────────────────────
test('slots follow Sydney time across daylight saving', () => {
  const tue = [{ dow: 2, time: '19:30' }]
  const summer = upcomingSlots('Australia/Sydney', tue, new Date('2026-11-23T00:00:00Z'), 1)[0]
  assert.equal(summer.toISOString(), '2026-11-24T08:30:00.000Z', 'AEDT is UTC+11')
  const winter = upcomingSlots('Australia/Sydney', tue, new Date('2026-06-01T00:00:00Z'), 1)[0]
  assert.equal(winter.toISOString(), '2026-06-02T09:30:00.000Z', 'AEST is UTC+10')
  const next = nextFreeSlot('Australia/Sydney', tue, new Date('2026-11-23T00:00:00Z'), ['2026-11-24T08:30:00.000Z'])
  assert.equal(next.toISOString(), '2026-12-01T08:30:00.000Z', 'a taken slot is skipped')
})

test('tokens are sealed and state links are signed and expire', () => {
  const t = { accessToken: 'a', refreshToken: 'r', expiresAt: 1, openId: 'o' }
  const sealed = seal(t)
  assert.ok(!sealed.includes('"a"'))
  assert.deepEqual(open(sealed), t)
  assert.throws(() => open(sealed.slice(0, -4) + 'AAAA'))
  const st = signState({ p: 'tiktok' })
  assert.equal(verifyState<{ p: string }>(st)?.p, 'tiktok')
  assert.equal(verifyState(st.replace(/.$/, c => (c === 'A' ? 'B' : 'A'))), null)
  assert.equal(verifyState(signState({ p: 'x' }, -1)), null, 'expired')
})

test('settings: safe defaults, unknown keys dropped, bad values refused', () => {
  assert.equal(DEFAULT_CONFIG.enabled, false)
  assert.equal(DEFAULT_CONFIG.ads.enabled, false)
  const m = mergeConfig({ enabled: true, hack: 1, ads: { totalCapAud: 'x', days: 5 } })
  assert.equal(m.enabled, true)
  assert.equal((m as unknown as Record<string, unknown>).hack, undefined)
  assert.equal(m.ads.totalCapAud, DEFAULT_CONFIG.ads.totalCapAud, 'wrong type keeps the default')
  assert.equal(m.ads.days, 5)
  assert.deepEqual(checkConfig(DEFAULT_CONFIG), [])
  assert.ok(checkConfig({ ...DEFAULT_CONFIG, tiktok: { ...DEFAULT_CONFIG.tiktok, mode: 'auto' } }).some(p => /audit/.test(p)))
  assert.ok(checkConfig({ ...DEFAULT_CONFIG, ads: { ...DEFAULT_CONFIG.ads, totalCapAud: 5000 } }).length > 0)
})

const row = (o: Partial<PerformanceRow>): PerformanceRow => ({
  postId: Math.random().toString(36).slice(2), platform: 'instagram', publishedAt: '2026-11-10T08:30:00Z', permalink: null, slug: 's', pillar: 'Work and income',
  hookType: 'If you', ctaType: 'Send', keyTerm: null, title: null, hook: null, checkpoint: '7d', views: 1000, reach: 800, likes: 20, comments: 2,
  shares: 5, saves: 6, avgWatchMs: 9000, follows: 3, durationSec: 30, ...o,
})

test('learning: score per reach, groups, and a short summary for the next script', () => {
  assert.equal(videoScore({ reach: 1000, views: 1000, shares: 10, saves: 0, comments: 0, likes: 0, follows: 0 }), 40)
  const rows = [
    ...[1, 2, 3].map(() => row({ hookType: 'Myth vs fact', shares: 20, saves: 15 })),
    ...[1, 2, 3].map(() => row({ hookType: 'If you', shares: 1, saves: 1 })),
  ]
  const L = learn(rows)
  assert.equal(L.byHook[0].key, 'Myth vs fact')
  assert.match(L.summary, /best "Myth vs fact"/)
  assert.equal(learn(rows.slice(0, 3)).summary, '', 'too few videos says nothing')
})

test('promotion: only the best real-reach Instagram videos, and stop rules', () => {
  const now = new Date('2026-11-17T00:00:00Z')
  const rows = [row({ shares: 40, saves: 30 }), row({}), row({}), row({}), row({ platform: 'tiktok', shares: 99 })]
  const c = promotionCandidates(rows, new Set(), now)
  assert.equal(c.length, 1)
  assert.equal(c[0].shares, 40)
  assert.equal(promotionCandidates(rows, new Set([c[0].postId]), now).length, 0, 'never twice')
  const base = { spendAud: 10, conversations: 2, totalCapAud: 70, maxCostPerConversationAud: 15, startedAt: '2026-11-16T00:00:00Z', days: 7 }
  assert.equal(adStopReason(base, now), null)
  assert.match(adStopReason({ ...base, spendAud: 70 }, now)!, /cap/)
  assert.match(adStopReason({ ...base, spendAud: 31, conversations: 0 }, now)!, /no WhatsApp/)
  assert.match(adStopReason({ ...base, spendAud: 40, conversations: 2 }, now)!, /per WhatsApp chat/)
  assert.match(adStopReason(base, new Date('2026-11-24T00:00:00Z'))!, /7 days/)
})

// ── End to end with fakes ─────────────────────────────────────────────────
class ScriptLlm implements Llm {
  calls = 0
  async complete() { this.calls++; return { text: JSON.stringify(workedExample()), model: 'test', inputTokens: 10, outputTokens: 10 } }
}

/** A fake Graph API that records every call. */
function fakeMeta() {
  const calls: Array<{ method: string; path: string; body: Record<string, string> }> = []
  const state = { containerReady: false, adSpend: 0, adChats: 0 }
  const fetchImpl = async (url: string, init?: RequestInit) => {
    const u = new URL(url)
    const path = u.pathname.replace(/^\/v[\d.]+\//, '')
    const method = init?.method ?? 'GET'
    const body: Record<string, string> = {}
    if (init?.body) for (const [k, v] of new URLSearchParams(String(init.body))) if (k !== 'access_token') body[k] = v
    calls.push({ method, path, body })
    const json = (x: unknown) => new Response(JSON.stringify(x), { status: 200 })
    if (method === 'POST' && path === 'IG1/media') return json({ id: 'CONT1' })
    if (method === 'GET' && path === 'CONT1') return json({ status_code: state.containerReady ? 'FINISHED' : 'IN_PROGRESS' })
    if (method === 'POST' && path === 'IG1/media_publish') return json({ id: '17900000000000001' })
    if (method === 'GET' && path === '17900000000000001') return json({ permalink: 'https://www.instagram.com/reel/abc/' })
    if (method === 'GET' && path === '17900000000000001/insights') return json({ data: [
      { name: 'views', values: [{ value: 2400 }] }, { name: 'reach', values: [{ value: 1900 }] }, { name: 'shares', values: [{ value: 30 }] },
      { name: 'saved', values: [{ value: 25 }] }, { name: 'likes', values: [{ value: 80 }] }, { name: 'comments', values: [{ value: 6 }] }] })
    if (method === 'GET' && path === 'IG1') return json({ followers_count: 321 })
    if (method === 'POST' && path === 'act_77/campaigns') return json({ id: 'CMP' })
    if (method === 'POST' && path === 'act_77/adsets') return json({ id: 'SET' })
    if (method === 'POST' && path === 'act_77/adcreatives') return json({ id: 'CRE' })
    if (method === 'POST' && path === 'act_77/ads') return json({ id: 'AD' })
    if (method === 'POST' && ['CMP', 'SET', 'AD'].includes(path)) return json({ success: true })
    if (method === 'GET' && path === 'AD/insights') return json({ data: [{ spend: String(state.adSpend), impressions: '5000',
      actions: [{ action_type: 'onsite_conversion.messaging_conversation_started_7d', value: String(state.adChats) }] }] })
    return new Response(JSON.stringify({ error: { message: `unexpected ${method} ${path}`, code: 1 } }), { status: 400 })
  }
  return { calls, state, graph: () => new MetaGraph({ token: 't', fetchImpl: fetchImpl as typeof fetch }) }
}

async function world() {
  const db = await freshDb()
  const repo = repoOf(db)
  const dir = await mkdtemp(join(tmpdir(), 'ella-run-'))
  const media = new LocalMediaStore(join(dir, 'store'))
  const heygen = new FakeHeyGen(dir)
  const meta = fakeMeta()
  const llm = new ScriptLlm()
  const clock = { now: new Date('2026-11-23T00:00:00Z') }    // a Monday
  // Only the worked example's article, so the draw is predictable.
  const lib = loadSvtLibrary().filter(a => a.slug === 'tfn-vs-abn-international-students')
  assert.equal(lib.length, 1)
  const svc: EllaServices = {
    repo, media, library: () => lib, bible: BIBLE_V1, llm: () => llm, video: () => heygen,
    vision: () => ({ async review() { return { issues: [], inputTokens: 1, outputTokens: 1, model: 't' } } }),
    meta: meta.graph, tiktok: () => { throw new Error('TikTok should not be called in manual mode') },
    download: async (u: string) => new Uint8Array(await readFile(u)), sleep: async () => {},
    now: () => clock.now, workDir: join(dir, 'work'), pollSeconds: 30,
  }
  const cfg: EllaConfig = mergeConfig({
    enabled: true, voiceId: 'voice_1', ids: { igUserId: 'IG1', fbPageId: 'PAGE1', adAccountId: '77', whatsappNumber: '+61400000000' },
    ads: { ...DEFAULT_CONFIG.ads, enabled: true },
  })
  await repo.setSettings({ config: cfg })
  return { db, repo, media, heygen, meta, llm, clock, svc }
}

const statusOf = async (db: Awaited<ReturnType<typeof freshDb>>) =>
  (await db.query<{ status: string }>('SELECT status FROM ella_productions ORDER BY created_at')).rows.map(r => r.status)

test('switched off: the scheduler does nothing at all', async () => {
  const w = await world()
  await w.repo.setSettings({ config: { ...(await loadConfig(w.repo)), enabled: false } })
  const r = await tick(w.svc)
  assert.equal(r.ran, false)
  assert.equal(w.llm.calls, 0)
  assert.deepEqual(await statusOf(w.db), [])
})

test('end to end: draw, script, video, approval, Instagram post, TikTok by hand, numbers, promotion', { timeout: 600_000 }, async () => {
  const w = await world()

  // Run 1: draws the blog and writes a script that passes every check.
  let r = await tick(w.svc)
  assert.ok(r.ran)
  assert.deepEqual(await statusOf(w.db), ['script_ready'])
  assert.equal(w.llm.calls, 1)

  // Run 2: makes the video (fake HeyGen, real ffmpeg render), then finds the library used up.
  r = await tick(w.svc)
  assert.ok(r.steps.find(s => s.step === 'produce')?.detail.startsWith('video_ready'), JSON.stringify(r.steps))
  assert.deepEqual(await statusOf(w.db), ['video_ready'])
  const page = await loadEllaPage(w.svc, { supabase: true })
  assert.ok(page.ok)
  if (!page.ok) return
  assert.equal(page.reviews.length, 1, 'the video waits in Review')
  assert.ok(page.dashboard.alerts.some(a => a.kind === 'review'))
  assert.ok(page.dashboard.alerts.some(a => a.kind === 'library_empty'))

  // Nothing is posted before Jo approves.
  w.clock.now = new Date('2026-11-25T00:00:00Z')
  await tick(w.svc)
  assert.equal(w.meta.calls.filter(c => c.path === 'IG1/media').length, 0)

  // Jo approves: Instagram goes to the next free slot (Thu 19:30 Sydney), TikTok waits for a manual post.
  const pid = page.reviews[0].id
  const ok = await act(w.svc, { kind: 'approve_video', productionId: pid, captions: { instagram: 'Edited caption.\nGeneral information only, not tax advice.' } })
  assert.ok(ok.ok, JSON.stringify(ok))
  const posts = await w.repo.posts()
  const ig = posts.find(p => p.platform === 'instagram')!, tt = posts.find(p => p.platform === 'tiktok')!
  assert.equal(ig.status, 'scheduled')
  assert.equal(ig.scheduledAt.slice(0, 16), '2026-11-26T08:30')
  assert.equal(ig.caption.split('\n')[0], 'Edited caption.')
  assert.equal(tt.status, 'manual_ready')
  assert.ok(tt.videoPath, 'the manual post has its video to download')
  assert.deepEqual(await statusOf(w.db), ['scheduled'])
  const open = await w.db.query<{ n: number }>("SELECT count(*)::int AS n FROM ella_alerts WHERE kind = 'review' AND resolved_at IS NULL")
  assert.equal(open.rows[0].n, 0, 'the review notice clears itself once Jo decides')
  // A second approval does not double the posts.
  assert.equal((await act(w.svc, { kind: 'approve_video', productionId: pid })).ok, false)

  // At the slot: the container is created with the AI label, then published when Instagram finishes.
  w.clock.now = new Date('2026-11-26T08:31:00Z')
  await tick(w.svc)
  const create = w.meta.calls.find(c => c.path === 'IG1/media')!
  assert.equal(create.body.media_type, 'REELS')
  assert.equal(create.body.is_ai_generated, 'true')
  assert.match(create.body.video_url, /^file:\/\//)
  await tick(w.svc)
  assert.equal((await w.repo.posts({ platform: 'instagram' }))[0].status, 'publishing', 'still processing')
  w.meta.state.containerReady = true
  await tick(w.svc)
  const live = (await w.repo.posts({ platform: 'instagram' }))[0]
  assert.equal(live.status, 'published')
  assert.equal(live.permalink, 'https://www.instagram.com/reel/abc/')
  assert.equal(w.meta.calls.filter(c => c.path === 'IG1/media_publish').length, 1, 'published exactly once')
  assert.deepEqual(await statusOf(w.db), ['scheduled'], 'TikTok still to post')

  // Jo posts on TikTok by hand and pastes the link.
  assert.equal((await act(w.svc, { kind: 'mark_posted', postId: tt.id, url: 'https://example.com/x' })).ok, false)
  assert.ok((await act(w.svc, { kind: 'mark_posted', postId: tt.id, url: 'https://www.tiktok.com/@svt/video/7311' })).ok)
  assert.deepEqual(await statusOf(w.db), ['published'])

  // Numbers at 1 hour, then follower count once a day.
  w.clock.now = new Date('2026-11-26T09:40:00Z')
  r = await tick(w.svc)
  const m = await w.db.query<{ checkpoint: string; reach: number; shares: number }>(
    "SELECT m.checkpoint, m.reach, m.shares FROM ella_metrics m JOIN ella_posts p ON p.id = m.post_id WHERE p.platform = 'instagram'")
  assert.deepEqual(m.rows, [{ checkpoint: '1h', reach: 1900, shares: 30 }])
  const ttm = await w.db.query<{ raw: { note?: string } }>("SELECT m.raw FROM ella_metrics m JOIN ella_posts p ON p.id = m.post_id WHERE p.platform = 'tiktok'")
  assert.equal(ttm.rows[0].raw.note, 'not readable by API', 'TikTok not connected: recorded once, no retry loop')
  const f = await w.db.query<{ followers: number }>("SELECT followers FROM ella_followers WHERE platform = 'instagram'")
  assert.equal(f.rows[0].followers, 321)

  // Paid promotion: proposed for Jo, created PAUSED with Meta's hard cap, then switched on.
  const ad = await w.repo.proposeAd({ postId: live.id, dailyBudgetAud: 10, totalCapAud: 70, maxCostPerConversationAud: 15, days: 7, reason: 'test' })
  assert.ok(ad)
  const ok2 = await act(w.svc, { kind: 'approve_ad', adId: ad!.id })
  assert.ok(ok2.ok, JSON.stringify(ok2))
  const adset = w.meta.calls.find(c => c.path === 'act_77/adsets')!
  assert.equal(adset.body.status, 'PAUSED')
  assert.equal(adset.body.lifetime_budget, '7000', 'A$70 cap set in Meta')
  assert.equal(adset.body.destination_type, 'WHATSAPP')
  assert.equal(JSON.parse(adset.body.promoted_object).whatsapp_phone_number, '+61400000000')
  assert.equal(w.meta.calls.find(c => c.path === 'act_77/campaigns')!.body.status, 'PAUSED')
  assert.equal(w.meta.calls.find(c => c.path === 'act_77/adcreatives')!.body.source_instagram_media_id, '17900000000000001')
  assert.equal(w.meta.calls.filter(c => c.path === 'CMP' && c.body.status === 'ACTIVE').length, 1)
  assert.equal((await act(w.svc, { kind: 'approve_ad', adId: ad!.id })).ok, false, 'a double click cannot make a second campaign')
  assert.equal(w.meta.calls.filter(c => c.path === 'act_77/campaigns').length, 1)

  // Ella watches it and stops it when chats cost too much.
  w.meta.state.adSpend = 35; w.meta.state.adChats = 1
  w.clock.now = new Date('2026-11-27T09:40:00Z')
  await tick(w.svc)
  const [stopped] = await w.repo.ads()
  assert.equal(stopped.status, 'stopped')
  assert.match(stopped.stopReason!, /per WhatsApp chat/)
  assert.equal(w.meta.calls.filter(c => c.path === 'CMP' && c.body.status === 'PAUSED').length, 1)
})

test('promotion is refused when it would pass the monthly cap or when promotion is off', async () => {
  const w = await world()
  const c = await loadConfig(w.repo)
  await w.repo.setSettings({ config: { ...c, ads: { ...c.ads, monthlyCapAud: 50 } } })
  // Make a published post to promote.
  await w.repo.syncRegistry([{ slug: 'x', kind: 'blog', title: 'X', category: 'c', pillar: 'Work and income', contentHash: 'h', excluded: false } as never])
  const claim = (await w.repo.claimBlog({}, [], 't'))!
  await w.repo.saveRender({ productionId: claim.productionId, scriptVersion: 1, videoPath: 'v.mp4', editPlan: {}, captions: [], durationSec: 30, qa: [], qaPassed: true })
  const post = await w.repo.upsertPost({ productionId: claim.productionId, renderVersion: 1, platform: 'instagram', mode: 'auto', scheduledAt: '2026-11-20T00:00:00Z', caption: 'c' })
  await w.repo.updatePost(post.id, { status: 'published', providerPostId: '17900000000000001', publishedAt: '2026-11-20T00:00:00Z' })
  const ad = (await w.repo.proposeAd({ postId: post.id, dailyBudgetAud: 10, totalCapAud: 70, maxCostPerConversationAud: 15, days: 7, reason: 't' }))!
  const r = await act(w.svc, { kind: 'approve_ad', adId: ad.id })
  assert.equal(r.ok, false)
  assert.equal(w.meta.calls.length, 0, 'Meta never called')
  await w.repo.setSettings({ config: { ...c, ads: { ...c.ads, enabled: false } } })
  assert.match((await act(w.svc, { kind: 'approve_ad', adId: ad.id }) as { error: string }).error, /switched off/)
})

test('the monthly video budget stops new videos and raises one alert', { timeout: 120_000 }, async () => {
  const w = await world()
  const c = await loadConfig(w.repo)
  await w.repo.setSettings({ config: { ...c, budgets: { videoUsdPerMonth: 3, maxUsdPerVideo: 6 } } })
  const r = await tick(w.svc)
  assert.match(r.steps.find(s => s.step === 'draw')!.detail, /budget/)
  assert.equal(w.llm.calls, 0)
})

test('two scheduler runs at once: the second one waits', async () => {
  const w = await world()
  assert.ok(await w.repo.lock('tick', 'someone-else'))
  const r = await tick(w.svc)
  assert.equal(r.ran, false)
  assert.match(r.steps[0].detail, /Another run/)
})

test('settings saved from Atlas are checked first', async () => {
  const w = await world()
  const bad = await act(w.svc, { kind: 'save_config', config: { ads: { totalCapAud: 99999 } } })
  assert.equal(bad.ok, false)
  const good = await act(w.svc, { kind: 'save_config', config: { slots: [{ dow: 1, time: '20:00' }] } })
  assert.ok(good.ok)
  assert.deepEqual((await loadConfig(w.repo)).slots, [{ dow: 1, time: '20:00' }])
})

test('TikTok auto posting is never used before the audit', async () => {
  const w = await world()
  const c = await loadConfig(w.repo)
  await w.repo.setSettings({ config: { ...c, tiktok: { ...c.tiktok, mode: 'auto', audited: false } } })
  const fake = { calls: 0 } as { calls: number }
  w.svc.tiktok = () => { fake.calls++; return {} as TikTokClient }
  // Approving makes the TikTok post manual even though the saved mode says auto.
  await w.repo.syncRegistry([{ slug: 'y', kind: 'blog', title: 'Y', category: 'c', pillar: 'Work and income', contentHash: 'h', excluded: false } as never])
  const claim = (await w.repo.claimBlog({}, [], 't'))!
  await w.repo.saveScript({ productionId: claim.productionId, bibleVersion: 'v1', script: workedExample(), issues: [], passed: true, attempts: 1 })
  await w.repo.saveRender({ productionId: claim.productionId, scriptVersion: 1, videoPath: 'v.mp4', editPlan: {}, captions: [], durationSec: 30, qa: [], qaPassed: true })
  await w.repo.setStatus(claim.productionId, 'video_ready')
  assert.ok((await act(w.svc, { kind: 'approve_video', productionId: claim.productionId })).ok)
  const tt = (await w.repo.posts({ platform: 'tiktok' }))[0]
  assert.equal(tt.mode, 'manual')
  assert.equal(fake.calls, 0)
})

test('TikTok client: private until the audit, labelled as AI and own business, one-chunk upload', async () => {
  const { TikTokClient } = await import('../publish/tiktok')
  const seen: Array<{ url: string; body?: unknown; headers?: Record<string, string> }> = []
  const f = (async (url: string, init?: RequestInit) => {
    seen.push({ url, body: init?.body && typeof init.body === 'string' ? JSON.parse(init.body) : undefined, headers: init?.headers as Record<string, string> })
    if (url.includes('creator_info')) return new Response(JSON.stringify({ data: { creator_nickname: 'SVT', creator_username: 'svt', privacy_level_options: ['PUBLIC_TO_EVERYONE', 'SELF_ONLY'], max_video_post_duration_sec: 600 }, error: { code: 'ok' } }))
    if (url.includes('video/init')) return new Response(JSON.stringify({ data: { publish_id: 'P1', upload_url: 'https://upload.example/x' }, error: { code: 'ok' } }))
    if (url.startsWith('https://upload.example')) return new Response('', { status: 201 })
    return new Response('{}', { status: 404 })
  }) as typeof fetch
  const id = await new TikTokClient('tok', f).postVideo({ bytes: new Uint8Array(1000), caption: 'Hi', publicIfAllowed: false, aiLabel: true })
  assert.equal(id, 'P1')
  const init = seen.find(s => s.url.includes('video/init'))!.body as { post_info: Record<string, unknown>; source_info: Record<string, unknown> }
  assert.equal(init.post_info.privacy_level, 'SELF_ONLY')
  assert.equal(init.post_info.is_aigc, true)
  assert.equal(init.post_info.brand_organic_toggle, true)
  assert.deepEqual(init.source_info, { source: 'FILE_UPLOAD', video_size: 1000, chunk_size: 1000, total_chunk_count: 1 })
  assert.equal(seen.find(s => s.url.startsWith('https://upload.example'))!.headers!['content-range'], 'bytes 0-999/1000')
})

test('a script cut off part way is cancelled after 30 minutes and its blog goes back into the draw', async () => {
  const w = await world()
  await w.repo.syncRegistry((await import('../registry')).toRegistry(loadSvtLibrary().filter(a => a.slug === 'tfn-vs-abn-international-students')))
  const c = (await w.repo.claimBlog({}, [], 't'))!
  await w.repo.setStatus(c.productionId, 'scripting')
  await w.db.query("UPDATE ella_productions SET updated_at = now() - interval '2 hours' WHERE id = $1", [c.productionId])
  w.clock.now = new Date()
  const r = await tick(w.svc)
  assert.ok(r.steps.find(s => s.step === 'draw')?.ok)
  const rows = await w.db.query<{ status: string }>('SELECT status FROM ella_productions ORDER BY created_at')
  assert.equal(rows.rows[0].status, 'cancelled')
  assert.equal(rows.rows[1]?.status, 'script_ready', 'the same blog was drawn again and scripted')
})

test('a failed video can be made again without paying for the finished parts', { timeout: 300_000 }, async () => {
  const w = await world()
  await tick(w.svc)
  w.heygen.failNextClip = true
  await tick(w.svc)
  const [p] = await w.repo.productionsIn(['video_needs_jo'])
  assert.ok(p, 'the failed video waits for Jo')
  const before = { ...w.heygen.calls }
  assert.ok((await act(w.svc, { kind: 'retry_video', productionId: p.id })).ok)
  await tick(w.svc)
  assert.deepEqual(await statusOf(w.db), ['video_ready'])
  assert.equal(w.heygen.calls.clip - before.clip, 1, 'only the failed clip is made again')
  assert.equal(w.heygen.calls.tts - before.tts, 0)
})

test('numbers for a post that cannot be read are recorded once, not retried every run', async () => {
  const w = await world()
  await w.repo.syncRegistry([{ slug: 'z', kind: 'blog', title: 'Z', category: 'c', pillar: 'Work and income', contentHash: 'h', excluded: false } as never])
  const c = (await w.repo.claimBlog({}, [], 't'))!
  await w.repo.saveRender({ productionId: c.productionId, scriptVersion: 1, videoPath: 'v.mp4', editPlan: {}, captions: [], durationSec: 30, qa: [], qaPassed: true })
  const post = await w.repo.upsertPost({ productionId: c.productionId, renderVersion: 1, platform: 'instagram', mode: 'manual', status: 'manual_ready', scheduledAt: '2026-11-23T00:00:00Z', caption: 'c' })
  assert.ok((await act(w.svc, { kind: 'mark_posted', postId: post.id, url: 'https://www.instagram.com/reel/AbC123/' })).ok)
  w.clock.now = new Date(Date.parse(w.clock.now.toISOString()) + 2 * 3600_000)
  await tick(w.svc); await tick(w.svc)
  const m = await w.db.query<{ n: number }>('SELECT count(*)::int AS n FROM ella_metrics')
  assert.equal(m.rows[0].n, 1)
  assert.equal(w.meta.calls.filter(x => x.path.includes('insights')).length, 0, 'no API call with a shortcode')
})
