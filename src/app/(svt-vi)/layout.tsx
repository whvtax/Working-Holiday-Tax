import type { Metadata, Viewport } from 'next'
import { SVT_PUBLIC } from '@/lib/svt/brand-public'
import { SvtDocument } from '@/components/svt/SvtDocument'
import '../(svt)/fonts.css'
import '../(svt)/tokens.css'
import '../(svt)/svt.css'

/** Root layout for Student Visa Tax in Vietnamese: its own root layout so the
 *  static HTML carries the right <html lang>. Served only on the SVT hosts. */
export const metadata: Metadata = {
  metadataBase: new URL(SVT_PUBLIC.siteUrl),
  title: { default: SVT_PUBLIC.name, template: `%s | ${SVT_PUBLIC.name}` },
  applicationName: SVT_PUBLIC.name,
  formatDetection: { telephone: false, email: false, address: false },
  icons: { icon: [{ url: '/svt-assets/favicon.svg', type: 'image/svg+xml' }] },
  openGraph: { siteName: SVT_PUBLIC.name, locale: 'vi_VN', type: 'website', images: [{ url: '/svt-assets/og/og-vi.png', width: 1200, height: 630, alt: SVT_PUBLIC.name }] },
  twitter: { card: 'summary_large_image', images: ['/svt-assets/og/og-vi.png'] },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#12161F' }

export default function SvtRootLayoutVI({ children }: { children: React.ReactNode }) {
  return <SvtDocument locale="vi">{children}</SvtDocument>
}
