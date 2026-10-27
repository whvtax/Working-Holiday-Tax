import type { Metadata } from 'next'
import { Suspense } from 'react'
import { FormClient } from '@/app/(site)/tax-form/FormClient'
import { SvtFormProvider } from '@/components/svt/form-brand-svt'
import { SvtFormClosed } from '@/components/svt/SvtFormClosed'

// The same tax form as the WHT form (Jo, 27 Oct), in SVT colours and
// words. Reached from the link we send on WhatsApp, never from search.
export const metadata: Metadata = { title: 'Tax form', robots: { index: false, follow: false } }

// Decision 003: the form only works once SVT_FORMS_ENABLED=true opens the two
// API routes on the SVT host. Until then, WhatsApp first. Read at build time.
const FORMS_ENABLED = process.env.SVT_FORMS_ENABLED === 'true'

export default function SvtTaxFormPage() {
  if (!FORMS_ENABLED) return <SvtFormClosed locale={'vi'} />
  return <SvtFormProvider><Suspense fallback={null}><FormClient defaultLang={'vi'} /></Suspense></SvtFormProvider>
}
