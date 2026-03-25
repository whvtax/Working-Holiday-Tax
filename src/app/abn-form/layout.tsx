import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ABN Form',
  robots: { index: false, follow: false }, // hidden from search engines
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
