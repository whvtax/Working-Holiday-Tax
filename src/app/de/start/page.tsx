import type { Metadata } from 'next'
import { Suspense } from 'react'
import StartFormClient from '@/app/start/StartFormClient'

// Not indexed: this is an intake form, not a landing page. The original
// /tax-form is untouched and keeps its own metadata.
export const metadata: Metadata = {
  title: 'Anspruch prüfen | Working Holiday Tax',
  robots: { index: false, follow: false },
}

export default function StartPage() {
  return (
    <Suspense fallback={null}>
      <StartFormClient lang="de" />
    </Suspense>
  )
}
