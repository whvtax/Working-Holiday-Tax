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
  useEffect(() => {
    // Set browser tab title for CRM
    if (typeof document !== 'undefined') {
      document.title = 'WHV Tax CRM'
    }
    // Add noindex meta tag dynamically (in case bot ignores robots.txt)
    if (typeof document !== 'undefined') {
      let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'robots'
        document.head.appendChild(meta)
      }
      meta.content = 'noindex, nofollow, noarchive, nosnippet'
    }
  }, [])

  return (
    <>
      <style>{`
        body > div > nav,
        body > div > footer { display: none !important; }
        a[href="#main-content"] { display: none !important; }
        .grain { display: none !important; }
        #main-content { margin: 0 !important; padding: 0 !important; display: block !important; }
        body { margin: 0 !important; padding: 0 !important; }
        /* Scale entire CRM 10% larger on desktop for better readability (mobile stays unchanged) */
        @media (min-width: 769px) {
          html { zoom: 1.1; }
        }
      `}</style>
      <ChunkErrorHandler />
      {children}
    </>
  )
}
