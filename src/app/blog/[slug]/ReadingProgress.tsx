'use client'

import { useEffect, useState } from 'react'

type Locale = 'en' | 'de' | 'ja'

const READING_UI = {
  en: { minLeft: 'min left' },
  de: { minLeft: 'Min. übrig' },
  ja: { minLeft: '分残り' },
}

/**
 * Floating reading progress badge.
 * Shows the estimated time left to finish the article, based on scroll position
 * and the total reading time. Appears once the user is past 5% and hides near the end.
 */
export default function ReadingProgress({ readTime, locale = 'en' }: { readTime: number; locale?: Locale }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const ui = READING_UI[locale]

  useEffect(() => {
    let rafId = 0
    let pending = false
    const compute = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) { pending = false; return }
      const scrolled = window.scrollY
      const pct = Math.max(0, Math.min(100, (scrolled / docHeight) * 100))
      setProgress(pct)
      setVisible(pct > 5 && pct < 95)
      pending = false
    }
    const onScroll = () => {
      if (pending) return
      pending = true
      rafId = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const minutesLeft = Math.max(1, Math.ceil(readTime * (1 - progress / 100)))

  return (
    // Desktop only.
    //
    // On a phone this badge sat at bottom 16px left 16px at z-index 48, which
    // is inside the footprint of the sticky CTA bar (bottom 0, 72px tall,
    // z-index 60). It was painted over by the bar, and where it was not it was
    // competing with the bar, the table of contents button and the back to top
    // button for the bottom quarter of a 667px screen.
    //
    // It is also the least useful of the four: the 3px progress bar under the
    // nav already tells a reader how far through they are, on every scroll
    // frame, without taking any of the screen. So on mobile it goes, and the
    // bottom of the article belongs to the one control that converts.
    <div className={`reading-progress-badge hidden md:block ${visible ? 'visible' : ''}`} aria-live="polite" style={{ fontSize: '13px' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        {minutesLeft} {ui.minLeft}
      </span>
    </div>
  )
}
