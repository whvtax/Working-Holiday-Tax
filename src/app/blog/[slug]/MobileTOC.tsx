'use client'

import { useState, useEffect } from 'react'
import { trackEvent } from './../analytics'

interface Heading {
  text: string
  id: string
}

/**
 * Mobile TOC drawer.
 * Floating action button (bottom-right) that opens a slide-up panel listing
 * all H2 headings in the article. Visible only on screens where the desktop
 * sidebar TOC is hidden (under 1100px wide).
 */
export default function MobileTOC({ headings, activeHeading }: { headings: Heading[]; activeHeading: string }) {
  const [open, setOpen] = useState(false)

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
      {/* Floating button */}
      <button
        className="mobile-toc-button has-toc"
        onClick={() => setOpen(true)}
        aria-label="Open table of contents"
        aria-expanded={open}
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

      {/* Overlay */}
      <div
        className={`mobile-toc-overlay ${open ? 'open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`mobile-toc-panel ${open ? 'open' : ''}`}
        role="dialog"
        aria-label="Table of contents"
        aria-modal="true"
      >
        <div className="mobile-toc-panel-handle" aria-hidden="true" />

        <div style={{ padding: '4px 24px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <p style={{ fontSize: '10.5px', fontWeight: 700, color: '#2FA880', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>
                On this page
              </p>
              <p className="font-serif" style={{ fontSize: '17px', fontWeight: 700, color: '#080F0D', margin: 0, letterSpacing: '-0.015em' }}>
                {headings.length} {headings.length === 1 ? 'section' : 'sections'}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#587066' }}
              aria-label="Close"
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
                        padding: '10px 12px',
                        marginLeft: '-2px',
                        fontSize: '14px',
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
