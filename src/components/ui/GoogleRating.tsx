'use client'

/**
 * GoogleRating
 * ------------
 * Shows the REAL Google rating and total review count, fetched live and
 * shared (one request per page). Drops straight into existing data arrays
 * as a React node.
 *
 * Variants:
 *   "number"  -> "4.8★"                (big stat / contact stat)
 *   "count"   -> "from 80 reviews"     (stat label under the number)
 *   "pill"    -> "4.8★ from 80 reviews" (trust-bar pill, one line)
 *
 * The count is the TRUE number of reviews on your Google profile (e.g. 80),
 * even though the carousel itself shows up to 15 on the free plan.
 */

import { useGoogleSummary } from '@/lib/googleSummary'

type Lang = 'en' | 'de' | 'ja'
type Variant = 'pill' | 'number' | 'count'

function fmtRating(r: number, lang: Lang) {
  const s = r.toFixed(1)
  return lang === 'de' ? s.replace('.', ',') : s
}

const LOADING: Record<Lang, string> = {
  en: 'Google reviews',
  de: 'Google-Bewertungen',
  ja: 'Googleの口コミ',
}

export function GoogleRating({ variant = 'pill', lang = 'en' }: { variant?: Variant; lang?: Lang }) {
  const s = useGoogleSummary()

  if (variant === 'number') {
    return <span>{s ? `${fmtRating(s.rating, lang)}★` : '★'}</span>
  }

  if (variant === 'count') {
    if (!s) return <span>{LOADING[lang]}</span>
    const txt: Record<Lang, string> = {
      en: `from ${s.count} reviews`,
      de: `von ${s.count} Bewertungen`,
      ja: `${s.count}件の口コミ`,
    }
    return <span>{txt[lang]}</span>
  }

  // pill
  if (!s) return <span>{LOADING[lang]}</span>
  const r = fmtRating(s.rating, lang)
  const txt: Record<Lang, string> = {
    en: `${r}★ from ${s.count} reviews`,
    de: `${r}★ von ${s.count} Bewertungen`,
    ja: `${r}★（${s.count}件の口コミ）`,
  }
  return <span>{txt[lang]}</span>
}

export default GoogleRating
