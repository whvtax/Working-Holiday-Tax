'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { GA_MEASUREMENT_ID } from '@/lib/constants'
import { trackDepth } from '@/lib/analytics'

/**
 * GA4, moved out of the root layout.
 *
 * It used to live in the server layout and read `headers()` to work out which
 * path it was on. That single read opted all 562 routes out of static
 * generation, so every visitor, including the ones in Tokyo and Berlin who
 * convert best, waited on a lambda in Sydney for HTML that never changes.
 * Reading the path on the client instead costs nothing and gives the whole
 * site back as static.
 *
 * Two areas stay untagged:
 *
 * - /crm is staff usage. Tagging it pollutes acquisition data, and it is
 *   already disallowed in robots.ts for the same reason.
 *
 * - /complete carries a live single-use completion token in the path. gtag
 *   sends the full URL as page_location, which would put working tokens
 *   granting write access to a named client's tax record into an analytics
 *   property for anyone with access to read. noindex and Referrer-Policy do
 *   not help, because the URL travels as a parameter and not as a referrer.
 *   Never tag a page whose path contains a secret.
 */
export function Analytics() {
  const pathname = usePathname() || ''
  const isAdminArea = pathname.startsWith('/crm') || pathname.startsWith('/complete')

  const fired = useRef(false)
  useEffect(() => {
    fired.current = false
  }, [pathname])

  useEffect(() => {
    if (isAdminArea) return
    const lang = pathname.startsWith('/de') ? 'de' : pathname.startsWith('/ja') ? 'ja' : 'en'
    // rAF-THROTTLED.
    //
    // `scrollHeight` is a layout-forcing read, and this ran on every scroll
    // event, unthrottled, until the 75% mark. `passive: true` stops it blocking
    // the compositor on touch; it does nothing about forced synchronous layout
    // on the main thread. On a long article at 60-100 events a second while
    // flicking, that is the cheapest jank on the site to remove. Nav.tsx and
    // ScrollToTop.tsx already do exactly this; this listener was the one missed.
    let pending = false
    const measure = () => {
      pending = false
      if (fired.current) return
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      if (max > 400 && window.scrollY / max >= 0.75) {
        fired.current = true
        trackDepth(lang)
      }
    }
    const onScroll = () => {
      if (pending || fired.current) return
      pending = true
      requestAnimationFrame(measure)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname, isAdminArea])

  if (isAdminArea) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
