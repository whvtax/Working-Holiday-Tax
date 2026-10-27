'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { trackDepth, initAiAttribution, trackWhatsApp } from '@/lib/analytics'

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
export function Analytics({ measurementId, waClicks = false, untagged = [] }: {
  /** The brand's own GA4 property, passed in by its root layout so a shared
   *  component never ships another brand's ID. */
  measurementId: string
  /** Count taps on links marked data-wa-pos as the whatsapp_click key event
   *  (the student brand marks its WhatsApp links this way; WHT tracks its
   *  links in each component). */
  waClicks?: boolean
  /** Paths a brand keeps untagged on top of /crm and /complete (the student
   *  brand: its tax form, in every language). */
  untagged?: readonly string[]
}) {
  // The student brand's pages live under an internal /svt-site segment (host
  // rewrite); the path can arrive with it, so it is dropped before matching.
  const pathname = (usePathname() || '').replace(/^\/svt-site(?=\/|$)/, '') || '/'
  const isAdminArea = pathname.startsWith('/crm') || pathname.startsWith('/complete')
    || untagged.some((p) => pathname === p || pathname.startsWith(`${p}/`))

  const fired = useRef(false)
  useEffect(() => {
    fired.current = false
  }, [pathname])

  // AI search attribution. Deferred so gtag (afterInteractive) is usually
  // ready; if it is not, the source is still stored and rides on later events.
  useEffect(() => {
    if (isAdminArea) return
    const t = window.setTimeout(initAiAttribution, 1500)
    return () => window.clearTimeout(t)
  }, [isAdminArea])

  useEffect(() => {
    if (isAdminArea) return
    const first = pathname.split('/')[1] ?? ''
    const lang = ['de', 'ja', 'zh', 'vi'].includes(first) ? first : 'en'
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

  useEffect(() => {
    if (!waClicks || isAdminArea) return
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[data-wa-pos]')
      if (!a) return
      const first = window.location.pathname.split('/')[1] ?? ''
      trackWhatsApp({ position: a.getAttribute('data-wa-pos') ?? 'unknown', lang: ['zh', 'vi'].includes(first) ? first : 'en' })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [waClicks, isAdminArea])

  if (isAdminArea) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  )
}
