// Control (Jo, 20 Nov): everything Will and Mia cannot do alone, in one place,
// for both brands: overview and reports, tasks, chats, Library, Templates,
// Learning and System. Every action reaches the right brand (each customer row
// carries its brand). Same CRM session gate as the rest of the admin.
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/crm-store'
import '../will/will-scoped.css'
import ClientOnly from '../will/ClientOnly'

export default async function ControlPage() {
  const token = (await cookies()).get('crm_session')?.value
  if (!validateSession(token)) redirect('/login')
  return <div className="will-scope control-theme"><ClientOnly scope="control" /></div>
}
