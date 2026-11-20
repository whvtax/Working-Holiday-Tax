// Social Media (SVT) in Atlas: Ella, the SVT video system.
// Behind the CRM login. Replaces the "under construction" placeholder for this
// one module (a fixed route wins over atlas/[module]).
import { redirect } from 'next/navigation'
import { sessionValid } from '@/lib/will/auth'
import { loadEllaPage } from '@/lib/ella/view'
import { ellaEnvStatus, ellaServices } from '@/lib/ella/services'
import EllaCentre from '@/components/ella/EllaCentre'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function EllaPage({ searchParams }: { searchParams: Promise<{ tab?: string; tiktok?: string }> }) {
  if (!(await sessionValid())) redirect('/crm')
  const sp = await searchParams
  const data = await loadEllaPage(ellaServices(), ellaEnvStatus())
  return <EllaCentre data={data} initialTab={sp.tab ?? 'overview'} notice={sp.tiktok ? `TikTok: ${sp.tiktok}` : null} />
}
