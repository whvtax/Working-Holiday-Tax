// The sign-in page (Jo, 20 Nov): /login, then Atlas. /crm is the CRM itself.
//
// force-dynamic for the same reason the CRM pages are: with CSP nonce mode on,
// a prerendered page cannot carry the per-request nonce, and this is the page
// that must work for anyone to reach the rest.
export const dynamic = 'force-dynamic'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/crm-store'
import LoginClient from '../crm/LoginClient'

export default async function LoginPage() {
  // Already signed in: straight to Atlas, never the password form.
  if (validateSession((await cookies()).get('crm_session')?.value)) redirect('/atlas')
  return <LoginClient />
}
