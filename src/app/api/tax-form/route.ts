export const maxDuration = 60
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { isRateLimited } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'
import { uploadFiles } from '@/lib/upload'

// Uploads selfie only — one file, same as TFN form pattern (proven to work)
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    if (await isRateLimited(ip, 'tax-form')) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
    }

    const formData = await req.formData()
    const selfieFile = formData.get('selfiePassport') as File | null

    let selfieUrls: string[] = []
    try {
      selfieUrls = await uploadFiles([selfieFile], 'tax-form/selfies')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Upload error'
      return NextResponse.json({ ok: false, error: 'invalid_file', message: msg }, { status: 400 })
    }

    return NextResponse.json({ ok: true, url: selfieUrls[0] ?? null })
  } catch (err) {
    console.error('[tax-form] FAILED:', err)
    return NextResponse.json({ ok: false, error: 'submission_failed' }, { status: 500 })
  }
}
