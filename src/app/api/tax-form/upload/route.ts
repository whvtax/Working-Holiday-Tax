import { NextRequest, NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { isRateLimited } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'

export const maxDuration = 60

const ALLOWED_EXTENSIONS = new Set([
  'jpg','jpeg','png','webp','gif','heic','heif','pdf'
])
const MAX_SIZE = 25 * 1024 * 1024 // 25MB

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(req)
  if (await isRateLimited(ip, 'tax-form')) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }

  try {
    const body = await req.json() as HandleUploadBody

    const response = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        const ext = (pathname.split('.').pop() ?? '').toLowerCase()
        if (!ALLOWED_EXTENSIONS.has(ext)) {
          throw new Error(`File type ".${ext}" is not allowed. Please upload a photo or PDF.`)
        }
        return {
          allowedContentTypes: [
            'image/jpeg','image/jpg','image/png','image/webp',
            'image/gif','image/heic','image/heif','application/pdf',
          ],
          maximumSizeInBytes: MAX_SIZE,
          addRandomSuffix: true,
          pathname: `tax-form/invoices/${Date.now()}_${pathname}`,
        }
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('[upload] completed:', blob.url)
      },
    })

    return NextResponse.json(response)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed'
    console.error('[invoice-upload]', err)
    return NextResponse.json({ ok: false, error: message }, { status: 400 })
  }
}
