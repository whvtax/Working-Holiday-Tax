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
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { ScriptDraft, Scene } from '../script/types'
import type { EllaStore, StepStore } from '../store'
import { buildEditPlan, render, type EditPlan } from './compose'
import type { VideoProvider } from './heygen'
import { httpDownload, probe, sliceAudio, type Downloader, type MediaStore } from './media'
import { machineChecks, visionCheck, type QaIssue, type VisionReviewer } from './qa'
import type { Step, StepKind } from './steps'
import { charsToWords, timeScenes, voiceText, type TimedScene, type Word } from './timing'

/** List prices (USD). Clip rates from HeyGen's model page; Avatar 6 is unconfirmed, measure on the first real run. */
export const PRICES = {
  clipPerSec: { '768p': 0.03, '1080p': 0.09 } as Record<string, number>,
  avatarPerSec: Number(process.env.ELLA_PRICE_AVATAR_PER_SEC ?? 0.1),
  ttsPerVideo: 0,
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
  actor?: string
}

export interface ProduceDeps {
  store: EllaStore
  steps: StepStore
  provider: VideoProvider
  media: MediaStore
  vision?: VisionReviewer
  download?: Downloader
  sleep?: (ms: number) => Promise<void>
}

export type ProduceOutcome =
  | { status: 'video_ready' | 'video_needs_jo'; renderVersion: number; videoPath: string; duration: number; issues: QaIssue[]; spentUsd: number }
  | { status: 'failed'; error: string; spentUsd: number }
  | { status: 'producing'; waitingOn: number[]; spentUsd: number }

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
  if (!st || st.status === 'failed') {
    const cap = s.maxUsd ?? 6
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
      if (!(e instanceof StillRunning)) await deps.steps.update(st.id, { status: 'failed', error: String((e as Error).message ?? e) })
      throw e
    }
  }
  return st
}

/** Polls a provider job until done, then copies the file into Ella's storage at once (links expire). */
async function collect(deps: ProduceDeps, s: ProduceSettings, jobId: string, path: string, deadline: number) {
  const sleep = deps.sleep ?? (ms => new Promise(r => setTimeout(r, ms)))
  for (;;) {
    const j = await deps.provider.getVideo(jobId)
    if (j.status === 'completed' && j.videoUrl) {
      await deps.media.put(path, await (deps.download ?? httpDownload)(j.videoUrl))
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

/** Illustration clip prompt: the scene's own prompt plus what we never want in footage. */
export function clipPrompt(sc: Scene): string {
  return `${sc.shotPrompt}\nAVOID: any on-screen text, letters, numbers, logos, brand names, watermarks or captions; distorted hands; extra fingers.`
}

export async function produceVideo(deps: ProduceDeps, s: ProduceSettings): Promise<ProduceOutcome> {
  const actor = s.actor ?? 'ella-stage2'
  const scenes = [...s.script.scenes].sort((a, b) => a.scene - b.scene)
  const res = s.clipResolution ?? '768p'
  // One waiting budget for the whole run: jobs still rendering after it are left for the next run.
  const deadline = Date.now() + (s.pollTimeoutMs ?? 20 * 60_000)
  try {
    await deps.store.setStatus(s.productionId, 'producing')
    await deps.store.audit(actor, 'production_started', { productionId: s.productionId, scriptVersion: s.scriptVersion })

    // 1. Voice, one take.
    const text = voiceText(scenes)
    const voice = await step(deps, s, 'voice', 0, { text, voiceId: s.voiceId }, PRICES.ttsPerVideo, async () => {
      const t = await deps.provider.tts({ text, voiceId: s.voiceId })
      // HeyGen returns MP3 by default; keep the real extension so storage and players agree.
      const ext = /\.(wav|mp3)(\?|$)/i.exec(t.audioUrl)?.[1]?.toLowerCase() ?? 'mp3'
      const path = `${base(s)}/voice.${ext}`
      await deps.media.put(path, await (deps.download ?? httpDownload)(t.audioUrl))
      return { output: { path, duration: t.duration, words: charsToWords(t.chars) }, costUsd: PRICES.ttsPerVideo }
    })
    const voicePath = await deps.media.localPath(String(voice.output.path))
    const words = voice.output.words as Word[]

    // 2. Real timing.
    const timed: TimedScene[] = timeScenes(scenes, words, Number(voice.output.duration))

    // 3 and 4. Scene clips. Phase A submits every missing job (they render in
    // parallel at the provider); phase B collects them. A failed scene does not
    // stop the others from being collected, so the next run redoes only it.
    const look = await deps.media.get(s.lookImagePath)
    let lookAssetId: string | null = null
    const jobs = timed.map(t => {
      const sc = scenes.find(x => x.scene === t.scene)!
      const dur = t.end - t.start
      const path = `${base(s)}/scene-${t.scene}.mp4`
      const finish = async (row: Step) => ({ output: await collect(deps, s, row.providerJobId!, path, deadline) })
      if (t.ellaInFrame) {
        const est = round2(dur * PRICES.avatarPerSec)
        return { scene: t.scene, kind: 'ella_scene' as StepKind, input: { motion: motionPrompt(sc), start: t.start, end: t.end }, est, finish,
          submit: async (row: Step) => {
            lookAssetId ??= await deps.provider.uploadAsset(look, 'ella-look.png')
            const slice = join(s.workDir, `voice-scene-${t.scene}.wav`)
            await sliceAudio(voicePath, t.start, t.end, slice)
            const audioAssetId = await deps.provider.uploadAsset(new Uint8Array(await readFile(slice)), `scene-${t.scene}.wav`)
            const id = await deps.provider.submitAvatar({ imageAssetId: lookAssetId, audioAssetId, motionPrompt: motionPrompt(sc), idempotencyKey: row.idempotencyKey })
            return { providerJobId: id, costUsd: est }
          } }
      }
      const billed = Math.min(15, Math.max(5, Math.ceil(dur)))
      const est = round2(billed * PRICES.clipPerSec[res])
      return { scene: t.scene, kind: 'clip' as StepKind, input: { prompt: clipPrompt(sc), duration: billed, resolution: res }, est, finish,
        submit: async (row: Step) => {
          const id = await deps.provider.submitClip({ prompt: clipPrompt(sc), duration: billed, resolution: res, idempotencyKey: row.idempotencyKey })
          return { providerJobId: id, costUsd: est }
        } }
    })
    for (const j of jobs) await step(deps, s, j.kind, j.scene, j.input, j.est, j.submit)
    const failures: string[] = []
    const waiting: number[] = []
    const clips: Record<number, string> = {}
    for (const j of jobs) {
      try {
        const done = await step(deps, s, j.kind, j.scene, j.input, j.est, j.submit, j.finish)
        if (done.status !== 'completed') throw new StillRunning('not finished')
        clips[j.scene] = await deps.media.localPath(String(done.output.path))
      } catch (e) {
        if (e instanceof StillRunning) waiting.push(j.scene)
        else failures.push(`scene ${j.scene}: ${String((e as Error).message ?? e)}`)
      }
    }
    if (failures.length) throw new Error(`Scenes not ready: ${failures.join('; ')}`)
    if (waiting.length) return { status: 'producing', waitingOn: waiting, spentUsd: round2(await spent(deps.steps, s)) }

    // 5. Edit and render.
    const plan: EditPlan = buildEditPlan({ scenes, timed, clips, voicePath, keyTerm: s.script.keyTerm })
    const out = join(s.workDir, 'final.mp4')
    await render(plan, join(s.workDir, 'layers'), out)

    // 6. QA.
    const issues = await machineChecks(out, plan)
    if (deps.vision) {
      const v = await visionCheck(out, plan, scenes, join(s.workDir, 'qa'), deps.vision)
      issues.push(...v.issues)
      await deps.store.logUsage({ productionId: s.productionId, feature: 'ella_video_qa', model: v.model, inputTokens: v.inputTokens, outputTokens: v.outputTokens })
    } else {
      issues.push({ second: null, scene: null, check: 'vision', problem: 'Visual check not run', severity: 'warn' })
    }
    const p = await probe(out)
    const videoPath = await deps.media.put(`${base(s)}/final-${Date.now()}.mp4`, new Uint8Array(await readFile(out)))
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
  await deps.steps.supersede(s.productionId, s.scriptVersion, sc.ellaInFrame ? 'ella_scene' : 'clip', scene)
  await deps.store.audit(s.actor ?? 'ella-stage2', 'scene_regenerate', { productionId: s.productionId, scene })
  return produceVideo(deps, s)
}
