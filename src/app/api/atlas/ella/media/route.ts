// GET /api/atlas/ella/media?path=productions/...: plays or downloads one of
// Ella's videos from the private bucket, for a logged-in CRM user only.
// Same origin, so the CRM's strict media policy (media-src 'self') holds.
import { NextResponse } from 'next/server'
import { sessionValid } from '@/lib/will/auth'
import { ellaServices } from '@/lib/ella/services'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 30

export async function GET(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  const url = new URL(req.url)
  // ?image=...: an Instagram or TikTok profile picture or post cover for the live phones. The site's
  // policy allows images from our own address only, so they come through here; only the two
  // platforms' image servers are fetched, anything else is refused.
  const image = url.searchParams.get('image')
  if (image !== null) return platformImage(image)
  const path = url.searchParams.get('path') ?? ''
  if (!/^productions\/[0-9a-f-]{36}\/v\d+\/[\w.-]+\.(mp4|png|jpg)$/.test(path)) return NextResponse.json({ ok: false, error: 'bad_path' }, { status: 400 })
  const signed = await ellaServices().media.signedUrl(path, 300)
  const range = req.headers.get('range')
  const upstream = await fetch(signed, { headers: range ? { range } : {} })
  const headers = new Headers({ 'content-type': upstream.headers.get('content-type') ?? 'video/mp4', 'cache-control': 'private, no-store', 'accept-ranges': 'bytes' })
  for (const h of ['content-length', 'content-range']) { const v = upstream.headers.get(h); if (v) headers.set(h, v) }
  if (url.searchParams.get('download') === '1') headers.set('content-disposition', `attachment; filename="ella-${path.split('/')[1].slice(0, 8)}.${path.split('.').pop()}"`)
  return new Response(upstream.body, { status: upstream.status, headers })
}

const IMAGE_HOSTS = [/\.cdninstagram\.com$/, /\.fbcdn\.net$/, /\.tiktokcdn\.com$/, /\.tiktokcdn-us\.com$/, /\.tiktokcdn-eu\.com$/, /\.ibyteimg\.com$/]
async function platformImage(raw: string) {
  let u: URL
  try { u = new URL(raw) } catch { return NextResponse.json({ ok: false, error: 'bad_url' }, { status: 400 }) }
  if (u.protocol !== 'https:' || !IMAGE_HOSTS.some(r => r.test(u.hostname))) return NextResponse.json({ ok: false, error: 'host_not_allowed' }, { status: 400 })
  const up = await fetch(u, { redirect: 'error' }).catch(() => null)
  const type = up?.headers.get('content-type') ?? ''
  if (!up || !up.ok || !type.startsWith('image/')) return NextResponse.json({ ok: false, error: 'not_an_image' }, { status: 502 })
  return new NextResponse(up.body, { headers: { 'content-type': type, 'cache-control': 'private, max-age=1800' } })
}
