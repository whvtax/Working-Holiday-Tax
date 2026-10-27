import { BlogArticle, blogMetadata, blogStaticParams } from '@/components/svt/pages/blog-route'

// Every article is generated at build time; any other slug is a 404.
export const dynamicParams = false
// Rebuilt daily: the deadline article says when its date has passed.
export const revalidate = 86400
export const generateStaticParams = blogStaticParams('en')
export const generateMetadata = ({ params }: { params: Promise<{ slug: string }> }) => blogMetadata('en', params)

export default function SvtBlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogArticle locale="en" params={params} />
}
