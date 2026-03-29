import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/crm-store'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('crm_session')?.value
  if (!validateSession(token)) {
    redirect('/crm')
  }
  return <DashboardClient />
}
