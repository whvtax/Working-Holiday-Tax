/**
 * Stage 2: an approved script becomes a finished, checked video.
 *
 *   1. Voice: the whole script in one take (Ella's voice runs on without a
 *      break over the illustration clips). Character timings -> words.
 *   2. Timing: every scene moved to where its first word is really spoken.
 *   3. Ella scenes: the approved master photo (or a look) + that scene's slice
 *      of the voice -> Avatar 6 talking clip, lips in sync.
 *   4. Illustration scenes: heygen-video-1 clip from the scene's shot prompt.
 *   5. Edit: our own render with brand captions (compose.ts).
 *   6. QA: machine checks + Claude's visual review (qa.ts).
 *   7. Status: video_ready if nothing blocks, else video_needs_jo.
 *
 * Safe to run again at any time: finished steps are reused, submitted jobs are
 * polled (never submitted twice), and a spending cap is checked before every
 * paid call. regenerateScene() redoes one scene and re-renders.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { shotOf, type ScriptDraft, type Scene } from '../script/types'
import type { EllaStore, StepStore } from '../store'
import { buildEditPlan, render, type EditPlan } from './compose'
import { avatarModel, type VideoProvider } from './heygen'
import { applyEdit, type VideoEditor } from './editor'
import { dropRepeatedHeadlines } from './compose'
import { displayText } from './compose'
import { coverPng, safeDesign, type CoverDesign, type CoverDesigner } from './cover'
import { ffmpeg, frameAt, httpDownload, probe, type Downloader, type MediaStore } from './media'
import { machineChecks, visionCheck, type QaIssue, type VisionReviewer } from './qa'
import type { Step, StepKind } from './steps'
import { charsToWords, timeScenes, voiceText, type TimedScene, type Word } from './timing'

/**
 * List prices (USD, Nov 2026). Clips: heygen-video-1 at 768p 0.018/s, 1080p
 * 3x, 5 s minimum. Avatar 6: 0.10/s (reseller list price, check the first
 * invoice; ELLA_PRICE_AVATAR_PER_SEC overrides). Voice: the free model ends
 * 30 Nov 2026, about 0.06 a video after that.
 */
export const PRICES = {
  clipPerSec: { '768p': 0.018, '1080p': 0.054 } as Record<string, number>,
  /** Avatar 6 Turbo 0.05/s, Avatar 6 0.10/s. */
  get avatarPerSec() { return Number(process.env.ELLA_PRICE_AVATAR_PER_SEC ?? (avatarModel() === 'heygen-avatar-6' ? 0.1 : 0.05)) },
  ttsPerVideo: 0.06,
}

/**
 * An error where we cannot know whether the provider accepted the job (network
 * cut, timeout, 5xx, rate limit). The step stays pending and the next run sends
 * the same request with the same idempotency key, so a job is never paid twice.
 */
export function ambiguous(e: unknown): boolean {
  const m = String((e as Error)?.message ?? e)
  const http = /HTTP (\d{3})/.exec(m)
  if (!http) return !/^Missing |not configured|Spending cap/i.test(m)
  const code = Number(http[1])
  return code >= 500 || code === 408 || code === 429
}

export interface ProduceSettings {
  productionId: string
  scriptVersion: number
  script: ScriptDraft
  voiceId: string
  /** Storage path of the approved Ella photo for this look (the master by default). */
  lookImagePath: string
  clipResolution?: '768p' | '1080p'
  /** Hard cap for all paid calls of this production. Default 6 USD. */
  maxUsd?: number
  pollEveryMs?: number
  pollTimeoutMs?: number
  workDir: string
  /** Quiet background music under the voice (HeyGen library). */
  music?: boolean
  /** Voice tempo; 1.02 by default (Jo). */
  voiceSpeed?: number
  /** Shortest allowed video in seconds; 29 by default. */
  minSeconds?: number
  /** Jo's edit of a finished video: an instruction for Claude, and/or his own per-scene changes. */
  edit?: JoEdit
  actor?: string
  /** Time this run may spend before it stops optional work (the server limit is 800 s). Default 600 s. */
  budgetMs?: number
  /** When the server request started (ms). Set by the caller so waits and retries count against one budget. */
  startedAt?: number
}

export interface ProduceDeps {
  store: EllaStore
  steps: StepStore
  provider: VideoProvider
  media: MediaStore
  vision?: VisionReviewer
  /** Claude the editor: plans the cut before rendering and fixes it once after the check. */
  editor?: VideoEditor
  /** The cover designer (a strong model): frame, title and key word, drawn on brand by code. */
  coverDesigner?: CoverDesigner
  download?: Downloader
  sleep?: (ms: number) => Promise<void>
}

export type ProduceOutcome =
  | { status: 'video_ready' | 'video_needs_jo'; renderVersion: number; videoPath: string; duration: number; issues: QaIssue[]; spentUsd: number }
  | { status: 'failed'; error: string; spentUsd: number }
  | { status: 'producing'; waitingOn: number[]; spentUsd: number }
  /** The real voice is under the minimum: stopped before anything else is paid; the script goes back to be lengthened. */
  | { status: 'too_short'; seconds: number; wpm: number | null; spentUsd: number }

const round2 = (n: number) => Math.round(n * 100) / 100
const base = (s: ProduceSettings) => `productions/${s.productionId}/v${s.scriptVersion}`

export class BudgetError extends Error {}
/** A provider job is still rendering: not a failure, the next run picks it up. */
export class StillRunning extends Error {}

async function spent(steps: StepStore, s: ProduceSettings) {
  return (await steps.list(s.productionId, s.scriptVersion)).reduce((a, x) => a + (x.costUsd ?? 0), 0)
}

/** Reuses a finished step, resumes a submitted one, or starts a new attempt. */
async function step(deps: ProduceDeps, s: ProduceSettings, kind: StepKind, scene: number, input: Record<string, unknown>, estimateUsd: number,
  run: (st: Step) => Promise<{ providerJobId?: string; output?: Record<string, unknown>; costUsd?: number }>,
  finish?: (st: Step) => Promise<{ output: Record<string, unknown>; costUsd?: number }>): Promise<Step> {
  let st = await deps.steps.current(s.productionId, s.scriptVersion, kind, scene)
  if (st?.status === 'completed') return st
  // A job HeyGen made and we paid for, that failed only on our side (download
  // or storage), is collected again; it is never ordered and paid twice.
  if (st?.status === 'failed' && st.providerJobId && finish && !providerFailed(st.error)) {
    await deps.steps.update(st.id, { status: 'submitted', error: null })
    st = { ...st, status: 'submitted' }
  }
  if (!st || st.status === 'failed') {
    const cap = s.maxUsd ?? 4
    const already = await spent(deps.steps, s)
    if (already + estimateUsd > cap) throw new BudgetError(`Spending cap: ${round2(already)} spent + ${round2(estimateUsd)} for ${kind} ${scene} is over ${cap} USD`)
    st = await deps.steps.start({ productionId: s.productionId, scriptVersion: s.scriptVersion, kind, scene, input })
  }
  if (st.status === 'pending') {
    try {
      const r = await run(st)
      if (r.providerJobId) {
        await deps.steps.update(st.id, { status: 'submitted', providerJobId: r.providerJobId, costUsd: r.costUsd })
        st = { ...st, status: 'submitted', providerJobId: r.providerJobId, costUsd: r.costUsd ?? null }
      } else {
        await deps.steps.update(st.id, { status: 'completed', output: r.output ?? {}, costUsd: r.costUsd })
        return { ...st, status: 'completed', output: r.output ?? {}, costUsd: r.costUsd ?? null }
      }
    } catch (e) {
      if (ambiguous(e)) {
        // Unknown whether it was accepted: keep the same key and try again next run.
        await deps.steps.update(st.id, { error: `Will retry with the same request: ${String((e as Error).message ?? e).slice(0, 300)}` })
        throw new StillRunning(`Retrying ${kind} ${scene} next run`)
      }
      await deps.steps.update(st.id, { status: 'failed', error: String((e as Error).message ?? e) })
      throw e
    }
  }
  if (st.status === 'submitted' && finish) {
    try {
      const r = await finish(st)
      await deps.steps.update(st.id, { status: 'completed', output: r.output, costUsd: r.costUsd })
      return { ...st, status: 'completed', output: r.output }
    } catch (e) {
      if (e instanceof StillRunning) throw e
      const msg = String((e as Error).message ?? e)
      // Only a failure at HeyGen ends the job; our own download or storage problem keeps it to collect next run.
      if (providerFailed(msg)) await deps.steps.update(st.id, { status: 'failed', error: msg })
      else await deps.steps.update(st.id, { error: `Will collect again next run: ${msg.slice(0, 300)}` })
      throw e
    }
  }
  return st
}

/** Polls a provider job until done, then copies the file into Ella's storage at once (links expire). */
export interface JoEdit { note?: string; overrides?: Array<{ scene: number; headline?: string; zoom?: number; shot?: 'ella' }>; at?: string }

/** Jo's own per-scene changes: the headline text (empty for none) and the zoom, on top of everything else. */
export function applyJoEdit(plan: EditPlan, overrides: NonNullable<JoEdit['overrides']>): EditPlan {
  // Ella's one take covers the whole voice, so any scene can show her instead (free).
  const take = plan.scenes.find(x => x.shot === 'ella' && x.offset !== undefined)?.clipPath
  return { ...plan, scenes: plan.scenes.map(e0 => {
    const o = overrides.find(x => Number(x.scene) === e0.scene)
    if (!o) return e0
    const e = o.shot === 'ella' && take && e0.shot !== 'ella'
      ? { ...e0, shot: 'ella' as const, ellaInFrame: true, clipPath: take, offset: e0.start, graphic: undefined, zoom: 1 }
      : e0
    const headline = typeof o.headline === 'string' && !e.graphic ? o.headline.replace(/[–—]/g, '-').trim().slice(0, 60) : e.headline
    const zoom = e.shot === 'ella' || e.ellaInFrame ? (Number(o.zoom) > 1 ? 1.1 : o.zoom === undefined ? e.zoom : 1) : e.zoom
    const hw = new Set(headline.toLowerCase().split(/\s+/))
    return { ...e, headline, zoom, headlineHighlight: headline === e.headline ? e.headlineHighlight : e.headlineHighlight.filter(w => hw.has(w.toLowerCase())) }
  }) }
}

/** Jo: no video under this many seconds (a little under 30 allows for the closing pause). */
export const MIN_VOICE_SECONDS = 29

/** Ella speaks 10% faster than the raw voice (Jo, Nov 21). */
export const VOICE_SPEED = 1.02

/** True when the error says the job itself failed at HeyGen (as opposed to our download or storage). */
export const providerFailed = (error: string | null | undefined) => /^Provider job \S+ (failed|cancelled)/.test(String(error ?? ''))

/** Above this size a provider video is re-encoded before it is stored (Supabase has a per-file size limit). */
export const MAX_STORE_BYTES = 30 * 1024 * 1024

/** Shrinks a large video to a size storage accepts, at a quality the final edit cannot tell apart. */
export async function shrinkVideo(bytes: Uint8Array, workDir: string): Promise<Uint8Array> {
  if (bytes.byteLength <= MAX_STORE_BYTES) return bytes
  await mkdir(workDir, { recursive: true })
  const src = join(workDir, `big-${Date.now()}.mp4`), out = join(workDir, `small-${Date.now()}.mp4`)
  await writeFile(src, bytes)
  for (const crf of [20, 24, 28]) {
    await ffmpeg(['-y', '-i', src, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', String(crf), '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', out])
    const small = new Uint8Array(await readFile(out))
    if (small.byteLength <= MAX_STORE_BYTES || crf === 28) return small
  }
  return bytes
}

async function collect(deps: ProduceDeps, s: ProduceSettings, jobId: string, path: string, deadline: number) {
  const sleep = deps.sleep ?? (ms => new Promise(r => setTimeout(r, ms)))
  for (;;) {
    const j = await deps.provider.getVideo(jobId)
    if (j.status === 'completed' && j.videoUrl) {
      const raw = await (deps.download ?? httpDownload)(j.videoUrl)
      await deps.media.put(path, await shrinkVideo(raw, join(s.workDir, 'shrink')))
      return { path, duration: j.duration ?? null }
    }
    if (j.status === 'failed' || j.status === 'cancelled') throw new Error(`Provider job ${jobId} ${j.status}: ${j.failure ?? 'no reason given'}`)
    if (Date.now() + (s.pollEveryMs ?? 10_000) > deadline) throw new StillRunning(`Provider job ${jobId} is still ${j.status}`)
    await sleep(s.pollEveryMs ?? 10_000)
  }
}

/** Ella's movement for her scene, from the script (bible s11 action column). */
export function motionPrompt(sc: Scene): string {
  const action = sc.shotPrompt.match(/ACTION:\s*(.+)/)?.[1] ?? sc.action
  return `${action} Natural, calm presenter energy, small hand gestures, steady eye contact with the camera. No exaggerated expressions.`
}

/**
 * One prompt for Ella's single take of the whole voice (plan v2): a calm
 * presenter, with at most 3 small gestures, each on the word it belongs to.
 * Fewer gestures look more human; constant motion is what reads as AI.
 */
export function takePrompt(scenes: readonly Scene[]): string {
  const cues = scenes.filter(sc => shotOf(sc) === 'ella' && sc.syncWord && sc.action)
    .slice(0, 6)
    .map(sc => `on "${sc.syncWord}": ${(sc.shotPrompt.match(/ACTION:\s*(.+)/)?.[1] ?? sc.action).trim().replace(/\.$/, '')}`)
  return [
    'A friendly young woman talks straight to camera like a warm friend explaining something useful, seated at her desk, hands visible at chest height.',
    'Her hands move naturally the whole time she talks, the way people really talk: open palms when she explains, a small count on her fingers for steps, a light point toward the camera for "you", hands coming together when she sums up, a relaxed pause between gestures.',
    cues.length ? `Clear gestures at these moments, ${cues.join('; ')}.` : '',
    'Gestures follow the rhythm and meaning of her words, relaxed and natural. Steady eye contact, natural blinks, small head nods, real facial expression that matches the words, a soft smile at the end.',
    'Not stiff and not theatrical: no frozen hands, no big sweeping arms, no looking away, no camera movement.',
  ].filter(Boolean).join(' ').slice(0, 1200)
}

/** Illustration clip prompt: the scene's own prompt plus what we never want in footage. */
export function clipPrompt(sc: Scene): string {
  return `${sc.shotPrompt}\nAVOID: any on-screen text, letters, numbers, logos, brand names, watermarks or captions; distorted hands; extra fingers.`
}

/** Where a video's cover image lives: next to it, same stamp. */
export const coverPathFor = (videoPath: string) => videoPath.replace(/final-(\d+)\.mp4$/, 'cover-$1.jpg')

export async function produceVideo(deps: ProduceDeps, s: ProduceSettings): Promise<ProduceOutcome> {
  const actor = s.actor ?? 'ella-stage2'
  const scenes = [...s.script.scenes].sort((a, b) => a.scene - b.scene)
  const res = s.clipResolution ?? '768p'
  // One waiting budget for the whole run: jobs still rendering after it are left for the next run.
  const deadline = Date.now() + (s.pollTimeoutMs ?? 20 * 60_000)
  // The server stops every run at 800 seconds (Vercel). The optional second edit pass and the cover
  // are only started when they fit in what is left of this run's budget.
  const started = s.startedAt ?? Date.now()
  const budgetMs = s.budgetMs ?? 600_000
  const left = () => budgetMs - (Date.now() - started)
  try {
    await deps.store.setStatus(s.productionId, 'producing')
    await deps.store.audit(actor, 'production_started', { productionId: s.productionId, scriptVersion: s.scriptVersion })

    // 1. Voice, one take.
    const text = voiceText(scenes)
    const voice = await step(deps, s, 'voice', 0, { text, voiceId: s.voiceId }, PRICES.ttsPerVideo, async () => {
      const t = await deps.provider.tts({ text, voiceId: s.voiceId })
      const ext = /\.(wav|mp3)(\?|$)/i.exec(t.audioUrl)?.[1]?.toLowerCase() ?? 'wav'
      await mkdir(s.workDir, { recursive: true })
      const raw = join(s.workDir, `voice-raw.${ext}`), fast = join(s.workDir, 'voice.wav')
      await writeFile(raw, await (deps.download ?? httpDownload)(t.audioUrl))
      // Jo: a little quicker, without changing her pitch. The take is made from this file, so lips stay in sync.
      const speed = s.voiceSpeed ?? VOICE_SPEED
      await ffmpeg(['-y', '-i', raw, '-filter:a', `atempo=${speed}`, '-ac', '1', '-ar', '44100', fast])
      // The real length of the file, not the number in the reply: a wrong length would cut the video short.
      const duration = (await probe(fast)).duration
      const path = `${base(s)}/voice.wav`
      await deps.media.put(path, new Uint8Array(await readFile(fast)))
      const w = charsToWords(t.chars).map(x => ({ ...x, start: x.start / speed, end: x.end / speed }))
      return { output: { path, duration, words: w, speed, wordsPerSecond: w.length && duration ? Math.round((w.length / duration) * 100) / 100 : null }, costUsd: PRICES.ttsPerVideo }
    })
    // Jo: never under 30 seconds. Checked on the real voice, before Ella's take or any clip is paid for.
    const realWpm = voice.output.wordsPerSecond ? Math.round(Number(voice.output.wordsPerSecond) * 60) : null
    if (realWpm) await deps.store.setSettings({ voice_wpm: realWpm }).catch(() => {})
    if (Number(voice.output.duration) < (s.minSeconds ?? MIN_VOICE_SECONDS)) {
      await deps.store.audit(actor, 'voice_too_short', { productionId: s.productionId, seconds: Number(voice.output.duration), wpm: realWpm })
      return { status: 'too_short', seconds: round2(Number(voice.output.duration)), wpm: realWpm, spentUsd: round2(await spent(deps.steps, s)) }
    }
    const voicePath = await deps.media.localPath(String(voice.output.path))
    const words = voice.output.words as Word[]

    // 2. Real timing.
    const timed: TimedScene[] = timeScenes(scenes, words, Number(voice.output.duration))

    // 3 and 4. Ella's take and the AI clips (plan v2). Ella speaks the whole
    // voice in ONE continuous take (one job, one look, no seams); the editor
    // cuts into it for her scenes. Clips are made only for "clip" scenes (at
    // most 2); "graphic" scenes are cards drawn by code and cost nothing.
    // Phase A submits every missing job (they render in parallel at the
    // provider); phase B collects them. A failed job does not stop the others
    // from being collected, so the next run redoes only it.
    const shots = new Map(scenes.map(sc => [sc.scene, shotOf(sc)]))
    const voiceEnd = timed.length ? timed[timed.length - 1].end : Number(voice.output.duration)
    type Job = { scene: number; kind: StepKind; input: Record<string, unknown>; est: number; submit: (row: Step) => Promise<{ providerJobId: string; costUsd: number }>; finish: (row: Step) => Promise<{ output: Record<string, unknown> }> }
    const jobs: Job[] = []
    if (timed.some(t => shots.get(t.scene) === 'ella')) {
      const est = round2(Math.max(Number(voice.output.duration), voiceEnd) * PRICES.avatarPerSec)
      const prompt = takePrompt(scenes)
      jobs.push({ scene: 0, kind: 'ella_scene', input: { take: 'whole voice', motion: prompt, model: avatarModel() }, est,
        finish: async (row: Step) => ({ output: await collect(deps, s, row.providerJobId!, `${base(s)}/ella-take-${row.id.slice(0, 8)}.mp4`, deadline) }),
        submit: async (row: Step) => {
          const look = await deps.media.get(s.lookImagePath)
          const imageAssetId = await deps.provider.uploadAsset(look, 'ella-look.png')
          const ext = /\.(wav|mp3)$/i.exec(voicePath)?.[1]?.toLowerCase() ?? 'mp3'
          const audioAssetId = await deps.provider.uploadAsset(new Uint8Array(await readFile(voicePath)), `voice.${ext}`)
          const id = await deps.provider.submitAvatar({ imageAssetId, audioAssetId, motionPrompt: prompt, idempotencyKey: row.idempotencyKey })
          return { providerJobId: id, costUsd: est }
        } })
    }
    for (const t of timed) {
      if (shots.get(t.scene) !== 'clip') continue
      const sc = scenes.find(x => x.scene === t.scene)!
      const billed = Math.min(15, Math.max(5, Math.ceil(t.end - t.start)))
      const est = round2(billed * PRICES.clipPerSec[res])
      jobs.push({ scene: t.scene, kind: 'clip', input: { prompt: clipPrompt(sc), duration: billed, resolution: res }, est,
        // Each attempt gets its own file, so a redone scene can never pick up the old clip from a cache.
        finish: async (row: Step) => ({ output: await collect(deps, s, row.providerJobId!, `${base(s)}/scene-${t.scene}-${row.id.slice(0, 8)}.mp4`, deadline) }),
        submit: async (row: Step) => {
          const id = await deps.provider.submitClip({ prompt: clipPrompt(sc), duration: billed, resolution: res, idempotencyKey: row.idempotencyKey })
          return { providerJobId: id, costUsd: est }
        } })
    }
    for (const j of jobs) {
      // A dropped connection on one submit must not stop the others; it is retried below with the same key.
      try { await step(deps, s, j.kind, j.scene, j.input, j.est, j.submit) } catch (e) { if (!(e instanceof StillRunning)) throw e }
    }
    const failures: string[] = []
    const waiting: number[] = []
    const clips: Record<number, string> = {}
    let take: string | null = null
    for (const j of jobs) {
      try {
        const done = await step(deps, s, j.kind, j.scene, j.input, j.est, j.submit, j.finish)
        if (done.status !== 'completed') throw new StillRunning('not finished')
        const path = await deps.media.localPath(String(done.output.path))
        if (j.kind === 'ella_scene') take = path
        else clips[j.scene] = path
      } catch (e) {
        if (e instanceof StillRunning) waiting.push(j.scene)
        else failures.push(`${j.kind === 'ella_scene' ? "Ella's take" : `scene ${j.scene}`}: ${String((e as Error).message ?? e)}`)
      }
    }
    if (failures.length) throw new Error(`Not ready: ${failures.join('; ')}`)
    if (waiting.length) return { status: 'producing', waitingOn: waiting, spentUsd: round2(await spent(deps.steps, s)) }

    // 5. Edit and render. Claude the editor decides punch-ins and headlines
    // on top of the default cut; if it fails, the default cut is used.
    const base0: EditPlan = buildEditPlan({ scenes, timed, clips, take, voicePath, keyTerm: s.script.keyTerm, series: s.script.series })
    const edit = async (from: EditPlan, problems?: string[]): Promise<EditPlan> => {
      if (!deps.editor) return from
      try {
        const r = await deps.editor.plan({ plan: from, scenes, problems })
        await deps.store.logUsage({ productionId: s.productionId, feature: 'ella_video_edit', model: r.model, inputTokens: r.inputTokens, outputTokens: r.outputTokens })
        const next = applyEdit(from, scenes, r.decisions)
        return { ...next, editor: { summary: String(r.summary ?? ''), pass: problems ? 2 : 1, decisions: r.decisions } }
      } catch (e) {
        await deps.store.audit(actor, 'editor_skipped', { productionId: s.productionId, error: String((e as Error).message ?? e).slice(0, 300) })
        return from
      }
    }
    const qa = async (out: string, plan: EditPlan) => {
      const issues = await machineChecks(out, plan)
      if (deps.vision) {
        const v = await visionCheck(out, plan, scenes, join(s.workDir, 'qa'), deps.vision)
        issues.push(...v.issues)
        await deps.store.logUsage({ productionId: s.productionId, feature: 'ella_video_qa', model: v.model, inputTokens: v.inputTokens, outputTokens: v.outputTokens })
      } else {
        issues.push({ second: null, scene: null, check: 'vision', problem: 'Visual check not run', severity: 'warn' })
      }
      return issues
    }
    // Background music from HeyGen's library: picked once per video, kept for every re-render.
    if (s.music && deps.provider.searchMusic) {
      // Background music is part of every video (Jo). Several moods are tried; if none is found the video
      // stops with a clear message instead of going out without music.
      const key = `${base(s)}/music.wav`
      let bytes: Uint8Array | null = null
      try { bytes = await deps.media.get(key) } catch { bytes = null }
      if (!bytes) {
        const moods = ['calm warm lo-fi background music, soft beat, friendly, no vocals', 'soft ambient background music, warm, no vocals', 'gentle piano background music, calm, no vocals']
        let found: Array<{ id: string; url: string; duration: number }> = []
        for (const mood of moods) {
          try { found = (await deps.provider.searchMusic(mood)).filter(m => !m.duration || m.duration >= 20) } catch (e) { await deps.store.audit(actor, 'music_search_failed', { productionId: s.productionId, error: String((e as Error).message ?? e).slice(0, 200) }) }
          if (found.length) break
        }
        if (!found.length) throw new Error('No background music found in the HeyGen music library. Music is required; the video was not made without it.')
        bytes = await (deps.download ?? httpDownload)(found[0].url)
        await deps.media.put(key, bytes)
      }
      const local = join(s.workDir, 'music.wav')
      await writeFile(local, bytes)
      base0.musicPath = local
    }
    let plan = await edit(base0)
    // Jo's edit: first his instruction to Claude, then his own per-scene changes, which win.
    if (s.edit?.note?.trim()) plan = await edit(plan, [`Jo asks: ${s.edit.note.trim()}`])
    if (s.edit?.overrides?.length) plan = applyJoEdit(plan, s.edit.overrides)
    // Claude's and Jo's headlines never repeat the spoken caption on screen at the same moment.
    plan = dropRepeatedHeadlines(plan)
    let stamp = Date.now()
    let out = join(s.workDir, `final-${stamp}.mp4`)
    let t = Date.now()
    await render(plan, join(s.workDir, `layers-${stamp}`), out)
    const renderMs = Date.now() - t
    t = Date.now()
    // 6. QA. When the check finds a picture problem the editor can fix, Claude
    // changes the edit and the video is rendered again, once. The better of
    // the two cuts is kept.
    let issues = await qa(out, plan)
    const qaMs = Date.now() - t
    await deps.store.audit(actor, 'render_timing', { productionId: s.productionId, renderMs, qaMs, leftMs: left() })
    const fixable = issues.filter(i => i.check === 'vision' && i.problem !== 'Visual check not run')
    // The second pass needs an edit, a render and a check. It is skipped when this run has no time for it:
    // the first video is kept and goes to Jo as it is.
    if (deps.editor && fixable.length && left() > (renderMs + qaMs) * 2 + 60_000) {
      const plan2 = await edit(plan, fixable.map(i => `${i.scene ? `scene ${i.scene}` : 'whole video'}${i.second != null ? ` at ${i.second}s` : ''}: ${i.problem}`))
      if (plan2 !== plan) {
        const stamp2 = Date.now() + 1
        const out2 = join(s.workDir, `final-${stamp2}.mp4`)
        await render(plan2, join(s.workDir, `layers-${stamp2}`), out2)
        const issues2 = await qa(out2, plan2)
        const score = (x: QaIssue[]) => x.filter(i => i.severity === 'block').length * 10 + x.length
        if (score(issues2) <= score(issues)) { plan = plan2; out = out2; stamp = stamp2; issues = issues2 }
      }
    }
    const p = await probe(out)
    const videoPath = await deps.media.put(`${base(s)}/final-${stamp}.mp4`, await shrinkVideo(new Uint8Array(await readFile(out)), join(s.workDir, 'shrink')))
    // The cover: a frame from the hook (headline and tag already on it), saved next to the video.
    // The cover (Jo): designed for the profile grid, drawn on brand by code.
    try {
      const moments = plan.scenes.map(e => {
        const sc = scenes.find(x => x.scene === e.scene)
        return { second: Math.round(((e.start + e.end) / 2) * 10) / 10, what: e.graphic ? `a brand card: ${e.graphic.title}` : e.shot === 'ella' ? `Ella talking, saying "${sc?.voice ?? ''}"` : `AI clip: ${sc?.visual ?? ''}` }
      }).filter(m => !m.what.startsWith('a brand card'))
      const recent = ((await deps.store.settings(['cover_titles'])).cover_titles ?? []) as string[]
      let asked: Partial<CoverDesign> | null = null
      if (deps.coverDesigner) {
        try {
          const r = await deps.coverDesigner.design({ hook: scenes[0]?.voice ?? '', coreMessage: s.script.coreMessage, keyTerm: displayText(s.script.keyTerm ?? ''), series: s.script.series, moments, recentTitles: recent })
          asked = r
          await deps.store.logUsage({ productionId: s.productionId, feature: 'ella_cover', model: r.model, inputTokens: r.inputTokens, outputTokens: r.outputTokens })
        } catch (e) { await deps.store.audit(actor, 'cover_fallback', { productionId: s.productionId, error: String((e as Error).message ?? e).slice(0, 200) }) }
      }
      const design = safeDesign(asked, { hook: displayText(scenes[0]?.voice ?? ''), keyTerm: s.script.keyTerm ?? '', second: moments[0]?.second ?? 0.6 }, p.duration)
      const still = join(s.workDir, `still-${stamp}.png`)
      // The cover frame (Jo): a frame where Ella's eyes are open and the face is right. Several frames near the
      // hook are checked; the first one with no face problem is used, else the planned frame.
      const seconds = [design.second, design.second + 0.4, design.second + 0.8, design.second - 0.3, design.second + 1.2, design.second + 1.6]
        .map(x => Math.max(0.2, Math.min(p.duration - 0.2, x)))
      let chosen = design.second
      if (deps.vision) {
        try {
          // The candidate frames are cut side by side; the order of the list is kept.
          const frames = await Promise.all([...new Set(seconds.map(x => Math.round(x * 10) / 10))].map(async sec => {
            const f = join(s.workDir, `cover-try-${Math.round(sec * 10)}.jpg`)
            await frameAt(out, sec, f)
            return { second: sec, scene: 1, jpeg: new Uint8Array(await readFile(f)), expected: 'the presenter, eyes open, face natural, looking at the camera' }
          }))
          const r = await deps.vision.review(frames)
          const bad = new Set(r.issues.filter(i => i.second != null).map(i => Number(i.second)))
          const ok = frames.find(f => !bad.has(f.second))
          if (ok) chosen = ok.second
          await deps.store.audit(actor, 'cover_frame', { productionId: s.productionId, second: chosen, tried: frames.length, rejected: bad.size })
        } catch (e) { await deps.store.audit(actor, 'cover_frame_fallback', { productionId: s.productionId, error: String((e as Error).message ?? e).slice(0, 200) }) }
      }
      await ffmpeg(['-y', '-ss', chosen.toFixed(2), '-i', out, '-frames:v', '1', still])
      await deps.media.put(coverPathFor(videoPath), new Uint8Array(await coverPng(await readFile(still), design, s.script.series)))
      await deps.store.setSettings({ cover_titles: [design.title, ...recent].slice(0, 9) }).catch(() => {})
    } catch {
      try {
        const cover = join(s.workDir, `cover-${stamp}.jpg`)
        await frameAt(out, Math.min(1, p.duration / 3), cover)
        await deps.media.put(coverPathFor(videoPath), new Uint8Array(await readFile(cover)))
      } catch { /* no cover: Instagram falls back to the first frame */ }
    }
    const passed = !issues.some(i => i.severity === 'block')
    const renderVersion = await deps.steps.saveRender({
      productionId: s.productionId, scriptVersion: s.scriptVersion, videoPath, editPlan: plan, captions: plan.captions,
      durationSec: round2(p.duration), qa: issues, qaPassed: passed,
    })

    // 7. Status. Even a clean video waits for Jo's approval before anything is published.
    const status = passed ? 'video_ready' : 'video_needs_jo'
    await deps.store.setStatus(s.productionId, status, { scriptVersion: s.scriptVersion, renderVersion })
    const total = round2(await spent(deps.steps, s))
    await deps.store.audit(actor, 'video_rendered', { productionId: s.productionId, renderVersion, status, issues: issues.length, spentUsd: total })
    return { status, renderVersion, videoPath, duration: round2(p.duration), issues, spentUsd: total }
  } catch (e) {
    const error = String((e as Error).message ?? e)
    await deps.store.audit(actor, 'production_failed', { productionId: s.productionId, error })
    await deps.store.setStatus(s.productionId, 'video_needs_jo')
    return { status: 'failed', error, spentUsd: round2(await spent(deps.steps, s)) }
  }
}

/** Redo one scene (a QA problem or Jo's request), keep every other scene, render again. */
export async function regenerateScene(deps: ProduceDeps, s: ProduceSettings, scene: number): Promise<ProduceOutcome> {
  const sc = s.script.scenes.find(x => x.scene === scene)
  if (!sc) throw new Error(`No scene ${scene}`)
  // Ella's scenes all come from one take, so redoing one redoes the take; a card is redrawn for free on render.
  const shot = shotOf(sc)
  if (shot === 'ella') await deps.steps.supersede(s.productionId, s.scriptVersion, 'ella_scene', 0)
  else if (shot === 'clip') await deps.steps.supersede(s.productionId, s.scriptVersion, 'clip', scene)
  await deps.store.audit(s.actor ?? 'ella-stage2', 'scene_regenerate', { productionId: s.productionId, scene })
  return produceVideo(deps, s)
}
