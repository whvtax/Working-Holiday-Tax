// Will (WhatsApp assistant) — lives inside the CRM and inherits its auth.
// Same session gate as the rest of /crm: an unauthenticated visitor is bounced
// to the login. This is how Will reuses your existing authentication.
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/crm-store'
import nextDynamic from 'next/dynamic'

const WillDashboard = nextDynamic(() => import('@/components/will/Dashboard'), {
  ssr: false,
  loading: () => (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',color:'#7a8a82',fontFamily:'system-ui,sans-serif',fontSize:14}}>
      Loading WhatsApp…
    </div>
  ),
})

export default async function WhatsAppPage() {
  const token = cookies().get('crm_session')?.value
  if (!validateSession(token)) {
    redirect('/crm')
  }
  return <WillDashboard />
}
