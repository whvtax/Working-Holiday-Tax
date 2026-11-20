import type { Metadata } from 'next'
import ResidencyStep from '@/components/ui/ResidencyStep'
import { SvtFormProvider } from '@/components/svt/form-brand-svt'
import { SvtFormClosed } from '@/components/svt/SvtFormClosed'

// Read at build time, like the form page: closed until SVT_FORMS_ENABLED=true.
const FORMS_ENABLED = process.env.SVT_FORMS_ENABLED === 'true'

// The last step of the tax form, in Portuguese (decision 017).
export const metadata: Metadata = { title: 'Residência fiscal', robots: { index: false, follow: false } }

export default function SvtTaxResidencyPage() {
  if (!FORMS_ENABLED) return <SvtFormClosed locale={'en'} />
  return <SvtFormProvider><ResidencyStep lang={'pt'} /></SvtFormProvider>
}
