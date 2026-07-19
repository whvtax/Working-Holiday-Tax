import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/crm-store'
import dynamic from 'next/dynamic'

const ConnectClient = dynamic(() => import('./ConnectClient'), {
  ssr: false,
  loading: () => (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',color:'#7a8a82',fontFamily:'system-ui,sans-serif',fontSize:14}}>
      Loading…
    </div>
  ),
})

// Admin-only, session-protected — same as every other CRM page. This page
// runs the WhatsApp Embedded Signup flow once, then shows the resulting
// credentials ONE TIME so they can be copied into Vercel's environment
// variables. It never stores the access token anywhere itself.
export default async function ConnectPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('crm_session')?.value
  if (!validateSession(token)) {
    redirect('/crm')
  }
  return <ConnectClient />
}
