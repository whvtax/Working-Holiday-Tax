'use client'
import { useEffect, useRef } from 'react'

export function Cursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId = 0
    const lp = (a: number, b: number, t: number) => a + (b - a) * t

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dot.current) { dot.current.style.left = mx + 'px'; dot.current.style.top = my + 'px' }
    }

    const loop = () => {
      rx = lp(rx, mx, .12); ry = lp(ry, my, .12)
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px' }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    document.addEventListener('mousemove', move)

    // Use event delegation on document to handle dynamically added elements
    const onEnter = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('a,button,[role=button]')) document.body.classList.add('cursor-hover')
    }
    const onLeave = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('a,button,[role=button]')) document.body.classList.remove('cursor-hover')
    }
    const onDown = () => document.body.classList.add('cursor-click')
    const onUp   = () => document.body.classList.remove('cursor-click')

    document.addEventListener('mouseover',  onEnter)
    document.addEventListener('mouseout',   onLeave)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)

    return () => {
      cancelAnimationFrame(rafId)  // C2: cancel RAF on unmount
      document.removeEventListener('mousemove',  move)
      document.removeEventListener('mouseover',  onEnter)
      document.removeEventListener('mouseout',   onLeave)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
    }
  }, [])

  return (
    <>
      <div id="cursor"      ref={dot}  aria-hidden="true" />
      <div id="cursor-ring" ref={ring} aria-hidden="true" />
    </>
  )
}
