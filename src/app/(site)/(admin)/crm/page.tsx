// The login form itself is a client component and unchanged - it moved to
// LoginClient.tsx so THIS file can be a server page and carry segment config.
//
// WHY force-dynamic ON A LOGIN PAGE. Every other /crm page is dynamically
// rendered already (each reads cookies()); this one was the lone prerendered
// page under /crm. When CSP nonce mode is on (CSP_NONCE_ENABLED, CRM-only -
// see middleware.ts), the nonce changes per request, so a prerendered page
// cannot carry it and every script on it would be refused - on exactly the
// page that must work for anyone to reach the rest. Rendering it per request
// costs nothing that matters here: it is an internal page for a handful of
// people, not one of the ~540 public pages where static generation pays.
export const dynamic = 'force-dynamic'

import { cookies } from 'next/headers'
import { validateSession } from '@/lib/crm-store'
import { redirect } from 'next/navigation'
import ClientOnly from './ClientOnly'

// A valid session never sees the password form (audit, 5 Sep): signed in,
// /crm renders the CRM itself. The ?timeout=1 path is unaffected: idle logout
// clears the cookie before it comes here, so the session is already invalid.
// Jo, 20 Nov: /crm is the CRM and nothing else. Signing in is /login, which
// then opens Atlas. Signed out, /crm sends you to /login.
export default async function CrmPage() {
  const token = (await cookies()).get('crm_session')?.value
  if (!validateSession(token)) redirect('/login')
  return <ClientOnly />
}
