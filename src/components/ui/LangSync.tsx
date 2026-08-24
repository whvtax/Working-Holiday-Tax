'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Keeps <html lang> correct during client-side (SPA) navigation.
 *
 * First paint is handled by the inline script in the root layout, which sets
 * the tag from the URL before render so /de and /ja never ship as en-AU. This
 * only handles in-app route changes, where the shared root layout does not
 * re-render.
 *
 * The two must agree. This used to set `de` and `ja` where the pre-paint
 * script sets `de-DE` and `ja-JP`, so the attribute changed value a moment
 * after load on every German and Japanese page. The regional subtags are the
 * ones the hreflang map and the OpenGraph locales already use.
 */
export function LangSync() {
  const pathname = usePathname() || '/'
  useEffect(() => {
    const isDE = pathname === '/de' || pathname.startsWith('/de/')
    const isJA = pathname === '/ja' || pathname.startsWith('/ja/')
    document.documentElement.lang = isJA ? 'ja-JP' : isDE ? 'de-DE' : 'en-AU'
  }, [pathname])
  return null
}
