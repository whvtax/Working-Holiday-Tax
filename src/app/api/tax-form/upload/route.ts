import { NextRequest, NextResponse } from 'next/server'
import { generateClientTokenFromReadWriteToken } from '@vercel/blob/client'
import { isRateLimited } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'

export const maxDuration = 60

const ALLOWED_EXTENSIONS = new Set([
  'jpg','jpeg','png','webp','gif','heic','heif','pdf'
])
const MAX_SIZE = 25 * 1024 * 1024 // 25MB

// This route generates a short-lived upload token.
// The client uploads directly to Vercel Blob using this token — no file bytes pass through here.
// No callback required — simpler and more reliable than handleUpload.
export async function GET(req: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(req)
  if (await isRateLimited(ip, 'tax-form')) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  const filename = req.nextUrl.searchParams.get('filename') ?? 'file'
  const ext = (filename.split('.').pop() ?? '').toLowerCase()

  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json(
      { error: `File type ".${ext}" is not allowed. Please upload a photo or PDF.` },
      { status: 400 }
    )
  }

  try {
    const token = await generateClientTokenFromReadWriteToken({
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      pathname: `tax-form/invoices/${Date.now()}_${filename}`,
      allowedContentTypes: [
        'image/jpeg','image/jpg','image/png','image/webp',
        'image/gif','image/heic','image/heif','application/pdf',
      ],
      maximumSizeInBytes: MAX_SIZE,
      addRandomSuffix: true,
    })

    return NextResponse.json({ token })
  } catch (err) {
    console.error('[upload-token]', err)
    return NextResponse.json({ error: 'Failed to generate upload token' }, { status: 500 })
  }
}

// Keep POST for backward compat (returns 405)
export async function POST(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Use GET to obtain upload token' }, { status: 405 })
}
