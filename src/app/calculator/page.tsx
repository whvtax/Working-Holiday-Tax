import type { Metadata } from 'next'
import { CalculatorClient } from './CalculatorClient'

export const metadata: Metadata = {
  title: 'Tax Refund Calculator',
  description: 'Estimate your Australian tax refund as a Working Holiday Maker. Free, instant, no sign-up.',
}

export default function CalculatorPage() {
  return <CalculatorClient />
}
