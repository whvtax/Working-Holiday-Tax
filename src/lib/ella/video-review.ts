/**
 * The 24-hour video review (Jo, 25 Nov). 24 hours after a video goes live,
 * three Claude agents study it and a lead writes one deep report:
 *   - Content agent: the script, hook, idea, call to action, caption and the numbers.
 *   - Sound agent: what is said and how it sounds. Claude cannot play audio, so the
 *     agent gets the exact words with their timings and real measurements of the
 *     finished file (loudness, peaks, pauses and silences, speaking speed per line).
 *   - Look agent: frames from the finished video itself (one every 1.5 to 2 seconds),
 *     with what each moment was meant to show.
 * The lead merges them: what worked, what to improve (ranked, with where in the
 * code it belongs), scores, and what to test next. The report is saved and listed
 * on the Learning tab for download; Jo sends it to Claude in chat. Nothing here
 * changes Ella by itself.
 */
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { EllaServices } from './run'
import type { Llm } from './script/llm'
import type { PerformanceRow } from './store'
import type { ScriptDraft } from './script/types'
import { shotOf } from './script/types'
import { ffmpeg, probe } from './video/media'
import { takePrompt } from './video/produce'
import { LOOK_ROTATION_KEY, readRotation, ELLA_LOOKS } from './looks'

export const REVIEW_AFTER_HOURS = 24
/** Only videos posted in the last 30 days are reviewed by themselves (older ones on request). */
const REVIEW_WINDOW_DAYS = 30
export const reviewKey = (productionId: string) => `video_review:${productionId}`
export const reviewFailKey = (productionId: string) => `video_review_fail:${productionId}`
/** A review that keeps failing is tried at most this many times by itself (Jo can still press Make now). */
const MAX_TRIES = 3
const RETRY_HOURS = 6

export interface VideoReview {
  productionId: string
  slug: string
  title: string | null
  at: string
  publishedAt: string
  filename: string
  markdown: string
}

export interface ReviewListRow {
  productionId: string
  slug: string
  title: string | null
  publishedAt: string
  platforms: string[]
  dueAt: string
  state: 'waiting' | 'due' | 'ready' | 'failed'
  reviewedAt: string | null
  /** The last error, when the review failed. */
  error: string | null
}
interface ReviewFail { tries: number; at: string; error: string }

/** A model that can look at pictures. */
export interface FrameLooker {
  look(system: string, text: string, frames: Array<{ label: string; jpeg: Uint8Array }>): Promise<string>
}

export class AnthropicLooker implements FrameLooker {
  constructor(private opts: { apiKey?: string; model?: string; fetchImpl?: typeof fetch } = {}) {}
  async look(system: string, text: string, frames: Array<{ label: string; jpeg: Uint8Array }>): Promise<string> {
    const apiKey = this.opts.apiKey ?? process.env.ANTHROPIC_API_KEY
    const model = this.opts.model ?? process.env.ELLA_QA_MODEL ?? process.env.ELLA_SCRIPT_MODEL ?? process.env.CLAUDE_MODEL
    if (!apiKey) throw new Error('Missing ANTHROPIC_API_KEY')
    if (!model) throw new Error('Missing ELLA_QA_MODEL (or ELLA_SCRIPT_MODEL)')
    const content: unknown[] = [{ type: 'text', text }]
    for (const f of frames) {
      content.push({ type: 'text', text: f.label })
      content.push({ type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: Buffer.from(f.jpeg).toString('base64') } })
    }
    content.push({ type: 'text', text: 'Now write your review as instructed.' })
    const res = await (this.opts.fetchImpl ?? fetch)('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: AbortSignal.timeout(240_000),
      headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model, max_tokens: 6000, system, messages: [{ role: 'user', content }] }),
    })
    if (!res.ok) throw new Error(`Look agent failed: HTTP ${res.status} ${(await res.text().catch(() => '')).slice(0, 200)}`)
    const body = await res.json() as { content?: Array<{ type: string; text?: string }> }
    return (body.content ?? []).filter(c => c.type === 'text').map(c => c.text ?? '').join('')
  }
}

// ── What is measured ─────────────────────────────────────────────────────
export interface SoundFacts {
  durationSec: number
  hasAudio: boolean
  loudnessLufs: number | null
  loudnessRangeLu: number | null
  truePeakDb: number | null
  silences: Array<{ start: number; end: number }>
}

export function parseEbur128(stderr: string): Pick<SoundFacts, 'loudnessLufs' | 'loudnessRangeLu' | 'truePeakDb'> {
  const tail = stderr.slice(stderr.lastIndexOf('Summary:'))
  const num = (re: RegExp) => { const m = tail.match(re); return m ? Number(m[1]) : null }
  return { loudnessLufs: num(/I:\s+(-?[\d.]+)\s+LUFS/), loudnessRangeLu: num(/LRA:\s+(-?[\d.]+)\s+LU/), truePeakDb: num(/Peak:\s+(-?[\d.]+)\s+dBFS/) }
}

export function parseSilences(stderr: string, duration: number): Array<{ start: number; end: number }> {
  const out: Array<{ start: number; end: number }> = []
  let open: number | null = null
  for (const line of stderr.split('\n')) {
    const s = line.match(/silence_start:\s*(-?[\d.]+)/)
    if (s) open = Math.max(0, Number(s[1]))
    const e = line.match(/silence_end:\s*(-?[\d.]+)/)
    if (e && open != null) { out.push({ start: open, end: Number(e[1]) }); open = null }
  }
  if (open != null) out.push({ start: open, end: duration })
  return out
}

async function soundFacts(video: string): Promise<SoundFacts> {
  const p = await probe(video)
  if (!p.hasAudio) return { durationSec: p.duration, hasAudio: false, loudnessLufs: null, loudnessRangeLu: null, truePeakDb: null, silences: [] }
  const run = async (af: string) => { try { return (await ffmpeg(['-i', video, '-af', af, '-f', 'null', '-'], 180_000)).stderr } catch (e) { return String(e) } }
  const [loud, quiet] = await Promise.all([run('ebur128=peak=true'), run('silencedetect=noise=-35dB:d=0.35')])
  return { durationSec: p.duration, hasAudio: true, ...parseEbur128(loud), silences: parseSilences(quiet, p.duration) }
}

/** One frame every 1.5 s (or fewer, at most 24 frames), small enough to send. */
async function frames(video: string, dir: string, duration: number): Promise<Array<{ second: number; jpeg: Uint8Array }>> {
  const step = Math.max(1.5, duration / 24)
  await ffmpeg(['-i', video, '-vf', `fps=1/${step.toFixed(3)},scale=540:-2`, '-q:v', '5', join(dir, 'f_%03d.jpg')], 180_000)
  const names = (await readdir(dir)).filter(n => /^f_\d+\.jpg$/.test(n)).sort()
  return Promise.all(names.map(async (n, i) => ({ second: Math.round(i * step * 10) / 10, jpeg: new Uint8Array(await readFile(join(dir, n))) })))
}

// ── What the agents read ─────────────────────────────────────────────────
const words = (t: string) => t.split(/\s+/).filter(Boolean).length
const fmt = (x: number | null | undefined, d = 1) => (x == null ? 'n/a' : x.toFixed(d))

export function sceneAt(d: ScriptDraft, second: number) {
  return d.scenes.find(s => second >= s.start && second < s.end) ?? d.scenes[d.scenes.length - 1]
}

function scriptBlock(d: ScriptDraft): string {
  return d.scenes.map(s => {
    const w = words(s.voice)
    const wpm = s.end > s.start ? Math.round((w / (s.end - s.start)) * 60) : 0
    return `${s.scene}. ${s.start.toFixed(1)}-${s.end.toFixed(1)} s · ${shotOf(s)} · ${wpm} wpm · voice: "${s.voice}" · stress: ${s.emphasis || '-'} · on screen: ${s.onScreen || '-'} · shows: ${s.visual}`
  }).join('\n')
}

function numbersBlock(rows: PerformanceRow[], durationSec: number): string {
  if (!rows.length) return 'No platform numbers were read yet.'
  return rows.map(r => {
    const watch = r.avgWatchMs == null ? null : r.avgWatchMs / 1000
    const share = watch != null && durationSec ? ` (${Math.round((watch / durationSec) * 100)}% of the video)` : ''
    return `- ${r.platform} at ${r.checkpoint ?? '?'}: views ${r.views ?? 'n/a'}, reach ${r.reach ?? 'n/a'}, avg watch ${fmt(watch)} s${share}, likes ${r.likes ?? 'n/a'}, comments ${r.comments ?? 'n/a'}, shares ${r.shares ?? 'n/a'}, saves ${r.saves ?? 'n/a'}, follows ${r.follows ?? 'n/a'}`
  }).join('\n')
}

function soundBlock(f: SoundFacts, d: ScriptDraft): string {
  const total = d.scenes.reduce((a, s) => a + words(s.voice), 0)
  const spoken = d.scenes.length ? d.scenes[d.scenes.length - 1].end : f.durationSec
  const long = f.silences.filter(s => s.end - s.start >= 0.35)
  return [
    `File length ${fmt(f.durationSec)} s · audio track ${f.hasAudio ? 'yes' : 'NO'}`,
    `Integrated loudness ${fmt(f.loudnessLufs)} LUFS (Reels and TikTok play best around -14 LUFS) · loudness range ${fmt(f.loudnessRangeLu)} LU · true peak ${fmt(f.truePeakDb)} dBFS (above -1 risks distortion)`,
    `Words ${total} over ${fmt(spoken)} s = ${spoken ? Math.round((total / spoken) * 60) : 0} wpm overall (the rule is 130 to 145 while speaking)`,
    `Silences of 0.35 s or more (below -35 dB): ${long.length ? long.map(s => `${s.start.toFixed(1)}-${s.end.toFixed(1)} s`).join(', ') : 'none (no breathing room, or music under every pause)'}`,
    `Silence before the first word: ${long[0] && long[0].start < 0.2 ? `${(long[0].end - long[0].start).toFixed(1)} s` : 'none'}`,
  ].join('\n')
}

const SYSTEM = 'You review one short vertical video for Student Visa Tax: Ella, a labelled AI presenter, explains Australian tax to international students (500 and 485 visas) on Instagram Reels and TikTok. Be deep, strict, specific and fair. Quote lines and give seconds. Use only the material given; when something cannot be judged from it, say so. No em or en dashes. English, markdown.'

const AGENTS = {
  content: `YOU ARE THE CONTENT AGENT. Judge the message and the writing.
Cover: the hook (first 3 s): does it name the viewer and open one question; the one idea: is it clear and repeatable in one sentence; the payoff; the call to action; the order of ideas; any line that loses the viewer; ESL clarity (IELTS 5.5); compliance (hedges, no refund promise, no agent claim); the caption and hashtags; and what the numbers say (watch time against length, shares, saves, comments).
Write: 1) Score out of 10 for hook, idea, structure, CTA, caption. 2) What worked (quote). 3) What to improve, most important first, each with a rewritten line. 4) A better hook (3 options) and a better CTA. 5) What the numbers suggest, with how sure you are.`,
  sound: `YOU ARE THE SOUND AGENT. You cannot play the audio: judge it from the exact words with their timings and the measurements of the finished file.
Cover: speaking speed per line and overall; lines that are too fast or too dense; where pauses fall and whether they land on meaning; the loudness against platform norms; peaks; dead air at the start or end; how the words will sound when read aloud (hard words, acronyms, numbers, tongue twisters, rhythm, robotic stop-start sentences); whether stress words are the right ones.
Write: 1) Score out of 10 for pace, clarity, rhythm, loudness. 2) What worked. 3) What to improve, most important first, each with the fixed line or the setting to change (speed, pause, loudness, music level). 4) Lines to respell for the voice, if any.`,
  look: `YOU ARE THE LOOK AGENT. You see frames from the finished video, in order, with the second and what that moment was meant to show.
Cover: the first frame as a thumbnail and scroll-stopper; Ella (face, eyes, mouth, look, framing, lighting, does she look like the same person); realism (does she read as a real person filmed on a phone or as AI: skin, eyes, teeth, hair, hands); lip sync (each frame says which line is spoken then: does the mouth shape fit those words); emotion (does her face match the feeling the motion prompt asked for at that second); every AI clip (fake or plastic look, hands, objects, does it show the line); cards and captions (readable on a phone, safe zones, covering the face, brand colours, too busy); pacing of the cuts; any text or logo inside the footage; anything unsafe or off brand.
Write: 1) Score out of 10 for first frame, Ella, clips, captions and cards, pacing. 2) What worked (with seconds). 3) What to improve, most important first (with seconds), and the fix (prompt change, shot change, edit change). 4) A rewritten HeyGen motion prompt for Ella, under 1,200 characters, that fixes what you saw.`,
} as const

function leadAsk(parts: Record<keyof typeof AGENTS, string>, header: string): string {
  return `${header}

## Content agent
${parts.content}

## Sound agent
${parts.sound}

## Look agent
${parts.look}

YOU ARE THE LEAD. Merge the three reviews into one report for Jo and for Claude, who changes the code from it.
Write, in this order:
1. Verdict in two sentences, and an overall score out of 10.
2. Scores table: area | score | one-line reason (hook, idea, structure, CTA, caption, pace, clarity, loudness, first frame, Ella, clips, captions and cards, pacing).
3. What worked: up to 6 points, each with the evidence (quote or second).
4. What to improve: up to 8 points, ranked by expected effect on watch time, sends and saves. For each: the problem (with second or quote), the fix, where it belongs (script rules, voice settings, shot prompts, edit and captions, cover, caption and hashtags, posting time), and how sure (high, medium, low).
5. The three changes to make first in the code.
6. What to test in the next videos and how to tell if it worked.
Drop anything the agents could not support, or mark it as a guess.`
}

// ── Running a review ─────────────────────────────────────────────────────
export async function reviewVideo(svc: EllaServices, productionId: string, deps: { llm?: Llm; looker?: FrameLooker } = {}): Promise<VideoReview> {
  const p = await svc.repo.production(productionId)
  if (!p) throw new Error(`No video ${productionId}`)
  const d = p.script?.script as ScriptDraft | undefined
  if (!d) throw new Error('This video has no script')
  const posted = p.posts.filter(x => x.status === 'published' && x.publishedAt).sort((a, b) => a.publishedAt!.localeCompare(b.publishedAt!))
  if (!posted.length) throw new Error('This video is not posted yet')
  const allPosts = await svc.repo.posts({ statuses: ['published'] })
  const videoPath = allPosts.find(x => x.productionId === p.id && x.videoPath)?.videoPath ?? p.render?.videoPath
  if (!videoPath) throw new Error('The finished video file is not stored')

  const dir = join(svc.workDir, `review-${p.id}`)
  await rm(dir, { recursive: true, force: true }).catch(() => {})
  await mkdir(dir, { recursive: true })
  try {
    const video = join(dir, 'video.mp4')
    await writeFile(video, await svc.media.get(videoPath))
    const sound = await soundFacts(video)
    const pics = await frames(video, dir, sound.durationSec || p.render?.durationSec || 30)
    const perf = (await svc.repo.performance(500)).filter(r => r.slug === p.slug)
      .sort((a, b) => a.platform.localeCompare(b.platform) || (a.checkpoint ?? '').localeCompare(b.checkpoint ?? ''))
    const rot = readRotation((await svc.repo.settings([LOOK_ROTATION_KEY]))[LOOK_ROTATION_KEY])
    const lookId = rot.assigned[p.id] ?? d.ellaLook
    const look = ELLA_LOOKS.find(l => l.id === lookId)

    const header = [
      `# ${p.title ?? p.slug}`,
      `Blog: ${p.slug} · pillar ${d.pillar} · hook type ${d.hookType} · CTA ${d.ctaType} · template ${d.template ?? '-'} · Ella look ${lookId}${look ? ` (${look.label})` : ''}`,
      `Posted: ${posted.map(x => `${x.platform} ${x.publishedAt!.slice(0, 16)}${x.permalink ? ` ${x.permalink}` : ''}`).join(' · ')}`,
      `Length ${fmt(sound.durationSec)} s · cost US$${p.spentUsd.toFixed(2)}`,
      `Core message: ${d.coreMessage}`,
    ].join('\n')
    const content = [
      header, '', '## Script, scene by scene (planned times)', scriptBlock(d),
      '', '## Caption (Instagram)', d.captions.instagram, '', '## Caption (TikTok)', d.captions.tiktok,
      '', '## Numbers so far', numbersBlock(perf, sound.durationSec),
      '', '## Automatic quality check at render', ((p.render?.qa ?? []) as Array<{ problem: string; severity: string }>).map(q => `- ${q.severity}: ${q.problem}`).join('\n') || 'Clean.',
    ].join('\n')
    const soundText = [header, '', '## Measurements of the finished file', soundBlock(sound, d), '', '## Exact words with timings', scriptBlock(d)].join('\n')
    const motion = takePrompt([...d.scenes].sort((a, b) => a.scene - b.scene))
    const lookText = [header, '', '## The plan (planned times)', scriptBlock(d), '', '## What HeyGen was told for Ella (motion prompt)', motion, '', `## Frames: ${pics.length}, one every ${pics.length > 1 ? fmt(pics[1].second - pics[0].second) : '?'} s`].join('\n')

    const llm = deps.llm ?? svc.llm()
    const looker = deps.looker ?? svc.looker?.()
    const safe = async (name: string, fn: () => Promise<string>) => {
      try { return await fn() } catch (e) { return `The ${name} agent failed: ${String((e as Error).message ?? e).slice(0, 300)}` }
    }
    const [c, s, l] = await Promise.all([
      safe('content', async () => (await llm.complete(SYSTEM, `${content}\n\n${AGENTS.content}`, { effort: 'medium' })).text),
      safe('sound', async () => (await llm.complete(SYSTEM, `${soundText}\n\n${AGENTS.sound}`, { effort: 'medium' })).text),
      safe('look', async () => looker
        ? looker.look(`${SYSTEM}\n\n${AGENTS.look}`, lookText, pics.map(f => {
          const sc = sceneAt(d, f.second)
          return { label: `Second ${f.second.toFixed(1)} · scene ${sc.scene} (${shotOf(sc)}) · spoken now: "${sc.voice}" · meant to show: ${sc.visual} · on screen: ${sc.onScreen || '-'}`, jpeg: f.jpeg }
        }))
        : Promise.resolve('The look agent could not run: no vision model is set (ANTHROPIC_API_KEY).')),
    ])
    const lead = await safe('lead', async () => (await llm.complete(SYSTEM, leadAsk({ content: c, sound: s, look: l }, header), { effort: 'medium' })).text)

    const at = svc.now().toISOString()
    const markdown = [
      `# Ella video review: ${p.title ?? p.slug}`,
      `Reviewed ${at.slice(0, 16)} UTC, ${Math.round((Date.parse(at) - Date.parse(posted[0].publishedAt!)) / 3600_000)} h after posting. Send this file to Claude in chat; the code is changed from it there.`,
      '', '## The report', lead,
      '', '---', '## Content agent', c, '', '## Sound agent', s, '', '## Look agent', l,
      '', '---', '# What the agents were given', content, '', '## Sound measurements', soundBlock(sound, d),
      '', `Frames sent to the look agent: ${pics.map(f => `${f.second.toFixed(1)} s`).join(', ')}`,
    ].join('\n')
    const review: VideoReview = { productionId: p.id, slug: p.slug, title: p.title, at, publishedAt: posted[0].publishedAt!, filename: `ella-video-review-${p.slug}-${at.slice(0, 10)}.md`, markdown }
    await svc.repo.setSettings({ [reviewKey(p.id)]: review })
    await svc.repo.audit('ella', 'video_review', { productionId: p.id, slug: p.slug, frames: pics.length })
    return review
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => {})
  }
}

/** Every posted video with where its review stands. */
export async function listVideoReviews(svc: EllaServices, days = 60): Promise<ReviewListRow[]> {
  const now = svc.now().getTime()
  const posts = (await svc.repo.posts({ statuses: ['published'] })).filter(x => x.publishedAt && now - Date.parse(x.publishedAt) < days * 86400_000)
  const by = new Map<string, typeof posts>()
  for (const x of posts) by.set(x.productionId, [...(by.get(x.productionId) ?? []), x])
  const ids = [...by.keys()]
  const saved = ids.length ? await svc.repo.settings([...ids.map(reviewKey), ...ids.map(reviewFailKey)]) : {}
  return ids.map(id => {
    const list = by.get(id)!.sort((a, b) => a.publishedAt!.localeCompare(b.publishedAt!))
    const first = list[0]
    const due = Date.parse(first.publishedAt!) + REVIEW_AFTER_HOURS * 3600_000
    const r = saved[reviewKey(id)] as VideoReview | null | undefined
    const f = saved[reviewFailKey(id)] as ReviewFail | null | undefined
    const retryAt = f ? Date.parse(f.at) + RETRY_HOURS * 3600_000 : 0
    const state: ReviewListRow['state'] = r ? 'ready' : f && (f.tries >= MAX_TRIES || now < retryAt) ? 'failed' : now >= due ? 'due' : 'waiting'
    return {
      productionId: id, slug: first.slug, title: first.title, publishedAt: first.publishedAt!, platforms: [...new Set(list.map(x => x.platform))],
      dueAt: new Date(due).toISOString(), state, reviewedAt: r?.at ?? null, error: !r && f ? f.error : null,
    } satisfies ReviewListRow
  }).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

/** Scheduler step: one due review per run, only when Ella is not busy making something. */
export async function reviewDue(svc: EllaServices): Promise<string> {
  const busy = await svc.repo.productionsIn(['drawn', 'scripting', 'approved', 'producing'])
  if (busy.length) return 'Waiting: a script or video is in progress'
  const due = (await listVideoReviews(svc, REVIEW_WINDOW_DAYS)).filter(r => r.state === 'due').sort((a, b) => a.publishedAt.localeCompare(b.publishedAt))
  if (!due.length) return 'No video due for review'
  const id = due[0].productionId
  let r: VideoReview
  try {
    r = await reviewVideo(svc, id)
  } catch (e) {
    const prev = ((await svc.repo.settings([reviewFailKey(id)]))[reviewFailKey(id)] ?? null) as ReviewFail | null
    const fail: ReviewFail = { tries: (prev?.tries ?? 0) + 1, at: svc.now().toISOString(), error: String((e as Error)?.message ?? e).slice(0, 300) }
    await svc.repo.setSettings({ [reviewFailKey(id)]: fail })
    throw new Error(`${due[0].slug}: ${fail.error} (try ${fail.tries} of ${MAX_TRIES})`)
  }
  await svc.repo.setSettings({ [reviewFailKey(id)]: null })
  await svc.repo.raiseAlert('review', `video_review:${r.productionId}`, `The 24-hour review of "${r.title ?? r.slug}" is ready on the Learning tab.`).catch(() => {})
  return `Reviewed ${r.slug}${due.length > 1 ? ` (${due.length - 1} more waiting)` : ''}`
}

export async function getVideoReview(svc: EllaServices, productionId: string): Promise<VideoReview | null> {
  return ((await svc.repo.settings([reviewKey(productionId)]))[reviewKey(productionId)] as VideoReview | null | undefined) ?? null
}
