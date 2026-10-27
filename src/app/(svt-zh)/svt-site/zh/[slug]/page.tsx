import { notFound } from 'next/navigation'
import { guideFor } from '@/lib/svt/content/guides-i18n'
import { GuidePage } from '@/components/svt/GuidePage'
import { guideMetadata, guideStaticParams } from '@/components/svt/pages/guide-route'

export const dynamicParams = false
export const generateStaticParams = guideStaticParams
export const generateMetadata = ({ params }: { params: Promise<{ slug: string }> }) => guideMetadata('zh', params)

export default async function SvtGuideZH({ params }: { params: Promise<{ slug: string }> }) {
  const g = guideFor('zh', (await params).slug)
  if (!g) notFound()
  return <GuidePage g={g} locale="zh" />
}
