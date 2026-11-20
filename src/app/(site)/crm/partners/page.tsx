import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/crm-store'
import ClientOnly from './ClientOnly'

export default async function PartnersPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('crm_session')?.value
  if (!validateSession(token)) {
    redirect('/crm')
  }
  return <ClientOnly />
}
