import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/crm-store'
import ClientPageClient from './ClientPageClient'

export default async function ClientPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const token = cookieStore.get('crm_session')?.value
  if (!validateSession(token)) {
    redirect('/crm')
  }
  return <ClientPageClient id={params.id} />
}
