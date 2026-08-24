'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

/**
 * LanguageSwitcher
 * Shows current language + flag, opens dropdown with the other options.
 * Smart pathing: if on /tfn, switching to DE goes to /de/tfn; to JA → /ja/tfn.
 * Used in Nav (desktop + mobile - same variant since the mobile menu now shows
 * the pill button beside the burger instead of an inline mobile variant).
 */
export function LanguageSwitcher({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Determine current locale from pathname
  const isGerman   = pathname === '/de' || pathname.startsWith('/de/')
  const isJapanese = pathname === '/ja' || pathname.startsWith('/ja/')
  const currentLocale: 'en' | 'de' | 'ja' = isJapanese ? 'ja' : isGerman ? 'de' : 'en'

  // Build equivalent URLs by swapping the locale prefix
  const stripLocale = (p: string) =>
    p.replace(/^\/de(\/|$)/, '/').replace(/^\/ja(\/|$)/, '/') || '/'

  // Routes that only exist in English - switching locale falls back to that locale's home
  const EN_ONLY_ROUTES = ['/uk-working-holiday-tax']
  // The Medicare category slug differs between locales (EN: medicare-and-other, DE/JA: medicare)
  const toLocalizedPath = (p: string) =>
    EN_ONLY_ROUTES.includes(p) ? '/' : p.replace(/^\/blog\/category\/medicare-and-other$/, '/blog/category/medicare')
  const toEnglishPath = (p: string) =>
    p.replace(/^\/blog\/category\/medicare$/, '/blog/category/medicare-and-other')

  const baseUrl = stripLocale(pathname)
  const enBase  = toEnglishPath(baseUrl)
  const locBase = toLocalizedPath(baseUrl)
  const englishHref  = enBase === '/' ? '/'   : enBase
  const germanHref   = locBase === '/' ? '/de' : `/de${locBase}`
  const japaneseHref = locBase === '/' ? '/ja' : `/ja${locBase}`

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
  const currentFlag = currentLocale === 'ja' ? <FlagJP /> : currentLocale === 'de' ? <FlagDE /> : <FlagUK />
  const currentCode = currentLocale === 'ja' ? 'JA' : currentLocale === 'de' ? 'DE' : 'EN'
  const ariaLabel =
    currentLocale === 'de' ? 'Sprache wechseln' :
    currentLocale === 'ja' ? '言語を切り替える' :
    'Switch language'

  // Order: current first (highlighted), others below
  const options: Array<{ code: 'en'|'de'|'ja'; label: string; href: string; flag: JSX.Element }> = [
    { code: 'en', label: 'English',  href: englishHref,  flag: <FlagUK /> },
    { code: 'de', label: 'Deutsch',  href: germanHref,   flag: <FlagDE /> },
    { code: 'ja', label: '日本語',    href: japaneseHref, flag: <FlagJP /> },
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
          height: '32px',
          padding: '0 10px',
          // The switcher only ever sits in the nav, and the nav is forest
          // green, so the pill is drawn light instead of dark.
          background: open ? 'rgba(255,255,255,0.16)' : 'transparent',
          // The border is the only thing that makes this read as a control.
          // At 0.34 alpha over the forest nav it measured 2.4:1 and failed
          // WCAG 1.4.11, which asks 3:1 of a component boundary. 0.5 is 3.5:1.
          border: '1px solid rgba(255,255,255,0.5)',
          borderRadius: '100px',
          fontSize: '12px',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.92)',
          cursor: 'pointer',
        }}>
        {currentFlag}
        <span>{currentCode}</span>
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}>
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          minWidth: '160px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 10px 28px -8px rgba(11, 82, 64, 0.18), 0 4px 12px -4px rgba(11, 82, 64, 0.08)',
          border: '1px solid #E2EFE9',
          padding: '6px',
          zIndex: 60,
        }}>
          {options.map(opt => {
            const isCurrent = opt.code === currentLocale
            return (
              <Link
                key={opt.code}
                href={opt.href}
                onClick={() => setOpen(false)}
                aria-current={isCurrent ? 'true' : undefined}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
                style={{
                  background: isCurrent ? '#F4F9F6' : 'transparent',
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
      )}
    </div>
  )
}
