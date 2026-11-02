// Enlaces a guías del blog. Una guía en español solo se enlaza cuando su slug está
// en LIVE_ES_GUIDES (publicada y revisada). Mientras tanto se enlaza la guía en
// inglés, y el texto lo avisa con "(en inglés)". La lista sale de los datos de los
// chunks (todas las guías con cuerpo nativo), no se mantiene a mano.
import { getSpanishGuideSlugs } from './blog/data'

export const LIVE_ES_GUIDES: ReadonlySet<string> = new Set<string>(getSpanishGuideSlugs())

export function isLiveEsGuide(slug: string): boolean {
  return LIVE_ES_GUIDES.has(slug)
}

export function guideHref(slug: string): string {
  return isLiveEsGuide(slug) ? `/es/blog/${slug}` : `/blog/${slug}`
}

export function guideText(slug: string, text: string): string {
  return isLiveEsGuide(slug) ? text : `${text} (en inglés)`
}
