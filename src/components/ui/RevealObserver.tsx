'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function RevealObserver() {
  const pathname = usePathname()
  useEffect(() => {
    const selectors = '.reveal,.reveal-left,.reveal-right'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return // respect accessibility: no animation, content stays visible

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
