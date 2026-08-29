// Session gate, matching every other page under /crm.
//
// This page and its sibling were the only two in the CRM that opened with
// 'use client' and no server-side check, so an unauthenticated visitor could
// load the admin UI. The data behind it was never exposed (both API routes
// call sessionValid first), but the Connect screen let an anonymous party
// start a Facebook OAuth dialog branded as the business, and the diagnostics
// screen showed the internal vocabulary of the inbound pipeline. The pattern
// below is the one the five sibling pages already use.
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/crm-store'
import nextDynamic from 'next/dynamic'

const Client = nextDynamic(() => import('./ConnectClient'), { ssr: false })

export const dynamic = 'force-dynamic'

export default function Page() {
  if (!validateSession(cookies().get('crm_session')?.value)) redirect('/crm')
  return <Client />
}
