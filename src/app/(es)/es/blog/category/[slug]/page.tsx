/**
 * Spanish category hub (ADR 013). Template logic lives in LocaleCategoryPage.
 * Only categories with at least one native guide exist; the others are a 404.
 * URL slugs are the English slugs.
 */
import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { catLabelEs } from '@/lib/category-labels'
import { SITE_URL } from '@/lib/constants'
import { getSpanishGuides, esCategoryMeta, getSpanishCategoryMeta } from '../../data'
import {
  LocalizedCategoryPage,
  buildCategoryMetadata,
  localizedCategoryStaticParams,
  type CategoryLocaleConfig,
} from '@/components/blog/LocaleCategoryPage'
import { LATIN_CATEGORY_STYLES } from '@/components/blog/newLocaleDefaults'

const cfg: CategoryLocaleConfig = {
  locale: 'es',
  basePath: '/es',
  ogLocale: 'es_ES',
  categoryMeta: esCategoryMeta,
  getCategoryMeta: getSpanishCategoryMeta,
  getGuides: getSpanishGuides,
  catLabel: catLabelEs,
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
    ...["devolución de impuestos Australia", "tax return Australia", "impuestos Australia working holiday", "visa 462 Australia"],
  ],
  audienceName: "Titulares de visa working holiday en Australia (subclass 462 y 417)",

  homeLabel: "Inicio",
  blogLabel: 'Blog',
  breadcrumbAriaLabel: "Ruta de navegación",
  articleCount: (n) => `${n} ${n === 1 ? 'artículo' : 'artículos'}`,
  coversHeading: "Qué cubre esta categoría",
  gridHeading: (label, n) => `Todos los artículos de ${label} (${n})`,
  readTimeLabel: (m) => `${m ?? ''} min de lectura`,
  readMoreLabel: "Leer más",
  faqKickerLabel: "Preguntas frecuentes",
  faqHeading: "Preguntas frecuentes",
  otherCategoriesHeading: "Otras categorías",
  allArticlesLabel: "Todos los artículos →",

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

export default async function SpanishCategoryPage({ params }: Props) {
  return <LocalizedCategoryPage cfg={cfg} slug={(await params).slug} />
}
