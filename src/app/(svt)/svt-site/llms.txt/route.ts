import { buildSvtLlms } from '@/lib/svt/llms'

// Served at studentvisatax.com.au/llms.txt (rewritten here by host).
export const dynamic = 'force-static'
// Rebuilt daily, so date-dependent facts (the lodgment deadline) update by themselves.
export const revalidate = 86400

export function GET() {
  return new Response(buildSvtLlms(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
