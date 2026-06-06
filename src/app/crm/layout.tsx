'use client'
import { useEffect } from 'react'

// Auto-logout after 30 minutes of inactivity (no mouse/keyboard/touch).
const IDLE_MS = 30 * 60 * 1000
function IdleLogout() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.location.pathname === '/crm') return
    let timer: ReturnType<typeof setTimeout>
    const logout = async () => {
      try { await fetch('/api/crm/logout', { method: 'POST' }) } catch {}
      window.location.replace('/crm?timeout=1')
    }
    const reset = () => { clearTimeout(timer); timer = setTimeout(logout, IDLE_MS) }
    const events = ['mousemove','mousedown','keydown','scroll','touchstart','click'] as const
    events.forEach(e => window.addEventListener(e, reset, { passive: true }))
    window.addEventListener('focus', reset)
    document.addEventListener('visibilitychange', reset)
    reset()
    return () => {
      clearTimeout(timer)
      events.forEach(e => window.removeEventListener(e, reset))
      window.removeEventListener('focus', reset)
      document.removeEventListener('visibilitychange', reset)
    }
  }, [])
  return null
}

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
      `}</style>
      <ChunkErrorHandler />
      <IdleLogout />
      {children}
    </>
  )
}
