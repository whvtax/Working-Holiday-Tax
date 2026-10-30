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
  const formRoutes = [
    '/start', '/de/start', '/ja/start',
    '/y8vwp4bf7', '/de/y8vwp4bf7', '/ja/y8vwp4bf7',
    '/vukjw4byf', '/de/vukjw4byf', '/ja/vukjw4byf',
    '/3cw5w5hcx', '/de/3cw5w5hcx', '/ja/3cw5w5hcx',
    '/rh84sez58', '/de/rh84sez58', '/ja/rh84sez58',
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
