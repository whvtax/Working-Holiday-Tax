import { buildSvtLlms } from '@/lib/svt/llms'

// Served at studentvisatax.com.au/llms.txt (rewritten here by host).
export const dynamic = 'force-static'

export function GET() {
  return new Response(buildSvtLlms(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
