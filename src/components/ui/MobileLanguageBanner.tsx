'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * MobileLanguageBanner
 * Pops up on mobile (max-width 1023px) on first visit to suggest a translated
 * version if the browser's preferred language matches a supported locale.
 *
 * Supported locales: German (de), Japanese (ja).
 * Detection: navigator.language / navigator.languages
 * Trigger: first mobile visit, browser language matches a supported locale,
 *          and user is not already on that locale's pages.
 * Persistence: localStorage key 'wht-lang-banner-seen' (banner only shows once).
 */
type SupportedLocale = 'de' | 'ja'

type LocaleConfig = {
  flag: () => JSX.Element
  name: string
  headerText: string
  bodyText: string
  closeLabel: string
  dialogLabel: string
}

const LOCALES: Record<SupportedLocale, LocaleConfig> = {
  de: {
    flag: () => (
      <svg width="16" height="11" viewBox="0 0 60 42" aria-hidden="true" style={{ borderRadius: '1px' }}>
        <rect width="60" height="14" y="0"  fill="#000"/>
        <rect width="60" height="14" y="14" fill="#DD0000"/>
        <rect width="60" height="14" y="28" fill="#FFCE00"/>
      </svg>
    ),
    name: 'Deutsch',
    headerText: 'Sprache wählen',
    bodyText: 'Wir haben eine deutsche Version dieser Seite. Welche möchtest du sehen?',
    closeLabel: 'Schließen',
    dialogLabel: 'Sprache wählen',
  },
  ja: {
    flag: () => (
      <svg width="16" height="11" viewBox="0 0 60 42" aria-hidden="true" style={{ borderRadius: '1px' }}>
        <rect width="60" height="42" fill="#fff"/>
        <circle cx="30" cy="21" r="12.6" fill="#BC002D"/>
      </svg>
    ),
    name: '日本語',
    headerText: '言語を選択',
    bodyText: 'このページの日本語版があります。どちらをご覧になりますか？',
    closeLabel: '閉じる',
    dialogLabel: '言語を選択',
  },
}

export function MobileLanguageBanner() {
  const pathname = usePathname() || '/'
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [targetLocale, setTargetLocale] = useState<SupportedLocale | null>(null)

  useEffect(() => {
    setMounted(true)

    if (typeof window === 'undefined') return

    let seen = false
    try { seen = localStorage.getItem('wht-lang-banner-seen') === '1' } catch { /* private mode */ }
    if (seen) return

    if (window.innerWidth >= 1024) return

    const langs = navigator.languages || [navigator.language || '']
    const lower = langs.map(l => (l || '').toLowerCase())

    let detected: SupportedLocale | null = null
    if (lower.some(l => l.startsWith('ja'))) detected = 'ja'
    else if (lower.some(l => l.startsWith('de'))) detected = 'de'

    if (!detected) return

    const currentLocale: SupportedLocale | 'en' =
      pathname === '/ja' || pathname.startsWith('/ja/') ? 'ja' :
      pathname === '/de' || pathname.startsWith('/de/') ? 'de' :
      'en'

    if (currentLocale === detected) return

    setTargetLocale(detected)
    const t = setTimeout(() => setShow(true), 800)
    return () => clearTimeout(t)
  }, [pathname])

  const dismiss = (markSeen = true) => {
    if (markSeen) {
      try { localStorage.setItem('wht-lang-banner-seen', '1') } catch { /* ignore */ }
    }
    setShow(false)
  }

  const buildLocaleUrl = (locale: SupportedLocale): string => {
    const withoutLocale = pathname
      .replace(/^\/de(\/|$)/, '/')
      .replace(/^\/ja(\/|$)/, '/')
    return withoutLocale === '/' ? `/${locale}` : `/${locale}${withoutLocale}`
  }

  if (!mounted || !show || !targetLocale) return null

  const cfg = LOCALES[targetLocale]
  const localeHref = buildLocaleUrl(targetLocale)
  const LocaleFlag = cfg.flag

  return (
    <div
      role="dialog"
      aria-label={cfg.dialogLabel}
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '12px',
        right: '12px',
        zIndex: 70,
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 8px 28px rgba(11, 82, 64, 0.18), 0 2px 8px rgba(11, 82, 64, 0.08)',
        border: '1px solid #C8EAE0',
        padding: '16px 16px 14px',
        animation: 'wht-banner-up 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
      <style>{`
        @keyframes wht-banner-up {
          from { transform: translateY(120%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <button
        type="button"
        onClick={() => dismiss(true)}
        aria-label={cfg.closeLabel}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '32px',
          height: '32px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#587066',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', paddingRight: '28px' }}>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="8" stroke="#0B5240" strokeWidth="1.4"/>
          <ellipse cx="10" cy="10" rx="3.5" ry="8" stroke="#0B5240" strokeWidth="1.4"/>
          <line x1="2" y1="10" x2="18" y2="10" stroke="#0B5240" strokeWidth="1.4"/>
        </svg>
        <p style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#0B5240',
          margin: 0,
          letterSpacing: '-0.01em',
        }}>
          {cfg.headerText}
        </p>
      </div>

      <p style={{
        fontSize: '12.5px',
        color: '#587066',
        margin: '0 0 12px',
        lineHeight: 1.45,
      }}>
        {cfg.bodyText}
      </p>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="button"
          onClick={() => dismiss(true)}
          style={{
            flex: 1,
            height: '40px',
            background: '#fff',
            border: '1px solid #E2EFE9',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 500,
            color: '#587066',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}>
          <svg width="16" height="11" viewBox="0 0 60 42" aria-hidden="true">
            <clipPath id="mlb-uk"><rect width="60" height="42" rx="2"/></clipPath>
            <g clipPath="url(#mlb-uk)">
              <rect width="60" height="42" fill="#012169"/>
              <path d="M0,0 L60,42 M60,0 L0,42" stroke="#fff" strokeWidth="6"/>
              <path d="M30,0 v42 M0,21 h60" stroke="#fff" strokeWidth="10"/>
              <path d="M30,0 v42 M0,21 h60" stroke="#C8102E" strokeWidth="6"/>
            </g>
          </svg>
          English
        </button>
        <Link
          href={localeHref}
          onClick={() => dismiss(true)}
          style={{
            flex: 1,
            height: '40px',
            background: '#0B5240',
            border: '1px solid #0B5240',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#fff',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}>
          <LocaleFlag />
          {cfg.name}
        </Link>
      </div>
    </div>
  )
}
