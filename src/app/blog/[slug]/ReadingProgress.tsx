'use client'

import { useEffect, useState } from 'react'

/**
 * Floating reading progress badge.
 * Shows the estimated time left to finish the article, based on scroll position
 * and the total reading time. Appears once the user is past 5% and hides near the end.
 */
export default function ReadingProgress({ readTime }: { readTime: number }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

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
    <div className={`reading-progress-badge ${visible ? 'visible' : ''}`} aria-live="polite">
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        {minutesLeft} min left
      </span>
    </div>
  )
}
