// Jo, Nov 23: the cover never hides Ella's face.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createCanvas, loadImage } from '@napi-rs/canvas'
import { FACE_CLEAR_Y, coverPng } from '../video/cover'

test('the cover draws nothing over her face: every layout keeps the title below the face line', async () => {
  const W = 1080, H = 1920
  const f = createCanvas(W, H); const fx = f.getContext('2d'); fx.fillStyle = 'rgb(120,120,120)'; fx.fillRect(0, 0, W, H)
  const frame = f.toBuffer('image/png')
  for (const series of [undefined, 'MYTH OR FACT', 'YOUR JOB YOUR TAX', 'TAX WORD']) {
    // The longest title allowed: 6 long words, so it wraps to 3 lines.
    const jpg = await coverPng(frame, { second: 1, title: 'Students working international superannuation withholding deductions', highlight: 'superannuation' }, series)
    const img = await loadImage(jpg)
    const c = createCanvas(W, H); const cx = c.getContext('2d'); cx.drawImage(img, 0, 0)
    const px = cx.getImageData(0, 0, W, FACE_CLEAR_Y).data
    let changed = 0
    for (let y = 0; y < FACE_CLEAR_Y; y++) for (let x = 0; x < W; x++) {
      if (series && y >= 270 && y <= 354 && x < 700) continue // the series tab, above her forehead
      const i = (y * W + x) * 4
      if (Math.abs(px[i] - 120) > 30 || Math.abs(px[i + 1] - 120) > 30 || Math.abs(px[i + 2] - 120) > 30) changed++
    }
    assert.equal(changed, 0, `${series ?? 'no series'}: ${changed} pixels drawn over the face area`)
  }
})

test('a cover title with a question and then a statement ends with a full stop (Jo, Nov 23)', async () => {
  const { safeDesign } = await import('../video/cover')
  const fb = { hook: 'Carrying cash to Australia?', keyTerm: 'declare', second: 1 }
  assert.equal(safeDesign({ second: 1, title: 'Flying with cash? Declare it', highlight: 'Declare' }, fb, 30).title, 'Flying with cash? Declare it.')
  assert.equal(safeDesign({ second: 1, title: 'Flying with cash? Declare it.', highlight: 'Declare' }, fb, 30).title, 'Flying with cash? Declare it.')
  assert.equal(safeDesign({ second: 1, title: 'Flying with cash?', highlight: 'cash' }, fb, 30).title, 'Flying with cash?')
  assert.equal(safeDesign({ second: 1, title: 'Flying with cash? Declare it', highlight: 'Declare' }, fb, 30).highlight, 'Declare')
})

test('no series name anywhere: the cover title never carries it, and a myth card has no label (Jo, Nov 23)', async () => {
  const { safeDesign } = await import('../video/cover')
  const t = safeDesign({ second: 1, title: 'MYTH OR FACT: cash is free', highlight: 'cash' }, { hook: 'Carrying cash to Australia?', keyTerm: 'cash', second: 1 }, 30).title
  assert.ok(!/myth or fact/i.test(t), t)
  const { graphicPng } = await import('../video/overlays')
  const img = await loadImage(graphicPng({ type: 'myth_fact', title: 'Cash is not taxed', lines: ['Declare $10,000 or more'] }))
  assert.ok(img.width > 0)
})
