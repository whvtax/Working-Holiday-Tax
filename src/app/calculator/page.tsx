import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { CalculatorClient } from './CalculatorClient'

export const metadata: Metadata = {
  title: 'Tax Calculator for Working Holiday Visa Holders',
  description: 'Estimate your Australian tax refund as a working holiday maker. Free, instant calculator using the 2025-26 WHM tax rates - no sign-up required.',
  keywords: [
    'tax calculator Australia',
    'working holiday tax calculator',
    'WHV refund calculator',
    'backpacker tax estimator',
    '417 visa tax calculator',
    '462 visa tax calculator',
    'WHM tax rate calculator',
    'Australian tax refund estimator',
  ],
  alternates: { canonical: '/calculator' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/calculator`,
    siteName: 'Working Holiday Tax',
    title: 'Tax Calculator for Working Holiday Visa Holders',
    description: 'Estimate your Australian tax refund as a working holiday maker. Free, instant, no sign-up.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax Calculator for Working Holiday Visa Holders',
    description: 'Estimate your Australian tax refund. Free, instant, no sign-up.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'How accurate is this tax calculator?',
    answer: 'The calculator uses the 2025-26 working holiday maker tax rates and Australian resident tax rates. It provides an estimate based on the income and tax withheld you enter. Your actual refund may vary based on deductions, offsets, and other factors. For a precise calculation, we lodge your tax return for you.',
  },
  {
    question: 'What tax rates does the calculator use?',
    answer: 'For working holiday makers: 15% on first $45,000, 30% from $45,001 to $135,000, 37% from $135,001 to $190,000, and 45% above $190,000. For Australian residents: tax-free threshold up to $18,200, then 16% up to $45,000, 30% up to $135,000, 37% up to $190,000, and 45% above.',
  },
  {
    question: 'Where do I find my income and tax withheld?',
    answer: 'Both numbers appear on your PAYG payment summary or income statement, which your employer provides at the end of the financial year. You can also find them in your myGov account if you have one set up.',
  },
  {
    question: 'I am getting a refund, what next?',
    answer: 'Send us a message on WhatsApp. We prepare and lodge your tax return for you, ensuring you claim every deduction you are entitled to - which often means a bigger refund than this estimate.',
  },
  {
    question: 'I am showing tax owing, what should I do?',
    answer: 'Contact us as soon as possible. We will review your situation, identify any missed deductions, and lodge your return correctly. There are often ways to reduce or eliminate tax owing through proper deduction claims.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Calculator', item: `${SITE_URL}/calculator` },
  ],
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Working Holiday Tax Calculator',
  description: 'Free tax calculator for working holiday visa holders in Australia.',
  url: `${SITE_URL}/calculator`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'AUD',
  },
}

export default function CalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <CalculatorClient faqs={faqs} />
    </>
  )
}
