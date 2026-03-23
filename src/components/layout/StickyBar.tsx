'use client'
import { useEffect, useRef, useState } from 'react'
import { WA_URL } from '@/lib/constants'

export function StickyBar() {
  const [visible, setVisible] = useState(false)
  const sentinel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting), { threshold: 0 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinel} className="fixed w-px h-px pointer-events-none" style={{ top: '100vh', left: 0 }} aria-hidden="true" />
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden backdrop-blur-xl transition-transform duration-500 ease-spring ${visible ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ background: 'rgba(247,251,249,0.94)', borderTop: '1px solid rgba(205,227,219,0.45)', padding: '10px 20px calc(10px + env(safe-area-inset-bottom))' }}>
        <div className="flex gap-2.5 max-w-[480px] mx-auto">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center font-semibold transition-colors"
            style={{ height: '52px', background: '#E9A020', color: '#1A2822', borderRadius: '13px', fontSize: '14px' }}>
            Start now →
          </a>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
            className="flex items-center justify-center flex-shrink-0 transition-all hover:scale-105"
            style={{ width: '52px', height: '52px', borderRadius: '13px', background: '#22C55E' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.74.45 3.38 1.24 4.8L2 22l5.36-1.22A9.93 9.93 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="white"/>
              <path d="M17.5 14.9c-.22.62-.65 1.13-1.22 1.47-.44.26-.95.4-1.47.4-.38 0-.75-.06-1.12-.19-1.25-.43-2.42-1.14-3.42-2.14s-1.71-2.17-2.14-3.42c-.26-.79-.2-1.64.16-2.38.24-.5.62-.93 1.1-1.22.18-.11.38-.17.59-.17h.42c.2 0 .44.08.6.53l.73 2.02c.1.29.04.62-.16.85l-.41.47c-.13.15-.15.36-.06.54.45.87 1.08 1.62 1.86 2.2.49.36 1.04.64 1.63.84.18.06.38.02.52-.11l.47-.42c.22-.2.54-.27.83-.17l2 .72c.44.16.53.4.53.6v.42c0 .18-.04.36-.11.52z" fill="#22C55E"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}
