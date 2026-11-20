import type { Metadata } from 'next'
import { Suspense } from 'react'
import { FormClient } from '@/app/(site)/start/FormClient'
import { SvtFormProvider } from '@/components/svt/form-brand-svt'
import { SvtFormClosed } from '@/components/svt/SvtFormClosed'

// The tax form in Italian (decision 017). Student Visa Tax has a site in English,
// Chinese and Vietnamese only, so this page sits inside the English shell and
// only the form itself is in Italian. Reached from the link we send on
// WhatsApp, never from search.
export const metadata: Metadata = { title: 'Modulo per la dichiarazione dei redditi', robots: { index: false, follow: false } }

// Decision 003: the form only works once SVT_FORMS_ENABLED=true opens the two
// API routes on the SVT host. Until then, WhatsApp first. Read at build time.
const FORMS_ENABLED = process.env.SVT_FORMS_ENABLED === 'true'

export default function SvtTaxFormPage() {
  if (!FORMS_ENABLED) return <SvtFormClosed locale={'en'} />
  return <SvtFormProvider><Suspense fallback={null}><FormClient defaultLang={'it'} /></Suspense></SvtFormProvider>
}
