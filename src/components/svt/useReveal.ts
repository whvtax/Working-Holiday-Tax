'use client'

import { useEffect, useRef } from 'react'

/**
 * Scroll-in reveal, progressively enhanced (roadmap item 12).
 *
 * The server HTML is always fully visible. Only when the element is still
 * below the fold on mount, and the visitor has not asked for reduced motion,
 * is it marked data-motion="armed" (CSS hides the children); when it scrolls
 * into view it becomes data-motion="in" and CSS plays the transition once.
 * Without JS, with reduced motion, or when already on screen nothing is ever
 * hidden, so there is no flash and no layout shift (opacity and transform only).
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return
    el.dataset.motion = 'armed'
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        el.dataset.motion = 'in'
        io.disconnect()
      }
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}
