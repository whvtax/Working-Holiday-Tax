import Link from 'next/link'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import type { WaLang } from '@/lib/wa'
import { Hero, heroStyles } from './Hero'
import { Section } from './Section'
import { Lead } from './Type'
import { WaButton } from './WaButton'
import { PagePhoto } from './PagePhoto'
import { blocks } from './Blocks'
import styles from './ContactBlocks.module.css'

export interface ContactBlocker { q: string; a: string; link?: { href: string; label: string } }

/** All the words on the page. The structure is shared so en, de and ja cannot drift apart. */
export interface ContactCopy {
  lang: WaLang
  wa: string
  email: string
  mailtoHref: string
  homeHref: string
  homeLabel: string
  crumbsLabel: string
  crumbLabel: string
  kicker: string
  h1: React.ReactNode
  lead: string
  ctaHero: string
  hours: string
  blockersEyebrow: string
  blockersTitle: string
  blockers: ContactBlocker[]
  otherEyebrow: string
  otherTitle: string
  otherIntro: string
  emailLabel: string
  hoursTitle: string
  faqEyebrow: string
  faqTitle: string
  faqs: { question: string; answer: string }[]
  closingEyebrow: string
  closingTitle: string
  closingText: string
  ctaFooter: string
}

const igPath = 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'
const ttPath = 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z'

export function ContactView({ t }: { t: ContactCopy }) {
  return (
    <>
      <div className={blocks.underHeader}>
        <nav aria-label={t.crumbsLabel} className={styles.crumbs}>
          <Link href={t.homeHref}>{t.homeLabel}</Link>
          <span aria-hidden="true" className={styles.sep}>/</span>
          <span aria-current="page">{t.crumbLabel}</span>
        </nav>
        <Hero eyebrow={t.kicker} title={t.h1}>
          <div className="contact-lead"><Lead>{t.lead}</Lead></div>
          <WaButton href={t.wa} position="hero" topic="contact" lang={t.lang}>{t.ctaHero}</WaButton>
          <p className={heroStyles.note}>{t.hours}</p>
        </Hero>
      </div>

      <PagePhoto page="contact" locale={t.lang} />

      <Section tone="pale" eyebrow={t.blockersEyebrow} title={t.blockersTitle} titleId="contact-blockers-title">
        <div className={styles.cards}>
          {t.blockers.map((b, i) => (
            <div key={i} className={blocks.card}>
              <h3 className={blocks.cardTitle}>{b.q}</h3>
              {b.a.split("\n\n").map((para, j) => <p key={j} className={styles.cardP}>{para}</p>)}
              {b.link ? <Link href={b.link.href} className={blocks.textLink}>{b.link.label} →</Link> : null}
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow={t.otherEyebrow} title={t.otherTitle} titleId="contact-other-title">
        <p className={`${blocks.text} ${blocks.muted}`}>{t.otherIntro}</p>
        <address className={styles.address}>
          <a href={t.mailtoHref} className={styles.option}>
            <span className={styles.optionLabel}>{t.emailLabel}</span>
            <span className={styles.optionDetail}>{t.email}</span>
          </a>
          <div className={styles.social}>
            <a href="https://instagram.com/workingholidaytax" target="_blank" rel="noopener noreferrer" className={styles.option}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={igPath} /></svg>
              <span className={styles.optionLabel}>Instagram</span>
            </a>
            <a href="https://www.tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer" className={styles.option}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={ttPath} /></svg>
              <span className={styles.optionLabel}>TikTok</span>
            </a>
          </div>
        </address>
        <div className={blocks.palePanel}>
          <p className={styles.hoursTitle}>{t.hoursTitle}</p>
          <p className={blocks.text}>{t.hours}</p>
        </div>
      </Section>

      <Section tone="pale" eyebrow={t.faqEyebrow} title={t.faqTitle} titleId="contact-faq-title">
        <Accordion items={t.faqs} />
      </Section>

      <Section tone="forest" eyebrow={t.closingEyebrow} title={t.closingTitle} titleId="contact-cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>{t.closingText}</p>
        <WaButton href={t.wa} position="footer" topic="contact" lang={t.lang} tone="light">{t.ctaFooter}</WaButton>
      </Section>

      <MobileCta href={t.wa} lang={t.lang} topic="contact" />
    </>
  )
}
