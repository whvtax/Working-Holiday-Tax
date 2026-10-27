/** Blog articles in every language: English structure + each language's
 *  words, exactly like the guides (see guides-i18n.ts). */
import { BLOG_EN, type ArticleContent } from './blog-en'
import { BLOG_ZH } from './blog-zh'
import { BLOG_VI } from './blog-vi'
import { checkTexts, localize, type GuideText } from './guides-i18n'
import type { SvtLocale } from '@/lib/svt/i18n'

const TEXTS: Readonly<Record<Exclude<SvtLocale, 'en'>, Readonly<Record<string, GuideText>>>> = { zh: BLOG_ZH, vi: BLOG_VI }

export const checkBlogText = (locale: Exclude<SvtLocale, 'en'>) => checkTexts(BLOG_EN, TEXTS[locale])

export function blogFor(locale: SvtLocale): readonly ArticleContent[] {
  return locale === 'en' ? BLOG_EN : localize(BLOG_EN, TEXTS[locale])
}

export const articleFor = (locale: SvtLocale, slug: string) => blogFor(locale).find(a => a.slug === slug)
