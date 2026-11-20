/**
 * Fits the planned scenes to the real voice.
 * The script plans timings at 125 words per minute; the real voice is never
 * exactly that. The voice is generated once for the whole video (so Ella's
 * voice runs on without a break over the illustration clips), then every scene
 * is moved to where its first word is really spoken.
 */
import type { Scene } from '../script/types'

export interface Word { text: string; start: number; end: number }
export interface TimedScene { scene: number; start: number; end: number; ellaInFrame: boolean; words: Word[] }

/** Groups character timestamps into words (HeyGen gives characters, not words). */
export function charsToWords(chars: ReadonlyArray<{ text: string; start: number; end: number }>): Word[] {
  const words: Word[] = []
  let cur: Word | null = null
  for (const c of chars) {
    if (/\s/.test(c.text)) { if (cur) { words.push(cur); cur = null } continue }
    if (!cur) cur = { text: c.text, start: c.start, end: c.end }
    else { cur.text += c.text; cur.end = c.end }
  }
  if (cur) words.push(cur)
  return words
}

/** The voice-over text: every scene's line, in order, one space apart. */
export const voiceText = (scenes: readonly Scene[]) =>
  [...scenes].sort((a, b) => a.scene - b.scene).map(s => s.voice.trim()).join(' ')

const tokens = (s: string) => s.split(/\s+/).filter(Boolean)

/**
 * Splits the timed words back into scenes by word count, then sets each scene
 * to run from its first word to the next scene's first word. The last scene
 * ends at the end of the audio plus a short tail so the CTA is not cut off.
 */
export function timeScenes(scenes: readonly Scene[], words: readonly Word[], audioDuration: number, tail = 0.4): TimedScene[] {
  const ordered = [...scenes].sort((a, b) => a.scene - b.scene)
  const counts = ordered.map(s => tokens(s.voice).length)
  const total = counts.reduce((a, b) => a + b, 0)
  if (total !== words.length) throw new Error(`Voice has ${words.length} words but the script has ${total}`)
  const out: TimedScene[] = []
  let i = 0
  for (let k = 0; k < ordered.length; k++) {
    const w = words.slice(i, i + counts[k])
    i += counts[k]
    out.push({ scene: ordered[k].scene, start: k === 0 ? 0 : w[0].start, end: 0, ellaInFrame: ordered[k].ellaInFrame, words: w })
  }
  for (let k = 0; k < out.length; k++)
    out[k].end = k < out.length - 1 ? out[k + 1].start : Math.round((audioDuration + tail) * 100) / 100
  return out
}

export interface CaptionChunk { start: number; end: number; text: string; highlight: string[] }

const SMALL = new Set(['a', 'an', 'the', 'to', 'of', 'for', 'on', 'in', 'at', 'your', 'my', 'and', 'or', 'is', 'if', 'with', 'by', 'from'])
const bare = (w: string) => w.toLowerCase().replace(/[^a-z0-9-]/g, '')

/** Splits one phrase into balanced chunks of at most maxWords, never ending a chunk on a small word. */
export function splitPhrase<T extends { text: string }>(words: readonly T[], maxWords: number): T[][] {
  const n = Math.ceil(words.length / maxWords)
  const sizes = Array.from({ length: n }, (_, i) => Math.floor(words.length / n) + (i < words.length % n ? 1 : 0))
  const out: T[][] = []
  let i = 0
  for (let k = 0; k < n; k++) { out.push(words.slice(i, i + sizes[k])); i += sizes[k] }
  for (let k = 0; k < out.length - 1; k++) {
    while (out[k].length > 1 && SMALL.has(bare(out[k].at(-1)!.text)) && out[k + 1].length < maxWords) out[k + 1].unshift(out[k].pop()!)
  }
  return out
}

/**
 * Captions: 1 to 4 words per chunk, one line, breaking at punctuation and
 * balanced so no chunk ends on "a" or "to"; each chunk stays up until the
 * next one starts (bible s12).
 */
export function captionChunks(timed: readonly TimedScene[], scenes: readonly Scene[], maxWords = 4): CaptionChunk[] {
  const out: CaptionChunk[] = []
  for (const t of timed) {
    const s = scenes.find(x => x.scene === t.scene)!
    const emph = tokens(s.emphasis ?? '').map(bare)
    const phrases: Word[][] = [[]]
    for (const w of t.words) { phrases.at(-1)!.push(w); if (/[.,?!:;]$/.test(w.text)) phrases.push([]) }
    for (const ph of phrases.filter(p => p.length)) for (const group of splitPhrase(ph, maxWords)) {
      out.push({
        start: group[0].start, end: group.at(-1)!.end, text: group.map(g => g.text).join(' '),
        highlight: group.map(g => g.text).filter(g => emph.includes(bare(g))),
      })
    }
  }
  for (let k = 0; k < out.length - 1; k++) out[k].end = Math.max(out[k].end, out[k + 1].start)
  return out
}
