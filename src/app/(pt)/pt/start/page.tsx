import type { Metadata } from 'next'
import { Suspense } from 'react'
import { WhtFormProvider } from '@/components/ui/form-brand-wht'
import { FormClient } from '@/app/(site)/start/FormClient'

// The tax form in Portuguese (decision 017). Reached from the link Will sends on
// WhatsApp, never from search: noindex, not in the sitemap, no hreflang.
export const metadata: Metadata = {
  title: 'Formulário da declaração de imposto',
  alternates: { canonical: '/pt/start' },
  robots: { index: false, follow: true },
}

export default function TaxFormPage() {
  return <WhtFormProvider><Suspense fallback={null}><FormClient defaultLang="pt" /></Suspense></WhtFormProvider>
}
