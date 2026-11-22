/**
 * Quality check of the finished video, before Jo sees it.
 *   1. Machine checks with ffmpeg: length, size, audio, black frames, frozen
 *      picture, silent gaps, loudness.
 *   2. A visual review by Claude of one frame per scene and per caption,
 *      against the bible's rules (hands, faces, text, brand, captions).
 * Every problem says the second it happens and the scene, so one scene can be
 * regenerated without redoing the whole video.
 */
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { LIMITS } from '../script/rules'
import type { EditPlan } from './compose'
import { ffmpeg, frameAt, probe } from './media'

export type Severity = 'block' | 'warn'
export interface QaIssue { second: number | null; scene: number | null; check: string; problem: string; severity: Severity }

const sceneAt = (plan: EditPlan, t: number) => plan.scenes.find(s => t >= s.start && t < s.end)?.scene ?? plan.scenes.at(-1)?.scene ?? null

async function filterLog(input: string, args: string[]): Promise<string> {
  try { return (await ffmpeg(['-i', input, ...args, '-f', 'null', '-'])).stderr } catch (e) { return String(e) }
}

export async function machineChecks(video: string, plan: EditPlan): Promise<QaIssue[]> {
  const issues: QaIssue[] = []
  const p = await probe(video)
  const add = (i: Omit<QaIssue, 'scene'> & { scene?: number | null }) => issues.push({ scene: i.second == null ? null : sceneAt(plan, i.second), ...i } as QaIssue)

  if (p.duration > LIMITS.hardMax) add({ second: null, check: 'length', problem: `Video is ${p.duration.toFixed(1)}s, over the ${LIMITS.hardMax}s limit`, severity: 'block' })
  else if (p.duration > LIMITS.targetMax) add({ second: null, check: 'length', problem: `Video is ${p.duration.toFixed(1)}s, over the ${LIMITS.targetMax}s default`, severity: 'warn' })
  if (Math.abs(p.duration - plan.duration) > 0.3) add({ second: null, check: 'length', problem: `Video is ${p.duration.toFixed(2)}s but the plan is ${plan.duration.toFixed(2)}s`, severity: 'block' })
  if (p.width !== 1080 || p.height !== 1920) add({ second: null, check: 'size', problem: `Frame is ${p.width}x${p.height}, not 1080x1920`, severity: 'block' })
  if (!p.hasAudio) add({ second: null, check: 'audio', problem: 'No audio track', severity: 'block' })

  const black = await filterLog(video, ['-vf', 'blackdetect=d=0.25:pix_th=0.10', '-an'])
  for (const m of black.matchAll(/black_start:([\d.]+) black_end:([\d.]+)/g))
    add({ second: Number(m[1]), check: 'black', problem: `Black picture from ${Number(m[1]).toFixed(1)}s to ${Number(m[2]).toFixed(1)}s`, severity: 'block' })

  const freeze = await filterLog(video, ['-vf', 'freezedetect=n=0.002:d=1.2', '-an'])
  for (const m of freeze.matchAll(/freeze_start: ([\d.]+)/g))
    add({ second: Number(m[1]), check: 'frozen', problem: `Picture freezes at ${Number(m[1]).toFixed(1)}s (clip too short or stuck)`, severity: 'warn' })

  const silence = await filterLog(video, ['-af', 'silencedetect=noise=-40dB:d=1.0', '-vn'])
  for (const m of silence.matchAll(/silence_start: ([\d.]+)/g)) {
    const t = Number(m[1])
    if (t < p.duration - 1.2) add({ second: t, check: 'silence', problem: `Over 1s of silence at ${t.toFixed(1)}s`, severity: 'warn' })
  }

  const loud = await filterLog(video, ['-af', 'ebur128', '-vn'])
  const lufs = [...loud.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1)
  if (lufs && Math.abs(Number(lufs[1]) + 14) > 2) add({ second: null, check: 'loudness', problem: `Loudness ${lufs[1]} LUFS, target -14`, severity: 'warn' })

  if (plan.scenes[0] && plan.captions.length && plan.captions[0].start > 0.6)
    add({ second: 0, check: 'hook', problem: 'First caption starts after 0.6s; the hook must start at once', severity: 'warn' })
  return issues
}

export interface VisionReviewer { review(frames: Array<{ second: number; scene: number; jpeg: Uint8Array; expected: string }>): Promise<{ issues: QaIssue[]; inputTokens: number; outputTokens: number; model: string }> }

export const VISION_RULES = `You are the final quality checker for a short vertical video for Student Visa Tax.
Each image is one frame, with the second, the scene and what should be in it.
Report only real problems a viewer would notice:
- faces: warped, melting, extra or missing features, the presenter (Ella) looking like a different person between frames
- eyes: closed or half shut, or a mouth open in mid-word on a still frame; for a face frame, eyes must be open and natural
- hands: extra, fused or missing fingers, objects passing through hands
- any text, letters, numbers, logos or brand names inside the footage itself (only our own caption boxes are allowed)
- our caption boxes: cut off, overlapping each other, covering a face, outside the frame, unreadable
- brand: captions must be dark ink text in white rounded boxes, or white text in dark boxes, with lime only as a highlight; cards are a white page with ink text and a lime title bar; font bold sans serif; flag any other colour, font or a busy, cluttered screen
- the frame does not match what is expected, or looks fake, plastic or uncanny
- anything unsafe, sexual, or showing a real company logo
Return only JSON: {"issues":[{"second":number,"scene":number,"problem":"short plain English","severity":"block"|"warn"}]}. Empty list if the frames are fine.`

export class AnthropicVision implements VisionReviewer {
  constructor(private opts: { apiKey?: string; model?: string; fetchImpl?: typeof fetch } = {}) {}
  async review(frames: Array<{ second: number; scene: number; jpeg: Uint8Array; expected: string }>) {
    const apiKey = this.opts.apiKey ?? process.env.ANTHROPIC_API_KEY
    const model = this.opts.model ?? process.env.ELLA_QA_MODEL ?? process.env.ELLA_SCRIPT_MODEL ?? process.env.CLAUDE_MODEL
    if (!apiKey) throw new Error('Missing ANTHROPIC_API_KEY')
    if (!model) throw new Error('Missing ELLA_QA_MODEL (or ELLA_SCRIPT_MODEL)')
    const content: unknown[] = []
    for (const f of frames) {
      content.push({ type: 'text', text: `Second ${f.second.toFixed(1)}, scene ${f.scene}. Expected: ${f.expected}` })
      content.push({ type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: Buffer.from(f.jpeg).toString('base64') } })
    }
    const res = await (this.opts.fetchImpl ?? fetch)('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      // A hung vision call must not hold the whole run.
      signal: AbortSignal.timeout(120_000),
      headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model, max_tokens: 2000, system: VISION_RULES, messages: [{ role: 'user', content }] }),
    })
    if (!res.ok) throw new Error(`Vision check failed: HTTP ${res.status}`)
    const body = await res.json() as { content?: Array<{ type: string; text?: string }>; usage?: { input_tokens?: number; output_tokens?: number }; model?: string }
    const text = (body.content ?? []).filter(c => c.type === 'text').map(c => c.text ?? '').join('')
    return { issues: parseVisionIssues(text), inputTokens: body.usage?.input_tokens ?? 0, outputTokens: body.usage?.output_tokens ?? 0, model: body.model ?? model }
  }
}

export function parseVisionIssues(text: string): QaIssue[] {
  const m = text.match(/\{[\s\S]*\}/)
  if (!m) return [{ second: null, scene: null, check: 'vision', problem: 'Visual check gave no readable answer', severity: 'warn' }]
  try {
    const j = JSON.parse(m[0]) as { issues?: Array<{ second?: number; scene?: number; problem?: string; severity?: string }> }
    return (j.issues ?? []).map(i => ({
      second: typeof i.second === 'number' ? i.second : null, scene: typeof i.scene === 'number' ? i.scene : null,
      check: 'vision', problem: String(i.problem ?? 'Unspecified problem'), severity: i.severity === 'block' ? 'block' : 'warn',
    }))
  } catch { return [{ second: null, scene: null, check: 'vision', problem: 'Visual check answer was not valid JSON', severity: 'warn' }] }
}

/** One frame in the middle of each scene, plus the middle of each caption on screen. */
export function framePlan(plan: EditPlan, scenes: ReadonlyArray<{ scene: number; visual: string }>): Array<{ second: number; scene: number; expected: string }> {
  const out = plan.scenes.map(s => ({
    second: Math.round((s.start + s.duration / 2) * 10) / 10, scene: s.scene,
    expected: `${scenes.find(x => x.scene === s.scene)?.visual ?? ''}. Headline box: "${s.headline}".`,
  }))
  return out.sort((a, b) => a.second - b.second)
}

export async function visionCheck(video: string, plan: EditPlan, scenes: ReadonlyArray<{ scene: number; visual: string }>, workDir: string, reviewer: VisionReviewer) {
  // Frames are cut in parallel; the plan's order is kept.
  const frames = await Promise.all(framePlan(plan, scenes).map(async f => {
    const p = join(workDir, `qa-${f.second.toFixed(1)}.jpg`)
    await frameAt(video, f.second, p)
    return { ...f, jpeg: new Uint8Array(await readFile(p)) }
  }))
  return reviewer.review(frames)
}
