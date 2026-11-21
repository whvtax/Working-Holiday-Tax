/**
 * Draws the brand text layers as transparent PNGs (1080 x 1920), which ffmpeg
 * then lays over the video at the right seconds. Drawing them ourselves (not
 * with the video provider's captions) is what keeps the exact brand font,
 * colours, rounded boxes and lime highlight.
 */
import { createCanvas, GlobalFonts, type SKRSContext2D } from '@napi-rs/canvas'
import { join } from 'node:path'
import { BRAND } from './brand'
import { ellaAssetsDir } from './paths'

let fontsReady = false
function ensureFonts() {
  if (fontsReady) return
  for (const w of [500, 700]) {
    const p = join(ellaAssetsDir(), 'fonts', `BeVietnamPro-${w}.ttf`)
    GlobalFonts.registerFromPath(p, BRAND.font)
  }
  fontsReady = true
}

function roundRect(ctx: SKRSContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

const clean = (w: string) => w.toLowerCase().replace(/[^a-z0-9-]/g, '')

interface Style { size: number; minSize: number; weight: number; padX: number; padY: number; radius: number; box: string; text: string; hiBox: string | null; hiText: string }

/** Splits words into the fewest lines (max 2) that fit the safe width at or above minSize. */
function layout(ctx: SKRSContext2D, words: string[], st: Style): { size: number; lines: string[][] } {
  const fits = (size: number, lines: string[][]) => {
    ctx.font = `${st.weight} ${size}px "${BRAND.font}"`
    return lines.every(l => ctx.measureText(l.join(' ')).width + st.padX * 2 <= BRAND.maxTextWidth)
  }
  for (let size = st.size; size >= st.minSize; size -= 2) if (fits(size, [words])) return { size, lines: [words] }
  // Two lines, split where the two halves are closest in width.
  let best: string[][] = [words]
  let bestDiff = Infinity
  ctx.font = `${st.weight} ${st.size}px "${BRAND.font}"`
  for (let k = 1; k < words.length; k++) {
    const a = words.slice(0, k), b = words.slice(k)
    const d = Math.abs(ctx.measureText(a.join(' ')).width - ctx.measureText(b.join(' ')).width)
    if (d < bestDiff) { bestDiff = d; best = [a, b] }
  }
  for (let size = st.size; size > 20; size -= 2) if (fits(size, best)) return { size, lines: best }
  return { size: 20, lines: best }
}

/** Each line in its own rounded box (Instagram story style), highlighted words marked inside. */
function drawBlock(ctx: SKRSContext2D, words: string[], highlight: string[], anchorY: number, anchor: 'top' | 'bottom', st: Style) {
  const { size, lines } = layout(ctx, words, st)
  ctx.font = `${st.weight} ${size}px "${BRAND.font}"`
  ctx.textBaseline = 'middle'
  const space = ctx.measureText(' ').width
  const boxH = size * 1.25 + st.padY * 2
  const gap = 8
  const total = lines.length * boxH + (lines.length - 1) * gap
  let y = anchor === 'top' ? anchorY : anchorY - total
  const his = new Set(highlight.map(clean))
  for (const line of lines) {
    const centreY = y + boxH / 2
    const textW = line.reduce((a, w) => a + ctx.measureText(w).width, 0) + space * (line.length - 1)
    const boxW = textW + st.padX * 2
    const x0 = BRAND.centreX - boxW / 2
    ctx.fillStyle = st.box
    roundRect(ctx, x0, y, boxW, boxH, st.radius)
    ctx.fill()
    let x = x0 + st.padX
    for (const w of line) {
      const ww = ctx.measureText(w).width
      const hi = his.has(clean(w))
      if (hi && st.hiBox) {
        ctx.fillStyle = st.hiBox
        roundRect(ctx, x - 8, centreY - size * 0.68, ww + 16, size * 1.36, 10)
        ctx.fill()
      }
      ctx.fillStyle = hi ? st.hiText : st.text
      ctx.fillText(w, x, centreY + size * 0.04)
      x += ww + space
    }
    y += boxH + gap
  }
}

/** Headline (on-screen text, up to 5 words): ink on white, key word on a lime highlighter. */
export function headlinePng(text: string, highlight: string[]): Buffer {
  ensureFonts()
  const c = createCanvas(BRAND.frame.width, BRAND.frame.height)
  const ctx = c.getContext('2d')
  const h = BRAND.headline
  drawBlock(ctx, text.split(/\s+/).filter(Boolean), highlight, h.top, 'top',
    { ...h, box: BRAND.white, text: BRAND.ink, hiBox: BRAND.lime, hiText: BRAND.ink })
  return c.toBuffer('image/png')
}

/** Spoken caption chunk: white on ink, the emphasised word in lime (lime on ink is allowed). */
export function captionPng(text: string, highlight: string[]): Buffer {
  ensureFonts()
  const c = createCanvas(BRAND.frame.width, BRAND.frame.height)
  const ctx = c.getContext('2d')
  const k = BRAND.caption
  drawBlock(ctx, text.split(/\s+/).filter(Boolean), highlight, k.bottom, 'bottom',
    { ...k, box: BRAND.ink, text: BRAND.white, hiBox: null, hiText: BRAND.lime })
  return c.toBuffer('image/png')
}

/**
 * The series tag, top left: the series name in an ink box with lime text, so a
 * returning viewer knows the format at a glance. Jo's rule: no AI label is
 * drawn on the video; AI is marked only with the platform toggle.
 */
export function tagPng(text = '', series?: string): Buffer {
  ensureFonts()
  const c = createCanvas(BRAND.frame.width, BRAND.frame.height)
  const ctx = c.getContext('2d')
  const t = BRAND.tag
  ctx.font = `${t.weight} ${t.size}px "${BRAND.font}"`
  ctx.textBaseline = 'middle'
  const h = t.size + t.padY * 2
  let w = -10
  if (text) {
    w = ctx.measureText(text).width + t.padX * 2
    ctx.globalAlpha = 0.85
    ctx.fillStyle = BRAND.white
    roundRect(ctx, t.x, t.y, w, h, t.radius)
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.fillStyle = BRAND.ink
    ctx.fillText(text, t.x + t.padX, t.y + h / 2 + 1)
  }
  if (series) {
    const x = t.x + w + 10
    const sw = ctx.measureText(series).width + t.padX * 2
    if (x + sw <= BRAND.safe.right) {
      ctx.fillStyle = BRAND.ink
      roundRect(ctx, x, t.y, sw, h, t.radius)
      ctx.fill()
      ctx.fillStyle = BRAND.lime
      ctx.fillText(series, x + t.padX, t.y + h / 2 + 1)
    }
  }
  return c.toBuffer('image/png')
}

/** Breaks text into lines that fit a width at the current font. */
function wrap(ctx: SKRSContext2D, text: string, width: number): string[] {
  const out: string[] = []
  let line = ''
  for (const w of text.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${w}` : w
    if (line && ctx.measureText(next).width > width) { out.push(line); line = w } else line = next
  }
  if (line) out.push(line)
  return out
}

const GRAPHIC_LABEL: Record<string, string> = { number: 'THE NUMBER', checklist: 'CHECKLIST', myth_fact: 'MYTH OR FACT', definition: 'TAX WORD' }

/**
 * A brand card for a "graphic" scene (plan v2): drawn by code, free, never
 * garbled. White page, ink text, the title on a lime highlighter, up to four
 * short lines. Everything sits inside the safe zone and above the captions.
 */
export function graphicPng(g: { type: string; title: string; lines: readonly string[] }): Buffer {
  ensureFonts()
  const { width: W, height: H } = BRAND.frame
  const c = createCanvas(W, H)
  const ctx = c.getContext('2d')
  const left = BRAND.safe.left + 10, width = BRAND.maxTextWidth - 20
  ctx.fillStyle = BRAND.white
  ctx.fillRect(0, 0, W, H)
  ctx.textBaseline = 'middle'
  // Measure first, then centre the whole block between the tag and the captions.
  let size = g.type === 'number' ? 110 : 80
  let lines: string[] = []
  for (; size >= 48; size -= 4) {
    ctx.font = `700 ${size}px "${BRAND.font}"`
    lines = wrap(ctx, g.title, width - 24)
    if (lines.length <= 3) break
  }
  const lh = size * 1.3
  ctx.font = `500 46px "${BRAND.font}"`
  const items = g.lines.slice(0, 4).map(t => wrap(ctx, t, width - 80))
  const itemsH = items.reduce((a, r) => a + r.length * 60 + 28, 0)
  const blockH = 100 + lines.length * lh + 36 + itemsH
  const zoneTop = BRAND.tag.y + 90, zoneBottom = BRAND.caption.bottom - 240 // clear of the spoken captions
  let y = Math.max(zoneTop, Math.round((zoneTop + zoneBottom) / 2 - blockH / 2))
  // Label pill.
  const label = GRAPHIC_LABEL[g.type] ?? 'GOOD TO KNOW'
  ctx.font = `700 30px "${BRAND.font}"`
  const lw = ctx.measureText(label).width + 36
  ctx.fillStyle = BRAND.ink
  roundRect(ctx, left, y, lw, 54, 27)
  ctx.fill()
  ctx.fillStyle = BRAND.lime
  ctx.fillText(label, left + 18, y + 28)
  y += 100
  // Title on a lime highlighter, the largest size that fits in 3 lines.
  ctx.font = `700 ${size}px "${BRAND.font}"`
  for (const l of lines) {
    const tw = ctx.measureText(l).width
    ctx.fillStyle = BRAND.lime
    roundRect(ctx, left - 12, y, tw + 24, lh - 8, 14)
    ctx.fill()
    ctx.fillStyle = BRAND.ink
    ctx.fillText(l, left, y + (lh - 8) / 2 + 2)
    y += lh
  }
  y += 36
  // Lines: a tick box for a checklist, a dot otherwise.
  ctx.font = `500 46px "${BRAND.font}"`
  for (const rows of items) {
    if (y + rows.length * 60 > zoneBottom) break
    const cy = y + 30
    if (g.type === 'checklist') {
      ctx.fillStyle = BRAND.ink
      roundRect(ctx, left, cy - 22, 44, 44, 10)
      ctx.fill()
      ctx.strokeStyle = BRAND.lime
      ctx.lineWidth = 6
      ctx.beginPath(); ctx.moveTo(left + 11, cy); ctx.lineTo(left + 19, cy + 9); ctx.lineTo(left + 34, cy - 10); ctx.stroke()
    } else {
      ctx.fillStyle = BRAND.ink
      ctx.beginPath(); ctx.arc(left + 14, cy, 9, 0, Math.PI * 2); ctx.fill()
    }
    ctx.fillStyle = BRAND.ink
    rows.forEach((r, i) => ctx.fillText(r, left + 70, cy + i * 60 + 2))
    y += rows.length * 60 + 28
  }
  return c.toBuffer('image/png')
}
