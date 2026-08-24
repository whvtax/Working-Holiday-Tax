'use client'

/**
 * ReviewsGate
 * -----------
 * GoogleReviews renders nothing when the reviews feed is empty or the API
 * call fails, but the heading that sits above it lived in the page, so a
 * failed feed left a section title standing over blank space. This wraps the
 * whole section and hides it, heading included, until there is at least one
 * review with text in it.
 *
 * It also keeps the section out of the first paint: the feed is fetched on
 * mount, so rendering the heading server side and removing it a moment later
 * would shift everything below it.
 */

import { useGoogleData } from '@/lib/googleSummary'

export function ReviewsGate({ children }: { children: React.ReactNode }) {
  const data = useGoogleData()
  const hasReviews = !!data && data.reviews.some((r) => r.comment && r.comment.trim().length > 0)
  if (!hasReviews) return null
  return <>{children}</>
}

export default ReviewsGate
