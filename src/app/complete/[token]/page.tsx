import type { Metadata } from 'next'
import CompleteFormClient from './CompleteFormClient'

// Never indexed: every URL here is personal to one client.
export const metadata: Metadata = {
  title: 'Complete your tax return | Working Holiday Tax',
  robots: { index: false, follow: false },
}

export default async function CompletePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  return <CompleteFormClient token={token} />
}
