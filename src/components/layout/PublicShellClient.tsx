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
  // The admin (Jo, 20 Nov): /crm, /will, /mia and /atlas.
  const isCrm = !!pathname && /^\/(?:crm|atlas|will|mia|control)(?:\/|$)/.test(pathname)
  // Conversion forms hide BOTH the footer and the top green nav bar (Jo,
  // 30 Aug: "remove the green bar on this form"). The bar was kept before to give a
  // sense of "a real, navigable site", but on a focused form filled from a
  // phone it is one more thing above the card and one more way out; the form's
  // own header carries the brand. The tax-residency route is a step of that
  // same form, so it matches. TFN, ABN and Super are conversion forms on
  // exactly the same footing as /tax-form (with their /de and /ja variants).
  //
  // The tax form and its residency step exist in nine languages (decision
  // 017): /es /fr /it /pt /zh /vi + the two slugs were added on 18 Nov 2026.
  // The super form exists in en, de and ja only; its other entries are listed
  // so that, if one is ever added, it hides the nav and footer like its twins.
  const formRoutes = [
    '/start', '/de/start', '/ja/start', '/fr/start', '/it/start', '/es/start', '/pt/start', '/zh/start', '/vi/start',
    '/y8vwp4bf7', '/de/y8vwp4bf7', '/ja/y8vwp4bf7', '/fr/y8vwp4bf7', '/it/y8vwp4bf7', '/es/y8vwp4bf7', '/pt/y8vwp4bf7', '/zh/y8vwp4bf7', '/vi/y8vwp4bf7',
    '/rh84sez58', '/de/rh84sez58', '/ja/rh84sez58', '/fr/rh84sez58', '/it/rh84sez58', '/es/rh84sez58',
  ]
  const isTaxForm = !!pathname && formRoutes.includes(pathname)

  // The two-stage intake (/start + /complete/<token>) has been removed: there is
  // one intake now, the full /tax-form, and it keeps its top nav.
  const hideFooter = isCrm || isTaxForm
  const hideNav = isCrm || isTaxForm

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
