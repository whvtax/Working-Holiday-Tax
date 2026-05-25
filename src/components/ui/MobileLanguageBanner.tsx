'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * MobileLanguageBanner
 * Pops up on mobile (max-width 1023px) on first visit to suggest German if the
 * browser's preferred language starts with "de". Only shows once - choice is
 * stored in localStorage. Manual dismiss never shows again.
 *
 * Detection: navigator.language / navigator.languages
 * Trigger: first mobile visit, browser language starts with 'de', not already on /de
 * Persistence: localStorage key 'wht-lang-banner-seen'
 */
export function MobileLanguageBanner() {
  const pathname = usePathname() || '/'
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Only run after mount (avoid SSR issues)
    if (typeof window === 'undefined') return

    // Don't show if already dismissed
    let seen = false
    try { seen = localStorage.getItem('wht-lang-banner-seen') === '1' } catch { /* private mode */ }
    if (seen) return

    // Only show on mobile
    if (window.innerWidth >= 1024) return

    // Detect German browser language
    const langs = navigator.languages || [navigator.language || '']
    const prefersGerman = langs.some(l => (l || '').toLowerCase().startsWith('de'))

    // Already on a German page? Suggest going back to English
    const isOnGerman = pathname === '/de' || pathname.startsWith('/de/')

    // Only show if browser is German AND user is on English pages,
    // OR if browser is non-German AND user landed on German pages (rare)
    if (prefersGerman && !isOnGerman) {
      // Tiny delay to avoid showing during page load shift
      const t = setTimeout(() => setShow(true), 800)
      return () => clearTimeout(t)
    }
  }, [pathname])

  const dismiss = (markSeen = true) => {
    if (markSeen) {
      try { localStorage.setItem('wht-lang-banner-seen', '1') } catch { /* ignore */ }
    }
    setShow(false)
  }

  // Build the German-equivalent URL
  const germanHref = pathname === '/' ? '/de' : `/de${pathname}`

  if (!mounted || !show) return null

  return (
    <div
      role="dialog"
      aria-label="Sprache wählen / Choose your language"
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

      {/* Close (×) */}
      <button
        type="button"
        onClick={() => dismiss(true)}
        aria-label="Schließen / Close"
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

      {/* Header */}
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
          Sprache wählen
        </p>
      </div>

      <p style={{
        fontSize: '12.5px',
        color: '#587066',
        margin: '0 0 12px',
        lineHeight: 1.45,
      }}>
        Wir haben eine deutsche Version dieser Seite. Welche möchtest du sehen?
      </p>

      {/* Buttons */}
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
          href={germanHref}
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
          <svg width="16" height="11" viewBox="0 0 60 42" aria-hidden="true" style={{ borderRadius: '1px' }}>
            <rect width="60" height="14" y="0"  fill="#000"/>
            <rect width="60" height="14" y="14" fill="#DD0000"/>
            <rect width="60" height="14" y="28" fill="#FFCE00"/>
          </svg>
          Deutsch
        </Link>
      </div>
    </div>
  )
}
