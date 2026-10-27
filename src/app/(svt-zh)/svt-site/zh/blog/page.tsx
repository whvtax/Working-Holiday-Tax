import { svtMeta } from '@/lib/svt/page-meta'
import { UI } from '@/lib/svt/i18n'
import { BlogHub } from '@/components/svt/pages/BlogHub'

export const metadata = svtMeta('zh', '/blog', { title: UI.zh.blog.metaTitle, description: UI.zh.blog.metaDescription })

export default function SvtBlog() {
  return <BlogHub locale="zh" />
}
