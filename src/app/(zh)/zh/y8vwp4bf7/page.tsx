import type { Metadata } from 'next'
import ResidencyStep from '@/components/ui/ResidencyStep'
import ResidencyFixPanel from '@/components/ui/ResidencyFixPanel'
import { WhtFormProvider } from '@/components/ui/form-brand-wht'

// A step of the tax form that has its own URL (Simplified Chinese, decision 017). Kept out
// of the sitemap and marked noindex so it isn't treated as site content.
export const metadata: Metadata = {
  title: '税务居民身份',
  robots: { index: false, follow: false },
}

export default function TaxResidencyPage() {
  return <WhtFormProvider><ResidencyStep lang="zh" /><ResidencyFixPanel lang="zh" /></WhtFormProvider>
}
