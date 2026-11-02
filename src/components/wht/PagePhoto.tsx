import { IMAGE_DIR, PAGE_SCENE } from '@/lib/wht/images'
import { readyScene } from '@/lib/wht/images-server'
import styles from './PagePhoto.module.css'

type Lang = 'en' | 'de' | 'ja' | 'fr' | 'it' | 'es'

/** The one photo an inner page may have. Renders nothing until the scene's file exists: a page is complete without it. */
export function PagePhoto({ page, locale = 'en', className }: { page: string; locale?: Lang; className?: string }) {
  const sc = readyScene(PAGE_SCENE[page])
  if (!sc) return null
  return (
    <figure className={[styles.photo, className].filter(Boolean).join(' ')} data-scene={PAGE_SCENE[page]}>
      <img src={`${IMAGE_DIR}/${sc.file}`} width={sc.width} height={sc.height} alt={sc.alt[locale]} loading="lazy" decoding="async" />
    </figure>
  )
}
