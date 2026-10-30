import { svtWhatsappUrl } from '@/lib/svt/brand-public'

/**
 * The 404 page for the Chinese and Vietnamese Student Visa Tax sites, in the
 * reader's own language. Same layout and colours as the English 404
 * (src/app/global-not-found.tsx). Server only.
 */
const COPY = {
  zh: {
    title: '找不到这个页面',
    body: '你要找的页面不存在。我们带你回到首页。',
    home: '返回首页',
    contact: '联系我们',
    wa: '你好，我想咨询报税的问题。',
    prefix: '/zh',
  },
  vi: {
    title: 'Không tìm thấy trang này',
    body: 'Trang bạn đang tìm không tồn tại. Hãy quay lại trang chủ nhé.',
    home: 'Về trang chủ',
    contact: 'Liên hệ chúng tôi',
    wa: 'Xin chào, tôi muốn hỏi về thuế.',
    prefix: '/vi',
  },
} as const

export function NotFoundSvt({ locale }: { locale: 'zh' | 'vi' }) {
  const t = COPY[locale]
  const ink = '#12161F'
  const btn = { display: 'inline-flex', alignItems: 'center', minHeight: 46, padding: '0 22px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 13.5 } as const
  return (
    <main style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', color: ink }}>
      <div style={{ maxWidth: 440, padding: '48px 20px', textAlign: 'center' }}>
        <p aria-hidden="true" style={{ fontWeight: 900, fontSize: 'clamp(60px,15vw,120px)', lineHeight: 1, margin: '0 0 16px', color: 'rgba(18,22,31,0.07)' }}>404</p>
        <h1 style={{ fontSize: 30, lineHeight: 1.2, margin: '0 0 12px' }}>{t.title}</h1>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#4A5160', margin: '0 0 28px' }}>{t.body}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          <a href={t.prefix} style={{ ...btn, background: ink, color: '#ffffff' }}>{t.home} →</a>
          <a href={svtWhatsappUrl(t.wa)} target="_blank" rel="noopener noreferrer" style={{ ...btn, border: `1.5px solid ${ink}`, color: ink }}>{t.contact}</a>
        </div>
      </div>
    </main>
  )
}
