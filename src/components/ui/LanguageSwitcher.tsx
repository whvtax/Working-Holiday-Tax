'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

/**
 * LanguageSwitcher
 * Shows current language + flag, opens dropdown with the other option.
 * Smart pathing: if on /tfn, switching to DE goes to /de/tfn (and vice versa).
 * Used in Nav (desktop + mobile).
 */
export function LanguageSwitcher({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Determine current language from pathname
  const isGerman = pathname === '/de' || pathname.startsWith('/de/')

  // Build the equivalent URL in the other language
  const englishHref = isGerman
    ? pathname.replace(/^\/de(\/|$)/, '/') || '/'
    : pathname
  const germanHref = isGerman
    ? pathname
    : pathname === '/' ? '/de' : `/de${pathname}`

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

  // Mobile variant: simple inline link, no dropdown
  if (variant === 'mobile') {
    return (
      <div className="flex items-center gap-2 py-3" style={{ borderBottom: '1px solid #F0F5F2' }}>
        <span style={{ fontSize: '13px', color: '#587066', marginRight: '8px' }}>
          {isGerman ? 'Sprache:' : 'Language:'}
        </span>
        <Link
          href={englishHref}
          aria-label="Switch to English"
          aria-current={!isGerman ? 'true' : undefined}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all"
          style={{
            background: !isGerman ? '#EAF6F1' : 'transparent',
            border: !isGerman ? '1px solid #C8EAE0' : '1px solid transparent',
            fontSize: '13px',
            fontWeight: !isGerman ? 600 : 400,
            color: !isGerman ? '#0B5240' : '#587066',
          }}>
          <FlagUK /> EN
        </Link>
        <Link
          href={germanHref}
          aria-label="Zu Deutsch wechseln"
          aria-current={isGerman ? 'true' : undefined}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all"
          style={{
            background: isGerman ? '#EAF6F1' : 'transparent',
            border: isGerman ? '1px solid #C8EAE0' : '1px solid transparent',
            fontSize: '13px',
            fontWeight: isGerman ? 600 : 400,
            color: isGerman ? '#0B5240' : '#587066',
          }}>
          <FlagDE /> DE
        </Link>
      </div>
    )
  }

  // Desktop variant: pill button with dropdown
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={isGerman ? 'Sprache wechseln' : 'Switch language'}
        className="inline-flex items-center gap-1.5 transition-all"
        style={{
          height: '32px',
          padding: '0 10px',
          background: open ? '#F4F9F6' : 'transparent',
          border: '1px solid #E2EFE9',
          borderRadius: '100px',
          fontSize: '12px',
          fontWeight: 500,
          color: '#587066',
          cursor: 'pointer',
        }}>
        {isGerman ? <FlagDE /> : <FlagUK />}
        <span>{isGerman ? 'DE' : 'EN'}</span>
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
          <Link
            href={englishHref}
            onClick={() => setOpen(false)}
            aria-current={!isGerman ? 'true' : undefined}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
            style={{
              background: !isGerman ? '#F4F9F6' : 'transparent',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: !isGerman ? 600 : 400,
              color: '#0B5240',
            }}>
            <FlagUK />
            <span>English</span>
            {!isGerman && (
              <svg width="14" height="14" viewBox="0 0 14 14" style={{ marginLeft: 'auto' }} aria-hidden="true">
                <path d="M3 7l3 3 5-6" stroke="#0B5240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            )}
          </Link>
          <Link
            href={germanHref}
            onClick={() => setOpen(false)}
            aria-current={isGerman ? 'true' : undefined}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
            style={{
              background: isGerman ? '#F4F9F6' : 'transparent',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: isGerman ? 600 : 400,
              color: '#0B5240',
            }}>
            <FlagDE />
            <span>Deutsch</span>
            {isGerman && (
              <svg width="14" height="14" viewBox="0 0 14 14" style={{ marginLeft: 'auto' }} aria-hidden="true">
                <path d="M3 7l3 3 5-6" stroke="#0B5240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            )}
          </Link>
        </div>
      )}
    </div>
  )
}
