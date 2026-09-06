'use client'
import { useEffect } from 'react'
// One design language for the whole admin. Imported here, at the /crm root, so
// every screen under it — Will included — reads the same tokens and the same
// --crm-fit scale knob. See the file's own header for what lives where.
import './crm-design.css'

// Auto-logout after 30 minutes of inactivity (no mouse/keyboard/touch).
const IDLE_MS = 30 * 60 * 1000
// (audit, 5 Sep) "Idle" means the PERSON is idle, not one tab. Jo normally has
// the Will chat and the CRM dashboard open in two tabs; the background tab's
// own 30-minute timer used to fire and log out BOTH tabs, because logout
// bumps the global revoked-before epoch. Activity in any tab now stamps a
// shared localStorage key, and every tab's timer resets on that write (the
// 'storage' event only fires in the OTHER tabs, so this can't loop) - so the
// idle timer tracks whichever tab was last touched, not each tab in isolation.
const ACTIVITY_KEY = 'crm_last_activity'
function IdleLogout() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.location.pathname === '/crm') return
    let timer: ReturnType<typeof setTimeout>
    const logout = async () => {
      try {
        // reason: 'idle' tells the logout route to drop only this browser's
        // session, not every device at once - see route.ts (audit, 5 Sep).
        await fetch('/api/crm/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason: 'idle' }),
        })
      } catch {}
      window.location.replace('/crm?timeout=1')
    }
    const bump = () => { clearTimeout(timer); timer = setTimeout(logout, IDLE_MS) }
    const reset = () => {
      bump()
      try { localStorage.setItem(ACTIVITY_KEY, String(Date.now())) } catch {}
    }
    const onStorage = (e: StorageEvent) => { if (e.key === ACTIVITY_KEY) bump() }
    const events = ['mousemove','mousedown','keydown','scroll','touchstart','click'] as const
    events.forEach(e => window.addEventListener(e, reset, { passive: true }))
    window.addEventListener('focus', reset)
    document.addEventListener('visibilitychange', reset)
    window.addEventListener('storage', onStorage)
    reset()
    return () => {
      clearTimeout(timer)
      events.forEach(e => window.removeEventListener(e, reset))
      window.removeEventListener('focus', reset)
      document.removeEventListener('visibilitychange', reset)
      window.removeEventListener('storage', onStorage)
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
