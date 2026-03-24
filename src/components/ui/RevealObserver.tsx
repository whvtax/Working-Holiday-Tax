'use client'
import { useEffect } from 'react'

export function RevealObserver() {
  useEffect(() => {
    const selectors = '.reveal,.reveal-left,.reveal-right'

    // Only animate elements that are BELOW the fold
    // Elements already in view stay visible with no animation
    document.querySelectorAll(selectors).forEach(el => {
      const rect = el.getBoundingClientRect()
      if (rect.top > window.innerHeight) {
        // Below fold - add animate class to enable opacity:0 + transition
        el.classList.add('animate')
      }
      // Above fold or in view - leave as-is (opacity:1, no animation)
    })

    // Now observe below-fold elements
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          e.target.classList.remove('animate')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -10px 0px' }
    )

    document.querySelectorAll(`${selectors}.animate`).forEach(el => obs.observe(el))

    return () => obs.disconnect()
  }, [])
  return null
}
