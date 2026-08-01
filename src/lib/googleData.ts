/**
 * Server-side Google rating fetcher.
 * Used by page components (Server Components) to embed real AggregateRating
 * data in JSON-LD so Google can show star ratings in search results.
 * Cached for 1 hour (matching the /api/google-reviews route).
 */

const WIDGET_ID =
  process.env.NEXT_PUBLIC_FEATURABLE_ID || 'e9befa26-d16a-4bc5-90e8-a857cb8cbb0c'

export type GoogleRatingData = {
  rating: number
  count: number
  // true only when this came from a real, successful Featurable/Google
  // Reviews API response this request. false = the FALLBACK below.
  // Callers should NOT emit AggregateRating structured data when this is
  // false - showing a static number to Google as if it were the current
  // live rating violates Google's structured-data policy if the real
  // number has since changed.
  live: boolean
}

// Used only to avoid breaking layout while the live rating is unavailable
// (e.g. UI display). NEVER put this in JSON-LD structured data - check
// `live` first.
const FALLBACK: GoogleRatingData = { rating: 4.9, count: 80, live: false }

export async function getGoogleRating(): Promise<GoogleRatingData> {
  try {
    const res = await fetch(
      `https://featurable.com/api/v1/widgets/${WIDGET_ID}`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(2000) }
    )
    if (!res.ok) return FALLBACK
    const d: any = await res.json()
    if (!d || d.success === false) return FALLBACK
    const rating = Number(d.averageRating)
    const count  = Number(d.totalReviewCount)
    if (!rating || !count || rating < 1 || rating > 5 || count < 1) return FALLBACK
    return { rating, count, live: true }
  } catch {
    return FALLBACK
  }
}
