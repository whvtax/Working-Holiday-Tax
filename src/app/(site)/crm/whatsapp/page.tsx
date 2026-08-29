// Will (WhatsApp assistant) — lives inside the CRM and inherits its auth.
// Same session gate as the rest of /crm: an unauthenticated visitor is bounced
// to the login. This is how Will reuses your existing authentication.
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/crm-store'
import './will-scoped.css'
import ClientOnly from './ClientOnly'

export default async function WhatsAppPage() {
  const token = (await cookies()).get('crm_session')?.value
  if (!validateSession(token)) {
    redirect('/crm')
  }
  return <div className="will-scope"><ClientOnly /></div>
}
