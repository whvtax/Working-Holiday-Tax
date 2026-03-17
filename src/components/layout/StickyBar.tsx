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
      <div ref={sentinel} className="absolute top-[100vh] left-0 w-px h-px pointer-events-none" aria-hidden="true" />
      <div className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-canvas/94 backdrop-blur-xl border-t border-border/48 px-5 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] transition-transform duration-500 ease-spring ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex gap-2.5 max-w-[480px] mx-auto">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="flex-1 h-[52px] flex items-center justify-center bg-amber text-ink-2 rounded-full text-[14px] font-semibold transition-colors hover:bg-amber-300 hover:text-white">
            Check my tax — it&apos;s free
          </a>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="w-[52px] h-[52px] rounded-full bg-wa flex items-center justify-center flex-shrink-0 transition-all hover:bg-green-600 hover:scale-105">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2C6.03 2 2 6.03 2 11c0 1.52.39 2.95 1.07 4.2L2 20l4.88-1.05A9 9 0 0011 20c4.97 0 9-4.03 9-9s-4.03-9-9-9z" fill="white"/>
              <path d="M8.5 7.5c-.2-.48-.4-.5-.62-.5h-.55c-.18 0-.48.07-.73.35C6.35 7.63 5.5 8.45 5.5 10.05s1.27 3.44 1.45 3.68c.18.24 2.43 3.87 5.97 5.28 2.97 1.14 3.58.92 4.22.86.65-.06 2.08-.85 2.38-1.67.3-.83.3-1.54.2-1.68-.1-.14-.33-.24-.68-.42s-2.08-1.02-2.4-1.14c-.32-.12-.56-.18-.8.18-.24.35-.9 1.14-1.1 1.37-.2.24-.41.27-.76.09-.35-.18-1.48-.55-2.82-1.73-1.04-.92-1.75-2.07-1.95-2.42-.2-.35-.02-.54.15-.7.15-.15.35-.4.52-.61.18-.2.23-.35.35-.59.12-.24.06-.45-.02-.6-.08-.18-.78-1.98-1.1-2.7z" fill="#22C55E"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}
