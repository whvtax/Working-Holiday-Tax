import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { serviceHubFor, hubLocales } from '@/lib/svt/content/services-i18n'
import { svtMeta } from '@/lib/svt/page-meta'
import { GuidePage } from '@/components/svt/GuidePage'

/** Trang mã số thuế TFN, /vi/tfn (round 4). English structure, Vietnamese words. */
export function generateMetadata(): Metadata {
  const g = serviceHubFor('vi', 'tfn')
  return g ? svtMeta('vi', '/tfn', g.meta) : {}
}

export default function SvtTfnHubVI() {
  const g = serviceHubFor('vi', 'tfn')
  if (!g) notFound()
  return <GuidePage g={g} locale="vi" article locales={hubLocales('tfn')} />
}
