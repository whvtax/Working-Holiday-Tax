'use client'
import { useEffect, useRef } from 'react'

export function Cursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let mx = 0, my = 0, rx = 0, ry = 0
    const lp = (a: number, b: number, t: number) => a + (b - a) * t

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dot.current) { dot.current.style.left = mx + 'px'; dot.current.style.top = my + 'px' }
    }
    const loop = () => {
      rx = lp(rx, mx, .12); ry = lp(ry, my, .12)
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px' }
      requestAnimationFrame(loop)
    }
    loop()
    document.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,[role=button]').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'))
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'))
    })
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'))
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'))
    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div id="cursor"      ref={dot}  aria-hidden="true" />
      <div id="cursor-ring" ref={ring} aria-hidden="true" />
    </>
  )
}
