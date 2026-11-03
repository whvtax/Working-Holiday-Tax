import { heicDeclaredPixels, heicTooLargeToDecode, HEIC_MAX_PIXELS } from '@/lib/heic-guard'

function heic(w: number, h: number, pad = 64): ArrayBuffer {
  const b = Buffer.alloc(pad + 24)
  Buffer.from('ftypheic').copy(b, 4)
  const i = pad
  b.writeUInt32BE(20, i - 4)
  Buffer.from('ispe').copy(b, i)
  b.writeUInt32BE(0, i + 4); b.writeUInt32BE(w, i + 8); b.writeUInt32BE(h, i + 12)
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)
}
it('reads declared dimensions', () => expect(heicDeclaredPixels(heic(4032, 3024))).toBe(4032 * 3024))
it('a phone-sized image is decoded', () => expect(heicTooLargeToDecode(heic(8000, 6000))).toBe(false))
it('a 200 MP camera file at the limit is decoded, a bomb is not', () => {
  expect(heicTooLargeToDecode(heic(10000, 10000))).toBe(false)
  expect(heicTooLargeToDecode(heic(60000, 60000))).toBe(true)
  expect(heicTooLargeToDecode(heic(0xffffffff, 0xffffffff))).toBe(true)
  expect(HEIC_MAX_PIXELS).toBe(100_000_000)
})
it('the largest of several ispe boxes counts (a small thumbnail cannot hide a huge primary image)', () => {
  const a = Buffer.from(heic(160, 120)); const c = Buffer.from(heic(50000, 50000))
  const all = Buffer.concat([a, c])
  expect(heicTooLargeToDecode(all.buffer.slice(all.byteOffset, all.byteOffset + all.byteLength))).toBe(true)
})
it('no ispe box or a tiny buffer falls back to the old behaviour', () => {
  expect(heicDeclaredPixels(new ArrayBuffer(8))).toBeNull()
  expect(heicTooLargeToDecode(new ArrayBuffer(1000))).toBe(false)
})
