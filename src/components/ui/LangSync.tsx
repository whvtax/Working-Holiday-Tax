'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Keeps <html lang> correct during client-side (SPA) navigation.
 * The initial server HTML already has the right lang (root layout reads the
 * `x-locale` request header set by middleware). This only handles in-app route
 * changes, where the shared root layout does not re-render. Replaces the old
 * 200ms setInterval polling hack.
 */
export function LangSync() {
  const pathname = usePathname() || '/'
  useEffect(() => {
    const isDE = pathname === '/de' || pathname.startsWith('/de/')
    const isJA = pathname === '/ja' || pathname.startsWith('/ja/')
    document.documentElement.lang = isJA ? 'ja' : isDE ? 'de' : 'en-AU'
  }, [pathname])
  return null
}
