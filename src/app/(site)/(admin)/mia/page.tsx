// Mia (Jo, 20 Nov): exactly Will's screen (Pipeline, Chats, Follow-ups), SVT
// customers only, in the colour Atlas gives Mia. Same CRM session gate.
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/crm-store'
import '../will/will-scoped.css'
import ClientOnly from '../will/ClientOnly'

export default async function MiaPage() {
  const token = (await cookies()).get('crm_session')?.value
  if (!validateSession(token)) redirect('/login')
  return <div className="will-scope mia-theme"><ClientOnly scope="svt" /></div>
}
