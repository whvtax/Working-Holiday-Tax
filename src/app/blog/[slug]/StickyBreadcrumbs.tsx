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
    <nav
      className={`sticky-breadcrumbs ${visible ? 'visible' : ''}`}
      aria-label="Breadcrumb (sticky)"
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(10,15,13,0.55)', flexWrap: 'nowrap', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <Link href={basePath || '/'} style={{ color: '#587066', textDecoration: 'none', flexShrink: 0 }}>{homeLabel}</Link>
        <span aria-hidden="true" style={{ color: 'rgba(0,0,0,0.18)' }}>/</span>
        <Link href={`${basePath}/blog`} style={{ color: '#587066', textDecoration: 'none', flexShrink: 0 }}>{blogLabel}</Link>
        <span aria-hidden="true" style={{ color: 'rgba(0,0,0,0.18)' }}>/</span>
        <Link href={`${basePath}/blog/category/${categorySlug}`} style={{ color: '#587066', textDecoration: 'none', flexShrink: 0 }}>{category}</Link>
        <span aria-hidden="true" style={{ color: 'rgba(0,0,0,0.18)' }}>/</span>
        <span aria-current="page" style={{ color: '#0B5240', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>{truncatedTitle}</span>
      </div>
    </nav>
  )
}
