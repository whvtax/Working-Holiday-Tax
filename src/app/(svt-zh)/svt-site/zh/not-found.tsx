import type { Metadata } from 'next'
import { NotFoundSvt } from '@/components/svt/NotFoundSvt'

export const metadata: Metadata = { title: '找不到这个页面', robots: { index: false, follow: false } }

export default function NotFound() {
  return <NotFoundSvt locale="zh" />
}
