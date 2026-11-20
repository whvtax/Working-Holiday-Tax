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
