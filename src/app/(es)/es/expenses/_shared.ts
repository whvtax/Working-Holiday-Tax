import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'

/**
 * Textos y metadatos compartidos por el índice de gastos y las siete páginas
 * por trabajo en español (/es/expenses/...). Cada página aporta su propio
 * contenido; aquí solo vive lo que es igual en todas.
 */

export const UI_BASE = {
  ctaLabel: 'Escríbenos por WhatsApp',
  ctaSub: 'Respondemos en aproximadamente una hora.',
  guaranteeHeading:
    'Nuestra garantía: si tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes dinero a la ATO, se aplica la tarifa completa. La garantía cubre solo las declaraciones con ingresos con TFN.',
  faqHeading: 'Preguntas frecuentes sobre este tema',
  guidesHeading: 'Para seguir leyendo',
  otherJobs: '¿Otro trabajo? Aquí están todos los oficios.',
  servicesLabel: 'Más en el sitio',
  wrongLabel: 'Lo declararon y no se podía',
  missedLabel: 'No lo declararon y sí se podía',
  disclaimer:
    'Esta es información general, no asesoría fiscal personal. Lo que puedes deducir depende de tus empleadores, de tus comprobantes y de cómo trabajaste en realidad. Cuando presentas tu declaración con nosotros, revisamos tu situación punto por punto.',
  hubHref: '/es/expenses',
}

export const HOME_CRUMB = { name: 'Inicio', item: '/es' }
export const HUB_CRUMB = { name: 'Deducciones', item: '/es/expenses' }

interface MetaInput {
  /** Ruta sin prefijo de idioma, por ejemplo '/expenses/fifo'. */
  route: string
  title: string
  description: string
  keywords: string[]
  ogTitle: string
  ogDescription: string
}

export function esMetadata(m: MetaInput): Metadata {
  const esPath = `/es${m.route}`
  return {
    title: { absolute: m.title },
    description: m.description,
    keywords: m.keywords,
    alternates: {
      canonical: esPath,
      languages: {
        'en-AU': m.route,
        de: `/de${m.route}`,
        ja: `/ja${m.route}`,
        ...newLocaleLanguages(m.route),
        'x-default': m.route,
      },
    },
    openGraph: {
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
      type: 'website',
      locale: 'es_LA',
      url: `${SITE_URL}${esPath}`,
      siteName: 'Working Holiday Tax',
      title: m.ogTitle,
      description: m.ogDescription,
    },
    twitter: {
      images: [`${SITE_URL}/og-image.png`],
      card: 'summary_large_image',
      title: m.ogTitle,
      description: m.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
      },
    },
  }
}
