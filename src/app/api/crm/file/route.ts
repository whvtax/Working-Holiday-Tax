export const runtime = 'nodejs'
// /api/crm/file?url=<supabase-url>
// Serves Supabase Storage files only to authenticated CRM sessions.
// SECURITY: the "uploads" bucket is PRIVATE. Identity documents are NOT publicly
// reachable. This route downloads the object with the server-side service-role
// key and streams it back only after a valid CRM session check.
import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase, STORAGE_BUCKETS } from '@/lib/supabase'

const ALLOWED_CONTENT_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'image/heic', 'image/heif', 'application/pdf',
])

const EXT_TYPES: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
  gif: 'image/gif', heic: 'image/heic', heif: 'image/heif', pdf: 'application/pdf',
}

function auth(req: NextRequest): boolean {
  return validateSession(req.cookies.get('crm_session')?.value)
}

// iPhone photos arrive as HEIC/HEIF, which browsers cannot display. iOS uploads
// are tagged image/jpeg even when the bytes are HEIC, so we sniff the actual
// container by magic bytes ('ftyp' box + a HEIF brand) rather than trust the
// content-type or extension.
function isHeicBuffer(buf: ArrayBuffer): boolean {
  if (buf.byteLength < 12) return false
  const b = new Uint8Array(buf, 0, 16)
  if (b[4] !== 0x66 || b[5] !== 0x74 || b[6] !== 0x79 || b[7] !== 0x70) return false // 'ftyp'
  const brand = String.fromCharCode(b[8], b[9], b[10], b[11]).toLowerCase()
  return brand.startsWith('hei') || brand.startsWith('mif') || brand.startsWith('msf') || brand === 'hevc' || brand === 'hevx'
}

// Validates the URL is from our Supabase project and extracts the object path
// inside the uploads bucket. Returns null if not one of ours.
function extractBucketPath(url: URL): string | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) return null
  try {
    const allowed = new URL(supabaseUrl)
    if (url.hostname !== allowed.hostname) return null
  } catch {
    return null
  }
  const bucket = STORAGE_BUCKETS.uploads
  const markers = [
    `/storage/v1/object/public/${bucket}/`,
    `/storage/v1/object/sign/${bucket}/`,
    `/storage/v1/object/${bucket}/`,
  ]
  for (const marker of markers) {
    const idx = url.pathname.indexOf(marker)
    if (idx !== -1) {
      const path = url.pathname.slice(idx + marker.length)
      if (!path || path.includes('..')) return null
      return decodeURIComponent(path)
    }
  }
  return null
}

export async function GET(req: NextRequest) {
  if (!auth(req)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  if (!url) {
    return NextResponse.json({ ok: false, error: 'missing_url' }, { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_url' }, { status: 400 })
  }

  const objectPath = extractBucketPath(parsed)
  if (!objectPath) {
    return NextResponse.json({ ok: false, error: 'forbidden_host' }, { status: 403 })
  }

  let blob: Blob
  try {
    const sb = getSupabase()
    const { data, error } = await sb.storage.from(STORAGE_BUCKETS.uploads).download(objectPath)
    if (error || !data) {
      return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })
    }
    blob = data
  } catch {
    return NextResponse.json({ ok: false, error: 'fetch_failed' }, { status: 502 })
  }

  const ext = objectPath.split('.').pop()?.toLowerCase() ?? ''
  let baseType = (blob.type && blob.type.split(';')[0].trim()) || EXT_TYPES[ext] || ''
  if (!ALLOWED_CONTENT_TYPES.has(baseType)) {
    return NextResponse.json({ ok: false, error: 'forbidden_type' }, { status: 403 })
  }

  let body: ArrayBuffer = await blob.arrayBuffer()

  // Transcode HEIC/HEIF → JPEG so the browser can actually render the image.
  // Detected by magic bytes (or extension). On failure we serve the original
  // bytes and the client falls back to an "open in new tab" link.
  if (isHeicBuffer(body) || ext === 'heic' || ext === 'heif') {
    try {
      const convert = (await import('heic-convert')).default
      const out = await convert({ buffer: Buffer.from(body), format: 'JPEG', quality: 0.85 })
      body = new Uint8Array(out).slice().buffer
      baseType = 'image/jpeg'
    } catch (err) {
      console.error('[crm/file] HEIC→JPEG conversion failed:', err)
    }
  }

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': baseType,
      'Content-Length': String(body.byteLength),
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      'Content-Disposition': 'inline',
    },
  })
}
