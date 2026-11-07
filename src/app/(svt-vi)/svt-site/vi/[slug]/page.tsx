import { notFound } from 'next/navigation'
import { guideFor } from '@/lib/svt/content/guides-i18n'
import { serviceHubFor } from '@/lib/svt/content/services-i18n'
import { svtMeta } from '@/lib/svt/page-meta'
import { GuidePage } from '@/components/svt/GuidePage'
import { guideMetadata, guideStaticParams } from '@/components/svt/pages/guide-route'

export const dynamicParams = false
export const generateStaticParams = guideStaticParams
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hub = serviceHubFor('vi', slug)
  return hub ? svtMeta('vi', `/${hub.slug}`, hub.meta) : guideMetadata('vi', Promise.resolve({ slug }))
}

export default async function SvtGuideVI({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Round 4: the rebuilt DASP hub (Vietnamese words on the English hub structure)
  // replaces the older guide of the same slug, as it does in English.
  const hub = serviceHubFor('vi', slug)
  const g = hub ?? guideFor('vi', slug)
  if (!g) notFound()
  return <GuidePage g={g} locale="vi" article={!!hub} />
}
