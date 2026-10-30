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
  quizIntro: '要被视为澳洲税务居民（即前 $18,200 的收入免税），以下几点中的大部分应当确实符合你的情况。\n\n如果符合，你可以选择“澳洲税务居民”。最终由 ATO 在我们为你提交报税后，决定你的居民身份。',
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
  confirmLead: '你选择了非澳洲税务居民。这意味着 $18,200 的免税额度和低收入税收抵免（LITO）都不适用，从第一澳元起就要交税。在向 ATO 递交之前，我们会再帮你核实一遍。',
  confirmYes: '是的，没有问题',
  confirmNo: '我再看一遍',
}

const VI_RES: ResidencyCopy = {
  titleLead: 'Xác nhận ', titleAccent: 'tình trạng cư trú về thuế', titleTail: '',
  intro: 'Tình trạng cư trú về thuế quyết định thuế suất áp dụng cho thu nhập của bạn.',
  introEmph: 'Điều này không phụ thuộc vào loại visa bạn đang có.',
  quizIntro: 'Để được coi là người cư trú thuế Úc, tức là $18,200 đầu tiên trong thu nhập của bạn được miễn thuế, phần lớn các điểm dưới đây cần thật sự đúng với bạn.\n\nNếu đúng, bạn có thể chọn “Người cư trú thuế Úc”. ATO sẽ đưa ra quyết định cuối cùng về tình trạng cư trú của bạn sau khi chúng tôi nộp hồ sơ.',
  questions: [
    'Khóa học của bạn ở Úc kéo dài 6 tháng trở lên',
    'Bạn sống ở Úc trong thời gian học',
    'Nơi ở thường xuyên của bạn trong năm là ở Úc',
    'Bạn có việc làm hoặc mối liên hệ khác ở Úc trong thời gian học',
  ],
  sessionLost: 'Phiên làm việc đã hết hạn, bạn cần nhập lại thông tin. Chưa có gì được gửi đi.',
  sessionLostCta: 'Quay lại tờ khai',
  declIntro: 'Sau khi đọc trang này và thông tin của ATO, tôi khai rằng về mặt thuế, tôi là:',
  residentLabel: 'Người cư trú về thuế ở Úc',
  otherLabel: 'Người không cư trú về thuế',
  pickOne: 'Bạn vui lòng chọn tình trạng cư trú về thuế',
  secure: 'Thông tin của bạn được giữ an toàn và bảo mật.',
  confirmLead: 'Bạn đã chọn là người không cư trú về thuế. Điều này có nghĩa là ngưỡng miễn thuế $18,200 và khoản giảm thuế dành cho người có thu nhập thấp không áp dụng, và bạn phải đóng thuế ngay từ đồng đầu tiên. Chúng tôi sẽ kiểm tra lại trước khi nộp.',
  confirmYes: 'Đúng, tôi xác nhận',
  confirmNo: 'Để tôi xem lại',
}

const ZH = {
  addressShort: '澳洲地址', auPhone: '澳洲手机号码',
  bankStatementHint: '请上传你的澳洲银行对账单（PDF），需要能看到你的姓名、BSB 和账号，这样退税（如有）才会打进正确的账户。',
  bankStatements: '银行对账单', checkResidency: '继续：税务居民身份 →', checkResidencyNote: '最后一步：确认税务居民身份，然后就可以提交了。',
  continueButton: '继续 →', dob: '出生日期', email: '邮箱地址', etaLabel: '我们通常在 24 小时内联系你',
  fieldIsRequired: '为必填项', fixBeforeSubmit: '提交之前，请先修改以下内容：', givenNames: '名（Given names）',
  hasMedicare: '你在澳洲能使用 Medicare 吗？（留学生健康保险 OSHC 不是 Medicare。）', homeCountry: '你来自哪个国家', howHeard: '你是怎么知道我们的？',
  invalidDob: '请检查出生日期', invalidEmail: '请输入有效的邮箱地址', invalidPhone: '请输入带国家区号的有效号码，例如 +61 412 345 678',
  invalidTfn: '税号（TFN）应为 8 位或 9 位数字', invoicesHint: '最多可以免费上传 10 张发票。', invoicesLabel: '收据或发票',
  invoicesRequired: '请至少上传一张收据或发票，或者把上面的答案改成“否”。', lastName: '姓（Last name）', marital: '婚姻状况',
  msgWhatsApp: '在 WhatsApp 上联系我们', primaryJob: '过去一年的主要工作', registeredAgentNo: '本服务由注册税务代理人监督，TPB 编号',
  required: '必填', sectionDeclaration: '声明', selfieHint: '用来核实你的身份。照片会被安全、保密地保存，核实后立即删除。',
  selfieWithPassport: '手持护照的自拍', stepReceived: '已收到你的资料', stepRefund: '提交报税并告知结果', stepWhatsApp: '我们在 WhatsApp 上联系你',
  submitTax: '提交报税 →', submitting: '正在提交…', successNextLead: '我们已收到你的资料。接下来是这样的：', tapToChoose: '点击选择文件',
  tfn: '税号（TFN）', thankYou: '谢谢你',timeEstimate: '⏱ 大约 1 分钟', titleTax: '先简单介绍一下你自己', titleTaxStep2: '快完成了！', titleTaxSub: '这样我们就可以开始了',
  uploadBankStatement: '上传银行对账单', uploadInvoices: '上传收据', uploadSelfie: '上传手持护照的自拍', whatsapp: '你给我们发消息用的 WhatsApp 号码',
  waHint: '请填写你正在和我们聊天的那个号码，这样我们才能把表格和聊天对应起来。',
  tooMany: '提交次数太多了，请 15 分钟后再试。', checkFields: '请检查以下内容后再试一次：', somethingWrong: '出了点问题，请再试一次，或者直接联系我们。',
  refPrefix: '编号 ', fileErrorPrefix: '文件出错：', fileErrorGeneric: '请上传 4 MB 以内的图片或 PDF。',
  fileTooLarge: '这个文件太大了，请用 4 MB 以内的文件。PDF 可以先压缩，或者拍照后上传。',
  phGiven: '按护照上的拼音（英文字母）填写，例如 WEI',
  phLast: '按护照上的拼音填写，例如 ZHANG',
  phAddress: '例如：12 Smith Street, Bondi NSW 2026',
  phJob: '例如：Barista、Delivery rider（请尽量用英文填写）',
  yes: '是', no: '否',
  hasOtherIncome: '你有其他收入吗？', otherIncomeWhat: '是哪种收入？', otherIncomePh: '例如：海外收入、利息、股票、租金（请尽量用英文填写）',
  expensesBefore: '你有', expensesLink: '与工作相关的开支', expensesAfter: '吗？',
  declBefore: '我已阅读并同意', declCA: 'Client Agreement（客户协议）', declAnd: '和', declPP: 'Privacy Policy（隐私政策）', declAfter: '。',
  mustAgree: '需要同意后才能提交',
}

const VI = {
  addressShort: 'Địa chỉ ở Úc', auPhone: 'Số điện thoại Úc',
  bankStatementHint: 'Tải lên sao kê ngân hàng Úc (PDF) trong đó có tên, mã BSB và số tài khoản của bạn. Như vậy tiền hoàn thuế (nếu có) sẽ về đúng tài khoản.',
  bankStatements: 'Sao kê ngân hàng', checkResidency: 'Tiếp tục: tình trạng cư trú về thuế →', checkResidencyNote: 'Bước cuối: xác nhận tình trạng cư trú về thuế, rồi gửi hồ sơ.',
  continueButton: 'Tiếp tục →', dob: 'Ngày sinh', email: 'Địa chỉ email', etaLabel: 'Thường trong vòng 24 giờ',
  fieldIsRequired: 'không được để trống', fixBeforeSubmit: 'Bạn vui lòng sửa những mục sau trước khi gửi:', givenNames: 'Tên (Given names)',
  hasMedicare: 'Bạn có thuộc diện được dùng Medicare ở Úc không? (Bảo hiểm y tế du học sinh OSHC không phải là Medicare.)', homeCountry: 'Quốc gia bạn đến từ', howHeard: 'Bạn biết đến chúng tôi qua đâu?',
  invalidDob: 'Vui lòng kiểm tra lại ngày sinh', invalidEmail: 'Vui lòng nhập địa chỉ email hợp lệ', invalidPhone: 'Vui lòng nhập số điện thoại hợp lệ có mã quốc gia, ví dụ +61 412 345 678',
  invalidTfn: 'Mã số thuế (TFN) gồm 8 hoặc 9 chữ số', invoicesHint: 'Bạn có thể tải lên tối đa 10 biên lai hoặc hóa đơn.', invoicesLabel: 'Biên lai hoặc hóa đơn',
  invoicesRequired: 'Vui lòng tải lên ít nhất một biên lai hoặc hóa đơn, hoặc đổi câu trả lời ở trên thành Không.', lastName: 'Họ (Last name)', marital: 'Tình trạng hôn nhân',
  msgWhatsApp: 'Nhắn tin cho chúng tôi qua WhatsApp', primaryJob: 'Công việc chính trong năm qua', registeredAgentNo: 'Hoạt động dưới sự giám sát của đại lý thuế đã đăng ký, mã số đại lý thuế',
  required: 'Bắt buộc', sectionDeclaration: 'Xác nhận đồng ý', selfieHint: 'Để xác minh danh tính của bạn. Ảnh được giữ an toàn, bảo mật và xóa ngay sau khi xác minh.',
  selfieWithPassport: 'Ảnh selfie cầm hộ chiếu', stepReceived: 'Đã nhận thông tin', stepRefund: 'Nộp hồ sơ và thông báo kết quả', stepWhatsApp: 'Chúng tôi nhắn cho bạn qua WhatsApp',
  submitTax: 'Gửi hồ sơ thuế →', submitting: 'Đang gửi…', successNextLead: 'Chúng tôi đã nhận thông tin của bạn. Các bước tiếp theo:', tapToChoose: 'Chạm để chọn tệp',
  tfn: 'Mã số thuế (TFN)', thankYou: 'Cảm ơn', timeEstimate: '⏱ Khoảng 1 phút', titleTax: 'Cho chúng tôi biết một chút về bạn', titleTaxStep2: 'Sắp xong rồi!', titleTaxSub: 'để chúng tôi bắt đầu',
  uploadBankStatement: 'Tải lên sao kê ngân hàng', uploadInvoices: 'Tải lên biên lai', uploadSelfie: 'Tải lên ảnh selfie cầm hộ chiếu', whatsapp: 'Số WhatsApp bạn dùng để nhắn cho chúng tôi',
  waHint: 'Vui lòng nhập đúng số bạn đang nhắn tin với chúng tôi, để chúng tôi ghép tờ khai với cuộc trò chuyện của bạn.',
  tooMany: 'Bạn gửi quá nhiều lần. Vui lòng đợi 15 phút rồi thử lại.', checkFields: 'Vui lòng kiểm tra các mục sau rồi thử lại: ', somethingWrong: 'Đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp với chúng tôi.',
  refPrefix: 'mã ', fileErrorPrefix: 'Lỗi tệp: ', fileErrorGeneric: 'Vui lòng tải lên ảnh hoặc PDF dưới 4 MB.',
  fileTooLarge: 'Tệp này quá lớn. Vui lòng dùng tệp dưới 4 MB. Với PDF, bạn có thể nén lại hoặc chụp ảnh giấy tờ.',
  phGiven: 'Viết không dấu, đúng như trên hộ chiếu',
  phLast: 'Viết không dấu, ví dụ NGUYEN',
  phAddress: 'Ví dụ: 12 Smith Street, Bondi NSW 2026',
  phJob: 'Ví dụ: Barista, Delivery rider (vui lòng ghi bằng tiếng Anh)',
  yes: 'Có', no: 'Không',
  hasOtherIncome: 'Bạn có thu nhập nào khác không?', otherIncomeWhat: 'Đó là thu nhập gì?', otherIncomePh: 'Ví dụ: thu nhập từ nước ngoài, tiền lãi, cổ phiếu, tiền cho thuê nhà',
  expensesBefore: 'Bạn có ', expensesLink: 'chi phí liên quan đến công việc', expensesAfter: ' không?',
  declBefore: 'Tôi đã đọc và đồng ý với ', declCA: 'Client Agreement (Thỏa thuận khách hàng)', declAnd: ' và ', declPP: 'Privacy Policy (Chính sách quyền riêng tư)', declAfter: '.',
  mustAgree: 'Bạn cần đồng ý để gửi hồ sơ',
}

const PATHS: Record<string, string> = {
  'tax-form': '/jhd7hp9xd', 'tax-residency': '/jhd7hp9xd/w3rp42fav', // /tax-residency is the SVT guide page
  expenses: '/blog/deductions-by-job-international-students',
}

export const SVT_FORM_BRAND: FormBrand = {
  id: 'svt',
  waNumber: SVT_PUBLIC.whatsappNumber,
  langs: [
    { code: 'en', label: 'EN', full: 'English' },
    { code: 'zh', label: '中文', full: '中文' },
    { code: 'vi', label: 'VI', full: 'Tiếng Việt' },
  ],
  // Legal pages are English only on every brand.
  url: (lang, page) => (page === 'client-agreement' || page === 'privacy'
    ? `/${page}`
    : localePath((lang === 'zh' || lang === 'vi' ? lang : 'en') as SvtLocale, PATHS[page])),
  sealSrc: '/svt-assets/img/tpb-registered.png',
  // English keeps the WHT words except the job example (students, not farm work).
  // English keeps the WHT words except: the job example (students, not farm
  // work) and the last step, which never implies a refund (no refund promise).
  text: { en: { phJob: 'e.g. Barista, Delivery rider', stepRefund: 'Lodged with the ATO, then we update you' }, zh: ZH, vi: VI },
  residency: { status: 'foreign', copy: { en: EN_RES, zh: ZH_RES, vi: VI_RES } },
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
