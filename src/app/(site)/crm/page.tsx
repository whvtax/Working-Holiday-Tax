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

import LoginClient from './LoginClient'

export default function CrmLoginPage() {
  return <LoginClient />
}
