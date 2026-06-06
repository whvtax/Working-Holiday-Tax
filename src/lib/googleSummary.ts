// Shared, cached fetch of the REAL Google reviews + rating + total count.
// Fetches from our OWN same-origin API route (/api/google-reviews), which
// proxies Featurable on the server - so there are no browser CORS or
// ad-blocker problems. One network request per page load is shared across
// every component that uses these hooks.

import { useEffect, useState } from 'react'

export type RGReview = {
  reviewId: string | null
  reviewer: { profilePhotoUrl: string; displayName: string; isAnonymous: boolean }
  starRating: number
  comment: string
  createTime: string | null
  updateTime: string | null
}

export type GoogleData = {
  rating: number
  count: number
  profileUrl: string
  reviews: RGReview[]
}

export type GoogleSummary = { rating: number; count: number; profileUrl: string }

let cache: Promise<GoogleData | null> | null = null

function load(): Promise<GoogleData | null> {
  if (cache) return cache
  cache = fetch('/api/google-reviews')
    .then((r) => r.json())
    .then((d: any): GoogleData | null => {
      if (!d || d.ok === false) return null
      return {
        rating: Number(d.rating) || 0,
        count: Number(d.count) || 0,
        profileUrl: typeof d.profileUrl === 'string' ? d.profileUrl : '',
        reviews: Array.isArray(d.reviews) ? d.reviews : [],
      }
    })
    .catch(() => null)
  return cache
}

export function useGoogleData(): GoogleData | null {
  const [d, setD] = useState<GoogleData | null>(null)
  useEffect(() => {
    let on = true
    load().then((v) => {
      if (on) setD(v)
    })
    return () => {
      on = false
    }
  }, [])
  return d
}

export function useGoogleSummary(): GoogleSummary | null {
  const d = useGoogleData()
  return d ? { rating: d.rating, count: d.count, profileUrl: d.profileUrl } : null
}
