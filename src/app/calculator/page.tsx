import type { Metadata } from 'next'
import { CalculatorClient } from './CalculatorClient'

export const metadata: Metadata = {
  title: 'Tax calculator for Working Holiday Visa',
  description: 'Estimate your Australian tax refund as a Working Holiday Maker. Free, instant, no sign-up.',
  alternates: { canonical: '/calculator' },
}

export default function CalculatorPage() {
  return <CalculatorClient />
}
