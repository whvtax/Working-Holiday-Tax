import { svtMeta } from '@/lib/svt/page-meta'
import { QuestionsPage, questionsMeta } from '@/components/svt/pages/QuestionsPage'

export const metadata = svtMeta('zh', '/questions', questionsMeta('zh'))

export default function SvtQuestionsZH() {
  return <QuestionsPage locale="zh" />
}
