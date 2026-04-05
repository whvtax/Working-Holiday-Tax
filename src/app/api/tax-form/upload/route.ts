import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

const ALLOWED = new Set(['image/jpeg','image/png','image/webp','application/pdf'])
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(req: NextRequest) {
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
