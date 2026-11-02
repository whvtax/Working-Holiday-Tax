import Link from 'next/link'
import { Accordion } from '@/components/ui/Accordion'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { ReviewsGate } from '@/components/ui/ReviewsGate'
import type { WaLang } from '@/lib/wa'
import { Hero } from './Hero'
import { Section } from './Section'
import { Lead } from './Type'
import { WaButton } from './WaButton'
import { PagePhoto } from './PagePhoto'
import { blocks } from './Blocks'
import styles from './AboutBlocks.module.css'

export interface AboutChapter { stage: string; title: string; body: string }

/** All the words on the page. The three language pages pass their own copy; the structure is shared so they cannot drift apart. */
export interface AboutCopy {
  lang: WaLang
  wa: string
  homeHref: string
  homeLabel: string
  crumbsLabel: string
  crumbLabel: string
  kicker: string
  h1: React.ReactNode
  lead: string
  ctaHero: string
  contactHref: string
  contactLabel: string
  replyNote: string
  yearEyebrow: string
  yearTitle: string
  yearIntro: string
  chapters: AboutChapter[]
  whyEyebrow: string
  whyTitle: string
  whyParas: string[]
  guarantee: string
  guaranteeNote: string
  talkEyebrow: string
  talkTitle: string
  talkP1: string
  talkP2: React.ReactNode
  ctaSection: string
  reviewsEyebrow: string
  reviewsTitle: string
  faqEyebrow: string
  faqTitle: string
  faqIntro: string
  faqs: { question: string; answer: string }[]
  closingEyebrow: string
  closingTitle: string
  closingText: string
  ctaFooter: string
}

export function AboutView({ t }: { t: AboutCopy }) {
  return (
    <>
      <div className={blocks.underHeader}>
        <nav aria-label={t.crumbsLabel} className={styles.crumbs}>
          <Link href={t.homeHref}>{t.homeLabel}</Link>
          <span aria-hidden="true" className={styles.sep}>/</span>
          <span aria-current="page">{t.crumbLabel}</span>
        </nav>
        <Hero eyebrow={t.kicker} title={t.h1}>
          <div className="about-lead"><Lead>{t.lead}</Lead></div>
          <WaButton href={t.wa} position="hero" topic="general" lang={t.lang}>{t.ctaHero}</WaButton>
          <Link href={t.contactHref} className={blocks.textLink}>{t.contactLabel}</Link>
          <p className={styles.note}>{t.replyNote}</p>
        </Hero>
      </div>

      <PagePhoto page="about" locale={t.lang} />

      <Section tone="pale" eyebrow={t.yearEyebrow} title={t.yearTitle} titleId="about-year-title">
        <p className={`${blocks.text} ${blocks.muted}`}>{t.yearIntro}</p>
        <ol className={styles.chapters}>
          {t.chapters.map((c, i) => (
            <li key={i} className={styles.chapter}>
              <p className={styles.stage}>{c.stage}</p>
              <h3 className={styles.chapterTitle}>{c.title}</h3>
              {c.body.split('\n\n').map((para, j) => (
                <p key={j} className={blocks.text}>{para}</p>
              ))}
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow={t.whyEyebrow} title={t.whyTitle} titleId="about-why-title">
        {t.whyParas.map((p, i) => <p key={i} className={blocks.text}>{p}</p>)}
        <div className={blocks.palePanel}>
          <p className={blocks.statement}>{t.guarantee}</p>
          <p className={`${blocks.text} ${blocks.muted}`}>{t.guaranteeNote}</p>
        </div>
      </Section>

      <Section tone="pale" eyebrow={t.talkEyebrow} title={t.talkTitle} titleId="about-talk-title">
        <p className={blocks.text}>{t.talkP1}</p>
        <p className={blocks.text}>{t.talkP2}</p>
        <WaButton href={t.wa} position="section" topic="general" lang={t.lang} size="md">{t.ctaSection}</WaButton>
      </Section>

      {/* Hidden entirely when the reviews feed is empty, so the heading never stands alone over blank space. */}
      <ReviewsGate>
        <Section eyebrow={t.reviewsEyebrow} title={t.reviewsTitle} titleId="about-reviews-title">
          <GoogleReviewsServer lang={t.lang} />
        </Section>
      </ReviewsGate>

      <Section tone="pale" eyebrow={t.faqEyebrow} title={t.faqTitle} titleId="about-faq-title">
        <p className={`${blocks.text} ${blocks.muted}`}>{t.faqIntro}</p>
        <Accordion items={t.faqs} />
      </Section>

      <Section tone="forest" eyebrow={t.closingEyebrow} title={t.closingTitle} titleId="about-cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>{t.closingText}</p>
        <WaButton href={t.wa} position="footer" topic="general" lang={t.lang} tone="light">{t.ctaFooter}</WaButton>
      </Section>

      <MobileCta href={t.wa} lang={t.lang} topic="general" variant="neutral" />
    </>
  )
}
