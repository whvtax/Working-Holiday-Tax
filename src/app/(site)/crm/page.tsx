// The login form itself is a client component and unchanged — it moved to
// LoginClient.tsx so THIS file can be a server page and carry segment config.
//
// WHY force-dynamic ON A LOGIN PAGE. Every other /crm page is dynamically
// rendered already (each reads cookies()); this one was the lone prerendered
// page under /crm. When CSP nonce mode is on (CSP_NONCE_ENABLED, CRM-only —
// see middleware.ts), the nonce changes per request, so a prerendered page
// cannot carry it and every script on it would be refused — on exactly the
// page that must work for anyone to reach the rest. Rendering it per request
// costs nothing that matters here: it is an internal page for a handful of
// people, not one of the ~540 public pages where static generation pays.
export const dynamic = 'force-dynamic'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/crm-store'
import LoginClient from './LoginClient'

// (audit, 5 Sep) Every other /crm page redirects to /crm when the session
// cookie is invalid, but this entry page — the one a bookmark or address bar
// autocomplete actually lands on — never checked the other direction: a
// visitor with a valid 8-hour session still saw the password form and paid a
// password plus OTP email round trip for nothing. Mirror the dashboard/
// whatsapp check so a valid session skips straight past login. The
// ?timeout=1 path is unaffected: idle logout clears the cookie before it
// redirects here, so validateSession is already false by the time this runs.
export default async function CrmLoginPage() {
  const token = (await cookies()).get('crm_session')?.value
  if (validateSession(token)) {
    redirect('/crm/dashboard')
  }
  return <LoginClient />
}
