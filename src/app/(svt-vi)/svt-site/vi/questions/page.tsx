import { svtMeta } from '@/lib/svt/page-meta'
import { QuestionsPage, questionsMeta } from '@/components/svt/pages/QuestionsPage'

export const metadata = svtMeta('vi', '/questions', questionsMeta('vi'))

export default function SvtQuestionsVI() {
  return <QuestionsPage locale="vi" />
}
