'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Renders nothing. The phone WhatsApp bar slides up only after the hero's own
 * WhatsApp button has scrolled out of view, so two identical buttons are never
 * on screen together. Pages without a hero button keep the bar visible.
 * Opacity/transform only, so nothing shifts; hidden bar is also visibility:hidden
 * so it cannot take keyboard focus. On a guide it also points the bar at the
 * guide's own prefilled message (see below).
 */
export function StickyReveal() {
  const pathname = usePathname()

  // On a guide, the bar opens the same message as the guide's own closing
  // button (it names the guide and Student Visa Tax), instead of the general
  // hello. The label stays the same. Off a guide it keeps its own message.
  useEffect(() => {
    const link = document.querySelector<HTMLAnchorElement>('[data-sticky-wa] a[data-wa-pos="sticky"]')
    if (!link) return
    if (!link.dataset.waDefault) link.dataset.waDefault = link.getAttribute('href') ?? ''
    const guideHref = document.querySelector<HTMLAnchorElement>('main a[data-wa-pos="guide-end"]')?.getAttribute('href')
    link.setAttribute('href', guideHref || link.dataset.waDefault)
  }, [pathname])

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
