// Shared, cached fetch of the REAL Google rating + total review count.
// Pulls from the free Featurable API (the same endpoint the widget uses).
// One network request per page load is shared across every component
// that calls useGoogleSummary().

import { useEffect, useState } from 'react'

const WIDGET_ID =
  process.env.NEXT_PUBLIC_FEATURABLE_ID || 'e9befa26-d16a-4bc5-90e8-a857cb8cbb0c'

export type GoogleSummary = { rating: number; count: number; profileUrl: string }

let cache: Promise<GoogleSummary | null> | null = null

function load(): Promise<GoogleSummary | null> {
  if (cache) return cache
  cache = fetch(`https://featurable.com/api/v1/widgets/${WIDGET_ID}`)
    .then((r) => r.json())
    .then((d: any): GoogleSummary | null => {
      if (!d) return null
      const rating = Number(d.averageRating)
      const count = Number(d.totalReviewCount)
      if (!isFinite(rating) || !isFinite(count) || count <= 0) return null
      return {
        rating,
        count,
        profileUrl: typeof d.profileUrl === 'string' ? d.profileUrl : '',
      }
    })
    .catch(() => null)
  return cache
}

export function useGoogleSummary(): GoogleSummary | null {
  const [s, setS] = useState<GoogleSummary | null>(null)
  useEffect(() => {
    let on = true
    load().then((v) => {
      if (on) setS(v)
    })
    return () => {
      on = false
    }
  }, [])
  return s
}
