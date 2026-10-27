import { homeVi } from '@/lib/svt/content/home-vi'
import { svtMeta } from '@/lib/svt/page-meta'
import { HomePage } from '@/components/svt/pages/HomePage'

export const metadata = svtMeta('vi', '/', { ...homeVi.meta, absoluteTitle: true })

export default function SvtHomeVI() {
  return <HomePage locale="vi" t={homeVi} />
}
