import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Return Form',
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        nav, footer, header { display: none !important; }
        #main-content { display: contents; }
        body { margin: 0; padding: 0; }
        a[href="#main-content"] { display: none !important; }
        .grain { display: none !important; }
      `}</style>
      {children}
    </>
  )
}
