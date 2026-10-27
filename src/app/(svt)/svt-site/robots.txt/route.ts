import { buildSvtRobots } from '@/lib/svt/seo'

// Served at studentvisatax.com.au/robots.txt (rewritten here by host).
export const dynamic = 'force-static'

export function GET() {
  return new Response(buildSvtRobots(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
