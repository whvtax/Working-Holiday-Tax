/**
 * Loads the live SVT library from the site code, read only.
 * In the site build the `@/` alias points at the site's src folder; in Ella's
 * own tests it points at the copy of the zip. Nothing is written back.
 */
import { LONG_EN } from '@/lib/svt/content/long/en'
import { BLOG_EN } from '@/lib/svt/content/blog-en'
import { GUIDES_EN } from '@/lib/svt/content/guides-en'
import { buildLibrary, type SourceArticle } from './library'

export function loadSvtLibrary(): SourceArticle[] {
  return buildLibrary({ long: LONG_EN, blog: BLOG_EN, guides: GUIDES_EN })
}
