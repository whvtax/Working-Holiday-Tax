import { svtMeta } from '@/lib/svt/page-meta'
import { ContactPage, contactMeta } from '@/components/svt/pages/ContactPage'

export const metadata = svtMeta('zh', '/contact', contactMeta('zh'))

export default function SvtContactZH() {
  return <ContactPage locale="zh" />
}
