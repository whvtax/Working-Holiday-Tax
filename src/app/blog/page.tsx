import type { Metadata } from 'next'
import Link from 'next/link'
import { guides } from './data'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Blog | Working Holiday Tax',
  description: 'Clear, honest guides covering TFN, ABN, tax returns, superannuation, work rights and more - written for working holiday visa holders in Australia.',
  openGraph: {
    title: 'Blog | Working Holiday Tax',
    description: 'Everything you need to know about tax in Australia, explained simply.',
    url: 'https://workingholidaytax.com.au/blog',
  },
}

export default function BlogPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <BlogClient guides={guides} />
    </main>
  )
}
