'use client'

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

  return (
    <>
      {!isCrm && nav}
      {children}
      {!isCrm && footer}
    </>
  )
}
