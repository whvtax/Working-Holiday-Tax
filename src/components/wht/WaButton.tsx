'use client'

import type { ReactNode } from 'react'
import { WaLink } from '@/app/(site)/HomeWa'
import type { WaLang, WaTier } from '@/lib/wa'
import styles from './Button.module.css'

/** LinkButton look + WhatsApp tracking (WaLink supplies the click handler, so it must be a client module). */
export function WaButton({ href, position, topic, lang = 'en', tier, size = 'lg', tone = 'forest', fill = false, children }: {
  href: string
  position: 'hero' | 'inline' | 'section' | 'footer'
  topic: string
  lang?: WaLang
  tier?: WaTier
  size?: 'lg' | 'md'
  tone?: 'forest' | 'light'
  /** Stretch to the full width of its container on desktop too (card buttons). */
  fill?: boolean
  children: ReactNode
}) {
  const cls = [styles.button, styles[size], tone === 'light' ? styles.light : '', fill ? styles.fill : ''].filter(Boolean).join(' ')
  return <WaLink href={href} position={position} topic={topic} lang={lang} tier={tier} className={cls}>{children}</WaLink>
}
