import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { ffmpeg } from '../video/media'
import { listVideoReviews, parseEbur128, parseSilences, reviewDue, reviewFailKey, reviewKey, reviewVideo, type FrameLooker } from '../video-review'
import type { EllaServices } from '../run'
import type { Llm } from '../script/llm'

test('video review: loudness and silences are read from ffmpeg output', () => {
  const loud = 'x\n[Parsed_ebur128_0] Summary:\n\n  Integrated loudness:\n    I:         -15.3 LUFS\n  Loudness range:\n    LRA:         4.2 LU\n  True peak:\n    Peak:       -0.8 dBFS\n'
  assert.deepEqual(parseEbur128(loud), { loudnessLufs: -15.3, loudnessRangeLu: 4.2, truePeakDb: -0.8 })
  const quiet = '[silencedetect] silence_start: 2.01\n[silencedetect] silence_end: 3.02 | silence_duration: 1.01\n[silencedetect] silence_start: 5.5\n'
  assert.deepEqual(parseSilences(quiet, 6), [{ start: 2.01, end: 3.02 }, { start: 5.5, end: 6 }])
})

const HOUR = 3600_000
const SCRIPT = {
  coreMessage: 'ABN pay usually has no tax taken out, so plan for it.', keyTerm: 'ABN', audienceSlice: 'students', pillar: 'Work and income',
  hookType: 'if_you', hookOptions: [], ctaType: 'save', ellaLook: 'L1', ideas: [], claims: [], testChangeApplied: 'none',
  captions: { instagram: 'Caption IG 💡', tiktok: 'Caption TT 💡' },
  scenes: [
    { scene: 1, start: 0, end: 3, ellaInFrame: true, voice: 'Getting paid on an A-B-N?', emphasis: 'paid', onScreen: 'Paid on an ABN?', visual: 'Ella at her desk', action: '', syncWord: '', shotPrompt: '', continuity: '', claimRef: 'none', shot: 'ella' },
    { scene: 2, start: 3, end: 6, ellaInFrame: false, voice: 'Tax is usually not taken out,', emphasis: 'usually', onScreen: 'Usually no tax taken', visual: 'A hand taps a blank phone', action: '', syncWord: '', shotPrompt: '', continuity: '', claimRef: 'c1', shot: 'clip' },
  ],
}

async function fakeWorld(publishedHoursAgo: number) {
  const dir = await mkdtemp(join(tmpdir(), 'ella-review-'))
  const mp4 = join(dir, 'v.mp4')
  await ffmpeg(['-f', 'lavfi', '-i', 'color=c=0x334455:s=270x480:d=6', '-f', 'lavfi', '-i', "aevalsrc='if(between(t,2,3),0,0.3*sin(2*PI*440*t))':d=6", '-shortest', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-c:a', 'aac', mp4])
  const bytes = new Uint8Array(await readFile(mp4))
  const now = new Date('2026-11-25T10:00:00Z')
  const publishedAt = new Date(now.getTime() - publishedHoursAgo * HOUR).toISOString()
  const settings: Record<string, unknown> = {}
  const alerts: string[] = []
  const busy: string[] = []
  const production = {
    id: 'p1', slug: 'abn-tax', title: 'ABN tax', pillar: 'Work and income', status: 'published', keyTerm: 'ABN', hookType: 'if_you', ctaType: 'save',
    scriptVersion: 1, renderVersion: 1, approvedAt: null, note: null, createdAt: '2026-11-20T00:00:00Z', spentUsd: 3.2,
    script: { version: 1, script: SCRIPT, issues: [], passed: true },
    render: { version: 1, scriptVersion: 1, videoPath: 'productions/p1/final-1.mp4', durationSec: 6, qa: [], qaPassed: true, captions: null, createdAt: '2026-11-21T00:00:00Z' },
    posts: [{ id: 'po1', platform: 'instagram', mode: 'auto', status: 'published', scheduledAt: publishedAt, publishedAt, permalink: 'https://instagram.com/reel/x', error: null }],
  }
  const prompts: string[] = []
  const llm: Llm = { async complete(_s, user) { prompts.push(user); return { text: `answer ${prompts.length}`, model: 'fake', inputTokens: 1, outputTokens: 1 } } }
  let framesSeen = 0
  const looker: FrameLooker = { async look(_s, _t, f) { framesSeen = f.length; return 'look answer' } }
  const svc = {
    repo: {
      production: async (id: string) => (id === 'p1' ? production : null),
      posts: async () => [{ ...production.posts[0], productionId: 'p1', renderVersion: 1, caption: 'c', containerId: null, providerPostId: null, attempts: 1, slug: 'abn-tax', title: 'ABN tax', hookType: 'if_you', ctaType: 'save', pillar: 'Work and income', videoPath: 'productions/p1/final-1.mp4' }],
      performance: async () => [{ postId: 'po1', platform: 'instagram', publishedAt, permalink: null, slug: 'abn-tax', pillar: 'x', hookType: null, ctaType: null, keyTerm: null, title: null, hook: null, checkpoint: '24h', views: 1200, reach: 900, likes: 40, comments: 3, shares: 12, saves: 20, avgWatchMs: 4500, follows: 2, durationSec: 6 }],
      settings: async (keys: string[]) => Object.fromEntries(keys.map(k => [k, settings[k] ?? null])),
      setSettings: async (v: Record<string, unknown>) => { Object.assign(settings, v) },
      audit: async () => {},
      productionsIn: async () => busy.map(id => ({ id })),
      raiseAlert: async (_k: string, _key: string, msg: string) => { alerts.push(msg) },
    },
    media: { get: async () => bytes },
    llm: () => llm,
    looker: () => looker,
    now: () => now,
    workDir: dir,
  } as unknown as EllaServices
  return { svc, settings, alerts, prompts, busy, frames: () => framesSeen }
}

test('video review: three agents and a lead write one report from the real file, 24 h after posting', async () => {
  const w = await fakeWorld(30)
  const r = await reviewVideo(w.svc, 'p1')
  assert.equal(w.prompts.length, 3, 'content, sound and the lead (the look agent sees frames)')
  assert.ok(w.frames() >= 3, 'frames from the real video went to the look agent')
  const soundPrompt = w.prompts.find(p => p.includes('YOU ARE THE SOUND AGENT'))!
  assert.match(soundPrompt, /Integrated loudness -?\d/)
  assert.match(soundPrompt, /Silences of 0\.35 s or more[^\n]*2\.\d-3\.\d s/, 'the silent second in the file is found')
  assert.match(w.prompts.find(p => p.includes('YOU ARE THE CONTENT AGENT'))!, /instagram at 24h: views 1200[^\n]*75% of the video/)
  assert.match(w.prompts.find(p => p.includes('YOU ARE THE LEAD'))!, /## Look agent\nlook answer/)
  assert.match(r.markdown, /## The report\nanswer 3/)
  assert.equal(r.filename, 'ella-video-review-abn-tax-2026-11-25.md')
  assert.ok(w.settings[reviewKey('p1')], 'saved for download')
})

test('video review: waits 24 h, waits while Ella is busy, runs once, and a failure is counted', async () => {
  const early = await fakeWorld(10)
  assert.equal((await listVideoReviews(early.svc))[0].state, 'waiting')
  assert.equal(await reviewDue(early.svc), 'No video due for review')

  const w = await fakeWorld(26)
  w.busy.push('x')
  assert.match(await reviewDue(w.svc), /Waiting/)
  w.busy.length = 0
  assert.match(await reviewDue(w.svc), /Reviewed abn-tax/)
  assert.equal(w.alerts.length, 1)
  assert.equal((await listVideoReviews(w.svc))[0].state, 'ready')
  assert.equal(await reviewDue(w.svc), 'No video due for review', 'never twice')

  const bad = await fakeWorld(26)
  ;(bad.svc.media as unknown as { get: () => Promise<Uint8Array> }).get = async () => { throw new Error('file gone') }
  await assert.rejects(reviewDue(bad.svc), /file gone \(try 1 of 3\)/)
  assert.equal((bad.settings[reviewFailKey('p1')] as { tries: number }).tries, 1)
  assert.equal((await listVideoReviews(bad.svc))[0].state, 'failed', 'not retried every run')
})

test('HeyGen prompt: posture comes from the look photo, every line has its feeling, lips sync, under 1,200 characters', async () => {
  const { takePrompt, lineTone } = await import('../video/produce')
  const scenes = SCRIPT.scenes.map(s => ({ ...s })) as unknown as Parameters<typeof takePrompt>[0]
  const p = takePrompt(scenes)
  assert.ok(p.length <= 1200)
  assert.doesNotMatch(p, /seated at her desk/, 'no fixed posture: 76 looks sit, stand, cook and relax')
  assert.match(p, /Keep her exact posture, place, outfit and framing from the image/)
  assert.match(p, /Lips match the audio on every syllable/)
  assert.match(p, /0-3s curious and inviting/)
  assert.match(lineTone({ ...SCRIPT.scenes[1], voice: 'You may owe tax later,' } as never, 1, 4), /concerned/)
  const many = Array.from({ length: 14 }, (_, i) => ({ ...SCRIPT.scenes[1], scene: i + 1, start: i * 2.5, end: i * 2.5 + 2.5 })) as never
  assert.ok(takePrompt(many).length <= 1200, 'long scripts still fit')
})
