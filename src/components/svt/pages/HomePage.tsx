import { SVT_PUBLIC, svtWhatsappUrl } from '@/lib/svt/brand-public'
import type { HomeCopy } from '@/lib/svt/content/home-en'
import { faqPage, jsonLd, svtOrganization, svtWebsite } from '@/lib/svt/jsonld'
import { UI, fill, type SvtLocale } from '@/lib/svt/i18n'
import { LinkButton } from '../Button'
import { ChatThread } from '../ChatThread'
import { Docket } from '../Docket'
import { Faq } from '../Faq'
import { ImageSlot } from '../ImageSlot'
import { Payslip } from '../Payslip'
import { PriceCheck } from '../PriceCheck'
import { PriceTag } from '../PriceTag'
import { Section } from '../Section'
import { TrustStrip } from '../TrustStrip'
import { LanguageSwitch } from '../LanguageSwitch'
import { Lead, Mark } from '../Type'
import styles from './HomePage.module.css'

/** Home page. Section order is locked (strategy doc and design canvas):
 *  hero, trust strip, price check, guarantee, flow, IMG-02, payslip,
 *  "Only student visas", questions, footer, sticky WhatsApp bar. */
export function HomePage({ locale, t }: { locale: SvtLocale; t: HomeCopy }) {
  const wa = svtWhatsappUrl(UI[locale].whatsappHello)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([svtOrganization(), svtWebsite(), faqPage(t.faq.items)]) }} />

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <h1 id="hero-title" className={styles.h1}>{t.hero.titleBefore}<Mark>{t.hero.titleMark}</Mark>{t.hero.titleAfter ?? ''}</h1>
            <Lead>{t.hero.lead}</Lead>
            <PriceTag {...t.hero.price} />
            <LinkButton href={wa} data-wa-pos="hero">{t.hero.cta}</LinkButton>
            <p className={styles.note}>{fill(UI[locale].noWhatsapp, { email: SVT_PUBLIC.email })}</p>
            <LanguageSwitch current={locale} path="/" />
          </div>
          <ImageSlot className={styles.heroImage} {...t.images.hero} tone="a" priority />
        </div>
      </section>

      <TrustStrip locale={locale} />

      <Section id="price" title={t.priceCheck.title} titleId="price-title">
        <PriceCheck locale={locale} />
      </Section>

      <Section tone="lime" title={t.guarantee.title} titleId="guarantee-title">
        <Docket rows={t.guarantee.docket} label={t.guarantee.docketLabel} />
        <p className={styles.guaranteeText}>{t.guarantee.terms}</p>
        <p className={styles.guaranteeSmall}>{t.guarantee.why}</p>
        <LinkButton href={wa} data-wa-pos="guarantee">{t.guarantee.cta}</LinkButton>
      </Section>

      <Section id="how" tone="pale" title={t.flow.title} titleId="how-title">
        <ChatThread steps={t.flow.steps} label={t.flow.label} />
        <p className={styles.note}>{t.flow.note}</p>
      </Section>

      <ImageSlot {...t.images.flow} tone="b" />

      <Section title={t.payslip.title} titleId="payslip-title">
        <p className={styles.note}>{t.payslip.lead}</p>
        <Payslip locale={locale} />
      </Section>

      <Section tone="pale" title={t.story.title} titleId="story-title" width="wide">
        <div className={styles.split}>
          <p className={styles.storyLead}>{t.story.lead}</p>
          <div>
            <ul className={styles.points}>
              {t.story.points.map(p => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </div>
        <p className={styles.guaranteeText}>{t.story.languages}</p>
      </Section>

      <Section id="questions" title={t.faq.title} titleId="questions-title">
        <Faq items={t.faq.items} group={`svt-home-faq-${locale}`} />
      </Section>
    </>
  )
}
