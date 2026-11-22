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
import { blankPng, captionPng, captionWordPng, graphicPng, headlinePng } from './overlays'
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
  /** Already cut into a small file by the first pass of render (the joining step only). */
  preprocessed?: boolean
  zoom?: number
  /** A slow push-in over the whole scene (a pro "breathing" frame). */
  move?: 'push'
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

/** Seconds of dissolve between scenes. */
export const CROSSFADE = 0.5
/** Seconds of fade-out at the very end, after the closing line. */
export const END_FADE = 0.5
export const PUNCH_IN = 1.1
/** How much closer a slow push-in gets over one scene. */
export const PUSH = 0.06
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
    if (shot === 'graphic') {
      const g = s.graphic && s.graphic.type !== 'none' ? s.graphic : { type: 'definition' as const, title: displayText(s.onScreen || s.voice), lines: [] }
      // The card carries the words, so no headline box on top of it.
      return { ...base, clipPath: '', move: 'push' as const, graphic: { ...g, title: displayText(g.title), lines: g.lines.map(displayText) }, headline: '', headlineHighlight: [] }
    }
    if (shot === 'ella') {
      // Older scripts made one Ella clip per scene; new ones cut from the take.
      const clipPath = input.take ?? input.clips[t.scene]
      if (!clipPath) throw new Error(`No Ella take for scene ${t.scene}`)
      const zoom = ellaSeen++ % 2 === 1 && punches < MAX_PUNCH_INS ? (punches++, PUNCH_IN) : 1
      // Pro default: a punch-in on every second Ella scene, a slow push-in on the others after the hook.
      // Jo: one line of text on screen, the spoken captions; no headline on top unless he adds one in an edit.
      return { ...base, clipPath, offset: input.take ? t.start : 0, zoom, ...(zoom === 1 && ellaSeen > 1 ? { move: 'push' as const } : {}), headline: '', headlineHighlight: [] }
    }
    const clipPath = input.clips[t.scene]
    if (!clipPath) throw new Error(`No clip for scene ${t.scene}`)
    return { ...base, clipPath, offset: 0, headline: '', headlineHighlight: [] }
  })
  const captions = captionChunks(input.timed, input.scenes).map(c => ({ ...c, text: displayText(c.text), highlight: c.highlight.map(displayText), words: c.words?.map(w => ({ ...w, text: displayText(w.text) })) }))
  // A headline that only repeats the caption on screen at the same time is dropped (no double text).
  const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim()
  for (const sc of scenes) {
    const same = captions.some(c => c.start < sc.end && c.end > sc.start && norm(c.text) === norm(sc.headline))
    if (same) sc.headline = ''
  }
  const duration = scenes.reduce((a, s) => a + s.duration, 0)
  return { duration: Math.round(duration * 1000) / 1000, scenes, captions, voicePath: input.voicePath, ...(input.series ? { series: input.series } : {}) }
}

/** The filter chain of one scene. Its input is added to args; the output is [v<i>]. */
async function sceneChain(s: EditScene, i: number, D: string, workDir: string, args: string[], W: number, H: number, fps: number): Promise<string> {
  if (s.preprocessed) {
    // Already cut, scaled and timed by the first pass: only frame rate and pixel format remain.
    args.push('-i', s.clipPath)
    return `[${i}:v]setsar=1,format=yuv420p,setpts=PTS-STARTPTS,fps=${fps}[v${i}]`
  }
  if (s.graphic) {
    const card = join(workDir, `graphic-${s.scene}.png`)
    await writeFile(card, graphicPng(s.graphic))
    args.push('-loop', '1', '-framerate', String(fps), '-t', D, '-i', card)
  } else args.push('-i', s.clipPath)
  const cut = s.offset ? `trim=start=${s.offset.toFixed(3)},setpts=PTS-STARTPTS,` : ''
  // Punch-in: a little closer, centred slightly above the middle where the face is.
  const zoom = s.move === 'push'
    // Slow push-in: from its zoom (1 or 1.1) to 6% closer over the scene, evaluated every frame.
    ? `scale=w='trunc(${W}*(${(s.zoom ?? 1).toFixed(2)}+${PUSH}*t/${Math.max(0.5, s.duration).toFixed(3)})/2)*2':h=-2:eval=frame,crop=${W}:${H}:(iw-${W})/2:(ih-${H})*0.35,`
    : s.zoom && s.zoom > 1 ? `scale=${Math.round(W * s.zoom)}:${Math.round(H * s.zoom)},crop=${W}:${H}:(iw-${W})/2:(ih-${H})*0.35,` : ''
  return `[${i}:v]${cut}scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},${zoom}fps=${fps},setsar=1,format=yuv420p,` +
    `tpad=stop_mode=clone:stop_duration=${D},trim=duration=${D},setpts=PTS-STARTPTS,fps=${fps}[v${i}]`
}

/** Removes a scene's headline when a spoken caption shows the same words at the same time. */
export function dropRepeatedHeadlines(plan: EditPlan): EditPlan {
  const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim()
  return { ...plan, scenes: plan.scenes.map(sc => {
    if (!sc.headline) return sc
    const same = plan.captions.some(c => c.start < sc.end && c.end > sc.start && norm(c.text) === norm(sc.headline))
    return same ? { ...sc, headline: '', headlineHighlight: [] } : sc
  }) }
}

/** Renders the plan to an MP4. workDir receives the overlay PNGs. */
export async function render(plan0: EditPlan, workDir: string, output: string): Promise<void> {
  await mkdir(workDir, { recursive: true })
  await mkdir(dirname(output), { recursive: true })
  const { width: W, height: H, fps } = BRAND.frame
  const FADE = plan0.scenes.length > 1 ? CROSSFADE : 0
  let plan = plan0
  // Several scenes: each one is first cut into its own small file, so only one raw clip is open at a time.
  // The joining step then works on small files instead of holding every raw clip in memory at once.
  if (plan.scenes.length > 1) {
    const cut: EditScene[] = []
    for (const [i, s] of plan.scenes.entries()) {
      const D = (s.duration + (i < plan.scenes.length - 1 ? FADE : 0)).toFixed(3)
      const segArgs: string[] = []
      const chain = await sceneChain(s, 0, D, workDir, segArgs, W, H, fps)
      const graph = join(workDir, `seg-${i}.txt`)
      const seg = join(workDir, `seg-${String(i).padStart(3, '0')}.mp4`)
      await writeFile(graph, chain)
      await ffmpeg([...segArgs, '-filter_complex_script', graph, '-map', '[v0]', '-an',
        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(fps), '-t', D, seg])
      cut.push({ ...s, clipPath: seg, preprocessed: true, graphic: undefined })
    }
    plan = { ...plan, scenes: cut }
  }
  const args: string[] = []
  const filters: string[] = []

  // Smooth cuts (Jo): every scene but the last runs FADE longer, and the next scene dissolves in over it,
  // so the total length and the sync with the voice stay exactly the same.
  for (const [i, s] of plan.scenes.entries()) {
    const D = (s.duration + (i < plan.scenes.length - 1 ? FADE : 0)).toFixed(3)
    filters.push(await sceneChain(s, i, D, workDir, args, W, H, fps))
  }
  const voiceIdx = plan.scenes.length
  args.push('-i', plan.voicePath)
  if (plan.scenes.length === 1) filters.push('[v0]null[base]')
  else {
    let prev = 'v0', at = 0
    for (let i = 1; i < plan.scenes.length; i++) {
      at += plan.scenes[i - 1].duration
      const out = i === plan.scenes.length - 1 ? 'base' : `x${i}`
      filters.push(`[${prev}][v${i}]xfade=transition=fade:duration=${FADE.toFixed(3)}:offset=${Math.max(0, at - FADE / 2).toFixed(3)}[${out}]`)
      prev = out
    }
  }

  // Brand text layers, each a full-frame transparent PNG shown for its time slot.
  const layers: Array<{ png: string; start: number; end: number }> = []
  // Jo: no label in the top-left corner. The AI label is the native one on the platform.
  for (const s of plan.scenes) {
    if (!s.headline) continue
    const p = join(workDir, `headline-${s.scene}.png`)
    await writeFile(p, headlinePng(s.headline, s.headlineHighlight))
    layers.push({ png: p, start: s.start, end: s.end })
  }
  // Captions (Jo): the lime runs along the words as she says them. Every state is one image on ONE
  // caption track (a timed image list), so the render stays fast however many words there are.
  const track: Array<{ png: string; start: number; end: number }> = []
  for (const [k, c] of plan.captions.entries()) {
    const ws = c.words?.length ? c.words : null
    if (!ws) {
      const p = join(workDir, `caption-${String(k).padStart(3, '0')}.png`)
      await writeFile(p, captionPng(c.text, c.highlight))
      track.push({ png: p, start: c.start, end: c.end })
      continue
    }
    const texts = ws.map(w => w.text)
    for (const [i, w] of ws.entries()) {
      const p = join(workDir, `caption-${String(k).padStart(3, '0')}-${i}.png`)
      await writeFile(p, captionWordPng(texts, i))
      const start = i === 0 ? c.start : w.start
      const end = i < ws.length - 1 ? ws[i + 1].start : c.end
      if (end > start) track.push({ png: p, start, end })
    }
  }
  let captionTrack: string | null = null
  if (track.length) {
    const blank = join(workDir, 'blank.png')
    await writeFile(blank, blankPng())
    const lines = ['ffconcat version 1.0']
    let at = 0
    for (const t of track.sort((a, b) => a.start - b.start)) {
      if (t.start > at + 0.001) { lines.push(`file '${blank}'`, `duration ${(t.start - at).toFixed(3)}`) }
      const from = Math.max(at, t.start)
      if (t.end > from) { lines.push(`file '${t.png}'`, `duration ${(t.end - from).toFixed(3)}`); at = t.end }
    }
    lines.push(`file '${blank}'`, `duration ${Math.max(0.1, plan.duration - at).toFixed(3)}`, `file '${blank}'`)
    captionTrack = join(workDir, 'captions.ffconcat')
    await writeFile(captionTrack, lines.join('\n'))
  }
  let last = 'base'
  layers.forEach((l, k) => {
    args.push('-i', l.png)
    const out = k === layers.length - 1 && !captionTrack ? 'vfin' : `o${k}`
    filters.push(`[${last}][${voiceIdx + 1 + k}:v]overlay=0:0:enable='between(t,${l.start.toFixed(3)},${l.end.toFixed(3)})'[${out}]`)
    last = out
  })
  if (captionTrack) {
    args.push('-f', 'concat', '-safe', '0', '-i', captionTrack)
    const idx = args.filter(a => a === '-i').length - 1
    filters.push(`[${idx}:v]fps=${fps},format=rgba,setpts=PTS-STARTPTS[cap]`)
    filters.push(`[${last}][cap]overlay=0:0:shortest=0:eof_action=pass[vfin]`)
  } else if (!layers.length) filters.push('[base]null[vfin]')

  const T = plan.duration.toFixed(3)
  // A soft ending (Jo): the picture and sound fade out over the last half second, after her closing line.
  const endAt = Math.max(0, plan.duration - END_FADE).toFixed(3)
  filters.push(`[vfin]fade=t=out:st=${endAt}:d=${END_FADE}[vout]`)
  if (plan.musicPath) {
    // Music: looped, very quiet, and it dips further while Ella speaks (sidechain), with a soft fade in and out.
    args.push('-stream_loop', '-1', '-i', plan.musicPath)
    const musicIdx = args.filter(a => a === '-i').length - 1
    filters.push(`[${voiceIdx}:a]aresample=48000,apad,atrim=duration=${T},asplit=2[vo][sc]`)
    filters.push(`[${musicIdx}:a]aresample=48000,atrim=duration=${T},volume=0.18,afade=t=in:d=0.6,afade=t=out:st=${Math.max(0, Number(T) - 1.2).toFixed(2)}:d=1.2[mu]`)
    filters.push(`[mu][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[duck]`)
    filters.push(`[vo][duck]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,atrim=duration=${T},afade=t=out:st=${endAt}:d=${END_FADE}[aout]`)
  } else filters.push(`[${voiceIdx}:a]aresample=48000,loudnorm=I=-14:TP=-1.5:LRA=11,apad,atrim=duration=${T},afade=t=out:st=${endAt}:d=${END_FADE}[aout]`)

  const graph = join(workDir, 'filter.txt')
  await writeFile(graph, filters.join(';\n'))
  await ffmpeg([...args, '-filter_complex_script', graph, '-map', '[vout]', '-map', '[aout]',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', String(fps),
    '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-movflags', '+faststart', '-t', T, output])
}
