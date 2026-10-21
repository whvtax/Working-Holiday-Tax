// Server-side fetch of the REAL Google reviews (via Featurable), shared by the
// /api/google-reviews route and by <GoogleReviewsServer/>.
//
// WHY THIS EXISTS (SEO, Oct 2026). The review carousel used to fetch its data
// in the browser, after hydration. Search engines that run JS saw it late; the
// AI crawlers robots.ts lets in (GPTBot, ClaudeBot, PerplexityBot and others)
// do not run JS at all, so to them the site's strongest trust signal was the
// bare figure "5.0" with no review behind it. Fetching here puts the same real
// reviews into the static HTML. Nothing is ever invented: if the fetch fails,
// this returns null and the page renders exactly as it did before.

import type { GoogleData } from '@/lib/googleSummary'

export const FEATURABLE_WIDGET_ID =
  process.env.NEXT_PUBLIC_FEATURABLE_ID || 'e9befa26-d16a-4bc5-90e8-a857cb8cbb0c'

export function cleanComment(c: string): string {
  if (!c) return ''
  // Google sometimes returns "(Translated by Google) <en> (Original) <orig>".
  // Keep just the translated text.
  if (c.includes('(Translated by Google)')) {
    const en = c.split('(Original)')[0]
    return en.replace('(Translated by Google)', '').trim()
  }
  return c.trim()
}

export async function fetchGoogleData(): Promise<GoogleData | null> {
  try {
    const res = await fetch(`https://featurable.com/api/v1/widgets/${FEATURABLE_WIDGET_ID}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return null
    const d: any = await res.json()
    if (!d || d.success === false) return null
    const reviews = Array.isArray(d.reviews)
      ? d.reviews.map((r: any) => ({
          reviewId: r.reviewId ?? null,
          reviewer: {
            profilePhotoUrl: r.reviewer?.profilePhotoUrl ?? '',
            displayName: r.reviewer?.displayName ?? '',
            isAnonymous: !!r.reviewer?.isAnonymous,
          },
          starRating: Number(r.starRating) || 0,
          comment: cleanComment(typeof r.comment === 'string' ? r.comment : ''),
          createTime: r.createTime ?? null,
          updateTime: r.updateTime ?? null,
        }))
      : []
    return {
      rating: Number(d.averageRating) || 0,
      count: Number(d.totalReviewCount) || reviews.length,
      profileUrl: typeof d.profileUrl === 'string' ? d.profileUrl : '',
      reviews,
    }
  } catch {
    return null
  }
}
