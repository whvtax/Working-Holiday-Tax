'use client'
import { useEffect, useState } from 'react'

type Lang = 'en' | 'de' | 'ja'

const LABEL: Record<Lang, string> = {
  en: 'Check what you are owed',
  de: 'Was steht dir zu?',
  ja: '受け取れる金額を確認',
}

const SUB: Record<Lang, string> = {
  en: 'No refund, no fee · reply in ~1 hour',
  de: 'Kein Anspruch, keine Gebühr · Antwort in ca. 1 Std.',
  ja: '資格がなければ費用なし · 約1時間で返信',
}

/**
 * Mobile-only sticky call to action.
 *
 * Appears after the visitor scrolls past the hero, so it never competes with
 * the primary button above the fold. Hidden on tablet and desktop (>= 768px),
 * where the inline CTAs are always within reach.
 *
 * Rendered at the bottom of service pages. Adds bottom padding to the page via
 * a spacer so the bar never covers the final content.
 */
export function MobileCta({ href, lang = 'en' }: { href: string; lang?: Lang }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let rafId = 0
    let pending = false
    const onScroll = () => {
      if (pending) return
      pending = true
      rafId = requestAnimationFrame(() => {
        // Show once past roughly one viewport, hide again near the very bottom
        // so it does not sit on top of the footer CTA.
        const y = window.scrollY
        const nearBottom =
          window.innerHeight + y >= document.documentElement.scrollHeight - 260
        setVisible(y > 420 && !nearBottom)
        pending = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      className="mobile-cta-bar"
      data-visible={visible ? 'true' : 'false'}
      aria-hidden={!visible}
    >
      <a href={href} className="mobile-cta-btn" tabIndex={visible ? 0 : -1}>
        <span className="mobile-cta-label">{LABEL[lang]}</span>
        <span className="mobile-cta-sub">{SUB[lang]}</span>
      </a>
    </div>
  )
}
