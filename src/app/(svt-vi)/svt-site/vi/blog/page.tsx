import { svtMeta } from '@/lib/svt/page-meta'
import { UI } from '@/lib/svt/i18n'
import { BlogHub } from '@/components/svt/pages/BlogHub'

export const metadata = svtMeta('vi', '/blog', { title: UI.vi.blog.metaTitle, description: UI.vi.blog.metaDescription })

export default function SvtBlog() {
  return <BlogHub locale="vi" />
}
