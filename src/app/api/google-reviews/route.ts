import { NextResponse } from 'next/server'
import { fetchGoogleData } from '@/lib/googleReviewsServer'

// Server-side proxy for Google reviews (via the free Featurable API).
// Fetching on the server avoids browser CORS / ad-blocker issues that
// can block a direct client-side request to featurable.com.
// The fetch itself lives in lib/googleReviewsServer.ts so the server-rendered
// review carousel and this route always return the same data.

export const revalidate = 3600 // cache for 1 hour, then refresh

export async function GET() {
  const d = await fetchGoogleData()
  if (!d) return NextResponse.json({ ok: false })
  return NextResponse.json({ ok: true, ...d })
}
