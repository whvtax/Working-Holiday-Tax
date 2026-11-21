/**
 * The editor (deterministic, plan v2). Builds the edit plan from the script
 * and the real voice timing, then renders the final 1080 x 1920 video:
 *   - Ella's scenes are cut from her ONE continuous take at their own seconds,
 *     so her lips always match the voice; every second Ella scene after the
 *     hook gets a gentle 1.10 punch-in (at most 2), the cheap "edited" feel;
 *   - graphic scenes are brand cards drawn by code;
 *   - AI clips are scaled and cropped to fill the frame, cut to their slot
 *     (a short clip holds its last frame), provider audio dropped;
 *   - one continuous voice track under the whole video, loudness -14 LUFS;
 *   - brand text layers (headline per scene, spoken captions) on top.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { Scene } from '../script/types'
import { BRAND } from './brand'
import { ffmpeg } from './media'
import { captionPng, graphicPng, headlinePng, tagPng } from './overlays'
import { shotOf, type GraphicSpec, type ShotType } from '../script/types'
import { captionChunks, type CaptionChunk, type TimedScene } from './timing'

/** Spelled-out acronyms are for the voice only: "A-B-N" is shown as "ABN". */
export const displayText = (s: string) => s.replace(/\b([A-Za-z])-([A-Za-z])(?:-([A-Za-z]))?(?:-([A-Za-z]))?\b/g,
  (_m, ...g: Array<string | undefined>) => g.slice(0, 4).filter((x): x is string => typeof x === 'string').join('').toUpperCase())

const clean = (w: string) => displayText(w).toLowerCase().replace(/[^a-z0-9-]/g, '')

export interface EditScene {
  scene: number; start: number; end: number; duration: number; ellaInFrame: boolean
  /** Source video (the take for Ella scenes, the clip for clip scenes); empty for a graphic card. */
  clipPath: string
  shot?: ShotType
  /** Seconds into the source where this scene starts (Ella's take). */
  offset?: number
  zoom?: number
  graphic?: GraphicSpec
  headline: string; headlineHighlight: string[]
}
export interface EditPlan {
  duration: number; scenes: EditScene[]; captions: CaptionChunk[]; voicePath: string; series?: string
  /** Background music file, mixed quietly under the voice. */
  musicPath?: string
  /** What Claude the editor decided (shown to Jo). */
  editor?: { summary: string; pass: number; decisions: Array<{ scene: number; zoom: number; headline: string; why: string }> }
}

export const PUNCH_IN = 1.1
export const MAX_PUNCH_INS = 2

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

export function buildEditPlan(input: { scenes: readonly Scene[]; timed: readonly TimedScene[]; clips: Record<number, string>; take?: string | null; voicePath: string; keyTerm: string; series?: string }): EditPlan {
  let ellaSeen = 0, punches = 0
  const scenes: EditScene[] = input.timed.map(t => {
    const s = input.scenes.find(x => x.scene === t.scene)!
    const shot = shotOf(s)
    const base = { scene: t.scene, start: t.start, end: t.end, duration: Math.round((t.end - t.start) * 1000) / 1000, ellaInFrame: shot === 'ella', shot }
    const highlight = headlineHighlight(s.onScreen, s.emphasis, input.keyTerm)
    if (shot === 'graphic') {
      const g = s.graphic && s.graphic.type !== 'none' ? s.graphic : { type: 'definition' as const, title: displayText(s.onScreen || s.voice), lines: [] }
      // The card carries the words, so no headline box on top of it.
      return { ...base, clipPath: '', graphic: { ...g, title: displayText(g.title), lines: g.lines.map(displayText) }, headline: '', headlineHighlight: [] }
    }
    if (shot === 'ella') {
      // Older scripts made one Ella clip per scene; new ones cut from the take.
      const clipPath = input.take ?? input.clips[t.scene]
      if (!clipPath) throw new Error(`No Ella take for scene ${t.scene}`)
      const zoom = ellaSeen++ % 2 === 1 && punches < MAX_PUNCH_INS ? (punches++, PUNCH_IN) : 1
      return { ...base, clipPath, offset: input.take ? t.start : 0, zoom, headline: displayText(s.onScreen.trim()), headlineHighlight: highlight }
    }
    const clipPath = input.clips[t.scene]
    if (!clipPath) throw new Error(`No clip for scene ${t.scene}`)
    return { ...base, clipPath, offset: 0, headline: displayText(s.onScreen.trim()), headlineHighlight: highlight }
  })
  const captions = captionChunks(input.timed, input.scenes).map(c => ({ ...c, text: displayText(c.text), highlight: c.highlight.map(displayText) }))
  // A headline that only repeats the caption on screen at the same time is dropped (no double text).
  const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim()
  for (const sc of scenes) {
    const same = captions.some(c => c.start < sc.end && c.end > sc.start && norm(c.text) === norm(sc.headline))
    if (same) sc.headline = ''
  }
  const duration = scenes.reduce((a, s) => a + s.duration, 0)
  return { duration: Math.round(duration * 1000) / 1000, scenes, captions, voicePath: input.voicePath, ...(input.series ? { series: input.series } : {}) }
}

/** Renders the plan to an MP4. workDir receives the overlay PNGs. */
export async function render(plan: EditPlan, workDir: string, output: string): Promise<void> {
  await mkdir(workDir, { recursive: true })
  await mkdir(dirname(output), { recursive: true })
  const { width: W, height: H, fps } = BRAND.frame
  const args: string[] = []
  const filters: string[] = []

  for (const [i, s] of plan.scenes.entries()) {
    const D = s.duration.toFixed(3)
    if (s.graphic) {
      const card = join(workDir, `graphic-${s.scene}.png`)
      await writeFile(card, graphicPng(s.graphic))
      args.push('-loop', '1', '-framerate', String(fps), '-t', D, '-i', card)
    } else args.push('-i', s.clipPath)
    const cut = s.offset ? `trim=start=${s.offset.toFixed(3)},setpts=PTS-STARTPTS,` : ''
    // Punch-in: a little closer, centred slightly above the middle where the face is.
    const zoom = s.zoom && s.zoom > 1 ? `scale=${Math.round(W * s.zoom)}:${Math.round(H * s.zoom)},crop=${W}:${H}:(iw-${W})/2:(ih-${H})*0.35,` : ''
    filters.push(`[${i}:v]${cut}scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},${zoom}fps=${fps},setsar=1,format=yuv420p,` +
      `tpad=stop_mode=clone:stop_duration=${D},trim=duration=${D},setpts=PTS-STARTPTS[v${i}]`)
  }
  const voiceIdx = plan.scenes.length
  args.push('-i', plan.voicePath)
  filters.push(`${plan.scenes.map((_, i) => `[v${i}]`).join('')}concat=n=${plan.scenes.length}:v=1:a=0[base]`)

  // Brand text layers, each a full-frame transparent PNG shown for its time slot.
  const layers: Array<{ png: string; start: number; end: number }> = []
  // AI disclosure on the picture itself, so it survives shares, screen recordings and forwards.
  const tag = join(workDir, 'tag.png')
  await writeFile(tag, tagPng('', plan.series))
  layers.push({ png: tag, start: 0, end: plan.duration })
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
  if (plan.musicPath) {
    // Music: looped, very quiet, and it dips further while Ella speaks (sidechain), with a soft fade in and out.
    args.push('-stream_loop', '-1', '-i', plan.musicPath)
    const musicIdx = args.filter(a => a === '-i').length - 1
    filters.push(`[${voiceIdx}:a]aresample=48000,apad,atrim=duration=${T},asplit=2[vo][sc]`)
    filters.push(`[${musicIdx}:a]aresample=48000,atrim=duration=${T},volume=0.18,afade=t=in:d=0.6,afade=t=out:st=${Math.max(0, Number(T) - 1.2).toFixed(2)}:d=1.2[mu]`)
    filters.push(`[mu][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[duck]`)
    filters.push(`[vo][duck]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,atrim=duration=${T}[aout]`)
  } else filters.push(`[${voiceIdx}:a]aresample=48000,loudnorm=I=-14:TP=-1.5:LRA=11,apad,atrim=duration=${T}[aout]`)

  const graph = join(workDir, 'filter.txt')
  await writeFile(graph, filters.join(';\n'))
  await ffmpeg([...args, '-filter_complex_script', graph, '-map', '[vout]', '-map', '[aout]',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', String(fps),
    '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-movflags', '+faststart', '-t', T, output])
}
