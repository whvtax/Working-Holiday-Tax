/**
 * Pixel-size guard for HEIC/HEIF files before they are decoded server side.
 *
 * /api/crm/file transcodes HEIC to JPEG with heic-convert (libheif compiled to
 * WebAssembly) so a browser can show it. The decoder allocates from the IMAGE
 * dimensions, not from the file size, so a 10 MB upload that declares a
 * 60000 x 60000 grid is a decompression bomb for the serverless function the
 * moment a member of staff opens the document (round 2, sec2-forms-uploads).
 * The dimensions are in the file's `ispe` (image spatial extents) property box,
 * which is cheap to read without decoding.
 */

/** About 100 megapixels: far above any phone camera's HEIC (48 MP is typical,
 *  200 MP is the extreme), far below what exhausts a 1 GB function. */
export const HEIC_MAX_PIXELS = 100_000_000

/** Largest width x height declared by any `ispe` box in the first 256 KB, or null
 *  when none is found (the caller then decodes as before). */
export function heicDeclaredPixels(buf: ArrayBuffer): number | null {
  const bytes = new Uint8Array(buf, 0, Math.min(buf.byteLength, 256 * 1024))
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  let max: number | null = null
  for (let i = 4; i + 16 <= bytes.length; i++) {
    // 'ispe'
    if (bytes[i] !== 0x69 || bytes[i + 1] !== 0x73 || bytes[i + 2] !== 0x70 || bytes[i + 3] !== 0x65) continue
    // 4 bytes version+flags, then width and height as big-endian uint32.
    const w = view.getUint32(i + 8)
    const h = view.getUint32(i + 12)
    const px = w * h
    if (max === null || px > max) max = px
  }
  return max
}

/** True when the file declares more pixels than the server will decode. */
export function heicTooLargeToDecode(buf: ArrayBuffer): boolean {
  const px = heicDeclaredPixels(buf)
  return px !== null && px > HEIC_MAX_PIXELS
}
