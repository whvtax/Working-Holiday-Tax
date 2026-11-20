// GET /api/atlas/ella/tiktok/callback: TikTok sends Jo back here. The signed
// state proves the request started from Atlas (TikTok's redirect does not
// carry the CRM cookie). Tokens are sealed before they are stored.
import { NextResponse } from 'next/server'
import { tiktokExchangeCode } from '@/lib/ella/publish/tiktok'
import { saveTikTokTokens } from '@/lib/ella/run'
import { verifyState } from '@/lib/ella/secrets'
import { ellaServices } from '@/lib/ella/services'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const back = (msg: string) => NextResponse.redirect(new URL(`/atlas/social_svt?tab=settings&tiktok=${encodeURIComponent(msg)}`, req.url))
  const state = url.searchParams.get('state') ?? ''
  const code = url.searchParams.get('code')
  if (!verifyState(state)) return back('expired')
  if (!code) return back(url.searchParams.get('error') ?? 'cancelled')
  try {
    const svc = ellaServices()
    const tokens = await tiktokExchangeCode(code, new URL('/api/atlas/ella/tiktok/callback', req.url).toString())
    await saveTikTokTokens(svc, tokens)
    await svc.repo.audit('jo', 'tiktok_connected', { openId: tokens.openId.slice(0, 6) })
    return back('connected')
  } catch {
    return back('failed')
  }
}
