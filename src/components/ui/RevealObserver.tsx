'use client'
import { useEffect } from 'react'

export function RevealObserver() {
  useEffect(() => {
    // Mark JS as loaded immediately — removes opacity:0 from non-visible reveals
    document.documentElement.classList.add('js-loaded')

    const selectors = '.reveal,.reveal-left,.reveal-right'

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -10px 0px' }
    )

    document.querySelectorAll(selectors).forEach(el => {
      const rect = el.getBoundingClientRect()
      // Immediately show anything already in or near the viewport
      if (rect.top < window.innerHeight + 100) {
        el.classList.add('visible')
      } else {
        obs.observe(el)
      }
    })

    return () => obs.disconnect()
  }, [])
  return null
}
