import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { guideFor } from '@/lib/svt/content/guides-i18n'
import { serviceHubEn } from '@/lib/svt/content/services-en'
import { svtMeta } from '@/lib/svt/page-meta'
import { GuidePage } from '@/components/svt/GuidePage'
import { guideMetadata, guideStaticParams } from '@/components/svt/pages/guide-route'

// Every guide is generated at build time; any other slug is a 404.
// (The English-only TFN hub has its own route, /tfn.)
export const dynamicParams = false
export const generateStaticParams = guideStaticParams

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const hub = serviceHubEn(slug)
  return hub ? svtMeta('en', `/${hub.slug}`, hub.meta) : guideMetadata('en', Promise.resolve({ slug }))
}

export default async function SvtGuide({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Round 4: an English hub (the rebuilt DASP page) replaces the guide of the same slug.
  const hub = serviceHubEn(slug)
  const g = hub ?? guideFor('en', slug)
  if (!g) notFound()
  return <GuidePage g={g} locale="en" article={!!hub} />
}
