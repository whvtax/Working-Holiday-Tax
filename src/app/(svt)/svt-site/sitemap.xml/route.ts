import { buildSvtSitemap } from '@/lib/svt/seo'

// Served at studentvisatax.com.au/sitemap.xml (rewritten here by host).
export const dynamic = 'force-static'

export function GET() {
  return new Response(buildSvtSitemap(), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
