import type { Viewport } from 'next'
import { RootDocument } from '@/components/layout/RootDocument'

/**
 * Root layout for the German site.
 *
 * WHY THERE ARE THREE OF THESE. `<html lang>` can only be set in a root
 * layout, and it has to be right in the STATIC HTML. One shared root layout
 * meant every page hardcoded lang="en-AU" and a script patched /de and /ja
 * after hydration, so about 330 German and Japanese pages were served to any
 * crawler that does not run JS as Australian English. Route groups give each
 * language its own root layout without changing a single URL: (site), (de) and
 * (ja) are grouping folders and never appear in a path.
 *
 * Everything except the language is shared, in components/layout/RootDocument.
 */
// M3: explicit viewport export (Next.js 14 App Router recommendation)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // The page background (tailwind `canvas`), NOT the brand green.
  //
  // WHY (Jo, 28 Aug). theme-color tells a phone browser what to paint its own
  // toolbar with. Set to the brand green it painted roughly 120pt of Safari's
  // chrome in exactly the same colour as our 68px nav, with no line between
  // them, so the top of every page on a phone read as one green block about
  // three times the height of the real header. Measured: the page itself only
  // ever paints one green band, the nav, and it is 68px.
  //
  // Matching the page background lets the browser's chrome disappear into the
  // page, which is what it is there for.
  themeColor: '#F5F9F7',
}

export default function LocaleRootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="de-DE">{children}</RootDocument>
}
