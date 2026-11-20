/**
 * The editor. Builds the edit plan from the script and the real voice timing,
 * then renders the final 1080 x 1920 video with ffmpeg:
 *   - every scene clip scaled and cropped to fill the frame, cut to its slot
 *     (a short clip holds its last frame), provider audio dropped;
 *   - one continuous voice track under the whole video, loudness -14 LUFS;
 *   - brand text layers (headline per scene, spoken captions) on top.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { Scene } from '../script/types'
import { BRAND } from './brand'
import { ffmpeg } from './media'
import { captionPng, headlinePng } from './overlays'
import { captionChunks, type CaptionChunk, type TimedScene } from './timing'

/** Spelled-out acronyms are for the voice only: "A-B-N" is shown as "ABN". */
export const displayText = (s: string) => s.replace(/\b([A-Za-z])-([A-Za-z])(?:-([A-Za-z]))?(?:-([A-Za-z]))?\b/g,
  (_m, ...g: Array<string | undefined>) => g.slice(0, 4).filter((x): x is string => typeof x === 'string').join('').toUpperCase())

const clean = (w: string) => displayText(w).toLowerCase().replace(/[^a-z0-9-]/g, '')

export interface EditScene { scene: number; start: number; end: number; duration: number; ellaInFrame: boolean; clipPath: string; headline: string; headlineHighlight: string[] }
export interface EditPlan { duration: number; scenes: EditScene[]; captions: CaptionChunk[]; voicePath: string }

/** Picks the highlighted words of the on-screen line: the scene's emphasis, else the key term. */
export function headlineHighlight(onScreen: string, emphasis: string, keyTerm: string): string[] {
  const words = displayText(onScreen).split(/\s+/).filter(Boolean)
  for (const target of [emphasis, keyTerm]) {
    const t = new Set(displayText(target).split(/\s+/).map(clean).filter(Boolean))
    const hit = words.filter(w => t.has(clean(w)))
    if (hit.length) return hit
  }
  return []
}

export function buildEditPlan(input: { scenes: readonly Scene[]; timed: readonly TimedScene[]; clips: Record<number, string>; voicePath: string; keyTerm: string }): EditPlan {
  const scenes = input.timed.map(t => {
    const s = input.scenes.find(x => x.scene === t.scene)!
    const clipPath = input.clips[t.scene]
    if (!clipPath) throw new Error(`No clip for scene ${t.scene}`)
    const headline = displayText(s.onScreen.trim())
    return {
      scene: t.scene, start: t.start, end: t.end, duration: Math.round((t.end - t.start) * 1000) / 1000, ellaInFrame: t.ellaInFrame, clipPath,
      headline, headlineHighlight: headlineHighlight(s.onScreen, s.emphasis, input.keyTerm),
    }
  })
  const captions = captionChunks(input.timed, input.scenes).map(c => ({ ...c, text: displayText(c.text), highlight: c.highlight.map(displayText) }))
  // A headline that only repeats the caption on screen at the same time is dropped (no double text).
  const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim()
  for (const sc of scenes) {
    const same = captions.some(c => c.start < sc.end && c.end > sc.start && norm(c.text) === norm(sc.headline))
    if (same) sc.headline = ''
  }
  const duration = scenes.reduce((a, s) => a + s.duration, 0)
  return { duration: Math.round(duration * 1000) / 1000, scenes, captions, voicePath: input.voicePath }
}

/** Renders the plan to an MP4. workDir receives the overlay PNGs. */
export async function render(plan: EditPlan, workDir: string, output: string): Promise<void> {
  await mkdir(workDir, { recursive: true })
  await mkdir(dirname(output), { recursive: true })
  const { width: W, height: H, fps } = BRAND.frame
  const args: string[] = []
  const filters: string[] = []

  plan.scenes.forEach((s, i) => {
    args.push('-i', s.clipPath)
    filters.push(`[${i}:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=${fps},setsar=1,` +
      `tpad=stop_mode=clone:stop_duration=${s.duration.toFixed(3)},trim=duration=${s.duration.toFixed(3)},setpts=PTS-STARTPTS[v${i}]`)
  })
  const voiceIdx = plan.scenes.length
  args.push('-i', plan.voicePath)
  filters.push(`${plan.scenes.map((_, i) => `[v${i}]`).join('')}concat=n=${plan.scenes.length}:v=1:a=0[base]`)

  // Brand text layers, each a full-frame transparent PNG shown for its time slot.
  const layers: Array<{ png: string; start: number; end: number }> = []
  for (const s of plan.scenes) {
    if (!s.headline) continue
    const p = join(workDir, `headline-${s.scene}.png`)
    await writeFile(p, headlinePng(s.headline, s.headlineHighlight))
    layers.push({ png: p, start: s.start, end: s.end })
  }
  for (const [k, c] of plan.captions.entries()) {
    const p = join(workDir, `caption-${String(k).padStart(3, '0')}.png`)
    await writeFile(p, captionPng(c.text, c.highlight))
    layers.push({ png: p, start: c.start, end: c.end })
  }
  let last = 'base'
  layers.forEach((l, k) => {
    args.push('-i', l.png)
    const out = k === layers.length - 1 ? 'vout' : `o${k}`
    filters.push(`[${last}][${voiceIdx + 1 + k}:v]overlay=0:0:enable='between(t,${l.start.toFixed(3)},${l.end.toFixed(3)})'[${out}]`)
    last = out
  })
  if (!layers.length) filters.push('[base]null[vout]')

  const T = plan.duration.toFixed(3)
  filters.push(`[${voiceIdx}:a]aresample=48000,loudnorm=I=-14:TP=-1.5:LRA=11,apad,atrim=duration=${T}[aout]`)

  const graph = join(workDir, 'filter.txt')
  await writeFile(graph, filters.join(';\n'))
  await ffmpeg([...args, '-filter_complex_script', graph, '-map', '[vout]', '-map', '[aout]',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', String(fps),
    '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-movflags', '+faststart', '-t', T, output])
}
