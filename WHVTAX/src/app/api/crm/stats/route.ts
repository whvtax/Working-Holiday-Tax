export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

// In-memory cache: stats are expensive at scale.
// 10s TTL — short enough to feel "live" yet absorbs polling from multiple tabs.
let _cache: { data: unknown; expiresAt: number } | null = null
const CACHE_TTL_MS = 10_000

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const now = Date.now()
    // Allow ?refresh=1 to bypass cache (e.g. after a manual action)
    const { searchParams } = new URL(req.url)
    const forceRefresh = searchParams.get('refresh') === '1'

    if (!forceRefresh && _cache && _cache.expiresAt > now) {
      return NextResponse.json({ ok: true, stats: _cache.data, cached: true })
    }

    const { getDashboardStats } = await import('@/lib/db')
    const stats = await getDashboardStats()
    _cache = { data: stats, expiresAt: now + CACHE_TTL_MS }
    return NextResponse.json({ ok: true, stats })
  } catch (err) {
    console.error('[GET stats]', err)
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}
