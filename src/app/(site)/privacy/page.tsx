import type { Metadata } from 'next'
import { LegalDoc } from '@/components/wht/LegalBlocks'
import { SITE_URL } from '@/lib/constants'
import { WHT_LEGAL } from '@/lib/legal/brands'
import { privacySections } from '@/lib/legal/legal-text'

const sections = privacySections(WHT_LEGAL)

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Working Holiday Tax privacy policy - how we collect, use and protect your personal information.',
  alternates: {
    canonical: '/privacy',
    languages: {
      'en': '/privacy', 'en-AU': '/privacy',
      'de': '/de/privacy',
      'ja': '/ja/privacy',
      'x-default': '/privacy',
    },
  },
  // Force the same share image as the homepage for every link to this page.
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Working Holiday Tax',
    url: `${SITE_URL}/privacy`,
    title: 'Privacy Policy',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${SITE_URL}/og-image.png`],
  },
}


export default function PrivacyPage() {
  return (
    <LegalDoc
      kicker="Legal"
      title="Privacy Policy"
      sub={<><span className="hidden lg:inline">Last updated: May 2026. We are committed to protecting your privacy.</span><span className="lg:hidden">Last updated: May 2026.<br />We are committed to protecting your privacy.</span></>}
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      intro={'We are committed to protecting your privacy and handling your personal information responsibly.'}
      sections={sections}
    />
  )
}
