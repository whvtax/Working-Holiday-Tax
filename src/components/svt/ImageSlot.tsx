import { IMAGE_DIR } from '@/lib/svt/images'
import { readyImage } from '@/lib/svt/images-server'
import styles from './ImageSlot.module.css'

/**
 * A photograph slot. Every slot has an id (IMG-01, IMG-02, ...) that matches
 * src/lib/svt/images.ts and the image prompts document. When its files are in
 * public/svt-assets/img/ the photo is shown; until then a placeholder with
 * the same shape (so swapping in the photo moves nothing on the page).
 * Server component: the files are checked at build time.
 */
export function ImageSlot({ id, subject, alt, tone = 'a', priority = false, className }: {
  id: string; subject: string; alt: string; tone?: 'a' | 'b'; priority?: boolean; className?: string
}) {
  const ready = readyImage(id)
  if (!ready) {
    return (
      <figure className={[styles.slot, styles[tone], className].filter(Boolean).join(' ')} data-image-slot={id} aria-hidden="true">
        {/* The slot label is for us while an image is missing; customers never see it. */}
        {process.env.NODE_ENV !== 'production' ? <figcaption className={styles.caption}>{id}: {subject}</figcaption> : null}
      </figure>
    )
  }
  const { mobile, desktop } = ready
  return (
    <figure className={[styles.slot, styles.photo, className].filter(Boolean).join(' ')} data-image={id}>
      <picture>
        {desktop && <source media="(min-width: 1024px)" srcSet={`${IMAGE_DIR}/${desktop.file}`} width={desktop.width} height={desktop.height} />}
        <img
          src={`${IMAGE_DIR}/${mobile.file}`} width={mobile.width} height={mobile.height} alt={alt}
          className={styles.img} decoding="async"
          loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'}
        />
      </picture>
    </figure>
  )
}
