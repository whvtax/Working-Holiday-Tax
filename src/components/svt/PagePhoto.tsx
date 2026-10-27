import { IMAGE_DIR, PAGE_SCENE } from '@/lib/svt/images'
import { readyScene } from '@/lib/svt/images-server'
import type { SvtLocale } from '@/lib/svt/i18n'
import styles from './PagePhoto.module.css'

/** The one photo an article may have (decision 005). Renders nothing until
 *  the scene's file exists: a page is complete without it. */
export function PagePhoto({ page, locale, className }: { page: string; locale: SvtLocale; className?: string }) {
  const sc = readyScene(PAGE_SCENE[page])
  if (!sc) return null
  return (
    <figure className={[styles.photo, className].filter(Boolean).join(' ')} data-scene={PAGE_SCENE[page]}>
      <img src={`${IMAGE_DIR}/${sc.file}`} width={sc.width} height={sc.height} alt={sc.alt[locale]} loading="lazy" decoding="async" />
    </figure>
  )
}
