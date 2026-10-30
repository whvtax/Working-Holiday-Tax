import { svtMeta } from '@/lib/svt/page-meta'
import { ContactPage, contactMeta } from '@/components/svt/pages/ContactPage'

export const metadata = svtMeta('vi', '/contact', contactMeta('vi'))

export default function SvtContactVI() {
  return <ContactPage locale="vi" />
}
