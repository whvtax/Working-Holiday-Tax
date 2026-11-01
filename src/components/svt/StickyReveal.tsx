'use client'

import { useEffect } from 'react'

/**
 * Renders nothing. The phone WhatsApp bar slides up only after the hero's own
 * WhatsApp button has scrolled out of view, so two identical buttons are never
 * on screen together. Pages without a hero button keep the bar visible.
 * Opacity/transform only, so nothing shifts; hidden bar is also visibility:hidden
 * so it cannot take keyboard focus.
 */
export function StickyReveal() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>('[data-sticky-wa]')
    const hero = document.querySelector<HTMLElement>('[data-wa-pos="hero"]')
    if (!bar || !hero || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    bar.dataset.motion = 'armed'
    const io = new IntersectionObserver(([e]) => {
      bar.dataset.motion = e.isIntersecting || e.boundingClientRect.top > 0 ? 'armed' : 'in'
    })
    io.observe(hero)
    return () => { io.disconnect(); delete bar.dataset.motion }
  }, [])
  return null
}
