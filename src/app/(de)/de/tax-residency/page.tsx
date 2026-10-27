import type { Metadata } from 'next'
import ResidencyStep from '@/components/ui/ResidencyStep'
import { WhtFormProvider } from '@/components/ui/form-brand-wht'

// Not a public page any more: this is a step of the tax form that happens to
// have its own URL. Kept out of the sitemap and marked noindex so it isn't
// treated as standalone site content.
export const metadata: Metadata = {
  title: 'Steuerlicher Wohnsitz',
  robots: { index: false, follow: false },
}

export default function TaxResidencyPage() {
  return <WhtFormProvider><ResidencyStep lang="de" /></WhtFormProvider>
}
