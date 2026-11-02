'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function RevealObserver() {
  const pathname = usePathname()
  useEffect(() => {
    const selectors = '.reveal,.reveal-left,.reveal-right'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return // respect accessibility: no animation, content stays visible

    // Motion on every page, not only where a template added .reveal by hand:
    // section headings, cards and stat tiles rise in as they scroll into view,
    // staggered within their row. Opacity and transform only, below the fold only.
    document
      .querySelectorAll<HTMLElement>('main section h2, main section .card, main section .card-premium, main section .stat-card')
      .forEach(el => {
        // The WHT layout layer (data-layer="wht") keeps its headings still: content, not motion.
        if (el.closest('.reveal,.reveal-left,.reveal-right,[data-layer="wht"]') || el.matches(selectors)) return
        el.classList.add('reveal')
        const sibs = el.parentElement ? Array.from(el.parentElement.children).filter(c => c.matches('.card,.card-premium,.stat-card')) : []
        const i = sibs.indexOf(el)
        if (i > 0) el.style.transitionDelay = `${Math.min(i, 4) * 0.08}s`
      })

    const els = Array.from(document.querySelectorAll<HTMLElement>(selectors))
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          e.target.classList.remove('animate')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    )

    els.forEach(el => {
      const rect = el.getBoundingClientRect()
      // Hide + animate any element that is not already comfortably in view on load.
      if (rect.top > window.innerHeight * 0.88) {
        el.classList.add('animate')
        obs.observe(el)
      }
    })

    return () => obs.disconnect()
    // Re-run on client-side route changes so reveal animations fire on every
    // page, not just the first server-rendered one.
  }, [pathname])
  return null
}
