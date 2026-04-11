'use client'
import { useEffect } from 'react'

// Auto-reload on ChunkLoadError (happens after new Vercel deployment)
function ChunkErrorHandler() {
  useEffect(() => {
    const handler = (event: ErrorEvent) => {
      if (
        event.message?.includes('ChunkLoadError') ||
        event.message?.includes('Loading chunk') ||
        event.message?.includes('Failed to fetch dynamically imported module')
      ) {
        window.location.reload()
      }
    }
    window.addEventListener('error', handler)
    return () => window.removeEventListener('error', handler)
  }, [])
  return null
}

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body > div > nav,
        body > div > footer { display: none !important; }
        a[href="#main-content"] { display: none !important; }
        .grain { display: none !important; }
        #main-content { margin: 0 !important; padding: 0 !important; display: block !important; }
        body { margin: 0 !important; padding: 0 !important; }
      `}</style>
      <ChunkErrorHandler />
      {children}
    </>
  )
}
