import type { Metadata } from 'next'
import { svtWhatsappUrl } from '@/lib/svt/brand-public'
import { LinkButton } from '@/components/svt/Button'
import { Section } from '@/components/svt/Section'
import { TaxForm } from '@/components/svt/TaxForm'
import { Lead, Mark } from '@/components/svt/Type'

// Reached from the link we send on WhatsApp, never from search.
export const metadata: Metadata = {
  title: 'Your tax form',
  description: 'The short form we send you on WhatsApp after you have paid. It takes a few minutes.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/tax-form' },
}

// Decision 003: the form only works once SVT_FORMS_ENABLED=true opens the two
// API routes on the SVT host. Until then this page sends people to WhatsApp
// instead of showing a form that cannot be submitted. Read at build time.
const FORMS_ENABLED = process.env.SVT_FORMS_ENABLED === 'true'

export default function SvtTaxFormPage() {
  return (
    <Section>
      <h1 style={{ fontSize: 'var(--svt-h1)', lineHeight: 1.06, fontWeight: 700, letterSpacing: '-0.025em' }}>Your <Mark>tax form</Mark></h1>
      {FORMS_ENABLED ? (
        <>
          <Lead>About 10 minutes. Have your passport, your TFN and an Australian bank statement ready.</Lead>
          <TaxForm />
        </>
      ) : (
        <>
          <Lead>Message us on WhatsApp first. We confirm your price, then send you the link to your form.</Lead>
          <LinkButton href={svtWhatsappUrl('Hi, I would like to fill in my tax form.')}>Message us on WhatsApp</LinkButton>
        </>
      )}
    </Section>
  )
}
