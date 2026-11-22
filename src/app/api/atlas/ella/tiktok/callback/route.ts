// GET /api/atlas/ella/tiktok/callback: TikTok sends Jo back here. The signed
// state proves the request started from Atlas (TikTok's redirect does not
// carry the CRM cookie). Tokens are sealed before they are stored.
// The result is shown on a plain page instead of redirecting into Atlas: the
// CRM session cookie is SameSite=Strict, so the browser does not send it on
// this cross-site return, and a redirect into Atlas would ask for sign-in
// again even though the tokens were already saved.
import { TikTokError, tiktokExchangeCode } from '@/lib/ella/publish/tiktok'
import { saveTikTokTokens } from '@/lib/ella/run'
import { verifyState } from '@/lib/ella/secrets'
import { ellaServices } from '@/lib/ella/services'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const MESSAGES: Record<string, { title: string; text: string }> = {
  connected: { title: 'TikTok connected', text: 'The Student Visa Tax TikTok account is connected to Ella.' },
  expired: { title: 'TikTok not connected', text: 'The link expired. Go back to Atlas and try Connect TikTok again.' },
  cancelled: { title: 'TikTok not connected', text: 'The connection was cancelled. Go back to Atlas to try again.' },
  failed: { title: 'TikTok not connected', text: 'The connection did not finish. Go back to Atlas and try again.' },
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)

// detail is a diagnostic label only (the stage and the error class name).
// It never carries the error message, tokens or keys.
function page(key: keyof typeof MESSAGES, detail?: string) {
  const m = MESSAGES[key]
  const note = detail ? `<p style="color:#666;font-size:0.9rem">Diagnostic: ${esc(detail)}</p>` : ''
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>${esc(m.title)}</title></head>` +
    `<body style="font-family:system-ui,sans-serif;padding:2rem;max-width:36rem"><h2>${esc(m.title)}</h2><p>${esc(m.text)}</p>${note}<p>You can close this window.</p></body></html>`
  return new Response(html, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const state = url.searchParams.get('state') ?? ''
  const code = url.searchParams.get('code')
  if (!verifyState(state)) return page('expired')
  // TikTok's error text is never echoed back into the page.
  if (!code) return page('cancelled')
  let stage = 'setup'
  try {
    const svc = ellaServices()
    stage = 'exchange'
    const tokens = await tiktokExchangeCode(code, new URL('/api/atlas/ella/tiktok/callback', req.url).toString())
    stage = 'save'
    await saveTikTokTokens(svc, tokens)
    stage = 'audit'
    await svc.repo.audit('jo', 'tiktok_connected', { openId: tokens.openId.slice(0, 6) })
    return page('connected')
  } catch (err) {
    // TikTokError carries TikTok's short error code (for example invalid_client),
    // which is safe to show; the class name is minified and not useful.
    const detail = err instanceof TikTokError && err.code ? err.code : (err instanceof Error ? err.name : typeof err)
    return page('failed', `stage=${stage}, error=${detail}`)
  }
}
