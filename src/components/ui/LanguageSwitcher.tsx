'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { useState, useRef, useEffect } from 'react'
import { NEW_LOCALES, type NewLocale, LOCALE_ONLY_ROUTES, hasLocalePage, isLocaleOnlyRoute } from '@/lib/locale-pages'

/**
 * LanguageSwitcher
 * Shows current language + flag, opens dropdown with the other options.
 * Smart pathing: if on /tfn, switching to DE goes to /de/tfn; to JA → /ja/tfn.
 * French, Italian and Spanish (ADR 013) show the language name, not a flag, and
 * are only offered for routes that exist in that language (see locale-pages),
 * falling back to that language's home, and hidden altogether while nothing in
 * that language is live.
 * Used in Nav (desktop + mobile - same variant since the mobile menu now shows
 * the pill button beside the burger instead of an inline mobile variant).
 */
const NEW_LABEL: Record<NewLocale, string> = { fr: 'Français', it: 'Italiano', es: 'Español' }

export function LanguageSwitcher({ variant: _variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Determine current locale from pathname
  const isGerman   = pathname === '/de' || pathname.startsWith('/de/')
  const isJapanese = pathname === '/ja' || pathname.startsWith('/ja/')
  type Locale = 'en' | 'de' | 'ja' | NewLocale
  const newLocale = NEW_LOCALES.find(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  const currentLocale: Locale = newLocale ?? (isJapanese ? 'ja' : isGerman ? 'de' : 'en')

  // Build equivalent URLs by swapping the locale prefix
  const stripLocale = (p: string) =>
    p.replace(/^\/de(\/|$)/, '/').replace(/^\/ja(\/|$)/, '/').replace(/^\/(fr|it|es)(\/|$)/, '/') || '/'

  // Routes that only exist in English - switching locale falls back to that locale's home
  const EN_ONLY_ROUTES = ['/uk-working-holiday-tax']
  // The Medicare category slug differs between locales (EN: medicare-and-other, DE/JA: medicare)
  const toLocalizedPath = (p: string) =>
    EN_ONLY_ROUTES.includes(p) || isLocaleOnlyRoute(p) ? '/' : p.replace(/^\/blog\/category\/medicare-and-other$/, '/blog/category/medicare')
  // A route that exists only in French has no English twin either.
  const toEnglishPath = (p: string) =>
    isLocaleOnlyRoute(p) ? '/' : p.replace(/^\/blog\/category\/medicare$/, '/blog/category/medicare-and-other')

  const baseUrl = stripLocale(pathname)
  const enBase  = toEnglishPath(baseUrl)
  const locBase = toLocalizedPath(baseUrl)
  const englishHref  = enBase === '/' ? '/'   : enBase
  const germanHref   = locBase === '/' ? '/de' : `/de${locBase}`
  const japaneseHref = locBase === '/' ? '/ja' : `/ja${locBase}`
  // New locales: the same page if it exists in that language, else that
  // language's home if that exists, else null (the option is not offered). The
  // language we are already on is always offered.
  const newHref = (l: NewLocale): string | null => {
    if (LOCALE_ONLY_ROUTES[l].includes(baseUrl)) return `/${l}${baseUrl}`
    if (enBase !== '/' && hasLocalePage(l, enBase)) return `/${l}${enBase}`
    if (hasLocalePage(l, '/')) return `/${l}`
    return l === newLocale ? pathname : null
  }

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const FlagUK = () => (
    <svg width="20" height="14" viewBox="0 0 60 42" aria-hidden="true" style={{ borderRadius: '2px', display: 'block', flexShrink: 0 }}>
      <clipPath id="lsuk-c"><rect width="60" height="42" rx="2"/></clipPath>
      <g clipPath="url(#lsuk-c)">
        <rect width="60" height="42" fill="#012169"/>
        <path d="M0,0 L60,42 M60,0 L0,42" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,42 M60,0 L0,42" stroke="#C8102E" strokeWidth="4" clipPath="url(#lsuk-c)"/>
        <path d="M30,0 v42 M0,21 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v42 M0,21 h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  )

  const FlagDE = () => (
    <svg width="20" height="14" viewBox="0 0 60 42" aria-hidden="true" style={{ borderRadius: '2px', display: 'block', flexShrink: 0 }}>
      <rect width="60" height="14" y="0"  fill="#000"/>
      <rect width="60" height="14" y="14" fill="#DD0000"/>
      <rect width="60" height="14" y="28" fill="#FFCE00"/>
    </svg>
  )

  const FlagJP = () => (
    <svg width="20" height="14" viewBox="0 0 60 42" aria-hidden="true" style={{ borderRadius: '2px', display: 'block', flexShrink: 0 }}>
      <rect width="60" height="42" fill="#fff"/>
      <circle cx="30" cy="21" r="12.6" fill="#BC002D"/>
    </svg>
  )

  // Pill button (desktop and beside-burger on mobile)
  // fr, it and es have no flag (ADR 013): the pill shows the code only.
  const currentFlag = newLocale ? null : currentLocale === 'ja' ? <FlagJP /> : currentLocale === 'de' ? <FlagDE /> : <FlagUK />
  const currentCode = newLocale ? newLocale.toUpperCase() : currentLocale === 'ja' ? 'JA' : currentLocale === 'de' ? 'DE' : 'EN'
  const ariaLabel =
    currentLocale === 'fr' ? 'Changer de langue' :
    currentLocale === 'it' ? 'Cambia lingua' :
    currentLocale === 'es' ? 'Cambiar idioma' :
    currentLocale === 'de' ? 'Sprache wechseln' :
    currentLocale === 'ja' ? '言語を切り替える' :
    'Switch language'

  // Order: current first (highlighted), others below
  const options: Array<{ code: Locale; label: string; href: string; flag: React.JSX.Element | null }> = [
    { code: 'en', label: 'English',  href: englishHref,  flag: <FlagUK /> },
    { code: 'de', label: 'Deutsch',  href: germanHref,   flag: <FlagDE /> },
    { code: 'ja', label: '日本語',    href: japaneseHref, flag: <FlagJP /> },
    ...NEW_LOCALES.flatMap(l => {
      const href = newHref(l)
      return href ? [{ code: l, label: NEW_LABEL[l], href, flag: null }] : []
    }),
  ]

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={ariaLabel}
        className="inline-flex items-center gap-1.5 transition-all"
        style={{
          height: '40px',
          padding: '0 12px',
          // The switcher sits in the white header bar: a quiet outlined pill.
          // The border is #8A948F (3.1:1 on white) so the control boundary
          // meets WCAG 1.4.11.
          background: open ? '#F2FAF7' : '#FFFFFF',
          border: '1px solid #8A948F',
          borderRadius: '100px',
          fontSize: '12px',
          fontWeight: 500,
          color: '#0F1A16',
          cursor: 'pointer',
        }}>
        {currentFlag}
        <span>{currentCode}</span>
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}>
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* The alternate-language links are rendered on every page, open or not.
          They used to live behind `{open && ...}`, so the only HTML path from
          an English page to its German and Japanese twin was a click a crawler
          never makes: 334 localized pages were reachable through the sitemap
          alone, and a sitemap entry passes no authority. The panel is now
          always in the markup and hidden with CSS instead. `visibility:hidden`
          keeps it out of the accessibility tree and out of the tab order, and
          `inert` matches what the mobile drawer in Nav already does - no focus,
          no pointer events, no prefetch of the hidden links. Visually this is
          identical to not rendering it: the panel is absolutely positioned, so
          it takes no layout space either way. */}
      <div
        {...(open ? {} : { inert: '' as unknown as boolean })}
        aria-hidden={!open}
        style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          minWidth: '160px',
          background: '#fff',
          borderRadius: '10px',
          boxShadow: '0 16px 32px rgba(15, 26, 22, 0.10)',
          border: '1px solid #DCE0DE',
          padding: '6px',
          zIndex: 60,
          visibility: open ? 'visible' : 'hidden',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}>
          {options.map(opt => {
            const isCurrent = opt.code === currentLocale
            return (
              <Link
                key={opt.code}
                href={opt.href}
                lang={opt.code}
                hrefLang={opt.code}
                onClick={() => setOpen(false)}
                aria-current={isCurrent ? 'true' : undefined}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
                style={{
                  background: isCurrent ? '#F2FAF7' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: isCurrent ? 600 : 400,
                  color: '#0B5240',
                }}>
                {opt.flag}
                <span>{opt.label}</span>
                {isCurrent && (
                  <svg width="14" height="14" viewBox="0 0 14 14" style={{ marginLeft: 'auto' }} aria-hidden="true">
                    <path d="M3 7l3 3 5-6" stroke="#0B5240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                )}
              </Link>
            )
          })}
      </div>
    </div>
  )
}
