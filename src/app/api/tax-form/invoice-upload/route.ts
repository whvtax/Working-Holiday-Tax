export const maxDuration = 60
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { isRateLimited } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'
import { uploadFiles } from '@/lib/upload'

// Upload ONE invoice file at a time — same pattern as TFN/ABN/Super forms.
// Client calls this once per invoice file.
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    if (await isRateLimited(ip, 'tax-form')) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file || file.size === 0) {
      return NextResponse.json({ ok: false, error: 'No file provided' }, { status: 400 })
    }

    const urls = await uploadFiles([file], 'tax-form/invoices')
    return NextResponse.json({ ok: true, url: urls[0] ?? null })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Upload error'
    console.error('[invoice-upload]', err)
    return NextResponse.json({ ok: false, error: 'invalid_file', message: msg }, { status: 400 })
  }
}
