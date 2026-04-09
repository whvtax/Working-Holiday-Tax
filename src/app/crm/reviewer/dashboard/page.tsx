import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateReviewerSession } from '@/lib/crm-store'
import ReviewerClient from './ReviewerClient'

export default async function ReviewerDashboardPage() {
  const token = cookies().get('crm_reviewer_session')?.value
  if (!validateReviewerSession(token)) redirect('/crm/reviewer')
  return <ReviewerClient />
}
