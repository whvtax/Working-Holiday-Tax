/**
 * /api/crm/clients/[id]/files/view?fileId=XXX
 * GET — securely proxy a file for in-browser viewing
 *
 * SECURITY:
 *   - Requires valid CRM session (requireAuth)
 *   - Verifies file belongs to the requested client before streaming
 *   - Never exposes the real blob URL to the browser
 *   - Sets Content-Disposition: inline so the browser opens it, not downloads it
 *   - Sets strict CSP / X-Content-Type-Options headers
 *   - params.id and fileId validated against safe-chars regex
 *   - For PDFs: Content-Type kept as application/pdf (browser renders natively)
 *   - For images: Content-Type kept as image/* (browser renders natively)
 */
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { sql } from '@vercel/postgres'

const SAFE_ID_RE   = /^[A-Za-z0-9_-]+$/
const ALLOWED_MIME = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/heic',
  'image/heif',
])

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // 1. Auth
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth

  // 2. Validate client ID
  if (!SAFE_ID_RE.test(params.id)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  // 3. Validate fileId query param
  const fileId = req.nextUrl.searchParams.get('fileId') ?? ''
  if (!fileId || !SAFE_ID_RE.test(fileId)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  try {
    // 4. Look up the file — must belong to this client
    const { rows } = await sql`
      SELECT blob_url, file_name, mime_type
      FROM crm_client_files
      WHERE id = ${fileId} AND client_id = ${params.id}
    `
    const row = rows[0]
    if (!row) {
      return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })
    }

    // 5. Only proxy allowed MIME types
    if (!ALLOWED_MIME.has(row.mime_type)) {
      return NextResponse.json({ ok: false, error: 'unsupported_type' }, { status: 415 })
    }

    // 6. Fetch the blob server-side (never revealed to browser)
    const upstream = await fetch(row.blob_url)
    if (!upstream.ok) {
      return NextResponse.json({ ok: false, error: 'blob_unavailable' }, { status: 502 })
    }

    // 7. Stream back with security headers
    const body = await upstream.arrayBuffer()
    const safeName = row.file_name.replace(/[^a-zA-Z0-9._-]/g, '_')

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type':                row.mime_type,
        // inline = open in browser, not force-download
        'Content-Disposition':         `inline; filename="${safeName}"`,
        'Content-Length':              String(body.byteLength),
        // Security hardening
        'X-Content-Type-Options':      'nosniff',
        'X-Frame-Options':             'SAMEORIGIN',
        'Cache-Control':               'private, no-store',
        'Content-Security-Policy':     "default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline'",
        // Prevent the upstream URL leaking via Referer
        'Referrer-Policy':             'no-referrer',
      },
    })
  } catch (err) {
    console.error('[GET file/view]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
