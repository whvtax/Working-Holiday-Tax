import { svtMeta } from '@/lib/svt/page-meta'
import { ContactPage, contactMeta } from '@/components/svt/pages/ContactPage'

export const metadata = svtMeta('en', '/contact', contactMeta('en'))

export default function SvtContact() {
  return <ContactPage locale="en" />
}
