/**
 * French category hub (ADR 013). Template logic lives in LocaleCategoryPage.
 * Only categories with at least one native guide exist; the others are a 404.
 * URL slugs are the English slugs.
 */
import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { catLabelFr } from '@/lib/category-labels'
import { SITE_URL } from '@/lib/constants'
import { getFrenchGuides, frCategoryMeta, getFrenchCategoryMeta } from '../../data'
import {
  LocalizedCategoryPage,
  buildCategoryMetadata,
  localizedCategoryStaticParams,
  type CategoryLocaleConfig,
} from '@/components/blog/LocaleCategoryPage'
import { LATIN_CATEGORY_STYLES } from '@/components/blog/newLocaleDefaults'

const cfg: CategoryLocaleConfig = {
  locale: 'fr',
  basePath: '/fr',
  ogLocale: 'fr_FR',
  categoryMeta: frCategoryMeta,
  getCategoryMeta: getFrenchCategoryMeta,
  getGuides: getFrenchGuides,
  catLabel: catLabelFr,
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
    ...["tax return Australie PVT", "remboursement d'impôts Australie", "impôts Australie visa vacances-travail", "visa 417 Australie"],
  ],
  audienceName: "Titulaires d'un visa vacances-travail en Australie (subclass 417 et 462)",

  homeLabel: "Accueil",
  blogLabel: 'Blog',
  breadcrumbAriaLabel: "Fil d'Ariane",
  articleCount: (n) => `${n} ${n === 1 ? 'article' : 'articles'}`,
  coversHeading: "Ce que couvre cette catégorie",
  gridHeading: (label, n) => `Tous les articles ${label} (${n})`,
  readTimeLabel: (m) => `${m ?? ''} min de lecture`,
  readMoreLabel: "Lire la suite",
  faqKickerLabel: "Questions fréquentes",
  faqHeading: "Questions fréquentes",
  otherCategoriesHeading: "Autres catégories",
  allArticlesLabel: "Tous les articles →",

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

export default async function FrenchCategoryPage({ params }: Props) {
  return <LocalizedCategoryPage cfg={cfg} slug={(await params).slug} />
}
