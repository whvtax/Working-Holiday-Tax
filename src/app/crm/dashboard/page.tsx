import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/crm-store'
import dynamic from 'next/dynamic'

const DashboardClient = dynamic(() => import('./DashboardClient'), {
  ssr: false,
  loading: () => (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',color:'#7a8a82',fontFamily:'system-ui,sans-serif',fontSize:14}}>
      Loading dashboard…
    </div>
  ),
})

export default async function DashboardPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('crm_session')?.value
  if (!validateSession(token)) {
    redirect('/crm')
  }
  return <DashboardClient />
}
