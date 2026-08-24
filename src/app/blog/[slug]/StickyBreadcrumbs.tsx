'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Props {
  category: string
  categorySlug: string
  title: string
  /** Locale prefix for all breadcrumb links: '' (EN), '/de' or '/ja'. */
  basePath?: string
  homeLabel?: string
  blogLabel?: string
}

/**
 * Sticky breadcrumbs that appear after the user scrolls past the hero.
 * Provides persistent context and navigation without being obtrusive.
 */
export default function StickyBreadcrumbs({ category, categorySlug, title, basePath = '', homeLabel = 'Home', blogLabel = 'Blog' }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let rafId = 0
    let pending = false
    const compute = () => {
      // Show breadcrumbs after scrolling past the typical hero height
      setVisible(window.scrollY > 280)
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

  // Truncate long titles for the sticky bar
  const truncatedTitle = title.length > 50 ? title.slice(0, 47).trim() + '…' : title

  return (
    // top: 71px, not 68px. The fixed reading progress bar is 3px tall and also
    // anchors at 68px, so at the old value the bar painted out the top three
    // pixels of this one. z-index 35 keeps this below the progress bar (45) and
    // the nav (50), which is the order a reader expects to see them in.
    <nav
      className={`sticky-breadcrumbs ${visible ? 'visible' : ''}`}
      aria-label="Breadcrumb (sticky)"
      style={{ top: '71px', zIndex: 35 }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '8px 20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#4C6459', flexWrap: 'nowrap', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <Link href={basePath || '/'} style={{ color: '#587066', textDecoration: 'none', flexShrink: 0, padding: '8px 0' }}>{homeLabel}</Link>
        <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>
        <Link href={`${basePath}/blog`} style={{ color: '#587066', textDecoration: 'none', flexShrink: 0, padding: '8px 0' }}>{blogLabel}</Link>
        <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>
        <Link href={`${basePath}/blog/category/${categorySlug}`} style={{ color: '#587066', textDecoration: 'none', flexShrink: 0, padding: '8px 0' }}>{category}</Link>
        <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>
        <span aria-current="page" style={{ color: '#0B5240', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>{truncatedTitle}</span>
      </div>
    </nav>
  )
}
