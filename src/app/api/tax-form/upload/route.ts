export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { getSupabase, STORAGE_BUCKETS } from '@/lib/supabase'
import { isRateLimited } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'
import crypto from 'crypto'

const ALLOWED = new Set(['image/jpeg','image/jpg','image/png','image/webp','image/gif','image/heic','image/heif','application/pdf'])
const MAX_SIZE = 10 * 1024 * 1024

// Block files containing executable/script signatures (defense in depth)
const DANGEROUS_PATTERNS = [
  [0x3C, 0x3F, 0x70, 0x68, 0x70],              // <?php
  [0x3C, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74],  // <script
  [0x7F, 0x45, 0x4C, 0x46],                    // ELF (Linux exe)
  [0x4D, 0x5A],                                // MZ (Windows exe/dll)
]

function containsDangerous(buf: ArrayBuffer): boolean {
  const bytes = new Uint8Array(buf, 0, Math.min(8192, buf.byteLength))
  for (const pattern of DANGEROUS_PATTERNS) {
    for (let i = 0; i <= bytes.length - pattern.length; i++) {
      let match = true
      for (let j = 0; j < pattern.length; j++) {
        if (bytes[i + j] !== pattern[j]) { match = false; break }
      }
      if (match) return true
    }
  }
  return false
}

// Magic bytes validation. Confirms the declared MIME type matches the actual
// file signature so an attacker cannot upload `<?php ...` while declaring image/jpeg.
function validateMagicBytes(buf: ArrayBuffer, contentType: string): boolean {
  const bytes = new Uint8Array(buf, 0, Math.min(12, buf.byteLength))
  const isJpeg = bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF
  const isPng  = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47
  const isPdf  = bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46
  const isWebp = bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
                 bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  const isGif  = bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38
  // HEIC/HEIF (iOS photos): ftyp box - bytes 4-7 are 'ftyp'
  const isHeic = bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70

  switch (contentType) {
    case 'image/jpeg':
    case 'image/jpg':
      // iOS clients send HEIC as image/jpeg (the client normalises before upload
      // since HEIC isn't universally supported); accept either signature here.
      return isJpeg || isHeic
    case 'image/png':
      return isPng
    case 'application/pdf':
      return isPdf
    case 'image/webp':
      return isWebp
    case 'image/gif':
      return isGif
    case 'image/heic':
    case 'image/heif':
      return isHeic
    default:
      return false
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  // Allow 100 file uploads per 15min per IP (handles 22 files × 3 retries + buffer)
  if (await isRateLimited(ip, 'tax-form-upload', 100)) {
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
    if (containsDangerous(body)) {
      return NextResponse.json({ ok: false, error: 'File contains potentially dangerous content' }, { status: 400 })
    }

    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80)
    // Use a UUID for the random portion - Math.random() can collide under
    // heavy concurrent uploads (the tax form may upload 20+ files in parallel
    // with retries) since 5 base-36 chars only gives ~60M combinations.
    const pathname = `tax-form/invoices/${Date.now()}_${crypto.randomUUID().slice(0, 8)}_${safeName}`

    const sb = getSupabase()
    const { error: uploadError } = await sb.storage
      .from(STORAGE_BUCKETS.uploads)
      .upload(pathname, body, {
        contentType,
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('[invoice-upload supabase]', uploadError)
      return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 })
    }

    const { data: { publicUrl } } = sb.storage
      .from(STORAGE_BUCKETS.uploads)
      .getPublicUrl(pathname)

    return NextResponse.json({ ok: true, url: publicUrl })
  } catch (err) {
    console.error('[invoice-upload]', err)
    return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 })
  }
}
