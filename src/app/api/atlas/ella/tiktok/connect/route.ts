// GET /api/atlas/ella/tiktok/connect: sends Jo to TikTok to connect the SVT account.
import { NextResponse } from 'next/server'
import { sessionValid } from '@/lib/will/auth'
import { TIKTOK_CALLBACK_URL, tiktokAuthorizeUrl } from '@/lib/ella/publish/tiktok'
import { signState } from '@/lib/ella/secrets'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  const redirectUri = TIKTOK_CALLBACK_URL
  return NextResponse.redirect(tiktokAuthorizeUrl(redirectUri, signState({ p: 'tiktok' })))
}
