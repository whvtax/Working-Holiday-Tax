// /api/crm/file?url=<blob-url>
// Serves Vercel Blob files only to authenticated CRM sessions.
// Prevents direct public access to client identity documents.
import { NextRequest, NextResponse } from 'next/server'
import { validateSession, validateReviewerSession } from '@/lib/crm-store'

const ALLOWED_BLOB_HOST = 'vercel-storage.com'
const ALLOWED_CONTENT_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'image/heic', 'image/heif', 'application/pdf',
])

function auth(req: NextRequest): boolean {
  const cookies = req.cookies
  return (
    validateSession(cookies.get('crm_session')?.value) ||
    validateReviewerSession(cookies.get('crm_reviewer_session')?.value)
  )
}

export async function GET(req: NextRequest) {
  // 1. Auth check
  if (!auth(req)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  // 2. Parse and validate the blob URL
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

  // 3. Only allow fetching from Vercel Blob storage — never arbitrary URLs
  if (!parsed.hostname.endsWith(ALLOWED_BLOB_HOST)) {
    return NextResponse.json({ ok: false, error: 'forbidden_host' }, { status: 403 })
  }

  // 4. Fetch from blob store (server-side — no auth token needed for Vercel Blob)
  let blobRes: Response
  try {
    blobRes = await fetch(url, { next: { revalidate: 0 } })
  } catch {
    return NextResponse.json({ ok: false, error: 'fetch_failed' }, { status: 502 })
  }

  if (!blobRes.ok) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })
  }

  // 5. Validate content type — never proxy unexpected file types
  const contentType = blobRes.headers.get('content-type') ?? ''
  const baseType = contentType.split(';')[0].trim()
  if (!ALLOWED_CONTENT_TYPES.has(baseType)) {
    return NextResponse.json({ ok: false, error: 'forbidden_type' }, { status: 403 })
  }

  // 6. Stream back to client with security headers
  const body = await blobRes.arrayBuffer()
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
