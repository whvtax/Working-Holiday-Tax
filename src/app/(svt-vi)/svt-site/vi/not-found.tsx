import type { Metadata } from 'next'
import { NotFoundSvt } from '@/components/svt/NotFoundSvt'

export const metadata: Metadata = { title: 'Không tìm thấy trang này', robots: { index: false, follow: false } }

export default function NotFound() {
  return <NotFoundSvt locale="vi" />
}
