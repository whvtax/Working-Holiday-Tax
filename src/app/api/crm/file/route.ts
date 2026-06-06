export const runtime = 'nodejs'
// /api/crm/file?url=<supabase-url>
// Serves Supabase Storage files only to authenticated CRM sessions.
// Prevents direct public access to client identity documents.
import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

const ALLOWED_CONTENT_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'image/heic', 'image/heif', 'application/pdf',
])

function auth(req: NextRequest): boolean {
  return validateSession(req.cookies.get('crm_session')?.value)
}

/**
 * Returns true if the URL is from our Supabase project.
 * Format: https://<project>.supabase.co/storage/v1/object/public/uploads/...
 */
function isAllowedSupabaseUrl(url: URL): boolean {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) return false
  try {
    const allowed = new URL(supabaseUrl)
    return url.hostname === allowed.hostname && url.pathname.startsWith('/storage/v1/object/public/')
  } catch {
    return false
  }
}

export async function GET(req: NextRequest) {
  // 1. Auth check
  if (!auth(req)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  // 2. Parse and validate the URL
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

  // 3. Only allow fetching from our own Supabase project - never arbitrary URLs
  if (!isAllowedSupabaseUrl(parsed)) {
    return NextResponse.json({ ok: false, error: 'forbidden_host' }, { status: 403 })
  }

  // 4. Fetch from Supabase Storage (public bucket - no auth token needed)
  let fileRes: Response
  try {
    fileRes = await fetch(url, { next: { revalidate: 0 } })
  } catch {
    return NextResponse.json({ ok: false, error: 'fetch_failed' }, { status: 502 })
  }

  if (!fileRes.ok) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })
  }

  // 5. Validate content type - never proxy unexpected file types
  const contentType = fileRes.headers.get('content-type') ?? ''
  const baseType = contentType.split(';')[0].trim()
  if (!ALLOWED_CONTENT_TYPES.has(baseType)) {
    return NextResponse.json({ ok: false, error: 'forbidden_type' }, { status: 403 })
  }

  // 6. Stream back to client with security headers
  const body = await fileRes.arrayBuffer()
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
