import type { Metadata, Viewport } from 'next'
import { SVT_PUBLIC } from '@/lib/svt/brand-public'
import { SvtDocument } from '@/components/svt/SvtDocument'
import './fonts.css'
import './tokens.css'
import './svt.css'

/**
 * Root layout for Student Visa Tax (English).
 *
 * A separate root layout, not a child of the WHT one: nothing from the WHT
 * shell (nav, footer, JSON-LD, fonts, CSS) can reach an SVT page. Analytics is
 * the shared component with the student brand's own GA4 property.
 * Pages here are served only on the SVT hosts, by the rewrite in
 * config/brand-routing.js; on any other host /svt-site is a 404.
 */
const svt = SVT_PUBLIC

export const metadata: Metadata = {
  metadataBase: new URL(svt.siteUrl),
  title: { default: svt.name, template: `%s | ${svt.name}` },
  applicationName: svt.name,
  formatDetection: { telephone: false, email: false, address: false },
  icons: { icon: [{ url: '/svt-assets/favicon.svg', type: 'image/svg+xml' }] },
  openGraph: { siteName: svt.name, locale: 'en_AU', type: 'website', images: [{ url: '/svt-assets/og/og-en.png', width: 1200, height: 630, alt: svt.name }] },
  twitter: { card: 'summary_large_image', images: ['/svt-assets/og/og-en.png'] },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#12161F',
}

export default function SvtRootLayout({ children }: { children: React.ReactNode }) {
  return <SvtDocument locale="en">{children}</SvtDocument>
}
