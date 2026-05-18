import type { Metadata } from 'next'
import Link from 'next/link'
import { guides } from './data'
import GuidesClient from './GuidesClient'

export const metadata: Metadata = {
  title: 'Blog | Working Holiday Tax',
  description: 'Clear, honest guides covering TFN, ABN, tax returns, superannuation, work rights and more - written for working holiday visa holders in Australia.',
  openGraph: {
    title: 'Blog | Working Holiday Tax',
    description: 'Everything you need to know about tax in Australia, explained simply.',
    url: 'https://workingholidaytax.com.au/guides',
  },
}

export default function GuidesPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <GuidesClient guides={guides} />
    </main>
  )
}
