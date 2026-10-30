import { SVT_PUBLIC, svtWhatsappUrl } from '@/lib/svt/brand-public'
import { UI, LOCALE_META, localePath, type SvtLocale } from '@/lib/svt/i18n'
import { jsonLd, svtOrganization, SVT_BUSINESS_REF } from '@/lib/svt/jsonld'
import { LinkButton } from '../Button'
import { Faq, type FaqItem } from '../Faq'
import { Section } from '../Section'
import { Mark } from '../Type'
import { LanguageSwitch } from '../LanguageSwitch'

/**
 * Contact, the same page as the WHT one (Jo, 27 Oct): WhatsApp first, email
 * second, the four things that stop someone writing, then the questions about
 * the contact itself. Replaces the old questions page (questions live on each
 * guide). No phone while the SVT number is a placeholder.
 */
interface ContactCopy {
  metaTitle: string
  metaDescription: string
  title: string
  titleMark: string
  lead: string
  hours: string
  emailLine: string
  blockersTitle: string
  blockers: FaqItem[]
  faqTitle: string
  faq: FaqItem[]
  agreement: string
}

const COPY: Record<SvtLocale, ContactCopy> = {
  en: {
    metaTitle: 'Contact us',
    metaDescription: 'Questions about your student tax return? Chat with us on WhatsApp in English, Chinese or Vietnamese, or email us. Answers on weekdays, often within the hour.',
    title: 'Contact ',
    titleMark: 'us',
    lead: 'The quickest answer comes on WhatsApp. Chinese, Vietnamese or English all work, and the reply comes back in the language you used.',
    hours: 'Weekdays, 9am to 6pm Sydney time, most messages get an answer within the hour. Messages sent at night or on the weekend are answered the next working morning.',
    emailLine: 'Rather use email? {email} works too.',
    blockersTitle: 'Things students ask before writing',
    blockers: [
      { q: 'Do I need a myGov account?', a: 'No. Lodging through us does not involve your myGov at all, so there is nothing to set up or link first. A registered tax agent will never ask for your myGov login details.' },
      { q: 'Do I need my payslips?', a: 'No. Your employers report your pay and the tax they held back to the ATO, and that record is what we work from. Lost every payslip? It does not matter.' },
      { q: 'I have finished my course and gone home. Is it too late?', a: 'No. Once the financial year is over, the return can be done from any country. Keep your Australian bank account open if you can: the ATO pays refunds only into an Australian account.' },
      { q: 'Is this legitimate?', a: 'Student Visa Tax operates under the supervision of a registered tax agent. Your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO, and the terms are published in full in our client agreement.' },
    ],
    faqTitle: 'About getting in touch',
    faq: [
      { q: 'Is it free to ask a question?', a: 'Yes, questions cost nothing and there is no obligation. If you go ahead, the fee is fixed: $220 for a TFN return or $385 with ABN work, GST included, confirmed with you before you pay.' },
      { q: 'Which languages do you reply in?', a: 'English, Chinese and Vietnamese. Write in the one you are most comfortable with.' },
      { q: 'Should I send my documents with my first message?', a: 'No, a question is enough to start. Documents come later, once you decide to go ahead, through one secure online form.' },
      { q: 'I am on a 485 graduate visa. Can you still help?', a: 'Yes. We work only with student and graduate visas, 500 and 485.' },
    ],
    agreement: 'Read the client agreement',
  },
  zh: {
    metaTitle: '联系我们',
    metaDescription: '用中文、英文或越南语在 WhatsApp 上给我们发消息。工作时间内一般一小时左右回复。不需要 myGov，也不需要工资单。',
    title: '',
    titleMark: '联系我们',
    lead: '联系我们最快的方式是 WhatsApp。用中文、英文或越南语都可以，你用什么语言写，我们就用什么语言回复。',
    hours: '周一到周五，悉尼时间早上 9 点到下午 6 点。一般一小时左右回复；其他时间发来的消息，我们下一个工作日一早回复。',
    emailLine: '更习惯用邮件？请发到 {email}。',
    blockersTitle: '发消息之前',
    blockers: [
      { q: '我需要 myGov 账号吗？', a: '不需要。你不用登录 myGov，也不用先做任何绑定或设置，我们直接和 ATO 对接。注册税务代理人绝不会向你索要 myGov 登录信息。' },
      { q: '我需要工资单吗？', a: '不需要。雇主扣了多少税、申报了什么，我们通过 ATO 都能看到。就算你手上什么都没有，也可以直接发消息。' },
      { q: '我已经离开澳洲了，你们还能帮我报税吗？', a: '可以。已经结束的财年，在哪里都能报税。有一点要提前知道：可以的话，先别关掉你的澳洲银行账户，因为 ATO 只会把退税打到澳洲的银行账户。如果已经销户了，请告诉我们。' },
      { q: '你们靠谱吗？', a: 'Student Visa Tax 在注册税务代理人的监督下运营。你的报税在提交给 ATO 之前，由注册税务代理人审核并签字确认。服务条款全文都公开在客户协议里。' },
    ],
    faqTitle: '关于联系我们',
    faq: [
      { q: '问问题要收费吗？', a: '不收费。决定之前想问多少都可以。费用是固定的：只有 TFN 工作 $220，有 ABN 工作 $385，含 GST，付款前我们会先跟你确认。' },
      { q: '你们用什么语言回复？', a: '中文、英文和越南语。用你最习惯的语言写就好。' },
      { q: '要马上发资料吗？', a: '不用。先把问题发给我们。如果需要我们来办，我们会说清楚要做什么、多少钱。你决定办理之后，我们才会告诉你需要哪些资料。' },
      { q: '我是 485 毕业生签证，也能帮我吗？', a: '可以。我们只做学生签证和毕业生签证（500 和 485）。' },
    ],
    agreement: '阅读客户协议（英文）',
  },
  vi: {
    metaTitle: 'Liên hệ',
    metaDescription: 'Nhắn tin cho chúng tôi qua WhatsApp bằng tiếng Việt, tiếng Anh hoặc tiếng Trung. Trong giờ làm việc thường trả lời trong khoảng một giờ. Không cần myGov, không cần phiếu lương.',
    title: '',
    titleMark: 'Liên hệ',
    lead: 'Cách nhanh nhất để liên hệ là WhatsApp. Bạn có thể nhắn bằng tiếng Việt, tiếng Anh hoặc tiếng Trung, chúng tôi trả lời bằng đúng ngôn ngữ đó.',
    hours: 'Thứ Hai đến thứ Sáu, từ 9 giờ sáng đến 6 giờ chiều (giờ Sydney). Thường chúng tôi trả lời trong khoảng một giờ. Tin nhắn gửi ngoài giờ sẽ được trả lời vào sáng ngày làm việc tiếp theo.',
    emailLine: 'Thích dùng email hơn? Gửi về {email}.',
    blockersTitle: 'Trước khi nhắn tin',
    blockers: [
      { q: 'Tôi có cần tài khoản myGov không?', a: 'Không. Bạn không cần đăng nhập myGov, cũng không phải tạo hay liên kết tài khoản nào trước. Chúng tôi làm việc trực tiếp với ATO. Đại lý thuế đã đăng ký sẽ không bao giờ hỏi thông tin đăng nhập myGov của bạn.' },
      { q: 'Tôi có cần phiếu lương không?', a: 'Không. Số thuế chủ lao động đã khấu trừ và khai báo, chúng tôi xem được qua ATO. Nếu bạn không có giấy tờ gì, cứ nhắn tin cho chúng tôi.' },
      { q: 'Tôi đã rời Úc rồi, có giúp được không?', a: 'Được. Hồ sơ thuế cho năm tài chính đã kết thúc có thể nộp từ bất cứ đâu. Một điều nên biết sớm: ATO chỉ trả tiền hoàn thuế vào tài khoản ngân hàng ở Úc, nên nếu bạn đã đóng tài khoản, hãy báo cho chúng tôi.' },
      { q: 'Dịch vụ này có đáng tin không?', a: 'Student Visa Tax hoạt động dưới sự giám sát của một đại lý thuế đã đăng ký. Hồ sơ thuế của bạn được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO, và toàn bộ điều khoản được công bố trong thỏa thuận khách hàng.' },
    ],
    faqTitle: 'Về việc liên hệ',
    faq: [
      { q: 'Hỏi có mất phí không?', a: 'Không. Bạn cứ hỏi thoải mái trước khi quyết định. Phí cố định: $220 cho hồ sơ chỉ có việc làm TFN, hoặc $385 nếu có việc làm ABN, đã gồm GST, và chúng tôi xác nhận với bạn trước khi bạn thanh toán.' },
      { q: 'Student Visa Tax trả lời bằng ngôn ngữ nào?', a: 'Tiếng Việt, tiếng Anh và tiếng Trung. Bạn dùng ngôn ngữ nào thoải mái nhất là được.' },
      { q: 'Tôi có phải gửi giấy tờ ngay không?', a: 'Không. Bạn gửi câu hỏi trước. Nếu có việc cần làm, chúng tôi nói rõ là việc gì và chi phí bao nhiêu, và chỉ khi bạn quyết định làm, chúng tôi mới cho biết cần giấy tờ nào.' },
      { q: 'Tôi có visa tốt nghiệp 485, có giúp được không?', a: 'Được. Chúng tôi chỉ làm cho visa du học và visa tốt nghiệp, 500 và 485.' },
    ],
    agreement: 'Đọc thỏa thuận khách hàng (bằng tiếng Anh)',
  },
}

export function ContactPage({ locale }: { locale: SvtLocale }) {
  const c = COPY[locale]
  const t = UI[locale]
  const [before, after] = c.emailLine.split('{email}')
  const schema = [
    svtOrganization(),
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${SVT_PUBLIC.siteUrl}${localePath(locale, '/contact')}#webpage`,
      url: `${SVT_PUBLIC.siteUrl}${localePath(locale, '/contact')}`,
      name: c.metaTitle,
      description: c.metaDescription,
      inLanguage: LOCALE_META[locale].hreflang,
      about: SVT_BUSINESS_REF,
      mainEntity: SVT_BUSINESS_REF,
    },
  ]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Section>
        <h1 style={{ fontSize: 'var(--svt-h1)', lineHeight: 1.06, fontWeight: 700, letterSpacing: '-0.025em' }}>{c.title}<Mark>{c.titleMark}</Mark></h1>
        <p style={{ fontSize: 'var(--svt-lead, 1.125rem)', lineHeight: 1.55, margin: '16px 0 0' }}>{c.lead}</p>
        <p style={{ margin: '24px 0 0' }}>
          <LinkButton href={svtWhatsappUrl(t.whatsappHello)} data-wa-pos="contact">{t.whatsappCta}</LinkButton>
        </p>
        <p style={{ margin: '16px 0 0' }}>{c.hours}</p>
        <p style={{ margin: '8px 0 0' }}>{before}<a href={`mailto:${SVT_PUBLIC.email}`}>{SVT_PUBLIC.email}</a>{after}</p>
        <LanguageSwitch current={locale} path="/contact" />
      </Section>
      <Section tone="pale" title={c.blockersTitle} titleId="contact-before">
        <Faq items={c.blockers} group={`svt-contact-before-${locale}`} />
        <p><a href="/client-agreement">{c.agreement}</a></p>
      </Section>
      <Section title={c.faqTitle} titleId="contact-faq">
        <Faq items={c.faq} group={`svt-contact-faq-${locale}`} openFirst={false} />
      </Section>
    </>
  )
}

export const contactMeta = (locale: SvtLocale) => ({ title: COPY[locale].metaTitle, description: COPY[locale].metaDescription })
