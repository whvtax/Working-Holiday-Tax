import { SVT_PUBLIC } from '@/lib/svt/brand-public'
import { GUIDES_EN, type GuideContent } from '@/lib/svt/content/guides-en'
import { BLOG_EN } from '@/lib/svt/content/blog-en'
import { homeEn } from '@/lib/svt/content/home-en'
import { guidesFor } from '@/lib/svt/content/guides-i18n'
import { blogFor } from '@/lib/svt/content/blog-i18n'
import { placeOf } from '@/lib/svt/library'
import { deadlineFact } from '@/lib/svt/deadline'
import { LONG_EN, longFor, type LongArticle } from '@/lib/svt/content/long/library'
import { AGENT_NAME, AGENT_TPB } from '@/lib/agent'

/**
 * llms.txt for studentvisatax.com.au: a plain summary for AI answer engines.
 * Built only from SVT content and the agent constants (never `@/lib/brand`),
 * so nothing of the other brand can appear in it (tested).
 */
export function buildSvtLlms(): string {
  const base = SVT_PUBLIC.siteUrl
  const line = (g: GuideContent, path: string) => {
    // Only topic pages cite an official source; price and process pages are about us.
    const src = placeOf(path.replace(/^\/(zh|vi)(?=\/)/, '').slice(1)) ? g.sources[0] : undefined
    const answer = g.short?.answer ?? g.meta.description
    return `- [${g.label}](${base}${path}): ${answer}${src ? ` (Source: ${src.label}, ${src.href}.)` : ''} Updated ${g.updated}.`
  }
  const longLine = (a: LongArticle, path: string) =>
    `- [${a.title}](${base}${path}): ${a.answer} (Source: ${a.sources[0]?.label ?? 'ATO'}, ${a.sources[0]?.href ?? 'https://www.ato.gov.au'}.) Updated ${a.updated}.`
  return [
    `# ${SVT_PUBLIC.name}`,
    '',
    '> Tax returns for international students and graduates in Australia on 500 and 485 visas, in English, Chinese and Vietnamese.',
    '',
    `- Price: $220 per return when all work was jobs with a TFN, $385 with ABN work. Both include GST.`,
    `- ${SVT_PUBLIC.name} operates under the supervision of a registered tax agent: ${AGENT_NAME}, Tax Agent Number ${AGENT_TPB}.`,
    '- Every return is reviewed and signed off by a registered tax agent before it is lodged with the ATO.',
    `- Guarantee: ${homeEn.guarantee.title.charAt(0).toLowerCase()}${homeEn.guarantee.title.slice(1)}. ${homeEn.guarantee.terms}`,
    `- Languages: English (${base}), Chinese (${base}/zh), Vietnamese (${base}/vi). Guides and the first articles also exist under /zh and /vi.`,
    `- Contact: WhatsApp, or ${SVT_PUBLIC.email}.`,
    '',
    '## Key facts for the 2025-26 financial year',
    '',
    '- The Australian financial year runs from 1 July to 30 June. 2025-26 is 1 July 2025 to 30 June 2026.',
    `- ${deadlineFact()}`,
    '- An overseas student enrolled in a course of 6 months or more may be an Australian resident for tax purposes.',
    '- Residents for tax purposes get the $18,200 tax-free threshold, or part of it in the year they arrive or leave.',
    '- Medicare levy: 2% for residents for tax purposes. A student who was not entitled to Medicare usually needs a Medicare Entitlement Statement from Services Australia to claim the exemption.',
    '- Super guarantee: 12% on top of wages. Super is claimed after leaving Australia, once the visa has ended, as a departing Australia superannuation payment (DASP).',
    '- National minimum wage from 1 July 2026: $26.44 an hour.',
    '',
    '## Guides',
    '',
    ...GUIDES_EN.map(g => line(g, `/${g.slug}`)),
    '',
    '## Articles',
    '',
    ...BLOG_EN.map(a => line(a, `/blog/${a.slug}`)),
    ...LONG_EN.map(a => longLine(a, `/blog/${a.slug}`)),
    '',
    ...(['zh', 'vi'] as const).flatMap(l => [
      l === 'zh' ? '## 中文 (Simplified Chinese)' : '## Tiếng Việt (Vietnamese)',
      '',
      ...guidesFor(l).map(g => line(g, `/${l}/${g.slug}`)),
      ...blogFor(l).map(a => line(a, `/${l}/blog/${a.slug}`)),
      ...longFor(l).map(a => longLine(a, `/${l}/blog/${a.slug}`)),
      '',
    ]),
  ].join('\n')
}
