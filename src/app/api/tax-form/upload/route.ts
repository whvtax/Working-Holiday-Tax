import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { isRateLimited } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'

const ALLOWED = new Set(['image/jpeg','image/jpg','image/png','image/webp','image/gif','image/heic','image/heif','application/pdf'])
const MAX_SIZE = 10 * 1024 * 1024

// Detect actual file type from magic bytes regardless of declared content-type
function detectFileType(buf: ArrayBuffer): string | null {
  const bytes = new Uint8Array(buf, 0, Math.min(12, buf.byteLength))
  // JPEG: FF D8 FF
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) return 'image/jpeg'
  // PNG: 89 50 4E 47
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) return 'image/png'
  // PDF: 25 50 44 46
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) return 'application/pdf'
  // WEBP: RIFF....WEBP
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) return 'image/webp'
  // GIF: GIF8
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) return 'image/gif'
  // HEIC/HEIF (iOS photos): ftyp box — bytes 4-7 are 'ftyp'
  if (bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) return 'image/heic'
  return null
}

// Magic bytes for basic validation — also handles iOS HEIC sent with wrong content-type
function validateMagicBytes(buf: ArrayBuffer, contentType: string): boolean {
  const detected = detectFileType(buf)
  // If we detected a known type, it's valid regardless of declared content-type
  if (detected !== null) return true
  // Strict rejection: unknown magic bytes are not accepted.
  // The lenient fallback was removed because it allowed executables (MZ/ELF headers)
  // declared as image/* to pass through — a real security vulnerability.
  return false
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  if (await isRateLimited(ip, 'tax-form')) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }
  try {
    const filename = req.nextUrl.searchParams.get('filename') ?? 'invoice'
    const declaredType = req.headers.get('content-type') ?? ''
    const body = await req.arrayBuffer()
    if (body.byteLength > MAX_SIZE) {
      return NextResponse.json({ ok: false, error: 'File too large (max 10MB)' }, { status: 400 })
    }
    // Detect actual file type from magic bytes — handles iOS HEIC sent as jpeg
    const detectedType = detectFileType(body)
    const contentType = detectedType ?? declaredType
    if (!ALLOWED.has(contentType) && !ALLOWED.has(declaredType)) {
      return NextResponse.json({ ok: false, error: 'File type not allowed' }, { status: 400 })
    }
    if (!validateMagicBytes(body, contentType)) {
      return NextResponse.json({ ok: false, error: 'File content does not match declared type' }, { status: 400 })
    }
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80)
    const blob = await put(
      `tax-form/invoices/${Date.now()}_${Math.random().toString(36).slice(2,7)}_${safeName}`,
      body,
      { access: 'public', contentType }
    )
    return NextResponse.json({ ok: true, url: blob.url })
  } catch (err) {
    console.error('[invoice-upload]', err)
    return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 })
  }
}
