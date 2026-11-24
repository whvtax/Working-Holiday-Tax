/**
 * Nội dung trang chủ (tiếng Việt). Viết lại theo cách người Việt đọc, không
 * dịch từng câu. Cách nói về pháp lý phải giữ đúng nghĩa:
 *   "Hoạt động dưới sự giám sát của một đại lý thuế đã đăng ký"
 *   "Được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO"
 * Cư trú thuế luôn là "có thể", không hứa hẹn tiền hoàn thuế.
 */
import type { HomeCopy } from './home-en'

export const homeVi: HomeCopy = {
  meta: {
    title: 'Khai thuế, hoàn thuế cho du học sinh Úc',
    description: 'Khai thuế cho visa 500 và 485. $220 mỗi hồ sơ, $385 nếu có việc ABN, đã gồm GST. Được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO.',
  },
  hero: {
    titleBefore: 'Khai thuế cho ',
    titleMark: 'du học sinh',
    lead: 'Khai thuế, hoàn thuế ở Úc cho người có visa 500 và 485. Được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO.',
    price: { amount: '$220', unit: 'mỗi hồ sơ', sub: '$385 nếu có việc ABN. Đã gồm GST.' },
    cta: 'Bắt đầu khai thuế qua WhatsApp',
  },
  answer: {
    title: 'Khai thuế cho du học sinh ở Úc: câu trả lời ngắn',
    text: 'Nếu bạn đi làm ở Úc bằng visa 500 hoặc 485 và lương bị trừ thuế, thường bạn phải khai thuế cho mỗi năm tài chính kết thúc ngày 30 tháng 6. Nếu tự khai, hạn nộp là ngày 31 tháng 10; hạn của năm 2025-26 đã qua, nhưng nộp muộn vẫn được, và càng sớm càng tốt. Nếu khóa học của bạn từ 6 tháng trở lên, bạn có thể là người cư trú về thuế, điều này ảnh hưởng đến thuế suất và Medicare levy, và ATO là bên quyết định cuối cùng. Với chúng tôi, mỗi hồ sơ là $220, hoặc $385 nếu có việc ABN, đã gồm GST.',
    more: 'Xem thêm',
    items: [
      { q: 'Tôi có cần khai thuế không?', a: 'Thường là có, nếu lương của bạn bị trừ thuế. Nếu bị trừ dư, khai thuế là cách để lấy lại.', href: '/do-i-need-to-lodge' },
      { q: 'Tôi có phải là người cư trú về thuế không?', a: 'Bạn có thể là, nếu khóa học từ 6 tháng trở lên. Điều này tùy vào năm của bạn, và ATO quyết định.', href: '/tax-residency' },
      { q: 'Miễn Medicare levy', a: 'Nếu bạn không đủ điều kiện hưởng Medicare, thường bạn cần giấy Medicare Entitlement Statement để xin miễn.', href: '/medicare' },
      { q: 'Khai thuế sau khi rời Úc', a: 'Khi năm tài chính kết thúc, bạn có thể khai thuế từ bất kỳ nước nào. Hãy giữ tài khoản ngân hàng ở Úc.', href: '/leaving-australia' },
      { q: 'Lỡ hạn 31 tháng 10, hoặc chưa khai các năm trước?', a: 'Bạn vẫn khai được. Hồ sơ nộp muộn làm theo cách tương tự, mỗi năm một hồ sơ, và càng sớm càng tốt.', href: '/past-years' },
      { q: 'Tiền hoàn thuế về chậm hoặc ít hơn dự kiến?', a: 'Phần lớn trường hợp chậm đều có nguyên nhân quen thuộc, và ATO cho bạn xem hồ sơ đang ở bước nào.', href: '/blog/tax-refund-delays-international-students' },
      { q: 'Khai sai trên tờ khai thuế?', a: 'Hồ sơ đã nộp vẫn sửa được, trong thời hạn ATO quy định.', href: '/blog/amend-tax-return' },
    ],
    servicesTitle: 'Chúng tôi giúp gì',
    services: [
      { label: 'Khai thuế, $220 hoặc $385', href: '/pricing' },
      { label: 'TFN của bạn', href: '/tfn' },
      { label: 'ABN và việc giao đồ ăn', href: '/abn-delivery' },
      { label: 'Rút super khi rời Úc (DASP)', href: '/superannuation' },
    ],
  },
  priceCheck: { title: 'Giá nào phù hợp với tôi?' },
  guarantee: {
    title: 'Nếu tiền hoàn thuế thấp hơn phí của chúng tôi, chúng tôi trả lại bạn phần chênh lệch',
    docketLabel: 'Ví dụ minh họa: phí $220, nếu hoàn thuế là $150 thì chúng tôi trả lại bạn $70',
    docket: [
      { label: 'Phí của chúng tôi', value: '$220' },
      { label: 'Tiền hoàn thuế', value: '$150' },
      { label: 'Chúng tôi trả lại', value: '$70', total: true },
    ],
    terms: 'Chúng tôi trả khoản này sau khi ATO gửi thông báo tính thuế (notice of assessment). Nếu không có tiền hoàn thuế, hoặc bạn phải đóng thêm thuế, thì vẫn tính đủ phí. Cam kết này chỉ áp dụng cho tờ khai mà toàn bộ thu nhập là từ việc làm có TFN.',
    why: 'Đăng ký ngưỡng miễn thuế ở cả hai chỗ làm, hoặc giao đồ ăn bằng ABN, là những lý do hay gặp khiến du học sinh phải đóng thêm thuế.',
    cta: 'Nhắn tin qua WhatsApp',
  },
  flow: {
    title: 'Từ tin nhắn đầu tiên đến khi nộp hồ sơ',
    label: 'Ví dụ cuộc trò chuyện, từng bước',
    steps: [
      { from: 'them', text: 'Bạn nhắn tin cho chúng tôi qua WhatsApp và chúng tôi xác nhận giá.' },
      { from: 'us', text: 'Bạn chuyển khoản cho The Accounting Academy và gửi ảnh chụp màn hình cho chúng tôi.' },
      { from: 'them', text: 'Bạn điền một mẫu đơn trực tuyến ngắn.' },
      { from: 'us', text: 'Chúng tôi xem mẫu đơn của bạn trong khoảng 24 giờ, rồi gửi bạn bản ước tính.' },
      { from: 'them', text: 'Bạn ký trực tuyến.' },
      { from: 'us', text: 'Hồ sơ thuế của bạn được nộp cho ATO.' },
    ],
  },
  payslip: {
    title: 'Đọc phiếu lương từng dòng',
    lead: 'Chạm vào một dòng. Đây là phiếu lương mẫu, tên chủ lao động là hư cấu.',
  },
  story: {
    title: 'Chỉ dành cho visa du học',
    lead: 'Student Visa Tax chỉ làm khai thuế cho người có visa du học và visa tốt nghiệp, ngoài ra không làm gì khác. Vì vậy những câu bạn sắp hỏi, chúng tôi đã gặp rất nhiều lần.',
    points: [
      'Học ở Úc một khóa từ 6 tháng trở lên, và điều đó ảnh hưởng thế nào đến thuế của bạn.',
      'Giấy Medicare Entitlement Statement, và cách nộp đơn xin giấy này với Services Australia.',
      'Làm hai việc bán thời gian cùng lúc, và vì sao có thể phải đóng thêm thuế.',
      'Chạy Uber Eats hoặc DoorDash bằng ABN.',
      'Học xong, về nước, và tiền super của bạn sẽ ra sao.',
    ],
    languages: 'Bạn có thể hỏi chúng tôi bằng tiếng Anh, tiếng Trung hoặc tiếng Việt.',
  },
  faq: {
    title: 'Câu hỏi thường gặp',
    items: [
      { q: 'Tôi có cần khai thuế không?', a: 'Thường là có, nếu bạn đã đi làm ở Úc và lương của bạn bị trừ thuế. Khai thuế để lấy lại phần thuế bị trừ dư, và đôi khi bạn có thể phải đóng thêm.' },
      { q: 'Có visa du học thì có phải là người cư trú về thuế không?', a: 'Nếu khóa học của bạn từ 6 tháng trở lên, bạn có thể là người cư trú về thuế. Điều này tùy vào hoàn cảnh cụ thể của bạn trong năm, và ATO là bên quyết định cuối cùng. Nhóm của chúng tôi xem xét việc này khi chuẩn bị hồ sơ, trước khi nộp.' },
      { q: 'Tôi có phải đóng Medicare levy không?', a: 'Nếu bạn là người cư trú về thuế nhưng không đủ điều kiện hưởng Medicare, thường bạn có thể xin miễn. Điều này tùy vào việc bạn có đủ điều kiện hưởng Medicare hay không, chứ không phải vào bảo hiểm OSHC: bạn cần giấy Medicare Entitlement Statement do Services Australia cấp, và chúng tôi giải thích cách nộp đơn.' },
      { q: 'Tôi giao Uber Eats. Có gì khác không?', a: 'Có. Thu nhập ABN không bị trừ thuế trước, nên phải khai như thu nhập kinh doanh, cùng với các chi phí làm việc. Hồ sơ này giá $385.' },
      { q: 'Tôi sắp rời Úc. Thuế và tiền super của tôi sẽ ra sao?', a: 'Bạn vẫn có thể khai thuế từ nước ngoài, và chúng tôi có thể giúp bạn rút tiền super sau khi bạn đã rời Úc.' },
      { q: 'Tôi đã rời Úc và không đăng nhập được myGov. Tôi vẫn khai thuế được chứ?', a: 'Được. Bạn không cần myGov để khai thuế với chúng tôi. Chúng tôi làm việc trực tiếp với ATO, và hồ sơ của bạn được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO. Bạn chỉ cần myGov nếu tự khai thuế trực tuyến, và ATO chỉ trả tiền hoàn thuế vào tài khoản ngân hàng ở Úc.' },
      { q: 'Hạn khai thuế là khi nào, và nếu lỡ hạn thì sao?', a: 'Năm tài chính ở Úc kết thúc ngày 30 tháng 6, và nếu tự khai thì hạn thông thường là ngày 31 tháng 10. Hạn của năm 2025-26 (31 tháng 10 năm 2026) đã qua, nhưng nộp muộn vẫn được, và càng sớm càng tốt. Những năm trước chưa khai cũng có thể nộp, mỗi năm một hồ sơ.' },
      { q: 'Bao lâu thì nhận được tiền hoàn thuế?', a: 'ATO cho biết phần lớn hồ sơ nộp trực tuyến được xử lý trong vòng 10 ngày làm việc. Một số hồ sơ cần kiểm tra thủ công và có thể mất đến 30 ngày, còn hồ sơ giấy có thể mất đến 90 ngày làm việc. Tiền hoàn thuế (nếu có) được trả vào tài khoản ngân hàng ở Úc của bạn.' },
      { q: 'Hoàn thuế ở Úc được bao nhiêu?', a: 'Điều này tùy vào thu nhập, số thuế bị trừ từ lương, chi phí công việc và việc bạn có thể là người cư trú về thuế hay không. Có người được hoàn thuế, có người phải đóng thêm. Chúng tôi gửi bạn bản ước tính trước khi bạn ký. Nếu toàn bộ công việc của bạn là việc làm có TFN mà tiền hoàn thuế thấp hơn phí của chúng tôi, chúng tôi trả lại bạn phần chênh lệch.' },
      { q: 'Tôi có thể tự khai, hoặc nhờ hỗ trợ miễn phí không?', a: 'Có người tự khai. Nếu thu nhập của bạn khoảng $70,000 trở xuống và hồ sơ đơn giản, chương trình Tax Help của ATO và một số phòng tư vấn ở trường đại học có thể giúp miễn phí. Du học sinh thường tìm đến chúng tôi khi muốn có người kiểm tra giúp chuyện cư trú thuế, miễn Medicare levy, làm hai việc hay thu nhập giao đồ ăn bằng ABN.' },
    ],
  },
  images: {
    hero: { id: 'IMG-01', subject: 'student on a café shift', alt: 'Một du học sinh đeo tạp dề quán cà phê, đang làm ca sau quầy' },
    flow: { id: 'IMG-02', subject: 'delivery bike at night', alt: 'Chiếc xe đạp giao hàng có túi giữ nhiệt, đậu bên đường phố vào ban đêm' },
  },
}
