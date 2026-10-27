import { svtMeta } from '@/lib/svt/page-meta'
import { QuestionsPage, questionsMeta } from '@/components/svt/pages/QuestionsPage'

export const metadata = svtMeta('en', '/questions', questionsMeta('en'))

export default function SvtQuestions() {
  return <QuestionsPage locale="en" />
}
