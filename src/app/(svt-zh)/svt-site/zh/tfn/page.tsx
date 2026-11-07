import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { serviceHubFor, hubLocales } from '@/lib/svt/content/services-i18n'
import { svtMeta } from '@/lib/svt/page-meta'
import { GuidePage } from '@/components/svt/GuidePage'

/** 税号（TFN）总览页，/zh/tfn（round 4）。English structure, Chinese words. */
export function generateMetadata(): Metadata {
  const g = serviceHubFor('zh', 'tfn')
  return g ? svtMeta('zh', '/tfn', g.meta) : {}
}

export default function SvtTfnHubZH() {
  const g = serviceHubFor('zh', 'tfn')
  if (!g) notFound()
  return <GuidePage g={g} locale="zh" article locales={hubLocales('tfn')} />
}
