import type { Metadata } from 'next'
import { TFN_HUB_EN } from '@/lib/svt/content/services-en'
import { hubLocales } from '@/lib/svt/content/services-i18n'
import { svtMeta } from '@/lib/svt/page-meta'
import { GuidePage } from '@/components/svt/GuidePage'

/** TFN hub (round 4). hreflang alternates and the language switch list the
 *  languages it is written in so far (services-i18n.ts: hubLocales). */
export const metadata: Metadata = svtMeta('en', '/tfn', TFN_HUB_EN.meta)

export default function SvtTfnHub() {
  return <GuidePage g={TFN_HUB_EN} locale="en" article locales={hubLocales('tfn')} />
}
