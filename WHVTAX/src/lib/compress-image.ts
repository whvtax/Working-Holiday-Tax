// src/lib/compress-image.ts
// ──────────────────────────────────────────────────────────────────────────
// Client-side image compression (runs in the browser).
//
// WHY: Vercel serverless/edge functions reject any request body larger than
// ~4.5 MB with HTTP 413 ("Payload Too Large") BEFORE our route code runs.
// Modern phone photos (esp. iPhone HEIC/JPEG) are routinely 4-9 MB, so they
// passed the 10 MB client check but were killed by the platform -> forms failed.
//
// This helper downscales + re-encodes images to comfortably under the limit
// while keeping passports / bank statements legible. PDFs and already-small
// files are returned untouched. Any failure falls back to the original file so
// the upload still attempts (never blocks the user).
// ──────────────────────────────────────────────────────────────────────────

type CompressOptions = {
  /** Re-encode anything larger than this many bytes. Default 3.5 MB. */
  targetBytes?: number
  /** Longest edge of the output image in pixels. Default 2400. */
  maxDimension?: number
  /** Starting JPEG quality (0-1). Default 0.82. */
  quality?: number
}

// Hard ceiling for what we'll even attempt to POST. Vercel rejects bodies
// over ~4.5 MB with HTTP 413 before our route runs, so we block earlier and
// show a clear message instead of letting the platform fail the request.
// (Images are auto-compressed below this; this mainly catches large PDFs.)
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024

const DEFAULTS = {
  targetBytes: Math.floor(3.5 * 1024 * 1024),
  maxDimension: 2400,
  quality: 0.82,
}

const COMPRESSIBLE = new Set([
  'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif',
])

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality))
}

async function decode(file: File): Promise<{ width: number; height: number; draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void } | null> {
  // Prefer createImageBitmap - it honours EXIF orientation and is fast.
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' } as ImageBitmapOptions)
      return {
        width: bitmap.width,
        height: bitmap.height,
        draw: (ctx, w, h) => ctx.drawImage(bitmap, 0, 0, w, h),
      }
    } catch {
      /* fall through to <img> */
    }
  }
  // Fallback: HTMLImageElement via object URL.
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        draw: (ctx, w, h) => ctx.drawImage(img, 0, 0, w, h),
      })
      URL.revokeObjectURL(url)
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null) }
    img.src = url
  })
}

/**
 * Compress an image File to fit under the platform upload limit.
 * Returns a new JPEG File, or the original file if it's a PDF, already small,
 * or can't be decoded.
 */
export async function compressImage(file: File, opts: CompressOptions = {}): Promise<File> {
  const { targetBytes, maxDimension, quality } = { ...DEFAULTS, ...opts }

  // Not an image we can/should touch (e.g. PDF) -> leave as-is.
  if (!COMPRESSIBLE.has(file.type)) return file
  // Already small enough -> no need to re-encode (avoids quality loss).
  if (file.size <= targetBytes) return file
  if (typeof document === 'undefined') return file

  try {
    const decoded = await decode(file)
    if (!decoded || !decoded.width || !decoded.height) return file

    const scale = Math.min(1, maxDimension / Math.max(decoded.width, decoded.height))
    const outW = Math.max(1, Math.round(decoded.width * scale))
    const outH = Math.max(1, Math.round(decoded.height * scale))

    const canvas = document.createElement('canvas')
    canvas.width = outW
    canvas.height = outH
    const ctx = canvas.getContext('2d')
    if (!ctx) return file
    // White matte so transparent PNGs don't turn black when flattened to JPEG.
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, outW, outH)
    decoded.draw(ctx, outW, outH)

    // Step the quality down until the output fits under the target.
    let q = quality
    let blob: Blob | null = null
    for (let i = 0; i < 5; i++) {
      blob = await canvasToBlob(canvas, 'image/jpeg', q)
      if (!blob) break
      if (blob.size <= targetBytes) break
      q -= 0.15
      if (q < 0.4) { q = 0.4 }
    }
    if (!blob) return file
    // If somehow still bigger than the original, keep the original.
    if (blob.size >= file.size) return file

    const newName = file.name.replace(/\.(heic|heif|png|webp|jpeg|jpg)$/i, '') + '.jpg'
    return new File([blob], newName, { type: 'image/jpeg', lastModified: Date.now() })
  } catch {
    return file
  }
}
