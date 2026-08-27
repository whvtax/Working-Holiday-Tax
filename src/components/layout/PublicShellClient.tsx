'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

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
  // The TFN, ABN and Super applications are conversion forms on exactly the same
  // footing as /tax-form and were simply never listed here, so all three (and
  // their /de and /ja variants) ended a focused form with the full 22-link
  // footer — an escape route at the point of submission.
  const formRoutes = [
    '/tax-form', '/de/tax-form', '/ja/tax-form',
    '/tax-residency', '/de/tax-residency', '/ja/tax-residency',
    '/tfn-form', '/de/tfn-form', '/ja/tfn-form',
    '/abn-form', '/de/abn-form', '/ja/abn-form',
    '/super-form', '/de/super-form', '/ja/super-form',
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
    </>
  )
}
