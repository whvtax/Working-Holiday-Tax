import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { CalculatorClient } from './CalculatorClient'
import { MobileCta } from '@/components/ui/MobileCta'

export const metadata: Metadata = {
  title: { absolute: 'Working Holiday Tax Refund Calculator (2025-26 Rates)' },
  description:
    'Estimate your Australian tax refund and what your super is worth after the 65% DASP tax. Current 417 and 462 rates, indicative only.',
  keywords: [
    'working holiday tax refund calculator',
    'working holiday tax refund calculator Australia',
    'backpacker tax refund calculator Australia',
    'Australian tax refund calculator working holiday',
    '417 visa tax refund calculator',
    '462 visa tax refund calculator',
    'how much tax refund will I get Australia',
    'tax back calculator Australia working holiday',
    'working holiday tax calculator',
    'WHM tax rate calculator',
    'Australian tax refund estimator',
    'super refund calculator DASP',
  ],
  alternates: {
    canonical: '/calculator',
    languages: {
      'en': '/calculator', 'en-AU': '/calculator',
      'de': '/de/calculator',
      'ja': '/ja/calculator',
      'x-default': '/calculator',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/calculator`,
    siteName: 'Working Holiday Tax',
    title: 'Working Holiday Tax Refund Calculator (2025-26 Rates)',
    description: 'An indicative refund figure plus your super after the 65% DASP tax, on current 417 and 462 rates.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Working Holiday Tax Refund Calculator',
    description: 'An indicative refund figure plus your super after the 65% DASP tax.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'I have the figure. Can I just lodge it myself?',
    answer:
      'You can, and lodging really is the easy part. What an estimate cannot do is change the figure, because it is arithmetic on the numbers you already have.\n\nThree judgements decide the real result, and none is a field on this page: which residency position is true for you, whether the Medicare levy should ever have been charged, and what your line of work is entitled to deduct.',
  },
  {
    question: 'How accurate is this tax calculator?',
    answer:
      'It is accurate arithmetic on the figures you type, and nothing more. It applies the 2025-26 working holiday maker and Australian resident rates to the income and withholding you enter. Treat the number as a starting point rather than a final answer.',
  },
  {
    question: 'What tax rates does the calculator use?',
    answer:
      'For working holiday makers on a 417 or 462 visa it applies 15% on the first $45,000, 30% from $45,001 to $135,000, 37% from $135,001 to $190,000 and 45% above $190,000, with no tax free threshold.\n\nFor Australian tax residents it applies the tax free threshold up to $18,200, then 16% up to $45,000, 30% up to $135,000, 37% up to $190,000 and 45% above that. Which applies to you is a judgement about your circumstances, not a setting.',
  },
  {
    question: 'Why does the calculator not include the Medicare levy?',
    answer:
      'Because for most people using it the levy should not be there at all. The Medicare levy is a separate 2% of taxable income, and most working holiday makers from countries without a reciprocal health care agreement are entitled to have it removed through an exemption certificate.\n\nIncluding it by default would understate the refund for the majority, so it is handled in the review instead, where your entitlement can be checked.',
  },
  {
    question: 'The calculator says I owe tax. Is that the end of it?',
    answer:
      'Usually not. A figure showing tax owing almost always means income that had little or no tax withheld against it, such as ABN work, or missing deductions, because there is nowhere to enter them.\n\nDeductions reduce taxable income and can turn an amount owing into a refund, so it is worth getting the position checked rather than assuming the number is final.',
  },
  {
    question: 'Can you use this calculator after you have gone home to the UK, Germany or Japan?',
    answer:
      'Yes. Your Australian tax position is decided by the income you earned in Australia and the visa you held while you earned it, not by where you live now.\n\nThe calculator works the same from London, Berlin or Tokyo, and a tax return can be lodged from anywhere. What changes once you have left is that your super also becomes claimable through DASP.',
  },
  {
    question: 'What does the calculator do with the superannuation figure?',
    answer:
      'It applies the DASP withholding rate to the balance you enter and shows what would reach your account. For anyone who has ever held a 417 or 462 visa that rate is 65% on the taxable component, so a $10,000 balance pays out about $3,500.\n\nSuper is a separate claim from your tax return, payable only once you have left Australia and your visa has expired or been cancelled.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'en-AU',
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

// No `offers` block. Price never appears on the public site, in copy or in
// schema, and the calculator is no longer positioned as the free product.
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Working Holiday Tax Refund Calculator',
  description:
    'An indicative Australian tax refund and DASP superannuation estimate for working holiday visa holders, on 2025-26 rates.',
  url: `${SITE_URL}/calculator`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  inLanguage: 'en-AU',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/calculator#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/calculator`,
}

export default function CalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <CalculatorClient faqs={faqs} />
      <MobileCta href={waUrl({ topic: 'calculator', lang: 'en' })} lang="en" topic="calculator" />
    </>
  )
}
