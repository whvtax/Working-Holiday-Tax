import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { fetchGoogleData } from '@/lib/googleReviewsServer'

/**
 * Server wrapper for the review carousel: the same component, but its real
 * Google reviews arrive in the static HTML instead of after hydration, so
 * crawlers that never run JS (most AI search bots) can read them.
 * See lib/googleReviewsServer.ts for why.
 */
export async function GoogleReviewsServer({ lang = 'en' }: { lang?: 'en' | 'de' | 'ja' }) {
  const initial = await fetchGoogleData()
  return <GoogleReviews lang={lang} initial={initial} />
}
