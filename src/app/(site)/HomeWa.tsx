'use client'

import type { CSSProperties, ReactNode } from 'react'
import { trackTier, trackWhatsApp } from '@/lib/analytics'
import type { WaLang, WaTier } from '@/lib/wa'

/**
 * A WhatsApp link that reports itself.
 *
 * The three homepages are server components so they can keep their metadata and
 * stay statically generated, which is the whole point after the layout fix. An
 * onClick handler needs a client module, and a module is either client or server,
 * so the smallest possible piece of the page lives here instead: the anchor.
 *
 * Everything else about the homepages, including the tier cards' copy and
 * layout, is still rendered on the server.
 */
export function WaLink({
  href,
  position,
  topic,
  lang = 'en',
  tier,
  className,
  style,
  children,
}: {
  href: string
  position: 'hero' | 'inline' | 'section' | 'footer'
  topic: string
  lang?: WaLang
  tier?: WaTier
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  const onTap = () => {
    // One short confirmation on the single commit action of the page, where the
    // device supports it. Silent everywhere else, iOS Safari included.
    try { navigator.vibrate?.(10) } catch { /* unsupported, which is fine */ }
    if (tier) trackTier(tier, lang)
    trackWhatsApp({ position, topic, lang, tier })
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={onTap}
    >
      {children}
    </a>
  )
}
