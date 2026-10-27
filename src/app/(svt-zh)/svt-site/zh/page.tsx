import { homeZh } from '@/lib/svt/content/home-zh'
import { svtMeta } from '@/lib/svt/page-meta'
import { HomePage } from '@/components/svt/pages/HomePage'

export const metadata = svtMeta('zh', '/', { ...homeZh.meta, absoluteTitle: true })

export default function SvtHomeZH() {
  return <HomePage locale="zh" t={homeZh} />
}
