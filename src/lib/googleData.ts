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
}

// Fallback values shown if the API is unreachable at build/render time
const FALLBACK: GoogleRatingData = { rating: 4.9, count: 80 }

export async function getGoogleRating(): Promise<GoogleRatingData> {
  try {
    const res = await fetch(
      `https://featurable.com/api/v1/widgets/${WIDGET_ID}`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(2000) }
    )
    if (!res.ok) return FALLBACK
    const d: any = await res.json()
    if (!d || d.success === false) return FALLBACK
    const rating = Number(d.averageRating) || FALLBACK.rating
    const count  = Number(d.totalReviewCount) || FALLBACK.count
    if (rating < 1 || rating > 5 || count < 1) return FALLBACK
    return { rating, count }
  } catch {
    return FALLBACK
  }
}
