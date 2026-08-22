'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { SecurityNotice } from '@/components/ui/SecurityNotice'

export default function PublicShellClient({
  children,
  nav,
  footer,
}: {
  children: React.ReactNode
  nav: React.ReactNode
  footer: React.ReactNode
}) {
  const pathname = usePathname()
  const isCrm = pathname?.startsWith('/crm')
  // Tax-form: hide only the footer (not the top nav) - a focused form
  // shouldn't offer easy escape routes at the bottom (blog links, social
  // icons, other pages), but the top nav/logo staying visible still gives
  // people a sense of "I'm on a real, navigable site" if they want it.
  // The tax-residency route is a step of that same form, so it matches.
  const formRoutes = [
    '/tax-form', '/de/tax-form', '/ja/tax-form',
    '/tax-residency', '/de/tax-residency', '/ja/tax-residency',
  ]
  const isTaxForm = !!pathname && formRoutes.includes(pathname)

  // The two-stage intake (/start + /complete/<token>) has been removed: there is
  // one intake now, the full /tax-form, and it keeps its top nav.
  const hideFooter = isCrm || isTaxForm
  const hideNav = isCrm

  // Scroll to top on every page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      {!hideNav && nav}
      {children}
      {!hideFooter && footer}
      {!isCrm && <SecurityNotice />}
    </>
  )
}
