import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { waUrl } from '@/lib/wa'
import { AboutView, type AboutCopy } from '@/components/wht/AboutBlocks'
import { Mark } from '@/components/wht/Type'
import { blocks } from '@/components/wht/Blocks'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About us: we only do 417 and 462 tax',
  description: 'Working holiday tax is the only thing we do. Every client is on a 417 or a 462 visa. Here is the year we see, from the first payslip to the flight home.',
  keywords: [
    'working holiday tax specialists',
    'backpacker tax help Australia',
    'who is working holiday tax',
    'is working holiday tax legit',
    'working holiday tax reviews',
    '417 462 tax specialists',
    'working holiday visa tax help',
    'tax help for backpackers Australia',
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
    languages: {
      'en-AU': `${SITE_URL}/about`,
      'de': `${SITE_URL}/de/about`,
      'ja': `${SITE_URL}/ja/about`,
      ...newLocaleLanguages('/about'),
      'x-default': `${SITE_URL}/about`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    title: 'About Working Holiday Tax',
    description: 'One kind of client only: working holiday makers on 417 and 462 visas. The year we see, from the first payslip to the flight home.',
    url: `${SITE_URL}/about`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'en_AU',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'About Working Holiday Tax',
    description: 'Working holiday tax is the only thing we do. Every client is on a 417 or a 462.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WA = waUrl({ topic: 'general', lang: 'en' })

/**
 * The story is deliberately the reader's year, not a company history.
 *
 * Everything on this page has to be literally true, and the only year we can
 * describe truthfully in detail is the one the visitor lived. An invented
 * founder narrative would read better for about four seconds and then be a lie
 * on the page a customer trusts most. Where a real fact would carry more weight
 * than the narrative, there is a JO marker asking for it rather than a guess.
 */
const chapters = [
  {
    stage: 'Week one',
    title: 'You arrived with a plan that covered about a fortnight',
    body: 'A hostel, a SIM, a bank account and a job as soon as possible. A tax file number was somewhere on that list. Nobody explained the Australian tax year.',
  },
  {
    stage: 'Your first payslips',
    title: 'The first job started before the number came through',
    // Blank line splits the chapter into two paragraphs at the render below.
    body: 'Without a tax file number on file, an employer must withhold at the top rate rather than the fifteen percent a working holiday maker normally pays, so those first weeks are missing close to half.\n\nThat money does not come back by itself.',
  },
  {
    stage: 'By Christmas',
    title: 'Four employers, half of them casual, none of them explaining anything',
    body: 'A hostel job, a cafe, a warehouse for three weeks, something you left without a final payslip. The Australian tax year ends in June, not December.\n\nLosing the payslips does not matter: everything your employers reported is visible to us through the ATO.',
  },
  {
    stage: 'The 88 days',
    title: 'If you did them, you drove a long way to do them',
    body: 'Somewhere west, or north, or three hours past a town you had never heard of.\n\nAccommodation came out of your wages before you saw them, the pay slips looked different from the city ones, and it is the part of the year people are least confident about.',
  },
  {
    stage: 'The flight home',
    title: 'You left, and the money stayed',
    body: 'Superannuation can only be claimed once you have left Australia and the visa has lapsed, so yours may still be with a fund you do not remember choosing. Tax withheld at a higher rate in those first weeks is reconciled when a return is assessed, and the outcome depends on your year.',
  },
]

const faqs = [
  {
    question: 'Who do you actually work with?',
    answer: 'Working holiday makers, and nobody else. Every client we have is in Australia on a 417 or a 462 visa, or was and has since gone home. We do not take on Australian residents, students, sponsored workers or businesses.',
  },
  {
    question: 'Can you help me if I have already left Australia?',
    answer: 'Yes, and a large share of our work is exactly that. Superannuation can only be claimed after you have left and your visa has lapsed, and a finished year can be lodged from anywhere, so everything is handled remotely.',
  },
  {
    question: 'Do I need my payslips?',
    answer: 'No. What your employers withheld and reported is visible to us through the ATO, so we work from that record rather than paperwork from a job you left eight months ago. If something you tell us does not match what an employer reported, we deal with the difference.',
  },
  {
    question: 'What happens if there is no refund at the end of it?',
    answer: 'Our guarantee: if your tax refund is less than our fee, we refund the difference after your Notice of Assessment. If there is no refund, or you owe money to the ATO instead, the full fee applies. Not every working holiday year produces one, and we would rather tell you early than take the work on and hope.',
  },
]

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/about#webpage`,
  url: `${SITE_URL}/about`,
  name: 'About Working Holiday Tax',
  description: 'Working holiday tax is the only thing we do. Every client is on a 417 or a 462 visa.',
  inLanguage: 'en-AU',
  mainEntity: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.about-lead'] },
}

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
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}` },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
  ],
}

const copy: AboutCopy = {
  lang: 'en',
  wa: WA,
  homeHref: "/",
  homeLabel: "Home",
  crumbsLabel: "Breadcrumb",
  crumbLabel: "About",
  kicker: "About us",
  h1: (
    <>
      You landed with a plan.<br />Nobody mentioned <Mark>the tax.</Mark>
    </>
  ),
  lead: "Working holiday tax is the only thing we do. If you recognise the year below, it may be worth having your tax and super position reviewed.",
  ctaHero: "Ask us anything →",
  contactHref: "/contact",
  contactLabel: "Other ways to reach us →",
  replyNote: "A real person replies, usually within about an hour during business hours.",
  yearEyebrow: "The year",
  yearTitle: "What does a working holiday year look like to us?",
  yearIntro: "Five things happen to almost everybody on a 417 or a 462, and four of them cost money that can usually be recovered afterwards.",
  chapters,
  whyEyebrow: "Why we exist",
  whyTitle: "Why do we only work with working holiday makers?",
  whyParas: [
    "Every client we have is on a 417 or a 462, so the things that decide your refund are not unusual cases we have to go and read about. They are what we do all day.",
    "A general accountant meets a backpacker a few times a year, in July, between two hundred ordinary returns.",
    "The 417 and 462 rate schedule, the residency position that has to be properly reviewed rather than assumed, the Medicare levy exemption that depends on which passport you hold, a superannuation claim filed from a bedroom in Manchester or Osaka eleven months after you left: for us that is a Tuesday.",
    "Anyone can press submit. The work happens before that: going through your year, working out what is true about it rather than what is quickest to tick, and then lodging it.",
  ],
  guarantee: "Our guarantee: if your tax refund is less than our fee, we refund the difference after your Notice of Assessment. If there is no refund, or you owe money to the ATO instead, the full fee applies.",
  guaranteeNote: "Not every working holiday year produces a refund, and we will tell you if yours is unlikely to.",
  talkEyebrow: "Talking to us",
  talkTitle: "How do you get hold of us?",
  talkP1: "WhatsApp. Not a bot, not a ticket number, not a form that promises five to seven business days. You can ask a single question and leave it there.",
  talkP2: (
    <>
      You need no myGov account, no Australian ID and no payslips to start, whether you are still in Australia or have been home for two years. The{' '}
      <Link href="/contact" className={blocks.textLink}>contact page</Link>{' '}
      covers what language the answer comes back in and what happens next.
    </>
  ),
  ctaSection: "Message us on WhatsApp →",
  reviewsEyebrow: "In their own words",
  reviewsTitle: "What working holiday makers say",
  faqEyebrow: "FAQs",
  faqTitle: "Questions people ask before they message",
  faqIntro: "Anything else, ask it on WhatsApp. It is quicker than reading.",
  faqs,
  closingEyebrow: "Whenever you are ready",
  closingTitle: "Tell us about your year",
  closingText: "Where you worked, roughly when, and whether you have left. That is enough for us to tell you what is worth chasing.",
  ctaFooter: "Message us on WhatsApp →",
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutView t={copy} />
    </>
  )
}
