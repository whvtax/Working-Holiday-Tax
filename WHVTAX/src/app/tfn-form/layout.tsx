import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        a[href="#main-content"] { display: none !important; }
        .grain { display: none !important; }
        #main-content { display: contents; }
      `}</style>
      {children}
    </>
  )
}
