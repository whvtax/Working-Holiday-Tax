'use client'
import { useEffect, useRef, useState } from 'react'
import { trackWhatsApp } from '@/lib/analytics'

type Lang = 'en' | 'de' | 'ja'

const LABEL: Record<Lang, string> = {
  en: 'Message us on WhatsApp',
  de: 'Schreib uns auf WhatsApp',
  ja: 'WhatsAppで相談する',
}

const SUB: Record<Lang, string> = {
  en: 'Signed off by a registered tax agent · reply in ~1 hour',
  de: 'Geprüft von einem registrierten Steueragenten · Antwort in ca. 1 Std.',
  ja: '登録税理士が確認 · 約1時間で返信',
}

/**
 * The sub line on pages that must not carry the credential.
 *
 * /about deliberately says nothing about the supervising agent, so the bar
 * cannot contradict the page it sits on. Everywhere else the credential is the
 * strongest reassurance available and it stays.
 */
const SUB_NEUTRAL: Record<Lang, string> = {
  en: 'A real person replies, usually within the hour',
  de: 'Eine echte Person antwortet, meist innerhalb einer Stunde',
  ja: '担当者が約1時間以内に返信します',
}

/**
 * Mobile-only sticky call to action. Hidden at >= 768px, where the inline CTAs
 * stay within reach.
 *
 * Three behaviours worth knowing about:
 *
 * 1. Hysteresis. It appears past 420px and only hides again below 360px. A
 *    single threshold makes the bar flicker for anyone whose thumb parks them
 *    right on it, which on a phone is most people.
 *
 * 2. Direction. While the reader is scrolling down they are reading, so the bar
 *    gets out of the way. It returns the moment they scroll up, which is when
 *    somebody is looking for a way to act.
 *
 * 3. A single 10ms vibration on tap where the device supports it. This is the
 *    one commit moment on the site and it hands off to another app, so a small
 *    physical confirmation earns its place. It fails silently everywhere that
 *    does not support it, iOS Safari included.
 */
export function MobileCta({
  href,
  lang = 'en',
  topic = 'general',
  variant = 'default',
}: {
  href: string
  lang?: Lang
  topic?: string
  /** 'neutral' drops the credential line, for pages that must not carry it. */
  variant?: 'default' | 'neutral'
}) {
  const [visible, setVisible] = useState(false)
  const lastY = useRef(0)
  const shown = useRef(false)

  useEffect(() => {
    let pending = false
    let rafId = 0

    const onScroll = () => {
      if (pending) return
      pending = true
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY
        const down = y > lastY.current + 4
        const up = y < lastY.current - 4
        const nearBottom =
          window.innerHeight + y >= document.documentElement.scrollHeight - 260

        if (!shown.current && y > 420) shown.current = true
        else if (shown.current && y < 360) shown.current = false

        let next = shown.current && !nearBottom
        if (next && down && y > 600) next = false
        if (shown.current && up && !nearBottom) next = true

        setVisible(next)
        lastY.current = y
        pending = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    lastY.current = window.scrollY
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const onTap = () => {
    try { navigator.vibrate?.(10) } catch { /* unsupported, which is fine */ }
    trackWhatsApp({ position: 'sticky', topic, lang })
  }

  return (
    <div
      className="mobile-cta-bar"
      data-visible={visible ? 'true' : 'false'}
      aria-hidden={!visible}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-cta-btn"
        tabIndex={visible ? 0 : -1}
        onClick={onTap}
      >
        <span className="mobile-cta-label">{LABEL[lang]}</span>
        <span className="mobile-cta-sub">{variant === 'neutral' ? SUB_NEUTRAL[lang] : SUB[lang]}</span>
      </a>
    </div>
  )
}
