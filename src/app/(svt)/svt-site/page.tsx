import { homeEn } from '@/lib/svt/content/home-en'
import { svtMeta } from '@/lib/svt/page-meta'
import { HomePage } from '@/components/svt/pages/HomePage'

export const metadata = svtMeta('en', '/', { ...homeEn.meta, absoluteTitle: true })

export default function SvtHomeEn() {
  return <HomePage locale="en" t={homeEn} />
}
