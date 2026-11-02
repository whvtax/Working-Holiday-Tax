/**
 * Italian category hub (ADR 013). Template logic lives in LocaleCategoryPage.
 * Only categories with at least one native guide exist; the others are a 404.
 * URL slugs are the English slugs.
 */
import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { catLabelIt } from '@/lib/category-labels'
import { SITE_URL } from '@/lib/constants'
import { getItalianGuides, itCategoryMeta, getItalianCategoryMeta } from '../../data'
import {
  LocalizedCategoryPage,
  buildCategoryMetadata,
  localizedCategoryStaticParams,
  type CategoryLocaleConfig,
} from '@/components/blog/LocaleCategoryPage'
import { LATIN_CATEGORY_STYLES } from '@/components/blog/newLocaleDefaults'

const cfg: CategoryLocaleConfig = {
  locale: 'it',
  basePath: '/it',
  ogLocale: 'it_IT',
  categoryMeta: itCategoryMeta,
  getCategoryMeta: getItalianCategoryMeta,
  getGuides: getItalianGuides,
  catLabel: catLabelIt,
  alternateLanguages: (slug) => {
    const other = slug === 'medicare-and-other' ? 'medicare' : slug
    return {
      'en-AU': `${SITE_URL}/blog/category/${slug}`,
      'de': `${SITE_URL}/de/blog/category/${other}`,
      'ja': `${SITE_URL}/ja/blog/category/${other}`,
      ...newLocaleLanguages(`/blog/category/${slug}`),
      'x-default': `${SITE_URL}/blog/category/${slug}`,
    }
  },
  categoryIntro: {},

  metaKeywords: (category) => [
    'Working Holiday Tax',
    category,
    ...["tax return Australia", "rimborso tasse Australia", "tasse Australia Working Holiday", "visto 417 Australia"],
  ],
  audienceName: "Titolari di visto Working Holiday in Australia (subclass 417 e 462)",

  homeLabel: "Home",
  blogLabel: 'Blog',
  breadcrumbAriaLabel: "Percorso di navigazione",
  articleCount: (n) => `${n} ${n === 1 ? 'articolo' : 'articoli'}`,
  coversHeading: "Cosa copre questa categoria",
  gridHeading: (label, n) => `Tutti gli articoli su ${label} (${n})`,
  readTimeLabel: (m) => `${m ?? ''} min di lettura`,
  readMoreLabel: "Leggi tutto",
  faqKickerLabel: "Domande frequenti",
  faqHeading: "Domande frequenti",
  otherCategoriesHeading: "Altre categorie",
  allArticlesLabel: "Tutti gli articoli →",

  styles: LATIN_CATEGORY_STYLES,
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return localizedCategoryStaticParams(cfg)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildCategoryMetadata(cfg, (await params).slug)
}

export default async function ItalianCategoryPage({ params }: Props) {
  return <LocalizedCategoryPage cfg={cfg} slug={(await params).slug} />
}
