import type { Viewport } from 'next'
import { RootDocument } from '@/components/layout/RootDocument'

/**
 * Root layout for the Vietnamese form pages (decision 017).
 *
 * Working Holiday Tax has no Vietnamese site: this group holds only the tax form
 * and its tax residency step, so Will can send a Vietnamese speaker a link that
 * opens in their language. It is a root layout for the same reason as (de),
 * (ja), (fr), (it) and (es): `<html lang>` has to be right in the static HTML.
 * Everything except the language is shared, in components/layout/RootDocument.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // The page background, as in the other root layouts.
  themeColor: '#F2FAF7',
}

export default function LocaleRootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="vi">{children}</RootDocument>
}
