/**
 * Bài viết (tiếng Việt). Thông tin đúng y bản tiếng Anh; cấu trúc lấy từ
 * blog-en.ts. Cùng quy tắc như các hướng dẫn (cách nói pháp lý, "có thể",
 * không hứa hẹn tiền hoàn thuế). Thuật ngữ thống nhất với guides-vi.ts.
 */
import type { GuideText } from './guides-i18n'

export const BLOG_VI: Readonly<Record<string, GuideText>> = {
  'tfn-declaration-two-jobs': {
    label: 'Hai việc và ngưỡng miễn thuế',
    meta: { title: 'Làm hai việc khi có visa du học: ngưỡng miễn thuế', description: 'Chỉ đăng ký ngưỡng miễn thuế với một chủ lao động. Vì sao làm hai việc bán thời gian hay khiến du học sinh phải đóng thêm thuế, và cách điền tờ khai TFN để tránh.' },
    h1: { before: 'Hai việc, ', mark: 'một ngưỡng miễn thuế' },
    lead: 'Ngày thường làm quán cà phê, cuối tuần làm kho hàng là chuyện rất bình thường với du học sinh. Đây cũng là lý do hay gặp nhất khiến du học sinh phải đóng thêm thuế, và tất cả chỉ nằm ở một câu hỏi trên tờ khai.',
    sections: {
      'the-form': { title: 'Câu hỏi trên tờ khai TFN', blocks: [
        { p: 'Khi bắt đầu một công việc, bạn điền tờ khai mã số thuế (TFN declaration). Có hai câu hỏi quyết định số thuế bị trừ ở mỗi kỳ lương:' },
        { list: [
          'Bạn có phải là người cư trú về thuế ở Úc không?',
          'Bạn có muốn đăng ký ngưỡng miễn thuế với chủ lao động này không?',
        ] },
        { p: 'Nếu bạn có thể là người cư trú về thuế (ví dụ khóa học của bạn từ 6 tháng trở lên), ngưỡng miễn thuế có nghĩa là $18,200 đầu tiên bạn kiếm được trong năm không bị tính thuế, hoặc chỉ một phần số này nếu bạn chỉ là người cư trú trong một phần của năm. Nhờ vậy chủ lao động trừ thuế ít hơn.' },
      ] },
      'one-payer': { title: 'Chỉ đăng ký với một chủ lao động', blocks: [
        { p: 'ATO cho biết bạn thường chỉ đăng ký ngưỡng miễn thuế với một nơi trả lương, thường là nơi trả cho bạn nhiều nhất. Với công việc thứ hai, hãy chọn “không”.' },
        { note: 'Nếu bạn đăng ký ngưỡng miễn thuế với nhiều chủ lao động, mỗi chủ lao động trừ thuế như thể bạn không có thu nhập ở nơi khác, nên tổng số thuế bị trừ không đủ, và ATO cho biết bạn có thể phải đóng phần chênh lệch khi khai thuế.' },
      ] },
      'already-did': { title: 'Nếu bạn đã lỡ đăng ký hai nơi', blocks: [
        { list: [
          'Nộp cho chủ lao động thứ hai một tờ khai mới không đăng ký ngưỡng miễn thuế. Từ đó họ sẽ trừ thuế theo mức cao hơn.',
          'Nếu bạn thấy số thuế bị trừ vẫn còn ít, bạn có thể đề nghị chủ lao động trừ nhiều hơn.',
          'Báo cho chúng tôi khi khai thuế. Trước khi bạn ký, chúng tôi đối chiếu số thuế đã bị trừ với số tiền bạn kiếm được.',
        ] },
      ] },
    },
    faq: [
      { q: 'Bây giờ việc thứ hai trả lương cao hơn. Tôi đổi lại được không?', a: 'Được. Nộp cho chủ lao động chính mới một tờ khai có đăng ký ngưỡng miễn thuế, và nộp cho nơi còn lại một tờ khai không đăng ký.' },
      { q: 'Tôi là người không cư trú về thuế. Tôi có được đăng ký ngưỡng miễn thuế không?', a: 'Không. Người không cư trú về thuế không có ngưỡng miễn thuế, nên với mọi công việc bạn đều chọn “không”.' },
    ],
    sourceLabels: ['ATO: Thu nhập từ nhiều công việc', 'ATO: Đóng thuế khi có nhiều nguồn thu nhập'],
    short: {
      answer: 'Nếu bạn có thể là người cư trú về thuế, chỉ đăng ký ngưỡng miễn thuế với một chủ lao động, thường là nơi trả lương cao nhất. Với mọi công việc khác, hãy chọn “không”.',
      mark: 'chỉ đăng ký ngưỡng miễn thuế với một chủ lao động',
      form: {
        question: 'Trên mỗi tờ khai TFN: bạn có muốn đăng ký ngưỡng miễn thuế với chủ lao động này không?',
        rows: [
          { label: 'Công việc chính', sub: 'trả lương cao nhất', answer: 'yes' },
          { label: 'Công việc thứ hai', sub: 'và mọi công việc khác', answer: 'no' },
        ],
      },
    },
  },
  'apply-for-tfn-student-visa': {
    label: 'Xin TFN khi có visa du học',
    meta: { title: 'Cách xin mã số thuế TFN khi có visa du học', description: 'Xin mã số thuế (TFN) trực tuyến nếu visa của bạn cho phép đi làm và bạn đang ở Úc. Miễn phí, không cần gửi giấy tờ, và TFN sẽ được gửi qua bưu điện trong vòng 28 ngày.' },
    h1: { before: 'Xin ', mark: 'mã số thuế TFN', after: ' khi có visa du học' },
    lead: 'Mã số thuế (TFN) theo bạn suốt đời. Bạn cần nó để đi làm, cho tiền super và cho mọi hồ sơ thuế. Xin TFN là miễn phí và chỉ mất vài phút trên mạng.',
    sections: {
      who: { title: 'Ai được xin trực tuyến', blocks: [
        { p: 'ATO cho phép xin trực tuyến nếu bạn có visa còn hiệu lực cho phép đi làm và bạn đang ở Úc. Nếu visa của bạn có điều kiện không được làm việc, đơn trực tuyến sẽ không được chấp nhận.' },
      ] },
      how: { title: 'Cách làm', blocks: [
        { list: [
          'Nộp đơn trên trang của ATO bằng thông tin hộ chiếu.',
          'Hoàn toàn miễn phí. Đừng trả tiền cho trang web nào nhận “làm hộ”.',
          'Bạn không cần gửi giấy tờ nào.',
          'TFN được gửi qua bưu điện đến địa chỉ ở Úc mà bạn khai, nên hãy dùng địa chỉ mà bạn chắc chắn nhận được thư.',
        ] },
      ] },
      wait: { title: 'Mất bao lâu', blocks: [
        { p: 'ATO cho biết bạn thường sẽ nhận được TFN trong vòng 28 ngày kể từ khi ATO nhận được đơn đầy đủ của bạn. Trong thời gian đó đừng nộp đơn lại. Nếu sau 28 ngày vẫn chưa nhận được, hãy liên hệ ATO kèm mã số biên nhận.' },
        { p: 'Bạn có thể đi làm trước khi có TFN, chỉ cần báo với chủ lao động là bạn đã nộp đơn. Nếu sau 28 ngày bạn vẫn chưa đưa TFN cho họ, họ buộc phải trừ thuế theo mức cao nhất cộng thêm Medicare levy.' },
      ] },
      'keep-safe': { title: 'Giữ an toàn cho mã số thuế', blocks: [
        { p: 'Bạn đưa TFN cho chủ lao động, quỹ super và người làm hồ sơ thuế cho bạn. Đừng đăng lên mạng hay gửi cho người mà bạn chưa xác minh.' },
      ] },
    },
    sourceLabels: ['ATO: Đơn xin TFN cho người mang hộ chiếu nước ngoài và người tạm trú', 'ATO: Tờ khai mã số thuế và khấu trừ (dành cho chủ lao động)'],
    short: {"answer": "Nếu visa cho phép bạn đi làm và bạn đang ở Úc, hãy xin TFN trực tuyến với ATO. Miễn phí, không cần gửi giấy tờ, và TFN sẽ được gửi qua bưu điện trong vòng 28 ngày.", "mark": "Miễn phí", "facts": [{"figure": "$0", "label": "lệ phí xin TFN"}, {"figure": "28 ngày", "label": "để nhận qua bưu điện"}]},
  },
  'how-long-does-a-tax-refund-take': {
    label: 'Bao lâu thì nhận tiền hoàn thuế',
    meta: { title: 'Bao lâu thì nhận được tiền hoàn thuế ở Úc?', description: 'ATO xử lý phần lớn hồ sơ nộp trực tuyến trong 12 ngày làm việc. Hồ sơ giấy mất đến 50 ngày làm việc. Vì sao hồ sơ của du học sinh có thể bắt đầu muộn hơn, và cách theo dõi.' },
    h1: { before: 'Bao lâu thì nhận được ', mark: 'tiền hoàn thuế', after: '?' },
    lead: 'Khi hồ sơ đã được nộp, phần còn lại là việc của ATO. Phần lớn hồ sơ trực tuyến được xử lý nhanh, nhưng có vài điều có thể làm hồ sơ của bạn chậm hơn.',
    sections: {
      times: { title: 'Thời gian xử lý của ATO', blocks: [
        { list: [
          'Hồ sơ trực tuyến: phần lớn được xử lý trong 12 ngày làm việc.',
          'Nếu hồ sơ cần kiểm tra thủ công: tối đa 30 ngày (tính cả cuối tuần và ngày lễ).',
          'Hồ sơ giấy: tối đa 50 ngày làm việc, khoảng 10 tuần.',
        ] },
        { p: 'Khi xử lý xong, ATO gửi thông báo tính thuế (notice of assessment) và chuyển tiền hoàn thuế (nếu có) vào tài khoản ngân hàng ở Úc ghi trong hồ sơ.' },
      ] },
      before: { title: 'Trước khi nộp hồ sơ', blocks: [
        { p: 'Với nhiều du học sinh, thời gian chờ bắt đầu từ trước khi nộp hồ sơ. Chúng tôi nộp hồ sơ khi bảng kê thu nhập của bạn đã hiện “Tax ready”, và khi đã có giấy Medicare Entitlement Statement, nếu bạn xin miễn Medicare levy.' },
      ] },
      check: { title: 'Cách theo dõi', blocks: [
        { list: [
          'Trong myGov: mở dịch vụ ATO và chọn hồ sơ thuế của năm đó.',
          'Trong ứng dụng ATO.',
          'Hoặc hỏi chúng tôi qua WhatsApp.',
        ] },
        { note: 'Giữ tài khoản ngân hàng ở Úc cho đến khi nhận được tiền hoàn thuế (nếu có), kể cả sau khi bạn đã rời Úc.' },
      ] },
    },
    sourceLabels: ['ATO: Cách theo dõi tiến độ hồ sơ thuế'],
    short: {"answer": "ATO xử lý phần lớn hồ sơ thuế nộp trực tuyến trong vòng 12 ngày làm việc. Hồ sơ cần kiểm tra thủ công có thể mất tối đa 30 ngày theo lịch, và hồ sơ giấy tối đa 50 ngày làm việc.", "mark": "12 ngày làm việc", "facts": [{"figure": "12", "label": "ngày làm việc, phần lớn hồ sơ trực tuyến"}, {"figure": "30", "label": "ngày theo lịch, khi cần kiểm tra thủ công"}, {"figure": "50", "label": "ngày làm việc, hồ sơ giấy"}]},
  },
  'low-income-tax-offset-students': {
    label: 'Khoản giảm thuế cho thu nhập thấp',
    meta: { title: 'Khoản giảm thuế LITO cho du học sinh', description: 'Người cư trú về thuế có thu nhập chịu thuế từ $37,500 trở xuống có thể được giảm đến $700 tiền thuế. Tự động khi khai thuế, không trả thành tiền mặt.' },
    h1: { before: 'Giảm đến $700 tiền thuế: ', mark: 'khoản giảm thuế cho thu nhập thấp' },
    lead: 'Nhiều du học sinh có thu nhập vừa phải từ việc bán thời gian. Nếu bạn là người cư trú về thuế, ngoài ngưỡng miễn thuế còn có một khoản giảm thuế giúp bạn đóng ít hơn.',
    sections: {
      who: { title: 'Ai đủ điều kiện hưởng', blocks: [
        { p: 'ATO cho biết bạn cần là người cư trú về thuế ở Úc, phải đóng thuế trên thu nhập chịu thuế của mình, và có thu nhập chịu thuế dưới $66,667. Người không cư trú về thuế không được hưởng.' },
      ] },
      'how-much': { title: 'Được giảm bao nhiêu', blocks: [
        { list: [
          'Thu nhập chịu thuế từ $37,500 trở xuống: $700.',
          'Từ $37,501 đến $45,000: $700 trừ đi 5 cent cho mỗi đô la vượt quá $37,500.',
          'Từ $45,001 đến $66,667: $325 trừ đi 1.5 cent cho mỗi đô la vượt quá $45,000.',
        ] },
      ] },
      'how-it-works': { title: 'Được áp dụng thế nào', blocks: [
        { p: 'Bạn không cần nộp đơn. ATO tự tính khi bạn khai thuế.' },
        { note: 'Khoản này không được trả cho bạn bằng tiền. Nó chỉ giảm số thuế bạn phải đóng, nhiều nhất là xuống bằng 0; phần còn dư sẽ không được dùng và cũng không được trả lại.' },
      ] },
    },
    sourceLabels: ['ATO: Khoản giảm thuế cho thu nhập thấp'],
    short: {"answer": "Trong năm tài chính 2025-26, nếu bạn là người cư trú về thuế và có thu nhập chịu thuế từ $37,500 trở xuống, khoản giảm thuế cho thu nhập thấp giúp bạn đóng ít hơn tối đa $700. Khoản này được tính khi bạn khai thuế và không được trả thành tiền mặt.", "mark": "đóng ít hơn tối đa $700", "facts": [{"figure": "$700", "label": "với thu nhập chịu thuế từ $37,500 trở xuống"}, {"figure": "$66,667", "label": "mức thu nhập chịu thuế mà khoản giảm này hết"}]},
  },
  'income-statement-tax-ready': {
    label: 'Bảng kê thu nhập và “Tax ready”',
    meta: { title: 'Bảng kê thu nhập và vì sao phải chờ “Tax ready”', description: 'Chủ lao động báo lương, thuế và super của bạn cho ATO, hạn chót hoàn tất là 14/7. Nộp hồ sơ trước khi bảng kê hiện “Tax ready” có thể phải sửa lại hồ sơ.' },
    h1: { before: 'Bảng kê thu nhập và ', mark: '“Tax ready”' },
    lead: 'Hầu hết chủ lao động không còn đưa bảng tóm tắt thu nhập (payment summary) bằng giấy nữa. Tiền lương, tiền thuế bị trừ và tiền super của bạn được báo thẳng cho ATO, trong bảng kê thu nhập (income statement).',
    sections: {
      what: { title: 'Trên đó có gì', blocks: [
        { p: 'Bảng kê thu nhập ghi, theo từng chủ lao động, tiền lương trong năm, tiền thuế bị trừ và tiền super của bạn. Chủ lao động báo cáo qua Single Touch Payroll (STP) sẽ gửi thẳng cho ATO.' },
      ] },
      'tax-ready': { title: 'Vì sao chúng tôi chờ “Tax ready”', blocks: [
        { p: 'ATO cho biết phần lớn chủ lao động có hạn đến ngày 14 tháng 7 để hoàn tất dữ liệu. Khi họ hoàn tất, bảng kê thu nhập của bạn hiện trạng thái “Tax ready”, và ATO sẽ gửi tin nhắn vào hộp thư myGov khi tất cả bảng kê đã sẵn sàng.' },
        { note: 'ATO cho biết nếu bạn nộp hồ sơ trước khi bảng kê hiện “Tax ready”, bạn có thể phải sửa lại hồ sơ thuế. Nếu bạn có hai, ba chủ lao động, chỉ cần một nơi hoàn tất chậm là bạn đã có thể phải sửa hồ sơ.' },
      ] },
      'see-it': { title: 'Xem ở đâu', blocks: [
        { list: [
          'Trong myGov: ATO, rồi Employment, rồi Income statement.',
          'Trong ứng dụng ATO, mục Employment.',
          'Bạn không cần gửi ảnh chụp màn hình cho chúng tôi.',
        ] },
      ] },
    },
    sourceLabels: ['ATO: Xem bảng kê thu nhập (income statement)'],
    short: {"answer": "Hãy chờ đến khi mọi bảng kê thu nhập trong myGov đều hiện “Tax ready” rồi mới nộp hồ sơ. Chủ lao động có hạn đến ngày 14 tháng 7 để hoàn tất, và nộp sớm hơn có thể khiến bạn phải sửa hồ sơ.", "mark": "“Tax ready”"},
  },
  'what-is-an-abn-students': {
    label: 'Du học sinh có cần ABN không?',
    meta: { title: 'ABN là gì, du học sinh có cần không?', description: 'ABN dùng khi bạn tự kinh doanh như giao đồ ăn, không dùng cho việc làm thuê. Khi nào du học sinh cần ABN, cách đăng ký miễn phí và khai thuế có gì khác.' },
    h1: { before: 'ABN là gì, ', mark: 'bạn có cần không?' },
    lead: 'Mã số doanh nghiệp Úc (ABN) dành cho người tự làm cho chính mình. Phần lớn việc làm thêm của du học sinh không thuộc loại này. Giao đồ ăn và một số việc tự do thì thường là có.',
    sections: {
      what: { title: 'ABN dùng để làm gì', blocks: [
        { p: 'Cơ quan Đăng ký Doanh nghiệp Úc (ABR) cho biết bạn được cấp ABN nếu bạn đang hoặc sắp kinh doanh (enterprise) tại Úc. Giao hàng cho ứng dụng, dạy kèm riêng hay làm tự do cho nhiều khách hàng đều có thể thuộc trường hợp này.' },
        { p: 'Bạn không đủ điều kiện được cấp ABN cho công việc bạn làm với tư cách nhân viên, kể cả khi nơi làm gọi đó là làm “nhà thầu” (contracting). Chủ lao động không nên bắt bạn phải có ABN mới cho đi làm.' },
      ] },
      apply: { title: 'Cách đăng ký', blocks: [
        { list: [
          'Đăng ký trực tuyến với Cơ quan Đăng ký Doanh nghiệp Úc. Hoàn toàn miễn phí.',
          'Bạn cần mã số thuế (TFN) để đăng ký.',
          'Chỉ đăng ký khi bạn thật sự đủ điều kiện: cơ quan này cảnh báo rằng khai gian có thể bị truy tố.',
        ] },
        { p: 'Bạn vẫn giữ TFN. ABN là một số riêng cho phần việc tự kinh doanh; các công việc làm thuê vẫn dùng TFN.' },
      ] },
      'tax-time': { title: 'Khi khai thuế có gì khác', blocks: [
        { p: 'Không ai trừ thuế trước từ thu nhập ABN. Khoản này được khai là thu nhập kinh doanh, trừ đi các chi phí cho công việc, phần còn lại được tính thuế cùng với tiền lương của bạn.' },
        { note: 'Đây là lý do du học sinh làm việc bằng ABN có thể phải đóng thêm thuế vào cuối năm. Mỗi lần nhận tiền, để riêng ra một phần sẽ giúp bạn chủ động hơn.' },
      ] },
    },
    faq: [
      { q: 'Tôi vừa đi làm thuê vừa có ABN được không?', a: 'Được. Công việc làm thuê trả lương cho bạn như một nhân viên và có trừ thuế từ lương. ABN chỉ dùng cho phần việc bạn tự làm.' },
      { q: 'Có ABN thì điều kiện làm việc trong visa của tôi có thay đổi không?', a: 'Điều kiện visa do Bộ Nội vụ (Department of Home Affairs) quy định, không phải hệ thống thuế. Bạn hãy kiểm tra ở đó, vì ABN không làm thay đổi các điều kiện này.' },
    ],
    sourceLabels: ['Cơ quan Đăng ký Doanh nghiệp Úc: Điều kiện được cấp ABN', 'Cộng đồng ATO: Hướng dẫn đăng ký ABN'],
    short: {"answer": "ABN dùng khi bạn tự làm cho chính mình, như giao hàng cho ứng dụng, không dùng cho công việc làm thuê với tư cách nhân viên. Đăng ký miễn phí, và thu nhập ABN không bị trừ thuế trước.", "mark": "không dùng cho công việc làm thuê"},
  },
  'employee-or-contractor': {
    label: 'Nhân viên hay nhà thầu?',
    meta: { title: 'Nhân viên hay nhà thầu? Du học sinh cần biết', description: 'Có ABN, hay hợp đồng ghi là “nhà thầu”, không có nghĩa bạn là nhà thầu. Cách nhận biết bạn thật ra là nhân viên, và vì sao điều này ảnh hưởng đến thuế và super của bạn.' },
    h1: { before: 'Nhân viên hay ', mark: 'nhà thầu', after: '?' },
    lead: 'Một số nơi yêu cầu nhân viên mới phải có ABN. Điều đó không quyết định bạn có phải nhà thầu hay không. Cách bạn thực sự làm việc mới quyết định.',
    sections: {
      difference: { title: 'Khác nhau ở đâu', blocks: [
        { p: 'Trang business.gov.au giải thích đơn giản: nhân viên làm việc trong doanh nghiệp của người khác, và doanh nghiệp đó quyết định họ làm việc thế nào, ở đâu và khi nào. Nhà thầu (contractor) thì điều hành công việc kinh doanh của riêng mình.' },
        { list: [
          'Nhà thầu thường dùng dụng cụ và cách làm của riêng mình.',
          'Họ có thể tự thương lượng giá.',
          'Họ có thể làm cho nhiều khách hàng.',
        ] },
        { p: 'Không có dấu hiệu nào tự nó quyết định được; phải xem xét nhiều yếu tố cùng nhau.' },
      ] },
      myths: { title: 'Những điều không biến bạn thành nhà thầu', blocks: [
        { list: [
          'Có ABN.',
          'Hợp đồng ghi bạn là nhà thầu.',
          'Việc ngắn hạn hoặc làm casual (theo ca, không cố định).',
          '“Ngành này ai cũng là nhà thầu.”',
        ] },
        { p: 'ATO cho biết điều quyết định là các điều kiện làm việc thực tế giữa bạn và doanh nghiệp. Doanh nghiệp không thể tự ý coi một nhân viên là nhà thầu.' },
      ] },
      why: { title: 'Vì sao điều này quan trọng', blocks: [
        { p: 'Nếu là nhân viên, chủ lao động sẽ trừ thuế từ lương và đóng super cho bạn. Nếu là nhà thầu, bạn tự lo phần thuế của mình. ATO cho biết doanh nghiệp coi nhân viên là nhà thầu có thể bị phạt.' },
        { note: 'Bắt một nhân viên mang danh “nhà thầu” để né quyền lợi của nhân viên được gọi là hợp đồng thầu giả (sham contracting), và việc này là phạm pháp. Nếu bạn nghĩ mình đang gặp chuyện này, Thanh tra Công bằng Lao động (Fair Work Ombudsman) có thể giúp bạn.' },
      ] },
    },
    sourceLabels: ['ATO: Những hiểu lầm thường gặp về nhà thầu', 'business.gov.au: Nhân viên hay nhà thầu?'],
    short: {"answer": "Có ABN, hay hợp đồng ghi là “nhà thầu”, không có nghĩa bạn là nhà thầu. Điều quyết định là cách bạn thực sự làm việc: nhân viên làm việc trong doanh nghiệp của người khác, và doanh nghiệp đó quyết định họ làm việc thế nào, ở đâu và khi nào.", "mark": "cách bạn thực sự làm việc"},
  },
  'work-deductions-students': {
    label: 'Khấu trừ chi phí công việc',
    meta: { title: 'Chi phí công việc du học sinh được khấu trừ', description: 'Du học sinh làm việc bán thời gian thường được khấu trừ gì: dụng cụ, đồ bảo hộ và đồng phục, tiền giặt. Những gì không được khấu trừ, kể cả học phí trong hầu hết trường hợp.' },
    h1: { before: 'Những chi phí ', mark: 'công việc', after: ' được khấu trừ' },
    lead: 'Khoản khấu trừ làm giảm phần thu nhập bạn phải đóng thuế. Với việc làm thêm, số tiền thường không lớn, nhưng nên làm cho đúng, vì một số khoản hay được khai lại không được phép.',
    sections: {
      rules: { title: 'Ba quy tắc cho mọi khoản khấu trừ', blocks: [
        { list: [
          'Bạn tự bỏ tiền ra và không được ai hoàn lại.',
          'Chi phí liên quan trực tiếp đến việc tạo ra thu nhập.',
          'Bạn có chứng từ, thường là hóa đơn.',
        ] },
      ] },
      tools: { title: 'Dụng cụ và thiết bị', blocks: [
        { p: 'Món đồ dùng cho công việc có giá từ $300 trở xuống, và không thuộc một bộ có tổng giá trên $300, có thể được khấu trừ ngay trong năm mua. Trên $300 thì được khấu trừ dần qua số năm sử dụng (effective life). Nếu bạn cũng dùng cho việc riêng, chỉ phần dùng cho công việc mới được tính.' },
      ] },
      clothing: { title: 'Quần áo và tiền giặt', blocks: [
        { p: 'Bạn được khấu trừ đồ bảo hộ, đồng phục bắt buộc giúp nhận biết chủ lao động của bạn, đồng phục không bắt buộc đã được đăng ký, và trang phục riêng của một nghề, như quần kẻ ô của đầu bếp.' },
        { note: 'Quần áo thông thường không được khấu trừ, kể cả khi chủ lao động yêu cầu mặc. Ví dụ của chính ATO: quần đen và áo sơ mi trắng của nhân viên pha chế.' },
        { p: 'Nếu bạn tự giặt ở nhà quần áo làm việc thuộc diện được khấu trừ, bạn có thể tính $1 cho mỗi mẻ giặt, hoặc 50 cent nếu giặt chung với đồ cá nhân. Từ năm 2025-26 trở về trước, bạn chỉ cần chứng từ bằng văn bản khi tổng chi phí công việc khai trên $300 và tiền giặt trên $150. Từ năm tài chính 2026-27, ngoại lệ $150 cho tiền giặt không còn nữa: ATO cho biết nếu bạn kê khai chi phí công việc nhiều hơn khoản khấu trừ chuẩn, mọi chi phí công việc đều cần chứng từ bằng văn bản; riêng tiền giặt tính theo $1 hoặc 50 cent mỗi mẻ thì cần ghi lại số mẻ đã giặt. Cũng từ năm 2026-27, người cư trú về thuế có thu nhập từ lương được tự động hưởng khoản khấu trừ chuẩn tối đa $1,000 mà không cần hóa đơn; chi phí công việc nào bạn kê khai thêm sẽ trừ bớt đúng bằng số đó vào khoản khấu trừ chuẩn.' },
      ] },
      course: { title: 'Học phí của bạn', blocks: [
        { p: 'Việc học chỉ được khấu trừ khi nó liên quan đủ chặt chẽ đến công việc hiện tại của bạn: giúp duy trì hoặc nâng cao kỹ năng công việc đó cần, hoặc nhiều khả năng làm tăng thu nhập từ công việc đó.' },
        { p: 'Một tấm bằng giúp bạn bước vào nghề mới thì không được khấu trừ, việc học trong thời gian không đi làm cũng vậy. Với hầu hết du học sinh, học phí không phải là khoản khấu trừ.' },
      ] },
    },
    faq: [
      { q: 'Tôi có được khấu trừ tiền điện thoại không?', a: 'Chỉ phần dùng cho công việc, và chỉ khi bạn thật sự dùng nó để làm việc. Hãy cho chúng tôi biết bạn dùng thế nào, chúng tôi sẽ xem mức nào là hợp lý.' },
    ],
    sourceLabels: ['ATO: Khấu trừ chi phí công việc', 'ATO: Dụng cụ và thiết bị cho công việc', 'ATO: Chi phí quần áo, giặt và giặt khô', 'ATO: Chi phí học tập nâng cao chuyên môn', 'ATO: Khấu trừ chuẩn cho chi phí công việc'],
    short: {"answer": "Bạn được khấu trừ những chi phí tự bỏ tiền ra, liên quan trực tiếp đến công việc và có chứng từ: dụng cụ, đồ bảo hộ, đồng phục bắt buộc. Quần áo thông thường không được khấu trừ, và với hầu hết du học sinh, học phí cũng vậy.", "mark": "liên quan trực tiếp đến công việc", "facts": [{"figure": "$300", "label": "trở xuống: dụng cụ được khấu trừ ngay trong năm mua"}]},
  },
  'cancel-abn-before-leaving': {
    label: 'Hủy ABN',
    meta: { title: 'Hủy ABN trước khi rời Úc', description: 'Ngừng làm việc bằng ABN thì hủy ABN trong vòng 28 ngày. Hủy ABN giải quyết được gì, không giải quyết được gì, và vì sao hồ sơ thuế cuối vẫn phải khai thu nhập kinh doanh.' },
    h1: { before: 'Không giao hàng nữa? ', mark: 'Hãy hủy ABN' },
    lead: 'Khi học xong và ngừng công việc bằng ABN, bạn không nên để ABN nằm đó. Hủy thì nhanh, nhưng không có nghĩa là mọi thứ đã xong.',
    sections: {
      when: { title: 'Khi nào cần hủy', blocks: [
        { p: 'Hãy hủy ABN khi công việc kinh doanh của bạn dừng lại, ví dụ khi bạn không giao hàng nữa và rời Úc. Cơ quan Đăng ký Doanh nghiệp Úc cho biết nếu công việc kinh doanh đã dừng, bạn phải hủy hoặc cập nhật ABN trong vòng 28 ngày.' },
      ] },
      how: { title: 'Cách hủy', blocks: [
        { list: [
          'Hủy trực tuyến bằng myID, sau khi myID đã được liên kết với ABN qua Relationship Authorisation Manager (RAM).',
          'Hoặc nhờ một chuyên viên thuế hủy giúp bạn.',
        ] },
        { p: 'Phần lớn các đăng ký gắn với ABN, như GST, sẽ bị hủy cùng lúc.' },
      ] },
      still: { title: 'Những việc hủy ABN không giải quyết được', blocks: [
        { p: 'Bạn vẫn phải nộp hồ sơ thuế cuối cùng (có khai thu nhập kinh doanh của năm đó) và mọi bản kê hoạt động (activity statement) đến hạn. Hãy giữ giấy tờ trong 5 năm kể từ ngày nộp hồ sơ.' },
        { note: 'Nếu sau này bạn quay lại và tự làm việc theo cùng hình thức, khi đăng ký lại bạn sẽ được cấp đúng ABN cũ.' },
      ] },
    },
    sourceLabels: ['ATO: Hủy các đăng ký kinh doanh', 'Cơ quan Đăng ký Doanh nghiệp Úc: Khi nào nên hủy ABN'],
    short: {"answer": "Khi ngừng làm việc bằng ABN, hãy hủy ABN trong vòng 28 ngày. Bạn vẫn phải nộp hồ sơ thuế cuối cùng, có khai thu nhập kinh doanh của năm đó.", "mark": "trong vòng 28 ngày"},
  },
  'lodge-from-overseas': {
    label: 'Khai thuế từ nước ngoài',
    meta: { title: 'Khai thuế Úc khi đang ở nước ngoài', description: 'Đã về nước trước mùa thuế? Bạn vẫn có thể nộp hồ sơ thuế Úc trực tuyến, hoặc nhờ người nộp giúp. Những gì cần chuẩn bị sẵn trước khi rời Úc.' },
    h1: { before: 'Khai thuế khi đang ', mark: 'ở nước ngoài' },
    lead: 'Nhiều du học sinh học xong giữa năm và về nước trước mùa thuế. Hồ sơ thuế Úc của bạn vẫn có thể nộp được, dù bạn đang ở đâu.',
    sections: {
      ways: { title: 'Các cách nộp hồ sơ', blocks: [
        { list: [
          'Tự nộp trực tuyến bằng myTax qua myGov.',
          'Nhờ một dịch vụ nộp giúp. Chúng tôi hoạt động dưới sự giám sát của một đại lý thuế đã đăng ký.',
          'Nộp bằng giấy, chậm hơn.',
        ] },
      ] },
      'set-up': { title: 'Những thứ cần chuẩn bị sẵn', blocks: [
        { list: [
          'Tài khoản đăng nhập myGov: ATO khuyên bạn cập nhật cài đặt đăng nhập để dùng được khi ở nước ngoài.',
          'Một tài khoản ngân hàng ở Úc để nhận tiền hoàn thuế, nếu có.',
          'Email và số điện thoại bạn vẫn dùng, để chúng tôi và ATO liên lạc được với bạn.',
        ] },
      ] },
      when: { title: 'Khi nào nộp', blocks: [
        { p: 'Thời gian khai thuế thông thường là từ 1 tháng 7 đến 31 tháng 10. Đại lý thuế đã đăng ký có một chương trình nộp hồ sơ riêng, có thể cho phép khách hàng của họ nộp muộn hơn, với điều kiện bạn liên hệ đại lý thuế trước ngày 31 tháng 10.' },
      ] },
    },
    faq: [
      { q: 'Tôi đã rời Úc rồi, làm với Student Visa Tax có khác gì không?', a: 'Không khác. Dù bạn ở đâu, chúng tôi vẫn làm việc với bạn qua WhatsApp, và hồ sơ của bạn được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO.' },
    ],
    sourceLabels: ['ATO: Nộp hồ sơ thuế khi ở ngoài nước Úc', 'ATO: Hạn nộp hồ sơ khi khai qua đại lý'],
    short: {"answer": "Bạn có thể nộp hồ sơ thuế Úc khi đang ở nước ngoài: tự nộp trực tuyến qua myGov, hoặc nhờ một dịch vụ nộp giúp. Hãy giữ cho tài khoản myGov đăng nhập được và tài khoản ngân hàng ở Úc vẫn mở.", "mark": "khi đang ở nước ngoài"},
  },
  'how-much-super-employer-pays': {
    label: 'Super khi đi làm bằng visa du học',
    meta: { title: 'Visa du học: chủ lao động đóng super cho bạn', description: 'Du học sinh làm casual hay bán thời gian với visa tạm trú nhìn chung cũng được đóng super. Mức 12%, quy định cho người dưới 18 tuổi, và thời hạn Payday Super mới từ 1/7/2026.' },
    h1: { before: 'Chủ lao động cũng đóng ', mark: 'super', after: ' cho bạn' },
    lead: 'Super là khoản tiền chủ lao động đóng vào quỹ hưu trí cho bạn, ngoài tiền lương. Visa du học không làm thay đổi điều này, và bạn có thể xin rút lại sau khi rời Úc.',
    sections: {
      who: { title: 'Ai được đóng', blocks: [
        { p: 'ATO cho biết nhìn chung mọi nhân viên đều đủ điều kiện: toàn thời gian, bán thời gian hay casual, kể cả người tạm trú. Du học sinh cũng thuộc diện này.' },
        { list: [
          'Nếu bạn dưới 18 tuổi, chỉ những tuần bạn làm hơn 30 giờ mới được đóng.',
          'Nếu bạn làm bằng ABN nhưng được trả tiền chủ yếu cho công sức lao động, bạn vẫn có thể đủ điều kiện.',
        ] },
      ] },
      rate: { title: 'Đóng bao nhiêu', blocks: [
        { p: 'Mức super bắt buộc (super guarantee) là 12%. Khoản này được đóng thêm ngoài lương, không bị trừ vào lương.' },
      ] },
      payday: { title: 'Khi nào đóng: Payday Super', blocks: [
        { p: 'Từ ngày 1 tháng 7 năm 2026, chủ lao động phải đóng super cùng lúc với trả lương, và tiền phải vào quỹ của bạn trong vòng 7 ngày làm việc. Với nhân viên mới, khoản đầu tiên có thể mất đến 20 ngày làm việc.' },
        { note: 'Nhờ vậy việc kiểm tra dễ hơn nhiều: sau mỗi kỳ lương, trong khoảng một tuần rưỡi lẽ ra phải có một khoản super được chuyển vào quỹ của bạn.' },
      ] },
    },
    sourceLabels: ['ATO: Xác định có phải đóng super hay không', 'Thanh tra Công bằng Lao động: Payday Super'],
    short: {"answer": "Nhân viên casual, bán thời gian và toàn thời gian, kể cả du học sinh có visa tạm trú, nhìn chung đều được đóng super ở mức 12% ngoài tiền lương. Từ ngày 1 tháng 7 năm 2026, tiền nhìn chung phải vào quỹ của bạn trong vòng 7 ngày làm việc sau ngày trả lương.", "mark": "12% ngoài tiền lương", "facts": [{"figure": "12%", "label": "mức super bắt buộc"}, {"figure": "7", "label": "ngày làm việc để tiền vào quỹ của bạn"}]},
  },
  'find-and-check-your-super': {
    label: 'Tìm và kiểm tra super',
    meta: { title: 'Cách du học sinh tìm và kiểm tra super', description: 'Mỗi công việc mới có thể mở thêm một tài khoản super. Cách xem tất cả tài khoản và số tiền chủ lao động đã đóng trên myGov, và cần kiểm tra gì trước khi gộp tài khoản.' },
    h1: { before: 'Tìm và kiểm tra ', mark: 'super của bạn' },
    lead: 'Ba công việc casual có thể là ba tài khoản super. Nên biết super của bạn đang ở đâu trước khi rời Úc, và kiểm tra khi còn ở đây thì dễ hơn nhiều.',
    sections: {
      see: { title: 'Xem trên myGov', blocks: [
        { p: 'Trong dịch vụ trực tuyến của ATO, qua myGov, bạn có thể:' },
        { list: [
          'Xem các tài khoản super mà ATO biết, kể cả tài khoản bị thất lạc.',
          'Xem super do ATO giữ (super chưa được nhận).',
          'Xem các khoản super mà chủ lao động đã báo cáo.',
        ] },
        { p: 'Vào Super, rồi Fund details. Hãy xem ngày “as at” bên cạnh từng số dư: quỹ của bạn có thể đã có bảng kê mới hơn.' },
      ] },
      missing: { title: 'Nếu thiếu một tài khoản', blocks: [
        { p: 'Một số tài khoản có thể không hiện ra, ví dụ khi quỹ chưa báo cáo hoặc thông tin của bạn không khớp. Bảng kê thành viên của quỹ, hoặc một cuộc gọi đến quỹ, sẽ giúp bạn xác nhận.' },
      ] },
      combine: { title: 'Gộp tài khoản', blocks: [
        { p: 'Bạn có thể chuyển trọn từng tài khoản về một quỹ trong dịch vụ trực tuyến của ATO: Super, rồi Manage, rồi Transfer super. Trước khi làm:' },
        { list: [
          'Kiểm tra bảo hiểm: quỹ bạn rời đi có thể đang bảo hiểm cho bạn khi tử vong, bệnh tật hoặc thương tật.',
          'Kiểm tra phí: quỹ cũ có thể thu phí rút, quỹ mới có thể thu phí gia nhập.',
          'Báo cho chủ lao động quỹ bạn muốn dùng: chuyển tiền không làm thay đổi nơi họ đóng super.',
        ] },
      ] },
    },
    sourceLabels: ['ATO: Theo dõi super trực tuyến', 'ATO: Chuyển hoặc gộp tài khoản super'],
    short: {"answer": "Trong myGov, dịch vụ trực tuyến của ATO cho bạn xem các tài khoản super, super do ATO giữ và số tiền chủ lao động đã đóng. Hãy kiểm tra bảo hiểm và phí trước khi gộp tài khoản.", "mark": "kiểm tra bảo hiểm và phí"},
  },
  'employer-not-paying-super': {
    label: 'Chủ lao động không đóng super',
    meta: { title: 'Chủ lao động không đóng super: bạn nên làm gì', description: 'Cách kiểm tra chủ lao động đã đóng super cho bạn chưa, cách hỏi họ, và cách báo cáo super chưa đóng với ATO, kể cả khi bạn đang có visa tạm trú.' },
    h1: { before: 'Khi chủ lao động ', mark: 'không đóng super' },
    lead: 'Nếu quỹ của bạn thiếu tiền super, việc kiểm tra không khó, và có cách chính thức để báo cáo.',
    sections: {
      check: { title: 'Kiểm tra trước', blocks: [
        { list: [
          'Xem bảng kê của quỹ super, hoặc gọi cho quỹ.',
          'Vào dịch vụ trực tuyến của ATO qua myGov để xem các khoản super chủ lao động đã báo cáo.',
          'Từ ngày 1 tháng 7 năm 2026, super phải vào quỹ của bạn trong vòng 7 ngày làm việc sau mỗi kỳ lương, hoặc 20 ngày làm việc với khoản đầu tiên của nhân viên mới.',
        ] },
      ] },
      ask: { title: 'Hỏi chủ lao động', blocks: [
        { p: 'Nếu thấy thoải mái, bạn có thể hỏi họ lần gần nhất đóng là khi nào, đóng vào quỹ nào và đóng bao nhiêu. Có thể tiền đang được đóng vào một tài khoản bạn không biết.' },
      ] },
      report: { title: 'Báo cáo với ATO', blocks: [
        { p: 'ATO có công cụ trực tuyến để báo cáo super chưa được đóng, và ai cũng có thể dùng. Bạn cần thông tin cá nhân, gồm cả TFN, khoảng thời gian bạn thấy có vấn đề, và ABN của chủ lao động.' },
        { p: 'ATO sẽ xác nhận đã nhận được báo cáo, và thông báo cho bạn qua thư hoặc email nếu thu được super và chuyển vào quỹ của bạn. Việc này có thể mất thời gian, và không phải trường hợp nào cũng thu hồi được super.' },
      ] },
    },
    sourceLabels: ['ATO: Báo cáo super chủ lao động chưa đóng', 'ATO: Xác định có phải đóng super hay không'],
    short: {"answer": "Trước hết hãy xem bảng kê của quỹ hoặc myGov, rồi hỏi chủ lao động. Nếu vẫn thiếu super, hãy báo cáo bằng công cụ trực tuyến của ATO: ai cũng có thể dùng.", "mark": "báo cáo bằng công cụ trực tuyến của ATO"},
  },
  'dasp-documents-and-timing': {
    label: 'DASP: cần chuẩn bị gì',
    meta: { title: 'Hồ sơ DASP: giấy tờ cần có và thời gian xử lý', description: 'ATO hỏi những thông tin gì trong đơn DASP, vì sao không nộp được khi visa còn hiệu lực, mất bao lâu, và super không được rút sẽ ra sao.' },
    h1: { before: 'Rút lại super: ', mark: 'cần chuẩn bị gì' },
    lead: 'Bạn rút lại super dưới dạng khoản super khi rời Úc (DASP), sau khi đã rời Úc và visa đã hết hiệu lực. Nếu chuẩn bị sẵn thông tin, đơn này khá ngắn.',
    sections: {
      need: { title: 'Đơn hỏi những gì', blocks: [
        { list: [
          'Họ tên, ngày sinh và địa chỉ email.',
          'Quốc gia cấp hộ chiếu và số hộ chiếu.',
          'Thông tin quỹ super, gồm ABN của quỹ, và số thành viên nếu bạn có.',
          'TFN của bạn (không bắt buộc).',
        ] },
        { p: 'Hãy ghi lại những thông tin này trước khi bay. Đơn trực tuyến của ATO là miễn phí.' },
      ] },
      visa: { title: 'Visa phải hết hiệu lực', blocks: [
        { p: 'Bạn chỉ nộp được khi đã rời Úc và không còn visa nào có hiệu lực. Nếu visa vẫn còn hiệu lực, đơn sẽ không nộp được; bạn có thể kiểm tra tình trạng visa trên VEVO. Bạn có thể bắt đầu điền đơn trước khi rời Úc.' },
      ] },
      time: { title: 'Mất bao lâu', blocks: [
        { p: 'ATO cho biết điền đơn trực tuyến mất khoảng 30 phút, và thời gian xử lý DASP theo tiêu chuẩn dịch vụ là 28 ngày kể từ khi nhận đủ hồ sơ.' },
      ] },
      unclaimed: { title: 'Nếu bạn không rút', blocks: [
        { p: 'Sáu tháng sau khi bạn rời Úc, khi visa đã hết hiệu lực, quỹ sẽ chuyển số super đó cho ATO. Tiền không mất: có thể bạn vẫn xin rút được từ ATO theo diện DASP.' },
      ] },
    },
    sourceLabels: ['ATO: Hướng dẫn hệ thống nộp đơn DASP trực tuyến', 'ATO: Khoản super khi rời Úc (DASP)'],
    short: {"answer": "Hãy xin rút super theo diện DASP khi đã rời Úc và visa đã hết hiệu lực. Chuẩn bị sẵn hộ chiếu và thông tin quỹ; thời gian xử lý theo tiêu chuẩn của ATO là 28 ngày.", "mark": "khi đã rời Úc và visa đã hết hiệu lực", "facts": [{"figure": "$0", "label": "phí nộp đơn trực tuyến với ATO"}, {"figure": "28 ngày", "label": "tiêu chuẩn xử lý của ATO"}]},
  },
  'payslip-what-to-check': {
    label: 'Đọc phiếu lương',
    meta: { title: 'Phiếu lương phải ghi gì và bạn cần kiểm tra gì', description: 'Chủ lao động phải đưa phiếu lương trong vòng 1 ngày làm việc sau ngày trả lương. Phiếu lương phải ghi những gì, gồm cả mức lương theo giờ và super, và mỗi lần cần kiểm tra gì.' },
    h1: { before: 'Đọc ', mark: 'phiếu lương của bạn' },
    lead: 'Phiếu lương là cách dễ nhất để phát hiện vấn đề về lương, thuế hay super. Kiểm tra chỉ mất một phút.',
    sections: {
      when: { title: 'Khi nào bạn nhận được', blocks: [
        { p: 'Thanh tra Công bằng Lao động (Fair Work Ombudsman) cho biết chủ lao động phải đưa phiếu lương cho bạn trong vòng 1 ngày làm việc sau ngày trả lương, bằng giấy hoặc bản điện tử.' },
      ] },
      shows: { title: 'Phiếu lương phải ghi', blocks: [
        { list: [
          'Tên bạn, tên chủ lao động, và ABN của họ nếu có.',
          'Kỳ lương và ngày bạn được trả.',
          'Lương trước và sau thuế (gross và net).',
          'Mức lương theo giờ và số giờ bạn làm theo mức đó.',
          'Các khoản phụ cấp (loading, allowance) hoặc mức lương phụ trội (penalty rate).',
          'Từng khoản bị trừ, kể cả tiền thuế.',
          'Super của bạn, và quỹ nhận khoản đó.',
        ] },
      ] },
      check: { title: 'Cần kiểm tra gì', blocks: [
        { list: [
          'Số giờ khớp với số giờ bạn thật sự làm.',
          'Có trừ thuế, nếu bạn nghĩ lẽ ra phải có.',
          'Có ghi super, và sau đó tiền có vào quỹ của bạn.',
        ] },
        { note: 'Chủ lao động không được đưa phiếu lương mà họ biết là sai hoặc gây hiểu lầm. Hãy giữ lại phiếu lương: chúng có ích khi khai thuế và khi có vấn đề về lương.' },
      ] },
    },
    sourceLabels: ['Thanh tra Công bằng Lao động: Phiếu lương'],
    short: {"answer": "Chủ lao động phải đưa phiếu lương cho bạn trong vòng 1 ngày làm việc sau ngày trả lương. Mỗi lần, hãy kiểm tra số giờ, mức lương theo giờ, tiền thuế bị trừ và super.", "mark": "trong vòng 1 ngày làm việc"},
  },
  'unpaid-trial-shifts': {
    label: 'Làm thử không lương',
    meta: { title: 'Làm thử không lương: khi nào được phép', description: 'Buổi làm thử chỉ được không trả lương nếu đó chỉ là một buổi ngắn để thể hiện kỹ năng, có người giám sát trực tiếp. Khi nào “làm thử” trở thành công việc phải được trả lương.' },
    h1: { before: 'Buổi làm thử có ', mark: 'được không trả lương', after: ' không?' },
    lead: 'Nhiều quán cà phê và nhà hàng yêu cầu làm thử trước khi nhận người. Có buổi làm thử được phép không trả lương; có buổi thì phải trả.',
    sections: {
      allowed: { title: 'Khi nào làm thử được không trả lương', blocks: [
        { p: 'Thanh tra Công bằng Lao động (Fair Work Ombudsman) cho biết làm thử không lương chỉ hợp pháp khi đáp ứng tất cả các điều sau:' },
        { list: [
          'Chỉ để thể hiện những kỹ năng mà công việc đòi hỏi.',
          'Không kéo dài quá mức cần thiết để thể hiện kỹ năng: từ một giờ đến một ca, tùy công việc.',
          'Có người giám sát trực tiếp bạn suốt thời gian đó.',
        ] },
      ] },
      not: { title: 'Khi nào phải trả lương', blocks: [
        { p: 'Nếu buổi làm thử không chỉ là thể hiện kỹ năng, không có người giám sát trực tiếp, hoặc kéo dài hơn mức cần thiết, thì đó không còn là làm thử không lương hợp pháp, và thời gian đó phải được trả ít nhất bằng mức lương tối thiểu.' },
        { note: 'Nếu muốn xem thêm cách bạn làm việc, chủ lao động có thể nhận bạn làm casual hoặc theo diện thử việc (probation) thay vào đó, và trả lương cho bạn.' },
      ] },
    },
    sourceLabels: ['Thanh tra Công bằng Lao động: Làm thử không lương'],
    short: {"answer": "Buổi làm thử chỉ được không trả lương nếu đó là một buổi ngắn để thể hiện kỹ năng, có người giám sát trực tiếp và không kéo dài quá mức cần thiết. Ngoài những điều đó, phải trả ít nhất bằng mức lương tối thiểu.", "mark": "có người giám sát trực tiếp"},
  },
  'underpaid-student-visa': {
    label: 'Bị trả thiếu lương khi có visa du học',
    meta: { title: 'Bị trả thiếu lương? Quyền của bạn và nơi nhờ giúp', description: 'Người có visa có quyền tại nơi làm việc như mọi người khác. Fair Work cho biết visa của bạn sẽ không bị hủy vì bạn nhờ họ giúp đỡ. Gọi ai, bằng ngôn ngữ của bạn.' },
    h1: { before: 'Bị trả thiếu lương? ', mark: 'Bạn có quyền như mọi người' },
    lead: 'Một số du học sinh lo rằng khiếu nại về lương có thể ảnh hưởng đến visa. Dưới đây là những gì Thanh tra Công bằng Lao động (Fair Work Ombudsman) cho biết.',
    sections: {
      rights: { title: 'Quyền như mọi người', blocks: [
        { p: 'Fair Work cho biết người có visa và lao động nhập cư có các quyền và sự bảo vệ tại nơi làm việc giống như mọi nhân viên khác ở Úc, kể cả mức lương tối thiểu và phiếu lương.' },
      ] },
      visa: { title: 'Visa của bạn', blocks: [
        { p: 'Fair Work cho biết visa của bạn sẽ không bị hủy vì bạn liên hệ họ để nhờ giúp đỡ, và bạn vẫn có thể được hỗ trợ về các quyền lợi tối thiểu kể cả khi bạn đã vi phạm một điều kiện visa.' },
        { note: 'Fair Work cũng lưu ý vẫn có thể có hậu quả theo Luật Di trú (Migration Act). Điều kiện visa thuộc thẩm quyền của Bộ Nội vụ (Department of Home Affairs), không phải của chúng tôi.' },
      ] },
      help: { title: 'Cách nhờ giúp đỡ', blocks: [
        { list: [
          'Gọi Thanh tra Công bằng Lao động theo số 13 13 94.',
          'Nếu cần thông dịch viên miễn phí, hãy gọi 13 14 50 trước.',
          'Bạn cũng có thể báo cáo vấn đề trực tuyến mà không cần nêu tên.',
        ] },
      ] },
    },
    sourceLabels: ['Thanh tra Công bằng Lao động: Người có visa và người nhập cư'],
    short: {"answer": "Người có visa có quyền tại nơi làm việc như mọi người khác. Fair Work cho biết visa của bạn sẽ không bị hủy vì bạn nhờ họ giúp đỡ.", "mark": "có quyền tại nơi làm việc như mọi người khác", "facts": [{"figure": "13 13 94", "label": "Thanh tra Công bằng Lao động"}, {"figure": "13 14 50", "label": "thông dịch viên miễn phí, gọi trước"}]},
  },
  'cash-in-hand-and-tips': {
    label: 'Lương tiền mặt và tiền tip',
    meta: { title: 'Lương tiền mặt và tiền tip: du học sinh có phải khai?', description: 'Có. ATO cho biết thu nhập bằng tiền mặt phải được khai, và tiền tip cũng là thu nhập. Vì sao việc trả tiền mặt có thể khiến bạn phải đóng thêm thuế, và cần ghi chép những gì.' },
    h1: { before: 'Lương tiền mặt và ', mark: 'tiền tip' },
    lead: 'Được trả bằng tiền mặt không có nghĩa là khoản tiền đó không phải đóng thuế. Tiền trong hộp tip cũng vậy.',
    sections: {
      cash: { title: 'Tiền mặt cũng là thu nhập', blocks: [
        { p: 'ATO cho biết nếu bạn nhận thu nhập bằng tiền mặt, bạn phải khai khoản đó trong hồ sơ thuế. Tiền có đi qua tài khoản ngân hàng hay không cũng vậy.' },
      ] },
      tips: { title: 'Tiền tip cũng là thu nhập', blocks: [
        { p: 'ATO liệt kê tiền tip, tiền thưởng của khách và các khoản tiền khác trả cho dịch vụ của bạn là thu nhập phải khai.' },
      ] },
      records: { title: 'Ghi chép lại', blocks: [
        { list: [
          'Mỗi lần được trả tiền mặt, ghi lại ngày, số giờ làm và số tiền.',
          'Giữ lại phiếu lương hoặc tin nhắn của chủ lao động về tiền lương.',
          'Ghi lại cả tiền tip bạn nhận được.',
        ] },
        { note: 'Nếu lương tiền mặt chưa bị trừ thuế, khi khai thuế bạn có thể phải đóng thêm. Báo cho chúng tôi sớm sẽ đỡ bất ngờ hơn.' },
      ] },
    },
    sourceLabels: ['ATO: Thu nhập phải tính thuế (assessable income)'],
    short: {"answer": "Có. Lương tiền mặt và tiền tip đều là thu nhập, và ATO cho biết bạn phải khai. Hãy ghi lại ngày, số giờ làm và số tiền.", "mark": "bạn phải khai"},
  },
  'amend-tax-return': {
    label: 'Sửa hồ sơ đã nộp',
    meta: { title: 'Khai thuế bị sai? Cách sửa hồ sơ', description: 'Quên một bảng kê thu nhập hay một công việc thứ hai? Cá nhân thường có 2 năm kể từ thông báo tính thuế để sửa hồ sơ thuế. Hướng dẫn cách làm.' },
    h1: { before: 'Sửa hồ sơ thuế ', mark: 'sau khi đã nộp' },
    lead: 'Bảng kê thu nhập có muộn, một công việc thứ hai bị quên, một khoản khấu trừ bị bỏ sót: hồ sơ đã nộp vẫn có thể sửa được. Việc này gọi là sửa đổi (amendment).',
    sections: {
      when: { title: 'Bạn có bao lâu', blocks: [
        { p: 'ATO cho biết cá nhân thường có 2 năm để sửa, tính từ ngày sau khi thông báo tính thuế (notice of assessment) được gửi. Từ năm 2024-25, người tự kinh doanh (sole trader), như du học sinh giao hàng bằng ABN, có 4 năm. Trong thời gian này bạn có thể yêu cầu sửa nhiều lần.' },
      ] },
      how: { title: 'Cách sửa', blocks: [
        { list: [
          'Nếu bạn tự nộp bằng myTax: vào Income tax history và chọn Amend cho năm đó.',
          'Nếu chúng tôi nộp giúp: nhắn cho chúng tôi qua WhatsApp, chúng tôi sẽ cùng bạn chuẩn bị hồ sơ sửa đổi.',
        ] },
      ] },
      common: { title: 'Lý do thường gặp ở du học sinh', blocks: [
        { list: [
          'Hồ sơ được nộp trước khi bảng kê thu nhập hiện “Tax ready”.',
          'Bỏ sót một công việc, hoặc thu nhập ABN.',
          'Bỏ sót một khoản khấu trừ, hoặc khai một khoản lẽ ra không được khấu trừ.',
        ] },
        { note: 'Sửa đổi có thể làm số thuế của bạn tăng hoặc giảm. Tự sửa sai sót bao giờ cũng tốt hơn là đợi ATO phát hiện.' },
      ] },
    },
    sourceLabels: ['ATO: Thời hạn sửa hồ sơ thuế', 'ATO: Yêu cầu sửa đổi (myTax)'],
    short: {"answer": "Hồ sơ đã nộp vẫn sửa được: cá nhân thường có 2 năm kể từ thông báo tính thuế để sửa. Trong myTax, vào Income tax history và chọn Amend.", "mark": "2 năm"},
  },
  'tax-return-deadline-31-october': {
    label: 'Hạn khai thuế 31 tháng 10',
    meta: { title: 'Hạn khai thuế 2026 cho du học sinh: ngày 31/10', description: 'Tự khai thuế năm 2025-26? Hạn chót là 11:59 tối ngày 31/10/2026. Nếu khai qua đại lý, ngày 31/10 vẫn là mốc quan trọng.' },
    h1: { before: 'Hạn khai thuế năm nay là ', mark: '31/10/2026' },
    lead: 'Hồ sơ thuế 2025-26 tính từ 1/7/2025 đến 30/6/2026. Nếu bạn tự khai, hạn chót là 31/10/2026. Dưới đây là ý nghĩa của mốc này với bạn, và chuyện gì xảy ra nếu bạn lỡ hạn.',
    sections: {
      when: { title: 'Khi nào là hạn nộp hồ sơ của tôi?', blocks: [
        { p: 'ATO cho biết người tự khai thuế có đến 11:59 tối theo giờ địa phương ngày 31/10/2026.' },
        { p: 'Hạn vẫn như vậy kể cả khi bạn đã học xong và về nước.' },
      ] },
      agent: { title: 'Khai qua đại lý thì hạn có muộn hơn không?', blocks: [
        { p: 'Đại lý thuế đã đăng ký có chương trình nộp hồ sơ, thường cho phép họ nộp cho khách hàng sau ngày 31/10.' },
        { list: [
          'Muốn dùng hạn muộn hơn này, bạn phải có tên trong danh sách khách hàng của đại lý chậm nhất là ngày 31/10.',
          'Nếu đến ngày 30/6/2026 vẫn còn năm trước chưa khai, hồ sơ năm nay phải nộp chậm nhất là ngày 31/10, kể cả khi khai qua đại lý.',
        ] },
      ] },
      missed: { title: 'Nếu tôi lỡ hạn thì sao?', blocks: [
        { p: 'Hãy khai càng sớm càng tốt. Tiền phạt nộp trễ của ATO có thể lên đến $1,820, nhưng ATO cho biết thường không phạt khi bạn chỉ trễ một lần, và sẽ cảnh báo trước.' },
        { p: 'Nếu bạn có tiền hoàn thuế, khai trễ không làm mất khoản đó. Bạn chỉ phải chờ tiền của chính mình lâu hơn.' },
      ] },
      check: { title: 'Kiểm tra trước khi nộp', blocks: [
        { list: [
          'Mọi bảng kê thu nhập trong myGov đều hiện “Tax ready”.',
          'Nếu muốn xin miễn Medicare levy, bạn đã có Medicare Entitlement Statement.',
          'Bạn biết mình có thể là người cư trú về thuế trong năm đó hay không.',
        ] },
        { note: 'Hồ sơ nộp vội mà sai một trong các điểm này sẽ phải sửa lại sau, mất thời gian hơn làm đúng ngay từ đầu.' },
      ] },
    },
    faq: [
      { q: 'Tôi chỉ đi làm vài tháng. Có cần khai thuế không?', a: 'Thường là có, nếu lương của bạn đã bị trừ thuế hoặc bạn có thu nhập ABN. Mỗi năm tài chính là một hồ sơ riêng.' },
      { q: 'Tôi đã rời Úc. Hạn có thay đổi không?', a: 'Không. Hạn nộp như nhau dù bạn ở đâu. Hãy giữ tài khoản ngân hàng ở Úc cho đến khi nhận được tiền hoàn thuế, nếu có.' },
    ],
    sourceLabels: ['ATO: Đếm ngược, ATO nhắc người nộp thuế khai ngay (19/10/2026)', 'ATO: Hạn nộp hồ sơ khi khai qua đại lý', 'ATO: Phạt nộp hồ sơ trễ hạn'],
    short: {"answer": "Nếu bạn tự khai hồ sơ thuế 2025-26, hạn là 11:59 tối theo giờ địa phương ngày 31/10/2026. Muốn dùng hạn muộn hơn của đại lý, bạn phải có tên trong danh sách khách hàng của họ chậm nhất là ngày 31/10.", "mark": "31/10/2026", "facts": [{"figure": "11:59 tối", "label": "giờ địa phương, ngày 31/10, nếu bạn tự khai"}, {"figure": "$1,820", "label": "mức phạt nộp trễ cao nhất"}]},
  },
  'late-lodgment': {
    label: 'Nộp hồ sơ trễ hạn',
    meta: { title: 'Nộp hồ sơ thuế trễ hạn có bị phạt không?', description: 'Tiền phạt nộp trễ của ATO được tính thế nào, vì sao thường không bị phạt nếu chỉ trễ một lần, và vì sao nộp sớm nhất có thể vẫn là cách tốt nhất.' },
    h1: { before: 'Lỡ hạn rồi? ', mark: 'Nộp trễ vẫn hơn không nộp' },
    lead: 'Học kỳ bận, thi cử, một chuyến về nước: ngày 31 tháng 10 có thể trôi qua lúc nào không hay. Vẫn khắc phục được, và càng sớm càng tốt.',
    sections: {
      penalty: { title: 'Tiền phạt', blocks: [
        { p: 'Tiền phạt nộp trễ của ATO (failure to lodge on time penalty) là một đơn vị phạt cho mỗi 28 ngày trễ (chưa đủ 28 ngày cũng tính một lần), tối đa 5 đơn vị phạt đối với cá nhân.' },
        { p: 'ATO cho biết thường không phạt trong trường hợp chỉ nộp trễ một lần, và sẽ cảnh báo bạn qua điện thoại hoặc bằng văn bản trước khi phạt.' },
      ] },
      'what-to-do': { title: 'Nên làm gì', blocks: [
        { list: [
          'Nộp càng sớm càng tốt, kể cả khi đã trễ.',
          'Nếu bạn còn nợ hồ sơ của nhiều năm, mỗi năm là một hồ sơ riêng.',
          'Nếu đã bị phạt, bạn có thể xin ATO miễn giảm, sau khi đã nộp đủ các hồ sơ còn thiếu.',
        ] },
        { note: 'Nếu bạn được hoàn thuế, nộp trễ chỉ làm tiền của chính bạn về chậm hơn.' },
      ] },
    },
    sourceLabels: ['ATO: Tiền phạt nộp hồ sơ trễ hạn'],
    short: {"answer": "Hãy nộp sớm nhất có thể. ATO thường không phạt nếu chỉ nộp trễ một lần, và sẽ cảnh báo trước khi phạt. Nếu bạn được hoàn thuế, nộp trễ chỉ làm tiền của chính bạn về chậm hơn.", "mark": "Hãy nộp sớm nhất có thể"},
  },
  'tax-payment-plan': {
    label: 'Nợ thuế: trả góp',
    meta: { title: 'Nợ thuế ATO? Cách đăng ký trả góp', description: 'Làm việc bằng ABN hay làm hai công việc có thể khiến du học sinh phải đóng thêm thuế. Nếu không trả hết một lần được, ATO cho phép hầu hết mọi người đăng ký trả góp trực tuyến.' },
    h1: { before: 'Nợ thuế? ', mark: 'Trả làm nhiều lần' },
    lead: 'Không phải du học sinh nào cũng được hoàn thuế. Giao đồ ăn, việc trả tiền mặt hay đăng ký ngưỡng miễn thuế ở hai nơi có thể khiến bạn phải đóng thêm thuế. Nếu không trả hết một lần được, có cách chính thức để chia nhỏ ra.',
    sections: {
      plan: { title: 'Đăng ký trả góp', blocks: [
        { p: 'ATO cho biết nếu bạn nợ từ $200,000 trở xuống, bạn có thể đủ điều kiện tự đăng ký trả góp trực tuyến:' },
        { list: [
          'Trong myGov đã liên kết với ATO: Tax, rồi Payments, rồi Payment plans.',
          'Hoặc qua đường dây điện thoại tự phục vụ của ATO.',
        ] },
        { p: 'ATO sẽ hướng dẫn bạn trả hết trong thời gian ngắn nhất có thể, để đỡ tiền lãi.' },
      ] },
      early: { title: 'Xử lý sớm', blocks: [
        { p: 'Đăng ký trả góp trước hạn thanh toán vẫn tốt hơn là bỏ mặc khoản nợ thuế. Nếu bạn sắp rời Úc, hãy đăng ký trả góp hoặc trả hết trước khi đi.' },
        { note: 'Trước khi bạn ký, chúng tôi cho bạn biết sơ bộ tình hình thuế của bạn, nên khoản thuế phải đóng thường sẽ không làm bạn bất ngờ.' },
      ] },
    },
    sourceLabels: ['ATO: Cách đăng ký trả góp'],
    short: {"answer": "Nếu bạn nợ từ $200,000 trở xuống, bạn có thể đủ điều kiện tự đăng ký trả góp trong myGov: Tax, rồi Payments, rồi Payment plans. Đăng ký sớm vẫn tốt hơn là bỏ mặc khoản nợ thuế.", "mark": "tự đăng ký trả góp trong myGov"},
  },
  'minimum-wage-students': {
    "label": "Lương tối thiểu và lương phụ trội",
    "meta": {
      "title": "Lương tối thiểu 2026 cho du học sinh ở Úc",
      "description": "Từ 1/7/2026, lương tối thiểu quốc gia là $26.44 một giờ. Award quyết định mức tối thiểu thực tế, khi nào có lương phụ trội cuối tuần, ngày lễ, và cách kiểm tra."
    },
    "h1": {
      "before": "",
      "mark": "Lương tối thiểu",
      "after": " của bạn năm 2026"
    },
    "lead": "Visa du học không làm thay đổi số tiền bạn phải được trả. Dưới đây là mức sàn, và lý do mức tối thiểu thực tế của bạn thường cao hơn.",
    "sections": {
      "floor": {
        "title": "Lương tối thiểu quốc gia",
        "blocks": [
          {
            "p": "Thanh tra Công bằng Lao động (Fair Work Ombudsman) cho biết từ kỳ lương đầy đủ đầu tiên bắt đầu vào hoặc sau ngày 1 tháng 7 năm 2026, lương tối thiểu quốc gia là $26.44 một giờ, hoặc $1,004.90 cho một tuần 38 giờ."
          }
        ]
      },
      "award": {
        "title": "Award quyết định mức tối thiểu thực tế của bạn",
        "blocks": [
          {
            "p": "Phần lớn công việc thuộc phạm vi một award (bộ quy định về lương và điều kiện làm việc tối thiểu) của ngành hoặc nghề, như nhà hàng và khách sạn, bán lẻ hay dọn dẹp. Award có mức lương tối thiểu riêng, và từ cùng ngày đó phần lớn các mức này tăng 4.75%."
          },
          {
            "p": "Công cụ tính lương miễn phí (Pay Calculator) của Fair Work giúp bạn biết award nào áp dụng cho mình và mức lương bao nhiêu."
          }
        ]
      },
      "penalty": {
        "title": "Cuối tuần, ngày lễ và ca khuya",
        "blocks": [
          {
            "p": "Lương phụ trội (penalty rate) là mức lương cao hơn khi làm vào những giờ hoặc ngày nhất định. Bạn có thể được hưởng khi làm:"
          },
          {
            "list": [
              "Cuối tuần.",
              "Ngày lễ.",
              "Giờ làm thêm (overtime).",
              "Ca khuya và ca sáng sớm."
            ]
          },
          {
            "p": "Được thêm bao nhiêu tùy vào award của bạn, hoặc thỏa thuận lao động nếu nơi làm việc có."
          }
        ]
      },
      "visa": {
        "title": "Khi có visa du học",
        "blocks": [
          {
            "note": "Fair Work cho biết người có visa có quyền tại nơi làm việc như mọi người khác, kể cả mức lương tối thiểu. Nếu bạn nghĩ mình bị trả thiếu, họ có thể giúp, và bạn có thể gọi qua thông dịch viên miễn phí."
          }
        ]
      }
    },
    "sourceLabels": [
      "Thanh tra Công bằng Lao động: Lương tối thiểu tăng từ hôm nay (1/7/2026)",
      "Thanh tra Công bằng Lao động: Lương phụ trội"
    ],
    "short": {
      "answer": "Từ kỳ lương đầy đủ đầu tiên bắt đầu vào hoặc sau ngày 1 tháng 7 năm 2026, lương tối thiểu quốc gia là $26.44 một giờ. Phần lớn công việc thuộc một award có mức tối thiểu riêng, cộng thêm mức cao hơn cho cuối tuần và ngày lễ.",
      "mark": "$26.44 một giờ",
      "facts": [
        {
          "figure": "$26.44",
          "label": "một giờ, lương tối thiểu quốc gia"
        },
        {
          "figure": "4.75%",
          "label": "mức tăng của phần lớn mức lương tối thiểu trong award"
        }
      ]
    }
  },
}
