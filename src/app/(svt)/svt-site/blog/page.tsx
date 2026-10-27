import { svtMeta } from '@/lib/svt/page-meta'
import { UI } from '@/lib/svt/i18n'
import { BlogHub } from '@/components/svt/pages/BlogHub'

export const metadata = svtMeta('en', '/blog', { title: UI.en.blog.metaTitle, description: UI.en.blog.metaDescription })

export default function SvtBlog() {
  return <BlogHub locale="en" />
}
