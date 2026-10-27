import { homeEn } from '@/lib/svt/content/home-en'
import { homeZh } from '@/lib/svt/content/home-zh'
import { homeVi } from '@/lib/svt/content/home-vi'
import { guidesFor } from '@/lib/svt/content/guides-i18n'
import { UI, localePath, type SvtLocale } from '@/lib/svt/i18n'
import { Faq } from '../Faq'
import { Section } from '../Section'
import { Mark } from '../Type'
import { LanguageSwitch } from '../LanguageSwitch'

const HOME = { en: homeEn, zh: homeZh, vi: homeVi } as const

/** The home page questions first, then each guide's own questions, with a
 *  link to the guide for the full answer. */
export function QuestionsPage({ locale }: { locale: SvtLocale }) {
  const t = UI[locale]
  const groups = [
    { title: t.questionsPage.basics, items: HOME[locale].faq.items, href: '' },
    ...guidesFor(locale).filter(g => g.faq?.length).map(g => ({ title: g.label, items: g.faq!, href: localePath(locale, `/${g.slug}`) })),
  ]
  return (
    <>
      {/* No FAQPage here: each question is marked up once, on the page that answers it (home or its guide). */}
      <Section>
        <h1 style={{ fontSize: 'var(--svt-h1)', lineHeight: 1.06, fontWeight: 700, letterSpacing: '-0.025em' }}>{t.questionsPage.title}<Mark>{t.questionsPage.titleMark}</Mark></h1>
        <LanguageSwitch current={locale} path="/questions" />
      </Section>
      {groups.map((grp, i) => (
        <Section key={grp.title} tone={i % 2 ? 'pale' : 'white'} title={grp.title} titleId={`q-${i}`}>
          <Faq items={grp.items} group={`svt-questions-${locale}-${i}`} openFirst={false} />
          {grp.href ? <p><a href={grp.href}>{t.guide.readFullGuide}<span className="svt-visually-hidden">: {grp.title}</span></a></p> : null}
        </Section>
      ))}
    </>
  )
}

export const questionsMeta = (locale: SvtLocale) => ({ title: UI[locale].questionsPage.metaTitle, description: UI[locale].questionsPage.metaDescription })
