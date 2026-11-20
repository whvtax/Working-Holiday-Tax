'use client'
/**
 * Student Visa Tax's settings for the shared tax form (Jo, 27 Oct: the WHT
 * form, wording and flow, in SVT colours). Only SVT details live here: the
 * SVT number, English, Chinese and Vietnamese, SVT paths, and the student
 * residency step (resident or foreign resident; students are never working
 * holiday makers).
 */
import { SVT_PUBLIC } from '@/lib/svt/brand-public'
import { localePath, type SvtLocale } from '@/lib/svt/i18n'
import { FormBrandProvider, type FormBrand, type ResidencyCopy } from '@/components/ui/form-brand'
import { GoogleReviewsBadge } from '@/components/ui/GoogleReviewsBadge'
import { DE_RES, JA_RES, ES_RES, FR_RES, IT_RES, PT_RES } from './form-residency-copy'

const EN_RES: ResidencyCopy = {
  titleLead: 'Let’s confirm your ', titleAccent: 'tax residency', titleTail: '',
  intro: 'Tax residency decides which tax rates apply to your income.',
  introEmph: 'It is separate from your visa.',
  quizIntro: 'To be considered an Australian tax resident, meaning the first $18,200 of your income is tax-free, most of the points below should genuinely apply to you.\n\nIf they do, you can select Australian tax resident. The ATO makes the final decision on your residency after we lodge your return.',
  questions: [
    'Your course in Australia lasts 6 months or more',
    'You live in Australia while you study',
    'Your usual home during the year is in Australia',
    'You work or have other ties in Australia while you study',
  ],
  sessionLost: 'Your session timed out, so your details need entering again. Nothing was sent.',
  sessionLostCta: 'Back to the form',
  declIntro: 'After reading this page and the ATO information, I declare that for tax I am:',
  residentLabel: 'Australian resident for tax',
  otherLabel: 'Foreign resident for tax',
  pickOne: 'Please choose your tax residency status',
  secure: 'Your information is kept secure and private.',
  confirmLead: 'You chose foreign resident for tax. This means the $18,200 tax-free threshold and the low income tax offset do not apply, and tax applies from the first dollar. We check your answer before anything is lodged.',
  confirmYes: 'Yes, this is correct',
  confirmNo: 'Let me review again',
}

const ZH_RES: ResidencyCopy = {
  titleLead: '确认你的', titleAccent: '税务居民身份', titleTail: '',
  intro: '税务居民身份决定你的收入适用哪种税率。',
  introEmph: '它和你的签证是两回事。',
  quizIntro: '要被视为澳洲税务居民（即前 $18,200 的收入免税），以下几点中的大部分应当确实符合你的情况。\n\n如果符合，你可以选择“澳洲税务居民”。在我们为你提交报税后，由 ATO 最终决定你的居民身份。',
  questions: [
    '你在澳洲的课程为期 6 个月或以上',
    '你在读书期间住在澳洲',
    '这一年里你的常住地在澳洲',
    '你在读书期间在澳洲有工作或其他生活上的关联',
  ],
  sessionLost: '页面已超时，需要重新填写你的信息。之前的内容没有提交。',
  sessionLostCta: '返回表格',
  declIntro: '阅读本页和 ATO 的相关信息后，我声明在税务上我是：',
  residentLabel: '澳洲税务居民',
  otherLabel: '非澳洲税务居民（foreign resident）',
  pickOne: '请选择你的税务居民身份',
  secure: '你的信息会被安全、保密地保存。',
  confirmLead: '你选择了非澳洲税务居民。这意味着 $18,200 的免税额度和低收入税收抵免（LITO）都不适用，从第一澳元起就要交税。在提交任何内容之前，我们会核实你的回答。',
  confirmYes: '是的，没有问题',
  confirmNo: '我再看一遍',
}

const VI_RES: ResidencyCopy = {
  titleLead: 'Xác nhận ', titleAccent: 'tình trạng cư trú về thuế', titleTail: '',
  intro: 'Tình trạng cư trú về thuế quyết định thuế suất áp dụng cho thu nhập của bạn.',
  introEmph: 'Điều này không phụ thuộc vào loại visa bạn đang có.',
  quizIntro: 'Để được coi là người cư trú thuế Úc, tức là $18,200 đầu tiên trong thu nhập của bạn được miễn thuế, phần lớn các điểm dưới đây cần thật sự đúng với bạn.\n\nNếu đúng, bạn có thể chọn “Người cư trú thuế Úc”. ATO sẽ đưa ra quyết định cuối cùng về tình trạng cư trú của bạn sau khi bên mình nộp hồ sơ.',
  questions: [
    'Khóa học của bạn ở Úc kéo dài 6 tháng trở lên',
    'Bạn sống ở Úc trong thời gian học',
    'Nơi ở thường xuyên của bạn trong năm là ở Úc',
    'Bạn có việc làm hoặc mối liên hệ khác ở Úc trong thời gian học',
  ],
  sessionLost: 'Phiên làm việc đã hết hạn, bạn cần nhập lại thông tin. Chưa có gì được gửi đi.',
  sessionLostCta: 'Quay lại form',
  declIntro: 'Sau khi đọc trang này và thông tin của ATO, tôi khai rằng về mặt thuế, tôi là:',
  residentLabel: 'Người cư trú về thuế ở Úc',
  otherLabel: 'Người không cư trú về thuế (foreign resident)',
  pickOne: 'Bạn vui lòng chọn tình trạng cư trú về thuế',
  secure: 'Thông tin của bạn được giữ an toàn và bảo mật.',
  confirmLead: 'Bạn đã chọn là người không cư trú về thuế. Điều này có nghĩa là ngưỡng miễn thuế $18,200 và khoản giảm thuế dành cho người có thu nhập thấp không áp dụng, và bạn phải đóng thuế ngay từ đồng đầu tiên. Bên mình sẽ kiểm tra lại câu trả lời của bạn trước khi nộp bất cứ điều gì.',
  confirmYes: 'Đúng, tôi xác nhận',
  confirmNo: 'Để tôi xem lại',
}

// Jo, 18 Nov (nine-language form review): the students' words come from the shared form
// (src/lib/form-i18n). Only what is different for students stays here, in EVERY language,
// English included (Jo, 18 Nov: "OSHC is not Medicare" is a student answer; one product):
// the OSHC note on the Medicare question and the same student job example (Barista,
// Delivery rider, written in English because the answers are in English).
const STUDENT_TEXT = {
  en: { hasMedicare: 'Do you have access to Medicare in Australia? (OSHC, your student health cover, is not Medicare.)', phJob: 'e.g. Barista, Delivery rider' },
  de: { hasMedicare: 'Hast du Zugang zu Medicare in Australien? (OSHC, deine Krankenversicherung für Studierende, ist nicht Medicare.)', phJob: 'z. B. Barista, Delivery rider (bitte auf Englisch)' },
  ja: { hasMedicare: 'オーストラリアでメディケア（Medicare）を利用できますか？（留学生向けの健康保険OSHCはMedicareではありません。）', phJob: '例：Barista、Delivery rider（英語でご入力ください）' },
  es: { hasMedicare: '¿Tienes acceso a Medicare en Australia? (OSHC, tu seguro médico de estudiante, no es Medicare.)', phJob: 'p. ej. Barista, Delivery rider' },
  fr: { hasMedicare: 'As-tu accès à Medicare en Australie\u00A0? (OSHC, ton assurance santé étudiante, n’est pas Medicare.)', phJob: 'ex.\u00A0: Barista, Delivery rider (en anglais)' },
  it: { hasMedicare: 'Hai accesso a Medicare in Australia? (OSHC, la tua assicurazione sanitaria da studente, non è Medicare.)', phJob: 'es. Barista, Delivery rider (in inglese)' },
  pt: { hasMedicare: 'Você tem acesso ao Medicare na Austrália? (O OSHC, seu seguro-saúde de estudante, não é o Medicare.)', phJob: 'ex.: Barista, Delivery rider (em inglês)' },
  zh: { hasMedicare: '你在澳洲能使用 Medicare 吗？（留学生健康保险 OSHC 不是 Medicare。）', phJob: '例如：Barista、Delivery rider（请用英文填写）' },
  vi: { hasMedicare: 'Bạn có thuộc diện được dùng Medicare ở Úc không? (Bảo hiểm y tế du học sinh OSHC không phải là Medicare.)', phJob: 'Ví dụ: Barista, Delivery rider (vui lòng ghi bằng tiếng Anh)' },
}

const PATHS: Record<string, string> = {
  'tax-form': '/jhd7hp9xd', 'tax-residency': '/jhd7hp9xd/w3rp42fav', // /tax-residency is the SVT guide page
  expenses: '/blog/deductions-by-job-international-students',
}

export const SVT_FORM_BRAND: FormBrand = {
  id: 'svt',
  waNumber: SVT_PUBLIC.whatsappNumber,
  // Legal pages are English only on every brand. The two form steps exist
  // under every locale prefix (decision 017); the guide only in en, zh, vi.
  url: (lang, page) => {
    if (page === 'client-agreement' || page === 'privacy') return `/${page}`
    if (lang === 'en' || lang === 'zh' || lang === 'vi') return localePath(lang as SvtLocale, PATHS[page])
    return page === 'tax-form' || page === 'tax-residency' ? `/${lang}${PATHS[page]}` : PATHS[page]
  },
  sealSrc: '/svt-assets/img/tpb-registered.png',
  // Same Google reviews badge as WHT (Jo: the two forms look and behave the same).
  reviews: () => <GoogleReviewsBadge lang="en" />,
  // Every language uses the shared words (src/lib/form-i18n, formStrings), which name no
  // brand, plus the two student answers above.
  text: STUDENT_TEXT,
  residency: { status: 'foreign', copy: { en: EN_RES, zh: ZH_RES, vi: VI_RES, de: DE_RES, ja: JA_RES, es: ES_RES, fr: FR_RES, it: IT_RES, pt: PT_RES } },
}

/** SVT colours for the shared form: ink for the brand colour, pale lime for
 *  the tints, on the docket's white. */
const SVT_FORM_VARS = {
  '--f-brand': '#12161F', '--f-brand-rgb': '18,22,31', '--f-ink': '#12161F', '--f-bg': '#F5FAE3',
  '--f-tint': '#F5FAE3', '--f-line': '#DCE0E6', '--f-muted': '#4A5160',
} as React.CSSProperties

export function SvtFormProvider({ children }: { children: React.ReactNode }) {
  return (
    <FormBrandProvider brand={SVT_FORM_BRAND}>
      <div style={SVT_FORM_VARS} data-svt-form="">{children}</div>
    </FormBrandProvider>
  )
}
