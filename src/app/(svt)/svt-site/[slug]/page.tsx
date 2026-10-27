import { notFound } from 'next/navigation'
import { guideFor } from '@/lib/svt/content/guides-i18n'
import { GuidePage } from '@/components/svt/GuidePage'
import { guideMetadata, guideStaticParams } from '@/components/svt/pages/guide-route'

// Every guide is generated at build time; any other slug is a 404.
export const dynamicParams = false
export const generateStaticParams = guideStaticParams
export const generateMetadata = ({ params }: { params: Promise<{ slug: string }> }) => guideMetadata('en', params)

export default async function SvtGuide({ params }: { params: Promise<{ slug: string }> }) {
  const g = guideFor('en', (await params).slug)
  if (!g) notFound()
  return <GuidePage g={g} locale="en" />
}
