import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { StickyBar } from '@/components/layout/StickyBar'
import { RevealObserver } from '@/components/ui/RevealObserver'
import { SITE_URL } from '@/lib/constants'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Working Holiday Tax — Australian Tax for WHV Holders',
    template: '%s — Working Holiday Tax',
  },
  description:
    'Tax return, TFN, super and ABN for Working Holiday Visa holders in Australia. Registered tax agent. Start for free.',
  keywords: ['working holiday tax', 'WHV tax return', 'TFN application Australia', 'backpacker tax', 'superannuation Australia'],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: 'Working Holiday Tax',
    title: 'Working Holiday Tax — Australian Tax for WHV Holders',
    description: 'Tax return, TFN, super and ABN for Working Holiday Visa holders in Australia.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

// M3: explicit viewport export (Next.js 14 App Router recommendation)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B5240',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        <Nav />
        <main>{children}</main>
        <Footer />
        <StickyBar />
        <RevealObserver />
      </body>
    </html>
  )
}
