import type { Metadata } from 'next'
import { guides } from './data'
import GuidesClient from './GuidesClient'

export const metadata: Metadata = {
  title: 'Tax Guides for Working Holiday Makers | Working Holiday Tax',
  description: 'Clear, honest guides covering TFN, ABN, tax returns, superannuation, work rights and more - written for working holiday visa holders in Australia.',
  openGraph: {
    title: 'Tax Guides for Working Holiday Makers',
    description: 'Everything you need to know about tax in Australia, explained simply.',
    url: 'https://workingholidaytax.com.au/guides',
  },
}

export default function GuidesPage() {
  return (
    <main style={{ paddingTop: '68px', background: '#fff', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ borderBottom: '1px solid #E2EFE9', paddingTop: '48px', paddingBottom: '40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
          <p className="section-label" style={{ marginBottom: '12px' }}>Tax Guides</p>
          <h1
            className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '12px', maxWidth: '640px' }}
          >
            Everything you need to know about tax in Australia
          </h1>
          <p style={{ fontSize: '15px', color: '#587066', lineHeight: 1.65, maxWidth: '540px', fontWeight: 300 }}>
            Clear, honest guides for working holiday makers. No jargon, no confusing forms - just the information you need, explained simply.
          </p>
        </div>
      </section>

      <GuidesClient guides={guides} />

    </main>
  )
}
