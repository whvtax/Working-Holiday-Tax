/**
 * Covers and the feed (Jo, Nov 21). The profile grid is the shop window, so
 * every cover follows one brand book and the grid is planned, not random.
 *
 * A cover designer (a strong model, Opus by default) reads the script, the
 * moments of the video and the brand book, and decides: which frame, the
 * title (6 words or fewer) and its one lime word. Code draws the cover, so
 * colours, font and placement are always exactly on brand; a bad answer
 * falls back to a safe cover built from the hook.
 */
import { loadImage, createCanvas } from '@napi-rs/canvas'
import type { JsonTool, Llm } from '../script/llm'
import { BANNED } from '../script/rules'
import { BRAND } from './brand'
import { ensureFonts, roundRect } from './overlays'

export { FEED_RULES } from './feed-rules'
import { FEED_RULES } from './feed-rules'

// Titles always sit below the face (Jo's rule: faces are never covered); the series change the alignment.
/**
 * Jo, Nov 23: "never hide her face". In Ella's take her chin is at about y 890 of the 1920 frame, and about
 * 930 at the closest punch-in (1.10 plus the 6% push). Nothing is drawn between the series tab (above her
 * forehead) and this line; the title always starts below it.
 */
export const FACE_CLEAR_Y = 1000
export type CoverLayout = 'left' | 'centre' | 'band'
export const LAYOUT_FOR_SERIES: Record<string, CoverLayout> = { 'MYTH OR FACT': 'left', 'YOUR JOB YOUR TAX': 'centre', 'TAX WORD': 'band' }

export interface CoverDesign { second: number; title: string; highlight: string; why?: string }
export interface CoverDesigner {
  design(input: { hook: string; coreMessage: string; keyTerm: string; series?: string; moments: Array<{ second: number; what: string }>; recentTitles: string[] }): Promise<CoverDesign & { model: string; inputTokens: number; outputTokens: number }>
}

export const COVER_TOOL: JsonTool = {
  name: 'ella_cover',
  description: 'The cover of one short video.',
  schema: { type: 'object', additionalProperties: false, required: ['second', 'title', 'highlight', 'why'],
    properties: { second: { type: 'number' }, title: { type: 'string' }, highlight: { type: 'string' }, why: { type: 'string' } } },
}

/** Opus by default (Jo: a strong model for the profile); ELLA_COVER_MODEL to change it. */
export const COVER_MODEL = () => process.env.ELLA_COVER_MODEL || 'claude-opus-5-5'

export class ClaudeCoverDesigner implements CoverDesigner {
  constructor(private llm: Llm) {}
  async design(input: Parameters<CoverDesigner['design']>[0]) {
    const user = [
      FEED_RULES, '',
      `THIS VIDEO: hook "${input.hook}", message "${input.coreMessage}", key term "${input.keyTerm}", series ${input.series ?? 'none'}.`,
      'MOMENTS YOU CAN USE AS THE COVER FRAME:', ...input.moments.map(m => `- ${m.second.toFixed(1)} s: ${m.what}`),
      `RECENT COVER TITLES (be different from these): ${input.recentTitles.join(' | ') || 'none yet'}`, '',
      'Design the cover as the brand designer: second (one of the moments), title (6 words or fewer, a question or clear promise that makes a student tap), highlight (one word of the title, the keyword), why (one sentence).',
    ].join('\n')
    const r = await this.llm.complete('You design covers for a short-video channel and keep its grid on brand. Return only the JSON.', user, { jsonTool: COVER_TOOL, effort: 'medium' })
    const j = JSON.parse(r.text) as CoverDesign
    return { ...j, model: r.model, inputTokens: r.inputTokens, outputTokens: r.outputTokens }
  }
}

const words = (t: string) => t.trim().split(/\s+/).filter(Boolean)
/** Keeps a designer's answer only if it is on brand; otherwise a safe cover from the hook. */
export function safeDesign(d: Partial<CoverDesign> | null, fallback: { hook: string; keyTerm: string; second: number }, duration: number): CoverDesign {
  const clean = (t: string) => t.replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim()
  let title = clean(String(d?.title ?? ''))
  if (!title || words(title).length > 6 || BANNED.some(b => b.re.test(title)) || /\$|refund/i.test(title)) title = words(clean(fallback.hook)).slice(0, 6).join(' ')
  const hl = clean(String(d?.highlight ?? ''))
  const highlight = words(title).find(w => w.toLowerCase().replace(/[^a-z0-9]/g, '') === hl.toLowerCase().replace(/[^a-z0-9]/g, ''))
    ?? words(title).find(w => fallback.keyTerm && w.toLowerCase().includes(fallback.keyTerm.replace(/-/g, '').toLowerCase())) ?? words(title).at(-1) ?? ''
  const second = Number.isFinite(Number(d?.second)) ? Math.min(Math.max(0.3, Number(d!.second)), Math.max(0.3, duration - 0.6)) : fallback.second
  return { second, title, highlight, why: d?.why }
}

/** Draws the cover: the frame, a soft shade for reading, the series tab and the title, all on brand. */
export async function coverPng(frame: Buffer, design: CoverDesign, series?: string): Promise<Buffer> {
  ensureFonts()
  const W = BRAND.frame.width, H = BRAND.frame.height
  const c = createCanvas(W, H)
  const ctx = c.getContext('2d')
  const img = await loadImage(frame)
  const k = Math.max(W / img.width, H / img.height)
  ctx.drawImage(img, (W - img.width * k) / 2, (H - img.height * k) / 2, img.width * k, img.height * k)
  const layout = LAYOUT_FOR_SERIES[series ?? ''] ?? 'centre'
  // Soft shade where the title goes, so white boxes read on any frame.
  const shadeY = 1080
  const g = ctx.createLinearGradient(0, shadeY - 200, 0, shadeY + 600)
  g.addColorStop(0, 'rgba(18,22,31,0)'); g.addColorStop(0.5, 'rgba(18,22,31,0.35)'); g.addColorStop(1, 'rgba(18,22,31,0)')
  ctx.fillStyle = g; ctx.fillRect(0, shadeY - 200, W, 800)
  // Series tab, inside the 3:4 grid crop.
  ctx.textBaseline = 'middle'
  if (series) {
    ctx.font = `700 34px "${BRAND.font}"`
    const tw = ctx.measureText(series).width + 40
    ctx.fillStyle = BRAND.ink; roundRect(ctx, 90, 280, tw, 64, 18); ctx.fill()
    ctx.fillStyle = BRAND.lime; ctx.fillText(series, 110, 313)
  }
  // Title: up to 3 lines, the largest size that fits; each line in a white rounded box, the key word on lime.
  const ws = words(design.title)
  let size = 96, lines: string[][] = []
  for (; size >= 60; size -= 4) {
    ctx.font = `700 ${size}px "${BRAND.font}"`
    lines = []; let cur: string[] = []
    for (const w of ws) { const next = [...cur, w]; if (cur.length && ctx.measureText(next.join(' ')).width > 840) { lines.push(cur); cur = [w] } else cur = next }
    if (cur.length) lines.push(cur)
    if (lines.length <= 3) break
  }
  const lh = size * 1.32, padX = 30
  const blockH = lines.length * lh
  let y = Math.max(FACE_CLEAR_Y + 40, layout === 'band' ? 1180 : 1640 - blockH)
  if (layout === 'band') { ctx.fillStyle = BRAND.lime; ctx.fillRect(0, y - 40, W, blockH + 80) }
  const space = ctx.measureText(' ').width
  for (const line of lines) {
    const tw = line.reduce((a, w) => a + ctx.measureText(w).width, 0) + space * (line.length - 1)
    const x0 = layout === 'left' ? 90 : (W - tw) / 2 - padX
    if (layout !== 'band') { ctx.fillStyle = BRAND.white; roundRect(ctx, x0, y, tw + padX * 2, lh - 10, 24); ctx.fill() }
    let x = x0 + padX
    for (const w of line) {
      const ww = ctx.measureText(w).width
      const hi = w === design.highlight
      if (hi && layout !== 'band') { ctx.fillStyle = BRAND.lime; roundRect(ctx, x - 8, y + 8, ww + 16, lh - 26, 14); ctx.fill() }
      if (hi && layout === 'band') { ctx.fillStyle = BRAND.ink; roundRect(ctx, x - 8, y + 8, ww + 16, lh - 26, 14); ctx.fill() }
      ctx.fillStyle = hi && layout === 'band' ? BRAND.lime : BRAND.ink
      ctx.fillText(w, x, y + (lh - 10) / 2 + 2)
      x += ww + space
    }
    y += lh
  }
  return c.toBuffer('image/jpeg', 90)
}
