'use client'

import { useEffect, useState } from 'react'
import { WA_URL } from '@/lib/constants'

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let rafId = 0
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        // Show after scrolling past hero (~400px)
        setVisible(window.scrollY > 400)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Add body class to add bottom padding so sticky doesn't cover content
    document.body.classList.add('contact-page')
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
      document.body.classList.remove('contact-page')
    }
  }, [])

  return (
    <div
      className={`contact-mobile-sticky ${visible ? 'visible' : ''}`}
      aria-label="Quick contact actions"
    >
      <a
        href={`tel:+${'61424513998'}`}
        className="contact-mobile-sticky-btn contact-mobile-sticky-call"
        aria-label="Call us"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
        </svg>
        Call
      </a>
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-mobile-sticky-btn contact-mobile-sticky-wa"
        aria-label="Message us on WhatsApp"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.36 2.72.99 3.87L2 18l4.18-.98C7.3 17.65 8.62 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8zm3.1 10.8c-.12.32-.77.64-1.06.67-.28.03-.55.14-1.83-.48-1.56-.73-2.57-2.32-2.64-2.43-.07-.11-.66-.98-.66-1.87s.48-1.32.64-1.5c.16-.18.36-.22.48-.22h.35c.11 0 .25 0 .37.3.12.3.42 1.26.46 1.35.04.09.05.2 0 .32l-.33.44c-.09.11-.18.23-.07.44.11.21.48.86 1.01 1.34.53.48.99.68 1.19.76.2.09.28.07.37-.05l.34-.48c.09-.13.2-.11.33-.06.13.06.86.48 1.01.57.15.09.25.14.28.21.04.3-.07.83-.18 1.12z"/>
        </svg>
        WhatsApp
      </a>
    </div>
  )
}
