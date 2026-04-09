import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { isRateLimited } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'

const ALLOWED = new Set(['image/jpeg','image/png','image/webp','image/gif','application/pdf'])
const MAX_SIZE = 10 * 1024 * 1024

const MAGIC: { mime: string; bytes: number[] }[] = [
  { mime: 'image/jpeg',      bytes: [0xFF, 0xD8, 0xFF] },
  { mime: 'image/png',       bytes: [0x89, 0x50, 0x4E, 0x47] },
  { mime: 'image/webp',      bytes: [0x52, 0x49, 0x46, 0x46] },
  { mime: 'image/gif',       bytes: [0x47, 0x49, 0x46, 0x38] },
  { mime: 'application/pdf', bytes: [0x25, 0x50, 0x44, 0x46] },
]

function validateMagicBytes(buf: ArrayBuffer, contentType: string): boolean {
  const bytes = new Uint8Array(buf, 0, Math.min(8, buf.byteLength))
  const sig = MAGIC.find(m => m.mime === contentType)
  if (!sig) return false
  return sig.bytes.every((b, i) => bytes[i] === b)
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  if (await isRateLimited(ip, 'tax-form')) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }
  try {
    const filename = req.nextUrl.searchParams.get('filename') ?? 'invoice'
    const contentType = req.headers.get('content-type') ?? ''
    if (!ALLOWED.has(contentType)) {
      return NextResponse.json({ ok: false, error: 'File type not allowed' }, { status: 400 })
    }
    const body = await req.arrayBuffer()
    if (body.byteLength > MAX_SIZE) {
      return NextResponse.json({ ok: false, error: 'File too large (max 10MB)' }, { status: 400 })
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
