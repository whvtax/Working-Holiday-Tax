import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { waUrl } from '@/lib/wa'
import { ContactView, type ContactCopy } from '@/components/wht/ContactBlocks'
import { Mark } from '@/components/wht/Type'
import { WA_NUMBER, EMAIL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact us: a real person replies',
  description: 'Message us on WhatsApp and a real person replies, usually within about an hour during business hours. No myGov, no Australian ID, no payslips needed.',
  keywords: [
    'contact working holiday tax',
    'backpacker tax help',
    'backpacker tax help Australia',
    'working holiday visa support',
    'working holiday tax refund help',
    'TFN help',
    'TFN application help Australia',
    'WhatsApp working holiday tax help',
    'tax help after leaving Australia',
    'claim Australian tax refund from UK',
    'claim Australian tax refund from Germany',
    'claim Australian tax refund from Japan',
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
    languages: {
      'en-AU': `${SITE_URL}/contact`,
      'de': `${SITE_URL}/de/contact`,
      'ja': `${SITE_URL}/ja/contact`,
      ...newLocaleLanguages('/contact'),
      'x-default': `${SITE_URL}/contact`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    title: 'Contact Working Holiday Tax',
    description: 'WhatsApp is the fastest way to reach us. A real person replies, usually within about an hour during business hours.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'en_AU',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Contact Working Holiday Tax',
    description: 'Message us on WhatsApp. A real person replies, usually within about an hour.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'contact', lang: 'en' })

/**
 * The four things that stop somebody sending the message.
 *
 * Taken from what people actually open a chat with, not from what a marketing
 * page would guess. Each one is answered in the first three words and then in a
 * complete paragraph, because a half answer here costs a conversation.
 */
const blockers: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: 'Can you help me if I have already left Australia?',
    // Blank lines split the answer into paragraphs at the render below. The
    // JSON-LD still uses the raw string, so the structured data is unchanged.
    a: 'Yes, and a lot of our work is exactly that. A return for a year that has already ended can be lodged from anywhere, and superannuation can only be claimed once you have left and your visa has lapsed.\n\nOne thing to know early: the ATO can only pay a tax refund into an Australian bank account, while super can be paid overseas. Tell us if you have already closed yours.',
  },
  {
    q: 'Do I need a myGov account?',
    a: 'No. You will never log into myGov, link an Australian ID or work out which form is which. We deal with the ATO directly.\n\nIf you already tried and got stuck at the identity check, that changes nothing.',
  },
  {
    q: 'Do I need my payslips?',
    a: 'No, and there is nothing to gather before you message. What your employers withheld and reported is visible to us through the ATO, so if you have nothing at all, write anyway.',
    link: { href: '/about', label: 'Why we start from the ATO record' },
  },
  {
    q: 'Is this legitimate?',
    a: 'Your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. The terms you would be agreeing to are published in full on our client agreement, and the reviews on our Google listing are from working holiday makers we have worked with.',
    link: { href: '/client-agreement', label: 'Read the client agreement' },
  },
]

const FAQS = [
  {
    question: 'How quickly will you reply?',
    answer: 'During business hours, Monday to Friday, 9am to 6pm, we usually reply within about an hour. Outside those hours we get back to you first thing the next working morning. If your question needs checking first, we say so straight away.',
  },
  {
    question: 'Is there a fee just to ask a question?',
    answer: 'Asking is free, and you can ask as much as you like before deciding anything. The service is a flat fee, never a percentage of your refund, confirmed with you on WhatsApp before any work begins.',
  },
  {
    question: 'What language will you reply in?',
    answer: 'The one you write to us in. English, German, Japanese or whatever language you would rather explain your situation in, and that is what comes back.',
  },
  {
    question: 'Do I need to send documents straight away?',
    answer: 'No. Send the question first and nothing else. We answer it, and if there is work worth doing we tell you what it is and what it costs before anything starts.\n\nDocuments come later, once you have decided to go ahead, and we tell you which ones and how to send them securely.',
  },
  {
    question: 'What if I do not get a refund?',
    answer: 'Our guarantee: if your tax refund is less than our fee, we refund the difference after your Notice of Assessment. If there is no refund, or you owe money to the ATO instead, the full fee applies. Not every working holiday year produces a refund, and where yours looks unlikely we would rather say so early than take the work on and hope.',
  },
  {
    question: 'Can you help me from the UK, Germany or Japan?',
    answer: 'Yes, and those are the three places most of our clients message us from once they are home. An Australian tax return, a superannuation claim and anything still open with the ATO can all be handled from another country, entirely online.',
  },
]

const contactPageLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/contact#webpage`,
  url: `${SITE_URL}/contact`,
  name: 'Contact Working Holiday Tax',
  description: 'Message us on WhatsApp and a real person replies, usually within about an hour during business hours.',
  inLanguage: 'en-AU',
  isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.contact-lead'] },
  mainEntity: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#business`,
    name: 'Working Holiday Tax',
    url: SITE_URL,
    email: EMAIL,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: `+${WA_NUMBER}`,
        email: EMAIL,
        areaServed: 'AU',
        availableLanguage: ['en', 'de', 'ja'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
    ],
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
  ],
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'en-AU',
  mainEntity: [...blockers.map(b => ({ question: b.q, answer: b.a })), ...FAQS.map(f => ({ question: f.question, answer: f.answer }))]
    .map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
}

const copy: ContactCopy = {
  lang: 'en',
  wa: WA,
  email: EMAIL,
  mailtoHref: `mailto:${EMAIL}?subject=Tax%20question%20from%20website`,
  homeHref: "/",
  homeLabel: "Home",
  crumbsLabel: "Breadcrumb",
  crumbLabel: "Contact",
  kicker: "Get in touch",
  h1: <>Message us on <Mark>WhatsApp</Mark></>,
  lead: "A real person reads it and replies, usually within about an hour during business hours.",
  ctaHero: "Open WhatsApp →",
  hours: "Monday to Friday, 9am to 6pm",
  blockersEyebrow: "Before you ask",
  blockersTitle: "The four things people check first",
  blockers,
  otherEyebrow: "Other ways",
  otherTitle: "If WhatsApp does not suit you",
  otherIntro: "Email and the social accounts work too, just more slowly.",
  emailLabel: "Email",
  hoursTitle: "Business hours",
  faqEyebrow: "Common questions",
  faqTitle: "Everything else people ask",
  faqs: FAQS,
  closingEyebrow: "Whenever you are ready",
  closingTitle: "Send the question. That is the whole first step.",
  closingText: "Where you worked, roughly when, and whether you have left Australia. That is enough for us to tell you what is worth chasing.",
  ctaFooter: "Message us on WhatsApp →",
}

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <ContactView t={copy} />
    </>
  )
}
