'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
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
const CONSENT_KEY = 'ga_consent'
type Consent = 'granted' | 'denied' | null

/** Plain-language banner text by page language. Analytics only; no marketing cookies. */
const BANNER: Record<string, { text: string; yes: string; no: string }> = {
  en: { text: 'We use cookies to see how visitors use this site, so we can improve it. Analytics only.', yes: 'Accept', no: 'Decline' },
  de: { text: 'Wir verwenden Cookies, um zu sehen, wie die Seite genutzt wird, und sie zu verbessern. Nur Analyse.', yes: 'Akzeptieren', no: 'Ablehnen' },
  ja: { text: '当サイトの改善のため、利用状況を把握する分析用Cookieを使用します。', yes: '同意する', no: '同意しない' },
  fr: { text: 'Nous utilisons des cookies pour voir comment le site est utilisé et l\'améliorer. Analyse uniquement.', yes: 'Accepter', no: 'Refuser' },
  it: { text: 'Usiamo i cookie per capire come viene usato il sito e migliorarlo. Solo analisi.', yes: 'Accetta', no: 'Rifiuta' },
  es: { text: 'Usamos cookies para ver cómo se usa el sitio y mejorarlo. Solo analítica.', yes: 'Aceptar', no: 'Rechazar' },
  zh: { text: '我们使用分析类Cookie了解访客如何使用本网站，以便改进。', yes: '接受', no: '拒绝' },
  vi: { text: 'Chúng tôi dùng cookie phân tích để biết khách truy cập sử dụng trang như thế nào và cải thiện trang.', yes: 'Chấp nhận', no: 'Từ chối' },
}

function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch { return null }
}

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

  // GA4 loads only after the visitor accepts (Jo, 3 Nov). Until they choose, and if they
  // decline, no Google script is requested at all.
  const [consent, setConsent] = useState<Consent>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => { setConsent(readConsent()); setReady(true) }, [])
  const choose = (v: 'granted' | 'denied') => {
    try { window.localStorage.setItem(CONSENT_KEY, v) } catch { /* private mode: the choice lasts this visit */ }
    setConsent(v)
  }

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
    const lang = ['de', 'ja', 'fr', 'it', 'es', 'zh', 'vi'].includes(first) ? first : 'en'
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

  const first = pathname.split('/')[1] ?? ''
  const copy = BANNER[first] ?? BANNER.en

  return (
    <>
      {ready && consent === null && (
        <div role="region" aria-label="Cookies" style={{
          position: 'fixed', left: 12, right: 12, bottom: 12, zIndex: 60, maxWidth: 560, margin: '0 auto',
          background: '#fff', color: '#12161F', border: '1px solid #d9dee5', borderRadius: 8, padding: '12px 14px',
          boxShadow: '0 4px 18px rgba(0,0,0,.12)', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', fontSize: 14, lineHeight: 1.45,
        }}>
          <span style={{ flex: '1 1 240px' }}>{copy.text}</span>
          <span style={{ display: 'flex', gap: 8 }}>
            <button type="button" onClick={() => choose('denied')} style={{ padding: '8px 14px', borderRadius: 6, border: '1px solid #c5ccd6', background: '#fff', color: '#12161F', cursor: 'pointer', fontSize: 14 }}>{copy.no}</button>
            <button type="button" onClick={() => choose('granted')} style={{ padding: '8px 14px', borderRadius: 6, border: 0, background: '#12161F', color: '#fff', cursor: 'pointer', fontSize: 14 }}>{copy.yes}</button>
          </span>
        </div>
      )}
      {consent === 'granted' && (<>
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
      </>)}
    </>
  )
}
