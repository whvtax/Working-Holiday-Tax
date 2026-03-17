'use client'
import { useEffect } from 'react'

export function RevealObserver() {
  useEffect(() => {
    const selectors = '.reveal,.reveal-left,.reveal-right'

    const observe = (root: Document | Element = document) => {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        }),
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      )
      root.querySelectorAll(selectors).forEach(el => {
        // If already in viewport on mount, mark visible immediately
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight) {
          el.classList.add('visible')
        } else {
          obs.observe(el)
        }
      })
      return obs
    }

    const obs = observe()
    return () => obs.disconnect()
  }, [])
  return null
}
