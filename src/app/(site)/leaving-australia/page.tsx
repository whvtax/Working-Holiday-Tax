import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Mark } from '@/components/wht/Type'
import { blocks } from '@/components/wht/Blocks'
import { WaButton } from '@/components/wht/WaButton'
import { guides as enGuides } from '@/app/(site)/blog/data'
import {
  LeavingAustraliaPage, LinkList, SRC, StepList, StepTable, leavingLanguages, makeGuides,
} from './LeavingAustraliaPage'

/*
 * EN hub: leaving Australia after a working holiday (plan 3 round 2, 24 Nov 2026).
 * Answer first, then before you fly, after you leave, the order, myGov, FAQ.
 * Facts: S/plan3/r16-facts.md (C1, E2, E4, E6, E8, E9, F1, F3, G2, H1, H4, H6, I1 to I3, J1, J2, K1),
 * r14 V1 to V9, r20 F5 and F6, r13. Approved wording only in the "with us" section.
 */

const WA = waUrl({ topic: 'tax-return', lang: 'en', detail: 'I am leaving Australia' })
const LIVE = new Set(enGuides.map(g => g.slug))
const G = makeGuides('', s => LIVE.has(s), '')

export const metadata: Metadata = {
  title: { absolute: 'Leaving Australia: tax return and super checklist (2026)' },
  description:
    'Leaving Australia after a working holiday? What to do before you fly and after you go: your tax return, super (DASP), bank account and myGov, in order.',
  keywords: [
    'leaving Australia tax return',
    'leaving Australia checklist working holiday',
    'tax return after leaving Australia',
    'what to do before leaving Australia tax',
    'claim super after leaving Australia',
    'DASP after leaving Australia',
    'close Australian bank account before leaving',
    'lodge tax return before leaving Australia',
    'working holiday leaving Australia super',
    'tax refund after leaving Australia',
  ],
  alternates: {
    canonical: `${SITE_URL}/leaving-australia`,
    languages: leavingLanguages(),
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-super.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/leaving-australia`,
    siteName: 'Working Holiday Tax',
    title: 'Leaving Australia: your tax return and super, in order',
    description: 'What to do before you fly, what is still open after you leave, and in which order.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-super.png`],
    card: 'summary_large_image',
    title: 'Leaving Australia: tax return and super, in order',
    description: 'Before you fly, after you leave, and what can wait.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const src = (href: string, text: string) => (
  <a href={href} target="_blank" rel="noopener" className={blocks.textLink}>{text}</a>
)

const faqs = [
  {
    question: 'Can I do my tax return before I leave Australia?',
    answer:
      'Only in one case. If you are leaving Australia permanently and will have no more Australian income apart from interest, dividends or royalties, the ATO accepts a return before the financial year ends on 30 June. Lodged yourself, it has to be on the paper form, and the ATO says early lodgements take 50 business days to process.\n\nEveryone else lodges from 1 July, from wherever they are. Nothing is lost by waiting.',
  },
  {
    question: 'Can I do my tax return after I have left Australia?',
    answer:
      'Yes. A return covers 1 July to 30 June and can be lodged from 1 July, from any country. If you lodge it yourself it is due by 31 October, and the ATO says most returns lodged online are processed within 10 business days. Any refund is paid into an Australian bank account.',
  },
  {
    question: 'Should I close my Australian bank account before I leave?',
    answer:
      'No, not until your refund and your super have landed. The ATO pays tax refunds only into an Australian bank account, and super the ATO holds only into an Australian account in your name or by cheque.\n\nIf the account is already closed, the payment comes back to the ATO through the Reserve Bank, which can take up to 10 days. With new Australian account details the ATO pays it again; without them it re-issues the refund by cheque, and it holds some cheque refunds for up to 90 days while it asks for bank details.',
  },
  {
    question: 'When can I claim my super after leaving Australia?',
    answer:
      'Once three things are true at the same time: your visa has ceased, by expiry or cancellation, you have left Australia, and you hold no other active Australian visa. You can start the ATO\'s online DASP application before you fly, but it can only be submitted after that. The ATO says a DASP is generally paid within 28 days of a completed application.',
  },
  {
    question: 'What happens to my super if I do not claim it?',
    answer:
      'It is not lost. Once it has been 6 months or more since you left Australia and your visa has ceased, your fund moves the balance to the ATO. You can claim it from the ATO at any time as a DASP, but the ATO pays it only to an Australian bank account in your name or by cheque, not by international transfer.',
  },
  {
    question: 'Do I need myGov after I leave Australia?',
    answer:
      'Not for us. We deal with the ATO directly, so you do not need myGov for us to prepare your tax return. The ATO\'s online DASP application does not use a myGov sign in either. You need myGov only to lodge yourself on myTax, and its SMS codes go only to an Australian mobile number.',
  },
  {
    question: 'Is my super claim the same as my tax refund?',
    answer:
      'No. They are two separate payments. A tax refund is tax over-withheld from your wages, paid by the ATO after you lodge a return. A DASP is the super your employers paid on top of your wages, released by each fund once your visa has ceased. Many working holiday makers have both.',
  },
  {
    question: 'Can my tax refund be paid into an overseas bank account?',
    answer:
      'No. The ATO pays tax refunds only into an Australian bank account. Super is different: a fund can pay a DASP by international money transfer if it offers one, though super the ATO already holds goes only to an Australian account or by cheque.',
  },
  {
    question: 'I left years ago without lodging. Is it too late?',
    answer:
      'No. A late return can still be lodged, and super left behind can still be claimed from the ATO. The ATO can charge a penalty for lodging late, but it says it generally does not apply penalties in isolated cases of late lodgment.',
  },
]

const MYGOV_GUIDES = G.list([
  { slug: 'mygov-problems-tax-return-super', label: 'myGov not working? Every problem, for tax and super' },
  { slug: 'mygov-sms-code-not-received-overseas', label: 'No myGov SMS code overseas' },
  { slug: 'mygov-account-locked-out', label: 'Locked out of myGov' },
  { slug: 'cant-link-ato-to-mygov', label: 'The ATO will not link to myGov' },
  { slug: 'myid-foreign-passport-working-holiday', label: 'myID with a foreign passport' },
  { slug: 'tax-return-without-mygov', label: 'Your tax return without myGov' },
  { slug: 'claim-super-without-mygov', label: 'Claiming your super without myGov' },
])

const GUIDES = G.list([
  { slug: 'tax-obligations-after-leaving-australia', label: 'What is still owed after you leave' },
  { slug: 'early-tax-return-leaving-australia', label: 'An early tax return before you leave' },
  { slug: 'how-to-lodge-tax-return-from-overseas', label: 'Lodging your tax return from overseas' },
  { slug: 'how-to-update-address-with-ato', label: 'Updating your address with the ATO' },
  { slug: 'tax-refund-closed-australian-bank-account', label: 'Refund with a closed Australian bank account' },
  { slug: 'tax-and-super-timeline-working-holiday', label: 'Every date for tax and super, 2026-27' },
  { slug: 'how-long-does-dasp-take', label: 'How long a DASP takes' },
  { slug: 'visa-still-active-cant-claim-super', label: 'Visa still active? Why the claim will not go through' },
  { slug: 'certify-documents-overseas-super-claim', label: 'Certifying documents for a super claim from overseas' },
  { slug: 'what-happens-to-unclaimed-super', label: 'What happens to super you never claim' },
  { slug: 'claim-super-if-coming-back-to-australia', label: 'Claiming super if you plan to come back' },
])

export default function LeavingAustraliaEnPage() {
  return (
    <LeavingAustraliaPage
      lang="en"
      inLanguage="en-AU"
      path="/leaving-australia"
      homeHref="/"
      crumb={{ home: 'Home', current: 'Leaving Australia', label: 'Breadcrumb' }}
      wa={WA}
      name="Leaving Australia: your tax return and super, in order"
      hero={{
        eyebrow: <>Leaving Australia &middot; Tax return &middot; Super</>,
        title: <>Leaving Australia: your <Mark>tax return and super</Mark>, in order</>,
        lead: <>Before you leave Australia, keep your Australian bank account open, update your address with the ATO and start your super claim. After you leave, lodge your tax return once the financial year has ended on 30 June, and submit your super claim (DASP) once your visa has ceased. With us you do not need myGov for either, and nothing is lost if you have already gone.</>,
        sub: <>Your tax return and your super are two separate claims on two timetables. The tax refund comes from the ATO and is paid only into an Australian bank account. Your super comes from each fund, generally within 28 days of a complete application, and a fund that offers international transfers can pay it overseas.</>,
        cta: 'Ask us before you fly',
        hint: 'See the order of steps',
        hintHref: '#order',
        note: 'Replies in about an hour.',
      }}
      sections={[
        {
          id: 'before-you-fly',
          title: 'What should you do before you leave Australia?',
          tone: 'pale',
          body: (
            <>
              <p className={blocks.text}>Six things, most of them a few minutes each, and all of them easier while you are still in Australia than from home.</p>
              <StepList items={[
                {
                  title: 'Keep your Australian bank account open.',
                  body: <>The ATO pays tax refunds only into an Australian bank account, and super the ATO holds only into an Australian account in your name or by cheque. Close it once everything has landed. If it is already closed: {G.link('tax-refund-closed-australian-bank-account', 'refund with a closed Australian bank account')}.</>,
                },
                {
                  title: 'Keep your last payslips and a list of your jobs.',
                  body: <>Every employer who paid you through a payroll reports your income to the ATO, so lost payslips are not a disaster. A list of where you worked and roughly when makes a missing job easy to spot, and it is how every super fund gets found.</>,
                },
                {
                  title: 'Update your address with the ATO.',
                  body: <>Letters, including your notice of assessment and any cheque, go to the address the ATO holds. How: {G.link('how-to-update-address-with-ato', 'updating your address with the ATO')}. If we prepare your return, we update your ATO address for you.</>,
                },
                {
                  title: 'Decide whether an early return applies to you.',
                  body: <>The ATO accepts a return before 30 June only if you are leaving permanently and will have no more Australian income apart from interest, dividends or royalties. Lodged yourself it has to be on paper, and the ATO says early lodgements take 50 business days to process. Everyone else lodges from 1 July. More: {G.link('early-tax-return-leaving-australia', 'an early tax return before you leave')}.</>,
                },
                {
                  title: 'Start your super claim.',
                  body: <>The ATO&apos;s online DASP application can be started and saved before you fly, and submitted once you have left and your visa has ceased. Where a fund holds $5,000 or more it may ask for certified copies of your ID, which is easier to arrange here than from overseas.</>,
                },
                {
                  title: 'Sort out how you sign in from overseas, if you want to use myGov yourself.',
                  body: <>myGov SMS codes go only to an Australian mobile number. If you will be overseas or without an Australian number, the ATO recommends myID, a passkey or an authenticator app instead. You do not need any of it for us.</>,
                },
              ]} />
              <p className={blocks.small}>
                Sources: ATO, {src(SRC.earlyLodge, 'lodge your tax return before leaving Australia')}, {src(SRC.fromOverseas, 'lodge from outside Australia')}, {src(SRC.dasp, 'DASP')} and {src(SRC.mygov, 'create a myGov account and link it to the ATO')}, checked November 2026.
              </p>
            </>
          ),
        },
        {
          id: 'after-you-leave',
          title: 'What is still open after you leave Australia?',
          body: (
            <>
              <p className={blocks.text}>Three things: the tax return for the year you left in, your super, and any super you have not claimed after six months. All three can be done from home.</p>
              <h3 className={blocks.cardTitle}>Your tax return, after 30 June</h3>
              <p className={blocks.text}>
                The financial year ends on 30 June. From 1 July you can lodge from any country, and if you lodge it yourself it is due by 31 October. The ATO says most returns lodged online are processed within 10 business days, and any refund goes into your Australian bank account. A return is needed if you had any income other than salary or wages as a working holiday maker, if your taxable income was $45,001 or more, or if you want to claim a deduction. How it works from overseas: our{' '}
                <Link href="/tax-return" className={blocks.textLink}>tax return page</Link> and {G.link('how-to-lodge-tax-return-from-overseas', 'lodging from overseas')}.
              </p>
              <h3 className={blocks.cardTitle}>Your super (DASP), once your visa has ceased</h3>
              <p className={blocks.text}>
                You can claim once your visa has ceased, by expiry or cancellation, you have left Australia and you hold no other active Australian visa. Each fund is its own claim, generally paid within 28 days of a complete application, and for working holiday makers 65% of the taxable component is withheld. For pay from 1 July 2026 your employer must get your last contribution to your fund within 7 business days of payday, with some exceptions, so check the fund shows it before you submit. Step by step:{' '}
                <Link href="/superannuation" className={blocks.textLink}>how to claim your superannuation</Link>. If the claim will not submit: {G.link('visa-still-active-cant-claim-super', 'visa still active')}.
              </p>
              <h3 className={blocks.cardTitle}>Super moved to the ATO, after 6 months</h3>
              <p className={blocks.text}>
                If you have not claimed once it has been 6 months or more since you left and your visa has ceased, your fund moves the balance to the ATO. It can still be claimed at any time as a DASP, but the ATO pays it only to an Australian bank account in your name or by cheque. More: {G.link('what-happens-to-unclaimed-super', 'what happens to unclaimed super')}.
              </p>
              <p className={blocks.small}>
                Sources: ATO, {src(SRC.progress, 'check the progress of your tax return')}, {src(SRC.dasp, 'DASP')}, {src(SRC.atoHeld, 'ATO-held super')} and {src(SRC.paydaySuper, 'about Payday Super')}, checked November 2026.
              </p>
            </>
          ),
        },
        {
          id: 'order',
          title: 'In what order should you do it?',
          tone: 'pale',
          body: (
            <>
              <p className={blocks.text}>Super first, because it can be started before you fly; the tax return when the year has ended; the bank account last.</p>
              <StepTable
                head={['When', 'What to do']}
                rows={[
                  { when: 'Before your last shift', what: 'List every job and keep your last payslips.' },
                  { when: 'Before you fly', what: 'Update your ATO address, keep your Australian bank account open, start and save the DASP application, and arrange certified ID if a fund holds $5,000 or more.' },
                  { when: 'Within 7 business days of your last payday', what: 'Your last super contribution should reach your fund (Payday Super, pay from 1 July 2026, with some exceptions).' },
                  { when: 'Once you have left and your visa has ceased', what: 'Submit your DASP application. Each fund pays its part separately, generally within 28 days of a complete application. Generally paid within 28 days of a complete application.' },
                  { when: 'From 1 July', what: 'Lodge the tax return for the year you left in. Due 31 October if you lodge it yourself.' },
                  { when: 'After lodging online', what: 'The ATO says most online returns are processed within 10 business days. Any refund goes into your Australian account.' },
                  { when: '6 months or more after leaving, visa ceased', what: 'Unclaimed super moves to the ATO. Still claimable, paid only to an Australian account or by cheque.' },
                  { when: 'Once everything has landed', what: 'Close your Australian bank account.' },
                ]}
                caption={<>Leaving permanently before 30 June with no more Australian income? The return can go in early on paper instead (50 business days, ATO). Every date for the year: {G.link('tax-and-super-timeline-working-holiday', 'the tax and super timeline')}.</>}
              />
            </>
          ),
        },
        {
          id: 'no-mygov',
          title: 'Do you need myGov after leaving Australia?',
          body: (
            <>
              <p className={blocks.text}>
                No. You do not need myGov for us to help: we deal with the ATO directly. The ATO&apos;s online DASP application does not use a myGov sign in either. It asks for your personal and passport details and an email address, and your tax file number is optional.
              </p>
              <p className={blocks.text}>
                myGov matters only if you want to lodge yourself on myTax, and most problems start with the SMS code, which goes only to an Australian mobile number. If you are already locked out, each case has its own guide:
              </p>
              <LinkList items={MYGOV_GUIDES} />
            </>
          ),
        },
        {
          id: 'with-us',
          title: 'How we can help',
          tone: 'amber',
          body: (
            <>
              <p className={blocks.text}>
                Tell us where you worked and when you leave. We prepare your{' '}
                <Link href="/tax-return" className={blocks.textLink}>tax return</Link> once the year has ended, update your ATO address, and for your{' '}
                <Link href="/superannuation" className={blocks.textLink}>super</Link> we find every fund linked to your tax file number and check the claim with you.
              </p>
              <p className={blocks.text}>
                You do not need myGov for us to help. We deal with the ATO directly. Your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO, and Working Holiday Tax operates under the supervision of a registered tax agent.
              </p>
              <div className={blocks.stack}>
                <WaButton href={WA} position="section" topic="tax-return" lang="en" size="md">Message us on WhatsApp</WaButton>
                <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Replies in about an hour.</p>
              </div>
            </>
          ),
        },
      ]}
      faqTitle="Questions people ask before and after leaving"
      faqs={faqs}
      guidesTitle="Go deeper on one step"
      guides={GUIDES}
      cta={{
        title: 'Ask us before you fly',
        text: 'Send us where you worked and the date you leave. We tell you what to do now and what can wait until you are home.',
        button: 'Message us on WhatsApp',
        note: 'Replies in about an hour.',
      }}
    />
  )
}
