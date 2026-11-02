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
  // Conversion forms hide BOTH the footer and the top green nav bar (Jo,
  // 30 Aug: "תסיר את הפס הירוק הזה בטופס"). The bar was kept before to give a
  // sense of "a real, navigable site", but on a focused form filled from a
  // phone it is one more thing above the card and one more way out; the form's
  // own header carries the brand. The tax-residency route is a step of that
  // same form, so it matches. TFN, ABN and Super are conversion forms on
  // exactly the same footing as /tax-form (with their /de and /ja variants).
  //
  // French, Italian and Spanish (ADR 013): there is no form UI in these
  // languages yet (formStrings.ts is not translated in phase 1), so their pages
  // send people to the ENGLISH form paths above. /fr/start, /it/start, /es/start
  // and the other form slugs under those prefixes deliberately do not exist.
  // They are listed anyway so that, if one is ever added, it hides the
  // nav and footer like its de/ja twin instead of showing them on a form.
  const formRoutes = [
    '/start', '/de/start', '/ja/start', '/fr/start', '/it/start', '/es/start',
    '/y8vwp4bf7', '/de/y8vwp4bf7', '/ja/y8vwp4bf7', '/fr/y8vwp4bf7', '/it/y8vwp4bf7', '/es/y8vwp4bf7',
    '/vukjw4byf', '/de/vukjw4byf', '/ja/vukjw4byf', '/fr/vukjw4byf', '/it/vukjw4byf', '/es/vukjw4byf',
    '/3cw5w5hcx', '/de/3cw5w5hcx', '/ja/3cw5w5hcx', '/fr/3cw5w5hcx', '/it/3cw5w5hcx', '/es/3cw5w5hcx',
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
