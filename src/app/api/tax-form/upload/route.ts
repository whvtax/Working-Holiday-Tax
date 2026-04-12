import { NextRequest, NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { isRateLimited } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'

const ALLOWED_TYPES = new Set([
  'image/jpeg','image/jpg','image/png','image/webp',
  'image/gif','image/heic','image/heif','application/pdf'
])
const MAX_SIZE = 25 * 1024 * 1024 // 25MB

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(req)

  // Rate-limit on the token request (not on the actual upload)
  if (await isRateLimited(ip, 'tax-form')) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }

  try {
    const body = await req.json() as HandleUploadBody

    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Validate file type from pathname extension before issuing token
        const ext = pathname.split('.').pop()?.toLowerCase() ?? ''
        const extToType: Record<string, string> = {
          jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
          webp: 'image/webp', gif: 'image/gif',
          heic: 'image/heic', heif: 'image/heif', pdf: 'application/pdf',
        }
        const mimeType = extToType[ext]
        if (!mimeType || !ALLOWED_TYPES.has(mimeType)) {
          throw new Error(`File type ".${ext}" is not allowed. Please upload a photo or PDF.`)
        }
        return {
          allowedContentTypes: Array.from(ALLOWED_TYPES),
          maximumSizeInBytes: MAX_SIZE,
          tokenPayload: clientPayload,
          addRandomSuffix: true,
          pathname: `tax-form/invoices/${pathname}`,
        }
      },
      onUploadCompleted: async ({ blob }) => {
        // Optional: log completed uploads
        console.log('[upload] completed:', blob.url)
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed'
    console.error('[invoice-upload]', err)
    return NextResponse.json({ ok: false, error: message }, { status: 400 })
  }
}
