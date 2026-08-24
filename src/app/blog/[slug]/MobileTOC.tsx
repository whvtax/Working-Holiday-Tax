'use client'

import { useState, useEffect } from 'react'
import { trackEvent } from './../analytics'

interface Heading {
  text: string
  id: string
}

type Locale = 'en' | 'de' | 'ja'

const MOBILE_TOC_UI = {
  en: {
    onThisPage: 'On this page',
    section: 'section',
    sections: 'sections',
    openLabel: 'Open table of contents',
    closeLabel: 'Close',
    tocLabel: 'Table of contents',
  },
  de: {
    onThisPage: 'Inhaltsverzeichnis',
    section: 'Abschnitt',
    sections: 'Abschnitte',
    openLabel: 'Inhaltsverzeichnis öffnen',
    closeLabel: 'Schließen',
    tocLabel: 'Inhaltsverzeichnis',
  },
  ja: {
    onThisPage: '目次',
    section: 'セクション',
    sections: 'セクション',
    openLabel: '目次を開く',
    closeLabel: '閉じる',
    tocLabel: '目次',
  },
}

/**
 * Mobile TOC drawer.
 * Floating action button (bottom-right) that opens a slide-up panel listing
 * all H2 headings in the article. Visible only on screens where the desktop
 * sidebar TOC is hidden (under 1100px wide).
 */
export default function MobileTOC({
  headings,
  activeHeading,
  locale = 'en',
}: {
  headings: Heading[]
  activeHeading: string
  locale?: Locale
}) {
  const [open, setOpen] = useState(false)
  const ui = MOBILE_TOC_UI[locale]

  // Close when navigating to a section
  useEffect(() => {
    if (!open) return
    // Lock body scroll while the drawer is open
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const hasToc = headings.length >= 3

  const handleClick = (id: string) => {
    setOpen(false)
    trackEvent('blog_toc_click', { heading_id: id, source: 'mobile' })
    // Small delay so the drawer closes before scrolling
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  if (!hasToc) return null

  return (
    <>
      {/* Floating button.
          Moved to the bottom left. It used to sit bottom right, 16px above the
          global back to top button: two identical green circles, same size,
          same colour, in the one corner a thumb lands in. Hitting back to top
          by accident on a 7,000px article costs the reader their place.
          It also clears the sticky CTA bar and the home indicator inset. */}
      <button
        className="mobile-toc-button has-toc"
        onClick={() => setOpen(true)}
        aria-label={ui.openLabel}
        aria-expanded={open}
        style={{
          left: '20px',
          right: 'auto',
          bottom: 'calc(84px + env(safe-area-inset-bottom, 0px))',
          zIndex: 45,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      </button>

      {/* Overlay. Raised above the sticky CTA bar (z 60) so the bar does not
          sit on top of the dim while the drawer is open. */}
      <div
        className={`mobile-toc-overlay ${open ? 'open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
        style={{ zIndex: 65 }}
      />

      {/* Panel.
          The drag handle is gone. It was a 40x4 pill that looked draggable and
          was not: the panel has no drag gesture, so the affordance was a
          promise the component could not keep. Rather than build a gesture
          tonight, the affordance goes and the close button does the work. */}
      <div
        className={`mobile-toc-panel ${open ? 'open' : ''}`}
        role="dialog"
        aria-label={ui.tocLabel}
        aria-modal="true"
        aria-hidden={!open}
        // Keeps the closed panel's links out of the tab order and the screen
        // reader rotor. It is only translated off screen, not removed.
        {...(!open ? ({ inert: '' } as Record<string, string>) : {})}
        style={{
          zIndex: 66,
          visibility: open ? 'visible' : 'hidden',
          // Keeps the stylesheet's slide and delays the visibility flip until
          // it has finished, so closing still animates.
          transition: `transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), visibility 0s linear ${open ? '0s' : '0.3s'}`,
        }}
      >
        <div style={{ padding: '20px 24px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <p style={{ fontSize: '10.5px', fontWeight: 700, color: '#16775C', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>
                {ui.onThisPage}
              </p>
              <p className="font-serif" style={{ fontSize: '17px', fontWeight: 700, color: '#080F0D', margin: 0, letterSpacing: '-0.015em' }}>
                {headings.length} {headings.length === 1 ? ui.section : ui.sections}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '44px', height: '44px', margin: '-10px -10px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#587066' }}
              aria-label={ui.closeLabel}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderLeft: '2px solid #E2EFE9' }}>
              {headings.map(h => {
                const isActive = activeHeading === h.id
                return (
                  <li key={h.id} style={{ marginBottom: '2px' }}>
                    <button
                      onClick={() => handleClick(h.id)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        minHeight: '44px',
                        padding: '12px',
                        marginLeft: '-2px',
                        fontSize: '15px',
                        color: isActive ? '#0B5240' : '#587066',
                        background: isActive ? '#F7F9F8' : 'transparent',
                        textDecoration: 'none',
                        lineHeight: 1.4,
                        fontWeight: isActive ? 600 : 400,
                        borderLeft: `2px solid ${isActive ? '#0B5240' : 'transparent'}`,
                        border: 'none',
                        borderRadius: '0 8px 8px 0',
                        cursor: 'pointer',
                      }}
                    >
                      {h.text}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
